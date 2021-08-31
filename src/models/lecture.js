import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Lecture";

const LectureSchema = new Schema(
  {
    no: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    video: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Lecture =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, LectureSchema);

export default Lecture;
