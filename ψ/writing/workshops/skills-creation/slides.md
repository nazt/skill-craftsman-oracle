# Skills Creation Workshop / เวิร์กช็อปสร้าง Skill

**Claude Code Skills — From Zero to Your Own Skill**

วันที่: 17 กุมภาพันธ์ 2568 (2026)
สถานที่: Hakone Cafe, เชียงใหม่
ผู้สอน: Nat (Weerawan)
จัดโดย: Fortal AI Agent Learning

> "Every skill begins as rough timber. The workshop shapes it into something that fits the hand."

---

## The Promise / คำสัญญา

# วันนี้คุณจะสร้าง Skill ของตัวเอง

Today you will **build your own Claude Code skill** from scratch.

ไม่ต้องเขียนโค้ดก่อนก็ได้ เริ่มจาก Markdown ธรรมดา

No code required to start -- just Markdown.

### สิ่งที่คุณจะได้จากวันนี้:
- เข้าใจสถาปัตยกรรม Skill (Skill Architecture)
- สร้าง Simple Skill ได้ด้วยตัวเอง
- เข้าใจ Parallel Agent Pattern
- ได้ Skill ที่ใช้งานได้จริงกลับบ้าน

---

## Live Demo: /feel

```
/feel tired
```

> สังเกตว่า Claude ตอบอะไร, ใช้เวลานานแค่ไหน, output เป็นแบบไหน

**ดูให้ดี -- ทุกอย่างที่เกิดขึ้น มาจากไฟล์ Markdown ไฟล์เดียว**

---

## "It's Just Markdown"

# SKILL.md = Markdown ที่ Claude อ่านเป็นคำสั่ง

```
skills/
└── feel/
    └── SKILL.md    <-- แค่ไฟล์นี้ไฟล์เดียว!
```

Claude Code อ่านไฟล์ SKILL.md แล้วทำตาม step-by-step

ไม่มี compiler, ไม่มี build step, ไม่มี framework

**Markdown in, behavior out.**

---

## Three Skill Families / สามตระกูล Skill

| Family | Thai Name | Pattern | Example | Time |
|--------|-----------|---------|---------|------|
| **Simple** | Quick Bench (โต๊ะทำงานด่วน) | Direct execution | `/feel`, `/fyi` | ~30 sec |
| **Parallel** | Assembly Floor (พื้นที่ประกอบ) | 3-5 agents | `/learn`, `/trace` | 2-10 min |
| **Ritual** | Ritual Chamber (ห้องพิธี) | Multi-step guided | `/awaken`, `/rrr` | 15-20 min |

### เปรียบเทียบง่ายๆ:
- **Simple** = สั่งกาแฟ 1 แก้ว
- **Parallel** = สั่ง 3 คนไปหาข้อมูลพร้อมกัน
- **Ritual** = พิธีกรรม มีขั้นตอนชัดเจน ต้องทำครบทุก step

---

## What is a Skill? / Skill คืออะไร?

# SKILL.md = เอกสาร + คำสั่ง สำหรับ Claude

Skill ไม่ใช่ plugin, ไม่ใช่ API, ไม่ใช่ extension

Skill คือ **markdown file** ที่บอก Claude ว่า:
1. Skill นี้ชื่ออะไร (name)
2. ใช้ตอนไหน (description)
3. ทำอะไรบ้าง (steps)
4. output เป็นแบบไหน (format)

> คิดว่าเป็น **SOP (Standard Operating Procedure)** สำหรับ AI

---

## SKILL.md Anatomy / โครงสร้าง SKILL.md

```markdown
---
name: feel                    # <-- Frontmatter
description: Log emotions...  #     (YAML metadata)
---

# /feel - Emotion Logger      # <-- Title

## Usage                       # <-- How to use
/feel [emotion] [context]

## Step 0: Timestamp           # <-- Steps
Record the current time...     #     (instructions
                               #      for Claude)
## Step 1: Process Emotion
Parse the emotion from args...

## Step 2: Output
Write to file...

ARGUMENTS: $ARGUMENTS          # <-- User input
```

---

## Frontmatter: ส่วนที่สำคัญที่สุด

```yaml
---
name: feel
description: Log emotions, feelings, and mood.
  Use when feeling something worth recording.
  Tracks emotional patterns over time.
---
```

### `name` -- ชื่อ Skill
- ใช้เป็น command: `/feel`, `/learn`, `/trace`
- ต้อง unique, ห้ามซ้ำกับ skill อื่น

