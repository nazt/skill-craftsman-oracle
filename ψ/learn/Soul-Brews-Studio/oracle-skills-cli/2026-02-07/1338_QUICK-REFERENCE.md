# Oracle Skills CLI — Quick Reference Guide

**Version**: 1.5.72 | **Date**: 2026-02-07 | **Author**: Soul Brews Studio

A comprehensive guide for building, installing, and publishing AI agent skills. This document covers the entire lifecycle from skill creation to deployment across 14+ coding agents.

---

## Table of Contents

1. [What is oracle-skills-cli?](#what-is-oracle-skills-cli)
2. [The 26 Skills](#the-26-skills)
3. [Installation](#installation)
4. [Creating a Skill](#creating-a-skill)
5. [SKILL.md Format & Conventions](#skillmd-format--conventions)
6. [Scripts & Arguments](#scripts--arguments)
7. [Supported AI Agents (14+)](#supported-ai-agents-14)
8. [Compile Process](#compile-process)
9. [Testing Skills Locally](#testing-skills-locally)
10. [Publishing & Versioning](#publishing--versioning)
11. [Depth Modes Pattern](#depth-modes-pattern)
12. [Subagent Delegation](#subagent-delegation)
13. [Output Formatting](#output-formatting)

---

## What is oracle-skills-cli?

**oracle-skills-cli** is a cross-agent skill installer and framework for extending AI code editors and agents with custom workflows and capabilities.

### Key Features

- **Universal**: Install to Claude Code, OpenCode, Cursor, and 11+ other agents
- **Versioned**: Each skill has semantic versioning, auto-compiled to command stubs
- **Scriptable**: Write skill logic in TypeScript/Bun Shell with access to system commands
- **Modular**: Skills are self-contained directories with documentation and executables
- **Subagent-capable**: Spawn parallel agents for complex workflows (learn, rrr, trace patterns)
- **Philosophy-driven**: Aligns with Oracle principles (preserve history, observe patterns, external brain)

### Core Architecture

```
oracle-skills-cli (CLI)
├── Skills (src/skills/)           ← Agent-executable workflows
│   └── {skill-name}/
│       ├── SKILL.md                ← Instructions + frontmatter
│       └── scripts/                ← Optional Bun/TypeScript code
├── Commands (src/commands/)        ← Auto-generated stubs for Claude Code
└── Installer (src/cli/)            ← Copies skills to agent directories
```

### The Philosophy

> "The Oracle Keeps the Human Human"

Oracle skills embody 5 core principles:

1. **Nothing is Deleted**: Append-only history, timestamps as truth
2. **Patterns Over Intentions**: Observe behavior, not promises
3. **External Brain, Not Command**: Mirror reality, present options, let humans decide
4. **Curiosity Creates Existence**: Questions birth knowledge and exploration
5. **Form and Formless**: Multiple instances, shared principles, unique identities

---

## The 26 Skills

Comprehensive list of all available skills organized by type and capability level.

### Tier 1: Exploration & Learning (Skills + Subagents)

| # | Skill | Type | Description | Use When |
|---|-------|------|-------------|----------|
| 1 | **learn** | skill + subagent | Explore codebase with parallel Haiku agents | "learn [repo]", "explore codebase", "study this repo" |
| 2 | **rrr** | skill + subagent | Session retrospective with AI diary | "rrr", "wrap up session", "retrospective", "lessons learned" |
| 3 | **trace** | skill + subagent | Find projects across git history, repos | "trace [project]", "find repos", "search git history" |

### Tier 2: Integration & Research (Skills + Code)

| # | Skill | Type | Description | Use When |
|---|-------|------|-------------|----------|
| 4 | **deep-research** | skill + code | Deep Research via Gemini API | "research [topic]", "deep dive research" |
| 5 | **gemini** | skill + code | Control Gemini via MQTT WebSocket | "gemini [prompt]", "use Gemini" |
| 6 | **physical** | skill + code | Physical location awareness from FindMy | "where am I", "location check" |
| 7 | **project** | skill + code | Clone and track external repos | "project [url]", "clone and track" |
| 8 | **recap** | skill + code | Fresh-start orientation—adaptive synthesis | "recap", "summary", "what are we doing?" |
| 9 | **schedule** | skill + code | Query schedule.md using DuckDB markdown | "schedule", "what's planned?", "show agenda" |
| 10 | **speak** | skill + code | Text-to-speech using edge-tts or macOS say | "speak", "say", "read aloud" |
| 11 | **watch** | skill + code | Learn from YouTube videos | "watch [url]", "learn from video" |

### Tier 3: Session & Context (Skills Only)

| # | Skill | Type | Description | Use When |
|---|-------|------|-------------|----------|
| 12 | **awaken** | skill | Guided Oracle birth | First setup, "create new Oracle" |
| 13 | **birth** | skill | Prepare birth props for new Oracle repo | "init new Oracle", "setup new project" |
| 14 | **feel** | skill | Log emotions with optional structure | "feel [mood]", "how am I?", "tired/happy" |
| 15 | **forward** | skill | Create handoff + enter plan mode for next | "forward", "handoff to next session" |
| 16 | **fyi** | skill | Log information for future reference | "fyi [info]", "note this", "remember" |
| 17 | **merged** | skill | Post-Merge Cleanup | "merged", "cleanup after merge" |
| 18 | **oracle-family-scan** | skill | Manage Oracle family | "scan family", "family status" |
| 19 | **oracle-pulse** | skill | Quantitative heartbeat from ~/.claude/ | "pulse", "heartbeat", "stats" |
| 20 | **oracle-soul-sync-calibrate-update** | skill | Sync Oracle instruments with family | "sync", "calibrate", "update soul" |
| 21 | **philosophy** | skill | Display Oracle philosophy principles | "philosophy", "principles", "alignment check" |
| 22 | **retrospective** | skill | Create session retrospective with AI diary | "retrospective", "session review" |
| 23 | **standup** | skill | Daily standup check | "standup", "daily check-in" |
| 24 | **where-we-are** | skill | Session awareness—what we're doing now | "where are we?", "current status" |
| 25 | **who-we-are** | skill | Know ourselves | "who are we?", "our identity" |
| 26 | **worktree** | skill | Git worktree for parallel work | "worktree", "parallel work", "branches" |

**Note**: Skills marked "skill + subagent" spawn parallel Claude Haiku agents to process complex tasks. Other skills run synchronously in the agent.

---

## Installation

### One Command (All Agents)

```bash
curl -fsSL https://raw.githubusercontent.com/Soul-Brews-Studio/oracle-skills-cli/main/install.sh | bash
```

### Step-by-Step Installation

**Requirements:**
- bash/zsh (macOS/Linux) or Git Bash (Windows)
- Bun runtime (installed by script)
- ghq (GitHub repo organizer, for `/learn` and `/trace`)

**Steps:**

```bash
# 1. Install Bun (if not already installed)
which bun || curl -fsSL https://bun.sh/install | bash

# 2. Install ghq (required for /learn and /trace)
which ghq || brew install ghq              # macOS
# Linux/Windows: go install github.com/x-motemen/ghq@latest

# 3. Install oracle-skills globally
~/.bun/bin/bunx --bun \
  oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v1.5.72 \
  install -g -y

# 4. Setup permissions (in your Oracle repo, before running `claude .`)
mkdir -p .claude && cat > .claude/settings.local.json << 'EOF'
{
  "permissions": {
    "allow": [
      "Bash(gh:*)", "Bash(ghq:*)", "Bash(git:*)",
      "Bash(bun:*)", "Bash(bunx:*)", "Bash(mkdir:*)", "Bash(ln:*)",
      "Bash(rg:*)", "Bash(date:*)", "Bash(ls:*)", "Bash(tree:*)",
      "Bash(curl:*)", "Bash(du:*)", "Bash(wc:*)",
      "Bash(*ψ/*)", "Bash(*psi/*)",
      "Skill(learn)", "Skill(trace)", "Skill(awaken)",
      "Skill(rrr)", "Skill(recap)", "Skill(project)"
    ]
  }
}
EOF

# 5. Create alias (add to ~/.bashrc or ~/.zshrc)
alias oracle-skills='~/.bun/bin/bunx --bun \
  oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v1.5.72'

# 6. Restart your agent (for Claude Code: run /awaken)
```

### Install Commands

```bash
# List available skills
oracle-skills list -g

# Install all skills to detected agents
oracle-skills install -g -y

# Install specific skills
oracle-skills install -g -y --skill learn --skill rrr

# Install to specific agent
oracle-skills install -g -y --agent claude-code
oracle-skills install -g -y --agent opencode --agent cursor

# Uninstall
oracle-skills uninstall -g -y
```

### Installation Locations by Agent

| Agent | Skills Path | Global Path | Commands |
|-------|-------------|-------------|----------|
| Claude Code | `.claude/skills/` | `~/.claude/skills/` | `.claude/commands/` |
| OpenCode | `.opencode/skills/` | `~/.config/opencode/skills/` | `.opencode/commands/` |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` | — |
| Codex | `.codex/skills/` | `~/.codex/skills/` | — |
| Amp | `.agents/skills/` | `~/.config/agents/skills/` | — |
| Kilo Code | `.kilocode/skills/` | `~/.kilocode/skills/` | — |
| Roo Code | `.roo/skills/` | `~/.roo/skills/` | — |
| Goose | `.goose/skills/` | `~/.config/goose/skills/` | — |
| Gemini CLI | `.gemini/skills/` | `~/.gemini/skills/` | — |
| Antigravity | `.agent/skills/` | `~/.gemini/antigravity/skills/` | — |
| GitHub Copilot | `.github/skills/` | `~/.copilot/skills/` | — |
| Clawdbot | `skills/` | `~/.clawdbot/skills/` | — |
| Droid | `.factory/skills/` | `~/.factory/skills/` | — |
| Windsurf | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` | — |

---

## Creating a Skill

Step-by-step guide to build a new skill from scratch.

### Step 1: Copy the Template

```bash
# From oracle-skills-cli repo
cp -r src/skills/_template src/skills/my-skill
```

Or manually:

```bash
mkdir -p src/skills/my-skill/scripts
```

### Step 2: Create SKILL.md

**File**: `src/skills/my-skill/SKILL.md`

```markdown
---
name: my-skill
description: One-line summary. Use when user says "trigger words" or "action".
---

# /my-skill

Full documentation and instructions here.

## Usage

```bash
/my-skill [args]
```

## Step 0: Timestamp

```bash
date "+🕐 %H:%M %Z (%A %d %B %Y)"
```

## Steps

[Implement your skill logic here, step by step]

---

ARGUMENTS: $ARGUMENTS
```

### Step 3: Add Scripts (Optional)

If your skill needs computation:

```bash
touch src/skills/my-skill/scripts/main.ts
chmod +x src/skills/my-skill/scripts/main.ts
```

**Template** (`scripts/main.ts`):

```typescript
#!/usr/bin/env bun
/**
 * My Skill Script
 *
 * Called from SKILL.md via: bun scripts/main.ts "$ARGUMENTS"
 */
import { $ } from "bun"

// Get arguments from command line
const args = process.argv.slice(2)
const input = args[0] || ""

// ============================================
// YOUR LOGIC HERE
// ============================================

// Example: Run shell commands
const result = await $`echo "Processing: ${input}"`.text()

// Example: Return structured output
const output = {
  input,
  timestamp: new Date().toISOString(),
  result: result.trim()
}

console.log(JSON.stringify(output, null, 2))
```

### Step 4: Update Frontmatter

Every SKILL.md requires frontmatter:

```yaml
---
name: my-skill              # Identifier (no spaces, lowercase)
description: Brief description used when listing skills. Include trigger words.
---
```

**Important**: The `description` field is how agents know when to use your skill. Make it clear and include common trigger phrases.

### Step 5: Compile

```bash
bun run compile
```

This generates `src/commands/my-skill.md` (auto-generated stub).

### Step 6: Set Script Permissions

**All scripts must have executable permission!**

```bash
chmod +x src/skills/my-skill/scripts/*.ts
chmod +x src/skills/my-skill/scripts/*.sh
```

Check permissions:

```bash
find src/skills -name "*.ts" ! -name "*.test.ts" -exec ls -la {} \; | grep -v rwx
```

### Step 7: Test Locally

```bash
# Run script directly
bun scripts/main.ts "test input"

# Or with npx fallback
npx tsx scripts/main.ts "test input"
```

### Step 8: Test in Agent

For Claude Code:

```bash
# Install locally (project directory)
oracle-skills install -y --skill my-skill

# Or globally
oracle-skills install -g -y --skill my-skill

# In Claude Code, call: /my-skill
```

### Example: Simple Skill

**`src/skills/hello/SKILL.md`:**

```markdown
---
name: hello
description: Greet the user. Use when user says "hello", "hi", or "greet me".
---

# /hello - Greetings

A simple skill to greet the user.

## Step 0: Timestamp

```bash
date "+🕐 %H:%M %Z"
```

## Step 1: Greet

```bash
bun scripts/greet.ts "$ARGUMENTS"
```

---

ARGUMENTS: $ARGUMENTS
```

**`src/skills/hello/scripts/greet.ts`:**

```typescript
#!/usr/bin/env bun
const name = process.argv[2] || "Friend"
console.log(`👋 Hello, ${name}!`)
```

---

## SKILL.md Format & Conventions

The SKILL.md file is the skill's instruction set. Agents read it and execute the steps.

### Required Frontmatter

```yaml
---
name: skill-name
description: Shown in skill list. Include trigger words like "when user says X, Y, Z".
---
```

### Structure

```markdown
# /{skill-name} - Title

[Brief explanation]

## Usage

```bash
/{skill-name} [args]
/{skill-name} --flag
```

## Step 0: Timestamp

```bash
date "+🕐 %H:%M %Z (%A %d %B %Y)"
```

Always include a timestamp as the first step.

## Step 1-N: Implementation

Each step is a self-contained instruction:

```bash
# Commands to run
git status
ls -la

# Or spawn scripts
bun scripts/main.ts "$ARGUMENTS"
```

## Output

Show results using:
- Tables: `| Header | Header |`
- Code blocks: `` ` ``
- Markdown formatting

---

ARGUMENTS: $ARGUMENTS
```

### Conventions

| Pattern | Purpose | Example |
|---------|---------|---------|
| `# /skill-name` | Skill title | `# /learn` |
| `---` (YAML block) | Frontmatter | `name:`, `description:` |
| `## Step 0: Timestamp` | First step always | `date "+🕐 %H:%M"` |
| `## Step 1-N` | Sequential steps | `bun scripts/main.ts` |
| `ARGUMENTS: $ARGUMENTS` | Last line | Passes args to scripts |
| `## Usage` | How to call | `/skill [args]` |
| `` `bash `` blocks | Shell code | Commands that agent executes |
| Tables with `\|` | Structured output | Results, options, configs |

### Example Sections

**Usage**:
```markdown
## Usage

```bash
/learn [url]              # Clone via ghq
/learn --fast [target]    # 1 agent, quick
/learn --deep [target]    # 5 agents, deep dive
```
```

**Conditional Logic**:
```markdown
## Mode: If URL

If input is a GitHub URL or owner/repo:
1. Clone with ghq
2. Create symlink
3. Update manifest

## Mode: If Local Path

If input is a directory:
1. Read directly
2. No clone needed
3. Write output
```

**Depth Modes**:
```markdown
| Mode | Agents | Use Case |
|------|--------|----------|
| `--fast` | 1 | Quick scan |
| (default) | 3 | Normal exploration |
| `--deep` | 5 | Comprehensive |
```

---

## Scripts & Arguments

Scripts provide computation logic for skills.

### How Arguments Flow

```
User: /my-skill "input text" --flag
        ↓
Agent reads SKILL.md
        ↓
Agent sees: bun scripts/main.ts "$ARGUMENTS"
        ↓
Agent calls: bun scripts/main.ts "input text" --flag
        ↓
Script receives args in process.argv
```

### Accessing Arguments

**Bun Shell (TypeScript)**:

```typescript
#!/usr/bin/env bun
import { $ } from "bun"

// Get raw arguments
const args = process.argv.slice(2)
const firstArg = args[0]
const allArgs = args.join(" ")

// Parse specific flags
const hasFlag = args.includes("--flag")
const value = args[args.indexOf("--option") + 1]

// Example: Run with arguments
const result = await $`echo ${firstArg}`.text()
console.log(result)
```

**Bash**:

```bash
#!/bin/bash
# $1 = first argument
# $2 = second argument
# $* = all arguments

INPUT="$1"
FLAG="$2"

echo "Received: $INPUT"
```

### Output Formats

Scripts should output data that agents can process:

**JSON** (for structured data):
```typescript
console.log(JSON.stringify({
  status: "success",
  data: [1, 2, 3],
  timestamp: new Date().toISOString()
}, null, 2))
```

**Plain Text** (for simple messages):
```typescript
console.log("✓ Operation successful")
```

**Markdown** (for formatted display):
```typescript
console.log(`
## Results

| File | Status |
|------|--------|
| main.ts | ✓ |
`)
```

### Bun Shell Patterns

Quick reference for common shell tasks in Bun:

```typescript
import { $ } from "bun"

// Run command and get text
const output = await $`git log --oneline`.text()

// With variables (auto-escaped!)
const query = "search term"
const result = await $`grep -r ${query} .`.text()

// Parse JSON output
const pkg = await $`cat package.json`.json()

// Check if command succeeded
const { exitCode } = await $`git diff --quiet`
if (exitCode !== 0) {
  console.log("Has changes")
}

// Suppress errors
const safe = await $`git checkout nonexistent`.quiet()
if (safe.exitCode !== 0) {
  console.error("Failed")
}

// Multi-line commands
const log = await $`
  git log --oneline
  --since="1 week ago"
  --author=me
`.text()

// Error handling
try {
  await $`npm install`
} catch (e) {
  console.error("Install failed")
}
```

### Example Scripts

**List files**:
```typescript
#!/usr/bin/env bun
const { $ } = await import("bun")
const files = await $`ls -la`.text()
console.log(files)
```

**Git search**:
```typescript
#!/usr/bin/env bun
const { $ } = await import("bun")
const query = process.argv[2] || ""
const commits = await $`git log --grep=${query}`.text()
console.log(commits)
```

**JSON processing**:
```typescript
#!/usr/bin/env bun
const pkg = await Bun.file("package.json").json()
console.log(JSON.stringify({
  name: pkg.name,
  version: pkg.version
}, null, 2))
```

---

## Supported AI Agents (14+)

Oracle skills work across 14+ AI coding agents with automatic installation.

### Installation by Agent

Each agent has a unique directory structure. The CLI auto-detects and installs correctly.

**Claude Code**:
```bash
oracle-skills install -g -y --agent claude-code
# Skills: ~/.claude/skills/{name}/SKILL.md
# Commands: ~/.claude/commands/{name}.md
```

**OpenCode**:
```bash
oracle-skills install -g -y --agent opencode
# Skills: ~/.config/opencode/skills/{name}/SKILL.md
# Commands: ~/.config/opencode/commands/{name}.md
```

**Cursor**:
```bash
oracle-skills install -g -y --agent cursor
# Skills: ~/.cursor/skills/{name}/SKILL.md
```

**Codex**:
```bash
oracle-skills install -g -y --agent codex
# Skills: ~/.codex/skills/{name}/SKILL.md
```

**Windsurf**:
```bash
oracle-skills install -g -y --agent windsurf
# Skills: ~/.codeium/windsurf/skills/{name}/SKILL.md
```

### Auto-Detection

The installer auto-detects installed agents:

```bash
# Detects claude-code, opencode, cursor, etc.
oracle-skills install -g -y

# Prompts which agents to install to (unless -y is used)
```

### Global vs Local Installation

| Option | Location | Scope |
|--------|----------|-------|
| `oracle-skills install` | `.claude/skills/` | Project only |
| `oracle-skills install -g` | `~/.claude/skills/` | All projects |

**Project installation** (no `-g`):
- Creates `.claude/skills/my-skill/SKILL.md`
- Only visible to this project
- Overrides global skills

**Global installation** (`-g`):
- Creates `~/.claude/skills/my-skill/SKILL.md`
- Available to all projects
- More convenient

---

## Compile Process

The compilation step converts skill definitions into command stubs for agents.

### How It Works

```
INPUT:  src/skills/{name}/SKILL.md
           ↓
        Extract frontmatter:
        - name
        - description
           ↓
        Generate command stub
           ↓
OUTPUT: src/commands/{name}.md
```

### Running Compile

```bash
# In oracle-skills-cli repo
bun run compile

# Or via version script (includes compile)
bun run version
```

### What Gets Generated

For each skill in `src/skills/`, a command stub is created:

**Input** (`src/skills/learn/SKILL.md`):
```markdown
---
name: learn
description: Explore a codebase with parallel Haiku agents. Use when user says "learn [repo]".
---

# /learn
...
```

**Output** (`src/commands/learn.md`):
```markdown
---
description: v1.5.72 | Explore a codebase with parallel Haiku agents. Use when user says "learn [repo]".
---

# /learn

Execute the `learn` skill with the provided arguments.

## Instructions

**If you have a Skill tool available**: Use it directly with `skill: "learn"` instead of reading the file manually.

**Otherwise**:
1. Read the skill file: `{skillPath}/learn/SKILL.md`
2. Follow all instructions in the skill file
3. Pass these arguments to the skill: `$ARGUMENTS`

## Skill Location

- Local: `.claude/skills/learn/SKILL.md`
- Global: `~/.claude/skills/learn/SKILL.md`

---
*oracle-skills-cli v1.5.72*
```

### During Installation

The installer also modifies frontmatter:

**Before**:
```yaml
description: Explore a codebase with parallel Haiku agents.
```

**After** (installed globally):
```yaml
description: v1.5.72 G-SKLL | Explore a codebase with parallel Haiku agents.
installer: oracle-skills-cli v1.5.72
```

Tags:
- `G-SKLL` = Global Skill
- `L-SKLL` = Local Skill
- `G-CMD` = Global Command
- `L-CMD` = Local Command

### Manifest File

After installation, a manifest records all installed skills:

File: `~/.oracle-skills.json`

```json
{
  "version": "1.5.72",
  "agent": "claude-code",
  "installed": [
    {
      "name": "learn",
      "version": "1.5.72",
      "installedAt": "2026-02-07T13:38:00Z",
      "location": "~/.claude/skills/learn"
    }
  ]
}
```

### Important

- **DO NOT manually edit** `src/commands/*.md` — they are auto-generated
- **Always run** `bun run compile` after editing skills
- **Commit compiled files**: Git add `src/commands/`

---

## Testing Skills Locally

How to verify a skill works before publishing.

### Test Scripts Directly

```bash
# Navigate to scripts directory
cd src/skills/my-skill/scripts

# Run TypeScript directly with Bun
bun main.ts "test input"
bun main.ts --flag "another test"

# With npx fallback (if Bun not available)
npx tsx main.ts "test input"
```

### Test with Shell

Create a test file:

```bash
# test-skill.sh
#!/bin/bash
set -e

SKILL_DIR="src/skills/my-skill"
SCRIPT="$SKILL_DIR/scripts/main.ts"

echo "Testing: $SKILL_DIR"
echo "---"

# Test 1: No arguments
echo "Test 1: No arguments"
bun "$SCRIPT"

# Test 2: With arguments
echo -e "\nTest 2: With arguments"
bun "$SCRIPT" "test input"

# Test 3: With flags
echo -e "\nTest 3: With flags"
bun "$SCRIPT" --flag "value"

echo -e "\n✓ All tests passed"
```

Run:
```bash
chmod +x test-skill.sh
./test-skill.sh
```

### Test in Agent (Claude Code)

1. **Install locally** (project directory):
   ```bash
   oracle-skills install -y --skill my-skill
   ```

2. **Restart Claude Code** (if needed)

3. **Call the skill**:
   ```
   /my-skill test arguments
   ```

4. **Check output**: Verify results match expectations

### Test in Agent (OpenCode)

1. **Install**:
   ```bash
   oracle-skills install -y --agent opencode --skill my-skill
   ```

2. **In OpenCode**:
   ```
   /my-skill test arguments
   ```

### Debugging

**Check installation**:
```bash
ls -la ~/.claude/skills/my-skill/
# Should show: SKILL.md, scripts/

ls -la ~/.claude/commands/my-skill.md
# Should show the generated command stub
```

**Check logs** (Claude Code):
- View: `Claude Code` menu → Diagnostics → Agent Logs
- Look for: Skill execution output, error messages

**Check script permissions**:
```bash
ls -la src/skills/my-skill/scripts/
# Scripts should have: rwxr-xr-x (755)
# If not: chmod +x src/skills/my-skill/scripts/*.ts
```

**Test with explicit path**:
```bash
~/.bun/bin/bun src/skills/my-skill/scripts/main.ts "test"
```

---

## Publishing & Versioning

How to publish skills and manage versions.

### Version Workflow

**Semantic Versioning**: `MAJOR.MINOR.PATCH`

Example: `1.5.72`
- `1` = Major (breaking changes)
- `5` = Minor (new features)
- `72` = Patch (bug fixes)

### Release Process

1. **Update version in** `package.json`:
   ```json
   {
     "version": "1.5.73"
   }
   ```

2. **Compile and commit**:
   ```bash
   bun run compile
   # Regenerates src/commands/ with new version

   bun run version
   # Runs compile + updates README + stages files
   ```

3. **Git commit**:
   ```bash
   git add src/commands/ README.md package.json
   git commit -m "v1.5.73: Add new features"
   ```

4. **Tag and push**:
   ```bash
   git tag v1.5.73
   git push origin main --tags
   ```

5. **GitHub Release** (optional):
   - Create release on GitHub
   - Users can install with: `bunx oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v1.5.73`

### Installation from Specific Version

Users can install a specific version:

```bash
# Latest
bunx oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli install -g -y

# Specific version
bunx oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v1.5.70 install -g -y

# Specific branch
bunx oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#feature-branch install -g -y
```

### Version in Descriptions

Descriptions are auto-versioned during compile:

```yaml
# In SKILL.md
description: Explore a codebase. Use when user says "learn [repo]".

# After compile (in src/commands/)
description: v1.5.73 | Explore a codebase. Use when user says "learn [repo]".

# After install (in ~/.claude/skills/)
description: v1.5.73 G-SKLL | Explore a codebase. Use when user says "learn [repo]".
```

### README Auto-Update

```bash
bun run compile
# Also runs: bun scripts/update-readme-table.ts
# Updates the 26-skill table in README.md
```

---

## Depth Modes Pattern

Many complex skills support depth modes for different exploration levels.

### The Pattern

```bash
/skill --fast [target]      # 1 agent, quick (~2 min)
/skill [target]             # 3 agents, normal (~5 min) [default]
/skill --deep [target]      # 5 agents, comprehensive (~10 min)
```

### How It Works

**--fast mode** (1 agent):
- Single overview/summary
- Quick scan, "what is this?"
- Minimal processing
- ~2 minutes

**Default mode** (3 agents):
- Three specialized agents in parallel
- Balanced exploration
- Standard learning
- ~5 minutes

**--deep mode** (5 agents):
- Five comprehensive agents
- Deep mastery of complex codebases
- Advanced patterns and architecture
- ~10 minutes

### Example: /learn

```bash
/learn --fast https://github.com/owner/repo
# 1 agent → OVERVIEW.md

/learn https://github.com/owner/repo
# 3 agents → ARCHITECTURE.md, CODE-SNIPPETS.md, QUICK-REFERENCE.md

/learn --deep https://github.com/owner/repo
# 5 agents → ARCHITECTURE.md, CODE-SNIPPETS.md, QUICK-REFERENCE.md, TESTING.md, API-SURFACE.md
```

### Implementing Depth Modes

In SKILL.md:

```markdown
## Depth Modes

| Flag | Agents | Files | Use Case |
|------|--------|-------|----------|
| `--fast` | 1 | 1 overview | Quick scan |
| (default) | 3 | 3 docs | Normal |
| `--deep` | 5 | 5 docs | Comprehensive |

## Step 1: Detect Mode

Check $ARGUMENTS for:
- `--fast` → Spawn 1 agent
- `--deep` → Spawn 5 agents
- (neither) → Spawn 3 agents

## Mode: --fast

[Run 1 agent with overview prompt]

## Mode: Default

[Run 3 agents with specialized prompts]

## Mode: --deep

[Run 5 agents with comprehensive prompts]
```

### Cost vs Coverage

- `--fast`: Low cost, narrow view
- **Default**: Balanced (recommended)
- `--deep`: Higher cost, complete understanding

Choose default for most work, fast for quick checks, deep for complex systems.

---

## Subagent Delegation

How to spawn parallel agents for complex workflows.

### When to Use Subagents

**YES, use subagents for:**
- Complex codebases requiring multiple perspectives
- Independent analysis tasks that can run in parallel
- Deep explorations (/learn, /trace, /rrr --deep)
- Writing multiple documents from same source

**NO, don't use subagents for:**
- Simple, sequential tasks (/feel, /fyi, /philosophy)
- Tasks requiring human interaction
- Anything that needs real-time feedback

### The Pattern

```markdown
# /skill

## Step 0: Timestamp

```bash
date "+%H:%M %Z"
```

## Step 1: Prepare Paths

CRITICAL: Calculate two separate paths:
1. **SOURCE_DIR** = where agents READ code
2. **DOCS_DIR** = where agents WRITE docs

Example:
```bash
SOURCE_DIR="/home/user/my-oracle/ψ/learn/owner/repo/origin/"
DOCS_DIR="/home/user/my-oracle/ψ/learn/owner/repo/2026-02-07/"
TIME="1338"
```

## Step 2: Spawn Subagents

Spawn 3 agents in parallel:

### Agent 1: Architect
```
READ from: [SOURCE_DIR]
WRITE to: [DOCS_DIR]/[TIME]_ARCHITECTURE.md

Analyze: [instructions]
```

### Agent 2: Code Collector
```
READ from: [SOURCE_DIR]
WRITE to: [DOCS_DIR]/[TIME]_CODE-SNIPPETS.md

Collect: [instructions]
```

### Agent 3: Reference Builder
```
READ from: [SOURCE_DIR]
WRITE to: [DOCS_DIR]/[TIME]_QUICK-REFERENCE.md

Build: [instructions]
```

## Step 3: Verify Output

Check all files exist:
```bash
ls -la [DOCS_DIR]/
```

## Step 4: Create Hub

Write [REPO].md linking all sessions.
```

### Key Points

1. **Give agents LITERAL paths**, not variables
2. **SOURCE_DIR and DOCS_DIR must be different**
   - If agents write to SOURCE_DIR, files end up in wrong place!
3. **Include TIME prefix** in all output filenames
   - Prevents overwriting when running multiple times same day
4. **Capture paths BEFORE spawning agents**
   - Extract absolute paths before delegating
5. **Each agent is independent**
   - No dependencies between agents
   - All run in parallel
   - ~5-10 minutes for full execution

### Example: Learn Skill

```markdown
## Step 1: Resolve URL to Paths

If input is URL:
```bash
ghq get "https://github.com/owner/repo"
SOURCE_DIR="$(ghq root)/github.com/owner/repo"
DOCS_DIR="./ψ/learn/owner/repo/2026-02-07"
mkdir -p "$DOCS_DIR"
```

## Step 2: Spawn Agents (--fast)

Agent 1 (1-2 min):
```
READ from: [SOURCE_DIR]
WRITE to: [DOCS_DIR]/[TIME]_OVERVIEW.md

Analyze and write overview.
```

## Step 3: Spawn Agents (default)

Agents 1, 2, 3 in parallel (3-5 min):
```
READ from: [SOURCE_DIR]
WRITE to: [DOCS_DIR]/[TIME]_ARCHITECTURE.md
...
```

## Step 4: Spawn Agents (--deep)

Agents 1-5 in parallel (5-10 min):
```
READ from: [SOURCE_DIR]
WRITE to: [DOCS_DIR]/[TIME]_ARCHITECTURE.md
WRITE to: [DOCS_DIR]/[TIME]_CODE-SNIPPETS.md
WRITE to: [DOCS_DIR]/[TIME]_QUICK-REFERENCE.md
WRITE to: [DOCS_DIR]/[TIME]_TESTING.md
WRITE to: [DOCS_DIR]/[TIME]_API-SURFACE.md
```
```

### Critical Bug to Avoid

**❌ WRONG:**
```
Agent gets: /home/user/ψ/learn/owner/repo/origin/
Agent does: cd origin/ && write ARCHITECTURE.md
Result: File ends up in /home/user/ψ/learn/owner/repo/origin/ARCHITECTURE.md ❌
```

**✓ CORRECT:**
```
Tell agent:
  READ from: /home/user/ψ/learn/owner/repo/origin/
  WRITE to: /home/user/ψ/learn/owner/repo/2026-02-07/1338_ARCHITECTURE.md

Agent writes to WRITE path, not READ path ✓
```

---

## Output Formatting

Conventions for presenting skill results.

### Markdown Tables

Use tables for structured data:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value A | Value B | Value C |
| Value D | Value E | Value F |
```

Example:

```markdown
| Skill | Type | Status |
|-------|------|--------|
| learn | skill + subagent | ✓ Active |
| feel | skill | ✓ Active |
| gemini | skill + code | ⚠ Needs API |
```

### Summary Blocks

For overview information:

```markdown
## Summary

**Mode**: fast (1 agent)
**Duration**: ~2 minutes
**Output Files**: 1
**Location**: ψ/learn/owner/repo/2026-02-07/

```

### Code Blocks

For code/output:

```markdown
## Code Example

```typescript
import { $ } from "bun"
const result = await $`git log`.text()
console.log(result)
```

Or for shell:

```bash
git status
git log --oneline
```
```

### Lists

Bullet points for options/features:

```markdown
## Features

- Zero dependencies
- Cross-platform
- Auto-reloading
- Multi-agent support
```

Numbered for steps:

```markdown
## Steps

1. Install Bun
2. Clone repository
3. Run `bun run compile`
4. Commit changes
```

### Emphasis

```markdown
**Bold**: for important terms
*Italic*: for emphasis
`Code`: for literals

⚠️ **WARNING**: Critical information

> **Note**: Additional context

✓ Success status
✗ Error status
⚠ Warning status
```

### Example Full Output

```markdown
## 📚 Learning Complete: acme-corp/cool-library

**Mode**: default (3 agents)
**Duration**: ~5 minutes
**Date**: 2026-02-07
**Time**: 13:38
**Location**: ψ/learn/acme-corp/cool-library/2026-02-07/

### Generated Files

| File | Description | Status |
|------|-------------|--------|
| 1338_ARCHITECTURE.md | Directory structure & design | ✓ |
| 1338_CODE-SNIPPETS.md | Main implementations | ✓ |
| 1338_QUICK-REFERENCE.md | Usage guide & API | ✓ |

### Key Insights

1. **Pattern**: MVC architecture with dependency injection
2. **Tech**: TypeScript + Express.js + PostgreSQL
3. **Notable**: Comprehensive test coverage (85%+)

### Next Steps

- Read QUICK-REFERENCE.md for usage examples
- Check CODE-SNIPPETS.md for implementation details
- Review ARCHITECTURE.md for design decisions

---

Hub file: `acme-corp/cool-library.md`
Docs saved to: `ψ/learn/acme-corp/cool-library/2026-02-07/`
```

### Color & Emoji Guide

Safe emoji for output:

| Emoji | Use |
|-------|-----|
| ✓ | Success, complete |
| ✗ | Error, failed |
| ⚠️ | Warning, caution |
| 📚 | Learning, documentation |
| 🔮 | Oracle, magic, special |
| 🕐 | Time, timestamp |
| 🔧 | Tools, configuration |
| 📝 | Writing, documentation |
| ⚙️ | Process, compilation |
| 📊 | Data, statistics |

Avoid:
- Complex emoji that don't render consistently
- Color codes (markdown doesn't support colors reliably)
- ASCII art (may not render correctly across agents)

---

## Best Practices

### Skill Development

1. **Start with template**: Copy `_template/` folder
2. **Keep simple**: One skill = one clear purpose
3. **Clear descriptions**: Include trigger words in description
4. **Test early**: Run scripts locally before committing
5. **Set permissions**: `chmod +x scripts/*.ts`
6. **Document fully**: SKILL.md should be self-contained
7. **No subagents**: Unless complexity demands it
8. **Output format**: Prefer markdown tables and structured data

### Documentation

1. **Title clarity**: Make skill purpose obvious
2. **Usage examples**: Show actual commands
3. **Step numbers**: Sequential, clear steps
4. **Always timestamp**: First step should be `date` command
5. **Arguments**: Always end with `ARGUMENTS: $ARGUMENTS`
6. **Conditions**: Use tables for behavior matrix
7. **Warnings**: Use ⚠️ for critical notes
8. **Links**: Include related skills

### Arguments & Inputs

1. **Parse carefully**: `process.argv.slice(2)`
2. **Validate input**: Check for empty strings, malformed data
3. **Provide defaults**: Fallback if no arguments
4. **Error handling**: `.quiet()` for non-critical commands
5. **Escape variables**: Use `${var}` in Bun shell (auto-escaped)
6. **Help text**: Show usage if invalid input

### Subagent Skills

1. **Calculate paths before spawning**: Get absolute paths first
2. **Use LITERAL paths**: Not variables in agent prompts
3. **Separate READ/WRITE paths**: Different directories
4. **Include time prefix**: `HHMM_FILENAME.md`
5. **Verify output exists**: Check files after agents complete
6. **Create hub file**: Links all runs together
7. **Preserve history**: Don't overwrite, append new sessions

### Testing

1. **Script test**: `bun scripts/main.ts "test input"`
2. **Local install**: `oracle-skills install -y --skill my-skill`
3. **Manual execution**: Run `/my-skill` in agent
4. **Check output**: Verify paths, file creation
5. **Permission errors**: Ensure scripts have `rwxr-xr-x`
6. **Fallback paths**: Verify `.quiet()` handles errors gracefully

### Version Management

1. **Semantic versioning**: MAJOR.MINOR.PATCH
2. **Compile before commit**: `bun run compile`
3. **Update README table**: `bun run version`
4. **Git tag releases**: `git tag v1.5.73`
5. **Document changes**: Clear commit messages
6. **Test before publish**: Run full suite before release

---

## Quick Reference Cheat Sheet

### Installation

```bash
# One-liner for all agents
curl -fsSL https://raw.githubusercontent.com/Soul-Brews-Studio/oracle-skills-cli/main/install.sh | bash

# Or manual
bunx --bun oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v1.5.72 install -g -y
```

### Skill Creation

```bash
# Copy template
cp -r src/skills/_template src/skills/my-skill

# Edit SKILL.md with frontmatter:
# ---
# name: my-skill
# description: Trigger words here
# ---

# Add scripts if needed
echo '#!/usr/bin/env bun' > src/skills/my-skill/scripts/main.ts
chmod +x src/skills/my-skill/scripts/main.ts

# Compile
bun run compile

# Test
bun src/skills/my-skill/scripts/main.ts "test"

# Install locally
oracle-skills install -y --skill my-skill

# Test in agent: /my-skill
```

### Common Commands

```bash
# List available skills
oracle-skills list

# Install specific skills globally
oracle-skills install -g -y --skill learn --skill rrr

# Install to specific agent
oracle-skills install -g -y --agent opencode

# Uninstall
oracle-skills uninstall -g -y

# Compile after editing skills
bun run compile

# Release new version
bun run version
git tag v1.5.73
git push origin main --tags
```

### Script Patterns

```typescript
// Get arguments
const args = process.argv.slice(2)

// Run shell command
const output = await $`git log --oneline`.text()

// With variables (auto-escaped)
const result = await $`grep -r ${query} .`.text()

// Parse JSON
const data = await $`cat file.json`.json()

// Error handling
const safe = await $`command`.quiet()
if (safe.exitCode !== 0) { /* handle */ }
```

### Output Format

```markdown
| Structured | Data |
|-----------|------|
| In | Tables |

> Important note here

```bash
code blocks
```

✓ Success
⚠️ Warning
✗ Error
```

---

## Resources

- **GitHub**: https://github.com/Soul-Brews-Studio/oracle-skills-cli
- **Agent Skills Spec**: https://agentskills.io
- **Oracle Philosophy**: `/philosophy` skill
- **Bun Documentation**: https://bun.sh
- **Commander.js**: https://github.com/tj/commander.js

---

## Contributing

To add a new skill:

1. Copy `src/skills/_template/`
2. Rename and edit `SKILL.md`
3. Add scripts if needed (with `chmod +x`)
4. Run `bun run compile`
5. Test locally: `oracle-skills install -y --skill my-skill`
6. Submit PR to `Soul-Brews-Studio/oracle-skills-cli`

All contributions follow the Oracle Philosophy and this guide.

---

**Last Updated**: 2026-02-07 13:38 UTC
**Version**: oracle-skills-cli v1.5.72
**Maintainer**: Soul Brews Studio
**License**: MIT
