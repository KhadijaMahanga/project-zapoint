/* eslint-disable no-return-assign */
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

export const deleteEnrolment = async (id) => {
  return Enrolment.findByIdAndDelete(id)
    .then((enrolment) => enrolment)
    .catch((e) => new Error(e));
};
