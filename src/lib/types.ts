/**
 * types.ts — Shared types and constants for promptc OS
 * Extracted from PageClient.tsx monolith for reuse across components.
 */

import { Zap, Target, Wrench } from "lucide-react";
import { MODS, TMPLS, BRANDS, ANIMALS, CHAINS, ENHANCEMENTS, LINT_RULES, SWAPS, VOCAB, COMBOS, TYPO } from "@/app/data/promptc-data";
import {
  SKILLS_CATALOG, TOTAL_SKILLS, TOTAL_CATEGORIES,
} from "@/app/data/skills-catalog";

// ─── Core Interfaces ──────────────────────────────────────────────────────
export interface ResultState {
  content: string | null;
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

export interface BasketItem {
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

// ─── Pipeline ─────────────────────────────────────────────────────────────
export const PIPELINE_STAGES = ["activate", "build", "validate", "playbook", "monetize"] as const;

// ─── Sub-tab definitions per zone ─────────────────────────────────────────
export const ZONE_TABS: Record<string, string[]> = {
  activate: ["Tasks", "Modifiers", "Templates", "Brands", "Animals", "Composer"],
  build: ["Master Prompt", "Enhancements", "Meta Builder"],
  validate: ["Lint Rules", "Word Swaps", "Vocabulary", "Quality Score"],
  playbook: ["Workflows", "Animal Chains", "Design Combos", "Typography"],
  monetize: ["Top Prompts", "SaaS Templates", "Stacks", "AI Tools", "Compounding", "Pricing Guide"],
  system: ["Skills Library", "Compounding", "Principles", "Skill Builder", "Workflow Patterns", "Self-Evolve", "Infographics", "Package Docs"],
};

export const ZONE_TAB_COUNTS: Record<string, Record<string, number>> = {
  activate: { Tasks: 8, Modifiers: MODS.length, Templates: TMPLS.length, Brands: BRANDS.length, Animals: ANIMALS.length, Composer: 8 },
  build: { "Master Prompt": 1, Enhancements: ENHANCEMENTS.length, "Meta Builder": 3 },
  validate: { "Lint Rules": LINT_RULES.length, "Word Swaps": SWAPS.length, Vocabulary: VOCAB.length, "Quality Score": 1 },
  playbook: { Workflows: 21, "Animal Chains": CHAINS.length, "Design Combos": COMBOS.length, Typography: TYPO.length },
  monetize: { "Top Prompts": 6, "SaaS Templates": 6, Stacks: 4, "AI Tools": 5, Compounding: 1, "Pricing Guide": 1 },
  system: { "Skills Library": TOTAL_SKILLS, Compounding: 1, Principles: 6, "Skill Builder": 1, "Workflow Patterns": 2, "Self-Evolve": 1, Infographics: 1, "Package Docs": 1 },
};

// ─── Animal Constants ─────────────────────────────────────────────────────
export const ANIMAL_COLORS: Record<string, string> = {
  Eagle: "#FFB000", Beaver: "#FF6B00", Ant: "#FF4FD8", Owl: "#4DFFFF",
  Rabbit: "#22c55e", Dolphin: "#38bdf8", Elephant: "#f97316",
};

export const ANIMAL_EMOJIS: Record<string, string> = {
  Rabbit: "🐇", Owl: "🦉", Ant: "🐜", Eagle: "🦅",
  Dolphin: "🐬", Beaver: "🦫", Elephant: "🐘",
};

// ─── Meta Prompts ─────────────────────────────────────────────────────────
export const META_PROMPTS = [
  { id: 1 as const, title: "Quick Critique", description: "Instant clarity & relevance scoring with 5 improvements and two refined variants. No AI needed.", icon: Zap, accent: "#3b82f6" },
  { id: 2 as const, title: "Structured Analysis", description: "Deep prompt breakdown with improvement approaches and two structured refinements.", icon: Target, accent: "#8b5cf6" },
  { id: 3 as const, title: "Expert Engineering", description: "Full expert restructure: comprehensive, strategic & precision variants plus self-test.", icon: Wrench, accent: "#06b6d4" },
];

// ─── Monetize Data ────────────────────────────────────────────────────────
export const MONETIZE_TOP_PROMPTS = [
  { label: "SaaS AI MVP in 1 Weekend", desc: "Build complete SaaS with Next.js + Supabase + Groq + Stripe + Vercel in 48 hours.", cat: "Build", rev: "$$$" },
  { label: "Prompt Pack → First Sale in 48hrs", desc: "10 copy-ready prompts for Gumroad. Niche, title, use case, pro tip each.", cat: "Sell", rev: "$" },
  { label: "Newsletter → $1k/mo in 90 Days", desc: "Beehiiv + referral program + sponsorships. Full content system.", cat: "Grow", rev: "$$" },
  { label: "Consulting → Productized Offer", desc: "Fixed-scope, fixed-price. Notion portal + Loom async delivery.", cat: "Pivot", rev: "$$" },
  { label: "Agency → SaaS Transition", desc: "6-month plan from services to product. Document → build → launch.", cat: "Scale", rev: "$$$" },
  { label: "MCP Tool → Paid Product", desc: "Build MCP server for Claude Desktop, monetize with npm/Stripe.", cat: "Build", rev: "$$$" },
];

export const MONETIZE_SAAS = [
  { label: "AI Content Pipeline", desc: "n8n: Airtable → WordPress → social. Auto-publish daily.", stack: "n8n + Airtable + WordPress", diff: "medium", time: "2-3 days" },
  { label: "Lead Capture & Qualification", desc: "Typeform → AI score → CRM → Slack notify. Tier-based routing.", stack: "n8n + Typeform + OpenAI + HubSpot", diff: "hard", time: "5-7 days" },
  { label: "Site & Competitor Monitor", desc: "Uptime check + competitor price scraping + AI summary + alerts.", stack: "n8n + PagerDuty + Google Sheets", diff: "easy", time: "1 day" },
  { label: "Invoice Automation", desc: "Auto-generate PDF invoices, email, track payment webhooks.", stack: "Make + Airtable + PDF.co + Gmail", diff: "medium", time: "2-3 days" },
  { label: "MCP Agent Pipeline", desc: "Claude + MCP tools → autonomous research + write + publish.", stack: "MCP SDK + Node.js + WordPress", diff: "hard", time: "7-10 days" },
  { label: "CRM Sync System", desc: "Sync leads across HubSpot, Gmail, Slack, Sheets via Zapier.", stack: "Zapier + HubSpot + Gmail + Sheets", diff: "easy", time: "1-2 days" },
];

export const MONETIZE_STACKS = [
  { label: "⚡ Quick Win", time: "Week 1", income: "$100–500", desc: "Sell a prompt pack or template on Gumroad. Zero setup cost." },
  { label: "🎯 Active Income", time: "Week 2–4", income: "$500–5k/project", desc: "Offer AI automation or prompt engineering as a service." },
  { label: "💰 Passive Income", time: "Month 1–3", income: "$500–10k/mo MRR", desc: "Build a micro-SaaS or paid newsletter. Compounds infinitely." },
  { label: "🔁 Hybrid Stack", time: "Month 2–6", income: "$2k–20k/mo", desc: "Combine active consulting + passive products. Leverage." },
];

export const MONETIZE_AI_TOOLS = [
  { label: "OpenClaw", cat: "Agentic Runtime", tier: "Free / OSS", desc: "Open-source AI agent framework — compose tools, memory, and LLM calls.", starter: "Build an OpenClaw agent that: 1) Reads from a knowledge base 2) Processes user queries 3) Returns structured responses. Include tool definitions, memory config, and error handling." },
  { label: "ZeroClaw", cat: "Zero-Cost Agent", tier: "Free", desc: "Zero-cost agent runtime — runs entirely on Cloudflare + Groq free tiers.", starter: "Set up a ZeroClaw agent on Cloudflare Workers with: Groq API for inference, KV storage for memory, and Durable Objects for state. Target: zero monthly cost for <10k requests." },
  { label: "Agno", cat: "Agent Framework", tier: "Free / OSS", desc: "Python-native agent framework — multi-model, tool-calling, memory built-in.", starter: "Create an Agno agent with: multi-model support (GPT-4o + Claude), 5 custom tools, structured memory, and a Flask API wrapper. Include Docker setup." },
  { label: "CrewAI", cat: "Multi-Agent", tier: "Free / OSS", desc: "Multi-agent orchestration — define crews of specialized AI agents.", starter: "Design a CrewAI system with 3 agents: Researcher (web search + summarize), Writer (draft content from research), Editor (fact-check + polish). Define tasks, tools, and output format." },
  { label: "Claude Code", cat: "AI Coding Agent", tier: "Free tier", desc: "Anthropic's Claude Code — agentic coding assistant in your terminal.", starter: "Set up Claude Code for a Next.js project with: project context file (.claude), custom commands for testing/linting, and a CI workflow that uses Claude Code for automated PR reviews." },
];

// ─── Workflow Data ────────────────────────────────────────────────────────
export const WORKFLOW_PROMPTS: Record<string, string> = {
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

export const WORKFLOWS_DATA = [
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

// ─── System Data ──────────────────────────────────────────────────────────
export const SYSTEM_PRINCIPLES = [
  { title: "NO ONE-OFF WORK", icon: "🔄", desc: "Every task should produce a reusable asset: skill, template, automation, or document. If you do it once, codify it. If you do it twice, automate it. Never do the same thing three times manually.", color: "#a78bfa" },
  { title: "THE RULE", icon: "⚡", desc: "Before any implementation, PLAN → VALIDATE → EXECUTE. Never skip validation. A validated plan prevents 80% of rework. The rule applies to prompts, code, design, and business decisions.", color: "#FFB000" },
  { title: "PLAN → VALIDATE → EXECUTE", icon: "📐", desc: "Plan: break down the problem, identify constraints, consider alternatives. Validate: test assumptions, get feedback, iterate. Execute: build only after validation confirms the approach.", color: "#22c55e" },
  { title: "COMPOUNDING SYSTEM", icon: "📈", desc: "Build once → runs forever. Every skill makes the system smarter. Every cron removes thinking. Every template eliminates a starting-zero problem. The system compounds like interest.", color: "#4DFFFF" },
  { title: "SKILL FORMAT", icon: "📋", desc: "Every skill follows the 4-section SKILL.md format: Context (what & why), Instructions (how), Constraints (boundaries), Examples (proof). This ensures consistency and reusability.", color: "#FF6B00" },
  { title: "SECURITY RULES", icon: "🔒", desc: "No hardcoded secrets. Validate all external inputs. Rate limit by default. Audit log all state changes. Never expose raw system prompts. Human-in-the-loop for destructive actions.", color: "#ef4444" },
];

export const SKILL_BUILDER_STEPS = [
  { step: 1, title: "Concept", desc: "Define the skill name, purpose, and trigger condition.", placeholder: "What does this skill do? When should it activate?" },
  { step: 2, title: "Prototype", desc: "Write the first draft of instructions — raw, unfiltered.", placeholder: "Write step-by-step instructions for the agent to follow." },
  { step: 3, title: "Evaluate", desc: "Test with 3 scenarios. Score clarity, completeness, actionability.", placeholder: "What edge cases exist? What's missing?" },
  { step: 4, title: "Codify", desc: "Format as SKILL.md with Context, Instructions, Constraints, Examples.", placeholder: "Convert to the 4-section SKILL.md format." },
  { step: 5, title: "Cron", desc: "Set up automated review schedule. Skills decay without maintenance.", placeholder: "When should this skill be reviewed? What triggers updates?" },
  { step: 6, title: "Monitor", desc: "Track usage metrics. Flag if skill hasn't been used in 30 days.", placeholder: "How will you measure skill effectiveness?" },
];

// ─── Difficulty Colors ────────────────────────────────────────────────────
export const DIFF_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  easy: { bg: "rgba(34,197,94,0.12)", text: "#22c55e", label: "Easy" },
  medium: { bg: "rgba(234,179,8,0.12)", text: "#eab308", label: "Medium" },
  hard: { bg: "rgba(239,68,68,0.12)", text: "#ef4444", label: "Hard" },
};

// ─── Animation Variants ───────────────────────────────────────────────────
export const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

export const stagger = {
  animate: { transition: { staggerChildren: 0.03 } },
};

export const staggerItem = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

// ─── Default Values ───────────────────────────────────────────────────────
export const DEFAULT_SUBTABS: Record<string, string> = {
  activate: "Tasks",
  build: "Master Prompt",
  validate: "Lint Rules",
  playbook: "Workflows",
  monetize: "Top Prompts",
  system: "Skills Library",
};

export const DEFAULT_COMPOSER: Record<string, string> = {
  Role: "",
  Context: "",
  Objective: "",
  Constraints: "",
  Aesthetic: "",
  Planning: "",
  Output: "",
  Refinement: "",
};
