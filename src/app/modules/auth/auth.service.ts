import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

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
    role: isUserExits?.role,
  };
  const accessToken = createToken(
    jsonPayLoad,
    config.jwt_secret_key as string,
    config.jwt_access_time as string,
  );
  const refreshToken = createToken(
    jsonPayLoad,
    config.jwt_refresh_secret_key as string,
    config.jwt_refresh_time as string,
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: isUserExits?.needsPasswordChange,
  };
};
const changePassword = async (
  userInfo: JwtPayload,
  payLoad: { oldPassword: string; newPassword: string },
) => {
  const isUserExits = await User.isUserExits(userInfo?.id);
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
    payLoad?.oldPassword,
    isUserExits?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }
  const newHasHPassword = await bcrypt.hash(
    payLoad?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await User.findOneAndUpdate(
    {
      id: userInfo.id,
      role: userInfo.role,
    },
    {
      password: newHasHPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
const forgetPassword = async (userId: string) => {
  //validation
  const isUserExits = await User.isUserExits(userId);
  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does not exits');
  }
  if (isUserExits?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User deleted');
  }
  if (isUserExits?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User blocked');
  }
  const jsonPayLoad = {
    id: isUserExits?.id,
    role: isUserExits?.role,
  };
  const resetToken = createToken(
    jsonPayLoad,
    config.jwt_resetUi_token as string,
    '10m',
  );
  const resetUiLink = `http://localhost:3000?id=${isUserExits.id}&token=${resetToken}`;
  console.log(resetUiLink);
};
export const authService = {
  loginUser,
  changePassword,
  forgetPassword,
};
