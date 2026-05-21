import { NextRequest } from "next/server";
import { initSocket } from "@/lib/socket";

export async function GET(req: NextRequest) {
  // @ts-ignore
  const server = req.socket?.server;

  if (!server.io) {
    server.io = initSocket(server);
  }

  return new Response("Socket initialized");
}
