import express from "express";
import auth from "../middleware/authMiddleware.js";
import upload from "../utils/upload.js";
import { uploadImage, searchImages, validateUpload, validateSearch } from "../controllers/imageController.js";

const router = express.Router();

router.use(auth);

router.post("/", upload.single("image"), validateUpload, uploadImage);
router.get("/search", validateSearch, searchImages);

export default router;
