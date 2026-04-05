"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { WF, AC, AE } from "@/lib/data";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Pill } from "@/components/shared/Pill";
import { useStore } from "@/lib/store";
import { Star, ChevronDown, ChevronUp, Search } from "lucide-react";

const CATEGORIES = [...new Set(WF.map((w) => w.cat))];

export function PlaybookZone() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFav = useStore((s) => s.isFavorite);

  const filtered = useMemo(() => {
    return WF.filter((w) => {
      const matchCat = catFilter === "All" || w.cat === catFilter;
      const matchSearch = search === "" ||
        w.title.toLowerCase().includes(search.toLowerCase()) ||
        w.purpose.toLowerCase().includes(search.toLowerCase()) ||
        w.cat.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, catFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 rounded-full" style={{ background: "#FFB000" }} />
        <h2 className="text-2xl font-display tracking-wide" style={{ color: "#FFB000" }}>PLAYBOOK</h2>
        <span className="text-xs" style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>19 workflows</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} style={{ color: "#6b7280", position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workflows..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
          style={{
            background: "#14161A",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...CATEGORIES].map((c) => (
          <Pill key={c} active={catFilter === c} color="#FFB000" onClick={() => setCatFilter(c)}>
            {c}
          </Pill>
        ))}
      </div>

      <p className="text-xs" style={{ color: "#6b7280" }}>{filtered.length} workflow{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Workflows */}
      <div className="space-y-3">
        {filtered.map((w) => {
          const isExpanded = expandedId === w.id;
          return (
            <ZoneCard key={w.id} accent="#FFB000" className="card-hover">
              <button
                className="w-full flex items-center justify-between"
                onClick={() => setExpandedId(isExpanded ? null : w.id)}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono" style={{ color: "#6b7280" }}>#{w.id}</span>
                    <span className="text-xs" style={{ color: "#FFB000" }}>{w.cat}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: "#fff" }}>{w.title}</h3>
                    <p className="text-xs" style={{ color: "#a1a1aa" }}>{w.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(`wf-${w.id}`); }} style={{ color: isFav(`wf-${w.id}`) ? "#FFB000" : "#6b7280" }}>
                    <Star size={14} fill={isFav(`wf-${w.id}`) ? "#FFB000" : "none"} />
                  </button>
                  {isExpanded ? <ChevronUp size={16} style={{ color: "#6b7280" }} /> : <ChevronDown size={16} style={{ color: "#6b7280" }} />}
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-3"
                >
                  {/* Chain */}
                  <div className="flex items-center gap-2">
                    <SectionLabel color="#FFB000">CHAIN</SectionLabel>
                    <div className="flex items-center gap-1.5">
                      {w.chain.map((a, j) => (
                        <span key={j} className="flex items-center gap-1">
                          <span style={{ color: AC[a] }}>{AE[a]}</span>
                          <span className="text-xs" style={{ color: AC[a] }}>{a}</span>
                          {j < w.chain.length - 1 && <span style={{ color: "#6b7280" }}>→</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <span className="text-[10px]" style={{ color: "#6b7280" }}>Best for</span>
                      <p className="text-xs" style={{ color: "#fff" }}>{w.best}</p>
                    </div>
                    <div className="px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <span className="text-[10px]" style={{ color: "#6b7280" }}>Output</span>
                      <p className="text-xs" style={{ color: "#a1a1aa" }}>{w.out}</p>
                    </div>
                  </div>

                  {/* Steps */}
                  {w.steps.map((step, si) => (
                    <div key={si} className="pl-3" style={{ borderLeft: `2px solid ${AC[step.a]}30` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ color: AC[step.a] }}>{AE[step.a]}</span>
                        <span className="text-sm font-semibold" style={{ color: AC[step.a] }}>{step.a}</span>
                        <span className="text-xs" style={{ color: "#a1a1aa" }}>— {step.t}</span>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {step.items.map((item, ii) => (
                          <li key={ii} className="text-xs flex items-start gap-2" style={{ color: "#d4d4d8" }}>
                            <span style={{ color: "#6b7280", marginTop: "1px" }}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </ZoneCard>
          );
        })}
      </div>
    </motion.div>
  );
}
