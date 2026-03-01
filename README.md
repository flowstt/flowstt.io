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

## Deployment

The site deploys automatically on every push to `main` via the GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. Installs pnpm and Node.js
2. Runs `pnpm install --frozen-lockfile`
3. Runs `pnpm build` to produce the `dist/` directory
4. Uploads `dist/` as a GitHub Pages artifact and deploys

### Manual deployment

The workflow can also be triggered manually via the "Run workflow" button in the GitHub Actions UI (`workflow_dispatch`).

## License

[MIT](https://github.com/flowstt/flowstt/blob/master/LICENSE) - Copyright 2026 KMX Consulting LLC
