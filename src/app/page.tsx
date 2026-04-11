"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Loader2,
  Zap,
  Target,
  Wrench,
  X,
  RotateCcw,
  Search,
  History,
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  ZONES,
  MODS,
  MOD_CATS,
  TASKS,
  TMPLS,
  BRANDS,
  ANIMALS,
  CHAINS,
  LAYERS,
  LAYER_TPL,
  ENHANCEMENTS,
  LINT_RULES,
  SWAPS,
  SWAP_LEVELS,
  VOCAB,
  VOCAB_CATS,
  COMBOS,
  TYPO,
  TYPO_USECASES,
  MASTER,
} from "./data/promptc-data";

// ─── Types ─────────────────────────────────────────────────────────────────
interface ResultState {
  content: string | null;
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

interface HistoryItem {
  text: string;
  zone: string;
  time: string;
}

// ─── Sub-tab definitions per zone ─────────────────────────────────────────
const ZONE_TABS: Record<string, string[]> = {
  activate: ["Tasks", "Modifiers", "Templates", "Brands", "Animals", "Composer"],
  build: ["Master Prompt", "Enhancements", "Meta Builder"],
  validate: ["Lint Rules", "Word Swaps", "Vocabulary", "Quality Score"],
  playbook: ["Workflows", "Animal Chains", "Design Combos", "Typography"],
  monetize: ["Top Prompts", "SaaS Templates", "Stacks", "AI Tools"],
};

// ─── Animal colors map ────────────────────────────────────────────────────
const ANIMAL_COLORS: Record<string, string> = {
  Eagle: "#FFB000",
  Beaver: "#FF6B00",
  Ant: "#FF4FD8",
  Owl: "#4DFFFF",
  Rabbit: "#22c55e",
  Dolphin: "#38bdf8",
  Elephant: "#f97316",
};

const ANIMAL_EMOJIS: Record<string, string> = {
  Rabbit: "🐇",
  Owl: "🦉",
  Ant: "🐜",
  Eagle: "🦅",
  Dolphin: "🐬",
  Beaver: "🦫",
  Elephant: "🐘",
};

// ─── Meta Prompt configs (preserved from original) ────────────────────────
const META_PROMPTS = [
  {
    id: 1 as const,
    title: "Quick Critique",
    description: "Get a fast clarity & relevance rating with 5 specific improvements and two refined prompt variants.",
    icon: Zap,
    accent: "#3b82f6",
  },
  {
    id: 2 as const,
    title: "Structured Analysis",
    description: "Deep dive with 3 key improvements, 3 wildly different approaches each, and two refined prompts.",
    icon: Target,
    accent: "#8b5cf6",
  },
  {
    id: 3 as const,
    title: "Expert Engineering",
    description: "Full expert treatment: precision & strategy variants, self-test, rationale tags, and constraint preservation.",
    icon: Wrench,
    accent: "#06b6d4",
  },
];

// ─── Monetize data ────────────────────────────────────────────────────────
const MONETIZE_TOP_PROMPTS = [
  { label: "SaaS AI MVP in 1 Weekend", desc: "Build complete SaaS with Next.js + Supabase + Groq + Stripe + Vercel in 48 hours.", cat: "Build" },
  { label: "Prompt Pack → First Sale in 48hrs", desc: "10 copy-ready prompts for Gumroad. Niche, title, use case, pro tip each.", cat: "Sell" },
  { label: "Newsletter → $1k/mo in 90 Days", desc: "Beehiiv + referral program + sponsorships. Full content system.", cat: "Grow" },
  { label: "Consulting → Productized Offer", desc: "Fixed-scope, fixed-price. Notion portal + Loom async delivery.", cat: "Pivot" },
  { label: "Agency → SaaS Transition", desc: "6-month plan from services to product. Document → build → launch.", cat: "Scale" },
  { label: "MCP Tool → Paid Product", desc: "Build MCP server for Claude Desktop, monetize with npm/Stripe.", cat: "Build" },
];

const MONETIZE_SAAS = [
  { label: "AI Content Pipeline", desc: "n8n: Airtable → WordPress → social. Auto-publish daily.", stack: "n8n + Airtable + WordPress" },
  { label: "Lead Capture & Qualification", desc: "Typeform → AI score → CRM → Slack notify. Tier-based routing.", stack: "n8n + Typeform + OpenAI + HubSpot" },
  { label: "Site & Competitor Monitor", desc: "Uptime check + competitor price scraping + AI summary + alerts.", stack: "n8n + PagerDuty + Google Sheets" },
  { label: "Invoice Automation", desc: "Auto-generate PDF invoices, email, track payment webhooks.", stack: "Make + Airtable + PDF.co + Gmail" },
  { label: "MCP Agent Pipeline", desc: "Claude + MCP tools → autonomous research + write + publish.", stack: "MCP SDK + Node.js + WordPress" },
  { label: "CRM Sync System", desc: "Sync leads across HubSpot, Gmail, Slack, Sheets via Zapier.", stack: "Zapier + HubSpot + Gmail + Sheets" },
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

// ─── Animation variants ───────────────────────────────────────────────────
const fadeSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: "easeOut" },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.04 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function Home() {
  // Zone + sub-tab state
  const [activeZone, setActiveZone] = useState("activate");
  const [activeSubTab, setActiveSubTab] = useState<Record<string, string>>({
    activate: "Tasks",
    build: "Master Prompt",
    validate: "Lint Rules",
    playbook: "Workflows",
    monetize: "Top Prompts",
  });

  // UI state
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Meta builder state
  const [metaPrompt, setMetaPrompt] = useState("");
  const [metaResults, setMetaResults] = useState<Record<1 | 2 | 3, ResultState>>({
    1: { content: null, loading: false, error: null, expanded: false },
    2: { content: null, loading: false, error: null, expanded: false },
    3: { content: null, loading: false, error: null, expanded: false },
  });

  // Quality score state
  const [qaInput, setQaInput] = useState("");
  const [qaResult, setQaResult] = useState<{ scores: { clarity: number; specificity: number; structure: number; actionability: number }; feedback: string } | null>(null);
  const [qaLoading, setQaLoading] = useState(false);

  // Composer state
  const [composerFields, setComposerFields] = useState<Record<string, string>>({
    Role: "", Context: "", Objective: "", Constraints: "",
    Aesthetic: "", Planning: "", Output: "", Refinement: "",
  });
  const [composerResult, setComposerResult] = useState<string | null>(null);

  const zoneColor = ZONES.find((z) => z.id === activeZone)?.color || "#4DFFFF";

  // ── Toggle expand ──
  const toggleExpand = useCallback((id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ── Copy handler ──
  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setHistory((prev) => [
        { text: text.slice(0, 200), zone: activeZone, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
        ...prev.slice(0, 49),
      ]);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      toast.error("Failed to copy.");
    }
  }, [activeZone]);

  // ── Meta generate handler ──
  const handleMetaGenerate = useCallback(async (metaType: 1 | 2 | 3) => {
    if (!metaPrompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }
    setMetaResults((prev) => ({ ...prev, [metaType]: { content: null, loading: true, error: null, expanded: true } }));
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: metaPrompt.trim(), metaType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      setMetaResults((prev) => ({ ...prev, [metaType]: { content: data.result, loading: false, error: null, expanded: true } }));
      toast.success(`${META_PROMPTS[metaType - 1].title} complete!`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMetaResults((prev) => ({ ...prev, [metaType]: { content: null, loading: false, error: message, expanded: true } }));
      toast.error(message);
    }
  }, [metaPrompt]);

  // ── Quality score handler ──
  const handleQualityScore = useCallback(async () => {
    if (!qaInput.trim()) {
      toast.error("Please enter a prompt to analyze.");
      return;
    }
    setQaLoading(true);
    setQaResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: qaInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed.");
      setQaResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    } finally {
      setQaLoading(false);
    }
  }, [qaInput]);

