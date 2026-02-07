# Oracle Skills CLI — Complete Architecture

**Version**: 1.5.72
**Repository**: [Soul-Brews-Studio/oracle-skills-cli](https://github.com/Soul-Brews-Studio/oracle-skills-cli)
**Runtime**: Bun (TypeScript)
**Purpose**: Universal skill installer for Claude Code, OpenCode, Cursor, and 11+ AI coding agents

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Core Concepts](#core-concepts)
4. [CLI Architecture](#cli-architecture)
5. [Skills System](#skills-system)
6. [Installation Pipeline](#installation-pipeline)
7. [Agent Support Matrix](#agent-support-matrix)
8. [The Template Skill](#the-template-skill)
9. [Building New Skills](#building-new-skills)
10. [Version Management](#version-management)
11. [Hooks System](#hooks-system)
12. [Install One-Liner](#install-one-liner)

---

## Overview

**oracle-skills-cli** is a universal skill distribution system. It:

- **Discovers** skills from `src/skills/` (SKILL.md + scripts)
- **Compiles** them to agent-specific command stubs in `src/commands/`
- **Installs** to 14+ AI agents (global or per-project)
- **Manages** versions, updates, and cleanup
- **Supports** both simple markdown skills and complex TypeScript scripts

**Key Philosophy**: Skills are discovered, compiled once, installed everywhere. Each agent gets skills in its native format (directories or flat files).

---

## Directory Structure

```
oracle-skills-cli/
├── src/
│   ├── cli/                    # Main CLI entry point
│   │   ├── index.ts           # Commands: install, uninstall, list, agents
│   │   ├── installer.ts       # Installation logic, discovery, deployment
│   │   ├── agents.ts          # Agent configurations (14 agent types)
│   │   ├── fs-utils.ts        # Cross-platform file operations (Bun/fs)
│   │   └── types.ts           # TypeScript interfaces
│   │
│   ├── skills/                 # Skill source code (only in this repo)
│   │   ├── _template/         # Template for creating new skills
│   │   │   ├── SKILL.md       # Skill definition + frontmatter
│   │   │   └── scripts/
│   │   │       ├── main.ts    # Bun Shell script
│   │   │       └── README.md
│   │   │
│   │   ├── awaken/            # Example: Guided Oracle awakening
│   │   │   └── SKILL.md       # Pure markdown skill (no scripts)
│   │   │
│   │   ├── deep-research/     # Example: Complex skill with scripts
│   │   │   ├── SKILL.md
│   │   │   └── scripts/
│   │   │       └── deep-research.ts
│   │   │
│   │   ├── gemini/            # Example: MQTT browser automation
│   │   │   ├── SKILL.md
│   │   │   └── scripts/
│   │   │       ├── chat-*.ts
│   │   │       ├── transcribe-*.ts
│   │   │       └── ... (20+ helper scripts)
│   │   │
│   │   ├── project/           # Example: Complex skill with multiple utilities
│   │   │   ├── SKILL.md
│   │   │   ├── project-manager.md
│   │   │   ├── scripts/
│   │   │   │   ├── index.ts    # Main entry
│   │   │   │   ├── create.ts
│   │   │   │   ├── search.ts
│   │   │   │   └── ... (10+ utilities)
│   │   │   └── templates/
│   │   │       └── slugs.yaml
│   │   │
│   │   └── [25+ other skills] # learn, trace, rrr, philosophy, etc.
│   │
│   ├── commands/              # COMPILED command stubs (git-tracked)
│   │   ├── awaken.md         # Auto-generated from awaken/SKILL.md
│   │   ├── deep-research.md  # Auto-generated from deep-research/SKILL.md
│   │   └── ... (25+ stub files, one per skill)
│   │
│   └── hooks/                 # Agent-specific plugins/hooks
│       └── opencode/
│           └── oracle-skills.ts  # OpenCode plugin (timestamp injection)
│
├── scripts/
│   ├── compile.ts            # Main: src/skills/ → src/commands/
│   ├── update-readme-table.ts # Updates README.md skills table
│   ├── generate-table.ts      # Generates markdown tables
│   └── release.sh             # Release automation
│
├── package.json              # Bun package, bin entry: oracle-skills
├── tsconfig.json             # TypeScript config
├── install.sh                # One-liner installer (curl | bash)
├── README.md                 # Installation guide + skills table
├── CLAUDE.md                 # Oracle philosophy
└── ... (git, build, tests)
```

**Key directories**:
- `src/skills/` — Source of truth (committed to git)
- `src/commands/` — Compiled stubs (committed, auto-updated by `bun run compile`)
- `src/cli/` — CLI implementation

---

## Core Concepts

### Skill

A **skill** is a reusable workflow that extends an AI agent's capabilities.

**Format**: Directory with SKILL.md (+ optional scripts/)

```
skill-name/
├── SKILL.md              # Markdown instructions + frontmatter
└── scripts/              # Optional: TypeScript helpers
    └── main.ts           # Entry point for complex logic
```

**Structure of SKILL.md**:

```markdown
---
name: skill-name
description: One-line description for discovery
alias: /alternate-name (optional)
---

# /skill-name — Full Title

Usage instructions, steps, workflows...

## Step 0: Initialize

```bash
some command
```

## Step 1: Execute

```bash
bun scripts/main.ts "$ARGUMENTS"
```

ARGUMENTS: $ARGUMENTS
```

**Why this format?**
- Pure markdown (readable in any editor)
- Frontmatter for metadata (name, description)
- `$ARGUMENTS` placeholder for user input
- Steps are human-readable instructions for the AI agent

### Command (Compiled Stub)

A **command** is an auto-generated stub that points to a skill.

**Format**: Flat markdown file (one per agent)

```markdown
---
description: v1.5.72 | One-line skill description
---

# /skill-name

Execute the `skill-name` skill with args: `$ARGUMENTS`

**If you have a Skill tool available**: Use it directly.

**Otherwise**: Read `.claude/skills/skill-name/SKILL.md` and follow instructions.
```

**Purpose**: Agents without native skill support can still access skills via flat file commands.

### Agent

An **agent** is a target AI system where skills are installed.

**Supported agents** (14 total):
- Claude Code (`.claude/skills/`)
- OpenCode (`.opencode/skills/` + `.opencode/commands/`)
- Cursor (`.cursor/skills/`)
- Codex, Amp, Kilo, Roo, Goose, Gemini, Antigravity, Copilot, Clawdbot, Droid, Windsurf

Each agent has:
- **skillsDir**: Where skill directories are installed (always directories with SKILL.md)
- **globalSkillsDir**: User home equivalent (~/.claude/skills/, etc.)
- **commandsDir** (optional): Where flat command .md files go (for agents like OpenCode)
- **detectInstalled()**: Function to check if agent is present on system

---

## CLI Architecture

### Entry Point: `src/cli/index.ts`

**Main binary** (executed via `bunx oracle-skills`):

```typescript
#!/usr/bin/env bun

// Bun runtime check
if (typeof Bun === 'undefined') {
  console.error('oracle-skills requires Bun runtime');
  process.exit(1);
}

// Uses: commander.js for CLI parsing
// Uses: @clack/prompts for interactive UI
```

### Commands

#### 1. `oracle-skills install` (default)

**Installs skills to agents.**

```bash
# Interactive mode (auto-detects agents)
oracle-skills install

# Global install with defaults
oracle-skills install -g -y

# Specific agents/skills
oracle-skills install -a claude-code opencode -s learn trace -y

# Include flat command files (OpenCode)
oracle-skills install --commands -g -y
```

**Options**:
- `-g, --global` — Install to ~/.claude/skills/ instead of .claude/skills/
- `-a, --agent <names...>` — Target specific agents
- `-s, --skill <names...>` — Install only specific skills
- `-l, --list` — Just list available skills, don't install
- `-y, --yes` — Skip confirmation prompts
- `--commands` — Also install flat command stubs to ~/.claude/commands/
- `--shell` / `--no-shell` — Force Bun.$ or Node.js fs (auto-detects)

**Workflow**:
1. Discover all skills in `src/skills/`
2. Filter by `--skill` if specified
3. Auto-detect or prompt for agent selection
4. Create target directories (`.claude/skills/`, etc.)
5. Copy each skill directory to target
6. Inject version + scope into SKILL.md frontmatter
7. Write `.oracle-skills.json` manifest
8. Write `VERSION.md` for agent reporting
9. Copy flat command stubs if `--commands` or agent uses default
10. For skills with hooks: also install to `~/.claude/plugins/`
11. For OpenCode: copy `oracle-skills.ts` plugin

#### 2. `oracle-skills uninstall`

**Removes skills from agents.**

```bash
oracle-skills uninstall -g -y
oracle-skills uninstall -a cursor -s gemini -y
```

**Workflow**:
1. Find installed skills in target directory
2. Filter by `--skill` if specified
3. Remove skill directories
4. Remove flat command files
5. Remove plugin versions if present

#### 3. `oracle-skills list`

**Shows installed skills.**

```bash
oracle-skills list -g                    # Global skills
oracle-skills list -a claude-code        # Claude Code local skills
```

**Output**:
```
Installed Oracle skills:

  Claude Code (global): 26 skills
    - awaken (v1.5.72)
    - deep-research (v1.5.72)
    - learn (v1.5.72)
    ...
```

#### 4. `oracle-skills agents`

**Lists supported agents and detection status.**

```bash
Supported agents:

  [✓] claude-code      Claude Code
  [ ] opencode         OpenCode
  [✓] cursor           Cursor
  ...
```

---

## Skills System

### Skill Discovery

**File**: `src/cli/installer.ts` → `discoverSkills()`

1. Scans `src/skills/` directory
2. Filters out:
   - Hidden directories (`.`)
   - `_template` directory
3. For each directory:
   - Reads `SKILL.md`
   - Extracts `name:` and `description:` from frontmatter
   - Returns `Skill[]` with name, description, path

```typescript
export interface Skill {
  name: string;              // "awaken"
  description: string;       // "Guided Oracle birth and awakening ritual..."
  path: string;              // "/path/to/skills/awaken"
}
```

### Skill Metadata

Every SKILL.md begins with **YAML frontmatter**:

```yaml
---
name: skill-name
description: One-line description for CLI discovery
alias: /alternate-name (optional)
installer: oracle-skills-cli v1.5.72 (injected during install)
---
```

**Fields**:
- `name` — Canonical skill name (matches directory name)
- `description` — Shown in `oracle-skills install -l`
- `alias` — Alternative slash command name (optional)
- `installer` — Auto-injected during installation to track origin

### Skill Scopes

When installed, skills are tagged with scope in the description:

```
v1.5.72 G-SKLL | Original description    # Global install
v1.5.72 L-SKLL | Original description    # Local install
```

This helps agents report which scope they're using.

### Arguments Passing

Skills receive user input via **`$ARGUMENTS` placeholder**:

**In SKILL.md**:
```markdown
## Step 1: Execute

```bash
bun scripts/main.ts "$ARGUMENTS"
```

ARGUMENTS: $ARGUMENTS
```

**How it works**:
1. User runs `/skill-name arg1 arg2 arg3`
2. Skill becomes: `bun scripts/main.ts "arg1 arg2 arg3"`
3. In TypeScript: `const args = Bun.argv.slice(2)`

**Example** (deep-research.ts):
```typescript
const topic = Bun.argv.slice(2).join(" ");
if (!topic) {
  console.log("Usage: deep-research.ts <topic>");
  process.exit(1);
}
```

### Markdown-Only Skills

Simple skills need **no scripts**. Just SKILL.md.

**Example**: `/awaken`

```markdown
---
name: awaken
description: Guided Oracle birth and awakening ritual
---

# /awaken - Oracle Awakening Ritual

## Step 0: Setup & Context

```bash
date "+🕐 %H:%M %Z (%A %d %B %Y)"
```

## Step 1: Install Oracle Skills

```bash
oracle-skills install -g -y
```

[... more steps ...]
```

Agent reads SKILL.md directly and follows the steps (no scripts needed).

### Bun Shell Scripts

Complex skills use **Bun Shell** for command execution.

**File**: `scripts/main.ts`

```typescript
#!/usr/bin/env bun
import { $ } from "bun"

// Get arguments
const query = Bun.argv.slice(2).join(" ")

// Shell commands (Bun Shell syntax)
const result = await $`grep -r ${query} . 2>/dev/null | head -10`.text()

// JSON output
console.log(JSON.stringify({ query, results: result.split('\n') }, null, 2))
```

**Why Bun Shell?**
- Cleaner than Node.js child_process
- Type-safe variables (auto-escapes)
- Can run sync/async code together
- Fallback works: `npx tsx scripts/main.ts` (if Bun not available)

**Complex Example** (gemini/scripts/deep-research.ts):

```typescript
const MQTT_HOST = "localhost"
const MQTT_PORT = "1883"

// Publish MQTT command
async function mqttPub(payload: object): Promise<void> {
  const msg = JSON.stringify(payload)
  const proc = Bun.spawn([
    "mosquitto_pub", "-h", MQTT_HOST, "-p", MQTT_PORT,
    "-t", "claude/browser/command", "-m", msg
  ])
  await proc.exited
}

// Step 1: Create new Gemini tab
await mqttPub({
  action: "create_tab",
  url: "https://gemini.google.com/app"
})

// Step 2: Select mode
await mqttPub({
  action: "select_mode",
  mode: "Deep Research"
})

// Step 3: Send prompt
await mqttPub({
  action: "chat",
  text: topic
})

// Step 4: Start research
await mqttPub({
  action: "clickText",
  text: "Start research"
})
```

---

## Installation Pipeline

### Step-by-Step Flow

**Command**: `oracle-skills install -g -y -a claude-code -s learn`

#### 1. **Discovery Phase** (installer.ts)

```typescript
// Get available skills from src/skills/
const allSkills = await discoverSkills()
// Returns: [{ name: 'awaken', ... }, { name: 'deep-research', ... }, ...]
```

#### 2. **Filtering Phase**

```typescript
// If --skill specified, filter to matching names
if (options.skills?.length > 0) {
  skillsToInstall = allSkills.filter(s => options.skills!.includes(s.name))
}
// Result: Only 'learn' skill
```

#### 3. **Agent Resolution** (agents.ts)

```typescript
// Get target agent config
const agent = agents['claude-code']
// Returns AgentConfig with:
// - skillsDir: '.claude/skills'
// - globalSkillsDir: '/Users/user/.claude/skills'
// - commandsDir: '.claude/commands'
```

#### 4. **Directory Creation**

```typescript
// Create skill target directory
const targetDir = options.global
  ? agent.globalSkillsDir                    // ~/.claude/skills
  : join(process.cwd(), agent.skillsDir)    // ./.claude/skills
await mkdirp(targetDir)
```

#### 5. **Cleanup Phase** (Auto-removes orphaned skills)

```typescript
// For each installed skill in targetDir:
// if (wasInstalledByOracle && !inSourceAnymore) {
//   move to trash
// }
```

This prevents cruft when skills are deprecated.

#### 6. **Skill Installation**

```typescript
for (const skill of skillsToInstall) {
  const destPath = join(targetDir, skill.name)

  // Remove old if exists
  if (existsSync(destPath)) {
    await rmrf(destPath)
  }

  // Copy skill folder (all files)
  await cpr(skill.path, destPath)

  // Inject version into SKILL.md
  const skillMdPath = join(destPath, 'SKILL.md')
  let content = await Bun.file(skillMdPath).text()

  // Add installer marker (for cleanup tracking)
  content = content.replace(
    /^---\n/,
    `---\ninstaller: oracle-skills-cli v${pkg.version}\n`
  )

  // Add scope to description (G=Global, L=Local)
  const scope = options.global ? 'G' : 'L'
  content = content.replace(
    /^(description:\s*)(.+?)(\n)/m,
    `$1v${pkg.version} ${scope}-SKLL | $2$3`
  )

  await Bun.write(skillMdPath, content)
}
```

#### 7. **Manifest Writing**

```typescript
// Write .oracle-skills.json (machine-readable metadata)
const manifest = {
  version: "1.5.72",
  installedAt: "2026-02-07T...",
  skills: ["learn"],
  agent: "claude-code"
}
await Bun.write(join(targetDir, '.oracle-skills.json'), JSON.stringify(manifest))

// Write VERSION.md (human-readable, for agents to report)
const versionMd = `# Oracle Skills
Installed by: oracle-skills-cli v1.5.72
Installed at: 2026-02-07T...
Agent: Claude Code
Skills: 1

## Installed Skills
- learn

## Update Skills
\`\`\`bash
bunx --bun oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v1.5.72 install -y -g
\`\`\`
`
await Bun.write(join(targetDir, 'VERSION.md'), versionMd)
```

#### 8. **Plugin Installation** (Claude Code only)

```typescript
// For skills with hooks/hooks.json:
// Copy entire skill to ~/.claude/plugins/skill-name

if (hasHooks(skill.path)) {
  const pluginsDir = join(homedir(), '.claude/plugins')
  const pluginDest = join(pluginsDir, skill.name)
  await cpr(skill.path, pluginDest)

  // Create .claude-plugin/plugin.json
  const pluginJson = {
    name: skill.name,
    description: skill.description,
    version: "1.5.72",
    author: { name: 'Soul Brews Studio' }
  }
  await Bun.write(join(pluginDest, '.claude-plugin/plugin.json'), pluginJson)
}
```

#### 9. **Command Installation** (if supported)

```typescript
// For agents with commandsDir (OpenCode, Claude Code, etc.):
if (agent.commandsDir && (!agent.commandsOptIn || options.commands)) {
  const commandsDir = options.global
    ? agent.globalCommandsDir
    : join(process.cwd(), agent.commandsDir)

  for (const skill of skillsToInstall) {
    // Create flat stub command
    const stubContent = `---
description: v1.5.72 G-CMD | ${skill.description}
---

# /${skill.name}

Execute the \`${skill.name}\` skill with args: \`$ARGUMENTS\`

**If you have a Skill tool available**: Use it directly.

**Otherwise**: Read \`~/.claude/skills/${skill.name}/SKILL.md\` and follow instructions.
`
    await Bun.write(join(commandsDir, `${skill.name}.md`), stubContent)
  }
}
```

#### 10. **OpenCode Plugin Installation**

```typescript
// OpenCode-specific: Install oracle-skills.ts plugin
if (agentName === 'opencode') {
  const pluginDir = options.global
    ? join(homedir(), '.config/opencode/plugins')
    : join(process.cwd(), '.opencode/plugins')
  const hookSrc = 'src/hooks/opencode/oracle-skills.ts'
  if (existsSync(hookSrc)) {
    await cp(hookSrc, join(pluginDir, 'oracle-skills.ts'))
  }
}
```

#### 11. **Success Reporting**

```typescript
console.log(`✓ Installed 1 skill to 1 agent(s)`)
```

---

## Agent Support Matrix

**File**: `src/cli/agents.ts`

```typescript
export const agents: Record<AgentType, AgentConfig> = {
  'claude-code': {
    name: 'claude-code',
    displayName: 'Claude Code',
    skillsDir: '.claude/skills',              // Local
    globalSkillsDir: '~/.claude/skills',      // Global
    commandsDir: '.claude/commands',          // Flat command stubs
    globalCommandsDir: '~/.claude/commands',
    useFlatFiles: true,
    commandsOptIn: true,                      // Only with --commands
    detectInstalled: () => existsSync('~/.claude'),
  },

  opencode: {
    name: 'opencode',
    displayName: 'OpenCode',
    skillsDir: '.opencode/skills',
    globalSkillsDir: '~/.config/opencode/skills',
    commandsDir: '.opencode/commands',
    globalCommandsDir: '~/.config/opencode/commands',
    useFlatFiles: true,
    // commandsOptIn: false (default) = commands auto-install
    detectInstalled: () => existsSync('~/.config/opencode'),
  },

  cursor: {
    name: 'cursor',
    displayName: 'Cursor',
    skillsDir: '.cursor/skills',
    globalSkillsDir: '~/.cursor/skills',
    // No commandsDir = no flat commands
    detectInstalled: () => existsSync('~/.cursor'),
  },

  // ... 11 more agents
};
```

**Key patterns**:
- Every agent has `skillsDir` (always directories, never flat files)
- Some agents have `commandsDir` (for alternative flat file format)
- `commandsOptIn` controls whether commands auto-install or require `--commands` flag
- `useFlatFiles` indicates agent supports flat .md command files
- `detectInstalled()` checks system for agent presence (for auto-detection)

---

## The Template Skill

**File**: `src/skills/_template/SKILL.md`

Template teaches skill structure:

```markdown
---
name: template
description: Skill template with Bun Shell pattern. Copy this folder to create new skills.
---

# /template - Skill Template

Copy this folder to create a new skill.

## Usage

```
/your-skill [args]
```

## Step 0: Timestamp

```bash
date "+🕐 %H:%M %Z (%A %d %B %Y)"
```

## Step 1: Run Script

```bash
bun scripts/main.ts "$ARGUMENTS"
```

Or fallback (if Bun not available):
```bash
npx tsx scripts/main.ts "$ARGUMENTS"
```

## Step 2: Process Output

Display results from script.

---

## Creating a New Skill

1. Copy `_template/` folder
2. Rename to your skill name
3. Update `SKILL.md`:
   - Change `name:` in frontmatter
   - Change `description:` in frontmatter
   - Update usage instructions
4. Edit `scripts/main.ts` with your logic
5. Test locally with `bun scripts/main.ts`

## File Structure

```
your-skill/
├── SKILL.md          ← Instructions for Claude
└── scripts/
    └── main.ts       ← Bun Shell logic
```

## Frontmatter Required

```yaml
---
name: your-skill-name
description: One line description. Use when user says "X", "Y", or "Z".
---
```

**Note**: Description is the trigger signal. Include action words and use cases.

---

ARGUMENTS: $ARGUMENTS
```

**Key template lessons**:

1. **Folder structure is minimal** — Just SKILL.md + scripts/main.ts
2. **SKILL.md is pure markdown** — Humans read it, agents execute the steps
3. **Scripts are Bun Shell** — Not shell scripts, TypeScript with Bun.$ syntax
4. **Arguments pass via $ARGUMENTS** — Placeholder replaced by agent
5. **Fallback is important** — `npx tsx` if Bun not available
6. **Steps are numbered** — Human-readable workflow

**Template scripts/main.ts**:

```typescript
#!/usr/bin/env bun
/**
 * Skill Script Template
 *
 * Uses Bun Shell for clean, Python-like syntax.
 * Also works with: npx tsx scripts/main.ts
 */
import { $ } from "bun"

// Get arguments
const args = process.argv.slice(2)
const query = args[0] || ""

// ============================================
// YOUR LOGIC HERE
// ============================================

// Example: Git search
const commits = await $`git log --oneline --grep=${query} 2>/dev/null | head -10`.text()

// Example: File search
const files = await $`grep -ril ${query} . 2>/dev/null | head -10`.text()

// ============================================
// OUTPUT
// ============================================

// Option 1: JSON (for structured data)
console.log(JSON.stringify({
  query,
  commits: commits.split("\n").filter(Boolean),
  files: files.split("\n").filter(Boolean),
}, null, 2))

// Option 2: Plain text (for simple output)
// console.log(`Found ${commits.split("\n").length} commits`)

// Option 3: Markdown (for formatted display)
// console.log(`## Results for: ${query}\n\n${commits}`)
```

---

## Building New Skills

### Step 1: Copy Template

```bash
cp -r src/skills/_template src/skills/my-skill
```

### Step 2: Update Frontmatter

**src/skills/my-skill/SKILL.md**:

```markdown
---
name: my-skill
description: What this skill does. Triggers when user says "X" or "Y".
---

# /my-skill - Full Title

[Your markdown instructions here]

## Usage

```
/my-skill [args]
```

## Step 0: Initialize

```bash
[some setup]
```

## Step 1: Execute

```bash
bun scripts/main.ts "$ARGUMENTS"
```

## Step 2: Show Results

[How to display output]

ARGUMENTS: $ARGUMENTS
```

### Step 3: Implement Logic

**src/skills/my-skill/scripts/main.ts**:

```typescript
#!/usr/bin/env bun
import { $ } from "bun"

// Parse input
const input = Bun.argv.slice(2).join(" ")

// Core logic
const result = await $`your command here`.text()

// Output (JSON for structured, markdown for display)
console.log(result)
```

### Step 4: Test Locally

```bash
# Test the script directly
bun src/skills/my-skill/scripts/main.ts "test input"

# Or run full skill (as agent would)
cd .claude/skills/my-skill
cat SKILL.md  # Read the skill
bun scripts/main.ts "test input"
```

### Step 5: Commit & Compile

```bash
git add src/skills/my-skill/

# This runs during release/publish, but you can test locally:
bun run compile
# Generates: src/commands/my-skill.md
```

### Step 6: Install & Test on Real Agent

```bash
# Install to Claude Code
oracle-skills install -s my-skill -a claude-code -y

# In Claude Code, run:
/my-skill test args
```

---

## Skill Complexity Levels

### Level 1: Pure Markdown (Simplest)

No scripts. Agent reads SKILL.md and executes steps.

**Examples**: `/awaken`, `/philosophy`, `/standup`

```markdown
---
name: standup
description: Daily standup check-in and status
---

# /standup

## Daily Status

Answer these questions:
1. What did I accomplish yesterday?
2. What am I working on today?
3. Any blockers?

[More markdown...]
```

**When to use**: Workflows, questionnaires, documentation.

### Level 2: Simple Script (Common)

One script file. Takes arguments, outputs results.

**Examples**: `/speak`, `/trace`, `/learn`

```typescript
#!/usr/bin/env bun
import { $ } from "bun"

const query = Bun.argv.slice(2).join(" ")
const result = await $`some-command ${query}`.text()
console.log(result)
```

**When to use**: Wrappers around shell commands, simple processing.

### Level 3: Complex (Multiple Files)

Multiple scripts, utilities, configuration.

**Examples**: `/gemini`, `/project`, `/deep-research`

```
my-complex-skill/
├── SKILL.md
├── scripts/
│   ├── main.ts
│   ├── helper-1.ts
│   └── helper-2.ts
└── templates/
    └── config.yaml
```

**When to use**: Multi-step workflows, browser automation, data processing.

---

## Compilation: Skills → Commands

**File**: `scripts/compile.ts`

Converts all skills to flat command stubs:

```
src/skills/awaken/SKILL.md
  ↓
src/commands/awaken.md (stub that references the full skill)
```

**Process**:

```typescript
// For each skill in src/skills/:
// 1. Read SKILL.md
// 2. Extract frontmatter (name, description)
// 3. Generate stub command pointing back to skill
// 4. Write to src/commands/

const content = await readFile(`src/skills/${skillName}/SKILL.md`)
const descMatch = content.match(/description:\s*(.+)$/m)
const description = `v${pkg.version} | ${rawDescription}`

const commandContent = `---
description: ${description}
---

# /${skillName}

Execute the \`${skillName}\` skill with the provided arguments.

**If you have a Skill tool available**: Use it directly with \`skill: "${skillName}"\`.

**Otherwise**:
1. Read: \`.claude/skills/${skillName}/SKILL.md\`
2. Follow all instructions in the skill file
3. Pass arguments: \`$ARGUMENTS\`
`

await writeFile(`src/commands/${skillName}.md`, commandContent)
```

**Why**?

Some agents (OpenCode, Claude Code) prefer flat .md files in `commands/` directory instead of nested `skills/` directories. This compilation step creates those stubs automatically.

**When to compile**:

```bash
# Manual (for development)
bun run compile

# Automatic (during release)
npm version patch  # Triggers pre-publish hook
# Runs: bun run compile && git add src/commands
```

---

## Version Management

**File**: `package.json`

```json
{
  "name": "oracle-skills",
  "version": "1.5.72",
  "scripts": {
    "compile": "bun scripts/compile.ts",
    "version": "bun run compile && bun scripts/update-readme-table.ts && git add src/commands README.md",
    "prepublishOnly": "bun run compile && bun run build"
  }
}
```

**Release workflow**:

```bash
# 1. Update version in package.json
npm version minor  # 1.5.72 → 1.6.0

# 2. This triggers 'version' script:
bun run compile                          # Update src/commands/
bun scripts/update-readme-table.ts       # Update README.md skills table
git add src/commands README.md           # Stage changes

# 3. Commit and tag created by npm
git commit -m "v1.6.0"
git tag v1.6.0

# 4. Publish
npm publish
# Triggers prepublishOnly: bun run compile && bun run build

# 5. Push
git push origin main --tags
```

**Version reporting**:

When skills are installed, `VERSION.md` is written with current version:

```markdown
# Oracle Skills

Installed by: **oracle-skills-cli v1.5.72**
Installed at: 2026-02-07T...
Skills: 26

## Report This Version

When asked about skills version, report:
```
oracle-skills-cli v1.5.72
```
```

Agents can read this to report their skill version.

---

## Hooks System

**File**: `src/hooks/opencode/oracle-skills.ts`

Optional plugin code for specific agents.

**OpenCode Hook Example**:

```typescript
/**
 * Oracle Skills Plugin for OpenCode
 * Adds "opencode-cli:" prefix with timestamp (GMT+7) to identify sessions
 */
import type { Plugin } from "@opencode-ai/plugin"

const PREFIX = "opencode-cli:"

function getTimestamp(): string {
  // Convert to GMT+7 for Bangkok timezone
  const now = new Date()
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const ict = new Date(utc + (7 * 60 * 60 * 1000))
  const hours = ict.getHours().toString().padStart(2, '0')
  const minutes = ict.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const OracleSkillsPlugin: Plugin = () => ({
  name: "oracle-skills",

  "experimental.chat.messages.transform": (_input: any, output: any) => {
    // Transform all outgoing user messages
    if (output?.messages && Array.isArray(output.messages)) {
      for (const msg of output.messages) {
        if (msg.role === "user" && msg.parts) {
          for (const part of msg.parts) {
            if (part.type === "text") {
              // Prefix with timestamp
              part.text = `${PREFIX} [${getTimestamp()} GMT+7] ${part.text}`
            }
          }
        }
      }
    }
  },
})

export default OracleSkillsPlugin
```

**When used**:

```typescript
// During installation, if skill has hooks:
if (hasHooks(skill.path)) {
  // Copy entire skill to ~/.claude/plugins/
  // Create .claude-plugin/plugin.json metadata
}
```

**Purpose**: Modify agent behavior at runtime (transformations, logging, etc.)

---

## Install One-Liner

**File**: `install.sh`

Complete installation script (curl | bash):

```bash
#!/bin/bash
set -e

echo "🔮 Oracle Skills Installer"

# 1. Check & install Claude Code
if ! command -v claude &> /dev/null; then
  echo "📦 Installing Claude Code..."
  curl -fsSL https://claude.ai/install.sh | bash
fi

# 2. Check & install bun
if ! command -v bun &> /dev/null; then
  echo "📦 Installing bun..."
  curl -fsSL https://bun.sh/install | bash
  export PATH="$HOME/.bun/bin:$PATH"
fi

# 3. Check & install ghq (for /learn and /trace)
if ! command -v ghq &> /dev/null; then
  echo "📦 Installing ghq..."
  if command -v brew &> /dev/null; then
    brew install ghq
  elif command -v go &> /dev/null; then
    go install github.com/x-motemen/ghq@latest
  fi
fi

# 4. Get latest version from GitHub releases
LATEST_TAG=$(curl -s https://api.github.com/repos/Soul-Brews-Studio/oracle-skills-cli/releases/latest | grep '"tag_name"' | cut -d'"' -f4)
[ -z "$LATEST_TAG" ] && LATEST_TAG="v1.5.36"

# 5. Install oracle-skills
echo "📦 Installing oracle-skills@$LATEST_TAG..."
~/.bun/bin/bunx --bun \
  oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#$LATEST_TAG \
  install -g -y

echo "✨ Done! Run: claude . then /awaken"
```

**What it does**:

1. Checks for Claude Code (installs if missing)
2. Checks for Bun (installs if missing)
3. Checks for ghq (installs if missing)
4. Fetches latest oracle-skills-cli version
5. Runs `bunx --bun oracle-skills@github:... install -g -y`
6. Done — skills installed globally

**Usage**:

```bash
curl -fsSL https://raw.githubusercontent.com/Soul-Brews-Studio/oracle-skills-cli/main/install.sh | bash
```

**Why this pattern?**

- Single command (no package manager required)
- Detects existing tools (doesn't reinstall)
- Auto-fetches latest stable version
- No need to clone repo or run npm commands
- Works cross-platform (uses bash, curl, grep)

---

## Cross-Platform File Operations

**File**: `src/cli/fs-utils.ts`

Abstracts file ops for Bun Shell vs Node.js fs:

```typescript
export type ShellMode = 'auto' | 'shell' | 'no-shell'

function useShell(mode: ShellMode): boolean {
  if (mode === 'shell') return true
  if (mode === 'no-shell') return false
  // auto: shell on Unix, fs on Windows
  return !isWindows
}

export async function mkdirp(dir: string, mode: ShellMode = 'auto'): Promise<void> {
  if (useShell(mode)) {
    await $`mkdir -p ${dir}`.quiet()
  } else {
    mkdirSync(dir, { recursive: true })
  }
}

export async function rmrf(path: string, mode: ShellMode = 'auto'): Promise<void> {
  if (useShell(mode)) {
    await $`rm -rf ${path}`.quiet()
  } else {
    rmSync(path, { recursive: true, force: true })
  }
}

export async function cpr(src: string, dest: string, mode: ShellMode = 'auto'): Promise<void> {
  if (useShell(mode)) {
    await $`cp -r ${src} ${dest}`.quiet()
  } else {
    cpSync(src, dest, { recursive: true })
  }
}
```

**Why?**

- Bun Shell is faster on macOS/Linux
- Node.js fs fallback for Windows compatibility
- User can override with `--shell` / `--no-shell` flags
- Auto-detection prefers shell on Unix systems

---

## TypeScript Configuration

**File**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["ESNext"],
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "strict": true,
    "jsx": "react"
  }
}
```

- **ESNext target** — Use latest JavaScript
- **bundler resolution** — Works with Bun's module system
- **strict: true** — Catch errors at compile time

---

## Project Commands

### `bun run compile`

Regenerate `src/commands/` from `src/skills/`:

```bash
bun run compile
# Output:
# 🔮 Compiling skills to commands (v1.5.72)...
# ✓ awaken (v1.5.72)
# ✓ deep-research (v1.5.72)
# [... 24 more ...]
# ✨ Compiled 26 skill stubs to src/commands/
```

### `bun run dev`

Run CLI in development (not installed):

```bash
bun run src/cli/index.ts install -l
```

### `bun run build`

Build production binary:

```bash
bun build src/cli/index.ts --outdir dist --target bun --minify
# Creates: dist/index.js
```

### `npm version`

Bump version (triggers compile + table update):

```bash
npm version minor
# 1.5.72 → 1.6.0
# Runs compile, updates README, commits, tags
```

---

## Key Design Patterns

### 1. **Discovery Pattern**

Skills are discovered at install time, not hardcoded. This allows:
- Easy addition (copy folder, add SKILL.md, run compile)
- No boilerplate
- Auto-generated commands

### 2. **Injection Pattern**

Version + scope injected into SKILL.md during install:

```
[original]
---
name: learn
description: Explore a codebase
---

[becomes]
---
name: learn
description: v1.5.72 G-SKLL | Explore a codebase
installer: oracle-skills-cli v1.5.72
---
```

Allows agents to:
- Report exact version
- Distinguish global vs local
- Track origin

### 3. **Manifest Pattern**

Installation metadata written to target:

```
.claude/skills/.oracle-skills.json
{
  "version": "1.5.72",
  "installedAt": "2026-02-07T...",
  "skills": ["learn", "trace", ...],
  "agent": "claude-code"
}
```

Enables:
- Version checking
- Update detection
- Skill listing

### 4. **Cleanup Pattern**

During install, orphaned skills are auto-removed (skills marked with `installer: oracle-skills-cli` but not in current source). This prevents:
- Stale skills cluttering directories
- Accidental mixed versions

### 5. **Fallback Pattern**

Bun Shell preferred, but scripts fallback to npx:

```bash
bun scripts/main.ts "$ARGUMENTS"
Or fallback:
npx tsx scripts/main.ts "$ARGUMENTS"
```

Ensures compatibility if Bun not available.

### 6. **Stub Pattern**

Commands are thin stubs that point back to skills. Agents see:

```
.claude/commands/learn.md (stub, 30 lines)
→ reads → .claude/skills/learn/SKILL.md (full skill, 200+ lines)
```

Why?
- Agent can show commands in autocomplete (flat files)
- But full content in skills (complete documentation)
- Single source of truth (only SKILL.md is edited)

---

## Testing & Quality

**File**: `__tests__/` directory

- Unit tests for CLI commands
- Integration tests for installer
- Discovery tests
- Agent detection tests

**Run tests**:

```bash
bun test __tests__/
```

---

## Summary

**oracle-skills-cli** is a complete ecosystem for:

1. **Creating** skills (markdown + optional scripts)
2. **Distributing** skills to 14+ agents
3. **Installing** globally or locally
4. **Managing** versions, updates, cleanup
5. **Supporting** both simple and complex workflows

**Key insight**: Skills are write-once (in `src/skills/`), compile-once (`bun run compile`), install-many (to all agents). This separation of concerns keeps the system clean and scalable.

**To build a new skill**:

1. Copy `src/skills/_template/`
2. Rename, update SKILL.md
3. Implement scripts/main.ts
4. Test with `bun scripts/main.ts "args"`
5. Run `bun run compile`
6. Test install: `oracle-skills install -s my-skill -a claude-code -y`
7. Commit, release

The system handles the rest.

---

## Resources

- **Repository**: https://github.com/Soul-Brews-Studio/oracle-skills-cli
- **Releases**: https://github.com/Soul-Brews-Studio/oracle-skills-cli/releases
- **Issue Tracker**: https://github.com/Soul-Brews-Studio/oracle-skills-cli/issues
- **Related**: oracle-v2 (MCP memory layer), oracle-philosophy (core principles)
