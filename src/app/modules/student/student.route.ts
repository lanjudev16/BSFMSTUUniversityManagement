import express from 'express';
import { studentControllers } from './student.controller';
const router = express.Router();
router.get('/get-student', studentControllers.getStudent);
router.get('/single-student/:id', studentControllers.getSingleStudent);
export const studentRoutes = router;
