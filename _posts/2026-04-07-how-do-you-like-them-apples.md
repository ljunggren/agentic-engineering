---
layout: post
title: "How Do You Like Them Apples?"
date: 2026-04-07
author: Mats Ljunggren
---

In *Good Will Hunting*, there's a scene where the autodidact janitor humiliates a Harvard grad student in a bar. Will (Matt Damon) quotes the right historians, makes the ponytail guy look small, and walks away with the phone number of the girl Ponytail had been hitting on. Later, through the window of a coffee shop, he flashes the number with a grin: *"How do you like them apples?"*

The autodidact wins. The credentialed guy is the joke.

This post is the reverse.

<!--more-->

## Why I took the course

I've been shipping with LLMs for a while now. Real work. Production code. Paying clients. I started with ChatGPT when it was new, moved through a couple of IDE-based coding agents, and for the last six months I've been using Claude Code as my daily driver — building MCP servers, shipping client work, writing about the methodology, all of it.

So when I signed up for Anthropic's official *Building with the Claude API* course, I expected a refresher. Maybe one or two "huh, didn't think about it that way" moments. Mostly review.

That's not what happened. I found three skill gaps I didn't know I had — gaps that all the shipping had not surfaced, because the gaps were in things I'd learned to work *around* without learning to work *with*.

Here they are.

## Gap 1: I wasn't doing systematic prompt evaluations

I was doing what every shipping engineer does: write a prompt, run it five times against the inputs I care about, ship it if it "feels right." If something broke later, I'd notice in production, tweak the prompt, and run it five more times. Vibes-driven prompt engineering.

It works until it doesn't. And you don't notice the failure mode, because you're not measuring against a stable baseline — you're measuring against your current intuition, which drifts as you tweak.

The course walks you through actual eval design: build a golden dataset of inputs and expected behavior, write a judge prompt (or use a model as a judge), run regressions every time you change the prompt, track the score over time. None of this is rocket science. Most of it is the same discipline I'd apply to any production code I cared about. I just hadn't applied it to prompts because prompts feel like *configuration*, not code.

They aren't. They're code that lives outside your version control discipline unless you make it live inside.

I've started porting prompts in my client work into a small eval harness. The first time I ran it, I caught a regression I'd shipped two weeks earlier. That was humbling.

## Gap 2: I'd been writing MCP servers without knowing the MCP Inspector existed

This is the embarrassing one.

I've shipped multiple MCP servers. I have an npm package built around MCP integration for a SaaS product. I write blog posts about MCP. By any external measure, I am an "MCP person."

And I'd been debugging my MCP servers by tailing JSON-RPC logs and squinting.

Not because I lacked tests — the unit-test side was fine, and I'm going to keep writing them. The gap was on the *interactive* side. It's the same gap as having full coverage on an API and still wanting Postman: tests prove something works; interactive inspection lets you understand what's happening when you don't yet know what to test for. Two different jobs, and I'd been doing one of them with my eyes closed.

There is, it turns out, an official tool for the interactive side. It's called the **MCP Inspector**, it's part of the Model Context Protocol toolchain, and it gives you a UI to inspect tool definitions, send test calls, and see exactly what your server is returning in real time. It is *excellent*. It would have saved me hours of squinting at log output across dozens of debugging sessions where the right move was "fire one test call and look at the response," not "tail the logs and guess."

The course mentioned it in passing. I felt like an idiot. (I was.)

The autodidact pattern here is specific and worth naming: **when you build something the hard way and it works, you stop looking for the easy way.** You've internalized the pain. You assume the pain is intrinsic to the task. You don't go searching for tools because you've already solved the problem the tools would have solved. The tool exists, it's been there the whole time, and you've never typed its name into a search bar because you didn't know there was a search to make.

This is the autodidact's blind spot in its purest form.

## Gap 3: I didn't have a vocabulary for workflows vs. agents

The third gap is the one most relevant to anyone doing agentic engineering work, so I'll spend the most time on it.

The course teaches a clean taxonomy of agentic patterns:

