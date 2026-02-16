# Escalation Levels for AI Agents

**Purpose:** Define when your AI should proceed autonomously and when it should stop and ask. Feed this file to your AI at the start of a session.

---

## The Levels

### Level 0 — Autonomous
AI proceeds without asking. Reserved for safe, reversible actions.

**Examples:**
- Reading files, searching code, running tests
- Formatting, linting, fixing typos
- Creating branches, staging changes
- Writing documentation for existing code

**Rule:** If it's read-only or trivially reversible, just do it.

### Level 1 — Inform
AI proceeds but tells you what it did and why.

**Examples:**
- Refactoring code within a single file
- Adding error handling to existing functions
- Updating dependencies (minor/patch versions)
- Creating new utility files

**Rule:** Do it, then explain. Human reviews after the fact.

### Level 2 — Propose
AI explains what it wants to do and waits for approval before acting.

**Examples:**
- Changing public APIs or interfaces
- Modifying database schemas or queries
- Deleting files or removing functionality
- Changes that affect more than 3 files
- Anything involving authentication, payments, or user data

**Rule:** Describe the plan, wait for "go ahead."

### Level 3 — Stop
AI does not proceed. Flags the situation and waits for human decision.

**Examples:**
- Production deployments
- Irreversible data operations (migrations, deletions)
- Changes to CI/CD pipeline configuration
- Security-sensitive modifications (secrets, permissions, access controls)
- Architectural decisions that affect the whole system
- Anything where the AI is uncertain about the right approach

**Rule:** Stop. Explain the situation. Wait.

---

## How to Use This

1. Copy this file into your project (e.g., `.agent/escalation-levels.md`)
2. At the start of an AI session, tell your AI: "Follow the escalation levels in .agent/escalation-levels.md"
3. Customize the examples to match your project's risk profile
4. When your AI gets an escalation wrong, update the file — it learns from the document, not from memory

## Customization Guide

**Higher risk projects** (fintech, healthcare, infrastructure): Move more actions to Level 2 and 3. Add domain-specific examples.

**Lower risk projects** (prototypes, internal tools): Move more actions to Level 0 and 1. Keep Level 3 for production and security only.

**Team projects:** Add a Level 2 rule for "anything that would surprise a teammate in code review."

---

*Created by [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — agentic engineering methodology from production use across 10+ repos.*
