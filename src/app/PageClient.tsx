"use client";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Check, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Sparkles, Loader2,
  Zap, Target, Wrench, X, Search, HelpCircle,
  FileText, TrendingUp, Timer, Layers,
  Command, Cpu, BarChart3, ArrowRight, ArrowLeft, ArrowUpDown,
  FolderDown, FileDown, FileJson, Lightbulb, ArrowUp,
  Trash2, CheckSquare, Square, Pin, Menu, Star, MoreVertical,
  Plus, Send, Keyboard,
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  ZONES, MODS, MOD_CATS, TASKS, TMPLS, BRANDS, ANIMALS, CHAINS,
  LAYERS, LAYER_TPL, ENHANCEMENTS, LINT_RULES, SWAPS, SWAP_LEVELS,
  VOCAB, VOCAB_CATS, COMBOS, TYPO, TYPO_USECASES, MASTER,
} from "./data/promptc-data";
import CommandPalette from "@/components/CommandPalette";
import OnboardingTour, { retriggerOnboarding } from "@/components/OnboardingTour";
import {
  SKILLS_CATALOG, SKILL_CATEGORIES, CATEGORY_ICONS, CATEGORY_COLORS,
  CATEGORY_COUNTS, TOTAL_SKILLS, TOTAL_CATEGORIES, TOTAL_FILES,
} from "./data/skills-catalog";

// ─── Types ─────────────────────────────────────────────────────────────────
interface ResultState { content: string | null; loading: boolean; error: string | null; expanded: boolean; }
interface BasketItem {
  id: string;
  text: string;
  label: string;
  zone: string;
  time: string;
  chars: number;
  pinned: boolean;
  favorited?: boolean;
  pipelineStage?: string;
  copyCount?: number;
}

const PIPELINE_STAGES = ["activate", "build", "validate", "playbook", "monetize"] as const;

// ─── Sub-tab definitions per zone ─────────────────────────────────────────
const ZONE_TABS: Record<string, string[]> = {
  activate: ["Tasks", "Modifiers", "Templates", "Brands", "Animals", "Composer"],
  build: ["Master Prompt", "Enhancements", "Meta Builder"],
  validate: ["Lint Rules", "Word Swaps", "Vocabulary", "Quality Score"],
  playbook: ["Workflows", "Animal Chains", "Design Combos", "Typography"],
  monetize: ["Top Prompts", "SaaS Templates", "Stacks", "AI Tools", "Compounding", "Pricing Guide"],
  system: ["Skills Library", "Compounding", "Principles", "Skill Builder", "Workflow Patterns", "Self-Evolve", "Infographics", "Package Docs"],
};

const ZONE_TAB_COUNTS: Record<string, Record<string, number>> = {
  activate: { Tasks: 8, Modifiers: MODS.length, Templates: TMPLS.length, Brands: BRANDS.length, Animals: ANIMALS.length, Composer: 8 },
  build: { "Master Prompt": 1, Enhancements: ENHANCEMENTS.length, "Meta Builder": 3 },
  validate: { "Lint Rules": LINT_RULES.length, "Word Swaps": SWAPS.length, Vocabulary: VOCAB.length, "Quality Score": 1 },
  playbook: { Workflows: 21, "Animal Chains": CHAINS.length, "Design Combos": COMBOS.length, Typography: TYPO.length },
  monetize: { "Top Prompts": 6, "SaaS Templates": 6, Stacks: 4, "AI Tools": 5, Compounding: 1, "Pricing Guide": 1 },
  system: { "Skills Library": TOTAL_SKILLS, Compounding: 1, Principles: 6, "Skill Builder": 1, "Workflow Patterns": 2, "Self-Evolve": 1, Infographics: 1, "Package Docs": 1 },
};

const ANIMAL_COLORS: Record<string, string> = {
  Eagle: "#FFB000", Beaver: "#FF6B00", Ant: "#FF4FD8", Owl: "#4DFFFF",
  Rabbit: "#22c55e", Dolphin: "#38bdf8", Elephant: "#f97316",
};
const ANIMAL_EMOJIS: Record<string, string> = {
  Rabbit: "🐇", Owl: "🦉", Ant: "🐜", Eagle: "🦅",
  Dolphin: "🐬", Beaver: "🦫", Elephant: "🐘",
};

const META_PROMPTS = [
  { id: 1 as const, title: "Quick Critique", description: "Fast clarity & relevance rating with 5 improvements and two refined variants.", icon: Zap, accent: "#3b82f6" },
  { id: 2 as const, title: "Structured Analysis", description: "Deep dive with 3 improvements, 3 approaches each, and two refined prompts.", icon: Target, accent: "#8b5cf6" },
  { id: 3 as const, title: "Expert Engineering", description: "Full expert: precision & strategy variants, self-test, rationale tags.", icon: Wrench, accent: "#06b6d4" },
];

const MONETIZE_TOP_PROMPTS = [
  { label: "SaaS AI MVP in 1 Weekend", desc: "Build complete SaaS with Next.js + Supabase + Groq + Stripe + Vercel in 48 hours.", cat: "Build", rev: "$$$" },
  { label: "Prompt Pack → First Sale in 48hrs", desc: "10 copy-ready prompts for Gumroad. Niche, title, use case, pro tip each.", cat: "Sell", rev: "$" },
  { label: "Newsletter → $1k/mo in 90 Days", desc: "Beehiiv + referral program + sponsorships. Full content system.", cat: "Grow", rev: "$$" },
  { label: "Consulting → Productized Offer", desc: "Fixed-scope, fixed-price. Notion portal + Loom async delivery.", cat: "Pivot", rev: "$$" },
  { label: "Agency → SaaS Transition", desc: "6-month plan from services to product. Document → build → launch.", cat: "Scale", rev: "$$$" },
  { label: "MCP Tool → Paid Product", desc: "Build MCP server for Claude Desktop, monetize with npm/Stripe.", cat: "Build", rev: "$$$" },
];
const MONETIZE_SAAS = [
  { label: "AI Content Pipeline", desc: "n8n: Airtable → WordPress → social. Auto-publish daily.", stack: "n8n + Airtable + WordPress", diff: "medium", time: "2-3 days" },
  { label: "Lead Capture & Qualification", desc: "Typeform → AI score → CRM → Slack notify. Tier-based routing.", stack: "n8n + Typeform + OpenAI + HubSpot", diff: "hard", time: "5-7 days" },
  { label: "Site & Competitor Monitor", desc: "Uptime check + competitor price scraping + AI summary + alerts.", stack: "n8n + PagerDuty + Google Sheets", diff: "easy", time: "1 day" },
  { label: "Invoice Automation", desc: "Auto-generate PDF invoices, email, track payment webhooks.", stack: "Make + Airtable + PDF.co + Gmail", diff: "medium", time: "2-3 days" },
  { label: "MCP Agent Pipeline", desc: "Claude + MCP tools → autonomous research + write + publish.", stack: "MCP SDK + Node.js + WordPress", diff: "hard", time: "7-10 days" },
  { label: "CRM Sync System", desc: "Sync leads across HubSpot, Gmail, Slack, Sheets via Zapier.", stack: "Zapier + HubSpot + Gmail + Sheets", diff: "easy", time: "1-2 days" },
];
const MONETIZE_STACKS = [
  { label: "⚡ Quick Win", time: "Week 1", income: "$100–500", desc: "Sell a prompt pack or template on Gumroad. Zero setup cost." },
  { label: "🎯 Active Income", time: "Week 2–4", income: "$500–5k/project", desc: "Offer AI automation or prompt engineering as a service." },
  { label: "💰 Passive Income", time: "Month 1–3", income: "$500–10k/mo MRR", desc: "Build a micro-SaaS or paid newsletter. Compounds infinitely." },
  { label: "🔁 Hybrid Stack", time: "Month 2–6", income: "$2k–20k/mo", desc: "Combine active consulting + passive products. Leverage." },
];
const MONETIZE_AI_TOOLS = [
  { label: "OpenClaw", cat: "Agentic Runtime", tier: "Free / OSS", desc: "Open-source AI agent framework — compose tools, memory, and LLM calls.", starter: "Build an OpenClaw agent that: 1) Reads from a knowledge base 2) Processes user queries 3) Returns structured responses. Include tool definitions, memory config, and error handling." },
  { label: "ZeroClaw", cat: "Zero-Cost Agent", tier: "Free", desc: "Zero-cost agent runtime — runs entirely on Cloudflare + Groq free tiers.", starter: "Set up a ZeroClaw agent on Cloudflare Workers with: Groq API for inference, KV storage for memory, and Durable Objects for state. Target: zero monthly cost for <10k requests." },
  { label: "Agno", cat: "Agent Framework", tier: "Free / OSS", desc: "Python-native agent framework — multi-model, tool-calling, memory built-in.", starter: "Create an Agno agent with: multi-model support (GPT-4o + Claude), 5 custom tools, structured memory, and a Flask API wrapper. Include Docker setup." },
  { label: "CrewAI", cat: "Multi-Agent", tier: "Free / OSS", desc: "Multi-agent orchestration — define crews of specialized AI agents.", starter: "Design a CrewAI system with 3 agents: Researcher (web search + summarize), Writer (draft content from research), Editor (fact-check + polish). Define tasks, tools, and output format." },
  { label: "Claude Code", cat: "AI Coding Agent", tier: "Free tier", desc: "Anthropic's Claude Code — agentic coding assistant in your terminal.", starter: "Set up Claude Code for a Next.js project with: project context file (.claude), custom commands for testing/linting, and a CI workflow that uses Claude Code for automated PR reviews." },
];
const WORKFLOW_PROMPTS: Record<string, string> = {
  "Design System Creation": "Create a comprehensive design system for [product]. Include: color palette (primary, secondary, neutral, semantic), typography scale (4 levels), spacing system (4px grid), component library (buttons, inputs, cards, modals), icon set guidelines, and documentation structure. Output as structured markdown with code tokens for values.",
  "Landing Page Design": "Design a high-conversion landing page for [product/service]. Include: hero section with value proposition, 3 social proof elements, feature-benefit grid, pricing comparison, FAQ accordion, and CTA hierarchy. Follow AIDA: Attention → Interest → Desire → Action. Specify exact copy, layout grid, and visual hierarchy.",
  "Full-Stack App": "Build a complete [app type] with: Next.js 15 frontend, REST API with validation, PostgreSQL database schema (3-5 core tables), authentication (OAuth + JWT), CRUD operations for all models, responsive UI with Tailwind CSS, error handling, loading states, and deployment config for Vercel.",
  "API Design": "Design a RESTful API for [service]. Include: 15-20 endpoints with proper HTTP methods, request/response schemas (OpenAPI format), authentication middleware, rate limiting strategy, pagination pattern, error response format, versioning approach, and example curl commands for key endpoints.",
  "Database Schema": "Design a scalable PostgreSQL database schema for [application]. Include: 5-8 tables with proper normalization (3NF), indexes for common queries, foreign key relationships, constraints (unique, check, not null), migration strategy, and seed data examples. Explain each design decision.",
  "Product Roadmap": "Create a 6-month product roadmap for [product]. Include: Q1-Q2 quarterly objectives with 3 key results each, feature prioritization matrix (impact vs effort), milestone dates, dependency map, risk assessment for each quarter, resource allocation plan, and success metrics per objective.",
  "Market Research": "Conduct market research for [industry/product]. Include: TAM/SAM/SOM analysis, 5 key competitor profiles with SWOT, target user personas (3 segments), pricing benchmarking, market trends (3 key trends), barriers to entry assessment, and go-to-market recommendation with timeline.",
  "Prompt Engineering": "Systematically create 5 production prompts for [use case]. For each prompt: define role, context, objective, constraints, output format, and examples. Apply modifier chain: [specific output format] + [step-by-step reasoning] + [constraint awareness]. Test each prompt for consistency.",
  "AI Agent Design": "Design an autonomous AI agent for [task]. Include: agent architecture (ReAct/Plan-and-Execute), tool definitions (5-8 tools with schemas), memory system (short-term + long-term), error recovery strategy, human-in-the-loop checkpoints, evaluation metrics, and deployment plan with fallback mechanisms.",
  "Content Strategy": "Create a 90-day content strategy for [brand/product]. Include: content pillars (3-4), publishing calendar (3 posts/week), channel distribution plan, SEO keyword targets (20 keywords), content formats mix (60% educational, 25% promotional, 15% engaging), and KPI tracking framework.",
  "Email Sequence": "Design a 7-email automated sequence for [funnel stage]. Include: trigger conditions, subject line + preview text for each, email body copy (200-300 words each), CTA placement, A/B test variables, send timing, and success metrics (open rate, CTR, conversion rate targets).",
  "Security Audit": "Perform a security audit for [application type]. Include: OWASP Top 10 checklist, authentication vulnerability assessment, input validation review, data exposure risks, API security headers, dependency vulnerability scan approach, incident response plan, and security hardening recommendations.",
  "CI/CD Pipeline": "Design a CI/CD pipeline for [tech stack]. Include: GitHub Actions workflow YAML, test stages (unit, integration, E2E), build optimization, deployment strategy (blue-green or canary), rollback procedure, environment variable management, monitoring alerts, and cost optimization.",
  "Dashboard Design": "Design an analytics dashboard for [domain]. Include: KPI summary row (4 metrics), time-range selector, 2 chart types (line + bar), data table with sorting/filtering, drill-down capability, real-time update strategy, and empty state design. Dark theme.",
  "React Native Build": "Build a React Native app for [concept]. Include: navigation structure (tab + stack), 5 core screens with components, state management (Zustand), API integration layer, offline-first data strategy, push notification setup, and app store metadata.",
  "Mobile App Design": "Design a native mobile app for [purpose]. Include: information architecture (3 main sections), screen flow diagram, component library (buttons, inputs, cards, navigation), gesture interactions, platform-specific guidelines (iOS HIG + Material 3), and accessibility considerations.",
  "ML Pipeline": "Design an end-to-end ML pipeline for [problem type]. Include: data collection strategy, preprocessing steps, feature engineering, model selection rationale, training/validation split, evaluation metrics, deployment architecture (API or batch), monitoring drift detection, and retraining triggers.",
  "Social Media Strategy": "Create a 30-day social media strategy for [brand]. Include: platform selection (top 3), content calendar with post types, hashtag strategy, engagement tactics, influencer collaboration approach, paid boost budget allocation, and weekly analytics review framework.",
  "User Onboarding": "Design a user onboarding flow for [product]. Include: 4-step progressive disclosure, welcome screen copy, tooltip system, achievement/gamification elements, skip/resume capability, time-to-value optimization (<5 minutes), and drop-off metrics at each step.",
  "Pricing Strategy": "Design a pricing strategy for [SaaS product]. Include: 3-tier structure (Free/Pro/Enterprise), value metric selection, feature gating matrix, competitive pricing analysis, psychological pricing tactics, annual vs monthly discount structure, and migration path documentation.",
  "Competitive Analysis": "Conduct competitive analysis for [market]. Include: 8-10 competitor matrix, feature comparison grid, pricing comparison, market positioning map, SWOT for top 3 competitors, differentiation opportunities, and strategic recommendations with priority.",
  "Monitoring Setup": "Design application monitoring for [app type]. Include: APM setup (Datadog/New Relic), key metrics dashboard (latency P50/P95/P99, error rate, throughput), alerting rules (5 critical alerts), log aggregation strategy, custom business metrics, and incident response runbook.",
};

const WORKFLOWS_DATA = [
  { cat: "🎨 Design", title: "Design System Creation", purpose: "Build complete design system", best: "New products, rebrands", prompt: WORKFLOW_PROMPTS["Design System Creation"] },
  { cat: "🎨 Design", title: "Landing Page Design", purpose: "High-conversion landing page", best: "Marketing, startups", prompt: WORKFLOW_PROMPTS["Landing Page Design"] },
  { cat: "🎨 Design", title: "Dashboard Design", purpose: "Data visualization dashboard", best: "Analytics, SaaS", prompt: WORKFLOW_PROMPTS["Dashboard Design"] },
  { cat: "💻 Dev", title: "Full-Stack App", purpose: "Complete web application", best: "Product builds", prompt: WORKFLOW_PROMPTS["Full-Stack App"] },
  { cat: "💻 Dev", title: "API Design", purpose: "RESTful or GraphQL API", best: "Backend development", prompt: WORKFLOW_PROMPTS["API Design"] },
  { cat: "💻 Dev", title: "Database Schema", purpose: "Scalable database structure", best: "Data modeling", prompt: WORKFLOW_PROMPTS["Database Schema"] },
  { cat: "📈 Business", title: "Product Roadmap", purpose: "Strategic product roadmap", best: "Product management", prompt: WORKFLOW_PROMPTS["Product Roadmap"] },
  { cat: "📈 Business", title: "Market Research", purpose: "Comprehensive market analysis", best: "Business strategy", prompt: WORKFLOW_PROMPTS["Market Research"] },
  { cat: "📈 Business", title: "User Onboarding", purpose: "Effective user onboarding flow", best: "Product growth", prompt: WORKFLOW_PROMPTS["User Onboarding"] },
  { cat: "📈 Business", title: "Pricing Strategy", purpose: "Optimal pricing model design", best: "SaaS, subscriptions", prompt: WORKFLOW_PROMPTS["Pricing Strategy"] },
  { cat: "📈 Business", title: "Competitive Analysis", purpose: "Deep competitor intelligence", best: "Market positioning", prompt: WORKFLOW_PROMPTS["Competitive Analysis"] },
  { cat: "📱 Mobile", title: "Mobile App Design", purpose: "Native-feeling mobile app", best: "iOS/Android apps", prompt: WORKFLOW_PROMPTS["Mobile App Design"] },
  { cat: "📱 Mobile", title: "React Native Build", purpose: "Cross-platform mobile app", best: "Multi-platform", prompt: WORKFLOW_PROMPTS["React Native Build"] },
  { cat: "🤖 AI/ML", title: "Prompt Engineering", purpose: "Systematic prompt creation", best: "AI workflows", prompt: WORKFLOW_PROMPTS["Prompt Engineering"] },
  { cat: "🤖 AI/ML", title: "AI Agent Design", purpose: "Autonomous AI agent system", best: "Automation, AI tools", prompt: WORKFLOW_PROMPTS["AI Agent Design"] },
  { cat: "🤖 AI/ML", title: "ML Pipeline", purpose: "End-to-end ML workflow", best: "Data science", prompt: WORKFLOW_PROMPTS["ML Pipeline"] },
  { cat: "📊 Content", title: "Content Strategy", purpose: "Complete content plan", best: "Marketing, creators", prompt: WORKFLOW_PROMPTS["Content Strategy"] },
  { cat: "📊 Content", title: "Email Sequence", purpose: "Automated email campaign", best: "E-commerce, SaaS", prompt: WORKFLOW_PROMPTS["Email Sequence"] },
  { cat: "📊 Content", title: "Social Media Strategy", purpose: "Platform-specific content plan", best: "Brands, creators", prompt: WORKFLOW_PROMPTS["Social Media Strategy"] },
  { cat: "🔒 Security", title: "Security Audit", purpose: "Application security review", best: "Production apps", prompt: WORKFLOW_PROMPTS["Security Audit"] },
  { cat: "🚀 DevOps", title: "CI/CD Pipeline", purpose: "Automated deployment system", best: "Production infrastructure", prompt: WORKFLOW_PROMPTS["CI/CD Pipeline"] },
  { cat: "🚀 DevOps", title: "Monitoring Setup", purpose: "Application observability", best: "Production apps", prompt: WORKFLOW_PROMPTS["Monitoring Setup"] },
];

