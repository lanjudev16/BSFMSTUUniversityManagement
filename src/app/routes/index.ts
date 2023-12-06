import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { UserRoute } from '../modules/user/user.route';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/academic',
    route: academicSemesterRouter,
  },
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoutes,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
