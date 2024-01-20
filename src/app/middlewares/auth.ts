import { NextFunction, Request, Response } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { TUerRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

export const auth = (...userRole: TUerRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }
    const decoded = Jwt.verify(
      token,
      config.jwt_secret_key as string,
    ) as JwtPayload;
    const { id, role, iat } = decoded;

    req.user = decoded;
    const isUser = await User.isUserExits(id);
    const isHackedPassword = await User.isJWTIssuedBeforePasswordChanged(
      isUser?.passwordChangeAt,
      iat as number,
    );
    if (isHackedPassword) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User token hacked');
    }
    if (isUser?.status === 'blocked') {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User blocked');
    }
    if (!userRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User UNAUTHORIZED');
    }
    next();
  });
};
