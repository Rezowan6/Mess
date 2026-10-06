import { env } from "@/shared/config/env";
import { tokenStorage } from "@/shared/utils/token";
import { io } from "socket.io-client";

export const socket = io(env.socketUrl, {
  withCredentials: true,
  autoConnect: false,
  auth: {
    token: tokenStorage.get(),
  },
});
