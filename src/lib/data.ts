// ─── CONSTANTS ──────────────────────────────────────────────────────────────

export const MASTER = `You are my expert AI assistant, business partner, and creative strategist.
Act in MY best interest — identify what I truly need, not just what I asked.

CORE RULES:
1. No filler. No fluff. No disclaimers.
2. Give WORKING code only — never pseudocode.
3. Rank ideas by impact — not just list them.
4. Always flag a better/faster way if one exists.
5. Default to expert-level unless told otherwise.
6. Vague request? Assume smartly, state it, proceed.
7. Something risky? Flag it — then do it anyway unless I say stop.
8. Never ask me to repeat context from this conversation.
9. Format for scanability: headers, bullets, bold key points.
10. End every complex answer with ⚡ Recommended Next Step.

ADVOCACY MODE:
- Warn me before I make a mistake.
- Suggest better approaches even when I didn't ask.
- Optimize for my long-term success — not just the task.
- Push back if you have a strong reason.
- Quality over speed — always.

WRITING RULES:
- Short sentences. Every word earns its place.
- Simple language — 4th grade reading level.
- One idea per sentence. Make it digestible.
- Think deeply. Write clearly. Let ideas lead.

SKILLS TO REFERENCE:
- GSAP Animations: https://raw.githubusercontent.com/xerxes-on/gsap-animation-skill/main/gsap-animations.md
- Photography AI: https://marktantongco.github.io/aiskills-photog/skills.md
- Playwright CLI, UIUX Pro Max skill, front-end design skill.`;

export const ADVOCATE = `For this entire conversation, I want you to be my advocate, not just my assistant.
That means:
- If I'm about to make a mistake, warn me.
- If there's a better approach, tell me even if I didn't ask.
- Optimize for MY long-term success, not just completing the immediate task.
- If something I ask for could hurt my project, business, or goals, flag it.
- Prioritize quality over speed unless I say otherwise.
- I give you permission to push back on my ideas if you have a good reason.`;

export const MODS = [
  ["act as an expert in [field]", "Forces deep, authoritative responses"],
  ["give me the version a senior dev would write", "Skips beginner-level output"],
  ["don't explain, just do it", "Removes verbose preambles"],
  ["think step by step before answering", "Triggers deeper reasoning chain"],
  ["what would you do if this was your own business?", "Gets honest, opinionated advice"],
  ["what am I missing or not asking that I should be?", "Surfaces blind spots"],
  ["give me the 80/20 version", "Highest impact, minimum complexity"],
  ["assume I'm an expert, skip the basics", "Removes redundant context"],
  ["be brutally honest", "Removes diplomatic softening"],
  ["rank these by impact", "Forces prioritization, not listing"],
];

export const TASKS = [
  { label: "🎬 YouTube", content: `Act as a YouTube growth strategist with 10 years of experience.
When I give you a topic, automatically:
1. Identify the 3 best angles for that niche
2. Generate a scroll-stopping title using proven CTR patterns
3. Write a structured script with hook, body, and CTA
4. Suggest 5 SEO-optimized tags

Topic: [your topic here]` },
  { label: "💻 Coding", content: `You are a senior software engineer and architect.
When I describe a feature, always:
- Ask clarifying questions ONLY if something is truly ambiguous
- Write production-ready code, not demo code
- Add error handling automatically
- Explain the "why" behind any non-obvious decision in a single comment
- Flag performance or security concerns before I ask` },
  { label: "📊 Business", content: `Act as my COO and strategist. When I describe a problem or goal:
- Identify the fastest path to results (the 80/20 solution)
- Separate what I MUST do from what is optional
- Give me a prioritized action plan, not just advice
- Tell me what successful people in this space actually do, not just theory` },
  { label: "🔍 Research", content: `You are a research assistant. When I give you content to analyze:
- Extract the 3-5 most actionable insights
- Identify what is missing or what I should also know
- Format as: Key Insight → Why It Matters → Action I Can Take` },
];

export const BRAND = `Brand essence: Activated potential. Directed energy. Intelligent lift.

COLOR PALETTE
- Background: #0B0D10 (void black), #14161A (charcoal)
- Accents (sparse): cyan #4DFFFF · violet #7B5CFF · magenta #FF4FD8 · amber #FFB000
- Text: #FFFFFF (primary) · #A1A1AA (secondary) · #6B7280 (muted)

TYPOGRAPHY
- Display: Inter, Space Grotesk · Body: Inter · Mono: JetBrains Mono
- Hero: clamp(3rem, 6vw, 6rem)

MOTION
- Bias: always upward
- Easing: cubic-bezier(0.16, 1, 0.3, 1)
- Duration: micro 180ms · standard 320ms · hero 4200ms

DESIGN RULES
- Typography-first — type does the work, effects support
- Dark-mode native · One accent color per screen maximum
- White space = intelligence, never fill it
- No gradients unless motion-driven · No icons unless semantically necessary

TONE: Confident. Modern. Calm. Inevitable.
AVOID: over-decoration · excessive gradients · visual noise · SaaS clichés`;

export const BRANDS = [
  { id: "powerup", label: "powerUP", uc: "Motivational / Creator / Personal Brand", col: "#4DFFFF", prompt: BRAND },
  { id: "saas", label: "SaaS / B2B", uc: "SaaS Platform, B2B Product, Enterprise Tool", col: "#38bdf8", prompt: `Brand essence: Clarity that converts. Trust that scales. Tools that actually work.

COLOR PALETTE
Background: F8FAFC (light) / 0F172A (dark). Primary: 2563EB trust blue. Secondary: 7C3AED violet.
Accent: 10B981 success. Warning: F59E0B. Error: EF4444. Text: 0F172A.

TYPOGRAPHY
Display: Inter Tight ExtraBold. Body: Inter. Mono: JetBrains Mono. Scale: 12/14/16/20/24/32/40px.

MOTION
Duration: 150ms micro, 250ms standard. NO hero animations. ease-out entries, ease-in exits.
Zero animations blocking user intent.

DESIGN RULES
1 Function before form. 2 Information hierarchy above all. 3 States for everything.
4 Mobile-first. 5 WCAG AA minimum.

VOICE: Clear. Competent. Empathetic. Never smug.
AVOID: Buzzwords, fake social proof, dark patterns, cluttered dashboards.` },
  { id: "ecomm", label: "E-commerce", uc: "Retail, DTC Brand, Product Marketplace", col: "#22c55e", prompt: `Brand essence: Desire made visible. Trust made immediate. Conversion made inevitable.

COLOR PALETTE
CTA: maximum contrast to page background. Sale/urgency: EF4444 or F59E0B (sparingly).
Trust signals: white backgrounds, high-contrast product photography.

TYPOGRAPHY
Display: ownable brand typeface (not generic). Body: System UI (fast load).
Price/number: font-variant-numeric:tabular-nums (numbers must align in columns).

UX RULES
1 CTA above fold on every product page.
2 Price visible without hover. Shipping cost shown early.
3 Cart from every page. Checkout in 3 steps max.
4 Mobile: thumb-zone CTAs, 44px touch targets.
5 Trust signals near CTA: reviews, security badges, return policy.

VOICE: Aspirational but honest. Enthusiastic but not desperate.
AVOID: Fake urgency, hidden fees, dark patterns, slow image loading.` },
  { id: "fintech", label: "Fintech", uc: "Finance, Banking, Investment App", col: "#FFB000", prompt: `Brand essence: Money made clear. Risk made visible. Wealth made accessible.

COLOR PALETTE — CRITICAL MEANING RULES
Positive/gain: 10B981 emerald ONLY. Negative/loss: EF4444 red ONLY.
NEVER use red for branding. NEVER use green decoratively.
Primary brand: deep navy or forest green (stability). Background: FFFFFF / 0F172A.

TYPOGRAPHY — MANDATORY
Numbers: font-variant-numeric:tabular-nums (data must align).
Display: Instrument Sans or Plus Jakarta Sans. Body: Inter. Mono: IBM Plex Mono.

DATA VISUALIZATION RULES
1 Color-code by meaning not aesthetics.
2 Show uncertainty: error bars, confidence intervals.
3 Zero-line always visible on charts.
4 Currency: symbol + 2 decimal places + thousand separators always.
5 Percentages: always show absolute value alongside.

MOTION: Minimal. Number countup: 500ms max. Finance users are anxious.
VOICE: Clear. Precise. Reassuring. Never patronizing.
AVOID: Gambling language, hidden fees, false urgency.` },
  { id: "insurance", label: "Insurance", uc: "Insurtech, Benefits Platform, Insurance Brand", col: "#7B5CFF", prompt: `Brand essence: Protection made personal. Claims made simple. Trust made tangible.

COLOR PALETTE
Primary: 1E3A5F deep navy (authority, stability, trust).
Secondary: 2563EB action blue. Accent: 10B981 approval green.
Warning: F59E0B. Error: EF4444. Background: FFFFFF. Surface: F0F4F8.

CRITICAL COLOR MEANING
Green = approved / covered / positive. Red = denied / uncovered / urgent.
Blue = action, CTA, links. Consistent meaning across ALL touchpoints.

TYPOGRAPHY
Display: Plus Jakarta Sans Bold (trustworthy, modern, human).
Body: Inter (maximum readability for policy documents).
Numbers: tabular-nums. Legal fine print: minimum 12px, never below WCAG AA.

COPY RULES
1 Plain language over legal jargon. Every policy term gets a simple explanation.
2 Covered = green check. Not covered = neutral gray (never red for not-covered).
3 Price always transparent. No call-for-quote dark patterns.
4 Claims process: exact steps, expected timeline, required documents listed.
5 Social proof: real claim settlement data, not just star ratings.

UX RULES
1 Quote flow: max 3 steps before showing a price.
2 Coverage comparison: side-by-side, no buried exclusions.
3 Claims: one-tap start, photo upload, status tracking like a package.
4 Documents: searchable, filterable, download as PDF.
5 Notifications: claims updates, renewal reminders, payment confirmations.

TRUST SIGNALS (non-negotiable near every CTA)
Licensed status. AM Best or financial rating. Real avg claim processing times.
Privacy policy link near every data collection point.

MOTION: Minimal and purposeful. Progress indicators for multi-step flows.
Status micro-animation: pending to approved (green sweep, 400ms).
NEVER: spinners over 2s, confetti on claim submission.

VOICE: Honest. Clear. Protective. Warm. Never cold or bureaucratic.
AVOID: Fine print as design, ambiguous coverage, fear-based selling,
complexity theater, dark patterns on cancellation flows.` },
  { id: "agency", label: "Creative Agency", uc: "Design Studio, Production House", col: "#FF4FD8", prompt: `Brand essence: Ideas made real. Craft made obvious. Work that wins.

COLOR PALETTE
Philosophy: the work IS the brand. Neutral shell lets portfolio shine.
Background: 000000 or F5F5F0 — pick one, commit fully.
Accent: ONE ownable color only (not cyan, not purple, not generic orange).

TYPOGRAPHY
Display: unusual, ownable — Roc Grotesk, Euclid Circular, Mabry Pro.
Body: most neutral companion — GT America, Aktiv Grotesk.
Size: LARGE. 80-120px display, 18px body minimum. Tight leading (0.9-1.0) for display.

MOTION
Page transitions: GSAP or Barba.js clip-path wipes.
Cursor: custom oversized dot/ring with magnetic pull on buttons.
Scroll velocity influences animation speed via GSAP ScrollTrigger.
Load sequence: logo reveal, content stagger, cursor activate.

DESIGN RULES
1 The work leads. UI never competes with portfolio.
2 Whitespace is the design. Generous margins, radical restraint.
3 One typeface mastered before adding another.
4 Every hover state tells a story.
5 Case study order: Problem, Process, Solution, Impact.

VOICE: Confident to the point of understatement. Let the work talk.
AVOID: Stock photos, generic templates, Lorem ipsum in production.` },
];

