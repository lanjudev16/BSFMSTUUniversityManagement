import mongoose from 'mongoose';
import { TErrorReturn, TErrorSources } from '../../interface/error.interface';

const handleMongoesValidatorError = (
  err: mongoose.Error.ValidationError,
): TErrorReturn => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};
export default handleMongoesValidatorError;
