import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payLoad: ILoginUser) => {
  const isUserExits = await User.isUserExits(payLoad?.id);
  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does not exits');
  }
  if (isUserExits?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User deleted');
  }
  if (isUserExits?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User blocked');
  }
  const isPasswordMatch = await User?.checkPassword(
    payLoad?.password,
    isUserExits?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }
  const jsonPayLoad = {
    id: isUserExits?.id,
    password: isUserExits?.password,
  };
  const accessToken = jwt.sign(jsonPayLoad, config.jwt_secret_key as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
    needPasswordChange: isUserExits?.needsPasswordChange,
  };
};
export const authService = {
  loginUser,
};
