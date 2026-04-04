"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MASTER, ADVOCATE, MODS, TASKS, BRANDS, TMPLS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Pill } from "@/components/shared/Pill";
import { Star, ChevronDown, ChevronUp } from "lucide-react";

const SUB_TABS = ["Master Prompt", "Modifiers", "Task Prompts", "Templates", "Brand Systems"];

export function ActivateZone() {
  const [tab, setTab] = useState("Master Prompt");
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set());
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFav = useStore((s) => s.isFavorite);

  const toggleBrand = (id: string) => {
    setExpandedBrands((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 rounded-full" style={{ background: "#4DFFFF" }} />
        <h2 className="text-2xl font-display tracking-wide" style={{ color: "#4DFFFF" }}>ACTIVATE</h2>
        <span className="text-xs" style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>Copy-paste to AI</span>
      </div>

      {/* Sub-nav tabs */}
      <div className="flex gap-2 flex-wrap">
        {SUB_TABS.map((t) => (
          <Pill key={t} active={tab === t} color="#4DFFFF" onClick={() => setTab(t)}>
            {t}
          </Pill>
        ))}
      </div>

      {/* Master Prompt */}
      {tab === "Master Prompt" && (
        <div className="space-y-4 animate-fade-slide-in">
          <div className="flex items-center justify-between">
            <SectionLabel color="#4DFFFF">SYSTEM PROMPT</SectionLabel>
            <button
              onClick={() => toggleFavorite("master")}
              className="p-1 transition-colors"
              style={{ color: isFav("master") ? "#FFB000" : "#6b7280" }}
              aria-label="Toggle favorite"
            >
              <Star size={16} fill={isFav("master") ? "#FFB000" : "none"} />
            </button>
          </div>
          <CodeBlock code={MASTER} id="master" zone="activate" label="Master System Prompt" />

          <div className="flex items-center justify-between mt-6">
            <SectionLabel color="#4DFFFF">ADVOCATE MODE</SectionLabel>
            <button
              onClick={() => toggleFavorite("advocate")}
              className="p-1 transition-colors"
              style={{ color: isFav("advocate") ? "#FFB000" : "#6b7280" }}
              aria-label="Toggle favorite"
            >
              <Star size={16} fill={isFav("advocate") ? "#FFB000" : "none"} />
            </button>
          </div>
          <CodeBlock code={ADVOCATE} id="advocate" zone="activate" label="Advocate Mode Prompt" />
        </div>
      )}

      {/* Modifiers */}
      {tab === "Modifiers" && (
        <div className="space-y-3 animate-fade-slide-in">
          <SectionLabel color="#4DFFFF">MODIFIERS — Append to any prompt</SectionLabel>
          <div className="zone-grid">
            {MODS.map(([mod, desc], i) => (
              <ZoneCard key={i} accent="#4DFFFF" className="card-hover">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium mb-1 break-words"
                      style={{ color: "#fff", fontFamily: "'DM Mono', monospace" }}
                    >
                      {mod}
                    </p>
                    <p className="text-xs" style={{ color: "#a1a1aa" }}>{desc}</p>
                  </div>
                  <CodeBlock code={mod} id={`mod-${i}`} zone="activate" label={`Modifier: ${mod}`} />
                </div>
              </ZoneCard>
            ))}
          </div>
        </div>
      )}

      {/* Task Prompts */}
      {tab === "Task Prompts" && (
        <div className="space-y-4 animate-fade-slide-in">
          <SectionLabel color="#4DFFFF">TASK PROMPTS — Paste and fill in</SectionLabel>
          {TASKS.map((task, i) => (
            <ZoneCard key={i} accent="#4DFFFF" className="card-hover">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold" style={{ color: "#4DFFFF" }}>{task.label}</h3>
                <button
                  onClick={() => toggleFavorite(`task-${i}`)}
                  style={{ color: isFav(`task-${i}`) ? "#FFB000" : "#6b7280" }}
                  aria-label="Toggle favorite"
                >
                  <Star size={14} fill={isFav(`task-${i}`) ? "#FFB000" : "none"} />
                </button>
              </div>
              <CodeBlock code={task.content} id={`task-${i}`} zone="activate" label={task.label} />
            </ZoneCard>
          ))}
        </div>
      )}

      {/* Templates */}
      {tab === "Templates" && (
        <div className="space-y-4 animate-fade-slide-in">
          <SectionLabel color="#4DFFFF">TEMPLATES — Complete prompt structures</SectionLabel>
          {TMPLS.map((tmpl, i) => (
            <ZoneCard key={i} accent="#4DFFFF" className="card-hover">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "#fff" }}>{tmpl.label}</h3>
                  <p className="text-xs" style={{ color: "#6b7280" }}>{tmpl.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(`tmpl-${i}`)}
                    style={{ color: isFav(`tmpl-${i}`) ? "#FFB000" : "#6b7280" }}
                    aria-label="Toggle favorite"
                  >
                    <Star size={14} fill={isFav(`tmpl-${i}`) ? "#FFB000" : "none"} />
                  </button>
                </div>
              </div>
              <CodeBlock code={tmpl.content} id={`tmpl-${i}`} zone="activate" label={tmpl.label} maxHeight="max-h-64" />
            </ZoneCard>
          ))}
        </div>
      )}

      {/* Brand Systems */}
      {tab === "Brand Systems" && (
        <div className="space-y-4 animate-fade-slide-in">
          <SectionLabel color="#4DFFFF">BRAND SYSTEMS — Complete design system prompts</SectionLabel>
          {BRANDS.map((b) => (
            <ZoneCard key={b.id} accent={b.col} className="card-hover">
              <button
                className="w-full flex items-center justify-between"
                onClick={() => toggleBrand(b.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: b.col }} />
                  <div className="text-left">
                    <h3 className="text-sm font-semibold" style={{ color: b.col }}>{b.label}</h3>
                    <p className="text-xs" style={{ color: "#6b7280" }}>{b.uc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(`brand-${b.id}`); }}
                    style={{ color: isFav(`brand-${b.id}`) ? "#FFB000" : "#6b7280" }}
                    aria-label="Toggle favorite"
                  >
                    <Star size={14} fill={isFav(`brand-${b.id}`) ? "#FFB000" : "none"} />
                  </button>
                  {expandedBrands.has(b.id) ? <ChevronUp size={16} style={{ color: "#6b7280" }} /> : <ChevronDown size={16} style={{ color: "#6b7280" }} />}
                </div>
              </button>
              {expandedBrands.has(b.id) && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3">
                  <CodeBlock code={b.prompt} id={`brand-${b.id}`} zone="activate" label={b.label} />
                </motion.div>
              )}
            </ZoneCard>
          ))}
        </div>
      )}
    </motion.div>
  );
}
