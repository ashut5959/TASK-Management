import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
  // Login Controller
  async login(req: Request, res: Response) {
    const { usernameOrEmail, password } = req.body;

    // Validate user credentials
    const user = await authService.validateUserCredentials(usernameOrEmail, password);

    // Generate JWT Token
    const token = await authService.generateLoginToken(user.id, user.roles);

    // Set the token in an HTTP-only cookie
    res
      .cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
      })
      .status(200)
      .json({ message: 'Login successful' });
  }

  // Logout Controller
  async logout(req: Request, res: Response) {
    console.log(req.cookies)
    // Clear the cookie
    res
      .clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
      .status(200)
      .json({ message: 'Logout successful' });
  }
}
