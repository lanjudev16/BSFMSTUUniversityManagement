import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../../interface/error.interface';

export const handleZodError = (err: ZodError) => {
  const statusCode = 404;
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode: statusCode,
    message: 'Validation error',
    errorSources,
  };
};
