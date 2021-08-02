import { models, model, Schema } from "mongoose";

const VerificationRequestsSchema = new Schema(
  {
    identifier: String,
    token: {
      type: String,
      unique: true,
    },
    expires: Date,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default models.VerificationRequest ||
  model("VerificationRequest", VerificationRequestsSchema);