### `description` -- คำอธิบาย (สำคัญมาก!)
- Claude ใช้ description เพื่อ **ตัดสินว่าจะเรียก skill นี้เมื่อไหร่**
- เป็น trigger signal ที่บอก AI ว่า "skill นี้เหมาะกับคำสั่งนี้"

---

## Description is the Trigger / Description คือตัวกระตุ้น

### Bad Description:
```yaml
description: A skill for stuff.
```
Claude ไม่รู้ว่าจะใช้ตอนไหน

### Good Description:
```yaml
description: Log emotions, feelings, and mood.
  Use when feeling tired, happy, frustrated,
  or any emotional state worth recording.
  Tracks emotional patterns over time.
```
Claude เข้าใจทันทีว่า: user พูดถึง feeling --> เรียก /feel

### หลักการ:
- ใส่ **action words** (Log, Search, Create, Track)
- ใส่ **use cases** (when feeling..., when you need to...)
- ใส่ **keywords** ที่ user น่าจะพิมพ์

---

## Steps Pattern / รูปแบบ Steps

```markdown
## Step 0: Timestamp
บันทึกเวลาปัจจุบัน เป็น ISO 8601

## Step 1: Parse Input
อ่าน ARGUMENTS แล้วแยก emotion กับ context

## Step 2: Validate
ตรวจสอบว่า emotion เป็นคำที่ valid

## Step 3: Write Output
เขียนผลลัพธ์เป็น markdown file

## Step 4: Confirm
แสดงข้อความยืนยันให้ user
```

### Pattern สำคัญ:
- **Step 0** มักเป็น Timestamp (เพื่อ traceability)
- **Step สุดท้าย** มักเป็น Output/Confirm
- เขียนเป็น **ภาษาคน** ไม่ใช่ code -- Claude เข้าใจ natural language

---

## ARGUMENTS: $ARGUMENTS

```markdown
## Step 1: Parse Input
Read the user's input from ARGUMENTS.
Extract the emotion keyword and optional context.

ARGUMENTS: $ARGUMENTS
```

### วิธีทำงาน:
1. User พิมพ์: `/feel tired after long meeting`
2. Claude เห็น: `ARGUMENTS: tired after long meeting`
3. Claude ทำตาม Step 1: แยก emotion = "tired", context = "after long meeting"

### Tips:
- `$ARGUMENTS` ถูกแทนที่ด้วยข้อความที่ user พิมพ์หลัง `/command`
- ถ้า user ไม่ใส่ arguments, `$ARGUMENTS` จะว่างเปล่า
- เขียน Step ให้ handle ทั้งกรณี **มี** และ **ไม่มี** arguments

---

## Local vs Global Install

### Local Install (ใช้ใน project เดียว):
```bash
oracle-skills install -s feel -y
```
- ติดตั้งไปที่ `.claude/skills/` ใน project ปัจจุบัน
- เหมาะกับ skill เฉพาะ project

### Global Install (ใช้ได้ทุก project):
```bash
oracle-skills install -s feel -g -y
```
- ติดตั้งไปที่ `~/.claude/skills/`
- ใช้ได้ทุก project, ทุก directory

### ความต่าง:
| | Local | Global |
|---|---|---|
| ที่อยู่ | `.claude/skills/` | `~/.claude/skills/` |
| scope | project เดียว | ทุก project |
| เหมาะกับ | project-specific | utility skills |

---

## 14 Supported Agents / รองรับ 14 AI Agents

```
Claude Code    Cursor       Gemini CLI    Windsurf
Cline          Copilot      Roo Code      Augment
Amp            Kilo Code    Aider         Zed AI
BB AI          Codex CLI
```

Skill เดียว --> ติดตั้งได้กับ **14 agents** ผ่าน CLI installer

แต่ละ agent มี folder structure ต่างกัน:
- Claude Code: `.claude/commands/`
- Cursor: `.cursor/rules/`
- Windsurf: `.windsurfrules`

**oracle-skills CLI จัดการให้อัตโนมัติ**

---

## Anatomy of /feel — Full Walkthrough

