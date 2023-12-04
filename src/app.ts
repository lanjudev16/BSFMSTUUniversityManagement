/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app: Application = express();
//parser
app.use(express.json());
app.use(cors());
//application routes
app.use('/api/v1', router);
//home route
app.get('/', (req: Request, res: Response) => {
  res.send('Setup done');
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
