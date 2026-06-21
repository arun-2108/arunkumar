# Arunkumar Sundaravel — Portfolio

A single-page portfolio site. Plain **Vite + React + TypeScript** — no server, no SSR, no framework lock-in. Builds to static files that any static host (Vercel, Netlify, GitHub Pages, etc.) can serve directly.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
```

Outputs static files to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo.
3. Vercel auto-detects the Vite framework — Build Command `npm run build`, Output Directory `dist`. No extra config needed.
4. Deploy.

## ⚠️ Missing images

The project image carousel expects these files in `public/` — they don't exist yet, so those slots show an empty placeholder until added:

- `public/images/nlc-1.jpg`
- `public/images/nlc-2.jpg`
- `public/images/nlc-3.jpg`
- `public/images/nlc-4.jpg`
- `public/project2.png`
- `public/project3.png`

To add more images to any project's carousel, edit the `images: [...]` array on that project in `src/data/resume.ts` and drop the matching files into `public/`.