- **Chaining workflows** — break a task into sequential steps, where each LLM call processes the output of the previous one
- **Routing workflows** — classify an input and direct it to a specialized follow-up call
- **Parallelization workflows** — run multiple LLM calls simultaneously and aggregate the results
- **Agents and tools** — give a model a set of tools and let it decide which to call, in what order, until the task is done
- **Environment inspection** — let the model observe the state of the system it's acting on before deciding what to do next

And underneath all of these, the distinction that frames everything else: **workflows vs. agents.** A workflow is a predetermined path — you, the engineer, decide the steps and the model fills in the work at each step. An agent is the inverse — the model decides the steps. They look superficially similar from the outside ("an LLM did some stuff"), but they have wildly different cost profiles, failure modes, debugging strategies, and trust requirements.

I'd been shipping versions of all of these. A technical audit toolkit I'm building for a client engagement runs eight analysis scripts in parallel and aggregates the results — that's a textbook parallelization workflow. My MCP server tooling uses chaining. Some of my client work uses real agent patterns (the model picking tools dynamically). What I was missing was the names — and along with the names, the precision. I'd been using "agent" as a generic word for any LLM-driven process, when half of what I was building was actually workflows.

This sounds like a small thing. It is not.

**Naming patterns lets you choose them deliberately.** Instead of feeling your way into a design, you ask: *"Is this a workflow or an agent? If it's a workflow, is it chaining or routing?"* and the answer often clarifies the architecture before you write a line of code. You also stop accidentally using one pattern when another would fit better — I've already caught one case in my own work where I was using chaining when routing would have been simpler and faster.

**Naming patterns lets you talk to other engineers.** When I tell a teammate "this is a routing workflow with environment inspection," they immediately know what I mean — the failure modes to watch for, the latency profile, the cost implications, the trust boundary. When I say "uh, it's like a thing where the model looks at the state and then picks a path," I'm starting from zero every time.

**Naming patterns is what separates a craft from a folklore.** The autodidact has folklore: things they've figured out, often deeply, but with idiosyncratic vocabulary. Craft has shared names. Shared names compound — every engineer who learns the taxonomy can read every other engineer's design and understand it. Folklore doesn't compound; it has to be re-explained every time.

I'd been writing folklore. Now I'm trying to write craft.

## Autodidact vs. school: a longer reflection

I've been an autodidact for most of my career. Telecom systems, the Boozang test automation platform, the agentic engineering methodology I've been writing about for the last year — all of it self-taught, learned by building things and breaking them and reading whatever I needed to read.

I'm not anti-school. I know what formal training gives you when it's good. But for most of my career, my mode has been: encounter a problem, find the closest thing I can build with what I know, learn what I'm missing as I go.

That mode has a real strength. You get good fast at the things that are in front of you. You build deep, idiosyncratic intuition for the systems you actually use. You never waste time learning things you'll never apply.

It also has a real weakness, which I underrated until last week. **You don't know what you don't know.** You don't know what you'd be learning if someone had handed you a curriculum. You don't know which standard tools exist for the problems you've already solved the hard way. You don't know which patterns have names. You can be productive for years inside a valley you've explored thoroughly, while the rest of the territory exists on a map you've never seen.

School gives you the map. It doesn't necessarily make you good — there are plenty of people with credentials who can't ship anything — but it tells you what's out there. It points at the things you'd never discover by yourself because you didn't know to look.

The honest answer is that both modes are real, and both modes are incomplete. The autodidact who sneers at credentials is missing the map. The credentialed person who hasn't shipped is missing the territory. The good engineers I know — the ones I want to work with, the ones whose code I trust — have a foot in both. They built things, then went back and learned the names for what they'd built. Or they learned the names first, then went out and built. Either order works. Doing only one half doesn't.

I'd been doing only one half.

## Should you take the course?

If you've been shipping with any LLM API for a while and you've been telling yourself you don't need the official course because you "already know this stuff" — you probably don't. I didn't. The course is a few hours. It's free. The cost-benefit math is absurd.

The version of you that takes the course will be slightly embarrassed for an afternoon and meaningfully better at the work for years. That's a trade I'd make every time.

How do you like them apples?
