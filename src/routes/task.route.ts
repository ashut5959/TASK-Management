import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";
import { checkRole } from "../middlewares/role.middleware";

const router = Router();
const taskController = new TaskController();

// Route for retrieving tasks
router.post(
  "/tasks",
  authenticateUser,
  checkRole(["ADMIN"]),
  asyncHandler(taskController.createTask.bind(taskController))
);
router.get(
  "/tasks",
  authenticateUser,
  asyncHandler(taskController.getTasks.bind(taskController))
);
router.get(
  "/tasks/:id",
  authenticateUser,
  asyncHandler(taskController.getTaskById.bind(taskController))
);
router.patch(
  "/tasks/:id",
  authenticateUser,
  checkRole(["ADMIN", "MASTER"]),
  asyncHandler(taskController.updateTask.bind(taskController))
);
router.delete(
  "/tasks/:id",
  authenticateUser,
  checkRole(["ADMIN"]),
  asyncHandler(taskController.deleteTask.bind(taskController))
);

export default router;
