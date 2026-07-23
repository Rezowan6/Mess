import { SocketRoom } from "@/helpers/socket-room.js";
import { getIO } from "./socket.js";

class SocketService {
  get io() {
    return getIO();
  }

  emitToUser(userId: number, event: string, payload: unknown) {
    this.io.to(SocketRoom.user(userId)).emit(event, payload);
  }

  emitToTenant(tenantId: number, event: string, payload: unknown) {
    this.io.to(SocketRoom.tenant(tenantId)).emit(event, payload);
  }

  broadcast(event: string, payload: unknown) {
    this.io.emit(event, payload);
  }
}

export const socketService = new SocketService();
