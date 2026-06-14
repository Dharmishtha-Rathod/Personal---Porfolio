import express from "express";
import Skill from "../models/Skill.js";

const router = express.Router();

// GET all skills
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE skill
router.post("/", async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const saved = await skill.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE skill
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Skill not found" });
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
