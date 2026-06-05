# ⚡ promptc OS v4.0

**AI Prompt Engineering Operating System** — A comprehensive 6-zone workspace for building, validating, and monetizing AI prompts. 47+ modifiers, 21 workflows, 66 skills, Zod-validated state, debounced persistence, and WCAG AA accessibility.

[![Version](https://img.shields.io/badge/v4.0-blue)](https://github.com/marktantongco/promptc-os)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://marktantongco.github.io/promptc-os/)
[![Vercel](https://img.shields.io/badge/Vercel-live-brightgreen)](https://promptc-os.vercel.app)
[![Zod](https://img.shields.io/badge/Zod-validated-purple)](https://zod.dev)
[![WCAG AA](https://img.shields.io/badge/WCAG-AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![PWA](https://img.shields.io/badge/PWA-ready-orange)](https://web.dev/progressive-web-apps/)
[![MCP](https://img.shields.io/badge/MCP-14%20tools-blueviolet)](https://promptc-os.vercel.app/api/mcp)
[![Tests](https://img.shields.io/badge/tests-25%20passing-success)](src/lib/stateSchema.test.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

| | Links |
|---|---|
| 🌐 | **Live App (GitHub Pages):** [marktantongco.github.io/promptc-os](https://marktantongco.github.io/promptc-os/) |
| 🚀 | **Vercel:** [promptc-os.vercel.app](https://promptc-os.vercel.app) |
| 📦 | **Repository:** [github.com/marktantongco/promptc-os](https://github.com/marktantongco/promptc-os) |
| 📋 | **npm Package:** [use-validated-reducer](https://github.com/marktantongco/promptc-os/tree/main/packages/use-validated-reducer) |
| 📊 | **Skills Manifest:** [skills-manifest.json](https://github.com/marktantongco/promptc-os/blob/main/skills-manifest.json) |
| 🔌 | **MCP Server:** [promptc-os.vercel.app/api/mcp](https://promptc-os.vercel.app/api/mcp) |

---

## What is promptc OS?

promptc OS is a production-grade prompt engineering environment that treats prompt creation as a systematic engineering discipline — not ad-hoc copy-pasting. It provides structured tools across **6 interconnected zones** — from initial activation through building, validation, playbook orchestration, monetization, and system management. Every prompt, modifier, template, and workflow in the system is **copy-ready** — paste directly into ChatGPT, Claude, Gemini, or any AI chat.

The universal **Collection Basket** (⌘B) lets you gather your favorite prompts from any zone into a persistent, searchable collection. The **Clipboard History** tracks every copy action with timestamp and zone context. The **Command Palette** (⌘K) provides instant fuzzy search across the entire library. Designed mobile-first at 375px with PWA install support, WCAG AA accessibility, and zero external AI dependencies for core features — everything works offline.

**v4.0 introduces a Data Integrity Layer** — every piece of state that enters the system (from localStorage, from user actions, from corrupt data) is validated at the boundary with Zod schemas. The app no longer just handles errors; it **prevents** them. A null/undefined text field will never crash search again. A corrupt basket item will never enter the collection. And 25 property-based tests with 1,000+ random inputs prove it. This is the foundation for the next phase: making promptc OS a discoverable platform that AI agents can programmatically query via MCP.

---

## What's New in v4.0 — The Three Promotions

v4.0 was delivered in three promoted phases, each building on the last — from immediate crash fix to architectural integrity layer to platform discoverability. Each phase was promoted only after the previous one was validated in production.

### 🚨 Phase 1: C-1 Triage — "Works until it doesn't"

**The problem:** Calling `.toLowerCase().includes()` on `null` or `undefined` text fields crashed the search filter chain across the entire app. Users with corrupt localStorage data (missing text fields on basket items) would hit an unhandled TypeError on every keystroke in the Command Palette or basket search.

**The fix — defense in depth at every filter boundary:**

| Layer | Fix | Impact |
|-------|-----|--------|
| **`safeIncludes()`** | Null-safe case-insensitive string search in `src/lib/utils.ts` — returns `false` for `null`/`undefined` text instead of crashing | Prevents TypeError on every search filter |
| **BasketItem validation gate** | Never adds empty/corrupt items to the collection basket — `validateBasketItem()` rejects items missing `id` or `text` | Stops corrupt data from ever entering the basket |
| **localStorage load filter** | `loadPersistedState()` validates each key on load, skips corrupt entries with `console.warn` | Graceful degradation on corrupt persisted state |
| **7 filter chains hardened** | All `.toLowerCase().includes()` calls replaced with `safeIncludes()` | Every search path is null-safe |

```ts
// Before (crashes on null):
item.text.toLowerCase().includes(query)

// After (null-safe):
safeIncludes(item.text, query)
```

### 🦫 Phase 2: Beaver — "Fails safely, validates at every boundary"

**The problem:** 35+ individual `useEffect` writers each saving one piece of state to localStorage. No validation on load. No validation on save. If localStorage had corrupt data from a previous version, the app would load it silently and crash downstream. The state was a house of cards — every write independent, every load unverified, every boundary unguarded.

**The fix — Zod-validated state architecture:**

| Component | File | Purpose |
|-----------|------|---------|
| **`stateSchema.ts`** | `src/lib/stateSchema.ts` | Zod validators for all state shapes (`basketItemSchema`, `persistedStateSchema`). Single source of truth for state validation |
| **`useAppReducer.ts`** | `src/hooks/useAppReducer.ts` | `usePersistedReducer` hook combining `useReducer` + Zod validation + debounced batch localStorage save. Replaces 35+ individual `useEffect` writers |
| **`stateSchema.test.ts`** | `src/lib/stateSchema.test.ts` | 25 property-based tests with 1,000+ random inputs proving validators never throw on corrupt data |
| **`appReducer`** | `src/hooks/useAppReducer.ts` | Pure reducer with 20 typed actions + `BATCH_UPDATE` for atomic multi-field updates |
| **`loadPersistedState()`** | `src/lib/stateSchema.ts` | Loads + validates each key from localStorage, skips corrupt entries with warning log |

**How it works — the data flow:**

```
User Action
    ↓
dispatch(SET_SEARCH, "hello")
    ↓
appReducer → new state object
    ↓
Zod validation (boundary check)
    ↓
Component re-renders
    ↓
Debounced 500ms batch save
    ↓
Only changed keys written to localStorage
```

**Key design decisions:**

- **Validate on load, not on save** — corrupt localStorage data is gracefully skipped, never crashing the app
- **Debounced batch save** — a single `setTimeout(500ms)` replaces 35+ individual `useEffect` writers, reducing localStorage writes by ~95%
- **Only write changed keys** — `prevStateRef` comparison ensures no redundant writes
- **`BATCH_UPDATE` action** — `dispatch({ type: "BATCH_UPDATE", payload: { zone: "build", search: "" } })` for atomic multi-field updates
- **Never throws** — all validators use `safeParse()`, returning `null` for invalid data instead of throwing

**Test coverage — 25 property-based tests:**

| Test Category | Count | What it proves |
|---------------|-------|----------------|
| `validateBasketItem` — valid/invalid inputs | 6 | Accepts valid items, rejects null/undefined/empty/missing fields |
| Fuzz inputs (never throws) | 1 | `Symbol`, `BigInt`, `Date`, `RegExp`, `Error`, deeply nested objects — never throws |
| 1000 random inputs (always null or valid) | 1 | Statistical proof that validators always return `null | ValidatedBasketItem` |
| `loadPersistedState` — robustness | 4 | Returns empty object, never throws, skips corrupt entries, handles all-null localStorage |
| Schema robustness — edge types | 13 | `Symbol`, `BigInt`, `Date`, `Function`, `RegExp`, `Error`, deep nesting, sparse arrays, prototype objects, `NaN`, `Infinity`, optional fields, defaults |

### 🦅 Phase 3: Eagle — "Discoverable platform that any AI agent can query"

**The vision:** promptc OS becomes a discoverable platform — not just a web app, but an ecosystem of skills, tools, and integrations that AI agents and developers can programmatically access.

| Component | Status | Purpose |
|-----------|--------|---------|
| **`skills-manifest.json`** | ✅ Done | 66 skills registered for skills.sh discovery — 13 categories, trigger keywords, file counts |
| **MCP server** | ✅ Implemented | 14 tools exposed via JSON-RPC 2.0 at `/api/mcp` — search, skills, modifiers, templates, brands, animals, zones, basket CRUD, compose, analyze, system_prompt |
| **`use-validated-reducer`** | ✅ Built & tested | npm package extraction of `usePersistedReducer` hook — generic React hook for Zod-validated persisted state (8/8 tests passing, dual CJS/ESM) |
| **Platform API** | ✅ Done | MCP endpoint at `/api/mcp` (Vercel) — full JSON-RPC 2.0 server with 14 tools |

---

## The 6 Zones

promptc OS organizes the entire prompt engineering lifecycle into 6 color-coded zones, each with sub-tabs that focus on a specific aspect of the craft.

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
| **Meta Builder** | 3 instant prompt transformers: Quick Critique, Structured Analysis, Expert Engineering (no AI required — fully offline) |

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

Collect prompts from any zone into a persistent, searchable collection. Pin, favorite, multi-select, sort, search, filter by zone, export to `.md`/`.JSON`, pipeline progress visualization, smart recommendations, stats & insights, and cross-zone forwarding.

**v4.0:** Every basket item is validated through `basketItemSchema` — corrupt items with missing `id` or empty `text` are rejected at the boundary. The basket is bulletproof.

### 🔧 Modifier Assembly

User input field + **+Add** buttons on each modifier. Numbered assembly list with sequential connector format (`→ [anticipates next modifier]`). Copy Assembly exports the complete chain as a single ready-to-paste prompt.

### 🛠️ Prompt Enhancer

Paste a prompt, select enhancement techniques from the palette, and generate a combined enhanced output with all selected techniques applied in a single pass.

### 📋 Clipboard History (⌘⇧C)

Every copy action tracked with timestamp and zone. Slide-in panel, Copy All, Clear, individual re-copy. Persists up to 50 items across sessions.

**v4.0:** Clipboard history entries are Zod-validated on load — corrupt entries are silently skipped.

### 🔍 Command Palette (⌘K)

Fuzzy search across all modifiers, templates, tasks, workflows, brands, animals, enhancements, lint rules, word swaps, and chains. Zone quick-switch, keyboard navigation.

**v4.0:** All 7 filter chains use `safeIncludes()` — null text fields never crash search.

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open Command Palette |
| `⌘B` / `Ctrl+B` | Toggle Basket panel |
| `⌘⇧C` / `Ctrl+Shift+C` | Toggle Clipboard History |
| `⌘P` / `Ctrl+P` | Quick Compose |
| `⌘1` through `⌘6` | Switch to Zone 1–6 |
| `?` | Keyboard shortcuts overlay |
| `Escape` | Close panels |

### 📱 PWA + Mobile Navigation

- **PWA**: Install to home screen, standalone display, service worker caching with stale-while-revalidate strategy
- **iOS bottom tab bar**: 5 primary zones + "More" vertical menu
- **Safe area padding**: Notch and home indicator support via `env(safe-area-inset-*)`
- **375px design minimum**: All layouts tested at iPhone SE width

### 🛡️ Data Integrity (v4.0 NEW)

Zod-validated state at every boundary — load, update, persist. `basketItemSchema` and `persistedStateSchema` provide single-source-of-truth validation. Debounced batch save replaces 35+ individual `useEffect` writers. 25 property-based tests with 1,000+ random inputs prove the validators are bulletproof.

---

## Data Integrity Architecture

v4.0 introduces a three-layer validation architecture that prevents corrupt data from ever reaching the UI. Every boundary — load, update, persist — is validated with Zod schemas. This is the single most important architectural change in v4.0.

### Validation Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 3: UI Render                        │
│  Components receive only validated, typed state objects      │
│  safeIncludes() prevents null crashes in filter chains       │
├─────────────────────────────────────────────────────────────┤
│                    LAYER 2: State Manager                    │
│  appReducer — 20 typed actions + BATCH_UPDATE               │
│  usePersistedReducer — Zod validation on every dispatch      │
│  Debounced 500ms batch save (replaces 35+ useEffects)       │
├─────────────────────────────────────────────────────────────┤
│                    LAYER 1: Storage Boundary                  │
│  loadPersistedState() — validates each key, skips corrupt    │
│  validateBasketItem() — rejects null/empty/invalid items     │
│  safeIncludes() — null-safe string search                    │
└─────────────────────────────────────────────────────────────┘
```

### State Flow Diagram

```
localStorage
    ↓ loadPersistedState()
    ↓ Zod field-by-field validation
    ↓ skip corrupt keys → console.warn
    ↓
Initial State (validated)
    ↓
dispatch(ACTION)
    ↓ appReducer (pure function)
    ↓
New State
    ↓ component re-renders
    ↓
Debounced 500ms save
    ↓ diff against prevStateRef
    ↓ only changed keys written
    ↓
localStorage
```

### Schema Reference

| Schema | File | Validates |
|--------|------|-----------|
| `basketItemSchema` | `stateSchema.ts` | `id` (min 1), `text` (min 1), `label`, `zone`, `time`, `chars` (int ≥ 0), `pinned` (default false), `favorited` (default false), `pipelineStage` (optional), `copyCount` (optional) |
| `persistedStateSchema` | `stateSchema.ts` | 19 persisted keys: `zone`, `subtab`, `search`, `skills-search`, `quickstart-dismissed`, `basket-search`, `basket-zone-filter`, `basket-sort` (enum: newest/oldest/longest/shortest/az), `animal-input`, `chain-input`, `meta-prompt`, `qa-input`, `composer-fields`, `compose-text`, `mod-assembly`, `mod-user-input`, `selected-animals`, `enhance-input`, `clipboard-history` |

### The `usePersistedReducer` Pattern

```ts
// Usage:
const [state, dispatch] = usePersistedReducer(
  appReducer,           // pure reducer with 20 actions
  initialState,         // default state shape
  persistedStateSchema, // Zod schema for validation
  { storageKey: "promptc-state", debounceMs: 500 }
);

// Individual action:
dispatch({ type: "SET_SEARCH", payload: "role prompt" });

// Batch update (atomic multi-field):
dispatch({
  type: "BATCH_UPDATE",
  payload: { zone: "build", search: "", subtab: { build: "master" } }
});
```

### Error Handling Flow

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

**v4.0 addition:** Before errors even reach this handler, the Data Integrity Layer prevents many of them. `safeIncludes()` prevents `TypeError` on null text. `validateBasketItem()` prevents corrupt items from entering state. `loadPersistedState()` skips corrupt localStorage entries instead of crashing. The error handler is the last line of defense — the validation layer is the first.

---

## Accessibility (WCAG AA)

promptc OS meets WCAG AA standards across all zones and components. Accessibility is a first-class requirement, not an afterthought.

| Requirement | Implementation |
|-------------|---------------|
| **Text contrast** | All text meets 4.5:1 minimum on dark background (`#9CA3AF` = 7.5:1 contrast ratio) |
| **UI contrast** | Interactive elements meet 3:1 minimum against adjacent colors |
| **aria-labels** | All icon-only buttons have descriptive `aria-label` attributes |
| **Keyboard nav** | Tab-navigable, `focus-visible` ring on all interactive elements |
| **Touch targets** | Minimum 40×40px on nav buttons, 44×44px on primary actions |
| **Focus management** | Backdrop overlays use `tabIndex={-1}` to prevent trapping |
| **Screen reader** | Semantic HTML, proper `<button>` elements, descriptive labels |
| **Data integrity** | v4.0: Corrupt state never reaches UI — no broken states to navigate |

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16 | React framework (App Router, Turbopack) |
| **React** | 19 | UI library |
| **TypeScript** | 5 | Type safety |
| **Zod** | 4 | Runtime state validation — single source of truth for all state shapes |
| **Tailwind CSS** | 4 | Utility-first styling |
| **Framer Motion** | 12 | Animations and transitions |
| **Lucide React** | — | Icon library |
| **Sonner** | — | Toast notifications |
| **React Markdown** | — | Markdown rendering (lazy-loaded) |
| **Radix UI** | — | 50+ accessible primitives (Dialog, Tabs, Tooltip, Accordion, etc.) |
| **cmdk** | — | Command palette engine |
| **Recharts** | — | Data visualization |
| **Bun** | — | JavaScript runtime and package manager |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended)

### Local Development

```bash
# Clone the repository
git clone https://github.com/marktantongco/promptc-os.git
cd promptc-os

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
# Property-based tests for state validation (25 tests, 1000+ random inputs)
bun test src/lib/stateSchema.test.ts
```

### Deploy to Vercel

1. Push your repo to GitHub
2. Connect at [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Next.js — deploy with zero config

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

### Deploy to GitHub Pages

The app is configured for static export and deployed at [marktantongco.github.io/promptc-os](https://marktantongco.github.io/promptc-os/).

```bash
bun run build
# Static files are generated in the `out/` directory
```

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
│   │   ├── api/
│   │   │   ├── route.ts          # Health check endpoint
│   │   │   ├── generate/route.ts # Prompt generation API
│   │   │   ├── analyze/route.ts  # Prompt analysis API
│   │   │   └── mcp/route.ts      # v4.0: MCP server (14 tools, JSON-RPC 2.0)
│   │   └── data/
│   │       ├── promptc-data.ts   # Core data layer (1,337 lines) — 22 exports
│   │       └── skills-catalog.ts # Skills registry (162 lines) — 66 skills, 13 categories
│   ├── components/
│   │   ├── CommandPalette.tsx    # ⌘K search (safeIncludes filter chain)
│   │   ├── OnboardingTour.tsx    # First-visit tutorial
│   │   └── ui/                   # 50+ Radix UI primitives (Dialog, Tabs, Tooltip, etc.)
│   ├── hooks/
│   │   ├── useAppReducer.ts      # v4.0: usePersistedReducer + appReducer (20 actions + BATCH_UPDATE)
│   │   ├── use-toast.ts          # Toast notification hook
│   │   └── use-mobile.ts         # Mobile detection hook
│   └── lib/
│       ├── db.ts                 # Database config (Prisma)
│       ├── utils.ts              # Utilities + safeIncludes() (v4.0 null-safe search)
│       ├── stateSchema.ts        # v4.0: Zod validators (basketItemSchema, persistedStateSchema, loadPersistedState)
│       └── stateSchema.test.ts   # v4.0: 25 property-based tests (1,000+ random inputs)
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker (stale-while-revalidate caching)
│   ├── icons/                    # PWA icons (192px, 512px)
│   ├── logo.svg                  # App logo
│   └── robots.txt                # Search engine directives
├── skills-manifest.json          # v4.0: 66 skills registered for skills.sh discovery
└── package.json                  # v4.0.0
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Single `PageClient.tsx`** | All 6 zones rendered client-side for instant tab switching; server component provides loading skeleton |
| **`usePersistedReducer` over 35+ `useEffect`s** | Single debounced save replaces dozens of independent writers; Zod validation at every boundary |
| **`safeIncludes()` utility** | Null-safe search prevents TypeError crashes across all 7 filter chains |
| **Zod as single source of truth** | Runtime validation matches TypeScript types; schema is the contract |
| **Radix UI primitives** | Accessible by default; eliminates custom ARIA implementation for 50+ components |
| **PWA with stale-while-revalidate** | Instant load from cache, background update; works fully offline for core features |

---

## Version History

| Version | Changes |
|---------|---------|
| **v4.0** | **The Three Promotions** — C-1 Triage: `safeIncludes()` null-safe search, BasketItem validation gate, localStorage load filter, 7 hardened filter chains. Beaver: `stateSchema.ts` Zod validators, `usePersistedReducer` hook (replaces 35+ useEffect writers), `appReducer` with 20 typed actions + BATCH_UPDATE, `loadPersistedState()` with boundary validation, 25 property-based tests (1,000+ random inputs). Eagle: `skills-manifest.json` (66 skills), MCP server implemented (14 tools, JSON-RPC 2.0 at `/api/mcp`), `use-validated-reducer` npm package (built & tested, 8/8 tests), SKILL.md for skills.sh registration |
| **v3.9** | WCAG AA accessibility overhaul (contrast, aria-labels, focus-visible, touch targets), mobile-first 375px design, interaction state spec (80ms press, 150ms hover), error handling system (retry → notify → log → halt), Meta Builder fully local, PWA support, Wordswap redesign |
| **v3.8** | PWA manifest + service worker + icons, mobile right space fix, bottom buttons always visible, Meta Builder local restructuring |
| **v3.7** | Modifier +Add to Basket, Prompt Chaining Format, Meta Builder API fix, Clipboard History shortcut |
| **v3.6** | Modifier Assembly, Animal Multi-Select, Prompt Enhancer, Clipboard History, Universal +Add to Basket, Micro-Interactions |
| **v3.5** | Micro-interactions, visual cues, tooltips, speed optimization |
| **v3.2** | Favorites, iOS mobile nav, Quick Compose, cross-zone forwarding |
| **v3.0** | CommandPalette, OnboardingTour, Skills Library |
| **v2.0** | Collection Basket, Skills Library, Compounding Dashboard |

---

## Operating Principles

These principles guide every decision in the promptc OS codebase. They are non-negotiable.

1. **NO ONE-OFF WORK** — Every task produces a reusable asset. If you build it once, it compounds forever.
2. **THE RULE** — Plan → Validate → Execute. Never skip validation. Every boundary is a checkpoint.
3. **COMPOUNDING SYSTEM** — Build once → runs forever → every skill makes the system smarter. The system gets better with every use.
4. **ACCESSIBILITY FIRST** — WCAG AA minimum, keyboard navigable, contrast compliant. No exceptions.
5. **MOBILE FIRST** — Design at 375px, scale up. The smallest screen is the most important.
6. **NO SILENT FAILURES** — Retry → notify → log → halt. If something fails, the user knows.
7. **VALIDATE AT EVERY BOUNDARY** — v4.0: Zod schemas validate state on load, update, and persist. Corrupt data is rejected, never propagated. The schema is the contract.

---

## MCP Server

promptc OS v4.0 implements a Model Context Protocol (MCP) server at `/api/mcp`, making the prompt library, basket, and composer available as tools for AI agents like Claude, GPT, and others. The server implements JSON-RPC 2.0 over HTTP POST (StreamableHTTP transport).

**Endpoint:** `https://promptc-os.vercel.app/api/mcp`

### MCP Tools (14 implemented)

| Tool | Description | Status |
|------|-------------|--------|
| `search` | Search across all content — modifiers, templates, tasks, workflows, brands, animals, skills | ✅ Implemented |
| `skills_list` | List 66 skills with optional category filter | ✅ Implemented |
| `skills_get` | Get detailed skill info by name | ✅ Implemented |
| `modifiers_list` | List 47 modifiers with optional category filter | ✅ Implemented |
| `templates_list` | List all prompt templates | ✅ Implemented |
| `brands_list` | List 6 brand design systems | ✅ Implemented |
| `animals_list` | List 7 thinking mode animals | ✅ Implemented |
| `zones_list` | List 6 workspace zones | ✅ Implemented |
| `basket_add` | Add item to basket (Zod-validated via basketItemSchema) | ✅ Implemented |
| `basket_remove` | Remove item from basket by id | ✅ Implemented |
| `basket_list` | List basket items with zone filter + 5 sort modes | ✅ Implemented |
| `compose` | Compose structured prompt from 8 layers (Role → Context → Objective → Constraints → Aesthetic → Planning → Output → Refinement) | ✅ Implemented |
| `analyze` | Score prompt on 4 dimensions (clarity, specificity, structure, actionability) using AI | ✅ Implemented |
| `system_prompt` | Get the master system prompt | ✅ Implemented |

### MCP Architecture

```
AI Agent (Claude, GPT, etc.)
    ↓ MCP Protocol (JSON-RPC 2.0 over HTTP POST)
promptc OS MCP Server (/api/mcp)
    ↓
├── Search Engine → safeIncludes() null-safe filter chain
├── Skills Registry → SKILLS_CATALOG with 66 skills
├── Modifiers/Templates/Tasks → promptc-data.ts (1,337 lines)
├── Basket Manager → basketItemSchema Zod validation
├── Composer → 8-layer prompt builder
└── Analyzer → z-ai-web-dev-sdk AI scoring
```

### Calling the MCP Server

```bash
# Initialize connection
curl -X POST https://promptc-os.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0"}}}'

# Search for role modifiers
curl -X POST https://promptc-os.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search","arguments":{"query":"role","category":"Role"}}}'

# Compose a structured prompt
curl -X POST https://promptc-os.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"compose","arguments":{"role":"senior developer","objective":"Build a responsive dashboard"}}}'

# Analyze a prompt
curl -X POST https://promptc-os.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"analyze","arguments":{"prompt":"Make a nice website for my business"}}}'

# Discovery endpoint (GET)
curl https://promptc-os.vercel.app/api/mcp
```

### JSON-RPC Methods

| Method | Description |
|--------|-------------|
| `initialize` | Handshake — returns server capabilities and protocol version |
| `notifications/initialized` | Client acknowledgment (returns 204) |
| `tools/list` | Returns all 14 tool definitions with input schemas |
| `tools/call` | Execute a tool by name with arguments |
| `ping` | Health check |

### npm Package: `use-validated-reducer`

The `usePersistedReducer` hook has been extracted into a standalone npm package at `packages/use-validated-reducer/`. It is built, tested (8/8 tests passing), and ready for publishing:

```bash
# Build and test locally
cd packages/use-validated-reducer
npm install
npm run build    # → dist/index.js (CJS) + dist/index.mjs (ESM) + types
npm test         # → 8 tests passing

# Publish to npm (requires npm login)
npm publish
```

```ts
// Installation (after publish):
// npm install use-validated-reducer

import { usePersistedReducer } from "use-validated-reducer";
import { z } from "zod";

const schema = z.object({
  count: z.number().default(0),
  name: z.string().default(""),
});

const [state, dispatch] = usePersistedReducer(reducer, initialState, schema, {
  storageKey: "my-app",
  debounceMs: 300,
  validateOnLoad: true,
});
```

**Features of the extracted package:**

- Generic over any state shape and Zod schema
- Debounced batch persistence to localStorage
- `prevStateRef` diffing — only writes changed keys
- `validateOnLoad` — Zod validation on hydration
- `persistKeys` — opt-in to persist only specific keys
- Zero dependencies beyond React + Zod

**Extraction documented in:** `src/hooks/useAppReducer.ts` header comments

---

## License

[MIT](https://opensource.org/licenses/MIT)

---

*Built with ⚡ by [promptc OS](https://promptc-os.vercel.app) — AI Prompt Engineering Operating System*
