---
name: playwright-cli
description: >
  Headless browser automation for testing, scraping, and interaction using the
  agent-browser CLI tool. Navigate, click, type, snapshot, and screenshot pages
  via structured commands. Use when: automating browser tasks, web scraping,
  testing web pages, browser interaction, taking screenshots programmatically.
  Triggers: browser automation, playwright, agent-browser, headless browser,
  web scraping.
metadata:
  author: Z.AI
  version: "1.0.0"
license: MIT
---

# Playwright CLI — Browser Automation Skill

Headless browser automation for testing, scraping, and interaction using the `agent-browser` CLI tool.

## Installation

```bash
npm install -g agent-browser
agent-browser install
```

## Quick Start

```bash
agent-browser open <url>        # Navigate to page
agent-browser snapshot -i       # Get interactive elements with refs
agent-browser click @e1         # Click element by ref
agent-browser fill @e2 "text"   # Fill input field
agent-browser screenshot        # Capture page screenshot
agent-browser close             # Close browser
```

## Core Commands

### Navigation
- `agent-browser open <url>` — Navigate to URL
- `agent-browser back` / `forward` / `reload` / `close`

### Snapshot (Page Analysis)
- `agent-browser snapshot` — Full accessibility tree
- `agent-browser snapshot -i` — Interactive elements only (recommended)
- `agent-browser snapshot -c` — Compact output
- `agent-browser snapshot -d 3` — Limit depth to 3

### Interactions (use @refs from snapshot)
- `agent-browser click @e1` — Click element
- `agent-browser fill @e2 "text"` — Clear and type text
- `agent-browser type @e2 "text"` — Type without clearing
- `agent-browser press Enter` — Press keyboard key
- `agent-browser hover @e1` — Hover over element
- `agent-browser scroll down 500` — Scroll page
- `agent-browser drag @e1 @e2` — Drag and drop

### Get Information
- `agent-browser get text @e1` — Get element text
- `agent-browser get html @e1` — Get innerHTML
- `agent-browser get value @e1` — Get input value
- `agent-browser get attr @e1 href` — Get attribute value
- `agent-browser get title` — Get page title
- `agent-browser get url` — Get current URL

### Check State
- `agent-browser is visible @e1` — Check visibility
- `agent-browser is enabled @e1` — Check if enabled

### Wait
- `agent-browser wait @e1` — Wait for element
- `agent-browser wait 2000` — Wait milliseconds
- `agent-browser wait --text "Success"` — Wait for text
- `agent-browser wait --load networkidle` — Wait for network idle

### Screenshots & Debugging
- `agent-browser screenshot` — Screenshot page
- `agent-browser screenshot path.png` — Save to file
- `agent-browser screenshot --full` — Full page screenshot
- `agent-browser errors` — View page JS errors
- `agent-browser console` — View console messages
- `agent-browser eval "document.title"` — Run JavaScript

## Example: Form Submission

```bash
agent-browser open https://example.com/form
agent-browser snapshot -i
agent-browser fill @e1 "user@example.com"
agent-browser fill @e2 "password123"
agent-browser click @e3
agent-browser wait --load networkidle
agent-browser snapshot -i
```

## Sessions (Parallel Browsers)

```bash
agent-browser --session test1 open site-a.com
agent-browser --session test2 open site-b.com
agent-browser --session test1 snapshot
```

## Notes
- Refs are stable per page load but change on navigation
- Always snapshot after navigation to get new refs
- Use `fill` instead of `type` for input fields (clears existing text)
- Source: https://github.com/vercel-labs/agent-browser
