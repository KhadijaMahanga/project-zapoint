import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Enrollment";

const EnrollmentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Enrollment =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, EnrollmentSchema);

export default Enrollment;