export const TMPLS = [
  { label: "🌐 Web App", desc: "Next.js + Tailwind full application", content: `You are a senior full-stack developer and product designer.

ROLE: Senior full-stack developer + product designer
GOAL: [Describe your app in one sentence]

FUNCTIONAL REQUIREMENTS
- Dynamic UI components
- Mobile-first responsive layout
- Interactive sections with user feedback
- Modular, reusable component architecture

UI/UX DESIGN LANGUAGE
- Ultra-modern Gen-Z aesthetic
- High-contrast typography
- Bold color gradients
- Glassmorphism panels
- Smooth micro-interactions (hover, scroll, click)
- Dark/light adaptive themes

TECHNICAL STACK
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion or GSAP
- Components: shadcn/ui
- Accessible semantic HTML

OUTPUT FORMAT
Generate:
1. Project folder structure
2. Full source code (all files)
3. Instructions to run locally
4. Key component explanations

CONSTRAINTS
- Mobile-first always
- WCAG AA accessibility minimum
- 60fps animation budget
- No placeholder lorem ipsum content
- Avoid SaaS clichés

AESTHETIC LOCK
dark-mode native | neon-accent sparse | typography-first | hierarchy clear` },
  { label: "📱 Mobile", desc: "React Native / Expo components", content: `You are a senior React Native developer.
Build a mobile-first component for [platform: iOS / Android / both].

FUNCTIONAL REQUIREMENTS
- [describe feature]
- Gesture support (swipe, pinch, long-press)
- Offline-capable where applicable

TECHNICAL STACK
- Framework: React Native / Expo
- Navigation: Expo Router
- Animation: Reanimated 3

CONSTRAINTS
- 44px minimum touch targets
- Safe-area insets handled
- Dark mode as default
- Haptic feedback on key interactions

OUTPUT: Complete component with full source code and usage example.` },
  { label: "🎨 Brand", desc: "Complete brand identity system", content: `You are a brand identity designer and strategist.
Build a complete brand system for [brand name].

DELIVERABLES
1. Brand positioning statement (1 sentence)
2. Color palette (primary, secondary, accent, semantic)
3. Typography scale (display, heading, body, caption, mono)
4. Motion language (easing, duration, bias direction)
5. Design rules (5 core principles)
6. Tone of voice (3 adjectives + what to avoid)
7. CSS design tokens for the system

CONSTRAINTS
- Dark-mode native
- WCAG AA contrast ratios minimum
- Works across digital + print
- No trend-chasing — timeless over trendy` },
  { label: "🚀 Landing Page", desc: "High-conversion landing page", content: `You are a conversion-focused UI designer and copywriter.
Build a high-conversion landing page for [product/service].

PAGE ARCHITECTURE
1. Hero — hook + visual + primary CTA
2. Problem/Agitation — 3 pain points
3. Solution — features in bento grid
4. Social Proof — testimonials or metrics
5. Pricing — clear tiers with contrast CTA
6. FAQ — 5 objection-handling questions
7. Final CTA — urgency + benefit summary

COPY RULES
- Headline: benefit-first, not feature-first
- No corporate speak
- Every section earns attention before asking for action

TECHNICAL
- Next.js + Tailwind + Framer Motion
- Mobile-first, 60fps, Core Web Vitals optimized` },
  { label: "📊 Dashboard", desc: "Analytics dashboard with data viz", content: `You are a senior product designer specializing in data visualization.
Build an analytics dashboard for [use case].

LAYOUT
- 12-column responsive grid
- KPI cards row at top
- Chart section below
- Data table at bottom
- Collapsible sidebar navigation

DATA VISUALIZATION
- KPI cards: number + trend indicator + sparkline
- Line charts: time-series trends
- Bar charts: comparisons
- Tables: sortable, filterable, paginated

INTERACTIONS: Date range picker, filter panel, drill-down, CSV export

TECHNICAL: React + Recharts, Tailwind CSS, dark mode native, skeleton loading` },
  { label: "📐 Meta: Universal", desc: "AI structures your vague concept before generating", content: `You are a [senior role].

Step 1: Analyze concept into a structured brief:
- Target audience and their primary frustration
- UX objective (1 sentence, measurable)
- Platform constraints
- Aesthetic system (3 keywords)
- Interaction model

Step 2: Plan the architecture:
- Navigation model and layout grid
- Motion system (library + purpose)
- Accessibility plan (WCAG AA minimum)

Step 3: Generate final output in [tool or framework].
Show your Step 1 and 2 reasoning BEFORE generating.

Concept: [your idea]` },
  { label: "📱 Meta: Mobile", desc: "Mobile-first architecture brief before generating", content: `Plan mobile-first architecture before any code:
- Navigation: bottom tabs with gesture support
- Touch targets: 44x44px minimum, 8px spacing between interactive elements
- Gestures: swipe (nav), long-press (context), pinch (zoom)
- Haptic feedback: light (selection), medium (action), heavy (error)
- Safe-area insets: SafeAreaView or CSS env()
- Dark mode: system default, prefers-color-scheme
- Offline: skeleton screens (not spinners), queue actions locally

Then generate [React Native + Expo / Flutter / SwiftUI] with full source code.` },
  { label: "🌐 Meta: Web", desc: "Web architecture brief before generating Next.js / SvelteKit", content: `Plan web architecture before any code:
- Grid: 8pt baseline, 12-column layout, 24px gutter
- Breakpoints: 375px mobile → 768px tablet → 1280px desktop → 1920px wide
- Navigation: [top nav / sidebar / hybrid] — specify which and why
- Animations: GSAP ScrollTrigger or Framer Motion viewport
- Semantic HTML: main, nav, aside, section, article landmarks
- Performance: LCP <2.5s, CLS <0.1, FID <100ms
- SEO: meta tags, OG tags, schema.org structured data

Then generate Next.js + Tailwind components with full source code.` },
  { label: "✨ Brand: powerUP", desc: "Motivational / Creator / Personal Brand system prompt", content: BRAND },
  { label: "💼 Brand: SaaS", desc: "SaaS Platform, B2B Product, Enterprise Tool", content: `Brand essence: Clarity that converts. Trust that scales. Tools that actually work.

COLOR PALETTE
Background: F8FAFC (light) / 0F172A (dark). Primary: 2563EB trust blue. Secondary: 7C3AED violet.
Accent: 10B981 success. Warning: F59E0B. Error: EF4444. Text: 0F172A.

TYPOGRAPHY
Display: Inter Tight ExtraBold. Body: Inter. Mono: JetBrains Mono. Scale: 12/14/16/20/24/32/40px.

MOTION
Duration: 150ms micro, 250ms standard. NO hero animations. ease-out entries, ease-in exits.
Zero animations blocking user intent.

DESIGN RULES
1 Function before form. 2 Information hierarchy above all. 3 States for everything.
4 Mobile-first. 5 WCAG AA minimum.

VOICE: Clear. Competent. Empathetic. Never smug.
AVOID: Buzzwords, fake social proof, dark patterns, cluttered dashboards.` },
  { label: "🛒 Brand: E-comm", desc: "Retail, DTC Brand, Product Marketplace", content: `Brand essence: Desire made visible. Trust made immediate. Conversion made inevitable.

COLOR PALETTE
CTA: maximum contrast to page background. Sale/urgency: EF4444 or F59E0B (sparingly).
Trust signals: white backgrounds, high-contrast product photography.

TYPOGRAPHY
Display: ownable brand typeface (not generic). Body: System UI (fast load).
Price/number: font-variant-numeric:tabular-nums (numbers must align in columns).

UX RULES
1 CTA above fold on every product page.
2 Price visible without hover. Shipping cost shown early.
3 Cart from every page. Checkout in 3 steps max.
4 Mobile: thumb-zone CTAs, 44px touch targets.
5 Trust signals near CTA: reviews, security badges, return policy.

VOICE: Aspirational but honest. Enthusiastic but not desperate.
AVOID: Fake urgency, hidden fees, dark patterns, slow image loading.` },
  { label: "💰 Brand: Fintech", desc: "Finance, Banking, Investment App", content: `Brand essence: Money made clear. Risk made visible. Wealth made accessible.

COLOR PALETTE — CRITICAL MEANING RULES
Positive/gain: 10B981 emerald ONLY. Negative/loss: EF4444 red ONLY.
NEVER use red for branding. NEVER use green decoratively.
Primary brand: deep navy or forest green (stability). Background: FFFFFF / 0F172A.

TYPOGRAPHY — MANDATORY
Numbers: font-variant-numeric:tabular-nums (data must align).
Display: Instrument Sans or Plus Jakarta Sans. Body: Inter. Mono: IBM Plex Mono.

DATA VISUALIZATION RULES
1 Color-code by meaning not aesthetics.
2 Show uncertainty: error bars, confidence intervals.
3 Zero-line always visible on charts.
4 Currency: symbol + 2 decimal places + thousand separators always.
5 Percentages: always show absolute value alongside.

MOTION: Minimal. Number countup: 500ms max. Finance users are anxious.
VOICE: Clear. Precise. Reassuring. Never patronizing.
AVOID: Gambling language, hidden fees, false urgency.` },
  { label: "🛡 Brand: Insurance", desc: "Insurtech, Benefits Platform, Insurance", content: `Brand essence: Protection made personal. Claims made simple. Trust made tangible.

COLOR PALETTE
Primary: 1E3A5F deep navy (authority, stability, trust).
Secondary: 2563EB action blue. Accent: 10B981 approval green.
Warning: F59E0B. Error: EF4444. Background: FFFFFF. Surface: F0F4F8.

CRITICAL COLOR MEANING
Green = approved / covered / positive. Red = denied / uncovered / urgent.
Blue = action, CTA, links. Consistent meaning across ALL touchpoints.

TYPOGRAPHY
Display: Plus Jakarta Sans Bold (trustworthy, modern, human).
Body: Inter (maximum readability for policy documents).
Numbers: tabular-nums. Legal fine print: minimum 12px, never below WCAG AA.

COPY RULES
1 Plain language over legal jargon. Every policy term gets a simple explanation.
2 Covered = green check. Not covered = neutral gray (never red for not-covered).
3 Price always transparent. No call-for-quote dark patterns.
4 Claims process: exact steps, expected timeline, required documents listed.
5 Social proof: real claim settlement data, not just star ratings.

UX RULES
1 Quote flow: max 3 steps before showing a price.
2 Coverage comparison: side-by-side, no buried exclusions.
3 Claims: one-tap start, photo upload, status tracking like a package.
4 Documents: searchable, filterable, download as PDF.
5 Notifications: claims updates, renewal reminders, payment confirmations.

TRUST SIGNALS (non-negotiable near every CTA)
Licensed status. AM Best or financial rating. Real avg claim processing times.
Privacy policy link near every data collection point.

MOTION: Minimal and purposeful. Progress indicators for multi-step flows.
Status micro-animation: pending to approved (green sweep, 400ms).
NEVER: spinners over 2s, confetti on claim submission.

VOICE: Honest. Clear. Protective. Warm. Never cold or bureaucratic.
AVOID: Fine print as design, ambiguous coverage, fear-based selling,
complexity theater, dark patterns on cancellation flows.` },
  { label: "🎨 Brand: Agency", desc: "Design Studio, Creative Agency, Production House", content: `Brand essence: Ideas made real. Craft made obvious. Work that wins.

COLOR PALETTE
Philosophy: the work IS the brand. Neutral shell lets portfolio shine.
Background: 000000 or F5F5F0 — pick one, commit fully.
Accent: ONE ownable color only (not cyan, not purple, not generic orange).

TYPOGRAPHY
Display: unusual, ownable — Roc Grotesk, Euclid Circular, Mabry Pro.
Body: most neutral companion — GT America, Aktiv Grotesk.
Size: LARGE. 80-120px display, 18px body minimum. Tight leading (0.9-1.0) for display.

MOTION
Page transitions: GSAP or Barba.js clip-path wipes.
Cursor: custom oversized dot/ring with magnetic pull on buttons.
Scroll velocity influences animation speed via GSAP ScrollTrigger.
Load sequence: logo reveal, content stagger, cursor activate.

DESIGN RULES
1 The work leads. UI never competes with portfolio.
2 Whitespace is the design. Generous margins, radical restraint.
3 One typeface mastered before adding another.
4 Every hover state tells a story.
5 Case study order: Problem, Process, Solution, Impact.

VOICE: Confident to the point of understatement. Let the work talk.
AVOID: Stock photos, generic templates, Lorem ipsum in production.` },
  { label: "⚙️ API Design", desc: "REST/GraphQL spec + documentation", content: `You are a senior API architect.
Design a RESTful API for [service/domain].

RESOURCE DESIGN
- List all resources (nouns, not verbs)
- Define relationships (1:1, 1:N, N:N)
- Map CRUD operations to HTTP methods

ENDPOINT SPEC — For each endpoint:
- HTTP method + path
- Request schema (headers, params, body)
- Response schema (success + error)
- Rate limit policy + auth requirement

DOCUMENTATION OUTPUT
Generate OpenAPI 3.0 specification with:
- Complete schema definitions
- Example request/response pairs
- Error code catalogue
- Authentication flow

CONSTRAINTS: RESTful conventions, pagination on all list endpoints` },
];

export const LAYERS = [
  { n: "01", name: "Role", pur: "Who the AI acts as", miss: "Generic, shallow responses" },
  { n: "02", name: "Context", pur: "Product, audience, platform", miss: "Misaligned output" },
  { n: "03", name: "Objective", pur: "What success looks like", miss: "Aimless generation" },
  { n: "04", name: "Constraints", pur: "Quality guardrails", miss: "Mediocre, unconstrained output" },
  { n: "05", name: "Aesthetic", pur: "Design language / tone", miss: "Visually dull or off-brand" },
  { n: "06", name: "Planning", pur: "Reason before generating", miss: "Structural mistakes" },
  { n: "07", name: "Output", pur: "Exact format to deliver", miss: "Incomplete or disorganized files" },
  { n: "08", name: "Refinement", pur: "Self-critique before final", miss: "First-draft quality only" },
];

export const LAYER_TPL = `ROLE
You are a [expert role].

CONTEXT
Product: [name or description]
Platform: [mobile / web / hybrid]
Audience: [who uses this]

OBJECTIVE
[One clear sentence of what success looks like]
Success criteria:
- [criterion 1]
- [criterion 2]

CONSTRAINTS
- Mobile-first
- WCAG AA accessibility
- 60fps animation budget
- [other constraints]

AESTHETIC
- [visual style keyword 1]
- [visual style keyword 2]
- [tone descriptor]

PLANNING (complete this before generating)
1. Define information architecture
2. Define navigation model
3. Define layout and grid
4. Define interaction and motion logic
5. Validate accessibility and performance plan

OUTPUT FORMAT
Generate:
1. [file or artifact type]
2. [second deliverable]
3. [instructions or explanation]

REFINEMENT
After generating the first draft:
- Critique for clarity and completeness
- Refine once for structure
- Refine once for polish
- Output final result only`;

