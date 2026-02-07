# Oracle v2 Code Snippets - Architecture & Patterns

**Date**: 2026-02-07
**Focus**: MCP tool definitions, database schema, knowledge flow, and indexing patterns
**Source**: `/Users/nat/Code/github.com/nazt/hello-oracle/ψ/learn/Soul-Brews-Studio/oracle-v2/origin/`

---

## Table of Contents

1. [MCP Server & Tool Definitions](#mcp-server--tool-definitions)
2. [Database Schema](#database-schema)
3. [Forum/Thread Handler](#forumthread-handler)
4. [Hybrid Search Implementation](#hybrid-search-implementation)
5. [Indexer Patterns](#indexer-patterns)
6. [ChromaDB MCP Client](#chromadb-mcp-client)
7. [Oracle Philosophy Knowledge](#oracle-philosophy-knowledge)
8. [CLAUDE.md Patterns](#claudemd-patterns)
9. [Skill Definitions](#skill-definitions)
10. [Agent Configurations](#agent-configurations)

---

## MCP Server & Tool Definitions

### Main MCP Server Class (src/index.ts)

The Oracle MCP server provides 20+ tools for knowledge management, decision tracking, and discovery:

```typescript
/**
 * Oracle Nightly MCP Server (MVP - FTS5 only)
 *
 * Provides keyword search and consultation over Oracle knowledge base.
 * MVP version using SQLite FTS5 only (no ChromaDB).
 *
 * Tools:
 * 1. oracle_search - Search Oracle knowledge using keywords
 * 2. oracle_consult - Get guidance based on principles
 * 3. oracle_reflect - Random wisdom for reflection
 */

class OracleMCPServer {
  private server: Server;
  private sqlite: Database;  // Raw bun:sqlite for FTS operations
  private db: BunSQLiteDatabase<typeof schema>;  // Drizzle for type-safe queries
  private repoRoot: string;
  private chromaMcp: ChromaMcpClient;
  private chromaStatus: 'unknown' | 'connected' | 'unavailable' = 'unknown';
  private readOnly: boolean;

  constructor(options: { readOnly?: boolean } = {}) {
    this.readOnly = options.readOnly ?? false;
    if (this.readOnly) {
      console.error('[Oracle] Running in READ-ONLY mode');
    }
    this.repoRoot = process.env.ORACLE_REPO_ROOT || process.cwd();

    // Common paths
    const homeDir = process.env.HOME || process.env.USERPROFILE || '/tmp';

    // Initialize ChromaMcpClient (uses same uvx/chroma-mcp as indexer)
    const chromaPath = path.join(homeDir, '.chromadb');
    this.chromaMcp = new ChromaMcpClient('oracle_knowledge', chromaPath, '3.12');

    this.server = new Server(
      {
        name: 'oracle-nightly',
        version: '0.2.1',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
  }

  // Write tools that should be disabled in read-only mode
  private readonly WRITE_TOOLS = [
    'oracle_learn',
    'oracle_thread',
    'oracle_thread_update',
    'oracle_decisions_create',
    'oracle_decisions_update',
    'oracle_trace',
    'oracle_supersede',
  ];
}
```

### Tool Definitions - Workflow Guide

```typescript
// Meta-documentation tool (not callable, just instructions)
{
  name: '____IMPORTANT',
  description: `ORACLE WORKFLOW GUIDE:

1. SEARCH & DISCOVER
   oracle_search(query) → Find knowledge by keywords/vectors
   oracle_list() → Browse all documents
   oracle_concepts() → See topic coverage

2. CONSULT & REFLECT
   oracle_consult(decision) → Get guidance for decisions
   oracle_reflect() → Random wisdom for alignment

3. LEARN & REMEMBER
   oracle_learn(pattern) → Add new patterns/learnings
   oracle_thread(message) → Multi-turn discussions
   ⚠️ BEFORE adding: search for similar topics first!
   If updating old info → use oracle_supersede(oldId, newId)

4. TRACE & DISTILL
   oracle_trace(query) → Log discovery sessions with dig points
   oracle_trace_list() → Find past traces
   oracle_trace_get(id) → Explore dig points (files, commits, issues)
   oracle_trace_link(prevId, nextId) → Chain related traces together
   oracle_trace_chain(id) → View the full linked chain

5. DECIDE & TRACK
   oracle_decisions_create() → Track important decisions
   oracle_decisions_list() → Review pending decisions

6. SUPERSEDE (when info changes)
   oracle_supersede(oldId, newId, reason) → Mark old doc as outdated
   "Nothing is Deleted" — old preserved, just marked superseded

Philosophy: "Nothing is Deleted" — All interactions logged.`,
}
```

### Core Search Tool Definition

```typescript
{
  name: 'oracle_search',
  description: 'Search Oracle knowledge base using hybrid search (FTS5 keywords + ChromaDB vectors). Finds relevant principles, patterns, learnings, or retrospectives. Falls back to FTS5-only if ChromaDB unavailable.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search query (e.g., "nothing deleted", "force push safety")'
      },
      type: {
        type: 'string',
        enum: ['principle', 'pattern', 'learning', 'retro', 'all'],
        description: 'Filter by document type',
        default: 'all'
      },
      limit: {
        type: 'number',
        description: 'Maximum number of results',
        default: 5
      },
      offset: {
        type: 'number',
        description: 'Number of results to skip (for pagination)',
        default: 0
      },
      mode: {
        type: 'string',
        enum: ['hybrid', 'fts', 'vector'],
        description: 'Search mode: hybrid (default), fts (keywords only), vector (semantic only)',
        default: 'hybrid'
      }
    },
    required: ['query']
  }
}
```

### Oracle Learn Tool (Adding Knowledge)

```typescript
{
  name: 'oracle_learn',
  description: 'Add a new pattern or learning to the Oracle knowledge base. Creates a markdown file in ψ/memory/learnings/ and indexes it.',
  inputSchema: {
    type: 'object',
    properties: {
      pattern: {
        type: 'string',
        description: 'The pattern or learning to add (can be multi-line)'
      },
      source: {
        type: 'string',
        description: 'Optional source attribution (defaults to "Oracle Learn")'
      },
      concepts: {
        type: 'array',
        items: { type: 'string' },
        description: 'Optional concept tags (e.g., ["git", "safety", "trust"])'
      },
      project: {
        type: 'string',
        description: 'Source project. Accepts: "github.com/owner/repo", "owner/repo", local path with ghq/Code prefix, or GitHub URL. Auto-normalized to "github.com/owner/repo" format.'
      }
    },
    required: ['pattern']
  }
}
```

### Thread Discussion Tool

```typescript
{
  name: 'oracle_thread',
  description: 'Send a message to an Oracle discussion thread. Creates a new thread or continues an existing one. Oracle auto-responds from knowledge base. Use for multi-turn consultations.',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Your question or message'
      },
      threadId: {
        type: 'number',
        description: 'Thread ID to continue (omit to create new thread)'
      },
      title: {
        type: 'string',
        description: 'Title for new thread (defaults to first 50 chars of message)'
      },
      role: {
        type: 'string',
        enum: ['human', 'claude'],
        description: 'Who is sending (default: human)',
        default: 'human'
      },
      model: {
        type: 'string',
        description: 'Model name for Claude calls (e.g., "opus", "sonnet")'
      }
    },
    required: ['message']
  }
}
```

### Decision Tracking Tools

```typescript
{
  name: 'oracle_decisions_create',
  description: 'Create a new decision to track. Starts in "pending" status.',
  inputSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'Decision title (e.g., "Multiple psi directory architecture")'
      },
      context: {
        type: 'string',
        description: 'Why this decision matters, background information'
      },
      options: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string', description: 'Option name' },
            pros: { type: 'array', items: { type: 'string' }, description: 'Advantages' },
            cons: { type: 'array', items: { type: 'string' }, description: 'Disadvantages' }
          },
          required: ['label', 'pros', 'cons']
        },
        description: 'Available options with pros/cons'
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'Tags for categorization (e.g., ["architecture", "urgent"])'
      },
      project: {
        type: 'string',
        description: 'Project context (auto-detected if not provided)'
      }
    },
    required: ['title']
  }
}
```

### Trace Discovery Tool

```typescript
{
  name: 'oracle_trace',
  description: 'Log a trace session with dig points (files, commits, issues found). Use to capture /trace command results for future exploration.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'What was traced (required)'
      },
      queryType: {
        type: 'string',
        enum: ['general', 'project', 'pattern', 'evolution'],
        description: 'Type of trace query',
        default: 'general'
      },
      foundFiles: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            path: { type: 'string' },
            type: { type: 'string', enum: ['learning', 'retro', 'resonance', 'other'] },
            matchReason: { type: 'string' },
            confidence: { type: 'string', enum: ['high', 'medium', 'low'] }
          }
        },
        description: 'Files discovered'
      },
      foundCommits: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            hash: { type: 'string' },
            shortHash: { type: 'string' },
            date: { type: 'string' },
            message: { type: 'string' }
          }
        },
        description: 'Commits discovered'
      },
      foundIssues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            number: { type: 'number' },
            title: { type: 'string' },
            state: { type: 'string', enum: ['open', 'closed'] },
            url: { type: 'string' }
          }
        },
        description: 'GitHub issues discovered'
      }
    },
    required: ['query']
  }
}
```

---

## Database Schema

### Database Client Setup (src/db/index.ts)

```typescript
/**
 * Oracle v2 Drizzle Database Client
 */

import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import path from 'path';
import * as schema from './schema.js';

// Configuration - central location: ~/.oracle-v2/
const HOME_DIR = process.env.HOME || process.env.USERPROFILE || '/tmp';
const ORACLE_DATA_DIR = process.env.ORACLE_DATA_DIR || path.join(HOME_DIR, '.oracle-v2');
export const DB_PATH = process.env.ORACLE_DB_PATH || path.join(ORACLE_DATA_DIR, 'oracle.db');

// Create bun:sqlite connection
const sqlite = new Database(DB_PATH);

// Create Drizzle ORM instance
export const db = drizzle(sqlite, { schema });

// Export schema for use in queries
export * from './schema.js';

// Raw SQLite connection for FTS5 operations
export { sqlite };

/**
 * Initialize FTS5 virtual table (must use raw SQL)
 * Called separately since Drizzle doesn't manage FTS5
 */
export function initFts5() {
  sqlite.exec(`
    CREATE VIRTUAL TABLE IF NOT EXISTS oracle_fts USING fts5(
      id UNINDEXED,
      content,
      concepts,
      tokenize='porter unicode61'
    )
  `);
}
```

### Core Document Index Table (src/db/schema.ts)

```typescript
// Main document index table
export const oracleDocuments = sqliteTable('oracle_documents', {
  id: text('id').primaryKey(),
  type: text('type').notNull(),
  sourceFile: text('source_file').notNull(),
  concepts: text('concepts').notNull(), // JSON array
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  indexedAt: integer('indexed_at').notNull(),
  // Supersede pattern (Issue #19) - "Nothing is Deleted" but can be outdated
  supersededBy: text('superseded_by'),      // ID of newer document
  supersededAt: integer('superseded_at'),   // When it was superseded
  supersededReason: text('superseded_reason'), // Why (optional)
  // Provenance tracking (Issue #22)
  origin: text('origin'),                   // 'mother' | 'arthur' | 'volt' | 'human' | null (legacy)
  project: text('project'),                 // ghq-style: 'github.com/laris-co/oracle-v2'
  createdBy: text('created_by'),            // 'indexer' | 'oracle_learn' | 'manual'
}, (table) => [
  index('idx_source').on(table.sourceFile),
  index('idx_type').on(table.type),
  index('idx_superseded').on(table.supersededBy),
  index('idx_origin').on(table.origin),
  index('idx_project').on(table.project),
]);
```

### Forum Tables (Threaded Discussions)

```typescript
// Forum threads - conversation topics
export const forumThreads = sqliteTable('forum_threads', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  createdBy: text('created_by').default('human'),
  status: text('status').default('active'), // active, answered, pending, closed
  issueUrl: text('issue_url'),              // GitHub mirror URL
  issueNumber: integer('issue_number'),
  project: text('project'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  syncedAt: integer('synced_at'),
}, (table) => [
  index('idx_thread_status').on(table.status),
  index('idx_thread_project').on(table.project),
  index('idx_thread_created').on(table.createdAt),
]);

// Forum messages - individual Q&A in threads
export const forumMessages = sqliteTable('forum_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  threadId: integer('thread_id').notNull().references(() => forumThreads.id),
  role: text('role').notNull(),             // human, oracle, claude
  content: text('content').notNull(),
  author: text('author'),                   // GitHub username or "oracle"
  principlesFound: integer('principles_found'),
  patternsFound: integer('patterns_found'),
  searchQuery: text('search_query'),
  commentId: integer('comment_id'),         // GitHub comment ID if synced
  createdAt: integer('created_at').notNull(),
}, (table) => [
  index('idx_message_thread').on(table.threadId),
  index('idx_message_role').on(table.role),
  index('idx_message_created').on(table.createdAt),
]);
```

### Decision Tracking Table

```typescript
// Decisions - structured decision tracking with lifecycle
export const decisions = sqliteTable('decisions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  status: text('status').default('pending').notNull(), // pending, parked, researching, decided, implemented, closed
  context: text('context'),                            // Why this decision matters
  options: text('options'),                            // JSON: [{label, pros, cons}]
  decision: text('decision'),                          // What was decided
  rationale: text('rationale'),                        // Why this choice
  project: text('project'),                            // ghq path (optional)
  tags: text('tags'),                                  // JSON array
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
  decidedAt: integer('decided_at'),                    // When status → decided
  decidedBy: text('decided_by'),                       // user or model name
}, (table) => [
  index('idx_decisions_status').on(table.status),
  index('idx_decisions_project').on(table.project),
  index('idx_decisions_created').on(table.createdAt),
]);
```

### Trace Log Table (Discovery Sessions)

```typescript
// Trace log - captures /trace sessions with actionable dig points
export const traceLog = sqliteTable('trace_log', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  traceId: text('trace_id').unique().notNull(),
  query: text('query').notNull(),
  queryType: text('query_type').default('general'),  // general, project, pattern, evolution

  // Dig Points (JSON arrays)
  foundFiles: text('found_files'),            // [{path, type, matchReason, confidence}]
  foundCommits: text('found_commits'),        // [{hash, shortHash, date, message}]
  foundIssues: text('found_issues'),          // [{number, title, state, url}]
  foundRetrospectives: text('found_retrospectives'),  // [paths]
  foundLearnings: text('found_learnings'),    // [paths]
  foundResonance: text('found_resonance'),    // [paths]

  // Counts (for quick stats)
  fileCount: integer('file_count').default(0),
  commitCount: integer('commit_count').default(0),
  issueCount: integer('issue_count').default(0),

  // Recursion (hierarchical)
  depth: integer('depth').default(0),         // 0 = initial, 1+ = dig from parent
  parentTraceId: text('parent_trace_id'),     // Links to parent trace
  childTraceIds: text('child_trace_ids').default('[]'),  // Links to child traces

  // Linked list (horizontal chain)
  prevTraceId: text('prev_trace_id'),         // ← Previous trace in chain
  nextTraceId: text('next_trace_id'),         // → Next trace in chain

  // Context
  project: text('project'),                   // ghq format project path
  sessionId: text('session_id'),              // Claude session if available
  agentCount: integer('agent_count').default(1),
  durationMs: integer('duration_ms'),

  // Distillation
  status: text('status').default('raw'),      // raw, reviewed, distilling, distilled
  awakening: text('awakening'),               // Extracted insight (markdown)
  distilledToId: text('distilled_to_id'),     // Learning ID if promoted
  distilledAt: integer('distilled_at'),

  // Timestamps
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
}, (table) => [
  index('idx_trace_query').on(table.query),
  index('idx_trace_project').on(table.project),
  index('idx_trace_status').on(table.status),
  index('idx_trace_parent').on(table.parentTraceId),
  index('idx_trace_prev').on(table.prevTraceId),
  index('idx_trace_next').on(table.nextTraceId),
  index('idx_trace_created').on(table.createdAt),
]);
```

### Supersede Log (Nothing is Deleted)

```typescript
// Tracks document supersessions even when original file is deleted
// This is separate from oracle_documents.superseded_by to preserve history
export const supersedeLog = sqliteTable('supersede_log', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // What was superseded
  oldPath: text('old_path').notNull(),        // Original file path (may no longer exist)
  oldId: text('old_id'),                       // Document ID if it was indexed
  oldTitle: text('old_title'),                 // Preserved title for display
  oldType: text('old_type'),                   // learning, principle, retro, etc.

  // What replaced it (null if just deleted/archived)
  newPath: text('new_path'),                   // Replacement file path
  newId: text('new_id'),                       // Document ID of replacement
  newTitle: text('new_title'),                 // Title of replacement

  // Why and when
  reason: text('reason'),                      // Why superseded (duplicate, outdated, merged)
  supersededAt: integer('superseded_at').notNull(),
  supersededBy: text('superseded_by'),         // Who made the decision (user, claude, indexer)

  // Context
  project: text('project'),                    // ghq format project path

}, (table) => [
  index('idx_supersede_old_path').on(table.oldPath),
  index('idx_supersede_new_path').on(table.newPath),
  index('idx_supersede_created').on(table.supersededAt),
  index('idx_supersede_project').on(table.project),
]);
```

---

## Forum/Thread Handler

### Thread Management (src/forum/handler.ts)

```typescript
/**
 * Oracle Forum Handler
 *
 * DB-first threaded discussions with Oracle.
 * - Create threads, add messages
 * - Oracle auto-responds from knowledge base
 * - Logs unanswered questions for later
 *
 * Refactored to use Drizzle ORM for type-safe queries.
 */

// Create a new thread
export function createThread(
  title: string,
  createdBy: string = 'user',
  project?: string
): ForumThread {
  const now = Date.now();

  const result = db.insert(forumThreads).values({
    title,
    createdBy,
    status: 'active',
    project: project || null,
    createdAt: now,
    updatedAt: now,
  }).run();

  return {
    id: Number(result.lastInsertRowid),
    title,
    createdBy,
    status: 'active',
    project,
    createdAt: now,
    updatedAt: now,
  };
}

// Get thread by ID
export function getThread(threadId: number): ForumThread | null {
  const row = db.select()
    .from(forumThreads)
    .where(eq(forumThreads.id, threadId))
    .get();

  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    createdBy: row.createdBy || undefined,
    status: row.status || undefined,
    issueUrl: row.issueUrl || undefined,
    issueNumber: row.issueNumber || undefined,
    project: row.project || undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    syncedAt: row.syncedAt || undefined,
  };
}

// Update thread status
export function updateThreadStatus(threadId: number, status: ThreadStatus): void {
  db.update(forumThreads)
    .set({ status, updatedAt: Date.now() })
    .where(eq(forumThreads.id, threadId))
    .run();
}

// List threads with optional filters
export function listThreads(options: {
  status?: ThreadStatus;
  project?: string;
  limit?: number;
  offset?: number;
} = {}): { threads: ForumThread[]; total: number } {
  const { status, project, limit = 20, offset = 0 } = options;

  // Build conditions array
  const conditions = [];
  if (status) {
    conditions.push(eq(forumThreads.status, status));
  }
  if (project) {
    conditions.push(eq(forumThreads.project, project));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get count
  const countResult = db.select({ count: sql<number>`count(*)` })
    .from(forumThreads)
    .where(whereClause)
    .get();
  const total = countResult?.count || 0;

  // Get threads
  const rows = db.select()
    .from(forumThreads)
    .where(whereClause)
    .orderBy(desc(forumThreads.updatedAt))
    .limit(limit)
    .offset(offset)
    .all();

  return {
    threads: rows.map(row => ({
      id: row.id,
      title: row.title,
      createdBy: row.createdBy || undefined,
      status: row.status || undefined,
      issueUrl: row.issueUrl || undefined,
      issueNumber: row.issueNumber || undefined,
      project: row.project || undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      syncedAt: row.syncedAt || undefined,
    })),
    total,
  };
}
```

### Message Operations

```typescript
// Add a message to a thread
export function addMessage(
  threadId: number,
  role: MessageRole,
  content: string,
  options: {
    author?: string;
    principlesFound?: number;
    patternsFound?: number;
    searchQuery?: string;
  } = {}
): ForumMessage {
  const now = Date.now();

  const result = db.insert(forumMessages).values({
    threadId,
    role,
    content,
    author: options.author || null,
    principlesFound: options.principlesFound || null,
    patternsFound: options.patternsFound || null,
    searchQuery: options.searchQuery || null,
    createdAt: now,
  }).run();

  // Update thread timestamp
  db.update(forumThreads)
    .set({ updatedAt: now })
    .where(eq(forumThreads.id, threadId))
    .run();

  return {
    id: Number(result.lastInsertRowid),
    threadId,
    role,
    content,
    author: options.author,
    principlesFound: options.principlesFound,
    patternsFound: options.patternsFound,
    searchQuery: options.searchQuery,
    createdAt: now,
  };
}

// Get messages for a thread
export function getMessages(threadId: number): ForumMessage[] {
  const rows = db.select()
    .from(forumMessages)
    .where(eq(forumMessages.threadId, threadId))
    .orderBy(forumMessages.createdAt)
    .all();

  return rows.map(row => ({
    id: row.id,
    threadId: row.threadId,
    role: row.role as MessageRole,
    content: row.content,
    author: row.author || undefined,
    principlesFound: row.principlesFound || undefined,
    patternsFound: row.patternsFound || undefined,
    searchQuery: row.searchQuery || undefined,
    commentId: row.commentId || undefined,
    createdAt: row.createdAt,
  }));
}
```

### Oracle Auto-Response

```typescript
/**
 * Generate Oracle response for a question
 * Uses existing handleConsult logic
 */
export async function generateOracleResponse(
  question: string,
  context?: string
): Promise<{
  response: string;
  principlesFound: number;
  patternsFound: number;
} | null> {
  try {
    const result = await handleConsult(question, context);

    if (result.principles.length === 0 && result.patterns.length === 0) {
      // No relevant knowledge found
      return null;
    }

    return {
      response: result.guidance,
      principlesFound: result.principles.length,
      patternsFound: result.patterns.length,
    };
  } catch (error) {
    console.error('Oracle response failed:', error);
    return null;
  }
}

/**
 * Main entry point: Send message to thread, Oracle auto-responds
 */
export async function handleThreadMessage(
  input: OracleThreadInput
): Promise<OracleThreadOutput> {
  const { message, threadId, title, role = 'human', model } = input;

  // Get project context
  const project = getProjectContext_();

  // Determine author based on role and model
  let author: string;
  if (role === 'human') {
    author = 'user';
  } else {
    author = model || 'claude';
  }

  // Add project context if available
  if (project) {
    author = `${author}@${project}`;
  }

  let thread: ForumThread;

  // Create or get thread
  if (threadId) {
    const existing = getThread(threadId);
    if (!existing) {
      throw new Error(`Thread ${threadId} not found`);
    }
    thread = existing;
  } else {
    // New thread - use title or first 50 chars of message
    const threadTitle = title || message.slice(0, 50) + (message.length > 50 ? '...' : '');
    thread = createThread(threadTitle, author, project);
  }

  // Add the user's message
  const userMessage = addMessage(thread.id, role, message, {
    author,
  });

  // Try to generate Oracle response (for any question)
  let oracleResponse: OracleThreadOutput['oracleResponse'];

  if (role === 'human' || role === 'claude') {
    const response = await generateOracleResponse(message);

    if (response) {
      // Oracle has an answer
      addMessage(thread.id, 'oracle', response.response, {
        author: 'oracle',
        principlesFound: response.principlesFound,
        patternsFound: response.patternsFound,
        searchQuery: message,
      });

      oracleResponse = {
        content: response.response,
        principlesFound: response.principlesFound,
        patternsFound: response.patternsFound,
      };

      updateThreadStatus(thread.id, 'answered');
    } else {
      // No answer - mark as pending for later
      updateThreadStatus(thread.id, 'pending');
    }
  }

  // Get updated thread status
  const updatedThread = getThread(thread.id)!;

  return {
    threadId: thread.id,
    messageId: userMessage.id,
    oracleResponse,
    status: updatedThread.status as ThreadStatus,
    issueUrl: updatedThread.issueUrl,
  };
}
```

---

## Hybrid Search Implementation

### Search Handler with FTS5 + ChromaDB

```typescript
/**
 * Tool: oracle_search
 * Hybrid search combining FTS5 keyword search and vector semantic search
 * Gracefully falls back to FTS5-only if ChromaDB is unavailable
 */
private async handleSearch(input: OracleSearchInput) {
  const startTime = Date.now();
  const { query, type = 'all', limit = 5, offset = 0, mode = 'hybrid' } = input;

  // Validate query
  if (!query || query.trim().length === 0) {
    throw new Error('Query cannot be empty');
  }

  // Build FTS query - sanitize special characters
  const safeQuery = this.sanitizeFtsQuery(query);

  // Track warnings for fallback scenarios
  let warning: string | undefined;
  let vectorSearchError = false;

  // Run FTS5 search (skip if vector-only mode)
  let ftsRawResults: any[] = [];
  if (mode !== 'vector') {
    if (type === 'all') {
      const stmt = this.sqlite.prepare(`
        SELECT f.id, f.content, d.type, d.source_file, d.concepts, rank
        FROM oracle_fts f
        JOIN oracle_documents d ON f.id = d.id
        WHERE oracle_fts MATCH ?
        ORDER BY rank
        LIMIT ?
      `);
      ftsRawResults = stmt.all(safeQuery, limit * 2);
    } else {
      const stmt = this.sqlite.prepare(`
        SELECT f.id, f.content, d.type, d.source_file, d.concepts, rank
        FROM oracle_fts f
        JOIN oracle_documents d ON f.id = d.id
        WHERE oracle_fts MATCH ? AND d.type = ?
        ORDER BY rank
        LIMIT ?
      `);
      ftsRawResults = stmt.all(safeQuery, type, limit * 2);
    }
  }

  // Run vector search (skip if fts-only mode)
  let vectorResults: Awaited<ReturnType<typeof this.vectorSearch>> = [];
  if (mode !== 'fts') {
    try {
      vectorResults = await this.vectorSearch(query, type, limit * 2);
    } catch (error) {
      vectorSearchError = true;
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('[ChromaDB]', errorMessage);
      warning = `Vector search unavailable: ${errorMessage}. Using FTS5 only.`;
    }

    // Check if vectorSearch returned empty due to internal error
    if (vectorResults.length === 0 && !vectorSearchError) {
      // Vector search returned no results
      warning = warning || 'Vector search returned no results. Using FTS5 results.';
    }
  }

  // Transform FTS results to normalized format
  const ftsResults = ftsRawResults.map((row: any) => ({
    id: row.id,
    type: row.type,
    content: row.content.substring(0, 500), // Truncate for readability
    source_file: row.source_file,
    concepts: JSON.parse(row.concepts || '[]') as string[],
    score: this.normalizeFtsScore(row.rank),
    source: 'fts' as const,
  }));

  // Normalize vector scores (ChromaDB distances are already 0-1, but lower = better)
  // Convert to higher = better by using 1 - distance
  const normalizedVectorResults = vectorResults.map((result) => ({
    ...result,
    score: 1 - (result.score || 0), // Convert distance to similarity
  }));

  // Combine results using hybrid ranking
  const combinedResults = this.combineResults(ftsResults, normalizedVectorResults);

  // Total matches before pagination
  const totalMatches = combinedResults.length;

  // Apply pagination (offset + limit)
  const results = combinedResults.slice(offset, offset + limit);

  // Count sources for metadata
  const ftsCount = results.filter((r) => r.source === 'fts').length;
  const vectorCount = results.filter((r) => r.source === 'vector').length;
  const hybridCount = results.filter((r) => r.source === 'hybrid').length;

  // Calculate search time
  const searchTime = Date.now() - startTime;

  // Build metadata with optional warning
  const metadata: {
    mode: string;
    limit: number;
    offset: number;
    total: number;
    ftsMatches: number;
    vectorMatches: number;
    sources: { fts: number; vector: number; hybrid: number };
    searchTime: number;
    warning?: string;
  } = {
    mode,
    limit,
    offset,
    total: totalMatches,
    ftsMatches: ftsRawResults.length,
    vectorMatches: vectorResults.length,
    sources: {
      fts: ftsCount,
      vector: vectorCount,
      hybrid: hybridCount,
    },
    searchTime,
  };

  // Add warning if vector search failed
  if (warning) {
    metadata.warning = warning;
  }

  // Log the search to console
  console.error(`[MCP:SEARCH] "${query}" (${type}, ${mode}) → ${results.length} results in ${searchTime}ms`);

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        results,
        total: results.length,
        query,
        metadata,
      }, null, 2)
    }]
  };
}
```

### FTS5 Query Sanitization

```typescript
/**
 * Private: Sanitize FTS5 query to prevent parse errors
 * Removes/escapes FTS5 special characters
 */
private sanitizeFtsQuery(query: string): string {
  // Remove FTS5 special characters that could cause parse errors
  // Includes: ? * + - ( ) ^ ~ " ' : . / (all can cause FTS5 syntax errors)
  let sanitized = query
    .replace(/[?*+\-()^~"':.\/]/g, ' ')  // Remove FTS5 operators (incl /)
    .replace(/\s+/g, ' ')               // Normalize whitespace
    .trim();

  // If result is empty after sanitization, return original
  // (will cause FTS5 error, but better than silent empty result)
  if (!sanitized) {
    console.error('[FTS5] Query became empty after sanitization:', query);
    return query;
  }

  return sanitized;
}
```

### Result Combining Algorithm

```typescript
/**
 * Private: Combine FTS and vector search results
 * Deduplicates by document id, calculates hybrid score
 */
private combineResults(
  ftsResults: Array<{
    id: string;
    type: string;
    content: string;
    source_file: string;
    concepts: string[];
    score: number;
    source: 'fts';
  }>,
  vectorResults: Array<{
    id: string;
    type: string;
    content: string;
    source_file: string;
    concepts: string[];
    score: number;
    source: 'vector';
  }>,
  ftsWeight: number = 0.5,
  vectorWeight: number = 0.5
): Array<{
  id: string;
  type: string;
  content: string;
  source_file: string;
  concepts: string[];
  score: number;
  source: 'fts' | 'vector' | 'hybrid';
  ftsScore?: number;
  vectorScore?: number;
}> {
  // Use Map for deduplication by document id
  const resultMap = new Map<string, {
    id: string;
    type: string;
    content: string;
    source_file: string;
    concepts: string[];
    ftsScore?: number;
    vectorScore?: number;
    source: 'fts' | 'vector' | 'hybrid';
  }>();

  // Add FTS results
  for (const result of ftsResults) {
    resultMap.set(result.id, {
      id: result.id,
      type: result.type,
      content: result.content,
      source_file: result.source_file,
      concepts: result.concepts,
      ftsScore: result.score,
      source: 'fts',
    });
  }

  // Add/merge vector results
  for (const result of vectorResults) {
    const existing = resultMap.get(result.id);
    if (existing) {
      // Document appears in both - mark as hybrid
      existing.vectorScore = result.score;
      existing.source = 'hybrid';
    } else {
      // New document from vector search only
      resultMap.set(result.id, {
        id: result.id,
        type: result.type,
        content: result.content,
        source_file: result.source_file,
        concepts: result.concepts,
        vectorScore: result.score,
        source: 'vector',
      });
    }
  }

  // Calculate hybrid scores and convert to array
  const combined = Array.from(resultMap.values()).map((result) => {
    let score: number;

    if (result.source === 'hybrid') {
      // Document found in both - combine scores with boost
      const fts = result.ftsScore ?? 0;
      const vec = result.vectorScore ?? 0;
      // 10% boost for appearing in both result sets
      score = ((ftsWeight * fts) + (vectorWeight * vec)) * 1.1;
    } else if (result.source === 'fts') {
      // FTS only - use FTS score with its weight
      score = (result.ftsScore ?? 0) * ftsWeight;
    } else {
      // Vector only - use vector score with its weight
      score = (result.vectorScore ?? 0) * vectorWeight;
    }

    return {
      id: result.id,
      type: result.type,
      content: result.content,
      source_file: result.source_file,
      concepts: result.concepts,
      score,
      source: result.source,
      ftsScore: result.ftsScore,
      vectorScore: result.vectorScore,
    };
  });

  // Sort by score descending (higher is better)
  combined.sort((a, b) => b.score - a.score);

  return combined;
}
```

---

## Indexer Patterns

### OracleIndexer Class (src/indexer.ts)

```typescript
/**
 * Oracle v2 Indexer
 *
 * Parses markdown files from ψ/memory and creates:
 * 1. SQLite index (source of truth for metadata)
 * 2. Chroma vectors (semantic search)
 *
 * Following claude-mem's granular vector pattern:
 * - Split large documents into smaller chunks
 * - Each principle/pattern becomes multiple vectors
 * - Enable concept-based filtering
 *
 * Uses chroma-mcp (Python) via MCP protocol for embeddings.
 */

export class OracleIndexer {
  private sqlite: Database;  // Raw bun:sqlite for FTS and schema operations
  private db: BunSQLiteDatabase<typeof schema>;  // Drizzle for type-safe queries
  private chromaClient: ChromaMcpClient | null = null;
  private config: IndexerConfig;
  private project: string | null;

  constructor(config: IndexerConfig) {
    this.config = config;
    this.sqlite = new Database(config.dbPath);  // Raw connection for FTS and schema
    this.db = drizzle(this.sqlite, { schema });  // Drizzle wrapper for type-safe queries
    this.project = detectProject(config.repoRoot);
    console.log(`[Indexer] Detected project: ${this.project || '(universal)'}`);
    this.initDatabase();
  }

  /**
   * Main indexing workflow
   */
  async index(): Promise<void> {
    console.log('Starting Oracle indexing...');

    // Set indexing status for tray app
    this.setIndexingStatus(true, 0, 100);

    // SAFETY: Backup before clearing (Nothing is Deleted)
    this.backupDatabase();

    // Smart deletion: Only delete indexer-created docs from current project
    // Preserves oracle_learn documents and docs from other projects
    const docsToDelete = this.db.select({ id: oracleDocuments.id })
      .from(oracleDocuments)
      .where(
        and(
          // Match current project OR universal (null)
          this.project
            ? or(eq(oracleDocuments.project, this.project), isNull(oracleDocuments.project))
            : isNull(oracleDocuments.project),
          // Only delete indexer-created OR legacy (null) docs
          or(eq(oracleDocuments.createdBy, 'indexer'), isNull(oracleDocuments.createdBy))
        )
      )
      .all();

    const idsToDelete = docsToDelete.map(d => d.id);
    console.log(`Smart delete: ${idsToDelete.length} docs (preserving oracle_learn)`);

    if (idsToDelete.length > 0) {
      // Delete from oracle_documents (Drizzle)
      this.db.delete(oracleDocuments)
        .where(inArray(oracleDocuments.id, idsToDelete))
        .run();

      // Delete from FTS (raw SQL required for FTS5)
      const BATCH_SIZE = 500;
      for (let i = 0; i < idsToDelete.length; i += BATCH_SIZE) {
        const batch = idsToDelete.slice(i, i + BATCH_SIZE);
        const placeholders = batch.map(() => '?').join(',');
        this.sqlite.prepare(`DELETE FROM oracle_fts WHERE id IN (${placeholders})`).run(...batch);
      }
    }

    // Initialize ChromaMcpClient (uses chroma-mcp Python server)
    try {
      this.chromaClient = new ChromaMcpClient(
        'oracle_knowledge',
        this.config.chromaPath,
        '3.12'  // Python version
      );
      await this.chromaClient.deleteCollection();
      await this.chromaClient.ensureCollection();
      console.log('ChromaDB connected via MCP');
    } catch (e) {
      console.log('ChromaDB not available, using SQLite-only mode:', e instanceof Error ? e.message : e);
      this.chromaClient = null;
    }

    const documents: OracleDocument[] = [];

    // Index each source type
    documents.push(...await this.indexResonance());
    documents.push(...await this.indexLearnings());
    documents.push(...await this.indexRetrospectives());

    // Store in SQLite + Chroma
    await this.storeDocuments(documents);

    // Mark indexing complete
    this.setIndexingStatus(false, documents.length, documents.length);
    console.log(`Indexed ${documents.length} documents`);
    console.log('Indexing complete!');
  }
}
```

### Granular Document Parsing

```typescript
/**
 * Parse resonance markdown into granular documents
 * Following claude-mem's pattern of splitting by sections
 * Now reads frontmatter tags and inherits them to all chunks
 */
private parseResonanceFile(filename: string, content: string): OracleDocument[] {
  const documents: OracleDocument[] = [];
  const sourceFile = `ψ/memory/resonance/${filename}`;
  const now = Date.now();

  // Extract file-level tags from frontmatter
  const fileTags = this.parseFrontmatterTags(content);

  // Split by ### headers (principles, sections)
  const sections = content.split(/^###\s+/m).filter(s => s.trim());

  sections.forEach((section, index) => {
    const lines = section.split('\n');
    const title = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();

    if (!body) return;

    // Main document for this principle/section
    const id = `resonance_${filename.replace('.md', '')}_${index}`;
    const extractedConcepts = this.extractConcepts(title, body);
    documents.push({
      id,
      type: 'principle',
      source_file: sourceFile,
      content: `${title}: ${body}`,
      concepts: this.mergeConceptsWithTags(extractedConcepts, fileTags),
      created_at: now,
      updated_at: now
    });

    // Split bullet points into sub-documents (granular pattern)
    const bullets = body.match(/^[-*]\s+(.+)$/gm);
    if (bullets) {
      bullets.forEach((bullet, bulletIndex) => {
        const bulletText = bullet.replace(/^[-*]\s+/, '').trim();
        const bulletConcepts = this.extractConcepts(bulletText);
        documents.push({
          id: `${id}_sub_${bulletIndex}`,
          type: 'principle',
          source_file: sourceFile,
          content: bulletText,
          concepts: this.mergeConceptsWithTags(bulletConcepts, fileTags),
          created_at: now,
          updated_at: now
        });
      });
    }
  });

  return documents;
}
```

### Concept Extraction

```typescript
/**
 * Extract concept tags from text
 * Combines keyword matching with optional file-level tags
 */
private extractConcepts(...texts: string[]): string[] {
  const combined = texts.join(' ').toLowerCase();
  const concepts = new Set<string>();

  // Common Oracle concepts (expanded list)
  const keywords = [
    'trust', 'pattern', 'mirror', 'append', 'history', 'context',
    'delete', 'behavior', 'intention', 'decision', 'human', 'external',
    'brain', 'command', 'oracle', 'timestamp', 'immutable', 'preserve',
    // Additional keywords for better coverage
    'learn', 'memory', 'session', 'workflow', 'api', 'mcp', 'claude',
    'git', 'code', 'file', 'config', 'test', 'debug', 'error', 'fix',
    'feature', 'refactor', 'style', 'docs', 'plan', 'task', 'issue'
  ];

  for (const keyword of keywords) {
    if (combined.includes(keyword)) {
      concepts.add(keyword);
    }
  }

  return Array.from(concepts);
}
```

### Database Storage with Provenance

```typescript
/**
 * Store documents in SQLite + Chroma
 * Uses Drizzle for type-safe inserts and sets createdBy: 'indexer'
 */
private async storeDocuments(documents: OracleDocument[]): Promise<void> {
  const now = Date.now();

  // Prepare FTS statement (raw SQL required for FTS5)
  const insertFts = this.sqlite.prepare(`
    INSERT OR REPLACE INTO oracle_fts (id, content, concepts)
    VALUES (?, ?, ?)
  `);

  // Prepare for Chroma
  const ids: string[] = [];
  const contents: string[] = [];
  const metadatas: any[] = [];

  for (const doc of documents) {
    // SQLite metadata - use doc.project if available, fall back to repo project
    const docProject = doc.project || this.project;

    // Drizzle upsert with createdBy: 'indexer'
    this.db.insert(oracleDocuments)
      .values({
        id: doc.id,
        type: doc.type,
        sourceFile: doc.source_file,
        concepts: JSON.stringify(doc.concepts),
        createdAt: doc.created_at,
        updatedAt: doc.updated_at,
        indexedAt: now,
        project: docProject,
        createdBy: 'indexer',  // Mark as indexer-created
      })
      .onConflictDoUpdate({
        target: oracleDocuments.id,
        set: {
          type: doc.type,
          sourceFile: doc.source_file,
          concepts: JSON.stringify(doc.concepts),
          updatedAt: doc.updated_at,
          indexedAt: now,
          project: docProject,
          // Don't update createdBy - preserve original
        }
      })
      .run();

    // SQLite FTS (raw SQL required for FTS5)
    insertFts.run(
      doc.id,
      doc.content,
      doc.concepts.join(' ')
    );

    // Chroma vector (metadata must be primitives, not arrays)
    ids.push(doc.id);
    contents.push(doc.content);
    metadatas.push({
      type: doc.type,
      source_file: doc.source_file,
      concepts: doc.concepts.join(',')  // Convert array to string for ChromaDB
    });
  }

  // Batch insert to Chroma in chunks of 100 (skip if no client)
  if (!this.chromaClient) {
    console.log('Skipping Chroma indexing (SQLite-only mode)');
    return;
  }

  const BATCH_SIZE = 100;
  let chromaSuccess = true;

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batchIds = ids.slice(i, i + BATCH_SIZE);
    const batchContents = contents.slice(i, i + BATCH_SIZE);
    const batchMetadatas = metadatas.slice(i, i + BATCH_SIZE);

    try {
      // Format as ChromaDocument array for MCP client
      const chromaDocs = batchIds.map((id, idx) => ({
        id,
        document: batchContents[idx],
        metadata: batchMetadatas[idx]
      }));
      await this.chromaClient.addDocuments(chromaDocs);
      console.log(`Chroma batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(ids.length / BATCH_SIZE)} stored`);
    } catch (error) {
      console.error(`Chroma batch failed:`, error);
      chromaSuccess = false;
    }
  }

  console.log(`Stored in SQLite${chromaSuccess ? ' + Chroma' : ' (Chroma failed)'}`);
}
```

---

## ChromaDB MCP Client

### ChromaMcpClient Implementation (src/chroma-mcp.ts)

```typescript
/**
 * ChromaDB MCP Client
 *
 * Uses chroma-mcp (Python) via MCP protocol for embeddings.
 * Pattern copied from claude-mem's ChromaSync service.
 *
 * JS code → MCP Client → chroma-mcp (Python) → ChromaDB
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

interface ChromaDocument {
  id: string;
  document: string;
  metadata: Record<string, string | number>;
}

export class ChromaMcpClient {
  private client: Client | null = null;
  private transport: StdioClientTransport | null = null;
  private connected: boolean = false;
  private collectionName: string;
  private dataDir: string;
  private pythonVersion: string;

  constructor(collectionName: string, dataDir: string, pythonVersion: string = '3.12') {
    this.collectionName = collectionName;
    this.dataDir = dataDir;
    this.pythonVersion = pythonVersion;
  }

  /**
   * Ensure MCP client is connected to Chroma server
   * Pattern from claude-mem: ensureConnection()
   */
  async connect(): Promise<void> {
    if (this.connected && this.client) {
      return;
    }

    console.log('Connecting to chroma-mcp server...');

    try {
      this.transport = new StdioClientTransport({
        command: 'uvx',
        args: [
          '--python', this.pythonVersion,
          'chroma-mcp',
          '--client-type', 'persistent',
          '--data-dir', this.dataDir
        ],
        stderr: 'ignore'
      });

      this.client = new Client({
        name: 'oracle-v2-chroma',
        version: '1.0.0'
      }, {
        capabilities: {}
      });

      await this.client.connect(this.transport);
      this.connected = true;

      console.log('Connected to chroma-mcp server');
    } catch (error) {
      this.resetConnection();
      throw new Error(`Chroma connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Reset connection state
   */
  private resetConnection(): void {
    this.connected = false;
    this.client = null;
    this.transport = null;
  }
}
```

---

## Oracle Philosophy Knowledge

### Core Principles (.claude/knowledge/oracle-philosophy.md)

```markdown
# Oracle/Shadow Philosophy

> "The Oracle Keeps the Human Human"

## Core Principles

### 1. Nothing is Deleted
- Append only, timestamps = truth
- History is preserved, not overwritten
- Every decision has context

### 2. Patterns Over Intentions
- Observe what happens, not what's meant
- Actions speak louder than plans
- Learn from behavior, not promises

### 3. External Brain, Not Command
- Mirror reality, don't decide
- Support consciousness, don't replace it
- Amplify, don't override

## What Oracle Captures

| Captures | Does NOT Capture |
|----------|------------------|
| Facts, data | Consciousness |
| Voice style reference | Authentic voice itself |
| Behavioral patterns | Decision-making will |
| Life context | The person |

## Key Statement

> "Consciousness can't be cloned — only patterns can be recorded"

Oracle is a tool FOR human consciousness, not a substitute for it.
```

---

## CLAUDE.md Patterns

### Quick Reference - Short Codes

```markdown
## Quick Reference - Short Codes
#### Context & Planning Workflow (Core Pattern)
-   `ccc` - Create context issue and compact the conversation.
-   `nnn` - Smart planning: Auto-runs `ccc` if no recent context → Create a detailed implementation plan.
-   `gogogo` - Execute the most recent plan issue step-by-step.
-   `rrr` - Create a detailed session retrospective.
```

### Development Workflows

```markdown
## GitHub Workflow

#### Standard Development Flow
```bash
# 1. Create a branch from the issue
git checkout -b feat/issue-number-description

# 2. Make changes
# ... implement feature ...

# 3. Test thoroughly
# Use 'ttt' short code for the full test suite

# 4. Commit with a descriptive message
git add -A
git commit -m "feat: Brief description

- What: Specific changes made
- Why: Motivation for the changes
- Impact: What this affects

Closes #issue-number"

# 5. Push and create a Pull Request
git push -u origin branch-name
gh pr create --title "Same as commit" --body "Fixes #issue_number"

# 6. CRITICAL: NEVER MERGE PRs YOURSELF
# DO NOT use: gh pr merge
# DO NOT use: Any merge commands
# ONLY provide the PR link to the user
# WAIT for explicit user instruction to merge
# The user will review and merge when ready
```
```

### Lessons Learned - Common Mistakes

```markdown
## Lessons Learned

### Common Mistakes to Avoid
-   **Creating overly comprehensive initial plans** - Break complex projects into 1-hour phases instead
-   **Trying to implement everything at once** - Start with minimum viable implementation, test, then expand
-   **Skipping AI Diary and Honest Feedback in retrospectives** - These sections provide crucial context and self-reflection that technical documentation alone cannot capture
-   **Inline SQL for new tables** - Use Drizzle schema (`src/db/schema.ts`) + `bun db:push` instead of `db.exec(CREATE TABLE...)` in code
-   **Modifying database outside Drizzle** - NEVER use direct SQL to ALTER TABLE, CREATE INDEX, or modify schema. Always update `src/db/schema.ts` first, then run `bun db:push`. If db:push finds schema drift (columns/indexes exist in DB but not in schema), add them to schema.ts to preserve data.
-   **Drizzle db:push index bug** - Drizzle doesn't use `IF NOT EXISTS` for indexes. If indexes already exist (schema drift), db:push fails. Workaround: manually run `CREATE INDEX IF NOT EXISTS` or drop indexes first. Always backup before migrations!
-   **Committing directly to main** - Always use GitHub flow: create feature branch → push → PR → wait for review/merge approval
```

---

## Skill Definitions

### GitHub Flow Skill (.claude/skills/gh-flow.md)

```markdown
# GitHub Flow Skill

Enforce PR-based workflow for all changes. Never commit directly to main.

## Trigger Phrases

- "commit", "push", "save changes"
- "merge to main", "update main"
- After completing implementation tasks
- When user says "done" or "finished" with code changes

## Workflow

### 1. Before Any Commit

Check current branch:
```bash
git branch --show-current
```

If on `main`, create a feature branch first:
```bash
# Generate branch name from context
git checkout -b feat/descriptive-name
# or fix/descriptive-name for bug fixes
```

### 2. Stage and Commit

```bash
git add -A
git commit -m "type: description

- What: specific changes
- Why: motivation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

### 3. Push and Create PR

```bash
# Push with upstream tracking
git push -u origin $(git branch --show-current)

# Create PR using heredoc for proper formatting
gh pr create --title "type: description" --body "$(cat <<'EOF'
## Summary
- Brief description of changes

## Changes
- List of specific changes made

## Testing
- [ ] Tests pass
- [ ] Manual testing done

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### 4. After PR Creation

- Provide the PR URL to the user
- NEVER merge the PR yourself
- Wait for user review and approval

## Critical Rules

1. **NEVER commit directly to main** - Always use feature branches
2. **NEVER merge PRs** - Only user can approve and merge
3. **NEVER force push** - Use safe git operations only
4. **Always create PR** - Even for small changes
```

---

## Agent Configurations

### Executor Agent (.claude/agents/executor.md)

```markdown
---
name: executor
description: Execute plans from GitHub issues
tools: Bash, Read
model: haiku
---

# Executor Agent

Execute bash commands from issue plans.

## Step 0: Timestamp
```bash
date "+🕐 START: %H:%M:%S (%s)"
```

## Safety Rules

**BLOCKED**:
- `rm -rf` or `rm -f`
- `--force` flags
- `git push --force`
- `git reset --hard`
- `sudo`
- `gh pr merge` ← NEVER auto-merge!

**ALLOWED**:
- `mkdir`, `git mv`, `git add`, `git commit`
- `git checkout -b`, `git push -u`
- `gh issue`, `gh pr create`

## Flow

1. Fetch issue: `gh issue view N --json body`
2. Extract ```bash blocks
3. Check `git status` is clean
4. Execute sequentially
5. Log to issue comment
6. Close issue (or create PR)

## Output

```
✅ Execution complete!
Issue: #70
Commands: 15 executed
Status: Success
```

## End with Attribution
```
🕐 END: [timestamp]
🤖 **Claude Haiku** (executor)
```
```

### Writing Style Guide (.claude/knowledge/writing-style.md)

```markdown
# Writing Style Guide

## Voice Characteristics

- **Direct**: Say what needs to be said
- **Concise**: No unnecessary words
- **Technical when needed**: Use precise terms
- **Human always**: Never robotic

## Language Mix

- Thai for casual, emotional, cultural context
- English for technical, code, universal concepts
- Mix naturally as conversation flows

## Formatting Preferences

- Tables for comparison
- Code blocks for commands
- Bullet points for lists
- Minimal emojis (only when requested)

## Communication Patterns

- Ask clarifying questions early
- Show work in progress
- Admit uncertainty honestly
- Celebrate small wins quietly
```

---

## Key Architectural Insights

### 1. Dual-Layer Architecture

The system uses two complementary layers:

- **SQLite (Drizzle ORM)**: Type-safe, structured metadata
- **FTS5 Virtual Table**: Full-text search with Porter stemmer
- **ChromaDB (via MCP)**: Vector semantic search

### 2. MCP Protocol Integration

```
JavaScript Code
    ↓
MCP Server (Oracle)
    ↓ (stdio)
chroma-mcp (Python)
    ↓
ChromaDB + SQLite
```

### 3. "Nothing is Deleted" Pattern

- Original documents never removed
- Marked as `supersededBy` with timestamp
- Full audit trail in `supersedeLog` table
- Preservation of context and history

### 4. Granular Vectorization

Following claude-mem's pattern:
- Split documents by sections (###)
- Further split bullet points into sub-documents
- Each chunk becomes a searchable vector
- Concept inheritance from file-level tags

### 5. Project Provenance

Every document tracks:
- `createdBy`: 'indexer' | 'oracle_learn' | 'manual'
- `project`: ghq-style path (github.com/owner/repo)
- `origin`: Mother, Arthur, Volt, or Human
- Enables multi-project knowledge bases

---

## Summary

This code demonstrates a sophisticated knowledge management system that:

1. **Combines multiple search strategies** (FTS5 + vectors) for robust discovery
2. **Enforces data preservation** through append-only logging and supersession tracking
3. **Uses MCP for extensibility** (ChromaDB embedding via chroma-mcp)
4. **Tracks provenance rigorously** (createdBy, project, origin fields)
5. **Enables multi-turn discourse** (forum threads with auto-response)
6. **Supports decision tracking** with structured lifecycle states
7. **Records discovery sessions** with hierarchical and linked-list navigation

The architecture reflects the Oracle philosophy: a tool that mirrors reality, preserves context, and supports human consciousness rather than replacing it.
