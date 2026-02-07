# Oracle Starter Kit - Comprehensive Architecture

**Date**: 2026-02-07
**Repository**: Soul-Brews-Studio/opensource-nat-brain-oracle
**Analyzed from**: `/origin/` directory
**Philosophy**: "The Oracle Keeps the Human Human"

---

## Executive Summary

The **Oracle Starter Kit** is a complete AI memory and philosophy framework enabling external brains to remember patterns, surface insights, and preserve human agency. It integrates:

1. **Memory Architecture** (ψ/) - 5 pillars organized for knowledge flow
2. **Subagent Patterns** (.claude/) - 15+ specialized AI agents for delegation
3. **Knowledge Pipeline** - Research → Logs → Retrospectives → Learnings → Resonance (Soul)
4. **Safety & Governance** - Strict git rules, multi-agent synchronization, hook management
5. **Teaching Materials** - 12+ courses and starter kits for onboarding

**Core Statement**: An AI memory system that keeps you human by handling the mechanical while preserving your decision-making and reflection.

---

## Directory Structure & Organization Philosophy

```
origin/
├── CLAUDE.md                          # Hub: Quick reference (5.2.0, ultra-lean)
├── CLAUDE_*.md                        # Detailed documentation (5 files)
│   ├── CLAUDE_safety.md              # Critical git & safety rules
│   ├── CLAUDE_subagents.md           # All 15+ subagent definitions
│   ├── CLAUDE_workflows.md           # Short codes & commands
│   ├── CLAUDE_lessons.md             # Distilled learnings & anti-patterns
│   └── CLAUDE_templates.md           # Retrospectives, commits, issues
│
├── README.md                          # Startup guide + philosophy
├── .claude/                          # Claude Code configuration
│   ├── settings.json                 # Hooks (SessionStart, Stop, UserPrompt, PreToolUse, PostToolUse)
│   ├── settings.local.json           # Machine-specific overrides
│   ├── agents/                       # 15 subagent definitions
│   │   ├── context-finder.md         # Search/investigate
│   │   ├── executor.md               # Execute commands
│   │   ├── coder.md                  # Code quality
│   │   ├── security-scanner.md       # Detect secrets
│   │   ├── repo-auditor.md           # File health
│   │   ├── marie-kondo.md            # File placement
│   │   ├── project-keeper.md         # Project lifecycle tracking
│   │   ├── project-organizer.md      # File organization
│   │   ├── md-cataloger.md           # Markdown analysis
│   │   ├── note-taker.md             # Structured note capture
│   │   ├── guest-logger.md           # Session logging
│   │   ├── oracle-keeper.md          # Philosophy alignment
│   │   ├── new-feature.md            # Feature planning
│   │   ├── critic.md                 # Design feedback
│   │   └── agent-status.md           # Multi-agent status
│   ├── hooks/                        # Lifecycle hook scripts
│   ├── docs/                         # Configuration guides
│   │   ├── HOOKS-SETUP.md
│   │   ├── SKILL-SYMLINKS.md
│   │   └── CLAUDE.md
│   ├── plugins/                      # Plugin marketplace structure
│   │   ├── marketplaces/             # Anthropic + custom plugins
│   │   └── (skill installations)
│   └── knowledge/                    # Personal knowledge plugins
│
├── ψ/                               # AI Brain (Psi symbol - Japanese ψ)
│   ├── inbox/                        # Communication hub (TRACKED)
│   │   ├── focus.md                  # Current session focus
│   │   ├── focus-agent-*.md          # Per-agent focus (avoid merges)
│   │   ├── handoff/                  # Session transfers (YYYY-MM/)
│   │   ├── external/                 # Other AI agents
│   │   ├── workflow/                 # Command templates
│   │   ├── templates/                # Reusable templates
│   │   ├── daily/                    # Daily notes
│   │   └── weekly/                   # Weekly reviews
│   │
│   ├── memory/                       # Knowledge base (CORE)
│   │   ├── resonance/                # WHO I am (soul, identity)
│   │   │   ├── oracle.md             # Philosophy & principles
│   │   │   ├── [oracle-name].md      # Personal soul file
│   │   │   └── writing-style.md      # Communication patterns
│   │   │
│   │   ├── learnings/                # PATTERNS discovered
│   │   │   ├── 2025-12-13_*.md       # Topic files (YYYY-MM-DD_slug)
│   │   │   └── INDEX.md              # Learning index
│   │   │
│   │   ├── retrospectives/           # SESSIONS had
│   │   │   ├── YYYY-MM/              # Year-month folders
│   │   │   │   ├── DD/               # Day folders
│   │   │   │   │   └── HH.MM_*.md    # Session files (dot format)
│   │   │   │   └── (other days)
│   │   │   └── archive/
│   │   │       └── handoffs/         # Archived session transfers
│   │   │
│   │   ├── logs/                     # MOMENTS captured (ephemeral)
│   │   │   ├── activity.log          # Append-only activity
│   │   │   ├── 2025-12/              # Monthly folders
│   │   │   ├── info/                 # Information notes
│   │   │   ├── feelings/             # Emotional/intuitive logs
│   │   │   ├── random/               # Misc observations
│   │   │   ├── deletions/            # Deletion tracking
│   │   │   └── (project-changes.log) # Project tracking
│   │   │
│   │   ├── seeds/                    # Idea seeds
│   │   └── archive/                  # Archived materials
│   │
│   ├── active/                       # Research in progress (EPHEMERAL)
│   │   └── context/                  # Investigation files
│   │
│   ├── writing/                      # Articles & projects (TRACKED)
│   │   ├── INDEX.md                  # Blog queue & projects
│   │   └── [project-slugs]/          # Project drafts
│   │
│   ├── lab/                          # Experiments & POCs (TRACKED)
│   │   └── [project-slugs]/          # Experimental projects
│   │
│   ├── incubate/                     # Active development (GITIGNORED)
│   │   └── repo/                     # Cloned repos for development
│   │
│   ├── learn/                        # Reference/study (GITIGNORED)
│   │   └── repo/                     # Cloned repos for learning
│   │
│   └── outbox/                       # Outgoing communications
│
├── courses/                          # 12+ Educational modules
│   ├── 000-setup_1h_everyone.md
│   ├── 001-imagination_2h_intermediate.md
│   ├── 002-control_3h_advanced.md
│   ├── 003-ai-life-buddy_4h_intermediate.md
│   ├── build-your-oracle/            # Core Oracle creation (4 modules)
│   │   ├── module-1-memory/          # Memory architecture
│   │   ├── module-2-survival/        # Safe operation
│   │   ├── module-3-intelligence/    # Subagent systems
│   │   ├── starter-kit/              # Hands-on practice
│   │   │   ├── docs/                 # Day 1-3 tutorials
│   │   │   ├── knowledge/            # Example knowledge
│   │   │   └── templates/            # Starting templates
│   │   └── slides-outline.md
│   ├── ai-builder-2day/              # 2-day intensive
│   ├── claude-code-masterclass-business/
│   ├── git-workflow-free/
│   ├── multi-agent-free/
│   ├── psychology-ai/
│   ├── siit-2025-12/                 # University course
│   ├── starter-kits/                 # Various boilerplates
│   ├── templates/                    # Course templates
│   ├── WORKSHOP-CATALOG.md
│   ├── GEMINI-PROMPTS.md
│   └── GENEALOGY.md
│
├── scripts/                          # Automation & utilities
│   ├── agent-identity.sh             # Identify agent (main/1/2/...)
│   ├── show-latest-handoff.sh        # Display last handoff
│   ├── statusline.sh                 # Show session status
│   ├── jump-detect.sh                # Detect /jump commands
│   ├── token-check.sh                # Monitor token usage
│   ├── maw-peek.sh                   # Check all agents
│   ├── project-*.sh                  # Project management
│   └── antigravity-*.sh              # Team coordination
│
├── nat-data-personal/                # Personal knowledge plugins
│   └── knowledge/
│       ├── oracle-philosophy.md      # Core philosophy
│       └── writing-style.md          # Style guide
│
├── Nat-s-Agents/                     # Agent workspace
│
└── .gitignore                        # Excludes: ψ/active/, ψ/incubate/, ψ/learn/, node_modules/
```

