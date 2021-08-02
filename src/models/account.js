import { models, model, Schema } from "mongoose";

const MODEL_NAME = "Account";

const AccountSchema = new Schema(
  {
    compoundId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    userId: {
      type: Number,
      index: true,
    },
    providerType: String,
    providerId: {
      type: String,
      index: true,
    },
    providerAccountId: {
      type: String,
      index: true,
    },
    refreshToken: String,
    accessToken: String,
    accessTokenExpires: Date,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Account = models[MODEL_NAME] || model("Account", AccountSchema);

export default Account;
