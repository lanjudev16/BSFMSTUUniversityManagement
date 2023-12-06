import { Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const bodyData = req.body;
    const result =
      await academicSemesterService.academicSemesterInToDb(bodyData);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Academic semester created successfully',
      data: result,
    });
  },
);
//get academic semester
const academicSemesterGet = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.academicSemesterGetFromDb();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic semester get successfully',
    data: result,
  });
});
//get single academic semester
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicSemesterService.academicSemesterSingleGetFromDb(
        req.params.id,
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semester single get successfully',
      data: result,
    });
  },
);
const updateAcademicSemesterInToDb = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.academicSemesterUpdateInToDb(
      req.body,
      req.params.id,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semester single update successfully',
      data: result,
    });
  },
);
export const academicSemesterController = {
  createAcademicSemester,
  academicSemesterGet,
  getSingleAcademicSemester,
  updateAcademicSemesterInToDb,
};
