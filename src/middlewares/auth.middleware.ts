import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/ApiError";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Check for the token in the Authorization header
    const tokenFromHeader = req.headers.authorization?.split(" ")[1];

    // Check for the token in cookies
    const tokenFromCookies = req.cookies?.authToken; // assuming the cookie is named "token"

    // If no token is found in either place, throw an error
    const token = tokenFromCookies || tokenFromHeader;

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = decoded; // Assuming `decoded` contains user info
    next();
  } catch (err) {
    throw new AppError("Unauthorized", 401);
  }
};
