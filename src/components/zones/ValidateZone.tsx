"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LINT, SWAPS, CHECKS, SDIMS, SSCALE, AESTHETIC_KEYWORDS } from "@/lib/data";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Pill } from "@/components/shared/Pill";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { useStore } from "@/lib/store";
import { Star, CheckCircle2, Circle } from "lucide-react";

const SUB_TABS = ["Lint Rules", "Word Swaps", "Quality Checklist", "Prompt Scoring"];

export function ValidateZone() {
  const [tab, setTab] = useState("Lint Rules");
  const [swapLevel, setSwapLevel] = useState("all");
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [scores, setScores] = useState<Record<string, number>>({
    Clarity: 5, Structure: 5, Constraints: 5, Predictability: 5,
  });
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFav = useStore((s) => s.isFavorite);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalChecks = CHECKS.reduce((sum, g) => sum + g.items.length, 0);
  const progress = totalChecks > 0 ? Math.round((checkedItems.size / totalChecks) * 100) : 0;
  const avgScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 4);

  const getScale = () => {
    if (avgScore >= 9) return SSCALE[0];
    if (avgScore >= 7) return SSCALE[1];
    if (avgScore >= 5) return SSCALE[2];
    if (avgScore >= 3) return SSCALE[3];
    return SSCALE[4];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 rounded-full" style={{ background: "#22c55e" }} />
        <h2 className="text-2xl font-display tracking-wide" style={{ color: "#22c55e" }}>VALIDATE</h2>
        <span className="text-xs" style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>Score, lint, refine</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {SUB_TABS.map((t) => (
          <Pill key={t} active={tab === t} color="#22c55e" onClick={() => setTab(t)}>
            {t}
          </Pill>
        ))}
      </div>

      {/* Lint Rules */}
      {tab === "Lint Rules" && (
        <div className="space-y-4 animate-fade-slide-in">
          <SectionLabel color="#22c55e">PROMPT LINT RULES</SectionLabel>
          <div className="space-y-2">
            {LINT.map((l) => (
              <ZoneCard key={l.id} accent="#22c55e" className="card-hover">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: "#fff" }}>{l.check}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded" style={{
                        background: l.auto ? "rgba(34,197,94,0.12)" : "rgba(255,184,0,0.12)",
                        color: l.auto ? "#22c55e" : "#FFB000",
                      }}>
                        {l.auto ? "Auto-fix" : "Manual"}
                      </span>
                      <span className="text-xs" style={{ color: "#6b7280" }}>Fix: {l.fix}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleFavorite(`lint-${l.id}`)} style={{ color: isFav(`lint-${l.id}`) ? "#FFB000" : "#6b7280" }}>
                    <Star size={14} fill={isFav(`lint-${l.id}`) ? "#FFB000" : "none"} />
                  </button>
                </div>
              </ZoneCard>
            ))}
          </div>
        </div>
      )}

      {/* Word Swaps */}
      {tab === "Word Swaps" && (
        <div className="space-y-4 animate-fade-slide-in">
          <SectionLabel color="#22c55e">WORD SWAP DICTIONARY — Replace vague language</SectionLabel>
          <div className="flex gap-2 flex-wrap">
            {["all", "beginner", "misconception", "advanced"].map((l) => (
              <Pill key={l} active={swapLevel === l} color="#22c55e" onClick={() => setSwapLevel(l)}>
                {l === "all" ? "All" : l}
              </Pill>
            ))}
          </div>
          <div className="space-y-2">
            {SWAPS.filter((s) => swapLevel === "all" || s.level === swapLevel).map((s, i) => (
              <ZoneCard key={i} accent="#22c55e" className="card-hover">
                <div className="flex items-center gap-3">
                  <span className="text-sm line-through" style={{ color: "#ef4444", fontFamily: "'DM Mono', monospace" }}>
                    {s.bad}
                  </span>
                  <span style={{ color: "#6b7280" }}>→</span>
                  <span className="text-sm flex-1" style={{ color: "#22c55e", fontFamily: "'DM Mono', monospace" }}>
                    {s.good}
                  </span>
                  {s.isAesthetic && (
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,184,0,0.12)", color: "#FFB000" }}>
                      see vocab
                    </span>
                  )}
                </div>
              </ZoneCard>
            ))}
          </div>

          <SectionLabel color="#22c55e" className="mt-6">AESTHETIC KEYWORDS</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {AESTHETIC_KEYWORDS.map((kw, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded text-xs cursor-pointer transition-colors hover:scale-105"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  color: "#22c55e",
                  fontFamily: "'DM Mono', monospace",
                }}
                onClick={() => navigator.clipboard.writeText(kw)}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quality Checklist */}
      {tab === "Quality Checklist" && (
        <div className="space-y-4 animate-fade-slide-in">
          <div className="flex items-center justify-between">
            <SectionLabel color="#22c55e">QUALITY CHECKLIST</SectionLabel>
            <span className="text-sm font-mono" style={{ color: "#22c55e" }}>{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "#22c55e" }} />
          </div>
          {CHECKS.map((group, gi) => (
            <ZoneCard key={gi} accent="#22c55e">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "#22c55e" }}>{group.lbl}</h3>
              <div className="space-y-2">
                {group.items.map((item, ii) => {
                  const id = `${gi}-${ii}`;
                  const checked = checkedItems.has(id);
                  return (
                    <button
                      key={ii}
                      className="flex items-start gap-2 w-full text-left"
                      onClick={() => toggleCheck(id)}
                    >
                      {checked ? (
                        <CheckCircle2 size={16} style={{ color: "#22c55e", marginTop: "2px", flexShrink: 0 }} />
                      ) : (
                        <Circle size={16} style={{ color: "#6b7280", marginTop: "2px", flexShrink: 0 }} />
                      )}
                      <span className="text-sm" style={{ color: checked ? "#22c55e" : "#a1a1aa", transition: "color 0.2s" }}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </ZoneCard>
          ))}
        </div>
      )}

      {/* Prompt Scoring */}
      {tab === "Prompt Scoring" && (
        <div className="space-y-4 animate-fade-slide-in">
          <SectionLabel color="#22c55e">PROMPT QUALITY SCORER</SectionLabel>
          <p className="text-xs" style={{ color: "#a1a1aa" }}>Rate your prompt on each dimension (1-10)</p>
          {SDIMS.map((dim) => (
            <ZoneCard key={dim.name} accent="#22c55e">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "#fff" }}>{dim.name}</h3>
                  <p className="text-xs" style={{ color: "#6b7280" }}>{dim.what}</p>
                </div>
                <span className="text-lg font-display" style={{ color: scores[dim.name] >= 7 ? "#22c55e" : scores[dim.name] >= 5 ? "#FFB000" : "#ef4444" }}>
                  {scores[dim.name]}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={scores[dim.name]}
                onChange={(e) => setScores((s) => ({ ...s, [dim.name]: parseInt(e.target.value) }))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(scores[dim.name] / 10) * 100}%, rgba(255,255,255,0.1) ${(scores[dim.name] / 10) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
            </ZoneCard>
          ))}

          {/* Score Summary */}
          <ZoneCard accent={getScale().col}>
            <div className="text-center">
              <p className="text-xs mb-1" style={{ color: "#6b7280" }}>Average Score</p>
              <p className="text-4xl font-display" style={{ color: getScale().col }}>{avgScore}/10</p>
              <p className="text-sm mt-1" style={{ color: "#fff" }}>{getScale().level}</p>
              <p className="text-xs mt-1" style={{ color: getScale().col }}>{getScale().action}</p>
            </div>
          </ZoneCard>

          <SectionLabel color="#22c55e" className="mt-4">SCORING SCALE</SectionLabel>
          {SSCALE.map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.02)" }}>
              <span className="text-xs font-mono w-12" style={{ color: "#6b7280" }}>{s.r}</span>
              <div className="w-2 h-2 rounded-full" style={{ background: s.col }} />
              <span className="text-xs" style={{ color: "#a1a1aa" }}>{s.level}</span>
              <span className="text-xs ml-auto" style={{ color: s.col }}>{s.action}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
