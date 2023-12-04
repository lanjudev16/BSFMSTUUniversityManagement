import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemesterModel';

const academicSemesterInToDb = async (payLoad: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payLoad.name] != payLoad.code) {
    throw new Error('Invalid semester');
  }
  const result = await AcademicSemester.create(payLoad);
  return result;
};
const academicSemesterGetFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const academicSemesterSingleGetFromDb = async (payLoad: string) => {
  const result = await AcademicSemester.findOne({ _id: payLoad });
  return result;
};
//academic semester update
const academicSemesterUpdateInToDb = async (payLoad: TAcademicSemester) => {
  const result = await AcademicSemester.updateOne();
  return result;
};
export const academicSemesterService = {
  academicSemesterInToDb,
  academicSemesterGetFromDb,
  academicSemesterSingleGetFromDb,
  academicSemesterUpdateInToDb,
};
