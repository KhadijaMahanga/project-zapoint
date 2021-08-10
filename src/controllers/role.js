import UserRole from "@/jikopoint/models/role";

export const createRole = async (data) => {
  const created = await new UserRole(data)
    .save()
    .then((createdRole) => createdRole)
    .catch((e) => new Error(e));

  return created;
};

export const getRoles = async () => {
  return UserRole.find({})
    .then((roles) => roles)
    .catch((e) => new Error(e));
};

export const getRole = async (id) => {
  return UserRole.findById(id)
    .then((role) => role)
    .catch((e) => new Error(e));
};

export const updateRole = async (id, updates = {}) => {
  return UserRole.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((role) => role)
    .catch((e) => new Error(e));
};

export const deleteRole = async (id) => {
  return UserRole.findByIdAndDelete(id)
    .then((role) => role)
    .catch((e) => new Error(e));
};
