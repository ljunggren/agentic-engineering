---
layout: page
title: Index
---

# Agentic Engineering — Index

A structured reference to every methodology file in this repo. Use these to give your AI the operational infrastructure it's missing.

---

## Setting Up AI Collaboration

### 1. [Agent Instructions Starter](setup/agent-instructions-starter.md)
**Start here.** A template that gives your AI project context, communication style, boundaries, and workflow rules from the first message. Copy it, fill in your stack details, and point your AI at it.

### 2. [Engineering Principles](setup/principles.md)
The load-bearing beliefs behind AI-assisted development — pair mode, verification rate, module boundaries, feedback speed. Feed this to your AI alongside your project instructions.

### 3. [Escalation Levels](setup/escalation-levels.md)
Define when your AI should proceed autonomously, inform you after acting, propose and wait for approval, or stop completely. This prevents your AI from making high-risk decisions without oversight.

### 4. [AGENTS.md — Single Source of Truth](setup/agents-md.md)
One file every tool reads. `CLAUDE.md` becomes a symlink to `AGENTS.md` — no duplication, no drift between tools.

### 5. [Shared Context](setup/shared-context.md)
Commit your AI's memory to the repo. Every bug someone catches makes everyone's AI smarter. Every architectural decision is context, not tribal knowledge.

### 6. [Team Roles](setup/team-roles.md)
For teams: Scout, Propose, Decide — clear roles so the AI never decides what humans should decide, and humans never block what AI should do.

---

## All Files

| File | Purpose | Complexity |
|------|---------|------------|
| [agent-instructions-starter.md](setup/agent-instructions-starter.md) | Context and boundaries for your AI | Low — copy and customize |
| [principles.md](setup/principles.md) | Core beliefs — pair mode, verification rate, boundaries, feedback | Low — feed as context |
| [escalation-levels.md](setup/escalation-levels.md) | Risk-based autonomy levels | Low — customize to your domain |
| [agents-md.md](setup/agents-md.md) | AGENTS.md as single source of truth, CLAUDE.md symlink | Low — one command to set up |
| [shared-context.md](setup/shared-context.md) | Team-wide AI memory via version control | Medium — builds on instructions |
| [team-roles.md](setup/team-roles.md) | Scout, Propose, Decide — roles for human-AI teams | Low — read and adapt |

---

## Project Setup

```
project-root/
├── AGENTS.md            ← single source of truth (all tools)
├── CLAUDE.md            ← symlink → AGENTS.md (auto-loaded by Claude Code)
└── .agent/
    ├── instructions.md  ← from agent-instructions-starter.md
    ├── escalation-levels.md
    └── context/         ← from shared-context.md (committed, shared)
```

Create the symlink with: `ln -s AGENTS.md CLAUDE.md`

The files reference each other but work independently — use one or use all.

---

*Follow [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) on LinkedIn for context behind each one.*

---

## Articles

Longer pieces on the theory and practice behind these files: [ljunggren.github.io/agentic-engineering/blog/]({{ "/blog/" | prepend: site.baseurl }})
