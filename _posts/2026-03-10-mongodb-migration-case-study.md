---
layout: post
title: "MongoDB 4 → 8 in About 8 Hours of Actual Work"
date: 2026-03-10
author: Mats Ljunggren
---

In late January 2026, we needed to migrate a production SaaS platform from MongoDB on legacy CentOS servers to MongoDB 8.0 on new Ubuntu infrastructure. That meant upgrading Mongoose from 6 to 8 — which meant converting every database call in the codebase from callbacks to async/await. A running production system. Paying customers. No downtime budget.

The result: **zero downtime. Zero data loss. Customers never noticed.** On the calendar it spanned about a month — but the actual working time was around 8 hours, spread across three attempts. Here's the full story — including the parts that don't make it into a changelog.

## The Setup

The codebase was a mature Node.js/Express application — years of accumulated controllers, all using Mongoose callbacks. The kind of code that works perfectly and is terrifying to touch.

Mongoose 8 dropped callback support entirely. There was no incremental path. Every `Model.findOne(query, function(err, doc) { ... })` had to become `const doc = await Model.findOne(query)`. Across 25+ controller files.

The AI agent (Claude) would do the heavy lifting. I'd direct, review, and make the judgment calls. That was the plan.

## Two Throw-Away Branches (and Why That's Fine)

The first attempt tried to do everything at once. The AI made too many singular commits — file by file, losing the big picture. The PR bloated to 40 files mixing migration, testing infrastructure, and documentation. It technically worked, but the code quality wasn't where it needed to be. I closed the PR after a week, noted the learnings, and threw away the branch.

Second attempt: I tried to reuse parts of the first branch. The AI picked up patterns from the first attempt — including the ones that weren't good enough — and carried them forward. The result was better than attempt one, but still not where it needed to be. Thrown away.

**Two false starts, and I'd do it the same way again.** This is one of the underappreciated advantages of working with AI agents on large refactors. A false start costs you a branch name — nothing else. You note down what went wrong, teach the agent the specific lessons — "don't make singular commits per file," "don't reuse code from the failed branch," "keep the PR focused on migration only" — and start fresh from main. The agent doesn't carry ego from the first attempt. It just applies the new constraints and does better.

Each attempt taught the AI the codebase: which controllers depended on which, where the tricky callbacks lived, what patterns to avoid. The branches were disposable. The learning wasn't.

The third attempt started from scratch with a focused approach. Two phases:

1. **Remove all callbacks** — keep Mongoose 6, just modernize the calling patterns
2. **Bump the version** — with async/await already in place, the actual upgrade becomes mechanical

The first PR converted ~25 controller files from callbacks to async/await. Clean diff. Single concern. Merged on February 1st.

Release 11.0.0.

## 12 Releases in One Day

The first merge surfaced issues that only show up under real conditions. That's expected with a migration this size — the point is how fast you can find and fix them.

**Releases 11.0.1–11.0.2** — Minifier syntax error and a staging connection string. Straightforward.

**Releases 11.0.3–11.0.5** — Token-based login for Jenkins CI broke. Added debug logging, traced the token extraction issue, fixed it across three iterations.

**Releases 11.0.6–11.0.11** — The interesting one. `req.query` in Express is **immutable**. The old callback code had worked around this accidentally — the async refactor exposed it. Every internal route that passed modified query parameters needed updating. The fix was elegant: `Object.create(req)` creates a prototype-linked wrapper where you can set properties without mutating the original.

Twelve releases in one day. Each one a small, targeted fix deployed in minutes. **Zero downtime throughout.** This is what fast iteration on a live system looks like — not chaos, but a tight feedback loop where issues get surfaced and resolved before they compound.

## The Actual Upgrade

With callbacks already removed, bumping Mongoose from 6.13.0 to 8.7.0 was anticlimactic. Eight controller files needed deprecated method updates (`.remove()` → `.deleteOne()`, `.update()` → `.updateOne()`). We added integration tests — including a static analysis test that scanned the codebase for any remaining callback patterns.

Release 11.0.14. Staged. Verified via SSH. Quiet.

## The Server Migration

February 6th. Five releases to point connection strings at the new MongoDB 8.0 servers — updated hosts, added auth credentials (MongoDB 8.0 requires authentication by default), and set `authSource=admin`. Three iterations to get the auth config right. Anyone who's migrated MongoDB versions will recognize the pattern: the new defaults catch you one at a time. Again, zero downtime — each config change deployed cleanly.

## The 26 Callbacks QA Caught

