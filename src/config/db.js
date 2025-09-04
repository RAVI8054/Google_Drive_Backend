import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error(" MONGO_URI not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { autoIndex: true });
    console.log(" MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

export default connectDB;
