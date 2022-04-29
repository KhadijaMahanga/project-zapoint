/* eslint-disable no-return-assign */
import User from "@/jikopoint/models/user";

/**
 * @param {string}    id
 * @returns {object} User Object
 */
export const getUser = async (id) => {
  let result = await User.findById(id)
    .select("-password")
    .then((user) => user)
    .catch((e) => new Error(e));

  if (!result || JSON.stringify(result) === "{}") {
    result = await User.findOne({ email: id })
      .select("-password")
      .then((user) => user)
      .catch((e) => new Error(e));
  }
  return result;
};

/**
 * @param   {string}    id            user id as a string
 * @param   {object}    updates       object containing any fields being updated
 * @returns {object}    updated user object`
 */
export const updateUser = async (id, updates = {}) => {
  const objectKeys = Object.keys(updates); // convert to an array of key names
  const user = await User.findById(id).select("-password"); // get matching user from db

  objectKeys.forEach((par) => (user[par] = updates[par]));

  const savedUser = await user
    .save() // user's password is hashed on each save, as a middleware operation
    .catch((e) => new Error(e));

  if (!savedUser) return new Error("could not update user");
  return Promise.resolve(savedUser);
};

/**
 * @param {string}    id  user id as a string
 * we don't really delete users, instead we mark them as deleted
 */
export const deleteUser = async (id) => {
  return updateUser(id, { isDeleted: true });
};

export const getUsers = async () => {
  return User.find({ isDeleted: false })
    .sort({ created_at: "desc" })
    .select("-__v")
    .select("-password")
    .then((users) => users)
    .catch((e) => new Error(e));
};

export const getAdminUsers = async () => {
  return User.find({ isDeleted: false, role: "admin" })
    .select("-__v")
    .select("-password")
    .then((users) => users)
    .catch((e) => new Error(e));
};

export const deleteAllUsers = async () => User.deleteMany().exec();