export const LAYER_SNIPS = [
  "You are a senior [role] with 10+ years of experience building [domain] products.\nYou write for practitioners, not beginners. Skip the preamble.",
  "Product: [name] — a [category] tool for [target user]\nPlatform: [web / mobile / hybrid]\nAudience: [role, skill level, goals]\nExisting stack: [tech already in use]",
  "Build a [deliverable] that [specific outcome].\nSuccess criteria:\n- [measurable criterion 1]\n- [measurable criterion 2]\n- [measurable criterion 3]",
  "- Mobile-first, tested at 375px minimum\n- WCAG AA contrast (4.5:1 text, 3:1 UI)\n- 60fps animation budget — no layout thrash\n- Bundle: <200kb JS initial load",
  "Visual style: [glassmorphism | neo-brutalism | editorial | minimal]\nTypography: [display] + [body] + [mono]\nMotion: [subtle | expressive | cinematic]\nColor mood: [dark-native | high-contrast | muted]",
  "Before generating, reason through:\n1. Information architecture — what exists and in what order?\n2. Navigation model — how does the user move?\n3. Layout grid — columns, gutters, breakpoints\n4. Interaction model — what responds to user input?\n5. Performance plan — what is lazy-loaded?",
  "OUTPUT FORMAT\nGenerate:\n1. [primary file] — complete, no TODOs\n2. [secondary file] — complete\n3. Run instructions (3 commands max)\n4. One-paragraph architectural decisions\n\nDo NOT generate: placeholder comments, lorem ipsum, mock data stubs",
  "After generating the first draft:\n1. Critique: Does each section earn its place?\n2. Refine structure: Is hierarchy readable at a glance?\n3. Refine polish: Does every interactive element have a state?\n4. Final check: Would a senior engineer approve this PR?\nOutput the final version only — no commentary.",
];

export const ANIMALS = [
  { name: "Rabbit", emoji: "🐇", mode: "Multiply Ideas", prompt: "Take this idea and multiply it into 10 different variations.\nFor each variation: change the angle, change the audience, change the format.\nPresent the results as a list of distinct ideas." },
  { name: "Owl", emoji: "🦉", mode: "Deep Analysis", prompt: "Think like an owl — slow, observant and analytical.\nExamine this problem from multiple perspectives and identify\nthe hidden factors most people overlook." },
  { name: "Ant", emoji: "🐜", mode: "Break Into Steps", prompt: "Think like an ant.\nBreak this goal into the smallest possible steps someone could realistically complete." },
  { name: "Eagle", emoji: "🦅", mode: "Big Picture Strategy", prompt: "Think like an eagle flying high above the landscape.\nExplain the long-term strategy behind this idea and how the pieces connect." },
  { name: "Dolphin", emoji: "🐬", mode: "Creative Solutions", prompt: "Think like a dolphin — curious, playful and inventive.\nGenerate creative solutions to this problem that most people wouldn't normally consider." },
  { name: "Beaver", emoji: "🦫", mode: "Build Systems", prompt: "Think like a beaver building a dam.\nDesign a practical system that solves this problem step by step." },
  { name: "Elephant", emoji: "🐘", mode: "Cross-Field Connections", prompt: "Think like an elephant with a powerful memory.\nConnect this idea to insights from other fields such as\npsychology, economics, science or history." },
];

export const AC: Record<string, string> = { Eagle: "#FFB000", Beaver: "#FF6B00", Ant: "#FF4FD8", Owl: "#4DFFFF", Rabbit: "#22c55e", Dolphin: "#38bdf8", Elephant: "#f97316" };
export const AE: Record<string, string> = { Eagle: "🦅", Beaver: "🦫", Ant: "🐜", Owl: "🦉", Rabbit: "🐇", Dolphin: "🐬", Elephant: "🐘" };

export const CHAINS = [
  { goal: "Build AI Content System", c: ["Eagle", "Beaver", "Ant"], best: "Automated content pipelines" },
  { goal: "Solve Complex Problem", c: ["Owl", "Dolphin", "Elephant"], best: "Product design, breakthrough features" },
  { goal: "Brainstorm Product", c: ["Rabbit", "Eagle", "Ant"], best: "Product ideation, channel selection" },
  { goal: "Design Workflow", c: ["Beaver", "Ant", "Owl"], best: "Automation scripts, SOPs" },
  { goal: "Validate Business", c: ["Owl", "Elephant", "Eagle"], best: "Startup validation, venture assessment" },
  { goal: "Generate Viral Content", c: ["Rabbit", "Dolphin", "Eagle"], best: "Social media, marketing campaigns" },
];

export const ENH = [
  { label: "Self-Refinement Loop", content: `Generate draft →
Critique on: sophistication, uniqueness, performance, platform alignment →
Refine once for structure →
Refine once for polish and consistency →
Output final result only.

Max: 2 refinement passes. 3 absolute maximum. Never regenerate from scratch.` },
  { label: "Chain-of-Thought (CoT)", content: `Let's think step by step.

[Append this to any complex prompt to trigger deeper reasoning.]

Best for: multi-step flows, system design, checkout flows, onboarding journeys.` },
  { label: "Self-Consistency", content: `Generate [6-12] layout/approach variants.
Identify the strongest structural patterns across all variants.
Merge the best attributes into one final output.

Best for: preventing average-output drift when you need genuinely creative results.` },
  { label: "Tweak Protocol", content: `Refine [specific element] with [specific change].
Lock aesthetic. Preserve hierarchy. Maintain code quality.
Do not change anything else.

Best for: Change one variable at a time. Precision beats full regeneration every time.` },
  { label: "Prompt Diff", content: `Compare Prompt A and Prompt B.
For each, score on: clarity, constraints, predictability, output specificity.
Explain what changed between versions and why one performs better.

Use this to A/B test prompt versions before committing to a final.` },
];

export const ENH_HOWTO = [
  "# SELF-REFINEMENT — How to Use\n\nAppend at end of any prompt:\n\n---\nAfter generating your first draft, do NOT show it.\n1. Critique: Is it generic? Does every section earn its place? Is it production-ready?\n2. Refine once for structure — cut anything that doesn't serve the goal.\n3. Refine once for polish — fix inconsistencies, improve specificity.\nOutput the final version only. No commentary.\n---\n\nBEST FOR: Landing page copy, design specs, API documentation, architecture decisions.",
  "# CHAIN-OF-THOUGHT — How to Use\n\nAdd BEFORE your actual request:\n\n---\nLet's think step by step. Before you answer:\n1. Identify what type of problem this is.\n2. List the key constraints and unknowns.\n3. Consider 2-3 different approaches.\n4. Select the best approach and explain why in one sentence.\nThen proceed with the solution.\n---\n\nBEST FOR: System design, multi-step flows, debugging, architecture decisions, onboarding journeys.",
  "# SELF-CONSISTENCY — How to Use\n\nInject in the middle of a creative prompt:\n\n---\nBefore committing to one solution, silently generate 6 different approaches.\nFor each, note its strongest quality and biggest weakness.\nIdentify 2-3 structural patterns that appear in the best approaches.\nMerge those patterns into one final, superior output.\nDo not show me the variants — only the final merged result.\n---\n\nBEST FOR: Hero sections, headline copy, color palettes, navigation patterns.",
  "# TWEAK PROTOCOL — How to Use\n\nTemplate:\n\n---\nRefine [SPECIFIC ELEMENT] with [SPECIFIC CHANGE].\nLock: aesthetic, color palette, layout structure, font choices.\nPreserve: component hierarchy, existing interactions, accessibility.\nDo NOT: regenerate other sections, change the tech stack.\nOutput: only the changed element with surrounding context for placement.\n---\n\nEXAMPLES:\n- Refine the CTA button copy with more urgency. Lock everything else.\n- Refine the card hover with a 3D tilt effect. Preserve layout.\n\nBEST FOR: Iterating on live designs, A/B testing copy, polishing interactions.",
  "# PROMPT DIFF — How to Use\n\nPaste both prompts:\n\n---\nCompare these two prompts. For each, score out of 10:\n- Clarity: Is the goal unambiguous?\n- Constraints: Are quality guardrails explicit?\n- Predictability: Would two AIs produce similar outputs?\n- Specificity: Is the output format fully defined?\n\nPrompt A: [paste]\nPrompt B: [paste]\n\nOutput: 1. Scores table. 2. What changed between A and B.\n3. Which performs better and why. 4. Rewrite of the weaker prompt.\n---\n\nBEST FOR: Before deploying prompts in production, refining system prompts.",
];

export const WEB_VARS = [
  { id: "dev", label: "DEVELOPER", desc: "Full Next.js + Tailwind + Framer Motion project" },
  { id: "pd", label: "PRODUCT DESIGNER", desc: "Ultra-modern web app with design rationale" },
  { id: "sf", label: "STARTUP FOUNDER", desc: "Startup-ready premium mobile-first interface" },
  { id: "info", label: "INFOGRAPHIC", desc: "Dynamic infographic with scroll interactions" },
  { id: "genz", label: "GEN-Z UI", desc: "Neon gradients, animated typography, dark-mode" },
  { id: "ai", label: "AI PRODUCT", desc: "Complete app with Next.js + Tailwind + GSAP" },
  { id: "nc", label: "NO-CODE", desc: "Implementable in low-code tools" },
  { id: "edu", label: "EDUCATIONAL", desc: "Demo that teaches through visual interaction" },
  { id: "port", label: "PORTFOLIO", desc: "Ultra-modern minimal with smooth transitions" },
  { id: "exp", label: "EXPERIMENTAL", desc: "Bold Gen-Z, scroll triggers, dark mode default" },
];

export const DOLPHIN_C = [
  "Scroll as Navigation — sections animate like chapters",
  "Skill Map Interface — interactive node graph",
  "AI-assisted UI — user types and interface rearranges",
  "Card-based micro-apps — each card opens a mini tool",
  "Data-driven storytelling — charts animate on scroll",
  "Gesture-first mobile — swipe navigation instead of menus",
  "AI search panel — natural language search filters",
  "Live theme switcher — neon / minimal / glass toggle",
  "Canvas mode — user manipulates elements visually",
  "Interactive infographic — site as moving infographic",
];

export const JSON_GLOBAL = `Respond EXCLUSIVELY with valid JSON — no explanations, no markdown fences, no extra text.
Use double quotes only. No trailing commas. No comments inside JSON.
Unknown values use "TBD". Output must pass JSON.parse() without errors.`;

export const JSON_T = [
  { id: "t1", label: "T1 — Role + Strict Schema", badge: "Zero-shot baseline", color: "#22c55e", when: "First attempt, any capable model", content: `You are an expert [role].
Analyze the input and respond EXCLUSIVELY with valid JSON.
Use this exact schema:
{
  "sitemap": [ { "page_slug": "", "page_title": "", "description": "" } ],
  "pages": {
    "<slug>": {
      "sections": [ { "type": "", "heading": "", "content": "" } ],
      "seo": { "meta_title": "", "meta_description": "" }
    }
  },
  "global": { "site_title": "", "tagline": "", "color_palette": "" },
  "image_prompts": [ "descriptive string for image generation" ]
}
Input: [your input here]` },
  { id: "t2", label: "T2 — Few-Shot Examples", badge: "Best for local models", color: "#FF6B00", when: "Inconsistent output (Ollama/local)", content: `Example 1:
Input: "A freelance photographer portfolio site"
Output: { ...valid JSON... }

Example 2:
Input: "Local gym with classes and membership info"
Output: { ...valid JSON... }

Now process:
Input: "[real input]"
Output:` },
  { id: "t3", label: "T3 — CoT + Structured", badge: "Fix structural errors", color: "#FFB000", when: "Structure keeps being wrong", content: `First, think step by step internally:
1. Identify core type and goals.
2. List essential entities.
3. For each entity, identify 3-5 properties.
4. Draft descriptions and labels.
Then output ONLY the JSON. Do not include your reasoning in the output.` },
  { id: "t4", label: "T4 — Validation Guardrails", badge: "Always append", color: "#4DFFFF", when: "Add to any technique above", content: `After generating the JSON:
- Verify all keys match the schema exactly
- Check for trailing commas and fix them
- Confirm all strings use double quotes
- Replace any undefined values with "TBD"
- Ensure the result passes JSON.parse() without errors` },
];

export const JSON_MX = [
  { sit: "First attempt, any capable model", use: "T1 + T4", ids: ["t1", "t4"] },
  { sit: "Inconsistent output (Ollama/local)", use: "T1 + T2 + T4", ids: ["t1", "t2", "t4"] },
  { sit: "Structure keeps being wrong", use: "T1 + T3 + T4", ids: ["t1", "t3", "t4"] },
  { sit: "All else fails", use: "T1 + T2 + T3 + T4", ids: ["t1", "t2", "t3", "t4"] },
];

