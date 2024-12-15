import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async createUser(data: { username: string; email: string; password: string; roles: Role }) {
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds
  
    // Create the user with the hashed password
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, // Replace the plain password with the hashed password
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: Partial<{ username: string; email: string; password: string; roles: Role }>) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
