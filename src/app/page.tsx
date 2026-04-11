"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Copy,
  Check,
  Trash2,
  RotateCcw,
  Loader2,
  Zap,
  Target,
  Wrench,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

/* ─── Types ─── */
interface ResultState {
  content: string | null;
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

/* ─── Meta Prompt Config ─── */
const META_PROMPTS = [
  {
    id: 1 as const,
    title: "Quick Critique",
    description:
      "Get a fast clarity & relevance rating with 5 specific improvements and two refined prompt variants.",
    icon: Zap,
    accent: "#3b82f6",
    accentBg: "rgba(59, 130, 246, 0.08)",
    accentBorder: "rgba(59, 130, 246, 0.25)",
    glowClass: "card-glow-blue",
    badge: "bg-blue-500/20 text-blue-400 ring-blue-500/30",
  },
  {
    id: 2 as const,
    title: "Structured Analysis",
    description:
      "Deep dive with 3 key improvements, 3 wildly different approaches each, and two refined prompts.",
    icon: Target,
    accent: "#8b5cf6",
    accentBg: "rgba(139, 92, 246, 0.08)",
    accentBorder: "rgba(139, 92, 246, 0.25)",
    glowClass: "card-glow-purple",
    badge: "bg-purple-500/20 text-purple-400 ring-purple-500/30",
  },
  {
    id: 3 as const,
    title: "Expert Engineering",
    description:
      "Full expert treatment: precision & strategy variants, self-test, rationale tags, and constraint preservation.",
    icon: Wrench,
    accent: "#06b6d4",
    accentBg: "rgba(6, 182, 212, 0.08)",
    accentBorder: "rgba(6, 182, 212, 0.25)",
    glowClass: "card-glow-teal",
    badge: "bg-cyan-500/20 text-cyan-400 ring-cyan-500/30",
  },
];

/* ─── Component ─── */
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<Record<1 | 2 | 3, ResultState>>({
    1: { content: null, loading: false, error: null, expanded: false },
    2: { content: null, loading: false, error: null, expanded: false },
    3: { content: null, loading: false, error: null, expanded: false },
  });
  const [copiedId, setCopiedId] = useState<1 | 2 | 3 | null>(null);

  const charCount = prompt.length;
  const maxChars = 4000;

  /* ── Generate handler ── */
  const handleGenerate = useCallback(async (metaType: 1 | 2 | 3) => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }

