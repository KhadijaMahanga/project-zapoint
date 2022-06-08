import mongoose from "mongoose";

import User from "@/jikopoint/models/user";
import dbConnect from "@/jikopoint/utils/mongoose";

async function loginUser({ email, password }) {
  if (!password) {
    return false;
  }
  if (mongoose.connections[0].readyState !== 1) {
    try {
      await dbConnect();
    } catch (e) {
      throw new Error("Samahani kuna tatizo la kiufundi. Jaribu tena baadae");
    }
  }
  const dbUser = await User.findByEmail(email);
  if (!dbUser) {
    throw new Error("Mtumiaji hajajiandikisha");
  }

  const isValidUser = dbUser?.validPassword(password);

  if (!isValidUser) {
    throw new Error("Barua pepe/nywila iliyotumika si sahisi");
  }
  return dbUser;
}

export default loginUser;
