import { Server } from "socket.io";

let io: Server;

export function initSocket(server: any) {
  if (!io) {
    io = new Server(server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);
    });
  }

  return io;
}

export function getIO() {
  if (!io) throw new Error("Socket not initialized");
  return io;
}
