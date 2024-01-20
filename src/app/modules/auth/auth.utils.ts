import jwt from 'jsonwebtoken';
export const createToken = (
  payLoad: { id: string; role: string },
  secrete: string,
  time: string,
) => {
  return jwt.sign(payLoad, secrete, {
    expiresIn: time,
  });
};
