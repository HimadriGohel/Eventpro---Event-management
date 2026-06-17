import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class ApiResponse {
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message || ReasonPhrases[statusCode] || '';
    this.data = data ?? null;
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      message: this.message,
      data: this.data,
    });
  }

  static ok(res, data, message) {
    return new ApiResponse(StatusCodes.OK, data, message).send(res);
  }
  static created(res, data, message) {
    return new ApiResponse(StatusCodes.CREATED, data, message).send(res);
  }
  static noContent(res) {
    return res.status(StatusCodes.NO_CONTENT).end();
  }
}
