import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Successfully connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
