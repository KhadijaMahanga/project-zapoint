import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Course";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "approved",
        "denied",
        "pending approval",
        "not submitted for approval",
      ],
      default: "not submitted for approval",
    },
    image: {
      type: String,
      lowercase: true,
    },
    instructor: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.String, ref: "CourseCategory" },
    enrolment: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Course =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, CourseSchema);

export default Course;
