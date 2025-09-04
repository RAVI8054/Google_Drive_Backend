// routes/folderRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createFolder, listByParent, validateCreate } from "../controllers/folderController.js";

const router = express.Router();

router.use(auth);

// Create folder
router.post("/", validateCreate, createFolder);

// Get folders (optionally by parent)
router.get("/", listByParent);

export default router;
