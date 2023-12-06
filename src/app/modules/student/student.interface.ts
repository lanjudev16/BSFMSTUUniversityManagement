/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;

  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};
export type Name = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};
export type localGuardian = {
  name: string;
  occupation: string;
  contact: string;
};
export type Student = {
  id: string;
  name: Name;
  gender: 'Male' | 'Female';
  admissionSemester: Types.ObjectId;
  dateOfBirth?: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup: 'A+' | 'B+';
  email: string;
  avatar?: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  profileImage?: string;
  localGuardian: localGuardian;
  user: Types.ObjectId;
};
export type TStudentMethod = {
  isExits(id: string): Promise<Student | null>;
};
export type TStudentModel = Model<
  Student,
  Record<string, never>,
  TStudentMethod
>;
