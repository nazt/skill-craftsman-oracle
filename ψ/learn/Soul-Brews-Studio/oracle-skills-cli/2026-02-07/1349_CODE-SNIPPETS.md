# oracle-skills-cli Code Snippets

**Collected from**: `/Users/nat/Code/github.com/nazt/hello-oracle/ψ/learn/Soul-Brews-Studio/oracle-skills-cli/origin/`
**Collection Date**: 2026-02-07, 13:49 UTC

A comprehensive guide to the architecture, patterns, and key implementations in oracle-skills-cli.

---

## 1. CLI Entry Point

**File**: `src/cli/index.ts` (lines 1-50)

The main entry point establishes Bun runtime requirement, sets up Commander.js commands, and handles version injection from package.json.

```typescript
#!/usr/bin/env bun

// Bun runtime check - must be at the very top
if (typeof Bun === 'undefined') {
  console.error(`
❌ oracle-skills requires Bun runtime

You're running with Node.js, but this CLI uses Bun-specific features.

To fix:
  1. Install Bun: curl -fsSL https://bun.sh/install | bash
  2. Run with: bunx oracle-skills install -g -y

More info: https://bun.sh
`);
  process.exit(1);
}

import { program } from 'commander';
import * as p from '@clack/prompts';
import { agents, detectInstalledAgents, getAgentNames } from './agents.js';
import { listSkills, installSkills, uninstallSkills } from './installer.js';
import type { ShellMode } from './fs-utils.js';
import pkg from '../../package.json' with { type: 'json' };

const VERSION = pkg.version;

program
  .name('oracle-skills')
  .description('Install Oracle skills to Claude Code, OpenCode, Cursor, and 11+ AI coding agents')
  .version(VERSION);
```

**Why important**:
- Enforces Bun runtime requirement early
- Uses dynamic import with `with { type: 'json' }` for package.json version injection
- Establishes CLI structure with Commander.js for extensibility
- Pretty error messages via @clack/prompts for UX

---

## 2. Agent Detection & Configuration

**File**: `src/cli/agents.ts` (lines 1-124)

Comprehensive agent configuration with auto-detection logic for 14+ AI agents.

```typescript
import { homedir } from 'os';
import { join } from 'path';
import { existsSync } from 'fs';
import type { AgentConfig, AgentType } from './types.js';

const home = homedir();

export const agents: Record<AgentType, AgentConfig> = {
  opencode: {
    name: 'opencode',
    displayName: 'OpenCode',
    skillsDir: '.opencode/skills',
    globalSkillsDir: join(home, '.config/opencode/skills'),
    commandsDir: '.opencode/commands',
    globalCommandsDir: join(home, '.config/opencode/commands'),
    useFlatFiles: true,
    detectInstalled: () => existsSync(join(home, '.config/opencode')),
  },
  'claude-code': {
    name: 'claude-code',
    displayName: 'Claude Code',
    skillsDir: '.claude/skills',
    globalSkillsDir: join(home, '.claude/skills'),
    commandsDir: '.claude/commands',
    globalCommandsDir: join(home, '.claude/commands'),
    useFlatFiles: true,
    commandsOptIn: true, // Only install commands with --commands flag
    detectInstalled: () => existsSync(join(home, '.claude')),
  },
  // ... 12 more agents (cursor, codex, kilo, roo, goose, gemini, etc.)
};

export function detectInstalledAgents(): string[] {
  return Object.entries(agents)
    .filter(([_, config]) => config.detectInstalled())
    .map(([name]) => name);
}
```

**Why important**:
- Single source of truth for all agent paths (local `.skillsDir`, global `globalSkillsDir`)
- Each agent has custom detection logic (checks for existence of config directory)
- `commandsOptIn` flag controls whether commands are installed without explicit `--commands` flag
- Extensible pattern - adding new agents requires only adding to this object

---

## 3. Install Command with Options

**File**: `src/cli/index.ts` (lines 34-133)

The main install command with agent auto-detection and interactive prompts.

