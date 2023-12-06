import mongoose, { Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

export const academicSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);
academicSchema.pre('save', async function (next) {
  const isExitsSemester = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExitsSemester) {
    throw new Error('Semester already exits');
  }
  next();
});
export const AcademicSemester = mongoose.model<TAcademicSemester>(
  'academicSemester',
  academicSchema,
);