    setResults((prev) => ({
      ...prev,
      [metaType]: { content: null, loading: true, error: null, expanded: true },
    }));

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim(), metaType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed.");
      }

      setResults((prev) => ({
        ...prev,
        [metaType]: {
          content: data.result,
          loading: false,
          error: null,
          expanded: true,
        },
      }));
      toast.success(`${META_PROMPTS[metaType - 1].title} complete!`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setResults((prev) => ({
        ...prev,
        [metaType]: {
          content: null,
          loading: false,
          error: message,
          expanded: true,
        },
      }));
      toast.error(message);
    }
  }, [prompt]);

  /* ── Copy handler ── */
  const handleCopy = useCallback(async (metaType: 1 | 2 | 3) => {
    const content = results[metaType].content;
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(metaType);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  }, [results]);

  /* ── Reset all ── */
  const handleResetAll = useCallback(() => {
    setPrompt("");
    setResults({
      1: { content: null, loading: false, error: null, expanded: false },
      2: { content: null, loading: false, error: null, expanded: false },
      3: { content: null, loading: false, error: null, expanded: false },
    });
    toast.info("Everything cleared.");
  }, []);

  /* ── Toggle expand ── */
  const toggleExpand = useCallback((metaType: 1 | 2 | 3) => {
    setResults((prev) => ({
      ...prev,
      [metaType]: { ...prev[metaType], expanded: !prev[metaType].expanded },
    }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Hero Section ─── */}
      <header className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-12 pb-8 text-center sm:pt-16 sm:pb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              AI-Powered Prompt Engineering
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight gradient-text mb-4">
              Meta Prompt Builder
            </h1>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Transform your prompts with three expert AI methodologies. Analyze,
              critique, and engineer prompts that deliver precise, consistent
              results.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pb-16">
        {/* ── Input Section ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 mb-10"
        >
          <div className="relative">
            <div
              className="rounded-xl border border-white/10 bg-[#111118] overflow-hidden"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Your Prompt
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs tabular-nums ${
                      charCount > maxChars
                        ? "text-red-400"
                        : charCount > maxChars * 0.8
                        ? "text-amber-400"
                        : "text-slate-500"
                    }`}
                  >
                    {charCount.toLocaleString()}/{maxChars.toLocaleString()}
                  </span>
                  {prompt && (
                    <button
                      onClick={() => setPrompt("")}
                      className="p-1 rounded-md hover:bg-white/10 transition-colors text-slate-500 hover:text-slate-300"
                      aria-label="Clear input"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setPrompt(e.target.value);
                  }
                }}
                placeholder="Paste or type your prompt here... e.g., 'Write a blog post about AI that is engaging and well-structured'"
                className="w-full bg-transparent text-slate-200 placeholder:text-slate-600 p-4 font-mono text-sm leading-relaxed resize-none focus:outline-none"
                rows={6}
                style={{ minHeight: "160px" }}
              />
            </div>
          </div>
        </motion.section>

        {/* ── Reset Button ── */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleResetAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-white/[0.06] hover:border-white/10 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </button>
        </div>

        {/* ── Meta Prompt Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {META_PROMPTS.map((meta, index) => {
            const Icon = meta.icon;
            const state = results[meta.id];

            return (
              <motion.div
                key={meta.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 + index * 0.1 }}
                className={`rounded-xl border ${meta.accentBorder} ${meta.glowClass} overflow-hidden`}
                style={{ background: "#111118" }}
              >
                {/* Card Header */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-lg ring-1 ${meta.badge}`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600 bg-white/[0.04] rounded px-1.5 py-0.5">
                          #{meta.id}
                        </span>
                        <h3 className="text-sm font-semibold text-slate-100 truncate">
                          {meta.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {meta.description}
                  </p>

                  {/* Generate Button */}
                  <button
                    onClick={() => handleGenerate(meta.id)}
                    disabled={state.loading || !prompt.trim()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: state.loading
                        ? "rgba(255,255,255,0.05)"
                        : `${meta.accent}15`,
                      color: state.loading
                        ? "#64748b"
                        : meta.accent,
                      border: `1px solid ${state.loading ? "transparent" : `${meta.accent}30`}`,
                    }}
                  >
                    {state.loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate
                      </>
                    )}
                  </button>
                </div>

                {/* Result Area */}
                <AnimatePresence>
                  {(state.content || state.error || state.loading) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/[0.06]">
                        {/* Result Header */}
                        <button
                          onClick={() => toggleExpand(meta.id)}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.02] transition-colors"
                        >
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {state.error ? "Error" : "Result"}
                          </span>
                          <div className="flex items-center gap-2">
                            {!state.loading && state.content && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(meta.id);
                                }}
                                className="p-1 rounded-md hover:bg-white/10 transition-colors text-slate-500 hover:text-slate-300"
                                aria-label="Copy result"
                              >
                                {copiedId === meta.id ? (
                                  <Check className="w-3.5 h-3.5 text-green-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                            {state.expanded ? (
                              <ChevronUp className="w-3.5 h-3.5 text-slate-600" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                            )}
                          </div>
                        </button>

                        {/* Result Content */}
                        <AnimatePresence>
                          {state.expanded && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-4 pb-4"
                            >
                              {state.loading && (
                                <div className="space-y-3 py-2">
                                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    Analyzing your prompt with {meta.title}...
                                  </div>
                                  {[...Array(4)].map((_, i) => (
                                    <div
                                      key={i}
                                      className="h-3 rounded-full bg-white/[0.04] animate-pulse"
                                      style={{
                                        width: `${70 + Math.random() * 30}%`,
                                        animationDelay: `${i * 0.15}s`,
                                      }}
                                    />
                                  ))}
                                </div>
                              )}

                              {state.error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                  <p className="text-xs text-red-400">
                                    {state.error}
                                  </p>
                                </div>
                              )}

                              {state.content && !state.loading && (
                                <div
                                  className="rounded-lg bg-[#0a0a0f] border border-white/[0.06] p-4 max-h-[600px] overflow-y-auto animate-fade-in"
                                >
                                  <div className="markdown-result text-sm">
                                    <ReactMarkdown>{state.content}</ReactMarkdown>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="mt-auto border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meta Prompt Builder</span>
          </div>
          <p className="text-xs text-slate-600">
            Powered by AI · Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
