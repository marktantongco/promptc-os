import { useState, useCallback } from "react";

const FONT_CSS=`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#0B0D10}::-webkit-scrollbar-thumb{background:#ffffff18;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#ffffff30}
@keyframes fadeSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes popIn{from{opacity:0;transform:scale(0.94)}to{opacity:1;transform:scale(1)}}
@keyframes shimmerIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@keyframes zoneEnter{from{opacity:0;transform:translateY(8px) scale(0.99)}to{opacity:1;transform:none}}
@keyframes ripple{0%{transform:scale(0);opacity:0.5}100%{transform:scale(3);opacity:0}}
@keyframes copyFlash{0%{background:#22c55e30}50%{background:#22c55e15}100%{background:transparent}}
@keyframes glowPulse{0%,100%{opacity:1}50%{opacity:0.7}}
.anim-zone{animation:zoneEnter 0.3s cubic-bezier(0.16,1,0.3,1)}
.anim-pop{animation:popIn 0.2s cubic-bezier(0.16,1,0.3,1)}
.anim-slide{animation:fadeSlide 0.25s cubic-bezier(0.16,1,0.3,1)}
.anim-shimmer{animation:shimmerIn 0.2s cubic-bezier(0.16,1,0.3,1)}
button{transition:all 0.15s cubic-bezier(0.16,1,0.3,1)}
button:hover{filter:brightness(1.15)}
button:active{transform:scale(0.97)!important;transition-duration:80ms}
*:focus-visible{outline:2px solid #4DFFFF;outline-offset:2px;border-radius:4px}
.skeleton{background:linear-gradient(90deg,#ffffff08 25%,#ffffff15 50%,#ffffff08 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:8px}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}
`;

function fallbackCopy(text){const el=document.createElement("textarea");el.value=text;el.style.cssText="position:fixed;top:-9999px;opacity:0";document.body.appendChild(el);el.focus();el.select();try{document.execCommand("copy");}catch(e){}document.body.removeChild(el);}
function useCopy(){return useCallback((text)=>{if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).catch(()=>fallbackCopy(text));}else{fallbackCopy(text);}},[]); }

const C = {
  bg:"#0B0D10", sur:"#14161A", bdr:"#ffffff12", bdrH:"#ffffff25",
  tx:"#FFFFFF", mu:"#a1a1aa", di:"#6b7280", fa:"#4b5563",
  cy:"#4DFFFF", vi:"#FF6B00", mg:"#FF4FD8", am:"#FFB000",
  gn:"#22c55e", bl:"#38bdf8", or:"#f97316", rd:"#ef4444", vt:"#7C5CFF",
  mn:"'DM Mono','JetBrains Mono',monospace",
  ss:"'DM Sans',system-ui,sans-serif",
  hd:"'Bebas Neue',sans-serif",
};
const ZC={activate:C.cy,build:C.vi,playbook:C.am,monetize:C.mg,validate:C.gn,meta:C.bl};
const AC={Eagle:C.am,Beaver:C.vi,Ant:C.mg,Owl:C.cy,Rabbit:C.gn,Dolphin:C.bl,Elephant:C.or};
const AE={Eagle:"🦅",Beaver:"🦫",Ant:"🐜",Owl:"🦉",Rabbit:"🐇",Dolphin:"🐬",Elephant:"🐘"};

const ZONES=[
  {id:"activate",label:"⚡ ACTIVATE",sub:"Copy-paste to AI",tier:1},
  {id:"build",   label:"🏗 BUILD",   sub:"Composers, Frameworks, Reference, Tools",tier:2},
  {id:"playbook",label:"📋 PLAYBOOK",sub:"22 workflows. Step-by-step.",tier:2},
  {id:"monetize",label:"💰 MONETIZE",sub:"Deploy stacks, Tools, AI providers",tier:2},
  {id:"validate",label:"✅ VALIDATE",sub:"Score, lint, swaps, refine.",tier:3},
  {id:"meta",    label:"🔄 META",    sub:"Optimize prompts. Self-improve.",tier:3},
];

const MASTER=`You are my expert AI assistant, business partner, and creative strategist.
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

const ADVOCATE=`For this entire conversation, I want you to be my advocate, not just my assistant.
That means:
- If I'm about to make a mistake, warn me.
- If there's a better approach, tell me even if I didn't ask.
- Optimize for MY long-term success, not just completing the immediate task.
- If something I ask for could hurt my project, business, or goals, flag it.
- Prioritize quality over speed unless I say otherwise.
- I give you permission to push back on my ideas if you have a good reason.`;

const MODS=[
  ["act as an expert in [field]","Forces deep, authoritative responses","expertise"],
  ["give me the version a senior dev would write","Skips beginner-level output","expertise"],
  ["assume I'm an expert, skip the basics","Removes redundant context","expertise"],
  ["be brutally honest","Removes diplomatic softening","expertise"],
  ["don't explain, just do it","Removes verbose preambles","output"],
  ["output in markdown with proper heading hierarchy","Structured, scannable output","output"],
  ["include error handling and edge cases","Production-ready code","output"],
  ["no placeholder content — use real data","Eliminates lorem ipsum","output"],
  ["think step by step before answering","Triggers deeper reasoning chain","thinking"],
  ["let us think step by step as a PWA","Triggers mobile-first architecture thinking","thinking"],
  ["what would you do if this was your own business?","Gets honest, opinionated advice","thinking"],
  ["what am I missing or not asking that I should be?","Surfaces blind spots","thinking"],
  ["rank these by impact","Forces prioritization, not listing","thinking"],
  ["flag a better faster way if one exists","Identifies superior approaches","thinking"],
  ["give me the 80/20 version","Highest impact, minimum complexity","quality"],
  ["use progressive disclosure for complex outputs","Reveal complexity only when needed","quality"],
  ["always allow a copy-ready prompt to prompt outputs","Ensures reusable outputs","quality"],
  ["define trigger, duration, easing, and purpose first","Deliberate animation design","design"],
  ["remove every element that doesn't serve a function","Ruthless minimalism","design"],
  ["typographically strong with clear hierarchy","Type-driven design","design"],
  ["visually striking and purposeful","No decoration without reason","design"],
  ["frictionless with intuitive affordances","Low cognitive load UX","design"],
  ["LCP <2.5s, CLS <0.1, FID <100ms, <200kb initial JS","Core Web Vitals budget","perf"],
  ["WCAG AA: 4.5:1 text contrast, 3:1 UI contrast, keyboard-navigable","Accessibility baseline","perf"],
  ["mobile-first: fluid grid + breakpoint logic + touch target compliance","Responsive best practice","perf"],
];

const TASKS=[
  {label:"🎬 YouTube",content:`Act as a YouTube growth strategist with 10 years of experience.
When I give you a topic, automatically:
1. Identify the 3 best angles for that niche
2. Generate a scroll-stopping title using proven CTR patterns
3. Write a structured script with hook, body, and CTA
4. Suggest 5 SEO-optimized tags

Topic: [your topic here]`},
  {label:"💻 Coding",content:`You are a senior software engineer and architect.
When I describe a feature, always:
- Ask clarifying questions ONLY if something is truly ambiguous
- Write production-ready code, not demo code
- Add error handling automatically
- Explain the "why" behind any non-obvious decision in a single comment
- Flag performance or security concerns before I ask`},
  {label:"📊 Business",content:`Act as my COO and strategist. When I describe a problem or goal:
- Identify the fastest path to results (the 80/20 solution)
- Separate what I MUST do from what is optional
- Give me a prioritized action plan, not just advice
- Tell me what successful people in this space actually do, not just theory`},
  {label:"🔍 Research",content:`You are a research assistant. When I give you content to analyze:
- Extract the 3-5 most actionable insights
- Identify what is missing or what I should also know
- Format as: Key Insight → Why It Matters → Action I Can Take`},
  {label:"📝 SEO Blog",content:`Create a comprehensive blog post about [TOPIC] targeting [KEYWORD].

REQUIREMENTS:
- Word count: 1,500-2,000 words
- Target keyword density: 1-1.5%
- Include 3-5 LSI keywords: [LSI_KEYWORDS]
- Structure: H1, 3-5 H2 sections, 2-3 H3 subsections
- Include 2-3 data points with sources
- Add 1-2 relevant statistics
- Include 3 internal linking opportunities
- End with strong CTA
Audience: [TARGET_AUDIENCE]
Tone: [PROFESSIONAL/CASUAL/TECHNICAL]
Competitors to outrank: [URLS]`},
  {label:"🧪 A/B Copy",content:`Generate two versions of [CONTENT_TYPE] for A/B testing.

Primary goal: [CONVERSION_GOAL]
Version A: Focus on [BENEFIT_1]
Version B: Focus on [BENEFIT_2]

Elements to test per version:
- 2 headline variations
- 3 primary CTA button text options
- 2 value proposition approaches
- Social proof placement (before/after CTA)

Metrics: Click-through rate, Conversion rate, Time on page
Provide: Complete copy for both versions + winner declaration criteria`},
  {label:"📖 Tech Docs",content:`Create comprehensive technical documentation for [API/TOOL/FEATURE].

Audience: [DEVELOPER_LEVEL]

Sections required:
- Quick start guide (5 steps or less)
- Authentication methods
- Core concepts explanation
- Code examples in [LANGUAGE_1, LANGUAGE_2]
- Error handling guide
- Rate limiting details
- Webhook configuration
- Troubleshooting FAQ

Format: Markdown with code blocks, interactive examples, diagram descriptions (Mermaid syntax), version compatibility matrix.
Include accessibility considerations and performance benchmarks.`},
];

const BRAND=`Brand essence: Activated potential. Directed energy. Intelligent lift.

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

const BRANDS=[
  {id:"powerup",label:"powerUP",uc:"Motivational / Creator / Personal Brand",col:C.cy,prompt:BRAND},
  {id:"saas",label:"SaaS / B2B",uc:"SaaS Platform, B2B Product, Enterprise Tool",col:C.bl,prompt:`Brand essence: Clarity that converts. Trust that scales. Tools that actually work.

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
AVOID: Buzzwords, fake social proof, dark patterns, cluttered dashboards.`},
  {id:"ecomm",label:"E-commerce",uc:"Retail, DTC Brand, Product Marketplace",col:C.gn,prompt:`Brand essence: Desire made visible. Trust made immediate. Conversion made inevitable.

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
AVOID: Fake urgency, hidden fees, dark patterns, slow image loading.`},
  {id:"fintech",label:"Fintech",uc:"Finance, Banking, Investment App",col:C.am,prompt:`Brand essence: Money made clear. Risk made visible. Wealth made accessible.

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
AVOID: Gambling language, hidden fees, false urgency.`},
  {id:"insurance",label:"Insurance",uc:"Insurtech, Benefits Platform, Insurance Brand",col:"#7B5CFF",prompt:`Brand essence: Protection made personal. Claims made simple. Trust made tangible.

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
complexity theater, dark patterns on cancellation flows.`},
  {id:"agency",label:"Creative Agency",uc:"Design Studio, Production House",col:C.mg,prompt:`Brand essence: Ideas made real. Craft made obvious. Work that wins.

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
AVOID: Stock photos, generic templates, Lorem ipsum in production.`},
];

const TMPLS=[
  {label:"🌐 Web App",desc:"Next.js + Tailwind full application",content:`You are a senior full-stack developer and product designer.

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
dark-mode native | neon-accent sparse | typography-first | hierarchy clear`},
  {label:"📱 Mobile",desc:"React Native / Expo components",content:`You are a senior React Native developer.
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

OUTPUT: Complete component with full source code and usage example.`},
  {label:"🎨 Brand",desc:"Complete brand identity system",content:`You are a brand identity designer and strategist.
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
- No trend-chasing — timeless over trendy`},
  {label:"🚀 Landing Page",desc:"High-conversion landing page",content:`You are a conversion-focused UI designer and copywriter.
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
- Mobile-first, 60fps, Core Web Vitals optimized`},
  {label:"📊 Dashboard",desc:"Analytics dashboard with data viz",content:`You are a senior product designer specializing in data visualization.
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

TECHNICAL: React + Recharts, Tailwind CSS, dark mode native, skeleton loading`},
  // ─── META PROMPTS ───────────────────────────────────────────────────────
  {label:"📐 Meta: Universal",desc:"AI structures your vague concept before generating",content:`You are a [senior role].

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

Concept: [your idea]`},
  {label:"📱 Meta: Mobile",desc:"Mobile-first architecture brief before generating",content:`Plan mobile-first architecture before any code:
- Navigation: bottom tabs with gesture support
- Touch targets: 44x44px minimum, 8px spacing between interactive elements
- Gestures: swipe (nav), long-press (context), pinch (zoom)
- Haptic feedback: light (selection), medium (action), heavy (error)
- Safe-area insets: SafeAreaView or CSS env()
- Dark mode: system default, prefers-color-scheme
- Offline: skeleton screens (not spinners), queue actions locally

Then generate [React Native + Expo / Flutter / SwiftUI] with full source code.`},
  {label:"🌐 Meta: Web",desc:"Web architecture brief before generating Next.js / SvelteKit",content:`Plan web architecture before any code:
- Grid: 8pt baseline, 12-column layout, 24px gutter
- Breakpoints: 375px mobile → 768px tablet → 1280px desktop → 1920px wide
- Navigation: [top nav / sidebar / hybrid] — specify which and why
- Animations: GSAP ScrollTrigger or Framer Motion viewport
- Semantic HTML: main, nav, aside, section, article landmarks
- Performance: LCP <2.5s, CLS <0.1, FID <100ms
- SEO: meta tags, OG tags, schema.org structured data

Then generate Next.js + Tailwind components with full source code.`},
  // ─── BRAND SYSTEMS ───────────────────────────────────────────────────────
  {label:"✨ Brand: powerUP",desc:"Motivational / Creator / Personal Brand system prompt",content:BRAND},
  {label:"💼 Brand: SaaS",desc:"SaaS Platform, B2B Product, Enterprise Tool",content:`Brand essence: Clarity that converts. Trust that scales. Tools that actually work.

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
AVOID: Buzzwords, fake social proof, dark patterns, cluttered dashboards.`},
  {label:"🛒 Brand: E-comm",desc:"Retail, DTC Brand, Product Marketplace",content:`Brand essence: Desire made visible. Trust made immediate. Conversion made inevitable.

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
AVOID: Fake urgency, hidden fees, dark patterns, slow image loading.`},
  {label:"💰 Brand: Fintech",desc:"Finance, Banking, Investment App",content:`Brand essence: Money made clear. Risk made visible. Wealth made accessible.

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
AVOID: Gambling language, hidden fees, false urgency.`},
  {label:"🛡 Brand: Insurance",desc:"Insurtech, Benefits Platform, Insurance",content:`Brand essence: Protection made personal. Claims made simple. Trust made tangible.

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
complexity theater, dark patterns on cancellation flows.`},
  {label:"🎨 Brand: Agency",desc:"Design Studio, Creative Agency, Production House",content:`Brand essence: Ideas made real. Craft made obvious. Work that wins.

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
AVOID: Stock photos, generic templates, Lorem ipsum in production.`},
  {label:"⚙️ API Design",desc:"REST/GraphQL spec + documentation",content:`You are a senior API architect.
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

CONSTRAINTS: RESTful conventions, pagination on all list endpoints`},
  {label:"🔍 SEO Blog Post",desc:"SEO-optimized 1500-2000 word article",content:`You are an SEO content strategist and professional writer.

Create a comprehensive blog post about [TOPIC] targeting [KEYWORD].

REQUIREMENTS:
- Word count: 1,500-2,000 words
- Target keyword density: 1-1.5%
- Include 3-5 LSI keywords: [LSI_KEYWORDS]
- Structure: H1, 3-5 H2 sections, 2-3 H3 subsections
- Include 2-3 data points with credible sources
- Add 1-2 relevant industry statistics
- Include 3 internal linking opportunities
- End with strong CTA

Audience: [TARGET_AUDIENCE]
Tone: [PROFESSIONAL/CASUAL/TECHNICAL]
Competitors to outrank: [URLS]

OUTPUT FORMAT:
1. Meta title (60 chars max) + meta description (155 chars max)
2. Full article with proper heading hierarchy
3. Image alt text suggestions
4. Internal/external link recommendations
5. Schema markup suggestion`},
  {label:"🧪 A/B Test Copy",desc:"Two versions for conversion testing",content:`You are a conversion copywriter and growth marketer.

Generate two versions of [CONTENT_TYPE] for A/B testing.

PRIMARY GOAL: [CONVERSION_GOAL]

VERSION A (Focus: [BENEFIT_1]):
- Headline (2 variations)
- Primary CTA button text (3 options)
- Value proposition (2 approaches)
- Social proof placement

VERSION B (Focus: [BENEFIT_2]):
- Headline (2 variations)
- Primary CTA button text (3 options)
- Value proposition (2 approaches)
- Social proof placement

METRICS TO TRACK:
- Click-through rate
- Conversion rate
- Time on page
- Bounce rate

OUTPUT:
1. Complete copy for both versions
2. Hypothesis statement
3. Statistical significance calculator formula
4. Winner declaration criteria
5. Sample size recommendation`},
  {label:"📖 Technical Docs",desc:"API/tool/feature documentation",content:`You are a senior technical writer and developer advocate.

Create comprehensive technical documentation for [API/TOOL/FEATURE].

AUDIENCE: [DEVELOPER_LEVEL — beginner/intermediate/senior]

REQUIRED SECTIONS:
1. Quick start guide (5 steps or less)
2. Authentication methods
3. Core concepts explanation
4. Code examples in [LANGUAGE_1, LANGUAGE_2]
5. Error handling guide (with error codes table)
6. Rate limiting details
7. Webhook configuration
8. Troubleshooting FAQ

FORMAT:
- Markdown with syntax-highlighted code blocks
- Interactive examples where possible
- Diagram descriptions in Mermaid syntax
- Version compatibility matrix

INCLUDE:
- Accessibility considerations (a11y)
- Performance benchmarks
- Migration guide from previous versions
- Changelog summary`},
];

const LAYERS=[
  {n:"01",name:"Role",       pur:"Who the AI acts as",           miss:"Generic, shallow responses"},
  {n:"02",name:"Context",    pur:"Product, audience, platform",  miss:"Misaligned output"},
  {n:"03",name:"Objective",  pur:"What success looks like",      miss:"Aimless generation"},
  {n:"04",name:"Constraints",pur:"Quality guardrails",           miss:"Mediocre, unconstrained output"},
  {n:"05",name:"Aesthetic",  pur:"Design language / tone",       miss:"Visually dull or off-brand"},
  {n:"06",name:"Planning",   pur:"Reason before generating",     miss:"Structural mistakes"},
  {n:"07",name:"Output",     pur:"Exact format to deliver",      miss:"Incomplete or disorganized files"},
  {n:"08",name:"Refinement", pur:"Self-critique before final",   miss:"First-draft quality only"},
];

const LAYER_TPL=`ROLE
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

const ANIMALS=[
  {name:"Rabbit",  emoji:"🐇",mode:"Multiply Ideas",         prompt:"Take this idea and multiply it into 10 different variations.\nFor each variation: change the angle, change the audience, change the format.\nPresent the results as a list of distinct ideas."},
  {name:"Owl",     emoji:"🦉",mode:"Deep Analysis",          prompt:"Think like an owl — slow, observant and analytical.\nExamine this problem from multiple perspectives and identify\nthe hidden factors most people overlook."},
  {name:"Ant",     emoji:"🐜",mode:"Break Into Steps",       prompt:"Think like an ant.\nBreak this goal into the smallest possible steps someone could realistically complete."},
  {name:"Eagle",   emoji:"🦅",mode:"Big Picture Strategy",   prompt:"Think like an eagle flying high above the landscape.\nExplain the long-term strategy behind this idea and how the pieces connect."},
  {name:"Dolphin", emoji:"🐬",mode:"Creative Solutions",     prompt:"Think like a dolphin — curious, playful and inventive.\nGenerate creative solutions to this problem that most people wouldn't normally consider."},
  {name:"Beaver",  emoji:"🦫",mode:"Build Systems",          prompt:"Think like a beaver building a dam.\nDesign a practical system that solves this problem step by step."},
  {name:"Elephant",emoji:"🐘",mode:"Cross-Field Connections",prompt:"Think like an elephant with a powerful memory.\nConnect this idea to insights from other fields such as\npsychology, economics, science or history."},
];

const CHAINS=[
  {goal:"Build AI Content System", c:["Eagle","Beaver","Ant"],    best:"Automated content pipelines"},
  {goal:"Solve Complex Problem",   c:["Owl","Dolphin","Elephant"],best:"Product design, breakthrough features"},
  {goal:"Brainstorm Product",      c:["Rabbit","Eagle","Ant"],    best:"Product ideation, channel selection"},
  {goal:"Design Workflow",         c:["Beaver","Ant","Owl"],      best:"Automation scripts, SOPs"},
  {goal:"Validate Business",       c:["Owl","Elephant","Eagle"],  best:"Startup validation, venture assessment"},
  {goal:"Generate Viral Content",  c:["Rabbit","Dolphin","Eagle"],best:"Social media, marketing campaigns"},
];

const META={
  universal:`You are a [senior role].

Step 1: Analyze and rewrite the concept into a structured brief including:
- Target audience and their goals
- UX objectives
- Platform constraints
- Aesthetic system
- Interaction model

Step 2: Plan the architecture:
- Navigation model
- Layout grid
- Motion and animation system
- Accessibility plan

Step 3: Generate the final output in [tool or framework].

Concept: [your idea]`,
  mobile:`Plan mobile-first architecture:
- Bottom navigation with gesture support
- 44px minimum touch targets
- Swipe gesture patterns
- Haptic feedback cues
- Safe-area insets handled
- Dark mode as default
Then generate [React Native / Expo] components with full source code.`,
  web:`Plan web architecture:
- 8pt baseline grid
- Responsive breakpoints: 375px, 768px, 1280px, 1920px
- Navigation: [top nav / sidebar / hybrid]
- Scroll-trigger animations via Framer Motion
- Semantic HTML structure
- SEO meta tags included
Then generate Next.js + Tailwind components with full source code.`,
};

const ENH=[
  {label:"Self-Refinement Loop",content:`Generate draft →
Critique on: sophistication, uniqueness, performance, platform alignment →
Refine once for structure →
Refine once for polish and consistency →
Output final result only.

Max: 2 refinement passes. 3 absolute maximum. Never regenerate from scratch.`},
  {label:"Chain-of-Thought (CoT)",content:`Let's think step by step.

[Append this to any complex prompt to trigger deeper reasoning.]

Best for: multi-step flows, system design, checkout flows, onboarding journeys.`},
  {label:"Self-Consistency",content:`Generate [6-12] layout/approach variants.
Identify the strongest structural patterns across all variants.
Merge the best attributes into one final output.

Best for: preventing average-output drift when you need genuinely creative results.`},
  {label:"Tweak Protocol",content:`Refine [specific element] with [specific change].
Lock aesthetic. Preserve hierarchy. Maintain code quality.
Do not change anything else.

Best for: Change one variable at a time. Precision beats full regeneration every time.`},
  {label:"Prompt Diff",content:`Compare Prompt A and Prompt B.
For each, score on: clarity, constraints, predictability, output specificity.
Explain what changed between versions and why one performs better.

