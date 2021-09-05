/* eslint-disable no-return-assign */
import Profile from "@/jikopoint/models/profile";
import User from "@/jikopoint/models/user";

export const createProfile = async (data) => {
  if (data?.name) {
    const user = await User.findById(data?.user); // get matching user from db
    user.name = data.name;
    await user
      .save() // user's password is hashed on each save, as a middleware operation
      .catch((e) => new Error(e));
  }
  const created = await new Profile(data)
    .save()
    .then((profile) => profile)
    .catch((e) => new Error(e));

  return created;
};

export const getProfile = async (userId) => {
  return Profile.findOne({ user: userId })
    .then((profile) => profile)
    .catch((e) => new Error(e));
};

export const updateProfile = async (id, updates = {}) => {
  if (updates?.name) {
    const user = await User.findById(updates?.user); // get matching user from db
    user.name = updates.name;
    await user
      .save() // user's password is hashed on each save, as a middleware operation
      .catch((e) => new Error(e));
  }
  return Profile.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((profile) => profile)
    .catch((e) => new Error(e));
};

export const deleteProfile = async (userId) => {
  return Profile.findOneAndDelete({ user: userId })
    .then((profile) => profile)
    .catch((e) => new Error(e));
};
