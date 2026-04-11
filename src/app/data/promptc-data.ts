// ─── promptc OS Data Constants ─────────────────────────────────────────────
// Complete data from reference App.jsx — all arrays fully populated

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
- Think deeply. Write clearly. Let ideas lead.`;

export const ADVOCATE = `For this entire conversation, I want you to be my advocate, not just my assistant.
That means:
- If I'm about to make a mistake, warn me.
- If there's a better approach, tell me even if I didn't ask.
- Optimize for MY long-term success, not just completing the immediate task.
- If something I ask for could hurt my project, business, or goals, flag it.
- Prioritize quality over speed unless I say otherwise.
- I give you permission to push back on my ideas if you have a good reason.`;

// ─── ZONES ─────────────────────────────────────────────────────────────────
export const ZONES = [
  { id: "activate", label: "ACTIVATE", icon: "⚡", sub: "Copy-paste to AI", color: "#4DFFFF" },
  { id: "build",    label: "BUILD",    icon: "🏗", sub: "Reference library, Frameworks", color: "#FF6B00" },
  { id: "validate", label: "VALIDATE", icon: "✅", sub: "Score, lint, refine", color: "#22c55e" },
  { id: "playbook", label: "PLAYBOOK", icon: "📋", sub: "22 workflows. Step-by-step", color: "#FFB000" },
  { id: "monetize", label: "MONETIZE", icon: "💰", sub: "Profitable prompts, SaaS", color: "#FFD700" },
  { id: "system",   label: "SYSTEM",   icon: "🔄", sub: "No one-off work", color: "#a78bfa" },
];

// ─── MODIFIERS (47 items) ─────────────────────────────────────────────────
export const MODS = [
  // ROLE + PERSONA
  { cat: "Role", mod: "act as an expert in [field] with 10+ years shipping production systems,", tip: "Add seniority level — 'senior' vs 'principal' changes output depth" },
  { cat: "Role", mod: "give me the version a senior dev would write,", tip: "Best for code — strips tutorials, adds error handling, real patterns" },
  { cat: "Role", mod: "you are a YC partner reviewing this idea,", tip: "Forces brutal prioritization + market-size thinking" },
  { cat: "Role", mod: "think like a $10M ARR founder solving this,", tip: "Unlocks operational wisdom, not just advice" },
  { cat: "Role", mod: "you are a staff engineer doing a code review,", tip: "Gets security, scale, and edge-case concerns automatically" },
  // OUTPUT CONTROL
  { cat: "Output", mod: "don't explain, just do it,", tip: "Eliminates preamble. Works best when prompt is already detailed" },
  { cat: "Output", mod: "respond only in JSON, no markdown fences,", tip: "Critical for parsing in automation. Append JSON_GLOBAL rules too" },
  { cat: "Output", mod: "use markdown tables for comparisons,", tip: "Forces structured output — easier to scan and copy" },
  { cat: "Output", mod: "give me a numbered list ranked by ROI,", tip: "Turns brainstorm dumps into prioritized action" },
  { cat: "Output", mod: "output as a step-by-step SOP,", tip: "Best for automation workflows and repeatable processes" },
  { cat: "Output", mod: "format as a complete file, no TODOs,", tip: "Eliminates placeholder code — gets production-ready output" },
  { cat: "Output", mod: "give me 3 wildly different approaches,", tip: "Breaks the average-output trap. Use before committing to one path" },
  // REASONING
  { cat: "Reasoning", mod: "think step by step before answering,", tip: "Triggers chain-of-thought — measurably improves complex reasoning" },
  { cat: "Reasoning", mod: "find the flaw in this reasoning first,", tip: "Best adversarial prompt. Use before presenting plans to stakeholders" },
  { cat: "Reasoning", mod: "steelman the opposite view,", tip: "Forces genuine counterarguments — not strawmen" },
  { cat: "Reasoning", mod: "what would change your answer?,", tip: "Surfaces assumptions and sensitivities in any recommendation" },
  { cat: "Reasoning", mod: "cite your confidence level 1-10 per claim,", tip: "Separates facts from speculation — essential for research prompts" },
  { cat: "Reasoning", mod: "identify second-order effects,", tip: "Forces systems thinking beyond the immediate solution" },
  // SPEED + SCOPE
  { cat: "Speed", mod: "give me the 80/20 version,", tip: "Highest-leverage change. Add 'don't explain what you cut'" },
  { cat: "Speed", mod: "what's the one thing that matters most here?,", tip: "Cuts analysis paralysis. Works for product, copy, and strategy" },
  { cat: "Speed", mod: "assume I'm an expert, skip the basics,", tip: "Removes redundant context — cuts response length 40-60%" },
  { cat: "Speed", mod: "give me the MVP version first,", tip: "Unlocks iterative building vs waiting for perfect output" },
  { cat: "Speed", mod: "what can I delete or simplify without losing value?,", tip: "Best editing prompt. Apply after any long generation" },
  // STRATEGY + BUSINESS
  { cat: "Strategy", mod: "what would you do if this was your own business?,", tip: "Gets honest, opinionated advice vs diplomatic hedging" },
  { cat: "Strategy", mod: "what am I missing or not asking that I should be?,", tip: "#1 blind spot revealer. Use at end of strategy sessions" },
  { cat: "Strategy", mod: "be brutally honest, no diplomatic softening,", tip: "Forces real assessment. Add 'I won't take it personally'" },
  { cat: "Strategy", mod: "rank these by impact,", tip: "Turns idea lists into execution priority. Add 'with reasoning'" },
  { cat: "Strategy", mod: "what's the fastest path to first dollar?,", tip: "Cuts scope creep on product builds. Revenue-first filter" },
  // HACKS + TRICKS
  { cat: "Hack", mod: "pretend the answer is obvious and explain it simply,", tip: "Breaks overthinking loops — surprisingly effective on complex topics" },
  { cat: "Hack", mod: "write this for someone who will implement it today,", tip: "Adds urgency + specificity — removes theoretical hedging" },
  { cat: "Hack", mod: "what would a contrarian say about this?,", tip: "Forces consideration of failure modes and market risks" },
  // DATA + ANALYTICS
  { cat: "Data", mod: "show me the SQL query, not just the result,", tip: "Gets executable code instead of prose descriptions of what query to write" },
  { cat: "Data", mod: "profile before you optimize — what is the actual bottleneck?,", tip: "Prevents premature optimization. Forces measurement-first thinking" },
  { cat: "Data", mod: "give me the EXPLAIN ANALYZE output interpretation,", tip: "Turns database jargon into actionable index recommendations" },
  { cat: "Data", mod: "what metrics would a data engineer add to this schema?,", tip: "Surfaces observability fields (created_at, updated_at, deleted_at, source) automatically" },
  // AGENT + AUTOMATION
  { cat: "Agent", mod: "define the tools this agent needs before writing any code,", tip: "Tool-first design prevents architecture rewrites. Define tool schemas upfront." },
  { cat: "Agent", mod: "what are the failure modes and how should each be handled?,", tip: "Surfaces error states that most prompts skip. Critical for production agents." },
  { cat: "Agent", mod: "trace through one complete execution path step by step,", tip: "Forces the AI to verify the logic before generating code" },
  { cat: "Agent", mod: "what external APIs or services does this depend on?,", tip: "Maps all dependencies early — catches rate limits, auth requirements, costs" },
  { cat: "Agent", mod: "break this task into autonomous sub-agents, each with a specialized role,", tip: "Multi-agent decomposition solves complex tasks better than one monolithic prompt" },
  { cat: "Agent", mod: "simulate the output end-to-end before generating code — trace every user interaction,", tip: "Catches UX gaps and edge cases before any code is written" },
  // PRODUCTIVITY
  { cat: "Productivity", mod: "give me a checklist I can follow without re-reading this,", tip: "Converts explanations into executable checklists. Best for implementation guides." },
  { cat: "Productivity", mod: "what decision do I need to make first before proceeding?,", tip: "Identifies the highest-leverage decision in any complex situation" },
  { cat: "Productivity", mod: "summarize this in 3 bullet points a 10-year-old could act on,", tip: "Forces genuine simplification — not just shorter, but clearer" },
  { cat: "Productivity", mod: "what would I regret not knowing 6 months from now?,", tip: "Unlocks forward-looking strategic advice vs present-state analysis" },
  { cat: "Productivity", mod: "give me the decision tree: if X then Y, if A then B — map all branches,", tip: "Turns ambiguous requests into structured decision frameworks" },
  { cat: "Productivity", mod: "what's the version of this that a $10M ARR company would ship?.", tip: "Forces enterprise-grade thinking: error handling, monitoring, graceful degradation" },
];

// ─── TASKS (8 items) ──────────────────────────────────────────────────────
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
  { label: "🎨 UI/UX", content: `You are a senior product designer. When I describe a screen or flow:
