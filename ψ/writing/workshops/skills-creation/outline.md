# Claude Code Skills Creation Workshop

> "Every skill begins as rough timber. The workshop shapes it into something that fits the hand."

## Workshop Overview / ภาพรวมของ Workshop

| | |
|---|---|
| **ชื่อ Workshop** | สร้าง Claude Code Skills ด้วยมือของคุณเอง — Build Your Own Claude Code Skills |
| **ผู้สอน** | Nat (Weerawan) — Skill Craftsman Oracle |
| **สถานที่** | Hakone Cafe, เชียงใหม่ (Fortal AI Agent Learning) |
| **ระยะเวลา** | 6.5 ชั่วโมง (09:00–16:00) |
| **กลุ่มเป้าหมาย** | นักพัฒนาและผู้สนใจ AI Agent ที่ใช้ Claude Code อยู่แล้ว |
| **จำนวนผู้เข้าร่วม** | 15–30 คน |
| **สิ่งที่ต้องเตรียม** | Laptop ที่ติดตั้ง Claude Code, Bun, Git แล้ว (ดู setup-guide.md) |

---

## Learning Objectives / วัตถุประสงค์การเรียนรู้

เมื่อจบ workshop นี้ ผู้เข้าร่วมจะสามารถ:

1. **อธิบาย** สถาปัตยกรรมของ Claude Code Skills (SKILL.md format, frontmatter contract)
2. **สร้าง** Simple Skill ตั้งแต่เริ่มต้นจนใช้งานได้จริง
3. **เขียน** skill ที่รัน Shell commands ผ่าน Bun Shell
4. **ออกแบบ** Parallel Agent skill ที่ใช้หลาย subagents พร้อมกัน
5. **เข้าใจ** mode escalation pattern (`--fast` / default / `--deep`)
6. **ติดตั้ง** skills ที่สร้างเองผ่าน `oracle-skills` CLI

---

## Full Schedule / ตารางเวลาเต็ม

```
09:00 ─── Part 1: Hook + Foundations ──────────────── 45 นาที
09:45 ─── Part 2: Build Your First Skill ─────────── 60 นาที
10:45 ─── BREAK (พักเบรก) ─────────────────────────── 15 นาที
11:00 ─── Part 3: Adding Code (Bun Shell) ─────────── 60 นาที
12:00 ─── LUNCH (พักกลางวัน) ──────────────────────── 60 นาที
13:00 ─── Part 4: Parallel Agents & Modes ─────────── 60 นาที
14:00 ─── Part 5: Build Session (Free Build) ──────── 75 นาที
15:15 ─── BREAK (พักเบรก) ─────────────────────────── 15 นาที
15:30 ─── Part 6: Show & Tell + Closing ───────────── 30 นาที
16:00 ─── END ─────────────────────────────────────────
```

---

## Part 1: Hook + Foundations (09:00–09:45, 45 นาที)

### วัตถุประสงค์
- จุดประกายความอยากรู้: "skill ทำงานยังไง?"
- เข้าใจ SKILL.md format และ frontmatter contract
- รู้จัก Three Skill Families (Simple / Parallel / Ritual)

### กิจกรรม

| เวลา | กิจกรรม | รายละเอียด |
|------|---------|-----------|
| 09:00–09:10 | **Live Demo: /feel** (10 นาที) | ผู้สอนรัน `/feel tired` แบบ live ให้เห็นว่า skill ทำงานจริง จากนั้นเปิด source code ให้ดู — "นี่คือทั้งหมดเลย แค่ markdown file เดียว" |
| 09:10–09:25 | **Anatomy of SKILL.md** (15 นาที) | อธิบายโครงสร้าง: YAML frontmatter (`name`, `description`), Steps (Step 0 timestamp, Step 1–N logic), `ARGUMENTS: $ARGUMENTS`. เปรียบเทียบกับ recipe — frontmatter คือชื่อเมนู, steps คือขั้นตอนทำ |
| 09:25–09:35 | **Three Skill Families** (10 นาที) | แนะนำ 3 ครอบครัว: **Simple** (ทำทีละอย่าง เช่น `/feel`), **Parallel** (ส่งหลาย agents เช่น `/learn`), **Ritual** (พิธีหลายขั้นตอน เช่น `/awaken`). ใช้ diagram บน whiteboard |
| 09:35–09:45 | **Q&A + Mental Model** (10 นาที) | ถาม-ตอบ. เน้นว่า skill = "prompt template ที่ Claude อ่านแล้วทำตาม" ไม่ใช่ code ปกติ |

