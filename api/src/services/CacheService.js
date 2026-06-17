import { redisFactory } from '../config/redis.js';

/* Thin wrapper around ioredis with JSON serialization and namespaced keys. */
export class CacheService {
  constructor({ namespace = 'ep' } = {}) {
    this.ns = namespace;
    this.client = redisFactory.create('app');
  }

  key(parts) {
    return [this.ns, ...(Array.isArray(parts) ? parts : [parts])].join(':');
  }

  async set(key, value, ttlSeconds) {
    const payload = JSON.stringify(value);
    const k = this.key(key);
    if (ttlSeconds) return this.client.set(k, payload, 'EX', ttlSeconds);
    return this.client.set(k, payload);
  }

  async get(key) {
    const raw = await this.client.get(this.key(key));
    if (raw == null) return null;
    try { return JSON.parse(raw); } catch { return raw; }
  }

  async del(key) {
    return this.client.del(this.key(key));
  }

  async exists(key) {
    return (await this.client.exists(this.key(key))) === 1;
  }

  async incr(key, ttlSeconds) {
    const k = this.key(key);
    const n = await this.client.incr(k);
    if (n === 1 && ttlSeconds) await this.client.expire(k, ttlSeconds);
    return n;
  }
}

export const cacheService = new CacheService();
