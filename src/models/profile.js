import mongoose, { Schema } from "mongoose";

const MODEL_NAME = "Profile";

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile =
  mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, ProfileSchema);
export default Profile;
