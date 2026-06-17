import { Queue } from 'bullmq';
import { redisFactory } from '../config/redis.js';
import { logger } from '../utils/logger.js';

/* Single place to mint and reuse BullMQ Queue instances. */
export class QueueService {
  constructor() {
    this.queues = new Map();
    this.connection = redisFactory.create('queue');
  }

  get(name) {
    if (this.queues.has(name)) return this.queues.get(name);
    const q = new Queue(name, {
      connection: this.connection,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: { age: 3600, count: 1000 },
        removeOnFail: { age: 24 * 3600 },
      },
    });
    this.queues.set(name, q);
    return q;
  }

  async enqueue(name, jobName, data, opts = {}) {
    const queue = this.get(name);
    const job = await queue.add(jobName, data, opts);
    logger.debug(`Enqueued ${name}:${jobName} (id=${job.id})`);
    return job;
  }

  async closeAll() {
    for (const [, q] of this.queues) {
      try { await q.close(); } catch (_) { /* ignore */ }
    }
    this.queues.clear();
  }
}

export const queueService = new QueueService();

export const QUEUES = {
  EMAIL: 'email',
};
