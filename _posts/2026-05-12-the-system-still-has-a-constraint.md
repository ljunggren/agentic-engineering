---
layout: post
title: "Theory of LLM Constraints"
date: 2026-05-12
author: Mats Ljunggren
---

The more I work with LLMs, the more I realise the classics are still right. Goldratt (*The Goal*), Gene Kim (*The Phoenix Project*), Humble and Farley (*Continuous Delivery*), Deming: the frameworks they gave us don't become obsolete when you introduce AI. They become more useful, because now the system is moving faster and at higher throughput, a broken process breaks faster.

In this article series I want to make that case. I'll revisit the theory, mix it with practical approaches you can actually use, and try to make it relevant whether you're writing code yourself or trying to figure out how to lead an AI adoption programme in your company.

This first article is about the most common thing I see go wrong, and what to do about it.

<!--more-->

## Teams adopt AI and delivery doesn't speed up

*The Goal* (1984) makes one central claim: every system is limited by its weakest link. Improving any step that isn't the constraint doesn't increase throughput; it just creates work piling up at the real bottleneck. The five focusing steps: identify the constraint, exploit it, subordinate everything else to it, elevate it, and when it moves, start again.

For most software teams before AI, the constraint was somewhere in development. There was more work to do than engineers could write. AI directly attacks that constraint. If your engineers are now generating code significantly faster, the constraint has moved. In almost every case it moves to the same place: review, integration, and validation.

The numbers back this up. Thoughtworks measured it: AI tools accelerated individual coding tasks by 30%. Net delivery improvement: 8%.[^1] Faros measured the downstream effect: in teams that adopted AI generation tools, pull requests generated increased 98%. Review wait time increased 91%.[^2] In my own work and across the engagements I've looked at, rework rates go up too: the same files touched repeatedly in the weeks after a feature ships.

The teams went faster at writing code and slower at everything that turned code into working software. This is exactly what Goldratt predicts when you improve a non-constraint.

Gene Kim's Three Ways framework (*The DevOps Handbook*) makes the same point from a different angle. The First Way is flow: work moves left to right, fast. The Second Way is feedback: signals from the right side of the system inform the left, quickly. AI optimises the First Way almost perfectly. It barely touches the second. You can't accelerate flow in isolation and expect the system to improve. The feedback loops are what make the flow sustainable.

## The mistake most teams make

When teams realise AI makes coding faster, the natural instinct is to use it to generate more features. That's the wrong starting point. You're improving the stage that isn't the constraint and piling more work in front of the review bottleneck that is.

The speed gain is visible immediately. The constraint shift is invisible, at first. Developers feel more productive, and at their local task they are. The downstream saturation builds gradually: PR cycle time creeps up, review quality degrades, defect rates drift. By the time the signal is clear, you have months of AI-assisted code committed under conditions of inadequate review.

## The takeaway: build the scaffolding first

If review and integration are the constraint, the fix isn't to slow down generation. It's to direct the LLM to build the quality gate before it generates the feature.

In practice this means asking the LLM to produce the scaffolding first:

- **Tests:** write the test suite before writing the implementation. Ask the LLM to make the tests pass, not to generate code you'll test later. This is standard TDD discipline, and under AI-assisted development it's no longer optional; it's the mechanism that makes fast generation safe.
- **Non-functional requirements:** define performance, security, and reliability constraints upfront. The LLM can help draft these, and having them explicit before any feature code is written means the generation is constrained by the right requirements from the start.
- **Deployment infrastructure:** CI/CD pipelines, container configuration, environment parity. Ask the LLM to set this up before you're generating features. A deployment pipeline that runs tests on every commit is the automated quality gate that keeps the review constraint from saturating.

Deming's principle ("build quality in, don't inspect it in") is the right frame. The review bottleneck exists because quality is inspected after the fact. The LLM makes it practical to build the gate first: scaffolding that used to take days now takes hours. The argument that used to lose to delivery pressure no longer does.

With the gate in place, code generation flows through a validated system. Without it, generation feeds a review queue that can't keep up.

## How to know if it's working

Building the scaffolding first is only useful if you can tell whether it's actually moving the constraint. Two metrics worth tracking:

PR cycle time is the system-level signal: the time from opening a pull request to merging it. If it's still climbing after you adopt scaffolding-first, either the quality gate isn't doing its job or review capacity is still the bottleneck for other reasons. It tells you whether the constraint moved.

Rework rate is the quality signal: how often the same files get modified repeatedly in short succession. High rework means the tests and NFRs didn't catch what they should have. You're fixing things post-merge that the gate should have stopped pre-merge. The 2025 DORA report formalised rework rate as a metric that year for good reason: across 22,000 developers, quality and stability signals worsened even as throughput improved.[^3]

Together they give you a feedback loop on your own process. Cycle time trending down while rework stays low means the scaffolding is working. Cycle time down but rework spiking means you shipped faster but lower quality. Both still high means the constraint hasn't moved yet.

I'll go deeper on measurement in a later article. For now: if you pick up nothing else from this piece, track these two numbers before and after you change your approach to LLM prompting. The signal will be there within a few weeks.

## What this series will cover

Each article takes a principle from the canon and shows what it predicts about AI adoption, and what to do about it. Some will go into theory; some will show practical approaches from real work. The goal is to be useful whether you're writing code or leading a team.

The practices still count. The theory explains why.

If you haven't read *The Goal*, *The Phoenix Project*, or *Continuous Delivery*, now is a good time. If you have, they're worth re-reading. The frameworks hold, and they read differently when your team is generating code an order of magnitude faster than it did when those books were written.


[^1]: Thoughtworks, ["How much faster can coding assistants really make software delivery?"](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/how-faster-coding-assistants-software-delivery), February 2025. One client engagement, 150 tickets, GitHub Copilot; Thoughtworks note 5–15% as the range they observe across organisations. Worth reading alongside the METR RCT (July 2025), which found experienced developers were 19% *slower* when using AI tools — and still believed they'd been 20% faster: [metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
[^2]: Faros AI, ["AI Productivity Paradox Report 2025"](https://www.faros.ai/ai-productivity-paradox), December 2025. Telemetry from 10,000+ developers across 1,255 teams. The full report also shows 9% more bugs per developer and 154% larger average PR size.
[^3]: Google Cloud / DORA, ["2025 DORA Report"](https://dora.dev/dora-report-2025/). Rework rate was formalised as a DORA metric in 2025. 2026 telemetry across 22,000 developers showed quality and stability signals "worsened considerably" despite throughput improvements.
