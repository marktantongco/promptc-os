# promptc OS — AI Prompt Engineering Master Reference

<p align="center">
  <strong>promptc OS</strong> is a progressive web app (PWA) that serves as your complete AI prompt engineering reference system. Five zones, 4,200+ lines of curated content, every prompt copy-ready.
</p>

---

## Overview

**promptc OS** is a single-file React application built with Vite that provides a comprehensive, offline-capable prompt engineering toolkit. It's designed as a dark-mode-native reference tool for AI practitioners, developers, designers, and anyone who works with large language models.

The app is organized into **5 zones**, each serving a distinct purpose in the prompt engineering workflow:

| Zone | Purpose | Content |
|------|---------|---------|
| **ACTIVATE** | Copy-paste ready system prompts | Master Prompt, Advocate Mode, 50+ Modifiers, 8 Task Prompts, 15 Templates, 6 Brand Systems |
| **BUILD** | Reference library & frameworks | 7 Animal Thinking Modes, 6 Mode Chains, 8-Layer Architecture, 8 Enhancement Protocols, Web App Generator, JSON Techniques, 50+ Design Vocabulary terms, Layer Composer, Workflow Builder, Prompt Diff Tool |
| **VALIDATE** | Score, lint, refine prompts | 24 Lint Rules, 40+ Word Swaps (beginner/misconception/advanced/hack), Quality Checklist, Prompt Scoring (4 dimensions) |
| **PLAYBOOK** | 19 step-by-step workflows | Design System, Landing Page, Dashboard, Full-Stack App, API Design, Database Schema, Product Roadmap, Market Research, User Onboarding, Blog Content, Video Strategy, Email Marketing, Workflow Automation, CI/CD Pipeline, Debugging, Technical Debt, Analytics, Data Pipeline, AI Product Build |
| **MONETIZE** | Profitable prompts & SaaS | Top 10 Profitable Prompt Categories, 10 SaaS Templates, 4 Monetization Frameworks, 8 Automation Workflows, 6 AI Agent Tools, 5 Monetization Recipes, 9 Deploy Stacks, Tool Matrix Builder (Frontend + Database + AI Provider + Payments) |

---

## Features

### Universal Copy-Ready
Every prompt, modifier, template, vocabulary term, workflow, and tool in promptc OS has a one-click copy button. The `Cp` component uses `navigator.clipboard.writeText()` with a `document.execCommand('copy')` fallback for sandboxed environments.

### Inline PWA
promptc OS is a fully functional Progressive Web App with **zero external PWA files**:
- Web App Manifest injected via Blob URL
- Service Worker registered inline (cache-first strategy, `promptc-v8` cache)
- Installable on mobile and desktop
- Works offline after first load
- Apple touch icon meta tags included

### Command+K Search
Press `Cmd+K` (or `Ctrl+K`) to open the global search overlay. The search indexes all content across all 5 zones including modifiers, templates, vocabulary terms, lint rules, workflows, monetize tools, and more. Results are tagged by zone and clicking navigates directly.

### Dark Void Aesthetic
- Background: `#0B0D10` (void black) with `#14161A` surfaces
- Per-zone accent colors: cyan (ACTIVATE), orange (BUILD), green (VALIDATE), amber (PLAYBOOK), gold (MONETIZE)
- Per-animal colors for thinking modes
- Typography: Bebas Neue (display), DM Sans (body), DM Mono (code)
- Spring easing: `cubic-bezier(0.16, 1, 0.3, 1)` throughout

### Interactive Tools
- **Layer Composer**: Fill in each of the 8 prompt layers and watch the prompt assemble in real time
- **Workflow Builder**: Build animal mode chains (up to 6 steps) with drag reordering, history, and export
- **Prompt Diff**: Paste two prompts, get side-by-side quality analysis across 4 dimensions (Clarity, Structure, Constraints, Predictability) with scoring bars and missing element detection
- **Web App Prompt Generator**: Configure audience, framework, and aesthetic keywords — prompt updates live
- **Tool Matrix Builder**: Select frontend + database + AI provider + payment tool and get a complete compatibility-checked stack guide with setup commands

### Mobile-First
- Responsive clamp() sizing throughout
- Floating zone indicator dots at bottom
- Scrollable zone navigation
- 44px touch targets
- Reduced motion support via `prefers-reduced-motion`

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI components |
| Vite 5 | Build tool |
| Inline PWA | Manifest + Service Worker (no external files) |
| Google Fonts | Bebas Neue, DM Sans, DM Mono |

