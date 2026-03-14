# Betty Pride Website

Static marketing website for Betty Pride garment manufacturing.

## Stack

- HTML5 pages (`index.html`, `pages/*.html`)
- Custom stylesheet: `css/site.css` (currently used by all pages)
- Optional Tailwind source: `css/tailwind.css` (kept for build workflow)
- Vanilla JS interactions: `public/scripts.js`

## Prerequisites

- Node.js 18+ recommended
- npm

## Install

```bash
npm install
```

## Project Structure

```text
.
├── assets/                # Images and static design assets
├── css/
│   ├── site.css           # Active stylesheet used by the website
│   └── tailwind.css       # Tailwind input file (optional workflow)
├── pages/
│   ├── about.html
│   ├── contact.html
│   └── services.html
├── public/
│   └── scripts.js         # Menu, scroll reveal, form behavior
├── index.html
├── package.json
└── tailwind.config.js
```

## CSS Build Scripts

The repo includes Tailwind build scripts that compile `css/tailwind.css` into `css/main.css`.

```bash
npm run build:css
npm run watch:css
```

Note: Pages currently link to `css/site.css`. Tailwind compilation is optional unless you switch page links to the generated file.

## Deployment

This project is connected to GitHub and auto-deploys on Netlify from `main`.

- Production URL: `https://betty-pride.netlify.app`
- Branch deploy URL: `https://main--betty-pride.netlify.app`

To deploy updates, push commits to `main`:

```bash
git add -A
git commit -m "Your update"
git push origin main
```

