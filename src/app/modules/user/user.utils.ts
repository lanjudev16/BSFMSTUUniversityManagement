import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';
export const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 },
  )
    .lean()
    .sort({ createdAt: -1 });
  return lastStudent?.id ? lastStudent.id : undefined;
};
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  const lastStudentId = await findLastStudentId();
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentCode = lastStudentId?.substring(4, 6);
  let incrementId;
  let currentId;
  currentId = (0).toString().padStart(4, '0');
  if (
    lastStudentId &&
    lastStudentYear === payLoad.year &&
    lastStudentCode === payLoad.code
  ) {
    currentId = lastStudentId.substring(6);
  }
  incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
  return incrementId;
};
