# oracle-skills-cli Quick Reference

**Version**: 1.5.72 | **License**: MIT | **Repository**: [Soul-Brews-Studio/oracle-skills-cli](https://github.com/Soul-Brews-Studio/oracle-skills-cli)

---

## What It Does

**oracle-skills-cli** is a unified skill installer and manager for 14+ AI coding agents (Claude Code, OpenCode, Cursor, Codex, etc.). It installs "Oracle skills" — specialized workflows that extend agent capabilities for code exploration, documentation, retrospectives, project tracking, and personal context management. The CLI auto-detects installed agents, manages skill versions, and handles both project-level and global installations.

---

## Installation

### One-Liner (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/Soul-Brews-Studio/oracle-skills-cli/main/install.sh | bash
```

This script:
1. Installs Bun (if not present)
2. Installs ghq (if not present)
3. Runs `oracle-skills install -g -y`
4. Outputs setup completion message

### Manual Steps

```bash
# 1. Install Bun (required runtime)
which bun || curl -fsSL https://bun.sh/install | bash

# 2. Install ghq (required for /learn and /trace skills)
which ghq || brew install ghq  # macOS
# Linux/Windows: go install github.com/x-motemen/ghq@latest

# 3. Install oracle-skills globally
~/.bun/bin/bunx --bun \
  oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v1.5.72 \
  install -g -y

# 4. Create permissions file (for Claude Code)
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
```

Then restart your agent and run `/awaken` to complete setup.

---

## CLI Commands

### `oracle-skills install` (default)

Install Oracle skills to agents.

```bash
# Auto-detect agents, prompt for confirmation
oracle-skills install

# Install to specific agents (no prompt)
oracle-skills install -a claude-code opencode -y

# Install specific skills only
oracle-skills install -s learn trace -y

# Install globally (user directory)
oracle-skills install -g -y

# List available skills without installing
oracle-skills install -l

# With all flags combined
oracle-skills install -g -a claude-code -s learn trace -y
```

**Flags**:
- `-g, --global` — Install to `~/.claude/skills/` instead of `.claude/skills/`
- `-a, --agent <agents...>` — Target specific agents (e.g., `claude-code`, `opencode`, `cursor`)
- `-s, --skill <skills...>` — Install only specific skills by name
- `-l, --list` — List available skills and exit
- `-y, --yes` — Skip confirmation prompts
- `--commands` — Also install command stubs to `~/.claude/commands/` (Claude Code only)
- `--shell` — Force Bun.$ shell commands (Windows compatibility testing)
- `--no-shell` — Force Node.js fs operations (Unix fallback)

### `oracle-skills uninstall`

Remove installed Oracle skills.

```bash
# Uninstall from auto-detected agents
oracle-skills uninstall -y

# Uninstall from specific agents
oracle-skills uninstall -a claude-code -y

# Uninstall specific skills only
oracle-skills uninstall -s learn trace -y

# Uninstall globally
oracle-skills uninstall -g -y
```

**Flags**:
- `-g, --global` — Uninstall from user directory
- `-a, --agent <agents...>` — Target specific agents
- `-s, --skill <skills...>` — Remove only specific skills
- `-y, --yes` — Skip confirmation prompts
- `--shell, --no-shell` — Same as `install`

### `oracle-skills list`

Show installed Oracle skills.

```bash
# List skills in detected agents (local)
oracle-skills list

# List global skills
oracle-skills list -g

# List skills for specific agent
oracle-skills list -a claude-code

# List global skills for multiple agents
oracle-skills list -g -a claude-code opencode
```

**Flags**:
- `-g, --global` — Show global (user-level) skills
- `-a, --agent <agents...>` — Show skills for specific agents only

### `oracle-skills agents`

List all supported agents and detection status.

```bash
oracle-skills agents
```

Output shows `✓` for agents detected on your system, ` ` for not detected.

---

## Complete Skill List (26 Skills)

### Tier 1: Subagent Skills (Parallel Exploration)

| # | Skill | Type | Description |
|---|-------|------|-------------|
| 1 | **learn** | skill + subagent | Explore a codebase with 1/3/5 parallel Haiku agents (modes: `--fast`, default, `--deep`) |
| 2 | **rrr** | skill + subagent | Create session retrospective with AI diary and lessons learned |
| 3 | **trace** | skill + subagent | Find projects across git history, repos, docs, and Oracle memory (`--oracle`, `--smart`, `--deep`) |

### Tier 2: Code & Research Skills

| # | Skill | Type | Description |
|---|-------|------|-------------|
| 4 | **deep-research** | skill + code | Deep Research via Gemini with comprehensive analysis and sources |
| 5 | **gemini** | skill + code | Control Gemini via MQTT WebSocket protocol |
| 6 | **physical** | skill + code | Physical location awareness from Apple FindMy |
| 7 | **project** | skill + code | Clone and track external repos (actions: `learn`, `incubate`, `search`, `list`) |
| 8 | **recap** | skill + code | Fresh-start orientation—adaptive synthesis with edge case handling |
| 9 | **schedule** | skill + code | Query `schedule.md` using DuckDB markdown extension |
| 10 | **speak** | skill + code | Text-to-speech using edge-tts (cross-platform) or macOS say |
| 11 | **watch** | skill + code | Learn from YouTube videos via Gemini transcription |

### Tier 3: Standalone Skills (No Subagents)

| # | Skill | Type | Description |
|---|-------|------|-------------|
| 12 | **awaken** | skill | Guided Oracle birth ritual (~15 min) for new repos |
| 13 | **birth** | skill | Prepare birth props (issue #1, MCP thread) for new Oracle repo |
| 14 | **feel** | skill | Log emotions with optional structure (mood, context) |
| 15 | **forward** | skill | Create handoff document + enter plan mode for next session |
| 16 | **fyi** | skill | Log information for future reference (notes, learnings) |
| 17 | **merged** | skill | Post-merge cleanup (switch to main, pull, delete branch) |
| 18 | **oracle-family-scan** | skill | Manage Oracle family—scan, track, welcome new Oracles |
| 19 | **oracle-pulse** | skill | Quantitative heartbeat from `~/.claude/` session data (stats, usage) |
| 20 | **oracle-soul-sync-calibrate-update** | skill | Sync Oracle instruments with family, check/update skill versions |
| 21 | **philosophy** | skill | Display Oracle philosophy principles (5 core tenets) |
| 22 | **retrospective** | skill | Alias for `/rrr` — session retrospective and AI diary |
| 23 | **standup** | skill | Daily standup check (pending tasks, appointments, progress) |
| 24 | **where-we-are** | skill | Session awareness—what we're doing now (quick/deep modes) |
| 25 | **who-we-are** | skill | Know ourselves—identity, model info, session stats, philosophy |
| 26 | **worktree** | skill | Git worktree for parallel work (manage multiple branches) |

---

## Supported Agents (14 Agents)

| Agent | Display Name | Project Path | Global Path |
|-------|--------------|--------------|-------------|
| `claude-code` | Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| `opencode` | OpenCode | `.opencode/skills/` | `~/.config/opencode/skills/` |
| `codex` | Codex | `.codex/skills/` | `~/.codex/skills/` |
| `cursor` | Cursor | `.cursor/skills/` | `~/.cursor/skills/` |
| `amp` | Amp | `.agents/skills/` | `~/.config/agents/skills/` |
| `kilo` | Kilo Code | `.kilocode/skills/` | `~/.kilocode/skills/` |
| `roo` | Roo Code | `.roo/skills/` | `~/.roo/skills/` |
| `goose` | Goose | `.goose/skills/` | `~/.config/goose/skills/` |
| `gemini` | Gemini CLI | `.gemini/skills/` | `~/.gemini/skills/` |
| `antigravity` | Antigravity | `.agent/skills/` | `~/.gemini/antigravity/skills/` |
| `copilot` | GitHub Copilot | `.github/skills/` | `~/.copilot/skills/` |
| `clawdbot` | Clawdbot | `skills/` | `~/.clawdbot/skills/` |
| `droid` | Droid | `.factory/skills/` | `~/.factory/skills/` |
| `windsurf` | Windsurf | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |

---

## Creating a New Skill

### Step-by-Step

1. **Copy the template folder**
   ```bash
   cp -r src/skills/_template src/skills/my-skill
   ```

2. **Update `SKILL.md` frontmatter**
   ```yaml
   ---
   name: my-skill
   description: One-line description. Use when user says "X", "Y", or "Z".
   ---
   ```

3. **Edit `scripts/main.ts`**
   - Replace template logic with your implementation
   - Accept `$ARGUMENTS` from Claude
   - Output results to stdout

4. **Test locally**
   ```bash
   bun scripts/main.ts "test arguments"
   ```

5. **Install for testing**
   ```bash
   oracle-skills install -s my-skill -y
   ```

6. **Use in agent**
   ```
   /my-skill argument1 argument2
   ```

### Directory Structure

```
my-skill/
├── SKILL.md              # Instructions for Claude (CRITICAL)
└── scripts/
    └── main.ts           # Bun runtime logic
```

---

## SKILL.md Format Specification

Every skill has a `SKILL.md` file with two sections: **YAML frontmatter** and **Markdown instructions**.

### Frontmatter (Required)

```yaml
---
name: skill-name
description: One-line description. Use when user says "X", "Y", or "Z".
---
```

**Fields**:
- `name` — Skill identifier (lowercase, hyphens, no spaces)
- `description` — Trigger phrase. Include action words and use cases. Claude uses this to decide WHEN to invoke the skill.

### Markdown Instructions

Follow this template structure:

```markdown
# /skill-name - Title

Brief introduction (1-2 paragraphs).

## Usage

List all invocation patterns:
```
/skill-name [args]     # Description
/skill-name --flag     # With optional flags
```

## Prerequisites

System requirements, dependencies, setup.

## Step 0: Timestamp

```bash
date "+🕐 %H:%M %Z (%A %d %B %Y)"
```

Always capture current time and timezone.

## Step N: [Phase Name]

Each major phase gets its own step.

Include:
- **What to check** (if decisions needed)
- **Commands to run** (code blocks with bash)
- **Output expectations** (what success looks like)
- **Error handling** (what to do if it fails)

## Output Summary

Show final result, files created, next steps.
```

### Key Patterns

- **Path discipline**: Always use absolute paths when spawning subagents
- **Time prefixes**: Use `HHMM_` prefix for time-stamped outputs (e.g., `1349_ARCHITECTURE.md`)
- **Date folders**: Group outputs by date (e.g., `ψ/learn/owner/repo/2026-02-07/`)
- **No overwrites**: Multiple runs same day get unique time prefixes
- **Critical notes**: Use `⚠️ IMPORTANT:` for path handling, `> "Quote"` for philosophy

---

## Mode Escalation Pattern

Three modes for skills with parallel subagents (learn, trace, rrr):

### `--fast` Mode (1 Agent, ~2 min)

```bash
/learn --fast [target]
/trace [query] --oracle
/rrr --fast
```

**When to use**: Quick scan, "what is this?", tight time budget.

### Default Mode (3 Agents, ~5 min)

```bash
/learn [target]
/trace [query] --smart       # or no flag (--smart is default)
/rrr                         # No flag = default
```

**When to use**: Normal exploration, good balance of speed vs. depth.

### `--deep` Mode (5 Agents, ~10 min)

```bash
/learn --deep [target]
/trace [query] --deep
/rrr --deep
```

**When to use**: Master complex repos, comprehensive learning needed.

### Pattern Explanation

- **--fast**: One agent = cost/speed optimized for "just tell me quick"
- **Default (3 agents)**: Parallel exploration = balanced coverage
- **--deep**: Five agents = exhaustive analysis for complexity

Each mode spawns agents with identical prompt template, just different agent count. Agents work in **parallel** (not sequential).

---

## Key Architectural Patterns

### 1. Subagent Delegation

When spawning subagents (in `/learn`, `/trace`, `/rrr`):

```
⚠️ CRITICAL: Give agents TWO literal paths:
1. SOURCE_DIR (where to READ code)
2. DOCS_DIR (where to WRITE docs)

If you only give origin/ path, agents cd into it and write there
→ files end up in WRONG repo!

CORRECT:
READ from:  /absolute/path/to/ψ/learn/owner/repo/origin/
WRITE to:   /absolute/path/to/ψ/learn/owner/repo/2026-02-07/1349_FILENAME.md

WRONG:
cd ψ/learn/owner/repo/origin
# ...now agent writes to origin/ instead of date folder!
```

### 2. Time Prefixing

All output files get `HHMM_` prefix (24-hour format):

```
1349_ARCHITECTURE.md    # Created at 13:49
1520_CODE-SNIPPETS.md   # Another run at 15:20 (same day, no overwrite)
```

Calculate time: `date +%H%M` (e.g., 1349 = 1:49 PM)

### 3. Path Discipline

Always resolve and capture paths as **literal absolute values** BEFORE spawning agents:

```bash
ROOT="$(pwd)"              # Capture root FIRST
TODAY=$(date +%Y-%m-%d)    # Calculate TODAY once
TIME=$(date +%H%M)         # Calculate TIME once
DOCS_DIR="$ROOT/ψ/learn/owner/repo/$TODAY"

# Then pass these as LITERAL values to agents:
# "Read from: /home/user/oracle/ψ/learn/owner/repo/origin/"
# "Write to: /home/user/oracle/ψ/learn/owner/repo/2026-02-07/1349_FILENAME.md"
```

### 4. ghq + ψ/ Structure

**Two-part system** for managing external repos:

```
ghq owns the clone       → ~/.ghq/github.com/owner/repo/
ψ/learn owns the link    → ./ψ/learn/owner/repo/origin/ (symlink)
ψ/incubate owns the link → ./ψ/incubate/owner/repo/ (symlink, for active work)
```

**Golden rule**: Never copy. Always symlink. One source of truth in ghq.

### 5. Manifest Files

Track learning/tracing for `--init` restoration:

- `ψ/learn/.origins` — List of learned repos (one per line: `owner/repo`)
- `ψ/memory/traces/` — Trace logs indexed by date (`YYYY-MM-DD/HHMM_query-slug.md`)

### 6. Hub Files

Index multiple learnings of same repo:

```markdown
# oracle-skills-cli Learning Index

## Explorations

### 2026-02-07 1349 (default mode)
- [[2026-02-07/1349_ARCHITECTURE|Architecture]]
- [[2026-02-07/1349_CODE-SNIPPETS|Code Snippets]]
- [[2026-02-07/1349_QUICK-REFERENCE|Quick Reference]]

### 2026-02-07 1520 (default mode)
- [[2026-02-07/1520_ARCHITECTURE|Architecture]]
...
```

---

## Common Troubleshooting

### "Bun runtime not found"

**Error**: `oracle-skills requires Bun runtime`

**Fix**:
```bash
curl -fsSL https://bun.sh/install | bash
# Then restart shell or: source ~/.bashrc
```

### Agents not detected

**Error**: "No agents detected. Use --agent to specify."

**Fix**:
1. Check agent is installed (e.g., `ls ~/.claude/` for Claude Code)
2. Specify manually: `oracle-skills install -a claude-code -y`

### Skills not appearing in agent

**Causes**:
1. Installed to wrong location (project vs. global mismatch)
2. Agent not restarted after install
3. Permissions issue (check `.claude/settings.local.json`)

**Fix**:
```bash
# Verify installation location
oracle-skills list -g -a claude-code

# Restart Claude Code, then try skill
/awaken
```

### Cannot access ghq repos

**Error**: "ghq: command not found" (when using `/learn` or `/trace`)

**Fix**:
```bash
# Install ghq
brew install ghq              # macOS
go install github.com/x-motemen/ghq@latest  # Linux/other

# Add to PATH if needed
export PATH="$HOME/go/bin:$PATH"
```

### Skill output in wrong location

**Error**: Files written to `origin/` instead of date folder

**Cause**: Subagent only given source path, not both paths

**Fix**: Always pass TWO literal paths to subagents:
```
READ from: /full/path/to/origin/
WRITE to: /full/path/to/2026-02-07/1349_FILENAME.md
```

### rg tool doesn't follow symlinks

**Error**: `/learn` finds nothing (grep/rg not following symlinks)

**Fix**: Use `rg -L` flag (follow symlinks):
```bash
rg -L "pattern" ψ/learn/owner/repo/origin/
```

The Grep tool in agents also supports following symlinks with appropriate flags.

### Permissions denied on global install

**Error**: `EACCES: permission denied` when installing globally

**Fix**:
```bash
# Option 1: Install with sudo (not recommended)
sudo ~/.bun/bin/bunx --bun oracle-skills install -g -y

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH="$HOME/.npm-global/bin:$PATH"
```

### Multiple runs same day create conflicts

**Expected behavior**: Multiple runs same day get different timestamps

```
1349_ARCHITECTURE.md    # First run at 1:49 PM
1520_ARCHITECTURE.md    # Second run at 3:20 PM (no overwrite)
```

This is intentional—use hub file to index all sessions.

---

## Philosophy

> "The Oracle Keeps the Human Human"

Five core principles guide all Oracle skills:

1. **Nothing is Deleted** — Append-only, timestamped, history = wealth
2. **Patterns Over Intentions** — Observe behavior, not promises
3. **External Brain, Not Command** — Mirror reality, don't decide
4. **Curiosity Creates Existence** — Questions birth exploration
5. **Transparency Over Automation** — Show work, preserve agency

View with: `/philosophy` or `/philosophy check`

---

## Related Resources

- **[oracle-v2](https://github.com/Soul-Brews-Studio/oracle-v2)** — MCP Memory Layer (Oracle brain)
- **[Soul Brews Plugin Marketplace](https://github.com/Soul-Brews-Studio/plugin-marketplace)** — Source of Oracle skills
- **[Agent Skills Specification](https://agentskills.io)** — Cross-agent skill format
- **[add-skill](https://github.com/vercel-labs/add-skill)** — Universal skill installer by Vercel

---

## Quick Examples

### Example 1: First-Time Setup

```bash
# Install oracle-skills
curl -fsSL https://raw.githubusercontent.com/Soul-Brews-Studio/oracle-skills-cli/main/install.sh | bash

# Create new Oracle repo
mkdir my-oracle && cd my-oracle && git init

# Create permissions file
mkdir -p .claude && cat > .claude/settings.local.json << 'EOF'
{
  "permissions": {
    "allow": ["Bash(gh:*)", "Bash(ghq:*)", "Bash(git:*)", "Bash(bun:*)", "Bash(bunx:*)",
              "Bash(mkdir:*)", "Bash(ln:*)", "Bash(rg:*)", "Bash(date:*)", "Bash(ls:*)",
              "Bash(*ψ/*)", "Skill(learn)", "Skill(trace)", "Skill(awaken)"]
  }
}
EOF

# Start oracle
claude .
/awaken
```

### Example 2: Explore a Repository

```bash
/learn https://github.com/Soul-Brews-Studio/oracle-skills-cli
# Output: ψ/learn/Soul-Brews-Studio/oracle-skills-cli/2026-02-07/1349_*.md

# For quick scan:
/learn --fast https://github.com/Soul-Brews-Studio/oracle-skills-cli
# Output: ψ/learn/Soul-Brews-Studio/oracle-skills-cli/2026-02-07/1349_OVERVIEW.md

# For comprehensive analysis:
/learn --deep https://github.com/Soul-Brews-Studio/oracle-skills-cli
# Output: ψ/learn/.../2026-02-07/1349_ARCHITECTURE.md, CODE-SNIPPETS.md, QUICK-REFERENCE.md,
#         TESTING.md, API-SURFACE.md
```

### Example 3: Track External Project

```bash
/project learn https://github.com/vercel/next.js
# Output: ψ/learn/vercel/next.js/origin -> ghq clone

/project incubate https://github.com/owner/my-fork --contribute
# Output: ψ/incubate/owner/my-fork/origin -> ghq clone, ready for PR work
```

### Example 4: Find Previous Work

```bash
/trace "project X feature" --smart
# Output: ψ/memory/traces/2026-02-07/1350_project-x-feature.md
# Shows Oracle memory + git history + code search results

/trace "API change" --deep
# Same query, but with 5 parallel subagents for deep analysis
```

### Example 5: Session Recap

```bash
/recap
# Shows: current context, previous sessions, pending items, recent work

/rrr
# Full retrospective: lessons learned, mood log, handoff points
```

---

**Generated**: 2026-02-07 13:49 | **Source**: oracle-skills-cli v1.5.72 | **License**: MIT
