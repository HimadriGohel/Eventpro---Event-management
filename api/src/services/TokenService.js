import jwt from 'jsonwebtoken';
import ms from 'ms';
import { v4 as uuid } from 'uuid';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export class TokenService {
  constructor() {
    this.accessSecret = env.jwt.accessSecret;
    this.accessExpiresIn = env.jwt.accessExpiresIn;
    this.refreshSecret = env.jwt.refreshSecret;
    this.refreshExpiresIn = env.jwt.refreshExpiresIn;
  }

  signAccess(payload) {
    return jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpiresIn });
  }

  /* Embeds a `jti` so refresh tokens can be individually revoked. */
  signRefresh(payload) {
    const jti = uuid();
    const token = jwt.sign({ ...payload, jti }, this.refreshSecret, { expiresIn: this.refreshExpiresIn });
    return { token, jti, ttlMs: ms(this.refreshExpiresIn) };
  }

  verifyAccess(token) {
    try {
      return jwt.verify(token, this.accessSecret);
    } catch (err) {
      throw ApiError.unauthorized('Invalid or expired access token', { code: 'TOKEN_INVALID' });
    }
  }

  verifyRefresh(token) {
    try {
      return jwt.verify(token, this.refreshSecret);
    } catch (err) {
      throw ApiError.unauthorized('Invalid or expired refresh token', { code: 'REFRESH_INVALID' });
    }
  }

  accessTtlSeconds() {
    return Math.floor(ms(this.accessExpiresIn) / 1000);
  }

  refreshTtlMs() {
    return ms(this.refreshExpiresIn);
  }
}

export const tokenService = new TokenService();
