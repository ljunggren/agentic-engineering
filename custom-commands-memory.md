# Custom Commands & AI Memory

**Purpose:** End the cold start. Give your AI memory that persists across sessions.

---

## The Problem

Every AI session starts from zero. No memory of yesterday's bug. No context about your architecture. No idea it already tried the wrong approach last week.

## The Fix

Three things:

### 1. Commands File

Create `.agent/commands.md` — a single file where you define every command your AI responds to. Start with two:

- **`start session`** — read memory files, check recent changes, load context
- **`end session`** — save what was learned, flag what's unfinished

Add more as your workflow evolves. `push`, `review`, `check status` — whatever you find yourself repeating. One file, all your commands, always discoverable.

### 2. Memory Files

Create `.agent/memory/` — a directory where your AI writes down what it learns:

- **Anti-patterns** — mistakes it made, so it never repeats them
- **Project context** — architecture decisions, conventions, known issues
- **Journal** — what happened last session, what's next

Your AI reads these on every session start. The files grow. The AI gets sharper. Day 1 vs day 30 on the same repo is a completely different experience.

### 3. Connect Them

Your `start session` command reads the memory. Your `end session` command updates it. The commands drive the memory. The memory compounds.

---

## How to Use This

Give this URL to your AI and say: *"Set up custom commands and memory files for my project based on this."*

Your AI will figure out the right structure for your stack.

---

*Created by [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — from daily use across 17 repos.*
