# Handoff: Claude Code Slides — Language Fix

**Date**: 2026-02-15 04:55
**Context**: ~60%

## What We Did
- Traced Claude Code docs with 5 parallel agents (deep mode)
- Fetched 6 official doc pages from code.claude.com (overview, skills, hooks, memory, sub-agents, MCP)
- Created `slides-claude-code.html` — 22 slides, same Reveal.js pattern as slides-brief.html
- Logged trace to `ψ/memory/traces/2026-02-14/1721_claude-code-docs-slides.md`

## Problem
**Thai language feels translated, not natural.** The existing slides-brief.html uses casual, spoken Thai with analogies and rhythm. The new slides-claude-code.html reads like a documentation translation — stiff, passive, dictionary-like.

### Examples of the Problem

| slides-brief (good) | slides-claude-code (bad) |
|---------------------|--------------------------|
| สั่งกาแฟ 1 แก้ว ☕ | เครื่องมือ Agentic Coding ที่อ่าน, แก้, และรัน |
| ไม่ใช่ plugin, ไม่ใช่ API | Shell commands ที่รันอัตโนมัติตาม lifecycle |
| ทุกอย่างที่เกิดขึ้น มาจากไฟล์ Markdown ไฟล์เดียว | ข้อมูลถูก inject ก่อน Claude เห็น |

### What Makes slides-brief.html Feel Human
1. **Analogies** — "สั่งกาแฟ", "ส่ง 3 คนไปสำรวจเมืองใหม่ 🔍🔍🔍"
2. **Negation rhythm** — "ไม่ใช่ X, ไม่ใช่ Y, ไม่ใช่ Z"
3. **Direct address** — talks TO audience, not ABOUT the topic
4. **Short punchy Thai** — "เขียน SKILL.md → ติดตั้ง → ใช้งานได้เลย"
5. **Thai-first with English terms** — English only for proper nouns/code
6. **One idea per line** — never dense paragraphs

## Pending
- [ ] Rewrite all Thai text in slides-claude-code.html to feel natural/spoken
- [ ] Add analogies (like cafe, workshop, team metaphors)
- [ ] Use direct address ("คุณ" or implied "เรา")
- [ ] Make each slide title feel like something a speaker would say
- [ ] Test by reading aloud — if it sounds weird, rewrite

## Next Session
- [ ] Rewrite slide-by-slide, comparing tone with slides-brief.html
- [ ] Add analogies for abstract concepts (Memory = สมุดโน้ต, Hooks = กฎบ้าน, MCP = สะพานเชื่อม, Sub-agents = ส่งลูกน้องไปทำ)
- [ ] Commit the improved version

## Key Files
- `ψ/writing/workshops/skills-creation/slides-claude-code.html` — needs fixing
- `ψ/writing/workshops/skills-creation/slides-brief.html` — reference for good tone
- `ψ/memory/traces/2026-02-14/1721_claude-code-docs-slides.md` — trace log
