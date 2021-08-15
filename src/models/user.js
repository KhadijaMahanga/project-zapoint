import bcrypt from "bcryptjs";
import { Schema, models, model } from "mongoose";
import validator from "validator";

const MODEL_NAME = "User";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email is invalid");
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Sorry password must be longer than 6 chars"],
      validate(value) {
        if (value && value.toLowerCase().includes("password"))
          throw new Error("password cannot be 'password'");
      },
    },
    emailVerified: {
      type: Date,
    },
    accounts: [
      {
        type: Schema.Types.ObjectId,
        default: undefined,
        ref: "Account",
      },
    ],
    sessions: [
      {
        type: Schema.Types.ObjectId,
        default: undefined,
        ref: "Session",
      },
    ],
    image: {
      type: String,
      lowercase: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "UserRole",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
); // automatically add while insert or update the object

UserSchema.statics.findByEmail = async function (email) {
  const currentUser = this;
  const user = await currentUser.findOne({ email }).exec();
  return user;
};

// this pre method runs as middleware before each save
UserSchema.pre("save", async function (next) {
  console.log("-------runnin presave => hash pw + default image-------");
  const user = this;
  // check to see if password is being modified
  if (user.isModified("password")) {
    // hash password if modified
    console.log("----hashing user password----");
    user.password = await user.simpleHashPassword(user.password);
  }

  // add default user image if not already added
  // if (!user.image) {
  //   console.log('----default user image----')
  //   user.image = `https://www.avatarapi.com/js.aspx?email=${user.email}&size=128"`;
  // }
  console.log("pre save completed => user defaults applied");
  next();
});

UserSchema.methods.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.simpleHashPassword = async function (password) {
  return bcrypt.hash(password, 8);
};

UserSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

const User = models[MODEL_NAME] || model(MODEL_NAME, UserSchema);

export default User;