```markdown
---
name: feel
description: Log emotions, feelings, and mood.
  Use when feeling something worth recording.
---

# /feel - Emotion Logger

## Usage
/feel [emotion] [optional context]

## Step 0: Timestamp
Record current time as ISO 8601.

## Step 1: Parse Emotion
Extract emotion from ARGUMENTS.
If no emotion given, ask the user.

## Step 2: Log Entry
Create entry in ψ/memory/logs/feelings/:
- Filename: YYYY-MM-DD_HH-MM_emotion.md
- Include: emotion, context, timestamp

## Step 3: Acknowledge
Respond with a brief, empathetic message.
Do NOT give advice unless asked.

ARGUMENTS: $ARGUMENTS
```

---

## Key Insight / ข้อสังเกตสำคัญ

# Claude อ่าน Markdown นี้แล้วทำตามเป็นคำสั่ง ไม่ต้องเขียน Code!

- ไม่มี compiler
- ไม่มี runtime
- ไม่มี dependency
- ไม่มี build step

**Markdown in, behavior out.**

เขียนภาษาคนธรรมดา Claude เข้าใจได้เลย

ถ้าคุณเขียน README ได้ คุณสร้าง Skill ได้

> ส่วน code (scripts/) เป็น optional -- ใช้เมื่อต้องการ data จาก API, git, หรือ file system

---

## Part 2: Let's Build! / มาสร้างกัน!

# สร้าง /hello Skill แบบ Live

เป้าหมาย: สร้าง Skill ตัวแรกให้เสร็จใน 10 นาที

```
/hello Nat
```

Expected output:
```
สวัสดีครับ Nat!
ยินดีต้อนรับสู่ Skills Creation Workshop
วันนี้เราจะสร้าง Skill ด้วยกัน!

Timestamp: 2026-02-14T10:00:00+07:00
```

---

## Step 1: Create Skill Directory

```bash
mkdir -p skills/hello
```

โครงสร้าง:
```
skills/
└── hello/
    └── SKILL.md    <-- เราจะสร้างไฟล์นี้
```

> ชื่อ folder = ชื่อ skill
> ข้างในต้องมี SKILL.md (ตัว M ตัว D ใหญ่)

---

## Step 2: Write SKILL.md

```markdown
---
name: hello
description: Greet someone with a warm welcome
  message. Use when meeting someone new or
  starting a workshop session.
---

# /hello - Welcome Greeter

## Usage
/hello [name]

## Step 0: Timestamp
Record the current time in ISO 8601 format
with timezone +07:00.

## Step 1: Parse Name
Extract the person's name from ARGUMENTS.
If no name given, use "everyone".

## Step 2: Greet
Respond with a warm bilingual greeting:
- สวัสดีครับ/ค่ะ [name]!
- Include a welcoming message
- Include the timestamp from Step 0

Keep it brief -- 3-4 lines maximum.

ARGUMENTS: $ARGUMENTS
```

---

## Step 3: Install

```bash
# Local install (in current project)
oracle-skills install -s hello -y

# หรือ manually copy:
mkdir -p .claude/commands
cp skills/hello/SKILL.md .claude/commands/hello.md
```

### ตรวจสอบว่าติดตั้งสำเร็จ:
```bash
ls .claude/commands/
# ควรเห็น: hello.md
```

---

## Step 4: Test! / ทดสอบ!

```
/hello Nat
```

### Expected Output:
```
สวัสดีครับ Nat!
ยินดีต้อนรับสู่ Skills Creation Workshop
วันนี้เราจะสร้าง Skill ด้วยกัน!

Timestamp: 2026-02-14T10:00:00+07:00
```

### ลองอีกที:
```
/hello
```
(ไม่ใส่ชื่อ -- ดูว่า Claude handle ได้มั้ย)

### ถ้าไม่ work:
1. ตรวจ frontmatter: `---` ครบทั้งบน-ล่างมั้ย?
2. ตรวจ name: ตรงกับ folder name มั้ย?
3. ตรวจ path: อยู่ใน `.claude/commands/` มั้ย?

---

## Exercise 1: Build a Simple Skill / แบบฝึกหัด 1

# ถึงตาคุณแล้ว! สร้าง Simple Skill ด้วยตัวเอง

**เวลา: 20 นาที**

### กฎ:
1. สร้าง folder ใน `skills/`
2. เขียน SKILL.md
3. ติดตั้ง
4. ทดสอบให้ work

> ถามได้เสมอ! ยกมือเรียกผู้สอน

---

## Exercise 1: Options / ตัวเลือก

เลือก 1 อัน หรือคิดเอง:

### A: /bookmark
- บันทึก URL + หมายเหตุ
- Output: markdown file with link + notes

