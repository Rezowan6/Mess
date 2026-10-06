import { tokenStorage } from "@/shared/utils/token";
import { io } from "socket.io-client";

export const socket = io({
  withCredentials: true,
  autoConnect: false,
  auth: {
    token: tokenStorage.get(),
  },
});
