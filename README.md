# promptc OS — Motion-Driven AI Prompt Engineering System

<p align="center">
  <img src="https://img.shields.io/badge/version-2026.8-blue?style=flat-square" alt="Version">
  <img src="https://img.shields.io/badge/react-18.3-61dafb?style=flat-square" alt="React">
  <img src="https://img.shields.io/badge/vite-5.4-646cff?style=flat-square" alt="Vite">
  <img src="https://img.shields.io/badge/gsap-3.12-88ce02?style=flat-square" alt="GSAP">
  <img src="https://img.shields.io/badge/pwa-installable-purple?style=flat-square" alt="PWA">
  <img src="https://img.shields.io/badge/size-134kb_gzip-green?style=flat-square" alt="Bundle Size">
</p>

<p align="center">
  <strong>promptc OS</strong> is a motion-driven progressive web app that serves as your complete AI prompt engineering reference system. Five zones, GSAP-powered animations, interactive infographics, presentation mode, and 4,600+ lines of curated content — every prompt copy-ready.
</p>

---

## What's New in v2026.8 — Motion-Driven System

This release transforms promptc OS from a static reference tool into a **motion-driven interactive system**:

- **GSAP Animation Engine** — 8 reusable motion components (AnimatedCounter, ScrollReveal, AnimatedBar, StaggerGrid, MorphPill, ParallaxText, SkeletonCard, HapticButton)
- **Infographics in Motion** — New BUILD sub-section with 4 interactive data visualizations (Radar Chart, Zone Heatmap, Workflow Chain Visualizer, Skill Distribution Donut)
- **Presentation Mode** — Press "▶ Present" to transform any zone into a full-screen slideshow with keyboard navigation and animated transitions
- **Enhanced PWA** — Offline detection badge, install banner, GSAP crossfade zone transitions, skeleton loading states
- **8 New CSS Keyframes** — countUp, drawLine, pulse, slideInRight/Left, breathe, progressBar, hapticPulse
- **Removed** — Advocate Mode section (merged into Master System Prompt)

---

## Overview

**promptc OS** is a single-file React application built with Vite that provides a comprehensive, offline-capable prompt engineering toolkit. It's designed as a dark-mode-native reference tool for AI practitioners, developers, designers, and anyone who works with large language models.

The app is organized into **5 zones**, each serving a distinct purpose in the prompt engineering workflow:

| Zone | Purpose | Content |
|------|---------|---------|
| **ACTIVATE** | Copy-paste ready system prompts | Master System Prompt, 56+ Modifiers, 8 Task Prompts, 15 Templates, 6 Brand Systems |
| **BUILD** | Reference library & frameworks | 7 Animal Thinking Modes, 6 Mode Chains, 8-Layer Architecture, 8 Enhancement Protocols, Web App Generator, JSON Techniques, 50+ Design Vocabulary terms, Layer Composer, Workflow Builder, Prompt Diff, **Infographics** |
| **VALIDATE** | Score, lint, refine prompts | 24 Lint Rules, 40+ Word Swaps, Quality Checklist, Prompt Scoring (4 dimensions) |
| **PLAYBOOK** | 19 step-by-step workflows | Design System, Landing Page, Dashboard, Full-Stack App, API Design, Database Schema, Product Roadmap, Market Research, User Onboarding, Blog Content, Video Strategy, Email Marketing, Workflow Automation, CI/CD Pipeline, Debugging, Technical Debt, Analytics, Data Pipeline, AI Product Build |
| **MONETIZE** | Profitable prompts & SaaS | Top 10 Profitable Prompt Categories, 10 SaaS Templates, 4 Monetization Frameworks, 8 Automation Workflows, 6 AI Agent Tools, 5 Monetization Recipes, 9 Deploy Stacks, Tool Matrix Builder |

---

## Motion System

### GSAP Integration
GSAP 3.12.5 is loaded via CDN injection in the `injectPWA()` function. All motion components check for `window.gsap` availability and respect `prefers-reduced-motion`.

### Motion Components

