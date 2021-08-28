import Activity from "@/jikopoint/models/activity";

export const createActivity = async (data) => {
  const created = await new Activity(data)
    .save()
    .then((createdActivity) => createdActivity)
    .catch((e) => new Error(e));

  return created;
};

export const getActivitysPerUser = async (appUser) => {
  return Activity.find({ appUser })
    .then((activities) => activities)
    .catch((e) => new Error(e));
};

export const getActivity = async (id) => {
  return Activity.findById(id)
    .then((activity) => activity)
    .catch((e) => new Error(e));
};

export const updateActivity = async (id, updates = {}) => {
  return Activity.findByIdAndUpdate(id, updates, {
    new: true, // returns newly updated user rather than the original db instance
    runValidators: true, // runs validation on the updated data
  })
    .then((activity) => activity)
    .catch((e) => new Error(e));
};

export const deleteActivity = async (id) => {
  return Activity.findByIdAndDelete(id)
    .then((activity) => activity)
    .catch((e) => new Error(e));
};
