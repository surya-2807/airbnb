# Airbnb listing clone (desktop)

Listing page + **Photo Tour** + **Lightbox**, built from scratch with React 18 + TypeScript + Vite.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run test:e2e   # 38 behaviour / accessibility checks (headless Chromium via Playwright)
```
Deploy: `vercel` (framework preset "Vite"), or serve `dist/` from any static host.

## What's implemented
| Area | Details |
|---|---|
| Header | Logo, pill search (expands into a Where / Check in / Check out / Who panel with destination list, calendar and guest steppers), Become a host, language, menu dropdown |
| Hero | 1+4 grid (8px gaps, 12px radius), hover shade, "Show all photos", Share (modal) and Save (heart pop) |
| Sticky section bar | Appears after the hero; scroll-spy underline for Photos / Amenities / Reviews / Location; price + Reserve |
| Booking card | Sticky; date-range popover, guests popover (max 3, infants/pets rules), live price, price breakdown on Reserve, pointer-tracked gradient CTA |
| Content | Overview, guest-favourite badge, highlights, translated description (Show more/less, Show original), where you'll sleep, amenities + categorised modal (struck-through unavailable items), 2-month range calendar (booked/blocked days), reviews (distribution bars, category scores, chips, Show more, "all reviews" modal), pannable/zoomable map, host card, things to know (modals), nearby-stays carousel (1/2 pager) |
| Photo Tour | Full-screen, room thumbnails with scroll-spy, sticky room titles, 1/2/1/2 mosaic per room, opens from any hero image |
| Lightbox | Opens from any tour photo; prev/next arrows, **←/→**, Esc, wrap-around, counter, thumbnail strip, neighbour preloading, direction-aware slide |
| Routing | `#/photos` and `#/photos/:n` are deep-linkable; Back/Forward close overlays one level at a time |
| Accessibility | Dialog roles, focus trap + restore, `inert` background, skip link, labelled icon buttons, `aria-pressed/expanded/current`, calendar grid with arrow/Home/End/PageUp/PageDown, visible focus ring, `prefers-reduced-motion` |

## How fidelity was checked
The reference screenshots were taken at **125% display scaling** (1900 physical px = 1520 CSS px), so the
container is 1120px, columns 653/371, hero 560px + 2 × 272px with 8px gaps, header 88px. `tools/visual`
renders this build at the same viewport/DPR and produces reference-vs-clone side-by-sides; numbers are
measured with PIL rather than eyeballed. See `.claude/` for the sub-agents and skills used in that loop.

## Known gaps (please read)
- **Photos are labelled placeholders**: the original images weren't available. Replace `src` in `src/data/photos.ts`.
- **Font**: the reference uses Airbnb Cereal (proprietary). This build bundles Figtree (OFL) as the closest open match, so glyph widths differ slightly.
- **Logo**: an original mark/wordmark, not Airbnb's artwork.
- **Lightbox**: no reference screenshot existed, so the design follows the standard pattern; motion timings (≈200–320ms, ease-out) are estimates for all animations.
- Amenities modal lists the ~44 items visible in the screenshots under a "Show all 50" label. Review list beyond the 6 shown, price-breakdown fees, Hindi "original" text and co-host avatars are illustrative content.
- Sticky bar appearance threshold (hero bottom passes −80px) was inferred from two screenshots.
- Desktop only, per the brief.

## Structure
```
src/components  UI (one component per file)     src/hooks  focus trap, presence, scroll spy/lock, booking state
src/data        listing content + photo model   tools/visual  screenshots, side-by-side diff, e2e suite
docs/           architecture diagram (svg/png/pdf + generator)   .claude/  agents, skills   CLAUDE.md  project memory
```
