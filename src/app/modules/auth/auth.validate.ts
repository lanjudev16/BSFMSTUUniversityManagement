import { z } from 'zod';
const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User Id is Required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
});
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required',
    }),
  }),
});
export const authValidation = {
  loginValidationSchema,
  changePasswordValidation,
  forgetPasswordValidationSchema,
};
