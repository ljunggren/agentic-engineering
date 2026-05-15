---
layout: post
title: "We Forgot How to Be Engineers"
date: 2026-04-21
author: Mats Ljunggren
---

AI coding tools made shipping fast. They didn't make engineering fast. We've been confusing the two, and the bill comes due a few weeks after the demo.

I shipped a data pipeline in an afternoon. It worked. The client was happy. The numbers on the dashboard were the numbers they should be. Three weeks later, I'm rebuilding it — because "it worked" turned out to be a thin layer over "it runs on my laptop, dies at 2am, and can't be resumed." That gap — between *working* and *engineering* — is where we're all spending more time than we admit.

This isn't a complaint about AI tools. It's the opposite. The tools are doing exactly what we ask of them. The problem is what we're asking.

<!--more-->

## The dopamine loop we didn't notice

A decade ago, social media trained a generation of engineers to optimize for likes and hearts. Now AI coding tools have trained us to optimize for the green checkmark. Same muscle, different surface: **the result is the thing.** How you got there is future-you's problem.

Pre-LLM, the friction of typing out a few hundred lines yourself was enough to make you stop halfway through and ask *"wait, why am I storing state in flat JSON files named after integers?"* The typing was the thinking. Now the typing is free, and the thinking has to come from somewhere else — deliberately, because nothing else will make it happen.

The good news: if the sloppiness is what you're asking for, the craft is also what you can ask for. The model will do either with equal willingness. You just have to decide which.

Here are five things that separate "shipped a script" from "built a system." None of them are new. All of them are obvious in hindsight. The question is whether you ask for them upfront, or notice their absence three weeks later.

## 1. Write the recipe first

Before touching code, write a design document. Not a plan for the happy path — a plan for the failure modes. What happens when a stage crashes mid-write. What happens when an upstream API silently returns an empty array instead of an error. What happens when you need to re-run one part without redoing the three parts before it.

The happy path writes itself. The failure modes are where the design lives.

Spend an hour on the recipe and you'll save two days on the implementation. It's never the other way around. And once the recipe exists, it does something the code can't: it gives the model something to be consistent *about*.

The recipe I wrote for this rebuild is 391 lines across 11 sections. One of them is a 10-rule stage contract — every stage declares its inputs, validates them, writes to a temp file, and writes `status=ok` as the very last action. That's the whole contract. Every stage follows it.

## 2. System-agnostic runtime

Don't ship code whose correctness depends on which machine runs it.

My bash pipeline ran fine on my Mac and on the Linux CI box. It fell over the moment anyone tried it on Windows. The failures weren't interesting — they were dumb. CRLF vs LF line endings. No native `jq`. PowerShell and bash sharing no syntactic assumptions. Path separators. Each fix was five minutes once found, and each took an hour to find.

This isn't a tooling complaint. It's a robustness argument. Pick a runtime with consistent semantics across environments and an entire category of bugs disappears before you write the first line. The specific choice matters less than the principle: the more your code's correctness depends on its environment, the more surface you've given to "works on my laptop."

For this rebuild: bash + `jq` out, NodeJS + TypeScript in. NodeJS was already a dependency for other parts of the project, so the switch cost nothing. What it bought: the same runtime on every machine that matters — Mac, Linux, Windows — same string handling, same path semantics, same everything. A full class of cross-platform bugs, gone before the first line of the rewrite.

## 3. Pipelines, not agent loops

Agents are the wrong primitive for most of what people are building.

An agent loop is the model picking its own steps — pick a tool, call it, observe, pick the next tool, repeat. That's the right primitive when the steps aren't known in advance: exploratory research, novel debugging, open-ended triage.

A pipeline is the opposite: a human designs the graph of steps once, and the model fills in the work at each node. The orchestrator decides what runs when; the model only has to do the task at hand. Deterministic, cheap, debuggable.

Most "agentic" systems I see are actually pipelines wearing an agent costume. The steps are known. The sequence is known. The failure modes are known. Letting the model choose its next step in a known pipeline is worse, not better — it's non-determinism where determinism is free.

Name the shape correctly and the architecture simplifies. Call a pipeline a pipeline.

This rebuild: six stages — resolve, fetch, parse, deployments, signals, summary — running in that order, every time. The orchestrator decides what runs when. The model only does the work inside each stage. No choosing. No wandering. It's a pipeline.

## 4. Stages with fixtures

Every stage should be a pure function — its output determined entirely by its inputs, its effect on the world limited to the files it declares as outputs.

That constraint is what makes everything else work. Pure stages are individually testable: each one gets its own test file with real fixtures captured from actual runs. When a stage breaks, you know *which* stage, because its test fails in isolation — no need to re-run the whole pipeline to find the failure. Pure stages are runnable on demand. A human can point any single stage at cached data and run it standalone. Pure stages are swappable: replace the parser, replace the summarizer, replace anything — the interfaces stay the same.

None of this is novel. It's the same design you'd apply to any well-factored system. The only interesting thing is how easily we skip all of it when the tooling doesn't force us to, and how willingly the model skips it when we don't ask.

Each stage in this rebuild has a test file next to it — `parse.test.ts` next to `parse.ts`, `summary.test.ts` next to `summary.ts`. Each test runs the stage against a real fixture captured from an actual pipeline run, committed to the repo. When parsing breaks, only `parse.test.ts` goes red. I know exactly where the failure is within seconds, without running the rest of the pipeline.

## 5. Abort, resume, repair

Failure isn't a bug. It's a mode.

My bash pipeline had one failure strategy: re-run from the top. Every crash cost twenty minutes of redundant work, so every crash hurt, so I stopped trusting the pipeline and started running stages by hand.

The rebuilt version treats failure as a first-class citizen. Resume mode restarts after a crash by picking up where it left off. Repair mode scans for broken outputs and re-runs just the affected stages. Re-run-from-a-stage forces a clean redo when you've edited something. Each mode is one flag, and together they turn a crash from a catastrophe into a checkpoint.

Design for failure and failure stops costing you. Design against failure, or ignore it, and every failure costs the full price.

Three flags handle the three modes. `--resume` picks up where the pipeline crashed, skipping every stage that already finished. `--repair` scans for broken or missing outputs and re-runs only the affected stages. `--from parse` forces a clean redo from a specific stage onward. Each is one command. Each failure mode is a first-class citizen.

## The part that surprised me

I wrote the recipe and handed it to the model. What I wasn't expecting: now that the recipe exists, **the model follows it more rigorously than I do.**

Every stage gets the atomic write. Every stage writes its status file as the last action. Every schema is validated. When the model hits a genuinely ambiguous case, it stops and asks instead of forcing a workaround.

Not because the model is smart. Because the model doesn't get tired on a Wednesday at 11:20pm and decide "good enough." The discipline I keep failing to maintain, it maintains for free. I just had to write it down once.

## Ask for an engineer

**The LLM is the most consistent engineer in the room — once you give it something to be consistent *about*.**

The sloppiness was always mine. The scripts were mine. The shortcuts were mine. The model did exactly what I asked: ship the result, skip the craft. When I started asking for an engineer — write the recipe, follow the recipe, flag every place you can't — I got an engineer.

Agents are great. The reason to keep them around is that, given a good recipe, they're more consistent than we are. They don't get tired. They don't cut corners at 11:20pm. They don't skip the atomic write because "it'll probably be fine."

But they'll only ever be as good as what you ask for. The green checkmark is seductive in the same way the double-tap heart is seductive. Both give you a hit that has nothing to do with whether the thing you made is any good.

Write the recipe. Hand it to the model. Watch the model follow it better than you do.

Then ask yourself why that is.
