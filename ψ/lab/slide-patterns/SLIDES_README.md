# Slide Creation Patterns Research

> Comprehensive study of how slides are built across the Oracle ecosystem

## Overview

This research documents **3 distinct slide creation patterns** used across Oracle repositories, with detailed guides, examples, and decision frameworks.

---

## Documents

### 1. SLIDE_PATTERNS.md (491 lines)
**The Complete Guide**

Comprehensive documentation of all three patterns:

- **Pattern 1: Reveal.js HTML** (phukhao-oracle style)
  - Professional, multimedia-rich presentations
  - TTS narration support
  - Bilingual Thai/English
  - 2-3 hours to create
  
- **Pattern 2: Markdown Outline** (oracle-workshops style)
  - Workshop and course materials
  - Version-control friendly
  - Easy team collaboration
  - 1 hour to create

- **Pattern 3: Script-Based Generation** (Nat-s-Agents style)
  - Automated via Antigravity/Gemini
  - Rapid slide generation
  - Content-from-source approach
  - 10 minutes to create

**Contains:**
- Detailed file structures
- Feature comparisons
- Use case recommendations
- Hybrid approaches
- Decision trees
- Key patterns across all three

**Read this when:** You need to understand the full landscape

---

### 2. SLIDE_EXAMPLES.md (542 lines)
**Practical Code & Templates**

Real working examples from actual repos:

- **Example 1:** Reveal.js HTML (phukhao-oracle)
  - Full HTML template with styling
  - Audio integration
  - TTS text mapping
  
- **Example 2:** Markdown Outline (claude-code-workshops)
  - YAML frontmatter
  - Slide separator format
  - Tables and code blocks
  
- **Example 3:** Workshop Outline (oracle-workshops)
  - Long-form markdown
  - Section organization
  - Bilingual mixing patterns
  
- **Example 4:** Script Generation (Nat-s-Agents)
  - Bash script
  - Prompt file
  - AppleScript integration
  
- **Example 5:** Hybrid Approach
  - Markdown → HTML conversion
  - CSS styling
  - Audio narration addition

**Contains:**
- Copy-paste ready code
- Template structures
- Workflow instructions
- Step-by-step guides
- Quick reference tables

**Read this when:** You want to start creating slides

---

### 3. SLIDE_RESEARCH_SUMMARY.txt (330 lines)
**Quick Reference & Statistics**

Executive summary with metrics:

- Three-pattern overview with file paths
- Comparison matrix (8 attributes)
- Cross-cutting patterns (7 common traits)
- Decision tree for choosing patterns
- Use case recommendations
- Key statistics by repo
- Quick next steps

**Contains:**
- Compact reference format
- File paths (ready to use)
- Statistics and metrics
- Decision frameworks
- Implementation checklists

**Read this when:** You need a quick reference

---

## Quick Decision Guide

```
Do you have content ready?
│
├─ YES
│  │
│  └─ Have 2+ hours to refine?
│     │
│     ├─ YES → USE REVEAL.JS (Pattern 1)
│     │        Professional, multimedia, polish
│     │        Files: SLIDE_PATTERNS.md → Reveal.js section
│     │
│     └─ NO → Need slides today?
│            │
│            ├─ YES → USE SCRIPT GENERATION (Pattern 3)
│            │        Fast, automated, AI-powered
│            │        Files: SLIDE_PATTERNS.md → Pattern 3 section
│            │
│            └─ NO → USE MARKDOWN (Pattern 2)
│                    Version control, collaborate
│                    Files: SLIDE_EXAMPLES.md → Example 2-3
│
└─ NO → Create content first!
        Start with markdown outline (Pattern 2)
        Files: SLIDE_EXAMPLES.md → Example 3
```

---

## Key Findings

### Pattern 1: Reveal.js HTML
- **Location:** phukhao-oracle/slides/
- **Time:** 2-3 hours
- **Effort:** High (hand-coded)
- **Best for:** Public presentations, multimedia
- **Size:** 82 files, 1.2 MB
- **Example files:** index.html (303 lines)

