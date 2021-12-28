import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Comment";

const CommentSchema = new Schema(
  {
    commentor: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    text: {
      type: String,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Comment =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, CommentSchema);

export default Comment;
