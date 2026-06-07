import { env } from "@/configs/env.js";
import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl = env.DB_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is missing");
    }
    await mongoose.connect(mongoUrl);

    console.log("Mongoose atlas connect success!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
    } else {
      console.error("Unknown MongoDB connection error");
    }

    process.exit(1);
  }
};

export default connectDB;
