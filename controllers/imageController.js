import Image from "../models/Image.js";   // 
import { Folder } from "../models/Folder.js";

// ✅ validate upload request
export const validateUpload = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Image name is required" });
  }
  if (!req.body.folderId) {
    return res.status(400).json({ message: "Folder ID is required" });
  }
  next();
};

// ✅ upload image
export const uploadImage = async (req, res) => {
  try {
    const { name, folderId } = req.body;

    // check folder ownership
    const folder = await Folder.findOne({ _id: folderId, user: req.user._id });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // check file
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const image = await Image.create({
      name,
      user: req.user._id,
      folder: folder._id,
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: "Error uploading image", error: err.message });
  }
};

// ✅ validate search query
export const validateSearch = (req, res, next) => {
  if (!req.query.q) {
    return res.status(400).json({ message: "Search query 'q' is required" });
  }
  next();
};

// ✅ search images by name (user-specific)
export const searchImages = async (req, res) => {
  try {
    const q = req.query.q || "";
    const regex = new RegExp(q, "i");

    const images = await Image.find({
      user: req.user._id,
      name: regex,
    })
      .sort("-createdAt")
      .limit(100);

    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error searching images", error: err.message });
  }
};
