import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "User";

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      lowercase: true,
    },
    last_name: {
      type: String,
      lowercase: true,
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    is_superuser: {
      type: String,
      required: true,
    },
    is_active: {
      type: String,
      required: true,
    },
    is_deleted: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
); //automatically add while insert or update the object

const User =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, UserSchema);

export default User;
