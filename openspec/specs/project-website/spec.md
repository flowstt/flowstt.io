# project-website Specification

## Purpose
TBD - created by archiving change add-project-website. Update Purpose after archive.
## Requirements
### Requirement: Static Project Website
The system SHALL provide a single-page static website built with plain HTML, CSS, and JavaScript that serves as the public-facing project website for FlowSTT, deployed via GitHub Pages.

#### Scenario: Website loads successfully
- **WHEN** a user navigates to the site URL
- **THEN** the site SHALL render a single-page layout with navigation bar, hero section, features, architecture, demo, getting started, vision/roadmap, contributing, and footer sections

#### Scenario: Website renders without build step
- **WHEN** the repository is cloned and the index.html is opened in a browser
- **THEN** the site SHALL render correctly without requiring any build tools, package managers, or compilation steps

### Requirement: Navigation
The site SHALL include a fixed navigation bar with anchor links to each major section, a logo, a theme toggle control, and a link to the GitHub repository.

#### Scenario: Desktop navigation
- **WHEN** the site is viewed on a viewport wider than 768px
- **THEN** all navigation links SHALL be visible in the navigation bar

#### Scenario: Mobile navigation
- **WHEN** the site is viewed on a viewport 768px or narrower
- **THEN** navigation links SHALL collapse into a hamburger menu that expands on tap/click

#### Scenario: Smooth scroll navigation
- **WHEN** a user clicks a navigation anchor link
- **THEN** the page SHALL smooth-scroll to the target section

### Requirement: Hero Section
The site SHALL display a hero section containing the FlowSTT landscape logo (switching between dark and light variants based on the active theme), the project tagline, a brief description, and call-to-action buttons linking to the GitHub repository and the Getting Started section.

#### Scenario: Hero displays with correct theme logo
- **WHEN** the site is viewed in dark mode
- **THEN** the hero SHALL display the dark-variant landscape logo (`flowstt-landscape.svg`)
- **WHEN** the site is viewed in light mode
- **THEN** the hero SHALL display the light-variant landscape logo (`flowstt-landscape-light.svg`)

### Requirement: Features Section
The site SHALL present FlowSTT's key features in a responsive grid or card layout, including at minimum: Privacy-First Local Processing, Cross-Platform Support, Hardware Acceleration, Real-Time Visualization, Intelligent Speech Detection, Push-to-Talk and Automatic Modes, CLI with JSON Output, and Echo Cancellation.

#### Scenario: Features display on desktop
- **WHEN** viewed on desktop viewport
- **THEN** features SHALL render as a multi-column card grid

#### Scenario: Features display on mobile
- **WHEN** viewed on mobile viewport
- **THEN** features SHALL stack into a single-column layout

### Requirement: Architecture Section
The site SHALL include an architecture section describing FlowSTT's three-component design (Service, CLI, GUI) with their roles and IPC communication model.

#### Scenario: Architecture overview renders
- **WHEN** a user scrolls to or navigates to the architecture section
- **THEN** the section SHALL display the three components with their binary names, roles, and a description of how they communicate via platform-native IPC

### Requirement: Demo Section
The site SHALL embed the FlowSTT demo animation (`flowstt.gif`) with lazy loading to avoid blocking initial page load.

#### Scenario: Demo GIF loads lazily
- **WHEN** the demo section enters the viewport
- **THEN** the GIF SHALL begin loading (using `loading="lazy"` or equivalent)

### Requirement: Getting Started Section
The site SHALL include a getting started section with system requirements, installation instructions, and basic CLI usage examples. Placeholder content SHALL be used for download links and release artifacts not yet available.

#### Scenario: Placeholder content is clearly marked
- **WHEN** a content section contains information not yet available (download URLs, release links)
- **THEN** the placeholder SHALL be visually distinguishable (e.g., styled badge or italic text indicating "Coming soon")

### Requirement: Vision and Roadmap Section
The site SHALL present FlowSTT's vision and planned capabilities derived from the FlowSTT Vision document, including cadence analysis, adaptive timeouts, acknowledgment feedback, interrupt handling, and workflow automation.

#### Scenario: Roadmap items are presented
- **WHEN** a user views the vision section
- **THEN** at least five future capability areas SHALL be described with brief summaries

### Requirement: Contributing Section
The site SHALL include a contributing section with guidance for potential contributors, linking to the GitHub issues page. Placeholder content SHALL be used for items not yet established (code of conduct, detailed contribution guide, community channels).

#### Scenario: Contributing section links to GitHub
- **WHEN** a user views the contributing section
- **THEN** a link to the project's GitHub issues page SHALL be present

### Requirement: Footer
The site SHALL include a footer containing the FlowSTT logo/icon, a license notice (placeholder if not yet chosen), a copyright notice, and a link to the GitHub repository.

#### Scenario: Footer renders
- **WHEN** a user scrolls to the bottom of the page
- **THEN** the footer SHALL display the logo, license text, copyright, and GitHub link

### Requirement: GitHub Pages Deployment
The site SHALL be deployable via a GitHub Actions workflow that publishes the site content to GitHub Pages on pushes to the `main` branch.

#### Scenario: Deployment triggers on push to main
- **WHEN** a commit is pushed to the `main` branch
- **THEN** the GitHub Actions workflow SHALL build and deploy the site to GitHub Pages

### Requirement: Responsive Design
The site SHALL be responsive and usable across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports.

#### Scenario: Content is readable on small screens
- **WHEN** the site is viewed on a 320px-wide viewport
- **THEN** all text content SHALL be readable without horizontal scrolling

### Requirement: Brand Assets
The site SHALL include copies of FlowSTT brand images from the source repository: icon (SVG, PNG), landscape logos in dark and light variants (SVG, PNG), portrait logos in dark and light variants (SVG, PNG), and the demo GIF.

#### Scenario: All brand images are present
- **WHEN** the site is deployed
- **THEN** the `images/` directory SHALL contain all 11 brand asset files from the source project's `images/` directory

### Requirement: SEO and Accessibility Basics
The site SHALL use semantic HTML elements (`header`, `nav`, `main`, `section`, `footer`), include a descriptive `<title>` and `<meta name="description">` tag, and provide `alt` attributes on all images.

#### Scenario: Page has meta description
- **WHEN** a search engine crawls the page
- **THEN** a `<meta name="description">` tag SHALL be present with a description of FlowSTT

#### Scenario: Images have alt text
- **WHEN** the page is audited for accessibility
- **THEN** every `<img>` element SHALL have a non-empty `alt` attribute

