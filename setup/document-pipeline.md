---
layout: page
title: Document Factory Pipeline
permalink: /setup/document-pipeline/
---

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
</script>

A structured approach to producing reliable analytical documents with LLMs. Each stage has a defined input, a defined output, and a quality gate before the next stage runs. The boundary between the deterministic upstream and the LLM-assisted downstream is the key architectural decision.

<pre class="mermaid">
flowchart TD
    RAW[("Raw Observations\ninterviews · measurements · assessments")]
    LENS(["Lens\nstrategic question\ne.g. 'create or cut?'"])

    subgraph UPSTREAM ["Deterministic — structured · version-controlled · testable"]
        S1["Stage 1 — Structure\nRaw observations → typed findings\nclaim_type declared for every finding:\nmeasured · inferred · attributed · general"]
        G1{"all findings\ntyped & sourced?"}
        S2["Stage 2 — Synthesise\nFindings → draft scoped by lens\nModel answers one narrow question\nusing only validated stage-1 inputs"]
        G2{"draft answers\nthe lens question?"}
    end

    subgraph DOWNSTREAM ["LLM-assisted — constrained synthesis"]
        S3["Stage 3 — Rubric\n14-item automated check:\ngrounded in a finding · claim type honoured\nno banned vocabulary · scope respected\nno peer-cited number as proprietary data"]
        G3{"all rubric\nitems pass?"}
        S4["Stage 4 — Format\nSame claims · audience-appropriate\nvocabulary · altitude · length caps\nUnderlying claims do not change"]
    end

    S5["Stage 5 — Human Review\nStructured output checked against known rubric\nReviewer trust compounds across runs\nMinutes, not hours"]
    OUT[/"Deliverable"/]
    FIX["Fix upstream\nand re-run"]
    HT["High-temperature LLM pass\nRaw source → divergent ideas\nExplore what a single pass misses"]

    RAW --> S1
    S1 --> G1
    G1 -->|yes| S2
    G1 -->|no, reject| S1
    LENS --> S2
    S2 --> G2
    G2 -->|yes| S3
    G2 -->|no| S2
    S3 --> G3
    G3 -->|pass| S4
    G3 -->|fail| FIX
    FIX --> S3
    S4 --> S5
    S5 --> OUT
    RAW -.->|high-temp exploration| HT
    HT -.->|backpropagate what holds up| S3
</pre>

The load-bearing piece is Stage 1: a schema that forces every analytical claim to declare what it is, where it comes from, what type it is, and what would falsify it. Everything else is infrastructure around that constraint.

The optimisation target is not output quality. It is minutes of human review per approved deliverable. Quality is a constraint. Review time is what you minimise.

Described in detail in [Stop Writing Reports. Start Manufacturing Them.](/agentic-engineering/blog/the-report-as-a-factory-floor/).
