import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "UserRole";

const UserRoleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const UserRole =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, UserRoleSchema);

export default UserRole;
