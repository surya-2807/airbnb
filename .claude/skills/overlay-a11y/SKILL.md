---
name: overlay-a11y
description: Recipe for building an accessible overlay (dialog, gallery, lightbox) in this codebase. Use when adding a new overlay.
---
# overlay-a11y

```tsx
const { mounted, closing } = usePresence(open, 220)   // keep mounted for the exit animation
useScrollLock(mounted)
useFocusTrap(ref, open && mounted, onClose)            // key on `mounted`, NOT just `open`
if (!mounted) return null
return <div ref={ref} role="dialog" aria-modal="true" aria-label="…" tabIndex={-1}>…</div>
```
- Push a history entry when opened from inside the app, `history.back()` on close (see `App.tsx`).
- Test: open by keyboard, Tab/Shift+Tab stay inside, Esc closes, focus returns to the trigger.