const SYSTEM_PRINCIPLES = [
  { title: "NO ONE-OFF WORK", icon: "🔄", desc: "Every task should produce a reusable asset: skill, template, automation, or document. If you do it once, codify it. If you do it twice, automate it. Never do the same thing three times manually.", color: "#a78bfa" },
  { title: "THE RULE", icon: "⚡", desc: "Before any implementation, PLAN → VALIDATE → EXECUTE. Never skip validation. A validated plan prevents 80% of rework. The rule applies to prompts, code, design, and business decisions.", color: "#FFB000" },
  { title: "PLAN → VALIDATE → EXECUTE", icon: "📐", desc: "Plan: break down the problem, identify constraints, consider alternatives. Validate: test assumptions, get feedback, iterate. Execute: build only after validation confirms the approach.", color: "#22c55e" },
  { title: "COMPOUNDING SYSTEM", icon: "📈", desc: "Build once → runs forever. Every skill makes the system smarter. Every cron removes thinking. Every template eliminates a starting-zero problem. The system compounds like interest.", color: "#4DFFFF" },
  { title: "SKILL FORMAT", icon: "📋", desc: "Every skill follows the 4-section SKILL.md format: Context (what & why), Instructions (how), Constraints (boundaries), Examples (proof). This ensures consistency and reusability.", color: "#FF6B00" },
  { title: "SECURITY RULES", icon: "🔒", desc: "No hardcoded secrets. Validate all external inputs. Rate limit by default. Audit log all state changes. Never expose raw system prompts. Human-in-the-loop for destructive actions.", color: "#ef4444" },
];

const SKILL_BUILDER_STEPS = [
  { step: 1, title: "Concept", desc: "Define the skill name, purpose, and trigger condition.", placeholder: "What does this skill do? When should it activate?" },
  { step: 2, title: "Prototype", desc: "Write the first draft of instructions — raw, unfiltered.", placeholder: "Write step-by-step instructions for the agent to follow." },
  { step: 3, title: "Evaluate", desc: "Test with 3 scenarios. Score clarity, completeness, actionability.", placeholder: "What edge cases exist? What's missing?" },
  { step: 4, title: "Codify", desc: "Format as SKILL.md with Context, Instructions, Constraints, Examples.", placeholder: "Convert to the 4-section SKILL.md format." },
  { step: 5, title: "Cron", desc: "Set up automated review schedule. Skills decay without maintenance.", placeholder: "When should this skill be reviewed? What triggers updates?" },
  { step: 6, title: "Monitor", desc: "Track usage metrics. Flag if skill hasn't been used in 30 days.", placeholder: "How will you measure skill effectiveness?" },
];

const DIFF_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  easy: { bg: "rgba(34,197,94,0.12)", text: "#22c55e", label: "Easy" },
  medium: { bg: "rgba(234,179,8,0.12)", text: "#eab308", label: "Medium" },
  hard: { bg: "rgba(239,68,68,0.12)", text: "#ef4444", label: "Hard" },
};

// ─── Animation variants ───────────────────────────────────────────────────
const fadeSlide = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25, ease: "easeOut" } };
const stagger = { animate: { transition: { staggerChildren: 0.03 } } };
const staggerItem = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } };

// ─── Scrollable Container with Arrow Indicators ─────────────────────
function ScrollableWithArrows({ children, className }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => { el.removeEventListener("scroll", checkScroll); observer.disconnect(); };
  }, [checkScroll, children]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -180 : 180, behavior: "smooth" });
  }, []);

  return (
    <div className="relative scroll-fade-container">
      <button
        onClick={() => scroll("left")}
        className={`nav-scroll-btn nav-scroll-left ${canScrollLeft ? "visible" : ""}`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <div ref={containerRef} className={`overflow-x-auto no-scrollbar ${className || ""}`}>
        {children}
      </div>
      <button
        onClick={() => scroll("right")}
        className={`nav-scroll-btn nav-scroll-right ${canScrollRight ? "visible" : ""}`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Skeleton Loader ────────────────────────────────────────────────
function Skeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className || ""}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-shimmer" style={{ height: i === lines - 1 ? 20 : 14, width: `${60 + Math.random() * 40}%` }} />
      ))}
    </div>
  );
}

