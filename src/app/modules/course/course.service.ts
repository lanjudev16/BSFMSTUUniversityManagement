import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse, TCoursefaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  );

  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remaining } = payload;
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, remaining, {
    new: true,
    runValidators: true,
  });
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deleteCourse = preRequisiteCourses.filter(
      (el) => el.course && el.isDeleted,
    );
    console.log(deleteCourse);
  }
  return updateBasicCourseInfo;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getSingleCourseFromDB,
  getAllCoursesFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  removeFacultiesFromCourseFromDB,
};
