# Demo Script — Claude Code Skills Creation Workshop

> สคริปต์สำหรับผู้สอน ใช้ประกอบการ live coding ทุกขั้นตอน
> คำสั่งทุกอันพร้อม copy-paste ได้เลย

---

## Demo 1: Opening Hook — `/feel tired` (Part 1, 09:00–09:10)

### เป้าหมาย
สร้าง "wow moment" — ให้เห็นว่า skill ทำงานได้จริง แล้วเปิด source ให้เห็นว่ามันเป็นแค่ markdown

### สิ่งที่เปิดบนจอ
- Terminal เต็มจอ, font size 20+
- แค่ terminal อย่างเดียว ไม่มี slides

### Script

**[พูด]** "ก่อนจะเริ่มอะไร ผมขอ demo ให้ดูอย่างนึงก่อน"

**[พิมพ์ใน Claude Code]**
```
/feel tired
```

**[พูด]** "นี่คือ Claude Code skill — ผมแค่พิมพ์ `/feel tired` แล้ว Claude จะบันทึกอารมณ์ของผม ใส่ timestamp ให้ สร้าง log file ให้ ทุกอย่างอัตโนมัติ"

**[รอให้ skill ทำงานเสร็จ]**

**[พูด]** "ตอนนี้ทุกคนคงคิดว่า 'มันเขียนด้วย code อะไรนะ? Python? TypeScript? API อะไร?' มาดูกัน..."

**[เปิด /feel SKILL.md ใน editor]**
```bash
# ถ้าใช้ global skills
cat ~/.claude/commands/feel.md
```

**[พูด]** "ดูให้ดีนะครับ... ไม่มี code เลย มีแค่ markdown file เดียว ข้างบนมี frontmatter บอกชื่อกับ description ข้างล่างเป็น steps ที่บอก Claude ว่าต้องทำอะไร แค่นี้จริงๆ"

**[ชี้ให้เห็นส่วนสำคัญ]**
- `name: feel` — ชื่อ skill
- `description:` — trigger signal ที่ทำให้ Claude รู้ว่าจะเรียก skill นี้เมื่อไหร่
- `Step 0: Timestamp` — ทุก skill เริ่มจากบันทึกเวลา
- `ARGUMENTS: $ARGUMENTS` — รับค่าที่ user ส่งมา ("tired")

**[พูด]** "วันนี้ทุกคนจะสร้าง skill แบบนี้ได้เอง ไม่ต้องเขียน code ถ้าไม่อยาก ขอแค่เขียน markdown ที่ชัดเจนพอให้ Claude เข้าใจ"

### ข้อควรระวัง
- ทดสอบ `/feel` ก่อน workshop ให้แน่ใจว่า skill ติดตั้งอยู่
- ถ้า output ยาวเกินไป ใช้ `/feel ok` แทน (output สั้นกว่า)
- ถ้า skill ไม่ทำงาน ให้เปิด source code ตรงๆ เลย "สมมติว่ามัน run ไปแล้ว มาดู source กัน"

---

## Demo 2: Build `/hello` Skill (Part 2, 09:45–10:00)

### เป้าหมาย
สร้าง Simple Skill ตั้งแต่ศูนย์ ให้เห็นทุกขั้นตอน: สร้างไฟล์ -> เขียน content -> ติดตั้ง -> ทดสอบ

### สิ่งที่เปิดบนจอ
- Terminal (ซ้าย) + Editor (ขวา) — split screen
- หรือถ้าจอเล็ก ใช้ terminal อย่างเดียว แล้วสลับไปมา

### Script

#### ขั้นตอนที่ 1: สร้าง folder structure

**[พูด]** "เราจะสร้าง skill ชื่อ `/hello` กัน เริ่มจากสร้าง folder"

**[พิมพ์]**
```bash
mkdir -p hello
cd hello
```

**[พูด]** "skill ทุกตัวอยู่ใน folder ของตัวเอง ข้างในมี SKILL.md เป็น file หลัก"

#### ขั้นตอนที่ 2: สร้าง SKILL.md

