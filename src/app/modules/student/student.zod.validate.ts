import { z } from 'zod';

const nameSchema = z.object({
  firstName: z.string().min(1).max(20).trim(),
  middleName: z.string(),
  lastName: z.string().refine((value) => /^[a-zA-Z]*$/.test(value), {
    message: 'Last name must be alphanumeric',
  }),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherContactNumber: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContactNumber: z.string(),
  motherOccupation: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contact: z.string(),
});

const studentZodSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: nameSchema,
      gender: z.enum(['Male', 'Female']),
      dateOfBirth: z.string(),
      contactNumber: z.string(),
      emergencyContactNumber: z.string(),
      bloodGroup: z.enum(['A+', 'B+']),
      email: z.string().email(),
      avatar: z.string(),
      permanentAddress: z.string(),
      presentAddress: z.string(),
      profileImage: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
    }),
  }),
});
export default studentZodSchema;
