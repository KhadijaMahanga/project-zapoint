import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: Number,
    expires: Date,
    sessionToken: {
      type: String,
      unique: true,
    },
    accessToken: {
      type: String,
      unique: true,
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);
