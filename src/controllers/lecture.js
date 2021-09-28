import Lecture from "@/jikopoint/models/lecture";

export const createLecture = async (data) => {
  const created = await new Lecture(data)
    .save()
    .then((createdLecture) => createdLecture)
    .catch((e) => new Error(e));

  return created;
};

export const getLectures = async () => {
  return Lecture.find({})
    .then((lectures) => lectures)
    .catch((e) => new Error(e));
};

export const getLecturesPerCourse = async (course) => {
  return Lecture.find({ course })
    .then((lectures) => lectures)
    .catch((e) => new Error(e));
};

export const updateLecture = async (id, updates = {}) => {
  const v = await Lecture.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((lecture) => lecture)
    .catch((e) => new Error(e));

  return v;
};

export const deleteLecture = async (id) => {
  return Lecture.findByIdAndDelete(id)
    .then((lecture) => lecture)
    .catch((e) => new Error(e));
};
