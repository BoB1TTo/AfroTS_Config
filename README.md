# AfroTech Suite

AfroTech Suite is a portable technical toolkit for AfroditeSoft technicians and consultants, built with React, Vite, and Electron.

Instead of treating this as a simple demo, we will use it to practice the same habits used in production teams:

- feature decomposition
- state design
- UI consistency
- accessibility
- validation
- testing
- code review readiness
- packaging and release workflows

## Current App

The app already includes a realistic workflow:

- multi-step business configuration wizard
- shared form state across steps
- theme and dark mode controls
- dual report generation from one assessment
- Electron desktop packaging

This makes it a strong training base because it has real product behavior, not just isolated components.

## Training Goal

Use this project to grow from "I can build screens" to "I can ship maintainable, reviewable, production-style software."

The focus is not only finishing features. The focus is learning how professionals shape code over time.

## How To Train With This Repo

Work in short improvement cycles:

1. Pick one learning target.
2. Make a small but complete change.
3. Run lint and verify behavior.
4. Review the code for clarity, reusability, and risk.
5. Capture what you learned before starting the next step.

Recommended order:

1. UI cleanup and component consistency
2. form validation and UX feedback
3. state architecture improvements
4. persistence and data flow
5. testing
6. packaging and deployment quality

## Professional Skills To Practice Here

### Frontend architecture

- split large components into focused modules
- move business logic out of render-heavy files
- create reusable UI patterns instead of repeating inline styles

### Product thinking

- improve empty states, step guidance, and progress clarity
- make validation helpful instead of blocking
- think about what a real user needs at each step

### Code quality

- reduce duplication
- name things clearly
- keep data structures predictable
- make changes safe to extend later

### Delivery discipline

- use meaningful commits
- keep changes scoped
- test manually and automatically
- document decisions

## Known Training Opportunities In This Codebase

These are good practice targets based on the current implementation:

- `src/App.jsx` is carrying too much orchestration and UI logic
- several components rely on inline styles that should become reusable UI patterns
- validation is present, but not centralized or easily testable
- there is no test suite yet
- form progress is in memory only and does not survive refresh
- the client report and developer technical reference need a cleaner export workflow
- accessibility can be improved for clickable cards and keyboard navigation
- the app styling is split between `src/index.css` template defaults and the app theme layer

## First Recommended Sprint

A strong first professional pass would be:

1. centralize wizard configuration and labels
2. remove repeated inline styles into shared CSS utilities
3. add step-level validation helpers
4. add local persistence for form progress
5. add a small test foundation

## Project Docs

- Roadmap: [DOCS/AfroTS_Roadmap.md](DOCS/AfroTS_Roadmap.md)
- Existing SRS notes: [DOCS/AfroTS_SRS_001.md](DOCS/AfroTS_SRS_001.md)

## Versioning Style

This project uses semantic versioning:

- `MAJOR` for breaking product or architecture changes
- `MINOR` for new backward-compatible features
- `PATCH` for fixes, wording updates, and safe refinements

Current documentation baseline: `v0.0.1-beta.1`

Beta track note: this line marks the first portable beta baseline for the suite.

## Development Commands

```bash
npm run dev
npm run build
npm run build:portable
npm run lint
npm run electron
```

## Portable Layout

When the packaged portable app starts, it prepares this layout next to the executable:

- `ATSDB.SQLite` in the root portable folder
- `AfroTS-Data/portable-settings.json` for app settings and future portable state

Electron `userData` is redirected into `AfroTS-Data` so desktop settings stay alongside the portable build instead of writing into the normal AppData profile.

## Success Standard

You are using this project well if each round leaves the app:

- cleaner than before
- easier to explain
- easier to extend
- safer to change
- closer to production quality
