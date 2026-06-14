# Personal Portfolio Website — Full Stack (MERN-style)

## 📁 Project Structure
```
portfolio/
├── client/          → Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   └── app.js
└── server/          → Backend (Node.js + Express + MongoDB)
    ├── server.js
    ├── seed.js
    ├── models/
    ├── routes/
    ├── package.json
    └── .env.example
```

---

## 🇮🇳 Step-by-Step Guide (Gujarati)

નીચે આપેલા સ્ટેપ્સ ફોલો કરો — local run, GitHub upload, Drive submission અને live deploy (URL) બધું covered છે.

### Step 1: Files Download/Save કરો
આ બધી files ને તમારા computer પર `portfolio` નામની folder માં save કરો (જે structure ઉપર બતાવ્યું છે એ પ્રમાણે).

### Step 2: Backend Setup (Local Testing)
1. Terminal/Command Prompt ખોલો.
2. `server` folder માં જાઓ:
   ```
   cd portfolio/server
   ```
3. Dependencies install કરો:
   ```
   npm install
   ```
4. `.env.example` ફાઈલ ની copy કરી `.env` નામની નવી ફાઈલ બનાવો અને MongoDB connection string નાખો:
   - MongoDB Atlas (free) પર account બનાવો: https://www.mongodb.com/cloud/atlas
   - "Connect" → "Drivers" પર જાઈ connection string copy કરો
   - `.env` ફાઈલ માં:
     ```
     PORT=5000
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
     ```
5. Sample data નાખવા માટે (optional):
   ```
   node seed.js
   ```
6. Server start કરો:
   ```
   npm start
   ```
   → `Server running on port 5000` દેખાવું જોઈએ.

### Step 3: Frontend Test કરો (Local)
1. `client/app.js` માં `API_BASE` ને `http://localhost:5000/api` કરો (testing માટે).
2. `client/index.html` ફાઈલ ને browser માં ખોલો (double-click) — તમારી portfolio site દેખાશે, projects/skills backend માંથી load થશે.

---

## 🐙 Step 4: GitHub પર Upload કરવું

1. GitHub.com પર account બનાવો (જો ના હોય તો).
2. નવી repository બનાવો — નામ: `personal-portfolio` (Public રાખો).
3. તમારા computer પર terminal માં `portfolio` folder ના root માં જાઓ:
   ```
   cd portfolio
   git init
   git add .
   git commit -m "Initial commit - full stack portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/personal-portfolio.git
   git push -u origin main
   ```
4. ✅ હવે તમારી repository GitHub પર live છે — link આ format માં હશે:
   `https://github.com/<your-username>/personal-portfolio`

> Note: `.gitignore` ફાઈલ already આપેલી છે જે `node_modules` અને `.env` ને GitHub પર upload થતા રોકશે (security માટે જરૂરી).

---

## ☁️ Step 5: Backend Deploy કરો (Render — free)

1. https://render.com પર account બનાવો (GitHub થી sign in કરો).
2. "New +" → "Web Service" પસંદ કરો.
3. તમારી GitHub repository connect કરો.
4. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Environment Variables ઉમેરો:
   - `MONGO_URI` = તમારી MongoDB Atlas connection string
   - `PORT` = `5000`
6. "Create Web Service" પર click કરો — deploy થયા પછી તમને URL મળશે, જેમ કે:
   `https://your-portfolio-api.onrender.com`

### Step 6: Frontend માં Backend URL Update કરો
1. `client/app.js` ફાઈલ ખોલો.
2. `API_BASE` ની line update કરો:
   ```js
   const API_BASE = "https://your-portfolio-api.onrender.com/api";
   ```
3. Change save કરો, અને GitHub પર ફરી push કરો:
   ```
   git add .
   git commit -m "Update API base URL"
   git push
   ```

---

## 🚀 Step 7: Frontend Deploy કરો (Netlify — free)

1. https://netlify.com પર account બનાવો (GitHub થી sign in).
2. "Add new site" → "Import an existing project".
3. GitHub repository પસંદ કરો.
4. Settings:
   - **Base directory:** `client`
   - **Build command:** (ખાલી રાખો — static site છે)
   - **Publish directory:** `client`
5. "Deploy site" પર click કરો.
6. ✅ Deploy પૂરું થયા પછી તમને live URL મળશે:
   `https://your-portfolio-name.netlify.app`

### Vercel વાપરવું હોય તો (Alternative):
1. https://vercel.com પર GitHub થી sign in કરો.
2. "Add New Project" → repository select કરો.
3. Root Directory: `client`, Framework Preset: "Other" (static).
4. Deploy પર click — live URL મળશે.

---

## 📂 Step 8: Google Drive પર Submit કરવું

1. તમારી `portfolio` folder ને ZIP કરો (Right-click → "Send to" → "Compressed (zipped) folder" — Windows, અથવા Mac માં right-click → "Compress").
2. Google Drive ખોલો → "New" → "File upload" → ZIP file upload કરો.
3. Upload થયેલી file પર right-click → "Share" → "Anyone with the link" → "Viewer" select કરો.
4. Link copy કરો — આ submission માટે વાપરો.

---

## ✅ Final Submission Checklist

તમારે submit કરવાનું:
1. **GitHub repo link** → `https://github.com/<username>/personal-portfolio`
2. **Live website URL** → Netlify/Vercel link (frontend)
3. **Backend API URL** (જરૂર પડે તો) → Render link
4. **Google Drive ZIP link** (જો required હોય)

---

## 🔧 API Endpoints Reference

| Method | Endpoint              | Description           |
|--------|-----------------------|------------------------|
| GET    | /api/projects          | બધા projects મેળવો     |
| POST   | /api/projects          | નવો project ઉમેરો      |
| PUT    | /api/projects/:id       | Project update કરો     |
| DELETE | /api/projects/:id       | Project delete કરો     |
| GET    | /api/skills             | બધા skills મેળવો       |
| POST   | /api/skills             | નવો skill ઉમેરો        |
| POST   | /api/contact            | Contact message મોકલો  |

---

## 💡 Tips
- Projects/skills add કરવા માટે Postman અથવા curl નો ઉપયોગ કરી `/api/projects` અને `/api/skills` પર POST request મોકલો, અથવા `seed.js` માં data edit કરી `node seed.js` run કરો.
- `index.html`, `style.css`, `app.js` ની content edit કરી — તમારું નામ, links, photos, project details પોતાના પ્રમાણે update કરો.
