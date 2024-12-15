import { Request, Response } from "express";
import { UserService } from "../services/user.serive";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Get all users
  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.status(200).json(users);
  }

  // Create a new user
  async createUser(req: Request, res: Response) {
    const { username, email, password, roles } = req.body;
    const newUser = await this.userService.createUser({
      username,
      email,
      password,
      roles,
    });
    res.status(201).json(newUser);
  }

  // Get user by ID
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }

  // Update user
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await this.userService.updateUser(
      Number(id),
      updateData
    );
    res.status(200).json(updatedUser);
  }

  // Delete user
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await this.userService.deleteUser(Number(id));
    res.status(204).send();
  }
}
