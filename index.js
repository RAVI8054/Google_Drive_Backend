// backend/index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import folderRoutes from "./src/routes/folderRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

// ✅ Allowed origins (no trailing slash!)
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://google-drive-clone-fronted.vercel.app" // deployed frontend
];

// ✅ CORS middleware (must be before routes)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Thunder Client / curl
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS not allowed for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Explicitly handle OPTIONS preflight for all routes
app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/images", imageRoutes);

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "cloud-drive-backend" });
});

// ✅ Middleware
app.use(notFound);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
