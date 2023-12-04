import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  const result = await UserService.createStudentInDb(password, student);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student created successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
};