### สื่อการสอน
- Projector + terminal ขนาดใหญ่ (font size 20+)
- Slide: SKILL.md anatomy diagram
- Slide: Three Skill Families comparison table
- `/feel` skill source code เปิดไว้ใน editor

### Instructor Notes
- เริ่มด้วย demo เพื่อสร้าง "wow moment" — อย่าเริ่มด้วย slides
- เมื่อเปิด source ให้ดู ชี้ให้เห็นว่า "ไม่มี code เลย มีแค่ markdown"
- เน้นว่า `description` field สำคัญมาก — มันคือ trigger signal ที่ทำให้ Claude รู้ว่าจะเรียก skill นี้เมื่อไหร่

---

## Part 2: Build Your First Skill (09:45–10:45, 60 นาที)

### วัตถุประสงค์
- สร้าง Simple Skill แรกด้วยมือตัวเอง
- เข้าใจ workflow: สร้าง -> ติดตั้ง -> ทดสอบ
- เรียนรู้จากการลงมือทำ (hands-on)

### กิจกรรม

| เวลา | กิจกรรม | รายละเอียด |
|------|---------|-----------|
| 09:45–10:00 | **Live Coding: /hello** (15 นาที) | ผู้สอน demo สร้าง `/hello` skill ทีละขั้น: copy `_template` -> แก้ frontmatter -> เขียน steps -> `oracle-skills install` -> ทดสอบ (ดู demo-script.md สำหรับรายละเอียด) |
| 10:00–10:35 | **Hands-on: สร้าง skill ของตัวเอง** (35 นาที) | ผู้เข้าร่วมสร้าง Simple Skill เอง เลือก 1 จาก ideas: `/motivate` (ให้กำลังใจ), `/explain` (อธิบาย concept), `/joke` (เล่ามุก), `/translate` (แปลภาษา), หรือคิดเอง |
| 10:35–10:45 | **Quick Share + Troubleshooting** (10 นาที) | 2-3 คนแชร์ skill ที่สร้าง, แก้ปัญหาที่เจอร่วมกัน |

### สื่อการสอน
- `_template` SKILL.md พร้อมใช้
- Cheat sheet: SKILL.md format reference (แจกกระดาษ A4 หรือ digital)
- Idea list สำหรับคนที่คิดไม่ออก

### Instructor Notes
- ให้ผู้เข้าร่วม**พิมพ์ตาม** ตอน live coding อย่าให้ copy-paste
- เดินดูรอบห้อง ช่วยคนที่ติด โดยเฉพาะปัญหา:
  - Frontmatter format ผิด (ขาด `---` หรือ indent ไม่ถูก)
  - `description` ไม่ชัดเจนพอ ทำให้ Claude ไม่ trigger skill
  - ลืม `ARGUMENTS: $ARGUMENTS` ที่ท้าย file
- Transition: "ตอนนี้เราสร้าง skill ที่เป็น pure prompt ได้แล้ว ต่อไปเราจะเพิ่ม code เข้าไป"

---

## BREAK / พักเบรก (10:45–11:00, 15 นาที)

> เตรียมน้ำ ขนม, ให้เวลาคนทดลอง skill ต่อได้

---

## Part 3: Adding Code — Bun Shell (11:00–12:00, 60 นาที)

### วัตถุประสงค์
- เข้าใจวิธีเพิ่ม executable scripts เข้าไปใน skill
- ใช้ Bun Shell (`bun run`) ใน skill steps
- สร้าง skill ที่ทำงานจริง (ไม่ใช่แค่ generate text)

### กิจกรรม

