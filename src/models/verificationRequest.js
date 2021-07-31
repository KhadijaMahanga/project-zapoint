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
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

export default models.VerificationRequest ||
  model("VerificationRequest", VerificationRequestsSchema);
