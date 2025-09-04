import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createFolder, listByParent, validateCreate } from "../controllers/folderController.js";

const router = express.Router();

router.post("/", protect, validateCreate, createFolder);
router.get("/", protect, listByParent);

export default router;
