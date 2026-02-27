# FlowSTT Website

The project website for [FlowSTT](https://github.com/keathley/flowstt) -- a free, privacy-first voice transcription agent that runs entirely on your local machine.

## Overview

This repository contains a single-page website deployed via [GitHub Pages](https://pages.github.com/). It provides an overview of FlowSTT's features, architecture, usage, and vision for potential users and contributors.

**Live site:** *Coming soon*

## Tech Stack

- **HTML5** -- Semantic markup, single `index.html` file
- **CSS3** -- Custom properties for theming, responsive design with media queries
- **Vanilla JavaScript** -- Theme toggle, mobile nav, scroll interactions
- **Vite** -- Dev server with live reload and production build (minification, asset hashing)
- **pnpm** -- Package manager
- **GitHub Pages** -- Static hosting via GitHub Actions

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+

## Local Development

```bash
# Install dependencies
pnpm install

# Start the dev server with live reload
pnpm dev
```

This opens the site at `http://localhost:5173` with hot module replacement -- edits to HTML, CSS, and JS are reflected instantly in the browser.

### Testing download links locally

The platform-specific download buttons use URLs injected at build time by the CI deploy workflow. To test this locally:

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and set `VITE_DOWNLOAD_TAG` to the release tag you want to test (e.g. `v0.1.15`).
3. Build and preview:
   ```bash
   pnpm build:tagged   # builds then opens the production preview at http://localhost:4173
   ```
   Or just build and inspect the output:
   ```bash
   pnpm build
   grep -o 'FlowSTT[^"]*' dist/assets/index-*.js
   ```

When `VITE_DOWNLOAD_TAG` is not set (default `pnpm dev` / `pnpm build`), all macOS and Windows download buttons fall back to `https://github.com/flowstt/flowstt/releases/latest`.

> `.env.local` is gitignored -- it will not be committed.

### Other commands

```bash
# Build for production (outputs to dist/)
pnpm build

# Preview the production build locally
pnpm preview
```

## File Structure

```
flowstt.io/
├── index.html              # Single-page website with all content sections
├── css/
│   └── styles.css          # Styles: reset, theming, layout, components, responsive
├── js/
│   └── main.js             # Theme toggle, mobile nav, scroll interactions
├── public/
│   └── images/             # Brand assets (copied as-is to build output)
│       ├── flowstt-icon.svg/png        # App icon
│       ├── flowstt-landscape.svg/png   # Landscape logo (dark theme)
│       ├── flowstt-landscape-light.svg/png  # Landscape logo (light theme)
│       ├── flowstt-portrait.svg/png    # Portrait logo (dark theme)
│       ├── flowstt-portrait-light.svg/png   # Portrait logo (light theme)
│       └── flowstt.gif                 # Demo animation
├── vite.config.js          # Vite configuration (dev server, build settings)
├── package.json            # Project metadata, scripts, and dependencies
├── pnpm-lock.yaml          # Lockfile for reproducible installs
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment (build + deploy)
├── AGENTS.md               # AI assistant instructions
├── README.md               # This file
└── openspec/               # Spec-driven development files
```

### Build output

The `pnpm build` command produces a `dist/` directory containing:

- `index.html` -- Processed HTML with updated asset references
- `assets/` -- Minified and content-hashed CSS and JS bundles
- `images/` -- All brand images copied from `public/images/`

## Website Sections

| Section | Description |
|---------|-------------|
| **Hero** | Logo, tagline, description, CTA buttons |
| **Features** | 8-card grid: privacy, cross-platform, GPU, visualization, speech detection, PTT, CLI, echo cancellation |
| **Architecture** | Three-component overview (Service, CLI, GUI) with IPC description |
| **Demo** | Animated GIF of the application in action |
| **Getting Started** | System requirements, installation, CLI quick start |
| **Vision & Roadmap** | Future capabilities: cadence analysis, adaptive timeouts, feedback, interrupts, automation |
| **Contributing** | Issue reporting, code of conduct (placeholder), community (placeholder) |
| **Footer** | Logo, license (placeholder), links, copyright |

## Theming

The site supports light and dark mode:

1. **Default**: Follows the OS/browser `prefers-color-scheme` preference
2. **Manual toggle**: Button in the navigation bar switches themes
3. **Persistence**: Choice is saved in `localStorage` and applied before first paint to prevent flash

### How theming works

- CSS custom properties (e.g., `--color-bg`, `--color-text`) are defined in `css/styles.css` under `:root`, `[data-theme="light"]`, and `[data-theme="dark"]` selectors
- A small inline `<script>` in the `<head>` of `index.html` reads `localStorage` and sets `data-theme` on `<html>` before the page renders
- `js/main.js` handles the toggle button click, updates `localStorage`, and applies the attribute
- Logo images swap via `.logo-dark` / `.logo-light` CSS classes that respond to the theme

### Adding new themed elements

Always use existing CSS custom properties for colors. If a new variable is needed, add it to all four theme blocks in `css/styles.css` (`:root`, `prefers-color-scheme: light`, `[data-theme="light"]`, `[data-theme="dark"]`).

## Editing Content

All website content lives in `index.html`. Each section is a `<section>` element with a unique `id` that matches the navigation anchors:

- `#features` -- Feature cards
- `#architecture` -- Architecture overview
- `#demo` -- Demo GIF
- `#getting-started` -- Installation and CLI usage
- `#vision` -- Roadmap cards
- `#contributing` -- Contribution guidance

To add or modify a section, edit the corresponding `<section>` block in `index.html`. Styles are in `css/styles.css`.

## Deployment

The site deploys automatically on every push to `main` via the GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. Installs pnpm and Node.js
2. Runs `pnpm install --frozen-lockfile`
3. Runs `pnpm build` to produce the `dist/` directory
4. Uploads `dist/` as a GitHub Pages artifact and deploys

### Manual deployment

The workflow can also be triggered manually via the "Run workflow" button in the GitHub Actions UI (`workflow_dispatch`).

## Placeholder Content

Some content uses `<span class="placeholder-badge">Coming soon</span>` or similar markers for information not yet available:

- License type
- Code of conduct
- Community channels

Replace these with real content as it becomes available.

## License

*License to be determined.*
