# Handoff: Slides Overflow Fix + Text Density Feedback

**Date**: 2026-02-14 12:21
**Context**: ~40%

## What We Did
- Fixed slide 1 venue line breaks: added `<br>` tags so date/location/instructor/organizer render on separate lines
- Updated `<title>` tag from "SIIT 2026" to "Fortal 2026"
- Fixed slide 35 (Architecture Diagram): trimmed ASCII art to fit viewport — Hub File now visible
- Split slide 50 (Resources & Thank You) into 3 slides: Resources, Cheat Sheet, Key Takeaways, Thank You
- Simplified slide 49 (Decision Tree): replaced verbose ASCII tree with compact table + Quick Check bullets
- Browser-tested via /dev-browser — captured screenshots of all key slides
- Identified remaining overflow: slides 49 (Ritual bullet cut off), 50 (cheat sheet still overflows)
- Total slides: 52 → 54 (after splits)

## Pending
- [ ] **TEXT DENSITY REFACTOR (WHOLE DECK)** — Nat's key feedback: too much text per slide, examples should be separate slides
- [ ] Fix remaining overflow on slide 49 (Quick Check "Ritual" line) and slide 50 (Cheat Sheet code)
- [ ] Slides 5, 9, 11, 12, 20, 25, 28, 29, 33, 34, 36, 37, 39, 40, 42, 47 all need concept/example splits
- [ ] Commit current fixes (overflow + title)
- [ ] Content adaptation for Fortal Round 2 (they already had Session 1 at NDF Jan 20)
- [ ] Optional: Add slide IDs (P01, P02...) like phukhao does
- [ ] Optional: Deploy to URL for Fortal access

## Next Session
- [ ] **Major: Text density refactor across all ~54 slides** — split concept/example into separate slides
  - Goal: Each slide has ONE idea. Examples go on the next slide.
  - Will increase to ~65-70 slides but each is cleaner
  - Priority slides to split: 9 (Description Trigger), 11 (ARGUMENTS), 12 (Local vs Global), 20 (Test), 25 (Why Bun Shell), 28 (Variable Interpolation), 29 (Three Output Patterns), 33 (Exercise 2), 36 (Mode Escalation), 37 (Haiku Economics), 39 (Path Discipline), 40 (Time-Prefix), 47 (Build Demo-Worthy)
- [ ] Browser-test final result with /dev-browser
- [ ] Commit all changes
- [ ] Consider Round 2 adaptations (reference Session 1 material)

## Key Files
- `ψ/writing/workshops/skills-creation/slides.html` — the slide deck (modified, not committed)
- `ψ/inbox/handoff/2026-02-14_1209_slides-phukhao-styling.md` — previous handoff
- Phukhao reference: `/Users/nat/Code/github.com/Soul-Brews-Studio/phukhao-oracle/slides/index.html`

## Nat's Feedback (Critical)
"ตัวหนังสือต่อหนึ่งหน้ามันเยอะไปหน่อย มันเลยทำให้ต้องอ่านเยอะ เห็นแล้วท้อ"
"ตัวอย่างควรอยู่ในหน้าถัดไป"
Translation: Too much text per slide makes audience feel overwhelmed. Examples should be on the next slide, not crammed in.
