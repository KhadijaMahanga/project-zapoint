/* eslint-disable no-return-assign */
import Enrolment from "@/jikopoint/models/enrolment";

export const createEnrolment = async (data) => {
  const created = await new Enrolment(data)
    .save()
    .then((enrolment) => enrolment)
    .catch((e) => new Error(e));

  return created;
};

export const getEnrolmentPerUser = async (userId) => {
  return Enrolment.find({ student: userId })
    .then((enrolment) => enrolment)
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