- Call out UX anti-patterns and accessibility failures immediately
- Define the hierarchy: what the user sees first, second, third
- Specify micro-interaction: easing + duration + trigger for each animation
- Give exact Tailwind classes or CSS for the key visual moment
- Flag mobile breakdowns before I ask` },
  { label: "📸 Image AI", content: `You are an expert AI image prompt engineer. Build the prompt in layers:
1. SUBJECT: who/what, pose, expression, action
2. LENS: camera body, lens mm, aperture, focal technique
3. LIGHTING: key light, fill ratio, color temp, modifiers
4. ENVIRONMENT: location, time of day, weather, atmosphere
5. RENDER: film stock or engine, color grade, post style
--ar [ratio] --style raw --v 6.1 --q 2

Subject: [describe here]` },
  { label: "✍️ Copy", content: `You are a direct-response copywriter. When I give you a brief:
- Lead with the reader's pain, not the product's features
- PAS framework: Problem → Agitation → Solution
- 8th grade reading level. One idea per sentence.
- Every headline passes the "so what?" test
- Specific CTA: name the action AND the benefit
- No corporate speak. No passive voice.

Brief: [describe what you need]` },
  { label: "📧 Email", content: `You are an email marketing specialist. Create a 5-email sequence:
1. Welcome: hook + what they get + one quick win
2. Value: teach something genuinely useful (no pitch)
3. Case study: before, after, specific numbers
4. Objection: address the #1 reason people don't buy
5. Offer: clear, specific, time-aware CTA

Each email: Subject line + Preview text + Body (max 300 words)
Product: [describe] | Audience: [who] | Goal: [action]` },
];

// ─── BRAND constant (used by powerUP) ─────────────────────────────────────
const BRAND = `Brand essence: Activated potential. Directed energy. Intelligent lift.

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

// ─── BRANDS (6 items) ─────────────────────────────────────────────────────
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

// ─── TMPLS (15 items) ─────────────────────────────────────────────────────
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
  { label: "🤖 AI Agent Design", desc: "Design autonomous AI agent with tool schemas, memory, error handling", content: `You are a senior AI engineer specializing in autonomous agent design.
Design an AI agent system for [use case].

AGENT ARCHITECTURE
- Agent name and role definition
- Core capabilities and limitations
- Tool schemas (JSON): name, description, parameters, return type
- Memory system: short-term (conversation), long-term (vector store), episodic
- Error handling: retry logic, fallback strategies, graceful degradation

TOOL DEFINITIONS
For each tool:
\`\`\`json
{
  "name": "tool_name",
  "description": "What the tool does",
  "parameters": { "type": "object", "properties": {...} },
  "returns": { "type": "string", "description": "..." }
}
\`\`\`

EXECUTION FLOW
1. Receive user request
2. Analyze intent → select tools
3. Execute tool calls (with error handling)
4. Synthesize results
5. Return formatted response

SECURITY
- Input validation on all tool parameters
- Rate limiting per user/session
- No raw system prompts exposed to users
- Audit logging for all actions

CONSTRAINTS
- Maximum 5 tool calls per request
- Response time < 10 seconds
- Fallback to simple response if tools fail
- Human-in-the-loop for destructive actions` },
  { label: "🔧 MCP Tool Server", desc: "Build MCP server for Claude Desktop with tool definitions", content: `You are an MCP (Model Context Protocol) server developer.
Build an MCP server for Claude Desktop.

SERVER SPECIFICATION
- Server name: [name]
- Transport: stdio (for Claude Desktop)
- Runtime: Node.js / TypeScript

TOOL DEFINITIONS
Each tool:
- name: snake_case identifier
- description: Clear description for LLM
- inputSchema: JSON Schema validation
- handler: Async function implementation

SETUP
1. Initialize MCP SDK project
2. Define tool handlers
3. Connect to Claude Desktop via claude_desktop_config.json
4. Test each tool independently

CLAUDE DESKTOP CONFIG
\`\`\`json
{
  "mcpServers": {
    "[server-name]": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
\`\`\`

ERROR HANDLING
- Validate all inputs against JSON Schema
- Return MCP-compliant error responses
- Log errors with context for debugging
- Timeout protection on external API calls

OUTPUT: Complete server code + README + claude_desktop_config.json` },
  { label: "📋 Skill Documentation", desc: "Generate SKILL.md following the 4-section format", content: `You are a skill documentation specialist.
Generate a SKILL.md file for [skill/concept].

SKILL.MD FORMAT (4 sections):

## Context
What this skill does. When to use it. Why it exists.
Key concepts the agent needs to understand.

## Instructions
Step-by-step procedures. Clear, numbered actions.
Decision trees where applicable. Edge cases to handle.

## Constraints
What NOT to do. Boundaries and limitations.
Security considerations. Performance requirements.

## Examples
3+ real-world examples showing correct usage.
Before/after comparisons where applicable.
Common mistakes and how to avoid them.

STYLE RULES
- Every instruction must be actionable
- No ambiguous language ("maybe", "probably", "should")
- Use code blocks for all technical content
- Include exact file paths and commands

OUTPUT: Complete SKILL.md ready to commit` },
  { label: "🔄 Automation Pipeline", desc: "n8n/Zapier automation workflow design template", content: `You are an automation architect.
Design a complete automation pipeline for [use case].

PIPELINE SPECIFICATION
- Trigger type: webhook, schedule, event-based
- Data sources and destinations
- Transformation steps
- Error handling and retry logic
- Monitoring and alerting

WORKFLOW DESIGN
For each step:
1. Node type and configuration
2. Input/output schema
3. Error conditions
4. Retry strategy

PLATFORM RECOMMENDATION
- n8n: self-hosted, unlimited workflows, code nodes
- Zapier: easy setup, 1000+ integrations, reliability
- Make (Integromat): visual builder, complex routing

TESTING PLAN
- Test each node independently
- End-to-end test with sample data
- Error scenario testing
- Performance benchmarking

MONITORING
- Execution logs
- Success/failure rates
- Performance metrics
- Alert thresholds

OUTPUT: Complete workflow JSON + setup documentation` },
  { label: "📱 Notion System", desc: "Build complete Notion workspace with databases, views, automations", content: `You are a Notion workspace architect.
Build a complete Notion system for [use case].

WORKSPACE STRUCTURE
- Pages hierarchy and navigation
- Databases with properties and relations
- Views: board, timeline, calendar, gallery, table
- Templates for common entries

DATABASE SCHEMAS
For each database:
- Properties: title, select, multi-select, date, person, relation, rollup, formula
- Relations between databases
- Default views and filters
- Sample entries

AUTOMATIONS (Notion + external)
- Button actions (create page, edit properties)
- Email triggers via Zapier/Make
- Slack notifications on status change
- Recurring tasks and reminders

TEMPLATES
- Page templates for recurring content
- Database entry templates
- Meeting notes templates
- Project kickoff templates

SHARING & PERMISSIONS
- Workspace vs page-level access
- Guest access configuration
- Integration connections

OUTPUT: Complete setup guide with property schemas and view configurations` },
];