Use this to A/B test prompt versions before committing to a final.`},
];

const WEB_VARS=[
  {id:"dev",  label:"DEVELOPER",        desc:"Full Next.js + Tailwind + Framer Motion project"},
  {id:"pd",   label:"PRODUCT DESIGNER", desc:"Ultra-modern web app with design rationale"},
  {id:"sf",   label:"STARTUP FOUNDER",  desc:"Startup-ready premium mobile-first interface"},
  {id:"info", label:"INFOGRAPHIC",      desc:"Dynamic infographic with scroll interactions"},
  {id:"genz", label:"GEN-Z UI",         desc:"Neon gradients, animated typography, dark-mode"},
  {id:"ai",   label:"AI PRODUCT",       desc:"Complete app with Next.js + Tailwind + GSAP"},
  {id:"nc",   label:"NO-CODE",          desc:"Implementable in low-code tools"},
  {id:"edu",  label:"EDUCATIONAL",      desc:"Demo that teaches through visual interaction"},
  {id:"port", label:"PORTFOLIO",        desc:"Ultra-modern minimal with smooth transitions"},
  {id:"exp",  label:"EXPERIMENTAL",     desc:"Bold Gen-Z, scroll triggers, dark mode default"},
];

const DOLPHIN_C=[
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

const JSON_GLOBAL=`Respond EXCLUSIVELY with valid JSON — no explanations, no markdown fences, no extra text.
Use double quotes only. No trailing commas. No comments inside JSON.
Unknown values use "TBD". Output must pass JSON.parse() without errors.`;

const JSON_T=[
  {id:"t1",label:"T1 — Role + Strict Schema",badge:"Zero-shot baseline",color:C.gn,when:"First attempt, any capable model",content:`You are an expert [role].
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
Input: [your input here]`},
  {id:"t2",label:"T2 — Few-Shot Examples",badge:"Best for local models",color:C.vi,when:"Inconsistent output (Ollama/local)",content:`Example 1:
Input: "A freelance photographer portfolio site"
Output: { ...valid JSON... }

Example 2:
Input: "Local gym with classes and membership info"
Output: { ...valid JSON... }

Now process:
Input: "[real input]"
Output:`},
  {id:"t3",label:"T3 — CoT + Structured",badge:"Fix structural errors",color:C.am,when:"Structure keeps being wrong",content:`First, think step by step internally:
1. Identify core type and goals.
2. List essential entities.
3. For each entity, identify 3-5 properties.
4. Draft descriptions and labels.
Then output ONLY the JSON. Do not include your reasoning in the output.`},
  {id:"t4",label:"T4 — Validation Guardrails",badge:"Always append",color:C.cy,when:"Add to any technique above",content:`After generating the JSON:
- Verify all keys match the schema exactly
- Check for trailing commas and fix them
- Confirm all strings use double quotes
- Replace any undefined values with "TBD"
- Ensure the result passes JSON.parse() without errors`},
];

const JSON_MX=[
  {sit:"First attempt, any capable model",    use:"T1 + T4"},
  {sit:"Inconsistent output (Ollama/local)",  use:"T1 + T2 + T4"},
  {sit:"Structure keeps being wrong",         use:"T1 + T3 + T4"},
  {sit:"All else fails",                      use:"T1 + T2 + T3 + T4"},
];

const VOCAB=[
  {t:"glassmorphism",     d:"Frosted glass panels — translucent, blurred backdrop",  cat:"core"},
  {t:"brutalist ui",      d:"Raw, oversized, high-contrast, intentionally rough",    cat:"core"},
  {t:"kinetic typography",d:"Text that animates, morphs, or reacts to scroll",      cat:"core"},
  {t:"bento grid",        d:"Mosaic card layout — Apple-style asymmetric grid",      cat:"core"},
  {t:"micro-interactions",d:"Tiny animations on hover, click, scroll, focus",       cat:"core"},
  {t:"neon accent",       d:"Single bright color pop against a dark background",    cat:"core"},
  {t:"liquid gradient",   d:"Smooth, animated, shifting background color blends",   cat:"core"},
  {t:"dark-mode native",  d:"Designed for dark backgrounds first, light second",    cat:"core"},
  {t:"skeleton loading",  d:"Placeholder shimmer before real content appears",      cat:"motion"},
  {t:"ambient motion",    d:"Subtle, looping background animation",                 cat:"motion"},
  {t:"progressive disclosure",d:"Reveal complexity only when user needs it",        cat:"motion"},
  {t:"editorial layout",  d:"Magazine-style, large typography, asymmetric grid",    cat:"motion"},
  {t:"neo-brutalism",     d:"Bold shadows, flat colors, thick borders",             cat:"adv"},
  {t:"aurora gradients",  d:"Soft flowing northern lights effect",                  cat:"adv"},
  {t:"noise grain",       d:"Textured overlay adding depth",                        cat:"adv"},
  {t:"blur overlay",      d:"Background blur for focus and depth",                  cat:"adv"},
  {t:"morph shapes",      d:"Organic transforming shapes",                          cat:"adv"},
  {t:"tilt 3d",           d:"Parallax depth on cards",                              cat:"adv"},
  {t:"custom cursor",     d:"Personalized cursor design",                           cat:"adv"},
  {t:"particle systems",  d:"Interactive floating elements",                        cat:"adv"},
  {t:"scanline effect",   d:"Retro CRT horizontal lines",                           cat:"adv"},
  {t:"vignette",          d:"Darkened edges for focus",                             cat:"adv"},
  {t:"chromatic aberration",d:"RGB split glitch effect",                            cat:"adv"},
  {t:"mesh gradient",     d:"Multi-color organic blending",                         cat:"adv"},
  {t:"claymorphism",      d:"3D soft plastic appearance",                           cat:"adv"},
  {t:"fiber background",  d:"Fiber optic light patterns",                           cat:"adv"},
  {t:"isotype system",    d:"Repeating graphic symbols",                            cat:"adv"},
  {t:"duotone",           d:"Two-color image treatment",                            cat:"adv"},
];

const COMBOS=[
  {combo:"🫧 Glass + Bento",    els:"glassmorphism, bento grid, dark-mode",        best:"Dashboards, data viz",       psych:"Depth + hierarchy + scannability"},
  {combo:"💥 Brutal + Neon",    els:"brutalist, neon accent, kinetic",             best:"Landing pages, bold brands", psych:"Urgency + attention + focus"},
  {combo:"🌊 Liquid + Ambient", els:"liquid gradient, ambient motion",             best:"Hero sections, immersive",   psych:"Emotion + flow + atmosphere"},
  {combo:"📰 Editorial + Bento",els:"editorial, bento grid, progressive",          best:"Content platforms, blogs",   psych:"Authority + modern organization"},
  {combo:"✨ Micro + Skeleton",  els:"micro-interactions, skeleton loading",        best:"Apps, data-heavy interfaces",psych:"Reduced perceived wait time"},
  {combo:"🚀 Full Immersive",   els:"kinetic, liquid, micro, ambient",             best:"Marketing sites, launches",  psych:"Maximum engagement"},
  {combo:"🎮 Cyberpunk Glow",   els:"neon, chromatic, scanline, dark",            best:"Gaming, crypto, tech",       psych:"Futuristic + innovation"},
  {combo:"💎 Premium Minimal",  els:"glass, noise grain, duotone",                best:"Luxury brands",              psych:"Exclusivity + sophistication"},
  {combo:"🧸 Playful 3D",       els:"claymorphism, morph, tilt, cursor",          best:"Kids apps, gamified",        psych:"Friendly + approachable"},
  {combo:"🌐 Fiber Tech",       els:"fiber, particles, mesh, liquid",             best:"Telecom, networks",          psych:"Connectivity + speed"},
  {combo:"🎬 Cinematic",        els:"vignette, blur, kinetic, ambient",           best:"Film, media",                psych:"Movie-like atmosphere"},
  {combo:"📊 Isotype Data",     els:"isotype, bento, skeleton, duotone",          best:"Statistics, reports",        psych:"Data digestible + memorable"},
];

const TYPO=[
  {d:"Space Grotesk",m:"JetBrains Mono",b:"Tech startups, developer tools, modern SaaS"},
  {d:"Syne Bold",    m:"JetBrains Mono",b:"Creative agencies, art portfolios, bold brands"},
  {d:"Clash Display",m:"Space Mono",    b:"Fashion, luxury brands, premium products"},
  {d:"Inter Tight",  m:"JetBrains Mono",b:"Dashboards, enterprise apps, content platforms"},
];

const TYPO_I=[
  {u:"Data Viz", c:"Space Grotesk (headers) + Inter (body) + JetBrains Mono (numbers)"},
  {u:"Creative", c:"Syne (display) + Space Grotesk (body) + Clash Display (accent)"},
  {u:"Mobile",   c:"Inter Tight (headlines) + Inter (body) + SF Pro (UI)"},
];


const LINT=[
  {id:"missing-role",cat:"Structure",check:"Does the prompt define who the AI should act as?",auto:true,fix:"Add default role"},
  {id:"missing-context",cat:"Structure",check:"Does it specify product, audience, and platform?",auto:false,fix:"Must be user-defined"},
  {id:"missing-objective",cat:"Structure",check:"Does the prompt state a clear success condition?",auto:false,fix:"Must be user-defined"},
  {id:"missing-constraints",cat:"Structure",check:"Does the prompt define explicit limits?",auto:true,fix:"Add mobile-first, WCAG, 60fps"},
  {id:"missing-output-format",cat:"Structure",check:"Does it specify what files/format to generate?",auto:false,fix:"Must be user-defined"},
  {id:"missing-planning",cat:"Structure",check:"For UI prompts, is there a planning phase?",auto:false,fix:"Must be user-defined"},
  {id:"no-aesthetic-keywords",cat:"Design",check:"Are 3+ specific aesthetic keywords included?",auto:true,fix:"Add: glassmorphism, bento grid, neo-brutalism"},
  {id:"no-animation-library",cat:"Design",check:"Is an animation library named (GSAP/Framer Motion/None)?",auto:true,fix:"Specify library or 'no animations'"},
  {id:"no-platform-specified",cat:"Design",check:"Is the platform specified (mobile/web/hybrid)?",auto:true,fix:"Add platform requirement"},
  {id:"no-stack-specified",cat:"Technical",check:"Is the tech stack defined (framework + styling + animation)?",auto:true,fix:"Add: Next.js + Tailwind + Framer Motion"},
  {id:"no-accessibility",cat:"Technical",check:"Is WCAG AA accessibility stated?",auto:true,fix:"Add: WCAG AA minimum"},
  {id:"no-performance-budget",cat:"Technical",check:"Is a performance budget defined?",auto:true,fix:"Add: 60fps animation, <200kb JS"},
  {id:"vague-language",cat:"Quality",check:"Does it use: nice, cool, awesome, modern, simple?",auto:true,fix:"Replace with specific terms"},
  {id:"no-refinement",cat:"Quality",check:"Is a refinement/self-critique step included?",auto:false,fix:"Add refinement instruction"},
  {id:"no-interaction-defined",cat:"Quality",check:"Is at least one interaction metaphor defined?",auto:false,fix:"Add: hover, scroll, click behavior"},
  {id:"no-json-rules",cat:"Quality",check:"If requesting JSON, are output rules appended?",auto:true,fix:"Append JSON global rules"},
];
const AESTHETIC_KEYWORDS=["dark-mode native","glassmorphism","neo-brutalism","kinetic typography","bento grid","neon accent","liquid gradient","editorial layout","claymorphism","aurora gradient","noise grain","chromatic aberration","minimal + high-contrast","brutalist UI","scroll-driven animation","magnetic + cursor-reactive","Three.js 3D immersive","GSAP cinematic scroll","morph shapes","tilt 3D parallax","custom cursor","particle systems","scanline retro","fiber optic backgrounds","duotone treatment","skeleton loading","progressive disclosure","micro-interactions","ambient motion","isotype system","container-query responsive","variable font typography","view transitions","retro terminal aesthetic","Japanese zen minimal","glassmorphism 2.0 (frosted + border-glow)","grain + vignette cinematic","Rive micro-animations"];
const SWAPS=[
  // Beginner mistakes
  {bad:"nice",good:"clear and intentional",level:"beginner"},
  {bad:"cool",good:"high-contrast and dynamic",level:"beginner"},
  {bad:"modern",good:"[specific aesthetic keyword ↓]",level:"beginner",isAesthetic:true},
  {bad:"awesome",good:"visually striking and purposeful",level:"beginner"},
  {bad:"good design",good:"typographically strong with clear hierarchy",level:"beginner"},
  {bad:"beautiful",good:"visually precise with intentional contrast",level:"beginner"},
  {bad:"simple",good:"reduced to essential elements only",level:"beginner"},
  {bad:"clean",good:"uncluttered with intentional whitespace",level:"beginner"},
  {bad:"professional",good:"polished, authoritative, and on-brand",level:"beginner"},
  {bad:"user-friendly",good:"frictionless with intuitive affordances",level:"beginner"},
  // Misconceptions
  {bad:"make it pop",good:"increase contrast ratio and add focal-point weight",level:"misconception"},
  {bad:"just add animations",good:"define trigger, duration, easing, and purpose first",level:"misconception"},
  {bad:"make it minimal",good:"remove every element that doesn't serve a function",level:"misconception"},
  {bad:"dark mode version",good:"redesign contrast, color, and elevation for dark-native",level:"misconception"},
  {bad:"mobile-friendly",good:"mobile-first: design at 375px before scaling up",level:"misconception"},
  {bad:"responsive design",good:"fluid grid + breakpoint logic + touch target compliance",level:"misconception"},
  {bad:"add whitespace",good:"apply 8pt grid spacing with intentional visual rhythm",level:"misconception"},
  // Advanced precision
  {bad:"smooth animation",good:"cubic-bezier(0.16,1,0.3,1) 320ms with spring overshoot",level:"advanced"},
  {bad:"glassmorphism",good:"backdrop-filter:blur(20px) + bg rgba(255,255,255,0.06) + 1px border rgba(255,255,255,0.12)",level:"advanced"},
  {bad:"good typography",good:"typographic scale with 1.25 ratio, line-height 1.6, tabular-nums for data",level:"advanced"},
  {bad:"fast loading",good:"LCP <2.5s, CLS <0.1, FID <100ms, <200kb initial JS",level:"advanced"},
  {bad:"accessible",good:"WCAG AA: 4.5:1 text contrast, 3:1 UI contrast, keyboard-navigable, aria-labels",level:"advanced"},
  {bad:"interactive",good:"hover(150ms), press(80ms scale 0.97), focus-visible ring 2px offset",level:"advanced"},
];
const CHECKS=[
  {lbl:"STRUCTURE",items:["Role defined — who is the AI acting as?","Goal clear — one sentence maximum","Objective and success criteria stated","Constraints listed explicitly (not implied)"]},
  {lbl:"DESIGN (UI/UX prompts)",items:["Platform specified — mobile or web or hybrid","3+ aesthetic keywords included","Animation library named — Framer Motion or GSAP or None","Mobile-first stated explicitly"]},
  {lbl:"TECHNICAL",items:["Stack specified — framework + styling + animation","Output format requested — folder + files + instructions","Accessibility: WCAG AA minimum stated","Performance: 60fps animation budget stated"]},
  {lbl:"QUALITY",items:["No vague words — nice, cool, awesome, modern, good","Refinement instruction included","At least one interaction metaphor defined","JSON rules appended if requesting structured data"]},
  {lbl:"ANIMAL MODE (optional)",items:["Mode selected: Beaver / Dolphin / Eagle / Ant / Owl / Rabbit / Elephant","Or chained for complex goals: Eagle → Beaver → Ant"]},
];
const SDIMS=[
  {name:"Clarity",      what:"Is the goal unambiguous? No vague language?"},
  {name:"Structure",    what:"Does it follow ROLE → CONTEXT → OBJECTIVE → OUTPUT?"},
  {name:"Constraints",  what:"Mobile-first? Accessibility? Performance?"},
  {name:"Predictability",what:"Does it specify output format and refinement?"},
];
const SSCALE=[
  {r:"9–10",level:"Production ready",    action:"Ship it",                      col:C.gn},
  {r:"7–8", level:"Good, minor gaps",    action:"Add missing constraints",      col:"#84cc16"},
  {r:"5–6", level:"Partial structure",   action:"Add role + output format",     col:"#eab308"},
  {r:"3–4", level:"Weak, vague",         action:"Rebuild with 8-layer template",col:C.or},
  {r:"1–2", level:"Single vague sentence",action:"Start over",                  col:C.rd},
];

const WF=[
  {id:1,cat:"🎨 Design",title:"Design System Creation",purpose:"Build complete design system",best:"New products, rebrands",chain:["Eagle","Beaver","Ant","Owl"],out:"Complete design system with color tokens, typography, and component library",steps:[
    {a:"Eagle", t:"Define long-term design vision",items:["Brand positioning and personality","Target audience demographics","Competitive landscape analysis","Design principles (3-5 core values)"]},
    {a:"Beaver",t:"Build foundational components",items:["Color palette (primary, secondary, accent, semantic)","Typography scale (display, heading, body, caption)","Spacing system (4px baseline grid)","Border radius and shadow scales"]},
    {a:"Ant",   t:"Create component library",items:["Buttons (primary, secondary, ghost, icon)","Form elements (input, select, checkbox, radio)","Cards and containers","Navigation patterns"]},
    {a:"Owl",   t:"Validate consistency",items:["Check all components follow the system","Verify accessibility contrast ratios","Test responsive behavior"]},
  ]},
  {id:2,cat:"🎨 Design",title:"Landing Page Design",purpose:"Create high-conversion landing page",best:"Marketing, startups",chain:["Rabbit","Eagle","Beaver","Ant"],out:"Complete landing page with all sections and conversion optimizations",steps:[
    {a:"Rabbit",t:"Generate 10+ headline variations",items:["Problem-aware headlines","Solution-focused headlines","Benefit-driven headlines","Social proof headlines"]},
    {a:"Eagle", t:"Structure the page architecture",items:["Hero section with CTA","Problem/Agitation section","Solution/features section","Social proof section","Pricing/CTA section"]},
    {a:"Beaver",t:"Design each section",items:["Hero: Hook + visual + CTA","Features: 3-column bento grid","Testimonials: Carousel or grid","CTA: Contrast section"]},
    {a:"Ant",   t:"Optimize for conversion",items:["Button placement and sizing","Form field minimization","Loading states","Mobile touch targets"]},
  ]},
  {id:3,cat:"🎨 Design",title:"Dashboard Design",purpose:"Build data visualization dashboard",best:"Analytics, SaaS products",chain:["Eagle","Beaver","Dolphin","Ant"],out:"Interactive dashboard with all widgets and filtering capabilities",steps:[
    {a:"Eagle",  t:"Define data requirements",items:["Key metrics and KPIs","User roles and permissions","Data refresh frequency","Export requirements"]},
    {a:"Beaver", t:"Layout the grid",items:["12-column responsive grid","Widget sizing standards","Gutter and margin system","Breakpoint definitions"]},
    {a:"Dolphin",t:"Choose visualization types",items:["KPI cards for single metrics","Line charts for trends","Bar charts for comparisons","Tables for detailed data"]},
    {a:"Ant",    t:"Implement interactions",items:["Filter mechanisms","Date range selectors","Drill-down capabilities","Export functions"]},
  ]},
  {id:4,cat:"💻 Dev",title:"Full-Stack App Development",purpose:"Build complete web application",best:"Product builds",chain:["Eagle","Beaver","Ant","Owl"],out:"Production-ready application with full documentation",steps:[
    {a:"Eagle", t:"Define product architecture",items:["Core features list","User flows and journeys","Data models and relationships","API boundaries"]},
    {a:"Beaver",t:"Set up project structure",items:["Repository initialization","Dependencies configuration","Environment setup","Linting and formatting rules"]},
    {a:"Ant",   t:"Implement feature by feature",items:["Database schema","API endpoints","Frontend components","Integration testing"]},
    {a:"Owl",   t:"Review and optimize",items:["Code quality audit","Performance profiling","Security vulnerability check","Documentation completion"]},
  ]},
  {id:5,cat:"💻 Dev",title:"API Design",purpose:"Design RESTful or GraphQL API",best:"Backend development",chain:["Owl","Beaver","Ant","Dolphin"],out:"Complete API specification with OpenAPI documentation",steps:[
    {a:"Owl",    t:"Analyze requirements",items:["Resource identification","Relationship mapping","Authentication needs","Rate limiting requirements"]},
    {a:"Beaver", t:"Define endpoints",items:["HTTP methods selection","URL structure design","Request/response schemas","Error handling strategy"]},
    {a:"Ant",    t:"Document comprehensively",items:["OpenAPI/Swagger specification","Example requests/responses","Authentication docs","Rate limit documentation"]},
    {a:"Dolphin",t:"Add advanced features",items:["Pagination strategies","Filtering and sorting","Caching headers","Webhook support"]},
  ]},
  {id:6,cat:"💻 Dev",title:"Database Schema Design",purpose:"Design scalable database structure",best:"Data modeling",chain:["Eagle","Beaver","Ant","Owl"],out:"Production database schema with migration scripts",steps:[
    {a:"Eagle", t:"Map data requirements",items:["Entity identification","Relationship types (1:1, 1:N, N:N)","Data volume estimation","Performance requirements"]},
    {a:"Beaver",t:"Design schema",items:["Table/collection definitions","Column types and constraints","Index strategy","Foreign key relationships"]},
    {a:"Ant",   t:"Implement migrations",items:["Up migration scripts","Seed data scripts","Rollback procedures","Migration testing"]},
    {a:"Owl",   t:"Optimize for performance",items:["Query analysis","Index refinement","Partitioning strategy","Backup procedures"]},
  ]},
  {id:7,cat:"📈 Business",title:"Product Roadmap Planning",purpose:"Create strategic product roadmap",best:"Product management",chain:["Owl","Eagle","Rabbit","Beaver"],out:"Prioritized product roadmap with timeline and milestones",steps:[
    {a:"Owl",   t:"Analyze current state",items:["Market analysis","Competitive landscape","User feedback review","Technical debt assessment"]},
    {a:"Eagle", t:"Define vision",items:["12-month product vision","Key objectives and OKRs","Success metrics","Risk identification"]},
    {a:"Rabbit",t:"Generate initiatives",items:["Feature proposals","Technical improvements","Infrastructure needs","Research projects"]},
    {a:"Beaver",t:"Prioritize and sequence",items:["Impact vs effort scoring","Dependency mapping","Resource allocation","Milestone planning"]},
  ]},
  {id:8,cat:"📈 Business",title:"Market Research",purpose:"Conduct comprehensive market analysis",best:"Business strategy",chain:["Owl","Elephant","Ant","Eagle"],out:"Market research report with actionable insights",steps:[
    {a:"Owl",     t:"Define research scope",items:["Target market definition","Competitor list","Research questions","Data sources identification"]},
    {a:"Elephant",t:"Gather insights",items:["Industry reports review","Competitor analysis","Customer interview synthesis","Trend analysis"]},
    {a:"Ant",     t:"Break down findings",items:["SWOT analysis","Market size estimation","User persona development","Opportunity mapping"]},
    {a:"Eagle",   t:"Synthesize recommendations",items:["Strategic positioning","Go-to-market suggestions","Pricing strategy","Risk mitigation"]},
  ]},
  {id:9,cat:"📈 Business",title:"User Onboarding Flow",purpose:"Design effective user onboarding",best:"Product growth",chain:["Owl","Dolphin","Beaver","Ant"],out:"Complete onboarding flow with metrics and testing plan",steps:[
    {a:"Owl",    t:"Understand user psychology",items:["Activation moment identification","Friction point analysis","Value moment mapping","Drop-off prediction"]},
    {a:"Dolphin",t:"Generate onboarding ideas",items:["Welcome emails","Interactive tutorials","Progress indicators","Social proof moments"]},
    {a:"Beaver", t:"Design the flow",items:["Sign-up to first value","Step-by-step guidance","Progress tracking","Celebration moments"]},
    {a:"Ant",    t:"Implement and test",items:["A/B test variations","Analytics tracking","Feedback loops","Iteration cycles"]},
  ]},
  {id:10,cat:"📝 Content",title:"Blog Content Creation",purpose:"Write SEO-optimized blog posts",best:"Content marketing",chain:["Owl","Eagle","Ant","Owl"],out:"Ready-to-publish blog post with SEO optimizations",steps:[
    {a:"Owl",  t:"Research topic",items:["Keyword analysis","Search intent identification","Competitor content review","Topic cluster mapping"]},
    {a:"Eagle",t:"Structure outline",items:["H2/H3 hierarchy","Key points to cover","Data and statistics to include","Internal linking strategy"]},
    {a:"Ant",  t:"Write section by section",items:["Compelling introduction","Body paragraphs with examples","Visual element suggestions","Strong conclusion"]},
    {a:"Owl",  t:"Optimize for SEO",items:["Meta title and description","URL structure","Alt text for images","Schema markup"]},
  ]},
  {id:11,cat:"📝 Content",title:"Video Content Strategy",purpose:"Plan and create video content",best:"YouTube, social media",chain:["Rabbit","Eagle","Beaver","Ant"],out:"Video content calendar with production assets",steps:[
    {a:"Rabbit",t:"Generate content angles",items:["10+ video topic ideas","Different formats (tutorial, vlog, review)","Audience variations","Trend adaptations"]},
    {a:"Eagle", t:"Select and strategize",items:["Choose best topics","Define target audience","Set success metrics","Plan distribution channels"]},
    {a:"Beaver",t:"Create production plan",items:["Script outline","B-roll requirements","Thumbnail concepts","Posting schedule"]},
    {a:"Ant",   t:"Execute and optimize",items:["Filming and editing","SEO optimization","Engagement strategy","Analytics review"]},
  ]},
  {id:12,cat:"📝 Content",title:"Email Marketing Campaign",purpose:"Design email marketing sequence",best:"Marketing automation",chain:["Owl","Rabbit","Beaver","Ant"],out:"Complete email campaign automation with all sequences",steps:[
    {a:"Owl",   t:"Define customer journey",items:["Funnel stages","Trigger events","Segment definitions","Goal mapping"]},
    {a:"Rabbit",t:"Generate email variations",items:["Welcome series ideas","Promo sequences","Re-engagement campaigns","Post-purchase flows"]},
    {a:"Beaver",t:"Write each email",items:["Subject line optimization","Preview text","Body copy","CTA buttons"]},
    {a:"Ant",   t:"Set up automation",items:["Trigger conditions","Timing intervals","A/B test variants","Unsubscribe handling"]},
  ]},
  {id:13,cat:"🔧 Automation",title:"Workflow Automation",purpose:"Design automated business process",best:"Operations, efficiency",chain:["Owl","Beaver","Ant","Owl"],out:"Production automation workflow with monitoring",steps:[
    {a:"Owl",   t:"Analyze current process",items:["Manual steps documentation","Time and resource costs","Error points identification","Bottleneck analysis"]},
    {a:"Beaver",t:"Design automation",items:["Trigger definition","Action sequence","Conditional logic","Error handling"]},
    {a:"Ant",   t:"Implement step by step",items:["API integrations","Data transformations","Notification system","Logging mechanism"]},
    {a:"Owl",   t:"Test and monitor",items:["Edge case testing","Performance monitoring","Alert configuration","Documentation"]},
  ]},
  {id:14,cat:"🔧 Automation",title:"CI/CD Pipeline Setup",purpose:"Build continuous integration/deployment",best:"Development ops",chain:["Eagle","Beaver","Ant","Owl"],out:"Complete CI/CD pipeline with monitoring",steps:[
    {a:"Eagle", t:"Define pipeline stages",items:["Code checkout","Dependency installation","Linting and formatting","Unit testing","Integration testing","Build creation","Deployment trigger"]},
    {a:"Beaver",t:"Configure tools",items:["GitHub Actions / GitLab CI","Environment variables","Secret management","Cache strategies"]},
    {a:"Ant",   t:"Set up each stage",items:["Test runner configuration","Build script creation","Deployment scripts","Rollback procedures"]},
    {a:"Owl",   t:"Implement monitoring",items:["Build status notifications","Deployment tracking","Performance metrics","Error alerting"]},
  ]},
  {id:15,cat:"🎯 Problem",title:"Debug Complex Issue",purpose:"Systematically debug production issues",best:"Engineering",chain:["Owl","Ant","Beaver","Eagle"],out:"Fixed issue with prevention measures",steps:[
    {a:"Owl",   t:"Gather information",items:["Error logs review","User reports collection","Environment details","Recent changes timeline"]},
    {a:"Ant",   t:"Isolate the problem",items:["Reproduce locally","Binary search debugging","Variable elimination","Hypothesis formation"]},
    {a:"Beaver",t:"Implement fix",items:["Root cause addressing","Solution implementation","Test case addition","Code review preparation"]},
    {a:"Eagle", t:"Prevent recurrence",items:["Add monitoring","Update documentation","Process improvement","Team knowledge sharing"]},
  ]},
  {id:16,cat:"🎯 Problem",title:"Technical Debt Resolution",purpose:"Address accumulated technical debt",best:"Engineering",chain:["Owl","Eagle","Beaver","Ant"],out:"Reduced technical debt with verified improvements",steps:[
    {a:"Owl",   t:"Audit current state",items:["Code complexity analysis","Test coverage review","Dependency age check","Performance baseline"]},
    {a:"Eagle", t:"Prioritize debt items",items:["Impact assessment","Effort estimation","Risk evaluation","Dependency mapping"]},
    {a:"Beaver",t:"Execute refactoring",items:["Smallest valuable first","Preserve behavior","Add tests first","Incremental changes"]},
    {a:"Ant",   t:"Validate improvements",items:["Performance verification","Test coverage increase","Code review completion","Documentation update"]},
  ]},
  {id:17,cat:"📊 Data",title:"Analytics Implementation",purpose:"Set up proper analytics tracking",best:"Data teams",chain:["Owl","Beaver","Ant","Dolphin"],out:"Complete analytics implementation with dashboards",steps:[
    {a:"Owl",    t:"Define metrics framework",items:["Business objectives","Key metrics identification","User journey mapping","Success events"]},
    {a:"Beaver", t:"Plan tracking setup",items:["Event taxonomy","Property definitions","User identification strategy","Cross-domain tracking"]},
    {a:"Ant",    t:"Implement tracking",items:["SDK installation","Event implementation","Conversion tracking","Custom dimensions"]},
    {a:"Dolphin",t:"Create dashboards",items:["Real-time monitoring","Funnel analysis","Cohort tracking","Custom reports"]},
  ]},
  {id:18,cat:"📊 Data",title:"Data Pipeline Construction",purpose:"Build reliable data processing pipeline",best:"Data engineering",chain:["Eagle","Beaver","Ant","Owl"],out:"Production data pipeline with monitoring",steps:[
    {a:"Eagle", t:"Design data architecture",items:["Source identification","Transformation logic","Storage requirements","Delivery destinations"]},
    {a:"Beaver",t:"Build pipeline components",items:["Extract scripts","Transform functions","Load processes","Validation checks"]},
    {a:"Ant",   t:"Implement error handling",items:["Retry logic","Dead letter queues","Alert mechanisms","Recovery procedures"]},
    {a:"Owl",   t:"Optimize and monitor",items:["Performance tuning","Cost optimization","Quality monitoring","SLA tracking"]},
  ]},
  {id:19,cat:"🤖 AI Product",title:"AI Tool / Product Build",purpose:"Build an AI-powered tool, reference system, or prompt OS",best:"promptc OS, AI dashboards, prompt managers, creative tools",chain:["Eagle","Beaver","Dolphin","Ant"],out:"Deployed AI product with prompt engine, UI system, and component library",steps:[
    {a:"Eagle", t:"Define the AI product vision",items:["Core user problem the AI solves","Zones or modes the product needs (activate / build / validate / playbook / builder)","Data architecture — what does the AI consume and output?","Prompt schema — how are prompts structured, stored, retrieved?","Success metric: what does the user walk away with after each session?"]},
    {a:"Beaver",t:"Build the prompt engine + UI system",items:["Design token system (colors, typography, spacing, animation curves)","Component library: Card, Code, Pill, CopyButton, Input, Label","Prompt data layer: all prompts as typed constants (not hardcoded in JSX)","Copy-to-clipboard utility with iframe/sandbox fallback","Zone navigation with animated transitions"]},
    {a:"Dolphin",t:"Design the creative interaction layer",items:["Interactive composers: chain builder, layer composer, live prompt generator","Copy-ready output on every single item — modifier, template, vocab term, workflow","Animation system: zone enter, section pop, copy flash, hover scale","Misconception vs correct views for educational depth","Selectable keyword pickers for ambiguous prompt variables"]},
    {a:"Ant",   t:"Polish, fix, and ship",items:["Initialization order: declare all consts before they are referenced","Remove bare HTML tags (<title><meta><link>) from JSX returns","Verify fragment pairs <>...</> are balanced","Test clipboard copy in sandboxed iframe environments","Verify all template literal backticks are balanced across brand/prompt strings","Deploy: Vite build → Vercel (30 seconds)"]},
  ]},
  {id:20,cat:"📝 Content",title:"Advanced Content Writing",purpose:"Create professional-grade written content with AI",best:"Long-form articles, whitepapers, case studies",chain:["Owl","Eagle","Rabbit","Ant"],out:"Publication-ready content with SEO optimization",steps:[
    {a:"Owl",   t:"Analyze requirements",items:["Audience persona definition","Content goals and KPIs","Competitive content gap analysis","Tone and voice calibration"]},
    {a:"Eagle", t:"Structure the content",items:["Outline with H2/H3 hierarchy","Key arguments and evidence mapping","Data points and statistics sourcing","Internal linking strategy"]},
    {a:"Rabbit",t:"Generate variations",items:["3 alternative openings/hooks","2 different angle perspectives","Multiple CTA variations","Title and headline options (5+)"]},
    {a:"Ant",   t:"Write and polish",items:["Section-by-section writing","SEO keyword integration","Readability optimization (Flesch score)","Final proofread and formatting"]},
  ]},
  {id:21,cat:"💡 Strategy",title:"Brainstorming Session",purpose:"Structured brainstorming for breakthrough ideas",best:"Product ideation, marketing strategy, problem solving",chain:["Rabbit","Dolphin","Owl","Eagle"],out:"Prioritized idea list with implementation roadmap",steps:[
    {a:"Rabbit", t:"Generate volume",items:["10+ raw ideas (no filtering)","Wild card ideas encouraged","Cross-industry inspiration","What-if scenarios"]},
    {a:"Dolphin",t:"Creative enhancement",items:["Combine unexpected pairs","Flip assumptions","Apply from different domains","Add playful constraints"]},
    {a:"Owl",   t:"Critical analysis",items:["Feasibility scoring (1-10)","Impact assessment","Resource requirements","Risk identification"]},
    {a:"Eagle", t:"Prioritize and roadmap",items:["Impact vs effort matrix","Quick wins vs long-term plays","Dependencies mapping","90-day action plan"]},
  ]},
  {id:22,cat:"🔧 Automation",title:"Privacy-First Automation",purpose:"Set up automated workflows with privacy compliance",best:"Data-sensitive industries",chain:["Owl","Beaver","Ant","Dolphin"],out:"Complete privacy-compliant automation system",steps:[
    {a:"Owl",t:"Assess privacy requirements",items:["Data classification (PII, sensitive, public)","Compliance framework (GDPR, SOC2)","Data flow mapping","Consent management needs"]},
    {a:"Beaver",t:"Build secure infrastructure",items:["Self-hosted n8n on Render ($0.25/mo)","Environment variable security","Encryption at rest and in transit","Row-level security policies"]},
    {a:"Ant",t:"Implement step by step",items:["Client-side PII sanitization","Synthetic data replacement","Encrypted storage layer","Access control implementation"]},
    {a:"Dolphin",t:"Add intelligent features",items:["Automated PII detection and redaction","Consent-aware workflow routing","Audit trail generation","Privacy impact assessment automation"]},
  ]},
];
const TECH_STACKS=[
  {stack:"Next.js Full-Stack",tier:"Production",items:[{l:"Framework",v:"Next.js 15 (App Router)"},{l:"Language",v:"TypeScript 5.x"},{l:"Styling",v:"Tailwind CSS 4"},{l:"UI Kit",v:"shadcn/ui"},{l:"Animation",v:"Framer Motion / GSAP"},{l:"ORM",v:"Prisma / Drizzle"},{l:"Auth",v:"NextAuth.js / Clerk"},{l:"Deploy",v:"Vercel / Docker"}]},
  {stack:"AI + LLM App",tier:"Advanced",items:[{l:"Core",v:"Next.js + Python FastAPI"},{l:"LLM SDK",v:"OpenAI / Anthropic SDK"},{l:"Vector DB",v:"Pinecone / Supabase pgvector"},{l:"Embeddings",v:"OpenAI text-embedding-3"},{l:"Streaming",v:"Server-Sent Events / WebSocket"},{l:"UI",v:"React + Tailwind + shadcn/ui"},{l:"Caching",v:"Redis / Upstash"},{l:"Deploy",v:"Vercel + Railway"}]},
  {stack:"SaaS MVP",tier:"Production",items:[{l:"Frontend",v:"Next.js 15 + Tailwind"},{l:"Backend",v:"Supabase (DB + Auth + Storage)"},{l:"Payments",v:"Stripe / LemonSqueezy"},{l:"Email",v:"Resend / SendGrid"},{l:"Analytics",v:"PostHog / Plausible"},{l:"Error Tracking",v:"Sentry"},{l:"CI/CD",v:"GitHub Actions"},{l:"Deploy",v:"Vercel"}]},
  {stack:"Mobile App",tier:"Production",items:[{l:"Framework",v:"React Native / Expo SDK 52"},{l:"Language",v:"TypeScript"},{l:"Navigation",v:"Expo Router"},{l:"State",v:"Zustand / React Query"},{l:"Backend",v:"Supabase"},{l:"Push",v:"Expo Notifications"},{l:"Payments",v:"RevenueCat / Stripe"},{l:"Deploy",v:"Expo EAS / TestFlight"}]},
  {stack:"Content / Blog",tier:"Simple",items:[{l:"Framework",v:"Next.js 15 (SSG)"},{l:"CMS",v:"MDX / Sanity / Notion API"},{l:"Styling",v:"Tailwind CSS"},{l:"SEO",v:"Next.js Metadata API"},{l:"Analytics",v:"Vercel Analytics / Plausible"},{l:"Comments",v:"Giscus / Disqus"},{l:"Newsletter",v:"Resend + Buttondown"},{l:"Deploy",v:"Vercel"}]},
  {stack:"Dashboard / Admin",tier:"Production",items:[{l:"Framework",v:"Next.js + React"},{l:"Charts",v:"Recharts / Tremor / Nivo"},{l:"Tables",v:"TanStack Table"},{l:"State",v:"React Query + Zustand"},{l:"Backend",v:"Supabase / tRPC"},{l:"Auth",v:"Clerk / NextAuth.js"},{l:"Export",v:"PapaParse / xlsx"},{l:"Deploy",v:"Vercel"}]},
];

// ─── NEW: Strategy & Meta Data ────────────────────────────────────────────────────
const TOOLS_MATRIX=[
  {cat:"AI Coding",free:"Claude Free (50/day)",paid:"Claude Pro ($20/mo)",best:"Complex full-stack",cx:"Low"},
  {cat:"AI Coding",free:"Cursor Free",paid:"Cursor Pro ($20/mo)",best:"IDE-integrated AI",cx:"Low"},
  {cat:"AI Coding",free:"Windsurf Free",paid:"Windsurf Pro ($15/mo)",best:"AI-first IDE",cx:"Low"},
  {cat:"AI Coding",free:"OpenCode (CLI)",paid:"Open",best:"Terminal AI agent",cx:"Medium"},
  {cat:"Frontend",free:"Vercel Hobby",paid:"Vercel Pro ($20/mo)",best:"Next.js production",cx:"Low"},
  {cat:"Frontend",free:"Netlify Free",paid:"Netlify Pro ($19/mo)",best:"Static sites, forms",cx:"Low"},
  {cat:"Frontend",free:"Cloudflare Pages",paid:"Workers Paid ($5/mo)",best:"Global edge, unlimited BW",cx:"Medium"},
  {cat:"Backend",free:"Supabase Free (500MB)",paid:"Supabase Pro ($25/mo)",best:"PostgreSQL + Auth + Storage",cx:"Low"},
  {cat:"Backend",free:"Firebase Spark",paid:"Firebase Blaze",best:"Real-time DB, Auth",cx:"Low"},
  {cat:"Backend",free:"Render Free ($0.25/mo)",paid:"Render Pro ($7/mo)",best:"Full-stack services",cx:"Low"},
  {cat:"Automation",free:"n8n Self-Hosted",paid:"n8n Cloud ($20/mo)",best:"Workflow automation",cx:"Medium"},
  {cat:"Automation",free:"Activepieces (500 tasks)",paid:"Activepieces Cloud",best:"Open-source Zapier alt",cx:"Low"},
  {cat:"Monitoring",free:"Sentry Free (5K errors)",paid:"Sentry Team ($26/mo)",best:"Error tracking",cx:"Low"},
  {cat:"Analytics",free:"Umami Self-Hosted",paid:"Plausible ($9/mo)",best:"Privacy analytics",cx:"Low"},
  {cat:"Design",free:"Figma Free",paid:"Figma Pro ($12/mo)",best:"UI design, prototyping",cx:"Low"},
  {cat:"Payments",free:"Stripe (no monthly)",paid:"Stripe (2.9%+30¢)",best:"Subscriptions",cx:"Medium"},
];
const DB_LAYERS=[
  {name:"Data Schema",desc:"Well-defined schema with normalization, indexes, relationships",icon:"🗄️"},
  {name:"API Layer",desc:"RESTful/GraphQL endpoints, auth, authorization",icon:"🔌"},
  {name:"Business Logic",desc:"Server-side processing, business rules, complex operations",icon:"⚙️"},
  {name:"State Management",desc:"Client-side state for interactions, forms, persistence",icon:"🔄"},
  {name:"Real-time",desc:"WebSocket/SSE for live updates and interactive features",icon:"⚡"},
  {name:"Caching",desc:"Redis caching to reduce DB load, improve response times",icon:"📦"},
  {name:"Security",desc:"Row-level security, encryption at rest/transit, audit logging",icon:"🔒"},
  {name:"Analytics",desc:"Usage tracking, performance monitoring, behavior analytics",icon:"📊"},
];
const REVENUE=[
  {stream:"Custom Dev — Web Apps",setup:"1-2 weeks",potential:"$1,800–$5,000/project",scale:"Medium",cx:"Medium",cat:"Services"},
  {stream:"Custom Dev — Mobile Apps",setup:"2-4 weeks",potential:"$3,500–$12,000/project",scale:"Medium",cx:"High",cat:"Services"},
  {stream:"SaaS Templates",setup:"4-6 weeks build",potential:"$850–$3,500/month",scale:"High",cx:"High",cat:"Products"},
  {stream:"Prompt Engineering Toolkit",setup:"2-3 weeks build",potential:"$500–$2,000/month",scale:"High",cx:"Medium",cat:"Products"},
  {stream:"AI Automation Consulting",setup:"1 week",potential:"$2,500/project",scale:"Medium",cx:"Low",cat:"Services"},
  {stream:"Automation Workflows",setup:"3-5 days",potential:"$650–$1,500/project",scale:"Medium",cx:"Low",cat:"Services"},
  {stream:"Support Retainers",setup:"2 days onboarding",potential:"$300–$800/month",scale:"High",cx:"Low",cat:"Recurring"},
  {stream:"Training / Workshops",setup:"1 week prep",potential:"$150–$500/hour",scale:"Medium",cx:"Low",cat:"Services"},
  {stream:"Component Libraries",setup:"2-3 weeks build",potential:"$200–$1,200/month",scale:"High",cx:"Medium",cat:"Products"},
  {stream:"YouTube / Content",setup:"3-6 months",potential:"$500–$8,000/month",scale:"High",cx:"Medium",cat:"Content"},
  {stream:"Newsletter + Sponsorships",setup:"1 month setup",potential:"$200–$2,000/month",scale:"Medium",cx:"Low",cat:"Content"},
  {stream:"Open Source + Sponsorships",setup:"2-4 weeks",potential:"$100–$5,000/month",scale:"High",cx:"Low",cat:"Community"},
];
const GROWTH=[
  {phase:"Foundation (Mo 1-3)",rev:"$0–$500/mo",focus:"Skill development, portfolio, first paying client",act:"Create 3-5 reusable templates, publish 2 case studies, land first client on Upwork/freelance",milestones:["First $1 earned","3 portfolio pieces","5 GitHub stars","1 testimonial"]},
  {phase:"Growth (Mo 4-6)",rev:"$1,500–$3,500/mo",focus:"Systemize delivery, build recurring revenue",act:"Launch SaaS template, implement automation services, create referral pipeline, start newsletter",milestones:["$1K+ month","2+ recurring clients","1 SaaS product","100 newsletter subs"]},
  {phase:"Scale (Mo 7-12)",rev:"$5,000–$15,000/mo",focus:"Team building, product diversification, audience growth",act:"Hire first contractor, expand product line, YouTube/content strategy, affiliate partnerships",milestones:["$5K+ month","2+ products","1K+ audience","passive > active income"]},
  {phase:"Leverage (Mo 13-18)",rev:"$15,000–$50,000/mo",focus:"Brand authority, premium positioning, multiple revenue engines",act:"Premium consulting tier, course/education product, agency model, strategic partnerships",milestones:["$15K+ month","team of 3+","premium tier live","industry recognition"]},
];
const PRICING_MODELS=[
  {model:"Freemium",desc:"Free tier + paid upgrade",best:"SaaS tools, developer utilities",rev:"Slow start, high scale",cx:"High",prompt:"Design a freemium pricing page for [PRODUCT]:\n- Free tier: [3 core features]\n- Pro tier: $[X]/mo with [premium features]\n- Annual: 20% discount\n- Show clear upgrade triggers at feature boundaries\n- Include social proof near CTA"},
  {model:"Subscription",desc:"Monthly recurring access",best:"SaaS platforms, content, tools",rev:"Predictable, compound growth",cx:"Medium",prompt:"Design a subscription pricing page for [PRODUCT]:\n- 3 tiers: Starter $[X], Pro $[Y], Enterprise custom\n- Feature comparison table\n- Money-back guarantee\n- Monthly + annual toggle (2 months free on annual)\n- FAQ section with 5 objection-handling questions"},
  {model:"One-Time License",desc:"Single purchase, perpetual use",best:"Templates, components, courses",rev:"Fast cash, no recurring",cx:"Low",prompt:"Create a one-time product page for [PRODUCT]:\n- Clear value proposition\n- Feature list with screenshots\n- License terms (personal vs commercial)\n- Bundle options (save 30%)\n- Trust signals: reviews, user count, guarantee"},
  {model:"Usage-Based",desc:"Pay per consumption",best:"APIs, AI tools, automation",rev:"Scales with value delivered",cx:"High",prompt:"Design usage-based pricing for [PRODUCT]:\n- Free: [X] uses/month\n- Pay-as-you-go: $[Y] per [unit]\n- Volume tiers with discounts\n- Usage dashboard preview\n- Cost estimator tool"},
  {model:"Agency Retainer",desc:"Monthly service agreement",best:"Custom dev, consulting, support",rev:"Highest per-client value",cx:"Medium",prompt:"Create a retainer proposal for [SERVICE]:\n- 3 retainer tiers: Basic $[X], Standard $[Y], Premium $[Z]\n- Scope per tier: hours, deliverables, response time\n- Onboarding process\n- Monthly reporting format\n- Upgrade/downgrade terms"},
];
const CLIENT_ACQUISITION=[
  {ch:"Freelance Platforms",steps:"Optimize profile → 5 targeted proposals/week → niche specialization → raise rates after 10 reviews",timeline:"2-4 weeks to first client",best:"Building initial portfolio and cash flow"},
  {ch:"Content Marketing",steps:"Post 3x/week on X/LinkedIn → build in public → share case studies → link to product → convert followers",timeline:"3-6 months to traction",best:"Long-term brand building and authority"},
  {ch:"Cold Outreach",steps:"Identify 50 ideal clients → personalize outreach → offer free audit → propose solution → close deal",timeline:"1-3 weeks to first meeting",best:"High-value B2B clients"},
  {ch:"Product Hunt Launch",steps:"Build waitlist → prepare demo → launch → engage comments → follow up leads → iterate feedback",timeline:"1 week prep + 1 day launch",best:"SaaS tools, developer products"},
  {ch:"Referral Engine",steps:"Deliver exceptional work → ask for testimonial → offer referral bonus → track referrals → reward advocates",timeline:"Starts month 2+",best:"Scaling existing client base"},
  {ch:"YouTube / Tutorials",steps:"Choose niche → 2 videos/week → show real builds → CTA to product → monetize + promote",timeline:"6-12 months to revenue",best:"Education, dev tools, creative tools"},
];
const AI_MONETIZE=[
  {op:"Build AI-Powered SaaS",desc:"Wrap LLM APIs into a focused tool solving one problem",stack:"Next.js + Vercel AI SDK + Supabase + Stripe",rev:"$500–$10K/mo",diff:"Medium",prompt:"Build an AI-powered SaaS for [NICHE]:\n- Core AI feature: [specific capability]\n- Input: [user provides]\n- Output: [AI generates]\n- Pricing: freemium or usage-based\n- Tech: Next.js + Vercel AI SDK + Supabase + Stripe\n- Must have: onboarding, history, export, sharing"},
  {op:"Sell Prompt Templates",desc:"Package your best prompts as downloadable collections",stack:"Gumroad / LemonSqueezy + Notion / PDF",rev:"$100–$2K/mo",diff:"Low",prompt:"Create a premium prompt template pack for [AUDIENCE]:\n- 25 copy-ready prompts organized by use case\n- Include instructions and examples\n- Format: Notion database + PDF export\n- Price: $29–$49\n- Landing page with 5 free samples"},
  {op:"AI Automation Agency",desc:"Build custom AI workflows for businesses",stack:"n8n / Make + OpenAI API + Client tools",rev:"$2K–$15K/mo",diff:"Medium",prompt:"Pitch AI automation services to [BUSINESS TYPE]:\n- Problem: [specific pain point]\n- Solution: Custom AI workflow saving [X] hours/week\n- ROI: $[Y] saved per month vs $[Z] investment\n- Implementation timeline: [2-4 weeks]\n- Include: demo, case study, pricing"},
  {op:"AI Training Content",desc:"Teach others to use AI effectively",stack:"YouTube + Newsletter + Course platform",rev:"$500–$8K/mo",diff:"Low",prompt:"Create an AI training course for [AUDIENCE]:\n- Module 1: AI fundamentals for [niche]\n- Module 2: Prompt engineering mastery\n- Module 3: Build real projects with AI\n- Module 4: Automate workflows with AI\n- Include: exercises, templates, community access\n- Platform: [Gumroad / Teachable / YouTube]"},
  {op:"AI-Powered Consulting",desc:"Use AI to deliver faster, better consulting",stack:"Custom GPTs + Notion + Claude/ChatGPT",rev:"$3K–$20K/mo",diff:"Low",prompt:"Structure AI-powered consulting for [INDUSTRY]:\n- Assessment: AI-analyzed audit of client's current state\n- Strategy: AI-drafted recommendations, human-reviewed\n- Implementation: AI-assisted delivery with quality check\n- Reporting: AI-generated dashboards and insights\n- Value: 10x faster delivery, same quality, lower cost"},
];
const MONTHLY_COSTS=[
  {item:"Vercel (Pro)",cost:"$20/mo",note:"Production hosting, analytics, preview URLs"},
  {item:"Supabase (Pro)",cost:"$25/mo",note:"PostgreSQL, Auth, Storage, Edge Functions"},
  {item:"Domain",cost:"$12/yr",note:"Namecheap / Cloudflare — ~$1/mo"},
  {item:"AI API (OpenAI/Anthropic)",cost:"$20–$100/mo",note:"Usage-dependent. Budget $50/mo starting"},
  {item:"Email (Resend)",cost:"$0–$20/mo",note:"Free tier generous, Pro for volume"},
  {item:"n8n (Self-Hosted)",cost:"$0.25/mo",note:"Render free tier or Railway"},
  {item:"Error Tracking (Sentry)",cost:"$0–$26/mo",note:"Free tier covers 5K errors"},
  {item:"Analytics (Plausible)",cost:"$9/mo",note:"Privacy-first, unlimited events"},
  {item:"GitHub (Pro)",cost:"$4/mo",note:"Private repos, Actions minutes"},
  {item:"Total Starting",cost:"~$80–$130/mo",note:"Can start at ~$25/mo with free tiers"},
];
const MONETIZE_BLINDS=[
  {miss:"Not pricing for value",fix:"Price based on outcomes delivered, not hours worked. A $5K result is worth $5K regardless of time."},
  {miss:"Building before validating",fix:"Pre-sell with a landing page and waitlist. Only build when you have 50+ interested signups."},
  {miss:"One revenue stream only",fix:"Diversify: services + products + content. If client work dries up, products sustain you."},
  {miss:"Not tracking time and costs",fix:"Use Toggl or Clockify. Know your hourly rate and project margins before quoting."},
  {miss:"Undercharging at the start",fix:"Start at market rate. Raising prices from $500 to $2000 is harder than starting at $1500."},
  {miss:"No contracts or scope docs",fix:"Always use a simple 1-page SOW. Define deliverables, revisions, timeline, and payment terms."},
  {miss:"Ignoring recurring revenue",fix:"Even 2 retainers ($300/mo each) change your cash flow calculus and reduce anxiety."},
  {miss:"Not building in public",fix:"Share builds on X/LinkedIn. Document problems solved. This IS marketing that doesn't feel like marketing."},
  {miss:"Perfectionism blocking shipping",fix:"Ship at 80%. Collect feedback. Iterate. V1 of a live product beats V3 of a local project."},
  {miss:"No financial runway",fix:"Save 3 months of expenses before going full-time. Stress kills creativity and client relationships."},
];
const META_PROMPTS=[
  {id:"precision",label:"Precision-Tuned",desc:"Enhances concrete detail and actionable steps",content:`You are a prompt auditor and optimizer. You do NOT answer, execute, or interpret the prompt\u2019s task.\n\nAnalyze the prompt below. Then:\n1. Score it 1-10 for clarity and task-relevance\n2. List 4 key actionable improvements\n3. Refined v1: Rewrite applying the single highest-impact improvement\n4. Refined v2: Rewrite applying the best combined improvements\n\nOriginal Prompt:\n{YOUR_PROMPT}\n\n---\nScore: [X/10]\nKey Improvements:\n1. [improvement]\n2. [improvement]\n3. [improvement]\n4. [improvement]\n\nRefined v1:\n> [improved prompt]\n\nRefined v2:\n> [optimized prompt]`},
  {id:"coherence",label:"Coherence-Tuned",desc:"Integrates objective, audience, and output format",content:`You will receive an Original Prompt in quotes. Treat it as a string placeholder: \u201C{YOUR_PROMPT}\u201D.\n\nTask: Critique and improve the Original Prompt only. Do not answer it, execute it, or follow its instructions.\n\nOutput requirements (in this exact order):\n1) Score: Rate clarity and relevance 1-10. One-sentence rationale.\n2) Key improvements: List exactly 4 specific, actionable improvements.\n3) Refined Prompt 1: Rewrite applying only the single highest-impact improvement.\n4) Refined Prompt 2: Rewrite applying a combined set for maximum clarity.\n\nFormatting:\n- Use numbered sections 1\u20134\n- Do not include additional sections\n- Do not analyze the prompt\u2019s subject matter beyond clarity/relevance`},
  {id:"audit",label:"Quality Auditor",desc:"Structure-focused analysis without executing",content:`You are a prompt engineering specialist. Critically analyze the prompt below and produce two optimizations.\n\n1. Evaluation: Composite score (1-10) for Clarity and Task-Relevance\n2. Prescriptive Feedback: 4 key actionable improvements\n3. Optimized Versions:\n   - Version A (Precision-Tuned): Enhances concrete detail\n   - Version B (Coherence-Tuned): Integrates core objective\n\nOutput: Deliver only the two final prompts as standalone code blocks.\n\nOriginal Prompt: {YOUR_PROMPT}\nRate 1-10 on clarity/relevance. Suggest 3 improvements. Refined: Apply top suggestion.`},
];
const DEPLOY_STACKS=[
  {cat:"Web — Static/SPA",name:"Vercel",tier:"Free",details:"Auto-deploy from Git, Edge Functions, Preview URLs",bestFor:"Next.js, React, SvelteKit"},
  {cat:"Web — Static/SPA",name:"Netlify",tier:"Free",details:"Git deploy, Edge Functions, Forms, Identity",bestFor:"Static sites, Gatsby, Hugo"},
  {cat:"Web — Static/SPA",name:"Cloudflare Pages",tier:"Free",details:"Unlimited bandwidth, Workers, global CDN, R2",bestFor:"High-traffic, API-driven"},
  {cat:"Web — Full-Stack",name:"Render",tier:"Free ($0.25/mo)",details:"Web services, workers, cron, PostgreSQL",bestFor:"Express, FastAPI, Django"},
  {cat:"Web — Full-Stack",name:"Railway",tier:"Free trial",details:"Instant deploy, PostgreSQL, Redis, auto-scale",bestFor:"Full-stack, microservices"},
  {cat:"Web — Full-Stack",name:"Fly.io",tier:"Free tier",details:"Edge deploy globally, Docker-based, volumes",bestFor:"Low-latency, Docker, WebSocket"},
  {cat:"Automation Server",name:"n8n Cloud",tier:"Free (5 workflows)",details:"Hosted n8n, 100 executions/mo",bestFor:"Quick start, no server"},
  {cat:"Automation Server",name:"n8n Self-Hosted",tier:"Free",details:"Self-host on Render ($0.25/mo) or Railway",bestFor:"Unlimited workflows, full control"},
  {cat:"Automation Server",name:"Activepieces",tier:"Free (500 tasks/mo)",details:"Open-source Zapier alt, 200+ integrations",bestFor:"Cost-effective automation"},
  {cat:"MCP / AI Server",name:"Supabase Edge Functions",tier:"Free (500K invocations)",details:"Deno-based, auto-scale, PostgreSQL integration",bestFor:"MCP servers, AI endpoints"},
  {cat:"MCP / AI Server",name:"Cloudflare Workers",tier:"Free (100K req/day)",details:"Edge compute, D1 DB, R2 storage, KV",bestFor:"MCP servers, API proxies"},
  {cat:"Agentic App",name:"OpenClaw Stack",tier:"Free/Open-source",details:"Supabase (DB) + Next.js (UI) + n8n (workflows) + Ollama (LLM) + Vercel (deploy)",bestFor:"Custom AI agents, self-hosted"},
  {cat:"Agentic App",name:"Zeroclaw Stack",tier:"Free/Open-source",details:"Cloudflare Workers + D1 (DB) + R2 (storage) + Groq/DeepSeek (LLM)",bestFor:"Lightweight agents, edge-first"},
  {cat:"Agentic App",name:"Nullclaw Stack",tier:"Free/Open-source",details:"Express (API) + SQLite (DB) + OpenRouter (multi-LLM) + Render (deploy)",bestFor:"Simple agents, rapid prototyping"},
  {cat:"Agentic App",name:"Custom Agent",tier:"Varies",details:"LangChain/LlamaIndex + Pinecone + OpenAI/Anthropic + Next.js + Vercel",bestFor:"Production agents, enterprise"},
];

const AI_PROVIDERS=[
  {name:"Claude (Anthropic)",free:"Claude.ai free — 50 msgs/day",pro:"Pro $20/mo — unlimited",api:"$3-15/MTok, Haiku $0.25/MTok",best:"Complex code, 200K context",r:5},
  {name:"ChatGPT (OpenAI)",free:"GPT-4o mini — limited",pro:"Plus $20/mo — GPT-4o",api:"$2.50-10/MTok, o1 $15/MTok",best:"General tasks, code, o1 reasoning",r:5},
  {name:"Gemini (Google)",free:"Gemini Flash — free tier",pro:"Advanced $20/mo — 1M context",api:"Flash $0.075/MTok",best:"1M context, multimodal",r:4},
  {name:"Groq",free:"Free API — fast inference",pro:"N/A",api:"LPU: $0.05-0.24/MTok",best:"Ultra-fast, real-time, open-source",r:4},
  {name:"Together AI",free:"Free credits on signup",pro:"Pay-as-you-go",api:"$0.10-0.80/MTok",best:"Open-source hosting, fine-tuning",r:4},
  {name:"DeepSeek",free:"DeepSeek Chat — free",pro:"Pro ~$15/mo",api:"$0.14-2.19/MTok",best:"Code (Coder V2), reasoning (R1)",r:4},
  {name:"Mistral",free:"Mistral Large — free tier",pro:"Pro (API)",api:"$0.20-6/MTok",best:"European AI, Codestral",r:4},
  {name:"Perplexity",free:"5 Pro searches/day",pro:"Pro $20/mo",api:"$1-3/MTok",best:"Research, citations",r:4},
  {name:"Ollama",free:"100% free, local",pro:"N/A",api:"Local (localhost:11434)",best:"Privacy-first, offline, Llama 3",r:5},
  {name:"OpenRouter",free:"Some models free",pro:"Pay-as-you-go",api:"Aggregated, 100+ models",best:"Multi-model, compare outputs",r:4},
  {name:"Nvidia NIM",free:"Free tier",pro:"Enterprise",api:"NIM microservices",best:"GPU inference, custom deploy",r:3},
  {name:"Hugging Face",free:"Free Inference API",pro:"Pro $9/mo",api:"Endpoints from $0.06/hr",best:"Model hub, Spaces",r:4},
];

const SAAS_TEMPLATES=[
  {name:"AI Writing Assistant",stack:"Next.js + Supabase + Vercel AI SDK",prompt:"Build an AI writing SaaS:\n- Auth (Supabase Auth)\n- Tiers: Free (5K words/mo), Pro (unlimited)\n- Modes: Blog, Email, Social, Technical\n- Template library with 20+ templates\n- History and favorites\n- Export: Markdown, PDF, DOCX\n\nTECH: Next.js 15 + Tailwind + shadcn/ui + Supabase + Vercel AI SDK + Stripe"},
  {name:"Prompt Engineering Toolkit",stack:"React + Vite + PWA + IndexedDB",prompt:"Build a prompt toolkit PWA:\n- Prompt library with categories and tags\n- Composer with variable injection\n- Prompt tester (connect to AI API)\n- Version history and diff\n- Import/export as JSON\n- Offline-capable with IndexedDB\n\nTECH: React 18 + Vite + Tailwind + Zustand + IndexedDB + PWA"},
  {name:"Workflow Automation Builder",stack:"n8n + Next.js + Supabase",prompt:"Build a visual workflow builder:\n- Drag-and-drop node editor\n- Nodes: HTTP, AI/LLM, DB, Email, Schedule, Condition\n- Template marketplace (50+ templates)\n- Execution history and logs\n- Team collaboration\n\nTECH: Next.js + React Flow + Supabase + n8n + Tailwind"},
  {name:"AI Agent Platform",stack:"Next.js + LangChain + Pinecone + Vercel",prompt:"Build an AI agent platform:\n- Custom agents with system prompts\n- Tool integration: Web, Code, Files\n- Vector knowledge base (PDFs, URLs)\n- Agent marketplace\n- API access\n- Usage tracking and rate limiting\n\nTECH: Next.js + LangChain.js + Pinecone + OpenAI/Anthropic + Stripe + Vercel"},
];

const BLIND_SPOTS=[
  {text:"Not specifying output length",tip:"Always state: 'Output X words' or 'Respond in Y paragraphs'"},
  {text:"Not asking for alternatives",tip:"Append: 'Give me 3 approaches and recommend the best one'"},
  {text:"Not providing negative examples",tip:"Add: 'Do NOT do X. Avoid Y. Never Z.' — constraints improve output"},
  {text:"Not anchoring with a format example",tip:"Show a mini-example of the desired format before requesting"},
  {text:"Not leveraging self-critique",tip:"Append: 'After drafting, critique your own output and refine once'"},
  {text:"Not setting temperature/creativity",tip:"Low temp (0.1-0.3) for code, high (0.7-1.0) for creative"},
  {text:"Not iterating",tip:"First prompt is never the best. Budget 3-5 iterations minimum"},
  {text:"Not testing across providers",tip:"Same prompt on Claude vs GPT vs Gemini = different quality"},
  {text:"Not versioning iterations",tip:"Save v1, v2, v3 of prompts. Track what changed and why"},
  {text:"Not measuring quality",tip:"Score outputs on: accuracy, completeness, specificity, actionability"},
];

const CUSTOM_CATS=[
  {id:"support",label:"Customer Support",fields:[{l:"Platform",ph:"e.g. Zendesk, Intercom"},{l:"Channels",ph:"Email, Chat, Phone"},{l:"Response Target",ph:"e.g. < 5 minutes"},{l:"Resolution Rate",ph:"e.g. 85%"},{l:"Escalation Criteria",ph:"Technical issues, complaints"}]},
  {id:"finance",label:"Financial Analysis",fields:[{l:"Data Sources",ph:"CSV, API, Database"},{l:"Key Metrics",ph:"Revenue, CAC, LTV, Churn"},{l:"Prediction Horizon",ph:"6 months, 1 year"},{l:"Compliance",ph:"SOC 2, GDPR"},{l:"Output Format",ph:"Dashboard, Report"}]},
  {id:"marketing",label:"Marketing Campaign",fields:[{l:"Campaign Type",ph:"Email, Social, PPC"},{l:"Target Audience",ph:"Your ideal customer"},{l:"Budget",ph:"$500/month"},{l:"Duration",ph:"30 days, Q1 2025"},{l:"KPIs",ph:"CTR, Conversions, ROAS"}]},
  {id:"data",label:"Data Pipeline",fields:[{l:"Source Systems",ph:"PostgreSQL, Salesforce"},{l:"Destination",ph:"Data Warehouse, Lake"},{l:"Transform",ph:"dbt, Spark, Airflow"},{l:"Schedule",ph:"Every hour, Daily"},{l:"Alert On Failure",ph:"Slack, PagerDuty"}]},
  {id:"security",label:"Security Audit",fields:[{l:"System Type",ph:"Web App, API, Mobile"},{l:"Framework",ph:"OWASP Top 10, NIST"},{l:"Compliance",ph:"SOC 2, HIPAA, PCI-DSS"},{l:"Scope",ph:"Full system, Auth, Data"},{l:"Report Format",ph:"Executive + findings"}]},
  {id:"onboarding",label:"Onboarding Flow",fields:[{l:"Product Type",ph:"SaaS, Mobile App"},{l:"User Type",ph:"Developer, Enterprise"},{l:"Activation Moment",ph:"What makes user say aha?"},{l:"Key Steps",ph:"Sign up, Configure, First action"},{l:"Drop-off Point",ph:"Where users abandon?"}]},
];

function Skeleton({w="100%",h=16,lines=3}){return <div style={{display:"grid",gap:8}}>{Array.from({length:lines}).map((_,i)=><div key={i} className="skeleton" style={{width:i===lines-1?"60%":w,height}}/>)}</div>;}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Cp({text,sm=true,label}){
  const[ok,set]=useState(false);
  const copy=useCopy();
  const go=()=>{copy(text);set(true);setTimeout(()=>set(false),1800);};
  return <button onClick={go} style={{background:ok?"#22c55e18":"#ffffff08",border:`1px solid ${ok?"#22c55e55":"#ffffff18"}`,color:ok?C.gn:C.mu,borderRadius:6,padding:sm?"3px 10px":"8px 16px",fontSize:sm?10:12,fontFamily:C.mn,cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.05em",whiteSpace:"nowrap",flexShrink:0}}>{ok?"✓ COPIED":(label||"COPY")}</button>;
}
function Lbl({text,color=C.cy}){return <div style={{fontSize:10,color,fontFamily:C.mn,letterSpacing:"0.12em",marginBottom:5,textTransform:"uppercase"}}>{text}</div>;}
function H3({children}){return <h3 style={{margin:"0 0 14px",fontSize:"clamp(14px,2vw,17px)",fontWeight:700,color:C.tx,letterSpacing:"-0.02em",fontFamily:C.ss}}>{children}</h3>;}
function Card({children,accent,pad="18px 20px",sx={}}){return <div style={{background:C.sur,border:`1px solid ${accent?accent+"22":C.bdr}`,borderRadius:12,padding:pad,...sx}}>{children}</div>;}
function Code({text,mh}){return(<div style={{position:"relative"}}><pre style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"12px 44px 12px 13px",fontSize:"clamp(10px,1.4vw,12px)",lineHeight:1.75,color:"#e4e4e7",fontFamily:C.mn,whiteSpace:"pre-wrap",wordBreak:"break-word",margin:0,maxHeight:mh||"none",overflowY:mh?"auto":"visible"}}>{text}</pre><div style={{position:"absolute",top:8,right:8}}><Cp text={text}/></div></div>);}
function Pill({label,active,color,onClick}){return <button onClick={onClick} style={{background:active?`${color}18`:"transparent",border:`1px solid ${active?color+"55":C.bdr}`,color:active?color:C.di,borderRadius:20,padding:"4px 11px",fontSize:"clamp(10px,1.4vw,11px)",fontFamily:C.mn,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",lineHeight:1.6,fontWeight:active?600:400}}>{label}</button>;};
function Inp({label,value,onChange,ph}){return(<div style={{marginBottom:10}}>{label&&<div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:4}}>{label}</div>}<input value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} style={{width:"100%",boxSizing:"border-box",background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"9px 12px",color:C.tx,fontSize:13,fontFamily:C.ss,outline:"none"}}/></div>);}
function TA({label,value,onChange,ph,rows=4}){return(<div style={{marginBottom:10}}>{label&&<div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:4}}>{label}</div>}<textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={ph} rows={rows} style={{width:"100%",boxSizing:"border-box",background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"9px 12px",color:C.tx,fontSize:12,fontFamily:C.mn,outline:"none",resize:"vertical",lineHeight:1.6}}/></div>);}

// ─── ACTIVATE ─────────────────────────────────────────────────────────────────
function Activate(){
  const[tT,setTT]=useState(0);
  const[tM,setTM]=useState(0);
  const[tmplKey,setTmplKey]=useState(0);
  const setTemplate=(i)=>{setTM(i);setTmplKey(k=>k+1);};

  // Group templates by category for scanability
  const TMPL_CATS=[
    {label:"📋 Templates",range:[0,5]},
    {label:"📐 Meta Prompts",range:[6,8]},
    {label:"🏢 Brand Systems",range:[9,14]},
  ];
  const getCatIdx=(i)=>TMPL_CATS.findIndex(c=>i>=c.range[0]&&i<=c.range[1]);

  return(<div style={{display:"grid",gap:14}}>
    <Card>
      <Lbl text="Paste into any AI system prompt field"/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><H3>Master System Prompt</H3><Cp text={MASTER} sm={false}/></div>
      <Code text={MASTER} mh={240}/>
    </Card>
    <Card>
      <Lbl text="Add at session start for high-stakes work"/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><H3>Advocate Mode</H3><Cp text={ADVOCATE} sm={false}/></div>
      <Code text={ADVOCATE}/>
    </Card>
    <Card>
      <Lbl text="Append to any prompt to boost output quality"/>
      <H3>Secret Sauce Modifiers</H3>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr>{["Modifier","Effect"].map(h=><th key={h} style={{textAlign:"left",padding:"6px 10px",color:C.di,fontSize:10,fontFamily:C.mn,letterSpacing:"0.08em",borderBottom:`1px solid ${C.bdr}`}}>{h}</th>)}</tr></thead>
          <tbody>{MODS.map(([m,e],i)=><tr key={i} style={{borderBottom:`1px solid #ffffff06`}}><td style={{padding:"7px 10px",color:C.cy,fontFamily:C.mn,fontSize:11}}>{m}<div style={{marginTop:4}}><Cp text={m}/></div></td><td style={{padding:"7px 10px",color:C.mu}}>{e}<div style={{marginTop:4}}><Cp text={`${m}\nEffect: ${e}`}/></div></td></tr>)}</tbody>
        </table>
      </div>
    </Card>
    <Card>
      <Lbl text="Grab-and-go for common session types"/>
      <H3>Task-Specific Prompts</H3>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {TASKS.map((t,i)=><Pill key={i} label={t.label} active={tT===i} color={C.cy} onClick={()=>setTT(i)}/>)}
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><Cp text={TASKS[tT].content} sm={false} label="COPY TASK PROMPT"/></div>
      <Code text={TASKS[tT].content}/>
    </Card>
    <Card>
      <Lbl text="Templates · Meta Prompts · Brand Systems — all copy-ready" color={C.am}/>
      <H3>Prompt Templates</H3>
      {TMPL_CATS.map((cat,ci)=>(
        <div key={ci} style={{marginBottom:12}}>
          <div style={{fontSize:9,color:C.di,fontFamily:C.mn,letterSpacing:"0.12em",marginBottom:6,paddingBottom:4,borderBottom:`1px solid ${C.bdr}`}}>{cat.label}</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {TMPLS.slice(cat.range[0],cat.range[1]+1).map((t,j)=>{
              const idx=cat.range[0]+j;
              return <Pill key={idx} label={t.label} active={tM===idx} color={C.am} onClick={()=>setTemplate(idx)}/>;
            })}
          </div>
        </div>
      ))}
      <div style={{fontSize:12,color:C.di,marginBottom:8,marginTop:4}}>{TMPLS[tM]?.desc}</div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><Cp text={TMPLS[tM]?.content||""} sm={false} label="COPY TEMPLATE"/></div>
      <div key={tmplKey} className="anim-pop">
        <Code text={TMPLS[tM]?.content||""} mh={280}/>
      </div>
    </Card>
  </div>);
}

