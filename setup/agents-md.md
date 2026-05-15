---
layout: page
title: AGENTS.md — Single Source of Truth
---

# AGENTS.md — Single Source of Truth

**Purpose:** One file that every AI tool reads. No duplication, no drift.

---

## The Problem

Most projects end up with `CLAUDE.md` for Claude Code, `.cursorrules` for Cursor, a system prompt somewhere else — the same rules written three times, drifting apart.

## The Fix

Write your instructions once in `AGENTS.md`. Symlink everything else to it.

```
project-root/
├── AGENTS.md          ← the file you actually maintain
├── CLAUDE.md          ← symlink → AGENTS.md
├── .cursorrules       ← symlink → AGENTS.md
└── .agent/            ← deeper context, referenced from AGENTS.md
```

```bash
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md .cursorrules
```

Git tracks the symlinks. Claude Code follows them. One edit propagates everywhere.

---

## What Goes in AGENTS.md

- Project context (stack, architecture, conventions)
- Boundaries (what the AI should never do without approval)
- Workflow rules (how to commit, test, escalate)
- A pointer to `.agent/` for deeper context

Keep it short. `AGENTS.md` is the entry point, not the manual. Escalation levels, anti-pattern logs, and shared context live in `.agent/` and get referenced from here.

---

## What About Start Session / End Session?

That pattern solved a real problem: no auto-loading, no persistent memory. Both are now native.

Claude Code auto-loads `CLAUDE.md` (via the symlink) on every session. Persistent memory lives in `.agent/memory/` — committed, not recalled from a command. Session commands are still useful for complex re-entry or tools without auto-loading. For Claude Code, they're optional.

---

## Why AGENTS.md as Primary?

`AGENTS.md` is the emerging cross-tool standard. `CLAUDE.md` stays as the Claude Code entry point — it just follows rather than leads.

---

*From [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — methodology from production use across 20+ repos.*
