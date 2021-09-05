import Reply from "@/jikopoint/models/reply";

export const createReply = async (data) => {
  const created = await new Reply(data)
    .save()
    .then((createdReply) => createdReply)
    .catch((e) => new Error(e));

  return created;
};

export const getRepliesPerUser = async (responder) => {
  return Reply.find({ responder })
    .then((replies) => replies)
    .catch((e) => new Error(e));
};

export const getRepliesPerComment = async (comment) => {
  return Reply.find({ comment })
    .then((replies) => replies)
    .catch((e) => new Error(e));
};

export const getReply = async (id) => {
  return Reply.findById(id)
    .then((reply) => reply)
    .catch((e) => new Error(e));
};

export const updateReply = async (id, updates = {}) => {
  return Reply.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((reply) => reply)
    .catch((e) => new Error(e));
};

export const deleteReply = async (id) => {
  return Reply.findByIdAndDelete(id)
    .then((reply) => reply)
    .catch((e) => new Error(e));
};
