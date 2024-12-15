// custom.d.ts
import { User } from './models/User'; // Adjust the path to where your User model is defined
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Assuming 'user' is of type User, adjust if needed
    }
  }
}
