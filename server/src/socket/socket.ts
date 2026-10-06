import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { SocketEvent } from "./socket-event.js";

import { env } from "@/configs/env.js";
import { SocketRoom } from "@/helpers/socket-room.js";
import { ApiError } from "@/utils/ApiError.js";

import { MemberStatus } from "@/constans/index.js";
import { MealSession } from "@/modules/mealSession/mealSession.model.js";
import { TenantMembership } from "@/modules/tenantMembership/tenantMembership.model.js";

import { User } from "@/models/index.js";
import { verifyToken } from "@/utils/index.js";
import { logger } from "@/utils/logger.js";

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = verifyToken(token, env.ACCESS_TOKEN_SECRET);

      const user = await User.findByPk(decoded.id);

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.data.userId = user.id;

      next();
    } catch {
      next(new Error("Invalid authentication token"));
    }
  });

  /**
   * New Client Connected
   */
  io.on("connection", (socket) => {
    logger.info("🟢 Client Connected");
    logger.info({ socketId: socket.id }, "Socket connected");

    socket.on(
      SocketEvent.JOIN,
      async (payload: { tenantId: number; mealSessionId: number }) => {
        const { tenantId, mealSessionId } = payload;

        const userId = socket.data.userId;

        const membership = await TenantMembership.findOne({
          where: {
            userId,
            tenantId,
            status: MemberStatus.ACTIVE,
          },
        });

        if (!membership) {
          socket.emit(SocketEvent.ERROR, {
            message: "You are not an active member of this tenant.",
          });

          return;
        }

        const mealSession = await MealSession.findOne({
          where: {
            id: mealSessionId,
            tenantId,
          },
        });

        if (!mealSession) {
          socket.emit(SocketEvent.ERROR, {
            message: "Invalid meal session.",
          });

          return;
        }

        socket.join(SocketRoom.user(userId));

        socket.join(SocketRoom.tenant(tenantId));

        socket.join(SocketRoom.mealSession(tenantId, mealSessionId));
      },
    );

    /**
     * Client Disconnected
     */

    socket.on("disconnect", () => {
      logger.info("🔴 Client Disconnected");
      logger.info({ socketId: socket.id }, "Socket disconnected");
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
