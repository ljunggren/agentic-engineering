# Agentic Engineering — Index

A structured reference to every methodology file in this repo. Start wherever makes sense for you, or follow the suggested order below.

---

## Suggested Reading Order

### 1. [Agent Instructions Starter](agent-instructions-starter.md)
**Start here.** A template that gives your AI project context, communication style, boundaries, and workflow rules from the first message. Copy it, fill in your stack details, and point your AI at it.

### 2. [Escalation Levels](escalation-levels.md)
Define when your AI should proceed autonomously (Level 0), inform you after acting (Level 1), propose and wait for approval (Level 2), or stop completely (Level 3). This prevents your AI from making high-risk decisions without oversight.

### 3. [Custom Commands & Memory](custom-commands-memory.md)
End the cold start problem. Set up `start session` / `end session` commands and a memory directory so your AI learns from previous sessions instead of starting from zero every time.

### 4. [Shared Context](shared-context.md)
Commit your AI's memory to the repo. Every bug someone catches makes everyone's AI smarter. Every architectural decision is context, not tribal knowledge. The repo becomes the handoff.

---

## All Files

| File | Purpose | Complexity |
|------|---------|------------|
| [agent-instructions-starter.md](agent-instructions-starter.md) | Context and boundaries for your AI | Low — copy and customize |
| [escalation-levels.md](escalation-levels.md) | Risk-based autonomy levels | Low — customize examples to your domain |
| [custom-commands-memory.md](custom-commands-memory.md) | Persistent memory across sessions | Medium — requires directory setup |
| [shared-context.md](shared-context.md) | Team-wide AI memory via version control | Medium — builds on custom commands |
| [CLAUDE-template.md](CLAUDE-template.md) | Entry point for Claude Code | Low — copy to CLAUDE.md |

---

## How to Use These Together

Set up a `CLAUDE.md` and `.agent/` directory in your project root:

```
project-root/
├── CLAUDE.md                ← entry point, auto-loaded by Claude Code
└── .agent/
    ├── instructions.md      ← from agent-instructions-starter.md
    ├── escalation-levels.md ← copied directly
    ├── commands.md          ← from custom-commands-memory.md
    ├── context/             ← from shared-context.md (committed, shared)
    └── memory/
        ├── anti-patterns.md
        ├── context.md
        └── journal.md
```

Start with [CLAUDE-template.md](CLAUDE-template.md) for your `CLAUDE.md` — it's auto-loaded by Claude Code and points to `.agent/`. Other tools (Cursor, Copilot) have their own entry points — see [agent-instructions-starter.md](agent-instructions-starter.md) for tool-specific setup.

The files reference each other but work independently — use one or use all.

---

*More files are being added regularly. Follow [Mats Ljunggren on LinkedIn](https://www.linkedin.com/in/matsljunggren/) for context and war stories behind each one.*