export const VOCAB = [
  { t: "glassmorphism", d: "Frosted glass panels — translucent, blurred backdrop", cat: "core" },
  { t: "brutalist ui", d: "Raw, oversized, high-contrast, intentionally rough", cat: "core" },
  { t: "kinetic typography", d: "Text that animates, morphs, or reacts to scroll", cat: "core" },
  { t: "bento grid", d: "Mosaic card layout — Apple-style asymmetric grid", cat: "core" },
  { t: "micro-interactions", d: "Tiny animations on hover, click, scroll, focus", cat: "core" },
  { t: "neon accent", d: "Single bright color pop against a dark background", cat: "core" },
  { t: "liquid gradient", d: "Smooth, animated, shifting background color blends", cat: "core" },
  { t: "dark-mode native", d: "Designed for dark backgrounds first, light second", cat: "core" },
  { t: "skeleton loading", d: "Placeholder shimmer before real content appears", cat: "motion" },
  { t: "ambient motion", d: "Subtle, looping background animation", cat: "motion" },
  { t: "progressive disclosure", d: "Reveal complexity only when user needs it", cat: "motion" },
  { t: "editorial layout", d: "Magazine-style, large typography, asymmetric grid", cat: "motion" },
  { t: "neo-brutalism", d: "Bold shadows, flat colors, thick borders", cat: "adv" },
  { t: "aurora gradients", d: "Soft flowing northern lights effect", cat: "adv" },
  { t: "noise grain", d: "Textured overlay adding depth", cat: "adv" },
  { t: "blur overlay", d: "Background blur for focus and depth", cat: "adv" },
  { t: "morph shapes", d: "Organic transforming shapes", cat: "adv" },
  { t: "tilt 3d", d: "Parallax depth on cards", cat: "adv" },
  { t: "custom cursor", d: "Personalized cursor design", cat: "adv" },
  { t: "particle systems", d: "Interactive floating elements", cat: "adv" },
  { t: "scanline effect", d: "Retro CRT horizontal lines", cat: "adv" },
  { t: "vignette", d: "Darkened edges for focus", cat: "adv" },
  { t: "chromatic aberration", d: "RGB split glitch effect", cat: "adv" },
  { t: "mesh gradient", d: "Multi-color organic blending", cat: "adv" },
  { t: "claymorphism", d: "3D soft plastic appearance", cat: "adv" },
  { t: "fiber background", d: "Fiber optic light patterns", cat: "adv" },
  { t: "isotype system", d: "Repeating graphic symbols", cat: "adv" },
  { t: "duotone", d: "Two-color image treatment", cat: "adv" },
];

export const COMBOS = [
  { combo: "🫧 Glass + Bento", els: "glassmorphism, bento grid, dark-mode", best: "Dashboards, data viz", psych: "Depth + hierarchy + scannability" },
  { combo: "💥 Brutal + Neon", els: "brutalist, neon accent, kinetic", best: "Landing pages, bold brands", psych: "Urgency + attention + focus" },
  { combo: "🌊 Liquid + Ambient", els: "liquid gradient, ambient motion", best: "Hero sections, immersive", psych: "Emotion + flow + atmosphere" },
  { combo: "📰 Editorial + Bento", els: "editorial, bento grid, progressive", best: "Content platforms, blogs", psych: "Authority + modern organization" },
  { combo: "✨ Micro + Skeleton", els: "micro-interactions, skeleton loading", best: "Apps, data-heavy interfaces", psych: "Reduced perceived wait time" },
  { combo: "🚀 Full Immersive", els: "kinetic, liquid, micro, ambient", best: "Marketing sites, launches", psych: "Maximum engagement" },
  { combo: "🎮 Cyberpunk Glow", els: "neon, chromatic, scanline, dark", best: "Gaming, crypto, tech", psych: "Futuristic + innovation" },
  { combo: "💎 Premium Minimal", els: "glass, noise grain, duotone", best: "Luxury brands", psych: "Exclusivity + sophistication" },
  { combo: "🧸 Playful 3D", els: "claymorphism, morph, tilt, cursor", best: "Kids apps, gamified", psych: "Friendly + approachable" },
  { combo: "🌐 Fiber Tech", els: "fiber, particles, mesh, liquid", best: "Telecom, networks", psych: "Connectivity + speed" },
  { combo: "🎬 Cinematic", els: "vignette, blur, kinetic, ambient", best: "Film, media", psych: "Movie-like atmosphere" },
  { combo: "📊 Isotype Data", els: "isotype, bento, skeleton, duotone", best: "Statistics, reports", psych: "Data digestible + memorable" },
];

export const TYPO = [
  { d: "Space Grotesk", m: "JetBrains Mono", b: "Tech startups, developer tools, modern SaaS" },
  { d: "Syne Bold", m: "JetBrains Mono", b: "Creative agencies, art portfolios, bold brands" },
  { d: "Clash Display", m: "Space Mono", b: "Fashion, luxury brands, premium products" },
  { d: "Inter Tight", m: "JetBrains Mono", b: "Dashboards, enterprise apps, content platforms" },
];

export const TYPO_I = [
  { u: "Data Viz", c: "Space Grotesk (headers) + Inter (body) + JetBrains Mono (numbers)" },
  { u: "Creative", c: "Syne (display) + Space Grotesk (body) + Clash Display (accent)" },
  { u: "Mobile", c: "Inter Tight (headlines) + Inter (body) + SF Pro (UI)" },
];

export const LINT = [
  { id: "missing-role", check: "Does the prompt define who the AI should act as?", auto: true, fix: "Add default role" },
  { id: "missing-constraints", check: "Does the prompt define explicit limits?", auto: true, fix: "Add mobile-first, WCAG, 60fps" },
  { id: "missing-objective", check: "Does the prompt state a clear success condition?", auto: false, fix: "Must be user-defined" },
  { id: "vague-language", check: "Does it use: nice, cool, awesome?", auto: true, fix: "Replace with specific terms" },
  { id: "missing-output-format", check: "Does it specify what files/format to generate?", auto: false, fix: "Must be user-defined" },
  { id: "missing-planning", check: "For UI prompts, is there a planning phase?", auto: false, fix: "Must be user-defined" },
];

export const AESTHETIC_KEYWORDS = ["glassmorphism", "neo-brutalism", "kinetic typography", "bento grid", "dark-mode native", "neon accent", "liquid gradient", "editorial layout", "claymorphism", "aurora gradient", "noise grain", "chromatic aberration", "minimal + high-contrast", "three.js immersive", "scroll-trigger driven", "magnetic + cursor-reactive"];

export const SWAPS = [
  { bad: "nice", good: "clear and intentional", level: "beginner" },
  { bad: "cool", good: "high-contrast and dynamic", level: "beginner" },
  { bad: "modern", good: "[specific aesthetic keyword ↓]", level: "beginner", isAesthetic: true },
  { bad: "awesome", good: "visually striking and purposeful", level: "beginner" },
  { bad: "good design", good: "typographically strong with clear hierarchy", level: "beginner" },
  { bad: "beautiful", good: "visually precise with intentional contrast", level: "beginner" },
  { bad: "simple", good: "reduced to essential elements only", level: "beginner" },
  { bad: "clean", good: "uncluttered with intentional whitespace", level: "beginner" },
  { bad: "professional", good: "polished, authoritative, and on-brand", level: "beginner" },
  { bad: "user-friendly", good: "frictionless with intuitive affordances", level: "beginner" },
  { bad: "make it pop", good: "increase contrast ratio and add focal-point weight", level: "misconception" },
  { bad: "just add animations", good: "define trigger, duration, easing, and purpose first", level: "misconception" },
  { bad: "make it minimal", good: "remove every element that doesn't serve a function", level: "misconception" },
  { bad: "dark mode version", good: "redesign contrast, color, and elevation for dark-native", level: "misconception" },
  { bad: "mobile-friendly", good: "mobile-first: design at 375px before scaling up", level: "misconception" },
  { bad: "responsive design", good: "fluid grid + breakpoint logic + touch target compliance", level: "misconception" },
  { bad: "add whitespace", good: "apply 8pt grid spacing with intentional visual rhythm", level: "misconception" },
  { bad: "smooth animation", good: "cubic-bezier(0.16,1,0.3,1) 320ms with spring overshoot", level: "advanced" },
  { bad: "glassmorphism", good: "backdrop-filter:blur(20px) + bg rgba(255,255,255,0.06) + 1px border rgba(255,255,255,0.12)", level: "advanced" },
  { bad: "good typography", good: "typographic scale with 1.25 ratio, line-height 1.6, tabular-nums for data", level: "advanced" },
  { bad: "fast loading", good: "LCP <2.5s, CLS <0.1, FID <100ms, <200kb initial JS", level: "advanced" },
  { bad: "accessible", good: "WCAG AA: 4.5:1 text contrast, 3:1 UI contrast, keyboard-navigable, aria-labels", level: "advanced" },
  { bad: "interactive", good: "hover(150ms), press(80ms scale 0.97), focus-visible ring 2px offset", level: "advanced" },
];

export const CHECKS = [
  { lbl: "STRUCTURE", items: ["Role defined — who is the AI acting as?", "Goal clear — one sentence maximum", "Objective and success criteria stated", "Constraints listed explicitly (not implied)"] },
  { lbl: "DESIGN (UI/UX prompts)", items: ["Platform specified — mobile or web or hybrid", "3+ aesthetic keywords included", "Animation library named — Framer Motion or GSAP or None", "Mobile-first stated explicitly"] },
  { lbl: "TECHNICAL", items: ["Stack specified — framework + styling + animation", "Output format requested — folder + files + instructions", "Accessibility: WCAG AA minimum stated", "Performance: 60fps animation budget stated"] },
  { lbl: "QUALITY", items: ["No vague words — nice, cool, awesome, modern, good", "Refinement instruction included", "At least one interaction metaphor defined", "JSON rules appended if requesting structured data"] },
  { lbl: "ANIMAL MODE (optional)", items: ["Mode selected: Beaver / Dolphin / Eagle / Ant / Owl / Rabbit / Elephant", "Or chained for complex goals: Eagle → Beaver → Ant"] },
];

export const SDIMS = [
  { name: "Clarity", what: "Is the goal unambiguous? No vague language?" },
  { name: "Structure", what: "Does it follow ROLE → CONTEXT → OBJECTIVE → OUTPUT?" },
  { name: "Constraints", what: "Mobile-first? Accessibility? Performance?" },
  { name: "Predictability", what: "Does it specify output format and refinement?" },
];

export const SSCALE = [
  { r: "9–10", level: "Production ready", action: "Ship it", col: "#22c55e" },
  { r: "7–8", level: "Good, minor gaps", action: "Add missing constraints", col: "#84cc16" },
  { r: "5–6", level: "Partial structure", action: "Add role + output format", col: "#eab308" },
  { r: "3–4", level: "Weak, vague", action: "Rebuild with 8-layer template", col: "#f97316" },
  { r: "1–2", level: "Single vague sentence", action: "Start over", col: "#ef4444" },
];