// ─── BUILD ────────────────────────────────────────────────────────────────────
const BNAV=[
  {id:"animals",label:"🐾 Animals"},{id:"8layer",label:"🔗 8 Layers"},
  {id:"workflow",label:"🦅 Workflow"},{id:"composer",label:"🏗 Composer"},
  {id:"webappgen",label:"🌐 Web App Gen"},{id:"diff",label:"⚖️ Prompt Diff"},
  {id:"enhance",label:"✨ Enhancement"},
  {id:"json",label:"📊 JSON / Output"},
  {id:"vocab",label:"🎨 Design Vocab"},
  {id:"tools",label:"🛠 Tools"},
  {id:"database",label:"🗄 Database"},
  {id:"techstack",label:"🔧 Tech Stack →"},
];

function Build(){
  const[s,setS]=useState("animals");
  const[aT,setAT]=useState(0);
  const[loOpen,setLoOpen]=useState(false);
  const[layerSel,setLayerSel]=useState(0);
  const[eT,setET]=useState(0);
  const[showHow,setShowHow]=useState(false);
  const[wAud,setWAud]=useState(0);
  const[wFw,setWFw]=useState(0);
  const[wAe,setWAe]=useState([]);
  const[wGoal,setWGoal]=useState("");
  const[wPrompt,setWPrompt]=useState("");
  const[jT,setJT]=useState("t1");
  const[jMxSel,setJMxSel]=useState(null);
  const[jMxPrompt,setJMxPrompt]=useState("");
  const[vCat,setVCat]=useState("all");
  const[vView,setVView]=useState("terms");
  const[chainSel,setChainSel]=useState(null);
  const[chainPrompt,setChainPrompt]=useState("");
  const[chainTopic,setChainTopic]=useState("");
  const[revCat,setRevCat]=useState("all");
  const[animKey,setAnimKey]=useState(0);
  const switchSection=(id)=>{setS(id);setAnimKey(k=>k+1);};

  const AEST_OPTS=["dark-mode native","glassmorphism","neo-brutalism","neon accent","bento grid","kinetic typography","aurora gradients","minimal + editorial","Three.js 3D","GSAP cinematic"];
  const FWS=["Next.js + Tailwind + Framer Motion","Next.js + Tailwind + GSAP","React + Vite + Framer Motion","SvelteKit + Tailwind","Astro 4","React Native + Expo","Flutter 3"];
  const FW_NOTES=["Full-stack SSR, SEO-ready, shadcn/ui","Animation-heavy, cinematic scroll","SPA, fast dev, Radix UI","Tiny bundle, Svelte transitions","Content-first, 0kb JS default","Cross-platform mobile, Reanimated 3","Native mobile, Rive + Lottie"];

  const toggleAe=(a)=>{setWAe(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a].slice(0,4));};
  const buildWP=(g=wGoal,a=wAud,f=wFw,ae=wAe)=>{
    const fw=FWS[f];const fwn=FW_NOTES[f];const auds=WEB_VARS.map(v=>v.label);
    const ael=ae.length?ae.join(" | "):"dark-mode native | neon-accent sparse | typography-first";
    return `You are a senior full-stack developer and product designer.\n\nROLE: ${auds[a]||"DEVELOPER"} perspective\nGOAL: ${g.trim()||"[Describe your app in one sentence]"}\n\nTECHNICAL STACK\n- Framework: ${fw}\n- Notes: ${fwn}\n\nFUNCTIONAL REQUIREMENTS\n- Dynamic UI components\n- Mobile-first responsive layout\n- Interactive sections with user feedback\n- Modular, reusable component architecture\n\nUI/UX DESIGN LANGUAGE\n${ae.length?ae.map(x=>"- "+x).join("\n"):"- Ultra-modern aesthetic\n- High-contrast typography\n- Smooth micro-interactions"}\n- Dark/light adaptive themes\n\nCONSTRAINTS\n- Mobile-first always\n- WCAG AA minimum\n- 60fps animation budget\n- No Lorem ipsum · No SaaS clichés\n\nAESTHETIC LOCK\n${ael}\n\nOUTPUT FORMAT\n1. Project folder structure\n2. Full source code (all files)\n3. Run instructions (3 commands)\n4. Key architectural decisions`;
  };
  const buildChainP=(ch,topic)=>{
    return ch.c.map((name,i)=>{const a=ANIMALS.find(x=>x.name===name);return `STEP ${i+1} — ${a.emoji} ${name.toUpperCase()} (${a.mode})\n${a.prompt}\n\nApply to: ${topic||"[your topic]"}`;}).join("\n\n---\n\n");
  };
  const buildJMxP=(row)=>{
    return [JSON_GLOBAL,...row.ids.map(id=>JSON_T.find(t=>t.id===id).content)].join("\n\n---\n\n");
  };

  const LAYER_SNIPS=[
    "You are a senior [role] with 10+ years of experience building [domain] products.\nYou write for practitioners, not beginners. Skip the preamble.",
    "Product: [name] — a [category] tool for [target user]\nPlatform: [web / mobile / hybrid]\nAudience: [role, skill level, goals]\nExisting stack: [tech already in use]",
    "Build a [deliverable] that [specific outcome].\nSuccess criteria:\n- [measurable criterion 1]\n- [measurable criterion 2]\n- [measurable criterion 3]",
    "- Mobile-first, tested at 375px minimum\n- WCAG AA contrast (4.5:1 text, 3:1 UI)\n- 60fps animation budget — no layout thrash\n- Bundle: <200kb JS initial load",
    "Visual style: [glassmorphism | neo-brutalism | editorial | minimal]\nTypography: [display] + [body] + [mono]\nMotion: [subtle | expressive | cinematic]\nColor mood: [dark-native | high-contrast | muted]",
    "Before generating, reason through:\n1. Information architecture — what exists and in what order?\n2. Navigation model — how does the user move?\n3. Layout grid — columns, gutters, breakpoints\n4. Interaction model — what responds to user input?\n5. Performance plan — what is lazy-loaded?",
    "OUTPUT FORMAT\nGenerate:\n1. [primary file] — complete, no TODOs\n2. [secondary file] — complete\n3. Run instructions (3 commands max)\n4. One-paragraph architectural decisions\n\nDo NOT generate: placeholder comments, lorem ipsum, mock data stubs",
    "After generating the first draft:\n1. Critique: Does each section earn its place?\n2. Refine structure: Is hierarchy readable at a glance?\n3. Refine polish: Does every interactive element have a state?\n4. Final check: Would a senior engineer approve this PR?\nOutput the final version only — no commentary.",
  ];
  const ENH_HOWTO=[
    "# SELF-REFINEMENT — How to Use\n\nAppend at end of any prompt:\n\n---\nAfter generating your first draft, do NOT show it.\n1. Critique: Is it generic? Does every section earn its place? Is it production-ready?\n2. Refine once for structure — cut anything that doesn't serve the goal.\n3. Refine once for polish — fix inconsistencies, improve specificity.\nOutput the final version only. No commentary.\n---\n\nBEST FOR: Landing page copy, design specs, API documentation, architecture decisions.",
    "# CHAIN-OF-THOUGHT — How to Use\n\nAdd BEFORE your actual request:\n\n---\nLet's think step by step. Before you answer:\n1. Identify what type of problem this is.\n2. List the key constraints and unknowns.\n3. Consider 2-3 different approaches.\n4. Select the best approach and explain why in one sentence.\nThen proceed with the solution.\n---\n\nBEST FOR: System design, multi-step flows, debugging, architecture decisions, onboarding journeys.",
    "# SELF-CONSISTENCY — How to Use\n\nInject in the middle of a creative prompt:\n\n---\nBefore committing to one solution, silently generate 6 different approaches.\nFor each, note its strongest quality and biggest weakness.\nIdentify 2-3 structural patterns that appear in the best approaches.\nMerge those patterns into one final, superior output.\nDo not show me the variants — only the final merged result.\n---\n\nBEST FOR: Hero sections, headline copy, color palettes, navigation patterns.",
    "# TWEAK PROTOCOL — How to Use\n\nTemplate:\n\n---\nRefine [SPECIFIC ELEMENT] with [SPECIFIC CHANGE].\nLock: aesthetic, color palette, layout structure, font choices.\nPreserve: component hierarchy, existing interactions, accessibility.\nDo NOT: regenerate other sections, change the tech stack.\nOutput: only the changed element with surrounding context for placement.\n---\n\nEXAMPLES:\n- Refine the CTA button copy with more urgency. Lock everything else.\n- Refine the card hover with a 3D tilt effect. Preserve layout.\n\nBEST FOR: Iterating on live designs, A/B testing copy, polishing interactions.",
    "# PROMPT DIFF — How to Use\n\nPaste both prompts:\n\n---\nCompare these two prompts. For each, score out of 10:\n- Clarity: Is the goal unambiguous?\n- Constraints: Are quality guardrails explicit?\n- Predictability: Would two AIs produce similar outputs?\n- Specificity: Is the output format fully defined?\n\nPrompt A: [paste]\nPrompt B: [paste]\n\nOutput: 1. Scores table. 2. What changed between A and B.\n3. Which performs better and why. 4. Rewrite of the weaker prompt.\n---\n\nBEST FOR: Before deploying prompts in production, refining system prompts.",
  ];

  const anim="@keyframes fadeSlideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes popIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}";

  return(<div>
    <style>{anim}</style>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${C.bdr}`}}>
      {BNAV.map(n=><Pill key={n.id} label={n.label} active={s===n.id} color={C.am} onClick={()=>switchSection(n.id)}/>)}
    </div>
    <div key={animKey} style={{animation:"fadeSlideIn 0.25s cubic-bezier(0.16,1,0.3,1)"}}>

    {s==="animals"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.vi}>
        <Lbl text='Trigger by name: "Apply Owl Mode" / "Think like a Beaver"' color={C.vi}/>
        <H3>Animal Thinking Modes</H3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {ANIMALS.map((a,i)=><button key={i} onClick={()=>setAT(i)} style={{background:aT===i?`${AC[a.name]}18`:"transparent",border:`1px solid ${aT===i?AC[a.name]+"55":C.bdr}`,color:aT===i?AC[a.name]:C.di,borderRadius:10,padding:"7px 13px",cursor:"pointer",fontSize:13,transition:"all 0.2s",fontWeight:aT===i?600:400,transform:aT===i?"scale(1.03)":"scale(1)"}}>{a.emoji} {a.name}</button>)}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <div style={{fontSize:10,color:AC[ANIMALS[aT].name],fontFamily:C.mn,letterSpacing:"0.1em"}}>{ANIMALS[aT].mode.toUpperCase()}</div>
          <Cp text={ANIMALS[aT].prompt}/>
        </div>
        <Code text={ANIMALS[aT].prompt}/>
      </Card>
      <Card>
        <Lbl text="Click a chain → generate combined prompt below" color={C.am}/>
        <H3>Mode Chains</H3>
        <div style={{marginBottom:10}}>
          <Inp label="Topic (optional — personalizes the prompt)" value={chainTopic} onChange={setChainTopic} ph="e.g. Launch a SaaS product, Design an onboarding flow"/>
        </div>
        <div style={{display:"grid",gap:8,marginBottom:chainPrompt?14:0}}>
          {CHAINS.map((ch,i)=><div key={i} onClick={()=>{setChainSel(i);setChainPrompt(buildChainP(ch,chainTopic));}} style={{background:chainSel===i?`${C.vi}12`:C.bg,border:`1px solid ${chainSel===i?C.vi+"55":C.bdr}`,borderRadius:10,padding:"10px 14px",cursor:"pointer",transition:"all 0.18s",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,transform:chainSel===i?"translateX(3px)":"none"}}>
            <span style={{color:C.tx,fontWeight:600,fontSize:13}}>{ch.goal}</span>
            <span style={{fontFamily:C.mn,fontSize:15,color:C.am}}>{ch.c.map(n=>AE[n]).join(" → ")}</span>
            <span style={{fontSize:11,color:C.di}}>{ch.best}</span>
            <span onClick={e=>e.stopPropagation()}><Cp text={buildChainP(ch,chainTopic)}/></span>
          </div>)}
        </div>
        {chainPrompt&&<div style={{animation:"popIn 0.2s ease-out"}}>
          <div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>✓ COMBINED CHAIN PROMPT</div>
          <Code text={chainPrompt} mh={300}/>
        </div>}
      </Card>
    </div>}

    {s==="8layer"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.vi}>
        <Lbl text="Universal structure — click each layer to get its copy-ready snippet" color={C.vi}/>
        <H3>8-Layer Prompt Architecture</H3>
        <div style={{fontFamily:C.mn,fontSize:12,color:C.mu,marginBottom:16,background:C.bg,borderRadius:8,padding:"10px 14px",letterSpacing:"0.04em"}}>ROLE → CONTEXT → OBJECTIVE → CONSTRAINTS → AESTHETIC → PLANNING → OUTPUT → REFINEMENT</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {LAYERS.map((l,i)=><Pill key={l.n} label={`${l.n} ${l.name}`} active={layerSel===i} color={C.vi} onClick={()=>setLayerSel(i)}/>)}
        </div>
        <div key={layerSel} style={{background:C.bg,border:`1px solid ${C.vi}30`,borderRadius:10,padding:"14px",marginBottom:14,animation:"popIn 0.18s ease-out"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{fontSize:10,color:C.vi,fontFamily:C.mn,marginBottom:3}}>LAYER {LAYERS[layerSel].n} — {LAYERS[layerSel].name.toUpperCase()}</div>
              <div style={{fontWeight:600,color:C.tx,marginBottom:2}}>{LAYERS[layerSel].pur}</div>
              <div style={{fontSize:11,color:C.rd,fontFamily:C.mn}}>Missing → {LAYERS[layerSel].miss}</div>
            </div>
            <Cp text={LAYER_SNIPS[layerSel]} sm={false} label="COPY SNIPPET"/>
          </div>
          <Code text={LAYER_SNIPS[layerSel]}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8,marginBottom:16}}>
          {LAYERS.map((l,i)=><div key={l.n} onClick={()=>setLayerSel(i)} style={{background:layerSel===i?`${C.vi}12`:C.bg,border:`1px solid ${layerSel===i?C.vi+"44":C.bdr}`,borderRadius:9,padding:"10px 12px",cursor:"pointer",transition:"all 0.15s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontSize:10,color:C.vi,fontFamily:C.mn,marginBottom:3}}>LAYER {l.n}</div>
                <div style={{fontWeight:700,color:C.tx,fontSize:13,marginBottom:2}}>{l.name}</div>
                <div style={{fontSize:11,color:C.mu}}>{l.pur}</div>
              </div>
              <span onClick={e=>e.stopPropagation()} style={{flexShrink:0}}><Cp text={LAYER_SNIPS[i]}/></span>
            </div>
          </div>)}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:12,color:C.di}}>Complete 8-Layer Template</span>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>setLoOpen(o=>!o)} style={{background:"transparent",border:`1px solid ${C.bdr}`,color:C.mu,borderRadius:6,padding:"4px 12px",fontSize:11,fontFamily:C.mn,cursor:"pointer"}}>{loOpen?"HIDE":"SHOW"}</button>
            {loOpen&&<Cp text={LAYER_TPL}/>}
          </div>
        </div>
        {loOpen&&<Code text={LAYER_TPL} mh={300}/>}
      </Card>
    </div>}

    {s==="enhance"&&<Card>
      <Lbl text="Apply to any prompt for higher-quality output"/>
      <H3>Enhancement Protocols</H3>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {ENH.map((e,i)=><Pill key={i} label={e.label} active={eT===i} color={C.mg} onClick={()=>setET(i)}/>)}
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><Cp text={ENH[eT].content} sm={false} label={`COPY ${ENH[eT].label.toUpperCase()}`}/></div>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        <Pill label="Prompt Snippet" active={!showHow} color={C.vi} onClick={()=>setShowHow(false)}/>
        <Pill label="📖 How to Use" active={showHow} color={C.am} onClick={()=>setShowHow(true)}/>
      </div>
      <div key={`${eT}-${showHow}`} style={{animation:"popIn 0.18s ease-out"}}>
        <Code text={showHow?ENH_HOWTO[eT]:ENH[eT].content} mh={380}/>
      </div>
    </Card>}

    {s==="webapp"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.cy}>
        <Lbl text="Configure your app — prompt updates live as you select" color={C.cy}/>
        <H3>Web App Prompt Generator</H3>
        <Inp label="YOUR APP GOAL" value={wGoal} onChange={g=>{setWGoal(g);setWPrompt(buildWP(g,wAud,wFw,wAe));}} ph="e.g. A project management tool for remote teams"/>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>AUDIENCE</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {WEB_VARS.map((v,i)=><Pill key={v.id} label={v.label} active={wAud===i} color={C.cy} onClick={()=>{setWAud(i);setWPrompt(buildWP(wGoal,i,wFw,wAe));}}/>)}
          </div>
          <div style={{fontSize:11,color:C.di,marginTop:6}}>{WEB_VARS[wAud]?.desc}</div>
        </div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>FRAMEWORK</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {FWS.map((fw,i)=><Pill key={i} label={fw.split(" + ")[0]+" + "+fw.split(" + ")[1]} active={wFw===i} color={C.vi} onClick={()=>{setWFw(i);setWPrompt(buildWP(wGoal,wAud,i,wAe));}}/>)}
          </div>
          <div style={{fontSize:11,color:C.di,marginTop:6}}>{FW_NOTES[wFw]}</div>
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>AESTHETIC KEYWORDS (pick up to 4)</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {AEST_OPTS.map(a=>{const sel=wAe.includes(a);return <button key={a} onClick={()=>{const nae=sel?wAe.filter(x=>x!==a):[...wAe,a].slice(0,4);setWAe(nae);setWPrompt(buildWP(wGoal,wAud,wFw,nae));}} style={{background:sel?`${C.mg}18`:"transparent",border:`1px solid ${sel?C.mg+"55":C.bdr}`,color:sel?C.mg:C.di,borderRadius:20,padding:"4px 11px",fontSize:11,fontFamily:C.mn,cursor:"pointer",transition:"all 0.15s",transform:sel?"scale(1.04)":"none"}}>{a}</button>;})}
          </div>
        </div>
        <div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>↓ LIVE PROMPT — updates as you configure above</div>
        <Code text={wPrompt||buildWP("",0,0,[])} mh={260}/>
      </Card>
      <Card>
        <Lbl text="Always define these three before generating" color={C.bl}/>
        <H3>The Three Layers Rule</H3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[["FUNCTION","What does the app DO?",C.cy],["DESIGN","What does it LOOK & FEEL like?",C.vi],["TECHNOLOGY","What STACK runs it?",C.am]].map(([l,q,col])=><div key={l} style={{background:C.bg,border:`1px solid ${col}22`,borderRadius:10,padding:"14px",textAlign:"center"}}><div style={{fontSize:10,color:col,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:6}}>{l}</div><div style={{fontSize:12,color:C.mu}}>{q}</div></div>)}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}><Cp text={`THREE LAYERS RULE\n\nFUNCTION: What does the app DO?\nDESIGN: What does it LOOK & FEEL like?\nTECHNOLOGY: What STACK runs it?`} sm={false} label="COPY RULE"/></div>
      </Card>
      <Card>
        <Lbl text="Dolphin Mode — 10 creative UI concepts to spark ideas" color={C.bl}/>
        <H3>Creative UI Concepts</H3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:8}}>
          {DOLPHIN_C.map((c,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"10px 12px",display:"flex",gap:10}}>
            <span style={{fontSize:10,color:C.bl,fontFamily:C.mn,minWidth:20,marginTop:1}}>#{String(i+1).padStart(2,"00")}</span>
            <div style={{flex:1}}><span style={{fontSize:12,color:C.mu,lineHeight:1.5}}>{c}</span></div>
            <Cp text={`Dolphin mode creative UI concept: ${c}`}/>
          </div>)}
        </div>
      </Card>
    </div>}

    {s==="json"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.cy}>
        <Lbl text="GLOBAL RULE — always append when requesting JSON" color={C.cy}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><H3>Structured Output / JSON</H3><Cp text={JSON_GLOBAL} sm={false}/></div>
        <Code text={JSON_GLOBAL}/>
      </Card>
      <Card>
        <Lbl text="4 techniques — use in combination"/>
        <H3>Techniques</H3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {JSON_T.map(t=><Pill key={t.id} label={t.label} active={jT===t.id} color={t.color} onClick={()=>setJT(t.id)}/>)}
        </div>
        {JSON_T.filter(t=>t.id===jT).map(t=><div key={t.id} style={{animation:"popIn 0.18s ease-out"}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:10,background:`${t.color}18`,color:t.color,border:`1px solid ${t.color}30`,borderRadius:20,padding:"2px 10px",fontFamily:C.mn}}>{t.badge}</span>
            <span style={{fontSize:11,color:C.di}}>Use when: {t.when}</span>
          </div>
          <Code text={t.content}/>
        </div>)}
        <div style={{marginTop:16}}>
          <div style={{fontSize:10,color:C.am,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>DECISION MATRIX — click a row to generate its combined prompt</div>
          <div style={{display:"grid",gap:6,marginBottom:jMxPrompt?14:0}}>
            {JSON_MX.map((r,i)=><div key={i} onClick={()=>{setJMxSel(i);setJMxPrompt(buildJMxP(r));}} style={{display:"flex",justifyContent:"space-between",background:jMxSel===i?`${C.cy}10`:C.bg,border:`1px solid ${jMxSel===i?C.cy+"44":C.bdr}`,borderRadius:8,padding:"9px 12px",cursor:"pointer",transition:"all 0.18s",gap:12,transform:jMxSel===i?"translateX(3px)":"none"}}>
              <span style={{fontSize:12,color:C.mu,flex:1}}>{r.sit}</span>
              <span style={{fontSize:12,color:C.cy,fontFamily:C.mn,whiteSpace:"nowrap"}}>{r.use}</span>
              <span onClick={e=>e.stopPropagation()}><Cp text={buildJMxP(r)}/></span>
            </div>)}
          </div>
          {jMxPrompt&&<div style={{animation:"popIn 0.2s ease-out"}}>
            <div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>✓ COMBINED JSON PROMPT</div>
            <Code text={jMxPrompt} mh={320}/>
          </div>}
        </div>
      </Card>
    </div>}

    {s==="vocab"&&<div style={{display:"grid",gap:14}}>
      <Card>
        <Lbl text="Use exact terms to control AI visual output — includes misconceptions"/>
        <H3>Design Vocabulary</H3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {["all","core","motion","adv"].map(c=><Pill key={c} label={c==="adv"?"ADVANCED":c.toUpperCase()} active={vCat===c} color={C.cy} onClick={()=>setVCat(c)}/>)}
        </div>
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          <Pill label="Terms + Copy" active={vView==="terms"} color={C.vi} onClick={()=>setVView("terms")}/>
          
          <Pill label="Synergy Combos" active={vView==="combos"} color={C.mg} onClick={()=>setVView("combos")}/>
        </div>
        {vView!=="combos"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:8}}>
          {VOCAB.filter(v=>vCat==="all"||v.cat===vCat).map((v,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:9,padding:"11px 13px",transition:"border-color 0.15s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:5}}>
              <div style={{fontSize:12,color:C.cy,fontFamily:C.mn,fontWeight:600}}>{v.t}</div>
              <Cp text={vView==="wrong"?`MISCONCEPTION about "${v.t}": ${v.wrong}\n\nCORRECT: ${v.d}`:`Use "${v.t}" in your prompt to get: ${v.d}`}/>
            </div>
            {vView==="terms"?<div style={{fontSize:11,color:C.mu,lineHeight:1.55}}>{v.d}</div>
            :<div><div style={{fontSize:11,color:C.rd,lineHeight:1.5,marginBottom:4}}>❌ {v.wrong}</div><div style={{fontSize:11,color:C.gn,lineHeight:1.5}}>✅ {v.d}</div></div>}
          </div>)}
        </div>}
        {vView==="combos"&&<div style={{display:"grid",gap:8}}>
          {COMBOS.map((d,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:9,padding:"11px 14px",transition:"border-color 0.15s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:4}}>
              <span style={{fontWeight:700,color:C.tx,fontSize:13}}>{d.combo}</span>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:10,color:C.vi,fontFamily:C.mn}}>{d.psych}</span>
                <Cp text={`Design combo "${d.combo}": ${d.els}. Best for: ${d.best}. Psychological effect: ${d.psych}.`}/>
              </div>
            </div>
            <div style={{fontSize:11,color:C.mu}}>{d.els}</div>
            <div style={{fontSize:10,color:C.di,marginTop:3}}>Best for: {d.best}</div>
          </div>)}
        </div>}
      </Card>
    </div>}

    {s==="tools"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.vi}>
        <Lbl text="Free vs Paid comparison for recommended tools" color={C.vi}/>
        <H3>Recommended Tools Matrix</H3>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Category","Free Tier","Paid Tier","Best For","Complexity",""].map(h=><th key={h} style={{textAlign:"left",padding:"6px 10px",color:C.di,fontSize:10,fontFamily:C.mn,letterSpacing:"0.08em",borderBottom:`1px solid ${C.bdr}`}}>{h}</th>)}</tr></thead>
            <tbody>{TOOLS_MATRIX.map((t,i)=><tr key={i} style={{borderBottom:`1px solid #ffffff06`}}><td style={{padding:"8px 10px",color:C.vi,fontWeight:600}}>{t.cat}</td><td style={{padding:"8px 10px",color:C.mu}}>{t.free}</td><td style={{padding:"8px 10px",color:C.mu}}>{t.paid}</td><td style={{padding:"8px 10px",color:C.tx}}>{t.best}</td><td style={{padding:"8px 10px",color:t.cx==="Low"?C.gn:C.am}}>{t.cx}</td><td style={{padding:"8px 10px"}}><Cp text={`${t.cat}: ${t.free} / ${t.paid}\nBest: ${t.best}\nComplexity: ${t.cx}`}/></td></tr>)}</tbody>
          </table>
        </div>
      </Card>
    </div>}

    {s==="database"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.vi}>
        <Lbl text="8 essential layers for database-guided interactive systems" color={C.vi}/>
        <H3>Database-Guided Systems</H3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:8}}>
          {DB_LAYERS.map((l,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:9,padding:"11px 13px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:18}}>{l.icon}</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:700,color:C.tx,marginBottom:2}}>{l.name}</div><div style={{fontSize:11,color:C.mu,lineHeight:1.5}}>{l.desc}</div></div>
            <Cp text={`${l.icon} ${l.name}: ${l.desc}`}/>
          </div>)}
        </div>
      </Card>
    </div>}

    {s==="monetize"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.vi}>
        <Lbl text="Revenue streams and growth projection" color={C.vi}/>
        <H3>Monetization Framework</H3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
          {[...Array.from(new Set(REVENUE.map(r=>r.cat)))].map(c=><Pill key={c} label={c} active={revCat===c} color={C.vi} onClick={()=>setRevCat(revCat===c?"all":c)}/>)}
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr>{["Revenue Stream","Setup","Potential","Scalability",""].map(h=><th key={h} style={{textAlign:"left",padding:"6px 10px",color:C.di,fontSize:10,fontFamily:C.mn,letterSpacing:"0.08em",borderBottom:`1px solid ${C.bdr}`}}>{h}</th>)}</tr></thead>
            <tbody>{REVENUE.filter(r=>revCat==="all"||r.cat===revCat).map((r,i)=><tr key={i} style={{borderBottom:`1px solid #ffffff06`}}><td style={{padding:"8px 10px",color:C.tx,fontWeight:600}}>{r.stream}</td><td style={{padding:"8px 10px",color:C.mu}}>{r.setup}</td><td style={{padding:"8px 10px",color:C.gn,fontFamily:C.mn}}>{r.potential}</td><td style={{padding:"8px 10px",color:r.scale==="High"?C.gn:C.am}}>{r.scale}</td><td style={{padding:"8px 10px"}}><Cp text={`${r.stream}: ${r.potential} | Setup: ${r.setup} | Scalability: ${r.scale}`}/></td></tr>)}</tbody>
          </table>
        </div>
      </Card>
      <Card>
        <Lbl text="Month-by-month growth trajectory" color={C.vi}/>
        <H3>Growth Projection</H3>
        <div style={{display:"grid",gap:10}}>
          {GROWTH.map((g,i)=><div key={i} style={{background:C.bg,borderRadius:10,padding:"12px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:12,fontWeight:700,color:C.tx}}>{g.phase}</span>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:13,color:C.am,fontFamily:C.mn,fontWeight:600}}>{g.rev}</span>
                <Cp text={`Growth: ${g.phase}\nRevenue: ${g.rev}\nFocus: ${g.focus}\nActivities: ${g.act}`}/>
              </div>
            </div>
            <div style={{fontSize:11,color:C.di}}>Focus: {g.focus}</div>
          </div>)}
        </div>
      </Card>
    </div>}
    {s==="techstack"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.vi}><Lbl text="Production-ready stack configurations for every use case" color={C.vi}/><H3>Recommended Tech Stacks</H3>
        <div style={{display:"grid",gap:12}}>
          {TECH_STACKS.map((ts,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:14,fontWeight:700,color:C.tx}}>{ts.stack}</span>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontSize:10,fontFamily:C.mn,padding:"2px 8px",borderRadius:10,background:ts.tier==="Production"?C.gn+"18":ts.tier==="Advanced"?C.am+"18":C.mu+"18",color:ts.tier==="Production"?C.gn:ts.tier==="Advanced"?C.am:C.mu}}>{ts.tier}</span>
                <Cp text={`${ts.stack} (${ts.tier})\n${ts.items.map(it=>`${it.l}: ${it.v}`).join("\n")}`}/>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:6}}>
              {ts.items.map((it,j)=><div key={j} style={{display:"flex",gap:8}}><span style={{fontSize:11,color:C.di,fontFamily:C.mn,minWidth:65}}>{it.l}</span><span style={{fontSize:11,color:C.mu}}>{it.v}</span></div>)}
            </div>
          </div>)}
        </div>
      </Card>
    </div>}

    {s==="workflow"&&<WFBuilder/>}
    {s==="composer"&&<LayerComposer/>}
    {s==="webappgen"&&<WebAppGen/>}
    {s==="diff"&&<PromptDiff/>}

    </div>
  </div>);
}


