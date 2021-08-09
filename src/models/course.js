import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Course";

const CourseSchema = new Schema(
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
    category: { type: Schema.Types.String, ref: "CourseCategory" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Course =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, CourseSchema);

export default Course;
