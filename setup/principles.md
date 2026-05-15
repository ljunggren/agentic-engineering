---
layout: page
title: Engineering Principles
---

# Engineering Principles for AI-Assisted Development

**Purpose:** A compact set of principles for working with AI on production code. Feed this file to your AI alongside your project instructions. These aren't rules to follow blindly — they're load-bearing beliefs about what makes AI-assisted development work vs. fail.

---

## On pairing

**Pair mode beats autonomous mode.** Human-in-the-loop with AI co-authoring outperforms AI running unsupervised. Use AI as a collaborator that proposes; you dispose. The moment the AI is making decisions that should be yours, something has gone wrong.

**AI accelerates what's already there.** A well-bounded, well-tested codebase gets faster with AI. A tangled codebase gets tangled faster. The foundation comes first; AI comes second. Don't add AI to a system that isn't working without it.

---

## On verification

**If AI generates at rate R, verify at ≥ 2R.** Generation has gotten cheap. Verification hasn't. The loop between them is where quality lives. If you're reading AI-generated code without running it, you are merging plausible-looking output, not working code.

**Run the code. Don't just read it.** Every AI-generated change should be executed, not eyeballed. Commit frequently — every few minutes during active AI sessions, not in large batches. Small commits are checkpoints you can return to; large ones are bets you can't unwind.

**Tests are the specification.** Write the test before or immediately after the change. Under AI-assisted development this isn't optional — it's the only reliable signal that what was generated actually does what you intended. Tests that pass when the code is broken are worse than no tests.

---

## On boundaries

**Clear module boundaries enable AI.** AI agents work well on small, bounded units with clear inputs and outputs. They fail on tangled systems where changing one thing requires understanding everything. If the AI keeps needing more context, the system probably lacks boundaries.

**One agent, one responsibility.** An agent that does one thing is debuggable and composable. An agent that does ten things is a black box. Prefer many focused agents over one general one.

---

## On feedback speed

**Slow feedback breaks the loop.** If CI takes longer than the time between commits, the feedback loop is broken. The AI generates; the human verifies; the system confirms — all of these must happen at compatible speeds or errors compound invisibly.

**Surface problems early.** Don't save findings for the end. Whether it's a failing test, a design concern, or a misunderstood requirement — raise it when you first see it. Deferred feedback is deferred cost.

---

## On judgment

**The AI proposes; you decide.** Don't let the AI make architectural decisions, security decisions, or decisions about what the product should do. These require context the AI doesn't have and consequences the AI doesn't bear.

**When uncertain, stop and ask.** A paused AI that flags uncertainty costs you minutes. An AI that proceeds confidently in the wrong direction costs you hours. Uncertainty is information — treat it as such.

---

## How to use this

Copy this file into your project (e.g., `.agent/principles.md`) and include it in your AI's context at session start. Customize examples to your domain. If a principle gets violated and causes a problem, update the file — the methodology improves from real incidents, not theory.

---

*From [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — distilled from production use across 20+ repos and paid technical engagements.*
