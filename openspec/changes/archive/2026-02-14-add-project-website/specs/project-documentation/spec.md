## ADDED Requirements

### Requirement: AGENTS.md File
The repository SHALL include an `AGENTS.md` file at the project root that provides AI coding assistants with project context, conventions, tech stack, file structure, and guidelines specific to the FlowSTT website project.

#### Scenario: AGENTS.md contains project context
- **WHEN** an AI assistant reads the `AGENTS.md` file
- **THEN** it SHALL find: project purpose (FlowSTT project website), tech stack (HTML, CSS, JavaScript, GitHub Pages), file structure overview, coding conventions (no frameworks, semantic HTML, CSS custom properties for theming), and deployment instructions

#### Scenario: AGENTS.md describes theming conventions
- **WHEN** an AI assistant needs to modify styles
- **THEN** the `AGENTS.md` SHALL instruct it to use CSS custom properties for colors and to test both light and dark themes

### Requirement: README.md File
The repository SHALL include a `README.md` file at the project root that documents the website project for human developers, including: project description, local development instructions, file structure, deployment process, how to add/modify content, and how theming works.

#### Scenario: README describes local development
- **WHEN** a developer reads the README
- **THEN** they SHALL find instructions for running the site locally (e.g., opening `index.html` directly or using a simple HTTP server)

#### Scenario: README describes deployment
- **WHEN** a developer reads the README
- **THEN** they SHALL find a description of the GitHub Actions deployment workflow and how GitHub Pages is configured

#### Scenario: README describes content editing
- **WHEN** a developer wants to update site content
- **THEN** the README SHALL explain the file structure and where to find each section's content in `index.html`
