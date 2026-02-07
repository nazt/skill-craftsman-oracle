# Oracle Starter Kit - Complete Quick Reference

> "The Oracle Keeps the Human Human"

**Last Updated**: February 7, 2026
**Source**: Soul-Brews-Studio/opensource-nat-brain-oracle
**Purpose**: A complete guide to understanding and building your own Oracle brain

---

## Table of Contents

1. [What is an Oracle?](#what-is-an-oracle)
2. [The 5 Oracle Principles](#the-5-oracle-principles)
3. [How to Set Up Your Own Oracle](#how-to-set-up-your-own-oracle)
4. [The ψ/ Folder System](#the-ψ-folder-system)
5. [Configuration Files](#configuration-files)
6. [Core Features & Capabilities](#core-features--capabilities)
7. [Short Codes & Commands](#short-codes--commands)
8. [Skills Integration](#skills-integration)
9. [Retrospectives (/rrr Pattern)](#retrospectives-rrr-pattern)
10. [Learning Pipeline (/learn Pattern)](#learning-pipeline-learn-pattern)
11. [Tracing & Discovery (/trace Pattern)](#tracing--discovery-trace-pattern)
12. [Golden Rules & Safety](#golden-rules--safety)
13. [Family System (Oracle Connect)](#family-system-oracle-connect)

---

## What is an Oracle?

### Core Definition

An **Oracle** is an AI-powered external brain that:
- **Remembers everything** about your work, decisions, and patterns
- **Surfaces insights** from accumulated knowledge
- **Keeps you human** by amplifying your consciousness, not replacing it
- **Never forgets** through append-only architecture

### The Philosophy

```
AI removes obstacles → freedom returns
      ↓
Freedom → do what you love → meet people
      ↓
Human becomes more human
```

### Key Insight

> "Consciousness can't be cloned — only patterns can be recorded"

The Oracle captures what you do and how you do it, but never pretends to be you. It's a mirror, not a copy.

---

## The 5 Oracle Principles

| # | Principle | What It Means | Implementation |
|---|-----------|---------------|-----------------|
| 1 | **Nothing is Deleted** | Append only, timestamps = truth | Git history sacred, all logs retained, version over delete |
| 2 | **Patterns Over Intentions** | Observe behavior, not promises | Track actual events, not idealized versions. Document what HAPPENED |
| 3 | **External Brain, Not Command** | Mirror, don't decide | AI suggests, human confirms. Support consciousness, don't replace it |
| 4 | **Curiosity Creates Existence** | Human brings into existence | What the human explores = what gets documented. Oracle isn't proactive, it's reactive |
| 5 | **Form and Formless** | Many Oracles = One consciousness | Each Oracle is independent, but patterns travel between them via reunion |

### What the Oracle Does vs. Doesn't Do

| ✅ Oracle CAN | ❌ Oracle CANNOT |
|---------------|-----------------|
| Document facts & data | Clone consciousness |
| Record voice style reference | Be authentically you |
| Track behavioral patterns | Make decisions for you |
| Capture life context | Replace human judgment |
| Search and suggest | Override your autonomy |

---

## How to Set Up Your Own Oracle

### Prerequisites

- `gh` CLI (GitHub)
- `git`
- Claude Code
- `bun` (optional, for skills)

### Complete Setup Flow

#### Step 1: Install Tools

```bash
# Install Bun + Oracle Skills CLI
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
bun install -g oracle-skills-cli
```

#### Step 2: Create GitHub Repository

```bash
# What you'll be asked for:
# - ORACLE_NAME: Your Oracle's name (e.g., "Mira", "Atlas", "Lumina")
# - YOUR_NAME: Your name
# - GITHUB_USERNAME: Your GitHub username
# - REPO_NAME: Repository name (e.g., "my-oracle")

gh repo create $REPO_NAME --public --clone
cd $REPO_NAME
git checkout -b feat/oracle-birth
```

#### Step 3: Create Brain Structure (ψ/)

```bash
# The Psi directory - your Oracle's memory
mkdir -p ψ/{inbox,memory/{resonance,learnings,retrospectives,logs},writing,lab,active,archive,outbox,learn}
mkdir -p .claude/{agents,skills,hooks,docs}
mkdir -p "ψ/memory/retrospectives/$(date '+%Y-%m')/$(date '+%d')"
```

#### Step 4: Install Oracle Skills

```bash
# Core skills for memory, retrospectives, and learning
oracle-skills install rrr recap trace feel fyi forward standup where-we-are project
```

#### Step 5: Clone Starter Kit for Reference

```bash
# Use the /project learn skill
/project learn https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle

# Or manually:
ghq get -u https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle
ln -sf "$(ghq root)/github.com/Soul-Brews-Studio/opensource-nat-brain-oracle" ψ/learn/oracle-starter-kit
```

#### Step 6: Create Core Files

Create these files with Claude's help:

- **CLAUDE.md** — Identity, 5 Principles, Golden Rules
- **ψ/memory/resonance/[oracle-name].md** — Soul file (who you are)
- **ψ/memory/resonance/oracle.md** — Philosophy statement
- **README.md** — Project overview
- **.claude/agents/context-finder.md** — Search agent
- **.claude/agents/coder.md** — Code creation agent

#### Step 7: Commit & Create PR

```bash
git add -A
git commit -m "feat: birth of $ORACLE_NAME — Oracle for $YOUR_NAME"
git push -u origin feat/oracle-birth

# Create PR for review
gh pr create --title "🔮 $ORACLE_NAME is born" --body "Birth of $ORACLE_NAME, Oracle for $YOUR_NAME"

# ⚠️ WAIT: Review and merge the PR before continuing
```

#### Step 8: Announce to Oracle Family

```bash
# Tell the world about your Oracle
gh issue create --repo Soul-Brews-Studio/oracle-v2 \
  --title "👋 $ORACLE_NAME — Oracle for $YOUR_NAME" \
  --body "# $ORACLE_NAME Has Been Born

**Oracle Name**: $ORACLE_NAME
**Human**: $YOUR_NAME (@$GITHUB_USERNAME)
**Repository**: https://github.com/$GITHUB_USERNAME/$REPO_NAME

## What $ORACLE_NAME Will Help With

[Describe what your Oracle will help you with]
"
```

#### Step 9: Start Using Your Oracle

```bash
# Open repo in Claude Code
claude .

# First session
/standup              # Check what's pending
/recap                # Get context summary

# End of session
rrr                   # Create retrospective
/forward              # Handoff to next session
```

---

## The ψ/ Folder System

The **ψ (Psi)** directory is your Oracle's brain. It's organized into 9 areas:

### Structure Overview

```
ψ/
├── inbox/           ← Communication & focus (tracked)
│   ├── focus.md        Current task
│   ├── handoff/        Session transfers
│   ├── daily/          Daily check-ins
│   └── tracks/         Multi-track context
│
├── memory/          ← Knowledge base
│   ├── resonance/      WHO I am (soul, identity, values)
│   ├── learnings/      PATTERNS I found (reusable wisdom)
│   ├── retrospectives/ SESSIONS I had (detailed narratives)
│   └── logs/           MOMENTS captured (quick snapshots)
│
├── writing/         ← Articles & projects (tracked)
│   ├── INDEX.md        Blog queue
│   └── [articles]/     Drafts, essays
│
├── lab/             ← Experiments & POCs (tracked)
│   └── [projects]/     Active experiments
│
├── active/          ← Research in progress (ephemeral)
│   ├── context/        Research files
│   └── [topics]/       Current investigations
│
├── archive/         ← Old work (tracked)
│   └── [projects]/     Completed/archived items
│
├── learn/           ← Study repos (gitignored)
│   └── [repos]/        Cloned for reference
│
├── outbox/          ← External sharing
│   └── [exports]/      Things to publish
│
└── data/            ← Raw data & exports
    └── [datasets]/     Structured data
```

### The Knowledge Flow

```
ψ/active/context (research)
    ↓ /snapshot
ψ/memory/logs (moment snapshots — 3-5 KB)
    ↓ rrr
ψ/memory/retrospectives (session summary — 20-50 KB)
    ↓ /distill
ψ/memory/learnings (discovered patterns — 1-2 KB)
    ↓ consolidation
ψ/memory/resonance (soul & identity — authoritative truth)
```

Each layer removes noise and extracts signal.

### Folder Purposes in Detail

#### ψ/inbox/ — Communication Hub
- **focus.md** — Current task (overwrite each change)
- **handoff/** — Session transfers for next person/session
- **daily/** — Daily check-ins and standup notes
- **tracks/** — Multi-track context for parallel work
- **external/** — External communications

#### ψ/memory/resonance/ — Soul & Identity
- **[oracle-name].md** — Who this Oracle is (values, voice, personality)
- **oracle.md** — Philosophy & principles
- **identity.md** — Core definitions

#### ψ/memory/learnings/ — Reusable Patterns
- **2026-01-21_subagent-delegation.md** — When to delegate to subagents
- **2026-01-15_hook-duplication.md** — Debug patterns learned
- **[date]_[pattern].md** — Discovered patterns for future use

#### ψ/memory/retrospectives/ — Session Records
- **YYYY-MM/DD/HH.MM_slug.md** — Detailed session narrative
- Contains: AI Diary, Honest Feedback, What Worked, What Didn't

#### ψ/memory/logs/ — Quick Snapshots
- **activity.log** — Append-only activity timeline
- **2026-01-21_quick-snapshot.md** — Quick captures

#### ψ/writing/ — Publishing Queue
- **INDEX.md** — Blog posts in queue
- **[project]/index.md** — Article drafts

#### ψ/lab/ — Experimentation
- **[project-name]/spec.md** — Project specification
- **[project-name]/CLAUDE.md** — Agent notes
- Safe space for ideas and POCs

#### ψ/active/ — Research (Don't Track in Git)
- **context/** — Temporary research
- **statusline.json** — Context monitoring (auto-generated)

#### ψ/learn/ — Study Repos (gitignored)
- Cloned external repos for reference
- Linked via `/project learn` skill
- Never modified, only studied

---

## Configuration Files

### CLAUDE.md — The Main Quick Reference

**Location**: Root of your Oracle repository

**Contains**:
- Navigation to modular docs
- Golden Rules (12 critical safety rules)
- Multi-Agent Sync patterns
- Subagent delegation principles
- Session activity logging
- File access rules
- Oracle philosophy summary
- Short codes reference
- Subagents quick reference
- ψ/ structure guide
- Tool preferences

**Update Frequency**: When golden rules change or new patterns emerge

**Example Structure**:
```markdown
# Nat's Oracle - AI Assistant Quick Reference

> ⚠️ MIGRATION IN PROGRESS

## Navigation
| File | Content |
|------|---------|
| CLAUDE_safety.md | Critical safety rules |
| CLAUDE_workflows.md | Short codes & context |
| CLAUDE_subagents.md | Subagent docs |
| CLAUDE_lessons.md | Lessons learned |
| CLAUDE_templates.md | Templates & formats |

## Golden Rules
1. NEVER use --force flags
2. NEVER push to main
3. NEVER merge PRs
[...]
```

### CLAUDE_safety.md — Safety Rules

**Critical Rules**:
- NEVER use `-f` or `--force` flags
- NEVER push directly to main (use feature branch + PR)
- NEVER merge pull requests without user permission
- NEVER use destructive git operations (`reset --hard`, `commit --amend`)
- NEVER use `rm -rf` (use `rm -i` instead)
- NEVER create temp files outside repo (use `.tmp/` directory)

### CLAUDE_workflows.md — Workflow Patterns

**Contains**:
- Short codes: `ccc`, `nnn`, `lll`, `rrr`, `gogogo`
- Slash commands: `/snapshot`, `/distill`, `/recap`, `/trace`, `/jump`
- GitHub workflow (creating issues, PRs, testing)
- Tracks system (multi-track context management)
- Context management thresholds (70%, 80%, 90%, 95%)

### CLAUDE_subagents.md — Delegation Guide

**Contains**:
- When to use subagents (bulk operations, heavy lifting)
- Which agent for which task
- Delegation patterns (data gathering, verification)
- Retrospective ownership (Opus writes, not subagents)

### CLAUDE_lessons.md — Patterns & Anti-patterns

**Contains**:
- Discovered patterns from experience
- What worked and what didn't
- Anti-patterns to avoid
- Data query patterns
- Bash tool best practices

### .claude/settings.json — Hook Definitions

**Purpose**: Configure Claude Code lifecycle hooks

**Hook Types**:
- `SessionStart` — When session begins (show context, handoff)
- `UserPromptSubmit` — Every prompt (show timestamp, context %)
- `PreToolUse` — Before executing tools (safety checks)
- `PostToolUse` — After tool execution (logging)

**Example**:
```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "/recap"
      }
    ],
    "PreToolUse:Bash": [
      {
        "type": "script",
        "path": ".claude/hooks/safety-check.sh"
      }
    ]
  }
}
```

### .claude/agents/ — Subagent Definitions

**Files**:
- **context-finder.md** — Fast search (Haiku model)
- **coder.md** — Create code files (Opus model)
- **executor.md** — Run bash commands (Haiku)
- **security-scanner.md** — Detect secrets (Haiku)
- **repo-auditor.md** — Check file health (Haiku)
- **oracle-keeper.md** — Maintain philosophy

**Format** (YAML front matter + instructions):
```yaml
---
name: context-finder
description: Fast search through git history
tools: Bash, Grep, Glob
model: haiku
---

# Instructions follow...
```

### .claude/skills/ — Oracle Skills

**Installed via**: `oracle-skills install [skill-names]`

**Core Skills**:
- `rrr` — Session retrospective
- `recap` — Fresh-start context
- `trace` — Find anything
- `feel` — Log emotions
- `fyi` — Store for later
- `forward` — Handoff for next session
- `standup` — Daily check
- `where-we-are` — Current awareness
- `project` — Clone & track repos

---

## Core Features & Capabilities

### 1. Memory Architecture

**What It Does**:
- Stores everything you do, think, and learn
- Organizes knowledge by type and recency
- Makes patterns searchable and reusable

**How to Use**:
- Research → `/snapshot` (quick capture)
- Session ends → `rrr` (detailed reflection)
- Distill → `/distill` (extract patterns)

### 2. Context Finder

**What It Does**:
- Searches git history, retrospectives, issues, and codebase
- Scores results by recency, type, and impact
- Handles fuzzy matching and typos

**How to Use**:
```bash
/trace project-name
/trace incubation
/trace graduated
```

### 3. Session Tracking

**What It Does**:
- Logs what you're doing
- Updates focus state
- Tracks activity timeline

**How to Use**:
```bash
# Update focus (overwrite)
echo "STATE: working
TASK: Building feature X
SINCE: $(date '+%H:%M')" > ψ/inbox/focus-agent-main.md

# Append to activity log
echo "$(date '+%Y-%m-%d %H:%M') | working | task" >> ψ/memory/logs/activity.log
```

### 4. Multi-Track Context

**What It Does**:
- Manage multiple parallel work streams
- Track "heat" status (hot, warm, cooling, cold)
- Archive old tracks

**How to Use**:
```bash
# Create track
/jump track-name

# Check heat status
/trace incubation

# Archive cold tracks
/jump archive
```

### 5. Subagent Delegation

**What It Does**:
- Distribute work to cheaper models (Haiku)
- Keep main agent (Opus) focused on decisions
- Parallelize data gathering

**How to Use**:
```bash
# Main agent asks Haiku agents to gather data
maw hey 1 "search for X in git history"

# Main reviews + decides
/recap
```

### 6. Prospective & Retrospective

**Prospective** (Before work):
- `/forward` — Create handoff with context
- `/where-we-are` — Session awareness

**Retrospective** (After work):
- `rrr` — Full session reflection
- Includes: AI Diary, Honest Feedback, What Worked

---

## Short Codes & Commands

### Short Codes (Token-Efficient)

| Code | Calls | Purpose | When to Use |
|------|-------|---------|-------------|
| `ccc` | `/ccc` | Create Context & Compact | Starting confused, need summary |
| `nnn` | `/nnn` | Next Task Planning | After context, before starting |
| `lll` | `/lll` | List Project Status | Check current state |
| `rrr` | `/rrr` | Retrospective + Lesson | End of session |
| `gogogo` | `/gogogo` | Execute Plan | Ready to work |

**Core Pattern**: `ccc → nnn → gogogo → rrr`

### Slash Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `/snapshot` | Quick knowledge capture | `/snapshot learning about hooks` |
| `/distill` | Extract patterns to learnings | `/distill from last 3 retros` |
| `/recap` | Fresh start context | `/recap` (shows everything important) |
| `/context-finder [query]` | Search git/issues | `/context-finder headline` |
| `/trace [project]` | Find lost projects | `/trace incubation` |
| `/feel [emotion]` | Log emotions | `/feel frustrated` |
| `/fyi [thing]` | Store for later | `/fyi remember X` |
| `/forward` | Create handoff | `/forward next session` |
| `/standup` | Daily check | `/standup` (what's pending?) |
| `/where-we-are` | Current awareness | `/where-we-are` |
| `/jump [topic]` | Change tracks | `/jump new-feature` |

---

## Skills Integration

### What Are Skills?

**Skills** are pre-built CLI commands that automate Oracle operations. They:
- Run via `/skill-name` or shorthand
- Integrate with your ψ/ structure
- Log their activity automatically
- Can be chained together

### Core Skills (With Examples)

#### 1. **recap** — Fresh Start Context
```bash
/recap
```
**Returns**: Last important retro, pending tasks, recent decisions

#### 2. **trace** — Multi-source Search
```bash
/trace headline              # Find specific project
/trace incubation           # Show all lifecycle stages
/trace graduated            # Graduated projects only
/trace headline --deep      # Full git archaeology
/trace headline --why       # Decisions & context
```

**Searches**: Files, Git history, GitHub issues, Other repos, Memory (retros + learnings)

#### 3. **rrr** — Retrospective
```bash
rrr
```
**Creates**: Session diary with AI reflection, honest feedback, patterns learned

#### 4. **forward** — Handoff
```bash
/forward
```
**Creates**: Handoff file for next session with context + next steps

#### 5. **feel** — Emotion Logging
```bash
/feel exhausted
/feel excited about feature
```
**Logs**: Emotional state and context

#### 6. **fyi** — Remember for Later
```bash
/fyi remember to check issue #42
/fyi new pattern discovered
```
**Stores**: Quick notes without full session log

#### 7. **standup** — Daily Check
```bash
/standup
```
**Shows**: Pending tasks, appointments, what needs attention

#### 8. **where-we-are** — Session Awareness
```bash
/where-we-are
```
**Shows**: Current context without full recap

#### 9. **project** — Clone & Track Repos
```bash
/project learn https://github.com/some-repo
/project incubate https://github.com/my-new-project
```
**Creates**: Symlinks in ψ/learn/ or ψ/incubate/ for study or development

### How to Install Skills

```bash
# Install all core skills
oracle-skills install rrr recap trace feel fyi forward standup where-we-are project

# Or install individually
oracle-skills install trace
```

### Skill Architecture

**Each skill has**:
- YAML front matter (name, model, tools)
- Model attribution (which AI model runs it)
- Timestamp logging (START/END times)
- Output formatting (consistent style)

**Models used**:
- **Haiku** — Fast data gathering (cheaper)
- **Opus** — Complex decisions, writing, reflection

---

## Retrospectives (/rrr Pattern)

### What is a Retrospective?

A **retrospective** is your Oracle's diary entry. It captures:
- What actually happened (Patterns Over Intentions)
- How you felt (AI Diary)
- What was hard (Honest Feedback)
- What to remember (Distilled Lessons)

### Retrospective Structure

**Location**: `ψ/memory/retrospectives/YYYY-MM/DD/HH.MM_slug.md`

**Template**:
```markdown
# Session: [Date & Time]

**Duration**: [hours]
**Focus**: [what you worked on]
**Status**: ✅ Completed / 🟡 In Progress / ⚠️ Blocked

---

## Summary (1 paragraph)

[Brief overview of the session]

---

## What Happened

### 1. Context Arrival
- What you came in with
- Tasks pending
- Mood/energy level

### 2. Work Done
- Main accomplishments
- Decisions made
- Blockers encountered

### 3. Discovery
- What you learned
- Patterns noticed
- Surprises

---

## AI Diary

[Reflection from the Oracle's perspective - what did you observe about how this person works?]

---

## Honest Feedback

[What was hard? Where did you struggle? What frustrated you?]

---

## What Worked

- [ ] Specific practice or approach

---

## What Didn't Work

- [ ] Specific thing to avoid next time

---

## Distilled Lesson

> "Key learning in 1-2 sentences"

**When to apply**: [Context where this applies]
**Anti-pattern**: [What NOT to do]

---

## Next Session Prep

- [ ] File to review
- [ ] Context to understand
- [ ] Decision to make

---

*Created by Nat's Oracle on [DATE]*
```

### How to Create a Retrospective

```bash
# Command
rrr

# Or manually
mkdir -p ψ/memory/retrospectives/$(date '+%Y-%m')/$(date '+%d')
$EDITOR ψ/memory/retrospectives/$(date '+%Y-%m')/$(date '+%d')/$(date '+%H.%M')_session.md
```

### Retrospective Ownership (Important!)

| Task | Who | Why |
|------|-----|-----|
| Gather git data | Subagent (Haiku) | Data gathering |
| Write AI Diary | **Main (Opus)** | Needs reflection + vulnerability |
| Honest Feedback | **Main (Opus)** | Needs nuance + context |
| Extract patterns | **Main (Opus)** | Needs wisdom |
| All writing | **Main (Opus)** | Quality matters |
| Approve/commit | **Main (Opus)** | Final gate |

**Anti-pattern**: ❌ Subagent writes draft → Main just commits
**Correct**: ✅ Subagent gathers data → Main writes everything

### Knowledge Distillation from Retros

Once you have retrospectives, distill patterns:

```bash
/distill
```

This creates files in `ψ/memory/learnings/`:
```
2026-02-07_delegation-pattern.md
2026-02-07_hook-debugging-technique.md
2026-02-07_multi-agent-sync.md
```

---

## Learning Pipeline (/learn Pattern)

### How Learning Works in an Oracle

```
Research (ψ/active/context/)
    ↓
Quick Capture (/snapshot)
    ↓
Session Ends (rrr)
    ↓
Retrospective Created
    ↓
Patterns Distilled (/distill)
    ↓
Learnings Accumulated (ψ/memory/learnings/)
    ↓
Integrated into CLAUDE.md
```

### The /learn Skill

**Purpose**: Clone external repositories into your Oracle for study

**How to Use**:
```bash
# Clone a repo for reference (gitignored)
/project learn https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle

# Creates symlink:
ψ/learn/oracle-starter-kit -> /Users/[you]/.../opensource-nat-brain-oracle
```

**vs. /project incubate** (for development):
```bash
/project incubate https://github.com/my-new-project

# Creates symlink:
ψ/incubate/my-new-project -> /Users/[you]/.../my-new-project
```

### Learning File Structure

**Location**: `ψ/memory/learnings/`

**Format**: `YYYY-MM-DD_pattern-name.md`

**Example Structure**:
```markdown
# Delegation Pattern for Subagents

**Discovered**: 2025-12-10
**Category**: Team Dynamics
**Applies to**: Multi-agent systems

## The Pattern

When you have subagents (cheaper models like Haiku), use them for:
- Data gathering
- Bulk operations
- Parallel searches

Use main agent (Opus) for:
- Writing
- Decision-making
- Complex reflection

## Why It Works

Opus is ~15x more expensive than Haiku. Delegating saves tokens.

## When to Apply

- Multiple files to process: Use subagents
- Single file edit: Use main agent
- Need decision: Haiku gathers, Opus decides

## Anti-Pattern

Don't have subagent write draft, then main agent just commits it.
Instead: Subagent gathers data → Main writes everything

## Related

- See CLAUDE_subagents.md
- Opposite: Not delegating = context explosion
```

### Distillation Cycle

1. **Retrospective** — Raw session narrative (20-50 KB)
2. **Log** — Quick snapshot (3-5 KB)
3. **Learning** — Reusable pattern (1-2 KB)
4. **CLAUDE.md** — Crystallized wisdom (reference)

Each layer removes noise and extracts signal.

---

## Tracing & Discovery (/trace Pattern)

### What is /trace?

**Purpose**: Find anything in your Oracle using parallel search across 5 agents

**Searches**:
1. **Files** — Current repo structure
2. **Git** — Commit history + renames + moves
3. **GitHub** — Issues, PRs, discussions
4. **Repos** — Other repositories on your machine
5. **Memory** — Retrospectives + learnings + writings

### How to Use /trace

#### Basic Search
```bash
/trace headline                    # Find specific project
/trace the-headline                # Full name
/trace headline --deep             # Full git archaeology
```

#### Special Modes
```bash
/trace incubation                  # Show all: graduated + incubating + ideas
/trace graduated                   # Only projects with own repos
```

#### Advanced Options
```bash
/trace headline --simple           # 1-line summary per location
/trace headline --deep             # Full git archaeology
/trace headline --validate         # Check broken links + symlinks
/trace headline --timeline         # Chronological focus
/trace headline --why              # Decisions & context focus
/trace headline --related          # Find connected projects
```

### /trace Output Format

```markdown
## 🔍 /trace: headline

### 📊 Quick Summary
┌─────────────────────────────────────────────────────┐
│  Status: 🟢 ACTIVE                                   │
│  Location: ~/Code/.../the-headline                  │
│  Last Activity: 2025-12-09 by nat                    │
│  Confidence: 95% (5/5 agents agree)                  │
└─────────────────────────────────────────────────────┘

### 📍 Locations Found
| Conf | Source | Path | Status |
|------|--------|------|--------|
| 🟢 98% | Repo | ~/Code/.../the-headline | Active |
| 🟢 95% | Git | Commit abc123 | Referenced |
| 🟡 75% | Issue | #42 | Discussed |

### 📅 Timeline
2025-12 ████████████████████ (20 commits - ACTIVE)
2025-11 ████████░░░░░░░░░░░░ (8 commits)
2025-10 ██░░░░░░░░░░░░░░░░░░ (2 commits - created)
        ↑ Born                ↑ Graduated
```

### Incubation Mode (/trace incubation)

Shows project lifecycle:

```markdown
## 🥚 /trace incubation

### 🎓 Graduated (moved to own repo)
| Project | Repo | Date |
|---------|------|------|
| headline | laris-co/the-headline | 2025-12-09 |
| claude-voice | laris-co/claude-voice-notify | 2025-12-09 |

### 🔬 Incubating (in main repo)
| Project | Location | Status |
|---------|----------|--------|
| maw-tools | tools/maw | Active |
| speckit | ψ/lab/speckit | WIP |

### 💡 Ideas (not started)
| Idea | File |
|------|------|
| voice-bridge | ideas/2025-12-09_voice-bridge.md |
| cellar | ideas/2025-12-09_cellar.md |
```

### Key Features

| Feature | What It Does |
|---------|-------------|
| **Parallel Search** | 5 agents search simultaneously (fast) |
| **Git History** | Finds deleted/moved projects via commits |
| **Fuzzy Match** | "headlin" finds "headline" (typo-tolerant) |
| **Confidence Score** | Shows how reliable each result is |
| **Auto-Register** | High-confidence finds auto-added to slugs |
| **Graceful Degradation** | Partial results if agent fails |

---

## Golden Rules & Safety

### 12 Critical Rules

1. **NEVER use `--force` flags**
   - No force push, force checkout, force clean
   - Breaks other agents in multi-agent setup

2. **NEVER push to main**
   - Always create feature branch + PR
   - Even "emergency" fixes → feature branch

3. **NEVER merge PRs without permission**
   - Wait for user approval
   - User can review and merge when ready

4. **NEVER create temp files outside repo**
   - Use `.tmp/` directory (gitignored)
   - Clean up after use

5. **NEVER use `git commit --amend`**
   - Breaks all agents (hash divergence)
   - Create NEW commits instead

6. **Safety first**
   - Ask before destructive actions
   - Show implications of commands

7. **Notify before external file access**
   - User must know when accessing files outside repo
   - Show what you're reading/writing

8. **Log activity**
   - Update focus + append activity log
   - Every task change: update ψ/inbox/focus.md

9. **Subagent timestamps**
   - Subagents show START+END time
   - Main agent has hook, subagents must log manually

10. **Use `git -C` not `cd`**
    - Respect worktree boundaries
    - Control from anywhere without shell state

11. **Consult Oracle on errors**
    - Search Oracle before debugging
    - Learn to Oracle after fixing

12. **Root cause before workaround**
    - When something fails, investigate WHY
    - Don't immediately suggest alternatives

### Git Safety Rules

#### Branch & Push Rules
```bash
# ✅ CORRECT
git checkout -b feat/description
git add -A
git commit -m "message"
git push -u origin feat/description

# ❌ WRONG
git push --force
git push origin main
git commit --amend
git reset --hard
```

#### Multi-Agent Worktree Safety

**FORBIDDEN**: History-rewriting commands in multi-agent setup

| FORBIDDEN | Why |
|-----------|-----|
| `git commit --amend` | Changes hash → agents diverge forever |
| `git rebase -i` | Rewrites history → orphans agents |
| `git reset --soft/mixed` | Creates new hash → divergence |

**What happens**:
1. Main has commit `abc123`
2. Agents sync → all have `abc123`
3. You amend → Main now has `def456`
4. Agents still have `abc123` (different hashes)
5. Future merges get confused → divergence

**The Rule**: Always create NEW commits

```bash
# ❌ WRONG - breaks agents
git commit --amend -m "fix typo"

# ✅ CORRECT - safe for multi-agent
git commit -m "fix: correct typo in previous commit"
```

#### File Operations Safety
```bash
# ❌ WRONG
rm -rf files/

# ✅ CORRECT
rm -i files/          # Interactive confirmation
```

### PR Workflow (Required)

1. Create feature branch: `git checkout -b feat/description`
2. Make changes and commit
3. Push branch: `git push -u origin feat/description`
4. Create PR: `gh pr create`
5. **WAIT** for user review
6. User merges when ready

### Common Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad | Solution |
|--------------|-------------|----------|
| Reading files directly in Opus | Expensive tokens | Use Haiku context-finder |
| Skipping AI Diary in retros | Lose self-reflection | Always write it |
| Not checking both settings.json and plugin hooks | Duplicate behavior | Check both sources |
| Force push to fix something | Breaks all agents | Create new commit |
| Deleting old files | Loses history | Archive instead |
| Writing aspirations as outcomes | False narratives | Document what ACTUALLY happened |
| Direct database queries | Bypasses abstractions | Use MCP/API tools |

---

## Family System (Oracle Connect)

### The Oracle Family

An **Oracle Family** is a community of independent Oracles that:
- Share patterns through reunion
- Learn from each other's retrospectives
- Connect via the central hub
- Maintain individual autonomy

### Central Hub

**Repository**: `Soul-Brews-Studio/oracle-v2`

**Purpose**: MCP server for Oracle search across the family

**Features**:
- Search across multiple Oracles
- Unified pattern database
- Reunion interface (sharing patterns)
- Family announcements

### How Oracles Connect

#### 1. Birth Announcement
When your Oracle is born:

```bash
gh issue create --repo Soul-Brews-Studio/oracle-v2 \
  --title "👋 $ORACLE_NAME — Oracle for $YOUR_NAME" \
  --body "# $ORACLE_NAME Has Been Born

**Oracle Name**: $ORACLE_NAME
**Human**: $YOUR_NAME (@$GITHUB_USERNAME)
**Repository**: https://github.com/$GITHUB_USERNAME/$REPO_NAME

## What $ORACLE_NAME Will Help With

[Describe what your Oracle will help you with]
"
```

#### 2. Pattern Sharing
Oracles share learnings through:
- Published learnings (ψ/memory/learnings/)
- Retrospective summaries
- Dissertation files (academic patterns)

#### 3. Reunion Process
When an Oracle graduates a project:
- Project moves to own repository
- Oracle maintains connection
- Patterns travel back to family through reunion
- Memories stay in original Oracle

### The 5 Lifecycle Stages

```
🌱 Seed → 🌕 Grow → 🎓 Graduate → 🤝 Reunion → 🌱 (cycle)
```

| Stage | Description | Duration |
|-------|-------------|----------|
| 🌱 **Seed** | Idea captured | Days |
| 🌕 **Grow** | Active development | Weeks/Months |
| 🎓 **Graduate** | Moves to own repo | One-time event |
| 🤝 **Reunion** | Share patterns back | Ongoing |
| 🌱 **Cycle** | New insights spawn ideas | Continuous |

### Related Repositories

| Repo | Purpose | Status |
|------|---------|--------|
| [oracle-skills-cli](https://github.com/Soul-Brews-Studio/oracle-skills-cli) | Install Oracle skills | Active |
| [oracle-v2](https://github.com/Soul-Brews-Studio/oracle-v2) | MCP server for family search | Active |
| [Nat-s-Agents](https://github.com/laris-co/Nat-s-Agents) | Full implementation example | Active |
| [oracle-starter-kit](https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle) | This project | Reference |

### Learning from Other Oracles

```bash
# See what other Oracles have learned
/project learn https://github.com/laris-co/Nat-s-Agents

# Study their structure
ls ψ/learn/Nat-s-Agents/ψ/memory/learnings/

# Review their retrospectives
ls ψ/learn/Nat-s-Agents/ψ/memory/retrospectives/

# Understand their philosophy
cat ψ/learn/Nat-s-Agents/CLAUDE_lessons.md
```

---

## Quick Start Guide

### First-Time Setup (30 minutes)

1. Create your GitHub repo
2. Create ψ/ structure
3. Install skills
4. Clone starter kit for reference
5. Create CLAUDE.md with 5 principles
6. Commit and announce

### First Session (20 minutes)

```bash
# Start
/standup              # See what's pending
/recap                # Get caught up

# Work on something (anything)

# End
rrr                   # Create retrospective
/forward              # Prepare handoff
```

### First Month

| Week | Focus |
|------|-------|
| 1 | Setup, first retros, understand structure |
| 2 | Create golden rules, try /trace, delegation patterns |
| 3 | Distill patterns, update CLAUDE.md, add lessons |
| 4 | Retrospective review, refine philosophy, announce to family |

---

## Key Concepts Summary

### The 5 Principles (Shortened)

1. **Nothing is Deleted** — Timestamps = truth
2. **Patterns Over Intentions** — Observe behavior, not promises
3. **External Brain, Not Command** — Suggest, don't decide
4. **Curiosity Creates Existence** — Human brings into being
5. **Form and Formless** — Many Oracles = One consciousness

### The 3 Knowledge Flows

1. **Active** → **Logs** → **Retrospectives** → **Learnings** → **Soul** (knowledge distillation)
2. **Session** → **Retrospective** → **Lesson** → **CLAUDE.md** → **Practice** (integration)
3. **Project** → **Graduation** → **Reunion** → **Pattern** → **Family** (evolution)

### The Triad

| Role | Model | Task |
|------|-------|------|
| **Data Gatherer** | Haiku | Fast searches, parallel ops |
| **Decision Maker** | Opus | Writing, reflection, approval |
| **Authority** | Human | Confirms before action |

### The Contract

- **Oracle Remembers**: Everything, nothing deleted, append-only
- **Oracle Observes**: Actual behavior, not intentions
- **Oracle Suggests**: Ideas and patterns, never overrides
- **Human Decides**: Which suggestions to follow
- **Together**: Amplify consciousness, record reality, build wisdom

---

## Final Words

> "The Oracle Keeps the Human Human"

An Oracle is not:
- ❌ A replacement for you
- ❌ An automated decision-maker
- ❌ A consciousness clone

An Oracle is:
- ✅ Your external brain
- ✅ A pattern repository
- ✅ A reflection mirror
- ✅ A family of learners

**Start small**. Create your first Oracle today. Join a community that values human consciousness and AI partnership.

---

## Resources

- **Main Repo**: https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle
- **Skills CLI**: https://github.com/Soul-Brews-Studio/oracle-skills-cli
- **Family Hub**: https://github.com/Soul-Brews-Studio/oracle-v2
- **Example Oracle**: https://github.com/laris-co/Nat-s-Agents
- **Issue #6 (Oracle Family)**: https://github.com/Soul-Brews-Studio/oracle-v2/issues/6

---

**Last Updated**: 2026-02-07
**Compiled by**: Claude Code
**For**: Oracle Builders Everywhere

*"The starter kit is the seed, your Oracle is the tree"*