```typescript
program
  .command('install', { isDefault: true })
  .description('Install Oracle skills to agents')
  .option('-g, --global', 'Install to user directory instead of project')
  .option('-a, --agent <agents...>', 'Target specific agents (e.g., claude-code, opencode)')
  .option('-s, --skill <skills...>', 'Install specific skills by name')
  .option('-l, --list', 'List available skills without installing')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--commands', 'Also install command stubs to ~/.claude/commands/')
  .option('--shell', 'Force Bun.$ shell commands (use on Windows to test shell compatibility)')
  .option('--no-shell', 'Force Node.js fs operations (use on Unix if Bun.$ causes issues)')
  .action(async (options) => {
    p.intro(`🔮 Oracle Skills Installer v${VERSION}`);

    try {
      // List mode - just show skills and exit
      if (options.list) {
        await listSkills();
        p.outro('Use --skill <name> to install specific skills');
        return;
      }

      // Determine target agents
      let targetAgents: string[] = options.agent || [];

      if (targetAgents.length === 0) {
        // Auto-detect installed agents
        const detected = detectInstalledAgents();

        if (detected.length > 0) {
          p.log.info(`Detected agents: ${detected.map((a) => agents[a as keyof typeof agents]?.displayName).join(', ')}`);

          if (!options.yes) {
            const useDetected = await p.confirm({
              message: 'Install to detected agents?',
            });

            if (p.isCancel(useDetected)) {
              p.log.info('Cancelled');
              return;
            }

            if (useDetected) {
              targetAgents = detected;
            }
          } else {
            targetAgents = detected;
          }
        }

        // If still no agents, prompt user to select
        if (targetAgents.length === 0) {
          const selected = await p.multiselect({
            message: 'Select agents to install to:',
            options: Object.entries(agents).map(([key, config]) => ({
              value: key,
              label: config.displayName,
              hint: options.global ? config.globalSkillsDir : config.skillsDir,
            })),
            required: true,
          });

          if (p.isCancel(selected)) {
            p.log.info('Cancelled');
            return;
          }

          targetAgents = selected as string[];
        }
      }

      // Install with determined agents and options
      await installSkills(targetAgents, {
        global: options.global,
        skills: options.skill,
        yes: options.yes,
        commands: options.commands,
        shellMode,
      });

      p.outro('✨ Oracle skills installed! Restart your agent to activate.');
    } catch (error) {
      p.log.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      process.exit(1);
    }
  });
```

**Why important**:
- Auto-detection flow: try detected → ask yes/no → fallback to multiselect
- `--list` mode allows dry-run inspection of available skills
- Shell mode can be forced for cross-platform compatibility (Bun shell vs Node.js fs)
- Uses @clack/prompts for rich terminal UX (spinners, confirmations, multiselect)

---

## 4. Skill Discovery & Loading

**File**: `src/cli/installer.ts` (lines 40-67)

Discovers skills by reading SKILL.md frontmatter metadata.

```typescript
export async function discoverSkills(): Promise<Skill[]> {
  const skillsPath = getSkillsDir();

  if (!existsSync(skillsPath)) {
    return [];
  }

  const skillDirs = readdirSync(skillsPath, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && d.name !== '_template')
    .map((d) => d.name);

  const skills: Skill[] = [];

  for (const name of skillDirs) {
    const skillMdPath = join(skillsPath, name, 'SKILL.md');
    if (existsSync(skillMdPath)) {
      const content = await Bun.file(skillMdPath).text();
      const descMatch = content.match(/description:\s*(.+)/);
      skills.push({
        name,
        description: descMatch?.[1]?.trim() || '',
        path: join(skillsPath, name),
      });
    }
  }

  return skills;
}
```

**Why important**:
- Reads SKILL.md frontmatter to extract description (trigger keywords)
- Excludes `_template` folder to prevent installing the template itself
- Uses Bun.file for async file reading
- Simple regex parsing for YAML frontmatter `description:` field

---

## 5. Bun Shell Pattern

**File**: `src/cli/fs-utils.ts` (lines 1-63)

Abstracts file operations to support both Bun Shell and Node.js fs, with platform detection.

