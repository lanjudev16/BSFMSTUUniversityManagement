import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get(
  '/get-academic-semester',
  academicSemesterController.academicSemesterGet,
);
router.get(
  '/get-single-academic-semester/:id',
  academicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/update-academic-semester/:id',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  academicSemesterController.updateAcademicSemesterInToDb,
);
export const academicSemesterRouter = router;
