#!/usr/bin/env bun
/**
 * Git Search Script
 * เรียกจาก SKILL.md: bun scripts/main.ts "$ARGUMENTS"
 *
 * Exercise 4: Script ที่ทำงานคู่กับ SKILL.md
 *
 * หน้าที่ของ script นี้:
 * 1. รับ arguments จาก command line
 * 2. Parse flags (--commits, --files)
 * 3. ค้นหา git history ด้วย git log --grep และ git grep
 * 4. Return ผลลัพธ์เป็น JSON ให้ SKILL.md ไป format
 *
 * วิธีทำ: ค้นหา TODO: แล้วเติม code ตามคำแนะนำ
 * ทดสอบ: bun scripts/main.ts oracle
 */

import { $ } from "bun";

const args = process.argv.slice(2);
const input = args.join(" ");

// ============================================================
// Step 1: Parse flags
// ============================================================

// TODO: Parse flags จาก input
// ถ้ามี --commits → mode = "commits" (ค้นหาเฉพาะ commits)
// ถ้ามี --files   → mode = "files"   (ค้นหาเฉพาะ files)
// ไม่มี flag     → mode = "all"     (ค้นหาทั้งหมด)
//
// ตัวอย่าง:
//   input = "--commits fix bug"  → mode = "commits", keyword = "fix bug"
//   input = "oracle"             → mode = "all",     keyword = "oracle"

// const mode = "all";  // TODO: detect จาก flags
// const keyword = input; // TODO: เอา flags ออก เหลือแต่ keyword

// ============================================================
// Step 2: Validate input
// ============================================================

// TODO: ตรวจว่ามี keyword หรือไม่
// ถ้าไม่มี → แสดง usage แล้ว exit
//
// if (!keyword) {
//   console.error("Usage: bun scripts/main.ts [--commits|--files] <keyword>");
//   process.exit(1);
// }

// ============================================================
// Step 3: Search commits
// ============================================================

// TODO: ค้นหา commits ด้วย git log
// ใช้เฉพาะเมื่อ mode เป็น "all" หรือ "commits"
//
// Hint: ใช้ Bun shell ($) เรียก git command
// const commits = await $`git log --grep=${keyword} --oneline --format="%h %ad %s" --date=short -20`.text();
//
// แปลง string เป็น array:
// const commitList = commits.split("\n").filter(Boolean);

// ============================================================
// Step 4: Search files
// ============================================================

// TODO: ค้นหา files ด้วย git grep
// ใช้เฉพาะเมื่อ mode เป็น "all" หรือ "files"
//
// Hint: git grep อาจ error ถ้าไม่เจอ → ต้อง try/catch
// let fileList: string[] = [];
// try {
//   const files = await $`git grep -l ${keyword}`.text();
//   fileList = files.split("\n").filter(Boolean);
// } catch {
//   // git grep returns exit code 1 when no matches — ไม่ใช่ error จริง
//   fileList = [];
// }

// ============================================================
// Step 5: Output JSON
// ============================================================

// TODO: สร้าง JSON output แล้ว print
// SKILL.md จะอ่าน JSON นี้ไป format เป็น markdown
//
// const output = {
//   keyword,
//   mode,
//   commits: commitList || [],
//   files: fileList || [],
// };
//
// console.log(JSON.stringify(output, null, 2));
