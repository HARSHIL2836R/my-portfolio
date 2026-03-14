# ✦ Showcase Portfolio

A beautiful, editorial-style portfolio to display images, PDFs, and notes — deployed on GitHub Pages.

## Features
- 📷 Upload & display images
- 📄 Upload & view PDFs
- ✎ Write and publish text notes
- 🎨 Elegant dark editorial design
- 💾 Saves to browser localStorage
- 🔍 Filter by type (images / PDFs / notes)
- 📱 Fully responsive

## Deploy to GitHub Pages

### Step 1 — Fork or create your repo
Create a new repo on GitHub. Name it anything (e.g. `my-portfolio`).

### Step 2 — Update the base URL
In `vite.config.js`, change `my-portfolio` to your actual repo name:
```js
base: '/YOUR-REPO-NAME/',
```

### Step 3 — Push your code
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. Save — GitHub will auto-deploy on every push to `main`!

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## Local Development
```bash
npm install
npm run dev
```

## Note on Storage
Content is saved in **browser localStorage** — each visitor has their own private collection. To share content across visitors, consider integrating [Firebase Firestore](https://firebase.google.com) or [Supabase](https://supabase.com) (both free tiers available).
