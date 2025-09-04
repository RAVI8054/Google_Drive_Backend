import Image from "../models/image.js";

// 📌 Upload Image (from frontend → Cloudinary → backend)
export const uploadImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, url, folderId, publicId, format, size } = req.body;

    if (!url) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const newImage = await Image.create({
      user: userId,
      name,
      url,
      publicId: publicId || null,
      format: format || null,
      size: size || null,
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
  if (!req.body.url) {
    return res.status(400).json({ message: "Image URL is required" });
  }
  next();
};

export const validateSearch = (req, res, next) => {
  if (!req.query.q) {
    return res.status(400).json({ message: "Search query is required" });
  }
  next();
};
