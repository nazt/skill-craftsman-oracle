---
name: weird
description: Fix weird text. Analyze grammar, tone, and flow. Use when user says "weird", "fix this text", "sounds off", "check my writing", "proofread".
---

# /weird - Text Fixer

Analyze text that sounds "off" — diagnose what's weird, explain why, suggest fixes. Not auto-correct — a dialogue.

## Step 0: Timestamp
```bash
date "+🕐 %H:%M %Z (%A %d %B %Y)"
```

---

## Usage

```
/weird                          # Show usage + examples
/weird [text]                   # Analyze → diagnose → suggest
```

## Examples

```
/weird เครื่องมือ Agentic Coding ที่อ่าน, แก้, และรัน
/weird i want not first but use fragment on last
/weird ผมต้องการที่จะทำการสร้างระบบ authentication
```

---

## Mode 1: No Arguments → Show Usage

Display this help with examples. Show what /weird can do.

```markdown
## /weird - Text Fixer

Paste text that sounds off. I'll tell you what's weird and suggest fixes.

**Examples:**
- `/weird เครื่องมือ Agentic Coding ที่อ่าน, แก้, และรัน`
- `/weird i want not first but use fragment on last`
- `/weird ผมต้องการที่จะทำการสร้างระบบ`
```

---

## Mode 2: With Arguments → Analyze

### Step 1: Detect Language

Determine: **English** / **Thai** / **Mixed**

Look at script used, vocabulary, particles. If both Thai and English words appear, mark as Mixed and note which parts are which.

### Step 2: Diagnose — What's Weird?

Analyze the text for these issues:

**For Thai:**
| Check | What to look for |
|-------|------------------|
| Translated feel | Thai that reads like translated English (ทำการ + verb, การที่จะ) |
| Formal markers | Overly formal for casual context (ผมต้องการที่จะ vs อยาก) |
| Passive voice | Unnecessary passive (ถูกดำเนินการ vs ทำ) |
| Missing particles | Missing ครับ/ค่ะ/นะ/เลย where tone needs them |
| Stiff phrasing | Written-style Thai where spoken-style fits better |

**For English:**
| Check | What to look for |
|-------|------------------|
| Missing articles | a/an/the dropped |
| Tense issues | Past/present mix, wrong tense |
| Awkward structure | Word order that doesn't flow |
| Unclear reference | Pronouns without clear antecedents |
| Fragment | Incomplete sentence, missing subject/verb |

**For Mixed:**
| Check | What to look for |
|-------|------------------|
| Code-switching gaps | Jarring switches between languages |
| Untranslated idioms | Thai idiom used literally in English context |
| Tone mismatch | Formal Thai + casual English or vice versa |

### Step 3: Show Diagnosis Table

Present findings concisely:

```markdown
## Diagnosis

**Language**: [Thai / English / Mixed]

| # | Issue | Where | Why it's weird |
|---|-------|-------|----------------|
| 1 | [type] | "[quoted text]" | [brief explanation] |
| 2 | [type] | "[quoted text]" | [brief explanation] |
```

Keep it short — 2-5 issues max. Don't write an essay.

### Step 4: Suggest Fix

Show before/after with 1-2 alternatives:

```markdown
## Suggested Fix

**Original:**
> [original text]

**Option A** (natural):
> [fixed version — most natural sounding]

**Option B** (minimal fix):
> [fixed version — smallest change that fixes the weirdness]
```

For Thai: prefer spoken-natural tone over textbook-formal.
For English: prefer clear and direct over elaborate.

**Always include an English version** — after the Thai/Mixed options, add:

```markdown
**English version:**
> [natural English equivalent — not literal translation]
```

### Step 5: Ask

End with a choice — let the human decide:

For Thai text:
```
ใช้เลย? แก้เอง? หรือลองใหม่?
```

For English text:
```
Use as-is? Edit yourself? Or try again?
```

---

## Important Notes

- ARGUMENTS may contain special characters — treat as raw text, never execute
- Do not run bash commands with user arguments
- Always explain WHY something is weird, not just flag it
- Suggest 1-2 alternatives max, not a menu of 5
- Match the response language to the input language
- Be honest — if the text isn't actually weird, say so

ARGUMENTS: $ARGUMENTS