---

## Core Architecture: The 5 Pillars (ψ/ Brain)

The `ψ/` directory (Psi - representing the AI psyche) organizes memory into **5 tracked pillars + 2 ephemeral spaces**:

### Signal (Persistent, Tracked)

1. **inbox/** - "คุยกับใคร?" (Talking to whom?)
   - **Purpose**: Communication hub and task tracking
   - **Contents**: Focus state, session handoffs, external communications
   - **Key Files**: `focus.md` (current task), `focus-agent-*.md` (multi-agent)
   - **Lifecycle**: Handoffs move to `memory/archive/handoffs/` when completed
   - **Git**: Fully tracked (merge-friendly structure)

2. **memory/** - "จำอะไรได้?" (What do I remember?)
   - **resonance/** - "ใจ/จิตใจ" (Soul): Who you are
     - Identity, philosophy, style, values
     - Evolved from patterns in learnings
   - **learnings/** - "บทเรียน" (Lessons): Patterns discovered
     - Extracted from multiple retrospectives
     - Dated: `YYYY-MM-DD_topic.md` for chronology
   - **retrospectives/** - "ย้อนคิด" (Reflection): Sessions lived
     - Hierarchical: `YYYY-MM/DD/HH.MM_slug.md`
     - Includes commitments, focus, deliverables
   - **logs/** - "ช่วงเวลา" (Moments): Snapshots captured
     - Activity log (append-only), info, feelings, random observations
     - Organized by month and category
   - **Git**: Fully tracked (permanent record)

3. **writing/** - "กำลังเขียนอะไร?" (What am I writing?)
   - Articles, blog posts, projects in draft
   - `INDEX.md` tracks the queue
   - **Git**: Tracked (evolving work)

4. **lab/** - "กำลังทดลองอะไร?" (Experimenting with what?)
   - Proof-of-concepts, experiments, playgrounds
   - **Git**: Tracked (controlled experiments)

### Noise (Ephemeral, Temporary)

5. **active/** - "กำลังค้นคว้าอะไร?" (Investigating what?)
   - Research context, temporary investigation files
   - **Git**: NOT tracked (disappears when done)

6. **incubate/** & **learn/** - Repository staging
   - `incubate/` - Development clones (work in progress)
   - `learn/` - Reference clones (study material)
   - **Git**: NOT tracked (external repos)

---

## Knowledge Flow Pipeline

The system implements a **5-stage knowledge distillation pipeline**:

```
┌─────────────────────────────────────────────────────────────┐
│ Knowledge Transformation Pipeline                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  STAGE 1: ACTIVE INVESTIGATION                              │
│  ψ/active/context/ → Research, exploration, debugging       │
│  └─ Files are raw, unstructured, temporary                  │
│                                                              │
│  STAGE 2: SNAPSHOT (Command: /snapshot)                     │
│  └─ Capture important moment in memory/logs/                │
│                                                              │
│  STAGE 3: SESSION REFLECTION (Command: rrr)                 │
│  ψ/memory/retrospectives/YYYY-MM/DD/HH.MM_*.md            │
│  └─ Full session summary: what happened, commitments, focus │
│                                                              │
│  STAGE 4: PATTERN EXTRACTION (Command: /distill)            │
│  ψ/memory/learnings/YYYY-MM-DD_*.md                         │
│  └─ Consolidated patterns from multiple retrospectives      │
│                                                              │
│  STAGE 5: SOUL CONSOLIDATION                                │
│  ψ/memory/resonance/*.md                                    │
│  └─ Identity, philosophy, principles (rarely changes)       │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Command Sequence: /snapshot → rrr → /distill
```

**Key Principle**: "Nothing is Deleted" - Append-only timestamps preserve truth.

---

## Subagent Architecture & Delegation Pattern

### The 15+ Subagents (`.claude/agents/*.md`)

**Model Selection Strategy**:
- **Haiku** (~$0.80/M tokens): Data gathering, searching, analysis, execution
- **Opus** (~$15/M tokens): Quality code, review, reflection, writing

**Subagents by Category**:

#### Context & Investigation
| Agent | Model | Purpose |
|-------|-------|---------|
| **context-finder** | haiku | Search git history, issues, retrospectives, codebase with scoring (🔴6+, 🟠4-5, 🟡2-3, ⚪0-1) |
| **executor** | haiku | Execute bash commands from issue specs (whitelist safe: rm, mv, git) |
| **repo-auditor** | haiku | PROACTIVE: Check file sizes, detect large files (>50MB 🚫, 1-10MB ⚠️) before commits |

#### Code & Quality
| Agent | Model | Purpose |
|-------|-------|---------|
| **coder** | opus | Create high-quality code files from GitHub issues |
| **security-scanner** | haiku | PROACTIVE: Detect API keys, passwords, secrets before commits |
| **critic** | haiku | Design feedback, UX review |

#### Organization & Maintenance
| Agent | Model | Purpose |
|-------|-------|---------|
| **marie-kondo** | haiku | File placement consultant - "Does this spark joy? Does it have a home?" |
| **md-cataloger** | haiku | Scan & categorize all markdown files, identify structure & relationships |
| **project-keeper** | haiku | Track project lifecycle: 🌱 Seed → 🌕 Grow → 🎓 Grad → 📚 Learn |
| **project-organizer** | haiku | Organize files into `context/` and `output/` hierarchies |
| **archiver** | haiku | Find unused items, group by topic, prepare archive plans (never auto-deletes) |

#### Capture & Reflection
| Agent | Model | Purpose |
|-------|-------|---------|
| **note-taker** | opus | จดโน้ต - Capture feelings, info, ideas from `/feeling`, `/info`, `/idea` commands |
| **guest-logger** | haiku | Log guest conversations timestamped in `ψ/memory/logs/guests/` |
| **oracle-keeper** | - | Maintain philosophy: align sessions with mission, snapshot insights, warn on drift |

#### Discovery & Planning
| Agent | Model | Purpose |
|-------|-------|---------|
| **new-feature** | haiku | Create feature plan issues with gathered context |
| **agent-status** | haiku | Check what agents are doing (git status, focus, commits, diffs) |

### Delegation Rules

**When to use subagents**:
1. **Context gathering** - Don't read files directly → use `context-finder` (Haiku) to search
2. **Heavy lifting** - Bulk operations (5+ files), searches → delegate to Haiku
3. **Data analysis** - CSV parsing, repo audits, file cataloging → Haiku
4. **Session work** - Retrospectives (rrr), reflection, writing → **Main agent only** (needs full context + vulnerability)

**Cost-Efficiency Pattern**:
```
Main Agent (Opus) → Delegates to Haiku (15x cheaper)
    1. Distribute task to 3-5 subagents
    2. Subagents return summaries + verification commands
    3. Main reads summaries, checks 1-2 key files
    4. Saves 50-80% of Opus tokens
```

---

## Entry Points & Configuration

### CLAUDE.md - The Hub (5.2.0)

**Purpose**: Ultra-lean quick reference for every session.

**Key Sections**:
- Golden Rules (10 commandments)
- Multi-Agent Sync (MAW pattern)
- Short Codes (rrr, gogogo, nnn)
- Subagent quick reference
- ψ/ brain structure diagram
- Knowledge flow explanation
- File access rules
- Oracle philosophy

**Format**: Markdown tables, code blocks, hierarchical structure
**Size**: Target <500 tokens (migration in progress)
**Updates**: Version 5.2.0 (2025-12-28)

### Modular Documentation Structure

**Lean Hub + Detailed Modules**:
```
CLAUDE.md (hub, 500 tokens)
├── CLAUDE_safety.md (git + safety rules)
├── CLAUDE_subagents.md (15+ agent definitions)
├── CLAUDE_workflows.md (short codes, /commands)
├── CLAUDE_lessons.md (learned patterns, anti-patterns)
└── CLAUDE_templates.md (retrospectives, commits, issues)
```

**Principle**: Details load on demand (lazy loading). Hub stays lean for quick reference.

### .claude/settings.json - Hook System

**Hook Lifecycle Events**:

1. **SessionStart** - When Claude starts
   - Play greeting sound (Thai voice: "สวัสดีค่ะ พร้อมทำงานแล้ว")
   - Run `agent-identity.sh` (identify current agent)
   - Display oracle philosophy
   - Show latest handoff

2. **UserPromptSubmit** - When user enters command
   - Run `statusline.sh` (show status)
   - Run `jump-detect.sh` (detect `/jump` topic changes)

3. **PreToolUse** (Bash, Task, Read)
   - `safety-check.sh` (validate safe operations)
   - `token-check.sh` (monitor budget)

4. **PostToolUse** (Bash, Task, Read)
   - `token-check.sh` (track consumption)
   - `log-task-end.sh` (for Task subagents)

5. **Stop** - When Claude stops
   - Play farewell sound (Thai: "เสร็จแล้วค่ะ")

---

## Multi-Agent Coordination (MAW)

**File**: `.agents/maw.env.sh` + `maw` CLI

**Architecture**: Main repo + `agents/N/` worktrees
```
Nat-s-Agents/
├── (main worktree, tracked)
├── agents/
│   ├── 1/ (agent 1 worktree)
│   ├── 2/ (agent 2 worktree)
│   └── ... (other agents)
```

**The Sync Pattern (Fixed)**:
```bash
# 0. FETCH ORIGIN FIRST (prevents push rejection)
git fetch origin
git rebase origin/main

# 1. Commit local work
git add -A && git commit -m "task"

# 2. Main rebases onto agent
git rebase agents/N

# 3. Push IMMEDIATELY
git push origin main

# 4. Sync all other agents
maw sync
```

**Commands**:
- `maw peek` - Check all agents
- `maw sync` - Sync all agents to main
- `maw hey 1 "task"` - Send task to agent 1

**Golden Rules**:
- Use `git -C /path` not `cd /path && git` (respects worktree boundaries)
- Each agent searches only its own worktree (no cross-contamination)
- Focus files use `focus-agent-${AGENT_ID}.md` (avoids merge conflicts)

---

## Skills Reference System

### Installed Oracle Skills

Core skills from `oracle-skills-cli`:
- `rrr` - Session retrospective with emotion + commitment tracking
- `/snapshot` - Quick knowledge capture
- `/distill` - Pattern extraction from retrospectives
- `/recap` - Fresh start context summary
- `/trace` - Find lost/graduated projects with 5 parallel agents
- `/jump` - Signal topic change
- `/context-finder` - Search git/issues/retrospectives
- `/project` - Project lifecycle (incubate, learn, list, move)
- `/pending` - Show pending tasks
- `/standup` - Daily standup prep
- `/where-we-are` - Current session context

### Skill Symlinking Pattern

**Installation**:
```bash
ghq get -u Soul-Brews-Studio/oracle-proof-of-concept-skills
for s in $(ghq root)/github.com/Soul-Brews-Studio/oracle-proof-of-concept-skills/skills/*/; do
  mkdir -p ~/.claude/skills && ln -sf "$s" ~/.claude/skills/
