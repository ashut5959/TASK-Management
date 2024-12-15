import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const router = Router();
const authController = new AuthController();

router.post('/login', asyncHandler(authController.login.bind(authController)));
router.post('/logout', asyncHandler(authController.logout.bind(authController)));

export default router;
