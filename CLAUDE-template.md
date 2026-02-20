# CLAUDE.md — Starter Template

**Purpose:** The entry point for Claude Code. This file is auto-loaded when Claude Code opens your project. Use it to point to your `.agent/` directory where the real rules live.

Copy this file to `CLAUDE.md` in your project root and customize it.

---

```markdown
# Project: [your-project-name]

## GitHub

- **Required gh user:** [your-username]
- Before any `git push`, verify the active gh account: `gh auth status`

## Instructions

All project rules live in `.agent/`. Read on session start:
- `.agent/instructions.md` — project context, tone, workflow
- `.agent/escalation-levels.md` — L0–L3 autonomy boundaries
- `.agent/commands.md` — session commands (start session, end session)
```

---

## Why Keep CLAUDE.md Thin

CLAUDE.md is loaded automatically on every interaction. Keep it minimal:
- **GitHub/auth config** — things Claude needs before pushing
- **Pointers to `.agent/`** — where the detailed rules live

The `.agent/` directory holds the real methodology: instructions, escalation levels, commands, memory, shared context. Those files are modular, code-reviewed, and shared across the team. CLAUDE.md just wires them up.

## Other Tools

CLAUDE.md is Claude Code-specific. Other tools have their own entry points:
- **Cursor:** `.cursorrules`
- **GitHub Copilot:** Workspace instructions
- **ChatGPT / Claude web:** Paste `.agent/instructions.md` at conversation start

The `.agent/` directory works with all of them — only the entry point changes.

---

*Created by [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — from daily use across 17 repos.*
