const mongoose = require("mongoose");

// Serverless functions can be invoked many times without a fresh process,
// so we cache the connection on the global object instead of reconnecting
// (and exhausting MongoDB's connection limit) on every request.
let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongooseInstance) => {
      console.log("MongoDB Connected");
      console.log(`Database Name: ${mongooseInstance.connection.name}`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;
