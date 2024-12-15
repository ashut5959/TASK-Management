import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/ApiError';

// Global Error Handler Middleware
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Set the status code to the error's statusCode or default to 500 for internal server errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error details for debugging (can be replaced with a logging library in production)
  console.error(err);

  // Send the response with error details
  res.status(statusCode).json({
    status: 'error',
    message,
    // Optionally, you can include a stack trace in development for debugging
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