// ─── Enhanced Tooltip with shortcut hint ────────────────────────────
function TipEnhanced({ children, text, shortcut }: { children: React.ReactNode; text: string; shortcut?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="tip-enhanced" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            className="tip-content">
            {text}{shortcut && <span className="tip-shortcut">{shortcut}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = value / (duration / 16);
    const timer = setInterval(() => { start += step; if (start >= value) { setCount(value); clearInterval(timer); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Tooltip (kept for backward compat) ────────────────────────────────
function Tip({ children, text }: { children: React.ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-[11px] leading-relaxed whitespace-nowrap max-w-xs text-center pointer-events-none"
            style={{ background: "#1e1e24", border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA", boxShadow: "0 8px 24px -4px rgba(0,0,0,0.5)" }}>
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── localStorage helpers ────────────────────────────────────────────────
const LS_PREFIX = "promptc-state-";
function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(LS_PREFIX + key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key: string, value: unknown) {
  try { localStorage.setItem(LS_PREFIX + key, JSON.stringify(value)); } catch {}
}
function lsSetDebounced(key: string, value: unknown, delay = 500) {
  if (typeof window === "undefined") return;
  setTimeout(() => lsSet(key, value), delay);
}

const DEFAULT_SUBTABS: Record<string, string> = { activate: "Tasks", build: "Master Prompt", validate: "Lint Rules", playbook: "Workflows", monetize: "Top Prompts", system: "Skills Library" };
const DEFAULT_COMPOSER: Record<string, string> = { Role: "", Context: "", Objective: "", Constraints: "", Aesthetic: "", Planning: "", Output: "", Refinement: "" };

// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
  // ─── Feature 1: Auto-save state (localStorage-backed) ────────────────────
  const [activeZone, setActiveZone] = useState(() => lsGet("zone", "activate"));
  const [activeSubTab, setActiveSubTab] = useState<Record<string, string>>(() => lsGet("subtab", DEFAULT_SUBTABS));
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(() => lsGet("search", ""));
  const [history, setHistory] = useState<BasketItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [skillsSearchQuery, setSkillsSearchQuery] = useState(() => lsGet("skills-search", ""));
  const [skillsCategoryFilter, setSkillsCategoryFilter] = useState<string>("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quickStartDismissed, setQuickStartDismissed] = useState(() => lsGet("quickstart-dismissed", false));
  const [skillStep, setSkillStep] = useState(0);
  const [skillForm, setSkillForm] = useState<Record<number, string>>({});
  const [basketExpandId, setBasketExpandId] = useState<string | null>(null);
  const [basketSearch, setBasketSearch] = useState(() => lsGet("basket-search", ""));
  const [basketZoneFilter, setBasketZoneFilter] = useState(() => lsGet("basket-zone-filter", "all"));
  const [basketSelected, setBasketSelected] = useState<Set<string>>(new Set());
  const [basketClearConfirm, setBasketClearConfirm] = useState(false);
  // Animal system states
  const [animalUserInput, setAnimalUserInput] = useState(() => lsGet("animal-input", ""));
  const [animalGenResult, setAnimalGenResult] = useState<string | null>(null);
  const [chainUserInput, setChainUserInput] = useState(() => lsGet("chain-input", ""));
  const [chainGenResult, setChainGenResult] = useState<string | null>(null);
  const [expandedChainIdx, setExpandedChainIdx] = useState<number | null>(null);
  const [basketSort, setBasketSort] = useState<"newest" | "oldest" | "longest" | "shortest" | "az">(() => lsGet("basket-sort", "newest"));
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
  const [basketFlash, setBasketFlash] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const clearConfirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [metaPrompt, setMetaPrompt] = useState(() => lsGet("meta-prompt", ""));
  const [metaResults, setMetaResults] = useState<Record<1 | 2 | 3, ResultState>>({ 1: { content: null, loading: false, error: null, expanded: false }, 2: { content: null, loading: false, error: null, expanded: false }, 3: { content: null, loading: false, error: null, expanded: false } });
  const [qaInput, setQaInput] = useState(() => lsGet("qa-input", ""));
  const [qaResult, setQaResult] = useState<{ scores: { clarity: number; specificity: number; structure: number; actionability: number }; feedback: string } | null>(null);
  const [qaLoading, setQaLoading] = useState(false);
  const [composerFields, setComposerFields] = useState<Record<string, string>>(() => lsGet("composer-fields", DEFAULT_COMPOSER));
  const [composerResult, setComposerResult] = useState<string | null>(null);

  // ─── Upgrade 2: Forwarded item state ────────────────────────────────────
  const [forwardedItemText, setForwardedItemText] = useState<string | null>(null);
  const [forwardedFromZone, setForwardedFromZone] = useState<string | null>(null);

  // ─── Upgrade 4: Quick Compose state ─────────────────────────────────────
  const [showQuickCompose, setShowQuickCompose] = useState(false);
  const [composeText, setComposeText] = useState(() => lsGet("compose-text", ""));
  const [qcDropdown, setQcDropdown] = useState<null | 'mods' | 'tmpls' | 'animals'>(null);
  const [qcSearch, setQcSearch] = useState("");

  // ─── Upgrade 5: Basket tab + session state ──────────────────────────────
  const [basketTab, setBasketTab] = useState<'items' | 'stats' | 'insights'>('items');
  const [sessionDuration, setSessionDuration] = useState(0);
  const sessionStartRef = useRef(Date.now());

  // ─── Feature 1: Auto-save useEffects ────────────────────────────────────
  useEffect(() => { lsSet("zone", activeZone); }, [activeZone]);
  useEffect(() => { lsSet("subtab", activeSubTab); }, [activeSubTab]);
  useEffect(() => { lsSetDebounced("search", searchQuery); }, [searchQuery]);
  useEffect(() => { lsSetDebounced("skills-search", skillsSearchQuery); }, [skillsSearchQuery]);
  useEffect(() => { lsSet("quickstart-dismissed", quickStartDismissed); }, [quickStartDismissed]);
  useEffect(() => { lsSetDebounced("basket-search", basketSearch); }, [basketSearch]);
  useEffect(() => { lsSet("basket-zone-filter", basketZoneFilter); }, [basketZoneFilter]);
  useEffect(() => { lsSet("basket-sort", basketSort); }, [basketSort]);
  useEffect(() => { lsSetDebounced("animal-input", animalUserInput); }, [animalUserInput]);
  useEffect(() => { lsSetDebounced("chain-input", chainUserInput); }, [chainUserInput]);
  useEffect(() => { lsSetDebounced("meta-prompt", metaPrompt); }, [metaPrompt]);
  useEffect(() => { lsSetDebounced("qa-input", qaInput); }, [qaInput]);
  useEffect(() => { lsSetDebounced("composer-fields", composerFields); }, [composerFields]);
  useEffect(() => { lsSetDebounced("compose-text", composeText); }, [composeText]);

  // ─── Session timer ──────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => { setSessionDuration(Math.floor((Date.now() - sessionStartRef.current) / 60000)); }, 60000);
    return () => clearInterval(timer);
  }, []);

  // ─── Feature 2: Mobile More menu ────────────────────────────────────────
  const [showMobileMore, setShowMobileMore] = useState(false);

  // ─── Feature 3: Expanded workflow index ─────────────────────────────────
  const [expandedWorkflowIdx, setExpandedWorkflowIdx] = useState<number | null>(null);

  const zoneColor = ZONES.find((z) => z.id === activeZone)?.color || "#4DFFFF";
  const mainRef = useRef<HTMLDivElement>(null);

  // ─── Core callbacks (declared early to avoid temporal dead zone) ──────────
  const handleZoneChange = useCallback((z: string) => {
    setActiveZone(z); setSearchQuery(""); window.scrollTo({ top: 0, behavior: "smooth" });
    // Auto-fill forwarded text into relevant inputs
    if (forwardedItemText) {
      if (z === "build") { setMetaPrompt(forwardedItemText); setActiveSubTab(p => ({...p, build: "Meta Builder"})); }
      if (z === "validate") { setQaInput(forwardedItemText); setActiveSubTab(p => ({...p, validate: "Quality Score"})); }
      if (z === "activate") { setAnimalUserInput(forwardedItemText); setActiveSubTab(p => ({...p, activate: "Animals"})); }
      setForwardedItemText(null); setForwardedFromZone(null);
    }
  }, [forwardedItemText]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const inInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowPalette(true); }
      if (e.key === "Escape" && showHistory) { setShowHistory(false); }
      if (e.key === "Escape" && showShortcuts) { setShowShortcuts(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "b") { e.preventDefault(); setShowHistory((p) => !p); }
      // ⌘1-6 zone switching
      if ((e.metaKey || e.ctrlKey) && e.key >= "1" && e.key <= "6") {
        e.preventDefault();
        const idx = parseInt(e.key) - 1;
        if (ZONES[idx]) handleZoneChange(ZONES[idx].id);
      }
      // ? shortcuts overlay (only when not in input)
      if (e.key === "?" && !inInput && !e.metaKey && !e.ctrlKey) { e.preventDefault(); setShowShortcuts((p) => !p); }
      // \u2318P Quick Compose
      if ((e.metaKey || e.ctrlKey) && e.key === "p") { e.preventDefault(); setShowQuickCompose((p) => !p); }
      if (e.key === "Escape" && showQuickCompose) { setShowQuickCompose(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showHistory, showShortcuts, showQuickCompose, handleZoneChange]);

  // Scroll-to-top listener
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load basket from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("promptc-basket");
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  // Save basket to localStorage on change
  useEffect(() => {
    try {
      if (history.length > 0) localStorage.setItem("promptc-basket", JSON.stringify(history));
      else localStorage.removeItem("promptc-basket");
    } catch {}
  }, [history]);

  const toggleExpand = useCallback((id: string) => { setExpandedItems((p) => { const n = new Set(p); if (n.has(id)) { n.delete(id); } else { n.add(id); } return n; }); }, []);
  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      // Duplicate detection — increment copyCount instead of blocking
      const existing = history.find((h) => h.text === text);
      if (existing) {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        const newCount = (existing.copyCount || 0) + 1;
        setHistory((prev) => prev.map((h) => h.id === existing.id ? { ...h, copyCount: newCount } : h));
        toast.info(`Copied! (used ${newCount}×)`);
        setTimeout(() => setCopiedId(null), 1800);
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      const item: BasketItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text,
        label: text.length > 120 ? text.slice(0, 120) + "..." : text,
        zone: activeZone,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        chars: text.length,
        pinned: false,
        favorited: false,
        pipelineStage: PIPELINE_STAGES.includes(activeZone as typeof PIPELINE_STAGES[number]) ? activeZone : undefined,
        copyCount: 1,
      };
      setHistory((p) => [item, ...p.slice(0, 99)]);
      toast.success("Added to basket!");
      setBasketFlash(true);
      setTimeout(() => setBasketFlash(false), 600);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      toast.error("Failed to copy.");
    }
  }, [activeZone, history]);

  // Direct clipboard copy (no basket add)
  const handleDirectCopy = useCallback(async (text: string) => {
    try { await navigator.clipboard.writeText(text); toast.success("Copied to clipboard!"); } catch { toast.error("Failed to copy."); }
  }, []);

  // Forward item to another zone
  const handleForwardToZone = useCallback((itemId: string, text: string, targetZone: string, targetTab: string) => {
    setForwardedItemText(text);
    setForwardedFromZone(ZONES.find((z) => z.id === activeZone)?.label || activeZone);
    handleZoneChange(targetZone);
    setActiveSubTab((prev) => ({ ...prev, [targetZone]: targetTab }));
    // Auto-fill relevant inputs
    if (targetZone === "build" && targetTab === "Meta Builder") setMetaPrompt(text);
    else if (targetZone === "validate" && targetTab === "Quality Score") setQaInput(text);
  }, [activeZone, handleZoneChange]);

  const clearForwarded = useCallback(() => { setForwardedItemText(null); setForwardedFromZone(null); }, []);
  const pasteForwarded = useCallback(() => {
    if (!forwardedItemText) return;
    if (activeZone === "build") setMetaPrompt(forwardedItemText);
    else if (activeZone === "validate") setQaInput(forwardedItemText);
    clearForwarded();
  }, [forwardedItemText, activeZone, clearForwarded]);

  // Copy all basket items
  const copyAllBasket = useCallback(async () => {
    if (history.length === 0) { toast.error("Basket is empty."); return; }
    const all = history.map((h) => h.text).join("\n\n---\n\n");
    try { await navigator.clipboard.writeText(all); toast.success(`Copied ${history.length} items!`); } catch { toast.error("Failed."); }
  }, [history]);

  // Remove single basket item
  const removeBasketItem = useCallback((id: string) => {
    setHistory((p) => p.filter((h) => h.id !== id));
    toast.info("Removed.");
  }, []);

  // Export basket as markdown
  const exportBasket = useCallback(() => {
    if (history.length === 0) { toast.error("Basket is empty."); return; }
    let md = "# promptc OS — Basket Export\n\n";
    history.forEach((h, i) => {
      md += `## ${i + 1}. [${h.zone}] — ${h.time} (${h.chars} chars)\n\n${h.text}\n\n---\n\n`;
    });
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "promptc-basket.md"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported!");
  }, [history]);

  // Export basket as JSON
  const exportBasketJSON = useCallback(() => {
    if (history.length === 0) { toast.error("Basket is empty."); return; }
    const data = {
      exportDate: new Date().toISOString(),
      version: "3.4",
      items: history.map(h => ({ text: h.text, label: h.label, zone: h.zone, time: h.time, chars: h.chars, pinned: h.pinned, favorited: h.favorited })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "promptc-basket.json"; a.click();
    URL.revokeObjectURL(url);
    toast.success("JSON exported!");
  }, [history]);

  // Clear entire basket (with confirm)
  const handleClearBasket = useCallback(() => {
    if (!basketClearConfirm) {
      setBasketClearConfirm(true);
      if (clearConfirmTimerRef.current) clearTimeout(clearConfirmTimerRef.current);
      clearConfirmTimerRef.current = setTimeout(() => setBasketClearConfirm(false), 3000);
      return;
    }
    if (clearConfirmTimerRef.current) clearTimeout(clearConfirmTimerRef.current);
    setBasketClearConfirm(false);
    setHistory([]);
    setBasketSelected(new Set());
    toast.info("Basket cleared.");
  }, [basketClearConfirm]);

  // ─── filteredBasket (declared early — needed by selectAllBasket) ────────
  const filteredBasket = useMemo(() => {
    let list = history;
    if (basketZoneFilter !== "all") list = list.filter((h) => h.zone === basketZoneFilter);
    if (basketSearch.trim()) {
      const q = basketSearch.toLowerCase();
      list = list.filter((h) => h.text.toLowerCase().includes(q) || h.zone.toLowerCase().includes(q));
    }
    const sorted = [...list].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      if (a.favorited && !b.favorited) return -1;
      if (!a.favorited && b.favorited) return 1;
      switch (basketSort) {
        case "newest": return 0;
        case "oldest": return list.indexOf(a) - list.indexOf(b);
        case "longest": return b.chars - a.chars;
        case "shortest": return a.chars - b.chars;
        case "az": return a.text.localeCompare(b.text);
        default: return 0;
      }
    });
    return sorted;
  }, [history, basketZoneFilter, basketSearch, basketSort]);

  // Multi-select helpers
  const toggleBasketSelect = useCallback((id: string) => {
    setBasketSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);
  const selectAllBasket = useCallback(() => {
    setBasketSelected(new Set(filteredBasket.map((h) => h.id)));
  }, [filteredBasket]);
  const deselectAllBasket = useCallback(() => {
    setBasketSelected(new Set());
  }, []);

  // Move basket item up/down
  const moveBasketItem = useCallback((id: string, direction: -1 | 1) => {
    setHistory((prev) => {
      const idx = prev.findIndex((h) => h.id === id);
      if (idx === -1) return prev;
      const newIdx = idx + direction;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  }, []);

  // Pin basket item
  const toggleBasketPin = useCallback((id: string) => {
    setHistory((prev) => prev.map((h) => h.id === id ? { ...h, pinned: !h.pinned } : h));
  }, []);

  // Favorite basket item
  const toggleBasketFavorite = useCallback((id: string) => {
    setHistory((prev) => prev.map((h) => h.id === id ? { ...h, favorited: !h.favorited } : h));
  }, []);

  // Batch operations
  const copySelectedBasket = useCallback(async () => {
    const selected = history.filter((h) => basketSelected.has(h.id));
    if (selected.length === 0) { toast.error("No items selected."); return; }
    const all = selected.map((h) => h.text).join("\n\n---\n\n");
    try { await navigator.clipboard.writeText(all); toast.success(`Copied ${selected.length} items!`); } catch { toast.error("Failed."); }
  }, [history, basketSelected]);

  const removeSelectedBasket = useCallback(() => {
    setHistory((prev) => prev.filter((h) => !basketSelected.has(h.id)));
    setBasketSelected(new Set());
    toast.info(`Removed ${basketSelected.size} items.`);
  }, [basketSelected]);

  const exportSelectedBasket = useCallback(() => {
    const selected = history.filter((h) => basketSelected.has(h.id));
    if (selected.length === 0) { toast.error("No items selected."); return; }
    let md = "# promptc OS — Basket Export (Selected)\n\n";
    selected.forEach((h, i) => {
      md += `## ${i + 1}. [${h.zone}] — ${h.time} (${h.chars} chars)${h.pinned ? " 📌" : ""}\n\n${h.text}\n\n---\n\n`;
    });
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "promptc-basket-selected.md"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported!");
  }, [history, basketSelected]);

  const handleMetaGenerate = useCallback(async (mt: 1 | 2 | 3) => {
    if (!metaPrompt.trim()) { toast.error("Enter a prompt first."); return; }
    setMetaResults((p) => ({ ...p, [mt]: { content: null, loading: true, error: null, expanded: true } }));
    try { const r = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: metaPrompt.trim(), metaType: mt }) }); const d = await r.json(); if (!r.ok) throw new Error(d.error || "Failed."); setMetaResults((p) => ({ ...p, [mt]: { content: d.result, loading: false, error: null, expanded: true } })); toast.success("Done!"); } catch (err: unknown) { const m = err instanceof Error ? err.message : "Error"; setMetaResults((p) => ({ ...p, [mt]: { content: null, loading: false, error: m, expanded: true } })); toast.error(m); }
  }, [metaPrompt]);
  const handleQualityScore = useCallback(async () => {
    if (!qaInput.trim()) { toast.error("Enter a prompt."); return; }
    setQaLoading(true); setQaResult(null);
    try { const r = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: qaInput.trim() }) }); const d = await r.json(); if (!r.ok) throw new Error(d.error || "Failed."); setQaResult(d); } catch (err: unknown) { toast.error(err instanceof Error ? err.message : "Error"); } finally { setQaLoading(false); }
  }, [qaInput]);
  const handleComposerAssemble = useCallback(() => {
    const f = LAYERS.filter((l) => composerFields[l.name].trim());
    if (f.length === 0) { toast.error("Fill in at least one layer."); return; }
    setComposerResult(f.map((l) => `${l.name.toUpperCase()}\n${composerFields[l.name]}`).join("\n\n"));
  }, [composerFields]);
  // handleZoneChange moved above to avoid TDZ (see top of component)

  const filteredMods = useMemo(() => { if (!searchQuery) return MODS; const q = searchQuery.toLowerCase(); return MODS.filter((m) => m.mod.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q) || m.tip.toLowerCase().includes(q)); }, [searchQuery]);
  const filteredWorkflows = useMemo(() => { if (!searchQuery) return WORKFLOWS_DATA; const q = searchQuery.toLowerCase(); return WORKFLOWS_DATA.filter((w) => w.title.toLowerCase().includes(q) || w.purpose.toLowerCase().includes(q) || w.cat.toLowerCase().includes(q)); }, [searchQuery]);
  const filteredSkills = useMemo(() => {
    let list = SKILLS_CATALOG;
    if (skillsCategoryFilter !== "all") list = list.filter((s) => s.category === skillsCategoryFilter);
    if (skillsSearchQuery.trim()) { const q = skillsSearchQuery.toLowerCase(); list = list.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)); }
    return list;
  }, [skillsCategoryFilter, skillsSearchQuery]);

  // filteredBasket moved above to avoid TDZ (see selectAllBasket)

  const basketTotalChars = useMemo(() => history.reduce((s, h) => s + h.chars, 0), [history]);

  // ─── Upgrade 5: Basket stats & insights ─────────────────────────────────
  const mostActiveZone = useMemo(() => {
    if (history.length === 0) return null;
    const counts: Record<string, number> = {};
    history.forEach((h) => { counts[h.zone] = (counts[h.zone] || 0) + 1; });
    const maxZone = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return ZONES.find((z) => z.id === maxZone?.[0]);
  }, [history]);

  const zoneDistribution = useMemo(() => {
    if (history.length === 0) return [];
    const counts: Record<string, number> = {};
    history.forEach((h) => { counts[h.zone] = (counts[h.zone] || 0) + 1; });
    return Object.entries(counts).map(([zone, count]) => ({
      zone, count, pct: (count / history.length) * 100,
      color: ZONES.find((z) => z.id === zone)?.color || "#6B7280",
    })).sort((a, b) => b.count - a.count);
  }, [history]);

  const frequentlyUsed = useMemo(() => {
    return [...history].filter((h) => (h.copyCount || 0) > 1).sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0)).slice(0, 3);
  }, [history]);

  const recommendations = useMemo(() => {
    const recs: { zone: string; tab: string; label: string; icon: string; color: string }[] = [];
    const zoneIds = new Set(history.map((h) => h.zone));
    if (zoneIds.has("activate")) recs.push({ zone: "build", tab: "Enhancements", label: "Try an Enhancement", icon: "\ud83d\udd28", color: "#a78bfa" });
    if (zoneIds.has("build")) recs.push({ zone: "validate", tab: "Quality Score", label: "Validate your prompts", icon: "\u2705", color: "#22c55e" });
    if (zoneIds.has("playbook")) recs.push({ zone: "monetize", tab: "Top Prompts", label: "Monetize this workflow", icon: "\ud83d\udcb0", color: "#FFB000" });
    return recs;
  }, [history]);

  // Quick Compose filtered lists
  const qcModList = useMemo(() => { if (!qcSearch) return MODS; return MODS.filter((m) => m.mod.toLowerCase().includes(qcSearch.toLowerCase())); }, [qcSearch]);
  const qcTmplList = useMemo(() => { if (!qcSearch) return TMPLS; return TMPLS.filter((t) => t.label.toLowerCase().includes(qcSearch.toLowerCase())); }, [qcSearch]);
  const qcAnimalList = useMemo(() => { if (!qcSearch) return ANIMALS; return ANIMALS.filter((a) => a.name.toLowerCase().includes(qcSearch.toLowerCase())); }, [qcSearch]);

  const handleSelectFromPalette = useCallback((zone: string, tab: string) => { handleZoneChange(zone); setActiveSubTab((p) => ({ ...p, [zone]: tab })); }, [handleZoneChange]);

  // Export functions
  const exportMarkdown = useCallback((scope: "all" | "zone") => {
    let md = "# promptc OS — Prompt Reference\n\n";
    const zoneName = ZONES.find((z) => z.id === activeZone)?.label || "";
    if (scope === "zone") md += `## ${zoneName} Zone\n\n`;
    if (scope === "all" || activeZone === "activate") { md += "## Activate Zone\n### Tasks\n"; TASKS.forEach((t) => { md += `#### ${t.label}\n\`\`\`\n${t.content}\n\`\`\`\n\n`; }); md += "### Modifiers\n"; MODS.forEach((m) => { md += `- **${m.mod}** — *${m.tip}*\n`; }); md += "\n### Templates\n"; TMPLS.forEach((t) => { md += `#### ${t.label}\n${t.content}\n\n`; }); }
    if (scope === "all" || activeZone === "build") { md += "## Build Zone\n### Master Prompt\n" + MASTER + "\n\n### Enhancements\n"; ENHANCEMENTS.forEach((e) => { md += `#### ${e.label}\n${e.content}\n\n`; }); }
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `promptc-os-${scope === "zone" ? activeZone : "full"}.md`; a.click(); URL.revokeObjectURL(url);
    toast.success("Exported!");
  }, [activeZone]);

  const copyComposerFull = useCallback(() => { if (!composerResult) { toast.error("Assemble a prompt first."); return; } handleCopy(composerResult, "composer-export"); }, [composerResult, handleCopy]);

  // Copy all content from current zone/tab
  const copyZoneContent = useCallback(async () => {
    let content = "";
    const zone = activeZone;
    const tab = activeSubTab[zone];
    if (zone === "activate" && tab === "Tasks") content = TASKS.map(t => t.content).join("\n\n---\n\n");
    else if (zone === "activate" && tab === "Modifiers") content = MODS.map(m => m.mod).join("\n\n");
    else if (zone === "activate" && tab === "Templates") content = TMPLS.map(t => `${t.label}\n${t.content}`).join("\n\n---\n\n");
    else if (zone === "build" && tab === "Master Prompt") content = MASTER;
    else if (zone === "playbook" && tab === "Workflows") content = WORKFLOWS_DATA.map(w => w.prompt).join("\n\n---\n\n");
    else if (zone === "system" && tab === "Skills Library") content = filteredSkills.map(s => `[${s.icon} ${s.name}] ${s.description}`).join("\n\n");
    else { toast.error("No bulk copy for this tab."); return; }
    try { await navigator.clipboard.writeText(content); toast.success("Zone content copied!"); } catch { toast.error("Failed."); }
  }, [activeZone, activeSubTab, filteredSkills]);

  const generateSkillMd = useCallback(() => {
    const name = skillForm[0] || "Untitled Skill";
    let md = `# ${name}\n\n## Context\n${skillForm[0] || ""}\n\n## Instructions\n${skillForm[1] || ""}\n\n## Constraints\n${skillForm[3] || ""}\n\n## Examples\n${skillForm[5] || ""}\n\n## Maintenance\nReview: ${skillForm[4] || "Monthly"}\nMetrics: ${skillForm[5] || "Usage tracking"}`;
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${name.toLowerCase().replace(/\s+/g, "-")}-skill.md`; a.click(); URL.revokeObjectURL(url);
    toast.success("SKILL.md downloaded!");
  }, [skillForm]);

  const generatePackageDocs = useCallback(() => {
    let md = `# promptc OS — Complete Reference\n> Generated ${new Date().toLocaleDateString()}\n\n`;
    md += `## Zone Overview\n`; ZONES.forEach((z) => { const tabs = ZONE_TABS[z.id] || []; md += `- **${z.icon} ${z.label}** (${z.sub}): ${tabs.join(", ")}\n`; });
    md += `\n## Statistics\n- ${MODS.length} Modifiers across ${MOD_CATS.length} categories\n- ${TMPLS.length} Templates\n- ${TASKS.length} Task prompts\n- ${BRANDS.length} Brand systems\n- ${ANIMALS.length} Animal thinking modes\n- ${ENHANCEMENTS.length} Enhancement techniques\n- ${LINT_RULES.length} Lint rules across ${["universal", "ui/ux", "code", "content", "agent"].length} segments\n- ${SWAPS.length} Word swaps\n- ${CHAINS.length} Animal chains\n- ${WORKFLOWS_DATA.length} Workflows\n\n`;
    md += `## All Modifiers\n`; MOD_CATS.forEach((c) => { md += `### ${c}\n`; MODS.filter((m) => m.cat === c).forEach((m) => { md += `- ${m.mod} — *${m.tip}*\n`; }); md += "\n"; });
    md += `## All Templates\n`; TMPLS.forEach((t) => { md += `### ${t.label}\n${t.desc}\n\n\`\`\`\n${t.content.slice(0, 500)}...\n\`\`\`\n\n`; });
    md += `## Master System Prompt\n\`\`\`\n${MASTER}\n\`\`\`\n\n`;
    md += `## All Brand Systems\n`; BRANDS.forEach((b) => { md += `### ${b.label}\n${b.uc}\n\n`; });
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "promptc-os-reference.md"; a.click(); URL.revokeObjectURL(url);
    toast.success("Package docs downloaded!");
  }, []);

  // Radar chart helper
  const RadarChart = ({ scores }: { scores: { clarity: number; specificity: number; structure: number; actionability: number } }) => {
    const dims = ["clarity", "specificity", "structure", "actionability"];
    const vals = dims.map((d) => (scores[d as keyof typeof scores] / 10) * 100);
    const cx = 80, cy = 80, r = 60;
    const pts = dims.map((_, i) => { const a = (Math.PI * 2 * i) / 4 - Math.PI / 2; return `${cx + r * (vals[i] / 100) * Math.cos(a)},${cy + r * (vals[i] / 100) * Math.sin(a)}`; });
    const gridPts = [25, 50, 75, 100].map((pct) => dims.map((_, i) => { const a = (Math.PI * 2 * i) / 4 - Math.PI / 2; return `${cx + r * (pct / 100) * Math.cos(a)},${cy + r * (pct / 100) * Math.sin(a)}`; }).join(" "));
    const labels = dims.map((d, i) => { const a = (Math.PI * 2 * i) / 4 - Math.PI / 2; return { x: cx + (r + 16) * Math.cos(a), y: cy + (r + 16) * Math.sin(a), label: d }; });
    return (
      <svg viewBox="0 0 160 160" className="w-40 h-40">
        {[25, 50, 75, 100].map((pct) => <polygon key={pct} points={gridPts[Math.floor(pct / 25) - 1]} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />)}
        {dims.map((_, i) => { const a = (Math.PI * 2 * i) / 4 - Math.PI / 2; return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />; })}
        <motion.polygon points={pts.join(" ")} fill="rgba(167,139,250,0.15)" stroke="#a78bfa" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
        {vals.map((v, i) => { const a = (Math.PI * 2 * i) / 4 - Math.PI / 2; return <motion.circle key={i} cx={cx + r * (v / 100) * Math.cos(a)} cy={cy + r * (v / 100) * Math.sin(a)} r="3" fill="#a78bfa" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} />; })}
        {labels.map((l) => <text key={l.label} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" fill="#6B7280" fontSize="7" fontFamily="monospace">{l.label}</text>)}
      </svg>
    );
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0B0D10", color: "#FFFFFF" }}>
      <CommandPalette open={showPalette} onClose={() => setShowPalette(false)} onSelect={handleSelectFromPalette} recentItems={history} />
      <OnboardingTour onDone={() => setShowOnboarding(false)} />

      {/* ─── Nav ─── */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(11,13,16,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        {/* Zone Active Top Glow Bar */}
        <div className="zone-active-glow" style={{ background: `linear-gradient(90deg, transparent, ${zoneColor}44, transparent)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <motion.span className="text-xl" whileHover={{ rotate: 15, scale: 1.1 }} transition={{ duration: 0.2 }}>⚡</motion.span>
              <span className="font-bold text-sm tracking-tight color-transition" style={{ fontFamily: "'DM Mono', monospace", color: zoneColor }}>promptc OS</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded badge-pop" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>v3.5</span>
            </div>
            {/* Desktop zone tabs — with arrow indicators */}
            <div className="hidden sm:block flex-1 mx-4">
              <ScrollableWithArrows className="flex items-center gap-1 px-1">
                {ZONES.map((z, idx) => (
                  <TipEnhanced key={z.id} text={z.sub} shortcut={`⌘${idx + 1}`}>
                    <button onClick={() => handleZoneChange(z.id)} className="btn-press relative px-3 py-1.5 text-xs font-medium rounded-lg color-transition whitespace-nowrap" style={{ color: activeZone === z.id ? z.color : "#6B7280", background: activeZone === z.id ? `${z.color}12` : "transparent" }}>
                      <span className="flex items-center gap-1.5"><span>{z.icon}</span><span>{z.label}</span></span>
                      {activeZone === z.id && <motion.div layoutId="zoneIndicator" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ background: z.color }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                    </button>
                  </TipEnhanced>
                ))}
              </ScrollableWithArrows>
            </div>
            {/* Right action buttons */}
            <div className="flex items-center gap-1">
              <TipEnhanced text="Command Palette" shortcut="⌘K">
                <button onClick={() => setShowPalette(true)} className="btn-press p-1.5 rounded-lg transition-all hover:bg-white/5" style={{ color: "#6B7280" }}><Command className="w-3.5 h-3.5" /></button>
              </TipEnhanced>
              <TipEnhanced text="Keyboard Shortcuts" shortcut="?">
                <button onClick={() => setShowShortcuts(p => !p)} className="btn-press p-1.5 rounded-lg transition-all hover:bg-white/5" style={{ color: "#6B7280" }}><Keyboard className="w-3.5 h-3.5" /></button>
              </TipEnhanced>
              <TipEnhanced text="Re-trigger Tour">
                <button onClick={() => { retriggerOnboarding(); setShowOnboarding(true); }} className="btn-press p-1.5 rounded-lg transition-all hover:bg-white/5" style={{ color: "#6B7280" }}><HelpCircle className="w-3.5 h-3.5" /></button>
              </TipEnhanced>
              <TipEnhanced text="Basket" shortcut="⌘B">
                <button onClick={() => setShowHistory(!showHistory)} className={`btn-press flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5 ${basketFlash ? 'scale-110' : ''}`} style={{ color: basketFlash ? zoneColor : "#6B7280" }}>
                  <span className={`text-sm transition-transform ${basketFlash ? 'scale-125' : ''}`}>🧺</span><span className="hidden sm:inline">Basket</span>
                  {history.length > 0 && <span className={`w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold transition-all ${basketFlash ? 'scale-125 badge-pop' : 'basket-pulse'}`} style={{ background: basketFlash ? zoneColor + "44" : zoneColor + "22", color: zoneColor }}>{history.length}</span>}
                </button>
              </TipEnhanced>
            </div>
          </div>
        </div>
      </nav>



      {/* ─── Basket Backdrop ─── */}
      <AnimatePresence>{showHistory && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-39" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setShowHistory(false)} />
      )}</AnimatePresence>

      {/* ─── Basket Panel ─── */}
      <AnimatePresence>{showHistory && (
        <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }} transition={{ duration: 0.25 }} className="fixed top-14 right-0 bottom-0 z-40 w-96 sm:w-[28rem] overflow-y-auto" style={{ background: "#14161A", borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="p-4 flex flex-col gap-3">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold" style={{ color: zoneColor }}>🧺 Basket</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => { if (basketSelected.size < filteredBasket.length) { selectAllBasket(); } else { deselectAllBasket(); } }} className="text-[10px] px-2 py-1 rounded border transition-all" style={{ borderColor: "rgba(167,139,250,0.3)", color: "#a78bfa" }}>
                    {basketSelected.size === filteredBasket.length && filteredBasket.length > 0 ? "Deselect All" : "Select All"}
                  </button>
                  <button onClick={() => setShowHistory(false)} className="p-1 rounded-lg hover:bg-white/10 transition-all" style={{ color: "#6B7280" }}><X className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              {/* Basket Tab Switcher */}
              <div className="flex gap-1">
                {(["items", "stats", "insights"] as const).map((tab) => (
                  <button key={tab} onClick={() => setBasketTab(tab)} className="px-3 py-1 text-[10px] font-medium rounded-lg transition-all capitalize" style={{ color: basketTab === tab ? zoneColor : "#6B7280", background: basketTab === tab ? `${zoneColor}15` : "transparent", border: `1px solid ${basketTab === tab ? `${zoneColor}33` : "rgba(255,255,255,0.07)"}` }}>{tab}{tab === "items" && history.length > 0 && <span className="ml-1 opacity-60">({history.length})</span>}</button>
                ))}
              </div>
              {/* Pipeline Progress */}
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono" style={{ color: "#4b5563" }}>PIPELINE</span>
                <div className="flex items-center gap-0.5">
                  {PIPELINE_STAGES.map((stage, si) => {
                    const cnt = history.filter((h) => h.pipelineStage === stage).length;
                    const sc = ZONES.find((z) => z.id === stage)?.color || "#4b5563";
                    return (<div key={stage} className="flex items-center gap-0.5">
                      <div className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-[8px] font-bold" style={{ background: cnt > 0 ? `${sc}20` : "rgba(255,255,255,0.04)", color: cnt > 0 ? sc : "#4b5563", border: `1px solid ${cnt > 0 ? `${sc}44` : "rgba(255,255,255,0.07)"}` }}>{cnt}</div>
                      {si < PIPELINE_STAGES.length - 1 && <div className="w-2 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />}
                    </div>);
                  })}
                </div>
              </div>
              <p className="text-[10px]" style={{ color: "#4b5563" }}>{history.length} items · {basketTotalChars.toLocaleString()} chars total</p>
              <div className="flex gap-1.5">
                <button onClick={copyAllBasket} className="flex-1 text-[10px] px-2 py-1.5 rounded-lg font-medium transition-all" style={{ background: "rgba(167,139,250,0.12)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.25)" }}>COPY ALL</button>
                <button onClick={exportBasket} className="flex-1 text-[10px] px-2 py-1.5 rounded-lg font-medium transition-all" style={{ background: "rgba(77,255,255,0.08)", color: "#4DFFFF", border: "1px solid rgba(77,255,255,0.2)" }}>EXPORT .md</button>
                <Tip text="Export as JSON">
                  <button onClick={exportBasketJSON} className="flex-1 text-[10px] px-2 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1" style={{ background: "rgba(234,179,8,0.08)", color: "#eab308", border: "1px solid rgba(234,179,8,0.2)" }}><FileJson className="w-3 h-3" />JSON</button>
                </Tip>
                <button onClick={handleClearBasket} className="flex-1 text-[10px] px-2 py-1.5 rounded-lg font-medium transition-all" style={{ background: basketClearConfirm ? "rgba(239,68,68,0.25)" : "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                  {basketClearConfirm ? "CONFIRM?" : "CLEAR"}
                </button>
              </div>
            </div>

            {/* Sort + Search */}
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#4b5563" }} />
                <input value={basketSearch} onChange={(e) => setBasketSearch(e.target.value)} placeholder="Search basket..." className="w-full pl-9 pr-4 py-2 rounded-lg text-xs outline-none" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} />
              </div>
              <Tip text="Sort order">
                <button onClick={() => { const opts: ("newest" | "oldest" | "longest" | "shortest" | "az")[] = ["newest", "oldest", "longest", "shortest", "az"]; const ci = opts.indexOf(basketSort); setBasketSort(opts[(ci + 1) % opts.length]); }} className="p-2 rounded-lg transition-all hover:bg-white/5 flex-shrink-0" style={{ color: "#6B7280" }}>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </Tip>
            </div>
            {/* Sort indicator */}
            <div className="text-[9px] text-right" style={{ color: "#4b5563" }}>Sort: {basketSort === "newest" ? "Newest first" : basketSort === "oldest" ? "Oldest first" : basketSort === "longest" ? "Longest first" : basketSort === "shortest" ? "Shortest first" : "A→Z"} · ⌘B toggle</div>

            {/* Zone filter pills */}
            <ScrollableWithArrows className="flex gap-1 mb-0">
              {["all", ...ZONES.map((z) => z.id)].map((z) => (
                <button key={z} onClick={() => setBasketZoneFilter(z)} className="px-2 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all" style={{ color: basketZoneFilter === z ? (z === "all" ? "#a78bfa" : ZONES.find((zz) => zz.id === z)?.color || "#4DFFFF") : "#6B7280", background: basketZoneFilter === z ? (z === "all" ? "rgba(167,139,250,0.12)" : `${ZONES.find((zz) => zz.id === z)?.color || "#4DFFFF"}15`) : "transparent", border: `1px solid ${basketZoneFilter === z ? (z === "all" ? "rgba(167,139,250,0.3)" : `${ZONES.find((zz) => zz.id === z)?.color || "#4DFFFF"}33`) : "rgba(255,255,255,0.07)"}` }}>{z === "all" ? "All" : z}</button>
              ))}
            </ScrollableWithArrows>

            {/* Smart Recommendations */}
            {history.length >= 2 && basketTab === "items" && (
              <div className="space-y-1">
                <div className="text-[9px] font-mono" style={{ color: "#4b5563" }}>⚡ SUGGESTED NEXT</div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {!history.some(h => h.zone === "validate") && history.some(h => h.zone === "activate" || h.zone === "build") && (
                    <button onClick={() => { setShowHistory(false); handleZoneChange("validate"); }} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all" style={{ background: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}>✅ Validate your prompts</button>
                  )}
                  {!history.some(h => h.zone === "playbook") && history.some(h => h.zone === "activate") && (
                    <button onClick={() => { setShowHistory(false); handleZoneChange("playbook"); }} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all" style={{ background: "rgba(255,176,0,0.08)", color: "#FFB000", border: "1px solid rgba(255,176,0,0.2)" }}>📋 Apply a workflow</button>
                  )}
                  {!history.some(h => h.zone === "monetize") && history.length >= 3 && (
                    <button onClick={() => { setShowHistory(false); handleZoneChange("monetize"); }} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all" style={{ background: "rgba(255,215,0,0.08)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.2)" }}>💰 Monetize your prompts</button>
                  )}
                </div>
              </div>
            )}

            {/* ═══ ITEMS TAB ═══ */}
            {basketTab === "items" && (<>
            {(basketSearch.trim() || basketZoneFilter !== "all") && filteredBasket.length < history.length && (
              <div className="text-[9px] text-center py-1" style={{ color: "#6B7280" }}>Showing {filteredBasket.length} of {history.length} items</div>
            )}
            {filteredBasket.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl mb-2">🧺</p>
                <p className="text-xs" style={{ color: "#6B7280" }}>Your basket is empty</p>
                <p className="text-[10px] mt-1" style={{ color: "#4b5563" }}>Copy prompts from any zone and they'll appear here.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filteredBasket.map((h, hIdx) => {
                  const zColor = ZONES.find((z) => z.id === h.zone)?.color || "#4DFFFF";
                  const isExpanded = basketExpandId === h.id;
                  const isSelected = basketSelected.has(h.id);
                  const prevItem = hIdx > 0 ? filteredBasket[hIdx - 1] : null;
                  const showDivider = prevItem && prevItem.pinned && !h.pinned;
                  const showFavoriteDivider = !showDivider && prevItem && prevItem.favorited && !h.favorited;
                  const pStageColor = h.pipelineStage ? (ZONES.find((z) => z.id === h.pipelineStage)?.color || "#4b5563") : null;
                  return (
                    <div key={h.id}>
                      {showDivider && <div className="border-t border-dashed my-1" style={{ borderColor: "rgba(255,255,255,0.1)" }} />}
                      {showFavoriteDivider && <div className="border-t border-dashed my-1" style={{ borderColor: "rgba(255,183,0,0.2)" }} />}
                      <motion.div layout className="rounded-lg cursor-pointer transition-all" style={{ background: "#0B0D10", border: isSelected ? `1px solid ${zColor}55` : "1px solid rgba(255,255,255,0.07)" }} onClick={() => setBasketExpandId(isExpanded ? null : h.id)}>
                        {/* Row 1: checkbox + zone badge + pipeline badge + time + chars */}
                        <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
                          <div className="flex items-center gap-2">
                            <button onClick={(e) => { e.stopPropagation(); toggleBasketSelect(h.id); }} className="flex-shrink-0 p-0.5 rounded hover:bg-white/5 transition-all" style={{ color: isSelected ? zColor : "#4b5563" }}>
                              {isSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                            </button>
                            {h.pinned && <span className="text-[10px] flex-shrink-0">📌</span>}
                            {h.favorited && <span className="text-[10px] flex-shrink-0" style={{ color: "#FFB000" }}>⭐</span>}
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${zColor}15`, color: zColor }}>{h.zone}</span>
                            {h.pipelineStage && h.pipelineStage !== h.zone && <span className="text-[8px]" style={{ color: "#4b5563" }}>→</span>}
                            {pStageColor && <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${pStageColor}15`, color: pStageColor }}>{h.pipelineStage}</span>}
                            <span className="text-[9px]" style={{ color: "#4b5563" }}>{h.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {(h.copyCount || 0) > 1 && <span className="text-[8px] font-mono px-1 py-0.5 rounded" style={{ background: "rgba(255,183,0,0.12)", color: "#FFB000" }}>×{h.copyCount}</span>}
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#6B7280" }}>{h.chars} chars</span>
                          </div>
                        </div>
                        {/* Row 2: text */}
                        <div className="px-3 pb-1.5">
                          <AnimatePresence mode="wait">
                            {isExpanded ? (
                              <motion.p key="full" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-[11px] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{h.text}</motion.p>
                            ) : (
                              <motion.p key="trunc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[11px] leading-relaxed line-clamp-3" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{h.label}</motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        {/* Row 3: reorder + pin + actions */}
                        <div className="flex items-center gap-1.5 px-3 pb-2.5">
                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            <button onClick={(e) => { e.stopPropagation(); moveBasketItem(h.id, -1); }} className="p-0.5 rounded hover:bg-white/5 transition-all" style={{ color: "#4b5563" }}><ChevronUp className="w-3 h-3" /></button>
                            <button onClick={(e) => { e.stopPropagation(); moveBasketItem(h.id, 1); }} className="p-0.5 rounded hover:bg-white/5 transition-all" style={{ color: "#4b5563" }}><ChevronDown className="w-3 h-3" /></button>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); toggleBasketPin(h.id); }} className="p-0.5 rounded hover:bg-white/5 transition-all flex-shrink-0" style={{ color: h.pinned ? "#FFB000" : "#4b5563" }}><Pin className="w-3 h-3" /></button>
                          <button onClick={(e) => { e.stopPropagation(); toggleBasketFavorite(h.id); }} className="p-0.5 rounded hover:bg-white/5 transition-all flex-shrink-0" style={{ color: h.favorited ? "#FFB000" : "#4b5563" }}><Star className="w-3 h-3" /></button>
                          <div className="flex-1" />
                          <button onClick={(e) => { e.stopPropagation(); handleCopy(h.text, h.id); }} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-all hover:bg-white/5" style={{ color: "#a78bfa" }}>
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); removeBasketItem(h.id); }} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded transition-all hover:bg-white/5" style={{ color: "#ef4444" }}>
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        {/* Row 4: Send to Zone (expanded only) */}
                        <AnimatePresence>{isExpanded && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            <div className="flex items-center gap-1.5 px-3 pb-2.5 pt-0.5 flex-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                              <span className="text-[8px] font-mono mr-0.5" style={{ color: "#4b5563" }}>SEND →</span>
                              {([{ zone: "build", tab: "Enhancements", label: "Enhance" }, { zone: "validate", tab: "Quality Score", label: "Validate" }, { zone: "playbook", tab: "Workflows", label: "Workflow" }, { zone: "monetize", tab: "Top Prompts", label: "Monetize" }] as const).map((action) => {
                                const ac = ZONES.find((z) => z.id === action.zone)?.color || "#4b5563";
                                return (<button key={action.zone} onClick={(e) => { e.stopPropagation(); handleForwardToZone(h.id, h.text, action.zone, action.tab); }} className="text-[9px] px-2 py-1 rounded-lg font-medium transition-all hover:opacity-80" style={{ background: `${ac}12`, color: ac, border: `1px solid ${ac}25` }}>→ {action.label}</button>);
                              })}
                            </div>
                          </motion.div>
                        )}</AnimatePresence>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            )}
            </>)}

            {/* ═══ STATS TAB ═══ */}
            {basketTab === "stats" && (<div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3 text-center" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-lg font-bold" style={{ color: zoneColor }}>{history.length}</div>
                  <div className="text-[10px]" style={{ color: "#6B7280" }}>Total Items</div>
                </div>
                <div className="rounded-lg p-3 text-center" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-lg font-bold" style={{ color: zoneColor }}>{basketTotalChars.toLocaleString()}</div>
                  <div className="text-[10px]" style={{ color: "#6B7280" }}>Total Chars</div>
                </div>
                <div className="rounded-lg p-3 text-center" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-lg font-bold" style={{ color: zoneColor }}>{sessionDuration}m</div>
                  <div className="text-[10px]" style={{ color: "#6B7280" }}>Session</div>
                </div>
                <div className="rounded-lg p-3 text-center" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-[11px] font-bold" style={{ color: mostActiveZone?.color || "#6B7280" }}>{mostActiveZone?.label || "—"}</div>
                  <div className="text-[10px]" style={{ color: "#6B7280" }}>Most Active</div>
                </div>
              </div>
              <div className="text-[10px] font-mono" style={{ color: zoneColor }}>ZONE DISTRIBUTION</div>
              <div className="flex h-4 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                {zoneDistribution.map((zd) => (<div key={zd.zone} style={{ width: `${zd.pct}%`, background: zd.color, minWidth: zd.pct > 0 ? "4px" : "0", transition: "width 0.3s" }} title={`${zd.zone}: ${zd.count}`} />))}
              </div>
              <div className="flex flex-wrap gap-2">
                {zoneDistribution.filter((zd) => zd.count > 0).map((zd) => (
                  <div key={zd.zone} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: zd.color }} />
                    <span className="text-[9px]" style={{ color: "#6B7280" }}>{zd.zone} ({zd.count})</span>
                  </div>
                ))}
              </div>
            </div>)}

            {/* ═══ INSIGHTS TAB ═══ */}
            {basketTab === "insights" && (<div className="space-y-5">
              <div>
                <div className="text-[10px] font-mono mb-2" style={{ color: zoneColor }}>FREQUENTLY USED</div>
                {frequentlyUsed.length === 0 ? (
                  <p className="text-[10px]" style={{ color: "#4b5563" }}>Copy items multiple times to see them here.</p>
                ) : (
                  <div className="space-y-2">
                    {frequentlyUsed.map((item) => (
                      <div key={item.id} className="rounded-lg p-2.5" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[10px] truncate flex-1" style={{ color: "#A1A1AA" }}>{item.label}</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: "rgba(255,183,0,0.12)", color: "#FFB000" }}>×{item.copyCount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <div className="text-[10px] font-mono mb-2" style={{ color: zoneColor }}>RECOMMENDED NEXT</div>
                {recommendations.length === 0 ? (
                  <p className="text-[10px]" style={{ color: "#4b5563" }}>Add items to get recommendations.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {recommendations.map((rec) => (
                      <button key={rec.zone} onClick={() => { handleZoneChange(rec.zone); setActiveSubTab((p) => ({ ...p, [rec.zone]: rec.tab })); setShowHistory(false); }} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all hover:opacity-80" style={{ background: `${rec.color}15`, color: rec.color, border: `1px solid ${rec.color}33` }}>
                        <span>{rec.icon}</span><span>{rec.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>)}

            {/* Batch Action Bar */}
            <AnimatePresence>{basketSelected.size > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="sticky bottom-0 flex gap-2 p-3 rounded-xl -mx-1" style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", backdropFilter: "blur(8px)" }}>
                <span className="text-[10px] font-medium flex items-center" style={{ color: "#a78bfa" }}>{basketSelected.size} selected</span>
                <div className="flex-1" />
                <button onClick={copySelectedBasket} className="text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>
                  <Copy className="w-3 h-3" /> Copy ({basketSelected.size})
                </button>
                <button onClick={removeSelectedBasket} className="text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}>
                  <Trash2 className="w-3 h-3" /> Remove ({basketSelected.size})
                </button>
                <button onClick={exportSelectedBasket} className="text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1" style={{ background: "rgba(77,255,255,0.1)", color: "#4DFFFF" }}>
                  <FileDown className="w-3 h-3" /> Export
                </button>
              </motion.div>
            )}</AnimatePresence>
          </div>
        </motion.div>
      )}</AnimatePresence>

      {/* ─── Forwarded Item Banner ─── */}
      <AnimatePresence>
        {forwardedItemText && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
            <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: `${zoneColor}10`, border: `1px solid ${zoneColor}25` }}>
              <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: zoneColor }} />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium" style={{ color: zoneColor }}>Forwarded from {forwardedFromZone}</p>
                <p className="text-[10px] truncate" style={{ color: "#A1A1AA" }}>{forwardedItemText.slice(0, 100)}{forwardedItemText.length > 100 ? "..." : ""}</p>
              </div>
              <button onClick={clearForwarded} className="text-[9px] px-2 py-1 rounded-lg flex-shrink-0 transition-all hover:bg-white/5" style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}>Clear</button>
              <button onClick={pasteForwarded} className="text-[9px] px-2 py-1 rounded-lg font-medium flex-shrink-0 transition-all hover:opacity-80" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>Paste &amp; Go</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Sub-Tabs ─── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
        <ScrollableWithArrows className="flex items-center gap-2 pb-1">
          {(ZONE_TABS[activeZone] || []).map((tab) => {
            const cnt = ZONE_TAB_COUNTS[activeZone]?.[tab];
            const isActive = activeSubTab[activeZone] === tab;
            return (
              <TipEnhanced key={tab} text={`${cnt ?? ""} items in ${tab}`}>
                <button onClick={() => setActiveSubTab({ ...activeSubTab, [activeZone]: tab })} className={`btn-press tab-indicator ${isActive ? "active" : ""} px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap flex items-center gap-1.5`} style={{ color: isActive ? zoneColor : "#6B7280", background: isActive ? `${zoneColor}18` : "transparent", border: `1px solid ${isActive ? `${zoneColor}44` : "rgba(255,255,255,0.07)"}` }}>
                  {tab}{cnt !== undefined && <span className="text-[9px] opacity-60">({cnt})</span>}
                </button>
              </TipEnhanced>
            );
          })}
          <TipEnhanced text="Copy all content from this zone tab" shortcut="⌘⇧C">
            <button onClick={copyZoneContent} className="ml-auto flex-shrink-0 btn-press flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-medium rounded-lg color-transition" style={{ color: zoneColor, background: `${zoneColor}10`, border: `1px solid ${zoneColor}30` }}>
              <Layers className="w-3 h-3" /><span className="hidden sm:inline">Copy Zone</span>
            </button>
          </TipEnhanced>
        </ScrollableWithArrows>
      </div>

      {/* ─── Main Content ─── */}
      <main ref={mainRef} className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={`${activeZone}-${activeSubTab[activeZone]}`} {...fadeSlide} className="pt-6">

            {/* ═══ ACTIVATE ═══ */}
            {activeZone === "activate" && (<>
              {activeSubTab.activate === "Tasks" && !quickStartDismissed && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-xl p-4 flex items-center justify-between" style={{ background: "rgba(77,255,255,0.06)", border: "1px solid rgba(77,255,255,0.15)" }}>
                  <div className="flex items-center gap-3"><Lightbulb className="w-5 h-5" style={{ color: "#4DFFFF" }} /><div><h3 className="text-sm font-bold">Quick Start</h3><p className="text-xs" style={{ color: "#A1A1AA" }}>Copy a task prompt below and paste it into your AI chat. Instant results.</p></div></div>
                  <button onClick={() => setQuickStartDismissed(true)} className="p-1 rounded hover:bg-white/10"><X className="w-4 h-4" style={{ color: "#6B7280" }} /></button>
                </motion.div>
              )}
              {activeSubTab.activate === "Tasks" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" {...stagger}>{TASKS.map((task) => (<motion.div key={task.label} {...staggerItem} className="hover-lift card-glow rounded-xl p-5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold">{task.label}</h3><button onClick={() => handleCopy(task.content, `task-${task.label}`)} className="btn-press p-1.5 rounded-lg hover:bg-white/10 transition-colors">{copiedId === `task-${task.label}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}</button></div><pre className="text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{task.content.slice(0, 200)}...</pre></motion.div>))}</div>)}

              {activeSubTab.activate === "Modifiers" && (<div>
                <div className="mb-4 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4b5563" }} /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search modifiers..." className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} /></div>
                {MOD_CATS.map((cat) => { const catMods = filteredMods.filter((m) => m.cat === cat); if (catMods.length === 0) return null; return (<div key={cat} className="mb-6"><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{cat.toUpperCase()} ({catMods.length})</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{catMods.map((m, i) => { const id = `mod-${cat}-${i}`; return (<Tip key={id} text={`💡 ${m.tip}`}><div className="rounded-lg p-3 transition-all hover:border-white/15 cursor-pointer" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><div className="flex items-start justify-between gap-2"><p className="text-xs leading-relaxed flex-1" style={{ color: "#e4e4e7" }}>{m.mod}</p><div className="flex items-center gap-1 flex-shrink-0"><button onClick={(e) => { e.stopPropagation(); handleCopy(m.mod, id); }} className="p-1 rounded hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>{expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="mt-2 pt-2 text-[11px] leading-relaxed" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA" }}>💡 {m.tip}</div></motion.div>)}</AnimatePresence></div></Tip>); })}</div></div>); })}
              </div>)}

              {activeSubTab.activate === "Templates" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>{TMPLS.map((tmpl) => { const id = `tmpl-${tmpl.label}`; return (<motion.div key={id} {...staggerItem} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="p-4"><div className="flex items-center justify-between mb-2"><h3 className="text-sm font-bold">{tmpl.label}</h3><button onClick={() => handleCopy(tmpl.content, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}</button></div><p className="text-xs mb-3" style={{ color: "#6B7280" }}>{tmpl.desc}</p><button onClick={() => toggleExpand(id)} className="text-[10px] font-mono" style={{ color: zoneColor }}>{expandedItems.has(id) ? "COLLAPSE ▲" : "EXPAND ▼"}</button></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><pre className="p-4 text-[11px] leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{tmpl.content}</pre></motion.div>)}</AnimatePresence></motion.div>); })}</div>)}

              {activeSubTab.activate === "Brands" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>{BRANDS.map((brand) => { const id = `brand-${brand.id}`; return (<Tip key={id} text={brand.uc}><motion.div {...staggerItem} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: `1px solid ${brand.col}22` }}><div className="p-4"><div className="flex items-center justify-between mb-2"><h3 className="text-sm font-bold" style={{ color: brand.col }}>{brand.label}</h3><button onClick={() => handleCopy(brand.prompt, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}</button></div><p className="text-xs" style={{ color: "#6B7280" }}>{brand.uc}</p><button onClick={() => toggleExpand(id)} className="text-[10px] font-mono mt-2" style={{ color: brand.col }}>{expandedItems.has(id) ? "COLLAPSE ▲" : "VIEW SYSTEM ▼"}</button></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><pre className="p-4 text-[11px] leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{brand.prompt}</pre></motion.div>)}</AnimatePresence></motion.div></Tip>); })}</div>)}

              {activeSubTab.activate === "Animals" && (<div>
                {/* Animal User Input Generator */}
                <div className="mb-6 rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 className="text-xs font-bold mb-2" style={{ color: zoneColor }}>🧬 Animal Prompt Generator</h3>
                  <p className="text-[10px] mb-3" style={{ color: "#6B7280" }}>Enter your task below, then tap an animal to generate a combined prompt.</p>
                  <div className="flex gap-2">
                    <input value={animalUserInput} onChange={(e) => setAnimalUserInput(e.target.value)} placeholder="e.g. Build a landing page for a SaaS tool..." className="flex-1 px-3 py-2 rounded-lg text-xs outline-none" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} />
                    {animalUserInput.trim() && <button onClick={() => setAnimalUserInput("")} className="px-2 rounded-lg text-[10px]" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>Clear</button>}
                  </div>
                </div>
                {/* Generated Result */}
                <AnimatePresence>{animalGenResult && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mb-6 rounded-xl overflow-hidden" style={{ background: "#14161A", border: `1px solid ${zoneColor}33` }}>
                  <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}><span className="text-[10px] font-mono" style={{ color: zoneColor }}>GENERATED PROMPT</span><button onClick={() => handleCopy(animalGenResult, "animal-gen")} className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === "animal-gen" ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}</button></div>
                  <pre className="p-4 text-xs leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{animalGenResult}</pre>
                </motion.div>)}</AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>{ANIMALS.map((animal) => { const id = `animal-${animal.name}`; const color = ANIMAL_COLORS[animal.name] || "#4DFFFF"; const genPrompt = animalUserInput.trim() ? `${animal.prompt}\n\n---\nYOUR TASK:\n${animalUserInput.trim()}` : null; return (<Tip key={id} text={animal.prompt.split("\n")[0]}><motion.div {...staggerItem} className="rounded-xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer" style={{ background: "#14161A", border: genPrompt ? `1px solid ${color}44` : `1px solid ${color}22` }} onClick={() => toggleExpand(id)}><div className="flex items-center gap-3 mb-3"><span className="text-2xl">{animal.emoji}</span><div className="flex-1 min-w-0"><h3 className="text-sm font-bold" style={{ color }}>{animal.name}</h3><p className="text-[10px] font-mono" style={{ color: "#A1A1AA" }}>{animal.mode}</p></div><div className="flex items-center gap-1 flex-shrink-0"><button onClick={(e) => { e.stopPropagation(); handleCopy(animal.prompt, id); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Copy base prompt">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>{genPrompt && <button onClick={(e) => { e.stopPropagation(); setAnimalGenResult(genPrompt); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" style={{ color }} title="Generate with user input"><Sparkles className="w-3 h-3" /></button>}</div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><pre className="text-[11px] leading-relaxed whitespace-pre-wrap pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{animal.prompt}</pre></motion.div>)}</AnimatePresence></motion.div></Tip>); })}</div>
              </div>)}

              {activeSubTab.activate === "Composer" && (<div className="max-w-3xl mx-auto"><div className="mb-4 text-xs" style={{ color: "#A1A1AA" }}>Fill in the layers below. Leave blank what you don&apos;t need.</div><div className="space-y-4 mb-6">{LAYERS.map((layer) => (<div key={layer.name} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-mono font-bold" style={{ color: zoneColor }}>{layer.n}</span><span className="text-xs font-bold">{layer.name}</span></div><p className="text-[10px] mb-2" style={{ color: "#6B7280" }}>{layer.pur}</p><textarea value={composerFields[layer.name]} onChange={(e) => setComposerFields({ ...composerFields, [layer.name]: e.target.value })} placeholder={layer.miss} rows={2} className="w-full rounded-lg p-2.5 text-xs outline-none resize-y" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF", fontFamily: "monospace" }} /></div>))}</div><div className="flex items-center gap-3"><Tip text="Combine all filled layers into one prompt"><button onClick={handleComposerAssemble} className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ background: `${zoneColor}18`, color: zoneColor, border: `1px solid ${zoneColor}44` }}>Assemble Prompt</button></Tip><button onClick={() => { setComposerFields({ Role: "", Context: "", Objective: "", Constraints: "", Aesthetic: "", Planning: "", Output: "", Refinement: "" }); setComposerResult(null); }} className="px-4 py-2.5 rounded-lg text-xs" style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}>Reset</button>{composerResult && <button onClick={() => handleCopy(composerResult, "composer")} className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors">{copiedId === "composer" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" style={{ color: "#6B7280" }} />}</button>}</div><AnimatePresence>{composerResult && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4"><pre className="rounded-xl p-5 text-xs leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ background: "#14161A", border: `1px solid ${zoneColor}22`, color: "#A1A1AA", fontFamily: "monospace" }}>{composerResult}</pre></motion.div>)}</AnimatePresence></div>)}
            </>)}

            {/* ═══ BUILD ═══ */}
            {activeZone === "build" && (<>
              {activeSubTab.build === "Master Prompt" && (<div className="max-w-3xl mx-auto"><h2 className="text-lg font-bold mb-2">Master System Prompt</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>The foundational prompt that sets AI behavior. Copy and paste to use.</p><div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}><span className="text-[10px] font-mono tracking-widest" style={{ color: zoneColor }}>SYSTEM PROMPT</span><button onClick={() => handleCopy(MASTER, "master")} className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === "master" ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}</button></div><pre className="p-5 text-xs leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{MASTER}</pre></div></div>)}

              {activeSubTab.build === "Enhancements" && (<div className="space-y-4">{ENHANCEMENTS.map((enh, i) => { const id = `enh-${i}`; return (<Tip key={id} text={`When: ${enh.when}`}><div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="p-4 cursor-pointer" onClick={() => toggleExpand(id)}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>0{i + 1}</span><h3 className="text-sm font-bold">{enh.label}</h3></div><div className="flex items-center gap-2"><span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>{enh.when}</span>{expandedItems.has(id) ? <ChevronDown className="w-3.5 h-3.5" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />}</div></div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-4 pb-4 space-y-3"><div className="rounded-lg p-3" style={{ background: "#0B0D10" }}><div className="flex items-center justify-between mb-1"><div className="text-[10px] font-mono" style={{ color: zoneColor }}>WHAT IT DOES</div><button onClick={() => handleCopy(enh.content, `content-${id}`)} className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px]" style={{ background: `${zoneColor}15`, color: zoneColor }}>{copiedId === `content-${id}` ? <><Check className="w-2.5 h-2.5" /> Copied</> : <><Copy className="w-2.5 h-2.5" /> Copy</>}</button></div><pre className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{enh.content}</pre></div><div className="rounded-lg p-3" style={{ background: "#0B0D10" }}><div className="flex items-center justify-between mb-1"><div className="text-[10px] font-mono" style={{ color: zoneColor }}>HOW TO USE</div><button onClick={() => handleCopy(enh.howto, `guide-${id}`)} className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px]" style={{ background: `${zoneColor}15`, color: zoneColor }}>{copiedId === `guide-${id}` ? <><Check className="w-2.5 h-2.5" /> Copied</> : <><Copy className="w-2.5 h-2.5" /> Copy Guide</>}</button></div><pre className="text-[11px] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{enh.howto}</pre></div></div></motion.div>)}</AnimatePresence></div></Tip>); })}</div>)}

              {activeSubTab.build === "Meta Builder" && (<div><div className="mb-6"><h2 className="text-lg font-bold mb-2">Meta Prompt Builder</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Transform your prompts with three expert AI methodologies.</p><div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><textarea value={metaPrompt} onChange={(e) => setMetaPrompt(e.target.value)} placeholder="Paste or type your prompt here..." rows={5} className="w-full bg-transparent text-sm p-4 outline-none resize-none" style={{ color: "#e2e8f0", fontFamily: "monospace" }} /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{META_PROMPTS.map((meta) => { const Icon = meta.icon; const state = metaResults[meta.id]; return (<div key={meta.id} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: `1px solid ${meta.accent}33` }}><div className="p-4"><div className="flex items-center gap-2 mb-3"><div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: `${meta.accent}15` }}><Icon className="w-4 h-4" style={{ color: meta.accent }} /></div><div><span className="text-[10px] font-mono" style={{ color: "#6B7280" }}>#{meta.id}</span><h3 className="text-xs font-bold">{meta.title}</h3></div></div><p className="text-[11px] mb-3" style={{ color: "#6B7280" }}>{meta.description}</p><button onClick={() => handleMetaGenerate(meta.id)} disabled={state.loading || !metaPrompt.trim()} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-40" style={{ background: `${meta.accent}15`, color: meta.accent, border: `1px solid ${meta.accent}33` }}>{state.loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate</>}</button></div><AnimatePresence>{(state.content || state.error || state.loading) && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}><div className="px-4 py-2 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}><span className="text-[10px] font-mono" style={{ color: "#6B7280" }}>{state.error ? "ERROR" : "RESULT"}</span>{state.content && <button onClick={() => handleCopy(state.content, `meta-${meta.id}`)} className="p-1 rounded hover:bg-white/10">{copiedId === `meta-${meta.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>}</div><div className="p-4 max-h-80 overflow-y-auto">{state.loading && <Skeleton lines={5} className="py-1" />}{state.error && <p className="text-xs" style={{ color: "#ef4444" }}>{state.error}</p>}{state.content && !state.loading && <div className="markdown-result text-xs"><ReactMarkdown>{state.content}</ReactMarkdown></div>}</div></div></motion.div>)}</AnimatePresence></div>); })}</div></div>)}
            </>)}

            {/* ═══ VALIDATE ═══ */}
            {activeZone === "validate" && (<>
              {activeSubTab.validate === "Lint Rules" && (<div className="space-y-6">{["universal", "ui/ux", "code", "content", "agent"].map((seg) => { const rules = LINT_RULES.filter((r) => r.seg === seg); return (<div key={seg}><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{seg.toUpperCase()} ({rules.length})</div><div className="space-y-2">{rules.map((rule) => (<div key={rule.id} className="rounded-lg p-3 flex items-start gap-3" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${rule.auto ? "bg-green-500" : "bg-amber-500"}`} /><div className="flex-1 min-w-0"><p className="text-xs" style={{ color: "#e4e4e7" }}>{rule.check}</p><p className="text-[10px] mt-1" style={{ color: "#6B7280" }}>→ {rule.fix}</p></div><button onClick={() => handleCopy(rule.fix, `lint-${rule.id}`)} className="p-1 rounded hover:bg-white/10 flex-shrink-0">{copiedId === `lint-${rule.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button></div>))}</div></div>); })}</div>)}
              {activeSubTab.validate === "Word Swaps" && (<div className="space-y-6">{SWAP_LEVELS.map((level) => { const swaps = SWAPS.filter((s) => s.level === level); if (swaps.length === 0) return null; return (<div key={level}><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{level.toUpperCase()} ({swaps.length})</div><div className="space-y-2">{swaps.map((swap, i) => { const id = `swap-${level}-${i}`; return (<div key={id} className="rounded-lg p-3 cursor-pointer transition-all hover:border-white/15" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><div className="flex items-center gap-2 flex-wrap"><span className="text-xs line-through" style={{ color: "#ef4444" }}>{swap.bad}</span><span className="text-[10px]" style={{ color: "#4b5563" }}>→</span><span className="text-xs font-medium" style={{ color: "#22c55e" }}>{swap.good}</span><button onClick={(e) => { e.stopPropagation(); handleCopy(swap.good, id); }} className="ml-auto p-1 rounded hover:bg-white/10 flex-shrink-0">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>{expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="text-[10px] mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA" }}>💡 {swap.tip}</p></motion.div>)}</AnimatePresence></div>); })}</div></div>); })}</div>)}
              {activeSubTab.validate === "Vocabulary" && (<div className="space-y-6">{VOCAB_CATS.map((cat) => { const terms = VOCAB.filter((v) => v.cat === cat); return (<div key={cat}><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{cat.toUpperCase()} ({terms.length})</div><div className="space-y-2">{terms.map((term, i) => { const id = `vocab-${cat}-${i}`; return (<div key={id} className="rounded-lg p-3 cursor-pointer" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><div className="flex items-center justify-between"><h4 className="text-xs font-bold font-mono">{term.t}</h4><div className="flex items-center gap-1"><button onClick={(e) => { e.stopPropagation(); handleCopy(`${term.t}: ${term.d}\n💡 ${term.tip}`, id); }} className="p-1 rounded hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>{expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="mt-2 pt-2 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}><p className="text-[11px]" style={{ color: "#A1A1AA" }}>{term.d}</p><p className="text-[10px]" style={{ color: "#6B7280" }}>💡 {term.tip}</p></div></motion.div>)}</AnimatePresence></div>); })}</div></div>); })}</div>)}
              {activeSubTab.validate === "Quality Score" && (<div className="max-w-2xl mx-auto"><h2 className="text-lg font-bold mb-2">AI Quality Scoring</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Enter a prompt to get AI-powered quality analysis across 4 dimensions.</p><div className="rounded-xl overflow-hidden mb-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><textarea value={qaInput} onChange={(e) => setQaInput(e.target.value)} placeholder="Paste your prompt here to analyze..." rows={5} className="w-full bg-transparent text-sm p-4 outline-none resize-none" style={{ color: "#e2e8f0", fontFamily: "monospace" }} /></div><Tip text="AI-powered 4-dimension prompt analysis"><button onClick={handleQualityScore} disabled={qaLoading || !qaInput.trim()} className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40" style={{ background: `${zoneColor}18`, color: zoneColor, border: `1px solid ${zoneColor}44` }}>{qaLoading ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" /> Analyzing...</> : "Analyze Prompt"}</button></Tip><AnimatePresence>{qaResult && (<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-xl p-6" style={{ background: "#14161A", border: `1px solid ${zoneColor}22` }}><div className="flex flex-col sm:flex-row items-center gap-6 mb-4"><RadarChart scores={qaResult.scores} /><div className="grid grid-cols-2 gap-3 flex-1">{(["clarity", "specificity", "structure", "actionability"] as const).map((dim) => { const score = qaResult.scores[dim]; const color = score >= 8 ? "#22c55e" : score >= 5 ? "#eab308" : "#ef4444"; return (<div key={dim} className="text-center"><div className="text-2xl font-bold" style={{ color }}>{score}</div><div className="w-full h-1.5 rounded-full mb-1 mt-1" style={{ background: "rgba(255,255,255,0.07)" }}><motion.div className="h-full rounded-full" style={{ width: `${score * 10}%`, background: color }} initial={{ width: 0 }} animate={{ width: `${score * 10}%` }} transition={{ duration: 0.6 }} /></div><div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#6B7280" }}>{dim}</div></div>); })}</div></div><div className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}><span className="font-bold" style={{ color: zoneColor }}>Feedback:</span> {qaResult.feedback}</div><div className="mt-3 text-[10px] font-mono" style={{ color: "#4b5563" }}>Overall: {((qaResult.scores.clarity + qaResult.scores.specificity + qaResult.scores.structure + qaResult.scores.actionability) / 4).toFixed(1)} / 10</div></motion.div>)}</AnimatePresence></div>)}
            </>)}

            {/* ═══ PLAYBOOK ═══ */}
            {activeZone === "playbook" && (<>
              {activeSubTab.playbook === "Workflows" && (<div><div className="mb-4 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4b5563" }} /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search workflows..." className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} /></div>
                {/* Workflow Connector Visual */}
                <div className="mb-6 rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 className="text-xs font-bold mb-3" style={{ color: zoneColor }}>Workflow Interconnections</h3>
                  <div className="flex flex-wrap items-center gap-2 justify-center">
                    {["🎨 Design", "💻 Dev", "🤖 AI/ML", "📊 Content", "📈 Business", "🚀 DevOps"].map((node, i) => (
                      <div key={node} className="flex items-center gap-2"><span className="text-[10px] font-mono px-2 py-1 rounded-lg" style={{ background: `${zoneColor}12`, color: zoneColor }}>{node}</span>{i < 5 && <ArrowRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{filteredWorkflows.map((wf, i) => { const wfId = `wf-${i}`; const isExp = expandedWorkflowIdx === i; return (<div key={i} className="rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-pointer" onClick={() => setExpandedWorkflowIdx(isExp ? null : i)} style={{ background: "#14161A", border: `1px solid ${isExp ? `${zoneColor}55` : "rgba(255,255,255,0.07)"}` }}><div className="flex items-center justify-between mb-1"><div className="text-[10px] font-mono" style={{ color: zoneColor }}>{wf.cat}</div><span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#6B7280" }}>{wf.prompt.length} chars</span></div><h3 className="text-sm font-bold mb-1">{wf.title}</h3><p className="text-xs mb-2" style={{ color: "#A1A1AA" }}>{wf.purpose}</p><p className="text-[10px] mb-3" style={{ color: "#6B7280" }}>Best for: {wf.best}</p><button onClick={(e) => { e.stopPropagation(); handleCopy(wf.prompt, wfId); }} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === wfId ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Prompt</>}</button><AnimatePresence>{isExp && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="overflow-hidden" onClick={(e) => e.stopPropagation()}><div className="mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between mb-2"><span className="text-[10px] font-mono" style={{ color: zoneColor }}>PROMPT PREVIEW</span><button onClick={() => handleCopy(wf.prompt, `wf-preview-${i}`)} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === `wf-preview-${i}` ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}</button></div><pre className="p-3 rounded-lg text-xs leading-relaxed whitespace-pre-wrap" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.05)", color: "#A1A1AA", fontFamily: "monospace", maxHeight: "240px", overflowY: "auto" }}>{wf.prompt}</pre></div></motion.div>)}</AnimatePresence></div>); })}</div></div>)}
              {activeSubTab.playbook === "Animal Chains" && (<div className="max-w-3xl space-y-4">
                {/* Chain User Input Generator */}
                <div className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <h3 className="text-xs font-bold mb-2" style={{ color: zoneColor }}>🔗 Chain Prompt Generator</h3>
                  <p className="text-[10px] mb-3" style={{ color: "#6B7280" }}>Enter your goal, then tap a chain to combine all animal thinking modes into one mega-prompt.</p>
                  <div className="flex gap-2">
                    <input value={chainUserInput} onChange={(e) => setChainUserInput(e.target.value)} placeholder="e.g. Build an AI content pipeline..." className="flex-1 px-3 py-2 rounded-lg text-xs outline-none" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} />
                    {chainUserInput.trim() && <button onClick={() => { setChainUserInput(""); setChainGenResult(null); }} className="px-2 rounded-lg text-[10px]" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>Clear</button>}
                  </div>
                </div>
                {/* Generated Chain Result */}
                <AnimatePresence>{chainGenResult && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: `1px solid ${zoneColor}33` }}>
                  <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}><span className="text-[10px] font-mono" style={{ color: zoneColor }}>CHAIN PROMPT</span><button onClick={() => handleCopy(chainGenResult, "chain-gen")} className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === "chain-gen" ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}</button></div>
                  <pre className="p-4 text-xs leading-relaxed max-h-80 overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{chainGenResult}</pre>
                </motion.div>)}</AnimatePresence>
                {CHAINS.map((chain, i) => {
                  const isExp = expandedChainIdx === i;
                  const chainAnimals = chain.c.map((name) => ANIMALS.find((a) => a.name === name)).filter(Boolean);
                  const chainPromptPreview = chainAnimals.map((a) => `[${a!.emoji} ${a!.name} — ${a!.mode}]\n${a!.prompt}`).join("\n\n");
                  const genPrompt = chainUserInput.trim() ? `${chainPromptPreview}\n\n---\nYOUR GOAL:\n${chainUserInput.trim()}` : null;
                  const chainId = `chain-${i}`;
                  return (<div key={i} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: genPrompt ? `1px solid ${zoneColor}33` : "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="p-4 cursor-pointer" onClick={() => setExpandedChainIdx(isExp ? null : i)}>
                      <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-bold">{chain.goal}</h3><div className="flex items-center gap-2">{genPrompt && <button onClick={(e) => { e.stopPropagation(); setChainGenResult(genPrompt); }} className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}><Sparkles className="w-3 h-3" /> Generate</button>}<button onClick={(e) => { e.stopPropagation(); handleCopy(chainPromptPreview, chainId); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="Copy chain prompt">{copiedId === chainId ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>{isExp ? <ChevronDown className="w-3.5 h-3.5" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />}</div></div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">{chain.c.map((name, j) => { const emoji = ANIMAL_EMOJIS[name] || "🐾"; const color = ANIMAL_COLORS[name] || "#4DFFFF"; return (<div key={j} className="flex items-center gap-1"><span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs" style={{ background: `${color}12`, color }}>{emoji} {name}</span>{j < chain.c.length - 1 && <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div>); })}</div>
                      <p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {chain.best}</p>
                    </div>
                    <AnimatePresence>{isExp && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-4 pb-4"><pre className="text-[11px] leading-relaxed whitespace-pre-wrap rounded-lg p-3" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.05)", color: "#A1A1AA", fontFamily: "monospace" }}>{chainPromptPreview}</pre></div></motion.div>)}</AnimatePresence>
                  </div>);
                })}
              </div>)}
              {activeSubTab.playbook === "Design Combos" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{COMBOS.map((combo, i) => { const id = `combo-${i}`; return (<div key={id} className="rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><div className="flex items-start justify-between mb-1"><h3 className="text-sm font-bold">{combo.combo}</h3><button onClick={(e) => { e.stopPropagation(); handleCopy(`Design Combo: ${combo.combo}\nElements: ${combo.els}\nBest for: ${combo.best}\nPsychology: ${combo.psych}`, id); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button></div><p className="text-[10px] mb-1" style={{ color: "#A1A1AA" }}>Elements: {combo.els}</p><p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {combo.best}</p><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="text-[10px] mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: zoneColor }}>🧠 {combo.psych}</p></motion.div>)}</AnimatePresence></div>); })}</div>)}
              {activeSubTab.playbook === "Typography" && (<div className="max-w-3xl space-y-6"><div><h3 className="text-sm font-bold mb-3">Display + Mono Pairings</h3><div className="space-y-2">{TYPO.map((pair, i) => { const id = `typo-${i}`; return (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-start justify-between"><div><div className="flex items-baseline gap-3 mb-1"><span className="text-lg font-bold" style={{ color: zoneColor }}>{pair.d}</span><span className="text-xs" style={{ color: "#6B7280" }}>+ {pair.m}</span></div><p className="text-[10px]" style={{ color: "#A1A1AA" }}>{pair.b}</p></div><button onClick={() => handleCopy(`Font Pairing: ${pair.d} + ${pair.m}\n${pair.b}`, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button></div></div>); })}</div></div><div><h3 className="text-sm font-bold mb-3">Use-Case Recommendations</h3><div className="space-y-2">{TYPO_USECASES.map((uc, i) => { const id = `typuc-${i}`; return (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-start justify-between"><div><div className="text-xs font-bold mb-1" style={{ color: zoneColor }}>{uc.u}</div><p className="text-[11px]" style={{ color: "#A1A1AA" }}>{uc.c}</p></div><button onClick={() => handleCopy(`Typography: ${uc.u}\n${uc.c}`, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button></div></div>); })}</div></div></div>)}
            </>)}

            {/* ═══ MONETIZE ═══ */}
            {activeZone === "monetize" && (<>
              {activeSubTab.monetize === "Top Prompts" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{MONETIZE_TOP_PROMPTS.map((item, i) => { const id = `mon-top-${i}`; return (<div key={id} className="rounded-xl p-4 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between mb-2"><span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.cat}</span><span className="text-[9px] px-2 py-0.5 rounded font-bold" style={{ background: item.rev === "$$$" ? "rgba(239,68,68,0.12)" : item.rev === "$$" ? "rgba(234,179,8,0.12)" : "rgba(34,197,94,0.12)", color: item.rev === "$$$" ? "#ef4444" : item.rev === "$$" ? "#eab308" : "#22c55e" }}>Revenue: {item.rev}</span></div><h3 className="text-sm font-bold mb-2">{item.label}</h3><p className="text-[11px] mb-3" style={{ color: "#A1A1AA" }}>{item.desc}</p><button onClick={() => handleCopy(`[${item.cat}] ${item.label}\n${item.desc}`, id)} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === id ? <><Check className="w-3 h-3" /> Added</> : <><Copy className="w-3 h-3" /> Add to Basket</>}</button></div>); })}</div>)}
              {activeSubTab.monetize === "SaaS Templates" && (<div className="space-y-3">{MONETIZE_SAAS.map((item, i) => { const dc = DIFF_COLORS[item.diff] || DIFF_COLORS.medium; const id = `mon-saas-${i}`; return (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center gap-2 mb-1"><h3 className="text-sm font-bold">{item.label}</h3><span className="text-[9px] px-2 py-0.5 rounded" style={{ background: dc.bg, color: dc.text }}>{dc.label}</span><span className="text-[9px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>~{item.time}</span></div><p className="text-xs mb-2" style={{ color: "#A1A1AA" }}>{item.desc}</p><p className="text-[10px] font-mono mb-3" style={{ color: zoneColor }}>Stack: {item.stack}</p><button onClick={() => handleCopy(`[${item.diff}] ${item.label}\n${item.desc}\nStack: ${item.stack}`, id)} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === id ? <><Check className="w-3 h-3" /> Added</> : <><Copy className="w-3 h-3" /> Add to Basket</>}</button></div>); })}</div>)}
              {activeSubTab.monetize === "Stacks" && (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{MONETIZE_STACKS.map((item, i) => { const id = `mon-stack-${i}`; return (<div key={i} className="rounded-xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-2">{item.label}</h3><div className="flex items-center gap-3 mb-2"><span className="text-[10px] font-mono" style={{ color: zoneColor }}>{item.time}</span><span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.income}</span></div><p className="text-xs mb-3" style={{ color: "#A1A1AA" }}>{item.desc}</p><button onClick={() => handleCopy(`${item.label} — ${item.time} — ${item.income}\n${item.desc}`, id)} className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === id ? <><Check className="w-3 h-3" /> Added</> : <><Copy className="w-3 h-3" /> Add to Basket</>}</button></div>); })}</div>)}
              {activeSubTab.monetize === "AI Tools" && (<div className="space-y-3">{MONETIZE_AI_TOOLS.map((item, i) => { const aiId = `ai-tool-${i}`; return (<div key={i} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="p-4 cursor-pointer" onClick={() => toggleExpand(aiId)}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><h3 className="text-sm font-bold">{item.label}</h3><span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.cat}</span><span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>{item.tier}</span></div><div className="flex items-center gap-2">{expandedItems.has(aiId) ? <ChevronDown className="w-3.5 h-3.5" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />}</div></div><p className="text-xs mt-1" style={{ color: "#A1A1AA" }}>{item.desc}</p></div><AnimatePresence>{expandedItems.has(aiId) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-4 pb-4"><div className="rounded-lg p-3" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.05)" }}><div className="flex items-center justify-between mb-2"><div className="text-[10px] font-mono" style={{ color: zoneColor }}>🚀 GET STARTED PROMPT</div><button onClick={(e) => { e.stopPropagation(); handleCopy(item.starter, aiId); }} className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] transition-all" style={{ background: `${zoneColor}15`, color: zoneColor }}>{copiedId === aiId ? <><Check className="w-2.5 h-2.5" /> Copied</> : <><Copy className="w-2.5 h-2.5" /> Copy</>}</button></div><p className="text-[11px] leading-relaxed" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{item.starter}</p></div></div></motion.div>)}</AnimatePresence></div>); })}</div>)}

              {/* Compounding */}
              {activeSubTab.monetize === "Compounding" && (<div className="max-w-3xl mx-auto space-y-6"><div className="rounded-xl p-6 text-center" style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.08), rgba(77,255,255,0.08))", border: "1px solid rgba(167,139,250,0.2)" }}><h2 className="text-xl font-bold mb-2">The Compounding System</h2><p className="text-sm mb-6" style={{ color: "#A1A1AA" }}>Build once → Runs forever → Every skill makes system smarter → Every cron removes thinking</p><div className="flex flex-wrap justify-center gap-8 mb-6"><div className="text-center"><div className="text-3xl font-bold" style={{ color: "#a78bfa" }}><AnimatedCounter value={12} /></div><div className="text-[10px] mt-1" style={{ color: "#6B7280" }}>Skills Built</div></div><div className="text-center"><div className="text-3xl font-bold" style={{ color: "#4DFFFF" }}><AnimatedCounter value={47} /></div><div className="text-[10px] mt-1" style={{ color: "#6B7280" }}>Tasks Automated</div></div><div className="text-center"><div className="text-3xl font-bold" style={{ color: "#22c55e" }}><AnimatedCounter value={156} suffix="hrs" /></div><div className="text-[10px] mt-1" style={{ color: "#6B7280" }}>Time Saved</div></div></div><div className="flex flex-col items-center gap-2"><span className="text-xs" style={{ color: "#A1A1AA" }}>Each compounding cycle makes every future task faster</span><div className="flex items-center gap-2 text-xs" style={{ color: "#a78bfa" }}>Skill → Automation → Template → Next Skill <TrendingUp className="w-3 h-3" /></div></div></div></div>)}

              {/* Pricing Guide */}
              {activeSubTab.monetize === "Pricing Guide" && (<div className="max-w-3xl mx-auto"><h2 className="text-lg font-bold mb-4">Template Pricing Matrix</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{[
                { tier: "Free", price: "$0", color: "#22c55e", items: ["Basic prompts (single-use)", "Modifier snippets", "Word swap list", "Brand system templates"] },
                { tier: "Starter", price: "$5", color: "#4DFFFF", items: ["10 curated prompt packs", "Industry-specific templates", "Meta prompt builder presets", "Quality score access"] },
                { tier: "Pro", price: "$15", color: "#FFB000", items: ["Complete prompt library (50+)", "SaaS template blueprints", "Automation workflow designs", "Skill documentation templates", "Priority support"] },
                { tier: "Business", price: "$49", color: "#FF4FD8", items: ["Everything in Pro", "Custom brand system design", "MCP server templates", "Notion workspace blueprints", "Team license (5 seats)", "Consulting session"] },
              ].map((tier) => (<div key={tier.tier} className="rounded-xl p-4" style={{ background: "#14161A", border: `1px solid ${tier.color}22` }}><div className="text-xs font-bold mb-1" style={{ color: tier.color }}>{tier.tier}</div><div className="text-2xl font-bold mb-3">{tier.price}</div><ul className="space-y-1.5">{tier.items.map((item, i) => (<li key={i} className="text-[11px] flex items-start gap-1.5" style={{ color: "#A1A1AA" }}><span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tier.color }} />{item}</li>))}</ul></div>))}</div></div>)}
            </>)}

            {/* ═══ SYSTEM ═══ */}
            {activeZone === "system" && (<>
              {/* Skills Library */}
              {activeSubTab.system === "Skills Library" && (<div>
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Total Skills", value: TOTAL_SKILLS, icon: "\ud83e\udde0", color: "#a78bfa" },
                    { label: "Categories", value: TOTAL_CATEGORIES, icon: "\ud83d\udcca", color: "#38bdf8" },
                    { label: "Total Files", value: TOTAL_FILES, icon: "\ud83d\udcc1", color: "#22c55e" },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl p-4 text-center" style={{ background: "#14161A", border: `1px solid ${stat.color}22` }}>
                      <div className="text-xl mb-1">{stat.icon}</div>
                      <div className="text-2xl font-bold" style={{ color: stat.color }}><AnimatedCounter value={stat.value} /></div>
                      <div className="text-[10px] mt-1" style={{ color: "#6B7280" }}>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4b5563" }} />
                  <input value={skillsSearchQuery} onChange={(e) => setSkillsSearchQuery(e.target.value)} placeholder="Search skills by name or description..." className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} />
                </div>

                {/* Category Filter Pills */}
                <ScrollableWithArrows className="flex items-center gap-2 mb-6 pb-1">
                  <button onClick={() => setSkillsCategoryFilter("all")} className="btn-press px-3 py-1.5 text-[10px] font-medium rounded-full whitespace-nowrap flex items-center gap-1" style={{ color: skillsCategoryFilter === "all" ? "#a78bfa" : "#6B7280", background: skillsCategoryFilter === "all" ? "rgba(167,139,250,0.15)" : "transparent", border: `1px solid ${skillsCategoryFilter === "all" ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.07)"}` }}>
                    All <span className="opacity-60">({TOTAL_SKILLS})</span>
                  </button>
                  {CATEGORY_COUNTS.map((cc) => (
                    <button key={cc.category} onClick={() => setSkillsCategoryFilter(cc.category)} className="btn-press px-3 py-1.5 text-[10px] font-medium rounded-full whitespace-nowrap flex items-center gap-1" style={{ color: skillsCategoryFilter === cc.category ? (CATEGORY_COLORS[cc.category] || "#a78bfa") : "#6B7280", background: skillsCategoryFilter === cc.category ? `${(CATEGORY_COLORS[cc.category] || "#a78bfa")}18` : "transparent", border: `1px solid ${skillsCategoryFilter === cc.category ? `${(CATEGORY_COLORS[cc.category] || "#a78bfa")}44` : "rgba(255,255,255,0.07)"}` }}>
                      <span>{cc.icon}</span><span className="hidden sm:inline">{cc.category}</span><span className="opacity-60">({cc.count})</span>
                    </button>
                  ))}
                </ScrollableWithArrows>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" {...stagger}>
                  {filteredSkills.map((skill) => {
                    const catColor = CATEGORY_COLORS[skill.category] || "#6B7280";
                    const skillId = `skill-${skill.name}`;
                    const isExpSkill = expandedSkillId === skillId;
                    const catSkills = SKILLS_CATALOG.filter((s) => s.category === skill.category);
                    const catFiles = catSkills.reduce((sum, s) => sum + s.files, 0);
                    return (
                      <motion.div key={skill.name} {...staggerItem} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: isExpSkill ? `1px solid ${catColor}44` : "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="p-4 cursor-pointer" onClick={() => setExpandedSkillId(isExpSkill ? null : skillId)}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${catColor}15`, color: catColor }}>{skill.category}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#6B7280" }}>{skill.files} file{skill.files !== 1 ? "s" : ""}</span>
                              {isExpSkill ? <ChevronUp className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} />}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{skill.icon}</span>
                            <h3 className="text-sm font-bold" style={{ color: "#e4e4e7" }}>{skill.name}</h3>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}>{skill.description}</p>
                        </div>
                        <AnimatePresence>
                          {isExpSkill && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                                <div className="pt-3 space-y-2">
                                  <div className="flex items-center justify-between text-[10px]">
                                    <span style={{ color: "#6B7280" }}>Category Stats</span>
                                    <span style={{ color: catColor }}>{catSkills.length} skills · {catFiles} files</span>
                                  </div>
                                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <div className="h-full rounded-full" style={{ width: `${(skill.files / catFiles) * 100}%`, background: `${catColor}55` }} />
                                  </div>
                                  <p className="text-[10px]" style={{ color: "#4b5563" }}>This skill accounts for {Math.round((skill.files / catFiles) * 100)}% of {skill.category} files</p>
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={(e) => { e.stopPropagation(); handleCopy(`[${skill.icon} ${skill.name}] ${skill.description}`, skillId); }} className="flex-1 flex items-center justify-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all" style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}33` }}>
                                    <Copy className="w-3 h-3" /> Add to Basket
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); const cat = SKILL_CATEGORIES.indexOf(skill.category); if (cat >= 0) { setActiveZone("system"); setActiveSubTab((p) => ({ ...p, system: "Skills Library" })); setSkillsCategoryFilter(skill.category); } }} className="flex items-center justify-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition-all" style={{ background: "rgba(255,255,255,0.04)", color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    <Search className="w-3 h-3" /> View Category
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
                {filteredSkills.length === 0 && (
                  <div className="text-center py-12"><p className="text-sm" style={{ color: "#4b5563" }}>No skills match your search.</p></div>
                )}
              </div>)}

              {/* Compounding Dashboard */}
              {activeSubTab.system === "Compounding" && (<div>
                {/* System Health */}
                <h2 className="text-lg font-bold mb-2">System Health</h2>
                <p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Real-time overview of your compounding system.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Skills Installed", value: TOTAL_SKILLS, color: "#a78bfa", icon: <Layers className="w-5 h-5" /> },
                    { label: "Total Artifacts", value: TOTAL_FILES, color: "#38bdf8", icon: <FileText className="w-5 h-5" /> },
                    { label: "Categories", value: TOTAL_CATEGORIES, color: "#22c55e", icon: <BarChart3 className="w-5 h-5" /> },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl p-6 text-center" style={{ background: "#14161A", border: `1px solid ${stat.color}22` }}>
                      <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
                      <div className="text-3xl font-bold" style={{ color: stat.color }}><AnimatedCounter value={stat.value} /></div>
                      <div className="text-[10px] mt-1" style={{ color: "#6B7280" }}>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Category Distribution */}
                <h3 className="text-sm font-bold mb-4" style={{ color: "#a78bfa" }}>Category Distribution</h3>
                <div className="rounded-xl p-6 mb-8" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="space-y-3">
                    {CATEGORY_COUNTS.sort((a, b) => b.count - a.count).slice(0, 8).map((cc, i) => {
                      const maxCount = Math.max(...CATEGORY_COUNTS.map((c) => c.count));
                      const pct = (cc.count / maxCount) * 100;
                      const color = CATEGORY_COLORS[cc.category] || "#6B7280";
                      return (
                        <div key={cc.category} className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 w-40 flex-shrink-0">
                            <span className="text-sm">{cc.icon}</span>
                            <span className="text-[11px] truncate" style={{ color: "#A1A1AA" }}>{cc.category}</span>
                          </div>
                          <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }} className="h-full rounded-full flex items-center justify-end pr-2" style={{ background: `${color}33`, minWidth: "2rem" }}>
                              <span className="text-[9px] font-bold" style={{ color }}>{cc.count}</span>
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Compounding Principles */}
                <h3 className="text-sm font-bold mb-4" style={{ color: "#a78bfa" }}>Compounding Principles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: "\ud83d\udd04", title: "Build Once, Run Forever", desc: "Every skill, template, and automation is a permanent asset that compounds over time.", color: "#a78bfa" },
                    { icon: "\ud83d\udcc8", title: "Every Skill Compounds", desc: "Each new skill makes the entire system smarter and more capable.", color: "#22c55e" },
                    { icon: "\u26a1", title: "Zero Overlap, Zero Gaps", desc: "Cover every domain without redundancy. Each skill fills a unique gap.", color: "#eab308" },
                    { icon: "\ud83e\udd16", title: "Automate or Iterate", desc: "If you do it twice, automate it. If it's manual, iterate toward automation.", color: "#38bdf8" },
                  ].map((principle, i) => (
                    <motion.div key={principle.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: `1px solid ${principle.color}22` }}>
                      <div className="text-2xl mb-3">{principle.icon}</div>
                      <h4 className="text-xs font-bold mb-2" style={{ color: principle.color }}>{principle.title}</h4>
                      <p className="text-[11px] leading-relaxed" style={{ color: "#A1A1AA" }}>{principle.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>)}

              {/* Principles */}
              {activeSubTab.system === "Principles" && (<div className="max-w-3xl mx-auto space-y-4"><h2 className="text-lg font-bold mb-2">Core Principles</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>The foundational rules that govern the promptc OS philosophy.</p>{SYSTEM_PRINCIPLES.map((p, i) => { const id = `sys-p-${i}`; return (<div key={id} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: `1px solid ${p.color}22` }}><div className="p-4 cursor-pointer" onClick={() => toggleExpand(id)}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-xl">{p.icon}</span><h3 className="text-sm font-bold" style={{ color: p.color }}>{p.title}</h3></div><div className="flex items-center gap-2"><button onClick={(e) => { e.stopPropagation(); handleCopy(p.desc, id); }} className="p-1 rounded hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />}</button>{expandedItems.has(id) ? <ChevronDown className="w-4 h-4" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-4 h-4" style={{ color: "#4b5563" }} />}</div></div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-4 pb-4"><p className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}>{p.desc}</p></div></motion.div>)}</AnimatePresence></div>); })}</div>)}

              {/* Skill Builder */}
              {activeSubTab.system === "Skill Builder" && (<div className="max-w-3xl mx-auto"><h2 className="text-lg font-bold mb-2">Skill Builder Wizard</h2><p className="text-xs mb-6" style={{ color: "#A1A1AA" }}>Follow the 6-step process to build a production-ready skill.</p>
                <div className="flex items-center gap-1 mb-6 overflow-x-auto no-scrollbar">{SKILL_BUILDER_STEPS.map((s, i) => (<button key={i} onClick={() => setSkillStep(i)} className="px-3 py-2 text-[10px] font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5" style={{ color: skillStep === i ? "#a78bfa" : "#6B7280", background: skillStep === i ? "rgba(167,139,250,0.15)" : "transparent", border: `1px solid ${skillStep === i ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.07)"}` }}>{s.step}. {s.title}</button>))}</div>
                <div className="rounded-xl p-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-mono font-bold" style={{ color: "#a78bfa" }}>STEP {SKILL_BUILDER_STEPS[skillStep].step}</span><h3 className="text-sm font-bold">{SKILL_BUILDER_STEPS[skillStep].title}</h3></div>
                  <p className="text-xs mb-4" style={{ color: "#6B7280" }}>{SKILL_BUILDER_STEPS[skillStep].desc}</p>
                  <textarea value={skillForm[skillStep] || ""} onChange={(e) => setSkillForm({ ...skillForm, [skillStep]: e.target.value })} placeholder={SKILL_BUILDER_STEPS[skillStep].placeholder} rows={5} className="w-full rounded-lg p-3 text-xs outline-none resize-y mb-4" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF", fontFamily: "monospace" }} />
                  <div className="flex items-center justify-between"><div className="flex items-center gap-2">{SKILL_BUILDER_STEPS.map((_, i) => (<div key={i} className="w-6 h-1 rounded-full transition-all" style={{ background: i <= skillStep ? "#a78bfa" : "rgba(255,255,255,0.07)" }} />))}</div><div className="flex gap-2"><button onClick={() => skillStep > 0 && setSkillStep(skillStep - 1)} disabled={skillStep === 0} className="px-3 py-1.5 text-xs rounded-lg" style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}>Back</button>{skillStep < 5 ? (<button onClick={() => setSkillStep(skillStep + 1)} className="px-3 py-1.5 text-xs rounded-lg" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" }}>Next</button>) : (<button onClick={generateSkillMd} className="px-3 py-1.5 text-xs rounded-lg flex items-center gap-1" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" }}><FileDown className="w-3 h-3" /> Generate SKILL.md</button>)}</div></div>
                </div>
              </div>)}

              {/* Workflow Patterns */}
              {activeSubTab.system === "Workflow Patterns" && (<div className="max-w-3xl mx-auto space-y-6"><h2 className="text-lg font-bold mb-2">Workflow Patterns</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Visual step-flow patterns for systematic work.</p>
                <div className="rounded-xl p-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-4">PLAN → VALIDATE → EXECUTE</h3><div className="flex items-center justify-center gap-3 flex-wrap"><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="px-4 py-3 rounded-lg text-center" style={{ background: "rgba(234,179,8,0.12)", border: "1px solid rgba(234,179,8,0.25)" }}><div className="text-xs font-bold" style={{ color: "#eab308" }}>1. Plan</div><div className="text-[10px]" style={{ color: "#6B7280" }}>Break down</div></motion.div><ArrowRight className="w-4 h-4" style={{ color: "#4b5563" }} /><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="px-4 py-3 rounded-lg text-center" style={{ background: "rgba(77,255,255,0.12)", border: "1px solid rgba(77,255,255,0.25)" }}><div className="text-xs font-bold" style={{ color: "#4DFFFF" }}>2. Validate</div><div className="text-[10px]" style={{ color: "#6B7280" }}>Test & review</div></motion.div><ArrowRight className="w-4 h-4" style={{ color: "#4b5563" }} /><motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="px-4 py-3 rounded-lg text-center" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}><div className="text-xs font-bold" style={{ color: "#22c55e" }}>3. Execute</div><div className="text-[10px]" style={{ color: "#6B7280" }}>Build</div></motion.div></div></div>
                <div className="rounded-xl p-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-4">SELECT → PROTOTYPE → EVALUATE → CODIFY → CRON → MONITOR</h3><div className="flex items-center justify-center gap-2 flex-wrap">{["1.Select", "2.Prototype", "3.Evaluate", "4.Codify", "5.Cron", "6.Monitor"].map((s, i) => (<div key={i} className="flex items-center gap-2"><motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className="px-3 py-2 rounded-lg text-center" style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}><div className="text-[10px] font-bold" style={{ color: "#a78bfa" }}>{s.split(".")[1]}</div></motion.div>{i < 5 && <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div>))}</div></div>
              </div>)}

              {/* Self-Evolve */}
              {activeSubTab.system === "Self-Evolve" && (<div className="max-w-3xl mx-auto"><h2 className="text-lg font-bold mb-2">Self-Evolve Dashboard</h2><p className="text-xs mb-6" style={{ color: "#A1A1AA" }}>Track your compounding system growth.</p><div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">{[
                { icon: <Layers className="w-5 h-5" />, label: "Skills Built", value: TOTAL_SKILLS, color: "#a78bfa" },
                { icon: <Cpu className="w-5 h-5" />, label: "Tasks Automated", value: TOTAL_FILES, color: "#4DFFFF" },
                { icon: <Timer className="w-5 h-5" />, label: "Hours Saved", value: Math.floor((TOTAL_FILES + history.length) * 2.5), color: "#22c55e" },
                { icon: <FileText className="w-5 h-5" />, label: "Basket Items", value: history.length, color: "#FFB000" },
              ].map((stat, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl p-6 text-center" style={{ background: "#14161A", border: `1px solid ${stat.color}22` }}><div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div><div className="text-3xl font-bold" style={{ color: stat.color }}><AnimatedCounter value={stat.value} /></div><div className="text-[10px] mt-1" style={{ color: "#6B7280" }}>{stat.label}</div></motion.div>))}</div><div className="rounded-xl p-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-3" style={{ color: "#a78bfa" }}>Compounding Formula</h3><div className="flex items-center gap-3 justify-center flex-wrap text-xs"><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>Build Once</span><span style={{ color: "#4b5563" }}>→</span><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(77,255,255,0.1)", color: "#4DFFFF" }}>Runs Forever</span><span style={{ color: "#4b5563" }}>→</span><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>System Gets Smarter</span><span style={{ color: "#4b5563" }}>→</span><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(255,183,0,0.1)", color: "#FFB000" }}>Zero Thinking</span></div></div></div>)}

              {/* Infographics */}
              {activeSubTab.system === "Infographics" && (<div className="max-w-4xl mx-auto"><h2 className="text-lg font-bold mb-2">Zone Overview Infographic</h2><p className="text-xs mb-6" style={{ color: "#A1A1AA" }}>Content distribution across all zones.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">{ZONES.map((z, i) => { const tabs = ZONE_TABS[z.id] || []; const count = tabs.reduce((sum, t) => sum + (ZONE_TAB_COUNTS[z.id]?.[t] || 0), 0); const firstTab = tabs[0] || ""; return (<motion.div key={z.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} onClick={() => { handleZoneChange(z.id); if (firstTab) setActiveSubTab((p) => ({ ...p, [z.id]: firstTab })); }} className="rounded-xl p-4 text-center cursor-pointer transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: `1px solid ${z.color}22` }}><span className="text-lg">{z.icon}</span><div className="text-xl font-bold mt-1" style={{ color: z.color }}><AnimatedCounter value={count} /></div><div className="text-[10px]" style={{ color: "#6B7280" }}>{z.label}</div><div className="text-[9px] mt-1" style={{ color: "#4b5563" }}>Click to navigate →</div></motion.div>); })}</div>
                {/* Modifier Coverage Heat Map */}
                <div className="rounded-xl p-6 mb-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-4">Modifier Coverage Heat Map</h3><div className="space-y-1">{MOD_CATS.slice(0, 6).map((cat) => (<div key={cat} className="flex items-center gap-2"><span className="text-[10px] font-mono w-20 flex-shrink-0 text-right" style={{ color: "#6B7280" }}>{cat}</span><div className="flex-1 flex gap-0.5">{["Tasks", "Modifiers", "Templates", "Lint"].map((zone) => { const hasMatch = (cat === "Role" || cat === "Agent" || cat === "Productivity") && zone !== "Lint"; return <div key={zone} className="h-4 flex-1 rounded-sm transition-all" style={{ background: hasMatch ? `${zoneColor}44` : "rgba(255,255,255,0.04)" }} title={`${cat} × ${zone}: ${hasMatch ? "Applies" : "No direct link"}`} />; })}</div></div>))}</div><div className="flex items-center gap-3 mt-3 text-[9px]" style={{ color: "#4b5563" }}><div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm" style={{ background: `${zoneColor}44` }} /> Applies</div><div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.04)" }} /> No direct link</div></div></div>
              </div>)}

              {/* Package Docs */}
              {activeSubTab.system === "Package Docs" && (<div className="max-w-3xl mx-auto text-center py-12"><div className="rounded-xl p-8 mb-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><FileText className="w-12 h-12 mx-auto mb-4" style={{ color: "#a78bfa" }} /><h2 className="text-lg font-bold mb-2">Generate Reference Document</h2><p className="text-sm mb-6" style={{ color: "#A1A1AA" }}>Download a comprehensive markdown document with all prompts, modifiers, templates, and brand systems organized by zone.</p><button onClick={generatePackageDocs} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" }}><FolderDown className="w-4 h-4" /> Generate & Download .md</button></div><div className="text-[10px]" style={{ color: "#4b5563" }}>Includes: {MODS.length} modifiers, {TMPLS.length} templates, {TASKS.length} tasks, {BRANDS.length} brands, {ENHANCEMENTS.length} enhancements, {LINT_RULES.length} lint rules</div></div>)}
            </>)}
          </motion.div>
        </AnimatePresence>
      </main>



      {/* ─── Keyboard Shortcuts Overlay ─── */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-[65]"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setShowShortcuts(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={{ duration: 0.2 }}
              className="rounded-2xl p-6 w-full max-w-md mx-4"
              style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.1)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold" style={{ color: "#FFFFFF" }}>Keyboard Shortcuts</h3>
                <button onClick={() => setShowShortcuts(false)} className="p-1 rounded-lg hover:bg-white/10 transition-all" style={{ color: "#6B7280" }}><X className="w-4 h-4" /></button>
              </div>
              <div className="grid gap-3">
                {[
                  { keys: "⌘K", desc: "Search (Command Palette)" },
                  { keys: "⌘B", desc: "Toggle Basket" },
                  { keys: "⌘1-6", desc: "Switch Zone" },
                  { keys: "⌘P", desc: "Quick Compose" },
                  { keys: "?", desc: "Show Shortcuts" },
                  { keys: "Escape", desc: "Close panels" },
                ].map((s) => (
                  <div key={s.keys} className="flex items-center justify-between gap-4">
                    <span className="text-xs" style={{ color: "#A1A1AA" }}>{s.desc}</span>
                    <kbd className="text-[10px] font-mono px-2 py-1 rounded-md flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)", color: "#e5e7eb", border: "1px solid rgba(255,255,255,0.1)" }}>{s.keys}</kbd>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[10px] text-center" style={{ color: "#4b5563" }}>Press <kbd className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#6B7280" }}>?</kbd>, <kbd className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#6B7280" }}>⌘P</kbd>, or <kbd className="text-[9px] font-mono px-1 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#6B7280" }}>Escape</kbd> to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Scroll to Top ─── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-30 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            style={{ background: "rgba(20,22,26,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
          >
            <ArrowUp className="w-4 h-4" style={{ color: "#a78bfa" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Quick Compose Button + Panel ─── */}
      <AnimatePresence>
        {showQuickCompose ? (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[55]" style={{ background: "rgba(0,0,0,0.3)" }} onClick={() => setShowQuickCompose(false)} />
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed bottom-20 sm:bottom-6 right-4 z-[56] w-80 sm:w-96 rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Sparkles className="w-4 h-4" style={{ color: zoneColor }} /><h3 className="text-sm font-bold" style={{ color: zoneColor }}>Quick Compose</h3></div>
                  <button onClick={() => setShowQuickCompose(false)} className="p-1 rounded-lg hover:bg-white/10 transition-all" style={{ color: "#6B7280" }}><X className="w-3.5 h-3.5" /></button>
                </div>
                <textarea value={composeText} onChange={(e) => setComposeText(e.target.value)} placeholder="Compose your prompt here..." rows={4} className="w-full rounded-lg p-3 text-xs outline-none resize-none" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF", fontFamily: "monospace" }} />
                <div className="flex gap-2">
                  <button onClick={() => { if (composeText.trim()) { handleCopy(composeText.trim(), "qc-basket"); setComposeText(""); } else toast.error("Write something first."); }} className="flex-1 flex items-center justify-center gap-1 text-[10px] px-3 py-2 rounded-lg font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}><Copy className="w-3 h-3" /> Add to Basket</button>
                  <button onClick={() => { if (composeText.trim()) handleDirectCopy(composeText.trim()); else toast.error("Write something first."); }} className="flex items-center justify-center gap-1 text-[10px] px-3 py-2 rounded-lg font-medium transition-all" style={{ background: "rgba(255,255,255,0.04)", color: "#A1A1AA", border: "1px solid rgba(255,255,255,0.07)" }}>Copy</button>
                </div>
                {/* Quick Insert Chips */}
                <div className="flex gap-1.5 flex-wrap">
                  <button onClick={() => setQcDropdown(qcDropdown === "mods" ? null : "mods")} className="flex items-center gap-1 text-[9px] px-2 py-1 rounded-lg transition-all" style={{ background: qcDropdown === "mods" ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.04)", color: qcDropdown === "mods" ? "#a78bfa" : "#6B7280", border: `1px solid ${qcDropdown === "mods" ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.07)"}` }}><Plus className="w-2.5 h-2.5" /> Modifier</button>
                  <button onClick={() => setQcDropdown(qcDropdown === "tmpls" ? null : "tmpls")} className="flex items-center gap-1 text-[9px] px-2 py-1 rounded-lg transition-all" style={{ background: qcDropdown === "tmpls" ? "rgba(77,255,255,0.12)" : "rgba(255,255,255,0.04)", color: qcDropdown === "tmpls" ? "#4DFFFF" : "#6B7280", border: `1px solid ${qcDropdown === "tmpls" ? "rgba(77,255,255,0.25)" : "rgba(255,255,255,0.07)"}` }}><Plus className="w-2.5 h-2.5" /> Template</button>
                  <button onClick={() => setQcDropdown(qcDropdown === "animals" ? null : "animals")} className="flex items-center gap-1 text-[9px] px-2 py-1 rounded-lg transition-all" style={{ background: qcDropdown === "animals" ? "rgba(255,176,0,0.12)" : "rgba(255,255,255,0.04)", color: qcDropdown === "animals" ? "#FFB000" : "#6B7280", border: `1px solid ${qcDropdown === "animals" ? "rgba(255,176,0,0.25)" : "rgba(255,255,255,0.07)"}` }}><Plus className="w-2.5 h-2.5" /> Animal</button>
                </div>
                {/* Dropdown */}
                <AnimatePresence>
                  {qcDropdown && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="relative mb-1"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: "#4b5563" }} /><input value={qcSearch} onChange={(e) => setQcSearch(e.target.value)} placeholder="Search..." className="w-full pl-8 pr-3 py-1.5 rounded-lg text-[10px] outline-none" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} /></div>
                      <div className="max-h-40 overflow-y-auto space-y-0.5">
                        {qcDropdown === "mods" && qcModList.slice(0, 20).map((m, i) => (<button key={i} onClick={() => { setComposeText((p) => p + (p ? "\n" : "") + m.mod); setQcDropdown(null); setQcSearch(""); }} className="w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] transition-all hover:bg-white/5 truncate" style={{ color: "#A1A1AA" }}>{m.mod}</button>))}
                        {qcDropdown === "tmpls" && qcTmplList.slice(0, 20).map((t, i) => (<button key={i} onClick={() => { setComposeText((p) => p + (p ? "\n\n" : "") + t.content); setQcDropdown(null); setQcSearch(""); }} className="w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] transition-all hover:bg-white/5 truncate" style={{ color: "#A1A1AA" }}>{t.label}: {t.desc}</button>))}
                        {qcDropdown === "animals" && qcAnimalList.slice(0, 20).map((a, i) => (<button key={i} onClick={() => { setComposeText((p) => p + (p ? "\n\n" : "") + a.prompt); setQcDropdown(null); setQcSearch(""); }} className="w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] transition-all hover:bg-white/5 truncate" style={{ color: "#A1A1AA" }}>{a.emoji} {a.name} — {a.mode}</button>))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }} onClick={() => setShowQuickCompose(true)} className="fixed bottom-20 sm:bottom-6 right-4 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110" style={{ background: "rgba(20,22,26,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
            <Sparkles className="w-5 h-5" style={{ color: zoneColor }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── iOS Bottom Tab Bar (mobile only) — 5 visible tabs + More ─── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50" style={{ background: "rgba(11,13,16,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="flex items-center justify-around px-1 pt-1.5 pb-2">
          {ZONES.slice(0, 5).map((z) => {
            const isActive = activeZone === z.id;
            return (
              <button key={z.id} onClick={() => { setShowMobileMore(false); handleZoneChange(z.id); }} className="flex flex-col items-center gap-0.5 py-0.5 px-2 rounded-lg transition-all min-w-0" style={{ color: isActive ? z.color : "#4b5563" }}>
                <span className={`text-lg transition-transform ${isActive ? "scale-110" : ""}`}>{z.icon}</span>
                <span className="text-[9px] font-medium truncate max-w-[56px]">{z.label.slice(0, 6)}</span>
                {isActive && <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: z.color }} />}
              </button>
            );
          })}
          {/* More button */}
          <button onClick={() => setShowMobileMore(!showMobileMore)} className="flex flex-col items-center gap-0.5 py-0.5 px-2 rounded-lg transition-all relative" style={{ color: showMobileMore ? zoneColor : "#4b5563" }}>
            <div className="relative">
              <MoreVertical className="w-5 h-5" />
              {history.length > 0 && <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 flex items-center justify-center rounded-full text-[7px] font-bold" style={{ background: zoneColor, color: "#0B0D10" }}>{history.length > 9 ? "9+" : history.length}</span>}
            </div>
            <span className="text-[9px] font-medium">More</span>
          </button>
        </div>
      </div>

      {/* ─── Mobile More Menu (slide-up overlay) ─── */}
      <AnimatePresence>
        {showMobileMore && (<>
          {/* Backdrop — tap to close */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="sm:hidden fixed inset-0 z-[60]" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setShowMobileMore(false)} />
          {/* Menu panel */}
          <motion.div initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="sm:hidden fixed bottom-0 left-0 right-0 z-[70] rounded-t-2xl" style={{ background: "rgba(20,22,26,0.98)", borderTop: "1px solid rgba(255,255,255,0.1)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
            <div className="flex justify-center pt-3 pb-2"><div className="w-8 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} /></div>
            <div className="px-4 pb-4 space-y-1">
              <button onClick={() => { setShowMobileMore(false); handleZoneChange("system"); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left" style={{ color: activeZone === "system" ? ZONES[5].color : "#A1A1AA", background: activeZone === "system" ? "rgba(167,139,250,0.1)" : "transparent" }}>
                <span className="text-lg">🔄</span><span className="text-sm font-medium">System</span><span className="ml-auto text-[10px]" style={{ color: "#4b5563" }}>⌘6</span>
              </button>
              <button onClick={() => { setShowMobileMore(false); setShowHistory(true); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left" style={{ color: showHistory ? zoneColor : "#A1A1AA", background: showHistory ? `${zoneColor}10` : "transparent" }}>
                <span className="text-lg">🧺</span><span className="text-sm font-medium">Basket</span>{history.length > 0 && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${zoneColor}15`, color: zoneColor }}>{history.length}</span>}
              </button>
              <button onClick={() => { setShowMobileMore(false); setShowPalette(true); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left" style={{ color: "#A1A1AA" }}>
                <Command className="w-5 h-5" /><span className="text-sm font-medium">Command Palette</span><span className="ml-auto text-[10px]" style={{ color: "#4b5563" }}>⌘K</span>
              </button>
              <button onClick={() => { setShowMobileMore(false); retriggerOnboarding(); setShowOnboarding(true); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left" style={{ color: "#A1A1AA" }}>
                <HelpCircle className="w-5 h-5" /><span className="text-sm font-medium">Onboarding Tour</span>
              </button>
            </div>
          </motion.div>
        </>)}
      </AnimatePresence>

      {/* ─── Footer ─── */}
      <footer className="mt-auto pb-20 sm:pb-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-xs" style={{ color: "#4b5563" }}><Sparkles className="w-3.5 h-3.5" /><span>promptc OS — AI Prompt Engineering Operating System</span><span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(167,139,250,0.12)", color: "#a78bfa" }}>v3.5</span></div>
          <div className="flex items-center gap-3 text-[10px]" style={{ color: "#4b5563" }}>
            <span className="flex items-center gap-1"><kbd className="kbd-badge">⌘K</kbd> Search</span><span>·</span>
            <span className="flex items-center gap-1"><kbd className="kbd-badge">⌘B</kbd> Basket{history.length > 0 && ` (${history.length})`}</span><span>·</span>
            <span className="flex items-center gap-1"><kbd className="kbd-badge">⌘1-6</kbd> Zones</span><span>·</span>
            <span className="flex items-center gap-1"><kbd className="kbd-badge">⌘P</kbd> Compose</span><span>·</span>
            <span className="flex items-center gap-1"><kbd className="kbd-badge">?</kbd> Shortcuts</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: "#4b5563" }}>
            <span>{MODS.length} Modifiers</span><span>·</span>
            <span>{TMPLS.length} Templates</span><span>·</span>
            <span>{WORKFLOWS_DATA.length} Workflows</span><span>·</span>
            <span>{TOTAL_SKILLS} Skills</span>
          </div>
          <p className="text-xs" style={{ color: "#4b5563" }}>Powered by AI · Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
