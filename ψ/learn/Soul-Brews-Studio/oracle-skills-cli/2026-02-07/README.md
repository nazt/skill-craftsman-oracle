# Oracle Skills CLI Analysis — 2026-02-07

## Overview

This folder contains a comprehensive analysis of the **oracle-skills-cli** architecture — the skill system that powers Oracle agents across Claude Code, OpenCode, Cursor, and 11+ other AI coding assistants.

## Files

### 1338_ARCHITECTURE.md

**Complete architecture documentation** covering:

- **Directory Structure** — Full source organization
- **Core Concepts** — Skills, commands, agents, scripts
- **CLI Architecture** — All commands (install, uninstall, list, agents)
- **Skills System** — Discovery, metadata, arguments, Bun Shell scripts
- **Installation Pipeline** — Step-by-step installation workflow
- **Agent Support Matrix** — Configuration for 14 agents
- **Template Skill** — How to create new skills from scratch
- **Building New Skills** — Complete guide with examples
- **Skill Complexity Levels** — From simple markdown to complex scripts
- **Compilation** — Skills → Commands conversion process
- **Version Management** — Release workflow
- **Hooks System** — Agent-specific plugins
- **Install One-Liner** — curl | bash installation script
- **Key Design Patterns** — Discovery, injection, manifest, cleanup
- **Testing & Quality** — Test suite overview

## Key Insights

### Architecture Philosophy

**Skills are discovered, compiled once, installed everywhere.**

- **Source**: `src/skills/*/SKILL.md` (directories with markdown + optional scripts)
- **Compiled**: `src/commands/*.md` (flat file stubs for agents)
- **Installed**: To 14 agents in their native format (`.claude/skills/`, `.opencode/skills/`, etc.)

### Skill Structure

```
skill-name/
├── SKILL.md                # Markdown instructions + YAML frontmatter
└── scripts/                # Optional: TypeScript/Bun Shell
    └── main.ts
```

**Frontmatter** (YAML):
```yaml
---
name: skill-name
description: Trigger signal. Use when user says "X" or "Y".
---
```

**Content**: Pure markdown steps for agents to execute.

**Arguments**: Via `$ARGUMENTS` placeholder — replaced by agent.

### Installation Pipeline

1. **Discover** — Find all skills in `src/skills/`
2. **Filter** — Apply `--skill`, `--agent` filters
3. **Create** — Make target directories (`.claude/skills/`, etc.)
4. **Copy** — Transfer skill folders to targets
5. **Inject** — Add version + scope to SKILL.md
6. **Manifest** — Write `.oracle-skills.json` + `VERSION.md`
7. **Commands** — Create flat `.md` stubs (if agent supports)
8. **Plugins** — Copy hooks-based skills to `~/.claude/plugins/`
9. **Cleanup** — Remove orphaned skills from previous installs

### Supported Agents (14 Total)

| Agent | Project Path | Global Path | Notes |
|-------|--------------|-------------|-------|
| Claude Code | `.claude/skills/` | `~/.claude/skills/` | Primary, has hooks support |
| OpenCode | `.opencode/skills/` | `~/.config/opencode/skills/` | Auto-commands |
| Cursor | `.cursor/skills/` | `~/.cursor/skills/` | Clean install |
| Codex | `.codex/skills/` | `~/.codex/skills/` | Codex support |
| Amp | `.agents/skills/` | `~/.config/agents/skills/` | Amp agent |
| Kilo Code | `.kilocode/skills/` | `~/.kilocode/skills/` | Kilo support |
| Roo Code | `.roo/skills/` | `~/.roo/skills/` | Roo support |
| Goose | `.goose/skills/` | `~/.config/goose/skills/` | Goose support |
| Gemini CLI | `.gemini/skills/` | `~/.gemini/skills/` | Gemini support |
| Antigravity | `.agent/skills/` | `~/.gemini/antigravity/skills/` | Antigravity support |
| Copilot | `.github/skills/` | `~/.copilot/skills/` | Copilot support |
| Clawdbot | `skills/` | `~/.clawdbot/skills/` | Custom path |
| Droid | `.factory/skills/` | `~/.factory/skills/` | Droid support |
| Windsurf | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` | Windsurf support |

### Creating a New Skill

**Quick Start**:

```bash
# 1. Copy template
cp -r src/skills/_template src/skills/my-skill

# 2. Update SKILL.md
# - Change name: to my-skill
# - Change description: to what it does
# - Write markdown steps

# 3. Implement logic (if needed)
# - Edit scripts/main.ts
# - Use Bun Shell: import { $ } from "bun"

# 4. Test locally
bun src/skills/my-skill/scripts/main.ts "test args"

# 5. Compile & install
bun run compile
oracle-skills install -s my-skill -a claude-code -y

# 6. Test in agent
/my-skill test args

# 7. Commit & release
git add src/skills/my-skill/
git commit -m "feat: add my-skill"
npm version patch  # Compiles, updates README, commits
```

### Skill Complexity Levels

#### Level 1: Pure Markdown
No scripts. Agent reads steps and executes them.
**Examples**: `/awaken`, `/philosophy`, `/standup`

```markdown
## Step 1: Do Something
Run this command:
```bash
some-command
```
```

#### Level 2: Simple Script
One `.ts` file that processes input and outputs results.
**Examples**: `/trace`, `/learn`, `/speak`

```typescript
#!/usr/bin/env bun
import { $ } from "bun"

const input = Bun.argv.slice(2).join(" ")
const result = await $`command ${input}`.text()
console.log(result)
```

#### Level 3: Complex
Multiple scripts, utilities, configuration files.
**Examples**: `/gemini`, `/project`, `/deep-research`

```
skill/
├── SKILL.md
├── scripts/
│   ├── main.ts
│   ├── helper.ts
│   └── util.ts
└── templates/
    └── config.yaml