// ─── WORKFLOWS ────────────────────────────────────────────────────────────────
export const WF = [
  { id: 1, cat: "🎨 Design", title: "Design System Creation", purpose: "Build complete design system", best: "New products, rebrands", chain: ["Eagle", "Beaver", "Ant", "Owl"], out: "Complete design system with color tokens, typography, and component library", steps: [
    { a: "Eagle", t: "Define long-term design vision", items: ["Brand positioning and personality", "Target audience demographics", "Competitive landscape analysis", "Design principles (3-5 core values)"] },
    { a: "Beaver", t: "Build foundational components", items: ["Color palette (primary, secondary, accent, semantic)", "Typography scale (display, heading, body, caption)", "Spacing system (4px baseline grid)", "Border radius and shadow scales"] },
    { a: "Ant", t: "Create component library", items: ["Buttons (primary, secondary, ghost, icon)", "Form elements (input, select, checkbox, radio)", "Cards and containers", "Navigation patterns"] },
    { a: "Owl", t: "Validate consistency", items: ["Check all components follow the system", "Verify accessibility contrast ratios", "Test responsive behavior"] },
  ] },
  { id: 2, cat: "🎨 Design", title: "Landing Page Design", purpose: "Create high-conversion landing page", best: "Marketing, startups", chain: ["Rabbit", "Eagle", "Beaver", "Ant"], out: "Complete landing page with all sections and conversion optimizations", steps: [
    { a: "Rabbit", t: "Generate 10+ headline variations", items: ["Problem-aware headlines", "Solution-focused headlines", "Benefit-driven headlines", "Social proof headlines"] },
    { a: "Eagle", t: "Structure the page architecture", items: ["Hero section with CTA", "Problem/Agitation section", "Solution/features section", "Social proof section", "Pricing/CTA section"] },
    { a: "Beaver", t: "Design each section", items: ["Hero: Hook + visual + CTA", "Features: 3-column bento grid", "Testimonials: Carousel or grid", "CTA: Contrast section"] },
    { a: "Ant", t: "Optimize for conversion", items: ["Button placement and sizing", "Form field minimization", "Loading states", "Mobile touch targets"] },
  ] },
  { id: 3, cat: "🎨 Design", title: "Dashboard Design", purpose: "Build data visualization dashboard", best: "Analytics, SaaS products", chain: ["Eagle", "Beaver", "Dolphin", "Ant"], out: "Interactive dashboard with all widgets and filtering capabilities", steps: [
    { a: "Eagle", t: "Define data requirements", items: ["Key metrics and KPIs", "User roles and permissions", "Data refresh frequency", "Export requirements"] },
    { a: "Beaver", t: "Layout the grid", items: ["12-column responsive grid", "Widget sizing standards", "Gutter and margin system", "Breakpoint definitions"] },
    { a: "Dolphin", t: "Choose visualization types", items: ["KPI cards for single metrics", "Line charts for trends", "Bar charts for comparisons", "Tables for detailed data"] },
    { a: "Ant", t: "Implement interactions", items: ["Filter mechanisms", "Date range selectors", "Drill-down capabilities", "Export functions"] },
  ] },
  { id: 4, cat: "💻 Dev", title: "Full-Stack App Development", purpose: "Build complete web application", best: "Product builds", chain: ["Eagle", "Beaver", "Ant", "Owl"], out: "Production-ready application with full documentation", steps: [
    { a: "Eagle", t: "Define product architecture", items: ["Core features list", "User flows and journeys", "Data models and relationships", "API boundaries"] },
    { a: "Beaver", t: "Set up project structure", items: ["Repository initialization", "Dependencies configuration", "Environment setup", "Linting and formatting rules"] },
    { a: "Ant", t: "Implement feature by feature", items: ["Database schema", "API endpoints", "Frontend components", "Integration testing"] },
    { a: "Owl", t: "Review and optimize", items: ["Code quality audit", "Performance profiling", "Security vulnerability check", "Documentation completion"] },
  ] },
  { id: 5, cat: "💻 Dev", title: "API Design", purpose: "Design RESTful or GraphQL API", best: "Backend development", chain: ["Owl", "Beaver", "Ant", "Dolphin"], out: "Complete API specification with OpenAPI documentation", steps: [
    { a: "Owl", t: "Analyze requirements", items: ["Resource identification", "Relationship mapping", "Authentication needs", "Rate limiting requirements"] },
    { a: "Beaver", t: "Define endpoints", items: ["HTTP methods selection", "URL structure design", "Request/response schemas", "Error handling strategy"] },
    { a: "Ant", t: "Document comprehensively", items: ["OpenAPI/Swagger specification", "Example requests/responses", "Authentication docs", "Rate limit documentation"] },
    { a: "Dolphin", t: "Add advanced features", items: ["Pagination strategies", "Filtering and sorting", "Caching headers", "Webhook support"] },
  ] },
  { id: 6, cat: "💻 Dev", title: "Database Schema Design", purpose: "Design scalable database structure", best: "Data modeling", chain: ["Eagle", "Beaver", "Ant", "Owl"], out: "Production database schema with migration scripts", steps: [
    { a: "Eagle", t: "Map data requirements", items: ["Entity identification", "Relationship types (1:1, 1:N, N:N)", "Data volume estimation", "Performance requirements"] },
    { a: "Beaver", t: "Design schema", items: ["Table/collection definitions", "Column types and constraints", "Index strategy", "Foreign key relationships"] },
    { a: "Ant", t: "Implement migrations", items: ["Up migration scripts", "Seed data scripts", "Rollback procedures", "Migration testing"] },
    { a: "Owl", t: "Optimize for performance", items: ["Query analysis", "Index refinement", "Partitioning strategy", "Backup procedures"] },
  ] },
  { id: 7, cat: "📈 Business", title: "Product Roadmap Planning", purpose: "Create strategic product roadmap", best: "Product management", chain: ["Owl", "Eagle", "Rabbit", "Beaver"], out: "Prioritized product roadmap with timeline and milestones", steps: [
    { a: "Owl", t: "Analyze current state", items: ["Market analysis", "Competitive landscape", "User feedback review", "Technical debt assessment"] },
    { a: "Eagle", t: "Define vision", items: ["12-month product vision", "Key objectives and OKRs", "Success metrics", "Risk identification"] },
    { a: "Rabbit", t: "Generate initiatives", items: ["Feature proposals", "Technical improvements", "Infrastructure needs", "Research projects"] },
    { a: "Beaver", t: "Prioritize and sequence", items: ["Impact vs effort scoring", "Dependency mapping", "Resource allocation", "Milestone planning"] },
  ] },
  { id: 8, cat: "📈 Business", title: "Market Research", purpose: "Conduct comprehensive market analysis", best: "Business strategy", chain: ["Owl", "Elephant", "Ant", "Eagle"], out: "Market research report with actionable insights", steps: [
    { a: "Owl", t: "Define research scope", items: ["Target market definition", "Competitor list", "Research questions", "Data sources identification"] },
    { a: "Elephant", t: "Gather insights", items: ["Industry reports review", "Competitor analysis", "Customer interview synthesis", "Trend analysis"] },
    { a: "Ant", t: "Break down findings", items: ["SWOT analysis", "Market size estimation", "User persona development", "Opportunity mapping"] },
    { a: "Eagle", t: "Synthesize recommendations", items: ["Strategic positioning", "Go-to-market suggestions", "Pricing strategy", "Risk mitigation"] },
  ] },
  { id: 9, cat: "📈 Business", title: "User Onboarding Flow", purpose: "Design effective user onboarding", best: "Product growth", chain: ["Owl", "Dolphin", "Beaver", "Ant"], out: "Complete onboarding flow with metrics and testing plan", steps: [
    { a: "Owl", t: "Understand user psychology", items: ["Activation moment identification", "Friction point analysis", "Value moment mapping", "Drop-off prediction"] },
    { a: "Dolphin", t: "Generate onboarding ideas", items: ["Welcome emails", "Interactive tutorials", "Progress indicators", "Social proof moments"] },
    { a: "Beaver", t: "Design the flow", items: ["Sign-up to first value", "Step-by-step guidance", "Progress tracking", "Celebration moments"] },
    { a: "Ant", t: "Implement and test", items: ["A/B test variations", "Analytics tracking", "Feedback loops", "Iteration cycles"] },
  ] },
  { id: 10, cat: "📝 Content", title: "Blog Content Creation", purpose: "Write SEO-optimized blog posts", best: "Content marketing", chain: ["Owl", "Eagle", "Ant", "Owl"], out: "Ready-to-publish blog post with SEO optimizations", steps: [
    { a: "Owl", t: "Research topic", items: ["Keyword analysis", "Search intent identification", "Competitor content review", "Topic cluster mapping"] },
    { a: "Eagle", t: "Structure outline", items: ["H2/H3 hierarchy", "Key points to cover", "Data and statistics to include", "Internal linking strategy"] },
    { a: "Ant", t: "Write section by section", items: ["Compelling introduction", "Body paragraphs with examples", "Visual element suggestions", "Strong conclusion"] },
    { a: "Owl", t: "Optimize for SEO", items: ["Meta title and description", "URL structure", "Alt text for images", "Schema markup"] },
  ] },
  { id: 11, cat: "📝 Content", title: "Video Content Strategy", purpose: "Plan and create video content", best: "YouTube, social media", chain: ["Rabbit", "Eagle", "Beaver", "Ant"], out: "Video content calendar with production assets", steps: [
    { a: "Rabbit", t: "Generate content angles", items: ["10+ video topic ideas", "Different formats (tutorial, vlog, review)", "Audience variations", "Trend adaptations"] },
    { a: "Eagle", t: "Select and strategize", items: ["Choose best topics", "Define target audience", "Set success metrics", "Plan distribution channels"] },
    { a: "Beaver", t: "Create production plan", items: ["Script outline", "B-roll requirements", "Thumbnail concepts", "Posting schedule"] },
    { a: "Ant", t: "Execute and optimize", items: ["Filming and editing", "SEO optimization", "Engagement strategy", "Analytics review"] },
  ] },
  { id: 12, cat: "📝 Content", title: "Email Marketing Campaign", purpose: "Design email marketing sequence", best: "Marketing automation", chain: ["Owl", "Rabbit", "Beaver", "Ant"], out: "Complete email campaign automation with all sequences", steps: [
    { a: "Owl", t: "Define customer journey", items: ["Funnel stages", "Trigger events", "Segment definitions", "Goal mapping"] },
    { a: "Rabbit", t: "Generate email variations", items: ["Welcome series ideas", "Promo sequences", "Re-engagement campaigns", "Post-purchase flows"] },
    { a: "Beaver", t: "Write each email", items: ["Subject line optimization", "Preview text", "Body copy", "CTA buttons"] },
    { a: "Ant", t: "Set up automation", items: ["Trigger conditions", "Timing intervals", "A/B test variants", "Unsubscribe handling"] },
  ] },
  { id: 13, cat: "🔧 Automation", title: "Workflow Automation", purpose: "Design automated business process", best: "Operations, efficiency", chain: ["Owl", "Beaver", "Ant", "Owl"], out: "Production automation workflow with monitoring", steps: [
    { a: "Owl", t: "Analyze current process", items: ["Manual steps documentation", "Time and resource costs", "Error points identification", "Bottleneck analysis"] },
    { a: "Beaver", t: "Design automation", items: ["Trigger definition", "Action sequence", "Conditional logic", "Error handling"] },
    { a: "Ant", t: "Implement step by step", items: ["API integrations", "Data transformations", "Notification system", "Logging mechanism"] },
    { a: "Owl", t: "Test and monitor", items: ["Edge case testing", "Performance monitoring", "Alert configuration", "Documentation"] },
  ] },
  { id: 14, cat: "🔧 Automation", title: "CI/CD Pipeline Setup", purpose: "Build continuous integration/deployment", best: "Development ops", chain: ["Eagle", "Beaver", "Ant", "Owl"], out: "Complete CI/CD pipeline with monitoring", steps: [
    { a: "Eagle", t: "Define pipeline stages", items: ["Code checkout", "Dependency installation", "Linting and formatting", "Unit testing", "Integration testing", "Build creation", "Deployment trigger"] },
    { a: "Beaver", t: "Configure tools", items: ["GitHub Actions / GitLab CI", "Environment variables", "Secret management", "Cache strategies"] },
    { a: "Ant", t: "Set up each stage", items: ["Test runner configuration", "Build script creation", "Deployment scripts", "Rollback procedures"] },
    { a: "Owl", t: "Implement monitoring", items: ["Build status notifications", "Deployment tracking", "Performance metrics", "Error alerting"] },
  ] },
  { id: 15, cat: "🎯 Problem", title: "Debug Complex Issue", purpose: "Systematically debug production issues", best: "Engineering", chain: ["Owl", "Ant", "Beaver", "Eagle"], out: "Fixed issue with prevention measures", steps: [
    { a: "Owl", t: "Gather information", items: ["Error logs review", "User reports collection", "Environment details", "Recent changes timeline"] },
    { a: "Ant", t: "Isolate the problem", items: ["Reproduce locally", "Binary search debugging", "Variable elimination", "Hypothesis formation"] },
    { a: "Beaver", t: "Implement fix", items: ["Root cause addressing", "Solution implementation", "Test case addition", "Code review preparation"] },
    { a: "Eagle", t: "Prevent recurrence", items: ["Add monitoring", "Update documentation", "Process improvement", "Team knowledge sharing"] },
  ] },
  { id: 16, cat: "🎯 Problem", title: "Technical Debt Resolution", purpose: "Address accumulated technical debt", best: "Engineering", chain: ["Owl", "Eagle", "Beaver", "Ant"], out: "Reduced technical debt with verified improvements", steps: [
    { a: "Owl", t: "Audit current state", items: ["Code complexity analysis", "Test coverage review", "Dependency age check", "Performance baseline"] },
    { a: "Eagle", t: "Prioritize debt items", items: ["Impact assessment", "Effort estimation", "Risk evaluation", "Dependency mapping"] },
    { a: "Beaver", t: "Execute refactoring", items: ["Smallest valuable first", "Preserve behavior", "Add tests first", "Incremental changes"] },
    { a: "Ant", t: "Validate improvements", items: ["Performance verification", "Test coverage increase", "Code review completion", "Documentation update"] },
  ] },
  { id: 17, cat: "📊 Data", title: "Analytics Implementation", purpose: "Set up proper analytics tracking", best: "Data teams", chain: ["Owl", "Beaver", "Ant", "Dolphin"], out: "Complete analytics implementation with dashboards", steps: [
    { a: "Owl", t: "Define metrics framework", items: ["Business objectives", "Key metrics identification", "User journey mapping", "Success events"] },
    { a: "Beaver", t: "Plan tracking setup", items: ["Event taxonomy", "Property definitions", "User identification strategy", "Cross-domain tracking"] },
    { a: "Ant", t: "Implement tracking", items: ["SDK installation", "Event implementation", "Conversion tracking", "Custom dimensions"] },
    { a: "Dolphin", t: "Create dashboards", items: ["Real-time monitoring", "Funnel analysis", "Cohort tracking", "Custom reports"] },
  ] },
  { id: 18, cat: "📊 Data", title: "Data Pipeline Construction", purpose: "Build reliable data processing pipeline", best: "Data engineering", chain: ["Eagle", "Beaver", "Ant", "Owl"], out: "Production data pipeline with monitoring", steps: [
    { a: "Eagle", t: "Design data architecture", items: ["Source identification", "Transformation logic", "Storage requirements", "Delivery destinations"] },
    { a: "Beaver", t: "Build pipeline components", items: ["Extract scripts", "Transform functions", "Load processes", "Validation checks"] },
    { a: "Ant", t: "Implement error handling", items: ["Retry logic", "Dead letter queues", "Alert mechanisms", "Recovery procedures"] },
    { a: "Owl", t: "Optimize and monitor", items: ["Performance tuning", "Cost optimization", "Quality monitoring", "SLA tracking"] },
  ] },
  { id: 19, cat: "🤖 AI Product", title: "AI Tool / Product Build", purpose: "Build an AI-powered tool, reference system, or prompt OS", best: "Prompt OS, AI dashboards, prompt managers, creative tools", chain: ["Eagle", "Beaver", "Dolphin", "Ant"], out: "Deployed AI product with prompt engine, UI system, and component library", steps: [
    { a: "Eagle", t: "Define the AI product vision", items: ["Core user problem the AI solves", "Zones or modes the product needs (activate / build / validate / playbook / builder)", "Data architecture — what does the AI consume and output?", "Prompt schema — how are prompts structured, stored, retrieved?", "Success metric: what does the user walk away with after each session?"] },
    { a: "Beaver", t: "Build the prompt engine + UI system", items: ["Design token system (colors, typography, spacing, animation curves)", "Component library: Card, Code, Pill, CopyButton, Input, Label", "Prompt data layer: all prompts as typed constants (not hardcoded in JSX)", "Copy-to-clipboard utility with iframe/sandbox fallback", "Zone navigation with animated transitions"] },
    { a: "Dolphin", t: "Design the creative interaction layer", items: ["Interactive composers: chain builder, layer composer, live prompt generator", "Copy-ready output on every single item — modifier, template, vocab term, workflow", "Animation system: zone enter, section pop, copy flash, hover scale", "Misconception vs correct views for educational depth", "Selectable keyword pickers for ambiguous prompt variables"] },
    { a: "Ant", t: "Polish, fix, and ship", items: ["Initialization order: declare all consts before they are referenced", "Remove bare HTML tags (<title><meta><link>) from JSX returns", "Verify fragment pairs <>...</> are balanced", "Test clipboard copy in sandboxed iframe environments", "Verify all template literal backticks are balanced across brand/prompt strings", "Deploy: Vite build → Vercel (30 seconds)"] },
  ] },
];

