import { ApiError } from '../utils/ApiError.js';
import { tokenService } from '../services/TokenService.js';
import { User } from '../models/User.js';

/* Verifies the Bearer access token, loads the user, and attaches to `req`. */
export const requireAuth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw ApiError.unauthorized('Missing or malformed Authorization header', { code: 'NO_TOKEN' });
    }
    const payload = tokenService.verifyAccess(token);
    const user = await User.findById(payload.sub);
    if (!user) throw ApiError.unauthorized('User no longer exists', { code: 'USER_GONE' });
    if (user.isBlocked) throw ApiError.forbidden('Account blocked', { code: 'BLOCKED' });
    req.user = user;
    req.token = { ...payload, raw: token };
    next();
  } catch (e) {
    next(e);
  }
};

/* Optional auth — populates req.user when a valid token is present, otherwise
   silently continues. */
export const optionalAuth = async (req, _res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return next();
  try {
    const token = header.slice(7);
    const payload = tokenService.verifyAccess(token);
    const user = await User.findById(payload.sub);
    if (user && !user.isBlocked) {
      req.user = user;
      req.token = { ...payload, raw: token };
    }
  } catch (_) { /* ignore */ }
  next();
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user) return next(ApiError.unauthorized());
  if (!roles.includes(req.user.role)) return next(ApiError.forbidden('Insufficient role', { code: 'ROLE_FORBIDDEN' }));
  next();
};