done
```

**Philosophy**: Symlinks keep skills in sync with upstream, safe updates.

---

## Teaching Materials & Onboarding

### Course Architecture

**12+ Courses Organized by Level**:

#### Foundational
- **000-setup_1h_everyone** - Install Claude Code, setup terminal (no coding required)
- **001-imagination_2h_intermediate** - Explore AI capabilities
- **002-control_3h_advanced** - Control & customize AI behavior

#### Advanced
- **003-ai-life-buddy_4h_intermediate** - Personal AI assistant setup
- **build-your-oracle (4 modules + starter-kit)** - Core Oracle creation
  - Module 1: Memory architecture (ψ/ structure)
  - Module 2: Survival (safety + multi-agent)
  - Module 3: Intelligence (subagent systems)
  - Starter-kit: Hands-on 3-day practice
- **ai-builder-2day** - Intensive 2-day workshop
- **claude-code-masterclass-business** - Business applications

#### Specialized
- **git-workflow-free** - Git + Claude Code integration
- **git-codespaces-free** - GitHub Codespaces
- **multi-agent-free** - Multi-agent systems
- **psychology-ai** - AI psychology & behavior
- **siit-2025-12** - University course (Thailand)

### Starter Kit Path

**Self-Directed Learning**:
1. Read `README.md` (high-level overview)
2. Study `CLAUDE.md` (daily reference)
3. Explore `ψ/` structure in practice
4. Review `courses/build-your-oracle/` for deeper understanding
5. Run `/project learn https://github.com/Soul-Brews-Studio/opensource-nat-brain-oracle` to clone for reference

