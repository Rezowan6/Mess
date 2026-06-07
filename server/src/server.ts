import "dotenv/config";
import { env } from "@/configs/env.js";
import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./configs/db.js";

const PORT = env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // shutdown
    process.on("SIGINT", async () => {
      console.log("\nShutting down server...");

      await mongoose.connection.close();

      server.close(() => {
        console.log("HTTP Server Closed");
        console.log("MongoDB Connection Closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
