import Joi from 'joi';

const nameSchema = Joi.object({
  firstName: Joi.string().trim().required().max(20),
  middleName: Joi.string(),
  lastName: Joi.string().alphanum(),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContactNumber: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNumber: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contact: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: nameSchema.required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  dateOfBirth: Joi.string(),
  contactNumber: Joi.string().required(),
  emergencyContactNumber: Joi.string().required(),
  bloodGroup: Joi.string().valid('A+', 'B+').required(),
  email: Joi.string().email().required(),
  avatar: Joi.string(),
  permanentAddress: Joi.string().required(),
  presentAddress: Joi.string().required(),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
  profileImage: Joi.string(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
});

export default studentValidationSchema;
