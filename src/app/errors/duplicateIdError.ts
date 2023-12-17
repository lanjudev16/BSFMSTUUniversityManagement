import { TErrorReturn, TErrorSources } from '../../interface/error.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateIdError = (err: any): TErrorReturn => {
  const errorSources: TErrorSources = Object.values(err?.keyValue).map(
    (val) => {
      return {
        path: '',
        message: `${val} is already exits`,
      };
    },
  );
  return {
    statusCode: 400,
    message: 'Duplicate value',
    errorSources,
  };
};
export default handleDuplicateIdError;
