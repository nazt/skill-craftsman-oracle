# Handoff: /weird Skill + Slides Session

**Date**: 2026-02-15 05:05
**Context**: ~40%

## What We Did
- Created `slides-claude-code.html` — 22 slides about Claude Code from official docs
- Rewrote all Thai text to feel natural/spoken (not translated)
- Fixed fragment pattern: yellow (bold) shows first, white (description) reveals on click
- Trace logged to Oracle MCP

### Commits This Session
```
2c84c58 slides: claude code docs deck (draft) + trace + handoff
c686894 slides: rewrite Thai — natural spoken tone
6f9deea slides: inline fragment — yellow shows, white reveals
```

## Next: /weird Skill

Nat wants a skill called `/weird` that:
- Takes text as `$ARGUMENTS`
- Analyzes the text (grammar, tone, natural feel)
- Detects language (English or Thai)
- Suggests fixes interactively — shows what's wrong, proposes alternatives
- Works like a "language fixer" — the user and Claude collaborate to make text sound natural

### Design Notes
- This is a **Simple Skill** (direct execution, no subagents needed)
- Should use `AskUserQuestion` or conversational flow for suggestions
- Key: don't just fix — analyze first, explain the issue, then suggest
- Bilingual: handle both EN and TH naturally
- Name "weird" = the text feels weird/off, fix it

### Skill Location
- Personal: `~/.claude/skills/weird/SKILL.md`
- Or project: `.claude/skills/weird/SKILL.md`

## Key Files
- `ψ/writing/workshops/skills-creation/slides-claude-code.html` — finished slides
- `ψ/writing/workshops/skills-creation/slides-brief.html` — reference for good Thai tone
- `~/.claude/skills/` — where /weird will live
