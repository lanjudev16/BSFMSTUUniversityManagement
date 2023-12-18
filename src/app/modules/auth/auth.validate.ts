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
export const authValidation = {
  loginValidationSchema,
};