| Component | Purpose | Trigger |
|-----------|---------|---------|
| `AnimatedCounter` | Count-up from 0 to target value | Viewport entry (IntersectionObserver) |
| `ScrollReveal` | Fade/scale/slide-in content | Viewport entry, 3 modes |
| `AnimatedBar` | Elastic spring width animation | Viewport entry |
| `StaggerGrid` | Children stagger in sequentially | Viewport entry, configurable delay |
| `MorphPill` | Scale + glow bounce on active | State change |
| `ParallaxText` | Scroll-driven Y translation | Scroll position |
| `SkeletonCard` | Shimmer loading placeholder | Before content loads |
| `HapticButton` | Visual pulse feedback | Click/tap |

### Motion Presets
```javascript
const MOTION = {
  spring: { duration: 0.6, ease: 'back.out(1.7)' },
  smooth: { duration: 0.4, ease: 'power2.out' },
  snap:   { duration: 0.2, ease: 'power4.out' },
  hero:   { duration: 0.8, ease: 'expo.out' },
  stagger: 0.08,
};
```

### Infographics

| Visualization | Type | Data Source |
|---------------|------|-------------|
| **Prompt Quality Radar** | SVG spider/radar chart | 5 scoring dimensions |
| **Zone Coverage Heatmap** | Dot-based intensity grid | Zone × Skill matrix |
| **Workflow Chain Visualizer** | Animated SVG flow diagram | Animal chain connections |
| **Skill Distribution Donut** | Animated donut chart | MODS category distribution |

### Presentation Mode
- Activated via "▶ Present" button in navigation
- Transforms current zone's content into full-screen slides
- Arrow key navigation (← →) and swipe gestures
- Slide counter and progress bar
- GSAP-animated transitions between slides
- Exit with Escape key
- Larger fonts, centered layout, expanded code blocks

---

## Features

### Universal Copy-Ready
Every prompt, modifier, template, vocabulary term, workflow, and tool has a one-click copy button. The `Cp` component uses `navigator.clipboard.writeText()` with a `document.execCommand('copy')` fallback for sandboxed environments.

### Inline PWA
promptc OS is a fully functional Progressive Web App with **zero external PWA files**:
- Web App Manifest injected via Blob URL
- Service Worker registered inline (cache-first strategy, `promptc-v9` cache)
- Installable on mobile and desktop
- Works offline after first load
- Apple touch icon meta tags included
- Online/offline detection badge in navigation
- Install prompt banner for non-standalone mode

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
- **Prompt Diff**: Paste two prompts, get side-by-side quality analysis across 4 dimensions (Clarity, Structure, Constraints, Predictability) with scoring bars, missing element detection, and a copy-ready comparison prompt
- **Web App Prompt Generator**: Configure audience, framework, and aesthetic keywords — prompt updates live
- **Tool Matrix Builder**: Select frontend + database + AI provider + payment tool and get a complete compatibility-checked stack guide with setup commands
- **Infographic Visualizers**: Interactive radar chart, heatmap, flow diagram, and donut chart

### Mobile-First
- Responsive clamp() sizing throughout
- Floating zone indicator dots at bottom
- Scrollable zone navigation
- 44px touch targets
- Reduced motion support via `prefers-reduced-motion`
- Swipe gesture support in presentation mode

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI components |
| Vite 5 | Build tool |
| GSAP 3.12 | Animation engine (CDN) |
| Inline PWA | Manifest + Service Worker (no external files) |
| Google Fonts | Bebas Neue, DM Sans, DM Mono |

