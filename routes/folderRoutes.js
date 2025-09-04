import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createFolder, listByParent, validateCreate } from "../controllers/folderController.js";

const router = express.Router();

router.use(auth);

router.post("/", validateCreate, createFolder);
router.get("/", listByParent);

export default router;
