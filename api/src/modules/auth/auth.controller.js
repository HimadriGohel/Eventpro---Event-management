import { authService } from './auth.service.js';
import { tokenService } from '../../services/TokenService.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { env } from '../../config/env.js';

const buildCookieOptions = (ttlMs) => ({
  httpOnly: true,
  secure: env.cookie.secure,
  sameSite: env.cookie.sameSite,
  domain: env.cookie.domain,
  path: '/',
  maxAge: ttlMs,
});

export class AuthController {
  constructor({ service = authService } = {}) {
    this.service = service;
    
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
    this.logout = this.logout.bind(this);
    this.me = this.me.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.resendVerification = this.resendVerification.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  attachRefreshCookie(res, refresh, ttlMs) {
    res.cookie(env.cookie.name, refresh, buildCookieOptions(ttlMs));
  }

  clearRefreshCookie(res) {
    res.clearCookie(env.cookie.name, { path: '/', domain: env.cookie.domain });
  }

  async signup(req, res) {
    const out = await this.service.signup(req.body);
    this.attachRefreshCookie(res, out.refresh, out.refreshTtlMs);
    return ApiResponse.created(res, {
      user: out.user,
      accessToken: out.access,
      expiresIn: tokenService.accessTtlSeconds(),
    }, 'Account created');
  }

  async login(req, res) {
    const out = await this.service.login(req.body);
    this.attachRefreshCookie(res, out.refresh, out.refreshTtlMs);
    return ApiResponse.ok(res, {
      user: out.user,
      accessToken: out.access,
      expiresIn: tokenService.accessTtlSeconds(),
    }, 'Logged in');
  }

  async refresh(req, res) {
    const raw = req.cookies?.[env.cookie.name];
    const out = await this.service.refresh(raw);
    this.attachRefreshCookie(res, out.refresh, out.refreshTtlMs);
    return ApiResponse.ok(res, {
      user: out.user,
      accessToken: out.access,
      expiresIn: tokenService.accessTtlSeconds(),
    }, 'Token refreshed');
  }

  async logout(req, res) {
    const raw = req.cookies?.[env.cookie.name];
    await this.service.logout(raw);
    this.clearRefreshCookie(res);
    return ApiResponse.ok(res, { ok: true }, 'Logged out');
  }

  async me(req, res) {
    const user = await this.service.me(req.user.id);
    return ApiResponse.ok(res, { user });
  }

  async verifyEmail(req, res) {
    const out = await this.service.verifyEmail(req.body);
    return ApiResponse.ok(res, out, 'Email verified');
  }

  async resendVerification(req, res) {
    const out = await this.service.resendVerification(req.body);
    return ApiResponse.ok(res, out, out.sent ? 'Verification email sent' : 'Already verified');
  }

  async forgotPassword(req, res) {
    const out = await this.service.forgotPassword(req.body);
    return ApiResponse.ok(res, out, 'If that account exists, a reset email has been sent');
  }

  async resetPassword(req, res) {
    const out = await this.service.resetPassword(req.body);
    return ApiResponse.ok(res, out, 'Password updated');
  }
}

export const authController = new AuthController();
