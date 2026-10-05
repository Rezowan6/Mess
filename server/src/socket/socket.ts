import { env } from "@/configs/env.js";
import { SocketRoom } from "@/helpers/socket-room.js";
import { ApiError } from "@/utils/ApiError.js";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { SocketEvent } from "./socket-event.js";

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true,
    },
  });

  /**
   * New Client Connected
   */
  io.on("connection", (socket) => {
    console.log("🟢 Client Connected");

    console.log("Socket ID:", socket.id);

    socket.on(
      SocketEvent.JOIN,
      (payload: {
        userId: number;
        tenantId: number;
        mealSessionId: number;
      }) => {
        const { tenantId, userId, mealSessionId } = payload;

        socket.join(SocketRoom.user(userId));

        socket.join(SocketRoom.tenant(tenantId));

        socket.join(SocketRoom.mealSession(tenantId, mealSessionId));

        console.log(socket.rooms);

        console.log(`✅ User ${userId} joined room user:${userId}`);

        console.log(`✅ User ${userId} joined tenant:${tenantId}`);

        console.log(`✅ User ${userId} joined meal-session:${mealSessionId}`);
      },
    );

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
