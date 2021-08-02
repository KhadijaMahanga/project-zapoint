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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);
