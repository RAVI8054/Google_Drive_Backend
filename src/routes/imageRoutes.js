import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  uploadImage,
  searchImages,
  getImages,
  validateUpload,
  validateSearch,
} from "../controllers/imageController.js";

const router = express.Router();

// Protect all routes
router.use(auth);

// Upload image (Cloudinary URL)
router.post("/", validateUpload, uploadImage);

// ✅ Get all user images (optionally by folderId)
router.get("/", getImages);

// Search images
router.get("/search", validateSearch, searchImages);

export default router;
