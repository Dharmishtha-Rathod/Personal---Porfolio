// ============================================
// CONFIG — change this to your deployed backend URL
// ============================================
const API_BASE = "https://your-backend-url.onrender.com/api";
// While testing locally use: const API_BASE = "http://localhost:5000/api";

// Fallback data shown if the API is unreachable (e.g. before backend is deployed)
const FALLBACK_PROJECTS = [
  {
    title: "Personal Portfolio Website",
    description: "A full-stack portfolio built with HTML/CSS/JS, Express, and MongoDB — the very site you're looking at.",
    techStack: ["HTML", "CSS", "JavaScript", "Express", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Task Manager App",
    description: "A CRUD task manager with user authentication and a REST API.",
    techStack: ["React", "Node.js", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    title: "E-commerce Demo Store",
    description: "Product listing, cart, and checkout flow backed by a Node/Express API.",
    techStack: ["React", "Express", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
  },
];

const FALLBACK_SKILLS = [
  { name: "HTML / CSS", category: "Frontend", level: 90 },
  { name: "JavaScript", category: "Frontend", level: 85 },
  { name: "React.js", category: "Frontend", level: 75 },
  { name: "Node.js / Express", category: "Backend", level: 80 },
  { name: "MongoDB", category: "Database", level: 75 },
  { name: "Git & GitHub", category: "Tools", level: 85 },
];

// ============================================
// Render projects
// ============================================
async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  let projects = FALLBACK_PROJECTS;

  try {
    const res = await fetch(`${API_BASE}/projects`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) projects = data;
    }
  } catch (err) {
    console.warn("Using fallback project data:", err.message);
  }

  grid.innerHTML = "";
  projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const tags = (p.techStack || [])
      .map((t) => `<span>${escapeHTML(t)}</span>`)
      .join("");

    card.innerHTML = `
      <h3>${escapeHTML(p.title)}</h3>
      <p>${escapeHTML(p.description)}</p>
      <div class="project-tags">${tags}</div>
      <div class="project-links">
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener">Code ↗</a>` : ""}
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener">Live ↗</a>` : ""}
      </div>
    `;
    grid.appendChild(card);
  });

  if (projects.length === 0) {
    grid.innerHTML = `<div class="empty-state">No projects yet — add some via the API.</div>`;
  }
}

// ============================================
// Render skills
// ============================================
async function loadSkills() {
  const grid = document.getElementById("skills-grid");
  let skills = FALLBACK_SKILLS;

  try {
    const res = await fetch(`${API_BASE}/skills`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) skills = data;
    }
  } catch (err) {
    console.warn("Using fallback skill data:", err.message);
  }

  grid.innerHTML = "";
  skills.forEach((s) => {
    const item = document.createElement("div");
    item.className = "skill-item";
    item.innerHTML = `
      <div class="skill-name">
        <span>${escapeHTML(s.name)}</span>
        <span>${s.level || 0}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-bar-fill" style="width: ${s.level || 0}%"></div>
      </div>
    `;
    grid.appendChild(item);
  });
}

// ============================================
// Contact form
// ============================================
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    status.textContent = "Sending…";

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      status.textContent = "Message sent — thank you!";
      form.reset();
    } catch (err) {
      status.textContent = "Could not send right now. Please email me directly.";
    }
  });
}

// ============================================
// Utils
// ============================================
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

// ============================================
// Init
// ============================================
loadProjects();
loadSkills();
setupContactForm();
