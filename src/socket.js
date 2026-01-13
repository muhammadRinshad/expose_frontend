import { io } from "socket.io-client";

export const connectSocket = (userId) => {
  return io("http://localhost:5000", {
    auth: { userId },
    withCredentials: true
  });
};