### B: /standup-note
- จดบันทึก standup meeting
- Input: สิ่งที่ทำเมื่อวาน, วันนี้, blockers
- Output: formatted standup note

### C: /til (Today I Learned)
- จดสิ่งที่เรียนรู้วันนี้
- Input: topic + what you learned
- Output: dated TIL entry

### D: Custom!
- คิด skill ของตัวเอง ยิ่งดี

---

## Exercise 1: Template / แม่แบบ

```markdown
---
name: ___TODO___
description: ___TODO___
  ___TODO___
---

# /___TODO___ - ___TODO___

## Usage
/___TODO___ [___TODO___]

## Step 0: Timestamp
Record current time in ISO 8601 format.

## Step 1: ___TODO___
___TODO___

## Step 2: ___TODO___
___TODO___

## Step 3: Output
___TODO___

ARGUMENTS: $ARGUMENTS
```

> เปลี่ยน `___TODO___` เป็นของจริง แล้วทดสอบ!

---

## Part 3: Adding Code to Skills / เพิ่ม Code ให้ Skill

# scripts/main.ts

บาง Skill ต้องการ **data จริง** จาก system:
- git log / git diff
- file system
- API calls
- JSON processing

SKILL.md บอก Claude **ว่าจะทำอะไร**
scripts/main.ts บอก Claude **ว่าจะเอา data มาจากไหน**

```
skills/
└── git-search/
    ├── SKILL.md         <-- instructions
    └── scripts/
        └── main.ts      <-- code (Bun Shell)
```

---

## Why Bun Shell? / ทำไมต้อง Bun Shell?

### Node.js (เดิม):
```javascript
const { execSync } = require('child_process');
const output = execSync('git log --oneline').toString();
```

### Bun Shell (ใหม่):
```typescript
import { $ } from "bun";
const output = await $`git log --oneline`.text();
```

### ข้อดีของ Bun Shell:
- **Cleaner syntax** -- template literal, อ่านง่าย
- **Auto-escape** -- ตัวแปรถูก escape อัตโนมัติ ปลอดภัยจาก injection
- **Type-safe** -- TypeScript built-in
- **Fast** -- Bun เร็วกว่า Node.js 3-5x
- **Built-in** -- ไม่ต้อง import child_process

---

## Bun Shell Basics

```typescript
import { $ } from "bun";

// รันคำสั่งแล้วเอา text output
const log = await $`git log --oneline -10`.text();

// รันแบบ quiet (ไม่แสดง output ใน terminal)
const files = await $`ls -la`.quiet().text();

// เช็ค exit code
const result = await $`git status`.quiet();
if (result.exitCode === 0) {
  console.log("Git repo is clean");
}

// อ่าน JSON output
const pkg = await $`cat package.json`.json();
console.log(pkg.name);
```

---

## Key Methods / Methods สำคัญ

| Method | คืนค่า | ใช้เมื่อ |
|--------|--------|---------|
| `.text()` | `string` | ต้องการ output เป็น text |
| `.json()` | `object` | output เป็น JSON format |
| `.quiet()` | `ShellOutput` | ไม่ต้องการแสดงผลใน terminal |
| `.exitCode` | `number` | ตรวจสอบว่าสำเร็จหรือไม่ (0 = OK) |
| `.lines()` | `string[]` | ต้องการแยกเป็นบรรทัด |

### Chaining:
```typescript
// quiet + text
const out = await $`git diff --stat`.quiet().text();

// quiet + json
const data = await $`cat data.json`.quiet().json();
```

---

## Variable Interpolation / การใส่ตัวแปร

```typescript
import { $ } from "bun";

const query = "fix bug";
const count = 5;

// ตัวแปรถูก auto-escape!
const results = await $`git log --grep=${query} -${count}`.text();
```

### Safe by default:
```typescript
// ถ้า user ใส่ input อันตราย:
const userInput = "; rm -rf /";

// Bun Shell escape ให้อัตโนมัติ -- ปลอดภัย!
await $`echo ${userInput}`.text();
// Output: "; rm -rf /"  (เป็น string ธรรมดา ไม่ execute)
```

**ไม่ต้อง sanitize input เอง -- Bun Shell จัดการให้**

---

## Three Output Patterns / 3 รูปแบบ Output

### 1. JSON Output (สำหรับ data):
```typescript
const commits = await $`git log --format='{"hash":"%h","msg":"%s"}' -5`.text();
console.log(JSON.stringify({ commits: commits.split('\n') }));
```

