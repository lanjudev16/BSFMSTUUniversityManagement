import { Schema, model } from 'mongoose';
import {
  Guardian,
  Name,
  Student,
  TStudentModel,
  localGuardian,
} from './student.interface';
import validator from 'validator';
const studentNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    maxlength: [20, 'Max length is not allowed more than 20'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    validate: {
      validator: (values: string) => validator.isAlpha(values),
      message: '{VALUE} is not alphanumeric',
    },
  },
});
const studentGuardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherContactNumber: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherContactNumber: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
});
const studentLocalGuardianSchema = new Schema<localGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});
const studentSchema = new Schema<Student, TStudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'user',
    },
    name: studentNameSchema,
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not right email',
      },
    },
    avatar: String,
    permanentAddress: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    profileImage: String,
    guardian: studentGuardianSchema,
    localGuardian: {
      type: studentLocalGuardianSchema,
      required: [true, 'Local guardian is required'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
studentSchema.virtual('FullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
studentSchema.statics.isExits = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentModel = model<Student, TStudentModel>(
  'Student',
  studentSchema,
);
