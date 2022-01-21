/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { getCourse } from "@/jikopoint/controllers/course";
import { getUser } from "@/jikopoint/controllers/user";
import Enrolment from "@/jikopoint/models/enrolment";

export const createEnrolment = async (data) => {
  const student = await getUser(data.student);
  const created = await new Enrolment({ ...data, student })
    .save()
    .then((enrolment) => enrolment)
    .catch((e) => new Error(e));

  return created;
};

export const getEnrolmentPerUser = async (userId) => {
  return Enrolment.find({ student: userId })
    .then((data) => {
      return Promise.all(
        data?.map(async ({ _id, course }) => {
          const cs = await getCourse(course);
          return { enrolmentId: _id, course: cs };
        })
      );
    })
    .catch((e) => new Error(e));
};

export const getEnrolmentPerCourse = async (courseId) => {
  return Enrolment.find({ course: courseId })
    .then((enrolment) => enrolment)
    .catch((e) => new Error(e));
};

export const getAllEnrolments = async () => {
  const res = await Enrolment.find({})
    .sort({ created_at: "desc" })
    .then((courses) => courses)
    .catch((e) => new Error(e));

  const result = await Promise.all(
    res?.map(async (c) => {
      const student = await getUser(c.student);
      const course = await getCourse(c.course);
      c.student = student;
      c.course = course;
      return c;
    })
  ).then((p) => p);

  return result;
};

export const deleteEnrolment = async (id) => {
  return Enrolment.findByIdAndDelete(id)
    .then((enrolment) => enrolment)
    .catch((e) => new Error(e));
};