**[พูด]** "มาสร้าง SKILL.md กัน ส่วนสำคัญที่สุดคือ frontmatter ข้างบน"

**[สร้างไฟล์ SKILL.md ด้วย editor หรือ command]**

```markdown
---
name: hello
description: Greet someone by name. Use when user says "hello", "greet", "hi".
---

# /hello - Personal Greeter

## Step 0: Timestamp

Run this bash command to get the current timestamp:

```bash
date "+%Y-%m-%d %H:%M:%S"
```

## Step 1: Parse Arguments

Extract the person's name from ARGUMENTS.
- If no name is provided, use "World" as default.
- If multiple words, treat the entire argument as the name.

## Step 2: Greet

Greet the person warmly. Include:
1. A personalized greeting using their name
2. A fun fact about their name (origin, meaning, famous people with that name)
3. A short encouraging message for the day

Use a friendly, warm tone. Keep it concise (3-5 sentences).

## Step 3: Log

Append this greeting to the log file at `ψ/memory/logs/greetings.log` with the format:

```
[TIMESTAMP] Greeted: NAME
```

Create the file if it doesn't exist. Create the directory if needed.

ARGUMENTS: $ARGUMENTS
```

**[พูดขณะเขียน — อธิบายทีละส่วน]**

- **Frontmatter**: "ส่วนนี้สำคัญที่สุด `name` คือชื่อที่จะเรียก `description` คือ signal ที่บอก Claude ว่า 'เมื่อไหร่ที่ user พูดว่า hello, greet, หรือ hi ให้เรียก skill นี้'"
- **Step 0**: "ทุก skill ควรเริ่มจาก timestamp เพื่อ traceability"
- **Step 1**: "parse arguments — `$ARGUMENTS` จะถูกแทนที่ด้วยสิ่งที่ user พิมพ์หลัง `/hello`"
- **Step 2**: "หัวใจของ skill — บอก Claude ว่าต้องทำอะไร เขียนเป็นภาษาธรรมชาติ"
- **Step 3**: "logging — สร้าง paper trail เพราะ Nothing is Deleted"

#### ขั้นตอนที่ 3: ติดตั้ง skill

**[พูด]** "skill เขียนเสร็จแล้ว ต้องติดตั้งก่อนถึงจะใช้ได้"

**[พิมพ์]**
```bash
# ติดตั้งแบบ local (เฉพาะ project นี้)
oracle-skills install -s hello -y

# หรือติดตั้งแบบ global (ใช้ได้ทุก project)
oracle-skills install -s hello -g -y
```

**[พูด]** "flag `-s hello` บอกว่าจะติดตั้ง skill ไหน `-y` คือ auto-confirm `-g` คือ global install"

**[อธิบายสิ่งที่เกิดขึ้น]**
- "`oracle-skills` จะ copy SKILL.md ไปไว้ที่ที่ Claude Code อ่านได้"
- "ถ้า local: อยู่ใน `.claude/commands/` ของ project"
- "ถ้า global: อยู่ใน `~/.claude/commands/`"

#### ขั้นตอนที่ 4: ทดสอบ

**[พูด]** "มาทดสอบกัน!"

**[เปิด Claude Code ใหม่ หรือพิมพ์ใน session ที่เปิดอยู่]**
```
/hello Nat
```

**[รอให้ทำงาน]**

**[พูด]** "ดูสิ Claude ทักทาย Nat หา fun fact เกี่ยวกับชื่อ แล้วก็ log ไว้ด้วย ลองดู log file..."

**[พิมพ์]**
```bash
cat ψ/memory/logs/greetings.log
```

**[พูด]** "ทุกอย่างถูกบันทึกไว้ ลองอีกที"

```
/hello Fortal
```

**[พูด]** "เห็นไหมครับ Claude ปรับ greeting ตามชื่อที่ส่งไป เพราะเราเขียนใน Step 2 ว่า 'personalized greeting using their name' Claude ก็ทำตาม"

