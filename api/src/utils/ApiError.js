import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  constructor(statusCode, message, { code, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code || `E${statusCode}`;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(msg = 'Bad request', extra) {
    return new ApiError(StatusCodes.BAD_REQUEST, msg, extra);
  }
  static unauthorized(msg = 'Unauthorized', extra) {
    return new ApiError(StatusCodes.UNAUTHORIZED, msg, extra);
  }
  static forbidden(msg = 'Forbidden', extra) {
    return new ApiError(StatusCodes.FORBIDDEN, msg, extra);
  }
  static notFound(msg = 'Not found', extra) {
    return new ApiError(StatusCodes.NOT_FOUND, msg, extra);
  }
  static conflict(msg = 'Conflict', extra) {
    return new ApiError(StatusCodes.CONFLICT, msg, extra);
  }
  static unprocessable(msg = 'Unprocessable entity', extra) {
    return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, msg, extra);
  }
  static tooMany(msg = 'Too many requests', extra) {
    return new ApiError(StatusCodes.TOO_MANY_REQUESTS, msg, extra);
  }
  static internal(msg = 'Internal server error', extra) {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, msg, extra);
  }
}
