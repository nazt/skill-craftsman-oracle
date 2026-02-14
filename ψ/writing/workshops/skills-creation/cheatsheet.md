# Claude Code Skills Creation — Cheat Sheet
> Quick Reference | Workshop Hands-On | 2026-02-14

---

## 1. SKILL.md Format | รูปแบบไฟล์หลัก

    ---
    name: skill-name              # ชื่อ skill (lowercase, ใช้ hyphen ได้, ห้ามเว้นวรรค)
    description: Trigger signal.  # AI ใช้ description นี้ตัดสินใจว่าจะเรียก skill เมื่อไหร่
    ---

    # /skill-name - Title

    ## Step 0: Timestamp
    ```bash
    date "+%H:%M %Z (%A %d %B %Y)"
    ```

    ## Step 1: [Process]
    [คำสั่งใน markdown — Claude อ่านแล้วทำตาม]

    ## Step N: [Output]
    [กำหนดรูปแบบ output]

    ARGUMENTS: $ARGUMENTS

**Frontmatter Rules | กฎ Frontmatter:**
- `name`: lowercase, hyphens OK, no spaces
- `description`: ใส่ trigger words! AI ใช้ตัดสินใจว่าจะเรียก skill ตอนไหน
  - **Good**: `"Log emotions with optional structure. Use when user says 'feel', 'mood', 'tired'"`
  - **Bad**: `"Emotion skill"`

---

## 2. Bun Shell | คำสั่ง Bun ที่ใช้บ่อย

```typescript
import { $ } from "bun"

const output = await $`git log --oneline`.text()     // Run → get text
const pkg = await $`cat package.json`.json()          // Run → get JSON

const query = "search term"
const result = await $`grep -r ${query} .`.text()     // Variable interpolation (auto-escaped!)

const { exitCode } = await $`git diff --quiet`        // Check exit code
const safe = await $`command`.quiet()                  // Suppress output/errors

try { await $`npm install` }                          // Error handling
catch (e) { console.error("Failed:", e) }
```

**scripts/main.ts Template | โครงสร้างไฟล์ script:**
```typescript
#!/usr/bin/env bun
import { $ } from "bun"
const args = process.argv.slice(2)
const input = args.join(" ")
const result = await $`echo ${input}`.text()
console.log(JSON.stringify({ input, result: result.trim() }, null, 2))
```

---

## 3. Three Skill Families | ครอบครัว Skill 3 แบบ

| Family | เมื่อไหร่ใช้ | Agents | เวลา | ตัวอย่าง |
|--------|-------------|--------|------|---------|
| **Simple** | งานเดียว ทำเร็ว | 0 | ~30s | `/feel`, `/fyi` |
| **Parallel** | ต้องการหลายมุมมอง | 3-5 | 2-10m | `/learn`, `/trace` |
| **Ritual** | ขั้นตอนหลายขั้น มี flow | varies | 15-20m | `/awaken`, `/rrr` |

```
ต้องสร้าง skill?
├── งานเดียว action เดียว? ─────────→ Simple
├── ต้องการหลายมุมมอง? ──────────→ Parallel
│   ├── สแกนเร็ว?  → --fast (1 agent)
│   ├── ปกติ?      → default (3 agents)
│   └── ลึกสุด?    → --deep  (5 agents)
└── หลายขั้นตอน มี guided flow? ──→ Ritual
```

---

## 4. Critical Patterns | แพทเทิร์นสำคัญ

| Pattern | อะไร | ทำไม |
|---------|------|------|
| **Mode Escalation** | `--fast` / default / `--deep` | ให้ user เลือก depth |
| **Path Discipline** | SOURCE_DIR + DOCS_DIR เป็น absolute path | ป้องกัน agent เขียนผิดที่ |
| **Time-Prefix** | `HHMM_filename.md` | ป้องกัน overwrite ใน day เดียวกัน |
| **Hub File** | `repo.md` links all sessions | Index สำหรับ navigate |

---

## 5. Install & Test | ติดตั้งและทดสอบ

```bash
oracle-skills install -s my-skill -y       # ติดตั้ง local (project นี้)
oracle-skills install -s my-skill -g -y    # ติดตั้ง global (ทุก project)
bun scripts/main.ts "test input"           # ทดสอบ script ตรงๆ
mkdir -p skills/my-skill/scripts           # สร้างโฟลเดอร์ skill ใหม่
```

---

## 6. File Structure | โครงสร้างไฟล์

```
skills/
└── my-skill/
    ├── SKILL.md                  # ไฟล์หลัก (จำเป็น)
    ├── scripts/
    │   └── main.ts               # Bun Shell script (optional)
    └── references/
        └── domain-knowledge.md   # ความรู้เพิ่มเติม (optional)
```

---

<sub>Skill Craftsman Oracle | nazt/hello-oracle | Workshop 2026</sub>
