/* eslint-disable no-param-reassign */
import { getUser } from "@/jikopoint/controllers/user";
import Comment from "@/jikopoint/models/comment";

export const createComment = async (data) => {
  const commentor = await getUser(data.commentor);
  const created = await new Comment({ ...data, commentor })
    .save()
    .then((createdComment) => createdComment)
    .catch((e) => new Error(e));

  return created;
};

export const getRepliesPerComment = async (parent) => {
  const res = await Comment.find({ parent })
    .sort({ created_at: "desc" })
    .then((comments) => comments)
    .catch((e) => new Error(e));

  const result = await Promise.all(
    res?.map(async (c) => {
      const owner = await getUser(c.commentor);
      c.commentor = owner;
      return c;
    })
  ).then((p) => p);

  return result;
};

export const getCommentsPerCourse = async (course) => {
  const res = await Comment.find({ course, parent: null })
    .sort({ created_at: "desc" })
    .then((comments) => comments)
    .catch((e) => new Error(e));

  const result = await Promise.all(
    res?.map(async (c) => {
      const owner = await getUser(c.commentor);
      c.commentor = owner;
      return c;
    })
  ).then((p) => p);

  return result;
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
