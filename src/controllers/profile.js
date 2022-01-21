/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import { getUser, updateUser } from "@/jikopoint/controllers/user";
import Profile from "@/jikopoint/models/profile";

export const createProfile = async (data) => {
  const u = await getUser(data?.user);
  if (data?.name || data?.gender) {
    await updateUser(u?._id, { name: data?.name, gender: data?.gender }); // get matching user from db
  }
  const created = await new Profile({ ...data, user: u })
    .save()
    .then((profile) => profile)
    .catch((e) => new Error(e));

  return created;
};

export const getProfile = async (id) => {
  return Profile.findById(id)
    .then(async (p) => {
      const u = await getUser(p.user);
      p.user = u;
      return p;
    })
    .catch((e) => new Error(e));
};

export const getUserProfile = async (userId) => {
  const u = await getUser(userId);

  return Profile.findOne({ user: u?.id })
    .then((profile) => {
      profile.user = u;
      return profile;
    })
    .catch((e) => new Error(e));
};

export const updateProfile = async (id, updates = {}) => {
  const u = await getUser(updates?.user);
  if (updates?.name || updates?.gender) {
    await updateUser(u?._id, { name: updates?.name, gender: updates?.gender }); // get matching user from db
  }

  return Profile.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((profile) => profile)
    .catch((e) => new Error(e));
};

export const deleteProfile = async (id) => {
  return Profile.findByIdAndDelete(id)
    .then((profile) => profile)
    .catch((e) => new Error(e));
};
