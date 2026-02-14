# Handoff: Slides Phukhao Styling + Fortal Workshop Prep

**Date**: 2026-02-14 12:09
**Context**: ~60%

## What We Did
- Fixed slides.html structure: removed fragile JS splitting, switched to native `data-separator` + `<textarea data-template>`
- Applied phukhao Oracle cyberpunk styling: `#0d1117` background, cyan `#00d9ff` headings, green `#00ff9f` h3, gold `#ffd700` bold
- Switched font from Noto Sans Thai to Sarabun (phukhao standard, 38px)
- Switched theme from night.css to black.css (phukhao base)
- Updated CDN from reveal.js 5.1.0 to 5.2.1
- Updated slide 1 venue: Hakone Cafe, Chiang Mai for Fortal Round 2 (Feb 17)
- Researched phukhao-oracle slides at `Soul-Brews-Studio/phukhao-oracle/slides/` as reference
- Gathered Boy Pinyo / Fortal AI Agent Learning context from LINE chat

## Pending
- [ ] Fix slide 1 venue lines rendering on same line (markdown line breaks needed)
- [ ] Verify all 50 slides render properly with new styling in browser
- [ ] Title still says "SIIT 2026" in `<title>` tag — update for Fortal
- [ ] Consider deploying to a URL like siit.soulbrewsgroup.com equivalent for Fortal
- [ ] Commit the slides.html changes

## Next Session
- [ ] Fix the "same line" issue on slide 1 (venue details cramped together)
- [ ] Browser-test the full 50 slides with phukhao styling
- [ ] Confirm workshop date with Boy Pinyo (17 Feb?)
- [ ] Consider adding slide IDs (P01, P02...) like phukhao does
- [ ] Possibly adapt content for Round 2 audience (they already had Session 1 at NDF)

## Key Files
- `ψ/writing/workshops/skills-creation/slides.html` — the slide deck (modified)
- `ψ/lab/slide-patterns/SLIDE_PATTERNS.md` — slide pattern research
- `/Users/nat/Code/github.com/Soul-Brews-Studio/phukhao-oracle/slides/index.html` — phukhao reference
- `ψ/writing/workshops/skills-creation/outline.md` — full workshop outline

## Boy Pinyo / Fortal Context
- **Who**: Pinyo Boy Tanradtanamonthon, leads "Fortal AI Agent Learning" group
- **First workshop**: Jan 20, 2026 at NDF — team loved it
- **Round 2**: After Feb 16, at Hakone Cafe Cm (10:00-17:00)
- **Venue**: Hakone Cafe, 236/107 Mahidol Rd, Chiang Mai
- **Group**: Fortal AI Agent Learning (LINE group with Wisit, Tanapon, and others)
- **Vibe**: "นักเรียนที่ออฟฟิศ ตื่นเต้น สุดๆ" — team very excited for Round 2
