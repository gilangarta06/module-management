import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  // Will be handled later, but keep TS happy.
  // In runtime, developer must provide MONGODB_URI.
}

let cached = (global as any)._mongoose;

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // useNewUrlParser and useUnifiedTopology are default in mongoose >=6
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
