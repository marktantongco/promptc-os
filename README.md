# ⚡ promptc OS v3.2

**AI Prompt Engineering Operating System** — A comprehensive 6-zone workspace for building, validating, and monetizing AI prompts. Built with Next.js 16, Tailwind CSS 4, and Framer Motion.

## Overview

promptc OS is a production-grade prompt engineering environment that treats prompt creation as a systematic engineering discipline. It provides structured tools across 6 interconnected zones — from initial activation through building, validation, playbook orchestration, monetization, and system management.

The app includes a universal **Collection Basket** (⌘B) for gathering prompts across all zones, a **Command Palette** (⌘K) for instant search, and a **Skills Library** with 66 registered skills across 13 categories.

---

## Architecture

```
promptc-os/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main app (1,100 lines) — all 6 zones + basket
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Theme, animations, custom scrollbar
│   │   ├── data/
│   │   │   ├── promptc-data.ts   # Core data layer (1,337 lines) — 22 exports
│   │   │   └── skills-catalog.ts # Skills registry (162 lines) — 66 skills
│   │   └── api/
│   │       ├── generate/route.ts # Meta Builder AI endpoint
│   │       └── analyze/route.ts  # Quality Score AI endpoint
│   ├── components/
│   │   ├── CommandPalette.tsx    # ⌘K search — 289 lines
│   │   └── OnboardingTour.tsx    # First-visit tutorial — 7 steps
│   └── lib/
│       ├── db.ts                 # Database config
│       └── utils.ts              # Utilities
├── .github/AGENTS.md             # AI agent operating instructions
└── worklog.md                    # Development changelog
```

**Total source:** ~9,100 lines across 55+ files.

---

## The 6 Zones

### 🟢 1. Activate — Discover & Collect

The starting zone. Browse, search, and collect the building blocks of great prompts.

| Sub-tab | Contents | Count |
|---------|----------|-------|
| **Tasks** | Ready-to-use task prompts (copy & paste into any AI chat) | 8 |
| **Modifiers** | 47 prompt modifiers across 10 categories (Role, Agent, Format, Output, Tone, Persona, Productivity, Logic, Style, Domain) | 47 |
| **Templates** | Pre-built prompt templates for common use cases | 6 |
| **Brands** | Brand voice systems with unique characteristics | 5 |
| **Animals** | 7 animal thinking modes (Eagle, Owl, Rabbit, Ant, Dolphin, Beaver, Elephant) | 7 |
| **Composer** | 8-layer prompt builder (Role → Context → Objective → Constraints → Aesthetic → Planning → Output → Refinement) | 1 tool |

### 🔵 2. Build — Construct & Transform

Turn raw ideas into polished, production-ready prompts.

| Sub-tab | Contents |
|---------|----------|
| **Master Prompt** | The foundational system prompt that sets AI behavior |
| **Enhancements** | 7 enhancement techniques with "What it does" + "How to use" guides |
| **Meta Builder** | 3 AI-powered prompt transformers: Quick Critique, Structured Analysis, Expert Engineering |

### 🟡 3. Validate — Test & Improve

Quality assurance for your prompts.

| Sub-tab | Contents |
|---------|----------|
| **Lint Rules** | Automated lint checks across 5 segments (Universal, UI/UX, Code, Content, Agent) |
| **Word Swaps** | Weak → strong word replacements across 3 levels (Critical, Improvement, Polish) |
| **Vocabulary** | Domain terminology reference with definitions and usage tips |
| **Quality Score** | AI-powered 4-dimension analysis (Clarity, Specificity, Structure, Actionability) with radar chart |

### 🟠 4. Playbook — Orchestrate & Execute

Systematic workflows for complex projects.

| Sub-tab | Contents |
|---------|----------|
| **Workflows** | 21 production workflows across 6 categories (Design, Dev, Business, Mobile, AI/ML, Content, Security, DevOps) |
| **Animal Chains** | Multi-animal thinking sequences for complex problems |
| **Design Combos** | Design element combinations with psychological rationale |
| **Typography** | Display + mono font pairings with use-case recommendations |

### 🔴 5. Monetize — Earn & Scale

Turn prompt engineering skills into revenue.

| Sub-tab | Contents |
|---------|----------|
| **Top Prompts** | 6 highest-value prompt products with revenue potential indicators |
| **SaaS Templates** | 6 automation blueprints (easy/medium/hard difficulty, with tech stacks) |
| **Stacks** | 4 income strategies from Week 1 quick wins to Month 2-6 hybrid stacks |
| **AI Tools** | 5 agent frameworks (OpenClaw, ZeroClaw, Agno, CrewAI, Claude Code) with starter prompts |
| **Compounding** | The compounding system philosophy — build once, runs forever |
| **Pricing Guide** | 4-tier pricing matrix (Free / $5 Starter / $15 Pro / $49 Business) |

### 🟣 6. System — Meta-Control & Skills

The control center for the entire operating system.

| Sub-tab | Contents |
|---------|----------|
| **Skills Library** | 66 skills across 13 categories — expandable cards with category stats and basket integration |
| **Compounding** | System health dashboard with category distribution visualization |
| **Principles** | 6 core operating principles (No One-Off Work, THE RULE, Plan→Validate→Execute, etc.) |
| **Skill Builder** | 6-step wizard for building production-ready skills (Concept → Prototype → Evaluate → Codify → Cron → Monitor) |
| **Workflow Patterns** | Visual step-flow patterns (Plan→Validate→Execute, 6-step skill lifecycle) |
| **Self-Evolve** | Growth tracking dashboard with dynamic metrics |
| **Infographics** | Zone overview with clickable navigation cards + modifier coverage heat map |
| **Package Docs** | Generate comprehensive markdown reference document |

