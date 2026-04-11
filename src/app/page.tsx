"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy, Check, ChevronDown, ChevronRight, Sparkles, Loader2,
  Zap, Target, Wrench, X, RotateCcw, Search, History, HelpCircle,
  Download, FileText, Share2, ArrowUpRight, TrendingUp, Timer, Layers,
  Command, Eye, Brain, Cpu, BookOpen, BarChart3, ArrowRight, Info,
  FolderDown, ClipboardCopy, FileDown, Lightbulb, ArrowUp,
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
interface HistoryItem { text: string; zone: string; time: string; }

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
  { label: "OpenClaw", cat: "Agentic Runtime", tier: "Free / OSS", desc: "Open-source AI agent framework — compose tools, memory, and LLM calls." },
  { label: "ZeroClaw", cat: "Zero-Cost Agent", tier: "Free", desc: "Zero-cost agent runtime — runs entirely on Cloudflare + Groq free tiers." },
  { label: "Agno", cat: "Agent Framework", tier: "Free / OSS", desc: "Python-native agent framework — multi-model, tool-calling, memory built-in." },
  { label: "CrewAI", cat: "Multi-Agent", tier: "Free / OSS", desc: "Multi-agent orchestration — define crews of specialized AI agents." },
  { label: "Claude Code", cat: "AI Coding Agent", tier: "Free tier", desc: "Anthropic's Claude Code — agentic coding assistant in your terminal." },
];
const WORKFLOWS_DATA = [
  { cat: "🎨 Design", title: "Design System Creation", purpose: "Build complete design system", best: "New products, rebrands" },
  { cat: "🎨 Design", title: "Landing Page Design", purpose: "High-conversion landing page", best: "Marketing, startups" },
  { cat: "🎨 Design", title: "Dashboard Design", purpose: "Data visualization dashboard", best: "Analytics, SaaS" },
  { cat: "💻 Dev", title: "Full-Stack App", purpose: "Complete web application", best: "Product builds" },
  { cat: "💻 Dev", title: "API Design", purpose: "RESTful or GraphQL API", best: "Backend development" },
  { cat: "💻 Dev", title: "Database Schema", purpose: "Scalable database structure", best: "Data modeling" },
  { cat: "📈 Business", title: "Product Roadmap", purpose: "Strategic product roadmap", best: "Product management" },
  { cat: "📈 Business", title: "Market Research", purpose: "Comprehensive market analysis", best: "Business strategy" },
  { cat: "📈 Business", title: "User Onboarding", purpose: "Effective user onboarding flow", best: "Product growth" },
  { cat: "📈 Business", title: "Pricing Strategy", purpose: "Optimal pricing model design", best: "SaaS, subscriptions" },
  { cat: "📈 Business", title: "Competitive Analysis", purpose: "Deep competitor intelligence", best: "Market positioning" },
  { cat: "📱 Mobile", title: "Mobile App Design", purpose: "Native-feeling mobile app", best: "iOS/Android apps" },
  { cat: "📱 Mobile", title: "React Native Build", purpose: "Cross-platform mobile app", best: "Multi-platform" },
  { cat: "🤖 AI/ML", title: "Prompt Engineering", purpose: "Systematic prompt creation", best: "AI workflows" },
  { cat: "🤖 AI/ML", title: "AI Agent Design", purpose: "Autonomous AI agent system", best: "Automation, AI tools" },
  { cat: "🤖 AI/ML", title: "ML Pipeline", purpose: "End-to-end ML workflow", best: "Data science" },
  { cat: "📊 Content", title: "Content Strategy", purpose: "Complete content plan", best: "Marketing, creators" },
  { cat: "📊 Content", title: "Email Sequence", purpose: "Automated email campaign", best: "E-commerce, SaaS" },
  { cat: "📊 Content", title: "Social Media Strategy", purpose: "Platform-specific content plan", best: "Brands, creators" },
  { cat: "🔒 Security", title: "Security Audit", purpose: "Application security review", best: "Production apps" },
  { cat: "🚀 DevOps", title: "CI/CD Pipeline", purpose: "Automated deployment system", best: "Production infrastructure" },
  { cat: "🚀 DevOps", title: "Monitoring Setup", purpose: "Application observability", best: "Production apps" },
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
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };
const staggerItem = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

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

