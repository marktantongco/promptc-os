"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ANIMALS, AC, AE, CHAINS,
  LAYERS, LAYER_TPL, LAYER_SNIPS,
  ENH, ENH_HOWTO,
  WEB_VARS, DOLPHIN_C,
  JSON_GLOBAL, JSON_T, JSON_MX,
  VOCAB, COMBOS, TYPO, TYPO_I,
} from "@/lib/data";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Pill } from "@/components/shared/Pill";
import { useStore } from "@/lib/store";
import { Star } from "lucide-react";

const SUB_TABS = ["Animals", "8-Layers", "Enhancement", "WebApp Gen", "JSON", "Typography", "Vocab"];

export function BuildZone() {
  const [tab, setTab] = useState("Animals");
  const [expandedVocab, setExpandedVocab] = useState<string | null>(null);
  const [vocabFilter, setVocabFilter] = useState("all");
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
        <div className="w-1 h-6 rounded-full" style={{ background: "#FF6B00" }} />
        <h2 className="text-2xl font-display tracking-wide" style={{ color: "#FF6B00" }}>BUILD</h2>
        <span className="text-xs" style={{ color: "#6b7280", fontFamily: "'DM Mono', monospace" }}>Reference library</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {SUB_TABS.map((t) => (
          <Pill key={t} active={tab === t} color="#FF6B00" onClick={() => setTab(t)}>
            {t}
          </Pill>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Animals */}
        {tab === "Animals" && (
          <motion.div key="animals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <SectionLabel color="#FF6B00">ANIMAL MODES — Different AI thinking styles</SectionLabel>
            <div className="zone-grid">
              {ANIMALS.map((a) => (
                <ZoneCard key={a.name} accent={AC[a.name]} className="card-hover">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{a.emoji}</span>
                      <div>
                        <h3 className="text-sm font-semibold" style={{ color: AC[a.name] }}>{a.name}</h3>
                        <p className="text-[10px]" style={{ color: "#a1a1aa" }}>{a.mode}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleFavorite(`animal-${a.name}`)} style={{ color: isFav(`animal-${a.name}`) ? "#FFB000" : "#6b7280" }}>
                      <Star size={14} fill={isFav(`animal-${a.name}`) ? "#FFB000" : "none"} />
                    </button>
                  </div>
                  <CodeBlock code={a.prompt} id={`animal-${a.name}`} zone="build" label={`${a.name} Mode`} maxHeight="max-h-48" />
                </ZoneCard>
              ))}
            </div>

            <SectionLabel color="#FF6B00" className="mt-6">RECOMMENDED CHAINS</SectionLabel>
            {CHAINS.map((ch, i) => (
              <ZoneCard key={i} accent="#FF6B00" className="card-hover">
                <h4 className="text-sm font-semibold mb-1" style={{ color: "#fff" }}>{ch.goal}</h4>
                <div className="flex items-center gap-2 mb-1">
                  {ch.c.map((a, j) => (
                    <span key={j} className="flex items-center gap-1">
                      <span style={{ color: AC[a] }}>{AE[a]}</span>
                      {j < ch.c.length - 1 && <span style={{ color: "#6b7280" }}>→</span>}
                    </span>
                  ))}
                </div>
                <p className="text-xs" style={{ color: "#a1a1aa" }}>Best for: {ch.best}</p>
              </ZoneCard>
            ))}
          </motion.div>
        )}

        {/* 8-Layers */}
        {tab === "8-Layers" && (
          <motion.div key="layers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <SectionLabel color="#FF6B00">8-LAYER PROMPT FRAMEWORK</SectionLabel>
            <div className="space-y-2">
              {LAYERS.map((l, i) => (
                <ZoneCard key={l.n} accent="#FF6B00" className="card-hover">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-display" style={{ color: "#FF6B00" }}>{l.n}</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold" style={{ color: "#fff" }}>{l.name}</h3>
                      <p className="text-xs" style={{ color: "#a1a1aa" }}>{l.pur}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,107,0,0.1)", color: "#FF6B00" }}>
                      {l.miss}
                    </span>
                  </div>
                </ZoneCard>
              ))}
            </div>

            <SectionLabel color="#FF6B00" className="mt-6">FULL TEMPLATE</SectionLabel>
            <CodeBlock code={LAYER_TPL} id="layer-tpl" zone="build" label="8-Layer Template" />

            <SectionLabel color="#FF6B00" className="mt-6">LAYER SNIPPETS — Quick inserts</SectionLabel>
            {LAYER_SNIPS.map((s, i) => (
              <ZoneCard key={i} accent="#FF6B00" className="card-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono" style={{ color: "#FF6B00" }}>Layer {i + 1}</span>
                  <CodeBlock code={s} id={`snip-${i}`} zone="build" label={`Layer ${i + 1} Snippet`} />
                </div>
              </ZoneCard>
            ))}
          </motion.div>
        )}

        {/* Enhancement */}
        {tab === "Enhancement" && (
          <motion.div key="enh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <SectionLabel color="#FF6B00">ENHANCEMENT TECHNIQUES</SectionLabel>
            {ENH.map((e, i) => (
              <ZoneCard key={i} accent="#FF6B00" className="card-hover">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold" style={{ color: "#FF6B00" }}>{e.label}</h3>
                  <button onClick={() => toggleFavorite(`enh-${i}`)} style={{ color: isFav(`enh-${i}`) ? "#FFB000" : "#6b7280" }}>
                    <Star size={14} fill={isFav(`enh-${i}`) ? "#FFB000" : "none"} />
                  </button>
                </div>
                <CodeBlock code={e.content} id={`enh-${i}`} zone="build" label={e.label} />
              </ZoneCard>
            ))}

            <SectionLabel color="#FF6B00" className="mt-6">HOW-TO GUIDES</SectionLabel>
            {ENH_HOWTO.map((h, i) => (
              <ZoneCard key={i} accent="#FF6B00">
                <CodeBlock code={h} id={`howto-${i}`} zone="build" maxHeight="max-h-72" />
              </ZoneCard>
            ))}
          </motion.div>
        )}

        {/* WebApp Gen */}
        {tab === "WebApp Gen" && (
          <motion.div key="webapp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <SectionLabel color="#FF6B00">WEB APP PERSONA VARIABLES</SectionLabel>
            <div className="zone-grid">
              {WEB_VARS.map((v) => (
                <ZoneCard key={v.id} accent="#FF6B00" className="card-hover">
                  <h3 className="text-xs font-semibold mb-1" style={{ color: "#FF6B00", fontFamily: "'DM Mono', monospace" }}>{v.label}</h3>
                  <p className="text-xs" style={{ color: "#a1a1aa" }}>{v.desc}</p>
                </ZoneCard>
              ))}
            </div>

            <SectionLabel color="#FF6B00" className="mt-6">DOLPHIN CREATIVE CONCEPTS</SectionLabel>
            <div className="space-y-2">
              {DOLPHIN_C.map((c, i) => (
                <ZoneCard key={i} accent="#FF6B00" className="card-hover">
                  <div className="flex items-center justify-between">
                    <p className="text-sm" style={{ color: "#fff" }}>{c}</p>
                    <CodeBlock code={c} id={`dolphin-${i}`} zone="build" label={c} />
                  </div>
                </ZoneCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* JSON */}
        {tab === "JSON" && (
          <motion.div key="json" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <SectionLabel color="#FF6B00">JSON OUTPUT RULES</SectionLabel>
            <CodeBlock code={JSON_GLOBAL} id="json-global" zone="build" label="JSON Global Rules" />

            <SectionLabel color="#FF6B00" className="mt-6">TECHNIQUES</SectionLabel>
            {JSON_T.map((t) => (
              <ZoneCard key={t.id} accent={t.color} className="card-hover">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: t.color }}>{t.label}</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: t.color + "18", color: t.color }}>{t.badge}</span>
                      <span className="text-[10px]" style={{ color: "#6b7280" }}>{t.when}</span>
                    </div>
                  </div>
                  <CodeBlock code={t.content} id={`json-${t.id}`} zone="build" label={t.label} />
                </div>
              </ZoneCard>
            ))}

            <SectionLabel color="#FF6B00" className="mt-6">MIX RECOMMENDATIONS</SectionLabel>
            {JSON_MX.map((m, i) => (
              <ZoneCard key={i} accent="#FF6B00">
                <p className="text-sm font-medium" style={{ color: "#fff" }}>{m.sit}</p>
                <p className="text-xs" style={{ color: "#FF6B00" }}>{m.use}</p>
              </ZoneCard>
            ))}
          </motion.div>
        )}

        {/* Typography */}
        {tab === "Typography" && (
          <motion.div key="typo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <SectionLabel color="#FF6B00">TYPOGRAPHY PAIRINGS</SectionLabel>
            {TYPO.map((t, i) => (
              <ZoneCard key={i} accent="#FF6B00" className="card-hover">
                <h3 className="text-sm font-semibold mb-1" style={{ color: "#FF6B00" }}>{t.d} + {t.m}</h3>
                <p className="text-xs" style={{ color: "#a1a1aa" }}>Best for: {t.b}</p>
              </ZoneCard>
            ))}

            <SectionLabel color="#FF6B00" className="mt-6">INSPIRATION COMBOS</SectionLabel>
            {TYPO_I.map((t, i) => (
              <ZoneCard key={i} accent="#FF6B00">
                <p className="text-xs font-semibold mb-1" style={{ color: "#fff" }}>{t.u}</p>
                <p className="text-xs" style={{ color: "#a1a1aa" }}>{t.c}</p>
              </ZoneCard>
            ))}
          </motion.div>
        )}

        {/* Vocab */}
        {tab === "Vocab" && (
          <motion.div key="vocab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <SectionLabel color="#FF6B00">DESIGN VOCABULARY</SectionLabel>
            <div className="flex gap-2 flex-wrap">
              {["all", "core", "motion", "adv"].map((f) => (
                <Pill key={f} active={vocabFilter === f} color="#FF6B00" onClick={() => setVocabFilter(f)}>
                  {f === "all" ? "All" : f === "adv" ? "Advanced" : f}
                </Pill>
              ))}
            </div>
            <div className="zone-grid">
              {VOCAB.filter((v) => vocabFilter === "all" || v.cat === vocabFilter).map((v, i) => (
                <ZoneCard key={i} accent="#FF6B00" className="card-hover">
                  <div className="flex items-center justify-between">
                    <button className="text-left" onClick={() => setExpandedVocab(expandedVocab === v.t ? null : v.t)}>
                      <h3 className="text-sm font-semibold" style={{ color: "#FF6B00", fontFamily: "'DM Mono', monospace" }}>{v.t}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>{v.d}</p>
                    </button>
                    <button onClick={() => toggleFavorite(`vocab-${v.t}`)} style={{ color: isFav(`vocab-${v.t}`) ? "#FFB000" : "#6b7280" }}>
                      <Star size={14} fill={isFav(`vocab-${v.t}`) ? "#FFB000" : "none"} />
                    </button>
                  </div>
                </ZoneCard>
              ))}
            </div>

            <SectionLabel color="#FF6B00" className="mt-6">COMBOS</SectionLabel>
            {COMBOS.map((c, i) => (
              <ZoneCard key={i} accent="#FF6B00" className="card-hover">
                <h4 className="text-sm font-semibold mb-1" style={{ color: "#fff" }}>{c.combo}</h4>
                <p className="text-xs" style={{ color: "#a1a1aa" }}>Elements: {c.els}</p>
                <p className="text-xs" style={{ color: "#FF6B00" }}>Best for: {c.best}</p>
                <p className="text-xs" style={{ color: "#6b7280" }}>Psych: {c.psych}</p>
              </ZoneCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
