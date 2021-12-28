/* eslint-disable no-param-reassign */
import { getUser } from "@/jikopoint/controllers/user";
import Course from "@/jikopoint/models/course";

export const createCourse = async (data) => {
  const created = await new Course(data)
    .save()
    .then((createdCourse) => createdCourse)
    .catch((e) => new Error(e));

  return created;
};

export const getAllCourses = async () => {
  const res = await Course.find({})
    .then((courses) => courses)
    .catch((e) => new Error(e));

  return res;
};

export const getCourses = async () => {
  const res = await Course.find({ isArchived: false, status: "approved" })
    .sort({ created_at: "desc" })
    .then((courses) => courses)
    .catch((e) => new Error(e));

  const result = await Promise.all(
    res?.map(async (c) => {
      const owner = await getUser(c.instructor);
      c.instructor = owner;
      return c;
    })
  ).then((p) => p);
  return result;
};

export const getInstructorCourses = async (instructor) => {
  return Course.find({ instructor, isArchived: false })
    .then((courses) => courses)
    .catch((e) => new Error(e));
};

export const getCourse = async (id) => {
  const c = await Course.findById(id)
    .then((course) => course)
    .catch((e) => new Error(e));

  const instructorProfile = await getUser(c.instructor);
  c.instructor = instructorProfile;
  return c;
};

export const updateCourse = async (id, updates = {}) => {
  return Course.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((course) => course)
    .catch((e) => new Error(e));
};

// we don't delete course
// instead we archive them
export const deleteCourse = async (id) => {
  return updateCourse(id, { isArchived: true });
};