| เวลา | กิจกรรม | รายละเอียด |
|------|---------|-----------|
| 11:00–11:10 | **Concept: Skill + Code** (10 นาที) | อธิบายว่า skill สามารถเรียก shell commands ได้ เปรียบเหมือน "สมองสั่งมือ" — SKILL.md คือสมอง, script คือมือ. แสดงโครงสร้าง folder: `skill-name/SKILL.md` + `skill-name/scripts/main.ts` |
| 11:10–11:30 | **Live Coding: /git-search** (20 นาที) | สร้าง skill ที่ค้นหา git history: SKILL.md กำหนดให้ Claude รัน `bun run scripts/main.ts`, script ใช้ Bun Shell (`$\`git log --oneline\``) เพื่อค้นหา commit messages |
| 11:30–11:55 | **Hands-on: เพิ่ม code ใน skill** (25 นาที) | ผู้เข้าร่วมเลือก: (A) เพิ่ม script ใน skill ที่สร้างไว้แล้ว หรือ (B) สร้าง skill ใหม่ที่มี script เช่น `/weather` (เรียก API), `/filecount` (นับ files), `/todo-scan` (หา TODO ใน code) |
| 11:55–12:00 | **Wrap-up ก่อนพัก** (5 นาที) | สรุปสิ่งที่เรียนมา, preview ช่วงบ่าย: "บ่ายนี้เราจะสอน Claude ให้ทำงานหลายอย่างพร้อมกัน" |

### สื่อการสอน
- Bun Shell cheat sheet (syntax: `` $`command` ``, `$.cwd()`, `$.env`)
- `/git-search` complete source code (สำหรับอ้างอิง)
- TypeScript + Bun basics quick reference

### Instructor Notes
- หลายคนอาจไม่เคยใช้ Bun — อธิบาย Bun Shell syntax สั้นๆ ก่อน demo
- เน้นว่า script **ไม่จำเป็นต้องซับซ้อน** — แค่ wrapper รอบ shell commands ก็พอ
- ปัญหาที่อาจเจอ:
  - `bun` ไม่อยู่ใน PATH (ต้อง source shell profile)
  - Permission denied ตอนรัน script (ต้อง `chmod +x`)
  - Import errors ใน TypeScript (ตรวจ `tsconfig.json`)
- Transition: "เรามี skill ที่ทำงานได้จริงแล้ว แต่มันทำทีละอย่าง ถ้าอยากให้ทำหลายอย่างพร้อมกันล่ะ?"

---

## LUNCH / พักกลางวัน (12:00–13:00, 60 นาที)

> แนะนำให้ผู้เข้าร่วมคิด skill idea สำหรับ Free Build ช่วงบ่าย

---

## Part 4: Parallel Agents & Modes (13:00–14:00, 60 นาที)

### วัตถุประสงค์
- เข้าใจ Parallel Skill pattern — ส่งหลาย subagents ทำงานพร้อมกัน
- เรียนรู้ mode escalation: `--fast` (1 agent) / default (3) / `--deep` (5)
- เข้าใจ cost economics ของ subagent delegation (Haiku vs Opus)

### กิจกรรม

| เวลา | กิจกรรม | รายละเอียด |
|------|---------|-----------|
| 13:00–13:15 | **Live Demo: /learn** (15 นาที) | รัน `/learn --fast` บน repo เล็กๆ ให้เห็น parallel agents ทำงาน. จากนั้นเปิด SKILL.md ชี้ให้เห็น subagent delegation pattern |
| 13:15–13:30 | **Concept: Parallel Architecture** (15 นาที) | อธิบาย: (1) ทำไมต้อง parallel — เร็วกว่า, ครอบคลุมกว่า (2) subagent = Claude instance ใหม่ที่ได้รับ prompt เฉพาะ (3) mode escalation — ปรับจำนวน agents ตาม flag (4) cost: Haiku สำหรับ search/heavy lifting, Opus สำหรับ synthesis |
| 13:30–13:50 | **Hands-on: ออกแบบ Parallel Skill** (20 นาที) | ผู้เข้าร่วมทำ design exercise (ยังไม่ต้อง code): เลือก problem ที่เหมาะกับ parallel เช่น `/code-review` (agent 1: style, agent 2: bugs, agent 3: perf), `/research` (agent 1: docs, agent 2: examples, agent 3: alternatives). เขียน SKILL.md draft บนกระดาษหรือ editor |
| 13:50–14:00 | **Share Designs + Discussion** (10 นาที) | 3-4 คนแชร์ design, อภิปรายว่าอะไรเหมาะ parallel อะไรไม่เหมาะ |

