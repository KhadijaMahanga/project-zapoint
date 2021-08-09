import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Lecture";

const LectureSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.String, ref: "LectureCategory" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Lecture =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, LectureSchema);

export default Lecture;
