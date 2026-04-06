---
Task ID: 1
Agent: Super Z (main)
Task: Fix blank/white screen error on promptc-os deployed sites

Work Log:
- Cloned repo from https://github.com/marktantongco/promptc-os
- Checked live sites: promptcos.vercel.app and marktantongco.github.io/promptc-os — both showed blank white screens
- Built project locally — build succeeded with no errors
- Used agent-browser to inspect live Vercel site — found `<div id="root"></div>` was empty
- Checked browser console: `ReferenceError: useRef is not defined`
- Searched App.jsx: `useRef` was used 17 times but never imported from React
- Line 1 had: `import { useState, useCallback, useMemo, useEffect } from "react";`
- Fixed by adding `useRef` to the import
- Rebuilt and tested locally — app renders correctly with no errors
- Committed fix and pushed to GitHub main branch
- Deployed to Vercel production via `npx vercel --prod`
- Verified all 3 sites working: promptcos.vercel.app, promptc-os-latest.vercel.app, marktantongco.github.io/promptc-os

Stage Summary:
- Root cause: Missing `useRef` import in src/App.jsx line 1
- Fix: Added `useRef` to the React import statement
- Commit: ad0cedc "fix: add missing useRef import — app was blank/white screen"
- All deployments verified working

---
Task ID: 2
Agent: Super Z (main)
Task: Apply system prompt as agents.md + install referenced skills

Work Log:
- Created .github/agents.md with full system prompt (core rules, advocacy mode, writing rules, Recommended Next Step, 3 Suggestions rotation)
- Created CLAUDE.md at project root as Claude Code compatibility copy
- Fetched and installed 6 skills into skills/ directory:
  1. GSAP Animations (33K chars from raw GitHub) — scroll, stagger, timeline, SVG, text
  2. Photography AI (33K chars from GitHub Pages) — visual engineering framework
  3. Playwright CLI (agent-browser) — wrote comprehensive SKILL.md for browser automation
  4. UIUX Pro Max — copied full skill with data assets (28 CSV files, typography, colors, stacks)
  5. Front-End Design — copied coding-agent skill for full-stack dev patterns
  6. Skills.sh — referenced as external directory in agents.md
- Added project-specific context to agents.md (color system, typography, motion, build commands)
- Committed 55 files (5,093 insertions) as commit 5b67ecb
- Pushed to GitHub and deployed to Vercel production

Stage Summary:
- .github/agents.md — GitHub Copilot agent instructions with system prompt
- CLAUDE.md — Claude Code root-level agent instructions
- skills/ — 6 installed skill directories with SKILL.md files and data assets
- Commit: 5b67ecb "feat: add agents.md system prompt + install 6 skills"
- Deployed to https://promptc-os-latest.vercel.app/ and https://promptcos.vercel.app/
