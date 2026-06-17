import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

class Database {
  constructor() {
    this.connection = null;
  }
 
  async connect() {
    if (this.connection) return this.connection;
    mongoose.set('strictQuery', true);
    this.connection = await mongoose.connect(env.mongoUri, {
      autoIndex: !env.isProd,
      serverSelectionTimeoutMS: 8000,
    });
    logger.info(`MongoDB connected: ${this.connection.connection.host}/${this.connection.connection.name}`);
    mongoose.connection.on('error', (err) => logger.error('MongoDB error', err));
    mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
    return this.connection;
  }

  async disconnect() {
    if (!this.connection) return;
    await mongoose.disconnect();
    this.connection = null;
    logger.info('MongoDB disconnected');
  }
}

export const database = new Database();
