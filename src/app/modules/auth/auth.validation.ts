import { z } from 'zod';
export const authValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    password: z.string(),
  }),
});
