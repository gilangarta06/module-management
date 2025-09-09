import mongoose from 'mongoose';

declare global {
  var mongoose: { conn?: typeof mongoose, promise?: Promise<typeof mongoose> } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set in environment variables.');
}

async function connectToDatabase() {
  if (global.mongoose?.conn) {
    return global.mongoose.conn;
  }
  if (!global.mongoose) global.mongoose = {};
  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export { connectToDatabase };