February 12th. A week after the Mongoose upgrade merged. Everything had been quiet. Then QA hit the version control workflows — stash, pop, revert — and the app started cycling.

```
MongooseError: Query.prototype.exec() no longer accepts a callback
```

Twenty-six callback-style `updateOne`/`updateMany`/`insertMany` calls. Missed in the migration. Lurking in `_commits.js`, `_templates.js`, and `_versions.js`.

Why did we miss them? Because our E2E tests only covered the happy path: login, signup, project creation. Nobody was testing VCS operations in the automated suite. These callbacks sat dormant until QA ran the full workflow.

This is the part of the story I find most instructive. We had:
- A methodical two-phase migration
- A static analysis test for callback detection
- Integration tests
- E2E tests

And we still missed 26 callbacks. The static analysis test? It was added *after* the version bump in Phase 2 — so it never scanned the files that were "already done" in Phase 1.

**The methodology caught 90% of the problems. QA caught the rest before users ever saw them.** That's what QA is for. But the gap still bothered me — it was preventable.

## The TDD Fix

Here's where the approach changed. Same pattern as the false starts: note down the learnings, teach the AI, start fresh. But this time, tests first.

Twenty unit tests. Every single callback site in `_commits.js`, `_templates.js`, and `_versions.js` got a test that:
1. Called the function
2. Verified it used async/await (not callbacks)
3. Verified correct error handling

All 20 tests failed against the existing code. Red. Then we converted the callbacks. All 20 passed. Green.

This was the right approach from the start. If we had written tests before Phase 1 — tests that would fail on callback patterns and pass on async/await — we would have caught all 26 missed callbacks in one pass. TDD isn't just a coding discipline. It's a migration safety net.

The PR description told the story plainly:

> *All tests fail before fix (TDD red), all pass after (TDD green). mongoose-compat integration suite confirms no callback patterns remain.*

Release 11.0.21. QA passed clean. Done.

## The Aftermath

Two more cleanup releases followed. Session store bloat from `saveUninitialized: true` — every bot and crawler was creating MongoDB sessions. And CI alignment: Node 20 to 24, Mongo 7 to 8.

## By the Numbers

| Metric | Value |
|--------|-------|
| Production downtime | **Zero** |
| Data loss | **Zero** |
| Actual working time | ~8 hours across 3 attempts |
| Calendar span | ~1 month (Jan 28 – Feb 22) |
| Releases | 21 migration-related |
| PRs merged | 4 |
| Throw-away branches | 2 (third time was the charm) |
| Callbacks caught by QA | 26 |
| TDD tests written | 20 |

## What I'd Do Differently

**Write the tests before the migration, not during.** The static analysis test (`mongoose-compat.spec.js`) that scanned for callback patterns was the single most valuable artifact from this project. If it had existed before Phase 1 instead of being added during Phase 2, we would have caught every callback in one pass.

**Throw away branches faster.** The first attempt taught the codebase topology. The second taught us not to reuse bad code. Both were valuable — but we held onto each one too long before cutting. When a branch starts feeling wrong, that's the signal: note down what you learned, teach the AI the constraints, start fresh from main. Branches are free. Reviewing a messy PR is not.

**Test the paths users actually use, not just the ones you remember.** Our E2E tests covered login, signup, and project creation. Real users stash, revert, and manage commits. QA caught the gap — but the point of TDD is to catch it before QA has to.

## What Worked

**The two-phase approach.** Separating "remove callbacks" from "bump version" reduced the blast radius of each change dramatically. Phase 1 was a refactor. Phase 2 was a dependency update. Neither was both.

**Small, fast releases.** Twelve releases in a day sounds like chaos. It was controlled chaos. Each release was a single fix, deployed in minutes. The alternative — batching fixes into a "patch release" — would have meant hours of debugging in production instead of minutes.

**Honest documentation.** Every session was journaled. Every failure was logged with root cause and fix. When QA flagged the 26 remaining callbacks, we could trace exactly which files had been migrated, which hadn't, and why the gap existed. The journal cut diagnosis time from hours to minutes.

**TDD for the final pass.** The 20-test suite written for the QA fix became the permanent regression test. Any future Mongoose upgrade — or any new controller — gets automatically validated against the callback detection patterns. The fix produced better infrastructure than the original plan did.

---

*The MongoDB migration is one part of a broader methodology I've been developing for human-AI collaboration in production engineering work. The full series is at [github.com/ljunggren/agentic-engineering](https://github.com/ljunggren/agentic-engineering).*

*Written with the help of Claude. Obviously. That's the whole point.*
