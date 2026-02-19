# Agentic Engineering

Actionable methodology files for human-AI collaboration. Feed these to your AI and see what happens.

## What This Is

Most teams using AI have no system — just ad-hoc prompting and hope. These files give your AI the operational infrastructure it's missing: escalation rules, memory, decision boundaries, and guardrails.

Each file is self-contained. Copy it into your project, point your AI at it, and start working.

## The Files

| File | What It Does |
|------|-------------|
| [agent-instructions-starter.md](agent-instructions-starter.md) | Give your AI context and boundaries from the first message |
| [custom-commands-memory.md](custom-commands-memory.md) | Session commands, memory files — end the cold start |
| [escalation-levels.md](escalation-levels.md) | Defines when AI should proceed, inform, propose, or stop |

*More files shipping weekly. Follow [Mats Ljunggren on LinkedIn](https://www.linkedin.com/in/matsljunggren/) for context and war stories behind each one.*

## How to Use

1. Pick a file relevant to your problem
2. Copy it into your project (e.g., in a `.agent/` directory)
3. Tell your AI: "Follow the instructions in .agent/[filename]"
4. Customize the examples to match your project
5. When something goes wrong, update the file — that's the methodology

## About

Built by [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) from daily production use across 17 repos. 22 years of enterprise IT, now focused on making human-AI collaboration reliable, repeatable, and safe.

This isn't theory. Every file here comes from real work — bugs caught, incidents prevented, methodology refined through actual shipping.
