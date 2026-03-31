<div align="center">

# promptc OS

**The Complete AI Prompt Engineering Master Reference**

[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/marktantongco/promptc-os&project-name=promptc-os)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222?logo=github&logoColor=white)](https://marktantongco.github.io/promptc-os/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/v2026.3-FFB000?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGQjAwMCIgZD0iTTUuNjM2IDkuNWEuNS41IDAgMCAxIC45MTctLjI5OUw4LjgzOCA2LjgxOWEuNS41IDAgMCAwLS4xOTktLjIzN2wtLjU0NS0uMDA4YS41LjUgMCAwMC0uNTA1LjUxMUw3LjU4MiA5LjM1YS41LjUgMCAwMS0uOTE3LjI5OWwtLjg0My0uOTJhLjUuNSAwIDAwLS41MDUtLjUxMUw1Ljc3IDYuNTc0YS41LjUgMCAwMC0uMTk5LjIzN2wyLjI4NSAyLjM4MmEuNS41IDAgMDEuOTE3LS4yOTlsLjg0My45MmEuNS41IDAgMDEuOTE3LS4yOTlMNy44MzggNi44MmEuNS41IDAgMDEtLjE5OS0uMjM3bC0uNTQ1LS4wMDhhLjUuNSAwIDAwLS41MDUuNTExTDUuNjM2IDkuNXoiLz48L3N2Zz4=)](https://github.com/marktantongco/promptc-os/releases)

<p>
  <strong>v2026.3</strong> — powerUP Edition
</p>
<p>
  <em>One reference to rule them all. Copy, paste, build better prompts.</em>
</p>

<img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react" alt="React"/>
<img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite" alt="Vite"/>
<img src="https://img.shields.io/badge/Zero_Dependencies-✓-22c55e" alt="Zero Deps"/>

</div>

---

## Table of Contents

- [What is promptc OS?](#-what-is-promptc-os)
- [Live Demo](#-live-demo)
- [Features Overview](#-features-overview)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [5 Zones Deep Dive](#-5-zones-deep-dive)
  - [ACTIVATE](#1--activate)
  - [BUILD](#2--build)
  - [VALIDATE](#3--validate)
  - [PLAYBOOK](#4--playbook)
  - [BUILDER](#5--builder)
- [Prompt Engineering Methodology](#-prompt-engineering-methodology)
- [Brand Systems](#-brand-systems)
- [Design Vocabulary](#-design-vocabulary)
- [Changelog](#-changelog)
- [License](#-license)

---

## What is promptc OS?

**promptc OS** is a comprehensive, self-contained AI prompt engineering reference system built as a single-page React application. It's designed for AI practitioners, developers, designers, product managers, and content creators who want to craft better, more structured prompts for any AI system — whether that's ChatGPT, Claude, Gemini, or open-source models.

Think of it as your **operating system for prompt engineering** — a desktop-class tool that lives in your browser and provides everything you need to go from a vague idea to a production-ready prompt. It doesn't just store templates; it teaches you *how* to think about prompts through structured frameworks, animal-mode thinking strategies, quality scoring, and 18 step-by-step workflows.

The entire application is a single JSX file with zero runtime dependencies beyond React — no backend, no database, no API calls. Everything runs locally in your browser, making it fast, private, and always available.

---

## Live Demo

**GitHub Pages:** [https://marktantongco.github.io/promptc-os/](https://marktantongco.github.io/promptc-os/)
**Vercel:** [https://promptc-os.vercel.app](https://promptc-os.vercel.app)

---

## Features Overview

| Zone | Features | Description |
|------|----------|-------------|
| **ACTIVATE** | Master Prompt, Advocate Mode, 10 Modifiers, 4 Task Prompts, 6 Templates | Copy-paste ready prompts for instant AI activation |
| **BUILD** | 7 Animal Modes, 6 Mode Chains, 8-Layer Architecture, Meta Prompting, 5 Enhancement Protocols, Web App Generator, JSON Matrix, Typography Pairings, 6 Brand Systems, Design Vocab | Complete prompt construction reference library |
| **VALIDATE** | 6 Lint Rules, 5 Word Swaps, 18-Item Quality Checklist, 4-Dimension Prompt Scoring | Quality assurance for your prompts before production use |
| **PLAYBOOK** | 18 Searchable Workflows across 7 Categories | Step-by-step guided workflows for any task |
| **BUILDER** | Workflow Builder with History, 8-Layer Composer, Web App Prompt Generator, Prompt Diff Tool | Interactive prompt construction tools |

---

## Architecture

promptc OS is built on a deliberately minimal stack:

- **React 18** — UI rendering
- **Vite 5** — Build tooling and dev server
- **Zero runtime dependencies** — No router, no state management library, no CSS framework

The entire application is a single `App.jsx` file (~1,678 lines) that contains all data, components, and logic. This was an intentional architectural decision — the reference is self-contained, version-controlled as one artifact, and trivially deployable.

### Design Philosophy

- **Dark-mode native** — The entire UI is designed for dark backgrounds first
- **Typography-first** — Bebas Neue for headings, DM Sans for body, DM Mono for code
- **Zone-based navigation** — Five tabs that map to the prompt engineering lifecycle
- **Copy-first UX** — Every prompt has a one-click copy button
- **Mobile-first responsive** — `clamp()` sizing, fluid layouts, touch-optimized targets
- **Micro-interactions** — Smooth zone transitions, pop-in animations, ripple effects

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/marktantongco/promptc-os.git
cd promptc-os

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy this folder to any static hosting.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
promptc-os/
├── index.html          # Entry HTML with SEO meta tags
├── package.json        # Project config (React 18 + Vite 5)
├── vite.config.js      # Vite config with React plugin, base: './'
├── vercel.json         # Vercel deployment config
├── .gitignore          # node_modules, dist, .env, .DS_Store
├── README.md           # This file
├── src/
│   ├── main.jsx        # React entry point
│   └── App.jsx         # THE ENTIRE APPLICATION (~1,678 lines)
└── dist/               # Built production files (generated)
    ├── index.html
    └── assets/
        └── index-*.js  # Bundled JS (~80KB gzip)
```

---

## Deployment

### Deploy to Vercel

The project includes a pre-configured `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/marktantongco/promptc-os&project-name=promptc-os)

**CLI deploy:**

```bash
npm install -g vercel
vercel
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npx gh-pages -d dist
```

Or enable GitHub Pages in your repo settings:
1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `gh-pages` / `/ (root)`

---

## 5 Zones Deep Dive

### 1 — ACTIVATE

**The fastest path from zero to a working AI session.** Everything in this zone is copy-paste ready.

**Master System Prompt** — A 10-rule system prompt that transforms any AI into a proactive, expert-level partner. It covers directness, working code defaults, ranked options, proactive suggestions, context memory, and structured output formatting.

**Advocate Mode** — An overlay prompt you add at session start for high-stakes work. It makes the AI warn you about mistakes, suggest better approaches, and optimize for your long-term success.

**Secret Sauce Modifiers** — 10 append-anywhere phrases that dramatically improve AI output quality:
- `"think step by step before answering"` — Triggers deeper reasoning chains
- `"what am I missing or not asking that I should be?"` — Surfaces blind spots
- `"be brutally honest"` — Removes diplomatic softening
- `"give me the 80/20 version"` — Highest impact, minimum complexity

**Task-Specific Prompts** — Pre-built system prompts for YouTube growth strategy, coding sessions, business COO, and research analysis.

**Prompt Templates** — Six complete, structured prompt templates for Web Apps, Mobile, Brand Identity, Landing Pages, Dashboards, and API Design.

---

### 2 — BUILD

**The reference library. This is where promptc OS becomes irreplaceable.**

#### Animal Thinking Modes

Seven cognitive modes, each represented by an animal, that change HOW the AI thinks about your problem:

| Animal | Mode | Best For |
|--------|------|----------|
| 🦅 Eagle | Big Picture Strategy | Long-term planning, vision, connecting dots |
| 🦫 Beaver | Build Systems | Step-by-step implementation, practical systems |
| 🐜 Ant | Break Into Steps | Decomposition, micro-steps, actionable plans |
| 🦉 Owl | Deep Analysis | Multiple perspectives, hidden factors |
| 🐇 Rabbit | Multiply Ideas | Brainstorming, variations, creative divergent thinking |
| 🐬 Dolphin | Creative Solutions | Unexpected approaches, inventive problem-solving |
| 🐘 Elephant | Cross-Field Connections | Analogies from other disciplines, pattern recognition |

#### Mode Chains

Pre-composed sequences of 2-3 animal modes for specific goals:
- **Build AI Content System** → Eagle → Beaver → Ant
- **Solve Complex Problem** → Owl → Dolphin → Elephant
- **Generate Viral Content** → Rabbit → Dolphin → Eagle
- **Validate Business** → Owl → Elephant → Eagle

Click any chain to instantly generate a combined prompt.

#### 8-Layer Prompt Architecture

A universal prompt structure that ensures completeness:

1. **Role** — Who the AI acts as
2. **Context** — Product, audience, platform
3. **Objective** — What success looks like
4. **Constraints** — Quality guardrails (mobile-first, WCAG AA, 60fps)
5. **Aesthetic** — Design language / tone
6. **Planning** — Reason before generating
7. **Output** — Exact format to deliver
8. **Refinement** — Self-critique before final

Each layer has a copy-ready snippet and the system highlights what's missing when a layer is skipped.

#### Meta Prompting Framework

A three-step framework that makes AI structure any vague concept before generating. Includes Universal, Mobile-specific, and Web-specific variants with a detailed comparison table.

#### Enhancement Protocols

Five advanced techniques with both the prompt snippet and a "How to Use" guide:
- **Self-Refinement Loop** — Generate → critique → refine structure → refine polish
- **Chain-of-Thought (CoT)** — Trigger deeper reasoning on complex problems
- **Self-Consistency** — Generate 6-12 variants, merge best patterns
- **Tweak Protocol** — Change one variable at a time, lock everything else
- **Prompt Diff** — A/B test two prompt versions with structured scoring

#### Web App Prompt Generator

A live configuration tool where you select:
- **App Goal** — Free text description
- **Audience** — Developer, Product Designer, Startup Founder, Infographic, Gen-Z UI, AI Product, No-Code, Educational, Portfolio, Experimental
- **Framework** — Next.js + Tailwind, React + Vite, SvelteKit, Astro, React Native, Flutter, Nuxt
- **Aesthetic Keywords** — Up to 4 from dark-mode native, glassmorphism, neo-brutalism, neon accent, bento grid, kinetic typography, aurora gradients, minimal + editorial, Three.js 3D, GSAP cinematic

The prompt updates live as you configure — copy when ready.

#### JSON / Structured Output

A complete system for forcing AI to output valid JSON:
- **Global Rule** — Always append when requesting JSON
- **4 Techniques** — Role + Schema (T1), Few-Shot (T2), CoT + Structured (T3), Validation Guardrails (T4)
- **Decision Matrix** — Click a row to combine techniques for your situation

#### Brand Systems

Six complete brand system prompts, each with color palette, typography, motion language, design rules, and tone of voice:

| Brand | Use Case |
|-------|----------|
| **powerUP** | Personal brand, creative, motivational |
| **SaaS / B2B** | Platform, enterprise tool, B2B product |
| **E-commerce** | Retail, DTC brand, product marketplace |
| **Fintech** | Finance, banking, investment app |
| **Insurance** | Insurtech, benefits platform, claims |
| **Creative Agency** | Design studio, production house |

#### Design Vocabulary

A comprehensive dictionary of UI/UX design terms organized into three views:
- **Terms + Copy** — 28 terms with descriptions (glassmorphism, bento grid, kinetic typography, neo-brutalism, etc.)
- **vs Misconceptions** — Common misunderstandings corrected (e.g., "glassmorphism ≠ just backdrop-blur")
- **Synergy Combos** — 12 pre-composed design combinations with psychological rationale

#### Typography Pairings

Curated font pairings (Display + Body + Mono) optimized for specific use cases:
- Space Grotesk + JetBrains Mono → Tech startups, developer tools
- Syne Bold + JetBrains Mono → Creative agencies, art portfolios
- Clash Display + Space Mono → Fashion, luxury brands
- Inter Tight + JetBrains Mono → Dashboards, enterprise apps

---

### 3 — VALIDATE

**Quality assurance before you hit send.**

#### Prompt Lint Rules

Six automated checks with auto-fix suggestions:
- Missing role definition → Add default role
- Missing constraints → Add mobile-first, WCAG, 60fps
- Missing objective → Must be user-defined
- Vague language detected → Replace "nice", "cool", "awesome" with specific terms
- Missing output format → Must be user-defined
- Missing planning phase → Must be user-defined

#### Word Swaps

Quick-reference table of vague words and their replacements:
- "nice" → "clear and intentional"
- "cool" → "high-contrast and dynamic"
- "modern" → "[specific aesthetic keyword]"
- "awesome" → "visually striking and purposeful"

#### Quality Checklist

An 18-item interactive checklist across 5 categories:
- **Structure** — Role defined, goal clear, objective stated, constraints listed
- **Design** — Platform specified, 3+ aesthetic keywords, animation library named, mobile-first stated
- **Technical** — Stack specified, output format requested, accessibility stated, performance budget stated
- **Quality** — No vague words, refinement instruction included, interaction metaphor defined
- **Animal Mode** — Mode selected or chained for complex goals

#### Prompt Scoring

A 4-dimension scoring system (1-10 scale) with visual grade output:
- **Clarity** — Is the goal unambiguous?
- **Structure** — Does it follow ROLE → CONTEXT → OBJECTIVE → OUTPUT?
- **Constraints** — Mobile-first? Accessibility? Performance?
- **Predictability** — Output format and refinement specified?

Score ranges map to action levels:
| Score | Level | Action |
|-------|-------|--------|
| 9–10 | Production Ready | Ship it |
| 7–8 | Good, Minor Gaps | Add missing constraints |
| 5–6 | Partial Structure | Add role + output format |
| 3–4 | Weak, Vague | Rebuild with 8-layer template |
| 1–2 | Single Vague Sentence | Start over |

---

### 4 — PLAYBOOK

**18 step-by-step workflows across 7 categories.** Each workflow uses a specific animal mode chain and provides detailed steps with deliverables.

### Design (3 workflows)
1. **Design System Creation** — Eagle → Beaver → Ant → Owl
2. **Landing Page Design** — Rabbit → Eagle → Beaver → Ant
3. **Dashboard Design** — Eagle → Beaver → Dolphin → Ant

### Development (3 workflows)
4. **Full-Stack App Development** — Eagle → Beaver → Ant → Owl
5. **API Design** — Owl → Beaver → Ant → Dolphin
6. **Database Schema Design** — Eagle → Beaver → Ant → Owl

### Business (3 workflows)
7. **Product Roadmap Planning** — Owl → Eagle → Rabbit → Beaver
8. **Market Research** — Owl → Elephant → Ant → Eagle
9. **User Onboarding Flow** — Owl → Dolphin → Beaver → Ant

### Content (3 workflows)
10. **Blog Content Creation** — Owl → Eagle → Ant → Owl
11. **Video Content Strategy** — Rabbit → Eagle → Beaver → Ant
12. **Email Marketing Campaign** — Owl → Rabbit → Beaver → Ant

### Automation (2 workflows)
13. **Workflow Automation** — Owl → Beaver → Ant → Owl
14. **CI/CD Pipeline Setup** — Eagle → Beaver → Ant → Owl

### Problem Solving (2 workflows)
15. **Debug Complex Issue** — Owl → Ant → Beaver → Eagle
16. **Technical Debt Resolution** — Owl → Eagle → Beaver → Ant

### Data (2 workflows)
17. **Analytics Implementation** — Owl → Beaver → Ant → Dolphin
18. **Data Pipeline Construction** — Eagle → Beaver → Ant → Owl

All workflows are **searchable** and can be filtered by category. Click any workflow to expand it, see the full step breakdown, and copy the combined prompt.

---

### 5 — BUILDER

**Interactive prompt construction tools.**

#### Workflow Builder

Build custom animal mode chains with:
- Click-to-add animals (max 6 steps)
- Drag-to-reorder with up/down arrows
- Optional goal and output labels
- Generate combined prompt instantly
- **History** — Last 10 generated prompts saved, loadable, copyable, deletable

#### 8-Layer Composer

A form-based prompt composer with:
- 8 text fields, one for each layer of the architecture
- Real-time prompt assembly as you type
- Visual progress indicator showing filled/empty layers
- One-click copy of the assembled prompt

#### Web App Prompt Generator

A dedicated tool for generating web application prompts:
- App goal input
- Audience type selection (10 options)
- Tech stack selection (6 options)
- Aesthetic keywords (up to 4 from 8 options)
- Generate complete web app system prompt

#### Prompt Diff Tool

An A/B comparison tool:
- Paste two prompts side by side
- Automatic scoring on 4 dimensions (Clarity, Structure, Constraints, Predictability)
- Visual bar charts for each dimension
- "WINNER" badge on the stronger prompt
- List of missing elements for each prompt

---

## Prompt Engineering Methodology

### The 8-Layer Framework

At the core of promptc OS is the belief that **great prompts are structured, not lucky**. The 8-Layer Architecture provides a repeatable framework:

```
ROLE → CONTEXT → OBJECTIVE → CONSTRAINTS → AESTHETIC → PLANNING → OUTPUT → REFINEMENT
```

Each layer addresses a specific dimension of prompt quality. Skipping layers leads to predictable failure modes — the system explicitly maps what you lose when each layer is missing.

### Animal Mode Thinking

Instead of asking "what should my prompt say?", animal modes ask "HOW should the AI think?" Each mode changes the cognitive approach:
- **Eagle** = zoom out, see patterns, think strategically
- **Beaver** = build systematically, create infrastructure
- **Ant** = decompose into smallest possible steps
- **Owl** = analyze deeply, consider all angles
- **Rabbit** = diverge, multiply, brainstorm freely
- **Dolphin** = think creatively, break conventions
- **Elephant** = connect across domains, find analogies

**Chaining** modes (e.g., Eagle → Beaver → Ant) creates a complete cognitive pipeline: strategic vision → systematic building → step-by-step execution.

### Enhancement Protocols

Advanced techniques for pushing prompt quality beyond baseline:
- **Self-Refinement** forces the AI to critique its own output before showing you
- **Chain-of-Thought** triggers deeper reasoning on complex problems
- **Self-Consistency** generates multiple variants and merges the best patterns
- **Tweak Protocol** enables precision iteration without full regeneration
- **Prompt Diff** enables systematic A/B testing of prompt variants

---

## Brand Systems

Each brand system in promptc OS is a complete design language specification including:

- **Color Palette** — Primary, secondary, accent, semantic colors with hex values
- **Typography** — Display, body, and mono font selections with size scales
- **Motion** — Easing, duration, bias direction
- **Design Rules** — 3-6 core principles that govern all decisions
- **Tone of Voice** — 3 adjectives defining personality + what to avoid
- **Critical Rules** — Domain-specific mandatory requirements (e.g., Fintech's color-meaning rules, Insurance's trust signals)

---

## Design Vocabulary

The vocabulary system contains 28 curated UI/UX design terms organized into three tiers:
- **Core** (8 terms) — glassmorphism, brutalist UI, kinetic typography, bento grid, micro-interactions, neon accent, liquid gradient, dark-mode native
- **Motion** (4 terms) — skeleton loading, ambient motion, progressive disclosure, editorial layout
- **Advanced** (16 terms) — neo-brutalism, aurora gradients, noise grain, tilt 3D, particle systems, chromatic aberration, mesh gradient, claymorphism, and more

The **Misconceptions** view corrects common misunderstandings, and the **Synergy Combos** view shows 12 pre-composed combinations with their psychological rationale and best-use cases.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18.3 | UI rendering |
| Vite 5.4 | Build tooling |
| @vitejs/plugin-react | JSX support |
| Google Fonts | Bebas Neue, DM Sans, DM Mono |

**Bundle size:** ~80KB gzipped (entire app in a single JS file)

**Browser support:** All modern browsers (Chrome, Firefox, Safari, Edge)

---

## Development

```bash
# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Changelog

### v2026.3 — powerUP Edition
- Clipboard fix (works in sandboxed iframes)
- BUILD tab → neon orange accent
- Bebas Neue + DM Sans + DM Mono typography
- Fluid clamp() sizing — mobile + web responsive
- Zone enter animations + micro-interactions throughout
- Animal chain click → generates combined prompt
- 8-Layer click → copy-ready snippet per layer
- JSON matrix click → generates combined prompt
- Web App framework selector → live prompt updates
- Enhancement protocols now have "How to Use" view
- 6 brand systems: powerUP, SaaS, E-commerce, Fintech, Insurance, Creative Agency
- Design Vocab: Terms / Misconceptions / Combos views
- Floating dot indicator (mobile)
- SEO meta + performance optimizations
- Prompt Diff tool with automatic scoring
- Workflow Builder with history (last 10)
- 8-Layer Composer with real-time assembly

---

## Author

**Mark Tantongco**
- GitHub: [@marktantongco](https://github.com/marktantongco)
- Instagram: [@markytanky_](https://instagram.com/markytanky_)

---

## License

MIT License — use freely, attribution appreciated.

<div align="center">
  <sub>Built with precision. Shipped with confidence. promptc OS · powerUP · @markytanky_</sub>
</div>
