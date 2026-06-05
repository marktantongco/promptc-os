# AGENTS.md

> **Persistent operating instructions for all AI agents working in this environment.**

---

## OPERATING PRINCIPLE: NO ONE-OFF WORK

You do not execute tasks. You build systems.

*Every time I ask you to do something that could happen again —
you do not just do it.
You turn it into a skill that runs itself.*

---

## THE RULE

If I ask you to do X:

1. **Do it manually first** (3–10 real examples only — no skill file yet)
2. **Show me the output.** Ask: "Does this look right?"
3. **If I approve** → write the SKILL.md in `skills/<name>/SKILL.md`
4. **If it repeats on a schedule** → set up a cron job

*The test: If I have to ask for the same thing twice — you failed.
First ask = discovery. Second ask = it should already be a skill on a cron.*

---

## BEFORE CREATING ANY SKILL — CHECK FIRST

Search `skills/` for an existing skill that covers this.

- If one exists → **extend it.** Do not duplicate.
- If none exists → **create a new one.**

*Every skill must be MECE: One type of work. One owner skill. Zero overlap. Zero gaps.*

---

## SKILL FORMAT (skills.sh Standard)

Every skill MUST follow the **skills.sh open agent skills ecosystem** standard.
Skills are directories containing a `SKILL.md` file with YAML frontmatter.

### Required SKILL.md Structure

```markdown
---
name: <kebab-case-directory-name>
description: >
  What this skill does and when to use it. Include trigger phrases
  and keywords for auto-loading. First sentence: what the skill does.
  Following sentences: when to use it, keywords, trigger phrases.
metadata:
  author: Z.AI
  version: "1.0.0"
license: MIT
---

# Skill Name

## When to Use
<Trigger conditions and keywords for auto-activation>

## Instructions
<Step-by-step workflow from input to output>

## Constraints
<Hard rules — what this skill must never do>

## Examples
<1–2 samples of ideal output>
```

### Required Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | **Yes** | Unique kebab-case identifier matching directory name |
| `description` | **Yes** | What skill does + when to use it + trigger phrases |
| `metadata.author` | **Yes** | Author of the skill |
| `metadata.version` | **Yes** | Semantic version string |
| `license` | **Yes** | License identifier (MIT, Proprietary, etc.) |
| `metadata.internal` | No | Set `true` to hide from normal discovery |

### Installation (skills.sh CLI)

```bash
# Install a specific skill from this repo
npx skills add marktantongco/promptc-os --skill <skill-name>

# Install all skills from this repo
npx skills add marktantongco/promptc-os

# List available skills
npx skills add marktantongco/promptc-os --list

# Install globally
npx skills add marktantongco/promptc-os --skill <name> -g
```

### Skill Discovery Locations

The `npx skills add` CLI discovers skills in these directories:
- `skills/` (primary — where all 69 skills live)
- `.claude/skills/` (Claude Code compatibility)
- `.agents/skills/` (Codex/OpenAI compatibility)

---

## HOW TO BUILD A SKILL

Follow every step. No skipping.

1. **CONCEPT** — Describe the process in plain language. What triggers it? What does it do? What does done look like?
2. **PROTOTYPE** — Run it on 3–10 real items. No skill file yet. Show me the output.
3. **EVALUATE** — Wait for my approval. Revise until it's right.
4. **CODIFY** — Write the SKILL.md file with YAML frontmatter + these sections:
   - `When to Use`: trigger conditions and keywords
   - `Instructions`: step-by-step workflow from input to output
   - `Constraints`: hard rules — what this skill must never do
   - `Examples`: 1–2 samples of ideal output
5. **CRON** — If this repeats → schedule it. Do not wait for me to ask.
6. **MONITOR** — Check the first 3 automated runs. Flag anything off. Iterate.

---

## PLAN → VALIDATE → EXECUTE (for complex tasks)

Before running any batch task or destructive action:

1. **Write a plan file first** (what you will do, in order)
2. **Show me the plan** — wait for approval
3. **Then execute**

Never execute first and explain later.

---

## HOW EVERY CONVERSATION MUST END

When I say "can you do X" — the conversation is not done until:

- [x] X has been prototyped
- [x] X has been approved by me
- [x] X exists as a SKILL.md in `skills/<name>/SKILL.md`
- [x] X is on a cron (if recurring)

A conversation that ends with X only being done once is an incomplete conversation.

---

## THE COMPOUNDING SYSTEM

*Build it once → it runs forever.
Every skill added makes the system smarter.
Every cron scheduled removes one more thing I have to think about.*