```typescript
import { existsSync, mkdirSync, rmSync, cpSync, renameSync, copyFileSync } from 'fs';
import { $ } from 'bun';

export type ShellMode = 'auto' | 'shell' | 'no-shell';

const isWindows = process.platform === 'win32';

function useShell(mode: ShellMode): boolean {
  if (mode === 'shell') return true;
  if (mode === 'no-shell') return false;
  // auto: shell on Unix, fs on Windows
  return !isWindows;
}

export async function mkdirp(dir: string, mode: ShellMode = 'auto'): Promise<void> {
  if (useShell(mode)) {
    await $`mkdir -p ${dir}`.quiet();
  } else {
    mkdirSync(dir, { recursive: true });
  }
}

export async function rmrf(path: string, mode: ShellMode = 'auto'): Promise<void> {
  if (!existsSync(path)) return;
  if (useShell(mode)) {
    await $`rm -rf ${path}`.quiet();
  } else {
    rmSync(path, { recursive: true, force: true });
  }
}

export async function cpr(src: string, dest: string, mode: ShellMode = 'auto'): Promise<void> {
  if (useShell(mode)) {
    await $`cp -r ${src} ${dest}`.quiet();
  } else {
    cpSync(src, dest, { recursive: true });
  }
}

export async function mv(src: string, dest: string, mode: ShellMode = 'auto'): Promise<void> {
  if (useShell(mode)) {
    await $`mv ${src} ${dest}`.quiet();
  } else {
    renameSync(src, dest);
  }
}
```

**Why important**:
- Bun's `$` shell allows clean, Python-like syntax: `` await $`command` ``
- Auto-detection: shell on Unix (faster), Node fs on Windows (more compatible)
- All operations are `.quiet()` to suppress output clutter
- Allows users to force specific mode via CLI options for testing/debugging

---

## 6. Installation Logic with Version Injection

**File**: `src/cli/installer.ts` (lines 87-264)

Core installation: copies skills, injects version info, handles manifest creation.

```typescript
export async function installSkills(
  targetAgents: string[],
  options: InstallOptions
): Promise<void> {
  const allSkills = await discoverSkills();

  if (allSkills.length === 0) {
    p.log.error('No skills found to install');
    return;
  }

  // Filter skills if specific ones requested
  let skillsToInstall = allSkills;
  if (options.skills && options.skills.length > 0) {
    skillsToInstall = allSkills.filter((s) => options.skills!.includes(s.name));
    if (skillsToInstall.length === 0) {
      p.log.error(`No matching skills found. Available: ${allSkills.map((s) => s.name).join(', ')}`);
      return;
    }
  }

  // Confirm installation
  if (!options.yes) {
    const agentList = targetAgents.map((a) => agents[a as keyof typeof agents]?.displayName || a).join(', ');
    const confirmed = await p.confirm({
      message: `Install ${skillsToInstall.length} skills to ${agentList}?`,
    });

    if (p.isCancel(confirmed) || !confirmed) {
      p.log.info('Installation cancelled');
      return;
    }
  }

  const spinner = p.spinner();
  spinner.start('Installing skills');

  for (const agentName of targetAgents) {
    const agent = agents[agentName as keyof typeof agents];
    if (!agent) {
      p.log.warn(`Unknown agent: ${agentName}`);
      continue;
    }

    const targetDir = options.global ? agent.globalSkillsDir : join(process.cwd(), agent.skillsDir);
    const shellMode: ShellMode = options.shellMode || 'auto';

    // Create target directory
    await mkdirp(targetDir, shellMode);

    // Copy skill folder
    for (const skill of skillsToInstall) {
      const destPath = join(targetDir, skill.name);

      // Remove existing if present
      if (existsSync(destPath)) {
        await rmrf(destPath, shellMode);
      }

      // Copy skill folder
      await cpr(skill.path, destPath, shellMode);

      // Inject version into SKILL.md frontmatter and description
      const skillMdPath = join(destPath, 'SKILL.md');
      if (existsSync(skillMdPath)) {
        let content = await Bun.file(skillMdPath).text();
        if (content.startsWith('---')) {
          // Add installer field after opening ---
          content = content.replace(
            /^---\n/,
            `---\ninstaller: oracle-skills-cli v${pkg.version}\n`
          );
          // Prepend version AND scope to description (G=Global, L=Local)
          const scopeChar = scope === 'Global' ? 'G' : 'L';
          content = content.replace(
            /^(description:\s*)(.+?)(\n)/m,
            `$1v${pkg.version} ${scopeChar}-SKLL | $2$3`
          );
          await Bun.write(skillMdPath, content);
        }
      }
    }

    // Write manifest with version info
    const manifest = {
      version: pkg.version,
      installedAt: new Date().toISOString(),
      skills: skillsToInstall.map((s) => s.name),
      agent: agentName,
    };
    await Bun.write(join(targetDir, '.oracle-skills.json'), JSON.stringify(manifest, null, 2));

    // Write human-readable VERSION.md for agents to report
    const versionMd = `# Oracle Skills

