<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# FlowSTT Website - AI Assistant Instructions

## Project Overview

This repository contains the **FlowSTT project website** -- a static single-page site deployed via GitHub Pages. It serves as the public-facing website for [FlowSTT](https://github.com/keathley/flowstt), a privacy-first voice transcription agent built with Rust and Tauri 2.0.

## Tech Stack

- **HTML5** -- Semantic markup, single `index.html` file
- **CSS3** -- Custom properties for theming, responsive design with media queries (`css/styles.css`)
- **Vanilla JavaScript** -- Theme toggle, mobile nav, scroll interactions (`js/main.js`)
- **Vite** -- Dev server with live reload (HMR) and production build with minification and asset hashing (`vite.config.js`)
- **pnpm** -- Package manager (`package.json`, `pnpm-lock.yaml`)
- **GitHub Pages** -- Static hosting via GitHub Actions (`.github/workflows/deploy.yml`)

## File Structure

```
flowstt.io/
├── index.html              # Single-page website (all sections)
├── css/
│   └── styles.css          # All styles: reset, theming, layout, components, responsive
├── js/
│   └── main.js             # Theme toggle, hamburger menu, active nav highlighting
├── public/
│   └── images/             # Brand assets (copied as-is to build output, not hashed)
├── vite.config.js          # Vite dev server and build configuration
├── package.json            # Scripts: dev, build, preview
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment (build + deploy)
├── AGENTS.md               # This file
├── README.md               # Human developer documentation
└── openspec/               # Spec-driven development (proposals, specs)
```

## Development Workflow

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server with live reload at http://localhost:5173
pnpm build      # Production build to dist/ (minified CSS/JS, hashed assets)
pnpm preview    # Preview production build locally
```

**Important:** Do not run `pnpm dev` in automated/CI contexts -- use `pnpm build` instead.

## Coding Conventions

### HTML
- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Every `<img>` must have a non-empty `alt` attribute
- IDs on sections must match nav anchor `href` values (e.g., `id="features"` and `href="#features"`)
- Placeholders for unavailable content use `<span class="placeholder-badge">Coming soon</span>`

### CSS
- **All colors must use CSS custom properties** (e.g., `var(--color-text)`). Never use hardcoded color values in component styles.
- Theme variables are defined in `:root` (dark default), `@media (prefers-color-scheme: light)`, `[data-theme="light"]`, and `[data-theme="dark"]` blocks
- Use `rem` for font sizes and spacing, `px` for borders and small details
- Responsive breakpoints: mobile (<768px), tablet (768px-1023px), desktop (1024px+)
- Class naming: kebab-case, descriptive (e.g., `.feature-card`, `.nav-links`, `.hero-logo`)

### JavaScript
- Vanilla JS only -- no frontend frameworks
- IIFE wrapper to avoid global scope pollution
- Use `var` for broad browser compatibility (no transpilation)
- Theme state stored in `localStorage` with key `flowstt-theme`
- JS is loaded as `<script type="module">` for Vite compatibility

### Images and Static Assets
- Images live in `public/images/` and are referenced as `/images/...` in HTML
- Vite copies `public/` contents to `dist/` as-is (no hashing, no processing)
- Logos come in dark and light variants (SVG primary, PNG fallback)
- Use `loading="lazy"` on large images (demo GIF)

### Theming
- Default theme follows OS preference via `prefers-color-scheme` media query
- User can override via toggle button; choice persists in `localStorage`
- Inline `<script>` in `<head>` applies stored theme before first paint to prevent flash
- Logo images switch between dark/light variants using `.logo-dark` / `.logo-light` CSS classes
- When adding new themed elements, always use existing CSS custom properties

## Deployment

The site deploys automatically via GitHub Actions on push to `main`. The workflow:
1. Installs pnpm and Node.js
2. Runs `pnpm install --frozen-lockfile`
3. Runs `pnpm build` to produce `dist/`
4. Deploys `dist/` to GitHub Pages

## Testing Changes

Run `pnpm build` to verify the production build succeeds, then `pnpm preview` to inspect the output.

Verify:
1. Both light and dark themes render correctly
2. All navigation links scroll to the correct sections
3. Mobile hamburger menu opens/closes
4. Responsive layouts at 320px, 768px, and 1024px+ viewports
5. All images load (logos switch with theme)
