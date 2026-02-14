---
title: Reveal.js slide styling lessons: (1) Use ONE highlight color (#ff6b6b red) for a
tags: [slides, css, reveal.js, design, highlight-color]
created: 2026-02-14
source: rrr: nazt/hello-oracle
---

# Reveal.js slide styling lessons: (1) Use ONE highlight color (#ff6b6b red) for a

Reveal.js slide styling lessons: (1) Use ONE highlight color (#ff6b6b red) for all emphasis — never mix colors, audience gets confused. Nat's rule: "สีเดียว ไม่งง". (2) **bold** renders as <strong> which has CSS color: #ffd700 — overrides inline styles. Fix: use <span style="color:...;font-weight:700"> instead. (3) When a CSS fix works on one element, promote to global CSS immediately — e.g., margin-bottom: 1.5em on .reveal h2 instead of inline style per slide. One line change, all slides benefit.

---
*Added via Oracle Learn*
