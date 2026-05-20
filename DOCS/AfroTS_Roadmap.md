# AfroTS_Roadmap v0.0.1-beta.1

This roadmap tracks the project plan for AfroTS_Config.

Training notes are included where they help explain why a stage exists.

Current version baseline: `0.0.1-beta.1`

## Current Progress

Completed so far:

- portable Electron packaging is enabled
- the portable startup workspace is created beside the EXE
- `ATSDB.SQLite` is created in the portable root when missing
- the portable settings folder is named `AfroTS-Data`
- the startup splash screen now dismisses after the app mounts
- release builds are producing portable EXE artifacts
- project versioning has been reset to the beta baseline `0.0.1-beta.1`
- documentation now reflects the portable layout and beta track

## Stage 1: Baseline Cleanup

Objective: make the current code easier to read, reason about, and change.

Practice tasks:

- extract wizard constants from `src/App.jsx`
- standardize repeated button, section, and card patterns
- reduce inline styles in step components
- align `src/index.css` with the actual app shell so old template styling does not leak into the project
- rename anything unclear or inconsistent

Professional lesson:

Good teams make the next change easier, not harder.

Definition of done:

- less duplication
- clearer component responsibilities
- no visual regressions

## Stage 2: Form Architecture

Objective: make the wizard behave like a real product form instead of a demo flow.

Practice tasks:

- move validation rules into dedicated helpers
- define the form data shape in one place
- prevent invalid transitions cleanly
- improve required field feedback
- add smarter defaults based on earlier selections

Professional lesson:

Forms are product systems. Treating validation as a first-class concern improves both UX and maintainability.

Definition of done:

- validation logic is reusable
- step rules are explicit
- user feedback is consistent

## Stage 3: State Management

Objective: design state intentionally instead of letting it grow ad hoc.

Practice tasks:

- migrate wizard state from many local concerns into `useReducer` or a custom hook
- separate derived values from stored values
- isolate theme/toolbox state from business form state
- introduce persistence with `localStorage`

Professional lesson:

Professional frontend work depends on knowing what state exists, why it exists, and where it should live.

Definition of done:

- easier debugging
- fewer prop chains
- refresh-safe form progress

## Stage 4: Accessibility And Interaction Quality

Objective: make the app usable, not just visually complete.

Practice tasks:

- support keyboard interaction for option cards
- improve focus states
- use semantic buttons where clickable `div`s are used now
- improve contrast and form labeling
- verify dark mode readability

Professional lesson:

Accessibility is not polish. It is part of correct software behavior.

Definition of done:

- keyboard-friendly interactions
- visible focus treatment
- better semantics

## Stage 5: Testing Foundation

Objective: start protecting behavior with automated feedback.

Practice tasks:

- add Vitest and React Testing Library
- test wizard navigation
- test validation rules
- test report output from sample form data
- add one regression test for a bug you fix

Professional lesson:

Testing is not about perfection. It is about confidence during change.

Definition of done:

- repeatable test run
- critical flow coverage
- at least one test around business logic and one around UI behavior

## Stage 6: Data And Domain Thinking

Objective: model the app more like a product with domain rules.

Practice tasks:

- create recommendation logic from business type and size
- generate more realistic client and developer report sections from one shared assessment
- move static lists into dedicated config files
- add a saved draft/export flow

Professional lesson:

Professional apps are easier to evolve when domain rules are explicit instead of scattered.

Definition of done:

- report logic is easier to extend
- client-facing and developer-facing outputs stay aligned without duplicating data entry
- recommendations feel intentional
- config data is separated from rendering

## Stage 7: Packaging And Delivery

Objective: practice shipping discipline, not just coding.

Practice tasks:

- verify Electron packaging paths
- document release steps
- test production build behavior
- add environment-aware app metadata
- prepare a QA checklist for each release

Professional lesson:

Shipping is a feature. A project is only professional when build and release workflows are reliable.

Definition of done:

- build process is documented
- release output is predictable
- fewer last-minute surprises

## Ongoing Review Checklist

Use this after every meaningful change:

- Is the code easier to understand than before?
- Did I reduce duplication or add to it?
- Are names clear and specific?
- Can this behavior be tested?
- Does the UI still work on smaller screens?
- Did I improve semantics and accessibility?
- If another developer opens this file tomorrow, will they trust it?

## Suggested Next Milestones For AfroTS_Config

Milestone 1:

- clean up `src/index.css`
- extract wizard constants
- reduce inline styles in `Welcome.jsx`

Milestone 2:

- introduce `useReducer`
- add local draft persistence
- create validation helpers

Milestone 3:

- add test setup
- cover one full happy path through the wizard
- cover one validation scenario

Milestone 4:

- improve accessibility of all selection controls
- make the client report and developer technical reference cleaner, more modular, and export-ready

## Recommended Mindset

Do not try to make it "advanced" all at once.

Make it professional by being:

- deliberate
- consistent
- testable
- reviewable
- maintainable

That is the real skill ceiling for web app work.

## Versioning Style

Use semantic versioning for roadmap and delivery planning:

- `0.0.1-beta.1` is the current beta baseline
- each minor change increments the rightmost number only
- example: `0.0.1-beta.1` → `0.0.2-beta.1` → `0.0.3-beta.1`
- use a higher version only when scope expands beyond a minor change
