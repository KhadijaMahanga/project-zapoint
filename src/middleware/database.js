import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB = process.env.MONGODB;

if (!MONGODB_URI || !MONGODB) {
  throw new Error(
    "Please define the MONGODB_URI and MONGODB environment variable inside .env.local"
  );
}

async function database(req, res, next) {
  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
  try {
    if (!cached.conn) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useFindAndModify: false,
        useCreateIndex: true,
      };

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
      cached.conn = await cached.promise;
    }
  } catch (err) {
    console.log(err);
  }

  req.mongoose = cached;
  return next();
}

export default database;