  // ── Composer assemble ──
  const handleComposerAssemble = useCallback(() => {
    const filled = LAYERS.filter((l) => composerFields[l.name].trim());
    if (filled.length === 0) {
      toast.error("Fill in at least one layer.");
      return;
    }
    const assembled = filled
      .map((l) => `${l.name.toUpperCase()}\n${composerFields[l.name]}`)
      .join("\n\n");
    setComposerResult(assembled);
  }, [composerFields]);

  // ── Zone change ──
  const handleZoneChange = useCallback((zoneId: string) => {
    setActiveZone(zoneId);
    setSearchQuery("");
  }, []);

  // ── Filter by search ──
  const filteredMods = useMemo(() => {
    if (!searchQuery) return MODS;
    const q = searchQuery.toLowerCase();
    return MODS.filter((m) => m.mod.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q) || m.tip.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredWorkflows = useMemo(() => {
    if (!searchQuery) return WORKFLOWS_DATA;
    const q = searchQuery.toLowerCase();
    return WORKFLOWS_DATA.filter((w) => w.title.toLowerCase().includes(q) || w.purpose.toLowerCase().includes(q) || w.cat.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0B0D10", color: "#FFFFFF" }}>
      {/* ─── Sticky Navigation ─── */}
      <nav className="sticky top-0 z-50" style={{ background: "rgba(11,13,16,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-xl">⚡</span>
              <span className="font-bold text-sm tracking-tight" style={{ fontFamily: "'DM Mono', monospace", color: zoneColor }}>
                promptc OS
              </span>
            </div>
            {/* Zone Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => handleZoneChange(z.id)}
                  className="relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap"
                  style={{
                    color: activeZone === z.id ? z.color : "#6B7280",
                    background: activeZone === z.id ? `${z.color}12` : "transparent",
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{z.icon}</span>
                    <span className="hidden sm:inline">{z.label}</span>
                  </span>
                  {activeZone === z.id && (
                    <motion.div
                      layoutId="zoneIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: z.color }}
                    />
                  )}
                </button>
              ))}
            </div>
            {/* History */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5"
              style={{ color: "#6B7280" }}
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">History</span>
              {history.length > 0 && (
                <span className="w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold" style={{ background: zoneColor + "22", color: zoneColor }}>
                  {history.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── History Panel ─── */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.25 }}
            className="fixed top-14 right-0 bottom-0 z-40 w-80 sm:w-96 overflow-y-auto"
            style={{ background: "#14161A", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold" style={{ color: zoneColor }}>📋 Copy History</h3>
                <button onClick={() => { setHistory([]); toast.info("History cleared."); }} className="text-[10px] px-2 py-1 rounded border" style={{ borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>CLEAR</button>
              </div>
              {history.length === 0 ? (
                <p className="text-xs text-center py-8" style={{ color: "#4b5563" }}>No copies yet</p>
              ) : (
                history.map((h, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${ZONES.find(z => z.id === h.zone)?.color || "#4DFFFF"}15`, color: ZONES.find(z => z.id === h.zone)?.color || "#4DFFFF" }}>{h.zone}</span>
                      <span className="text-[9px]" style={{ color: "#4b5563" }}>{h.time}</span>
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{h.text}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Zone Sub-Tabs ─── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {(ZONE_TABS[activeZone] || []).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab({ ...activeSubTab, [activeZone]: tab })}
              className="px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all"
              style={{
                color: activeSubTab[activeZone] === tab ? zoneColor : "#6B7280",
                background: activeSubTab[activeZone] === tab ? `${zoneColor}18` : "transparent",
                border: `1px solid ${activeSubTab[activeZone] === tab ? `${zoneColor}44` : "rgba(255,255,255,0.07)"}`,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={`${activeZone}-${activeSubTab[activeZone]}`} {...fadeSlide} className="pt-6">
            {/* ═══════════════════════ ZONE: ACTIVATE ═══════════════════════ */}
            {activeZone === "activate" && (
              <>
                {/* ── Tasks ── */}
                {activeSubTab.activate === "Tasks" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" {...stagger}>
                    {TASKS.map((task) => (
                      <motion.div key={task.label} {...staggerItem} className="rounded-xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-bold">{task.label}</h3>
                          <button onClick={() => handleCopy(task.content, `task-${task.label}`)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                            {copiedId === `task-${task.label}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}
                          </button>
                        </div>
                        <pre className="text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{task.content.slice(0, 200)}...</pre>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── Modifiers ── */}
                {activeSubTab.activate === "Modifiers" && (
                  <div>
                    <div className="mb-4 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4b5563" }} />
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search modifiers..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
                        style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }}
                      />
                    </div>
                    {MOD_CATS.map((cat) => {
                      const catMods = filteredMods.filter((m) => m.cat === cat);
                      if (catMods.length === 0) return null;
                      return (
                        <div key={cat} className="mb-6">
                          <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{cat.toUpperCase()} ({catMods.length})</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {catMods.map((m, i) => {
                              const id = `mod-${cat}-${i}`;
                              return (
                                <div key={id} className="rounded-lg p-3 transition-all hover:border-white/15 cursor-pointer" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}>
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-xs leading-relaxed flex-1" style={{ color: "#e4e4e7" }}>{m.mod}</p>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                      <button onClick={(e) => { e.stopPropagation(); handleCopy(m.mod, id); }} className="p-1 rounded hover:bg-white/10 transition-colors">
                                        {copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}
                                      </button>
                                      {expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}
                                    </div>
                                  </div>
                                  <AnimatePresence>
                                    {expandedItems.has(id) && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="mt-2 pt-2 text-[11px] leading-relaxed" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA" }}>💡 {m.tip}</div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Templates ── */}
                {activeSubTab.activate === "Templates" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>
                    {TMPLS.map((tmpl) => {
                      const id = `tmpl-${tmpl.label}`;
                      return (
                        <motion.div key={id} {...staggerItem} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-bold">{tmpl.label}</h3>
                              <button onClick={() => handleCopy(tmpl.content, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                                {copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}
                              </button>
                            </div>
                            <p className="text-xs mb-3" style={{ color: "#6B7280" }}>{tmpl.desc}</p>
                            <button onClick={() => toggleExpand(id)} className="text-[10px] font-mono" style={{ color: zoneColor }}>
                              {expandedItems.has(id) ? "COLLAPSE ▲" : "EXPAND ▼"}
                            </button>
                          </div>
                          <AnimatePresence>
                            {expandedItems.has(id) && (
                              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                <pre className="p-4 text-[11px] leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{tmpl.content}</pre>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* ── Brands ── */}
                {activeSubTab.activate === "Brands" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>
                    {BRANDS.map((brand) => {
                      const id = `brand-${brand.id}`;
                      return (
                        <motion.div key={id} {...staggerItem} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: `1px solid ${brand.col}22` }}>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-bold" style={{ color: brand.col }}>{brand.label}</h3>
                              <button onClick={() => handleCopy(brand.prompt, id)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                                {copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#6B7280" }} />}
                              </button>
                            </div>
                            <p className="text-xs" style={{ color: "#6B7280" }}>{brand.uc}</p>
                            <button onClick={() => toggleExpand(id)} className="text-[10px] font-mono mt-2" style={{ color: brand.col }}>
                              {expandedItems.has(id) ? "COLLAPSE ▲" : "VIEW SYSTEM ▼"}
                            </button>
                          </div>
                          <AnimatePresence>
                            {expandedItems.has(id) && (
                              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                <pre className="p-4 text-[11px] leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{brand.prompt}</pre>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* ── Animals ── */}
                {activeSubTab.activate === "Animals" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" {...stagger}>
                    {ANIMALS.map((animal) => {
                      const id = `animal-${animal.name}`;
                      const color = ANIMAL_COLORS[animal.name] || "#4DFFFF";
                      return (
                        <motion.div key={id} {...staggerItem} className="rounded-xl p-5 transition-all hover:-translate-y-0.5 cursor-pointer" style={{ background: "#14161A", border: `1px solid ${color}22` }} onClick={() => toggleExpand(id)}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{animal.emoji}</span>
                            <div>
                              <h3 className="text-sm font-bold" style={{ color }}>{animal.name}</h3>
                              <p className="text-[10px] font-mono" style={{ color: "#A1A1AA" }}>{animal.mode}</p>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); handleCopy(animal.prompt, id); }} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                              {copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />}
                            </button>
                          </div>
                          <AnimatePresence>
                            {expandedItems.has(id) && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <pre className="text-[11px] leading-relaxed whitespace-pre-wrap pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA", fontFamily: "monospace" }}>{animal.prompt}</pre>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* ── Composer ── */}
                {activeSubTab.activate === "Composer" && (
                  <div className="max-w-3xl mx-auto">
                    <div className="mb-4 text-xs" style={{ color: "#A1A1AA" }}>Fill in the layers below. Leave blank what you don&apos;t need.</div>
                    <div className="space-y-4 mb-6">
                      {LAYERS.map((layer) => (
                        <div key={layer.name} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold" style={{ color: zoneColor }}>{layer.n}</span>
                            <span className="text-xs font-bold">{layer.name}</span>
                          </div>
                          <p className="text-[10px] mb-2" style={{ color: "#6B7280" }}>{layer.pur}</p>
                          <textarea
                            value={composerFields[layer.name]}
                            onChange={(e) => setComposerFields({ ...composerFields, [layer.name]: e.target.value })}
                            placeholder={layer.miss}
                            rows={2}
                            className="w-full rounded-lg p-2.5 text-xs outline-none resize-y"
                            style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF", fontFamily: "monospace" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={handleComposerAssemble} className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ background: `${zoneColor}18`, color: zoneColor, border: `1px solid ${zoneColor}44` }}>
                        Assemble Prompt
                      </button>
                      <button onClick={() => { setComposerFields({ Role: "", Context: "", Objective: "", Constraints: "", Aesthetic: "", Planning: "", Output: "", Refinement: "" }); setComposerResult(null); }} className="px-4 py-2.5 rounded-lg text-xs" style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}>Reset</button>
                      {composerResult && (
                        <button onClick={() => handleCopy(composerResult, "composer")} className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors">
                          {copiedId === "composer" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" style={{ color: "#6B7280" }} />}
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {composerResult && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4">
                          <pre className="rounded-xl p-5 text-xs leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap" style={{ background: "#14161A", border: `1px solid ${zoneColor}22`, color: "#A1A1AA", fontFamily: "monospace" }}>{composerResult}</pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}

            {/* ═══════════════════════ ZONE: BUILD ═══════════════════════ */}
            {activeZone === "build" && (
              <>
                {/* ── Master Prompt ── */}
                {activeSubTab.build === "Master Prompt" && (
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-lg font-bold mb-2">Master System Prompt</h2>
                    <p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>The foundational prompt that sets AI behavior. Copy and paste to use.</p>
                    <div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                        <span className="text-[10px] font-mono tracking-widest" style={{ color: zoneColor }}>SYSTEM PROMPT</span>
                        <button onClick={() => handleCopy(MASTER, "master")} className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-medium transition-all" style={{ background: `${zoneColor}15`, color: zoneColor, border: `1px solid ${zoneColor}33` }}>
                          {copiedId === "master" ? <><Check className="w-3 h-3" /> COPIED</> : <><Copy className="w-3 h-3" /> COPY</>}
                        </button>
                      </div>
                      <pre className="p-5 text-xs leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{MASTER}</pre>
                    </div>
                  </div>
                )}

                {/* ── Enhancements ── */}
                {activeSubTab.build === "Enhancements" && (
                  <div className="space-y-4">
                    {ENHANCEMENTS.map((enh, i) => {
                      const id = `enh-${i}`;
                      return (
                        <div key={id} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div className="p-4 cursor-pointer" onClick={() => toggleExpand(id)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>0{i + 1}</span>
                                <h3 className="text-sm font-bold">{enh.label}</h3>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>{enh.when}</span>
                                {expandedItems.has(id) ? <ChevronDown className="w-3.5 h-3.5" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3.5 h-3.5" style={{ color: "#4b5563" }} />}
                              </div>
                            </div>
                          </div>
                          <AnimatePresence>
                            {expandedItems.has(id) && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="px-4 pb-4 space-y-3">
                                  <div className="rounded-lg p-3" style={{ background: "#0B0D10" }}>
                                    <div className="text-[10px] font-mono mb-1" style={{ color: zoneColor }}>WHAT IT DOES</div>
                                    <pre className="text-[11px] leading-relaxed whitespace-pre-wrap" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{enh.content}</pre>
                                  </div>
                                  <div className="rounded-lg p-3" style={{ background: "#0B0D10" }}>
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="text-[10px] font-mono" style={{ color: zoneColor }}>HOW TO USE</div>
                                      <button onClick={() => handleCopy(enh.howto, id)} className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px]" style={{ background: `${zoneColor}15`, color: zoneColor }}>
                                        {copiedId === id ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                                      </button>
                                    </div>
                                    <pre className="text-[11px] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto" style={{ color: "#A1A1AA", fontFamily: "monospace" }}>{enh.howto}</pre>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Meta Builder ── */}
                {activeSubTab.build === "Meta Builder" && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-lg font-bold mb-2">Meta Prompt Builder</h2>
                      <p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Transform your prompts with three expert AI methodologies.</p>
                      <div className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <textarea
                          value={metaPrompt}
                          onChange={(e) => setMetaPrompt(e.target.value)}
                          placeholder="Paste or type your prompt here..."
                          rows={5}
                          className="w-full bg-transparent text-sm p-4 outline-none resize-none"
                          style={{ color: "#e2e8f0", fontFamily: "monospace" }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {META_PROMPTS.map((meta) => {
                        const Icon = meta.icon;
                        const state = metaResults[meta.id];
                        return (
                          <div key={meta.id} className="rounded-xl overflow-hidden" style={{ background: "#14161A", border: `1px solid ${meta.accent}33` }}>
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: `${meta.accent}15` }}>
                                  <Icon className="w-4 h-4" style={{ color: meta.accent }} />
                                </div>
                                <div>
                                  <span className="text-[10px] font-mono" style={{ color: "#6B7280" }}>#{meta.id}</span>
                                  <h3 className="text-xs font-bold">{meta.title}</h3>
                                </div>
                              </div>
                              <p className="text-[11px] mb-3" style={{ color: "#6B7280" }}>{meta.description}</p>
                              <button
                                onClick={() => handleMetaGenerate(meta.id)}
                                disabled={state.loading || !metaPrompt.trim()}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-40"
                                style={{ background: `${meta.accent}15`, color: meta.accent, border: `1px solid ${meta.accent}33` }}
                              >
                                {state.loading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate</>}
                              </button>
                            </div>
                            <AnimatePresence>
                              {(state.content || state.error || state.loading) && (
                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                                    <div className="px-4 py-2 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                      <span className="text-[10px] font-mono" style={{ color: "#6B7280" }}>{state.error ? "ERROR" : "RESULT"}</span>
                                      {state.content && (
                                        <button onClick={() => handleCopy(state.content, `meta-${meta.id}`)} className="p-1 rounded hover:bg-white/10">
                                          {copiedId === `meta-${meta.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}
                                        </button>
                                      )}
                                    </div>
                                    <div className="p-4 max-h-80 overflow-y-auto">
                                      {state.loading && (
                                        <div className="space-y-2">
                                          {[...Array(3)].map((_, j) => <div key={j} className="h-3 rounded-full animate-pulse" style={{ background: "rgba(255,255,255,0.04)", width: `${70 + Math.random() * 30}%` }} />)}
                                        </div>
                                      )}
                                      {state.error && <p className="text-xs" style={{ color: "#ef4444" }}>{state.error}</p>}
                                      {state.content && !state.loading && <div className="markdown-result text-xs"><ReactMarkdown>{state.content}</ReactMarkdown></div>}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ═══════════════════════ ZONE: VALIDATE ═══════════════════════ */}
            {activeZone === "validate" && (
              <>
                {/* ── Lint Rules ── */}
                {activeSubTab.validate === "Lint Rules" && (
                  <div className="space-y-6">
                    {["universal", "ui/ux", "code", "content", "agent"].map((seg) => {
                      const rules = LINT_RULES.filter((r) => r.seg === seg);
                      return (
                        <div key={seg}>
                          <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{seg.toUpperCase()} ({rules.length})</div>
                          <div className="space-y-2">
                            {rules.map((rule) => (
                              <div key={rule.id} className="rounded-lg p-3 flex items-start gap-3" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${rule.auto ? "bg-green-500" : "bg-amber-500"}`} title={rule.auto ? "Auto-fixable" : "Manual check"} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs" style={{ color: "#e4e4e7" }}>{rule.check}</p>
                                  <p className="text-[10px] mt-1" style={{ color: "#6B7280" }}>→ {rule.fix}</p>
                                </div>
                                <button onClick={() => handleCopy(rule.fix, `lint-${rule.id}`)} className="p-1 rounded hover:bg-white/10 flex-shrink-0">
                                  {copiedId === `lint-${rule.id}` ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Word Swaps ── */}
                {activeSubTab.validate === "Word Swaps" && (
                  <div className="space-y-6">
                    {SWAP_LEVELS.map((level) => {
                      const swaps = SWAPS.filter((s) => s.level === level);
                      if (swaps.length === 0) return null;
                      return (
                        <div key={level}>
                          <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{level.toUpperCase()} ({swaps.length})</div>
                          <div className="space-y-2">
                            {swaps.map((swap, i) => {
                              const id = `swap-${level}-${i}`;
                              return (
                                <div key={id} className="rounded-lg p-3 cursor-pointer transition-all hover:border-white/15" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs line-through" style={{ color: "#ef4444" }}>{swap.bad}</span>
                                    <span className="text-[10px]" style={{ color: "#4b5563" }}>→</span>
                                    <span className="text-xs font-medium" style={{ color: "#22c55e" }}>{swap.good}</span>
                                    <button onClick={(e) => { e.stopPropagation(); handleCopy(swap.good, id); }} className="ml-auto p-1 rounded hover:bg-white/10 flex-shrink-0">
                                      {copiedId === id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" style={{ color: "#4b5563" }} />}
                                    </button>
                                    {expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}
                                  </div>
                                  <AnimatePresence>
                                    {expandedItems.has(id) && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <p className="text-[10px] mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "#A1A1AA" }}>💡 {swap.tip}</p>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Vocabulary ── */}
                {activeSubTab.validate === "Vocabulary" && (
                  <div className="space-y-6">
                    {VOCAB_CATS.map((cat) => {
                      const terms = VOCAB.filter((v) => v.cat === cat);
                      return (
                        <div key={cat}>
                          <div className="text-[10px] font-mono tracking-widest mb-3" style={{ color: zoneColor }}>{cat.toUpperCase()} ({terms.length})</div>
                          <div className="space-y-2">
                            {terms.map((term, i) => {
                              const id = `vocab-${cat}-${i}`;
                              return (
                                <div key={id} className="rounded-lg p-3 cursor-pointer" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}>
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold font-mono">{term.t}</h4>
                                    {expandedItems.has(id) ? <ChevronDown className="w-3 h-3" style={{ color: "#4b5563" }} /> : <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}
                                  </div>
                                  <AnimatePresence>
                                    {expandedItems.has(id) && (
                                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="mt-2 pt-2 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                                          <p className="text-[11px]" style={{ color: "#A1A1AA" }}>{term.d}</p>
                                          <p className="text-[10px]" style={{ color: "#6B7280" }}>💡 {term.tip}</p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Quality Score ── */}
                {activeSubTab.validate === "Quality Score" && (
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-lg font-bold mb-2">AI Quality Scoring</h2>
                    <p className="text-xs mb-4" style={{ color: "#A1A1AA" }}>Enter a prompt to get AI-powered quality analysis across 4 dimensions.</p>
                    <div className="rounded-xl overflow-hidden mb-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <textarea
                        value={qaInput}
                        onChange={(e) => setQaInput(e.target.value)}
                        placeholder="Paste your prompt here to analyze..."
                        rows={5}
                        className="w-full bg-transparent text-sm p-4 outline-none resize-none"
                        style={{ color: "#e2e8f0", fontFamily: "monospace" }}
                      />
                    </div>
                    <button
                      onClick={handleQualityScore}
                      disabled={qaLoading || !qaInput.trim()}
                      className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                      style={{ background: `${zoneColor}18`, color: zoneColor, border: `1px solid ${zoneColor}44` }}
                    >
                      {qaLoading ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" /> Analyzing...</> : "Analyze Prompt"}
                    </button>
                    <AnimatePresence>
                      {qaResult && (
                        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-xl p-6" style={{ background: "#14161A", border: `1px solid ${zoneColor}22` }}>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                            {(["clarity", "specificity", "structure", "actionability"] as const).map((dim) => {
                              const score = qaResult.scores[dim];
                              const pct = score * 10;
                              const color = score >= 8 ? "#22c55e" : score >= 5 ? "#eab308" : "#ef4444";
                              return (
                                <div key={dim} className="text-center">
                                  <div className="text-2xl font-bold mb-1" style={{ color }}>{score}</div>
                                  <div className="w-full h-1.5 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.07)" }}>
                                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                                  </div>
                                  <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#6B7280" }}>{dim}</div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="text-xs leading-relaxed" style={{ color: "#A1A1AA" }}>
                            <span className="font-bold" style={{ color: zoneColor }}>Feedback:</span> {qaResult.feedback}
                          </div>
                          <div className="mt-3 text-[10px] font-mono" style={{ color: "#4b5563" }}>
                            Overall: {((qaResult.scores.clarity + qaResult.scores.specificity + qaResult.scores.structure + qaResult.scores.actionability) / 4).toFixed(1)} / 10
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}

            {/* ═══════════════════════ ZONE: PLAYBOOK ═══════════════════════ */}
            {activeZone === "playbook" && (
              <>
                {/* ── Workflows ── */}
                {activeSubTab.playbook === "Workflows" && (
                  <div>
                    <div className="mb-4 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#4b5563" }} />
                      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search workflows..." className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)", color: "#FFFFFF" }} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredWorkflows.map((wf, i) => (
                        <div key={i} className="rounded-xl p-4 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div className="text-[10px] font-mono mb-1" style={{ color: zoneColor }}>{wf.cat}</div>
                          <h3 className="text-sm font-bold mb-1">{wf.title}</h3>
                          <p className="text-xs mb-2" style={{ color: "#A1A1AA" }}>{wf.purpose}</p>
                          <p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {wf.best}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Animal Chains ── */}
                {activeSubTab.playbook === "Animal Chains" && (
                  <div className="space-y-3 max-w-3xl">
                    {CHAINS.map((chain, i) => (
                      <div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <h3 className="text-sm font-bold mb-2">{chain.goal}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          {chain.c.map((name, j) => {
                            const emoji = ANIMAL_EMOJIS[name] || "🐾";
                            const color = ANIMAL_COLORS[name] || "#4DFFFF";
                            return (
                              <div key={j} className="flex items-center gap-2">
                                <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs" style={{ background: `${color}12`, color }}>
                                  {emoji} {name}
                                </span>
                                {j < chain.c.length - 1 && <ChevronRight className="w-3 h-3" style={{ color: "#4b5563" }} />}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {chain.best}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Design Combos ── */}
                {activeSubTab.playbook === "Design Combos" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {COMBOS.map((combo, i) => {
                      const id = `combo-${i}`;
                      return (
                        <div key={id} className="rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }} onClick={() => toggleExpand(id)}>
                          <h3 className="text-sm font-bold mb-1">{combo.combo}</h3>
                          <p className="text-[10px] mb-1" style={{ color: "#A1A1AA" }}>Elements: {combo.els}</p>
                          <p className="text-[10px]" style={{ color: "#6B7280" }}>Best for: {combo.best}</p>
                          <AnimatePresence>
                            {expandedItems.has(id) && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <p className="text-[10px] mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: zoneColor }}>🧠 {combo.psych}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── Typography ── */}
                {activeSubTab.playbook === "Typography" && (
                  <div className="max-w-3xl space-y-6">
                    <div>
                      <h3 className="text-sm font-bold mb-3">Display + Mono Pairings</h3>
                      <div className="space-y-2">
                        {TYPO.map((pair, i) => (
                          <div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="flex items-baseline gap-3 mb-1">
                              <span className="text-lg font-bold" style={{ color: zoneColor }}>{pair.d}</span>
                              <span className="text-xs" style={{ color: "#6B7280" }}>+ {pair.m}</span>
                            </div>
                            <p className="text-[10px]" style={{ color: "#A1A1AA" }}>{pair.b}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold mb-3">Use-Case Recommendations</h3>
                      <div className="space-y-2">
                        {TYPO_USECASES.map((uc, i) => (
                          <div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="text-xs font-bold mb-1" style={{ color: zoneColor }}>{uc.u}</div>
                            <p className="text-[11px]" style={{ color: "#A1A1AA" }}>{uc.c}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ═══════════════════════ ZONE: MONETIZE ═══════════════════════ */}
            {activeZone === "monetize" && (
              <>
                {/* ── Top Prompts ── */}
                {activeSubTab.monetize === "Top Prompts" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MONETIZE_TOP_PROMPTS.map((item, i) => {
                      const id = `mon-top-${i}`;
                      return (
                        <div key={id} className="rounded-xl p-4 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.cat}</span>
                          </div>
                          <h3 className="text-sm font-bold mb-2">{item.label}</h3>
                          <p className="text-[11px]" style={{ color: "#A1A1AA" }}>{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── SaaS Templates ── */}
                {activeSubTab.monetize === "SaaS Templates" && (
                  <div className="space-y-3">
                    {MONETIZE_SAAS.map((item, i) => (
                      <div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <h3 className="text-sm font-bold mb-1">{item.label}</h3>
                        <p className="text-xs mb-2" style={{ color: "#A1A1AA" }}>{item.desc}</p>
                        <p className="text-[10px] font-mono" style={{ color: zoneColor }}>Stack: {item.stack}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Stacks ── */}
                {activeSubTab.monetize === "Stacks" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MONETIZE_STACKS.map((item, i) => (
                      <div key={i} className="rounded-xl p-5 transition-all hover:-translate-y-0.5" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <h3 className="text-sm font-bold mb-2">{item.label}</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-mono" style={{ color: zoneColor }}>{item.time}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.income}</span>
                        </div>
                        <p className="text-xs" style={{ color: "#A1A1AA" }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── AI Tools ── */}
                {activeSubTab.monetize === "AI Tools" && (
                  <div className="space-y-3">
                    {MONETIZE_AI_TOOLS.map((item, i) => (
                      <div key={i} className="rounded-xl p-4" style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-bold">{item.label}</h3>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: `${zoneColor}15`, color: zoneColor }}>{item.cat}</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280" }}>{item.tier}</span>
                        </div>
                        <p className="text-xs" style={{ color: "#A1A1AA" }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── Footer ─── */}
      <footer className="mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs" style={{ color: "#4b5563" }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>promptc OS — AI Prompt Engineering Operating System</span>
          </div>
          <p className="text-xs" style={{ color: "#4b5563" }}>Powered by AI · Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