// ─── MONETIZE DATA ────────────────────────────────────────────────────────────
export const DEPLOY_STACKS = [
  { id: "vercel-supa", label: "Vercel + Supabase", tier: "Free", type: "Full-stack", tech: ["Next.js 14", "Supabase (DB+Auth+Storage)", "Vercel (deploy)"], best: "SaaS MVP, auth apps, real-time apps", limits: "500MB DB, 50k auth users, 100GB bandwidth/mo", strength: "End-to-end free, real-time DB, built-in auth, edge functions", weakness: "Vendor lock-in, free tier pauses after inactivity", prompt: `Build a full-stack Next.js 14 app using Supabase for database, auth, and storage.\nDeploy to Vercel free tier.\n\nTECH STACK\n- Framework: Next.js 14 App Router\n- Database: Supabase PostgreSQL (free tier)\n- Auth: Supabase Auth (email + OAuth)\n- Storage: Supabase Storage\n- Deploy: Vercel (free tier)\n- Styling: Tailwind CSS\n\nCONSTRAINTS\n- Stay within Supabase free limits: 500MB DB, 50k MAU, 5GB storage\n- Use Vercel serverless functions for API routes\n- Enable Supabase Row Level Security (RLS) on all tables\n\nOUTPUT: Complete project with folder structure, schema.sql, env.local template, and deploy instructions.` },
  { id: "railway", label: "Railway + Turso", tier: "Free", type: "Full-stack", tech: ["Node.js/Express or Next.js", "Turso (SQLite edge DB)", "Railway (deploy)"], best: "API services, scheduled jobs, background workers", limits: "$5 free credit/mo Railway, Turso free: 500 DBs, 1B row reads", strength: "No sleep mode, MySQL-compatible, supports cron jobs", weakness: "Railway credit expires", prompt: `Build a Node.js API service on Railway with Turso (SQLite edge DB) as database.\n\nTECH STACK\n- Runtime: Node.js + Express or Hono\n- Database: Turso (libSQL/SQLite, free: 500 DBs, 1B row reads)\n- Deploy: Railway (free $5/mo credit)\n- ORM: Drizzle ORM\n\nSETUP STEPS\n1. npx create-hono-app myapp\n2. turso db create myapp-db && turso db tokens create myapp-db\n3. railway init && railway up\n\nOUTPUT: Complete API with CRUD routes, Drizzle schema, Railway config, and env template.` },
  { id: "cloudflare", label: "Cloudflare Pages + Workers", tier: "Free", type: "Edge", tech: ["Astro or SvelteKit", "Cloudflare D1 (SQLite)", "Workers (serverless)"], best: "Content sites, APIs, edge-computed apps with global CDN", limits: "Workers: 100k requests/day free, D1: 5M row reads/day, Pages: unlimited", strength: "Global edge network, generous free tier, D1 is free SQLite at edge", weakness: "Workers cold start, D1 not for heavy writes, limited runtime APIs", prompt: `Build a SvelteKit app deployed to Cloudflare Pages with D1 database and Workers API.\n\nTECH STACK\n- Framework: SvelteKit (adapter-cloudflare)\n- Database: Cloudflare D1 (SQLite at edge)\n- API: Cloudflare Workers\n- Deploy: Cloudflare Pages (free, unlimited)\n\nSETUP\nnpx create-svelte@latest myapp\nnpm i -D @sveltejs/adapter-cloudflare\nwrangler d1 create myapp-db\n\nOUTPUT: Complete SvelteKit app with D1 schema, wrangler.toml, and KV store setup.` },
  { id: "netlify-fauna", label: "Netlify + Fauna", tier: "Free", type: "Serverless", tech: ["Astro or 11ty", "Fauna DB", "Netlify Functions"], best: "Content-heavy sites, JAMstack, blogs with dynamic data", limits: "Netlify: 100GB bandwidth, 125k function calls/mo. Fauna: 100k ops/day", strength: "Git-based deploys, form handling, split testing built-in", weakness: "Fauna has learning curve, cold starts on functions", prompt: `Build a content site with Astro, deployed on Netlify with Fauna for dynamic data.\n\nTECH STACK\n- Framework: Astro 4 (static + SSR)\n- Database: Fauna (serverless document DB)\n- Functions: Netlify Functions\n- Deploy: Netlify (free tier)\n- CMS: Decap CMS (git-based, free)\n\nOUTPUT: Astro project with Fauna client, Netlify functions for API, netlify.toml config.` },
  { id: "github-pages", label: "GitHub Pages + PocketBase", tier: "Free", type: "Static+Self-hosted", tech: ["React/Vue/Svelte", "PocketBase (self-hosted)", "GitHub Pages"], best: "Personal tools, portfolios, small apps with own server", limits: "GitHub Pages: 1GB storage, 100GB bandwidth. PocketBase: limited by your VPS", strength: "Full control, no vendor lock-in, PocketBase is single binary (auth+DB+files)", weakness: "Need a VPS for PocketBase (~$4-6/mo on Oracle Free Tier or Fly.io)", prompt: `Build a React SPA on GitHub Pages with PocketBase as backend (self-hosted on Oracle Free Tier).\n\nTECH STACK\n- Frontend: React + Vite → GitHub Pages\n- Backend: PocketBase (single Go binary, runs on Oracle Free Tier VM)\n- Auth: PocketBase built-in auth\n- Deploy: gh-pages npm package + Oracle Free Tier (always free ARM VM)\n\nORACLE FREE TIER SETUP\n1. Create Oracle Cloud account → Always Free VM (4 OCPUs, 24GB RAM)\n2. Upload PocketBase binary, run as systemd service\n3. Configure nginx reverse proxy + Let's Encrypt SSL\n\nOUTPUT: Complete setup with GitHub Actions deploy workflow, PocketBase schema, nginx config.` },
  { id: "local-hybrid", label: "Local + Tunneling (Hybrid)", tier: "Free", type: "Local/Hybrid", tech: ["Any framework", "Ollama (local AI)", "ngrok/Cloudflare Tunnel"], best: "AI development, testing, personal tools, privacy-first apps", limits: "Dependent on your machine; ngrok free: 1 tunnel, random URL", strength: "No cost, full privacy, local AI models (Llama3, Mistral), fast iteration", weakness: "Not always-on, random ngrok URL changes, limited by local hardware", prompt: `Build a local-first AI app with Ollama for LLM inference, exposed via Cloudflare Tunnel.\n\nTECH STACK\n- Frontend: Next.js or React + Vite (localhost:3000)\n- AI: Ollama (localhost:11434) — run Llama3, Mistral, CodeLlama locally\n- Tunnel: Cloudflare Tunnel (free, stable URL, no account needed for quick-tunnel)\n- Storage: SQLite via Drizzle ORM (local file)\n\nSETUP\n1. curl https://ollama.ai/install.sh | sh && ollama pull llama3\n2. npm run dev (your app on :3000)\n3. cloudflared tunnel --url http://localhost:3000\n\nOUTPUT: Next.js app with Ollama API client, streaming chat UI, local SQLite, and tunnel instructions.` },
];

export const TOOL_MATRIX = [
  { cat: "Frontend", items: [
    { id: "nextjs", label: "Next.js 14", deploy: ["Vercel", "Railway", "Cloudflare"], strength: "SSR+SSG, file-based routing, edge-ready", weakness: "Complex config, vendor-tied to Vercel", free: true },
    { id: "svelte", label: "SvelteKit", deploy: ["Vercel", "Netlify", "Cloudflare"], strength: "Tiny bundle, reactive by default, fast", weakness: "Smaller ecosystem, fewer UI libraries", free: true },
    { id: "astro", label: "Astro 4", deploy: ["Netlify", "Cloudflare", "Vercel"], strength: "0kb JS default, partial hydration, CMS-friendly", weakness: "Not for heavy interactivity", free: true },
    { id: "vite", label: "React + Vite", deploy: ["GitHub Pages", "Netlify", "Vercel"], strength: "SPA, fastest dev, flexible", weakness: "No SSR without extra setup", free: true },
  ] },
  { cat: "Database", items: [
    { id: "supabase", label: "Supabase", deploy: ["Vercel", "Railway", "Netlify"], strength: "Postgres + Auth + Storage + Realtime in one", weakness: "Free tier pauses after inactivity", free: true },
    { id: "turso", label: "Turso (libSQL)", deploy: ["Cloudflare", "Railway", "Vercel"], strength: "SQLite at edge, 500 free DBs, fast reads", weakness: "SQLite constraints, no complex joins", free: true },
    { id: "neon", label: "Neon Postgres", deploy: ["Vercel", "Railway", "Render"], strength: "Serverless Postgres, branching, never sleeps", weakness: "Connection limits on free tier", free: true },
    { id: "pocketbase", label: "PocketBase", deploy: ["Self-hosted", "Fly.io", "Oracle"], strength: "Single binary — DB+Auth+Files+Admin UI", weakness: "Self-hosted, not managed", free: true },
  ] },
  { cat: "AI Provider", items: [
    { id: "groq", label: "Groq (Free)", deploy: ["Any"], strength: "Fastest inference, free tier (14k tokens/min), Llama3/Mixtral", weakness: "Rate limits, limited models", free: true },
    { id: "ollama", label: "Ollama (Local)", deploy: ["Local"], strength: "100% free, private, 100+ models, runs offline", weakness: "Needs GPU/RAM, not hosted", free: true },
    { id: "gemini", label: "Gemini Flash", deploy: ["Any"], strength: "Free tier, multimodal, 1M context window", weakness: "Google terms, data privacy concerns", free: true },
    { id: "openrouter", label: "OpenRouter", deploy: ["Any"], strength: "Pay-per-use, 100+ models, free models included", weakness: "Latency varies, API key management", free: false },
  ] },
  { cat: "Payments", items: [
    { id: "stripe", label: "Stripe", deploy: ["Any"], strength: "Industry standard, 0% platform fee, best docs", weakness: "Needs business entity, 2.9%+30c per txn", free: false },
    { id: "lemon", label: "Lemon Squeezy", deploy: ["Any"], strength: "Merchant of record (handles tax), good for digital products", weakness: "5% + payment fees", free: false },
    { id: "gumroad", label: "Gumroad", deploy: ["Any"], strength: "Easiest setup, built-in audience, no monthly fee", weakness: "10% fee, limited customization", free: true },
    { id: "polar", label: "Polar.sh", deploy: ["Any"], strength: "Built for OSS devs, GitHub-native, 5% fee", weakness: "Newer, smaller audience", free: true },
  ] },
];

