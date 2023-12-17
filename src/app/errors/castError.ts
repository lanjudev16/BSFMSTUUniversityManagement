import mongoose from 'mongoose';
import { TErrorReturn, TErrorSources } from '../../interface/error.interface';

const handleCastError = (err: mongoose.Error.CastError): TErrorReturn => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  return {
    statusCode: 400,
    message: 'Invalid id',
    errorSources,
  };
};
export default handleCastError;
