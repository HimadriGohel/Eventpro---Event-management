import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export const notFoundHandler = (req, _res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (err, _req, res, _next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    if (error?.name === 'ValidationError' && error instanceof mongoose.Error.ValidationError) {
      const details = Object.fromEntries(
        Object.entries(error.errors).map(([k, v]) => [k, v.message]),
      );
      error = ApiError.badRequest('Validation failed', { code: 'VALIDATION', details });
    } else if (error?.code === 11000) {
      const fields = Object.keys(error.keyValue || {});
      error = ApiError.conflict(`Duplicate value for: ${fields.join(', ')}`, { code: 'DUPLICATE', details: error.keyValue });
    } else if (error?.name === 'CastError') {
      error = ApiError.badRequest(`Invalid value for ${error.path}`, { code: 'CAST', details: { path: error.path } });
    } else {
      error = new ApiError(error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, error?.message || 'Internal server error');
    }
  }

  if (error.statusCode >= 500) logger.error(error);
 
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    code: error.code,
    details: error.details ?? undefined,
    stack: env.isProd ? undefined : err.stack,
  });
};
