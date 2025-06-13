const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadPhoto,
  getPhotos,
  deletePhoto,
  toggleFavorite,
} = require("../controllers/photoController");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.array("images", 10), uploadPhoto); // Upload
router.get("/photos", getPhotos);                                // Get All
router.delete("/photo/:id", deletePhoto);                        // Delete
router.put("/photo/favorite/:id", toggleFavorite);               // Favorite Toggle

module.exports = router;
