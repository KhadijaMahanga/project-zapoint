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
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

const Account = models[MODEL_NAME] || model("Account", AccountSchema);

export default Account;
