---
name: bookmark
description: "TODO: เขียน description ที่มี trigger words เช่น \"bookmark\", \"save url\", \"save link\""
---

# /bookmark - URL Bookmark Manager

<!-- ============================================================
  Exercise 1: Simple Skill — ไม่ต้องเขียน code, ใช้ markdown อย่างเดียว

  เป้าหมาย: เรียนรู้ SKILL.md format พื้นฐาน
  - YAML frontmatter (name + description)
  - Steps ที่เรียงลำดับ
  - ARGUMENTS: $ARGUMENTS ท้ายไฟล์

  วิธีทำ: ค้นหา TODO: แล้วเติมเนื้อหาตามคำแนะนำ
  ทดสอบ: /bookmark https://example.com dev tutorial
============================================================ -->

## Usage

```
/bookmark [url] [tags...]       # Save a bookmark
/bookmark                       # List saved bookmarks
```

## Step 0: Timestamp

```bash
date "+%H:%M %Z (%A %d %B %Y)"
```

## Step 1: Parse Input

<!-- TODO: อธิบายวิธี parse ARGUMENTS
  - ถ้าไม่มี arguments → Mode 1: แสดง bookmarks ที่บันทึกไว้
  - ถ้ามี arguments → Mode 2: บันทึก bookmark ใหม่

  Hint: URL จะเริ่มด้วย http:// หรือ https://
  ที่เหลือทั้งหมดคือ tags (เช่น dev, tutorial, reference)

  ตัวอย่าง:
  /bookmark https://docs.anthropic.com claude api docs
  → URL = https://docs.anthropic.com
  → Tags = claude, api, docs
-->

## Mode 1: No Arguments — List Bookmarks

<!-- TODO: อ่านไฟล์ ψ/memory/logs/bookmarks.log แล้วแสดงเป็นตาราง

  ถ้าไฟล์ยังไม่มี → แสดงข้อความว่า "No bookmarks yet. Use /bookmark [url] to save one."
  ถ้ามีแล้ว → แสดงเป็นตาราง:

  | Date | URL | Tags |
  |------|-----|------|
  | 2026-02-14 14:30 | https://example.com | dev, tutorial |
-->

## Mode 2: With Arguments — Save Bookmark

### Step 2: Extract URL and Tags

<!-- TODO: แยก URL กับ tags จาก input

  วิธีคิด:
  1. หา argument ที่เริ่มด้วย http:// หรือ https:// → นั่นคือ URL
  2. ที่เหลือทั้งหมด → เป็น tags
  3. ถ้าไม่มี URL → แจ้ง error "Please provide a URL (starting with http:// or https://)"
-->

### Step 3: Save to Log

<!-- TODO: เขียนลงไฟล์ ψ/memory/logs/bookmarks.log (append, ห้าม overwrite!)

  สร้างไฟล์ถ้ายังไม่มี

  Format ของแต่ละบรรทัด:
  YYYY-MM-DD HH:MM | [url] | [tags คั่นด้วย comma]

  ตัวอย่าง:
  2026-02-14 14:30 | https://docs.anthropic.com | claude, api, docs

  Hint: ใช้ Bash tool กับ echo >> (double arrow = append)
-->

### Step 4: Confirm

<!-- TODO: แสดงผลยืนยันให้ user เห็นว่าบันทึกสำเร็จ

  ตัวอย่าง output:

  ## Bookmark Saved

  **URL**: https://docs.anthropic.com
  **Tags**: claude, api, docs
  **Saved at**: 14:30
  **File**: ψ/memory/logs/bookmarks.log
-->

ARGUMENTS: $ARGUMENTS
