import express from "express";
import auth from "../middleware/authMiddleware.js";
import { createImage, getImages, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

//  Create image (metadata from frontend after Cloudinary upload)
router.post("/", auth, createImage);

//  Get all images (optionally by folder)
router.get("/", auth, getImages);

// Delete image
router.delete("/:id", auth, deleteImage);

export default router;