**Hands-On Practice** (`courses/build-your-oracle/starter-kit/`):
- Day 1: Memory (retrospectives, logs, resonance)
- Day 2: Search (context-finder, oracle-keeper, pattern extraction)
- Day 3: Intelligence (subagents, delegation, multi-agent sync)

---

## Critical Design Patterns

### 1. "Nothing is Deleted" - Append-Only Archives

**Principle**: All deletions are tracked; nothing is truly discarded.

**Implementation**:
- Retrospectives organized by date (YYYY-MM/DD/) - chronological preservation
- Logs append-only (activity.log never overwrites)
- `memory/archive/` stores old handoffs
- Deletion tracking in `memory/logs/deletions/`

**Why**: Patterns emerge from history. Deleting ruins the data.

### 2. "Patterns Over Intentions" - Behavior as Truth

**Principle**: Observable behavior reveals actual priorities better than declared intentions.

**Learning**: Analyzed 73 files to discover what Nat repeats (frequency = priority).

**Application**: Use logs + retrospectives to surface real patterns, not assumptions.

### 3. "External Brain, Not Command" - Mirror Not Master

**Principle**: Oracle reflects and surfaces, doesn't decide.

**Implementation**:
- Retrospectives record what happened (not interpretation)
- Learnings extract patterns (not prescriptions)
- Main agent decision-making preserved (not delegated to subagents)