### ข้อควรระวัง
- ทดสอบ `oracle-skills install` ก่อน workshop ให้แน่ใจว่า CLI ทำงาน
- ถ้า `oracle-skills` ไม่ได้ติดตั้ง สามารถ copy SKILL.md manually:
  ```bash
  cp hello/SKILL.md .claude/commands/hello.md
  ```
- ถ้า Claude ไม่ trigger skill ตรวจ `description` ว่าชัดเจนพอหรือยัง
- Font size ต้องใหญ่พอที่คนหลังห้องจะอ่าน frontmatter ได้

### Common Mistakes ที่ต้องเตือนผู้เข้าร่วม

1. **Frontmatter ผิด format**
   ```yaml
   # ผิด — ขาด ---
   name: hello
   description: Greet someone

   # ถูก — ต้องมี --- ครอบ
   ---
   name: hello
   description: Greet someone
   ---
   ```

2. **ลืม `ARGUMENTS: $ARGUMENTS`**
   - ถ้าไม่มีบรรทัดนี้ skill จะไม่รับ arguments จาก user
   - ต้องอยู่ท้ายสุดของไฟล์

3. **Description ไม่ชัดเจน**
   ```yaml
   # ไม่ดี — Claude ไม่รู้จะ trigger เมื่อไหร่
   description: A greeting skill

   # ดี — มี action words ที่ชัดเจน
   description: Greet someone by name. Use when user says "hello", "greet", "hi".
   ```

4. **Steps ไม่เป็นขั้นตอน**
   - Claude ทำตาม steps ตามลำดับ ถ้าเขียนรวมกันหมด Claude อาจข้ามบางอย่าง
   - แยก step ชัดเจน: parse -> process -> output -> log

---

## Demo 3: Build `/git-search` with Bun Shell (Part 3, 11:10–11:30)

### เป้าหมาย
สร้าง skill ที่มี executable script — ให้เห็นว่า skill ไม่ได้ทำได้แค่ generate text แต่รันคำสั่งจริงได้

### สิ่งที่เปิดบนจอ
- Terminal + Editor split screen

### Script

#### ขั้นตอนที่ 1: สร้าง folder structure

**[พูด]** "skill ที่มี code จะมีโครงสร้างต่างจาก Simple Skill นิดหน่อย"

**[พิมพ์]**
```bash
mkdir -p git-search/scripts
```

**[พูด]** "เรามี folder `scripts/` เพิ่มขึ้นมา ข้างในจะใส่ TypeScript file ที่ Bun จะรัน"

#### ขั้นตอนที่ 2: สร้าง script ก่อน

**[พูด]** "มาเริ่มจาก script ก่อน แล้วค่อยเขียน SKILL.md"

**[สร้าง `git-search/scripts/main.ts`]**

```typescript
import { $ } from "bun";

// รับ search term จาก command line arguments
const searchTerm = process.argv[2];

if (!searchTerm) {
  console.log("Usage: bun run scripts/main.ts <search-term>");
  console.log("Example: bun run scripts/main.ts 'fix bug'");
  process.exit(1);
}

console.log(`\n🔍 Searching git history for: "${searchTerm}"\n`);

// ค้นหา commit messages
console.log("=== Matching Commits ===");
const commits = await $`git log --oneline --all --grep="${searchTerm}"`.text();

if (commits.trim()) {
  console.log(commits);
} else {
  console.log("(no matching commits found)");
}

// ค้นหาใน diff (code changes)
console.log("\n=== Files with Changes ===");
try {
  const files = await $`git log --all --diff-filter=M --name-only --pretty=format: -S "${searchTerm}"`.text();
  const uniqueFiles = [...new Set(files.trim().split("\n").filter(Boolean))];

  if (uniqueFiles.length > 0) {
    uniqueFiles.slice(0, 10).forEach((f) => console.log(`  ${f}`));
    if (uniqueFiles.length > 10) {
      console.log(`  ... and ${uniqueFiles.length - 10} more files`);
    }
  } else {
    console.log("(no matching file changes found)");
  }
} catch {
  console.log("(search in diffs not available)");
}
```

