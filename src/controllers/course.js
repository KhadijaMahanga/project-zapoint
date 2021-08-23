import Course from "@/jikopoint/models/course";

export const createCourse = async (data) => {
  const created = await new Course(data)
    .save()
    .then((createdCourse) => createdCourse)
    .catch((e) => new Error(e));

  return created;
};

export const getCourses = async () => {
  return Course.find({})
    .then((courses) => courses)
    .catch((e) => new Error(e));
};

export const getCourse = async (id) => {
  return Course.findById(id)
    .then((course) => course)
    .catch((e) => new Error(e));
};

export const updateCourse = async (id, updates = {}) => {
  return Course.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((course) => course)
    .catch((e) => new Error(e));
};

export const deleteCourse = async (id) => {
  return Course.findByIdAndDelete(id)
    .then((course) => course)
    .catch((e) => new Error(e));
};
