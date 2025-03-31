// Default Routes
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Coustoms Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

const app = express();

// Default middlewares
app.use(express.json());
app.use(cookieParser());

// Coustom middlewares
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

dotenv.config();
const PORT = process.env.PORT;
app.listen(5001, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