### 2. Text Output (สำหรับ display):
```typescript
const status = await $`git status --short`.text();
console.log(status);
```

### 3. Markdown Output (สำหรับ reports):
```typescript
const log = await $`git log --oneline -10`.text();
console.log(`## Recent Commits\n\n${log}`);
```

> SKILL.md ระบุว่าจะใช้ output แบบไหน
> scripts/main.ts ผลิต output ตาม format นั้น

---

## Live Demo: Building /git-search

```
/git-search "fix authentication"
```

### สิ่งที่ skill นี้ทำ:
1. รับ search query จาก user
2. ค้นหาใน git log (commit messages)
3. ค้นหาใน git diff (code changes)
4. แสดงผลลัพธ์เป็น markdown

> สังเกต: SKILL.md บอก Claude ว่าทำอะไร
> scripts/main.ts ทำหน้าที่ดึง data จาก git

---

## /git-search: SKILL.md

```markdown
---
name: git-search
description: Search git history for commits
  and code changes matching a query.
  Use when looking for when something changed.
---

# /git-search - Git History Search

## Usage
/git-search [query]

## Step 0: Timestamp
Record current time.

## Step 1: Run Search Script
Execute: bun run scripts/main.ts $ARGUMENTS
Capture the output.

## Step 2: Present Results
Format the script output as a clean
markdown summary. Highlight the most
relevant commits and changes.

ARGUMENTS: $ARGUMENTS
```

---

## /git-search: scripts/main.ts

```typescript
import { $ } from "bun";

const query = process.argv.slice(2).join(" ");

if (!query) {
  console.log("Usage: git-search [query]");
  process.exit(1);
}

// ค้นหาใน commit messages
const commits = await $`git log --oneline
  --grep=${query} -20`.quiet().text();

// ค้นหาใน code changes
const diffs = await $`git log --oneline
  -S ${query} -10`.quiet().text();

console.log(`## Search: "${query}"\n`);
console.log(`### Commits mentioning "${query}":`);
console.log(commits || "_No commits found_");
console.log(`\n### Code changes containing "${query}":`);
console.log(diffs || "_No changes found_");
```

---

## Exercise 2: Add Code to Your Skill / แบบฝึกหัด 2

# เพิ่ม scripts/main.ts ให้ Skill ของคุณ

**เวลา: 25 นาที**

### Option A: เพิ่ม script ให้ skill จาก Exercise 1
- เช่น `/bookmark` + script ที่ fetch URL title

### Option B: สร้าง /git-search ตาม demo
- Copy SKILL.md + main.ts แล้ว modify

### Option C: สร้าง skill ใหม่ที่ต้องใช้ data
- `/repo-stats` -- แสดงสถิติ git repo
- `/recent-changes` -- แสดง changes ล่าสุด
- `/branch-info` -- แสดงข้อมูล branches

### ต้องการ:
```bash
bun --version    # ตรวจว่ามี Bun
bun init -y      # สร้าง project (ถ้ายังไม่มี)
```

---

## Part 4: The Parallel Pattern / รูปแบบ Parallel

# ทำไม 1 agent = มุมมองแคบ, 3 agents = ครอบคลุม

### ตัวอย่าง: `/learn` ศึกษา codebase

**1 agent**: อ่าน README แล้วสรุป (ผิวเผิน)

**3 agents พร้อมกัน**:
- Agent 1: สำรวจ architecture + folder structure
- Agent 2: อ่าน core logic + key patterns
- Agent 3: ศึกษา tests + edge cases

**ผลลัพธ์**: ได้ภาพรวมที่ **ลึก** และ **หลากมุมมอง** กว่ามาก

> เหมือนส่ง 3 คนไปสำรวจเมืองใหม่ แล้วกลับมาเล่าให้ฟัง
> แต่ละคนเห็นคนละมุม -- รวมกันได้ภาพเต็ม

---

## /learn Architecture Diagram

```
User: /learn some-repo

         ┌─────────────────────┐
         │   Orchestrator      │
         │   (Opus - main)     │
         └──────┬──────────────┘
                │ spawns
       ┌────────┼────────┐
       v        v        v
  ┌─────────┐┌─────────┐┌─────────┐
  │ Agent 1 ││ Agent 2 ││ Agent 3 │
  │ (Haiku) ││ (Haiku) ││ (Haiku) │
  │         ││         ││         │
  │Structure││  Core   ││ Tests & │
  │& Config ││  Logic  ││  Docs   │
  └────┬────┘└────┬────┘└────┬────┘
       │          │          │
       v          v          v
  doc_1.md    doc_2.md   doc_3.md
       │          │          │
       └──────────┼──────────┘
                  v
         ┌─────────────────┐
         │  Hub File (Index)│
         │  links all docs  │
         └─────────────────┘