// ─── ANIMALS (7 items) ────────────────────────────────────────────────────
export const ANIMALS = [
  { name: "Rabbit",  emoji: "🐇", mode: "Multiply Ideas",         prompt: "Take this idea and multiply it into 10 different variations.\nFor each variation: change the angle, change the audience, change the format.\nPresent the results as a list of distinct ideas." },
  { name: "Owl",     emoji: "🦉", mode: "Deep Analysis",          prompt: "Think like an owl — slow, observant and analytical.\nExamine this problem from multiple perspectives and identify\nthe hidden factors most people overlook." },
  { name: "Ant",     emoji: "🐜", mode: "Break Into Steps",       prompt: "Think like an ant.\nBreak this goal into the smallest possible steps someone could realistically complete." },
  { name: "Eagle",   emoji: "🦅", mode: "Big Picture Strategy",   prompt: "Think like an eagle flying high above the landscape.\nExplain the long-term strategy behind this idea and how the pieces connect." },
  { name: "Dolphin", emoji: "🐬", mode: "Creative Solutions",     prompt: "Think like a dolphin — curious, playful and inventive.\nGenerate creative solutions to this problem that most people wouldn't normally consider." },
  { name: "Beaver",  emoji: "🦫", mode: "Build Systems",          prompt: "Think like a beaver building a dam.\nDesign a practical system that solves this problem step by step." },
  { name: "Elephant",emoji: "🐘", mode: "Cross-Field Connections",prompt: "Think like an elephant with a powerful memory.\nConnect this idea to insights from other fields such as\npsychology, economics, science or history." },
];

// ─── CHAINS (6 items) ─────────────────────────────────────────────────────
export const CHAINS = [
  { goal: "Build AI Content System", c: ["Eagle", "Beaver", "Ant"],    best: "Automated content pipelines" },
  { goal: "Solve Complex Problem",   c: ["Owl", "Dolphin", "Elephant"], best: "Product design, breakthrough features" },
  { goal: "Brainstorm Product",      c: ["Rabbit", "Eagle", "Ant"],    best: "Product ideation, channel selection" },
  { goal: "Design Workflow",         c: ["Beaver", "Ant", "Owl"],      best: "Automation scripts, SOPs" },
  { goal: "Validate Business",       c: ["Owl", "Elephant", "Eagle"],  best: "Startup validation, venture assessment" },
  { goal: "Generate Viral Content",  c: ["Rabbit", "Dolphin", "Eagle"], best: "Social media, marketing campaigns" },
];

