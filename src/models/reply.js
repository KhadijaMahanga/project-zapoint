import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Reply";

const ReplySchema = new Schema(
  {
    responder: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: Schema.Types.ObjectId, ref: "Comment" },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Reply =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, ReplySchema);

export default Reply;
