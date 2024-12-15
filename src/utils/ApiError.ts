export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // Operational errors are expected, such as invalid input
      Error.captureStackTrace(this, this.constructor); // Capture stack trace for debugging
    }
  }
  