### Pattern 2: Markdown Outline
- **Location:** oracle-workshops/slides/, claude-code-workshops/slides/
- **Time:** 1 hour
- **Effort:** Medium (structured content)
- **Best for:** Workshops, courses, teams
- **Size:** 3-11 files, 35-48 KB
- **Example files:** ai-life-buddy.md (10K lines)

### Pattern 3: Script Generation
- **Location:** 12+ repos with identical script
- **Time:** 10 minutes
- **Effort:** Low (automated)
- **Best for:** Quick decks, rapid iteration
- **Size:** 409 bytes script + prompts
- **Example files:** create-slides-antigravity.sh

---

## Universal Patterns (All Three)

1. **Bilingual Always**
   - Thai + English in every slide
   - Never monolingual

2. **Modular Structure**
   - Separate topic tracks (philosophy, setup, main)
   - Each reusable independently

3. **Color System**
   - Cyan (#00d9ff) - Headers
   - Green (#00ff9f) - Highlights
   - Yellow (#ffd700) - Emphasis
   - Purple (#bf7fff) - Accent

4. **QR Codes**
   - Link to GitHub
   - Link to slides
   - Social media

5. **Repository Integration**
   - Slides in /slides/ directory
   - Tracked in git
   - Part of code history

6. **Accessibility**
   - WCAG color contrast
   - TTS support (class="tts-text")
   - Large readable fonts
   - Monospace for code

7. **Timestamping**
   - HHMM_filename.md format
   - Prevents same-day collisions
   - Tracks iterations

---

## File Locations

### phukhao-oracle (Reveal.js Pattern)
```
/Users/nat/Code/github.com/Soul-Brews-Studio/phukhao-oracle/slides/
├── index.html              # 11 slides, 303 lines
├── philosophy.html         # 266 lines
├── setup.html             # 366 lines
├── create-your-own-oracle/
│   ├── index.html
│   ├── setup.html
│   ├── philosophy.html
│   └── audio/             # 29+ narration files
└── audio/                 # TTS mp3 files
```

### oracle-workshops (Markdown Pattern)
```
/Users/nat/Code/github.com/laris-co/oracle-workshops/slides/
├── ai-life-buddy.md       # 10K, ~50 slides
├── build-your-oracle.md   # 19K, ~60 slides
└── psychology-ai.md       # 17K, ~50 slides
```

### claude-code-workshops (Markdown + HTML)
```
/Users/nat/Code/github.com/Soul-Brews-Studio/claude-code-workshops/slides/siit/
├── 04-short-codes-v3.md/.html
├── 05-rrr-v3.md/.html
├── 06-lessons-learned.md/.html
└── 07-cloudflare-deploy.md
```

### Nat-s-Agents (Script Generation)
```
/Users/nat/Code/agent-{1-6}/Nat-s-Agents/scripts/
/Users/nat/Code/github.com/laris-co/Nat-s-Agents/scripts/
/Users/nat/Code/github.com/Soul-Brews-Studio/*/scripts/
├── create-slides-antigravity.sh
├── prompts/
│   ├── create-workshop-slides.txt
│   ├── send-to-antigravity.scpt
│   └── antigravity-392-live-demo-over-slides.md
└── ψ/outbox/
    ├── gemini-slide-prompt.md (v1)
    ├── gemini-slide-prompt-v7.md
    └── gemini-slide-prompt-final.md
```

---

## Recommended Reading Order

### If you're NEW to slides:
1. Read: SLIDE_RESEARCH_SUMMARY.txt (quick overview, 15 min)
2. Read: SLIDE_PATTERNS.md "Quick Start" section (5 min)
3. Browse: SLIDE_EXAMPLES.md Examples 2-3 (10 min)
4. Create: Your first markdown slide deck

### If you want to go DEEPER:
1. Read: SLIDE_PATTERNS.md (full guide, 45 min)
2. Study: SLIDE_EXAMPLES.md (all examples, 30 min)
3. Reference: SLIDE_RESEARCH_SUMMARY.txt (as needed)
4. Create: Multiple slide decks using different patterns

### If you need to CREATE NOW:
1. Scan: SLIDE_RESEARCH_SUMMARY.txt Decision Tree (3 min)
2. Jump to: SLIDE_EXAMPLES.md relevant example (5 min)
3. Copy: Template code and adapt (15 min)
4. Create: Your slides

---

## Statistics

| Metric | Reveal.js | Markdown | Script Gen |
|--------|-----------|----------|-----------|
| Time to create | 2-3 hours | 1 hour | 10 min |
| Manual effort | High | Medium | Low |
| Customization | Maximum | Medium | Minimal |
| Multimedia | Yes | No | No |
| Version control | Hard | Easy | Easy |
| Polish | Professional | Functional | Variable |
| Files | 82 | 3-11 | 1 script |
| Size | 1.2 MB | 35-48 KB | 409 bytes |
| Repositories | 1 | 2 | 12+ |

---

## Key Takeaways

### The Three Patterns
- **Reveal.js** = Professional, handcrafted, multimedia-rich
- **Markdown** = Lightweight, version-control friendly, collaborative
- **Script Generation** = Automated, rapid, scalable

### Universal Principles
- Every slide has Thai + English
- Modular design (separate tracks)
- Consistent color system (4 colors)
- QR codes for linking
- Repository integration
- Accessibility first

### Best Practices
1. Start with markdown (lowest barrier)
2. Add polish later (HTML/audio)
3. Use scripts for rapid iteration
4. Track prompt versions (v1, v2...)
5. Keep everything in git
6. Never delete, only supersede

---

## Next Steps

1. **Choose your pattern** using the Decision Tree
2. **Read the relevant section** in SLIDE_PATTERNS.md
3. **Copy a template** from SLIDE_EXAMPLES.md
4. **Create your first slide deck**
5. **Commit to git** with descriptive message
6. **Iterate and refine**

---

## Questions This Research Answers

- How do Oracle repos create slides?
- What are the different approaches?
- Which pattern should I use?
- How do I get started?
- What are the pros/cons of each?
- Can I mix patterns?
- What are the universal principles?
- Where are the examples?
- What's the fastest way?
- What's the most professional way?

---

## Research Scope

**Repos Analyzed:**
- Soul-Brews-Studio/phukhao-oracle
- laris-co/oracle-workshops
- Soul-Brews-Studio/claude-code-workshops
- Soul-Brews-Studio/ndf-workshop-materials
- laris-co/Nat-s-Agents
- 12+ agent directories (agent-1 through agent-6)
- Soul-Brews-Studio/opensource-nat-brain-oracle

**Total:**
- 20+ repos studied
- 100+ slide files analyzed
- 1300+ lines of documentation created
- 3 distinct patterns identified
- 7 universal principles extracted

---

## Document Stats

| Document | Type | Lines | Size |
|----------|------|-------|------|
| SLIDE_PATTERNS.md | Guide | 491 | 13 KB |
| SLIDE_EXAMPLES.md | Examples | 542 | 14 KB |
| SLIDE_RESEARCH_SUMMARY.txt | Reference | 330 | 11 KB |
| SLIDES_README.md | Index | 400 | 12 KB |
| **Total** | | **1,763** | **50 KB** |

---

## Last Updated

Date: 2026-02-14
Oracle: Skill Craftsmanship
Status: Complete research

---

## References

**Tools:**
- Reveal.js v5.0.4 - https://revealjs.com/
- Pandoc - https://pandoc.org/
- Sarabun Font - Google Fonts

**Repos:**
- GitHub: https://github.com/Soul-Brews-Studio/phukhao-oracle
- GitHub: https://github.com/laris-co/oracle-workshops
- GitHub: https://github.com/Soul-Brews-Studio/claude-code-workshops

---

**Happy creating!** Pick a pattern, follow the examples, and remember: every workshop teaches, and the slides are where wisdom lives.