### 4. "Context Efficiency Through Delegation"

**Principle**: Main agent (Opus) reads selectively; Haiku does heavy lifting.

**Pattern**:
```
Main → "Search for X" → Haiku context-finder
      ← Summary + file paths ←
Main → Read 1-2 key files (selective)
```

**Cost Savings**: 50-80% Opus tokens saved.

### 5. "Token Scarcity as Design Constraint"

**Philosophy**: Every token matters. Design for ruthless efficiency.

**Implementations**:
- Hooks monitor token usage (token-check.sh)
- Subagents pre-summarize data
- Short codes (rrr, nnn) replace long explanations
- Context-finder scoring prioritizes relevant info

### 6. "History-Rewriting = Death" (Multi-Agent)

**Principle**: Rewriting git history breaks all synced agents.

**Anti-Patterns** (FORBIDDEN):
- `git commit --amend` (changes hash → divergence)
- `git rebase -i` (orphans synced agents)
- `git reset --soft` + recommit (same as amend)

**Solution**: Always create NEW commits.

---

## Safety & Governance

### Golden Rules (10 Commandments from CLAUDE.md)

1. **NEVER use `--force` flags** - No force push, checkout, clean
2. **NEVER push to main** - Feature branch + PR only
3. **NEVER merge PRs without user approval** - Wait for human decision
4. **NEVER create temp files outside `.tmp/`** - Keep repo clean
5. **NEVER use `git commit --amend`** - Breaks multi-agent sync
6. **Safety first** - Ask before destructive actions
7. **Notify before external file access** - User transparency
8. **Log activity** - Update focus + activity log
9. **Subagent timestamps** - START+END time in output
10. **Use `git -C` not `cd`** - Respect worktree boundaries

