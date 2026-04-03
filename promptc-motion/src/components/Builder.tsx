"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCopy } from "@/hooks/useCopy";
import { ZONES } from "@/data/zones";
import { WORKFLOWS } from "@/data/workflows";
import { TEMPLATES } from "@/data/templates";
import { ANIMALS } from "@/data/animals";

export default function Builder() {
  const { ref, inView } = useInView(0.1);
  const { copied, copy } = useCopy();

  const [selectedZone, setSelectedZone] = useState(ZONES[0].id);
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const [viewMode, setViewMode] = useState<"list" | "infographic">("list");

  const zoneTemplates = TEMPLATES.filter((t) => t.zone === selectedZone);
  const wf = WORKFLOWS[selectedWorkflow];
  const currentPrompt = zoneTemplates[0]?.prompt || "Select a zone to see templates";

  const assembled = `# ${wf.title}
Category: ${wf.cat}
Purpose: ${wf.purpose}
Chain: ${wf.chain.map((c) => {
  const a = ANIMALS.find((x) => x.name === c);
  return a ? `${a.emoji} ${c}` : c;
}).join(" → ")}

${wf.steps
  .map(
    (s, i) =>
      `## Step ${i + 1}: ${s.a} — ${s.t}\n${s.items.map((it) => `- ${it}`).join("\n")}`
  )
  .join("\n\n")}

---
Output: ${wf.out}`;

  return (
    <section id="builder" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-magenta mb-3 block">
            Interactive Tool
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            Motion Prompt Builder
          </h2>
          <p className="font-body text-text-secondary max-w-lg mx-auto">
            Select a zone and workflow to assemble your prompt
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Zone selector */}
            <div className="glass rounded-xl p-5">
              <label className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3 block">
                Select Zone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ZONES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setSelectedZone(z.id)}
                    className={`px-3 py-2 rounded-lg font-mono text-xs text-left transition-all ${
                      selectedZone === z.id
                        ? "border"
                        : "border border-border hover:border-border-light"
                    }`}
                    style={
                      selectedZone === z.id
                        ? {
                            borderColor: z.color,
                            backgroundColor: `${z.color}10`,
                            color: z.color,
                          }
                        : { backgroundColor: "#14161A" }
                    }
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Workflow selector */}
            <div className="glass rounded-xl p-5">
              <label className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3 block">
                Select Workflow
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {WORKFLOWS.map((w, i) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWorkflow(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                      selectedWorkflow === i
                        ? "bg-amber/10 border border-amber/30 text-amber"
                        : "hover:bg-surface-light text-text-secondary"
                    }`}
                  >
                    {w.cat} {w.title}
                  </button>
                ))}
              </div>
            </div>

            {/* View toggle */}
            <div className="glass rounded-xl p-4">
              <label className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3 block">
                View Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    viewMode === "list"
                      ? "bg-cyan/10 border border-cyan/30 text-cyan"
                      : "glass text-text-secondary hover:text-white"
                  }`}
                >
                  📋 List View
                </button>
                <button
                  onClick={() => setViewMode("infographic")}
                  className={`flex-1 px-3 py-2 rounded-lg font-mono text-xs transition-all ${
                    viewMode === "infographic"
                      ? "bg-cyan/10 border border-cyan/30 text-cyan"
                      : "glass text-text-secondary hover:text-white"
                  }`}
                >
                  📊 Infographic
                </button>
              </div>
            </div>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {viewMode === "list" ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-xl p-5 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-text-muted">
                      Assembled Prompt
                    </span>
                    <button
                      onClick={() => copy(assembled)}
                      className="px-3 py-1 rounded-md bg-cyan/10 border border-cyan/30 text-cyan font-mono text-xs hover:bg-cyan/20 transition-colors"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="code-block flex-1 p-4 max-h-[500px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-text-secondary text-xs leading-relaxed">
                      {assembled}
                    </pre>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="infographic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-xl p-5 h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-xl text-white tracking-wide">
                      {wf.title}
                    </span>
                    <button
                      onClick={() => copy(assembled)}
                      className="px-3 py-1 rounded-md bg-cyan/10 border border-cyan/30 text-cyan font-mono text-xs hover:bg-cyan/20 transition-colors"
                    >
                      {copied ? "✓ Copied" : "Copy"}
                    </button>
                  </div>

                  {/* Chain visualization */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {wf.chain.map((name, i) => {
                      const animal = ANIMALS.find((a) => a.name === name);
                      if (!animal) return null;
                      return (
                        <div key={name} className="flex items-center gap-2">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md"
                            style={{
                              backgroundColor: `${animal.color}10`,
                              border: `1px solid ${animal.color}30`,
                            }}
                          >
                            <span>{animal.emoji}</span>
                            <span
                              className="font-display text-xs"
                              style={{ color: animal.color }}
                            >
                              {animal.name}
                            </span>
                          </motion.div>
                          {i < wf.chain.length - 1 && (
                            <span className="text-text-muted text-xs">→</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Steps as cards */}
                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
                    {wf.steps.map((step, i) => {
                      const animal = ANIMALS.find((a) => a.name === step.a);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="rounded-lg p-3 border border-border"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-sm">{animal?.emoji}</span>
                            <span
                              className="font-display text-xs tracking-wide"
                              style={{ color: animal?.color }}
                            >
                              {step.a}
                            </span>
                            <span className="font-mono text-[10px] text-text-muted">
                              Step {i + 1}
                            </span>
                          </div>
                          <p className="font-body text-sm text-text-secondary mb-1.5">
                            {step.t}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {step.items.map((item, j) => (
                              <span
                                key={j}
                                className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-text-muted/20 text-text-muted"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
