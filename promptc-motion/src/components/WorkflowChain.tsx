"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { WORKFLOWS } from "@/data/workflows";
import { ANIMALS } from "@/data/animals";

export default function WorkflowChain() {
  const { ref, inView } = useInView(0.1);
  const [selected, setSelected] = useState(0);
  const wf = WORKFLOWS[selected];

  const getAnimal = (name: string) => ANIMALS.find((a) => a.name === name);

  return (
    <section id="workflows" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber mb-3 block">
            Animal Chain Method
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            22 Workflows
          </h2>
          <p className="font-body text-text-secondary max-w-lg mx-auto">
            Each workflow chains animals for a structured thinking process
          </p>
        </motion.div>

        {/* Workflow selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {WORKFLOWS.map((w, i) => (
            <button
              key={w.id}
              onClick={() => setSelected(i)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                selected === i
                  ? "bg-amber/10 border border-amber/30 text-amber"
                  : "glass text-text-secondary hover:text-white"
              }`}
            >
              {w.cat} {w.title}
            </button>
          ))}
        </motion.div>

        {/* Selected workflow details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-xl p-6 sm:p-8"
          >
            {/* Title row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white">
                  {wf.title}
                </h3>
                <p className="font-mono text-xs text-text-secondary mt-1">
                  {wf.cat} · {wf.purpose}
                </p>
              </div>
              <span className="font-mono text-xs text-text-muted px-3 py-1 rounded-full border border-text-muted/20 shrink-0">
                → {wf.out}
              </span>
            </div>

            {/* Animal chain visualization */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
              {wf.chain.map((name, i) => {
                const animal = getAnimal(name);
                if (!animal) return null;
                return (
                  <div key={name} className="flex items-center gap-2 sm:gap-3">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors"
                      style={{
                        borderColor: `${animal.color}30`,
                        backgroundColor: `${animal.color}08`,
                      }}
                    >
                      <span className="text-lg">{animal.emoji}</span>
                      <div>
                        <span
                          className="font-display text-sm tracking-wide block"
                          style={{ color: animal.color }}
                        >
                          {animal.name}
                        </span>
                        <span className="font-mono text-[10px] text-text-muted block">
                          {animal.mode}
                        </span>
                      </div>
                    </motion.div>
                    {i < wf.chain.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 0.4, scaleX: 1 }}
                        transition={{ delay: i * 0.1 + 0.05 }}
                        className="text-text-muted text-sm hidden sm:inline"
                      >
                        →
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {wf.steps.map((step, i) => {
                const animal = getAnimal(step.a);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="rounded-lg p-4 border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm">{animal?.emoji}</span>
                      <span
                        className="font-display text-sm tracking-wide"
                        style={{ color: animal?.color }}
                      >
                        {step.a}
                      </span>
                    </div>
                    <p className="font-body text-sm text-text-secondary mb-2">
                      {step.t}
                    </p>
                    <ul className="space-y-1">
                      {step.items.map((item, j) => (
                        <li
                          key={j}
                          className="font-mono text-xs text-text-muted flex items-center gap-2"
                        >
                          <span
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: animal?.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
