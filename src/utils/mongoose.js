/* eslint-disable consistent-return */
const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;
const { MONGODB } = process.env;

if (!MONGODB_URI || !MONGODB) {
  throw new Error(
    "Please define the MONGODB_URI and MONGODB environment variable inside .env.local"
  );
}

const connection = {}; /* creating connection object */

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  bufferCommands: false,
  bufferMaxEntries: 0,
  useFindAndModify: false, // uses findOneAndUpdate instead
};

async function dbConnect() {
  /* check if we have connection to our databse */
  if (connection.isConnected) {
    return;
  }
  /* connecting to our database */
  const db = await mongoose.connect(MONGODB_URI, options);
  connection.isConnected = db.connections[0].readyState;

  // console.log(db)
  return connection;
}

export default dbConnect;