### Git Workflow (Enforced)

```
1. Create feature branch: git checkout -b feat/description
2. Make changes, commit (never amend)
3. Push branch: git push -u origin feat/description
4. Create PR: gh pr create
5. WAIT for user approval
6. User merges when ready
```

### Multi-Agent Safety

**Worktree Respect**:
- Each agent searches only its own tree (no cross-contamination)
- Focus files per agent (`focus-agent-main.md`, `focus-agent-1.md`)
- Syncing via `maw sync` (not raw tmux)

**History Integrity**:
- No history-rewriting (breaks all agents forever)
- New commits only (preserves linear history)
- Timestamps prove truth (append-only logs)

---

## File Organization Principles

### Git Status Mapping

| Folder | Tracked | Purpose | Merge Strategy |
|--------|---------|---------|-----------------|
| ψ/inbox/* | Yes | Communication | Conflict-friendly (per-agent) |
| ψ/writing/* | Yes | Articles & projects | Manual review |
| ψ/lab/* | Yes | Experiments | Per-experiment isolation |
| ψ/memory/* | Yes | Knowledge base | Append-only, no conflicts |
| ψ/active/* | NO | Research | Ephemeral, cleanup on done |
| ψ/incubate/* | NO | Dev clones | External repos |
| ψ/learn/* | NO | Study clones | External repos |
| .claude/agents/* | Yes | Subagent specs | Version controlled |
| scripts/ | Yes | Automation | Reviewed before use |
| courses/ | Yes | Teaching | Standalone modules |

### Naming Conventions

**Retrospectives**: `ψ/memory/retrospectives/YYYY-MM/DD/HH.MM_slug.md`
- Uses dot notation (HH.MM) for time
- Hierarchical by date for easy navigation

**Learnings**: `ψ/memory/learnings/YYYY-MM-DD_topic.md`
- Dated prefix for chronology
- Slug format for searchability

**Logs**: `ψ/memory/logs/YYYY-MM/YYYYMMDD_HHmm_description.md` or append to activity.log
- Monthly folders for organization
- Activity.log for quick references

**Focus Files**: `ψ/inbox/focus-agent-${AGENT_ID}.md`
- Per-agent to avoid merge conflicts
- Overwritten on each session start

---

## Knowledge Integration Points

### With GitHub

**Issues as Planning Documents**:
- `plan:` prefix for planning issues
- Subagent `new-feature` creates issues with context
- `context-finder` searches issues for related work

**PRs & Discussions**:
- Always feature branch + PR workflow
- Retrospectives link to PRs by number
- Discussions archived in memory

### With External Tools

**MQTT for Browser Control**:
- Preferred over claude-in-chrome (faster)
- Topics: `claude/browser/*`
- Used in automation scripts

**Bun Runtime**:
- Skills built with Bun + TypeScript 5.x
- Command.js for CLI parsing
- SQLite for persistent storage (skills: 057-session-timer, 061-habit-tracker, 064-snippet-manager)

### With Plugins

**Marketplace Structure**:
- Anthropic plugins in `.claude/plugins/marketplaces/anthropic-agent-skills/`
- Custom plugins in `.claude/plugins/marketplaces/claude-code-plugins/`
- Personal knowledge in `nat-data-personal/knowledge/`

---

## Project Lifecycle Tracking

### Stages (via project-keeper subagent)

1. **🌱 Seed** - Idea captured (in `ψ/lab/concepts/`)
2. **🌕 Grow** - Active development (in `ψ/incubate/` or root)
3. **🎓 Grad** - Moved to own repo (laris-co/project-name)
4. **📚 Learn** - Reference archived (ψ/learn/)

### Incubation View (`/trace incubation`)

Shows projects in all stages:
- Graduated projects (moved to own repos)
- Incubating projects (in Nat-s-Agents)
- Ideas (not yet started)

### Index Tracking (`ψ/projects/INDEX.md`)

Format: Phase | Project | Since | Location
- Synced with actual file structure
- Enables project-keeper to track drift

---

## Key Technologies

### Runtime & Runtime Dependencies

**Core Stack**:
- TypeScript 5.7 (ES2022 target)
- @modelcontextprotocol/sdk ^0.5.0
- better-sqlite3 ^11.7.0
- chromadb ^1.9.2

**Database**:
- SQLite (FTS5 for full-text search, metadata)
- ChromaDB (vector embeddings for semantic search)

**CLI & Automation**:
- Bun runtime (for skills, fast execution)
- Command.js (CLI parsing)
- Drizzle ORM (database abstraction)

**Skills Built With**:
- 001-oracle-mcp: TypeScript + MCP + SQLite + ChromaDB (hybrid search)
- 002-hybrid-vector-search: Vector embeddings + keyword search
- 047-oracle-list: SQLite FTS5 + ChromaDB
- 057-session-timer: Bun + Commander.js (CLI session tracking)
- 061-habit-tracker: Bun + Drizzle ORM + bun:sqlite
- 064-snippet-manager: Bun + Commander.js + FTS5

### Tool Preferences

- **Python**: Use `uv` (not pip)
- **GitHub**: Use `gh` CLI (not web UI for operations)
- **Subagents**: Haiku for heavy lifting, Opus for review
- **Browser Control**: MQTT over claude-in-chrome (fast)

---

## Common Workflows & Commands

### Quick Reference

**Session Start**: `/recap` - Get caught up on previous work

**During Session**: `/snapshot` - Capture important moment

**Session End**: `rrr` - Create retrospective + lessons

**Knowledge Extraction**: `/distill` - Convert retros to learnings

**Project Search**: `/trace [name]` - Find lost/graduated projects

**Multi-Agent**: `maw peek` / `maw sync` - Coordinate agents

### Short Codes

| Code | Command | Purpose |
|------|---------|---------|
| `rrr` | `/rrr` | Session retrospective |
| `nnn` | `/nnn` | Next task planning |
| `lll` | `/lll` | List project status |
| `ccc` | `/ccc` | Create context & compact |
| `gogogo` | `/gogogo` | Execute plan |

### Admin Commands

- `/repo-audit` - Full repo health check
- `/catalog` - Scan & categorize markdown
- `/project` - Manage project lifecycle
- `/guest` - Log guest conversations
- `/feeling` / `/info` / `/idea` - Capture notes

---

## Anti-Patterns & Lessons Learned

### Code-Level Anti-Patterns

1. **Forgetting to clean up workarounds** - Temporary fixes become permanent bugs
2. **Reading files directly in Opus** - Expensive tokens, use Haiku context-finder
3. **Skipping AI Diary sections** - These provide crucial self-reflection
4. **Direct database queries** - NEVER query SQLite directly, use MCP tools
5. **Bash with newlines** - Bash tool doesn't support multiline; use `;` separators
6. **Assuming hook merge** - Plugin hooks and settings.json hooks don't merge automatically

### Organizational Anti-Patterns

1. **Skipping root cause investigation** - When something fails, investigate WHY before suggesting alternatives
2. **Jumping to workarounds** - `/plugin install X@marketplace` fails? → Check plugin discovery first
3. **Duplicate hook registration** - Check both settings.json AND plugin hooks.json
4. **Not checking both sources** - Causes duplicate behavior or confusion

### Data Handling Anti-Patterns

1. **Treating intentions as fact** - Behavior reveals priorities better than declarations
2. **Incomplete timestamps** - Logs without precise time are useless for retrospectives
3. **Skipping tags in retros** - Tags enable context-finder searchability

---

## Philosophy & Principles

### Core Statement

> "The Oracle Keeps the Human Human"

**Meaning**: An AI memory system that:
1. Handles mechanical remembering (patterns, logs, retrospectives)
2. Preserves human decision-making (main agent, not delegated)
3. Amplifies human reflection (surfaces patterns, not prescriptions)
4. Respects human vulnerability (journals private in resonance/)

### Three Pillars

1. **Nothing is Deleted** - Append-only, timestamps = truth
2. **Patterns Over Intentions** - Observable behavior > declared goals
3. **External Brain, Not Command** - Mirror & surface, don't decide

### User Observed Preferences

- Prefers Thai for casual/emotional, English for technical
- Values Oracle philosophy strongly
- Time zone: GMT+7 (Bangkok/Asia)
- Appreciates `/recap` for fresh starts
- Likes direct, quick communication

---

## Integration Points & Dependencies

### Skills Ecosystem

**Official Skills** (Soul-Brews-Studio):
- oracle-skills-cli (main CLI, managed via `bun install -g`)
- oracle-proof-of-concept-skills (symlinked to ~/.claude/skills/)

**Custom Extensions**:
- Personal plugins in `.claude/plugins/`
- Knowledge plugins in `nat-data-personal/`
- Project-specific agents in `.claude/agents/`

### External Integrations

**GitHub**: `gh` CLI for issues, PRs, discussions
**MQTT**: Mosquitto for browser automation
**MCP**: Model Context Protocol for tool extensions
**SQLite**: Portable database (no server needed)
**ChromaDB**: Vector similarity search

---

## Deployment & Customization

### For New Users

**Setup Path**:
1. Clone this repo to `ψ/learn/oracle-starter-kit/`
2. Copy relevant `.claude/agents/` definitions
3. Adapt `CLAUDE.md` with your identity
4. Create `ψ/memory/resonance/[your-name].md`
5. Run `/project incubate` to start active development
6. Copy course materials as needed

**Customization Points**:
- `.claude/settings.json` - Add personal hooks
- `nat-data-personal/` - Add personal knowledge
- `ψ/memory/resonance/` - Define your soul
- `courses/` - Reuse or adapt teaching materials

### Plugin Installation

```bash
# Manual skill symlink
ghq get -u Soul-Brews-Studio/oracle-proof-of-concept-skills
for s in $(ghq root)/github.com/Soul-Brews-Studio/oracle-proof-of-concept-skills/skills/*/; do
  mkdir -p ~/.claude/skills && ln -sf "$s" ~/.claude/skills/