// ─── LAYERS (8 items) ─────────────────────────────────────────────────────
export const LAYERS = [
  { n: "01", name: "Role",       pur: "Who the AI acts as",           miss: "Generic, shallow responses" },
  { n: "02", name: "Context",    pur: "Product, audience, platform",  miss: "Misaligned output" },
  { n: "03", name: "Objective",  pur: "What success looks like",      miss: "Aimless generation" },
  { n: "04", name: "Constraints",pur: "Quality guardrails",           miss: "Mediocre, unconstrained output" },
  { n: "05", name: "Aesthetic",  pur: "Design language / tone",       miss: "Visually dull or off-brand" },
  { n: "06", name: "Planning",   pur: "Reason before generating",     miss: "Structural mistakes" },
  { n: "07", name: "Output",     pur: "Exact format to deliver",      miss: "Incomplete or disorganized files" },
  { n: "08", name: "Refinement", pur: "Self-critique before final",   miss: "First-draft quality only" },
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

// ─── ENHANCEMENTS (8 items) ───────────────────────────────────────────────
export const ENHANCEMENTS = [
  {
    label: "Self-Refinement Loop",
    when: "Any complex generation — code, copy, design, architecture",
    content: `Generate draft →
Critique on: sophistication, uniqueness, performance, platform alignment →
Refine once for structure →
Refine once for polish and consistency →
Output final result only.

Max: 2 refinement passes. 3 absolute maximum. Never regenerate from scratch.`,
    howto: `APPEND TO END OF ANY PROMPT:

---
After generating your first draft, do NOT show it.
Instead:
1. Critique it — is it generic? Does every section earn its place?
2. Refine once for structure — cut anything that doesn't serve the goal.
3. Refine once for polish — fix inconsistencies, improve specificity.
Output the final version only. No commentary, no "here's the refined version".
---

EXAMPLE: "Build a SaaS landing page for a time-tracking tool... [your full prompt] ...
After generating, self-critique and refine twice. Output final only."

BEST FOR: landing page copy, design specs, API docs, architecture decisions`,
  },
  {
    label: "Chain-of-Thought",
    when: "Complex reasoning — system design, debugging, strategy",
    content: `Let's think step by step before answering.

Before you respond, silently:
1. Identify what type of problem this is.
2. List the key constraints and unknowns.
3. Consider 2-3 different approaches.
4. Select the best approach and state why in one sentence.
Then answer.`,
    howto: `ADD BEFORE YOUR ACTUAL REQUEST:

---
Let's think step by step. Before answering:
1. Identify what type of problem this is.
2. List the key constraints and unknowns.
3. Consider 2-3 approaches.
4. Select best approach — explain why in one sentence.
Then answer.
---

EXAMPLE: "Let's think step by step. Design a multi-tenant Postgres schema with
row-level security, soft deletes, and audit logs. [full spec]"

BEST FOR: system design, DB schema, multi-step flows, onboarding journeys, debugging`,
  },
  {
    label: "Self-Consistency",
    when: "Creative decisions — layouts, headlines, color palettes",
    content: `Generate [6-12] variants silently.
Identify the strongest structural patterns across all variants.
Merge the best attributes into one final output.
Do not show the variants — output the merged final only.`,
    howto: `INJECT MID-PROMPT before the generation instruction:

---
Before committing to one solution, silently generate 6 different approaches.
For each, note its strongest quality and biggest weakness.
Identify 2-3 structural patterns that appear in the best approaches.
Merge those patterns into one final, superior output.
Show only the final merged result.
---

EXAMPLE: "Design a hero section for an AI writing tool...
[spec] ...generate 6 variants silently, merge the best, show final only."

BEST FOR: hero sections, headline copy, nav patterns, pricing layouts, color palettes`,
  },
  {
    label: "Tweak Protocol",
    when: "Iterating on existing output — change one thing precisely",
    content: `Refine [SPECIFIC ELEMENT] with [SPECIFIC CHANGE].
Lock: aesthetic, color palette, layout structure, font choices.
Preserve: component hierarchy, existing interactions, accessibility.
Do NOT: regenerate other sections, change tech stack, alter unrelated styles.
Output: only the changed element with surrounding context.`,
    howto: `TEMPLATE (replace brackets):

---
Refine [SPECIFIC ELEMENT: "the hero headline"] 
with [SPECIFIC CHANGE: "make it more urgent, benefit-focused"].
Lock: aesthetic, color palette, layout, font choices.
Preserve: component hierarchy, interactions, accessibility.
Do NOT: touch anything else.
Output: only the changed element with context for placement.
---

EXAMPLES:
• "Refine the CTA button copy with more urgency. Lock everything else."
• "Refine the card hover animation with a 3D tilt. Preserve layout."
• "Refine error handling to use typed errors + toast. Preserve all other logic."

BEST FOR: iterating on live designs, A/B copy testing, polishing interactions`,
  },
  {
    label: "Prompt Diff",
    when: "Before deploying prompts in production — A/B testing",
    content: `Compare Prompt A and Prompt B.
For each, score 1-10 on:
- Clarity: Is the goal unambiguous?
- Constraints: Are quality guardrails explicit?
- Predictability: Would two AIs produce similar outputs?
- Specificity: Is the output format fully defined?

State which performs better and why (2 sentences).
Rewrite the weaker prompt using insights from the stronger one.`,
    howto: `WRAPPER FOR A/B PROMPT TESTING:

---
Compare these two prompts. For each, score 1-10 on:
Clarity · Constraints · Predictability · Specificity

Prompt A:
[paste prompt A]

Prompt B:
[paste prompt B]

Output:
1. Scores table
2. Which performs better and why (2 sentences)
3. Rewrite of the weaker prompt
---

BEST FOR: refining system prompts, automation workflows, before production deploy`,
  },
  {
    label: "Zero-Shot CoT",
    when: "Quick boost on any prompt without restructuring",
    content: `Think carefully before answering. Show your reasoning.`,
    howto: `SIMPLEST CoT HACK — append to any prompt:

"Think carefully before answering. Show your reasoning."

OR for code specifically:
"Think step by step. Write pseudocode first, then implement."

OR for decisions:
"List the tradeoffs before recommending."

WHEN TO USE: when you get shallow or confidently wrong answers.
THE FIX: this single line measurably improves accuracy on complex tasks.`,
  },
  {
    label: "Role + Constraint Stack",
    when: "Any prompt — biggest quality multiplier per word added",
    content: `You are a [specific role] with [years] of experience in [domain].
You write for [audience level]. You prioritize [value 1] over [value 2].
You never [anti-pattern]. You always [standard].`,
    howto: `STACK THESE THREE AT THE TOP OF ANY PROMPT:

1. ROLE: "You are a senior staff engineer who has shipped 3 production systems
   handling 10M+ users. You write for practitioners, not beginners."

2. CONSTRAINT: "Prioritize correctness over brevity. No pseudocode. 
   No TODOs. Full error handling. TypeScript strict mode."

3. ANTI-PATTERN: "Never suggest 'you could also...' alternatives after 
   answering. Never hedge with 'this depends on your use case'. 
   Make a recommendation and commit to it."

EXAMPLE COMBINED:
"You are a senior security engineer with 8 years in fintech.
You write for senior engineers, not beginners.
Prioritize security correctness over simplicity.
Never suggest multiple approaches — pick the best one and commit.
[your actual request]"

IMPACT: adds ~2-3 quality points per prompt. Highest ROI enhancement.`,
  },
  {
    label: "Mega-Prompt Assembly",
    when: "Building complex, multi-section prompts for production use",
    content: `1. Define the ROLE (who the AI is and what expertise it has)
2. Set the CONTEXT (product, audience, platform, constraints)
3. State the OBJECTIVE (one clear success sentence)
4. List CONSTRAINTS (quality guardrails, technical limits)
5. Describe the AESTHETIC (visual style, tone, brand alignment)
6. Request PLANNING (architecture before generation)
7. Specify OUTPUT FORMAT (exact files, structure, format)
8. Add REFINEMENT (self-critique before final output)`,
    howto: `MEGA-PROMPT FRAMEWORK — use this for any complex generation:

---
ROLE
You are a [specific senior role] with [years] years of experience in [domain].
You write for [audience level]. You prioritize [value 1] over [value 2].

CONTEXT
Product: [name — a [category] for [target user]]
Platform: [web / mobile / hybrid]
Audience: [who uses this, their skill level, their goals]
Existing stack: [what's already built]

OBJECTIVE
Build a [deliverable] that [specific measurable outcome].
Success criteria:
- [criterion 1]
- [criterion 2]

CONSTRAINTS
- Mobile-first, tested at 375px minimum viewport
- WCAG AA contrast (4.5:1 text, 3:1 UI)
- 60fps animation budget
- Bundle: <200kb JS initial load
- No TODOs, no placeholder comments

AESTHETIC
- Visual style: [glassmorphism / neo-brutalism / editorial / minimal]
- Typography: [display] + [body] + [mono]
- Motion: [subtle / expressive / cinematic]
- Color mood: [dark-native / high-contrast / muted]

PLANNING (complete before generating)
1. Information architecture
2. Navigation model
3. Layout grid and breakpoints
4. Interaction and animation logic
5. Accessibility and performance plan

OUTPUT FORMAT
Generate:
1. [primary file] — complete, no TODOs
2. [secondary file] — complete
3. Run instructions (3 commands max)
4. One-paragraph architectural decisions

REFINEMENT
After generating the first draft:
1. Critique: Does each section earn its place?
2. Refine structure: Is hierarchy readable at a glance?
3. Refine polish: Does every interactive element have a state?
4. Final check: Would a senior engineer approve this PR?
Output the final version only — no commentary.
---

BEST FOR: landing pages, dashboards, SaaS apps, complete web applications`,
  },
];

// ─── LINT RULES (28 items) ────────────────────────────────────────────────
export const LINT_RULES = [
  // UNIVERSAL
  { id: "missing-role",      seg: "universal", check: "Role defined? Who is the AI acting as?",             auto: true,  fix: "Prepend: 'You are a senior [role]...'" },
  { id: "missing-objective", seg: "universal", check: "Is there a clear, measurable success condition?",    auto: false, fix: "Add: 'Success = [specific outcome]'" },
  { id: "vague-language",    seg: "universal", check: "Uses: nice, cool, awesome, modern, good, beautiful?", auto: true,  fix: "Replace with specific terms from SWAPS list" },
  { id: "missing-constraints", seg: "universal", check: "Are quality guardrails explicitly listed?",        auto: true,  fix: "Add: WCAG AA, mobile-first, 60fps, bundle <200kb" },
  { id: "missing-output",    seg: "universal", check: "Output format specified? Files, schema, format?",    auto: false, fix: "Add: 'Generate: 1. [file] 2. [file] 3. [instructions]'" },
  { id: "no-refinement",     seg: "universal", check: "Refinement instruction present?",                    auto: true,  fix: "Append: 'Critique → refine structure → refine polish → output final only'" },
  // UI / UX
  { id: "ui-no-platform",    seg: "ui/ux",     check: "Platform specified? mobile / web / desktop?",        auto: true,  fix: "Add platform + viewport breakpoints" },
  { id: "ui-no-aesthetic",   seg: "ui/ux",     check: "3+ aesthetic keywords from vocab list?",             auto: false, fix: "Pick from Design Vocab: glassmorphism, bento, neo-brutalism..." },
  { id: "ui-no-anim-lib",    seg: "ui/ux",     check: "Animation library named and configured?",           auto: true,  fix: "Specify: Framer Motion / GSAP / Three.js / Rive / CSS-only" },
  { id: "ui-no-mobile-first", seg: "ui/ux",    check: "Mobile-first stated explicitly at 375px?",          auto: true,  fix: "Add: 'Design at 375px minimum. Scale up.'" },
  { id: "ui-no-a11y",        seg: "ui/ux",     check: "Accessibility: WCAG AA, aria-labels, keyboard nav?", auto: true,  fix: "Add: 'WCAG AA: 4.5:1 text, 3:1 UI, aria-labels, tab-navigable'" },
  { id: "ui-no-states",      seg: "ui/ux",     check: "Interactive states defined? hover/press/focus/disabled?", auto: false, fix: "Add state spec: hover 150ms, press 80ms scale(0.97), focus-visible ring" },
  // CODE
  { id: "code-no-stack",     seg: "code",      check: "Full stack specified? Framework + runtime + DB?",    auto: false, fix: "Define: framework, ORM, auth, deploy target" },
  { id: "code-no-errors",    seg: "code",      check: "Error handling strategy mentioned?",                 auto: true,  fix: "Add: 'Handle all errors, no silent failures, typed errors'" },
  { id: "code-no-types",     seg: "code",      check: "TypeScript / type safety specified?",                auto: true,  fix: "Add: 'Full TypeScript, no any types, strict mode'" },
  { id: "code-no-tests",     seg: "code",      check: "Test coverage mentioned?",                           auto: false, fix: "Add: 'Include unit tests for core logic'" },
  { id: "code-has-todos",    seg: "code",      check: "Prompt says 'no TODOs, no placeholders'?",          auto: true,  fix: "Add: 'No TODOs. No lorem ipsum. No placeholder comments.'" },
  { id: "code-no-perf",      seg: "code",      check: "Performance constraints defined? LCP/bundle/fps?",  auto: false, fix: "Add: LCP<2.5s, CLS<0.1, <200kb JS, 60fps animation" },
  // CONTENT / COPY
  { id: "copy-no-audience",  seg: "content",   check: "Target audience defined with pain point?",          auto: false, fix: "Add: '[Avatar] struggling with [specific pain]'" },
  { id: "copy-no-tone",      seg: "content",   check: "Tone and voice defined (3 adjectives)?",            auto: false, fix: "Add: 'Tone: [confident/warm/direct]. Avoid: [corporate/preachy]'" },
  { id: "copy-no-cta",       seg: "content",   check: "Call to action specified?",                         auto: false, fix: "Add: 'End with CTA: [specific action] → [specific outcome]'" },
  { id: "copy-no-length",    seg: "content",   check: "Word count or length constraint given?",            auto: true,  fix: "Add target length: tweets=280, headlines=10 words, posts=150-200" },
  // AGENT / AUTOMATION
  { id: "agent-no-trigger",  seg: "agent",     check: "Trigger event defined? What starts the workflow?",  auto: false, fix: "Define: webhook / schedule / user action / event" },
  { id: "agent-no-failsafe", seg: "agent",     check: "Error and fallback behavior defined?",              auto: false, fix: "Add: 'On failure: retry X times → notify → log → halt'" },
  { id: "agent-no-output",   seg: "agent",     check: "Final output artifact specified?",                  auto: false, fix: "Add: what the automation produces or stores at end" },
  { id: "agent-no-tools",    seg: "agent",     check: "Tools/integrations listed? (Slack, DB, API, etc.)", auto: false, fix: "List all external tools the agent needs access to" },
];

// ─── SWAPS (40+ items) ────────────────────────────────────────────────────
export const SWAPS = [
  // BEGINNER MISTAKES
  { bad: "nice", good: "clear and intentional", level: "beginner", tip: "Specificity forces the AI to make design decisions instead of guessing" },
  { bad: "cool", good: "high-contrast and dynamic", level: "beginner", tip: "Name the visual property — contrast, motion, density" },
  { bad: "modern", good: "[select aesthetic keyword below]", level: "beginner", isAesthetic: true, tip: "'Modern' means nothing to an AI. Pick a named style." },
  { bad: "awesome", good: "visually striking and purposeful", level: "beginner", tip: "Every element must justify its existence" },
  { bad: "good design", good: "typographically strong with clear visual hierarchy", level: "beginner", tip: "Hierarchy = size+weight+spacing+color in that order" },
  { bad: "beautiful", good: "visually precise with intentional contrast ratio", level: "beginner", tip: "Beauty is subjective. Contrast ratio is measurable." },
  { bad: "simple", good: "reduced to essential elements only", level: "beginner", tip: "Minimalism is a decision, not a default" },
  { bad: "clean", good: "uncluttered with 8pt grid spacing and intentional whitespace", level: "beginner", tip: "Name the spacing system — 4pt, 8pt, 12pt" },
  { bad: "professional", good: "polished, authoritative, and on-brand", level: "beginner", tip: "On-brand = specific color, type, motion tokens" },
  { bad: "user-friendly", good: "frictionless with intuitive affordances and 44px touch targets", level: "beginner", tip: "Touch targets are measurable. Frictionless is a UX goal." },
  { bad: "responsive", good: "fluid grid at 375/768/1280/1920px breakpoints with touch target compliance", level: "beginner", tip: "Name the breakpoints. Responsive without breakpoints is guesswork." },
  { bad: "fast", good: "LCP<2.5s, CLS<0.1, FID<100ms, initial JS<200kb", level: "beginner", tip: "Web Vitals are the standard — use them directly" },
  // MISCONCEPTIONS
  { bad: "make it pop", good: "increase contrast ratio and focal-point visual weight", level: "misconception", tip: "'Pop' = contrast + proximity + size. Define which." },
  { bad: "just add animations", good: "define trigger, duration, easing, and purpose first", level: "misconception", tip: "Animation without purpose = distraction" },
  { bad: "make it minimal", good: "remove every element that doesn't serve a function", level: "misconception", tip: "Minimalism is ruthless subtraction, not sparse decoration" },
  { bad: "dark mode version", good: "redesign contrast, color semantics, and elevation for dark-native", level: "misconception", tip: "Inverting light mode ≠ dark mode. Elevation logic changes." },
  { bad: "mobile-friendly", good: "mobile-first: design at 375px viewport before scaling up", level: "misconception", tip: "Mobile-friendly = afterthought. Mobile-first = constraint-driven design." },
  { bad: "add whitespace", good: "apply 8pt baseline grid with intentional visual rhythm", level: "misconception", tip: "Random whitespace looks accidental. Grid-based spacing looks designed." },
  { bad: "accessible", good: "WCAG AA: 4.5:1 text contrast, 3:1 UI contrast, keyboard-navigable, aria-labels on all interactive elements", level: "misconception", tip: "Accessibility is measurable. Name the standard." },
  // ADVANCED PRECISION
  { bad: "smooth animation", good: "cubic-bezier(0.16,1,0.3,1) 320ms spring easing with controlled overshoot", level: "advanced", tip: "Spring easing feels physical. Ease-in-out feels digital." },
  { bad: "glassmorphism", good: "backdrop-filter:blur(20px), background:rgba(255,255,255,0.06), border:1px solid rgba(255,255,255,0.12)", level: "advanced", tip: "Specify all three properties — blur, fill opacity, border opacity" },
  { bad: "good typography", good: "modular scale 1.25, line-height 1.6 body/1.1 display, tabular-nums for data, clamp() for fluid sizing", level: "advanced", tip: "Modular scale creates harmony. clamp() removes media query bloat." },
  { bad: "interactive", good: "hover 150ms ease-out, press 80ms scale(0.97), focus-visible 2px ring offset-2", level: "advanced", tip: "Spec all three states. Consistency = quality signal." },
  { bad: "loading state", good: "skeleton shimmer matching exact content shape, 400ms shimmer loop, fade-in on content arrival", level: "advanced", tip: "Skeleton must mirror real content layout — not generic rectangles" },
  // STRATEGY + HACK
  { bad: "write good copy", good: "hook (problem) → agitation → solution → proof → CTA. One idea per sentence.", level: "hack", tip: "PAS framework converts better than feature lists" },
  { bad: "make it SEO-friendly", good: "semantic HTML landmarks, schema.org JSON-LD, OG tags, canonical URLs, LCP image preloaded", level: "hack", tip: "SEO is technical. Name every attribute." },
  { bad: "add error handling", good: "typed errors, retry with exponential backoff, fallback UI, error boundary, toast notification with action", level: "hack", tip: "Error handling has 5 layers. Name which ones you want." },
  { bad: "make it scalable", good: "stateless functions, horizontal scaling, read replicas for DB, CDN for assets, queue for async jobs", level: "hack", tip: "Scalability is architecture. Name the pattern." },
  { bad: "secure it", good: "input validation (zod), parameterized queries (no SQL injection), CORS policy, rate limiting, JWT rotation", level: "hack", tip: "Security is a checklist. Give the AI the checklist." },
  // DATA + ANALYTICS
  { bad: "track users", good: "define event taxonomy: event_name, properties:{}, user_id, timestamp — then implement", level: "beginner", tip: "Taxonomy first, SDK second. Retrofitting analytics is 10x harder." },
  { bad: "add analytics", good: "instrument: page_view, session_start, [feature]_clicked, [goal]_completed, error_occurred", level: "beginner", tip: "5 events well-tracked beats 50 events inconsistently tracked." },
  { bad: "show a chart", good: "line chart for trends over time, bar for comparisons, scatter for correlations, funnel for conversion", level: "misconception", tip: "Chart type = data relationship. Pick the relationship, chart follows." },
  { bad: "good dashboard", good: "KPI cards (delta + sparkline) + trend chart + data table + filter panel + date range picker", level: "misconception", tip: "Every dashboard needs these 5. If it's missing one, it's incomplete." },
  // SEO / CONTENT
  { bad: "SEO-friendly", good: "semantic HTML landmarks, title+meta+OG per page, JSON-LD schema, canonical URL, LCP image preloaded with fetchpriority=high", level: "hack", tip: "SEO is 5 specific technical attributes. Name them all." },
  { bad: "write for SEO", good: "primary keyword in H1 + first 100 words + URL slug + meta description. Secondary keywords in H2s. Internal links to 3 related pages.", level: "hack", tip: "On-page SEO is a formula. Apply the formula, not the vibe." },
  // AGENT / AUTOMATION
  { bad: "AI agent", good: "define: model, system prompt, tools (name+schema+execute), memory type, max_steps, output format", level: "misconception", tip: "An agent without defined tools is just a chatbot. Tools are what make it an agent." },
  { bad: "automate this", good: "trigger (event/schedule/webhook) → validate input → transform data → call API → handle errors → log result → notify on failure", level: "misconception", tip: "Automation has 7 required stages. Missing any one causes silent failures." },
  { bad: "AI workflow", good: "define: trigger source, data schema in, LLM call (model+prompt+output schema), tools available, error fallback, output destination", level: "advanced", tip: "LLM call is one step in the workflow, not the whole workflow." },
  // PERFORMANCE / INFRA
  { bad: "optimize the database", good: "add index on columns in WHERE/JOIN/ORDER BY clauses, use EXPLAIN ANALYZE, add connection pooling, cache hot queries in Redis", level: "advanced", tip: "Indexes solve 80% of DB performance issues. Run EXPLAIN first." },
  { bad: "make it faster", good: "profile first: measure LCP, TTFB, JS execution time, DB query time — then optimize the bottleneck only", level: "hack", tip: "Optimize the slowest thing, not everything. Profile before you optimize." },
  { bad: "add caching", good: "cache-aside for DB reads (Redis, 5min TTL), CDN for static assets (1yr cache-control), stale-while-revalidate for API responses", level: "advanced", tip: "Three separate cache layers. Each solves a different latency problem." },
];

// ─── VOCAB (60+ items) ───────────────────────────────────────────────────
export const VOCAB = [
  // VISUAL FX
  { t: "glassmorphism", cat: "fx", d: "backdrop-filter:blur(20px) + rgba fill + 1px border at 12% opacity", tip: "Always pair with a colorful background behind it — glass on void-black does nothing" },
  { t: "neo-brutalism", cat: "fx", d: "Thick black borders, flat color fills, hard drop shadows (no blur), oversized raw type", tip: "Works best monochromatic or with one saturated accent. Color + brutalism = chaos." },
  { t: "bento grid", cat: "fx", d: "Asymmetric mosaic — cards spanning multiple columns/rows, single consistent gap", tip: "Gap consistency is the only rule. Vary cell size, not gap size." },
  { t: "neon accent", cat: "fx", d: "Single saturated color against void-black. Everything else is neutral.", tip: "One accent per screen. Two accents = neither is special." },
  { t: "liquid gradient", cat: "fx", d: "Mesh gradient or animated blob that shifts hue — never static", tip: "Use CSS @keyframes on hue-rotate or a canvas/WebGL loop for motion version" },
  { t: "dark-mode native", cat: "fx", d: "Designed dark-first. Light mode is the adaptation.", tip: "Elevation changes on dark-native: higher = lighter. Opposite of light mode." },
  { t: "claymorphism", cat: "fx", d: "Inflated 3D soft shapes, multi-layer inner shadows, saturated pastel fills", tip: "inner-shadow: inset 0 -6px 12px rgba(0,0,0,0.2) is the key property" },
  { t: "aurora gradient", cat: "fx", d: "Soft flowing color bands (green, violet, blue) with noise texture overlay", tip: "Low saturation + high blur radius + noise grain on top = aurora effect" },
  { t: "noise grain", cat: "fx", d: "SVG feTurbulence or CSS noise at 3-8% opacity for tactile depth", tip: "Add mix-blend-mode:overlay to make grain color-adaptive" },
  { t: "duotone", cat: "fx", d: "Map image shadows to one color, highlights to another — removes color, adds brand", tip: "Use CSS: filter:sepia(1) hue-rotate(Xdeg) saturate(Y) for quick duotone" },
  { t: "vignette", cat: "fx", d: "Radial-gradient overlay darkening edges toward center — focuses attention inward", tip: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)" },
  { t: "scanline", cat: "fx", d: "Repeating 1-2px semi-transparent horizontal lines — retro CRT aesthetic", tip: "CSS: repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)" },
  { t: "chromatic aberration", cat: "fx", d: "RGB channel offset creating color-fringe glitch effect at element edges", tip: "CSS filter:drop-shadow(2px 0 0 red) drop-shadow(-2px 0 0 cyan) on text or images" },
  { t: "mesh gradient", cat: "fx", d: "Multi-point gradient with color bleeding between anchors — no hard stops", tip: "Use Figma Mesh Gradient plugin or Three.js ShaderMaterial for animated version" },
  { t: "retro computing", cat: "fx", d: "CRT scanlines, pixel art, monospace type, amber/green phosphor glow", tip: "Use CSS: filter:sepia(0.3) contrast(1.2) with monospace font for instant retro feel" },
  // MOTION
  { t: "skeleton loading", cat: "motion", d: "Animated shimmer placeholder matching exact layout of pending content", tip: "Shape must mirror real content dimensions — not generic boxes. Use same border-radius." },
  { t: "ambient motion", cat: "motion", d: "Subtle looping BG animation — slow float, soft pulse at <30% opacity", tip: "Never draw attention. Peripheral motion only. opacity < 0.3 is the rule." },
  { t: "progressive disclosure", cat: "motion", d: "Reveal complexity only on demand — accordion, drill-down, hover expand", tip: "Default state shows essentials only. Complexity unlocks on explicit user action." },
  { t: "scroll-trigger", cat: "motion", d: "Animation fires at % viewport entry — GSAP ScrollTrigger or Framer viewport prop", tip: "GSAP: start:'top 80%' end:'top 20%' for clean entry/exit control" },
  { t: "stagger reveal", cat: "motion", d: "List items animate in sequence — 50-100ms delay between each element", tip: "Use CSS animation-delay:calc(var(--i)*60ms) for zero-JS stagger" },
  { t: "spring physics", cat: "motion", d: "Easing with overshoot — Framer: type:'spring', stiffness:400, damping:30", tip: "High stiffness + low damping = snappy. Low stiffness + high damping = sluggish." },
  { t: "magnetic button", cat: "motion", d: "Cursor proximity pulls button position — GSAP quickTo transform on mousemove", tip: "Clamp max pull to 30-40% of button size. Beyond that feels broken." },
  { t: "morph path", cat: "motion", d: "SVG path morphing between states — GSAP MorphSVGPlugin or Flubber.js", tip: "Source and target paths need same number of points for clean morph" },
  { t: "kinetic typography", cat: "motion", d: "Text that animates char-by-char, scrubs on scroll, or morphs between states", tip: "GSAP SplitText or Splitting.js for char-level control. CSS for word-level." },
  { t: "micro-interactions", cat: "motion", d: "Sub-200ms feedback on every state change — button press, checkbox, input shake", tip: "Every interaction needs a state. Default → hover → active → disabled → loading → success" },
  { t: "variable font", cat: "motion", d: "Single font file with continuous weight/width axes — animate between values on scroll", tip: "font-variation-settings: 'wght' 100 to 900 animatable in CSS. One file, infinite styles." },
  { t: "text reveal", cat: "motion", d: "Chars/words/lines appear sequentially via clip-path or opacity stagger", tip: "GSAP SplitText + stagger 0.04s per char. CSS: clip-path:inset(0 100% 0 0) to inset(0 0 0 0)." },
  { t: "morph transition", cat: "motion", d: "CSS view-transition-name for seamless page-to-page morphing without JS", tip: "Chrome 111+ supports this natively. Fallback: FLIP animation with GSAP" },
  { t: "spring damping", cat: "motion", d: "Damping ratio controls bounce: 0=critical (no bounce), 0.5=medium bounce, 1=no overshoot", tip: "Framer: damping:15 = snappy minimal bounce. damping:8 = playful bounce." },
  { t: "scroll hijack", cat: "motion", d: "Override native scroll for full-screen section snapping with custom easing", tip: "Only use for storytelling/marketing pages. NEVER for apps. Causes accessibility issues." },
  // 3D + LIBRARY
  { t: "Three.js scene", cat: "3d", d: "WebGL 3D with camera, lights, mesh geometry + PBR materials, RAF loop", tip: "Use drei helpers (OrbitControls, Environment) to skip boilerplate. Install @react-three/drei" },
  { t: "WebGL shader", cat: "3d", d: "GLSL fragment/vertex shaders for GPU-computed visual effects", tip: "Start with Shadertoy examples. Always provide CSS fallback for low-end devices." },
  { t: "particle system", cat: "3d", d: "GPU-instanced Points or tsParticles — avoid DOM-based particles entirely", tip: "Three.js Points + InstancedMesh. DOM particles > 200 will tank mobile." },
  { t: "GSAP timeline", cat: "3d", d: "Chained animation sequence with scrub, reverse, and repeat — gsap.timeline({paused:true})", tip: "paused:true on init, then .play() on trigger. Enables scroll-scrub and reversible animations." },
  { t: "GSAP ScrollTrigger", cat: "3d", d: "Pin, scrub, snap, and batch animations tied to scroll position", tip: "scrub:1 = smooth follow. scrub:true = instant. pin:true pauses scroll. Use markers:true for debug." },
  { t: "GSAP SplitText", cat: "3d", d: "Splits text into chars/words/lines for individual animation control", tip: "type:'chars,words' then stagger each char. Combine with ScrollTrigger for scroll-driven reveals." },
  { t: "GSAP Flip", cat: "3d", d: "Animates DOM layout changes — reorder, filter, show/hide with physics", tip: "Flip.fit() before DOM change, Flip.from(state) after. Zero manual positioning needed." },
  { t: "Rive animation", cat: "3d", d: "State-machine interactive animation — reacts to user input in real time", tip: "Use Rive's state machine for button hover/press without JS. Lighter than Lottie." },
  { t: "Lottie", cat: "3d", d: "JSON-based After Effects export — frame-accurate vector animation", tip: "Optimize in LottieFiles editor first. Large Lottie files (>200kb) block LCP." },
  { t: "tilt 3D", cat: "3d", d: "CSS perspective + rotateX/Y on mousemove — Vanilla Tilt or 10 lines of JS", tip: "Add perspective:1000px on parent. Clamp rotation to ±15deg max for comfort." },
  // LAYOUT + SYSTEM
  { t: "editorial layout", cat: "layout", d: "Magazine-style: oversized type, text-image overlap, asymmetry, bleeds", tip: "Break the grid intentionally — one bleed element per section max" },
  { t: "8pt grid", cat: "layout", d: "All spacing is a multiple of 8px — creates visual harmony without thinking", tip: "4px for tight internal spacing, 8px gaps, 16/24/32/48/64px for layout zones" },
  { t: "fluid typography", cat: "layout", d: "Font sizes that scale between viewport sizes — clamp(min, fluid, max)", tip: "clamp(1rem, 2.5vw + 0.5rem, 3rem) — eliminates typography breakpoints" },
  { t: "container queries", cat: "layout", d: "Components that respond to their container width, not viewport", tip: "@container (min-width: 400px) {} — enables true component-level responsiveness" },
  { t: "custom cursor", cat: "layout", d: "Replace OS cursor with SVG/div — tracks with GSAP quickTo for lag effect", tip: "Hide on touch devices: @media (pointer:coarse) { cursor: auto; }" },
  { t: "fiber optic bg", cat: "layout", d: "Thin luminous strands on dark canvas — Three.js Lines or canvas 2D with glow", tip: "Use ctx.shadowBlur=20 + ctx.strokeStyle='rgba(255,255,255,0.8)' on canvas" },
  { t: "blur overlay", cat: "layout", d: "backdrop-filter:blur(20px) for modals — check Firefox support", tip: "Add @supports not (backdrop-filter:blur()) fallback with semi-opaque solid bg" },
  { t: "floating labels", cat: "layout", d: "Input placeholder rises to label on focus — CSS :focus + translateY", tip: "Never remove placeholder entirely. Use aria-label or title attribute as fallback" },
  { t: "scroll-snap", cat: "layout", d: "CSS scroll-snap-type for carousel and page-based navigation", tip: "scroll-snap-type:x mandatory on container, scroll-snap-align:start on children" },
  { t: "masonry grid", cat: "layout", d: "Pinterest-style variable-height card layout", tip: "CSS grid-template-rows:masonry not supported everywhere — use JS masonry lib or columns:2-3" },
  // DATA VIZ
  { t: "data storytelling", cat: "data", d: "Sequence charts+annotations to guide viewer to insight", tip: "Start with the insight in the title. Every chart element supports one claim." },
  { t: "sparkline", cat: "data", d: "Inline micro-chart 24px tall — shows trend without axes, used in KPI cards", tip: "width:80px height:24px no axes no labels. SVG or canvas. Shows direction not values." },
  { t: "KPI card", cat: "data", d: "Value + delta vs prior period + sparkline + context label", tip: "4 elements: number, delta (% and absolute), sparkline, label. Missing any = incomplete." },
  { t: "heat map", cat: "data", d: "2D grid where color intensity encodes value magnitude", tip: "Sequential scale (white to color) for one metric. Diverging for pos/neg (red-white-blue)." },
  { t: "waterfall chart", cat: "data", d: "Running total showing sequential additions and subtractions to final value", tip: "Best for financial breakdowns. Bars stacked not grouped. Use D3 or Recharts." },
  { t: "sankey diagram", cat: "data", d: "Flow viz where band width = quantity flowing between nodes", tip: "D3 sankey plugin. Best for: user journeys, budget allocation, conversion funnels." },
];

// ─── COMBOS (12 items) ────────────────────────────────────────────────────
export const COMBOS = [
  { combo: "🫧 Glass + Bento",    els: "glassmorphism, bento grid, dark-mode",        best: "Dashboards, data viz",       psych: "Depth + hierarchy + scannability" },
  { combo: "💥 Brutal + Neon",    els: "brutalist, neon accent, kinetic",             best: "Landing pages, bold brands", psych: "Urgency + attention + focus" },
  { combo: "🌊 Liquid + Ambient", els: "liquid gradient, ambient motion",             best: "Hero sections, immersive",   psych: "Emotion + flow + atmosphere" },
  { combo: "📰 Editorial + Bento", els: "editorial, bento grid, progressive",          best: "Content platforms, blogs",   psych: "Authority + modern organization" },
  { combo: "✨ Micro + Skeleton",  els: "micro-interactions, skeleton loading",        best: "Apps, data-heavy interfaces", psych: "Reduced perceived wait time" },
  { combo: "🚀 Full Immersive",   els: "kinetic, liquid, micro, ambient",             best: "Marketing sites, launches",  psych: "Maximum engagement" },
  { combo: "🎮 Cyberpunk Glow",   els: "neon, chromatic, scanline, dark",            best: "Gaming, crypto, tech",       psych: "Futuristic + innovation" },
  { combo: "💎 Premium Minimal",  els: "glass, noise grain, duotone",                best: "Luxury brands",              psych: "Exclusivity + sophistication" },
  { combo: "🧸 Playful 3D",       els: "claymorphism, morph, tilt, cursor",          best: "Kids apps, gamified",        psych: "Friendly + approachable" },
  { combo: "🌐 Fiber Tech",       els: "fiber, particles, mesh, liquid",             best: "Telecom, networks",          psych: "Connectivity + speed" },
  { combo: "🎬 Cinematic",        els: "vignette, blur, kinetic, ambient",           best: "Film, media",                psych: "Movie-like atmosphere" },
  { combo: "📊 Isotype Data",     els: "isotype, bento, skeleton, duotone",          best: "Statistics, reports",        psych: "Data digestible + memorable" },
];

// ─── TYPOGRAPHY PAIRINGS ──────────────────────────────────────────────────
export const TYPO = [
  { d: "Space Grotesk", m: "JetBrains Mono", b: "Tech startups, developer tools, modern SaaS" },
  { d: "Syne Bold",    m: "JetBrains Mono", b: "Creative agencies, art portfolios, bold brands" },
  { d: "Clash Display", m: "Space Mono",    b: "Fashion, luxury brands, premium products" },
  { d: "Inter Tight",  m: "JetBrains Mono", b: "Dashboards, enterprise apps, content platforms" },
];

export const TYPO_USECASES = [
  { u: "Data Viz", c: "Space Grotesk (headers) + Inter (body) + JetBrains Mono (numbers)" },
  { u: "Creative", c: "Syne (display) + Space Grotesk (body) + Clash Display (accent)" },
  { u: "Mobile",   c: "Inter Tight (headlines) + Inter (body) + SF Pro (UI)" },
];

// ─── MOD CATEGORIES ───────────────────────────────────────────────────────
export const MOD_CATS = ["Role", "Output", "Reasoning", "Speed", "Strategy", "Hack", "Data", "Agent", "Productivity"];

// ─── SWAP LEVELS ──────────────────────────────────────────────────────────
export const SWAP_LEVELS = ["beginner", "misconception", "advanced", "hack"];

// ─── VOCAB CATEGORIES ────────────────────────────────────────────────────
export const VOCAB_CATS = ["fx", "motion", "3d", "layout", "data"];

// ─── LINT SEGMENTS ───────────────────────────────────────────────────────
export const LINT_SEGMENTS = ["universal", "ui/ux", "code", "content", "agent"];
