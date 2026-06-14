import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST a new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const saved = await new Message({ name, email, message }).save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all messages (for admin use)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