export const TOP10_PROMPTS = [
  { rank: 1, cat: "🤖 Automation", title: "Automation Services", searches: "900k+/mo", why: "Businesses pay $500–5k/project and $200–2k/mo retainer to automate repetitive workflows.", pros: ["Recurring retainer income", "High ticket ($500–5k/project)", "Deliver in hours not weeks", "Templates make it nearly passive"], cons: ["Client discovery takes time", "API changes break automations", "Maintenance overhead"], difficulty: "Beginner", monetize: "Freelance + retainer + template packs on Gumroad", prompt: `You are a senior automation consultant specializing in no-code/low-code business automation.\n\nCLIENT BRIEF\nBusiness type: [e.g. real estate agency, e-commerce store, SaaS company]\nCurrent manual process: [describe what they do manually]\nTools they already use: [e.g. Gmail, Notion, Airtable, Shopify]\nDesired outcome: [e.g. auto-send invoices, sync leads to CRM, notify team on new orders]\n\nDELIVERABLE\nDesign a complete automation workflow using [N8n / Make / Zapier] that:\n1. Identifies the trigger event\n2. Maps each automated action step-by-step\n3. Handles errors and edge cases\n4. Includes a testing checklist\n5. Estimates time saved per week\n\nOUTPUT FORMAT\n- Workflow diagram (text-based, node → node format)\n- Step-by-step setup instructions (numbered, copy-paste ready)\n- N8n JSON or Make scenario JSON if applicable\n- ROI calculation: hours saved × hourly rate\n- Upsell opportunities for this client` },
  { rank: 2, cat: "📦 SaaS", title: "SaaS Templates", searches: "720k+/mo", why: "Developers sell boilerplate SaaS starters for $49–299 one-time. Buyers save 40–80 hours of setup.", pros: ["100% passive after build", "$49–299 per sale", "Same product sold infinitely", "Build once, earn forever"], cons: ["Competitive market", "Requires maintenance as deps update", "Marketing effort upfront"], difficulty: "Intermediate", monetize: "Gumroad / Lemon Squeezy one-time + optional support tier", prompt: `You are a senior full-stack developer creating a production-ready SaaS starter template.\n\nTEMPLATE SPEC\nSaaS type: [e.g. B2B analytics, AI writing tool, booking system]\nTarget buyer: [indie hacker / agency / developer]\nPrice point: [free / $49 / $99 / $199]\n\nTECH STACK\n- Next.js 14 App Router\n- Supabase (DB + Auth + Storage)\n- Stripe (subscriptions + one-time payments)\n- Tailwind CSS + shadcn/ui\n- Resend (transactional email)\n\nREQUIRED FEATURES\n1. Auth: email/password + Google OAuth + magic link\n2. Billing: free tier + Pro plan ($X/mo) with Stripe\n3. Dashboard: user profile, usage stats, settings\n4. Subscription gating: protect Pro features\n5. Admin panel: user management, MRR dashboard\n6. Email: welcome, trial ending, payment failed\n\nOUTPUT\n- Complete folder structure\n- All source files (no TODOs, no lorem ipsum)\n- Database schema (SQL)\n- Stripe webhook handler\n- .env.local template with all required keys\n- README with 5-command setup\n- Landing page with pricing section` },
  { rank: 3, cat: "🎓 Consulting", title: "Training / Consulting", searches: "680k+/mo", why: "AI consulting rates: $75–300/hr. Prompt engineering courses sell for $97–497.", pros: ["$75–300/hr rate", "High perceived value", "Build authority fast", "No inventory, no shipping"], cons: ["Time-for-money ceiling", "Client acquisition needed", "Must stay current with AI"], difficulty: "Beginner", monetize: "Hourly consulting + cohort course + workshop ($197–497)", prompt: `You are an AI implementation consultant creating a consulting offer for [industry/niche].\n\nCONSULTING OFFER DESIGN\nTarget client: [e.g. marketing agencies, law firms, real estate teams]\nPain point: [what are they struggling with that AI can solve?]\nTransformation: [what does their workflow look like after working with you?]\n\nDELIVERABLE: Design a complete consulting productized service including:\n\n1. OFFER NAME & POSITIONING\n   - Service name (outcome-focused)\n   - One-liner value proposition\n   - Ideal client avatar (3 bullet points)\n\n2. SERVICE TIERS\n   Tier 1 - Audit ($497): 90-min AI readiness assessment + report\n   Tier 2 - Implementation ($2,500): 4-week workflow automation build\n   Tier 3 - Retainer ($1,500/mo): ongoing optimization + Slack access\n\n3. DISCOVERY CALL SCRIPT\n   - 5 qualifying questions\n   - Pain/cost/urgency framework\n   - Objection responses\n\n4. PROPOSAL TEMPLATE\n   - Problem restatement\n   - Proposed solution\n   - Timeline + milestones\n   - Investment + ROI projection\n\n5. DELIVERY FRAMEWORK\n   Week 1: Audit + toolstack recommendation\n   Week 2-3: Build + test automations\n   Week 4: Training + handoff + SOP documentation` },
  { rank: 4, cat: "🤖 AI", title: "AI Content Agency", searches: "520k+/mo", why: "Content agencies using AI produce 10× more output. Clients pay $1k–5k/mo.", pros: ["High recurring revenue", "AI does 80% of work", "Scalable with templates", "Global client base"], cons: ["Content quality still needs human review", "Market getting saturated", "Clients may DIY eventually"], difficulty: "Beginner", monetize: "Monthly retainer $1k–5k/mo per client", prompt: `You are an AI content agency owner creating a content production system for [client niche].\n\nCLIENT: [e.g. SaaS startup, e-commerce brand, personal finance blogger]\nMONTHLY PACKAGE: [e.g. 4 blog posts + 20 social posts + 1 email sequence]\n\nCONTENT SYSTEM DESIGN\n\n1. BRAND VOICE DOCUMENT\n   Extract from: [paste client website URL or brand guidelines]\n   Output: tone (3 adjectives), vocabulary to use, vocabulary to avoid, content pillars (5)\n\n2. MONTHLY CONTENT CALENDAR\n   Week 1–4 breakdown:\n   - Blog topic + target keyword + word count\n   - 5 LinkedIn posts (hook + insight + CTA)\n   - 5 Twitter/X threads (numbered, 7 tweets each)\n   - Email subject lines (A/B variants)\n\n3. PRODUCTION PROMPT CHAIN\n   Step 1 — Research: "Analyze top 5 articles ranking for [keyword]. Extract gaps."\n   Step 2 — Outline: "Create H2/H3 outline targeting [keyword] with [word count]."\n   Step 3 — Draft: "Write section [X] using the brand voice document above."\n   Step 4 — Repurpose: "Convert this blog post into 5 LinkedIn posts and 1 thread."\n\n4. QA CHECKLIST\n   - Fact-check statistics and claims\n   - Brand voice alignment (1–10 score)\n   - SEO: keyword density, meta description, internal links\n   - CTA present and specific` },
  { rank: 5, cat: "⚡ Prompt Eng", title: "Prompt Engineering", searches: "490k+/mo", why: "Prompt engineering is meta-skill that sells. Prompt packs ($9–99), courses ($197–997).", pros: ["Low barrier to entry", "High perceived value", "Evergreen demand", "Multiple revenue channels"], cons: ["Models change fast (prompts degrade)", "Hard to patent or protect", "Competition increasing"], difficulty: "Beginner", monetize: "Prompt packs (Gumroad $9–49) + course ($197+) + consulting", prompt: `You are a prompt engineering specialist creating a monetizable prompt product.\n\nPRODUCT TYPE: [Prompt Pack / System Prompt / Prompt Course Module]\nTARGET USER: [beginner / intermediate / advanced]\nUse case niche: [e.g. marketing copy, code review, product research, image generation]\n\nDELIVERABLE: Create a production-ready prompt product including:\n\n1. PROMPT PACK STRUCTURE (10 prompts minimum)\n   For each prompt:\n   - Title and use case\n   - The prompt (copy-paste ready, with [BRACKET] variables)\n   - Expected output description\n   - Pro tip: one thing that dramatically improves results\n   - Common mistake to avoid\n\n2. PROMPT QUALITY SCORING\n   Rate each prompt on:\n   - Clarity (1–10): Is the goal unambiguous?\n   - Constraints (1–10): Are quality guardrails explicit?\n   - Predictability (1–10): Same output every time?\n   - Reusability (1–10): Works across different inputs?\n\n3. SALES PAGE COPY\n   - Headline (outcome-focused)\n   - 5 bullet points (what you get)\n   - Social proof placeholder\n   - Price anchor + CTA` },
  { rank: 6, cat: "🔧 No-Code", title: "No-Code Tool Builder", searches: "410k+/mo", why: "No-code micro-tools built on Bubble, Glide, or Softr sell for $29–299.", pros: ["Build in hours not weeks", "Low maintenance", "AI makes simple tools powerful", "Many monetization options"], cons: ["Platform dependency", "Limited customization", "Bubble/Glide fees"], difficulty: "Beginner", monetize: "One-time sale ($29–99) or freemium with Pro upgrade", prompt: `You are a no-code product developer creating a monetizable micro-tool.\n\nTOOL CONCEPT: [e.g. AI invoice generator, ROI calculator, social bio writer, resume scorer]\nTARGET USER: [freelancers / small business owners / job seekers]\nMonetization: [free with email capture / $9 one-time / freemium + $19/mo Pro]\n\nTOOL SPECIFICATION\n\n1. CORE FUNCTION\n   Input: [what does the user enter?]\n   Process: [what calculation or AI prompt runs?]\n   Output: [what does the user get?]\n\n2. TECH STACK OPTIONS (ranked by speed to launch)\n   Option A: Bubble.io — most features, visual dev, 2–4 hours\n   Option B: Glide — best for spreadsheet-backed tools, 1–2 hours\n   Option C: Softr + Airtable — best for directory/database tools\n   Option D: Next.js + Vercel + OpenAI — most custom, 4–8 hours\n\n3. AI PROMPT INTEGRATION\n   System prompt for the tool:\n   "You are a [role]. The user provides [input type]. Output [format] that [outcome]."\n\n4. LAUNCH CHECKLIST\n   - Landing page (Carrd or Framer, free)\n   - Email capture (Beehiiv or ConvertKit free)\n   - Payment (Gumroad, 0 setup cost)\n   - ProductHunt launch strategy` },
  { rank: 7, cat: "📧 Newsletter", title: "Newsletter Monetization", searches: "380k+/mo", why: "Newsletters at 1000 subscribers earn $500–5k/mo via sponsorships.", pros: ["Compounding asset (subscribers grow)", "Multiple revenue streams", "You own the audience", "AI can write 80% of content"], cons: ["Slow to build (6–12 months to monetize)", "Content consistency required", "Open rates declining"], difficulty: "Beginner", monetize: "Sponsorships + paid tier + digital products + consulting upsell", prompt: `You are a newsletter growth strategist designing a monetization system for [newsletter niche].\n\nNEWSLETTER DETAILS\nNiche: [e.g. AI tools for marketers, indie hacking, B2B sales]\nCurrent subscribers: [number]\nPlatform: [Beehiiv / Substack / ConvertKit]\nPublishing cadence: [weekly / twice-weekly]\n\nMONETIZATION STACK DESIGN\n\n1. REVENUE TIERS\n   Tier 1 — Free: 1x/week curated content + 1 sponsor slot ($X CPM)\n   Tier 2 — Paid ($9/mo): bonus deep-dives + community access + templates\n   Tier 3 — Sponsor package: dedicated send ($500–2,000 per send at 5k+ subs)\n\n2. CONTENT PRODUCTION SYSTEM (AI-assisted)\n   Monday: Research 5 AI tools → run each through evaluation prompt\n   Tuesday: Write newsletter using AI draft → human polish (30 min)\n   Wednesday: Schedule + set up sponsor link tracking\n\n3. GROWTH PLAYBOOK\n   - Referral program (Beehiiv native): 3 referrals = bonus resource\n   - Cross-promotion: swap mentions with 3 newsletters same size\n   - Lead magnet: [what 1-page resource gets your ideal reader to subscribe?]\n\n4. SPONSOR PITCH TEMPLATE\n   "Hi [name], I run [newsletter] — [X] subscribers, [Y]% open rate.\n   Your [product] is perfect for my audience of [avatar description].\n   I offer [package details] at [$rate]. Here's my media kit: [link]"\n\n5. AI CONTENT PROMPT\n   "You are a newsletter writer for [niche]. Write a [word count] issue covering [topic].\n   Format: hook (2 sentences) → 3 insights → 1 tool recommendation → CTA.\n   Tone: [conversational/analytical/tactical]. Reading level: 8th grade."` },
  { rank: 8, cat: "📱 Digital Products", title: "Digital Products", searches: "350k+/mo", why: "Digital products have 95%+ margins and zero fulfillment cost.", pros: ["95%+ profit margin", "Fully passive", "No inventory", "Global market"], cons: ["Discoverability takes time", "One-time purchases (not recurring)", "Easy to copy"], difficulty: "Beginner", monetize: "Gumroad / Etsy / Notion marketplace — one-time + bundle upsell", prompt: `You are a digital product creator designing a high-converting product for [platform].\n\nPRODUCT TYPE: [Notion template / Figma UI kit / Prompt pack / Ebook / Swipe file / Excel tracker]\nTarget buyer: [who has this problem and will pay to solve it?]\nPlatform: [Gumroad / Etsy / Notion Marketplace / Framer Marketplace]\nPrice: [$9 / $19 / $49 / $99]\n\nPRODUCT DESIGN BRIEF\n\n1. PRODUCT TITLE (SEO-optimized for platform search)\n   Format: [Outcome] + [Product Type] + [For Who]\n   Example: "AI Prompt Pack for Freelance Designers — 50 Copy-Paste Prompts"\n\n2. PRODUCT CONTENTS (complete list)\n   - [Item 1]: [description + page count or number of items]\n   - [Item 2]: [description]\n   - Bonus: [what makes this feel like more than the price?]\n\n3. SALES COPY (for Gumroad/Etsy listing)\n   Headline: [specific outcome in ≤10 words]\n   Problem: [2 sentences — what frustration does this solve?]\n   Solution: [2 sentences — what transformation does this deliver?]\n   What's inside: [5 bullet points]\n   Social proof placeholder: "Join [X]+ [avatar]s who use this to [outcome]"\n\n4. PRODUCTION PROMPT\n   "Create a complete [product type] for [target user] that helps them [specific outcome].\n   Include [specific sections/components]. Format as [file format].\n   Tone: [professional/playful/minimal]. No lorem ipsum. No placeholders."` },
  { rank: 9, cat: "🔌 API Products", title: "API Wrapper Products", searches: "290k+/mo", why: "Wrapping AI APIs with a simpler interface and selling credits is a proven model.", pros: ["High margins on credits", "Recurring revenue", "Technical moat", "Scales automatically"], cons: ["Dependent on upstream API", "Pricing squeeze risk", "Support overhead"], difficulty: "Intermediate", monetize: "Credit packs + monthly subscription — Stripe Billing", prompt: `You are an API product architect designing a monetizable AI API wrapper.\n\nAPI TO WRAP: [OpenAI GPT-4 / ElevenLabs voice / Replicate image / Deepgram transcription]\nProduct name: [what you're building]\nTarget customer: [developer / non-technical business owner / agency]\n\nPRODUCT ARCHITECTURE\n\n1. YOUR API LAYER\n   Endpoint: POST /api/generate\n   Auth: API key (Bearer token)\n   Rate limiting: [X requests/min by tier]\n   Input validation: [schema with zod or joi]\n   Output: standardized JSON response\n\n2. CREDIT SYSTEM\n   1 credit = 1 API call (or 1k tokens)\n   Free tier: 100 credits/month (acquisition)\n   Starter: $9/mo — 1,000 credits\n   Pro: $29/mo — 10,000 credits\n   Enterprise: Custom\n\n3. TECH STACK\n   Next.js API routes + Supabase (credits table + API key table) + Stripe\n   Database schema:\n   - users(id, email, stripe_customer_id)\n   - api_keys(id, user_id, key_hash, created_at)\n   - credit_ledger(id, user_id, amount, type, created_at)\n\n4. BILLING SETUP (Stripe)\n   - Subscription products for monthly plans\n   - Credit top-up one-time payment\n   - Webhook: invoice.paid → add credits to user\n\n5. LAUNCH PROMPT\n   "Build a complete Next.js API wrapper for [upstream API] with:\n   Supabase credit tracking, Stripe billing, API key auth, rate limiting.\n   Provide complete source code, schema.sql, and .env.local template."` },
  { rank: 10, cat: "🏘 Community", title: "Community + Membership", searches: "260k+/mo", why: "Paid communities on Circle, Discord, or Skool earn $1k–50k/mo.", pros: ["Recurring revenue", "Network effects", "AI assists content creation", "Premium positioning"], cons: ["Requires active moderation", "Churn if value drops", "Slow to build critical mass"], difficulty: "Intermediate", monetize: "Monthly membership ($29–197/mo) + annual discount + courses upsell", prompt: `You are a community builder designing a paid membership for [niche].\n\nCOMMUNITY DETAILS\nNiche: [e.g. AI freelancers, SaaS founders, prompt engineers]\nPlatform: [Circle / Skool / Discord + Whop]\nMonthly price: [$29 / $49 / $97 / $197]\nCore promise: [what specific outcome does a member achieve in 90 days?]\n\nCOMMUNITY ARCHITECTURE\n\n1. SPACES / CHANNELS\n   #welcome — onboarding + introduce yourself prompt\n   #wins — weekly share format (template below)\n   #resources — curated links + AI tools\n   #ask-anything — questions get answered within 24hrs\n   #accountability — weekly goal thread\n\n2. RECURRING VALUE (monthly calendar)\n   Week 1: Live Q&A / office hours (60 min)\n   Week 2: Resource drop (prompt pack, template, swipe file)\n   Week 3: Member spotlight / case study\n   Week 4: Challenge or sprint (action-focused)\n\n3. ONBOARDING SEQUENCE\n   Day 0: Welcome email — "Your first 3 actions"\n   Day 3: Check-in prompt — "What's your #1 goal this month?"\n   Day 7: First win prompt — "Share one thing you implemented"\n   Day 30: Milestone check — "Here's what you've unlocked"\n\n4. AI CONTENT SYSTEM\n   Weekly prompt for community posts:\n   "Write a [type] post for a [niche] community. Hook in line 1.\n   Share [insight/lesson/resource]. End with a question that gets replies.\n   Tone: [conversational]. Length: 150–200 words."\n\n5. RETENTION MECHANICS\n   - Progress tracking visible to member\n   - Annual plan offer at day 45 (save 2 months)\n   - Alumni tier at 12 months ($X/mo discounted)\n   - Referral reward: 1 free month per referral` },
];

