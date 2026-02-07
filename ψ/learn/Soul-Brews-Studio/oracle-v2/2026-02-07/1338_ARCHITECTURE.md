# Oracle v2 Architecture

Date: 2026-02-07
Version: 0.2.1
Status: Nightly Server (Hono.js) + MCP Server Implementation

## Overview

Oracle v2 is a hybrid knowledge management and decision tracking system built on:
- **SQLite** with FTS5 for keyword search (source of truth)
- **ChromaDB** (via chroma-mcp) for semantic/vector search
- **Drizzle ORM** for type-safe database queries
- **Hono.js** for HTTP API
- **Model Context Protocol (MCP)** for Claude integration
- **Bun** as JavaScript runtime

The system embodies the principle: **"Nothing is Deleted"** — all data is preserved with supersession tracking rather than destruction.

---

## Directory Structure

```
src/
├── index.ts                    # MCP Server implementation (19 tools)
├── server.ts                   # HTTP Server (Hono.js) entry
├── chroma-mcp.ts              # ChromaDB MCP client
├── indexer.ts                 # Document indexer (markdown → SQLite/ChromaDB)
├── types.ts                   # Type definitions
├── ensure-server.ts           # Auto-start HTTP server helper
│
├── db/
│   ├── index.ts               # Drizzle instance + exports
│   ├── schema.ts              # Complete database schema
│   └── migrations/            # Drizzle migrations
│
├── server/
│   ├── db.ts                  # Database initialization & paths
│   ├── handlers.ts            # HTTP endpoint handlers (search, consult, etc.)
│   ├── dashboard.ts           # Dashboard analytics handlers
│   ├── context.ts             # Project context detection (ghq format)
│   ├── logging.ts             # Search/activity logging
│   ├── project-detect.ts      # Auto-detect current project
│   ├── utils.ts               # Utility functions
│   └── types.ts               # Server-specific types
│
├── forum/
│   ├── handler.ts             # Forum/thread CRUD operations
│   └── types.ts               # Forum types
│
├── decisions/
│   ├── handler.ts             # Decision tracking CRUD
│   ├── types.ts               # Decision status & validation
│   └── index.ts               # Public API
│
├── trace/
│   ├── handler.ts             # Trace log CRUD
│   ├── types.ts               # Trace & dig point types
│   └── index.ts               # Public API
│
├── process-manager/
│   ├── index.ts               # Main orchestrator
│   ├── logger.ts              # Logging utilities
│   ├── ProcessManager.ts      # Process lifecycle
│   ├── HealthMonitor.ts       # Health checks
│   └── GracefulShutdown.ts    # Shutdown coordination
│
└── integration/
    ├── mcp.test.ts            # MCP protocol tests
    ├── http.test.ts           # HTTP server tests
    ├── database.test.ts       # Database tests
    └── oracle-core.test.ts    # Core functionality tests
```

---

## Database Schema (Drizzle ORM)

### Core Tables

