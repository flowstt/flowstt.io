# Project Context

## Purpose

This repository contains the FlowSTT project website -- a static single-page site deployed via GitHub Pages. It serves as the public-facing website for [FlowSTT](https://github.com/keathley/flowstt), a free, privacy-first voice transcription agent built with Rust and Tauri 2.0.

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties for theming, responsive media queries)
- Vanilla JavaScript (no frameworks)
- Vite (dev server with HMR, production build with minification and asset hashing)
- pnpm (package manager)
- GitHub Pages (static hosting via GitHub Actions)

## Project Conventions

### Code Style

- **HTML**: Semantic elements (`header`, `nav`, `main`, `section`, `footer`). All images require `alt` attributes. Section IDs must match nav anchor hrefs.
- **CSS**: All colors via CSS custom properties. `rem` for sizing, `px` for borders. Kebab-case class names. Breakpoints: mobile (<768px), tablet (768-1023px), desktop (1024px+).
- **JavaScript**: Vanilla JS in IIFE wrapper. `var` declarations for broad compatibility. No globals beyond the IIFE. Loaded as `<script type="module">` for Vite compatibility.
- **Line endings**: LF only (Unix-style).

### Architecture Patterns

- Single `index.html` page with anchor-based navigation
- CSS custom properties for light/dark theming with `data-theme` attribute on `<html>`
- Inline `<script>` in `<head>` for flash-free theme initialization
- Static images in `public/images/` (copied as-is by Vite, no hashing)
- CSS and JS processed by Vite: minified and content-hashed in production builds

### Testing Strategy

- Run `pnpm build` to verify the production build succeeds
- Run `pnpm preview` to inspect the production output locally
- Manual browser testing: verify all sections render, theme toggle works, responsive layouts at 320px/768px/1024px+
- HTML validation via W3C validator
- No automated test suite (static site with minimal JS)

### Git Workflow

- `main` branch is the production branch (auto-deploys to GitHub Pages)
- Feature work on topic branches with pull requests

## Domain Context

FlowSTT is a privacy-first voice transcription desktop application built with Rust and Tauri 2.0. It features a background service for audio capture and transcription, a CLI for headless operation, and a GUI with real-time visualization. The website communicates the project's features, architecture, and vision to potential users and contributors.

## Important Constraints

- Must support light and dark themes defaulting to OS preference
- Must be deployable as a static site on GitHub Pages
- Placeholders used for unavailable content (license, download links, community channels)

## External Dependencies

- GitHub Pages for hosting
- GitHub Actions for CI/CD deployment
- Vite for development server and production builds
- Brand images sourced from the main FlowSTT repository
