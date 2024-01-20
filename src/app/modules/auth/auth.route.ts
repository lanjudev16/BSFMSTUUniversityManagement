import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validate';
import { authController } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculties, USER_ROLE.student),
  validateRequest(authValidation.changePasswordValidation),
  authController.changePassword,
);
router.post(
  '/forget-password',
  validateRequest(authValidation.forgetPasswordValidationSchema),
  authController.forgetPassword,
);
export const authRouter = router;
