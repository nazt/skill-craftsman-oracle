---
name: standup-note
description: "TODO: เขียน description ที่มี trigger words เช่น \"standup\", \"daily standup\", \"standup note\", \"daily log\""
---

# /standup-note - Daily Standup Logger

<!-- ============================================================
  Exercise 2: Simple Skill — Interactive + Quick Mode

  เป้าหมาย: เรียนรู้การรับ input 2 แบบ
  - Interactive mode: ถามทีละข้อ
  - Quick mode: parse structured input (did:/will:/block:)

  วิธีทำ: ค้นหา TODO: แล้วเติมเนื้อหาตามคำแนะนำ
  ทดสอบ:
    /standup-note
    /standup-note did:fixed auth bug will:deploy to staging block:waiting for API key
============================================================ -->

## Usage

```
/standup-note                                        # Start interactive standup
/standup-note did:[x] will:[y] block:[z]             # Quick log
```

## Step 0: Timestamp

```bash
date "+%H:%M %Z (%A %d %B %Y)"
```

## Step 1: Parse Input

<!-- TODO: ตรวจสอบว่ามี arguments หรือไม่

  Case A — ไม่มี arguments:
    → เข้า Interactive mode
    → ถาม user ทีละข้อ:
      1. "What did you accomplish?" (สิ่งที่ทำแล้ว)
      2. "What will you work on next?" (สิ่งที่จะทำ)
      3. "Any blockers?" (อุปสรรค — ตอบ "none" ได้)

  Case B — มี arguments ที่มี did:/will:/block:
    → เข้า Quick mode
    → parse ค่าหลัง did: will: block: ออกมา

  Hint: ไม่ต้อง parse ด้วย code — Claude เข้าใจ natural language
  แค่อธิบายให้ชัดว่าข้อมูลแต่ละส่วนคืออะไร
-->

## Step 2: Collect Information

<!-- TODO: รวบรวมข้อมูล 3 ส่วน:

  1. Did — สิ่งที่ทำแล้ว (required, ต้องมีอย่างน้อย 1 ข้อ)
  2. Will do — สิ่งที่จะทำ (required, ต้องมีอย่างน้อย 1 ข้อ)
  3. Blockers — อุปสรรค (optional, อาจไม่มีก็ได้)

  ถ้า user ตอบ blocker ว่า "none", "no", "ไม่มี" → บันทึกว่า "None"
-->

## Step 3: Create Log Entry

<!-- TODO: สร้างไฟล์ standup note

  ที่อยู่ไฟล์: ψ/memory/logs/standups/YYYY-MM-DD.md

  ถ้าวันนี้มีไฟล์อยู่แล้ว → append (เพิ่มต่อท้าย) ด้วย --- separator
  ถ้ายังไม่มี → สร้างใหม่

  สร้าง directory ψ/memory/logs/standups/ ถ้ายังไม่มี

  Format:
  ```markdown
  # Standup — YYYY-MM-DD

  _Logged at HH:MM_

  ## Did
  - [item 1]
  - [item 2]

  ## Will Do
  - [item 1]
  - [item 2]

  ## Blockers
  - [item or "None"]
  ```
-->

## Step 4: Show Summary

<!-- TODO: แสดงผลสรุปให้ user เห็น

  ตัวอย่าง output:

  ## Standup Logged

  **Date**: 2026-02-14
  **Time**: 09:15

  | Section | Items |
  |---------|-------|
  | Did | Fixed auth bug, Updated docs |
  | Will Do | Deploy staging, Code review |
  | Blockers | None |

  **Saved to**: ψ/memory/logs/standups/2026-02-14.md
-->

ARGUMENTS: $ARGUMENTS
