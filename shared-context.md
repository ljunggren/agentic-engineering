# Shared Context

**Purpose:** Commit your AI's memory to the repo so every developer's AI gets smarter on every push.

---

## The Problem

Custom commands and memory files solve the cold start for one developer. But the knowledge stays local. Your teammate discovers an edge case at 11pm — and your AI has no idea the next morning.

Tribal knowledge trapped in Slack threads, meeting notes, and people's heads. Except now it's trapped in individual AI memory files too.

## The Fix

Commit the memory to the repo.

### 1. Shared Memory Directory

Move project-level context out of personal memory and into a committed directory:

```
.agent/
├── instructions.md        ← project rules (already committed)
├── escalation-levels.md   ← risk boundaries (already committed)
├── commands.md            ← session commands (already committed)
├── context/               ← shared, version-controlled
│   ├── architecture.md    ← system design decisions
│   ├── anti-patterns.md   ← mistakes the whole team should avoid
│   └── conventions.md     ← naming, patterns, stack-specific rules
└── memory/                ← personal, gitignored
    └── journal.md         ← your session-specific notes
```

The split matters: `context/` is shared truth. `memory/` is personal scratchpad.

### 2. What Goes In

Every time your AI (or you) discovers something that applies to the whole project, it goes into `context/`:

- **Anti-patterns** — "Don't use X library for Y because Z" — logged once, avoided forever by every developer
- **Architecture decisions** — "We chose Postgres over Mongo because..." — no more re-explaining to each AI session
- **Conventions** — "All API responses use camelCase" — consistency without code review friction
- **Known issues** — "The staging DB drops connections after 30min idle" — save everyone the debugging time

### 3. The Workflow

It's the workflow you already use:

1. Developer's AI learns something during a session
2. `end session` flags it as a candidate for shared context
3. Developer reviews and commits to `context/`
4. PR gets code reviewed like any other change
5. Next developer runs `start session` — their AI already knows

No new tools. No new process. Git push.

### 4. What Compounds

After a few weeks:
- New developers onboard in minutes — their AI reads the full project context on first session
- Edge cases caught once are caught everywhere
- Architecture decisions survive team turnover
- The repo becomes the documentation — living, growing, always current

---

## How to Use This

Give this URL to your AI and say: *"Set up a shared context directory for my project based on this. Separate shared context from personal memory."*

Your AI will figure out the right structure for your stack.

---

*Created by [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — from daily use across 17 repos.*
