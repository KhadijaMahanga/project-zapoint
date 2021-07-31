/* eslint-disable prefer-promise-reject-errors */
import mongoose from "mongoose";

import User from "@/jikopoint/models/user";
import dbConnect from "@/jikopoint/utils/mongoose";

async function validateCredentials(user) {
  if (!user.password) {
    return Promise.reject(false);
  }

  if (mongoose.connections[0].readyState !== 1) {
    await dbConnect();
  }

  const dbUser = await User.findByEmail(user.email);

  if (!dbUser?.is_active) {
    return Promise.reject(false);
  }

  return dbUser.validPassword(user.password);
}

export default validateCredentials;