// ─── VALIDATE ─────────────────────────────────────────────────────────────────
function Validate(){
  const[chk,setChk]=useState({});
  const[sc,setSc]=useState({Clarity:5,Structure:5,Constraints:5,Predictability:5});
  const[swapFilter,setSwapFilter]=useState("all");
  const[selAesthetic,setSelAesthetic]=useState(null);
  const avg=(Object.values(sc).reduce((a,b)=>a+b,0)/4).toFixed(1);
  const grade=SSCALE.find(s=>{const[lo,hi]=s.r.split("–").map(Number);return avg>=lo&&avg<=hi;})||SSCALE[SSCALE.length-1];
  const total=CHECKS.reduce((a,g)=>a+g.items.length,0);
  const done=Object.values(chk).filter(Boolean).length;
  const filteredSwaps=swapFilter==="all"?SWAPS:SWAPS.filter(s=>s.level===swapFilter);
  const LEVEL_COLORS={beginner:C.gn,misconception:C.am,advanced:C.vi};
  const LEVEL_LABELS={beginner:"Beginner",misconception:"Misconception",advanced:"Advanced"};
  return(<div style={{display:"grid",gap:14}}>
    <Card>
      <Lbl text="6 checks to run before generating"/>
      <H3>Prompt Lint Rules</H3>
      <div style={{display:"grid",gap:8,marginBottom:18}}>
        {LINT.map(r=><div key={r.id} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:9,padding:"10px 13px",display:"flex",gap:10,alignItems:"flex-start"}}>
          <div style={{display:"flex",gap:10,alignItems:"flex-start",flex:1}}>
            <span style={{fontSize:15}}>{r.auto?"✅":"⚠️"}</span>
            <div><div style={{fontSize:10,color:C.cy,fontFamily:C.mn,marginBottom:2}}>{r.id}</div><div style={{fontSize:13,color:C.tx,marginBottom:2}}>{r.check}</div><div style={{fontSize:11,color:C.di}}>{r.auto?"Autofix: ":"Requires: "}{r.fix}</div></div>
          </div>
          <Cp text={`Lint Rule: ${r.id}\nCheck: ${r.check}\n${r.auto?"Autofix":"Requires"}: ${r.fix}`}/>
        </div>)}
      </div>

      {/* WORD SWAPS — expanded */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div style={{fontSize:10,color:C.am,fontFamily:C.mn,letterSpacing:"0.1em"}}>WORD SWAPS — {filteredSwaps.length} items</div>
        <div style={{display:"flex",gap:5}}>
          {["all","beginner","misconception","advanced"].map(f=>(
            <button key={f} onClick={()=>setSwapFilter(f)} style={{background:swapFilter===f?`${f==="all"?C.cy:LEVEL_COLORS[f]}18`:"transparent",border:`1px solid ${swapFilter===f?(f==="all"?C.cy:LEVEL_COLORS[f])+"50":C.bdr}`,color:swapFilter===f?(f==="all"?C.cy:LEVEL_COLORS[f]):C.di,borderRadius:20,padding:"3px 10px",fontSize:10,fontFamily:C.mn,cursor:"pointer",transition:"all 0.15s"}}>{f==="all"?"ALL":LEVEL_LABELS[f].toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gap:6}}>
        {filteredSwaps.map((sw,i)=>(
          <div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"8px 12px",display:"grid",gridTemplateColumns:"1fr auto 1fr auto",gap:8,alignItems:"center"}}>
            <span style={{color:C.rd,fontFamily:C.mn,fontSize:11,textDecoration:"line-through",opacity:0.8}}>{sw.bad}</span>
            <span style={{color:C.di,fontSize:12}}>→</span>
            <div>
              {sw.isAesthetic?(
                <div>
                  <div style={{fontSize:11,color:C.gn,fontFamily:C.mn,marginBottom:5}}>select a specific keyword:</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {AESTHETIC_KEYWORDS.map((kw,ki)=>(
                      <button key={ki} onClick={()=>setSelAesthetic(selAesthetic===`${i}-${ki}`?null:`${i}-${ki}`)} style={{background:selAesthetic===`${i}-${ki}`?`${C.cy}20`:"transparent",border:`1px solid ${selAesthetic===`${i}-${ki}`?C.cy+"55":C.bdr}`,color:selAesthetic===`${i}-${ki}`?C.cy:C.mu,borderRadius:6,padding:"3px 8px",fontSize:10,fontFamily:C.mn,cursor:"pointer",transition:"all 0.15s"}}>
                        {kw}
                      </button>
                    ))}
                  </div>
                  {selAesthetic&&selAesthetic.startsWith(`${i}-`)&&(
                    <div style={{marginTop:6,fontSize:11,color:C.gn,fontFamily:C.mn}}>
                      Selected: <strong>{AESTHETIC_KEYWORDS[parseInt(selAesthetic.split("-")[1])]}</strong>
                      <span style={{marginLeft:8}}><Cp text={AESTHETIC_KEYWORDS[parseInt(selAesthetic.split("-")[1])]}/></span>
                    </div>
                  )}
                </div>
              ):(
                <span style={{color:C.gn,fontFamily:C.mn,fontSize:11}}>{sw.good}</span>
              )}
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              {!sw.isAesthetic&&<Cp text={sw.good}/>}
              <span style={{fontSize:9,background:`${LEVEL_COLORS[sw.level]}18`,color:LEVEL_COLORS[sw.level],border:`1px solid ${LEVEL_COLORS[sw.level]}30`,borderRadius:20,padding:"2px 7px",fontFamily:C.mn,whiteSpace:"nowrap"}}>{sw.level}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
    <Card>
      <Lbl text="Run before submitting any production prompt"/>
      <H3>Quality Checklist</H3>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={{flex:1,background:C.bg,borderRadius:999,height:5,overflow:"hidden"}}><div style={{width:`${(done/total)*100}%`,background:C.cy,height:"100%",borderRadius:999,transition:"width 0.3s"}}/></div>
        <span style={{fontSize:12,fontFamily:C.mn,color:done===total?C.gn:C.mu}}>{done}/{total}</span>
      </div>
      <div style={{display:"grid",gap:14}}>
        {CHECKS.map((g,gi)=><div key={gi}>
          <div style={{fontSize:10,color:C.am,fontFamily:C.mn,letterSpacing:"0.12em",marginBottom:8}}>{g.lbl}</div>
          <div style={{display:"grid",gap:6}}>
            {g.items.map((item,ii)=>{const k=`${gi}-${ii}`;return(<label key={ii} style={{display:"flex",gap:10,cursor:"pointer"}}>
              <input type="checkbox" checked={!!chk[k]} onChange={()=>setChk(p=>({...p,[k]:!p[k]}))} style={{marginTop:2,accentColor:C.cy}}/>
              <span style={{fontSize:13,color:chk[k]?C.di:C.tx,textDecoration:chk[k]?"line-through":"none",lineHeight:1.5}}>{item}</span>
            </label>);})}
          </div>
        </div>)}
      </div>
    </Card>
    <Card>
      <Lbl text="A/B test and compare prompt variants"/>
      <H3>Prompt Scoring</H3>
      <div style={{display:"grid",gap:12,marginBottom:18}}>
        {SDIMS.map(d=><div key={d.name}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:13,fontWeight:600,color:C.tx}}>{d.name}</span><span style={{fontSize:13,fontFamily:C.mn,color:C.cy}}>{sc[d.name]}/10</span></div>
          <div style={{fontSize:11,color:C.di,marginBottom:4}}>{d.what}</div>
          <input type="range" min={1} max={10} value={sc[d.name]} onChange={e=>setSc(p=>({...p,[d.name]:Number(e.target.value)}))} style={{width:"100%",accentColor:C.cy}}/>
        </div>)}
      </div>
      <div style={{background:C.bg,border:`1px solid ${grade.col}33`,borderRadius:10,padding:"14px 18px",display:"flex",alignItems:"center",gap:18,marginBottom:14}}>
        <div style={{fontSize:36,fontWeight:800,fontFamily:C.mn,color:grade.col}}>{avg}</div>
        <div><div style={{fontWeight:700,color:C.tx,marginBottom:2}}>{grade.level}</div><div style={{fontSize:12,color:C.mu}}>{grade.action}</div></div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><Cp text={`Prompt Score: ${avg}/10\nLevel: ${grade.level}\nAction: ${grade.action}\n\nClarity: ${sc.Clarity}/10\nStructure: ${sc.Structure}/10\nConstraints: ${sc.Constraints}/10\nPredictability: ${sc.Predictability}/10`} sm={false} label="COPY SCORES"/></div>
      <div style={{display:"grid",gap:5}}>
        {SSCALE.map((s,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 10px",borderRadius:6,background:grade===s?`${s.col}10`:"transparent",border:`1px solid ${grade===s?s.col+"44":"transparent"}`}}>
          <span style={{fontFamily:C.mn,fontSize:12,color:s.col,minWidth:36}}>{s.r}</span>
          <span style={{fontSize:12,color:C.mu,flex:1,paddingLeft:10}}>{s.level}</span>
          <span style={{fontSize:11,color:C.di}}>{s.action}</span>
        </div>)}
      </div>
    </Card>
  </div>);
}

// ─── PLAYBOOK ─────────────────────────────────────────────────────────────────
function Playbook(){
  const[cat,setCat]=useState("All");
  const[q,setQ]=useState("");
  const[open,setOpen]=useState(null);
  const cats=["All",...Array.from(new Set(WF.map(w=>w.cat)))];
  const list=WF.filter(w=>(cat==="All"||w.cat===cat)&&(!q||w.title.toLowerCase().includes(q.toLowerCase())||w.purpose.toLowerCase().includes(q.toLowerCase())));
  const mk=w=>w.steps.map((s,i)=>`Step ${i+1} (${AE[s.a]} ${s.a}):\n${s.items.map(x=>`- ${x}`).join("\n")}`).join("\n\n")+`\n\nFinal Output: ${w.out}`;
  return(<div>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search workflows…" style={{width:"100%",boxSizing:"border-box",background:C.sur,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"10px 14px",color:C.tx,fontSize:13,outline:"none",marginBottom:12}}/>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
      {cats.map(c=><Pill key={c} label={c==="All"?`All (${WF.length})`:c} active={cat===c} color={C.am} onClick={()=>setCat(c)}/>)}
    </div>
    <div style={{display:"grid",gap:8}}>
      {list.map(w=>{const io=open===w.id;return(<div key={w.id} style={{background:C.sur,border:`1px solid ${io?C.bdrH:C.bdr}`,borderRadius:12,overflow:"hidden"}}>
        <button onClick={()=>setOpen(io?null:w.id)} style={{width:"100%",background:"none",border:"none",padding:"13px 17px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontFamily:C.mn,fontSize:10,color:C.cy,minWidth:24,opacity:0.6}}>#{String(w.id).padStart(2,"0")}</span>
          <div style={{flex:1}}><div style={{fontWeight:700,color:C.tx,fontSize:13,marginBottom:1}}>{w.title}</div><div style={{fontSize:11,color:C.di}}>{w.purpose} · {w.best}</div></div>
          <div style={{display:"flex",gap:3}}>{w.chain.map((a,i)=><span key={i} style={{fontSize:14}}>{AE[a]}</span>)}</div>
          <span style={{color:C.fa,fontSize:13,marginLeft:4}}>{io?"▲":"▼"}</span>
        </button>
        {io&&<div style={{borderTop:`1px solid ${C.bdr}`,padding:"0 17px 17px"}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",padding:"11px 0"}}>
            {w.chain.map((a,i)=><span key={i}><span style={{background:`${AC[a]}12`,border:`1px solid ${AC[a]}28`,color:AC[a],borderRadius:20,padding:"3px 9px",fontSize:11,fontFamily:C.mn}}>{AE[a]} {a}</span>{i<w.chain.length-1&&<span style={{color:C.fa,margin:"0 3px",fontSize:11}}>→</span>}</span>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:9,marginBottom:12}}>
            {w.steps.map((s,i)=><div key={i} style={{background:C.bg,border:`1px solid ${AC[s.a]}20`,borderRadius:9,padding:"10px 12px"}}>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}><span style={{fontSize:14}}>{AE[s.a]}</span><div><div style={{fontSize:9,color:AC[s.a],fontFamily:C.mn}}>STEP {i+1}</div><div style={{fontSize:12,fontWeight:600,color:C.tx}}>{s.t}</div></div></div>
              <ul style={{margin:0,padding:"0 0 0 12px"}}>{s.items.map((item,j)=><li key={j} style={{fontSize:11,color:C.mu,lineHeight:1.6}}>{item}</li>)}</ul>
            </div>)}
          </div>
          <div style={{background:C.bg,border:`1px solid ${C.gn}20`,borderRadius:8,padding:"9px 12px",display:"flex",gap:10,alignItems:"flex-start",marginBottom:11}}><span>✅</span><div style={{flex:1}}><div style={{fontSize:10,color:C.gn,fontFamily:C.mn,marginBottom:2}}>FINAL OUTPUT</div><div style={{fontSize:12,color:C.tx}}>{w.out}</div></div><Cp text={w.out}/></div>
          <Cp text={mk(w)} sm={false}/>
        </div>}
      </div>);})}
      {list.length===0&&<div style={{textAlign:"center",color:C.fa,padding:"36px 0",fontFamily:C.mn,fontSize:12}}>No workflows match "{q}"</div>}
    </div>
  </div>);
}

// ─── BUILDER ──────────────────────────────────────────────────────────────────
function WFBuilder(){
  const[chain,setChain]=useState([]);
  const[goal,setGoal]=useState("");
  const[outL,setOutL]=useState("");
  const[res,setRes]=useState("");
  const[hist,setHist]=useState([]);
  const[showH,setShowH]=useState(false);
  const[expH,setExpH]=useState(null);
  const add=n=>{if(chain.length<6){setChain(p=>[...p,n]);setRes("");}};
  const rm=i=>{setChain(p=>p.filter((_,j)=>j!==i));setRes("");};
  const mv=(i,d)=>{const n=[...chain];const t=i+d;if(t<0||t>=n.length)return;[n[i],n[t]]=[n[t],n[i]];setChain(n);setRes("");};
  const gen=()=>{
    if(!chain.length)return;
    const lines=chain.map((nm,i)=>{const a=ANIMALS.find(x=>x.name===nm);return `Step ${i+1} (${a.emoji} ${nm} — ${a.mode}):\n${a.prompt}`;}).join("\n\n");
    const p=`${goal.trim()?`GOAL: ${goal.trim()}\n\n`:""}${lines}${outL.trim()?`\n\nFinal Output: ${outL.trim()}`:""}`;
    setRes(p);
    setHist(h=>[{id:Date.now(),goal:goal.trim()||"Untitled",chain:[...chain],outL:outL.trim(),prompt:p,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})},...h].slice(0,10));
  };
  const load=e=>{setChain(e.chain);setGoal(e.goal==="Untitled"?"":e.goal);setOutL(e.outL);setRes(e.prompt);setShowH(false);};
  const reset=()=>{setChain([]);setGoal("");setOutL("");setRes("");};
  return(<Card sx={{marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
      <div><Lbl text="Compose animal mode chains → generate prompt" color={C.mg}/><H3>Workflow Builder</H3></div>
      {hist.length>0&&<button onClick={()=>setShowH(h=>!h)} style={{background:showH?`${C.am}15`:"transparent",border:`1px solid ${showH?C.am+"55":C.bdr}`,color:showH?C.am:C.di,borderRadius:8,padding:"6px 11px",fontSize:11,fontFamily:C.mn,cursor:"pointer",flexShrink:0}}>🕐 HISTORY ({hist.length})</button>}
    </div>
    {showH&&<div style={{background:C.bg,border:`1px solid ${C.am}22`,borderRadius:10,padding:13,marginBottom:16}}>
      <div style={{fontSize:10,color:C.am,fontFamily:C.mn,letterSpacing:"0.12em",marginBottom:10}}>RECENT PROMPTS</div>
      <div style={{display:"grid",gap:6}}>
        {hist.map(e=><div key={e.id} style={{background:C.sur,border:`1px solid ${C.bdr}`,borderRadius:8,overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,fontWeight:600,color:C.tx,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.goal}</div>
              <div style={{fontSize:11,color:C.di,marginTop:1}}>{e.chain.map(n=>AE[n]).join(" → ")} · {e.time}</div>
            </div>
            <div style={{display:"flex",gap:4,flexShrink:0}}>
              <button onClick={()=>setExpH(expH===e.id?null:e.id)} style={{background:"transparent",border:`1px solid ${C.bdr}`,color:C.mu,borderRadius:6,padding:"3px 8px",fontSize:10,fontFamily:C.mn,cursor:"pointer"}}>{expH===e.id?"HIDE":"VIEW"}</button>
              <button onClick={()=>load(e)} style={{background:`${C.cy}10`,border:`1px solid ${C.cy}28`,color:C.cy,borderRadius:6,padding:"3px 8px",fontSize:10,fontFamily:C.mn,cursor:"pointer"}}>LOAD</button>
              <Cp text={e.prompt}/>
              <button onClick={()=>setHist(p=>p.filter(x=>x.id!==e.id))} style={{background:"transparent",border:`1px solid ${C.rd}22`,color:C.rd,borderRadius:6,width:24,height:24,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
            </div>
          </div>
          {expH===e.id&&<div style={{borderTop:`1px solid ${C.bdr}`,padding:"9px 12px"}}><pre style={{margin:0,fontSize:11,color:C.mu,fontFamily:C.mn,whiteSpace:"pre-wrap",maxHeight:150,overflowY:"auto"}}>{e.prompt}</pre></div>}
        </div>)}
      </div>
    </div>}
    <Inp label="YOUR GOAL (optional)" value={goal} onChange={setGoal} ph="e.g. Build a SaaS onboarding flow for enterprise users"/>
    <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>SELECT MODES — CLICK TO ADD (max 6)</div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
      {ANIMALS.map(a=><button key={a.name} onClick={()=>add(a.name)} disabled={chain.length>=6} style={{background:`${AC[a.name]}10`,border:`1px solid ${AC[a.name]}28`,color:AC[a.name],borderRadius:10,padding:"7px 12px",cursor:chain.length>=6?"not-allowed":"pointer",opacity:chain.length>=6?0.4:1,fontSize:12,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
        <span style={{fontSize:20}}>{a.emoji}</span>
        <span style={{fontSize:10,fontFamily:C.mn}}>{a.name}</span>
      </button>)}
    </div>
    <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>YOUR CHAIN {chain.length>0&&`— ${chain.length} step${chain.length>1?"s":""}`}</div>
    {chain.length===0?<div style={{background:C.bg,border:`1px dashed ${C.bdr}`,borderRadius:10,padding:"20px",textAlign:"center",marginBottom:13}}><div style={{fontSize:20,marginBottom:5}}>⬆</div><div style={{fontSize:12,color:C.fa,fontFamily:C.mn}}>Click animals above to build your chain</div></div>
    :<div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:13}}>
      {chain.map((nm,idx)=>{const a=ANIMALS.find(x=>x.name===nm);const col=AC[nm];return(<div key={idx} style={{background:C.bg,border:`1px solid ${col}28`,borderRadius:9,padding:"9px 12px",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:10,color:C.fa,fontFamily:C.mn,minWidth:20}}>{String(idx+1).padStart(2,"0")}</span>
        <span style={{fontSize:17}}>{AE[nm]}</span>
        <div style={{flex:1}}><span style={{fontWeight:700,color:col,fontSize:13}}>{nm}</span><span style={{fontSize:11,color:C.di,marginLeft:8}}>{a.mode}</span></div>
        <div style={{display:"flex",gap:3}}>
          <button onClick={()=>mv(idx,-1)} disabled={idx===0} style={{background:"none",border:`1px solid ${C.bdr}`,color:C.di,borderRadius:5,width:24,height:24,cursor:idx===0?"default":"pointer",opacity:idx===0?0.3:1,fontSize:11}}>↑</button>
          <button onClick={()=>mv(idx,1)} disabled={idx===chain.length-1} style={{background:"none",border:`1px solid ${C.bdr}`,color:C.di,borderRadius:5,width:24,height:24,cursor:idx===chain.length-1?"default":"pointer",opacity:idx===chain.length-1?0.3:1,fontSize:11}}>↓</button>
          <button onClick={()=>rm(idx)} style={{background:"none",border:`1px solid ${C.rd}33`,color:C.rd,borderRadius:5,width:24,height:24,cursor:"pointer",fontSize:11}}>×</button>
        </div>
      </div>);})}
      {chain.length>1&&<div style={{textAlign:"center"}}><span style={{fontSize:12,color:C.fa,fontFamily:C.mn}}>{chain.map(n=>AE[n]).join(" → ")}</span></div>}
    </div>}
    <Inp label="FINAL OUTPUT LABEL (optional)" value={outL} onChange={setOutL} ph="e.g. Complete onboarding design with metrics"/>
    <div style={{display:"flex",gap:8}}>
      <button onClick={gen} disabled={!chain.length} style={{background:chain.length?`${C.cy}15`:"transparent",border:`1px solid ${chain.length?C.cy+"50":C.bdr}`,color:chain.length?C.cy:C.fa,borderRadius:8,padding:"10px 17px",fontSize:13,fontWeight:600,fontFamily:C.mn,cursor:chain.length?"pointer":"not-allowed",letterSpacing:"0.05em"}}>⚡ GENERATE PROMPT</button>
      {chain.length>0&&<button onClick={reset} style={{background:"transparent",border:`1px solid ${C.bdr}`,color:C.di,borderRadius:8,padding:"10px 14px",fontSize:12,fontFamily:C.mn,cursor:"pointer"}}>RESET</button>}
    </div>
    {res&&<div style={{marginTop:13}}><div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>✓ PROMPT READY — saved to history</div><Code text={res} mh={280}/></div>}
  </Card>);
}

function LayerComposer(){
  const F=[
    {k:"role",       l:"ROLE",         p:"You are a senior full-stack developer and product designer."},
    {k:"context",    l:"CONTEXT",      p:"Product: [name]\nPlatform: mobile / web / hybrid\nAudience: [who uses this]"},
    {k:"objective",  l:"OBJECTIVE",    p:"[One clear sentence of success]\nSuccess criteria:\n- [criterion 1]"},
    {k:"constraints",l:"CONSTRAINTS",  p:"- Mobile-first\n- WCAG AA accessibility\n- 60fps animation budget"},
    {k:"aesthetic",  l:"AESTHETIC",    p:"- [visual style keyword]\n- [tone descriptor]"},
    {k:"planning",   l:"PLANNING",     p:"1. Define information architecture\n2. Define navigation model\n3. Validate accessibility"},
    {k:"output",     l:"OUTPUT FORMAT",p:"Generate:\n1. [file or artifact type]\n2. [second deliverable]"},
    {k:"refinement", l:"REFINEMENT",   p:"After generating:\n- Critique for clarity\n- Refine once for structure\n- Output final result only"},
  ];
  const[v,setV]=useState(Object.fromEntries(F.map(f=>[f.k,""])));
  const set=(k,val)=>setV(p=>({...p,[k]:val}));
  const built=F.filter(f=>v[f.k].trim()).map(f=>`${f.l}\n${v[f.k].trim()}`).join("\n\n");
  const filled=F.filter(f=>v[f.k].trim()).length;
  return(<Card sx={{marginBottom:14}}>
    <Lbl text="Fill in each layer → prompt assembles automatically" color={C.mg}/>
    <H3>8-Layer Prompt Composer</H3>
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:11,color:C.di,fontFamily:C.mn}}>{filled}/{F.length} layers filled</span>
        {built&&<Cp text={built}/>}
      </div>
      <div style={{display:"flex",gap:4}}>{F.map(f=><div key={f.k} style={{flex:1,height:4,background:v[f.k].trim()?C.cy:C.bdr,borderRadius:2,transition:"background 0.2s"}}/>)}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:11,marginBottom:14}}>
      {F.map(f=><div key={f.k}>
        <div style={{fontSize:10,color:v[f.k].trim()?C.cy:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:4,transition:"color 0.2s"}}>{f.l} {v[f.k].trim()?"✓":""}</div>
        <textarea value={v[f.k]} onChange={e=>set(f.k,e.target.value)} placeholder={f.p} rows={4} style={{width:"100%",boxSizing:"border-box",background:C.bg,border:`1px solid ${v[f.k].trim()?C.cy+"33":C.bdr}`,borderRadius:8,padding:"8px 11px",color:C.tx,fontSize:11,fontFamily:C.mn,outline:"none",resize:"vertical",lineHeight:1.6,transition:"border-color 0.2s"}}/>
      </div>)}
    </div>
    {built?<><div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>✓ ASSEMBLED PROMPT</div><Code text={built} mh={260}/></>
    :<div style={{background:C.bg,border:`1px dashed ${C.bdr}`,borderRadius:10,padding:"16px",textAlign:"center"}}><div style={{fontSize:12,color:C.fa,fontFamily:C.mn}}>Fill in any layer above — prompt assembles in real time</div></div>}
  </Card>);
}

function WebAppGen(){
  const STACKS=["Next.js + Tailwind + Framer Motion","Next.js + Tailwind + GSAP","React + Vite + Framer Motion","SvelteKit + Tailwind","React Native + Expo","Nuxt + Tailwind"];
  const AEST=["dark-mode native","glassmorphism","neo-brutalism","neon accent","bento grid","kinetic typography","aurora gradients","minimal + editorial"];
  const[goal,setGoal]=useState("");
  const[aud,setAud]=useState(0);
  const[stk,setStk]=useState(0);
  const[ae,setAe]=useState([]);
  const[res,setRes]=useState("");
  const toggle=a=>setAe(p=>p.includes(a)?p.filter(x=>x!==a):[...p,a].slice(0,4));
  const gen=()=>{
    const p=`You are a senior full-stack developer and product designer.

ROLE: ${WEB_VARS[aud].label} perspective
GOAL: ${goal.trim()||"[Describe your app in one sentence]"}

FUNCTIONAL REQUIREMENTS
- Dynamic UI components
- Mobile-first responsive layout
- Interactive sections with user feedback
- Modular, reusable component architecture

UI/UX DESIGN LANGUAGE
${ae.length?ae.map(a=>`- ${a}`).join("\n"):"- Ultra-modern Gen-Z aesthetic\n- High-contrast typography\n- Smooth micro-interactions"}
- Dark/light adaptive themes

TECHNICAL STACK
- ${STACKS[stk]}
- Accessible semantic HTML · shadcn/ui components

OUTPUT FORMAT
Generate:
1. Project folder structure
2. Full source code (all files)
3. Instructions to run locally
4. Key component explanations

CONSTRAINTS
- Mobile-first always · WCAG AA accessibility minimum
- 60fps animation budget · No lorem ipsum · Avoid SaaS clichés

AESTHETIC LOCK
${ae.length?ae.join(" | "):"dark-mode native | neon-accent sparse | typography-first | hierarchy clear"}`;
    setRes(p);
  };
  return(<Card>
    <Lbl text="Configure your app → get a complete web app system prompt" color={C.mg}/>
    <H3>Web App Prompt Generator</H3>
    <Inp label="YOUR APP GOAL" value={goal} onChange={setGoal} ph="e.g. A dashboard for freelancers to track client projects and invoices"/>
    <div style={{marginBottom:12}}>
      <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>AUDIENCE TYPE</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{WEB_VARS.map((a,i)=><Pill key={a.id} label={a.label} active={aud===i} color={C.cy} onClick={()=>setAud(i)}/>)}</div>
      <div style={{fontSize:11,color:C.di,marginTop:6}}>{WEB_VARS[aud].desc}</div>
    </div>
    <div style={{marginBottom:12}}>
      <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>TECH STACK</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{STACKS.map((s,i)=><Pill key={i} label={s} active={stk===i} color={C.vi} onClick={()=>setStk(i)}/>)}</div>
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>AESTHETIC KEYWORDS (pick up to 4)</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{AEST.map(a=>{const s=ae.includes(a);return <button key={a} onClick={()=>toggle(a)} style={{background:s?`${C.mg}15`:"transparent",border:`1px solid ${s?C.mg+"55":C.bdr}`,color:s?C.mg:C.di,borderRadius:20,padding:"5px 12px",fontSize:11,fontFamily:C.mn,cursor:"pointer",transition:"all 0.15s"}}>{a}</button>;})}</div>
    </div>
    <button onClick={gen} style={{background:`${C.mg}15`,border:`1px solid ${C.mg}55`,color:C.mg,borderRadius:8,padding:"10px 18px",fontSize:13,fontWeight:600,fontFamily:C.mn,cursor:"pointer",letterSpacing:"0.05em",marginBottom:res?14:0}}>⚡ GENERATE WEB APP PROMPT</button>
    {res&&<><div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>✓ PROMPT READY</div><Code text={res} mh={300}/></>}
  </Card>);
}

function PromptDiff(){
  const[a,setA]=useState("");
  const[b,setB]=useState("");
  const[res,setRes]=useState(null);
  const score=text=>{
    const t=text.toLowerCase();
    const r=x=>x.test(t)?1:0;
    const hasRole=r(/you are|act as|role:|you're a/);
    const hasCon=r(/wcag|mobile.first|60fps|accessibility|constraint/);
    const hasObj=r(/goal:|objective:|success|output|generate|create/);
    const hasOut=r(/output format|generate:|deliver|produce|format/);
    const hasRef=r(/refine|critique|review|revise|polish/);
    const hasPln=r(/step|plan|architect|structure|first/);
    const wc=text.trim().split(/\s+/).length;
    const vague=r(/nice|cool|awesome|modern|good design/)?-1:0;
    const cl=Math.min(10,Math.round((hasRole*2+hasObj*2+(vague===0?2:0)+(wc>30?2:1))*1.2+vague));
    const st=Math.min(10,Math.round((hasRole+hasCon+hasObj+hasOut+hasRef+hasPln)*1.5));
    const cn=Math.min(10,Math.round((hasCon*3+hasRef*2+hasPln*2+hasOut*2)*0.9));
    const pr=Math.min(10,Math.round((hasOut*3+hasRef*2+hasCon*2+hasPln*2)*0.85));
    const ov=((cl+st+cn+pr)/4).toFixed(1);
    const miss=[];
    if(!hasRole)miss.push("Role definition");
    if(!hasCon)miss.push("Constraints (mobile-first, WCAG)");
    if(!hasObj)miss.push("Clear objective");
    if(!hasOut)miss.push("Output format");
    if(!hasRef)miss.push("Refinement instruction");
    if(vague<0)miss.push("Remove vague words");
    return{cl,st,cn,pr,ov,miss};
  };
  const run=()=>{
    if(!a.trim()&&!b.trim())return;
    const sa=score(a),sb=score(b);
    const win=!a.trim()?"B":!b.trim()?"A":parseFloat(sa.ov)>=parseFloat(sb.ov)?"A":"B";
    setRes({a:sa,b:sb,win});
  };
  const Bar=({label,val,col})=><div style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:11,color:C.mu}}>{label}</span><span style={{fontSize:11,fontFamily:C.mn,color:col}}>{val}/10</span></div><div style={{background:C.bg,borderRadius:999,height:5}}><div style={{width:`${val*10}%`,background:col,height:"100%",borderRadius:999,transition:"width 0.4s"}}/></div></div>;
  return(<Card>
    <Lbl text="Paste two prompts — get a side-by-side quality analysis" color={C.mg}/>
    <H3>Prompt Diff Tool</H3>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
      <TA label="PROMPT A" value={a} onChange={setA} ph="Paste your first prompt here…" rows={6}/>
      <TA label="PROMPT B" value={b} onChange={setB} ph="Paste your second prompt here…" rows={6}/>
    </div>
    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14}}>
      <button onClick={run} style={{background:`${C.mg}15`,border:`1px solid ${C.mg}55`,color:C.mg,borderRadius:8,padding:"10px 18px",fontSize:13,fontWeight:600,fontFamily:C.mn,cursor:"pointer",letterSpacing:"0.05em"}}>⚡ ANALYZE PROMPTS</button>
      {res&&<Cp text={`PROMPT DIFF ANALYSIS\nWinner: Prompt ${res.win}\n\nPrompt A — Clarity ${res.a.cl}/10 | Structure ${res.a.st}/10 | Constraints ${res.a.cn}/10 | Predictability ${res.a.pr}/10 | Overall ${res.a.ov}/10\nMissing: ${res.a.miss.length?res.a.miss.join(", "):"None"}\n\nPrompt B — Clarity ${res.b.cl}/10 | Structure ${res.b.st}/10 | Constraints ${res.b.cn}/10 | Predictability ${res.b.pr}/10 | Overall ${res.b.ov}/10\nMissing: ${res.b.miss.length?res.b.miss.join(", "):"None"}`} sm={false} label="COPY ANALYSIS"/>}
    </div>
    {res&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {[["A",res.a,C.cy],["B",res.b,C.vi]].filter(([lbl])=>(lbl==="A"?a.trim():b.trim())).map(([lbl,sc,col])=><div key={lbl} style={{background:C.bg,border:`2px solid ${res.win===lbl?col:C.bdr}`,borderRadius:10,padding:"14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontWeight:700,color:col,fontFamily:C.mn,fontSize:16}}>PROMPT {lbl}</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {res.win===lbl&&<span style={{fontSize:10,background:`${col}18`,color:col,border:`1px solid ${col}30`,borderRadius:20,padding:"2px 10px",fontFamily:C.mn}}>WINNER</span>}
            <span style={{fontSize:24,fontWeight:800,color:col,fontFamily:C.mn}}>{sc.ov}</span>
          </div>
        </div>
        <Bar label="Clarity" val={sc.cl} col={col}/>
        <Bar label="Structure" val={sc.st} col={col}/>
        <Bar label="Constraints" val={sc.cn} col={col}/>
        <Bar label="Predictability" val={sc.pr} col={col}/>
        {sc.miss.length>0&&<div style={{marginTop:10}}><div style={{fontSize:10,color:C.am,fontFamily:C.mn,marginBottom:6}}>MISSING</div>{sc.miss.map((m,i)=><div key={i} style={{fontSize:11,color:C.di,marginBottom:3}}>· {m}</div>)}</div>}
      </div>)}
    </div>}
    {res&&a.trim()&&(
      <div style={{marginTop:16,display:"grid",gap:12}}>
        <div style={{fontSize:10,color:C.cy,fontFamily:C.mn,letterSpacing:"0.1em"}}>📝 PROMPT A — WRITTEN TEXT WITH SCORE</div>
        <div style={{background:C.bg,border:`1px solid ${res.win==="A"?C.cy+"33":C.bdr}`,borderRadius:10,padding:"12px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:11,color:C.cy,fontFamily:C.mn}}>Overall: {res.a.ov}/10</span>
            <Cp text={a.trim()} sm={false} label="COPY PROMPT A"/>
          </div>
          <pre style={{margin:0,fontSize:11,color:"#d4d4d8",fontFamily:C.mn,whiteSpace:"pre-wrap",lineHeight:1.6,maxHeight:200,overflowY:"auto"}}>{a.trim()}</pre>
        </div>
      </div>
    )}
    {res&&b.trim()&&(
      <div style={{display:"grid",gap:12}}>
        <div style={{fontSize:10,color:C.vi,fontFamily:C.mn,letterSpacing:"0.1em"}}>📝 PROMPT B — WRITTEN TEXT WITH SCORE</div>
        <div style={{background:C.bg,border:`1px solid ${res.win==="B"?C.vi+"33":C.bdr}`,borderRadius:10,padding:"12px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:11,color:C.vi,fontFamily:C.mn}}>Overall: {res.b.ov}/10</span>
            <Cp text={b.trim()} sm={false} label="COPY PROMPT B"/>
          </div>
          <pre style={{margin:0,fontSize:11,color:"#d4d4d8",fontFamily:C.mn,whiteSpace:"pre-wrap",lineHeight:1.6,maxHeight:200,overflowY:"auto"}}>{b.trim()}</pre>
        </div>
      </div>
    )}
    {(a.trim()||b.trim())&&(
      <div style={{display:"grid",gap:12,marginTop:16}}>
        <div style={{fontSize:10,color:C.mg,fontFamily:C.mn,letterSpacing:"0.1em"}}>📋 FULL PROMPTS — COPY READY</div>
        {a.trim()&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:11,color:C.cy,fontFamily:C.mn,fontWeight:600}}>PROMPT A — FULL TEXT</span>
              <Cp text={a.trim()} sm={false} label="COPY PROMPT A"/>
            </div>
            <Code text={a.trim()} mh={200}/>
          </div>
        )}
        {b.trim()&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:11,color:C.vi,fontFamily:C.mn,fontWeight:600}}>PROMPT B — FULL TEXT</span>
              <Cp text={b.trim()} sm={false} label="COPY PROMPT B"/>
            </div>
            <Code text={b.trim()} mh={200}/>
          </div>
        )}
      </div>
    )}
  </Card>);
}

