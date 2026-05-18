---
layout: post
title: "Stop Writing Reports. Start Manufacturing Them."
date: 2026-05-13
author: Mats Ljunggren
---

Last month I delivered a technical due diligence report. Architecture review, algorithm assessment, cost model, AI-readiness: the kind of document that takes a senior team two weeks to produce.

I didn't write it. I manufactured it.

That distinction is the whole point of this post.

<!--more-->

<!--more-->

## The blank page is a symptom

The thing nobody says out loud about analytical writing: the blank page isn't a writing problem. It's an architecture problem. You're staring at a cursor because you haven't structured the upstream work well enough for the document to follow naturally.

The usual response is to start writing anyway and hope the structure emerges. Sometimes it does. More often you get a first draft that needs to be ripped apart and reassembled, because the "writing" step is actually doing the work that should have happened in three earlier stages. The draft catches the errors the upstream work missed.

That's not a writing process. It's a review process wearing a writing costume.

## The factory inversion

The insight that changed how I work: **a report is not a document. It is a production run.**

Every analytical deliverable has the same underlying structure, regardless of the subject. There's raw data. There are derived interpretations. There are claims: measured, inferred, interview-attributed, or industry-general. There's a strategic question being asked. There's an audience with a specific vocabulary and altitude.

These are not things you figure out while writing. They're inputs to writing. If you haven't structured them before you start, you're doing two jobs at once: synthesising and writing. Both suffer.

The factory separates them. Five stages, each with a defined input, a defined output, and a gate before the next stage runs.

**Stage 1** takes raw observations from the engagement (what I saw, what was measured, what people said) and structures them into findings. Each finding declares its `claim_type`: measured, inferred, interview-attributed, or industry-generality. The schema enforces this. A finding without a declared claim type is rejected. The stage doesn't complete until the findings are clean.

**Stage 2** synthesises findings into a draft, scoped by a lens: a strategic question like "create or cut?" or "services vs. product shape?" The lens filters and orders the findings before the synthesis runs. The model gets a narrow job: answer this question using these validated inputs.

**Stage 3** runs the rubric. Every claim in the draft is checked against a 14-item checklist: grounded in a stage-1 finding, claim type honoured, no banned vocabulary, no over-scoped recommendation, no peer-cited number presented as a proprietary measurement. The rubric is automated. The stage fails if any item fails. The factory doesn't care that it's 11pm.

**Stage 4** formats the output for a specific audience. Vocabulary substitution, length caps, altitude rules. The underlying claims don't change. The rendering does.

**Stage 5** is human review, but by this point, the reviewer is checking a structured output against a known rubric, not reading a free-form draft and trying to decide if it feels right.

## Why determinism upstream matters

The most important architectural choice in the factory is the boundary between stages 1–2 (structured, hand-curated, version-controlled) and stages 3–4 (LLM-assisted, stochastic-but-bounded). Everything upstream of that boundary is a pure function or a validated artifact. Everything downstream is constrained synthesis.

This matters because of how review actually works.

When a reviewer reads a free-form LLM draft, they have to re-derive everything from scratch: where did this number come from, is this inference or measurement, does this recommendation fit the scope we agreed on? The review cost is proportional to the upstream variance.

When a reviewer reads a factory output, the claims are labelled, the findings are sourced, the rubric has already run. The review is checking a specific list of items against a known standard. That's minutes, not hours. And crucially, **reviewer trust compounds**: once the stage-2 findings are signed off, a new lens applied to the same findings doesn't re-open upstream decisions.

The optimisation target of the factory is not output quality. It's minutes of human review per approved deliverable. Quality is a constraint. Review time is what you minimise.

## What the factory doesn't do

It doesn't tell you what matters. Stage 1 (the observations) is entirely human. The factory can't tell you which data to look at, which interview signals are important, which patterns to care about. That's judgment. The factory amplifies judgment; it doesn't produce it.

The failure mode I want to avoid: treating the factory as a black box that generates insight. It generates structure. Insight comes from the observations you put in. Garbage in, well-structured garbage out.

## The real artifact

The core of the factory is `schemas/finding.schema.json`, a short JSON schema that forces every analytical claim to declare four things: what the claim is, where it comes from, what type it is (measured / inferred / attributed / general), and what would falsify it.

That schema is the load-bearing piece. Everything else (the prompts, the lenses, the rubric, the stages) is infrastructure around the constraint that schema enforces.

The pipeline is diagrammed at [setup/document-pipeline](/agentic-engineering/setup/document-pipeline/).

---

What's your current mechanism for catching category errors in analytical outputs before they ship?
