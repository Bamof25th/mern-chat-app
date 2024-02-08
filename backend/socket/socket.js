import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export  const getReciverSocketId = (reciverId) => {
    return userSocketMap[reciverId]
}

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  //sending to all clients except the sender
});

export { app, io, server };
