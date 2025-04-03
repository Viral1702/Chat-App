// Default Routes
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Coustoms Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

// Impoert App
import { app, server } from "./lib/socket.js";

// Default middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Coustom middlewares
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

dotenv.config();
const PORT = process.env.PORT;

server.listen(5001, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
