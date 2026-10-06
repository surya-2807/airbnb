# Airbnb listing clone: project memory

Desktop-only clone of one Airbnb listing page + two overlays (Photo Tour, Lightbox).
The reference is the single source of truth; everything is written from scratch (no lifted code).

## Stack & commands
- React 18 + TypeScript (strict) + Vite. No UI library, no router: hash routes (`#/`, `#/photos`, `#/photos/:n`).
- `npm run dev` · `npm run build` (typecheck + build) · `npm run test:e2e` · `npm run shots`
- Styling: one hand-written `src/styles.css` using CSS custom properties. All px values are **CSS px**.

## Fidelity rules
- Reference screenshots were captured at **125% display scaling**: 1900 physical px = 1520 CSS px.
  Convert measurements: `css = physical / 1.25`. Container = 1120px; columns 653 / 371; grid gap 8px.
- Compare with `tools/visual` (same viewport + DPR as the reference) before claiming a match.
- Never guess motion timing silently. Note estimated values in README "Known gaps".
- Photos are labelled SVG placeholders (`src/data/placeholder.ts`); swap `src` in `src/data/photos.ts` for real assets.

## Code conventions
- One component per file in `src/components`, hooks in `src/hooks`, content in `src/data`.
- Overlays (Modal, PhotoTour, Lightbox) must: use `usePresence` (exit animation), `useFocusTrap`
  keyed on **mounted** state, `useScrollLock`, restore focus on close, close on Esc.
- Interactive elements are real `<button>`/`<a>`; never nest interactive elements.
- Respect `prefers-reduced-motion` (global rule at the end of `styles.css`).
- No `localStorage` needed; state lives in React. Keep data static: backend is out of scope.

## Definition of done
`npm run build` clean · `npm run test:e2e` all pass · visual compare reviewed for every changed view.
