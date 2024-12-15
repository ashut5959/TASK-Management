import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/jwtUtils";
import { AppError } from "../utils/ApiError";

const prisma = new PrismaClient();

export class AuthService {
  async validateUserCredentials(usernameOrEmail: string, password: string) {
    console.log(usernameOrEmail)
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });

    console.log(user)

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Invalid credentials", 400);
    }

    return user;
  }

  async generateLoginToken(userId: number, userRole: string) {
    return generateToken({ userId, userRole });
  }

  async invalidateToken(token: string) {
    // You can implement token invalidation using a token blacklist stored in Redis or a database
    return true;
  }
}
