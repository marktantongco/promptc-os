# ⚡ promptc OS v4.0

![Version](https://img.shields.io/badge/version-4.0-blue?style=flat-square)
![Zod](https://img.shields.io/badge/validated_with-Zod-3068b7?style=flat-square)
![WCAG AA](https://img.shields.io/badge/accessibility-WCAG_AA-green?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-ready-orange?style=flat-square)

**AI Prompt Engineering Operating System** — A comprehensive, accessible, mobile-first 6-zone workspace for building, validating, and monetizing AI prompts. 47+ modifiers, 21 workflows, 66 skills, PWA-ready, WCAG AA compliant, Zod-validated state, and fully offline-capable Meta Builder.

**Live App (Vercel):** [promptc-os.vercel.app](https://promptc-os.vercel.app)
**GitHub Pages:** [marktantongco.github.io/promptc-os](https://marktantongco.github.io/promptc-os/)
**Repository:** [github.com/marktantongco/promptc-os](https://github.com/marktantongco/promptc-os)

---

## What is promptc OS?

promptc OS is a production-grade prompt engineering environment that treats prompt creation as a systematic engineering discipline. It provides structured tools across 6 interconnected zones — from initial activation through building, validation, playbook orchestration, monetization, and system management. Every prompt, modifier, template, and workflow in the system is **copy-ready** — paste directly into ChatGPT, Claude, Gemini, or any AI chat.

The universal Collection Basket (⌘B) lets you gather your favorite prompts across all zones, the Clipboard History tracks every copy action, and the Command Palette (⌘K) provides instant search across the entire library. Designed mobile-first at 375px with PWA install support, WCAG AA accessibility, and zero external AI dependencies for core features.

**v4.0 introduces a Data Integrity Layer** — every piece of state that enters the system (from localStorage, from user actions, from corrupt data) is validated at the boundary with Zod schemas. The app no longer just handles errors; it **prevents** them. A null/undefined text field will never crash search again. A corrupt basket item will never enter the collection. And 25 property-based tests with 1,000+ random inputs prove it.

---

## What's New in v4.0 — The Three Promotions

v4.0 was delivered in three promoted phases, each building on the last — from immediate crash fix to architectural integrity layer to platform discoverability.

### 🚨 Phase 1: C-1 Triage — Search Crash Fix

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

### 🦫 Phase 2: Beaver — Data Integrity Layer

**The problem:** 35+ individual `useEffect` writers each saving one piece of state to localStorage. No validation on load. No validation on save. If localStorage had corrupt data from a previous version, the app would load it silently and crash downstream. The state was a house of cards.

**The fix — Zod-validated state architecture:**

| Component | File | Purpose |
|-----------|------|---------|
| **`stateSchema.ts`** | `src/lib/stateSchema.ts` | Zod validators for all state shapes (`basketItemSchema`, `persistedStateSchema`). Single source of truth for state validation |
| **`useAppReducer.ts`** | `src/hooks/useAppReducer.ts` | `usePersistedReducer` hook combining `useReducer` + Zod validation + debounced batch localStorage save. Replaces 35+ individual `useEffect` writers |
| **`stateSchema.test.ts`** | `src/lib/stateSchema.test.ts` | 25 property-based tests with 1,000+ random inputs proving validators never throw on corrupt data |
| **`appReducer`** | `src/hooks/useAppReducer.ts` | Pure reducer with 20 typed actions + `BATCH_UPDATE` for atomic multi-field updates |
| **`loadPersistedState()`** | `src/lib/stateSchema.ts` | Loads + validates each key from localStorage, skips corrupt entries with warning log |

**How it works:**

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

### 🦅 Phase 3: Eagle — Discoverable Platform (In Progress)

**The vision:** promptc OS becomes a discoverable platform — not just a web app, but an ecosystem of skills, tools, and integrations that AI agents and developers can programmatically access.

| Component | Status | Purpose |
|-----------|--------|---------|
| **`skills-manifest.json`** | ✅ Done | 66 skills registered for skills.sh discovery |
| **MCP server** | 📐 Design documented | Exposing search/basket/compose as tools for AI agents via Model Context Protocol |
| **`use-validated-reducer`** | 📐 Extraction documented | npm package extraction of `usePersistedReducer` hook — generic React hook for Zod-validated persisted state |
| **Platform API** | 🔜 Planned | REST/MCP endpoints for programmatic access to the prompt library |

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
Collect prompts from any zone. Pin, favorite, multi-select, sort, search, filter by zone, export to .md/.JSON, pipeline progress visualization, smart recommendations, stats & insights, cross-zone forwarding. **v4.0:** Every basket item is validated through `basketItemSchema` — corrupt items never enter the collection.

### 🔧 Modifier Assembly
User input field + +Add buttons on each modifier. Numbered assembly list with sequential connector format (`→ [anticipates next modifier]`). Copy Assembly exports the complete chain.

### 🛠️ Prompt Enhancer
Paste a prompt, select enhancement tools, generate combined enhanced output with all selected techniques applied.

### 📋 Clipboard History
Every copy action tracked with timestamp and zone. Slide-in panel, Copy All, Clear, individual re-copy. Persists up to 50 items. **v4.0:** Clipboard history entries are Zod-validated on load.

### 🔍 Command Palette (⌘K)
Fuzzy search across all modifiers, templates, tasks, workflows, brands, animals, enhancements, lint rules, word swaps, and chains. Zone quick-switch, keyboard navigation. **v4.0:** All 7 filter chains use `safeIncludes()` — null text fields never crash search.

### 🛡️ Data Integrity (v4.0)
Zod-validated state at every boundary — load, update, persist. `basketItemSchema` and `persistedStateSchema` provide single-source-of-truth validation. Debounced batch save replaces 35+ individual `useEffect` writers. 25 property-based tests with 1,000+ random inputs prove the validators are bulletproof.

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

## Data Integrity Architecture

v4.0 introduces a three-layer validation architecture that prevents corrupt data from ever reaching the UI. Every boundary — load, update, persist — is validated with Zod schemas.

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

### Schemas

| Schema | File | Validates |
|--------|------|-----------|
| `basketItemSchema` | `stateSchema.ts` | `id` (min 1), `text` (min 1), `label`, `zone`, `time`, `chars` (int ≥ 0), `pinned` (default false), `favorited` (default false), `pipelineStage` (optional), `copyCount` (optional) |
| `persistedStateSchema` | `stateSchema.ts` | 19 persisted keys including `zone`, `subtab`, `search`, `basket-sort` (enum), `clipboard-history` (array), `mod-assembly` (array), `composer-fields` (record) |

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
dispatch({ type: "BATCH_UPDATE", payload: { zone: "build", search: "", subtab: { build: "master" } } });
```

**Design for extraction:** `usePersistedReducer` is a generic hook — pass any reducer, any Zod schema, any storage key. The npm package `use-validated-reducer` will extract this pattern for reuse across projects.

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

### Running Tests
```bash
# Property-based tests for state validation
bun test src/lib/stateSchema.test.ts
```

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
│   │   ├── CommandPalette.tsx    # ⌘K search (safeIncludes filter chain)
│   │   └── OnboardingTour.tsx    # First-visit tutorial
│   ├── hooks/
│   │   └── useAppReducer.ts     # v4.0: usePersistedReducer + appReducer (20 actions)
│   └── lib/
│       ├── db.ts                 # Database config
│       ├── utils.ts              # Utilities + safeIncludes() (v4.0)
│       ├── stateSchema.ts        # v4.0: Zod validators (basketItemSchema, persistedStateSchema)
│       └── stateSchema.test.ts   # v4.0: 25 property-based tests (1000+ random inputs)
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

**v4.0 addition:** Before errors even reach this handler, the Data Integrity Layer prevents many of them. `safeIncludes()` prevents `TypeError` on null text. `validateBasketItem()` prevents corrupt items from entering state. `loadPersistedState()` skips corrupt localStorage entries instead of crashing. The error handler is the last line of defense — the validation layer is the first.

---

## MCP Server Roadmap

The Eagle phase includes exposing promptc OS as a Model Context Protocol (MCP) server, making the prompt library, basket, and composer available as tools for AI agents.

### Planned MCP Tools

| Tool | Description | Status |
|------|-------------|--------|
| `search_prompts` | Search across all zones — modifiers, templates, tasks, workflows, brands, animals | 📐 Design documented |
| `basket_add` | Add a prompt to the collection basket | 📐 Design documented |
| `basket_list` | List all items in the collection basket | 📐 Design documented |
| `compose_prompt` | Run the 8-layer Composer to build a structured prompt | 📐 Design documented |
| `validate_prompt` | Run lint rules and quality scoring on a prompt | 🔜 Planned |
| `get_workflow` | Retrieve a complete workflow with all steps | 🔜 Planned |

### Architecture

```
AI Agent (Claude, GPT, etc.)
    ↓ MCP Protocol
promptc OS MCP Server
    ↓
├── Search Engine → safeIncludes() filter chain
├── Basket Manager → basketItemSchema validation
├── Composer → 8-layer prompt builder
└── Validator → Lint rules + Quality Score
```

### npm Package: `use-validated-reducer`

The `usePersistedReducer` hook in `src/hooks/useAppReducer.ts` is designed for extraction into a standalone npm package:

```ts
// use-validated-reducer — coming soon
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

**Extraction documented in:** `src/hooks/useAppReducer.ts` header comments

---

## Version History

| Version | Changes |
|---------|---------|
| **v4.0** | **The Three Promotions** — C-1 Triage: `safeIncludes()` null-safe search, BasketItem validation gate, localStorage load filter, 7 hardened filter chains. Beaver: `stateSchema.ts` Zod validators, `usePersistedReducer` hook (replaces 35+ useEffect writers), `appReducer` with 20 typed actions + BATCH_UPDATE, `loadPersistedState()` with boundary validation, 25 property-based tests (1,000+ random inputs). Eagle: skills-manifest.json (66 skills), MCP server design, `use-validated-reducer` npm extraction documented |
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
7. **VALIDATE AT EVERY BOUNDARY** — v4.0: Zod schemas validate state on load, update, and persist. Corrupt data is rejected, never propagated

---

*Built with ⚡ by [promptc OS](https://promptc-os.vercel.app) — AI Prompt Engineering Operating System*
