import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "CourseCategory";

const CourseCategorySchema = new Schema(
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
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const CourseCategory =
  mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, CourseCategorySchema);

export default CourseCategory;
