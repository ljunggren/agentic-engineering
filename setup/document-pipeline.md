---
layout: page
title: Document Factory Pipeline
permalink: /setup/document-pipeline/
---

A structured approach to producing reliable analytical documents with LLMs. Each stage has a defined input, a defined output, and a quality gate before the next stage runs.

```
Raw Observations
(measured data · interviews · assessments)
         │
         ▼
┌─────────────────────────────────────────┐
│  Stage 1 — Structure                    │
│  Raw observations → typed findings      │
│  Gate: every finding declares its       │
│  claim type (measured / inferred /      │
│  attributed / general)                  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Stage 2 — Synthesise                   │
│  Findings → draft, scoped by a lens     │
│  Gate: draft answers the lens question  │
│  using only validated stage-1 inputs    │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Stage 3 — Rubric                       │
│  Every claim checked automatically      │
│  Gate: all rubric items pass or the     │
│  stage fails — no exceptions            │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Stage 4 — Format                       │
│  Same claims, audience-appropriate      │
│  vocabulary and altitude                │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  Stage 5 — Human Review                 │
│  Structured output checked against      │
│  known rubric — minutes, not hours      │
└─────────────────────────────────────────┘
         │
         ▼
      Deliverable
```

The load-bearing piece is Stage 1: a schema that forces every analytical claim to declare what it is, where it comes from, what type it is, and what would falsify it. Everything else is infrastructure around that constraint.

Described in detail in [The Report as a Factory Floor](/agentic-engineering/blog/the-report-as-a-factory-floor/).
