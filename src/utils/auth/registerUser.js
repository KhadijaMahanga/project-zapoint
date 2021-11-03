/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

import sendVerificationRequest from "./sendVerificationRequest";

import { updateUser } from "@/jikopoint/controllers/user";
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

async function registerUser(credentials) {
  // logic here to look up the user from the credentials supplied
  const creds = isJson(credentials) ? credentials : JSON.parse(credentials);

  const { csrfToken, name, email, password, role } = creds;

  if (mongoose.connections[0].readyState !== 1) {
    await dbConnect();
  }

  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  const userExists = await User.findOne({ email }).exec();

  if (userExists && !userExists.isDeleted) {
    throw new Error("Mtumiaji mwenye barua pepe kama hiyo ameshajiandikisha");
  }
  try {
    if (userExists) {
      const updated = await updateUser(userExists.id, {
        isDeleted: "false",
        emailVerified: null,
      });
      if (!updated) {
        return Promise.resolve(false);
      }
      await sendVerificationRequest(updated.email, "register");
      return Promise.resolve(updated);
    }
    const doc = {
      name,
      role: role ?? "trainee",
      email,
      username: email,
      password,
    };

    const created = await new User(doc).save();
    if (!created) {
      return Promise.resolve(false);
    }

    await sendVerificationRequest(created.email, "register");
    return Promise.resolve(created);
  } catch (e) {
    throw new Error(e);
  }
}

export default registerUser;
