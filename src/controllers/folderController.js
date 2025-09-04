import Folder from "../models/Folder.js";
import Image from "../models/image.js";

// ✅ validation middleware (used in routes)
export const validateCreate = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Folder name is required" });
  }
  next();
};

// ✅ create folder (supports nested)
export const createFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    let parent = null;
    if (parentId) {
      parent = await Folder.findOne({ _id: parentId, user: req.user.id });
      if (!parent) {
        return res.status(404).json({ message: "Parent folder not found" });
      }
    }

    const folder = await Folder.create({
      name,
      user: req.user.id,  // 🔄 changed from _id → id
      parent: parent ? parent._id : null,
    });

    res.status(201).json(folder);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating folder", error: err.message });
  }
};

// ✅ list folders/images by parent
export const listByParent = async (req, res) => {
  try {
    const { parentId } = req.query;

    const folders = await Folder.find({
      user: req.user.id,   // 🔄 changed from _id → id
      parent: parentId || null,
    }).sort("name");

    const images = await Image.find({
      user: req.user.id,   // 🔄 changed from _id → id
      folder: parentId || null,
    }).sort("-createdAt");

    res.json({ folders, images });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching folder contents", error: err.message });
  }
};
