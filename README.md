# ⚡ promptc OS v3.9

**AI Prompt Engineering Operating System** — A comprehensive, accessible, mobile-first 6-zone workspace for building, validating, and monetizing AI prompts. 47+ modifiers, 21 workflows, 66 skills, PWA-ready, WCAG AA compliant, and fully offline-capable Meta Builder.

**Live App (Vercel):** [promptc-os.vercel.app](https://promptc-os.vercel.app)  
**GitHub Pages:** [marktantongco.github.io/promptc-os](https://marktantongco.github.io/promptc-os/)  
**Repository:** [github.com/marktantongco/promptc-os](https://github.com/marktantongco/promptc-os)

---

## What is promptc OS?

promptc OS is a production-grade prompt engineering environment that treats prompt creation as a systematic engineering discipline. It provides structured tools across 6 interconnected zones — from initial activation through building, validation, playbook orchestration, monetization, and system management. Every prompt, modifier, template, and workflow in the system is **copy-ready** — paste directly into ChatGPT, Claude, Gemini, or any AI chat.

The universal Collection Basket (⌘B) lets you gather your favorite prompts across all zones, the Clipboard History tracks every copy action, and the Command Palette (⌘K) provides instant search across the entire library. Designed mobile-first at 375px with PWA install support, WCAG AA accessibility, and zero external AI dependencies for core features.

---

## What's New in v3.9

### ♿ WCAG AA Accessibility Overhaul
- **Contrast fix**: All text colors upgraded to meet WCAG AA 4.5:1 contrast ratio. Replaced `#4b5563` (3.0:1) and `#6B7280` (4.2:1 on cards) with `#9CA3AF` (7.5:1) across 125+ instances
- **aria-labels**: Added descriptive aria-labels to all icon-only navigation buttons (Command Palette, Shortcuts, Tour, Basket, Clipboard, Scroll-to-top, Quick Compose)
- **Focus-visible ring**: Enhanced keyboard navigation with purple outline ring (2px solid, 0.7 opacity), overflow-hidden container support, and `:focus:not(:focus-visible)` reset for mouse users
- **Backdrop focus management**: All modal backdrops use `tabIndex={-1}` to prevent keyboard focus trapping

### 📱 Mobile-First 375px Design
- **Viewport constraint**: `overflow-x: hidden` on html, body, and root container eliminates phantom right column
- **Dynamic width panels**: Basket and Clipboard panels use `w-full max-w-[28rem]` — full-width on 375px devices, capped at 28rem on desktop
- **Safe area support**: `env(safe-area-inset-bottom)` and `env(safe-area-inset-top)` for notched devices (iPhone X+)
- **Touch targets**: Minimum 40×40px on all nav icon buttons; `.touch-target` CSS utility class for 44×44px WCAG compliance
- **375px-optimized padding**: Reduced horizontal padding (px-3 on mobile) to maximize usable content area

### 🎨 Interaction State Specification
- **Button press**: 80ms animation, scale(0.97) — snappy, responsive feel
- **Hover lift**: 150ms cubic-bezier transition with 2px translateY
- **Focus-visible**: 2px purple outline with 2px offset, auto border-radius
- **Touch feedback**: `-webkit-tap-highlight-color: transparent` for native-feeling taps

### 🛡️ Error Handling System
- **Typed error classification**: `PromptcError` type with `code`, `message`, and `retryable` fields
- **Retry utility**: `withRetry(fn, { retries, label })` — retries up to 2 times with exponential backoff (300ms, 600ms) on retryable errors
- **Error classification**: Distinguishes `LS_QUOTA` (storage full), `LS_BLOCKED` (security), `CLIP_FAIL` (clipboard denied) from unknown errors
- **Logging**: All localStorage operations now log warnings on failure instead of silently swallowing errors
- **User notification**: Non-retryable errors trigger `toast.error()` with human-readable messages

### 🔄 Meta Prompt Builder — Fully Local (No AI Required)
- **Quick Critique**: Instantly scores clarity & relevance (0-10), lists 5-7 improvements, generates 2 refined prompt variants
- **Structured Analysis**: Deep breakdown of prompt structure (length, sections, examples, measurability), 5 improvement approaches, 2 structured variants
- **Expert Engineering**: Completeness check, precision analysis, full restructured prompt with self-test checklist, plus strategy & precision variants
- **Zero API calls**: All restructuring happens client-side in ~300ms — works offline, no rate limits

### 📲 PWA (Progressive Web App)
- **Installable**: Add to home screen on iOS/Android with standalone display mode
- **Service worker**: Cache-first strategy with versioned cache invalidation
- **App icons**: 192px and 512px icons with maskable support
- **Apple integration**: `apple-mobile-web-app-capable`, `apple-touch-icon`, black-translucent status bar

### ✏️ Wordswap Section Redesign
- **Single-column layout**: Word content (bad → good) on top row
- **Aligned action buttons**: Copy and Basket buttons in a clear row below the word content
- **Expand/collapse**: Chevron aligned to the right, consistent placement
- **Better touch targets**: Buttons use `px-2 py-1` instead of bare icon buttons

---

## What's New in v3.8

- **PWA support**: manifest.json, service worker, app icons, apple-touch-icon
- **Mobile layout fix**: Fixed phantom right column (overflow-x:hidden, w-full, reduced padding)
- **Bottom buttons**: Fixed hiding on scroll (tab bar safe-area, FAB repositioned above tab bar)
- **Meta Prompt Builder restructure**: Local restructuring replacing AI API calls

---

## The 6 Zones

### 🟢 1. Activate — Discover & Collect

The starting zone. Browse, search, and collect the building blocks of great prompts.

| Sub-tab | Contents | Count |
|---------|----------|-------|
| **Tasks** | Ready-to-use task prompts (YouTube, Coding, Business, Research, UI/UX, Image AI, Copy, Email) | 8 |
| **Modifiers** | Prompt modifiers across 9 categories (Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, Productivity) | 47 |
| **Templates** | Pre-built prompt templates (Web App, Mobile, Brand, Landing Page, Dashboard, API Design, AI Agent, MCP Server, and more) | 20 |
| **Brands** | Complete brand design systems (powerUP, SaaS/B2B, E-commerce, Fintech, Insurance, Creative Agency) | 6 |
| **Animals** | 7 animal thinking modes with multi-select and combined generation | 7 |
| **Composer** | 8-layer prompt builder (Role → Context → Objective → Constraints → Aesthetic → Planning → Output → Refinement) | 1 |

### 🔵 2. Build — Construct & Transform

| Sub-tab | Contents |
|---------|----------|
| **Master Prompt** | Foundational system prompt (10 core rules + advocacy mode + writing rules) |
| **Enhancements** | 8 advanced techniques with user input for combined enhancement |
| **Meta Builder** | 3 instant prompt transformers: Quick Critique, Structured Analysis, Expert Engineering (no AI required) |

### 🟡 3. Validate — Test & Improve

| Sub-tab | Contents |
|---------|----------|
| **Lint Rules** | 28 automated lint checks across 5 segments |
| **Word Swaps** | 40+ weak → strong word replacements across 4 levels |
| **Vocabulary** | 60+ design terms with CSS implementations |
| **Quality Score** | AI-powered 4-dimension analysis |

### 🟠 4. Playbook — Orchestrate & Execute

| Sub-tab | Contents |
|---------|----------|
| **Workflows** | 21 production workflows across Design, Dev, Business, AI/ML, and more |
| **Animal Chains** | 6 multi-animal thinking sequences |
| **Design Combos** | 12 design element combinations with psychological rationale |
| **Typography** | 4 display + mono font pairings with use-case recommendations |

### 🔴 5. Monetize — Earn & Scale

| Sub-tab | Contents |
|---------|----------|
| **Top Prompts** | 6 highest-value prompt products with revenue potential |
| **SaaS Templates** | 6 automation blueprints with tech stacks and time estimates |
| **Stacks** | 4 income strategies (Quick Win → Active → Passive → Hybrid) |
| **AI Tools** | 5 agent frameworks with starter prompts |
| **Compounding** | The compounding system philosophy |
| **Pricing Guide** | Revenue tier strategy |

### 🟣 6. System — Meta-Control & Skills

| Sub-tab | Contents |
|---------|----------|
| **Skills Library** | 66 skills across 13 categories |
| **Compounding** | System health dashboard |
| **Principles** | 6 core operating principles |
| **Skill Builder** | 6-step wizard |
| **Workflow Patterns** | Visual step-flow patterns |
| **Self-Evolve** | Growth tracking dashboard |
| **Infographics** | Zone overview + modifier coverage |
| **Package Docs** | Markdown reference generator |

---

## Key Features

### 🧺 Collection Basket (⌘B)
Collect prompts from any zone. Pin, favorite, multi-select, sort, search, filter by zone, export to .md/.JSON, pipeline progress visualization, smart recommendations, stats & insights, cross-zone forwarding.

### 🔧 Modifier Assembly
User input field + +Add buttons on each modifier. Numbered assembly list with sequential connector format (`→ [anticipates next modifier]`). Copy Assembly exports the complete chain.

### 🛠️ Prompt Enhancer
Paste a prompt, select enhancement tools, generate combined enhanced output with all selected techniques applied.

### 📋 Clipboard History
Every copy action tracked with timestamp and zone. Slide-in panel, Copy All, Clear, individual re-copy. Persists up to 50 items.

### 🔍 Command Palette (⌘K)
Fuzzy search across all modifiers, templates, tasks, workflows, brands, animals, enhancements, lint rules, word swaps, and chains. Zone quick-switch, keyboard navigation.

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open Command Palette |
| `⌘B` / `Ctrl+B` | Toggle Basket panel |
| `⌘⇧C` / `Ctrl+Shift+C` | Toggle Clipboard History |
| `⌘P` / `Ctrl+P` | Quick Compose |
| `⌘1` through `⌘6` | Switch to Zone 1-6 |
| `?` | Keyboard shortcuts overlay |
| `Escape` | Close panels |

### 📱 PWA + Mobile Navigation
- **PWA**: Install to home screen, standalone display, service worker caching
- **iOS bottom tab bar**: 5 primary zones + "More" vertical menu
- **Safe area padding**: Notch and home indicator support
- **375px design minimum**: All layouts tested at iPhone SE width

---

## Accessibility (WCAG AA)

| Requirement | Implementation |
|-------------|---------------|
| **Text contrast** | All text meets 4.5:1 minimum on dark background (`#9CA3AF` = 7.5:1) |
| **UI contrast** | Interactive elements meet 3:1 minimum |
| **aria-labels** | All icon-only buttons have descriptive labels |
| **Keyboard nav** | Tab-navigable, focus-visible ring on all interactive elements |
| **Touch targets** | Minimum 40×40px on nav buttons, 44×44px on primary actions |
| **Focus management** | Backdrop overlays use `tabIndex={-1}` to prevent trapping |
| **Screen reader** | Semantic HTML, proper button elements, descriptive labels |

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | React framework (App Router, Turbopack) |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Framer Motion** | 12 | Animations and transitions |
| **Lucide React** | — | Icon library |
| **Sonner** | — | Toast notifications |
| **React Markdown** | — | Markdown rendering (lazy-loaded) |
| **Bun** | — | JavaScript runtime |

---

## Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Local Development
```bash
git clone https://github.com/marktantongco/promptc-os.git
cd promptc-os
bun install
bun run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel
Connect your GitHub repo at [vercel.com/new](https://vercel.com/new) or use the Vercel CLI.

### GitHub Pages
The app is also deployed at [marktantongco.github.io/promptc-os](https://marktantongco.github.io/promptc-os/).

---

## Architecture

```
promptc-os/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Server component with loading skeleton
│   │   ├── layout.tsx            # Root layout (PWA meta, fonts, SW registration)
│   │   ├── globals.css           # Theme, micro-interactions, animations, accessibility
│   │   ├── PageClient.tsx        # Core client component (~1,950 lines)
│   │   └── data/
│   │       ├── promptc-data.ts   # Core data layer (1,337 lines) — 22 exports
│   │       └── skills-catalog.ts # Skills registry (162 lines) — 66 skills
│   ├── components/
│   │   ├── CommandPalette.tsx    # ⌘K search
│   │   └── OnboardingTour.tsx    # First-visit tutorial
│   └── lib/
│       ├── db.ts                 # Database config
│       └── utils.ts              # Utilities
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   ├── icons/                    # PWA icons (192px, 512px)
│   └── logo.svg
└── package.json
```

---

## Error Handling Architecture

```
User Action
    ↓
try { operation() }
    ↓ (fails)
classifyError(err)
    ↓
├─ retryable? ──→ Retry up to 2x (300ms backoff)
│                  ↓ (still fails)
│                  console.error("[promptc]", code, message)
│                  toast.error("Action: Human message")
│                  throw err
│
└─ not retryable ──→ console.error("[promptc]", code, message)
                     toast.error("Action: Human message")
                     throw err
```

Error codes: `LS_QUOTA` (storage full), `LS_BLOCKED` (security), `CLIP_FAIL` (clipboard denied), `UNKNOWN`

---

## Version History

| Version | Changes |
|---------|---------|
| **v3.9** | WCAG AA accessibility overhaul (contrast, aria-labels, focus-visible, touch targets), mobile-first 375px design, interaction state spec (80ms press, 150ms hover), error handling system (retry→notify→log→halt), Meta Builder fully local, PWA support, Wordswap redesign |
| **v3.8** | PWA manifest + service worker + icons, mobile right space fix, bottom buttons always visible, Meta Builder local restructuring |
| **v3.7** | Modifier +Add to Basket, Prompt Chaining Format, Meta Builder API fix, Clipboard History shortcut |
| **v3.6** | Modifier Assembly, Animal Multi-Select, Prompt Enhancer, Clipboard History, Universal +Add to Basket, Micro-Interactions |
| **v3.5** | Micro-interactions, visual cues, tooltips, speed optimization |
| **v3.2** | Favorites, iOS mobile nav, Quick Compose, cross-zone forwarding |
| **v3.0** | CommandPalette, OnboardingTour, Skills Library |
| **v2.0** | Collection Basket, Skills Library, Compounding Dashboard |

---

## Operating Principles

1. **NO ONE-OFF WORK** — Every task produces a reusable asset
2. **THE RULE** — Plan → Validate → Execute, never skip validation
3. **COMPOUNDING SYSTEM** — Build once → runs forever → every skill makes the system smarter
4. **ACCESSIBILITY FIRST** — WCAG AA minimum, keyboard navigable, contrast compliant
5. **MOBILE FIRST** — Design at 375px minimum, scale up
6. **NO SILENT FAILURES** — Retry → notify → log → halt

---

*Built with ⚡ by [promptc OS](https://promptc-os.vercel.app) — AI Prompt Engineering Operating System*
