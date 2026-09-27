// import { env } from "@/shared/config/env";
// import { io } from "socket.io-client";

// export const socket = io(env.socketUrl, {
//   withCredentials: true,
//   autoConnect: true,
// });

import { io } from "socket.io-client";

export const socket = io({
  withCredentials: true,
  autoConnect: false,
});
