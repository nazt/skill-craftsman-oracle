---
name: git-search
description: "TODO: เขียน description ที่มี trigger words เช่น \"git search\", \"search commits\", \"find in git\", \"git history\""
---

# /git-search - Git Repository Search

<!-- ============================================================
  Exercise 4: Skill with scripts/ — SKILL.md + TypeScript

  เป้าหมาย: เรียนรู้การใช้ script ร่วมกับ SKILL.md
  - SKILL.md เป็น orchestrator (สั่งงาน + format output)
  - scripts/main.ts เป็น worker (ทำงานจริง + return JSON)
  - ทั้งสองไฟล์ทำงานร่วมกัน

  ไฟล์ที่ต้องแก้: 2 ไฟล์
  1. SKILL.md (ไฟล์นี้) — format ผลลัพธ์
  2. scripts/main.ts — เขียน logic ค้นหา git

  วิธีทำ: ค้นหา TODO: ในทั้ง 2 ไฟล์
  ทดสอบ:
    /git-search oracle
    /git-search --commits fix
    /git-search --files README
============================================================ -->

Search commits and files in git history.

## Usage

```
/git-search [keyword]             # Search commits + files
/git-search --commits [keyword]   # Commits only
/git-search --files [keyword]     # Files only
```

## Step 0: Timestamp

```bash
date "+%H:%M %Z (%A %d %B %Y)"
```

## Step 1: Run Search Script

Run the search script with the user's arguments:

```bash
bun scripts/main.ts $ARGUMENTS
```

<!-- NOTE: script จะ return ผลลัพธ์เป็น JSON

  ตัวอย่าง output จาก script:
  {
    "keyword": "oracle",
    "mode": "all",
    "commits": [
      "abc1234 2026-02-14 learn: oracle architecture study",
      "def5678 2026-02-13 trace: oracle patterns found"
    ],
    "files": [
      "CLAUDE.md",
      "ψ/memory/resonance/oracle.md"
    ]
  }
-->

## Step 2: Format Output

<!-- TODO: แปลง JSON จาก script เป็น markdown ที่อ่านง่าย

  ตัวอย่าง output:

  ## Git Search: "oracle"

  ### Commits (2 found)
  | Hash | Date | Message |
  |------|------|---------|
  | abc1234 | 2026-02-14 | learn: oracle architecture study |
  | def5678 | 2026-02-13 | trace: oracle patterns found |

  ### Files (2 found)
  | File | Path |
  |------|------|
  | CLAUDE.md | CLAUDE.md |
  | oracle.md | ψ/memory/resonance/oracle.md |

  ถ้าไม่เจอผลลัพธ์ → แสดง "No results found for '[keyword]'"
  ถ้า mode เป็น --commits → แสดงเฉพาะ Commits section
  ถ้า mode เป็น --files → แสดงเฉพาะ Files section
-->

## Step 3: Summary

<!-- TODO: แสดงสรุปท้าย

  ตัวอย่าง:
  ---
  _Searched in: /Users/nat/Code/github.com/nazt/hello-oracle_
  _Found: 2 commits, 2 files matching "oracle"_
-->

ARGUMENTS: $ARGUMENTS
