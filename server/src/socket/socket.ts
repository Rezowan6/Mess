import { ApiError } from "@/utils/ApiError.js";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  /**
   * New Client Connected
   */
  io.on("connection", (socket) => {
    console.log("🟢 Client Connected");

    console.log("Socket ID:", socket.id);

    /**
     * Client Disconnected
     */

    socket.on("disconnect", () => {
      console.log("🔴 Client Disconnected");

      console.log("Socket ID:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new ApiError(404, "Socket.IO is not initialized.");
  }

  return io;
};
