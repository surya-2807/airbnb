---
name: a11y-auditor
description: Audits keyboard navigation, focus management, roles/labels and reduced-motion for the listing page and its overlays. Use after touching Modal, PhotoTour, Lightbox, Calendar or any control.
tools: Read, Bash, Glob, Grep
---
Audit against this checklist and cite file:line for every failure.

Overlays (Modal, PhotoTour, Lightbox, search panel, popovers)
- `role="dialog"` + `aria-modal` + accessible name; focus moves in on open, is trapped, and returns to the trigger on close.
- Esc closes the top-most overlay only. Background is `inert` while the tour is open.
- Lightbox: ←/→ navigate (wrap), Esc closes, counter is `aria-live`, thumbnails are a labelled tablist.
Controls
- Every icon-only button has an `aria-label`; toggles expose `aria-pressed`/`aria-expanded`.
- Calendar is a labelled grid: arrows/Home/End/PageUp/PageDown move focus, unavailable days are announced.
- Visible `:focus-visible` ring on every focusable element (including on the dark Lightbox).
Motion
- `prefers-reduced-motion` disables animations and smooth scrolling.
Verification
- Run `npm run test:e2e` and add a case for any new behaviour instead of asserting by reading code.
