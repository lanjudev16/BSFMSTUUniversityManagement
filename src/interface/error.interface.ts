export type TErrorSources = {
  path: string | number;
  message: string;
}[];
export type TErrorReturn = {
  errorSources: {
    path: number | string;
    message: string;
  }[];
  message: string;
  statusCode: number;
};
