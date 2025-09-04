import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null, index: true },
  },
  { timestamps: true }
);

FolderSchema.index({ user: 1, parent: 1, name: 1 }, { unique: true });

export default mongoose.model("Folder", FolderSchema);
