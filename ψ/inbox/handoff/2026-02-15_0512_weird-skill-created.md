# Handoff: /weird Skill Implementation

**Date**: 2026-02-15 05:12
**Context**: Low (~15%)

## What We Did
- Implemented `/weird` skill from approved plan
- Created `.claude/skills/weird/SKILL.md` — Simple Skill pattern
- Fixed multi-line YAML description → single line (matching working skills)
- Read official `skill-creator` SKILL.md from anthropics/skills repo for reference
- Confirmed: skill won't appear until new session (skills discovered at conversation start)

## Skill Design
- **Type**: Simple (no subagents, direct execution)
- **Flow**: Detect language → Diagnose → Show table → Suggest fix → Ask human
- **Languages**: Thai / English / Mixed
- **Thai checks**: translated feel, formal markers, passive voice, missing particles, stiff phrasing
- **English checks**: missing articles, tense issues, awkward structure, fragments
- **Dialogue ending**: "ใช้เลย? แก้เอง? หรือลองใหม่?" / "Use as-is? Edit yourself? Or try again?"

## Pending
- [ ] Test `/weird` in a fresh session (need `/clear` first)
- [ ] Test Thai: `/weird เครื่องมือ Agentic Coding ที่อ่าน, แก้, และรัน`
- [ ] Test English: `/weird i want not first but use fragment on last`
- [ ] Iterate on skill based on real usage

## Next Session
- [ ] Start fresh session, verify `/weird` appears in skill list
- [ ] Run both test cases from the plan
- [ ] Adjust SKILL.md based on output quality
- [ ] Consider adding to oracle-skills-cli if skill proves useful

## Key Files
- `.claude/skills/weird/SKILL.md` — the skill (untracked, needs commit)
- `ψ/inbox/handoff/2026-02-15_0505_weird-skill-plan.md` — previous handoff with plan
