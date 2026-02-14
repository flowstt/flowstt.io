## Context

FlowSTT is an open-source, privacy-first voice transcription agent built with Rust and Tauri 2.0. It needs a project website hosted on GitHub Pages at `flowstt.io`. The site must convey the project's purpose, features, architecture, and vision to potential users and contributors. The source project lives in the sibling `../flowstt` repository and provides images, feature descriptions, and technical details.

### Stakeholders
- Project maintainer (sole developer currently)
- Potential users discovering FlowSTT
- Potential contributors evaluating the project

### Constraints
- Must be deployable via GitHub Pages (static files only)
- Must work without a build step or framework (plain HTML/CSS/JS) to keep maintenance burden minimal
- Must support light and dark themes, defaulting to the OS/browser `prefers-color-scheme` setting
- Must use existing brand assets from `../flowstt/images` (SVG logos with dark/light variants, PNG fallbacks, demo GIF, icon)
- Content not yet available (download URLs, contributor names, community links) must use clearly marked placeholders

## Goals / Non-Goals

### Goals
- Single-page website with smooth-scroll navigation to logical sections
- Standard open-source project website structure: hero, features, architecture, getting started, vision/roadmap, contributing, footer
- Light/dark mode toggle with OS preference detection and `localStorage` persistence
- Responsive design (mobile, tablet, desktop)
- Fast load times -- no framework, no build tool, minimal dependencies
- Semantic HTML for accessibility and SEO
- GitHub Pages deployment via GitHub Actions on push to `main`
- `AGENTS.md` providing AI assistants with project context and conventions
- `README.md` documenting the website project (dev setup, deployment, structure)

### Non-Goals
- No JavaScript framework (React, Vue, etc.)
- No static site generator (Hugo, Jekyll, etc.)
- No blog or dynamic content system
- No analytics or tracking scripts
- No user accounts or interactive features beyond theme toggle and navigation
- No custom domain DNS configuration (that is an infrastructure task, not a code task)

## Decisions

### Decision: Plain HTML/CSS/JS, no framework or SSG
- **Why**: The site is a single landing page. A framework adds build complexity, dependency maintenance, and deployment friction for zero benefit at this scale.
- **Alternatives considered**: Jekyll (GitHub Pages default -- adds Ruby dependency, template complexity), Hugo (fast but requires Go toolchain), Astro/Next.js (SSR/SSG overkill for a single page).

### Decision: Single-page layout with anchor navigation
- **Why**: All content fits naturally on one page. Users can scan the whole project story in a single scroll. Anchor links in the nav provide quick jumps.
- **Alternatives considered**: Multi-page site (unnecessary fragmentation for the current content volume).

### Decision: CSS custom properties for theming
- **Why**: CSS custom properties (`--color-bg`, `--color-text`, etc.) allow theme switching with a single class toggle on `<html>`. No CSS duplication, no build step, works with `prefers-color-scheme` media query as the default.
- **Alternatives considered**: Separate CSS files per theme (duplication), CSS-in-JS (requires a framework).

### Decision: Copy images into the website repo
- **Why**: GitHub Pages serves from the repo. Referencing `../flowstt/images` is not possible in a deployed site. Images must live in the website repo's `images/` directory.
- **Alternatives considered**: CDN hosting (unnecessary complexity), git submodules (fragile for static assets).

### Decision: GitHub Actions for deployment
- **Why**: GitHub provides a `pages-build-deployment` action. A simple workflow that deploys the root directory (or a `docs/` subfolder) on push to `main` is the standard approach.
- **Alternatives considered**: Manual deployment (error-prone), `gh-pages` branch (older pattern, Actions is preferred).

## Site Structure

```
flowstt.io/
├── index.html              # Single-page website
├── css/
│   └── styles.css          # All styles (theming, layout, components)
├── js/
│   └── main.js             # Theme toggle, smooth scroll, mobile nav
├── images/                 # Copied from ../flowstt/images
│   ├── flowstt-icon.svg
│   ├── flowstt-icon.png
│   ├── flowstt-landscape.svg
│   ├── flowstt-landscape.png
│   ├── flowstt-landscape-light.svg
│   ├── flowstt-landscape-light.png
│   ├── flowstt-portrait.svg
│   ├── flowstt-portrait.png
│   ├── flowstt-portrait-light.svg
│   ├── flowstt-portrait-light.png
│   └── flowstt.gif
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages deployment
├── AGENTS.md               # AI assistant instructions
├── README.md               # Project documentation
└── openspec/               # (existing) spec-driven development
```

## Page Sections

1. **Navigation Bar** -- Fixed top nav with logo, section links, theme toggle button, and GitHub repo link. Collapses to hamburger menu on mobile.
2. **Hero** -- Large landscape logo (auto-switches dark/light variant), tagline ("A voice transcription agent for fluid, natural conversation"), brief description, CTA buttons (GitHub repo, Getting Started anchor).
3. **Features** -- Grid/card layout highlighting: Privacy-First Local Processing, Cross-Platform Support, Hardware Acceleration (CUDA/Metal), Real-Time Visualization, Intelligent Speech Detection, Push-to-Talk & Automatic Modes, Full CLI with JSON Output, Echo Cancellation.
4. **Architecture** -- Three-component diagram (Service, CLI, GUI) with brief descriptions. Reference the IPC communication model.
5. **Demo** -- Embedded `flowstt.gif` showing the application in action.
6. **Getting Started** -- Installation steps (placeholder for release artifacts), system requirements, quick CLI usage examples.
7. **Vision / Roadmap** -- Summarized from the FlowSTT Vision document: cadence analysis, adaptive timeouts, acknowledgment feedback, interrupt handling, workflow automation. Presented as a roadmap timeline or card layout.
8. **Contributing** -- How to contribute (placeholder), link to GitHub issues, code of conduct placeholder, development setup placeholder.
9. **Footer** -- Logo, license placeholder, GitHub link, copyright.

## Theming Approach

```
1. Default: read OS preference via `prefers-color-scheme` media query
2. User override: toggle button sets `data-theme="light|dark"` on <html>
3. Persist choice in localStorage
4. On page load: check localStorage first, fall back to OS preference
5. CSS custom properties switch based on data-theme attribute or media query
```

Key CSS variables:
- `--color-bg`, `--color-bg-secondary`
- `--color-text`, `--color-text-secondary`
- `--color-accent`, `--color-accent-hover`
- `--color-border`
- `--color-card-bg`
- `--color-code-bg`

Logo images switch via a CSS class or `<picture>` element with `prefers-color-scheme` source selection.

## Risks / Trade-offs

- **Risk**: Content placeholders may look incomplete to visitors.
  - **Mitigation**: Use clearly styled placeholder blocks that look intentional (e.g., "Coming soon" badges). Prioritize filling real content where available (features, architecture, vision are all well-documented).

- **Risk**: No build step means no CSS/JS minification.
  - **Mitigation**: The site is small enough that unminified assets have negligible impact. Can add a simple build step later if needed.

- **Risk**: Image sizes (especially the 8MB GIF) may slow page load.
  - **Mitigation**: Lazy-load the GIF, use SVG for logos (small), consider compressing the GIF or converting to a video element in a future iteration.

## Open Questions

- What license will the project use? (Currently no LICENSE file in the source repo.) A placeholder will be used.
- Is there a preferred custom domain configuration, or will the initial deployment use `<username>.github.io/flowstt.io`? (Out of scope for this change -- DNS config is separate.)
- Are there any existing community channels (Discord, Matrix, forum) to link to? Placeholders will be used if not.
