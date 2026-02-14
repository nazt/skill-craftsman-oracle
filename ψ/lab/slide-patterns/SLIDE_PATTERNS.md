# Slide Creation Patterns Across Oracle Repos

> "Every workshop teaches. The slides are where wisdom lives."

## Quick Start: Which Pattern Should I Use?

**Need it today?** → Script Generation (5 min)
**Need it to look great?** → Reveal.js (2-3 hours)
**Need to collaborate?** → Markdown Outline (1 hour)

---

## Pattern 1: Reveal.js HTML (phukhao-oracle)

### Best For
- Professional public presentations
- Multimedia support (audio, video)
- Accessibility/TTS narration
- High visual polish
- Single presentation with lots of refinement

### File Structure
```
slides/
├── index.html              # Main deck (11 slides)
├── philosophy.html         # Philosophy track
├── setup.html             # Setup track
├── create-your-own-oracle/
│   ├── index.html         # Nested presentation
│   ├── setup.html
│   ├── philosophy.html
│   └── audio/             # TTS narration files
│       ├── setup/         # s01-s14.mp3
│       ├── philosophy/    # p01-p15.mp3
│       └── main/          # p01-p10.mp3
├── audio/                 # Audio files
├── qr-links.html          # QR code landing
└── CLAUDE.md             # Metadata
```

