import { getIO } from "./socket.js";

class SocketService {
  get io() {
    return getIO();
  }
}

export const socketService = new SocketService();
