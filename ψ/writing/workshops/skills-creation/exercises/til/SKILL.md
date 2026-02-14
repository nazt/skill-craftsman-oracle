---
name: til
description: "TODO: เขียน description ที่มี trigger words เช่น \"til\", \"today I learned\", \"learned\", \"TIL\""
---

# /til - Today I Learned

<!-- ============================================================
  Exercise 3: Simple Skill — 3 Modes + Time-Prefix Naming

  เป้าหมาย: เรียนรู้ patterns สำคัญ
  - 3 modes ใน skill เดียว (list / search / log)
  - Time-prefix naming: YYYY-MM-DD_HHMM_slug.md (ป้องกัน overwrite)
  - YAML frontmatter ในไฟล์ที่สร้าง

  วิธีทำ: ค้นหา TODO: แล้วเติมเนื้อหาตามคำแนะนำ
  ทดสอบ:
    /til Bun shell API uses tagged template literals for commands
    /til
    /til --search bun
============================================================ -->

## Usage

```
/til [thing I learned]          # Log a TIL
/til                            # List recent TILs
/til --search [keyword]         # Search TILs
```

## Step 0: Timestamp

```bash
date "+%H:%M %Z (%A %d %B %Y)"
```

## Step 1: Detect Mode

<!-- TODO: ตรวจสอบ ARGUMENTS เพื่อเลือก mode:

  1. ไม่มี arguments เลย
     → List mode: แสดง TIL ล่าสุด

  2. เริ่มด้วย --search
     → Search mode: ค้นหา TIL ด้วย keyword ที่ตามหลัง --search

  3. อื่นๆ ทั้งหมด
     → Log mode: บันทึก TIL ใหม่ (arguments ทั้งหมดคือเนื้อหา)
-->

## Mode: List — Show Recent TILs

<!-- TODO: อ่านไฟล์ใน directory ψ/memory/logs/til/

  ถ้า directory ยังไม่มี → สร้างแล้วแสดง "No TILs yet. Use /til [learned thing] to log one."
  ถ้ามีไฟล์ → แสดง 10 อันล่าสุด (sort by filename descending — ชื่อไฟล์มี date prefix)

  แสดงเป็นตาราง:
  | # | Date | Topic |
  |---|------|-------|
  | 1 | 2026-02-14 14:30 | Bun shell API uses tagged template literals |
  | 2 | 2026-02-14 09:00 | YAML frontmatter needs triple dashes |

  Hint: ใช้ ls -1r เพื่อ sort ย้อนกลับ (ใหม่สุดก่อน)
-->

## Mode: Search — Find TILs by Keyword

<!-- TODO: ค้นหาใน directory ψ/memory/logs/til/ ด้วย keyword

  ใช้ grep -rl เพื่อหาไฟล์ที่มี keyword (case insensitive)
  แสดงผลเหมือน List mode แต่เฉพาะไฟล์ที่ match

  ถ้าไม่เจอ → แสดง "No TILs found matching '[keyword]'"
-->

## Mode: Log — Record New TIL

### Step 2: Create TIL Entry

<!-- TODO: สร้างไฟล์ TIL ใหม่

  ที่อยู่ไฟล์: ψ/memory/logs/til/YYYY-MM-DD_HHMM_slug.md

  สำคัญ! ใช้ time-prefix naming:
  - YYYY-MM-DD = วันที่ (เช่น 2026-02-14)
  - HHMM = เวลา 4 หลัก (เช่น 1430)
  - slug = หัวข้อย่อ ตัดเป็น 3-5 คำ, lowercase, ใช้ - แทน space

  ตัวอย่างชื่อไฟล์: 2026-02-14_1430_bun-shell-api.md

  เนื้อหาไฟล์:
  ```markdown
  ---
  date: YYYY-MM-DD HH:MM
  type: til
  ---

  # TIL: [topic — สรุปสั้นๆ จาก arguments]

  [เนื้อหาเต็มจาก arguments]
  ```

  Hint: สร้าง directory ψ/memory/logs/til/ ถ้ายังไม่มี (mkdir -p)
-->

### Step 3: Confirm

<!-- TODO: แสดงผลยืนยันว่าบันทึกสำเร็จ

  ตัวอย่าง output:

  ## TIL Logged!

  **Topic**: Bun shell API uses tagged template literals
  **Date**: 2026-02-14 14:30
  **File**: ψ/memory/logs/til/2026-02-14_1430_bun-shell-api.md

  _Total TILs: 42_
-->

ARGUMENTS: $ARGUMENTS
