import { io } from "socket.io-client";

// for development
// export const socket = io(env.socketUrl, {
//   withCredentials: true,
//   autoConnect: true,
// });

// for production
export const socket = io({
  withCredentials: true,
  autoConnect: false,
});
