import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();
import path from "path";
import fs from "fs";

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

// Serve images from a static folder
const __dirname = path.resolve();
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to download an image
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath); // Download the image
  } else {
    res.status(404).json({ error: "File not found" });
  }
});




export default router;
