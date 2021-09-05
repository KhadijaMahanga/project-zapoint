/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

import sendVerificationRequest from "./sendVerificationRequest";

import User from "@/jikopoint/models/user";
import dbConnect from "@/jikopoint/utils/mongoose";

function isJson(item) {
  let checkItem = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    checkItem = JSON.parse(checkItem);
  } catch (e) {
    return false;
  }

  if (typeof checkItem === "object" && checkItem !== null) {
    return true;
  }

  return false;
}

async function resetUserCredentials(credentials) {
  // logic here to look up the user from the credentials supplied
  const creds = isJson(credentials) ? credentials : JSON.parse(credentials);

  const { email } = creds;

  if (mongoose.connections[0].readyState !== 1) {
    await dbConnect();
  }

  const userExists = await User.findOne({ email }).exec();
  if (!userExists || userExists.isDeleted) {
    throw new Error("Hakuna mtumiaji mwenye barua pepe kama hiyo");
  }
  const status = "reset";
  return sendVerificationRequest(email, status);
}

export default resetUserCredentials;