---

## Key Features

### 🧺 Collection Basket (⌘B)
- Collect prompts from any zone — click copy and it auto-adds to basket
- **Pin** important items to the top
- **Favorite** items with ⭐ star indicator
- **Multi-select** with batch copy, remove, and export
- **Sort** by newest, oldest, longest, shortest, A→Z
- **Search** and filter by zone
- **Duplicate detection** — warns if you try to add the same prompt twice
- **Export** to markdown (.md file download)
- **localStorage persistence** — survives page reloads (up to 100 items)
- **Flash animation** on the nav badge when items are added

### 🔍 Command Palette (⌘K)
- Fuzzy search across all modifiers, templates, tasks, workflows, brands, animals, enhancements, lint rules, word swaps, and chains
- Zone quick-switch grid (6 zones, click to jump)
- Keyboard navigation (↑↓ arrows, Enter to select)
- Recently copied items section
- Results grouped by zone with type badges

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open Command Palette |
| `⌘B` / `Ctrl+B` | Toggle Basket panel |
| `⌘1` through `⌘6` | Switch to Zone 1-6 |
| `Escape` | Close Basket panel |

### 🎯 Onboarding Tour
- 7-step guided tour for first-time visitors
- Covers zones, task cards, composer, meta builder, quality score, basket, and system zone
- Auto-triggers on first visit; re-trigger via ❓ button in nav

### 📊 Skills Library
- 66 skills across 13 categories (AI/LLM, Web Search, Documents, Prompt Engineering, Skill Management, Web Dev, Animation, Content, Business, Agent Frameworks, Analysis, Data Viz, Utilities)
- Expandable cards with category statistics and file contribution bars
- "Add to Basket" and "View Category" actions
- Search and category filter

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | React framework (App Router) |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Framer Motion** | 12 | Animations and transitions |
| **Lucide React** | 0.525 | Icon library |
| **Sonner** | 2 | Toast notifications |
| **React Markdown** | 10 | Markdown rendering |
| **z-ai-web-dev-sdk** | 0.0.17 | AI API integration |
| **Bun** | — | JavaScript runtime |

---

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Vercel account (for deployment)

### Local Development
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/promptc-os.git
cd promptc-os

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com/new](https://vercel.com/new).

---

## Data Layer

The entire prompt engineering knowledge base lives in two files:

**`src/app/data/promptc-data.ts`** (1,337 lines, 22 exports)
- `MASTER` — The master system prompt
- `ZONES` — 6 zone definitions with colors and icons
- `MODS` / `MOD_CATS` — 47 modifiers across 10 categories
- `TASKS` — 8 task prompts
- `TMPLS` — 6 templates
- `BRANDS` — 5 brand systems
- `ANIMALS` — 7 animal thinking modes
- `CHAINS` — Multi-animal chains
- `ENHANCEMENTS` — 7 enhancement techniques
- `LINT_RULES` — Automated lint checks (5 segments)
- `SWAPS` / `SWAP_LEVELS` — Word swap replacements
- `VOCAB` / `VOCAB_CATS` — Domain vocabulary
- `COMBOS` — Design element combinations
- `TYPO` / `TYPO_USECASES` — Font pairings
- `LAYERS` / `LAYER_TPL` — Composer layer definitions
- `WORKFLOW_PROMPTS` — 21 workflow prompt templates

**`src/app/data/skills-catalog.ts`** (162 lines)
- `SKILLS_CATALOG` — 66 skill definitions
- `SKILL_CATEGORIES` — 13 MECE categories
- `CATEGORY_ICONS` / `CATEGORY_COLORS` — Visual mapping
- `CATEGORY_COUNTS` — Derived statistics
- `TOTAL_SKILLS`, `TOTAL_CATEGORIES`, `TOTAL_FILES` — Aggregated counts

---

## Version History

| Version | Changes |
|---------|---------|
| **v3.2** | SaaS/Stacks basket buttons, favorites system (⭐), tooltips, dynamic self-evolve, filtered count indicator |
| **v3.1** | ⌘1-6 zone shortcuts, expandable skill cards, Monetize basket buttons, interactive infographics, basket flash animation |
| **v3.0** | CommandPalette keyboard nav, OnboardingTour expansion, workflow char counts + copy, mobile menu, enhancement guides, AI Tools starter prompts |
| **v2.2** | Basket multi-select, reorder, pinning, duplicate detection, confirm clear, sort, close button, overlay backdrop |
| **v2.0** | History Clipboard → Collection Basket, Skills Library browser, Compounding Dashboard |

---

## Operating Principles

1. **NO ONE-OFF WORK** — Every task produces a reusable asset
2. **THE RULE** — Plan → Validate → Execute, never skip validation
3. **PLAN → VALIDATE → EXECUTE** — Break down, test assumptions, then build
4. **COMPOUNDING SYSTEM** — Build once → runs forever → every skill makes the system smarter
5. **SKILL FORMAT** — 4-section SKILL.md: Context, Instructions, Constraints, Examples
6. **SECURITY RULES** — No hardcoded secrets, validate inputs, rate limit by default

---

## License

Private repository. All rights reserved.

---

*Built with ⚡ by promptc OS — AI Prompt Engineering Operating System*
