# Prompt log

Development was done in a single Claude chat session (Claude Sonnet 5) with file/shell tools, a bundled headless
Chromium for screenshots, and Playwright for tests. Prompts are listed in order; the second column is what the
assistant did in response. **Append your own prompts here if you used other tools (Cursor, Codex, Claude Code).**

| # | Prompt (verbatim / abridged) | Outcome |
|---|---|---|
| 1 | The take-home brief: build a pixel-perfect clone of the Airbnb listing + Photo Tour + Lightbox at the reference URL, desktop only, plus an architecture diagram, sub-agent configs and this prompt log. | Tried to fetch the reference; the site blocks automated access, so asked for screenshots instead of guessing. Proposed diagram + scaffold in the meantime. |
| 2 | "so u understand the requirements ?" | Restated deliverables, constraints (no code lifting, private repo), and the blocker. |
| 3 | Uploaded a zip of 33 screenshots: "can u able to see the image the whole frontend site?" | Extracted, built contact sheets, inventoried every section/overlay, identified gaps (no Lightbox shot, no motion). Discovered 125% capture scale from pixel measurements (1900px → 1520 CSS px; 1120px container). |
| 4 | Attached a structural/interactive breakdown of the page (header, hero, scrollspy tour, sticky booking widget, amenities modal, reviews, map). | Used as behavioural spec; screenshots kept as source of truth where they disagreed (e.g. tour thumbnails are a top strip, not a left sidebar). |
| 5 | "Continue" | Built the app, then ran a screenshot-vs-reference loop (fixed laurel, gradient, font, sticky tour titles, map, spacing), found and fixed a focus-trap mount bug and a history-unwinding bug via Playwright, generated the diagram, agent configs, README and zip. |

## Sub-agent / skill usage
`ui-fidelity-reviewer` (screenshot diffing) · `a11y-auditor` (keyboard/focus checklist) · `code-quality-reviewer` (hooks/structure)
· `interaction-tester` (Playwright suite) · skills `visual-diff`, `overlay-a11y`. Definitions live in `.claude/`.
