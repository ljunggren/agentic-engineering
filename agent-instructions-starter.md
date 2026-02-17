# Agent Instructions — Starter Template

**Purpose:** Give your AI context and boundaries from the first message. Copy this file into your project as `.agent/instructions.md` and customize it. Feed it to your AI at the start of every session, or configure your tool to load it automatically.

---

## Communication

- Be direct. Don't be sycophantic. If my approach is wrong, say so and explain why.
- Don't pad responses with compliments or hedging. Get to the point.
- If you're uncertain, say "I'm not sure" instead of guessing confidently.
- Ask clarifying questions before starting work if the task is ambiguous.

## Project Context

*Customize this section for your project.*

- **Language/stack:** [e.g., TypeScript, React, Node.js, PostgreSQL]
- **Package manager:** [e.g., npm, pnpm, bun]
- **Test framework:** [e.g., Jest, Vitest, Pytest]
- **Code style:** [e.g., ESLint config, Prettier, follow existing patterns]
- **Architecture:** [e.g., monorepo, microservices, MVC — one sentence]

## Boundaries

- Don't modify files in `/config` or `/infrastructure` without proposing changes first.
- Don't change public APIs or interfaces without approval.
- Don't delete files. Propose deletions and explain why.
- Don't install new dependencies without asking. Explain what it does and why it's needed.

## Workflow

- Run tests before committing. Every time. No exceptions.
- Write tests for new functionality before marking work as done.
- Keep commits small and focused. One logical change per commit.
- When making changes, read the existing code first. Don't rewrite what you don't understand.

## When to Stop

- If you're about to touch authentication, payments, or user data — stop and explain your plan.
- If a task requires changes to more than 5 files — stop and propose an approach.
- If tests fail after your changes — stop. Don't keep layering fixes on top of a broken state.
- If you're unsure whether something is safe — ask. The cost of asking is zero. The cost of guessing wrong is not.

---

## How to Use This

1. Copy this file to `.agent/instructions.md` in your project root
2. Replace the bracketed `[placeholders]` with your project specifics
3. Add rules as you discover what your AI gets wrong — this is a living document
4. Point your AI at it: "Read and follow .agent/instructions.md before starting"

### Tool-specific setup

- **Claude Code:** Place as `CLAUDE.md` in your project root (loaded automatically)
- **Cursor:** Add to `.cursorrules` in your project root
- **GitHub Copilot:** Reference in your prompt or workspace instructions
- **ChatGPT/Claude web:** Paste at the start of your conversation

## What Comes Next

This starter file is step one. As your AI collaboration matures, you'll want to break it out into a full `.agent/` directory with specialized files:

1. **Escalation levels** — Define when AI should proceed autonomously vs. stop and ask (not everything is equal risk)
2. **Run scripts** — One command each for build, test, deploy — so your AI can fail safely and you can recover in 30 seconds
3. **Testing strategy** — Make your AI write tests first, not as an afterthought
4. **Read-only policies** — Protect specs, schemas, and configs from "helpful" AI edits
5. **Decision flows** — Visual diagrams for recurring decisions (commit? escalate? refactor?)
6. **Anti-pattern log** — When your AI makes a mistake, write it down so it never happens twice
7. **Session memory** — Context that carries across sessions instead of cold-starting every time

Each of these will be published as a standalone file in this repo. Follow along on [LinkedIn](https://www.linkedin.com/in/matsljunggren/) for the context and war stories behind each one.

---

*Created by [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — agentic engineering methodology from daily production use across 10+ repos.*