**No external dependencies.** No component libraries, no state management, no routing library. The entire application is a single `App.jsx` file (~4,229 lines).

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/promptcos/promptc-os.git
cd promptc-os

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
promptc-os/
├── index.html              # Entry HTML with theme-color meta
├── package.json            # React 18 + Vite 5
├── vite.config.js          # Vite config with react plugin
├── vercel.json             # SPA routing for Vercel deployment
├── src/
│   ├── main.jsx            # React entry point
│   └── App.jsx             # THE ENTIRE APPLICATION (~4,229 lines)
└── dist/                   # Production build output
```

---

## Architecture

### Data Layer (~lines 1–2780)
All content is stored as typed JavaScript constants at the top of `App.jsx`:

- `PWA_MANIFEST` — PWA configuration
- `FONT_CSS` — Global styles and keyframe animations
- `C` — Color tokens and design constants
- `ZONES` — Zone navigation definitions
- `MASTER` / `ADVOCATE` — Core system prompts
- `MODS` — 50+ prompt modifiers across 9 categories
- `TASKS` — 8 task-specific prompts
- `BRAND` / `BRANDS` — 6 brand system prompts
- `TMPLS` — 15 prompt templates
- `LAYERS` — 8-layer prompt architecture
- `ANIMALS` — 7 animal thinking modes
- `CHAINS` — 6 mode chains
- `ENH` — 8 enhancement protocols
- `WEB_VARS` — 10 audience presets
- `JSON_T` — 4 JSON output techniques
- `VOCAB` — 50+ design vocabulary terms
- `COMBOS` — 12 design synergy combos
- `LINT` — 24 prompt lint rules
- `SWAPS` — 40+ word swap improvements
- `WF` — 19 playbook workflows
- `TOOL_MATRIX` — 4-category tool comparison data
- `TOP10_PROMPTS` — 10 monetizable prompt categories
- `SAAS_TEMPLATES` — 10 SaaS starter templates
- `MONETIZE_FW` — 4 monetization frameworks
- `AUTOMATION_WORKFLOWS` — 6 automation workflow prompts
- `AI_TOOLS` — 6 AI agent tool prompts
- `MONETIZE_RECIPES` — 5 step-by-step income recipes
- `DEPLOY_STACKS` — 9 deployment stack guides

### Shared UI Components (~lines 2786–2799)
- `Cp` — Copy button with success flash
- `Lbl` — Section label (uppercase, mono, colored)
- `H3` — Section heading
- `Card` — Content card with optional accent border
- `Code` — Code block with integrated copy button
- `Pill` — Filter/selection toggle button
- `Inp` — Text input with label
- `TA` — Textarea with label

### Zone Components (~lines 2800–3987)
- `Activate()` — Master prompt, Advocate Mode, Modifiers, Tasks, Templates
- `Build()` — Animals, Chains, 8-Layer, Enhancement, Web App, JSON, Vocab, Typography, Composer, WF Builder, Prompt Diff
- `Validate()` — Lint Rules, Word Swaps, Quality Checklist, Prompt Scoring
- `Playbook()` — 19 workflows with search, category filter, and topic input
- `MonetizeView()` — Top 10, SaaS Templates, Frameworks, Deploy Stacks, Automations, AI Tools, Recipes, Tool Matrix

### App Shell (~lines 3990–4097)
- Sticky navigation with zone tabs
- Cmd+K search overlay with pre-built index
- Floating mobile zone indicator
- Zone-level animations

---

## Zones Deep Dive

### ACTIVATE Zone
The starting point. Contains the **Master System Prompt** (a comprehensive 10-rule system prompt with advocacy mode, writing rules, and skill references) and **Advocate Mode** (a session-level modifier that makes the AI push back, suggest better approaches, and optimize for long-term success).

The **50+ Secret Sauce Modifiers** are organized by category: Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, and Productivity. Each modifier has a practical tip explaining when and why to use it.

**8 Task-Specific Prompts** cover YouTube, Coding, Business, Research, UI/UX, Image AI, Copy, and Email — each is a complete, copy-paste ready system prompt.

**15 Templates** include Web App, Mobile, Brand, Landing Page, Dashboard, API Design, 3 Meta Prompts, 6 Brand Systems (powerUP, SaaS, E-commerce, Fintech, Insurance, Creative Agency).

### BUILD Zone
The reference library. **7 Animal Thinking Modes** (Rabbit, Owl, Ant, Eagle, Dolphin, Beaver, Elephant) each provide a distinct cognitive approach to problem-solving. **6 Mode Chains** combine animals for specific goals like "Build AI Content System" or "Generate Viral Content."

The **8-Layer Prompt Architecture** (Role, Context, Objective, Constraints, Aesthetic, Planning, Output, Refinement) is the structural framework. Each layer has a copy-ready snippet and the complete template can be shown/hidden.

**8 Enhancement Protocols** include Self-Refinement Loop, Chain-of-Thought, Self-Consistency, Tweak Protocol, Prompt Diff, Zero-Shot CoT, Role + Constraint Stack, and Mega-Prompt Assembly. Each has both a prompt snippet and a detailed how-to guide.

The **Web App Prompt Generator** lets you configure audience type, framework, and aesthetic keywords — the prompt updates live as you select options.

**JSON/Output** section provides the global JSON rule, 4 techniques (Zero-shot, Few-Shot, CoT+Structured, Validation Guardrails), and a decision matrix for combining techniques.

**Design Vocabulary** contains 50+ terms across Visual FX, Motion, 3D+Libraries, Layout+System, and Data Viz categories, each with a precise definition and practical tip.

### VALIDATE Zone
**24 Prompt Lint Rules** segmented by use-case (universal, UI/UX, code, content, agent) with auto-fix suggestions.

**40+ Word Swaps** organized by skill level (beginner, misconception, advanced, hack) — each replaces a vague term with a specific, actionable alternative.

**Quality Checklist** is an interactive checklist with selectable options and checkboxes that builds a prompt requirements string you can copy directly.

**Prompt Scoring** uses 4 sliders (Clarity, Structure, Constraints, Predictability) to generate a 1-10 overall score with a grade classification and action recommendation.

### PLAYBOOK Zone
**19 step-by-step workflows** organized by category (Design, Dev, Business, Content, Automation, Problem, Data, AI Product). Each workflow has:
- Animal chain showing which thinking modes to apply
- 4 steps with actionable items
- Final output description
- Full copy-ready prompt with topic input

### MONETIZE Zone
The most comprehensive zone with 8 sub-sections:

1. **Top 10 Profitable Prompt Categories** — ranked by search volume with pros, cons, difficulty, and monetization strategy
2. **10 SaaS Templates** — complete SaaS starter prompts including AI Writing Assistant, Invoice SaaS, Link Shortener, Waitlist Builder, Form Builder, AI Chatbot Builder, Social Scheduler, Notion Marketplace, AI Resume Builder, and White-Label Prompt Manager
3. **4 Monetization Frameworks** — Quick Win ($100-500, Week 1), Active Income ($500-5k, Week 2-4), Passive Income ($500-10k/mo, Month 1-3), Hybrid Stack ($2k-20k/mo, Month 2-6)
4. **6 Automation Workflows** — n8n Content Pipeline, Lead Capture, Site Monitor, Make Invoice Automation, MCP Agent Pipeline, Zapier CRM Sync
5. **6 AI Agent Tools** — OpenClaw, ZeroClaw, NullClaw, Agno, CrewAI, Claude Code — each with setup guide and copy-ready prompt
6. **5 Monetization Recipes** — SaaS AI MVP in 48hrs, Prompt Pack first sale, Newsletter $1k/mo in 90 days, Agency to SaaS transition, MCP Tool to paid product
7. **9 Deploy Stacks** — Vercel+Supabase, Cloudflare+Workers+D1, Railway+Hono+Turso, Fly.io+PocketBase, n8n Cloud, n8n Self-hosted, MCP Server, ZeroClaw Agent, Local Ollama
8. **Tool Matrix Builder** — select Frontend (6 options) + Database (6 options) + AI Provider (9 options) + Payments (5 options) to generate a complete compatibility-checked stack guide with init commands

---

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect GitHub repo to Vercel
# Or use: vercel deploy --prod
```

### Manual
```bash
npm run build
# Serve the dist/ folder with any static file server
npx serve dist
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v2026.7 | Apr 2026 | Comprehensive upgrade: +4 new modifiers, Claude Code AI tool, Mega-Prompt Assembly protocol, 4 new vocab terms, PromptDiff side-by-side text view, PWA v8 cache |
| v2026.4 | Mar 2026 | Monetize zone expansion: Tool Matrix Builder, Deploy Stacks, AI Agent Tools, Monetization Recipes |
| v2026.3 | Feb 2026 | PWA inline implementation, 8 Enhancement Protocols, Design Vocab expansion |
| v2026.2 | Jan 2026 | BUILD+BUILDER merge, 6 Brand Systems, ⌘K search, Web App Generator |
| v2026.1 | Dec 2025 | Initial release with 5 zones |

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>promptc OS</strong> — Built for prompt engineers, by prompt engineers.
</p>
