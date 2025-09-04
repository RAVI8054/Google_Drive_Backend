import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    url: { type: String, required: true },
    publicId: { type: String },
    format: { type: String },
    size: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null, index: true },
  },
  { timestamps: true }
);

ImageSchema.index({ user: 1, name: 1 });

export default mongoose.model("Image", ImageSchema);
