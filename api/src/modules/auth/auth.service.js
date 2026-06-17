import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { authRepository } from './auth.repository.js';
import { tokenService } from '../../services/TokenService.js';
import { cacheService } from '../../services/CacheService.js';
import { queueService, QUEUES } from '../../services/QueueService.js';
import { ApiError } from '../../utils/ApiError.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

const REFRESH_KEY = (userId, jti) => ['refresh', userId, jti];
const RESET_KEY = (token) => ['reset', token];
const VERIFY_KEY = (email) => ['verify', email];

const numericCode = (length) =>
  Array.from({ length }, () => crypto.randomInt(0, 10)).join('');

export class AuthService {
  constructor({ repo = authRepository, tokens = tokenService, cache = cacheService, queue = queueService } = {}) {
    this.repo = repo;
    this.tokens = tokens;
    this.cache = cache;
    this.queue = queue;
  }

  /* ---- helpers ---- */

  toPublic(user) {
    return user.toJSON();
  }

  async issueTokens(user) {
    const access = this.tokens.signAccess({ sub: user.id, role: user.role });
    const { token: refresh, jti, ttlMs } = this.tokens.signRefresh({ sub: user.id });
    await this.cache.set(REFRESH_KEY(user.id, jti), { issuedAt: Date.now() }, Math.floor(ttlMs / 1000));
    return { access, refresh, refreshJti: jti, refreshTtlMs: ttlMs };
  }

  async revokeRefresh(userId, jti) {
    await this.cache.del(REFRESH_KEY(userId, jti));
  }

  async sendVerificationEmail(user) {
    const code = numericCode(env.otp.length);
    await this.cache.set(VERIFY_KEY(user.email), { code, userId: user.id }, env.otp.ttlSeconds);
    await this.queue.enqueue(QUEUES.EMAIL, 'verifyEmail', {
      to: user.email,
      name: user.name,
      code,
      ttlMinutes: Math.round(env.otp.ttlSeconds / 60),
    });
    return { sent: true };
  }

  /* ---- public API ---- */

  async signup({ name, email, password, phone, role }) {
    const exists = await this.repo.existsByEmail(email);
    if (exists) throw ApiError.conflict('An account with that email already exists', { code: 'EMAIL_TAKEN' });
    const user = await this.repo.create({ name, email, password, phone: phone || null, role });
    await this.sendVerificationEmail(user);
    const tokens = await this.issueTokens(user);
    await this.repo.updateLastLogin(user.id);
    return { user: this.toPublic(user), ...tokens };
  }

  async login({ email, password }) {
    const user = await this.repo.findByEmail(email, { withPassword: true });
    if (!user) throw ApiError.unauthorized('Invalid email or password', { code: 'BAD_CREDENTIALS' });
    if (user.isBlocked) throw ApiError.forbidden('Account blocked', { code: 'BLOCKED' });
    const ok = await user.comparePassword(password);
    if (!ok) throw ApiError.unauthorized('Invalid email or password', { code: 'BAD_CREDENTIALS' });
    const tokens = await this.issueTokens(user);
    await this.repo.updateLastLogin(user.id);
    return { user: this.toPublic(user), ...tokens };
  }

  async refresh(rawRefreshToken) {
    if (!rawRefreshToken) throw ApiError.unauthorized('Refresh token missing', { code: 'NO_REFRESH' });
    const payload = this.tokens.verifyRefresh(rawRefreshToken);
    const exists = await this.cache.exists(REFRESH_KEY(payload.sub, payload.jti));
    if (!exists) throw ApiError.unauthorized('Refresh token revoked or expired', { code: 'REFRESH_REVOKED' });
    const user = await this.repo.findById(payload.sub);
    if (!user || user.isBlocked) throw ApiError.unauthorized('Account unavailable', { code: 'USER_GONE' });

    // Rotate: revoke old, mint new pair.
    await this.revokeRefresh(payload.sub, payload.jti);
    const tokens = await this.issueTokens(user);
    return { user: this.toPublic(user), ...tokens };
  }

  async logout(rawRefreshToken) {
    if (!rawRefreshToken) return { ok: true };
    try {
      const payload = this.tokens.verifyRefresh(rawRefreshToken);
      await this.revokeRefresh(payload.sub, payload.jti);
    } catch (_) { /* swallow — logout should be idempotent */ }
    return { ok: true };
  }

  async me(userId) {
    const user = await this.repo.findById(userId);
    if (!user) throw ApiError.notFound('User not found');
    return this.toPublic(user);
  }

  async verifyEmail({ email, code }) {
    const entry = await this.cache.get(VERIFY_KEY(email));
    if (!entry) throw ApiError.badRequest('Verification code expired or never issued', { code: 'OTP_EXPIRED' });
    if (entry.code !== code) throw ApiError.badRequest('Incorrect verification code', { code: 'OTP_INVALID' });
    await this.repo.setEmailVerified(entry.userId);
    await this.cache.del(VERIFY_KEY(email));
    const user = await this.repo.findById(entry.userId);
    return { user: this.toPublic(user) };
  }

  async resendVerification({ email }) {
    const user = await this.repo.findByEmail(email);
    if (!user) return { sent: true }; // avoid user-enumeration
    if (user.emailVerifiedAt) return { sent: false, alreadyVerified: true };
    await this.sendVerificationEmail(user);
    return { sent: true };
  }

  async forgotPassword({ email }) {
    const user = await this.repo.findByEmail(email);
    if (!user) return { sent: true }; // don't leak which emails exist
    const token = crypto.randomBytes(32).toString('hex');
    await this.cache.set(RESET_KEY(token), { userId: user.id }, env.otp.ttlSeconds);
    await this.queue.enqueue(QUEUES.EMAIL, 'resetPassword', {
      to: user.email,
      name: user.name,
      token,
      ttlMinutes: Math.round(env.otp.ttlSeconds / 60),
    });
    logger.info(`Issued password-reset token for ${email}`);
    return { sent: true };
  }

  async resetPassword({ token, password }) {
    const entry = await this.cache.get(RESET_KEY(token));
    if (!entry) throw ApiError.badRequest('Reset link is invalid or expired', { code: 'RESET_INVALID' });
    const hashed = await bcrypt.hash(password, env.bcryptRounds);
    await this.repo.setPassword(entry.userId, hashed);
    await this.cache.del(RESET_KEY(token));
    return { ok: true };
  }
}

export const authService = new AuthService();
