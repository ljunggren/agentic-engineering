---
layout: page
title: MCP Setup
---

# MCP Setup

**Purpose:** Give your AI access to tools beyond the filesystem — browsers, databases, APIs, custom scripts. MCP (Model Context Protocol) is how modern AI agents connect to external systems. This file shows the standard setup pattern, with Playwright as the canonical example.

---

## What MCP Is

Without MCP, your AI can read files, run shell commands, and edit code. With MCP, it can navigate a browser, query a database, call an API, or run any tool you expose as a server. MCP is the extension mechanism — AGENTS.md tells the AI what to do; MCP gives it the hands to do more.

---

## The Config File

Create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

This is auto-loaded by Claude Code. Commit it to the repo — every developer's AI gets the same tools.

---

## Playwright MCP

Playwright MCP gives your AI a browser. Standard use cases:

- Navigate to a URL and take a screenshot
- Verify UI after a code change
- Scrape structured data from a page
- Test a user flow end-to-end

**Permissions (Claude Code):** Claude Code requires explicit opt-in for MCP tool calls. Add a `.claude/settings.local.json` to your project (gitignore this — it's per-developer):

```json
{
  "permissions": {
    "allow": [
      "mcp__playwright__browser_navigate",
      "mcp__playwright__browser_snapshot",
      "mcp__playwright__browser_take_screenshot"
    ]
  }
}
```

Or approve interactively the first time each tool is called.

---

## Adding More Servers

The pattern is the same for any MCP server:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "your-tool": {
      "command": "npx",
      "args": ["your-mcp-package"]
    }
  }
}
```

Common servers: database connectors, Slack, GitHub, file watchers, custom scripts via `mcp-server-*` packages.

---

## What to Commit vs. Gitignore

| File | Commit? | Why |
|------|---------|-----|
| `.mcp.json` | Yes | Shared tool config — every developer gets the same setup |
| `.claude/settings.local.json` | No | Per-developer permissions — paths and approvals vary |

---

## How to Use This

1. Copy `.mcp.json` into your project root
2. Install the MCP server: `npx @playwright/mcp@latest` (or let `npx` fetch it on first use)
3. Add `.claude/settings.local.json` with the permissions you want pre-approved
4. Tell your AI: "Use the playwright MCP server to [task]"

---

*From [Mats Ljunggren](https://www.linkedin.com/in/matsljunggren/) — methodology from production use across 20+ repos.*
