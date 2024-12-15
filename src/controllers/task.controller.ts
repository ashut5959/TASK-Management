import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  // Create a new task
  public async createTask(req: Request, res: Response): Promise<void> {
    const userId = req.body.user.userId; // Assuming req.user is populated by authentication middleware
    const { title, description, dueDate, priority, status } = req.body;

    const newTask = await this.taskService.createTask({
      title,
      description,
      dueDate,
      priority,
      status,
      userId,
    });
    res.status(201).json({
      status: "success",
      data: newTask,
    });
  }
  public async getTasks(req: Request, res: Response): Promise<void> {
    console.log(req.query)
    const userId = req.body.user.id; // Assuming req.user is populated by authentication middleware
    const filters = req.query.filters
      ? JSON.parse(req.query.filters as string)
      : undefined;

    // Type assertion to ensure the 'sort' parameter is one of the allowed strings
    const sort = req.query.sort as
      | "title"
      | "description"
      | "dueDate"
      | "priority"
      | "status"
      | undefined;

    const tasks = await this.taskService.getTasks(userId, filters, sort);
    res.status(200).json({
      status: "success",
      data: tasks,
    });
  }

  // Get a specific task by ID
  public async getTaskById(req: Request, res: Response): Promise<void> {
    const userId = req.body.user.id; // Assuming req.user is populated by authentication middleware
    const taskId = parseInt(req.params.id, 10);

    const task = await this.taskService.getTaskById(userId, taskId);
    res.status(200).json({
      status: "success",
      data: task,
    });
  }

  // Update a task
  public async updateTask(req: Request, res: Response): Promise<void> {
    const userId = req.body.user.userId; // Assuming req.user is populated by authentication middleware
    const taskId = parseInt(req.params.id, 10);
    const {user, ...updateData} = req.body;

    const updatedTask = await this.taskService.updateTask(
      userId,
      taskId,
      updateData
    );
    res.status(200).json({
      status: "success",
      data: updatedTask,
    });
  }

  // Delete a task
  public async deleteTask(req: Request, res: Response): Promise<void> {
    const userId = req.body.user.userId; // Assuming req.user is populated by authentication middleware
    const taskId = parseInt(req.params.id, 10);

    const deletedTask = await this.taskService.deleteTask(userId, taskId);
    res.status(204).json({
      status : "success",
      data: deletedTask,
    }); // No content response
  }
}