**Minimal dependencies.** No component libraries, no state management, no routing library. The entire application is a single `App.jsx` file (~4,648 lines). GSAP is loaded via CDN — not bundled.

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
├── LICENSE                 # MIT License
├── README.md               # This file
├── src/
│   ├── main.jsx            # React entry point
│   └── App.jsx             # THE ENTIRE APPLICATION (~4,648 lines)
└── dist/                   # Production build output
```

---

## Architecture

### Data Layer (~lines 1–2900)
All content is stored as typed JavaScript constants at the top of `App.jsx`:

- `PWA_MANIFEST` — PWA configuration with inline SVG icons
- `FONT_CSS` — Global styles, 16+ keyframe animations, utility classes
- `MOTION` — Animation preset constants (spring, smooth, snap, hero, stagger)
- `C` — Color tokens and design constants
- `ZONES` — Zone navigation definitions
- `MASTER` — Core system prompt (10 rules + advocacy + writing rules)
- `MODS` — 56+ prompt modifiers across 9 categories (Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, Productivity)
- `TASKS` — 8 task-specific prompts (YouTube, Coding, Business, Research, UI/UX, Image AI, Copy, Email)
- `BRAND` / `BRANDS` — 6 brand system prompts (powerUP, SaaS, E-commerce, Fintech, Insurance, Creative Agency)
- `TMPLS` — 15+ prompt templates including Meta Prompts and Brand Systems
- `LAYERS` — 8-layer prompt architecture with copy-ready template
- `ANIMALS` — 7 animal thinking modes (Rabbit, Owl, Ant, Eagle, Dolphin, Beaver, Elephant)
- `CHAINS` — 6 optimized mode chains for specific goals
- `ENH` — 8 enhancement protocols with how-to guides
- `WEB_VARS` — 10 audience presets for Web App Generator
- `JSON_T` — 4 JSON output techniques
- `VOCAB` — 50+ design vocabulary terms across 5 categories
- `COMBOS` — 12 design synergy combos
- `LINT` — 24 prompt lint rules with auto-fix suggestions
- `SWAPS` — 40+ word swap improvements (beginner/misconception/advanced/hack)
- `WF` — 19 playbook workflows with animal chains
- `TOOL_MATRIX` — 4-category tool comparison data (Frontend, Database, AI, Payments)
- `TOP10_PROMPTS` — 10 monetizable prompt categories with search volume
- `SAAS_TEMPLATES` — 10 complete SaaS starter templates
- `MONETIZE_FW` — 4 monetization frameworks (Quick Win, Active, Passive, Hybrid)
- `AUTOMATION_WORKFLOWS` — 6 automation workflow prompts
- `AI_TOOLS` — 6 AI agent tool prompts with setup guides
- `MONETIZE_RECIPES` — 5 step-by-step income recipes
- `DEPLOY_STACKS` — 9 deployment stack guides with init commands
- `ANIM_LIBS` / `STACK_ANIM` — Animation library references

### Motion Components (~lines 2950–3060)
- `AnimatedCounter` — Count-up animation on viewport entry
- `ScrollReveal` — IntersectionObserver-triggered reveal (fadeSlide, scaleIn, fadeOnly)
- `AnimatedBar` — Elastic spring bar for scoring visualizations
- `StaggerGrid` — Children stagger-in on scroll
- `MorphPill` — Enhanced Pill with scale+glow on active
- `ParallaxText` — Scroll-driven text parallax
- `SkeletonCard` — Shimmer loading placeholder
- `HapticButton` — Visual pulse on interaction
- `prefersReducedMotion()` — Utility to check reduced motion preference

### Infographic Components (~lines 3070–3240)
- `PromptQualityRadar` — SVG spider chart with animated polygon
- `ZoneHeatmap` — Dot-based skill coverage grid
- `WorkflowChainVisualizer` — Animated SVG flow diagram
- `SkillDistributionDonut` — Animated donut chart

### PWA Enhancement Components (~lines 3280–3310)
- `OfflineBadge` — Real-time online/offline detection
- `InstallBanner` — PWA install prompt for non-standalone mode

### Shared UI Components (~lines 2910–2930)
- `Cp` — Copy button with success flash
- `Lbl` — Section label (uppercase, mono, colored)
- `H3` — Section heading
- `Card` — Content card with optional accent border
- `Code` — Code block with integrated copy button
- `Pill` / `MorphPill` — Filter/selection toggle button
- `Inp` — Text input with label
- `TA` — Textarea with label

### Zone Components (~lines 3310–3950)
- `Activate()` — Master prompt, Modifiers, Tasks, Templates
- `Build()` — Animals, Chains, 8-Layer, Enhancement, Web App, JSON, Vocab, Typography, Composer, WF Builder, Prompt Diff, **Infographics**
- `Validate()` — Lint Rules, Word Swaps, Quality Checklist, Prompt Scoring
- `Playbook()` — 19 workflows with search, category filter, and topic input
- `MonetizeView()` — Top 10, SaaS Templates, Frameworks, Deploy Stacks, Automations, AI Tools, Recipes, Tool Matrix

### Presentation Mode (~lines 3950–4030)
- `PresentationMode` — Full-screen slide system with keyboard/swipe navigation, progress bar, animated transitions

### App Shell (~lines 4500–4650)
- Sticky navigation with zone tabs + Present button
- GSAP crossfade zone transitions
- Cmd+K search overlay with pre-built index
- Floating mobile zone indicator
- Offline badge + install banner
- Zone-level entrance animations

---

## Zones Deep Dive

### ACTIVATE Zone
The starting point. Contains the **Master System Prompt** (a comprehensive 10-rule system prompt with advocacy mode built-in, writing rules, and skill references).

The **56+ Secret Sauce Modifiers** are organized by category: Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, and Productivity. Each modifier has a practical tip explaining when and why to use it.

**8 Task-Specific Prompts** cover YouTube, Coding, Business, Research, UI/UX, Image AI, Copy, and Email — each is a complete, copy-paste ready system prompt.

**15+ Templates** include Web App, Mobile, Brand, Landing Page, Dashboard, API Design, SEO Blog Post, A/B Test Copy, Technical Docs, 3 Meta Prompts, and 6 Brand Systems.

### BUILD Zone
The reference library and creative toolkit. **7 Animal Thinking Modes** (Rabbit, Owl, Ant, Eagle, Dolphin, Beaver, Elephant) each provide a distinct cognitive approach. **6 Mode Chains** combine animals for specific goals.

The **8-Layer Prompt Architecture** (Role, Context, Objective, Constraints, Aesthetic, Planning, Output, Refinement) provides the structural framework. The **Layer Composer** tool lets you fill in each layer and watch the prompt assemble in real time.

**8 Enhancement Protocols** include Self-Refinement Loop, Chain-of-Thought, Self-Consistency, Tweak Protocol, Prompt Diff, Zero-Shot CoT, Role + Constraint Stack, and Mega-Prompt Assembly.

**Infographics** — New animated data visualizations: Prompt Quality Radar chart, Zone Coverage Heatmap, Workflow Chain Visualizer with animated SVG paths, and Skill Distribution Donut chart.

**Prompt Diff Tool** — Paste two prompts, get side-by-side quality analysis with animated scoring bars, missing element detection, prompt text comparison, and a copy-ready comparison prompt for use with any AI.

### VALIDATE Zone
**24 Prompt Lint Rules** segmented by use-case with auto-fix suggestions. **40+ Word Swaps** organized by skill level. **Quality Checklist** builds a prompt requirements string. **Prompt Scoring** uses 4 animated sliders to generate a 1-10 overall score.

### PLAYBOOK Zone
**19 step-by-step workflows** organized by category. Each workflow has an animal chain, 4 steps with actionable items, final output description, and full copy-ready prompt.

### MONETIZE Zone
8 sub-sections: Top 10 Profitable Categories (with animated search volume counters), 10 SaaS Templates, 4 Monetization Frameworks, 6 Automation Workflows, 6 AI Agent Tools, 5 Monetization Recipes, 9 Deploy Stacks, and the Tool Matrix Builder.

---

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect GitHub repo to Vercel dashboard
# Or use: vercel deploy --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Static Hosting
```bash
npm run build
npx serve dist
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v2026.8 | Apr 2026 | **Motion-driven system**: GSAP animation engine, 8 motion components, 4 infographic visualizations, Presentation Mode, enhanced PWA (offline badge, install banner, GSAP transitions), removed Advocate Mode, added copy-ready prompt to Prompt Diff |
| v2026.7 | Apr 2026 | Comprehensive upgrade: +4 new modifiers, Claude Code AI tool, Mega-Prompt Assembly protocol, 4 new vocab terms, PromptDiff side-by-side text view, PWA v8 cache |
| v2026.4 | Mar 2026 | Monetize zone expansion: Tool Matrix Builder, Deploy Stacks, AI Agent Tools, Monetization Recipes |
| v2026.3 | Feb 2026 | PWA inline implementation, 8 Enhancement Protocols, Design Vocab expansion |
| v2026.2 | Jan 2026 | BUILD+BUILDER merge, 6 Brand Systems, ⌘K search, Web App Generator |
| v2026.1 | Dec 2025 | Initial release with 5 zones |

---

## Performance

- **Bundle size**: 405 KB (134 KB gzip)
- **Initial load**: Single HTML page + 1 JS chunk
- **Animation**: 60fps target, GSAP on RAF
- **PWA**: Cache-first strategy, works offline
- **Fonts**: Google Fonts with preconnect hints
- **Motion**: Respects `prefers-reduced-motion` globally

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>promptc OS</strong> — Motion-driven prompt engineering. Built for operators.
</p>
