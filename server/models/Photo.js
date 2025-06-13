const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalName: String,
  size: Number,
  type: String,
  favorite: { type: Boolean, default: false }
}, { timestamps: true }); // includes createdAt & updatedAt automatically

module.exports = mongoose.model("Photo", photoSchema);
