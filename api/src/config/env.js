import 'dotenv/config';

const required = (key) => {
  const v = process.env[key];
  if (v === undefined || v === '') throw new Error(`Missing required env: ${key}`);
  return v;
};

const bool = (v, fallback = false) => {
  if (v === undefined) return fallback;
  return /^(1|true|yes|on)$/i.test(String(v));
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT || 4000),
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  mongoUri: required('MONGO_URI'),

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    db: Number(process.env.REDIS_DB || 0),
  },

  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshSecret: required('JWT_REFRESH_SECRET'),
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  cookie: {
    name: process.env.COOKIE_NAME || 'ep_rt',
    domain: process.env.COOKIE_DOMAIN || undefined,
    secure: bool(process.env.COOKIE_SECURE, false),
    sameSite: process.env.COOKIE_SAMESITE || 'lax',
  },

  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 10),

  otp: {
    length: Number(process.env.OTP_LENGTH || 6),
    ttlSeconds: Number(process.env.OTP_TTL_SECONDS || 600),
  },

  seed: {
    enabled: bool(process.env.SEED_ADMIN, true),
    email: process.env.SEED_ADMIN_EMAIL || 'admin@eventpro.io',
    password: process.env.SEED_ADMIN_PASSWORD || 'Admin@123',
    name: process.env.SEED_ADMIN_NAME || 'EventPro Admin',
  },
};
