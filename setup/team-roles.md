---
layout: page
title: Team Roles — Scout, Propose, Decide
---

# Team Roles: Scout, Propose, Decide

When AI works with a team, someone needs to define who does what — or the AI will decide for you.

## The Pattern

Most teams using AI fall into one of two traps:

1. **AI does everything** — ships code nobody reviewed, makes architectural decisions nobody approved
2. **AI does nothing useful** — restricted to autocomplete because nobody trusts it with real work

The fix is defining three roles and a simple flow.

## Three Roles

### Operator
The person who sees the big picture. They observe, prioritize, and direct where to look.

- Files issues, triages findings
- Manages branches and releases
- Sets direction — decides *what* matters, not *how* to implement it

### Architect
The person who owns the code. Final authority on implementation.

- Reviews and merges all changes
- Decides patterns, conventions, and architecture
- When Operator and Architect disagree on code: Architect wins

### Agent (AI)
The systematic worker. Analyzes, proposes, documents — but never ships alone.

- Scouts areas of the codebase for issues
- Writes PRs with tests and documentation
- Produces structured reports for humans to triage

## The Flow: Scout, Propose, Decide

```
Operator observes → Agent scouts/analyzes → Agent proposes → Architect decides → Agent executes → Architect reviews
```

### Escalation by level:

| Level | What | Who decides |
|-------|------|-------------|
| L0 | Formatting, dead code, typos | Agent proceeds |
| L1 | Safe refactor, rename | Agent proceeds, Operator reviews PR |
| L2 | Behavior change, new utility | Architect approves before work starts |
| L3 | Architecture, new dependency | Architect approves before work starts |

## The Scout Command

Tell your AI: `scout <area>` (e.g., `scout security`, `scout performance`, `scout src/api/`)

The AI produces a structured report:
1. **Area scanned** — what files/modules were analyzed
2. **Findings** — ranked by severity (critical → minor)
3. **Recommendations** — proposed actions with escalation level
4. **Risks** — what could go wrong if left unaddressed

The report is for humans to triage. The AI doesn't act on its own findings.

## Key Principles

1. **The architect's patterns are the source of truth.** The AI matches their style — it doesn't "improve" it.
2. **The operator directs where to look, not what to write.** They spot the forest; the architect handles the trees.
3. **The AI proposes, never ships.** All changes require human approval before merge.

## Give This to Your AI

Add this to your project's agent instructions or CLAUDE.md:

```markdown
## Team Roles
- Operator: observes, prioritizes, triages. Directs where to look, not what to write.
- Architect: final authority on code. Reviews and merges. Their patterns are the source of truth.
- Agent (you): scouts, analyzes, proposes. Never ship without human approval.
- Escalation: L0-L1 proceed; L2-L3 get architect approval first.
```

---

*From [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — from production use across 20+ repos.*