```

---

## Mode Escalation / ปรับระดับ

```
/learn --fast    -->  1 agent   ~2 min   (สำรวจเร็ว)
/learn           -->  3 agents  ~5 min   (สมดุล)
/learn --deep    -->  5 agents  ~10 min  (เจาะลึก)
```

### Implementation ใน SKILL.md:

```markdown
## Step 1: Determine Mode
Check ARGUMENTS for flags:
- `--fast`: spawn 1 subagent
- `--deep`: spawn 5 subagents
- default: spawn 3 subagents

Each subagent gets a different focus area.
```

### ทำไมต้อง escalate?
- **--fast**: แค่อยากรู้คร่าวๆ ว่า repo นี้เกี่ยวกับอะไร
- **default**: อยากเข้าใจดีพอที่จะ contribute ได้
- **--deep**: อยากเข้าใจทุกมุม ทุก pattern ทุก edge case

---

## Haiku Economics / เศรษฐศาสตร์ Haiku

### ราคา token (โดยประมาณ):

| Model | Cost | เหมาะกับ |
|-------|------|---------|
| **Opus** | $$$$$ | Synthesis, final output |
| **Sonnet** | $$$ | Complex reasoning |
| **Haiku** | $ | Search, exploration, data gathering |

### Parallel Skill ใช้ Haiku เป็น subagent:

```
3 Haiku agents = ราคาเท่า 1 Opus call
5 Haiku agents = ยังถูกกว่า 1 Opus call!
```

**ประหยัด ~85% เทียบกับใช้ Opus ทำทุกอย่าง**

### Pattern: **Haiku สำรวจ, Opus สังเคราะห์**
- Haiku อ่านไฟล์, ค้นหา, สรุปข้อมูล (ถูก + เร็ว)
- Opus รวมผลลัพธ์ เขียน final report (แพง แต่ทำครั้งเดียว)

---

## Live Demo: /learn --fast

```
/learn --fast [small-repo]
```

### สิ่งที่จะเกิดขึ้น:
1. Orchestrator (Opus) วิเคราะห์ repo
2. Spawn 1 Haiku subagent
3. Haiku สำรวจ structure + key files
4. Opus สังเคราะห์เป็น report

> สังเกต output: เป็น markdown file ที่มี timestamp ใน filename
> สังเกตเวลา: ~2 นาที (fast mode)

---

## Critical Pattern: Path Discipline

# ส่ง Absolute Path เสมอ -- อย่าใช้ Relative Path!

### Problem:
```markdown
## Step: Subagent Task
Explore the repo and write to docs/
```
Subagent: "docs/ อยู่ที่ไหน? relative to อะไร?"

### Solution:
```markdown
## Step: Subagent Task
SOURCE_DIR: /Users/nat/Code/github.com/nazt/my-repo
DOCS_DIR: /Users/nat/Code/github.com/nazt/my-repo/ψ/learn

Explore SOURCE_DIR and write results to DOCS_DIR.
```

### ทำไมสำคัญ?
- Subagent ทำงานใน process แยก -- ไม่รู้ cwd ของ parent
- Relative path จะพังเมื่อ subagent เริ่มจาก directory อื่น
- **Absolute path = ปลอดภัยเสมอ**

---

## Critical Pattern: Time-Prefix Naming

# HHMM_filename.md ป้องกันการเขียนทับ

### Problem:
```
learn_report.md    <-- Agent 1 เขียน
learn_report.md    <-- Agent 2 เขียนทับ!
```

### Solution:
```
1423_architecture.md    <-- Agent 1 (14:23)
1423_core-logic.md      <-- Agent 2 (14:23)
1423_testing.md         <-- Agent 3 (14:23)
```

### Pattern ใน SKILL.md:
```markdown
## Step 0: Timestamp
Record the current time.
Use format HHMM for file prefix.

## Step 2: Write Output
Filename: {HHMM}_{topic}.md
Example: 1423_architecture.md
```

> ทำให้ทุก run สร้างไฟล์ใหม่ ไม่เขียนทับ run ก่อนหน้า
> สอดคล้องกับหลัก **Nothing is Deleted**

---

## Hub File Pattern / รูปแบบ Hub File

# Index file ที่รวมลิงก์ทุก session

```markdown
# /learn Hub — my-repo