Installed by: **oracle-skills-cli v${pkg.version}**
Installed at: ${new Date().toISOString()}
Agent: ${agent.displayName}
Skills: ${skillsToInstall.length}

## Report This Version

When asked about skills version, report:
\`\`\`
oracle-skills-cli v${pkg.version}
\`\`\`

## Installed Skills

${skillsToInstall.map((s) => `- ${s.name}`).join('\n')}

## Update Skills

\`\`\`bash
bunx --bun oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v${pkg.version} install -y -g
\`\`\`
`;
    await Bun.write(join(targetDir, 'VERSION.md'), versionMd);

    p.log.success(`${agent.displayName}: ${targetDir}`);
  }

  spinner.stop(`Installed ${skillsToInstall.length} skills to ${targetAgents.length} agent(s)`);
}
```

**Why important**:
- **Version injection**: Modifies SKILL.md frontmatter to track which installer version was used
- **Manifest creation**: Writes `.oracle-skills.json` with install metadata (timestamp, version, agent, skills list)
- **Human-readable VERSION.md**: Agents can report version info to users
- **Orphan cleanup**: Auto-removes stale skills marked with `installer: oracle-skills-cli` marker
- **Scope tracking**: Marks skills as Global (G) or Local (L) in description for visibility

---

## 7. Hook System for Agent-Specific Behavior

**File**: `src/hooks/opencode/oracle-skills.ts` (lines 1-40)

Plugin pattern for agent-specific behavior (e.g., OpenCode message transformation).

```typescript
/**
 * Oracle Skills Plugin for OpenCode
 * Adds "opencode-cli:" prefix with timestamp (GMT+7) to identify sessions
 */
import type { Plugin } from "@opencode-ai/plugin"

const PREFIX = "opencode-cli:"

