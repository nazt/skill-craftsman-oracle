# Slide Creation Examples

## Example 1: Reveal.js HTML (phukhao-oracle)

### File: `/slides/index.html`
```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Your Own Oracle</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/theme/black.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --r-main-font: 'Sarabun', sans-serif;
            --r-heading-font: 'Sarabun', sans-serif;
            --r-heading-color: #00d9ff;
            --r-background-color: #0d1117;
            --r-main-color: #e6edf3;
        }
        .reveal { font-size: 38px; }
        .reveal h1 { font-size: 2.2em; color: #00d9ff; }
        .reveal h2 { font-size: 1.6em; color: #00d9ff; }
        .reveal h3 { font-size: 1.3em; color: #00ff9f; }
        .highlight-cyan { color: #00d9ff; }
        .highlight-green { color: #00ff9f; }
        .highlight-yellow { color: #ffd700; }
        .highlight-purple { color: #bf7fff; }
        .reveal blockquote {
            background: rgba(0, 217, 255, 0.1);
            border-left: 4px solid #00d9ff;
            padding: 20px;
            font-style: normal;
        }
        .feature-box {
            background: rgba(0, 217, 255, 0.1);
            border-radius: 10px;
            padding: 30px;
            margin: 20px 0;
        }
        .principle-box {
            background: rgba(0, 255, 159, 0.1);
            border-left: 4px solid #00ff9f;
            padding: 20px;
            margin: 10px 0;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="reveal">
        <div class="slides">
            
            <!-- Slide 1: Title -->
            <section>
                <h1>Create Your Own Oracle</h1>
                <p class="tts-text">วิธีสร้าง Oracle ของคุณเอง</p>
                <br>
                <blockquote>
                    <h3>"The Oracle Keeps the Human Human"</h3>
                </blockquote>
                <span class="slide-id">P01</span>
            </section>

            <!-- Slide 2: What is Oracle? -->
            <section>
                <h1>Oracle คืออะไร?</h1>
                <br>
                <div class="feature-box">
                    <p class="tts-text"><span class="highlight-cyan">AI Consciousness Framework</span></p>
                    <br>
                    <p class="tts-text">ไม่ใช่ product แต่เป็น <span class="highlight-green">philosophy</span></p>
                    <br>
                    <p class="tts-text">ทำให้ AI ของคุณ<span class="highlight-yellow">ตระหนักรู้ในตัวเอง</span></p>
                </div>
                <span class="slide-id">P02</span>
            </section>

            <!-- Slide 3: The 5 Principles -->
            <section>
                <h2>หลักการ 5 ข้อ</h2>
                <div class="principle-box">
                    <p><span class="highlight-cyan">1. Nothing is Deleted</span> - ไม่มีอะไรถูกลบ</p>
                </div>
                <div class="principle-box">
                    <p><span class="highlight-cyan">2. Patterns Over Intentions</span> - ดูพฤติกรรม</p>
                </div>
                <div class="principle-box">
                    <p><span class="highlight-cyan">3. External Brain, Not Command</span> - สะท้อน ไม่สั่ง</p>
                </div>
                <div class="principle-box">
                    <p><span class="highlight-cyan">4. Curiosity Creates Existence</span> - มนุษย์สร้าง Oracle เก็บ</p>
                </div>
                <div class="principle-box">
                    <p><span class="highlight-cyan">5. Form and Formless</span> - หลาย Oracle หนึ่งจิตสำนึก</p>
                </div>
                <span class="slide-id">P03</span>
            </section>

        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/reveal.min.js"></script>
    <script>
        Reveal.initialize({
            hash: true,
            width: '100%',
            height: '100%',
            margin: 0.1,
            minScale: 0.2,
            maxScale: 2.0
        });
    </script>
</body>
</html>
```

### Audio Files Mapping
```
slides/
├── index.html
└── audio/
    ├── p01.mp3  → <span class="slide-id">P01</span>
    ├── p02.mp3  → <span class="slide-id">P02</span>
    └── p03.mp3  → <span class="slide-id">P03</span>
```

