# Agentic Engineering

Actionable methodology files for human-AI collaboration. Feed these to your AI and see what happens.

## What This Is

Most teams using AI have no system — just ad-hoc prompting and hope. These files give your AI the operational infrastructure it's missing: escalation rules, memory, decision boundaries, and guardrails.

Each file is self-contained. Copy it into your project, point your AI at it, and start working.

## Quick Start

1. Browse the **[Index](index.md)** to see all available files
2. Pick the ones relevant to your problem
3. Copy them into your project (e.g., in a `.agent/` directory)
4. Tell your AI: "Follow the instructions in .agent/[filename]"
5. Customize the examples to match your project
6. When something goes wrong, update the file — that's the methodology

## The Files

**Setup & Infrastructure**

| File | What It Does |
|------|-------------|
| [Agent Instructions Starter](setup/agent-instructions-starter.md) | Give your AI context and boundaries from the first message |
| [AGENTS.md — Single Source of Truth](setup/agents-md.md) | One file every tool reads — CLAUDE.md as a symlink |
| [Escalation Levels](setup/escalation-levels.md) | Defines when AI should proceed, inform, propose, or stop |
| [Team Roles](setup/team-roles.md) | Scout, Propose, Decide — clear roles for human-AI teams |
| [Shared Context](setup/shared-context.md) | Commit AI memory to the repo — team-wide compounding |

See **[index.md](index.md)** for a structured overview with suggested reading order.

*Follow [Mats Ljunggren on LinkedIn](https://www.linkedin.com/in/matsljunggren/) for context behind each one.*

## Browse Online

Visit the site: **[ljunggren.github.io/agentic-engineering](https://ljunggren.github.io/agentic-engineering/)**

## About

Built by [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) from production use across 20+ repos and paid technical engagements.

This isn't theory. Every file here comes from real work — bugs caught, incidents prevented, methodology refined through actual shipping.