**[พูดขณะเขียน]**
- "เราใช้ `import { $ } from 'bun'` — นี่คือ Bun Shell ให้เรา run shell commands ใน TypeScript ได้สะดวกมาก"
- "`` $`git log ...` `` — backtick syntax เหมือน template literal แต่ run เป็น shell command"
- "`.text()` — เอา output มาเป็น string"

#### ขั้นตอนที่ 3: ทดสอบ script ก่อน

**[พูด]** "ทดสอบ script ก่อนเอาไปใส่ skill"

**[พิมพ์]**
```bash
cd git-search
bun run scripts/main.ts "fix"
```

**[พูด]** "ทำงานได้! ตอนนี้เรามี script ที่ค้นหา git history ได้แล้ว มาห่อมันด้วย SKILL.md"

#### ขั้นตอนที่ 4: สร้าง SKILL.md

**[สร้าง `git-search/SKILL.md`]**

```markdown
---
name: git-search
description: Search git history for commits and code changes. Use when user wants to find past commits, search git log, or find when code was changed.
---

# /git-search - Git History Search

Search through git commit messages and code changes to find relevant history.

## Step 0: Timestamp

Run this bash command:

```bash
date "+%Y-%m-%d %H:%M:%S"
```

## Step 1: Parse Search Term

Extract the search term from ARGUMENTS.
- If no search term provided, ask the user what they want to search for.
- The search term can be multiple words.

## Step 2: Run Search Script

Execute the search script with the search term:

```bash
bun run SKILL_DIR/scripts/main.ts "SEARCH_TERM"
```

Replace `SKILL_DIR` with the absolute path to this skill's directory.
Replace `SEARCH_TERM` with the parsed search term from Step 1.

## Step 3: Summarize Results

After the script runs, provide a brief summary:
- How many commits matched
- Which files were most frequently changed
- Suggest related search terms if results are sparse

ARGUMENTS: $ARGUMENTS
```

**[พูดขณะเขียน]**
- "สังเกตว่า Step 2 บอก Claude ให้ `bun run` script ของเรา"
- "`SKILL_DIR` — Claude จะแทนที่ด้วย path จริงตอนรัน"
- "Step 3 เป็น synthesis — Claude อ่าน output ของ script แล้วสรุปให้ user"

#### ขั้นตอนที่ 5: ติดตั้งและทดสอบ

**[พิมพ์]**
```bash
oracle-skills install -s git-search -y
```

**[เปิด Claude Code]**
```
/git-search fix bug
```

**[พูด]** "ดูสิ Claude รัน script ของเรา ได้ผลลัพธ์จาก git history แล้วก็สรุปให้ นี่คือ skill ที่ทำงานจริง ไม่ใช่แค่ generate text"

### ข้อควรระวัง
- ทดสอบใน repo ที่มี git history พอสมควร (ไม่ใช่ repo เปล่า)
- ถ้า `bun` ไม่ทำงาน ตรวจ PATH: `which bun`
- Bun Shell syntax อาจ confuse คนที่ไม่เคยใช้ — เปรียบเทียบกับ `child_process.exec()`
- ถ้า Claude ไม่รัน script ตรวจว่า Step 2 เขียนชัดพอหรือยัง

---

## Demo 4: Parallel — `/learn --fast` (Part 4, 13:00–13:15)

### เป้าหมาย
ให้เห็น parallel agents ทำงานจริง แล้วเปิด source ดูว่า pattern เป็นยังไง

### สิ่งที่เปิดบนจอ
- Terminal เต็มจอ

### Script

#### ขั้นตอนที่ 1: รัน /learn

**[พูด]** "ตอนเช้าเราสร้าง skill ที่ทำทีละอย่าง ตอนนี้มาดู skill ที่ทำหลายอย่างพร้อมกัน"

**[เตรียม small repo สำหรับ demo — ใช้ repo ที่มีไม่เกิน 20 files]**

**[พิมพ์ใน Claude Code]**
```
/learn --fast
```