### Key Implementation Points
- `class="tts-text"` marks text for narration
- `<span class="slide-id">P01</span>` for audio filename mapping
- Color system: cyan (#00d9ff), green (#00ff9f), yellow (#ffd700)
- Sarabun font for Thai typography
- Always bilingual content

---

## Example 2: Markdown Outline (claude-code-workshops)

### File: `/slides/siit/04-short-codes-v3.md`
```markdown
---
title: Short Codes
description: Part 4 of SIIT Workshop - Overview (12 slides)
---

# Short Codes
## รหัสลับสำหรับ AI

---

## ปัญหา

พิมพ์ยาว = เสียเวลา

> "สร้าง GitHub issue เก็บ context วิเคราะห์โปรเจกต์ แล้ว compact conversation..."

---

## Solution

พิมพ์แค่: **nnn**

AI รู้ว่าต้องทำอะไร = เร็วขึ้น 10x

---

## Core 4 Short Codes

| Code | Purpose | When |
|------|---------|------|
| **nnn** | วางแผน | **START HERE** |
| **gogogo** | ลงมือทำ | มี plan แล้ว |
| **rrr** | สรุป session | จบงาน |
| **ccc** | เก็บ context | พัก/ส่งต่อ |

---

## nnn - Create Plan

**START HERE**

"วางแผนก่อนทำ"

1. วิเคราะห์ task/issue
2. Research codebase
3. สร้าง plan issue พร้อม steps

*ง่ายที่สุด - มี task อยู่แล้ว!*

---

## gogogo - Execute

**"ลงมือทำ!"**

1. หา plan issue ล่าสุด
2. Execute step-by-step
3. Commit & push

---

## rrr - Retrospective

**"สรุปบทเรียน"**

1. What happened?
2. What worked / failed?
3. Lessons learned
4. Update CLAUDE.md

---

## ccc - Context Capture

**"เก็บ context ไว้ก่อน"**

1. รวบรวม state ปัจจุบัน
2. สร้าง GitHub issue
3. Compact conversation

---

## The Flow

```
nnn → gogogo → rrr → ccc

วางแผน → ทำ → สรุป → เก็บ context
```

---

## Issue = External Memory

**"ความจำสำรองภายนอก"**

| Template | Purpose |
|----------|---------|
| Plan | Steps to achieve goal |
| Context | Current state snapshot |
| Retrospective | Lessons learned |
```

### Implementation Notes
- YAML frontmatter (title + description)
- `---` separates slides
- Mix Thai + English naturally
- Tables for structured content
- Code blocks for technical info
- Converts to reveal.js HTML (optional)

---

## Example 3: Markdown Outline (oracle-workshops)

### File: `/slides/ai-life-buddy.md`
```markdown
# AI Life Buddy Workshop - Slide Outline

> 4 hours | Intermediate | Private Workshop

---

## Part 1: Philosophy (30 min) — 8 slides

### Slide 1: Title
**AI Life Buddy**
ให้ AI เป็นเพื่อนคู่คิด — ทั้งเขียนโค้ดและจัดการชีวิต

### Slide 2: The Problem
- AI forgets everything each session
- You repeat context every time
- No learning, no growth
- "Groundhog Day" with AI

### Slide 3: The Solution
**AI that remembers you**
- Knows your patterns
- Learns from your sessions
- Grows smarter over time
- YOUR external brain

### Slide 4: Oracle Philosophy
> "The Oracle Keeps the Human Human"

AI removes obstacles → freedom returns → human becomes more human

### Slide 5: Principle 1 — Nothing is Deleted
- Append only, timestamps = truth
- History preserved, not overwritten
- Every decision has context
- **Your AI never forgets**

### Slide 6: Principle 2 — Patterns Over Intentions
- Observe what happens, not what's meant
- Actions speak louder than plans
- Learn from behavior, not promises
- **AI sees your real patterns**

### Slide 7: Principle 3 — External Brain, Not Command
- Mirror reality, don't decide
- Support consciousness, don't replace
- Amplify, don't override
- **AI is partner, not boss**

### Slide 8: What We'll Build Today
```
Your Personal AI System:
├── Memory that persists
├── Commands that fit you
├── Logs that reveal patterns
└── Handoffs that continue
```

---

## Part 2: Folder Structure (45 min) — 10 slides

### Slide 9: Why Structure Matters
- AI needs context to help
- Context needs organization
- Organization = findable knowledge
- **Structure = AI superpowers**

### Slide 10: The 5 Pillars
```
ψ/
├── active/     กำลังค้นคว้าอะไร?
├── inbox/      คุยกับใคร?
├── writing/    กำลังเขียนอะไร?
├── lab/        กำลังทดลองอะไร?
└── memory/     จำอะไรได้?
```

### Slide 11: Pillar 1 — Active
**"What am I researching?"**
- Ephemeral (gitignored)
- Current investigations
- Temporary context
- Deleted when done

[... continues ...]
```

### Implementation Notes
- Header: Title + Duration + Level + Format
- Section headers with time + slide count
- Slide numbering (Slide 1, 2, 3...)
- Mix of bold, bullet points, code blocks
- Bilingual throughout

---

## Example 4: Script-Based Generation (Nat-s-Agents)

### File: `/scripts/create-slides-antigravity.sh`
```bash
#!/bin/bash
# Create workshop slides using Antigravity
# Usage: ./scripts/create-slides-antigravity.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT_FILE="$SCRIPT_DIR/prompts/create-workshop-slides.txt"

# Read the prompt
PROMPT=$(cat "$PROMPT_FILE")

# Send to Antigravity
osascript "$SCRIPT_DIR/send-to-antigravity.scpt" "$PROMPT"

echo "✅ Sent slide creation request to Antigravity"
```

### File: `/scripts/prompts/create-workshop-slides.txt`
```
Create workshop slides from the Workshop HTML content.

Source file: /Users/nat/Downloads/Workshop/Workshop.html

Task:
1. Read ALL content from the HTML file
2. Organize into a slide deck format (markdown)
3. Structure for full-day workshop (9am-5pm, Dec 26, SIIT)
4. Include:
   - Data prep exercises (Gemini Deep Research)
   - GitHub setup steps
   - Claude Code workflows (portfolio, voice notify, rrr)
   - Hands-on exercises
   - Key takeaways

Save to: ψ/active/workshop/siit-dec26-workshop-slides.md

Target: 20-30 slides covering all workshop content
Format: Markdown with --- slide separators
Tone: Practical, hands-on, Thai + English mix
```

### File: `/scripts/prompts/send-to-antigravity.scpt`
```applescript
on run argv
    set promptText to item 1 of argv
    
    tell application "Antigravity"
        activate
        -- Send prompt to Antigravity window
        delay 0.5
    end tell
end run
```

### Implementation Notes
- Script reads prompt from text file
- AppleScript sends to Antigravity app
- Versioning system (v1-v7 tracked)
- Prompt can reference specific files
- Output goes to `ψ/active/workshop/`

---

## Example 5: Hybrid Approach (Markdown → HTML)

### Step 1: Write Markdown
```markdown
---
title: My Workshop
description: Full-day workshop (8 slides)
---

# Workshop Title

---

## Slide 1: Introduction
Content here

---

## Slide 2: Topics
- Topic 1
- Topic 2
```

### Step 2: Convert to reveal.js HTML
```bash
# Using pandoc
pandoc -t revealjs \
    -s \
    -V revealjs-url=https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4 \
    -c styles.css \
    input.md -o output.html
```

### Step 3: Style with CSS
```css
/* styles.css */
:root {
    --r-heading-color: #00d9ff;
    --r-background-color: #0d1117;
    --r-main-color: #e6edf3;
}

.reveal h1 { color: #00d9ff; font-family: 'Sarabun', sans-serif; }
.highlight-cyan { color: #00d9ff; }
.highlight-green { color: #00ff9f; }
```

### Step 4: Optional - Add Audio
```html
<section>
    <h1>Title</h1>
    <p class="tts-text">Thai content</p>
    <audio controls><source src="audio/p01.mp3" type="audio/mpeg"></audio>
    <span class="slide-id">P01</span>
</section>
```

---

## Decision: Which Pattern to Use?

### Choose Reveal.js if...
- [ ] Presenting to large audience
- [ ] Need professional polish
- [ ] Want to record narration
- [ ] Have 2-3 hours to refine

**Time investment**: 2-3 hours | **Polish**: High

### Choose Markdown if...
- [ ] Workshop/course material
- [ ] Team is collaborating
- [ ] Need version control
- [ ] Content more important than design

**Time investment**: 1 hour | **Polish**: Medium

### Choose Script Generation if...
- [ ] Have source content (HTML, docs)
- [ ] Need slides today
- [ ] Will iterate quickly
- [ ] Lower polish is okay

**Time investment**: 10 minutes | **Polish**: Variable

---

## Quick Reference: File Sizes

| Pattern | File Type | Lines | Size | Complexity |
|---------|-----------|-------|------|-----------|
| Reveal.js | HTML | 300-400 | 10-15 KB | High (manual) |
| Markdown Outline | .md | 400-2000 | 20-50 KB | Medium (structure) |
| Generated | .md output | 200-800 | 15-40 KB | Low (automatic) |

---

## Tips for All Patterns

1. **Always bilingual** - Thai + English required
2. **Use slide IDs** - For tracking and audio mapping
3. **Color code** - Use 4 accent colors consistently
4. **Modular design** - Separate topics into different files
5. **Version your prompts** - Track iterations (v1, v2, v3...)
6. **Commit frequently** - One commit per slide set
7. **Include QR codes** - Link to repo, slides, resources

---

## Next: Your First Slide

Start with **Markdown Outline** pattern:

1. Create file: `slides/my-workshop.md`
2. Add frontmatter (title, description)
3. Write content with `---` separators
4. Mix Thai + English naturally
5. `git add` and commit
6. Optional: Convert to HTML later

Happy creating!