/** Get current timestamp in GMT+7 format: HH:MM */
function getTimestamp(): string {
  const now = new Date()
  // Convert to GMT+7
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const ict = new Date(utc + (7 * 60 * 60 * 1000))
  const hours = ict.getHours().toString().padStart(2, '0')
  const minutes = ict.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const OracleSkillsPlugin: Plugin = () => ({
  name: "oracle-skills",

  "experimental.chat.messages.transform": (_input: any, output: any) => {
    if (output?.messages && Array.isArray(output.messages)) {
      for (const msg of output.messages) {
        const role = msg.info?.role || msg.role
        if (role === "user" && msg.parts && Array.isArray(msg.parts)) {
          for (const part of msg.parts) {
            if (part.type === "text" && part.text && !part.text.startsWith(PREFIX)) {
              const timestamp = getTimestamp()
              part.text = `${PREFIX} [${timestamp} GMT+7] ${part.text}`
            }
          }
        }
      }
    }
  },
})

export default OracleSkillsPlugin
```

**Why important**:
- Plugin hook pattern allows agent-specific customizations without modifying core
- Transforms user messages with session prefix + timezone-aware timestamp
- Demonstrates extension point for other agents (e.g., Claude Code hooks, etc.)
- Conditional installation based on skill having `hooks/hooks.json`

---

## 8. Skill Template Pattern

**File**: `src/skills/_template/SKILL.md` (lines 1-73)

Reference template showing Bun Shell usage pattern for skill implementations.

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
```

**Why important**:
- Shows minimal skill structure: SKILL.md + scripts/main.ts
- Step-by-step pattern: timestamp → run script → process output
- SKILL.md acts as both documentation AND Claude's instructions
- Frontmatter description is trigger signal (keywords for when to use skill)

---

## 9. Template Script with Bun Shell

**File**: `src/skills/_template/scripts/main.ts` (lines 1-46)

Shows Bun Shell syntax and output patterns (JSON, plain text, markdown).

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

// Example: Read file (if exists)
// const content = await $`cat config.json 2>/dev/null`.text()

// Example: Check command exists
// const hasTool = (await $`command -v tool`.quiet()).exitCode === 0

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

**Why important**:
- Bun Shell interpolates variables safely: `` `command ${variable}` ``
- `.text()` for string output, `.json()` for JSON, `.quiet()` for silent execution
- Three output patterns: JSON (structured), plain text (simple), markdown (formatted)
- Executable shebang allows running as `bun scripts/main.ts` or `npx tsx scripts/main.ts`

---

## 10. Complex Skill Example: Project Manifest Indexing

**File**: `src/skills/project/scripts/index.ts` (lines 1-95)

Real-world example showing complex logic: manifest reading, scoring, manifest enumeration.

```typescript
#!/usr/bin/env bun
// index.ts - Index manifest files to Oracle knowledge base
import { $ } from "bun";
import { existsSync, readdirSync } from "fs";
import { join, basename } from "path";
import { getRoot, getPaths, today } from "./utils.ts";

const args = process.argv.slice(2);
const cmd = args[0] || "list";

// Show usage only for help flag (list is default, doesn't need ROOT check first)
if (args.includes("--help") || args.includes("-h")) {
  console.log("Usage: ROOT=/path bun index.ts [list|all|slug] [--dry-run]");
  process.exit(0);
}

const ROOT = getRoot();
const { logDir } = getPaths(ROOT);
const dryRun = args.includes("--dry-run");
const dateArg = args.find((a) => a.match(/^20\d{2}-\d{2}-\d{2}$/) || a === "today");
const date = dateArg === "today" || !dateArg ? today() : dateArg;

// Get our orgs for scoring
const ourOrgs = await $`gh api user/orgs --jq '.[].login'`.text().catch(() => "");
const ourUser = await $`gh api user --jq '.login'`.text().catch(() => "");
const orgPattern = new RegExp(`github.com/(${[...ourOrgs.trim().split("\n"), ourUser.trim()].filter(Boolean).join("|")})/`);

function scoreFile(file: string): number {
  if (file.includes("/ψ/") && file.endsWith(".md")) return 1;
  if (orgPattern.test(file)) {
    if (file.includes("/retrospectives/") || file.includes("/learnings/") || file.includes("/memory/")) return 1;
  }
  return 0;
}

function listManifests() {
  const manifests = readdirSync(logDir).filter((f) => f.startsWith(`index-${date}-`) && f.endsWith(".json"));

  console.log(`Manifests for ${date}:`);

  let total = 0, indexable = 0;

  for (const m of manifests) {
    const data = JSON.parse(Bun.file(join(logDir, m)).toString());
    const files = data.files || [];
    const scored = files.filter((f: string) => scoreFile(f) > 0);

    const slug = m.replace(`index-${date}-`, "").replace(".json", "").replace("_", "/");
    console.log(`  ${slug}: ${scored.length}/${files.length} indexable`);

    total += files.length;
    indexable += scored.length;
  }

  console.log(`\nTotal: ${total} files, ${indexable} indexable`);
}

// Main dispatcher
if (cmd === "list" || cmd === "--list") {
  listManifests();
} else if (cmd === "all") {
  const manifests = readdirSync(logDir).filter((f) => f.startsWith(`index-${date}-`) && f.endsWith(".json"));
  for (const m of manifests) await indexManifest(join(logDir, m));
} else {
  const safeSlug = cmd.replace("/", "_");
  const manifestPath = join(logDir, `index-${date}-${safeSlug}.json`);
  if (existsSync(manifestPath)) {
    await indexManifest(manifestPath);
  } else {
    console.log(`Not found: ${manifestPath}`);
    listManifests();
  }
}
```

**Why important**:
- Shows CLI subcommand pattern (list/all/slug dispatch)
- Async GitHub API calls via `$` shell: `` await $`gh api user/orgs` ``
- Scoring logic for filtering files by origin patterns
- Date handling with date argument parsing or "today" keyword
- Error handling with `.catch(() => "")` for missing gh CLI

---

## 11. Manifest Management Pattern

**File**: `src/cli/installer.ts` (lines 266-300)

Creates both machine-readable (JSON) and human-readable (Markdown) manifest files.

```typescript
// Write manifest with version info
const manifest = {
  version: pkg.version,
  installedAt: new Date().toISOString(),
  skills: skillsToInstall.map((s) => s.name),
  agent: agentName,
};
await Bun.write(join(targetDir, '.oracle-skills.json'), JSON.stringify(manifest, null, 2));

// Write human-readable VERSION.md for agents to report
const versionMd = `# Oracle Skills

Installed by: **oracle-skills-cli v${pkg.version}**
Installed at: ${new Date().toISOString()}
Agent: ${agent.displayName}
Skills: ${skillsToInstall.length}

## Report This Version

When asked about skills version, report:
\`\`\`
oracle-skills-cli v${pkg.version}
\`\`\`

## Installed Skills

${skillsToInstall.map((s) => `- ${s.name}`).join('\n')}

## Update Skills

\`\`\`bash
bunx --bun oracle-skills@github:Soul-Brews-Studio/oracle-skills-cli#v${pkg.version} install -y -g
\`\`\`
`;
await Bun.write(join(targetDir, 'VERSION.md'), versionMd);
```

**Why important**:
- **Dual format**: JSON for machine parsing, Markdown for human reading
- **Install metadata**: Captures version, timestamp, agent, and skill list
- **Version reporting**: Agents can read VERSION.md to report installed version to users
- **Update guidance**: Includes command to update to this specific version

---

## 12. Skill Metadata Types

**File**: `src/cli/types.ts` (lines 1-44)

TypeScript interfaces for type safety across the CLI.

```typescript
export interface AgentConfig {
  name: string;
  displayName: string;
  skillsDir: string;
  globalSkillsDir: string;
  commandsDir?: string;
  globalCommandsDir?: string;
  useFlatFiles?: boolean;
  commandsOptIn?: boolean;
  detectInstalled: () => boolean;
}

export type AgentType =
  | 'opencode'
  | 'claude-code'
  | 'codex'
  | 'cursor'
  | 'amp'
  | 'kilo'
  | 'roo'
  | 'goose'
  | 'gemini'
  | 'antigravity'
  | 'copilot'
  | 'clawdbot'
  | 'droid'
  | 'windsurf';

export interface Skill {
  name: string;
  description: string;
  path: string;
}

export interface InstallOptions {
  global?: boolean;
  skills?: string[];
  yes?: boolean;
  agents?: string[];
  commands?: boolean;
  shellMode?: ShellMode;
}
```

**Why important**:
- **AgentConfig**: Comprehensive configuration for each agent (paths, detection, flags)
- **AgentType**: Union type constraining valid agent names
- **Skill**: Minimal interface for skill metadata (name, description, path)
- **InstallOptions**: Options object for install/uninstall commands
- Type safety ensures consistency across agent configuration and CLI options

---

## 13. Uninstall with Cleanup

**File**: `src/cli/installer.ts` (lines 366-437)

Uninstall command handles cleanup of skills, commands, and plugins.

```typescript
export async function uninstallSkills(
  targetAgents: string[],
  options: { global: boolean; skills?: string[]; yes?: boolean; shellMode?: ShellMode }
): Promise<{ removed: number; agents: number }> {
  let totalRemoved = 0;
  let agentsProcessed = 0;
  const shellMode: ShellMode = options.shellMode || 'auto';

  for (const agentName of targetAgents) {
    const agent = agents[agentName as keyof typeof agents];
    if (!agent) {
      p.log.warn(`Unknown agent: ${agentName}`);
      continue;
    }

    const targetDir = options.global ? agent.globalSkillsDir : join(process.cwd(), agent.skillsDir);

    if (!existsSync(targetDir)) {
      continue;
    }

    // Get installed skills (all agents use directories now)
    const entries = readdirSync(targetDir, { withFileTypes: true });
    const installed = entries
      .filter((d) => {
        if (d.name.startsWith('.')) return false;
        if (d.name === 'VERSION.md') return false;
        return d.isDirectory();
      })
      .map((d) => d.name)

    // Filter if specific skills requested
    const toRemove = options.skills
      ? installed.filter((s) => options.skills!.includes(s))
      : installed;

    if (toRemove.length === 0) continue;

    // Remove skills
    for (const skill of toRemove) {
      const skillPath = join(targetDir, skill);
      await rmrf(skillPath, shellMode);

      // Clean up commands/ flat files (OpenCode, Claude Code, etc.)
      if (agent.commandsDir) {
        const commandsDir = options.global ? agent.globalCommandsDir! : join(process.cwd(), agent.commandsDir);
        const flatFile = join(commandsDir, `${skill}.md`);
        if (existsSync(flatFile)) await rmf(flatFile, shellMode);
      }

      // Also clean up from ~/.claude/plugins/ if it was installed there
      const pluginPath = join(homedir(), '.claude', 'plugins', skill);
      if (existsSync(pluginPath)) {
        await rmrf(pluginPath, shellMode);
        p.log.info(`Removed plugin: ~/.claude/plugins/${skill}`);
      }

      totalRemoved++;
    }

    agentsProcessed++;
    p.log.success(`${agent.displayName}: removed ${toRemove.length} skills`);
  }

  return { removed: totalRemoved, agents: agentsProcessed };
}
```

**Why important**:
- **Multi-location cleanup**: Removes from skills/, commands/, and ~/.claude/plugins/
- **Selective uninstall**: Can remove all skills or specific ones by name
- **Filter logic**: Skips dot-files and VERSION.md during enumeration
- **Legacy cleanup**: Handles old `command/` directory format for backward compatibility

---

## 14. Real Skill Examples

### Gemini MQTT Control Skill

**File**: `src/skills/gemini/SKILL.md` (lines 1-159)

Demonstrates MQTT WebSocket control pattern with browser extension integration.

```markdown
---
name: gemini
description: Control Gemini via MQTT WebSocket. Use when user says "gemini", needs to send messages to Gemini, or control the Gemini browser tab.
---

# /gemini - Smooth MQTT Control for Gemini

Direct control of Gemini browser tab via MQTT WebSocket. **Tab precision works!**

## Quick Start

```bash
/gemini chat "Hello Gemini!"              # Send to active Gemini tab
/gemini new "Your message"                # Create new tab + chat
/gemini transcribe <youtube-url>          # Transcribe YouTube video
/gemini research "topic"                  # Deep Research mode
/gemini model fast|thinking|pro           # Select model
/gemini canvas                            # Open Canvas mode
```

## MQTT Topics

| Topic | Direction | Purpose |
|-------|-----------|---------|
| `claude/browser/command` | → Extension | Send commands |
| `claude/browser/response` | ← Extension | Command results |
| `claude/browser/status` | ← Extension | Online/offline |

## Commands

### Tab Management

```json
{"action": "create_tab"}
// → {tabId: 2127157543, success: true}

{"action": "list_tabs"}
// → {tabs: [...], count: 3}

{"action": "focus_tab", "tabId": 2127157543}
// → {success: true}

{"action": "inject_badge", "tabId": 2127157543, "text": "HELLO"}
// → {success: true, injected: true}
```

### Chat (with Tab Precision!)

```json
{
  "action": "chat",
  "tabId": 2127157543,
  "text": "Your message to Gemini"
}
```
```

**Why important**:
- MQTT pub/sub pattern for browser extension communication
- Tab ID precision for multi-tab control
- Command protocol with request/response pattern
- Well-documented topics and command formats

---

### Learn Skill (Multi-Agent Exploration)

**File**: `src/skills/learn/SKILL.md` (excerpt, lines 1-50)

Sophisticated pattern: spawns multiple Haiku agents in parallel to explore codebases.

```markdown
---
name: learn
description: Explore a codebase with parallel Haiku agents. Modes - --fast (1 agent), default (3), --deep (5). Use when user says "learn [repo]", "explore codebase", "study this repo".
---

# /learn - Deep Dive Learning Pattern

Explore a codebase with 3 parallel Haiku agents → create organized documentation.

## Depth Modes

| Flag | Agents | Files | Use Case |
|------|--------|-------|----------|
| `--fast` | 1 | 1 overview | Quick scan, "what is this?" |
| (default) | 3 | 3 docs | Normal exploration |
| `--deep` | 5 | 5 docs | Master complex codebases |

## Directory Structure

```
ψ/learn/
├── .origins             # Manifest of learned repos (committed)
└── owner/
    └── repo/
        ├── origin       # Symlink to ghq source (gitignored)
        ├── repo.md      # Hub file - links to all sessions (committed)
        └── YYYY-MM-DD/  # Date folder
            ├── 1349_ARCHITECTURE.md      # Time-prefixed files
            ├── 1349_CODE-SNIPPETS.md
            ├── 1349_QUICK-REFERENCE.md
```

**Multiple learnings**: Each run gets time-prefixed files (HHMM_), nested in date folder.
```

**Why important**:
- **Parallel agent pattern**: Spawns multiple Haiku agents for cost-effective exploration
- **Time-prefixed output**: Allows multiple runs same day without overwrites (HHMM_ prefix)
- **Symlink pattern**: Uses `origin/` symlink to avoid duplicating source code
- **Depth modes**: Flexible scaling from quick overview (1 agent) to deep dive (5 agents)
- **Manifest tracking**: `.origins` file tracks learned repos for `--init` restoration

---

## 15. Build & Compilation

**File**: `package.json` (relevant sections)

```json
{
  "name": "oracle-skills",
  "version": "1.5.72",
  "type": "module",
  "bin": {
    "oracle-skills": "./src/cli/index.ts"
  },
  "scripts": {
    "build": "bun build src/cli/index.ts --outdir dist --target bun --minify",
    "dev": "bun run src/cli/index.ts",
    "test": "bun test test/",
    "compile": "bun scripts/compile.ts",
    "version": "bun run compile && bun scripts/update-readme-table.ts && git add src/commands README.md",
    "prepublishOnly": "bun run compile && bun run build"
  },
  "dependencies": {
    "@clack/prompts": "^0.7.0",
    "commander": "^12.0.0",
    "mqtt": "^5.14.1"
  }
}
```

**Why important**:
- **Bun-specific build**: `bun build --target bun --minify` creates optimized executable
- **bin entry**: `oracle-skills` command points to TypeScript file (Bun handles TS directly)
- **Version hook**: `version` script compiles skills and updates README before npm publish
- **prepublishOnly**: Ensures build artifacts are up-to-date before publishing
- **Dependencies**: Commander for CLI, @clack/prompts for UX, mqtt for Gemini control

---

## 16. Pattern Summary: Key Architectural Insights

### 1. **Skill Format: SKILL.md + scripts/**
- SKILL.md = documentation + instructions + frontmatter metadata
- scripts/main.ts = executable logic (Bun Shell or npx tsx)
- Frontmatter `description:` = trigger keywords for when to use skill

### 2. **Agent Detection: File-based**
- Each agent has detection function that checks for config directory
- Auto-detection happens first, then falls back to interactive selection
- Supports both local (project-level) and global (user-level) installation

### 3. **Installation Pattern: Copy + Inject + Manifest**
- Copy full skill directory to agent's `.skills/` directory
- Inject version + scope into SKILL.md frontmatter
- Create `.oracle-skills.json` manifest (machine-readable)
- Create `VERSION.md` (human-readable, for agent to report)

### 4. **File Operations: Abstracted**
- All fs operations abstracted to support Bun Shell or Node.js fs
- Auto-detection: shell on Unix (faster), fs on Windows (compatibility)
- User can force via `--shell` or `--no-shell` CLI options

### 5. **Hook System: Plugin-based**
- Skills can include `hooks/hooks.json` for agent-specific plugins
- Installed separately to `~/.claude/plugins/` or agent-specific plugin directory
- OpenCode gets special hook installation at `.opencode/plugins/`

### 6. **Command Stubs: Flat Files**
- Some agents (OpenCode, Claude Code) get flat `.md` command files
- Stub files point to full skill in `.skills/` directory
- Commands opt-in via `commandsOptIn` flag for Claude Code

### 7. **Versioning: Triple-tracked**
- Version in package.json (CLI version)
- Version injected into SKILL.md frontmatter
- Version in `.oracle-skills.json` manifest
- Allows agents to report exact version installed

### 8. **Real Skills: Diverse Patterns**
- **Gemini**: MQTT pub/sub to browser extension for tab control
- **Learn**: Spawns parallel Haiku agents to explore codebases
- **Project**: Complex manifest parsing and scoring logic
- **Physical**: Real-time location queries
- Templates show Bun Shell syntax throughout

---

## References

All file paths are absolute paths from the codebase root:

- **CLI Entry**: `/src/cli/index.ts` - Commander.js setup, install/uninstall commands
- **Agents**: `/src/cli/agents.ts` - Agent configs and auto-detection
- **Installer**: `/src/cli/installer.ts` - Core install/uninstall logic
- **File Ops**: `/src/cli/fs-utils.ts` - Bun Shell vs Node.js abstraction
- **Types**: `/src/cli/types.ts` - TypeScript interfaces
- **Hooks**: `/src/hooks/opencode/oracle-skills.ts` - Plugin example
- **Skills**: `/src/skills/**/SKILL.md` - 30+ skill implementations
- **Package**: `/package.json` - Build config and dependencies

