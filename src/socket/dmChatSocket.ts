import { io, Socket } from "socket.io-client";

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL;

const socket: Socket = io(`${BACKEND_URL}/dmChat`, {
  transports: ["websocket"],
  auth: {
    token: localStorage.getItem("accessToken")
      ? `Bearer ${localStorage.getItem("accessToken")}`
      : "",
  },
  query: { userId: localStorage.getItem("userId") },
  //   query: { userId: 1 },
});

export default socket;
