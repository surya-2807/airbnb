# Inbox (7,167)

## Overview

**Product:** Inbox (7,167)
**URL:** https://mail.google.com/mail/u/0/#inbox
**Surface type:** documentation
**Audience:** Technical users
**Brand character:** Developer-oriented knowledge base with a rich, diverse color palette and a complementary two-font typographic system.

> **Note:** Surface detection confidence is low. Verify the inferred audience and brand context before relying on this file.

### Design Principles

- Clarity over density — every element should reduce time-to-answer.
- Scannable structure — use hierarchy so users find before they read.
- Code-first — code examples are primary content, prose is secondary.

## Colors

| Token | Value | Role |
|-------|-------|------|
| color-9 | `#F8FAFD` | Background |
| color-8 | `#C2E7FF` | Surface |
| color-1 | `#202124` | Text Primary |
| color-2 | `#444444` | Text Primary |
| color-3 | `#0000EE` | Text Primary |
| color-4 | `#444746` | Text Primary |
| color-5 | `#5E5E5E` | Text Primary |
| color-6 | `#5F6368` | Text Primary |
| color-7 | `#B8B8B8` | Text Light |

## Typography

**Font stack:** Google Sans, Google Sans Text

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 0px | Captions, metadata |
| text-sm | 12px | Labels, secondary text |
| text-base | 13px | Body text (default) |
| text-lg | 16px | Subheadings, emphasis |
| text-xl | 32px | Section headings |

**Weight scale:** 400 · 500 · 700
**Line heights:** 0px · 27px · 20px · 18px · 32px · 16px

## Spacing

**Base unit:** 4px

`space-1: 4px` · `space-2: 5px` · `space-3: 6px` · `space-4: 8px` · `space-5: 9px` · `space-6: 10px` · `space-7: 11px` · `space-8: 12px` · `space-9: 13px` · `space-10: 16px` · `space-11: 20px` · `space-12: 24px` · `space-13: 26px` · `space-14: 32px` · `space-15: 36px` · `space-16: 43px` · `space-17: 51px` · `space-18: 111px` · `space-19: 119px` · `space-20: 137px` · `space-21: 187px` · `space-22: 881px`

## Shapes

**Border radius:** `radius-sm: 0px 16px 16px 0px` · `radius-md: 0px 2px 2px 0px` · `radius-lg: 2px` · `radius-xl: 2px 0px 0px 2px` · `radius-full: 4px` · `radius-6: 15px` · `radius-7: 16px` · `radius-full: 50%` · `radius-9: min(100%, 20px)` · `radius-full: 9999px`

## Elevation

- **shadow-sm:** `rgba(100, 121, 143, 0.12) 0px -1px 0px 0px inset`
- **shadow-md:** `rgba(100, 121, 143, 0.3) 0px 0px 0px 1px inset`
- **shadow-lg:** `rgba(0, 0, 0, 0) 0px 1px 2px 0px, rgba(0, 0, 0, 0) 0px 1px 3px 1px`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-fast:** `box-shadow 0.08s linear, min-width 0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- **duration-fast:** `opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- **duration-fast:** `background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)`
- **duration-base:** `margin-top 0.2s, height 0.2s`
- **duration-base:** `opacity 0.2s ease-in-out`
- **duration-base:** `top 0.2s ease-in`
- **duration-base:** `opacity 0.2s ease-in-out, top 0.2s ease-in`
- **duration-base:** `background-color 0.3s`
- **duration-base:** `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

## Components

- **Buttons:** 105 detected
- **Links:** 21 detected
- **Inputs:** 2 detected
- **Navigation:** 1 elements
- **Lists:** 51 detected
- **Tables:** 2 detected
- **Forms:** 2 detected
- **Images:** 332 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (0px 16px 16px 0px, 0px 2px 2px 0px, 2px, 2px 0px 0px 2px, 4px, 15px, 16px, 50%, min(100%, 20px), 9999px).
- Do not center-align body text or code blocks.
- Do not use more than two font weights on a single page.
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Clear, precise, developer-oriented. Prefer short sentences and imperative verbs.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 105 detected
- **Links:** 21 detected
- **Inputs:** 2 detected
- **Navigation:** 1 elements
- **Lists:** 51 detected
- **Tables:** 2 detected
- **Forms:** 2 detected
- **Images:** 332 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