## Sessions

### 2026-02-14 14:23 (--fast, 1 agent)
- [1423_architecture.md](./1423_architecture.md)

### 2026-02-14 15:10 (default, 3 agents)
- [1510_architecture.md](./1510_architecture.md)
- [1510_core-logic.md](./1510_core-logic.md)
- [1510_testing.md](./1510_testing.md)

### 2026-02-14 16:00 (--deep, 5 agents)
- [1600_architecture.md](./1600_architecture.md)
- [1600_patterns.md](./1600_patterns.md)
- [1600_core-logic.md](./1600_core-logic.md)
- [1600_testing.md](./1600_testing.md)
- [1600_edge-cases.md](./1600_edge-cases.md)
```

> Hub file ถูก **append** ทุกครั้งที่ run -- ไม่เขียนทับ

---

## Manifest Tracking / .origins File

# ติดตามว่าเคย learn repo ไหนมาแล้ว

```
# .origins — Learned Repository Manifest
# Format: timestamp | repo | mode | agent_count

2026-02-14T14:23:00+07:00 | nazt/hello-oracle | fast | 1
2026-02-14T15:10:00+07:00 | nazt/hello-oracle | default | 3
2026-02-14T16:00:00+07:00 | Soul-Brews-Studio/oracle-v2 | deep | 5
```

### ประโยชน์:
- รู้ว่าเคยสำรวจ repo ไหนมาแล้ว
- รู้ว่าใช้ mode อะไร (ถ้า fast อาจอยากทำ deep ซ้ำ)
- Restore ได้ -- รู้ว่าต้อง clone อะไรกลับมา

---

## Exercise 3: Design a Parallel Skill / แบบฝึกหัด 3

# ออกแบบ Parallel Skill บนกระดาษ (ไม่ต้อง code)

**เวลา: 15 นาที**

### โจทย์:
ออกแบบ skill ที่ใช้ 3 agents สำรวจพร้อมกัน

### ตัวอย่างไอเดีย:
- `/security-audit` -- 3 agents ตรวจ dependencies, code, config
- `/code-review` -- 3 agents ดู logic, style, tests
- `/migration-plan` -- 3 agents วิเคราะห์ before, during, after

---

## Exercise 3: Design Template

เขียนบนกระดาษหรือ text editor:

```
Skill Name: /_______________

Description: _______________

Mode Escalation:
  --fast: ___ agent(s), focus on _______________
  default: ___ agents
  --deep: ___ agents

Agent Assignments:
  Agent 1: _______________
  Agent 2: _______________
  Agent 3: _______________
  (Agent 4: _______________ --deep only)
  (Agent 5: _______________ --deep only)

Output Format:
  File naming: _______________
  Hub file: yes / no

Key Questions:
  - ทำไมต้องใช้ parallel? _______________
  - แต่ละ agent ได้ข้อมูลไม่ซ้ำกันยังไง? _______________
