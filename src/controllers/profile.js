/* eslint-disable no-return-assign */
import Profile from "@/jikopoint/models/profile";

export const createProfile = async (data) => {
  const created = await new Profile(data)
    .save()
    .then((profile) => profile)
    .catch((e) => new Error(e));

  return created;
};

export const getProfile = async (userId) => {
  return Profile.find({ user: userId })
    .then((profile) => profile)
    .catch((e) => new Error(e));
};

export const updateProfile = async (id, updates = {}) => {
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
