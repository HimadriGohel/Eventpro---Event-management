import { User, USER_ROLES } from '../models/User.js';
import { authRepository } from '../modules/auth/auth.repository.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

/* Inserts a single admin user when the users collection is empty.
   Idempotent — safe to call on every boot. */
export const seedAdmin = async () => {
  if (!env.seed.enabled) return { seeded: false, reason: 'disabled' };
  const count = await authRepository.countAll();
  if (count > 0) return { seeded: false, reason: 'not-empty' };

  await User.create({
    name: env.seed.name,
    email: env.seed.email,
    password: env.seed.password,
    role: USER_ROLES.ADMIN,
    emailVerifiedAt: new Date(),
  });

  logger.info(`Seeded admin user: ${env.seed.email} (password: ${env.seed.password})`);
  return { seeded: true };
};