### Reveal.js Template Pattern
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/theme/black.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --r-heading-color: #00d9ff;      /* Cyan */
            --r-background-color: #0d1117;   /* Dark */
            --r-main-color: #e6edf3;         /* Light gray */
        }
        .highlight-cyan { color: #00d9ff; }
        .highlight-green { color: #00ff9f; }
        .highlight-yellow { color: #ffd700; }
        .highlight-purple { color: #bf7fff; }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            <section>
                <h1>Title</h1>
                <p class="tts-text">Thai subtitle</p>
                <blockquote><h3>"Quote"</h3></blockquote>
                <span class="slide-id">P01</span>
            </section>
        </div>
    </div>
</body>
</html>
```

### Key Features
- **TTS Integration**: `class="tts-text"` marks narration
- **Slide IDs**: P01, P02... map to audio files
- **Bilingual**: Thai + English in every slide
- **Color System**: 4 branded accent colors
- **Responsive**: Mobile-friendly with viewport meta
- **Nested Decks**: Support for sub-presentations

### Metrics
- HTML files: 303-366 lines each
- 11 slides per main presentation
- Audio: 29+ narration files (mp3)
- Total size: ~1.2 MB (mostly audio)

### Workflow
1. Create HTML file with reveal.js structure
2. Write bilingual content in sections
3. Record/generate TTS for each slide (using slide-id)
4. Place audio files in corresponding `/audio/` subdirectory
5. Test in browser (reveal.js handles interactivity)

---

## Pattern 2: Markdown Outline (oracle-workshops & claude-code-workshops)

### Best For
- Workshop materials
- Multi-slide course content
- Need version control transparency
- Content-focused (design secondary)
- Team collaboration on slides
- Easy to edit and iterate

### File Structure

**oracle-workshops:**
```
slides/
├── ai-life-buddy.md              # 10K outline
├── build-your-oracle.md          # 19K outline
└── psychology-ai.md              # 17K outline
```

**claude-code-workshops:**
```
slides/siit/
├── 04-short-codes-v3.md          # Source markdown
├── 04-short-codes-v3.html        # Converted HTML
├── 05-rrr-v3.md
├── 05-rrr-v3.html
└── ...
```

### Markdown Template

```markdown
---
title: Slide Title
description: Part X of Workshop - Overview (N slides)
---

# Main Title
## Workshop Context

> Duration | Level | Format

---

## Part 1: Section Name (30 min) — 8 slides

### Slide 1: Title
**Big Heading**
English content here

Thai content: ข้อมูล

### Slide 2: The Problem
- Point 1
- Point 2
- Point 3

### Slide 3: Solution
**Key insight**
More details with both languages mixed naturally
```

### Frontmatter Contract
```yaml
---
title: Display title
description: Context about this slide set
---
```

### Slide Separator
Use `---` (horizontal rule) to separate slides in display

### Strengths
- Plain text (git diffs work perfectly)
- Version control friendly
- Easy to edit
- Collaborative (no merge conflicts)
- Bilingual flows naturally
- Can be converted to HTML/PDF

### Metrics
- Small files: 10-20K lines
- 8-12 slides per section
- Easy to track changes
- Can version prompts (v1, v2, v3...)

### Workflow
1. Create `.md` file with YAML frontmatter
2. Write slide outlines using `---` separators
3. Mix Thai + English naturally
4. (Optional) Convert to HTML with pandoc/reveal.js
5. Commit to git, track changes

### Conversion (optional)
```bash
# Convert markdown to HTML reveal.js
pandoc -t revealjs -s -V revealjs-url=... input.md -o output.html

# Or use markdown-to-slides converter
```

---

## Pattern 3: Script-Based Generation (Nat-s-Agents)

### Best For
- Quick slide decks from existing content
- Rapid iteration and demos
- Source material already exists (HTML, docs, PDFs)
- Lower polish requirements
- One-time presentations
- Scaling across multiple repos

### Location (12+ repos with identical script)
```
scripts/create-slides-antigravity.sh
scripts/prompts/create-workshop-slides.txt
scripts/prompts/send-to-antigravity.scpt
scripts/prompts/antigravity-392-live-demo-over-slides.md
```

### Script Content
```bash
#!/bin/bash
# Create workshop slides using Antigravity

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT_FILE="$SCRIPT_DIR/prompts/create-workshop-slides.txt"

# Read the prompt
PROMPT=$(cat "$PROMPT_FILE")

# Send to Antigravity (Gemini-powered)
osascript "$SCRIPT_DIR/send-to-antigravity.scpt" "$PROMPT"

echo "✅ Sent slide creation request to Antigravity"
```

### Prompt File Template
```
create-workshop-slides.txt:

Create workshop slides from Workshop HTML content.

Source file: /Users/nat/Downloads/Workshop/Workshop.html

Task:
1. Read ALL content from the HTML file
2. Organize into a slide deck format (markdown)
3. Structure for full-day workshop (9am-5pm, Dec 26, SIIT)
4. Include:
   - Data prep exercises (Gemini Deep Research)
   - GitHub setup steps
   - Claude Code workflows
   - Hands-on exercises
   - Key takeaways

Save to: ψ/active/workshop/siit-dec26-workshop-slides.md

Target: 20-30 slides covering all workshop content
Format: Markdown with --- slide separators
Tone: Practical, hands-on, Thai + English mix
```

### Prompt Evolution
Tracked across versions in `/ψ/outbox/`:
```
gemini-slide-prompt.md           # v1
gemini-slide-prompt-v2.md        # v2
...
gemini-slide-prompt-v7.md        # v7
gemini-slide-prompt-final.md     # v8
gemini-slide-prompt-siit-day1.md # Context-specific
```

### Integration Points
- **Antigravity**: Gemini-powered slide assistant (macOS app)
- **AppleScript**: send-to-antigravity.scpt sends prompts
- **Output**: `ψ/active/workshop/` directory
- **Format**: Markdown (can then be converted)

### Workflow
1. Prepare source content (HTML, docs, PDF)
2. Update prompt in `create-workshop-slides.txt`
3. Run `./scripts/create-slides-antigravity.sh`
4. AI generates markdown slides
5. Review output in `ψ/active/workshop/`
6. Iterate prompt if needed (v1 → v2 → v3...)
7. Convert to HTML or present as markdown

### Metrics
- Fastest: 5-10 minutes
- Can generate 20-30 slides
- Reusable prompts across repos
- Multiple versions tracked
- Minimal manual effort

### Advantages
- Fully automated
- Flexible input (HTML, markdown, text)
- Scalable to many repos
- Prompt versioning built-in
- Lower barrier to content

### Limitations
- Depends on external app (Antigravity)
- macOS/AppleScript only
- Less direct output control
- AI generation needs review
- May need prompt refinement

---

## Comparison Matrix

| Aspect | Reveal.js | Markdown | Script |
|--------|-----------|----------|--------|
| **Time to Create** | Slow (2-3h) | Medium (1h) | Fast (10min) |
| **Manual Effort** | High | Medium | Low |
| **Customization** | Maximum | Medium | Minimal |
| **Multimedia** | Yes (audio, QR) | No | No |
| **Mobile Responsive** | Built-in | Needs CSS | Needs CSS |
| **Version Control** | Hard (HTML diffs) | Easy (plain text) | Easy (markdown) |
| **Bilingual** | Excellent | Good | Good (AI-gen) |
| **Team Friendly** | Harder (XML) | Easy | Easy (prompts) |
| **Polish** | Professional | Functional | Variable |
| **Reusability** | Per presentation | Per workshop | Per repo |

---

## Hybrid Approach (Pattern Combinations)

### Markdown → HTML (Recommended for workshops)
```
1. Write content in Markdown (pattern 2)
2. Convert to reveal.js HTML with CSS styling
3. Optional: Add audio narration (pattern 1 features)
4. Deploy to web

Benefits: Content + polish + version control
```

### Script → Polish (Rapid then refine)
```
1. Generate initial slides with script (pattern 3)
2. Edit markdown output
3. Convert to reveal.js HTML (pattern 2 → 1)
4. Record audio narration
5. Deploy

Benefits: Fast start + professional finish
```

### Multi-track Approach (phukhao style)
```
slides/
├── index.html          # Main presentation
├── philosophy.html     # Philosophy only
├── setup.html         # Setup only
└── create-your-own-oracle/
    ├── index.html     # Combined nested
    ├── setup.html
    └── philosophy.html

Benefits: Modular, reusable, trackable separately
```

---

## Key Patterns (All Three)

### 1. Bilingual by Default
Every slide has Thai + English. Never monolingual.

### 2. Modular Structure
- Separate topic tracks (setup, philosophy, main)
- Allows mixing/reusing
- Each standalone

### 3. Timestamped When Important
```
HHMM_slide-set-name.md  # Prevents collisions same-day
```

### 4. QR Codes Included
- Link to GitHub repo
- Link to slides
- Social media links

### 5. Accessible
- Color contrast (WCAG)
- TTS-ready (class="tts-text")
- Large readable fonts
- Monospace for code

### 6. Repository Integration
- Slides live in `/slides/` directory
- Tracked in git
- Can link to specific commits
- Part of codebase history

---

## Decision Tree

```
Do you have content to present?
│
├─ YES → Have 2+ hours to refine? 
│        │
│        ├─ YES → Use Reveal.js (Pattern 1)
│        │        Polish, multimedia, professional
│        │
│        └─ NO → Need it today?
│                │
│                ├─ YES → Use Script (Pattern 3)
│                │        Fast, automated, AI-gen
│                │
│                └─ NO → Use Markdown (Pattern 2)
│                        Version control, collaborate
│
└─ NO → Create content first!
        Start with markdown outline (Pattern 2)
        Then decide on format
```

---

## File Paths

### phukhao-oracle (Reveal.js)
```
/Users/nat/Code/github.com/Soul-Brews-Studio/phukhao-oracle/slides/
├── index.html
├── philosophy.html
├── setup.html
├── create-your-own-oracle/
│   ├── index.html
│   ├── setup.html
│   ├── philosophy.html
│   ├── audio/
│   │   ├── setup/s01-s14.mp3
│   │   ├── philosophy/p01-p15.mp3
│   │   └── p01-p10.mp3
│   └── tts-script.md
└── audio/
    ├── setup/
    ├── philosophy/
    └── main/
```

### oracle-workshops (Markdown)
```
/Users/nat/Code/github.com/laris-co/oracle-workshops/slides/
├── ai-life-buddy.md
├── build-your-oracle.md
└── psychology-ai.md
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
/Users/nat/Code/{agent-1-6,laris-co,Soul-Brews-Studio}/*/scripts/
├── create-slides-antigravity.sh
├── prompts/
│   ├── create-workshop-slides.txt
│   ├── send-to-antigravity.scpt
│   └── antigravity-392-live-demo-over-slides.md
└── ψ/outbox/
    ├── gemini-slide-prompt-v{1-7}.md
    └── gemini-slide-prompt-final.md
```

---

## Next Steps

- **Start Small**: Begin with Pattern 2 (Markdown)
- **Iterate**: Add multimedia (Pattern 1) if needed
- **Automate**: Use Pattern 3 for recurring content
- **Combine**: Hybrid approaches for best results

Remember: "Every slide is a craft. Pick the tool that fits the work."