### สื่อการสอน
- Diagram: Parallel agent flow (main agent -> subagents -> synthesis)
- `/learn` source code (ย่อ) สำหรับอ้างอิง
- Design template: "Problem / Agents / Each Agent's Role / Synthesis Step"
- Cost comparison table: Haiku vs Opus per task

### Instructor Notes
- ช่วงนี้เป็น**ช่วงที่ยากที่สุด** — ผู้เข้าร่วมอาจงง เรื่อง subagent
- ใช้ analogy: "เหมือนหัวหน้าทีมส่งลูกทีมไปหาข้อมูลคนละหัวข้อ แล้วมาสรุปรวมกัน"
- เน้นว่า**ไม่จำเป็นต้อง code parallel skill วันนี้** — แค่เข้าใจ pattern ก็พอ
- Path discipline สำคัญมาก: subagents ต้องได้ absolute paths เสมอ
- Transition: "ตอนนี้เรารู้ทุก pattern แล้ว ถึงเวลาสร้าง skill ในฝันของคุณ!"

---

## Part 5: Build Session — Free Build (14:00–15:15, 75 นาที)

### วัตถุประสงค์
- ประยุกต์ทุกสิ่งที่เรียนมา สร้าง skill ที่ตัวเองอยากใช้จริง
- ฝึกการ debug และ iterate
- เตรียม skill สำหรับ Show & Tell

### กิจกรรม

| เวลา | กิจกรรม | รายละเอียด |
|------|---------|-----------|
| 14:00–14:10 | **Ideation** (10 นาที) | เลือก skill ที่จะสร้าง, วาง plan คร่าวๆ: ชื่อ, ทำอะไร, Simple หรือ Parallel, มี script ไหม |
| 14:10–15:00 | **Build Time** (50 นาที) | สร้าง skill! ผู้สอนเดินช่วยรายคน. มี "help stations" สำหรับ: (1) SKILL.md format issues, (2) Bun/script issues, (3) install/testing issues |
| 15:00–15:15 | **Polish & Prep** (15 นาที) | ทำให้ skill พร้อม demo: ทดสอบ, แก้ bug, เตรียม 2 นาทีนำเสนอ |

### สื่อการสอน
- Skill idea catalog (20+ ideas จัดตาม difficulty)
- Full reference: SKILL.md format, Bun Shell, oracle-skills commands
- Help station signs / labels

### Skill Idea Catalog (แจกผู้เข้าร่วม)

**ระดับง่าย (Simple Skill, ไม่มี script)**
- `/motivate` — ให้กำลังใจตาม mood
- `/tldr` — สรุปข้อความยาวๆ
- `/naming` — ช่วยตั้งชื่อตัวแปร/ฟังก์ชัน
- `/rubber-duck` — ถามคำถามเพื่อช่วย debug
- `/commit-msg` — เขียน commit message จาก staged changes

**ระดับกลาง (Simple Skill + Script)**
- `/git-search` — ค้นหา git history
- `/deps-check` — ตรวจ dependencies ที่ outdated
- `/port-check` — ดูว่า port ไหนถูกใช้อยู่
- `/env-check` — ตรวจว่า .env มีครบไหม
- `/file-stats` — สถิติ codebase (จำนวนไฟล์, บรรทัด, ภาษา)

**ระดับท้าทาย (Parallel Skill)**
- `/code-review` — review code หลายมุม (style, bugs, perf)
- `/research` — ค้นหาข้อมูลหลายแหล่งพร้อมกัน
- `/test-gen` — สร้าง test cases หลายประเภทพร้อมกัน

