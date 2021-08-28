import Comment from "@/jikopoint/models/comment";

export const createComment = async (data) => {
  const created = await new Comment(data)
    .save()
    .then((createdComment) => createdComment)
    .catch((e) => new Error(e));

  return created;
};

export const getCommentsPerCourse = async (course) => {
  return Comment.find({ course })
    .then((comments) => comments)
    .catch((e) => new Error(e));
};

export const getComment = async (id) => {
  return Comment.findById(id)
    .then((comment) => comment)
    .catch((e) => new Error(e));
};

export const updateComment = async (id, updates = {}) => {
  return Comment.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((comment) => comment)
    .catch((e) => new Error(e));
};

export const deleteComment = async (id) => {
  return Comment.findByIdAndDelete(id)
    .then((comment) => comment)
    .catch((e) => new Error(e));
};
