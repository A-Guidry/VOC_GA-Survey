# Mocap Quality Evaluation

A static, serverless survey platform for evaluating motion capture animation quality. Built with React, deployed on GitHub Pages.

## Features

- **Multiple surveys** — each published as a committed JSON file
- **Random visitor assignment** — each visitor is randomly assigned one of the published surveys
- **Direct survey links** — share `?id=your-survey` for a specific survey
- **Formspree integration** — responses go to your email inbox; full CSV export from the Formspree dashboard
- **Submission tracking** — per-survey counts shown in the Admin Dashboard
- **GitHub Actions CI/CD** — push to `main` and the site deploys automatically

---

## Setup

### 1. Fork / Clone

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_ENDPOINT` | Your Formspree form URL — get from [formspree.io](https://formspree.io) |
| `VITE_COUNTAPI_NAMESPACE` | Unique namespace for submission counters (e.g. `my-company-survey`) |
| `VITE_ADMIN_PASSCODE` | Password for the Admin Dashboard |
| `VITE_BASE_PATH` | GitHub Pages repo path, e.g. `/VOC_GA-Survey/` (or `/` for custom domain) |

> **`.env` is gitignored** — your credentials will never be committed.

### 3. Set GitHub Repository Secrets

Go to **Settings → Secrets and variables → Actions** in your GitHub repo and add the same four values as repository secrets. GitHub Actions uses these during automated builds.

### 4. Configure GitHub Pages

Go to **Settings → Pages → Source** and select **"GitHub Actions"**.

### 5. Run Locally

```bash
npm run dev
```

---

## Adding Surveys

1. Open the Admin Dashboard → log in with your passcode
2. Create Survey → Add Clips (YouTube URL + title per clip)
3. Click **"Save to File"** → two files download:
   - `[survey-id].json` → place in `public/surveys/`
   - `index.json` → replace existing `public/surveys/index.json`
4. Commit and push:

```bash
git add . && git commit -m "add survey" && git push origin main
```

GitHub Actions deploys automatically (~60 seconds).

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite |
| Styling | Vanilla CSS (inline in component) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| Form submissions | Formspree (free tier: 50/month) |
| Submission counting | CountAPI (free, no account) |
| Survey storage | Committed JSON files in `public/surveys/` |
