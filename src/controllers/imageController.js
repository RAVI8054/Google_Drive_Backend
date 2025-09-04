// controllers/imageController.js
import Image from "../models/image.js"
import cloudinary from "../utils/cloudinary.js";

// 📌 Upload Image
export const uploadImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, folderId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "drive_images",
    });

    const newImage = await Image.create({
      user: userId,
      name,
      url: result.secure_url,
      public_id: result.public_id,
      folder: folderId || null, // ✅ supports nested folders
    });

    res.status(201).json(newImage);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error uploading image" });
  }
};

// 📌 Get All Images (optionally filter by folder)
export const getImages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { folderId } = req.query;

    const query = { user: userId };
    if (folderId) query.folder = folderId;

    const images = await Image.find(query).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ message: "Error fetching images" });
  }
};

// 📌 Search Images
export const searchImages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.json([]);
    }

    const images = await Image.find({
      user: userId,
      name: { $regex: q, $options: "i" }, // case-insensitive search
    }).sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Error searching images" });
  }
};

// 📌 Validators
export const validateUpload = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Image name is required" });
  }
  next();
};

export const validateSearch = (req, res, next) => {
  if (!req.query.q) {
    return res.status(400).json({ message: "Search query is required" });
  }
  next();
};
