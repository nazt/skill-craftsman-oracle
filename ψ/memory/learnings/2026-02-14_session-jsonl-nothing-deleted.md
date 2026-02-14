# Session .jsonl Files: The Last Line of "Nothing is Deleted"

**Date**: 2026-02-14
**Source**: /trace --dig --deep investigation
**Project**: nazt/hello-oracle

## Pattern

When work is reverted at the **conversation level** (Claude Code message revert), it bypasses git entirely. The code never reaches a commit, so git log, reflog, and stash all come up empty.

However, the session `.jsonl` files at `~/.claude/projects/` preserve the **full conversation** including all code that was written and reverted.

## Discovery Method

```
/trace --dig    → scans .jsonl files → finds session with reverted work
/trace --deep   → 5 agents confirm no git traces exist
```

## The Gap

| Layer | Preserves reverted work? |
|-------|-------------------------|
| Git commits | No — never committed |
| Git reflog | No — no commits to track |
| Git stash | No — nothing stashed |
| Handoff files | Partially — the *story*, not the code |
| Session .jsonl | **Yes** — full conversation with code |

## Recommended Pattern

If experimental work should be preserved as an **artifact** (not just a story):

1. Commit to a feature branch before reverting
2. The code lives in git history forever
3. Discoverable by `git log`, `/trace`, and future sessions

## Concepts

- Nothing is Deleted
- Session forensics
- Conversation-level revert
- --dig goldminer
- .jsonl preservation
