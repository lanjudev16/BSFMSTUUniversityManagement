import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getAllStudentFromDb();
    res.status(200).json({
      success: true,
      message: 'All student here',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentServices.getSingleStudentFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Student found',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getStudent,
  getSingleStudent,
};
