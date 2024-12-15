import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();
const userController = new UserController();

router.get("/", asyncHandler(userController.getAllUsers.bind(userController)));
router.post("/", asyncHandler(userController.createUser.bind(userController)));
router.get("/:id", asyncHandler(userController.getUserById.bind(userController)));
router.put("/:id", asyncHandler(userController.updateUser.bind(userController)));
router.delete("/:id", asyncHandler(userController.deleteUser.bind(userController)));

export default router;
