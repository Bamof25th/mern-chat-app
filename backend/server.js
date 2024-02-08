import path from "path";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { connectusingMongoose } from "./config/mongodb.connect.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

//envs
dotenv.config();
let port = process.env.PORT || 8000;

const __dirname = path.resolve();
// middlewares
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "frontend", "dist", "index.html"));
});

// listener
server.listen(port, () => {
  connectusingMongoose();
  console.log(`Server started on ${port}`);
});