#### `oracle_documents` (Main Index)
- **Purpose**: Central metadata index for all knowledge documents
- **Key Fields**:
  - `id` (TEXT, PK): Unique identifier (e.g., `learning_2026-02-07_pattern-name`)
  - `type` (TEXT): Document type (`principle`, `pattern`, `learning`, `retro`)
  - `sourceFile` (TEXT): Path relative to repo root
  - `concepts` (TEXT): JSON array of concept tags
  - `createdAt`, `updatedAt`, `indexedAt` (INTEGER): Timestamps
  - **Supersession fields** (Issue #19):
    - `supersededBy` (TEXT): ID of newer document that replaces this
    - `supersededAt` (INTEGER): When supersession occurred
    - `supersededReason` (TEXT): Why it was superseded
  - **Provenance fields** (Issue #22):
    - `origin` (TEXT): `'mother'|'arthur'|'volt'|'human'|null` (universal)
    - `project` (TEXT): ghq-style path (e.g., `github.com/owner/repo`)
    - `createdBy` (TEXT): How it was created (`'indexer'|'oracle_learn'|'manual'`)
- **Indexes**: `idx_source`, `idx_type`, `idx_superseded`, `idx_origin`, `idx_project`

#### `oracle_fts` (Virtual Table - FTS5)
- **Purpose**: Full-text search index via SQLite FTS5
- **Tokenizer**: Porter (stemming for "tire" ↔ "tired" matching)
- **Note**: Managed via raw SQL; not exposed through Drizzle
- **Contents**: Denormalized copy of document content for search

### Logging Tables

#### `searchLog`
- **Purpose**: Track all search queries (HTTP + MCP)
- **Key Fields**: `query`, `type`, `mode` (`hybrid|fts|vector`), `resultsCount`, `searchTimeMs`, `project`, `results` (JSON top-5)

#### `consultLog`
- **Purpose**: Track consultation queries
- **Key Fields**: `decision`, `context`, `principlesFound`, `patternsFound`, `guidance`

#### `learnLog`
- **Purpose**: Track pattern/learning additions
- **Key Fields**: `documentId`, `patternPreview`, `source`, `concepts`, `project`

#### `documentAccess`
- **Purpose**: Track document views/access patterns
- **Key Fields**: `documentId`, `accessType`, `project`

### Forum Tables

#### `forumThreads`
- **Purpose**: Threaded discussion topics
- **Key Fields**:
  - `title`, `status` (`active|answered|pending|closed`)
  - `issueUrl`, `issueNumber`: GitHub mirror integration
  - `project`: Associated project context

#### `forumMessages`
- **Purpose**: Individual messages within threads
- **Key Fields**:
  - `threadId` (FK): Parent thread
  - `role` (`human|oracle|claude`): Message sender type
  - `content`, `author`
  - `principlesFound`, `patternsFound`: Oracle search results
  - `searchQuery`: What Oracle searched for
  - `commentId`: GitHub comment ID (if synced)

### Decision Tracking

#### `decisions`
- **Purpose**: Structured decision lifecycle tracking
- **Status Flow**: `pending` → `parked|researching` → `decided` → `implemented|closed`
- **Key Fields**:
  - `title`, `context` (why it matters)
  - `options` (JSON): `[{label, pros[], cons[]}]`
  - `decision`, `rationale`: What was chosen and why
  - `tags`, `project`: Categorization
  - `decidedAt`, `decidedBy`: Who decided and when

### Trace Logging (Issue #17)

#### `traceLog`
- **Purpose**: Capture /trace command results for later exploration
- **Key Fields**:
  - **Query**: `query`, `queryType` (`general|project|pattern|evolution`)
  - **Dig Points** (JSON arrays):
    - `foundFiles`: `[{path, type, matchReason, confidence}]`
    - `foundCommits`: `[{hash, shortHash, date, message}]`
    - `foundIssues`: `[{number, title, state, url}]`
    - `foundRetrospectives`, `foundLearnings`, `foundResonance`: [file paths]
  - **Recursion**:
    - `depth` (0 = top-level, 1+ = dig from parent)
    - `parentTraceId`: Hierarchical parent
    - `childTraceIds`: JSON array of child traces
  - **Linking** (horizontal chain):
    - `prevTraceId`, `nextTraceId`: Navigate related traces
  - **Distillation**:
    - `status` (`raw|reviewed|distilling|distilled`)
    - `awakening`: Extracted insight/learning
    - `distilledToId`: Learning ID if promoted
  - **Context**: `project`, `sessionId`, `agentCount`, `durationMs`

### Supersession Audit Trail (Issue #18)

#### `supersedeLog`
- **Purpose**: Preserve history of document supersessions (separate from `oracle_documents.supersededBy`)
- **Key Fields**:
  - **Old Document**: `oldPath`, `oldId`, `oldTitle`, `oldType`
  - **New Document**: `newPath`, `newId`, `newTitle`
  - **Metadata**: `reason`, `supersededAt`, `supersededBy`, `project`
- **Use Case**: Even if original file is deleted, history is preserved

### Configuration

#### `settings`
- **Purpose**: Key-value configuration store
- **Uses**: Auth settings, feature flags, preferences
- **Examples**: `auth_enabled`, `auth_password_hash`, `auth_local_bypass`

#### `indexingStatus`
- **Purpose**: Progress tracking for indexer operations
- **Key Fields**: `isIndexing`, `progressCurrent`, `progressTotal`, `startedAt`, `completedAt`, `error`, `repoRoot`

---

## MCP Server Implementation

### Entry Point: `src/index.ts`

The MCP server exposes **19 callable tools** to Claude via the Model Context Protocol:

#### 1. Search & Discover
- **`oracle_search`**: Hybrid keyword + vector search
  - Inputs: `query`, `type`, `limit`, `offset`, `mode` (`hybrid|fts|vector`)
  - Outputs: Results with source attribution (FTS/vector/hybrid)
  - Fallback: Gracefully degrades to FTS-only if ChromaDB unavailable

- **`oracle_list`**: Browse all documents without search query
  - Inputs: `type`, `limit`, `offset`
  - Use case: Explore what knowledge exists

- **`oracle_concepts`**: List all concept tags with document counts
  - Inputs: `limit`, `type` (optional filter)
  - Use case: Discover what topics are covered

- **`oracle_stats`**: Database health and statistics
  - Returns: Document counts by type, FTS index status, ChromaDB status, last indexed time

#### 2. Consult & Reflect
- **`oracle_consult`**: Get guidance on a decision
  - Searches for relevant principles and patterns
  - Synthesizes guidance from Oracle philosophy
  - Logs consultation to database

- **`oracle_reflect`**: Random wisdom for alignment
  - Returns random principle or learning
  - Use case: Periodic philosophical reflection

#### 3. Learn & Remember
- **`oracle_learn`**: Add new pattern/learning to knowledge base
  - Creates markdown file in `ψ/memory/learnings/`
  - Indexes into SQLite + ChromaDB
  - Inputs: `pattern`, `source`, `concepts[]`, `project`
  - Returns: File path and document ID
  - **Note**: Should search first to avoid duplicates; use `oracle_supersede` if updating

#### 4. Forum/Threading
- **`oracle_thread`**: Send message to discussion thread
  - Creates new thread or continues existing
  - Oracle auto-responds from knowledge base
  - Inputs: `message`, `threadId` (optional), `title`, `role`, `model`
  - Returns: Thread ID, message ID, Oracle response

- **`oracle_threads`**: List threads with optional filters
  - Inputs: `status`, `limit`, `offset`
  - Returns: Thread summaries with message counts

- **`oracle_thread_read`**: Get full message history
  - Inputs: `threadId`, `limit` (optional)
  - Returns: Complete thread with all messages

- **`oracle_thread_update`**: Update thread status
  - Inputs: `threadId`, `status` (`active|closed|answered|pending`)

#### 5. Decision Tracking
- **`oracle_decisions_list`**: List decisions with filters
  - Inputs: `status`, `project`, `tags[]`, `limit`, `offset`
  - Returns: Decision summaries + status counts

- **`oracle_decisions_create`**: Create new decision to track
  - Inputs: `title`, `context`, `options[]`, `tags[]`, `project`
  - Returns: Decision with ID and initial status

- **`oracle_decisions_get`**: Get full decision details
  - Inputs: `id`
  - Returns: Complete decision with options, rationale, etc.

- **`oracle_decisions_update`**: Update decision or transition status
  - Validates status transitions
  - Sets `decidedAt` when transitioning to `decided`
  - Inputs: `id`, `title?`, `context?`, `options?`, `decision?`, `rationale?`, `status?`, `decidedBy?`

#### 6. Trace Logging (Issue #17)
- **`oracle_trace`**: Log a trace session with dig points
  - Captures /trace command results (files, commits, issues found)
  - Inputs: `query`, `queryType`, `foundFiles[]`, `foundCommits[]`, `foundIssues[]`, `foundRetrospectives[]`, `foundLearnings[]`, `parentTraceId`, `project`, `agentCount`, `durationMs`
  - Returns: Trace ID + summary

- **`oracle_trace_list`**: List recent traces with optional filters
  - Inputs: `query`, `project`, `status`, `depth`, `limit`, `offset`
  - Returns: Trace summaries for browsing

- **`oracle_trace_get`**: Get full details of a specific trace
  - Inputs: `traceId`, `includeChain` (optional)
  - Returns: Complete trace with all dig points

- **`oracle_trace_link`**: Link two traces as a chain (prev → next)
  - Creates horizontal connections without deleting
  - Inputs: `prevTraceId`, `nextTraceId`

- **`oracle_trace_unlink`**: Remove a link between traces
  - Inputs: `traceId`, `direction` (`prev|next`)

- **`oracle_trace_chain`**: Get full linked chain for a trace
  - Inputs: `traceId`
  - Returns: All traces in chain + position

#### 7. Supersede (Issue #19)
- **`oracle_supersede`**: Mark old document as superseded
  - **Philosophy**: "Nothing is Deleted" — old document preserved, marked outdated
  - Inputs: `oldId`, `newId`, `reason` (optional)
  - Updates:
    - `oracle_documents.supersededBy` = newId
    - `oracle_documents.supersededAt` = now
    - `oracle_documents.supersededReason` = reason
  - Returns: Confirmation with both document types
  - **Note**: Original document and file remain; just marked as superseded

### Tool Organization

**Read-Only Tools** (safe for public/unauthenticated access):
- `oracle_search`, `oracle_list`, `oracle_concepts`, `oracle_stats`, `oracle_consult`, `oracle_reflect`
- `oracle_threads`, `oracle_thread_read`
- `oracle_decisions_list`, `oracle_decisions_get`
- `oracle_trace_list`, `oracle_trace_get`, `oracle_trace_chain`

**Write Tools** (authentication/authorization recommended):
- `oracle_learn`, `oracle_thread`, `oracle_thread_update`
- `oracle_decisions_create`, `oracle_decisions_update`
- `oracle_trace`, `oracle_trace_link`, `oracle_trace_unlink`, `oracle_supersede`

**Read-Only Mode**: Set `ORACLE_READ_ONLY=true` environment variable to disable all write tools

---

## Hybrid Search System

### Architecture

```
User Query (Text)
    ↓
    ├─→ FTS5 Search (SQLite) ←─→ oracle_fts (virtual table)
    │    - Keyword matching
    │    - Porter stemmer
    │    - Produces: rank scores
    │
    └─→ Vector Search (ChromaDB) ←─→ chroma-mcp (Python)
         - Semantic similarity
         - Multi-document chunking
         - Produces: distance scores

    ↓
    Combine & Rank (Hybrid Scoring)
    - Deduplicate by document ID
    - FTS boost if appears in both (10% bonus)
    - Weighted averaging: 0.5*fts + 0.5*vector
    ↓
    Sort by Score (higher = better)
    ↓
    Paginate & Return
```

### FTS5 Details

**Initialization**:
```sql
CREATE VIRTUAL TABLE oracle_fts USING fts5(
  id UNINDEXED,
  content,
  concepts,
  tokenize='porter unicode61'
)
```

- **Porter Stemmer**: Matches word variations (tire → tir, tired → tire)
- **Unicode61**: Proper handling of multi-byte characters
- **UNINDEXED id**: ID stored but not tokenized (faster queries)

**FTS Score Normalization**:
- FTS5 returns rank as negative number (lower = better match)
- Exponential decay formula: `exp(-0.3 * abs(rank))`
  - Rank -1 → 0.74 (best match)
  - Rank -3 → 0.41
  - Rank -5 → 0.22
  - Rank -10 → 0.05

### Vector Search (ChromaDB)

**Architecture**:
- JS code → MCP Client → chroma-mcp (Python subprocess) → ChromaDB
- Uses `uvx` to run Python isolation (no dependency conflicts)
- Collection: `oracle_knowledge`
- Embedding model: Chroma's default (all-MiniLM-L6-v2)

**Document Chunking**:
- Large documents split into semantic chunks
- Each chunk stored with metadata: `{type, source_file, concepts}`
- Enables concept-based filtering on query

**Vector Query Filtering**:
```python
where: { "type": "principle" }  # Optional metadata filter
```

### Graceful Degradation

**If ChromaDB unavailable**:
1. Vector search attempts connection (error logged)
2. Falls back to FTS-only results
3. Warning added to response metadata: `"Vector search unavailable: ..."`
4. Search completes successfully with FTS results only

**If ChromaDB returns zero results**:
1. Still uses FTS results if available
2. Logs warning: "Vector search returned no results"

---

## Indexer System

### Purpose

Parses markdown files from `ψ/memory/` directory and creates:
1. SQLite index (metadata + FTS5 search)
2. ChromaDB vectors (semantic search)

### Key Class: `OracleIndexer`

**Configuration**:
- `repoRoot`: Repository root (auto-detected or via env)
- `dbPath`: SQLite database location
- `chromaPath`: ChromaDB data directory
- `sourcePaths`: Paths to scan for documents

**Backup Strategy** ("Nothing is Deleted"):
1. Creates database backup before destructive operations
2. Exports to JSON (portable, human-readable)
3. Exports to CSV (DuckDB/analytics-friendly)
4. Timestamped filenames: `.backup-TIMESTAMP`, `.export-TIMESTAMP.json`, `.export-TIMESTAMP.csv`

**Indexing Process**:
1. Scan markdown files from `ψ/memory/learnings/`, `ψ/memory/resonance/`, etc.
2. Parse frontmatter (title, tags, created, source, project)
3. Extract concepts from tags
4. Insert metadata into `oracle_documents`
5. Insert content into `oracle_fts` (for FTS search)
6. Send chunked content to ChromaDB for vector embeddings
7. Update `indexingStatus` for UI progress tracking

**Project Detection**:
- Auto-detect via `detectProject(repoRoot)` function
- Supports ghq format: `github.com/owner/repo`
- Falls back to environment variables or repo path analysis

---

## Forum/Thread System

### Architecture

DB-first threaded discussions with Oracle knowledge integration.

**Models** (`src/forum/handler.ts`):
- `ForumThread`: Conversation topic with status and issue sync
- `ForumMessage`: Individual Q&A message in thread
- `ThreadStatus`: `active|answered|pending|closed`
- `MessageRole`: `human|oracle|claude`

**Core Operations**:
- `createThread(title, createdBy, project)`: Start new conversation
- `handleThreadMessage(input)`: Send message + trigger Oracle response
  - Searches knowledge base for relevant principles/patterns
  - Generates guidance response
  - Logs principles/patterns found
- `listThreads(filters)`: Browse threads with pagination
- `getFullThread(threadId)`: Get thread + all messages
- `updateThreadStatus(threadId, status)`: Change thread status

**Oracle Auto-Response**:
1. User sends message to thread
2. System calls `handleConsult(message)` on Oracle knowledge
3. Finds relevant principles and patterns
4. Generates guidance response
5. Creates message with role: `oracle` and synthese guidance

**GitHub Integration** (Optional):
- Thread can have associated GitHub issue
- `issueUrl`, `issueNumber` track mirror location
- `syncedAt` timestamp for last sync

---

## Decision Tracking System

### Purpose

Structured lifecycle tracking for important architectural/project decisions.

### Decision Status Flow

```
                    ┌──→ parked ────┐
                    │                ↓
pending ─→ researching → decided → implemented → closed
                    ↑                ↑
                    └────────────────┘
```

**Valid Transitions** (enforced by `isValidTransition()`):
- `pending`: Can go to → `researching`, `decided`, `parked`
- `researching`: Can go to → `parked`, `decided`
- `parked`: Can go to → `researching`, `decided`
- `decided`: Can go to → `implemented`, `closed`
- `implemented`: Can go to → `closed`
- `closed`: No transitions (terminal)

### Core Operations (`src/decisions/handler.ts`)

- `createDecision(input)`: Create new decision (status: `pending`)
  - Inputs: `title`, `context`, `options[]`, `tags[]`, `project`

- `getDecision(id)`: Get decision with all details

- `updateDecision(input)`: Update fields and/or transition status
  - Sets `decidedAt` when transitioning to `decided`
  - Sets `decidedBy` if provided

- `listDecisions(filters)`: Browse with filters (status, project, tags)

- `transitionStatus(id, newStatus, decidedBy)`: Validate and transition
  - Enforces transition rules
  - Throws error on invalid transitions

- `getDecisionCounts()`: Return counts by status (for dashboard)

### Data Structure

```typescript
decision {
  id: number
  title: string
  context?: string
  options?: [{label, pros[], cons[]}]
  decision?: string          // What was chosen
  rationale?: string         // Why chosen
  status: DecisionStatus     // Current lifecycle state
  tags?: string[]           // Categorization
  project?: string          // Associated project
  decidedAt?: number        // When decided
  decidedBy?: string        // Who/what decided (user, claude, opus, etc.)
  createdAt: number
  updatedAt: number
}
```

---

## Trace Logging System (Issue #17)

### Purpose

Capture discovery sessions with actionable dig points for future exploration.

### Dig Points (Granular Records)

**Files**:
```typescript
{
  path: string              // File path
  type: string              // 'learning', 'retro', 'resonance', 'other'
  matchReason: string       // Why this file was found
  confidence: 'high'|'medium'|'low'
}
```

**Commits**:
```typescript
{
  hash: string
  shortHash: string
  date: string
  message: string
}
```

**Issues**:
```typescript
{
  number: number
  title: string
  state: 'open'|'closed'
  url: string
}
```

### Trace Organization

**Hierarchical** (recursive digs):
- `depth`: 0 = initial trace, 1+ = dig from parent
- `parentTraceId`: Link to parent trace
- `childTraceIds`: JSON array of child traces

**Horizontal Chaining** (related traces):
- `prevTraceId`, `nextTraceId`: Navigate related discovery journeys
- Use `oracle_trace_link` to chain unrelated traces
- Use `oracle_trace_unlink` to break chains

### Distillation

Traces can be promoted to learnings:
- `status`: `raw|reviewed|distilling|distilled`
- `awakening`: Extracted insight/learning (markdown)
- `distilledToId`: Learning document ID if promoted
- `distilledAt`: When promoted to learning

### Core Operations (`src/trace/handler.ts`)

- `createTrace(input)`: Log a trace session
  - Auto-creates learning files for text snippets
  - Calculates fileCount, commitCount, issueCount
  - Determines depth from parent

- `getTrace(traceId)`: Get full trace details

- `listTraces(filters)`: Browse with filters (query, project, status, depth)

- `getTraceChain(traceId)`: Get parent chain (vertical)

- `linkTraces(prevId, nextId)`: Create horizontal chain

- `unlinkTraces(traceId, direction)`: Remove link in direction

- `getTraceLinkedChain(traceId)`: Get full horizontal chain

---

## Supersede/Outdating System (Issue #19)

### Philosophy: "Nothing is Deleted"

Instead of deleting or removing documents, Oracle v2 marks them as superseded by newer versions. This preserves:
1. Full audit trail of document evolution
2. Historical context for why documents changed
3. Ability to reference old versions if needed

### Supersede Pattern

**In `oracle_documents` table**:
```typescript
oracle_documents {
  // ... regular fields ...
  supersededBy: string?      // ID of newer document
  supersededAt: number?      // Timestamp of supersession
  supersededReason: string?  // Why it was superseded
}
```

**In `supersedeLog` table** (separate audit trail):
```typescript
supersedeLog {
  oldPath: string            // Original file path (may no longer exist)
  oldId: string?            // Document ID if indexed
  oldTitle: string?         // Preserved title
  oldType: string?          // Document type
  newPath: string?          // Replacement file path
  newId: string?            // Document ID of replacement
  newTitle: string?
  reason: string?           // Why superseded
  supersededAt: number      // When it happened
  supersededBy: string      // Who made decision (user, claude, indexer)
  project: string?          // Project context
}
```

### Usage: `oracle_supersede` Tool

```
oracle_supersede(oldId, newId, reason?)
```

**What Happens**:
1. Verifies both old and new documents exist
2. Updates old document: sets `supersededBy = newId`
3. Logs to `supersedeLog` for audit trail
4. Old document still appears in searches (with warning/indicator)
5. Original markdown file NOT deleted
6. Returns confirmation with both document types

**Example**:
```
Old learning: "Patterns for synchronization"
              (ID: learning_2025-08-15_sync-patterns)

New learning: "Refined sync patterns with optimization"
              (ID: learning_2026-02-07_sync-patterns-v2)

oracle_supersede(
  oldId: "learning_2025-08-15_sync-patterns",
  newId: "learning_2026-02-07_sync-patterns-v2",
  reason: "Better patterns discovered; optimization included"
)
```

---

## HTTP Server (Hono.js)

### Entry Point: `src/server.ts`

Modern REST API using Hono framework on Bun runtime.

### Core Routes

#### Search & Knowledge
- `GET /api/search?q=...`: Hybrid search
- `GET /api/list`: Browse documents
- `GET /api/consult?q=...`: Get guidance
- `GET /api/reflect`: Random wisdom
- `GET /api/stats`: Database statistics
- `GET /api/graph`: Knowledge graph data
- `POST /api/learn`: Add pattern/learning

#### Forum
- `GET /api/threads`: List threads
- `GET /api/thread/:id`: Get thread with messages
- `POST /api/thread`: Send message/create thread
- `PATCH /api/thread/:id/status`: Update status

#### Decisions
- `GET /api/decisions`: List decisions
- `GET /api/decisions/:id`: Get decision
- `POST /api/decisions`: Create decision
- `PATCH /api/decisions/:id`: Update decision
- `POST /api/decisions/:id/transition`: Change status

#### Traces
- `GET /api/traces`: List traces
- `GET /api/traces/:id`: Get trace
- `GET /api/traces/:id/chain`: Get chain
- `POST /api/traces/:id/link`: Link traces
- `DELETE /api/traces/:id/link`: Unlink traces
- `GET /api/traces/:id/linked-chain`: Get horizontal chain

#### Supersede Log
- `GET /api/supersede`: List supersessions
- `GET /api/supersede/chain/:path`: Document lineage
- `POST /api/supersede`: Log supersession

#### Dashboard
- `GET /api/dashboard`: Summary stats
- `GET /api/dashboard/activity`: Activity over time
- `GET /api/dashboard/growth`: Growth metrics

#### Auth & Settings
- `GET /api/auth/status`: Check auth status
- `POST /api/auth/login`: Login with password
- `POST /api/auth/logout`: Logout
- `GET /api/settings`: Get settings
- `POST /api/settings`: Update settings (password, auth flags)

### Authentication

**Local Bypass** (default enabled):
- Requests from 127.0.0.1, ::1, 192.168.x.x, 10.x.x.x automatically authenticated
- Configurable via `auth_local_bypass` setting

**Password Authentication**:
- Hashed with Bun's built-in `password.hash()`
- Session tokens with 7-day expiry
- HttpOnly cookies

**Auth Paths**:
- Public: `/api/auth/status`, `/api/auth/login`, `/api/health`
- Protected: Everything else (if auth enabled)

### Graceful Shutdown

**Process Manager** (`src/process-manager/`):
- `registerSignalHandlers()`: Listen for SIGINT, SIGTERM
- `performGracefulShutdown()`: Close resources in order
- `writePidFile()`: Track process for management
- `HealthMonitor`: Monitor process health
- `GracefulShutdown`: Coordinate shutdown sequence

---

## Logging & Activity Tracking

### Search Logging (`src/server/logging.ts`)

Every search query logged to `searchLog` table:
- Query text, type, mode
- Number of results
- Search duration (ms)
- Project context
- Top-5 results (JSON)
- Timestamp

**Purpose**: Activity dashboard, trending topics, performance analysis

### Consultation Logging

Every consultation logged to `consultLog`:
- Decision text
- Context (if provided)
- Principles found count
- Patterns found count
- Generated guidance
- Project context

### Learning Logging

Every pattern addition logged to `learnLog`:
- Document ID
- Pattern preview
- Source attribution
- Concepts/tags
- Project context

---

## Project Detection & Context

### Auto-Detection (`src/server/project-detect.ts`)

Detects current project in ghq format:
```typescript
// Input: /Users/nat/Code/github.com/owner/repo/some/path
// Output: github.com/owner/repo
```

**Detection Strategy**:
1. Check `REPO_ROOT` environment variable
2. Walk up directory tree looking for `.git` directory
3. Parse path for ghq pattern (github.com/...)
4. Fall back to root directory name

### Cross-Project Support

HTTP API supports accessing documents from multiple projects:
- `?project=github.com/owner/repo`: Explicit project filter
- `?cwd=/path/to/project`: Auto-detect from path
- Falls back to current repo if not specified

---

## Type System

### Core Types (`src/types.ts`)

```typescript
type OracleDocumentType = 'principle' | 'pattern' | 'learning' | 'retro'

interface OracleDocument {
  id: string
  type: OracleDocumentType
  source_file: string
  content: string
  concepts: string[]
  created_at: number
  updated_at: number
  project?: string
}

interface SearchResult {
  document: OracleDocument
  score: number
  source: 'vector' | 'fts' | 'hybrid'
}
```

### Drizzle ORM Usage

**Pattern**: Raw connection + Drizzle wrapper
```typescript
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

const sqlite = new Database(dbPath)
const db = drizzle(sqlite, { schema })

// Drizzle for type-safe queries
const results = db.select().from(oracleDocuments).limit(10).all()

// Raw SQL for FTS5 (Drizzle doesn't support virtual tables)
const ftsResults = sqlite.prepare(`
  SELECT * FROM oracle_fts WHERE oracle_fts MATCH ?
`).all(query)
```

---

## Read-Only Mode

Set `ORACLE_READ_ONLY=true` environment variable or pass `--read-only` CLI flag:

```bash
# Environment variable
ORACLE_READ_ONLY=true node src/index.ts

# CLI flag
node src/index.ts --read-only
```

**Effect**: Disables all write tools (oracle_learn, oracle_thread, oracle_decisions_create, oracle_trace, oracle_supersede, etc.)

---

## Environment Variables

### Core Configuration
- `ORACLE_REPO_ROOT`: Repository root (auto-detected if not set)
- `ORACLE_DATA_DIR`: Data directory (defaults to `~/.oracle-v2/`)
- `ORACLE_DB_PATH`: SQLite database path
- `ORACLE_SESSION_SECRET`: Session encryption secret (auto-generated if not set)
- `ORACLE_READ_ONLY`: Set to `true` to disable write tools
- `GHQ_ROOT`: GHQ root directory (auto-detected if not set)

### Chroma Configuration
- `CHROMA_PATH`: ChromaDB data directory (defaults to `~/.chromadb/`)
- `CHROMA_PYTHON_VERSION`: Python version for uvx (defaults to `3.12`)

### HTTP Server
- `PORT`: HTTP server port (defaults to `3000`)
- `HOST`: Bind address (defaults to `localhost`)

---

## Error Handling & Resilience

### Graceful Vector Search Fallback
- If ChromaDB unavailable, FTS5 search continues
- Warning message added to response
- No user-facing errors

### Database Connection Pooling
- SQLite single connection (no pooling needed)
- Drizzle handles connection lifecycle
- MCP protocol maintains persistent connection

### Backup Strategy
- Before destructive indexer operations, creates:
  1. SQLite backup (`.backup-TIMESTAMP`)
  2. JSON export (`.export-TIMESTAMP.json`)
  3. CSV export (`.export-TIMESTAMP.csv`)

---

## Performance Considerations

### FTS5 Optimization
- Porter stemmer for word variations
- Indexed on id, type, source_file
- Sanitization of FTS special characters in queries

### Vector Search Optimization
- Document chunking for granular results
- Metadata filtering on type/concepts
- Lazy connection to ChromaDB (only when vector search attempted)

### Database Queries
- Drizzle ORM type safety prevents SQL injection
- Indexes on common filter columns
- Pagination with limit/offset

### Caching
- No explicit caching layer (SQLite provides OS-level caching)
- Session tokens cached in cookies (client-side)

---

## Integration Points

### MCP Protocol
- Standard JSON-RPC 2.0 over stdio
- Supports tool calling from Claude
- Bi-directional: server reports capabilities, client calls tools

### GitHub Integration
- Forum threads can mirror to GitHub issues
- `issueUrl`, `issueNumber` track relationship
- Optional sync feature for cross-platform discussion

### File System
- Markdown documents in `ψ/memory/` directory
- Auto-discovery of new documents
- Relative paths from repo root

### ChromaDB via Python
- Uses `uvx` to run `chroma-mcp` in isolated environment
- Avoids JavaScript/Python dependency conflicts
- Fallback to FTS-only if unavailable

---

## Testing

### Test Files
- `src/integration/mcp.test.ts`: MCP protocol tests
- `src/integration/http.test.ts`: HTTP server tests
- `src/integration/database.test.ts`: Database operations
- `src/oracle-core.test.ts`: Core functionality
- `src/indexer-preservation.test.ts`: "Nothing is Deleted" validation
- `src/drizzle-migration.test.ts`: Schema migration tests

### Running Tests
```bash
bun test src/**/*.test.ts
```

---

## Architecture Decisions

### Why Hybrid Search?
- **FTS5**: Excellent for exact keyword matches, concept filtering
- **Vector Search**: Captures semantic relationships, intent
- **Hybrid**: Best of both worlds with intelligent fallback

### Why Drizzle ORM?
- Type-safe SQL generation
- Supports Bun's SQLite driver natively
- Easy to generate migrations

### Why MCP for AI Integration?
- Standard protocol for LLM tool calling
- Designed for long-running operations
- Better than direct API calls from Claude

### Why "Nothing is Deleted"?
- Preserves decision history for future reference
- Complies with audit/compliance requirements
- Enables reverting decisions if needed
- Maintains context for why documents changed

### Why Dual Storage (SQLite + ChromaDB)?
- **SQLite**: Source of truth for metadata, transactional safety
- **ChromaDB**: Optimized for semantic search, vector operations
- **Sync**: Indexer keeps both in sync; either can be reconstructed

---

## Future Extensibility

### Hook Points
- **Custom indexers**: Extend `OracleIndexer` for different file formats
- **Custom search modes**: Add new search algorithms beyond FTS/vector
- **Custom distillation**: Extend trace → learning promotion logic
- **Custom auth**: Replace session-based auth with OAuth/OIDC

### Potential Enhancements
- Drag-and-drop UI for linking traces
- Automated trace distillation (AI-assisted)
- Real-time collaborative threads
- Nested decision trees (decision → sub-decisions)
- Multi-language support for concepts

---

## Summary

Oracle v2 is a comprehensive knowledge management system that combines:
- **Flexible search**: Hybrid FTS5 + vector search with graceful fallback
- **Structured tracking**: Decisions, threads, and traces
- **Preservation**: Nothing is deleted; supersessions tracked
- **Integration**: Accessible via HTTP API and MCP for AI assistants
- **Resilience**: Graceful degradation, backups, and audit trails

The architecture prioritizes:
1. **Data Preservation**: "Nothing is Deleted" philosophy
2. **Accessibility**: Both APIs (HTTP/MCP) for different use cases
3. **Flexibility**: Hybrid search, multiple logging modes
4. **Safety**: Supersession tracking, transaction support, validation
5. **Extensibility**: Modular design for custom indexers, handlers, etc.
