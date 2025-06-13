const Photo = require("../models/Photo");
const fs = require("fs");
const path = require("path");

// Upload photos
exports.uploadPhoto = async (req, res) => {
  try {
    const files = req.files;

    const photoDocs = files.map((file) => ({
      filename: file.filename,
      path: "/uploads/" + file.filename,
    }));

    const savedPhotos = await Photo.insertMany(photoDocs);

    res.status(201).json(savedPhotos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all photos
exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadedAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete photo
exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);

    if (photo) {
      fs.unlinkSync(path.join(__dirname, "..", "..", "server", photo.path));
      res.json({ message: "Photo deleted" });
    } else {
      res.status(404).json({ error: "Photo not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle favorite
exports.toggleFavorite = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    photo.favorite = !photo.favorite;
    await photo.save();
    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
