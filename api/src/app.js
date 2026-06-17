import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { v1Router } from './routes/v1.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';

export const buildApp = () => {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(cors({
    origin: (origin, cb) => {
      if (!origin || env.corsOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('CORS: origin not allowed'));
    },
    credentials: true,
  }));
 app.use(express.json({ limit: '20mb' }));

app.use(
  express.urlencoded({
    extended: true,
    limit: '20mb',
  })
);
  app.use(cookieParser());
  if (!env.isProd) app.use(morgan('dev'));

  app.get('/', (_req, res) => res.json({ name: 'eventpro-api', version: '0.1.0' }));
  app.use(env.apiPrefix, v1Router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
