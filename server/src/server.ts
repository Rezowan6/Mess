import { env, sequelize } from "@/configs/index.js";
import { setupAssociations } from "@/models/associations.js";
import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = env.PORT || 4000;

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    setupAssociations();
    console.log("Database connected successfully");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });

    // shutdown
    process.on("SIGINT", async () => {
      console.log("\nShutting down server...");

      await mongoose.connection.close();

      server.close(() => {
        console.log("HTTP Server Closed");
        console.log("DB Connection Closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
