# Global CSS Over Inline Styles

**Date**: 2026-02-15
**Context**: Iterating on reveal.js slides

## Pattern

When a CSS fix works on one element, promote it to global CSS immediately instead of applying inline styles to each instance.

**Before**: `<h2 style="font-size:1.6em;margin-bottom:1.5em">` on every slide
**After**: `.reveal h2 { margin-bottom: 1.5em; }` — one line, all slides benefit

## Related Lessons

- Reveal.js `**bold**` renders as `<strong>` which has CSS `color: #ffd700` — this OVERRIDES inline `style="color:..."`. Fix: use `<span style="color:#ff6b6b;font-weight:700">` instead.
- Slide highlight color: use ONE color (`#ff6b6b` red) for all emphasis. Never mix colors — audience gets confused.
- Nat's principle: "สีเดียว ไม่งง" — one color, no confusion.

## Tags

slides, css, reveal.js, design-pattern