```

### Arguments Passing

Skills receive user input via `$ARGUMENTS` placeholder:

**In SKILL.md**:
```markdown
```bash
bun scripts/main.ts "$ARGUMENTS"
```
```

**How agents use it**:
- User: `/learn some-repo-path`
- Agent: `bun scripts/learn/main.ts "some-repo-path"`
- Script: `const path = Bun.argv.slice(2).join(" ")`

### Compilation: Skills → Commands

**Process**:
1. Read all `src/skills/*/SKILL.md`
2. Extract `name` and `description` from frontmatter
3. Generate flat `.md` stub in `src/commands/`
4. Stub points back to full skill in `skills/` directory

**Why**?
- OpenCode, Claude Code prefer flat `.md` files
- But keep single source of truth in `SKILL.md`
- Compilation is automated (`bun run compile`)

**When**:
- During development: `bun run compile`
- During release: `npm version patch` (auto-compiles)

### Version Management

**Current**: v1.5.72

**Bump version**:
```bash
npm version patch   # 1.5.72 → 1.5.73
npm version minor   # 1.5.72 → 1.6.0
npm version major   # 1.5.72 → 2.0.0
```

**This triggers**:
1. `bun run compile` — Regenerates `src/commands/`
2. `bun scripts/update-readme-table.ts` — Updates README skills table
3. Git commit with new version
4. Git tag (v1.5.73)

**When installing**, version is embedded:
```
~/.claude/skills/.oracle-skills.json
{
  "version": "1.5.72",
  "installedAt": "2026-02-07T...",
  "skills": [...],
  "agent": "claude-code"
}
```

### Install One-Liner

```bash
curl -fsSL https://raw.githubusercontent.com/Soul-Brews-Studio/oracle-skills-cli/main/install.sh | bash
```

**Does**:
1. Checks for Claude Code, installs if missing
2. Checks for Bun, installs if missing
3. Checks for ghq, installs if missing
4. Fetches latest oracle-skills-cli from GitHub
5. Runs: `bunx --bun oracle-skills@github:... install -g -y`
6. Done — skills installed globally

### Hooks System

Optional plugins for specific agents.

**OpenCode Example** (`src/hooks/opencode/oracle-skills.ts`):
```typescript
// Transforms messages: adds timestamp prefix
const OracleSkillsPlugin: Plugin = () => ({
  name: "oracle-skills",
  "experimental.chat.messages.transform": (input, output) => {
    // Prefix all user messages with "[HH:MM GMT+7]"
  }
})
```

**When installed**: Copied to `~/.opencode/plugins/`

### Key Design Patterns

1. **Discovery** — Skills found by scanning directories, no hardcoding
2. **Injection** — Version + scope added to SKILL.md during install
3. **Manifest** — Metadata (`.oracle-skills.json`, `VERSION.md`) written at install
4. **Cleanup** — Orphaned skills auto-removed (marked with `installer: oracle-skills-cli`)
5. **Fallback** — Bun preferred, but `npx tsx` works if Bun absent
6. **Stub** — Commands are thin pointers back to full skills

## Practical Examples

### Example 1: Simple Markdown Skill

**skill-name**: `standup`

```
src/skills/standup/SKILL.md:

---
name: standup
description: Daily standup check-in and status
---

# /standup

## Your Daily Status

Answer these questions:

1. What did I accomplish yesterday?
2. What am I working on today?
3. Any blockers?

[more markdown...]

ARGUMENTS: $ARGUMENTS
```

No scripts. Agent reads and executes.

### Example 2: Script-Based Skill

**skill-name**: `speak`

```
src/skills/speak/
├── SKILL.md
└── scripts/main.ts

SKILL.md:
---
name: speak
description: Text-to-speech using edge-tts or macOS say
---

# /speak

Convert text to speech.

## Usage

```bash
/speak "Hello, world"
```

## Step 1: Synthesize

```bash
bun scripts/main.ts "$ARGUMENTS"
```

ARGUMENTS: $ARGUMENTS

scripts/main.ts:
#!/usr/bin/env bun
import { $ } from "bun"

const text = Bun.argv.slice(2).join(" ")

// Use macOS say command
await $`say ${text}`
```

### Example 3: Complex Skill with MQTT

**skill-name**: `deep-research`

```
src/skills/deep-research/
├── SKILL.md
└── scripts/deep-research.ts

SKILL.md:
---
name: deep-research
description: Deep Research via Gemini
---

# /deep-research

## Usage

```bash
/deep-research <topic>
```

## Step 1: Open Gemini

```bash
bun scripts/deep-research.ts "$ARGUMENTS"
```

scripts/deep-research.ts:
- Connects to MQTT broker
- Creates new Gemini tab
- Selects "Deep Research" mode
- Sends topic prompt
- Clicks "Start research" button
- Returns
```

## Related Resources

- **Repository**: https://github.com/Soul-Brews-Studio/oracle-skills-cli
- **Oracle Philosophy**: https://github.com/Soul-Brews-Studio/oracle-v2
- **Nat's Brain Oracle**: https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle
- **Plugin Marketplace**: https://github.com/Soul-Brews-Studio/plugin-marketplace

## Document Info

- **Created**: 2026-02-07 13:38
- **Source**: /Users/nat/Code/github.com/Soul-Brews-Studio/oracle-skills-cli
- **Analysis Focus**: Architecture, skill structure, building new skills
- **Version Analyzed**: 1.5.72