**[พูด]** "สังเกตว่า Claude สร้าง agent ขึ้นมาสำรวจ repo `--fast` ใช้แค่ 1 agent ถ้าไม่ใส่ flag จะใช้ 3 agents ถ้าใส่ `--deep` จะใช้ 5 agents"

**[รอให้ทำงาน — อธิบายขณะรอ]**
- "agent ตัวนี้กำลังอ่าน files, ดู structure, หา patterns"
- "ถ้าเป็น 3 agents แต่ละตัวจะดูคนละมุม"

#### ขั้นตอนที่ 2: อธิบาย pattern

**[พูด]** "มาดู source กัน"

**[เปิด /learn SKILL.md — ชี้ให้เห็นส่วนสำคัญ]**

**[อธิบาย]**
- "ดู mode escalation: `--fast` กำหนดจำนวน agents เป็น 1, default เป็น 3, `--deep` เป็น 5"
- "แต่ละ agent ได้ prompt เฉพาะบอกว่าให้ดูอะไร"
- "agent ใช้ Haiku model (ถูกกว่า Opus 85%) สำหรับ search"
- "Opus ใช้แค่ตอน synthesis — รวมผลของทุก agent"
- "Path discipline: ทุก agent ได้ absolute path ไม่เคยใช้ relative path"

**[วาดบน whiteboard]**
```
User: /learn --fast
         │
    Main Agent (Opus)
         │
    ┌────┴────┐
    │ Parse   │
    │ flags   │
    └────┬────┘
         │
    Subagent 1 (Haiku)
    "Explore structure"
         │
    ┌────┴────┐
    │ Results │
    └────┬────┘
         │
    Main Agent (Opus)
    "Synthesize findings"
         │
    Output document
```

**[พูด]** "ถ้าเป็น default mode จะมี Subagent 1, 2, 3 ทำงานพร้อมกัน"

### ข้อควรระวัง
- ใช้ **small repo** สำหรับ demo — `/learn` บน repo ใหญ่จะใช้เวลานาน
- ถ้า `/learn` ใช้เวลานานเกินไป ให้สลับไปอธิบาย source code ระหว่างรอ
- เตรียม output ตัวอย่างจากการรัน `/learn` ไว้ก่อน เผื่อ demo ไม่ทำงาน
- ตรงนี้**ไม่ต้อง hands-on** — แค่ดูและเข้าใจ concept

---

## Quick Reference — คำสั่งที่ใช้บ่อยในการ Demo

### oracle-skills CLI

```bash
# ดู skills ทั้งหมดที่ติดตั้งแล้ว
oracle-skills list

# ติดตั้ง skill (local)
oracle-skills install -s SKILL_NAME -y

# ติดตั้ง skill (global — ใช้ได้ทุก project)
oracle-skills install -s SKILL_NAME -g -y

# ดู help
oracle-skills --help
```

### Skill ที่สร้างใน workshop

```bash
# โครงสร้าง Simple Skill
skill-name/
└── SKILL.md

# โครงสร้าง Skill + Script
skill-name/
├── SKILL.md
└── scripts/
    └── main.ts
```

### Bun Shell Syntax

```typescript
import { $ } from "bun";

// รัน command แล้วเอา output เป็น text
const output = await $`ls -la`.text();

// รัน command แบบ stream output
await $`echo "hello"`;

// ใช้ตัวแปรใน command
const name = "world";
await $`echo "hello ${name}"`;
```

---

## Timing Cues / สัญญาณเวลา

| เวลา | ทำอะไร |
|------|--------|
| ก่อน demo | ทดสอบทุก command ให้แน่ใจว่าทำงาน |
| ระหว่าง demo | พูดช้าๆ ให้คนตามทัน อธิบายทุกบรรทัดที่พิมพ์ |
| ถ้า demo พัง | สงบ ไม่ panic — "มาดู error กัน นี่คือ debugging จริงๆ" |
| หลัง demo | เปิด source code ค้างไว้บนจอ ให้คนดูอ้างอิงตอน hands-on |
