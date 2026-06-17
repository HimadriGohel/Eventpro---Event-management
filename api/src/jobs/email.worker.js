import { Worker } from 'bullmq';
import { redisFactory } from '../config/redis.js';
import { QUEUES } from '../services/QueueService.js';
import { emailProcessor } from './email.processor.js';
import { logger } from '../utils/logger.js';

/* Starts a BullMQ worker on the email queue.
   Embedded into the API process in dev for convenience — `boot.js` calls
   `startEmailWorker()`. In production, run this file directly with
   `npm run worker:email` and remove the embedded start. */

export const startEmailWorker = () => {
  const worker = new Worker(QUEUES.EMAIL, emailProcessor, {
    connection: redisFactory.create('queue'),
    concurrency: 5,
  });
  worker.on('completed', (job) => logger.debug(`email:${job.name} completed (id=${job.id})`));
  worker.on('failed', (job, err) => logger.error(`email:${job?.name} failed (id=${job?.id}):`, err.message));
  worker.on('error', (err) => logger.error('email worker error:', err));
  logger.info('Email worker started (concurrency=5)');
  return worker;
};

// When run directly via `npm run worker:email`, boot just the worker.
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('email.worker.js')) {
  startEmailWorker();
}
