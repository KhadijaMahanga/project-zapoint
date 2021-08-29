import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Activity";

const ActivitySchema = new Schema(
  {
    appUser: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Activity =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, ActivitySchema);

export default Activity;
