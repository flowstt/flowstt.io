## 1. Project Setup and Assets

- [x] 1.1 Copy all 11 image files from `../flowstt/images/` into `images/` directory in this repo
- [x] 1.2 Create the directory structure: `css/`, `js/`, `.github/workflows/`
- [x] 1.3 Update `openspec/project.md` with actual project context (purpose, tech stack, conventions)

## 2. Core Website (HTML + CSS)

- [x] 2.1 Create `css/styles.css` with CSS custom properties for light and dark themes, base reset, typography, and layout utilities
- [x] 2.2 Create `index.html` with semantic HTML structure: `<header>` with nav, `<main>` with all content sections, `<footer>`
- [x] 2.3 Implement the navigation bar: fixed position, logo, section anchor links, theme toggle button, GitHub link, mobile hamburger menu
- [x] 2.4 Implement the hero section: landscape logo (with theme-aware `<picture>` element), tagline, description, CTA buttons
- [x] 2.5 Implement the features section: responsive card grid with 8 feature cards (Privacy-First, Cross-Platform, GPU Acceleration, Visualization, Speech Detection, PTT/Auto Modes, CLI, Echo Cancellation)
- [x] 2.6 Implement the architecture section: three-component overview (Service, CLI, GUI) with roles and IPC description
- [x] 2.7 Implement the demo section: lazy-loaded `flowstt.gif` with appropriate container and caption
- [x] 2.8 Implement the getting started section: system requirements, installation steps (with placeholders for download links), CLI usage examples
- [x] 2.9 Implement the vision/roadmap section: summarized future capabilities from the Vision document (cadence analysis, adaptive timeouts, acknowledgment feedback, interrupt handling, workflow automation)
- [x] 2.10 Implement the contributing section: contribution guidance, GitHub issues link, placeholders for code of conduct and community channels
- [x] 2.11 Implement the footer: logo/icon, license placeholder, copyright, GitHub link

## 3. Theming (JavaScript + CSS)

- [x] 3.1 Implement `prefers-color-scheme` media query in CSS as the default theme
- [x] 3.2 Implement `data-theme` attribute-based CSS overrides for manual theme selection
- [x] 3.3 Create `js/main.js` with theme toggle logic: read localStorage, fall back to OS preference, toggle on button click, persist to localStorage
- [x] 3.4 Add inline `<script>` in `<head>` of `index.html` to apply stored theme before first paint (prevent flash of wrong theme)
- [x] 3.5 Implement theme-aware logo switching (dark/light variants swap with theme change)

## 4. Responsive Design

- [x] 4.1 Add responsive CSS for mobile (320px+): single-column layouts, hamburger nav, readable text sizing
- [x] 4.2 Add responsive CSS for tablet (768px+): intermediate grid layouts
- [x] 4.3 Add responsive CSS for desktop (1024px+): full multi-column grids, fixed nav
- [x] 4.4 Implement mobile hamburger menu toggle in `js/main.js`

## 5. Interactivity

- [x] 5.1 Implement smooth-scroll behavior for anchor navigation links
- [x] 5.2 Add active-section highlighting in navigation based on scroll position (optional enhancement)

## 6. Deployment

- [x] 6.1 Create `.github/workflows/deploy.yml` GitHub Actions workflow for GitHub Pages deployment on push to `main`

## 7. Project Documentation

- [x] 7.1 Create `AGENTS.md` with project context, tech stack, file structure, coding conventions, theming guidelines, and deployment info for AI assistants
- [x] 7.2 Update `README.md` with project description, local development instructions, file structure, deployment process, content editing guide, and theming documentation

## 8. Verification

- [x] 8.1 Verify all sections render correctly in a browser (open `index.html` locally)
- [x] 8.2 Verify light/dark theme toggle works and persists across reload
- [x] 8.3 Verify OS preference detection works as default
- [x] 8.4 Verify responsive layouts at 320px, 768px, and 1024px+ viewports
- [x] 8.5 Verify all images load correctly (logos switch with theme, GIF lazy-loads)
- [x] 8.6 Verify all navigation anchor links scroll to correct sections
- [x] 8.7 Validate HTML with W3C validator (no critical errors)
- [x] 8.8 Check placeholder content is clearly distinguishable from real content