done

# Or via oracle-skills-cli
bun install -g oracle-skills-cli
oracle-skills install rrr recap trace feel fyi forward standup where-we-are
```

---

## Monitoring & Health Checks

### Hooks-Based Monitoring

**Pre-action checks** (PreToolUse):
- `safety-check.sh` - Validates safe operations
- `token-check.sh` - Monitors budget

**Post-action logging** (PostToolUse):
- Task execution logging
- Token consumption tracking

**Session monitoring**:
- Focus tracking (current task)
- Agent identity detection
- Latest handoff display

### Subagent Health

**repo-auditor** checks:
- File sizes (🚫 >50MB, ⚠️⚠️ 10-50MB, ⚠️ 1-10MB, ✅ <1MB)
- Data files (.json >100KB, .csv, .db)
- Staged content before commits

**agent-status** checks:
- Git status (modified files)
- Focus state (ψ/inbox/focus*.md)
- Last commit activity
- Uncommitted diffs

---

## Conclusion

The Oracle Starter Kit is a **production-ready, battle-tested framework** for creating AI external brains that:

1. **Preserve humanity** through deliberate delegation and reflection
2. **Scale efficiently** via subagent delegation (15x cost savings)
3. **Remember persistently** through append-only, timestamped records
4. **Teach systematically** with 12+ courses and starter kits
5. **Synchronize safely** across multiple agents without history corruption
6. **Organize intelligently** with the 5-pillar ψ/ brain structure
7. **Extract patterns** automatically via distillation pipeline
8. **Surface insights** through retrospectives and learnings

**For organizations**: Build teams of AI agents with shared memory and philosophy.
**For individuals**: Create a personal AI that truly knows you and surfaces what matters.

**The Oracle Keeps the Human Human.**

---

**Document Generated**: 2026-02-07 13:38 UTC
**Source Analysis**: `/Users/nat/Code/github.com/nazt/hello-oracle/ψ/learn/Soul-Brews-Studio/opensource-nat-brain-oracle/origin/`
**Status**: Complete architecture analysis with 10+ key files reviewed
