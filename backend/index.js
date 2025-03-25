import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.resolve();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}


//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


if(process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(path.join(dirPath, "frontend", "dist")));
  
  // Handle all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(dirPath, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
