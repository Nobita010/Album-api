const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const albumsFilePath = path.join(__dirname, "../data/albums.json");

// Ensure the data directory and albums.json file exist
if (!fs.existsSync(path.join(__dirname, "../data"))) {
  fs.mkdirSync(path.join(__dirname, "../data"));
}
if (!fs.existsSync(albumsFilePath)) {
  fs.writeFileSync(albumsFilePath, JSON.stringify({ albums: [] }, null, 2));
}

// Get album list
router.get("/list", (req, res) => {
  fs.readFile(albumsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read album data" });
    }
    const albums = JSON.parse(data);
    res.json(albums);
  });
});

// Add new album
router.post("/add", (req, res) => {
  const { type, url } = req.body;
  if (!type || !url) {
    return res.status(400).json({ error: "Type and URL are required" });
  }

  fs.readFile(albumsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read album data" });
    }
    const albums = JSON.parse(data);
    albums.albums.push({ type, url });
    fs.writeFile(albumsFilePath, JSON.stringify(albums, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save album data" });
      }
      res.json({ message: "Album added successfully" });
    });
  });
});

module.exports = router;
