import CourseCategory from "@/jikopoint/models/courseCategory";

export const createCategory = async (data) => {
  const created = await new CourseCategory(data)
    .save()
    .then((createdCategory) => createdCategory)
    .catch((e) => new Error(e));

  return created;
};

export const getCategories = async () => {
  return CourseCategory.find({})
    .sort({ created_at: "desc" })
    .then((categories) => categories)
    .catch((e) => new Error(e));
};

export const getCategory = async (id) => {
  return CourseCategory.findById(id)
    .then((category) => category)
    .catch((e) => new Error(e));
};

export const updateCategory = async (id, updates = {}) => {
  return CourseCategory.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((category) => category)
    .catch((e) => new Error(e));
};

export const deleteCategory = async (id) => {
  return CourseCategory.findByIdAndDelete(id)
    .then((category) => category)
    .catch((e) => new Error(e));
};
