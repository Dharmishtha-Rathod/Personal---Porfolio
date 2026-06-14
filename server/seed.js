import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";
import Skill from "./models/Skill.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/portfolio";

const projects = [
  {
    title: "Personal Portfolio Website",
    description: "A full-stack portfolio built with HTML/CSS/JS, Express, and MongoDB.",
    techStack: ["HTML", "CSS", "JavaScript", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://your-portfolio.netlify.app",
    featured: true,
  },
  {
    title: "Task Manager App",
    description: "A CRUD task manager with a REST API and MongoDB storage.",
    techStack: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "",
  },
  {
    title: "E-commerce Demo Store",
    description: "Product listing, cart, and checkout flow backed by a Node/Express API.",
    techStack: ["React", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/ecommerce-demo",
    liveUrl: "",
  },
];

const skills = [
  { name: "HTML / CSS", category: "Frontend", level: 90 },
  { name: "JavaScript", category: "Frontend", level: 85 },
  { name: "React.js", category: "Frontend", level: 75 },
  { name: "Node.js / Express", category: "Backend", level: 80 },
  { name: "MongoDB", category: "Database", level: 75 },
  { name: "Git & GitHub", category: "Tools", level: 85 },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Project.deleteMany({});
    await Skill.deleteMany({});

    await Project.insertMany(projects);
    await Skill.insertMany(skills);

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
