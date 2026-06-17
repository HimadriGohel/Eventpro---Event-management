import IORedis from 'ioredis';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

class RedisClientFactory {
  constructor() {
    this.clients = new Map();
  }

  /* `bullmq` requires maxRetriesPerRequest: null on its connection.
     Use `kind: "queue"` for that, `kind: "app"` for everything else. */
  create(kind = 'app') {
    if (this.clients.has(kind)) return this.clients.get(kind);
    const opts = {
      host: env.redis.host,
      port: env.redis.port,
      password: env.redis.password,
      db: env.redis.db,
      lazyConnect: false,
      ...(kind === 'queue' ? { maxRetriesPerRequest: null, enableReadyCheck: false } : {}),
    };
    const client = new IORedis(opts);
    client.on('error', (err) => logger.error(`Redis (${kind}) error`, err));
    client.on('connect', () => logger.info(`Redis (${kind}) connected at ${env.redis.host}:${env.redis.port}`));
    this.clients.set(kind, client);
    return client;
  }

  async closeAll() {
    for (const [, client] of this.clients) {
      try { await client.quit(); } catch (_) { /* ignore */ }
    }
    this.clients.clear();
  }
}

export const redisFactory = new RedisClientFactory();
