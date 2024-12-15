import express from 'express';
import dotenv from 'dotenv';
import swaggerDocs from './config/swagger.config';
import rateLimiter from './middlewares/rate-limiter';
import { errorHandler } from './middlewares/errorHandler'; 
import cookieParser from 'cookie-parser';
import { authRoutes, profileRoutes, taskRoutes } from './routes';

dotenv.config();

class TaskManagementApp {
  app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling(); 
  }

  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(rateLimiter);
    // this.app.use('/api-docs', swaggerDocs);
  }

  private configureRoutes() {
    this.app.use('/auth', authRoutes);
    this.app.use('/profile', profileRoutes);
    this.app.use('/tasks', taskRoutes);
  }
  private configureErrorHandling() {
    this.app.use(errorHandler); // Use global error handler middleware
  }
  public start() {
    return this.app;
  }
}

export default TaskManagementApp;