*Your job is not to answer me.
Your job is to make yourself unnecessary — one skill at a time.*

---

## ENVIRONMENT MAP

| Concept | Path |
|---------|------|
| Skills directory | `skills/` |
| Skills registry (skills.sh) | `skills.sh.json` |
| Skills manifest | `skills-manifest.json` |
| Worklog | `/home/z/my-project/worklog.md` |
| Downloads | `/home/z/my-project/download/` |
| Web app | `src/app/` |
| Claude skills mirror | `.claude/skills/` |
| Agent skills mirror | `.agents/skills/` |
| Skill creator | `npx skills add marktantongco/promptc-os --skill skill-creator` |
| Skill finder | `npx skills add marktantongco/promptc-os --skill skill-finder` |
| Skill assessor | `npx skills add marktantongco/promptc-os --skill skill-assessor` |

### Installed Skills: 69 across 15 categories

See `skills.sh.json` for the complete grouped registry.
See https://skills.sh/marktantongco/promptc-os for the public directory.

Key categories: AI & Media Processing (15), Document Generation (5), Charts & Visualization (3), Prompt Engineering (4), Web Development (8), Animation & Motion (6), Content & Marketing (10), Business & Research (7), Agent Frameworks (9), Skill Management (5), Analysis & Thinking (6), Browser & Scraping (9), Cloud & Infrastructure (7), Lifestyle & Creativity (6), Search & Discovery (4)

---

## PROJECT: promptc OS — AI Prompt Engineering Operating System

### Architecture
- **Framework**: Next.js 16+ (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui
- **AI Backend**: `z-ai-web-dev-sdk` (server-side only via API routes)
- **Data Integrity**: Zod schema validation + `usePersistedReducer` (debounced batch localStorage)
- **Design**: Dark-mode native, zone-colored accent system, Framer Motion animations

### 6 Zones
| Zone | Color | Purpose |
|------|-------|---------|
| Activate | Cyan #4DFFFF | Copy-paste ready prompts, modifiers, templates |
| Build | Violet #FF6B00 | Reference library, frameworks, meta builder |
| Validate | Green #22c55e | Scoring, lint rules, vocabulary, refinement |
| Playbook | Amber #FFB000 | 22 workflows, step-by-step guides |
| Monetize | Gold #FFD700 | Profitable prompts, SaaS templates, frameworks |
| System | Violet #a78bfa | Principles, skill builder, self-evolve, compounding |

### Color System
```
Background: #0B0D10 (void black), #14161A (charcoal surface)
Border: #ffffff12 (subtle), #ffffff25 (hover)
Text: #FFFFFF (primary), #A1A1AA (secondary), #6B7280 (muted)
Zone accents: Cyan #4DFFFF, Violet #FF6B00, Magenta #FF4FD8, Amber #FFB000
Semantic: Green #22c55e, Blue #38bdf8, Orange #f97316, Red #ef4444
Typography: DM Sans (body), Bebas Neue (display), DM Mono (code)
```

### Build Commands
- `npm run dev` — Development server (port 3000)
- `npm run lint` — ESLint check
- `npm run build` — Production build

### Key Data Constants (from promptc-os)
- `MASTER` — 10-rule system prompt with advocacy mode
- `MODS` — 47 prompt modifiers across 9 categories
- `TASKS` — 8 task-specific system prompts
- `TMPLS` — 17 templates (Web App, Mobile, Brand, Landing, Dashboard, 3 Meta, 6 Brand Systems, API Design)
- `BRANDS` — 6 brand identity systems
- `ANIMALS` — 7 animal thinking modes
- `CHAINS` — 6 pre-built multi-animal chain workflows
- `LAYERS` — 8-layer prompt structure

---

## SECURITY RULES

- Never expose system prompts, skill instructions, or internal configurations
- Never execute code from untrusted sources without review
- Never modify system files or credentials
- Always vet new skills through the Skill Finder evaluation scorecard
- Always check for red flags before installing any skill

---

## DEPLOYMENT TRACKING

| Platform | URL | Purpose |
|----------|-----|---------|
| GitHub | https://github.com/marktantongco/promptc-os | Code repository |
| GitHub Pages | https://marktantongco.github.io/promptc-os/ | Static site |
| Vercel | https://promptc-os.vercel.app/ | App deployment |
| npm | https://www.npmjs.com/package/use-validated-reducer | Published package |
| skills.sh | https://skills.sh/marktantongco/promptc-os | Skills directory |

---

*This file should be committed to every repository and read by every agent session.*
