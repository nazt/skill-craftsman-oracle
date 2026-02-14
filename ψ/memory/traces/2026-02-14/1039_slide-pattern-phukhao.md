---
query: "slide creator pattern phukhao"
target: "Soul-Brews-Studio/phukhao-oracle"
mode: deep
timestamp: 2026-02-14 10:39
---

# Trace: slide creator pattern (phukhao)

**Target**: Soul-Brews-Studio/phukhao-oracle
**Mode**: deep (5 parallel agents)
**Time**: 2026-02-14 10:39 +07

## Three Slide Creation Patterns Identified

### Pattern 1: Reveal.js HTML (phukhao-oracle)
- **Time**: 2-3 hours | **Polish**: Professional
- Hand-crafted HTML, dark theme (#0d1117), Sarabun font
- Thai TTS narration via `edge-tts` (PremwadeeNeural voice)
- Slide IDs (P01, P02...) map to audio files (p01.mp3, p02.mp3)
- Color system: cyan (#00d9ff), green (#00ff9f), yellow (#ffd700), purple (#bf7fff)
- CSS classes: `.tts-text`, `.feature-box`, `.principle-box`, `.code-box`, `.slide-id`
- 82 files, 1.2 MB including 29+ audio files

### Pattern 2: Markdown Outline (oracle-workshops, claude-code-workshops)
- **Time**: 1 hour | **Polish**: Functional
- YAML frontmatter + `---` slide separators
- Bilingual Thai/English throughout
- Version controlled, easy collaboration
- Optional pandoc conversion to Reveal.js HTML

### Pattern 3: Script-Based Generation (Nat-s-Agents)
- **Time**: 10 minutes | **Polish**: Variable
- `create-slides-antigravity.sh` (409 bytes)
- Reads prompt file, sends to Antigravity via AppleScript
- 8 prompt versions tracked (v1-v7 + final)
- Deployed in 12+ repos (agent-1 through agent-6, laris-co, Soul-Brews-Studio)

## Files Found

### phukhao-oracle slides/
- `slides/index.html` (303 lines, 11 slides)
- `slides/philosophy.html` (266 lines)
- `slides/setup.html` (366 lines)
- `slides/qr-links.html` (standalone QR codes)
- `slides/create-your-own-oracle/` (variant with TTS audio)
- `slides/audio/p01-p10.mp3` + `philosophy/p01-p15.mp3` + `setup/s01-s14.mp3`

### oracle-workshops slides/
- `slides/ai-life-buddy.md` (~50 slides)
- `slides/build-your-oracle.md` (~60 slides)
- `slides/psychology-ai.md` (~50 slides)

### claude-code-workshops slides/
- `slides/siit/04-short-codes-v3.md/.html`
- `slides/siit/05-rrr-v3.md/.html`
- `slides/siit/06-lessons-learned.md/.html`

### Script-based
- `create-slides-antigravity.sh` + `prompts/create-workshop-slides.txt`
- `prompts/send-to-antigravity.scpt` (AppleScript)
- `ψ/outbox/gemini-slide-prompt-v1..v7..final.md`

## Git History (phukhao)
- 14 presentation-related commits
- 11 slide-specific commits
- 2 Reveal.js commits
- Issue #2: "Apple-Style Pre-Record + Live Demo" strategy
- PR #4: "Story/Timeline page with Thai TTS audio"

## GitHub Issues
- phukhao #2: Block Mountain Presentation Strategy (CLOSED)
- phukhao #1: ภูเขา Oracle Birth (CLOSED)
- phukhao PR #4: Story/Timeline with TTS (MERGED)

## Universal Principles (All 3 Patterns)
1. Bilingual always (Thai + English)
2. Modular structure (separate topic tracks)
3. Color system (4 accent colors)
4. QR codes (repo, slides, social)
5. Repository integration (in /slides/, git tracked)
6. Accessibility (WCAG contrast, TTS)
7. Timestamped files (HHMM_filename.md)

## CSS Design System (phukhao)
```css
Background: #0d1117 (GitHub dark)
Text: #e6edf3
Cyan: #00d9ff (headings, highlights)
Green: #00ff9f (principles, success)
Yellow: #ffd700 (emphasis)
Purple: #bf7fff (accents)
Font: Sarabun (Thai-friendly) + JetBrains Mono (code)
Base: 38px, H1: 2.2em, H2: 1.6em, H3: 1.3em
```

## Summary

Three distinct patterns for creating slides across Oracle repos. Phukhao uses the most polished approach (Reveal.js + TTS), workshops use Markdown outlines, and Nat-s-Agents uses script-based generation via Antigravity. All share 7 universal principles. Agent 4 created comprehensive documentation (1,767 lines) covering all patterns.