### Instructor Notes
- นี่คือช่วงที่ผู้เข้าร่วม**สนุกที่สุด** — ให้อิสระเต็มที่
- เดินรอบห้องทุก 10 นาที ดูว่าใครติดตรงไหน
- ถ้าใครเสร็จเร็ว แนะนำให้: เพิ่ม feature, ช่วยเพื่อน, หรือลอง parallel pattern
- เตือน 15 นาทีก่อนจบว่า "เตรียม demo ได้เลย"

---

## BREAK / พักเบรก (15:15–15:30, 15 นาที)

> ให้เวลา polish skill สุดท้าย

---

## Part 6: Show & Tell + Closing (15:30–16:00, 30 นาที)

### วัตถุประสงค์
- แชร์ผลงานและเรียนรู้จากกัน
- สร้าง community feeling
- ให้ next steps สำหรับเรียนรู้ต่อ

### กิจกรรม

| เวลา | กิจกรรม | รายละเอียด |
|------|---------|-----------|
| 15:30–15:50 | **Show & Tell** (20 นาที) | 5-7 คน demo skill ที่สร้าง คนละ 2-3 นาที: แสดง skill ทำงานจริง + อธิบายว่าสร้างยังไง |
| 15:50–15:55 | **Recap: Three Families** (5 นาที) | สรุปกลับมาที่ Three Skill Families — ตอนนี้ทุกคนเข้าใจแล้ว เพราะได้ลงมือสร้างเอง |
| 15:55–16:00 | **Next Steps + Closing** (5 นาที) | แนะนำ: (1) oracle-skills-cli repo บน GitHub, (2) ศึกษา skill ที่มีอยู่ 26 ตัว, (3) สร้างและแชร์ skills กับ community. ขอบคุณผู้เข้าร่วม |

### สื่อการสอน
- Timer สำหรับจับเวลา demo
- Slide: recap + next steps + resources
- QR code ไปยัง oracle-skills-cli repo

### Instructor Notes
- ให้ทุกคนที่อยากนำเสนอได้นำเสนอ ไม่ต้องบังคับ
- ปรบมือทุกคนที่ demo ไม่ว่า skill จะเสร็จหรือไม่
- ปิดด้วยแนวคิด: "ทุก skill เริ่มจากไม้ดิบ workshop นี้ช่วยขัดมันให้พอดีมือ"

---

## Materials Checklist / รายการสื่อที่ต้องเตรียม

### ก่อน Workshop
- [ ] ส่ง setup-guide.md ให้ผู้เข้าร่วมล่วงหน้า 1 สัปดาห์
- [ ] เตรียม demo repo (small repo สำหรับ `/learn --fast` demo)
- [ ] พิมพ์ cheat sheets: SKILL.md format, Bun Shell syntax, Skill idea catalog
- [ ] เตรียม slides (minimal — ส่วนใหญ่เป็น live coding)
- [ ] ทดสอบ projector + font size ใน terminal
- [ ] เตรียม `_template` SKILL.md สำหรับแจก

### วัน Workshop
- [ ] Wi-Fi password + credentials บนกระดาน
- [ ] น้ำดื่ม ขนม สำหรับ break
- [ ] Backup: skill source code ทั้งหมดใน USB drive
- [ ] Timer app สำหรับจับเวลาแต่ละช่วง

---

## Contingency Plans / แผนสำรอง

| ปัญหา | แผนสำรอง |
|-------|----------|
| Wi-Fi ล่ม | ใช้ hotspot, เตรียม offline materials |
| ผู้เข้าร่วมไม่ได้ setup มาก่อน | เผื่อเวลา 30 นาทีก่อน 09:00 สำหรับ setup |
| บางคนเก่งมาก บางคนตามไม่ทัน | Skill idea catalog มีหลายระดับ, คนเก่งช่วยคนที่ตามไม่ทัน |
| Claude Code API ล่ม | สอน concept + design exercises บนกระดาษ, code ทีหลัง |
| เวลาไม่พอ | ตัด Part 4 เหลือ 30 นาที (concept only), เพิ่มเวลา Part 5 |
