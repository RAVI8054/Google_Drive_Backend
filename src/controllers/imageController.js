import Image from "../models/image.js";

// 🖼️ Create image
export const createImage = async (req, res) => {
  try {
    const { name, url, publicId, format, size, folderId } = req.body;

    if (!name || !url) {
      return res.status(400).json({ message: "Name and URL are required" });
    }

    const image = await Image.create({
      name,
      url,
      publicId,
      format,
      size,
      folder: folderId || null,
      user: req.user.id, // ✅ fixed (was _id before)
    });

    res.status(201).json(image);
  } catch (err) {
    console.error("Create image error:", err);
    res.status(500).json({ message: "Failed to create image" });
  }
};

// 📂 Get images (support filtering by folder)
export const getImages = async (req, res) => {
  try {
    const { parentId } = req.query;

    const images = await Image.find({
      user: req.user.id, // ✅ fixed for consistency
      folder: parentId || null,
    });

    res.json({ images });
  } catch (err) {
    console.error("Get images error:", err);
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

// 🗑️ Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // ✅ fixed for consistency
    });

    if (!image) return res.status(404).json({ message: "Image not found" });

    res.json({ message: "Image deleted", image });
  } catch (err) {
    console.error("Delete image error:", err);
    res.status(500).json({ message: "Failed to delete image" });
  }
};
