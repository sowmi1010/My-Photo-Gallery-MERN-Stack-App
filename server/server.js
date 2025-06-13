const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const photoRoutes = require("./routes/photoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api", photoRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/photo-gallery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));
