import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Enrolment";

const EnrolmentSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

EnrolmentSchema.index({ student: 1, course: 1 }, { unique: true });

const Enrolment =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, EnrolmentSchema);

export default Enrolment;
