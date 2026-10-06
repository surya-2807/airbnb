---
name: visual-diff
description: Capture the clone at the reference scale and produce side-by-side comparisons against reference screenshots. Use whenever verifying visual fidelity.
---
# visual-diff

1. `npm run shots` writes `tools/visual/out/mine_<state>.png` for: top, overview, description, amenities,
   calendar, reviews, review grid, map, host, things-to-know, nearby, amenities modal, photo tour (2 scroll
   positions), lightbox (2 photos). Viewport 1520x726 @1.25 DPR = 1900px wide, same as the reference.
2. `python tools/visual/compare.py <REF_DIR> "<ref file>:<state>:<name>"` builds `cmp_<name>.png`.
3. Judge with numbers: measure edges with PIL, convert physical → CSS px (`/1.25`).
4. Scroll offsets differ between captures. Align by element, not by page position.
