# site-theming Specification

## Purpose
TBD - created by archiving change add-project-website. Update Purpose after archive.
## Requirements
### Requirement: OS Preference Detection
The site SHALL detect the user's operating system or browser color scheme preference using the `prefers-color-scheme` CSS media query and apply the matching theme (light or dark) as the default on first visit.

#### Scenario: Dark mode OS preference
- **WHEN** a user visits the site for the first time with OS dark mode enabled
- **THEN** the site SHALL render in dark mode without any user interaction

#### Scenario: Light mode OS preference
- **WHEN** a user visits the site for the first time with OS light mode enabled
- **THEN** the site SHALL render in light mode without any user interaction

### Requirement: Manual Theme Toggle
The site SHALL provide a visible toggle control in the navigation bar that allows users to switch between light and dark themes.

#### Scenario: User switches from dark to light
- **WHEN** a user clicks the theme toggle while in dark mode
- **THEN** the site SHALL immediately switch to light mode

#### Scenario: User switches from light to dark
- **WHEN** a user clicks the theme toggle while in light mode
- **THEN** the site SHALL immediately switch to dark mode

### Requirement: Theme Persistence
The site SHALL persist the user's theme choice in `localStorage` so that the preference is maintained across page reloads and return visits.

#### Scenario: Theme persists across reload
- **WHEN** a user selects dark mode and reloads the page
- **THEN** the site SHALL render in dark mode

#### Scenario: Stored preference overrides OS preference
- **WHEN** a user has previously selected light mode but their OS preference is dark
- **THEN** the site SHALL render in light mode (user choice takes priority)

### Requirement: CSS Custom Property Theming
The site SHALL implement theming via CSS custom properties on the `<html>` element, allowing all colors to switch between light and dark palettes by changing a single `data-theme` attribute.

#### Scenario: Theme variables applied
- **WHEN** the `data-theme` attribute on `<html>` is set to `"dark"`
- **THEN** all CSS custom properties (`--color-bg`, `--color-text`, `--color-accent`, etc.) SHALL resolve to dark theme values

#### Scenario: Theme variables switch
- **WHEN** the `data-theme` attribute changes from `"dark"` to `"light"`
- **THEN** all styled elements SHALL re-render with light theme colors without a page reload

### Requirement: Theme-Aware Brand Assets
Logo images SHALL switch between dark and light variants based on the active theme, using `<picture>` elements with `prefers-color-scheme` media source selection or CSS-based image swapping.

#### Scenario: Logo variant matches theme
- **WHEN** the site is in dark mode
- **THEN** the dark-variant logo SHALL be displayed
- **WHEN** the site is in light mode
- **THEN** the light-variant logo SHALL be displayed

### Requirement: No Flash of Incorrect Theme
The site SHALL apply the correct theme before the page content is visually rendered to prevent a flash of the wrong color scheme on page load.

#### Scenario: Theme applied before paint
- **WHEN** a user with a stored dark mode preference loads the page
- **THEN** the page SHALL not briefly flash in light mode before switching to dark mode

