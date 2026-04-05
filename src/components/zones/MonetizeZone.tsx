"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TOP10_PROMPTS, SAAS_TEMPLATES, MONETIZE_FW, DEPLOY_STACKS, TOOL_MATRIX } from "@/lib/data";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Pill } from "@/components/shared/Pill";
import { useStore } from "@/lib/store";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

const SUB_TABS = ["Top 10 Prompts", "SaaS Templates", "Frameworks", "Deploy Stacks", "Tool Matrix"];

export function MonetizeZone() {
  const [tab, setTab] = useState("Top 10 Prompts");
  const [expandedTop, setExpandedTop] = useState<number | null>(null);
  const [expandedSaaS, setExpandedSaaS] = useState<number | null>(null);
  const [expandedFW, setExpandedFW] = useState<string | null>(null);
  const [expandedDeploy, setExpandedDeploy] = useState<string | null>(null);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFav = useStore((s) => s.isFavorite);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 rounded-full" style={{ background: "#FFD700" }} />
        <h2 className="text-2xl font-display tracking-wide" style={{ color: "#FFD700" }}>MONETIZE</h2>
        <span className="text-xs" style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>Profitable prompts</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {SUB_TABS.map((t) => (
          <Pill key={t} active={tab === t} color="#FFD700" onClick={() => setTab(t)}>
            {t}
          </Pill>
        ))}
      </div>

      {/* Top 10 */}
      {tab === "Top 10 Prompts" && (
        <div className="space-y-3 animate-fade-slide-in">
          <SectionLabel color="#FFD700">TOP 10 MOST PROFITABLE AI PROMPT PRODUCTS</SectionLabel>
          {TOP10_PROMPTS.map((p) => (
            <ZoneCard key={p.rank} accent="#FFD700" className="card-hover">
              <button
                className="w-full flex items-start justify-between"
                onClick={() => setExpandedTop(expandedTop === p.rank ? null : p.rank)}
              >
                <div className="flex items-start gap-3 text-left">
                  <span className="text-lg font-display" style={{ color: "#FFD700" }}>#{p.rank}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "#FFD700" }}>{p.cat}</span>
                      <span className="text-[10px]" style={{ color: "#6b7280" }}>{p.searches}</span>
                    </div>
                    <h3 className="text-sm font-semibold" style={{ color: "#fff" }}>{p.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>{p.why}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(`top-${p.rank}`); }} style={{ color: isFav(`top-${p.rank}`) ? "#FFB000" : "#6b7280" }}>
                    <Star size={14} fill={isFav(`top-${p.rank}`) ? "#FFB000" : "none"} />
                  </button>
                  {expandedTop === p.rank ? <ChevronUp size={16} style={{ color: "#6b7280" }} /> : <ChevronDown size={16} style={{ color: "#6b7280" }} />}
                </div>
              </button>

              {expandedTop === p.rank && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="px-3 py-2 rounded" style={{ background: "rgba(34,197,94,0.06)" }}>
                      <span className="text-[10px] block mb-1" style={{ color: "#22c55e" }}>Pros</span>
                      {p.pros.map((pro, i) => <p key={i} className="text-xs" style={{ color: "#d4d4d8" }}>+ {pro}</p>)}
                    </div>
                    <div className="px-3 py-2 rounded" style={{ background: "rgba(239,68,68,0.06)" }}>
                      <span className="text-[10px] block mb-1" style={{ color: "#ef4444" }}>Cons</span>
                      {p.cons.map((con, i) => <p key={i} className="text-xs" style={{ color: "#d4d4d8" }}>− {con}</p>)}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-xs" style={{ color: "#6b7280" }}>Difficulty: <span style={{ color: "#FFD700" }}>{p.difficulty}</span></span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>Strategy: <span style={{ color: "#a1a1aa" }}>{p.monetize}</span></span>
                  </div>
                  <CodeBlock code={p.prompt} id={`top-${p.rank}`} zone="monetize" label={p.title} maxHeight="max-h-72" />
                </motion.div>
              )}
            </ZoneCard>
          ))}
        </div>
      )}

      {/* SaaS Templates */}
      {tab === "SaaS Templates" && (
        <div className="space-y-3 animate-fade-slide-in">
          <SectionLabel color="#FFD700">SaaS STARTER TEMPLATES</SectionLabel>
          {SAAS_TEMPLATES.map((s) => (
            <ZoneCard key={s.rank} accent="#FFD700" className="card-hover">
              <button
                className="w-full flex items-start justify-between"
                onClick={() => setExpandedSaaS(expandedSaaS === s.rank ? null : s.rank)}
              >
                <div className="text-left">
                  <span className="text-xs font-display" style={{ color: "#FFD700" }}>#{s.rank}</span>
                  <h3 className="text-sm font-semibold" style={{ color: "#fff" }}>{s.title}</h3>
                  <p className="text-xs" style={{ color: "#a1a1aa" }}>{s.niche} · {s.mrr}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#6b7280" }}>Stack: {s.stack}</p>
                </div>
                {expandedSaaS === s.rank ? <ChevronUp size={16} style={{ color: "#6b7280" }} /> : <ChevronDown size={16} style={{ color: "#6b7280" }} />}
              </button>
              {expandedSaaS === s.rank && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
                  <p className="text-xs mb-3" style={{ color: "#FFD700" }}>{s.why}</p>
                  <CodeBlock code={s.prompt} id={`saas-${s.rank}`} zone="monetize" label={s.title} maxHeight="max-h-72" />
                </motion.div>
              )}
            </ZoneCard>
          ))}
        </div>
      )}

      {/* Frameworks */}
      {tab === "Frameworks" && (
        <div className="space-y-3 animate-fade-slide-in">
          <SectionLabel color="#FFD700">INCOME FRAMEWORKS</SectionLabel>
          {MONETIZE_FW.map((fw) => (
            <ZoneCard key={fw.id} accent="#FFD700" className="card-hover">
              <button className="w-full flex items-start justify-between" onClick={() => setExpandedFW(expandedFW === fw.id ? null : fw.id)}>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold" style={{ color: "#FFD700" }}>{fw.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,215,0,0.1)", color: "#FFD700" }}>{fw.timeframe}</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "#a1a1aa" }}>{fw.desc}</p>
                  <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>{fw.income}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(`fw-${fw.id}`); }} style={{ color: isFav(`fw-${fw.id}`) ? "#FFB000" : "#6b7280" }}>
                    <Star size={14} fill={isFav(`fw-${fw.id}`) ? "#FFB000" : "none"} />
                  </button>
                  {expandedFW === fw.id ? <ChevronUp size={16} style={{ color: "#6b7280" }} /> : <ChevronDown size={16} style={{ color: "#6b7280" }} />}
                </div>
              </button>
              {expandedFW === fw.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-3">
                  <ol className="space-y-2">
                    {fw.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-xs font-mono flex-shrink-0" style={{ color: "#FFD700" }}>{i + 1}.</span>
                        <span className="text-xs" style={{ color: "#d4d4d8" }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <CodeBlock code={fw.prompt} id={`fw-${fw.id}`} zone="monetize" label={fw.label} maxHeight="max-h-72" />
                </motion.div>
              )}
            </ZoneCard>
          ))}
        </div>
      )}

      {/* Deploy Stacks */}
      {tab === "Deploy Stacks" && (
        <div className="space-y-3 animate-fade-slide-in">
          <SectionLabel color="#FFD700">FREE DEPLOY STACKS</SectionLabel>
          {DEPLOY_STACKS.map((ds) => (
            <ZoneCard key={ds.id} accent="#FFD700" className="card-hover">
              <button className="w-full flex items-start justify-between" onClick={() => setExpandedDeploy(expandedDeploy === ds.id ? null : ds.id)}>
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold" style={{ color: "#FFD700" }}>{ds.label}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>{ds.tier}</span>
                  </div>
                  <p className="text-xs" style={{ color: "#a1a1aa" }}>{ds.type} · Best: {ds.best}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ds.tech.map((t, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#6b7280" }}>{t}</span>
                    ))}
                  </div>
                </div>
                {expandedDeploy === ds.id ? <ChevronUp size={16} style={{ color: "#6b7280" }} /> : <ChevronDown size={16} style={{ color: "#6b7280" }} />}
              </button>
              {expandedDeploy === ds.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span style={{ color: "#6b7280" }}>Limits:</span> <span style={{ color: "#a1a1aa" }}>{ds.limits}</span></div>
                    <div><span style={{ color: "#6b7280" }}>Strength:</span> <span style={{ color: "#22c55e" }}>{ds.strength}</span></div>
                    <div className="col-span-2"><span style={{ color: "#6b7280" }}>Weakness:</span> <span style={{ color: "#ef4444" }}>{ds.weakness}</span></div>
                  </div>
                  <CodeBlock code={ds.prompt} id={`deploy-${ds.id}`} zone="monetize" label={ds.label} maxHeight="max-h-64" />
                </motion.div>
              )}
            </ZoneCard>
          ))}
        </div>
      )}

      {/* Tool Matrix */}
      {tab === "Tool Matrix" && (
        <div className="space-y-4 animate-fade-slide-in">
          <SectionLabel color="#FFD700">TOOL COMPARISON MATRIX</SectionLabel>
          {TOOL_MATRIX.map((cat) => (
            <div key={cat.cat} className="space-y-2">
              <h3 className="text-xs font-semibold" style={{ color: "#FFD700", fontFamily: "'DM Mono', monospace" }}>{cat.cat.toUpperCase()}</h3>
              {cat.items.map((tool) => (
                <ZoneCard key={tool.id} accent="#FFD700" className="card-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold" style={{ color: "#fff" }}>{tool.label}</h4>
                        {tool.free && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}>FREE</span>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: "#22c55e" }}>{tool.strength}</p>
                      <p className="text-xs" style={{ color: "#ef4444" }}>{tool.weakness}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {tool.deploy.map((d, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#a1a1aa" }}>{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ZoneCard>
              ))}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
