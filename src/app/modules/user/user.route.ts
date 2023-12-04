import { UserControllers } from './user.controller';
import studentZodSchema from '../student/student.zod.validate';
import { validateRequest } from '../../middlewares/validateRequest';
import express from 'express';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentZodSchema),
  UserControllers.createStudent,
);
export const UserRoute = router;