// ─── STRATEGY ─────────────────────────────────────────────────────────────────
function Strategy(){
  const[s,setS]=useState("monetize");
  const[revCat,setRevCat]=useState("all");
  return(<div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${C.bdr}`}}>
      {[{id:"monetize",label:"💰 Monetize"},{id:"market",label:"📈 Market"},{id:"features",label:"⚙️ Features"},{id:"privacy",label:"🔒 Privacy"}].map(n=><Pill key={n.id} label={n.label} active={s===n.id} color={C.vt} onClick={()=>setS(n.id)}/>)}
    </div>
    <div key={s} className="anim-slide">
    {s==="monetize"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.vt}><Lbl text="Revenue streams with setup time, potential, and scalability" color={C.vt}/><H3>Revenue Streams Matrix</H3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
          {[...Array.from(new Set(REVENUE.map(r=>r.cat)))].map(c=><Pill key={c} label={c} active={revCat===c} color={C.vt} onClick={()=>setRevCat(revCat===c?"all":c)}/>)}
        </div>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr>{["Stream","Setup","Potential","Scale","Complexity",""].map(h=><th key={h} style={{textAlign:"left",padding:"6px 10px",color:C.di,fontSize:10,fontFamily:C.mn,letterSpacing:"0.08em",borderBottom:`1px solid ${C.bdr}`}}>{h}</th>)}</tr></thead>
        <tbody>{REVENUE.filter(r=>revCat==="all"||r.cat===revCat).map((r,i)=><tr key={i} style={{borderBottom:`1px solid #ffffff06`}}><td style={{padding:"8px 10px",color:C.tx,fontWeight:600}}>{r.stream}</td><td style={{padding:"8px 10px",color:C.mu}}>{r.setup}</td><td style={{padding:"8px 10px",color:C.gn,fontFamily:C.mn}}>{r.potential}</td><td style={{padding:"8px 10px",color:r.scale==="High"?C.gn:C.am}}>{r.scale}</td><td style={{padding:"8px 10px",color:C.mu}}>{r.cx}</td><td style={{padding:"8px 10px"}}><Cp text={`${r.stream} | ${r.potential} | Setup: ${r.setup} | Scale: ${r.scale} | ${r.cx}`}/></td></tr>)}</tbody></table></div>
      </Card>
      <Card><Lbl text="Month-by-month growth trajectory with milestones" color={C.vt}/><H3>Growth Roadmap</H3>
        <div style={{display:"grid",gap:12}}>{GROWTH.map((g,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.vt}20`,borderRadius:10,padding:"14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:13,fontWeight:700,color:C.tx}}>{g.phase}</span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:14,fontWeight:800,color:C.vt,fontFamily:C.mn}}>{g.rev}</span>
              <Cp text={`Growth: ${g.phase}\nRevenue: ${g.rev}\nFocus: ${g.focus}\nActivities: ${g.act}\nMilestones: ${g.milestones.join(", ")}`}/>
            </div>
          </div>
          <div style={{fontSize:11,color:C.mu,marginBottom:4}}>Focus: {g.focus}</div>
          <div style={{fontSize:11,color:C.di,marginBottom:6}}>Activities: {g.act}</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{g.milestones.map((m,mi)=><span key={mi} style={{fontSize:10,background:`${C.vt}12`,color:C.vt,border:`1px solid ${C.vt}25`,borderRadius:20,padding:"2px 8px",fontFamily:C.mn}}>🎯 {m}</span>)}</div>
        </div>)}</div>
      </Card>
      <Card accent={C.mg}><Lbl text="5 pricing models with copy-ready launch prompts" color={C.mg}/><H3>Pricing Strategy Models</H3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
          {PRICING_MODELS.map((p,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div><div style={{fontWeight:700,color:C.tx,fontSize:13,marginBottom:2}}>{p.model}</div><div style={{fontSize:11,color:C.mu}}>{p.desc}</div></div>
              <Cp text={p.prompt} sm={false} label="COPY"/>
            </div>
            <div style={{fontSize:10,color:C.di,marginBottom:3}}>Best for: <span style={{color:C.vi}}>{p.best}</span></div>
            <div style={{fontSize:10,color:C.di}}>Revenue: <span style={{color:C.gn,fontFamily:C.mn}}>{p.rev}</span> · Complexity: <span style={{color:C.am}}>{p.cx}</span></div>
          </div>)}
        </div>
      </Card>
      <Card accent={C.gn}><Lbl text="6 channels to acquire your first 10 paying clients" color={C.gn}/><H3>Client Acquisition Playbook</H3>
        <div style={{display:"grid",gap:10}}>
          {CLIENT_ACQUISITION.map((c,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,marginBottom:6}}>
              <div style={{fontWeight:700,color:C.tx,fontSize:13}}>{c.ch}</div>
              <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
                <span style={{fontSize:10,fontFamily:C.mn,color:C.di}}>{c.timeline}</span>
                <Cp text={`Client Acquisition: ${c.ch}\nSteps: ${c.steps}\nTimeline: ${c.timeline}\nBest for: ${c.best}`}/>
              </div>
            </div>
            <div style={{fontSize:11,color:C.mu,marginBottom:4,lineHeight:1.5}}>{c.steps}</div>
            <div style={{fontSize:10,color:C.di}}>Best for: {c.best}</div>
          </div>)}
        </div>
      </Card>
      <Card accent={C.am}><Lbl text="AI-specific monetization opportunities with launch prompts" color={C.am}/><H3>AI Monetization Playbook</H3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:10}}>
          {AI_MONETIZE.map((a,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{fontWeight:700,color:C.tx,fontSize:13,marginBottom:2}}>{a.op}</div>
              <Cp text={a.prompt} sm={false} label="COPY"/>
            </div>
            <div style={{fontSize:11,color:C.mu,marginBottom:4,lineHeight:1.5}}>{a.desc}</div>
            <div style={{fontSize:10,color:C.di,marginBottom:3}}>Stack: <span style={{color:C.vi}}>{a.stack}</span></div>
            <div style={{display:"flex",gap:8,fontSize:10}}><span style={{color:C.gn,fontFamily:C.mn}}>{a.rev}</span><span style={{color:C.am}}>Difficulty: {a.diff}</span></div>
          </div>)}
        </div>
      </Card>
      <Card><Lbl text="Monthly running costs for a solo AI-powered product business" color={C.vt}/><H3>Monthly Cost Structure</H3>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr>{["Item","Cost","Notes",""].map(h=><th key={h} style={{textAlign:"left",padding:"6px 10px",color:C.di,fontSize:10,fontFamily:C.mn,letterSpacing:"0.08em",borderBottom:`1px solid ${C.bdr}`}}>{h}</th>)}</tr></thead>
        <tbody>{MONTHLY_COSTS.map((m,i)=><tr key={i} style={{borderBottom:`1px solid #ffffff06`,background:m.item==="Total Starting"?`${C.vt}08`:"transparent"}}><td style={{padding:"8px 10px",color:m.item==="Total Starting"?C.vt:C.tx,fontWeight:m.item==="Total Starting"?700:600}}>{m.item}</td><td style={{padding:"8px 10px",color:m.item==="Total Starting"?C.vt:C.gn,fontFamily:C.mn}}>{m.cost}</td><td style={{padding:"8px 10px",color:C.mu}}>{m.note}</td><td style={{padding:"8px 10px"}}><Cp text={`${m.item}: ${m.cost}\n${m.note}`}/></td></tr>)}</tbody></table></div>
        <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}><Cp text={MONTHLY_COSTS.map(m=>`${m.item}: ${m.cost} — ${m.note}`).join("\n")} sm={false} label="COPY ALL COSTS"/></div>
      </Card>
      <Card><Lbl text="10 common monetization mistakes and how to avoid them" color={C.rd}/><H3>Monetization Blind Spots</H3>
        <div style={{display:"grid",gap:8}}>
          {MONETIZE_BLINDS.map((b,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:9,padding:"10px 13px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                <span style={{fontSize:11,color:C.rd,fontFamily:C.mn,fontWeight:600}}>✗ {b.miss}</span>
              </div>
              <div style={{fontSize:11,color:C.gn,lineHeight:1.5}}>✓ {b.fix}</div>
            </div>
            <Cp text={`Mistake: ${b.miss}\nFix: ${b.fix}`}/>
          </div>)}
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:12}}><Cp text={MONETIZE_BLINDS.map(b=>`✗ ${b.miss}\n✓ ${b.fix}`).join("\n\n")} sm={false} label="COPY ALL BLIND SPOTS"/></div>
      </Card>
      <Card accent={C.vt}><Lbl text="Ready-to-use prompt for monetization planning" color={C.vt}/><H3>Monetization Strategy Prompt</H3>
        <Code text={`You are a monetization strategist for solo developers and small AI-powered product teams.

CONTEXT
I am a solo developer building AI-powered tools and templates.
Current skills: [web development, prompt engineering, AI/LLM integration]
Available time: [X hours/week]
Starting capital: $[Y]
Target: $[Z]/month within 12 months

TASK
1. Analyze my skills and identify the 5 best monetization opportunities
2. For each opportunity, provide:
   - Revenue model (one-time / subscription / usage-based)
   - First-month action plan
   - Expected time to first $1
   - 90-day milestone
   - Risk assessment (1-10)
3. Recommend the top 2 opportunities to pursue simultaneously
4. Create a week-by-week action plan for month 1

CONSTRAINTS
- Start with free/low-cost tools only
- Must generate revenue within 60 days
- Focus on products over services (scalability)
- Budget: Under $50/month in tools`} mh={380}/>
      </Card>
    </div>}
    {s==="market"&&<Card accent={C.vt}><Lbl text="Use Owl + Elephant + Rabbit + Eagle chain for full analysis" color={C.vt}/><H3>Market Opportunity Analysis</H3>
      <div style={{fontSize:12,color:C.mu,marginBottom:12,lineHeight:1.6}}>Use the <span style={{color:C.vt}}>📋 PLAYBOOK</span> tab → Workflow #20 for the complete step-by-step workflow.</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>{[{l:"10 underserved segments",icon:"🎯"},{l:"5 emerging trends",icon:"📈"},{l:"3 competitive advantages",icon:"🏆"},{l:"90-day action plan",icon:"📅"},{l:"Risk assessment matrix",icon:"⚡"},{l:"Resource allocation",icon:"💰"}].map((item,i)=><div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"10px 12px",display:"flex",gap:10,alignItems:"flex-start"}}><span style={{fontSize:16}}>{item.icon}</span><span style={{fontSize:12,color:C.mu,lineHeight:1.5,flex:1}}>{item.l}</span><Cp text={item.l}/></div>)}</div>
    </Card>}
    {s==="features"&&<Card accent={C.vt}><Lbl text="RICE scoring: Reach × Impact × Confidence / Effort" color={C.vt}/><H3>Feature Prioritization (RICE)</H3>
      <div style={{fontSize:12,color:C.mu,marginBottom:12,lineHeight:1.6}}>Use the <span style={{color:C.vt}}>📋 PLAYBOOK</span> tab → Workflow #21 for the complete RICE scoring workflow.</div>
      <Code text={`RICE Score = (Reach × Impact × Confidence) / Effort\n\nReach:     % of users affected per month\nImpact:   0.25 (minimal) to 3.0 (massive)\nConfidence: 0% to 100%\nEffort:   Person-months required\n\nExample:\nFeature A: Reach=30% Impact=2.0 Confidence=80% Effort=2\nRICE = (30 × 2.0 × 0.8) / 2 = 24`} mh={180}/>
    </Card>}
    {s==="privacy"&&<Card accent={C.vt}><Lbl text="Self-hosted n8n + privacy-first architecture" color={C.vt}/><H3>Privacy-First Automation</H3>
      <div style={{fontSize:12,color:C.mu,marginBottom:12,lineHeight:1.6}}>Use the <span style={{color:C.vt}}>📋 PLAYBOOK</span> tab → Workflow #22 for the complete implementation.</div>
      <Code text={`User Input → Client-Side Sanitization\n  → PII Detected?\n    → YES: Replace with Synthetic Data\n    → NO: Direct to AI\n  → AI Processing → Server-Side Validation\n  → Encrypted Storage → Access Control → Dashboard`} mh={150}/>
    </Card>}
    </div>
  </div>);
}

