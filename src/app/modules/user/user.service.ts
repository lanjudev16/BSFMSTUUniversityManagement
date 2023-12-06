import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentInDb = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemesterData = await AcademicSemester.findById(
    studentData.admissionSemester,
  );
  // const findLastId=
  userData.id = await generateStudentId(
    admissionSemesterData as TAcademicSemester,
  );
  // userData.id = '2030100001';
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const result = await StudentModel.create(studentData);
    return result;
  }
};
export const UserService = {
  createStudentInDb,
};
