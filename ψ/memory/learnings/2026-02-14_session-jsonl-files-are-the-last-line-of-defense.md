---
title: Session .jsonl files are the last line of defense for "Nothing is Deleted." When
tags: [nothing-is-deleted, session-forensics, trace-dig, conversation-revert, jsonl-preservation, git-safety]
created: 2026-02-14
source: rrr: nazt/hello-oracle
---

# Session .jsonl files are the last line of defense for "Nothing is Deleted." When

Session .jsonl files are the last line of defense for "Nothing is Deleted." When work is reverted at the conversation level (Claude Code message revert), it bypasses git entirely — no commits, no reflog, no stash. But session .jsonl files at ~/.claude/projects/ preserve the full conversation including all code written and reverted. Discovery method: /trace --dig scans .jsonl files and finds sessions with reverted work. Recommended pattern: commit to a feature branch before reverting, so the code lives in git history as an artifact, not just a story in handoffs.

---
*Added via Oracle Learn*