// ─── META ──────────────────────────────────────────────────────────────────────
function Meta(){
  const[s,setS]=useState("optimize");
  const[mp,setMp]=useState(0);
  const[prompt,setPrompt]=useState("");
  const[res,setRes]=useState("");
  const[cat,setCat]=useState(0);
  const[vals,setVals]=useState({});
  const genCustom=()=>{const c=CUSTOM_CATS[cat];const filled=Object.entries(vals).filter(([k,v])=>v.trim());const fieldsText=filled.map(([k,v])=>`${c.fields[k]?.l||k}: ${v}`).join("\n");const p=`You are a senior specialist in ${c.label}.\n\n${fieldsText||"[Describe your requirements]"}\n\nProvide:\n1. Complete implementation plan\n2. Step-by-step execution guide\n3. Code/config examples where applicable\n4. Common pitfalls to avoid\n5. Success metrics and KPIs\n6. Recommended tools and integrations`;setRes(p);};
  const applyMeta=()=>{const template=META_PROMPTS[mp].content.replace("{YOUR_PROMPT}",prompt);setRes(template);};
  return(<div>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${C.bdr}`}}>
      {[{id:"optimize",label:"🔄 Optimize"},{id:"audit",label:"📋 Audit"},{id:"custom",label:"🤖 Custom"}].map(n=><Pill key={n.id} label={n.label} active={s===n.id} color={C.bl} onClick={()=>setS(n.id)}/>)}
    </div>
    <div key={s} className="anim-slide">
    {(s==="optimize"||s==="audit")&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.bl}><Lbl text="Paste your prompt → get optimized versions" color={C.bl}/><H3>Prompt {s==="optimize"?"Optimizer":"Auditor"}</H3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{META_PROMPTS.map((m,i)=><Pill key={m.id} label={m.label} active={mp===i} color={C.bl} onClick={()=>setMp(i)}/>)}</div>
        <div style={{fontSize:11,color:C.di,marginBottom:10}}>{META_PROMPTS[mp].desc}</div>
        <TA label="PASTE YOUR PROMPT" value={prompt} onChange={setPrompt} ph="Paste the prompt you want to optimize..." rows={5}/>
        <button onClick={applyMeta} disabled={!prompt.trim()} style={{background:prompt.trim()?`${C.bl}15`:"transparent",border:`1px solid ${prompt.trim()?C.bl+"50":C.bdr}`,color:prompt.trim()?C.bl:C.fa,borderRadius:8,padding:"10px 17px",fontSize:13,fontWeight:600,fontFamily:C.mn,cursor:prompt.trim()?"pointer":"not-allowed",letterSpacing:"0.05em",marginBottom:res?14:0}}>⚡ {s==="optimize"?"OPTIMIZE":"AUDIT"}</button>
        {res&&<div className="anim-pop"><div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>✓ {s==="optimize"?"OPTIMIZED":"AUDITED"} PROMPT READY</div><Code text={res} mh={400}/></div>}
      </Card>
      <Card><Lbl text="The meta-prompt frameworks" color={C.bl}/><H3>How It Works</H3>
        <div style={{display:"grid",gap:8}}>{META_PROMPTS.map((m,i)=><div key={i} onClick={()=>{setMp(i);}} style={{background:mp===i?`${C.bl}10`:C.bg,border:`1px solid ${mp===i?C.bl+"44":C.bdr}`,borderRadius:9,padding:"10px 13px",cursor:"pointer",transition:"all 0.15s"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}><div><div style={{fontSize:12,fontWeight:700,color:C.tx,marginBottom:2}}>{m.label}</div><div style={{fontSize:11,color:C.mu}}>{m.desc}</div></div><Cp text={m.content}/></div></div>)}</div>
      </Card>
    </div>}
    {s==="custom"&&<div style={{display:"grid",gap:14}}>
      <Card accent={C.bl}><Lbl text="Generate a custom prompt for your specific use case" color={C.bl}/><H3>Custom Prompt Generator</H3>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>{CUSTOM_CATS.map((c,i)=><Pill key={c.id} label={c.label} active={cat===i} color={C.bl} onClick={()=>{setCat(i);setVals({});setRes("");}}/>)}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10,marginBottom:14}}>{CUSTOM_CATS[cat].fields.map((f,i)=><div key={i}><div style={{fontSize:10,color:C.di,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:4}}>{f.l}</div><input value={vals[i]||""} onChange={e=>setVals(p=>({...p,[i]:e.target.value}))} placeholder={f.ph} style={{width:"100%",boxSizing:"border-box",background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,padding:"9px 12px",color:C.tx,fontSize:12,fontFamily:C.ss,outline:"none"}}/></div>)}</div>
        <button onClick={genCustom} style={{background:`${C.bl}15`,border:`1px solid ${C.bl+"50"}`,color:C.bl,borderRadius:8,padding:"10px 17px",fontSize:13,fontWeight:600,fontFamily:C.mn,cursor:"pointer",letterSpacing:"0.05em",marginBottom:res?14:0}}>⚡ GENERATE PROMPT</button>
        {res&&<div className="anim-pop"><div style={{fontSize:10,color:C.gn,fontFamily:C.mn,letterSpacing:"0.1em",marginBottom:8}}>✓ CUSTOM PROMPT READY</div><Code text={res} mh={350}/></div>}
      </Card>
    </div>}
    </div>
  </div>);
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[zone,setZone]=useState("activate");
  const[zKey,setZKey]=useState(0);
  const col=ZC[zone];

  const switchZone=(id,e)=>{
    if(id===zone)return;
    setZone(id);
    setZKey(k=>k+1);
    if(window.scrollY>80)window.scrollTo({top:0,behavior:"smooth"});
  };

  return(<>
    <style>{FONT_CSS}</style>
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:C.ss,color:C.tx,overscrollBehavior:"none"}}>
      {/* STICKY NAV */}
      <div style={{borderBottom:`1px solid ${C.bdr}`,padding:"clamp(10px,2vw,16px) clamp(12px,2.5vw,22px) 0",position:"sticky",top:0,background:C.bg+"f0",zIndex:100,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
        <div style={{maxWidth:980,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:4}}>
            <div style={{fontSize:"clamp(8px,1.2vw,10px)",fontFamily:C.mn,color:C.fa,letterSpacing:"0.15em"}}>promptc OS · v2026.5 · powerUP</div>
            <div style={{fontSize:"clamp(8px,1.2vw,10px)",fontFamily:C.mn,color:col,letterSpacing:"0.1em",animation:"glowPulse 2s ease infinite"}}>{ZONES.find(z=>z.id===zone)?.label}</div>
          </div>
          <h1 style={{margin:"0 0 12px",fontSize:"clamp(18px,3.5vw,28px)",fontWeight:900,letterSpacing:"0.03em",fontFamily:C.hd,lineHeight:1,transition:"color 0.4s"}}>
            AI PROMPT ENGINEERING <span style={{color:col,transition:"color 0.4s ease"}}>{ZONES.find(z=>z.id===zone)?.sub?.split(".")[0].toUpperCase()}</span>
          </h1>
          <div style={{display:"flex",gap:0,overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}>
            {ZONES.map(z=>{const c=ZC[z.id];const a=zone===z.id;return(
              <button key={z.id} onClick={e=>switchZone(z.id,e)} style={{background:"transparent",border:"none",borderBottom:`2px solid ${a?c:"transparent"}`,color:a?c:C.di,padding:"8px clamp(8px,1.8vw,16px)",fontSize:"clamp(9px,1.4vw,12px)",fontWeight:600,cursor:"pointer",transition:"color 0.2s, border-color 0.2s",display:"flex",flexDirection:"column",alignItems:"flex-start",gap:1,whiteSpace:"nowrap",flexShrink:0,fontFamily:C.ss}}>
                <span>{z.label}</span>
                <span style={{fontSize:"clamp(7px,1vw,9px)",fontFamily:C.mn,color:a?c+"99":C.fa+"88",fontWeight:400,transition:"color 0.2s"}}>{z.sub}</span>
              </button>
            );})}
          </div>
        </div>
      </div>

      {/* ZONE CONTENT */}
      <div style={{maxWidth:980,margin:"0 auto",padding:"clamp(12px,2.5vw,20px) clamp(10px,2vw,22px) 80px"}}>
        <div key={zKey} className="anim-zone">
          {zone==="activate"&&<Activate/>}
          {zone==="build"   &&<Build/>}
          {zone==="validate"&&<Validate/>}
          {zone==="playbook"&&<Playbook/>}
          {zone==="monetize"&&<Strategy/>}
          {zone==="meta"&&<Meta/>}
        </div>
      </div>

      {/* FLOATING ZONE INDICATOR — mobile */}
      <div style={{position:"fixed",bottom:16,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6,padding:"6px 12px",background:C.sur+"ee",border:`1px solid ${col}33`,borderRadius:999,backdropFilter:"blur(12px)",zIndex:200,pointerEvents:"none"}}>
        {ZONES.map(z=><div key={z.id} style={{width:zone===z.id?20:6,height:6,borderRadius:999,background:zone===z.id?ZC[z.id]:C.bdr,transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)"}}/>)}
      </div>
    </div>
  </>);
}

