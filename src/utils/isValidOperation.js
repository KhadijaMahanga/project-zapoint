const allowedFields = {
  user: ["name", "password"],
  role: ["name"],
  course: ["name", "description", "courseCategory", "image", "lecture"],
};

// all fields must exist for this to return true
export default function isValidOperation(type, fields) {
  const updates = Object.keys(fields);
  const isValid = updates.every((update) => {
    // only returns true if each and every iteration evaluates to truthy,
    // if any one iteration evaluates to false then it returns false.
    return allowedFields[type].includes(update); // ensures fields are allowed to be updated
  });
  return isValid;
}