```

---

## Share & Discuss / แชร์กับเพื่อน

# คุยกับคนข้างๆ 2 นาที

### แชร์:
1. Skill ของคุณชื่ออะไร?
2. 3 agents ทำอะไรคนละอย่าง?
3. ทำไมต้อง parallel? ทำ sequential ไม่ได้หรอ?

### ฟัง:
- Skill ของเพื่อนน่าสนใจตรงไหน?
- มีมุมไหนที่ขาดไป?
- เสนอ Agent 4-5 ให้เพื่อนได้มั้ย?

> Feedback จากคนอื่นช่วยให้เห็นมุมที่ตัวเองไม่เห็น
> (เหมือน Parallel Agent! แต่เป็นคนจริง)

---

## Part 5: Free Build / สร้างอิสระ

# เลือก Track ที่เหมาะกับตัวเอง

| Track | Level | Goal | เวลา |
|-------|-------|------|------|
| **A: Polish** | Beginner | ปรับปรุง Skill จาก Exercise 1/2 | 45 min |
| **B: New Skill** | Intermediate | สร้าง Skill ใหม่ตั้งแต่ต้น | 45 min |
| **C: Script + Parallel** | Advanced | Skill ที่มี script + mode escalation | 45 min |

### ทุก Track:
- สร้าง SKILL.md ที่ **ใช้งานได้จริง**
- ทดสอบจนมั่นใจว่า work
- เตรียม demo ให้คนอื่นดู

---

## Build Something Demo-Worthy!

# สร้างสิ่งที่อยากโชว์ให้คนอื่นดู

### Resources:
- Slide deck นี้ -- เปิดดูกลับได้ตลอด
- Exercise templates -- ใช้เป็น starting point
- oracle-skills-cli repo -- ดูตัวอย่าง 26 skills
- ผู้สอน -- ยกมือถามได้เลย

### Tips:
- เริ่มจาก **Simple** แล้วค่อยเพิ่ม
- ทดสอบ **ทุกครั้ง** ที่เปลี่ยนอะไร
- `description` ดีๆ สำคัญกว่า code เก่งๆ
- ถ้าติด -- ดู `/feel` หรือ `/hello` เป็นตัวอย่าง

### Checklist:
- [ ] SKILL.md มี frontmatter ครบ (name + description)
- [ ] Steps ชัดเจน Claude ทำตามได้
- [ ] ARGUMENTS: $ARGUMENTS อยู่ท้ายไฟล์
- [ ] ทดสอบแล้ว work

---

## Part 6: Show & Tell / โชว์ผลงาน

# 2-3 นาทีต่อคน

### Format:
1. **บอกชื่อ Skill** -- ชื่ออะไร ทำอะไร (30 วินาที)
2. **Demo สด** -- สั่งให้ทำงานจริง (1 นาที)
3. **เล่า Design Decision** -- ทำไมออกแบบแบบนี้ (30 วินาที)
4. **Q&A** -- คำถามจากเพื่อน (30 วินาที)

### สิ่งที่น่าสนใจ:
- Skill ไหน **เซอร์ไพรส์** ที่สุด?
- Skill ไหน **ใช้งานได้จริง** ที่สุด?
- Skill ไหน **creative** ที่สุด?

> ทุกคนสร้าง Skill ได้ -- แม้เป็นครั้งแรก!

---

## Three Families: Decision Tree / เลือกตระกูลอย่างไร

```
ต้องการสร้าง Skill?
│
├── งานง่ายๆ ทำทีเดียวจบ?
│   └── Simple (Quick Bench)
│       เช่น /feel, /hello, /bookmark
│       Pattern: 1 SKILL.md, no scripts needed
│
├── ต้องการหลายมุมมอง / หลาย data sources?
│   └── Parallel (Assembly Floor)
│       เช่น /learn, /trace, /security-audit
│       Pattern: Orchestrator + N Haiku agents
│       Key: mode escalation, path discipline
│
└── Multi-step flow ที่ต้องทำครบทุก step?
    └── Ritual (Ritual Chamber)
        เช่น /awaken, /rrr, /birth
        Pattern: Guided steps, human checkpoints
        Key: ทำข้าม step ไม่ได้, ต้องทำตามลำดับ
```

### Quick Check:
- **"แค่ทำ X"** --> Simple
- **"สำรวจ Y จากหลายมุม"** --> Parallel
- **"พาผ่านขั้นตอน Z"** --> Ritual

---

## Resources & Thank You

# ขอบคุณทุกคน!

### Resources:
- **oracle-skills-cli**: `github.com/Soul-Brews-Studio/oracle-skills-cli`
- **Oracle v2 (MCP)**: `github.com/Soul-Brews-Studio/oracle-v2`
- **Workshop Materials**: `github.com/nazt/hello-oracle`

### Cheat Sheet:
```
# สร้าง Skill
mkdir -p skills/my-skill && touch skills/my-skill/SKILL.md

# ติดตั้ง
oracle-skills install -s my-skill -y     # local
oracle-skills install -s my-skill -g -y  # global

# ทดสอบ
/my-skill [arguments]
```

### Key Takeaways:
1. **Skill = Markdown** -- ไม่ต้องเขียน code ก็สร้างได้
2. **Description สำคัญที่สุด** -- เป็น trigger ที่บอก AI ว่าจะใช้เมื่อไหร่
3. **3 ตระกูล** -- Simple, Parallel, Ritual -- เลือกให้เหมาะกับงาน
4. **Bun Shell** -- เพิ่ม code เมื่อต้องการ data จริงจาก system
5. **ทุกคนสร้าง Skill ได้** -- เริ่มจาก Simple แล้วค่อยขยาย

### Instructor:
Nat (Weerawan) -- github.com/nazt

> "The workshop is open. The workbench is ready. Let's build."
