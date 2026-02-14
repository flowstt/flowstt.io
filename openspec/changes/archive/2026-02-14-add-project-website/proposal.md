# Change: Add GitHub Pages Project Website

## Why

FlowSTT is an open-source project that needs a public-facing website to communicate its purpose, features, and vision to potential users and contributors. A well-structured project website is essential for open-source adoption, discoverability, and community building. Currently, the `flowstt.io` repository is an empty shell with no content.

## What Changes

- Add a static website built with HTML, CSS, and JavaScript, deployed via GitHub Pages
- Create standard open-source project website sections: hero/landing, features, architecture overview, installation/quickstart, vision/roadmap, contributing guidelines, and footer
- Implement light/dark mode theming that defaults to the user's OS/browser preference
- Copy and reference logo and demo images from the `../flowstt/images` directory (dark and light logo variants, demo GIF, icon)
- Generate an `AGENTS.md` file with project-specific instructions for AI assistants
- Generate a `README.md` file documenting the website project itself
- Use placeholders for content not yet available (download links, contributor list, specific release artifacts, community links)

## Impact

- Affected specs: `project-website` (new), `site-theming` (new), `project-documentation` (new)
- Affected code: All new files -- HTML pages, CSS, JavaScript, images, GitHub Actions workflow, `AGENTS.md`, `README.md`
- No existing code is modified; this is a greenfield addition to an empty repository
