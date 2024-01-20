/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  passwordChangeAt: Date;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExits(id: string): Promise<TUser>;
  checkPassword(password: string, hashPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangeTimeStamp:Date,jwtPasswordIssued:number): Promise<boolean>;
}

export type TUerRole = keyof typeof USER_ROLE;
