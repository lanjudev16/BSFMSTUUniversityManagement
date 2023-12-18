import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validate';
import { authController } from './auth.controller';
const router = express.Router();
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);
export const authRouter = router;
