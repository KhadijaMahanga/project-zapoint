import mongoose from "mongoose";

import dbConnect from "@/jikopoint/utils/mongoose";

const database = async (req, res, next) => {
  // https://mongoosejs.com/docs/api.html#connection_Connection-readyState
  if (mongoose.connections[0].readyState !== 1) {
    await dbConnect();
  }
  return next();
};
export default database;
