// middlewares/role.middleware.ts

import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/ApiError";

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
      const userRole = req.body.user?.userRole; // Assuming the user's role is in req.user after authentication
      console.log(userRole)
    
    if (!userRole || !roles.includes(userRole)) {
      return next(new AppError("Unauthorized access", 403));
    }

    next();
  };
};
