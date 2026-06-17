import http from 'node:http';
import { buildApp } from './app.js';
import { env } from './config/env.js';
import { database } from './config/database.js';
import { redisFactory } from './config/redis.js';
import { queueService } from './services/QueueService.js';
import { startEmailWorker } from './jobs/email.worker.js';
import { seedAdmin } from './seeders/admin.seeder.js';
import { logger } from './utils/logger.js';

const start = async () => {
  await database.connect();
  // Touching the app-tier Redis client triggers a "connected" log line on boot.
  redisFactory.create('app');
  await seedAdmin();
  const emailWorker = startEmailWorker();

  const app = buildApp();
  const server = http.createServer(app);

  server.listen(env.port, () => {
    logger.info(`API listening on http://localhost:${env.port} (env: ${env.nodeEnv})`);
    logger.info(`Routes mounted at ${env.apiPrefix}`);
  });

  const shutdown = async (signal) => {
    logger.info(`Received ${signal} — shutting down`);
    server.close();
    try { await emailWorker.close(); } catch (_) { /* ignore */ }
    try { await queueService.closeAll(); } catch (_) { /* ignore */ }
    try { await database.disconnect(); } catch (_) { /* ignore */ }
    try { await redisFactory.closeAll(); } catch (_) { /* ignore */ }
    process.exit(0);
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

start().catch((err) => {
  logger.error('Failed to start API:', err);
  process.exit(1);
});
