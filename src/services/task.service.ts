import { Priority, Prisma, PrismaClient, status, User } from "@prisma/client"; // Import Status enum and Priority
import { AppError } from "../utils/ApiError"; // Custom error handling
import prisma from "../prisma"; // Prisma client import

interface Task {
  id: number;
  title: string;
  description: string | null;
  dueDate: Date;
  priority: Priority; // Using enum Priority from Prisma schema
  status: status; // Using enum Status from Prisma schema
  userId: number;
  user?: User;
}

export class TaskService {
  private prisma: PrismaClient; // Prisma client instance

  constructor() {
    this.prisma = new PrismaClient(); // Initialize Prisma client
  }

  // Create a new task
  public async createTask(taskData: Omit<Task, "id" | "user">): Promise<Task> {
    console.log(taskData);
    const newTask = await this.prisma.task.create({
      data: { ...taskData },
    });
    return newTask;
  }

  // Get all tasks with optional filtering and sorting
  public async getTasks(
    userId: number,
    filters?: Partial<Omit<Task, "id" | "userId">>, // Optional filters for task attributes
    sort?: keyof Omit<Task, "id" | "userId"> // Sorting parameter
  ): Promise<Task[]> {
    let result = await this.prisma.task.findMany({
      where: {
        userId: userId, // Filter tasks by userId
        ...(filters && {
          // Apply filters if provided
          priority: filters.priority,
          status: filters.status,
          dueDate: filters.dueDate,
        }),
      },
      orderBy: sort ? { [sort]: "asc" } : undefined, // Apply sorting if provided
    });

    return result;
  }

  // Get a task by ID
  public async getTaskById(userId: number, taskId: number): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId, // Ensure task belongs to the correct user
      },
    });

    console.log(task);
    if (!task) {
      console.log(task);
      throw new AppError("Task not found", 404); // Throw error if task not found
    }
    return task;
  }

  // Update a task
  public async updateTask(
    userId: number,
    taskId: number,
    updatedData: Partial<Omit<Task, "id" | "userId" | "user">>
  ): Promise<Task> {
    console.log(updatedData);
    const task = await this.prisma.task.update({
      where: {
        id: taskId,
        userId: userId, // Ensure task belongs to the correct user
      },
      data: updatedData, // Update task data
    });

    if (!task) {
      throw new AppError("Task not found or unauthorized", 404); // Error handling for task not found
    }

    return task; // Return updated task
  }

  // Delete a task
  public async deleteTask(userId: number, taskId: number): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId, // Ensure task belongs to the correct user
      },
    });

    if (!task) {
      throw new AppError("Task not found or unauthorized", 404); // Error handling for task not found
    }

    await this.prisma.task.delete({
      where: {
        id: taskId,
        userId: userId, // Ensure task belongs to the correct user
      },
    });

    return task;
  }
}
