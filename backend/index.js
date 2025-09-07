import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mlRoutes from "./routes/mlRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"; // ✅ new upload route
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload", uploadRoutes); 
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => res.send("dEventHub API is running..."));

// Error handler
app.use(errorHandler);

// Connect MongoDB & Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
