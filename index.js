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

const allowedOrigins = [
  "http://localhost:5173",
  "https://google-drive-clone-fronted.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed for this origin"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/images", imageRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "cloud-drive-backend" });
});

app.use(notFound);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`API running on http://localhost:${PORT}`)
);