// ─── Tooltip ─────────────────────────────────────────────────────────────
function Tip({ children, text }: { children: React.ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-[11px] leading-relaxed whitespace-nowrap max-w-xs text-center pointer-events-none"
            style={{ background: "#1e1e24", border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA" }}>
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
  const [activeZone, setActiveZone] = useState("activate");
  const [activeSubTab, setActiveSubTab] = useState<Record<string, string>>({ activate: "Tasks", build: "Master Prompt", validate: "Lint Rules", playbook: "Workflows", monetize: "Top Prompts", system: "Skills Library" });
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [skillsSearchQuery, setSkillsSearchQuery] = useState("");
  const [skillsCategoryFilter, setSkillsCategoryFilter] = useState<string>("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quickStartDismissed, setQuickStartDismissed] = useState(false);
  const [skillStep, setSkillStep] = useState(0);
  const [skillForm, setSkillForm] = useState<Record<number, string>>({});

  const [metaPrompt, setMetaPrompt] = useState("");
  const [metaResults, setMetaResults] = useState<Record<1 | 2 | 3, ResultState>>({ 1: { content: null, loading: false, error: null, expanded: false }, 2: { content: null, loading: false, error: null, expanded: false }, 3: { content: null, loading: false, error: null, expanded: false } });
  const [qaInput, setQaInput] = useState("");
  const [qaResult, setQaResult] = useState<{ scores: { clarity: number; specificity: number; structure: number; actionability: number }; feedback: string } | null>(null);
  const [qaLoading, setQaLoading] = useState(false);
  const [composerFields, setComposerFields] = useState<Record<string, string>>({ Role: "", Context: "", Objective: "", Constraints: "", Aesthetic: "", Planning: "", Output: "", Refinement: "" });
  const [composerResult, setComposerResult] = useState<string | null>(null);

  const zoneColor = ZONES.find((z) => z.id === activeZone)?.color || "#4DFFFF";
  const mainRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setShowPalette(true); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Scroll-to-top listener
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleExpand = useCallback((id: string) => { setExpandedItems((p) => { const n = new Set(p); if (n.has(id)) { n.delete(id); } else { n.add(id); } return n; }); }, []);
  const handleCopy = useCallback(async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); setCopiedId(id); setHistory((p) => [{ text: text.slice(0, 200), zone: activeZone, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...p.slice(0, 49)]); toast.success("Copied!"); setTimeout(() => setCopiedId(null), 1800); } catch { toast.error("Failed to copy."); }
  }, [activeZone]);
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
  const handleZoneChange = useCallback((z: string) => { setActiveZone(z); setSearchQuery(""); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const filteredMods = useMemo(() => { if (!searchQuery) return MODS; const q = searchQuery.toLowerCase(); return MODS.filter((m) => m.mod.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q) || m.tip.toLowerCase().includes(q)); }, [searchQuery]);
  const filteredWorkflows = useMemo(() => { if (!searchQuery) return WORKFLOWS_DATA; const q = searchQuery.toLowerCase(); return WORKFLOWS_DATA.filter((w) => w.title.toLowerCase().includes(q) || w.purpose.toLowerCase().includes(q) || w.cat.toLowerCase().includes(q)); }, [searchQuery]);
  const filteredSkills = useMemo(() => {
    let list = SKILLS_CATALOG;
    if (skillsCategoryFilter !== "all") list = list.filter((s) => s.category === skillsCategoryFilter);
    if (skillsSearchQuery.trim()) { const q = skillsSearchQuery.toLowerCase(); list = list.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)); }
    return list;
  }, [skillsCategoryFilter, skillsSearchQuery]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-xl">⚡</span>
              <span className="font-bold text-sm tracking-tight" style={{ fontFamily: "'DM Mono', monospace", color: zoneColor }}>promptc OS</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>v2.1</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {ZONES.map((z) => (
                <Tip key={z.id} text={z.sub}>
                  <button onClick={() => handleZoneChange(z.id)} className="relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap" style={{ color: activeZone === z.id ? z.color : "#6B7280", background: activeZone === z.id ? `${z.color}12` : "transparent" }}>
                    <span className="flex items-center gap-1.5"><span>{z.icon}</span><span className="hidden sm:inline">{z.label}</span></span>
                    {activeZone === z.id && <motion.div layoutId="zoneIndicator" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ background: z.color }} />}
                  </button>
                </Tip>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-1 mr-2">
              <kbd className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#4b5563" }}>⌘K <span style={{ color: "#6B7280" }}>Search</span></kbd>
            </div>
            <div className="flex items-center gap-1">
              <Tip text="Search (⌘K)">
                <button onClick={() => setShowPalette(true)} className="p-1.5 rounded-lg transition-all hover:bg-white/5" style={{ color: "#6B7280" }}><Command className="w-3.5 h-3.5" /></button>
              </Tip>
              <Tip text="Re-trigger tour">
                <button onClick={() => { retriggerOnboarding(); setShowOnboarding(true); }} className="p-1.5 rounded-lg transition-all hover:bg-white/5" style={{ color: "#6B7280" }}><HelpCircle className="w-3.5 h-3.5" /></button>
              </Tip>
              <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5" style={{ color: "#6B7280" }}>
                <History className="w-3.5 h-3.5" /><span className="hidden sm:inline">History</span>
                {history.length > 0 && <span className="w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold" style={{ background: zoneColor + "22", color: zoneColor }}>{history.length}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── History Panel ─── */}
      <AnimatePresence>{showHistory && (
        <motion.div initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 300 }} transition={{ duration: 0.25 }} className="fixed top-14 right-0 bottom-0 z-40 w-80 sm:w-96 overflow-y-auto" style={{ background: "#14161A", borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between"><h3 className="text-sm font-bold" style={{ color: zoneColor }}>📋 Copy History</h3><button onClick={() => { setHistory([]); toast.info("Cleared."); }} className="text-[10px] px-2 py-1 rounded border" style={{ borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>CLEAR</button></div>
            {history.length === 0 ? <p className="text-xs text-center py-8" style={{ color: "#4b5563" }}>No copies yet</p> : history.map((h, i) => (
              <div key={i} className="rounded-lg p-3" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center justify-between mb-1"><span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${ZONES.find(z => z.id === h.zone)?.color || "#4DFFFF"}15`, color: ZONES.find(z => z.id === h.zone)?.color || "#4DFFFF" }}>{h.zone}</span><span className="text-[9px]" style={{ color: "#4b5563" }}>{h.time}</span></div>
                <p className="text-xs leading-relaxed line-clamp-3" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{h.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}</AnimatePresence>

      {/* ─── Sub-Tabs ─── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {(ZONE_TABS[activeZone] || []).map((tab) => {
            const cnt = ZONE_TAB_COUNTS[activeZone]?.[tab];
            return (
              <button key={tab} onClick={() => setActiveSubTab({ ...activeSubTab, [activeZone]: tab })} className="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all flex items-center gap-1.5" style={{ color: activeSubTab[activeZone] === tab ? zoneColor : "#6B7280", background: activeSubTab[activeZone] === tab ? `${zoneColor}18` : "transparent", border: `1px solid ${activeSubTab[activeZone] === tab ? `${zoneColor}44` : "rgba(255,255,255,0.07)"}` }}>
                {tab}{cnt !== undefined && <span className="text-[9px] opacity-60">({cnt})</span>}
              </button>
            );
          })}
        </div>
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
              {activeSubTab.activate === "Tasks" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" {...stagger}>{TASKS.map((task) => (<motion.div key={task.label} {...staggerItem} className="rounded-xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold">{task.label}</h3><button onClick={() => handleCopy(task.content, `task-${task.label}`)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">{copiedId === `task-${task.label}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}</button></div><pre className="text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{task.content.slice(0, 200)}...</pre></motion.div>))}</div>)}

              {activeSubTab.activate === "Modifiers" && (<div>
                <div className="mb-4 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4b5563" }} /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search modifiers..." className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} /></div>
                {MOD_CATS.map((cat) => { const catMods = filteredMods.filter((m) => m.cat === cat); if (catMods.length === 0) return null; return (<div key={cat} className="mb-6"><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{cat.toUpperCase()} ({catMods.length})</div><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{catMods.map((m, i) => { const id = `mod-${cat}-${i}`; return (<Tip key={id} text={`💡 ${m.tip}`}><div className="rounded-lg p-3 transition-all hover:border-white/15 cursor-pointer" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><div className="flex items-start justify-between gap-2"><p className="text-xs leading-relaxed flex-1" style={{ color: "#e4e4e7" }}>{m.mod}</p><div className="flex items-center gap-1 flex-shrink-0"><button onClick={(e) => { e.stopPropagation(); handleCopy(m.mod, id); }} className="p-1 rounded hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>{expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="mt-2 pt-2 text-[11px] leading-relaxed" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA" }}>💡 {m.tip}</div></motion.div>)}</AnimatePresence></div></Tip>); })}</div></div>); })}
              </div>)}

              {activeSubTab.activate === "Templates" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>{TMPLS.map((tmpl) => { const id = `tmpl-${tmpl.label}`; return (<motion.div key={id} {...staggerItem} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="p-4"><div className="flex items-center justify-between mb-2"><h3 className="text-sm font-bold">{tmpl.label}</h3><button onClick={() => handleCopy(tmpl.content, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}</button></div><p className="text-xs mb-3" style={{ color: "#6B7280" }}>{tmpl.desc}</p><button onClick={() => toggleExpand(id)} className="text-[10px] font-mono" style={{ color: zoneColor }}>{expandedItems.has(id) ? "COLLAPSE ▲" : "EXPAND ▼"}</button></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><pre className="p-4 text-[11px] leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{tmpl.content}</pre></motion.div>)}</AnimatePresence></motion.div>); })}</div>)}

              {activeSubTab.activate === "Brands" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>{BRANDS.map((brand) => { const id = `brand-${brand.id}`; return (<Tip key={id} text={brand.uc}><motion.div {...staggerItem} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: `1px solid ${brand.col}22` }}><div className="p-4"><div className="flex items-center justify-between mb-2"><h3 className="text-sm font-bold" style={{ color: brand.col }}>{brand.label}</h3><button onClick={() => handleCopy(brand.prompt, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}</button></div><p className="text-xs" style={{ color: "#6B7280" }}>{brand.uc}</p><button onClick={() => toggleExpand(id)} className="text-[10px] font-mono mt-2" style={{ color: brand.col }}>{expandedItems.has(id) ? "COLLAPSE ▲" : "VIEW SYSTEM ▼"}</button></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><pre className="p-4 text-[11px] leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{brand.prompt}</pre></motion.div>)}</AnimatePresence></motion.div></Tip>); })}</div>)}

              {activeSubTab.activate === "Animals" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>{ANIMALS.map((animal) => { const id = `animal-${animal.name}`; const color = ANIMAL_COLORS[animal.name] || "#4DFFFF"; return (<Tip key={id} text={animal.prompt.split("\n")[0]}><motion.div {...staggerItem} className="rounded-xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer" style={{ background: "#14161A", border: `1px solid ${color}22` }} onClick={() => toggleExpand(id)}><div className="flex items-center gap-3 mb-3"><span className="text-2xl">{animal.emoji}</span><div><h3 className="text-sm font-bold" style={{ color }}>{animal.name}</h3><p className="text-[10px] font-mono" style={{ color: "#A1A1AA" }}>{animal.mode}</p></div><button onClick={(e) => { e.stopPropagation(); handleCopy(animal.prompt, id); }} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><pre className="text-[11px] leading-relaxed whitespace-pre-wrap pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{animal.prompt}</pre></motion.div>)}</AnimatePresence></motion.div></Tip>); })}</div>)}

              {activeSubTab.activate === "Composer" && (<div className="max-w-3xl mx-auto"><div className="mb-4 text-xs" style={{ color: "#A1A1AA" }}>Fill in the layers below. Leave blank what you don&apos;t need.</div><div className="space-y-4 mb-6">{LAYERS.map((layer) => (<div key={layer.name} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center gap-2 mb-1"><span className="text-[10px] font-mono font-bold" style={{ color: zoneColor }}>{layer.n}</span><span className="text-xs font-bold">{layer.name}</span></div><p className="text-[10px] mb-2" style={{ color: "#6B7280" }}>{layer.pur}</p><textarea value={composerFields[layer.name]} onChange={(e) => setComposerFields({ ...composerFields, [layer.name]: e.target.value })} placeholder={layer.miss} rows={2} className="w-full rounded-lg p-2.5 text-xs outline-none resize-y" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF", fontFamily: "monospace" }} /></div>))}</div><div className="flex items-center gap-3"><button onClick={handleComposerAssemble} className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ background: `${zoneColor}18`, color: zoneColor, border: `1px solid ${zoneColor}44` }}>Assemble Prompt</button><button onClick={() => { setComposerFields({ Role: "", Context: "", Objective: "", Constraints: "", Aesthetic: "", Planning: "", Output: "", Refinement: "" }); setComposerResult(null); }} className="px-4 py-2.5 rounded-lg text-xs" style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}>Reset</button>{composerResult && <button onClick={() => handleCopy(composerResult, "composer")} className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors">{copiedId === "composer" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" style={{ color: "#6B7280" }} />}</button>}</div><AnimatePresence>{composerResult && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4"><pre className="rounded-xl p-5 text-xs leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ background: "#14161A", border: `1px solid ${zoneColor}22`, color: "#A1A1AA", fontFamily: "monospace" }}>{composerResult}</pre></motion.div>)}</AnimatePresence></div>)}
            </>)}

            {/* ═══ BUILD ═══ */}
            {activeZone === "build" && (<>
              {activeSubTab.build === "Master Prompt" && (<div className="max-w-3xl mx-auto"><h2 className="text-lg font-bold mb-2">Master System Prompt</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>The foundational prompt that sets AI behavior. Copy and paste to use.</p><div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}><span className="text-[10px] font-mono tracking-widest" style={{ color: zoneColor }}>SYSTEM PROMPT</span><button onClick={() => handleCopy(MASTER, "master")} className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>{copiedId === "master" ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}</button></div><pre className="p-5 text-xs leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{MASTER}</pre></div></div>)}

              {activeSubTab.build === "Enhancements" && (<div className="space-y-4">{ENHANCEMENTS.map((enh, i) => { const id = `enh-${i}`; return (<Tip key={id} text={`When: ${enh.when}`}><div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="p-4 cursor-pointer" onClick={() => toggleExpand(id)}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>0{i + 1}</span><h3 className="text-sm font-bold">{enh.label}</h3></div><div className="flex items-center gap-2"><span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>{enh.when}</span>{expandedItems.has(id) ? <ChevronDown className="w-3.5 h-3.5" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />}</div></div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-4 pb-4 space-y-3"><div className="rounded-lg p-3" style={{ background: "#0B0D10" }}><div className="text-[10px] font-mono mb-1" style={{ color: zoneColor }}>WHAT IT DOES</div><pre className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{enh.content}</pre></div><div className="rounded-lg p-3" style={{ background: "#0B0D10" }}><div className="flex items-center justify-between mb-1"><div className="text-[10px] font-mono" style={{ color: zoneColor }}>HOW TO USE</div><button onClick={() => handleCopy(enh.howto, id)} className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px]" style={{ background: `${zoneColor}15`, color: zoneColor }}>{copiedId === id ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}</button></div><pre className="text-[11px] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{enh.howto}</pre></div></div></motion.div>)}</AnimatePresence></div></Tip>); })}</div>)}

              {activeSubTab.build === "Meta Builder" && (<div><div className="mb-6"><h2 className="text-lg font-bold mb-2">Meta Prompt Builder</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Transform your prompts with three expert AI methodologies.</p><div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><textarea value={metaPrompt} onChange={(e) => setMetaPrompt(e.target.value)} placeholder="Paste or type your prompt here..." rows={5} className="w-full bg-transparent text-sm p-4 outline-none resize-none" style={{ color: "#e2e8f0", fontFamily: "monospace" }} /></div></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{META_PROMPTS.map((meta) => { const Icon = meta.icon; const state = metaResults[meta.id]; return (<div key={meta.id} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: `1px solid ${meta.accent}33` }}><div className="p-4"><div className="flex items-center gap-2 mb-3"><div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: `${meta.accent}15` }}><Icon className="w-4 h-4" style={{ color: meta.accent }} /></div><div><span className="text-[10px] font-mono" style={{ color: "#6B7280" }}>#{meta.id}</span><h3 className="text-xs font-bold">{meta.title}</h3></div></div><p className="text-[11px] mb-3" style={{ color: "#6B7280" }}>{meta.description}</p><button onClick={() => handleMetaGenerate(meta.id)} disabled={state.loading || !metaPrompt.trim()} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-40" style={{ background: `${meta.accent}15`, color: meta.accent, border: `1px solid ${meta.accent}33` }}>{state.loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate</>}</button></div><AnimatePresence>{(state.content || state.error || state.loading) && (<motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}><div className="px-4 py-2 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}><span className="text-[10px] font-mono" style={{ color: "#6B7280" }}>{state.error ? "ERROR" : "RESULT"}</span>{state.content && <button onClick={() => handleCopy(state.content, `meta-${meta.id}`)} className="p-1 rounded hover:bg-white/10">{copiedId === `meta-${meta.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>}</div><div className="p-4 max-h-80 overflow-y-auto">{state.loading && <div className="space-y-2">{[...Array(3)].map((_, j) => <div key={j} className="h-3 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.04)", width: `${70 + Math.random() * 30}%` }} />)}</div>}{state.error && <p className="text-xs" style={{ color: "#ef4444" }}>{state.error}</p>}{state.content && !state.loading && <div className="markdown-result text-xs"><ReactMarkdown>{state.content}</ReactMarkdown></div>}</div></div></motion.div>)}</AnimatePresence></div>); })}</div></div>)}
            </>)}

            {/* ═══ VALIDATE ═══ */}
            {activeZone === "validate" && (<>
              {activeSubTab.validate === "Lint Rules" && (<div className="space-y-6">{["universal", "ui/ux", "code", "content", "agent"].map((seg) => { const rules = LINT_RULES.filter((r) => r.seg === seg); return (<div key={seg}><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{seg.toUpperCase()} ({rules.length})</div><div className="space-y-2">{rules.map((rule) => (<div key={rule.id} className="rounded-lg p-3 flex items-start gap-3" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${rule.auto ? "bg-green-500" : "bg-amber-500"}`} /><div className="flex-1 min-w-0"><p className="text-xs" style={{ color: "#e4e4e7" }}>{rule.check}</p><p className="text-[10px] mt-1" style={{ color: "#6B7280" }}>→ {rule.fix}</p></div><button onClick={() => handleCopy(rule.fix, `lint-${rule.id}`)} className="p-1 rounded hover:bg-white/10 flex-shrink-0">{copiedId === `lint-${rule.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button></div>))}</div></div>); })}</div>)}
              {activeSubTab.validate === "Word Swaps" && (<div className="space-y-6">{SWAP_LEVELS.map((level) => { const swaps = SWAPS.filter((s) => s.level === level); if (swaps.length === 0) return null; return (<div key={level}><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{level.toUpperCase()} ({swaps.length})</div><div className="space-y-2">{swaps.map((swap, i) => { const id = `swap-${level}-${i}`; return (<div key={id} className="rounded-lg p-3 cursor-pointer transition-all hover:border-white/15" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><div className="flex items-center gap-2 flex-wrap"><span className="text-xs line-through" style={{ color: "#ef4444" }}>{swap.bad}</span><span className="text-[10px]" style={{ color: "#4b5563" }}>→</span><span className="text-xs font-medium" style={{ color: "#22c55e" }}>{swap.good}</span><button onClick={(e) => { e.stopPropagation(); handleCopy(swap.good, id); }} className="ml-auto p-1 rounded hover:bg-white/10 flex-shrink-0">{copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}</button>{expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="text-[10px] mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA" }}>💡 {swap.tip}</p></motion.div>)}</AnimatePresence></div>); })}</div></div>); })}</div>)}
              {activeSubTab.validate === "Vocabulary" && (<div className="space-y-6">{VOCAB_CATS.map((cat) => { const terms = VOCAB.filter((v) => v.cat === cat); return (<div key={cat}><div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{cat.toUpperCase()} ({terms.length})</div><div className="space-y-2">{terms.map((term, i) => { const id = `vocab-${cat}-${i}`; return (<div key={id} className="rounded-lg p-3 cursor-pointer" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><div className="flex items-center justify-between"><h4 className="text-xs font-bold font-mono">{term.t}</h4>{expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="mt-2 pt-2 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}><p className="text-[11px]" style={{ color: "#A1A1AA" }}>{term.d}</p><p className="text-[10px]" style={{ color: "#6B7280" }}>💡 {term.tip}</p></div></motion.div>)}</AnimatePresence></div>); })}</div></div>); })}</div>)}
              {activeSubTab.validate === "Quality Score" && (<div className="max-w-2xl mx-auto"><h2 className="text-lg font-bold mb-2">AI Quality Scoring</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Enter a prompt to get AI-powered quality analysis across 4 dimensions.</p><div className="rounded-xl overflow-hidden mb-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><textarea value={qaInput} onChange={(e) => setQaInput(e.target.value)} placeholder="Paste your prompt here to analyze..." rows={5} className="w-full bg-transparent text-sm p-4 outline-none resize-none" style={{ color: "#e2e8f0", fontFamily: "monospace" }} /></div><button onClick={handleQualityScore} disabled={qaLoading || !qaInput.trim()} className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40" style={{ background: `${zoneColor}18`, color: zoneColor, border: `1px solid ${zoneColor}44` }}>{qaLoading ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" /> Analyzing...</> : "Analyze Prompt"}</button><AnimatePresence>{qaResult && (<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-xl p-6" style={{ background: "#14161A", border: `1px solid ${zoneColor}22` }}><div className="flex flex-col sm:flex-row items-center gap-6 mb-4"><RadarChart scores={qaResult.scores} /><div className="grid grid-cols-2 gap-3 flex-1">{(["clarity", "specificity", "structure", "actionability"] as const).map((dim) => { const score = qaResult.scores[dim]; const color = score >= 8 ? "#22c55e" : score >= 5 ? "#eab308" : "#ef4444"; return (<div key={dim} className="text-center"><div className="text-2xl font-bold" style={{ color }}>{score}</div><div className="w-full h-1.5 rounded-full mb-1 mt-1" style={{ background: "rgba(255,255,255,0.07)" }}><motion.div className="h-full rounded-full" style={{ width: `${score * 10}%`, background: color }} initial={{ width: 0 }} animate={{ width: `${score * 10}%` }} transition={{ duration: 0.6 }} /></div><div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#6B7280" }}>{dim}</div></div>); })}</div></div><div className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}><span className="font-bold" style={{ color: zoneColor }}>Feedback:</span> {qaResult.feedback}</div><div className="mt-3 text-[10px] font-mono" style={{ color: "#4b5563" }}>Overall: {((qaResult.scores.clarity + qaResult.scores.specificity + qaResult.scores.structure + qaResult.scores.actionability) / 4).toFixed(1)} / 10</div></motion.div>)}</AnimatePresence></div>)}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{filteredWorkflows.map((wf, i) => (<div key={i} className="rounded-xl p-4 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="text-[10px] font-mono mb-1" style={{ color: zoneColor }}>{wf.cat}</div><h3 className="text-sm font-bold mb-1">{wf.title}</h3><p className="text-xs mb-2" style={{ color: "#A1A1AA" }}>{wf.purpose}</p><p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {wf.best}</p></div>))}</div></div>)}
              {activeSubTab.playbook === "Animal Chains" && (<div className="space-y-3 max-w-3xl">{CHAINS.map((chain, i) => (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-2">{chain.goal}</h3><div className="flex items-center gap-2 mb-2">{chain.c.map((name, j) => { const emoji = ANIMAL_EMOJIS[name] || "🐾"; const color = ANIMAL_COLORS[name] || "#4DFFFF"; return (<div key={j} className="flex items-center gap-2"><span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs" style={{ background: `${color}12`, color }}>{emoji} {name}</span>{j < chain.c.length - 1 && <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}</div>); })}</div><p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {chain.best}</p></div>))}</div>)}
              {activeSubTab.playbook === "Design Combos" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{COMBOS.map((combo, i) => { const id = `combo-${i}`; return (<div key={id} className="rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}><h3 className="text-sm font-bold mb-1">{combo.combo}</h3><p className="text-[10px] mb-1" style={{ color: "#A1A1AA" }}>Elements: {combo.els}</p><p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {combo.best}</p><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="text-[10px] mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: zoneColor }}>🧠 {combo.psych}</p></motion.div>)}</AnimatePresence></div>); })}</div>)}
              {activeSubTab.playbook === "Typography" && (<div className="max-w-3xl space-y-6"><div><h3 className="text-sm font-bold mb-3">Display + Mono Pairings</h3><div className="space-y-2">{TYPO.map((pair, i) => (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-baseline gap-3 mb-1"><span className="text-lg font-bold" style={{ color: zoneColor }}>{pair.d}</span><span className="text-xs" style={{ color: "#6B7280" }}>+ {pair.m}</span></div><p className="text-[10px]" style={{ color: "#A1A1AA" }}>{pair.b}</p></div>))}</div></div><div><h3 className="text-sm font-bold mb-3">Use-Case Recommendations</h3><div className="space-y-2">{TYPO_USECASES.map((uc, i) => (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="text-xs font-bold mb-1" style={{ color: zoneColor }}>{uc.u}</div><p className="text-[11px]" style={{ color: "#A1A1AA" }}>{uc.c}</p></div>))}</div></div></div>)}
            </>)}

            {/* ═══ MONETIZE ═══ */}
            {activeZone === "monetize" && (<>
              {activeSubTab.monetize === "Top Prompts" && (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{MONETIZE_TOP_PROMPTS.map((item, i) => { const id = `mon-top-${i}`; return (<div key={id} className="rounded-xl p-4 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center justify-between mb-2"><span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.cat}</span><span className="text-[9px] px-2 py-0.5 rounded font-bold" style={{ background: item.rev === "$$$" ? "rgba(239,68,68,0.12)" : item.rev === "$$" ? "rgba(234,179,8,0.12)" : "rgba(34,197,94,0.12)", color: item.rev === "$$$" ? "#ef4444" : item.rev === "$$" ? "#eab308" : "#22c55e" }}>Revenue: {item.rev}</span></div><h3 className="text-sm font-bold mb-2">{item.label}</h3><p className="text-[11px]" style={{ color: "#A1A1AA" }}>{item.desc}</p></div>); })}</div>)}
              {activeSubTab.monetize === "SaaS Templates" && (<div className="space-y-3">{MONETIZE_SAAS.map((item, i) => { const dc = DIFF_COLORS[item.diff] || DIFF_COLORS.medium; return (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center gap-2 mb-1"><h3 className="text-sm font-bold">{item.label}</h3><span className="text-[9px] px-2 py-0.5 rounded" style={{ background: dc.bg, color: dc.text }}>{dc.label}</span><span className="text-[9px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>~{item.time}</span></div><p className="text-xs mb-2" style={{ color: "#A1A1AA" }}>{item.desc}</p><p className="text-[10px] font-mono" style={{ color: zoneColor }}>Stack: {item.stack}</p></div>); })}</div>)}
              {activeSubTab.monetize === "Stacks" && (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{MONETIZE_STACKS.map((item, i) => (<div key={i} className="rounded-xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-2">{item.label}</h3><div className="flex items-center gap-3 mb-2"><span className="text-[10px] font-mono" style={{ color: zoneColor }}>{item.time}</span><span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.income}</span></div><p className="text-xs" style={{ color: "#A1A1AA" }}>{item.desc}</p></div>))}</div>)}
              {activeSubTab.monetize === "AI Tools" && (<div className="space-y-3">{MONETIZE_AI_TOOLS.map((item, i) => (<div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><div className="flex items-center gap-3 mb-2"><h3 className="text-sm font-bold">{item.label}</h3><span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.cat}</span><span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>{item.tier}</span></div><p className="text-xs" style={{ color: "#A1A1AA" }}>{item.desc}</p></div>))}</div>)}

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
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
                  <button onClick={() => setSkillsCategoryFilter("all")} className="px-3 py-1.5 text-[10px] font-medium rounded-full whitespace-nowrap transition-all flex items-center gap-1" style={{ color: skillsCategoryFilter === "all" ? "#a78bfa" : "#6B7280", background: skillsCategoryFilter === "all" ? "rgba(167,139,250,0.15)" : "transparent", border: `1px solid ${skillsCategoryFilter === "all" ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.07)"}` }}>
                    All <span className="opacity-60">({TOTAL_SKILLS})</span>
                  </button>
                  {CATEGORY_COUNTS.map((cc) => (
                    <button key={cc.category} onClick={() => setSkillsCategoryFilter(cc.category)} className="px-3 py-1.5 text-[10px] font-medium rounded-full whitespace-nowrap transition-all flex items-center gap-1" style={{ color: skillsCategoryFilter === cc.category ? (CATEGORY_COLORS[cc.category] || "#a78bfa") : "#6B7280", background: skillsCategoryFilter === cc.category ? `${(CATEGORY_COLORS[cc.category] || "#a78bfa")}18` : "transparent", border: `1px solid ${skillsCategoryFilter === cc.category ? `${(CATEGORY_COLORS[cc.category] || "#a78bfa")}44` : "rgba(255,255,255,0.07)"}` }}>
                      <span>{cc.icon}</span><span className="hidden sm:inline">{cc.category}</span><span className="opacity-60">({cc.count})</span>
                    </button>
                  ))}
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" {...stagger}>
                  {filteredSkills.map((skill) => {
                    const catColor = CATEGORY_COLORS[skill.category] || "#6B7280";
                    return (
                      <motion.div key={skill.name} {...staggerItem} className="rounded-xl p-4 transition-all hover:-translate-y-0.5 cursor-default" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{ background: `${catColor}15`, color: catColor }}>{skill.category}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#6B7280" }}>{skill.files} file{skill.files !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{skill.icon}</span>
                          <h3 className="text-sm font-bold" style={{ color: "#e4e4e7" }}>{skill.name}</h3>
                        </div>
                        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#A1A1AA" }}>{skill.description}</p>
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
              {activeSubTab.system === "Principles" && (<div className="max-w-3xl mx-auto space-y-4"><h2 className="text-lg font-bold mb-2">Core Principles</h2><p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>The foundational rules that govern the promptc OS philosophy.</p>{SYSTEM_PRINCIPLES.map((p, i) => { const id = `sys-p-${i}`; return (<div key={id} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: `1px solid ${p.color}22` }}><div className="p-4 cursor-pointer" onClick={() => toggleExpand(id)}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-xl">{p.icon}</span><h3 className="text-sm font-bold" style={{ color: p.color }}>{p.title}</h3></div>{expandedItems.has(id) ? <ChevronDown className="w-4 h-4" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-4 h-4" style={{ color: "#4b5563" }} />}</div></div><AnimatePresence>{expandedItems.has(id) && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-4 pb-4"><p className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}>{p.desc}</p></div></motion.div>)}</AnimatePresence></div>); })}</div>)}

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
              {activeSubTab.system === "Self-Evolve" && (<div className="max-w-3xl mx-auto"><h2 className="text-lg font-bold mb-2">Self-Evolve Dashboard</h2><p className="text-xs mb-6" style={{ color: "#A1A1AA" }}>Track your compounding system growth.</p><div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">{[
                { icon: <Layers className="w-5 h-5" />, label: "Skills Built", value: 12, color: "#a78bfa" },
                { icon: <Cpu className="w-5 h-5" />, label: "Tasks Automated", value: 47, color: "#4DFFFF" },
                { icon: <Timer className="w-5 h-5" />, label: "Hours Saved", value: 156, color: "#22c55e" },
              ].map((stat, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl p-6 text-center" style={{ background: "#14161A", border: `1px solid ${stat.color}22` }}><div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div><div className="text-3xl font-bold" style={{ color: stat.color }}><AnimatedCounter value={stat.value} /></div><div className="text-[10px] mt-1" style={{ color: "#6B7280" }}>{stat.label}</div></motion.div>))}</div><div className="rounded-xl p-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-3" style={{ color: "#a78bfa" }}>Compounding Formula</h3><div className="flex items-center gap-3 justify-center flex-wrap text-xs"><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>Build Once</span><span style={{ color: "#4b5563" }}>→</span><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(77,255,255,0.1)", color: "#4DFFFF" }}>Runs Forever</span><span style={{ color: "#4b5563" }}>→</span><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>System Gets Smarter</span><span style={{ color: "#4b5563" }}>→</span><span className="px-3 py-2 rounded-lg" style={{ background: "rgba(255,183,0,0.1)", color: "#FFB000" }}>Zero Thinking</span></div></div></div>)}

              {/* Infographics */}
              {activeSubTab.system === "Infographics" && (<div className="max-w-4xl mx-auto"><h2 className="text-lg font-bold mb-2">Zone Overview Infographic</h2><p className="text-xs mb-6" style={{ color: "#A1A1AA" }}>Content distribution across all zones.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">{ZONES.map((z, i) => { const tabs = ZONE_TABS[z.id] || []; const count = tabs.reduce((sum, t) => sum + (ZONE_TAB_COUNTS[z.id]?.[t] || 0), 0); return (<motion.div key={z.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-xl p-4 text-center" style={{ background: "#14161A", border: `1px solid ${z.color}22` }}><span className="text-lg">{z.icon}</span><div className="text-xl font-bold mt-1" style={{ color: z.color }}><AnimatedCounter value={count} /></div><div className="text-[10px]" style={{ color: "#6B7280" }}>{z.label}</div></motion.div>); })}</div>
                {/* Modifier Coverage Heat Map */}
                <div className="rounded-xl p-6 mb-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><h3 className="text-sm font-bold mb-4">Modifier Coverage Heat Map</h3><div className="space-y-1">{MOD_CATS.slice(0, 6).map((cat) => (<div key={cat} className="flex items-center gap-2"><span className="text-[10px] font-mono w-20 flex-shrink-0 text-right" style={{ color: "#6B7280" }}>{cat}</span><div className="flex-1 flex gap-0.5">{["Tasks", "Modifiers", "Templates", "Lint"].map((zone) => { const hasMatch = (cat === "Role" || cat === "Agent" || cat === "Productivity") && zone !== "Lint"; return <div key={zone} className="h-4 flex-1 rounded-sm transition-all" style={{ background: hasMatch ? `${zoneColor}44` : "rgba(255,255,255,0.04)" }} title={`${cat} × ${zone}: ${hasMatch ? "Applies" : "No direct link"}`} />; })}</div></div>))}</div><div className="flex items-center gap-3 mt-3 text-[9px]" style={{ color: "#4b5563" }}><div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm" style={{ background: `${zoneColor}44` }} /> Applies</div><div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm" style={{ background: "rgba(255,255,255,0.04)" }} /> No direct link</div></div></div>
              </div>)}

              {/* Package Docs */}
              {activeSubTab.system === "Package Docs" && (<div className="max-w-3xl mx-auto text-center py-12"><div className="rounded-xl p-8 mb-6" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}><FileText className="w-12 h-12 mx-auto mb-4" style={{ color: "#a78bfa" }} /><h2 className="text-lg font-bold mb-2">Generate Reference Document</h2><p className="text-sm mb-6" style={{ color: "#A1A1AA" }}>Download a comprehensive markdown document with all prompts, modifiers, templates, and brand systems organized by zone.</p><button onClick={generatePackageDocs} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" }}><FolderDown className="w-4 h-4" /> Generate & Download .md</button></div><div className="text-[10px]" style={{ color: "#4b5563" }}>Includes: {MODS.length} modifiers, {TMPLS.length} templates, {TASKS.length} tasks, {BRANDS.length} brands, {ENHANCEMENTS.length} enhancements, {LINT_RULES.length} lint rules</div></div>)}
            </>)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── FAB (Export & Share) ─── */}
      <div className="fixed bottom-6 right-6 z-30" onMouseEnter={() => setShowFab(true)} onMouseLeave={() => setShowFab(false)}>
        <AnimatePresence>{showFab && (<motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.9 }} transition={{ duration: 0.15 }} className="absolute bottom-12 right-0 rounded-xl p-1.5 flex flex-col gap-1" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
          <button onClick={() => exportMarkdown("all")} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors text-left" style={{ color: "#A1A1AA" }}><FileDown className="w-3.5 h-3.5" /> Export All</button>
          <button onClick={() => exportMarkdown("zone")} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors text-left" style={{ color: "#A1A1AA" }}><FileDown className="w-3.5 h-3.5" /> Export Zone</button>
          <button onClick={copyComposerFull} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors text-left" style={{ color: "#A1A1AA" }}><ClipboardCopy className="w-3.5 h-3.5" /> Copy Composer</button>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("URL copied!"); }} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-white/5 transition-colors text-left" style={{ color: "#A1A1AA" }}><Share2 className="w-3.5 h-3.5" /> Share Link</button>
        </motion.div>)}</AnimatePresence>
        <button className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110" style={{ background: "linear-gradient(135deg, #a78bfa, #4DFFFF)", boxShadow: "0 4px 20px rgba(167,139,250,0.3)" }}>
          <Download className="w-5 h-5 text-black" />
        </button>
      </div>

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

      {/* ─── Footer ─── */}
      <footer className="mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs" style={{ color: "#4b5563" }}><Sparkles className="w-3.5 h-3.5" /><span>promptc OS — AI Prompt Engineering Operating System</span></div>
          <p className="text-xs" style={{ color: "#4b5563" }}>Powered by AI · Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