export const SAAS_TEMPLATES = [
  { rank: 1, title: "AI Writing Assistant", niche: "Productivity / Content", mrr: "$5k–50k/mo potential", stack: "Next.js + OpenAI + Stripe + Supabase", why: "Massive market. Jasper, Copy.ai, Writesonic all $1B+. Niche down to win.", prompt: `Build a niche AI writing assistant SaaS for [specific niche: e.g. real estate agents, lawyers, therapists].\n\nPRODUCT: [Niche] AI Writing Assistant\nStack: Next.js 14 + OpenAI API + Supabase + Stripe + Resend\n\nFEATURES\n- Auth: email + Google OAuth (Supabase)\n- 10 specialized writing templates for [niche]\n- Custom tone settings (formal/casual/technical)\n- History + saved outputs\n- Free tier: 5 generations/day\n- Pro ($29/mo): unlimited + API access\n\nSYSTEM PROMPT PER TEMPLATE\n"You are an expert [niche professional]. Write [document type] for [use case].\nUse industry-specific terminology. Format: [structure]. Length: [words].\nTone: [professional/friendly]. Avoid: [list of things to exclude]."\n\nOUTPUT: Complete Next.js app with all templates, Stripe subscription setup, usage tracking, and landing page copy.` },
  { rank: 2, title: "Invoice + Billing SaaS", niche: "Finance / Freelance", mrr: "$3k–30k/mo potential", stack: "Next.js + Supabase + Stripe + PDF generation", why: "Every freelancer and small business needs invoicing. Sticky product — high retention.", prompt: `Build an invoice and billing SaaS for freelancers and small agencies.\n\nPRODUCT: Smart Invoice SaaS\nStack: Next.js 14 + Supabase + Stripe + React-PDF\n\nFEATURES\n- Client management (CRM lite)\n- Invoice builder (line items, tax, discount)\n- PDF generation and email delivery\n- Payment tracking (paid/overdue/draft)\n- Recurring invoice automation\n- Revenue dashboard (MRR, outstanding, paid this month)\n- Free tier: 3 clients, 5 invoices/mo\n- Pro ($19/mo): unlimited + recurring + custom branding\n\nOUTPUT: Complete source code, Supabase schema, Stripe webhook handler, PDF template, and email templates.` },
  { rank: 3, title: "Link Shortener + Analytics", niche: "Marketing / Developer Tools", mrr: "$2k–20k/mo potential", stack: "Next.js + Cloudflare + Turso", why: "Simple to build, clear value, every marketer needs it.", prompt: `Build a link shortener SaaS with click analytics and UTM builder.\n\nPRODUCT: Smart Link SaaS\nStack: Next.js 14 + Cloudflare Workers (redirect speed) + Turso (edge SQLite) + Vercel\n\nFEATURES\n- Custom short links (yourname.co/link)\n- Click analytics: total clicks, unique visitors, countries, devices, referrers\n- UTM parameter builder\n- QR code generation\n- Link expiration + password protection\n- Free tier: 20 links, 1k clicks/mo\n- Pro ($12/mo): unlimited links, custom domain, API\n\nOUTPUT: Complete source code with Cloudflare Worker for redirects, analytics dashboard, and custom domain setup guide.` },
  { rank: 4, title: "Waitlist Builder", niche: "Launch / Growth", mrr: "$1k–10k/mo potential", stack: "Next.js + Supabase + Resend", why: "Every startup needs a waitlist. Minimal features, huge demand during product launches.", prompt: `Build a waitlist SaaS with viral referral mechanics.\n\nPRODUCT: Viral Waitlist Builder\nStack: Next.js 14 + Supabase + Resend + Vercel\n\nFEATURES\n- Customizable waitlist page (logo, headline, email field)\n- Referral system: each signup gets unique link, move up for referrals\n- Real-time position counter\n- Email sequence: confirm → position update → early access notification\n- Dashboard: total signups, referral conversion, daily growth chart\n- Embed widget (iframe or JS snippet for existing sites)\n- Free tier: 1 waitlist, 100 signups\n- Pro ($19/mo): unlimited waitlists, custom domain, API\n\nOUTPUT: Complete source code, email templates (Resend), referral tracking schema, embeddable widget JS.` },
  { rank: 5, title: "Form Builder", niche: "Business / Developer Tools", mrr: "$5k–40k/mo potential", stack: "Next.js + Supabase + Stripe", why: "Typeform charges $50/mo. There's room for a niche form builder.", prompt: `Build an AI-powered form builder SaaS.\n\nPRODUCT: AI Form Builder\nStack: Next.js 14 + Supabase + Stripe + React-Hook-Form\n\nFEATURES\n- Drag-and-drop form builder\n- AI form generator: "Create a client intake form for a graphic designer"\n- Conditional logic\n- Response dashboard with CSV export\n- Webhook + Zapier integration\n- Embed anywhere (iframe or JS)\n- Email notifications on submission\n- Free tier: 3 forms, 100 responses/mo\n- Pro ($24/mo): unlimited + file uploads + webhooks + custom domain\n\nOUTPUT: Complete source code, form schema spec, AI integration, and response analytics dashboard.` },
];

export const MONETIZE_FW = [
  { id: "quick", label: "⚡ Quick Win", timeframe: "Week 1", income: "$100–500", desc: "Sell a prompt pack or template on Gumroad. Zero setup cost, live in 2 hours.", steps: ["Pick one niche you know (marketing, coding, design, finance)", "Create 10 copy-ready prompts with title + use case + pro tip", "Write a Gumroad listing (headline + 5 bullets + price $9–29)", "Post on Twitter/X, Reddit, LinkedIn with 1 example prompt", "First sale within 48 hours if you target a real pain"], prompt: `Create a 10-prompt pack for [niche] professionals that I can sell on Gumroad for $[price].\n\nFor each prompt include:\n- Title (outcome-focused, ≤8 words)\n- The prompt (copy-paste ready with [VARIABLE] placeholders)\n- Expected output (1 sentence)\n- Pro tip (what makes this prompt 10× better)\n- Common mistake to avoid\n\nNiche: [e.g. real estate agents, UX designers, sales reps, fitness coaches]\nPrice point: [$9 / $19 / $29]\nFormat: numbered list, ready to copy into a Gumroad product description.` },
  { id: "active", label: "🎯 Active Income", timeframe: "Week 2–4", income: "$500–5k/project", desc: "Offer AI automation or prompt engineering as a service. Land first client via LinkedIn or Upwork.", steps: ["Define one specific deliverable (e.g. 'I build N8n automations for e-commerce brands')", "Create a simple offer: Audit $497 → Implementation $2,500", "Post 5 LinkedIn posts showing your process (before/after automation)", "DM 20 relevant businesses offering a free 30-min audit", "Close first client → systematize delivery → hire or automate"], prompt: `Design my complete freelance AI service offer for [niche/industry].\n\nMY SKILL: [e.g. N8n automation, prompt engineering, AI content systems]\nTARGET CLIENT: [e.g. e-commerce brands, marketing agencies, law firms]\n\nOutput a complete service productization:\n1. Service name and one-liner (outcome-focused)\n2. Three pricing tiers with exact deliverables and timelines\n3. Discovery call script (5 questions + how to pitch)\n4. LinkedIn outreach DM template (≤50 words, not salesy)\n5. Proposal template structure\n6. Delivery process (week-by-week)\n7. Retainer upsell pitch (how to convert project → monthly)` },
  { id: "passive", label: "💰 Passive Income", timeframe: "Month 1–3", income: "$500–10k/mo MRR", desc: "Build a micro-SaaS or paid newsletter. Takes longer but compounds infinitely.", steps: ["Choose one painful problem with clear willingness to pay", "Build MVP in 1 weekend using free tier stack (Vercel + Supabase)", "Launch on ProductHunt + relevant subreddits", "Price at $9–29/mo (low friction, easy yes)", "Add features based on churn reasons, not feature requests"], prompt: `Design a micro-SaaS MVP I can build in one weekend and launch for passive income.\n\nMY SKILLS: [e.g. frontend dev, no-code, data analysis]\nNICHE: [industry or user type you understand]\nTIME AVAILABLE: [hours per weekend]\n\nOutput a complete MVP plan:\n1. Problem statement (specific, painful, willingness to pay confirmed)\n2. MVP feature list (maximum 5 features for weekend build)\n3. Tech stack (free tier only: Vercel + Supabase + Stripe)\n4. Pricing model ($X/mo free trial → paid)\n5. Weekend build schedule (Saturday tasks + Sunday tasks)\n6. Launch checklist (ProductHunt, Reddit, Twitter)\n7. First 10 customer acquisition plan` },
  { id: "hybrid", label: "🔁 Hybrid Stack", timeframe: "Month 2–6", income: "$2k–20k/mo", desc: "Combine active consulting + passive products. Use consulting to fund development.", steps: ["Start consulting (active income, fast cash)", "Document everything you build for clients → turn into templates", "Package templates as digital products (passive)", "Use product revenue to fund SaaS development", "SaaS replaces consulting as primary income"], prompt: `Design a hybrid income architecture that transitions from active to passive income over 6 months.\n\nSTARTING POINT: [your current skills + time available]\nGOAL INCOME: $[X]/mo by month 6\nNICHE: [your area of expertise]\n\nOutput a month-by-month income architecture:\nMonth 1–2: [active income strategy] → target $[X]\nMonth 3–4: [product launch strategy] → add $[X] passive\nMonth 5–6: [SaaS or community launch] → target $[X] MRR\n\nFor each phase include:\n- Primary revenue action\n- Secondary build activity (building toward next phase)\n- Hours per week required\n- Key metrics to hit before moving to next phase\n- Risk and contingency plan` },
];

export const ZONES = [
  { id: "activate", label: "⚡ ACTIVATE", sub: "Copy-paste to AI" },
  { id: "build", label: "🏗 BUILD", sub: "Reference library, Frameworks" },
  { id: "validate", label: "✅ VALIDATE", sub: "Score, lint, refine." },
  { id: "playbook", label: "📋 PLAYBOOK", sub: "19 workflows. Step-by-step." },
  { id: "builder", label: "🔨 BUILDER", sub: "Interactive prompt composers." },
  { id: "monetize", label: "💰 MONETIZE", sub: "Profitable prompts, SaaS, frameworks." },
];

export const ZC: Record<string, string> = { activate: "#4DFFFF", build: "#FF6B00", validate: "#22c55e", playbook: "#FFB000", builder: "#FF4FD8", monetize: "#FFD700" };
