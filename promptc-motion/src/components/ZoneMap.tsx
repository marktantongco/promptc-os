"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ZONES } from "@/data/zones";

const TIER_LABELS: Record<number, string> = {
  1: "Entry Point",
  2: "Core Tools",
  3: "Quality Layer",
};

export default function ZoneMap() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="zones" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-cyan mb-3 block">
            System Architecture
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            7 Zones
          </h2>
          <p className="font-body text-text-secondary max-w-lg mx-auto">
            A layered system from activation to self-improvement
          </p>
        </motion.div>

        {/* Zone grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ZONES.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover rounded-xl p-5 group cursor-default"
            >
              <div className="flex items-start gap-4">
                {/* Color dot */}
                <div
                  className="w-3 h-3 rounded-full mt-1.5 shrink-0 transition-shadow duration-300"
                  style={{
                    backgroundColor: zone.color,
                    boxShadow: `0 0 12px ${zone.color}40`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="font-display text-lg tracking-wide"
                      style={{ color: zone.color }}
                    >
                      {zone.label}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-text-muted/20 text-text-muted">
                      Tier {zone.tier}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-text-secondary mb-2">
                    {zone.sub}
                  </p>
                  <p className="font-body text-sm text-text-muted leading-relaxed">
                    {zone.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tier legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12"
        >
          {Object.entries(TIER_LABELS).map(([tier, label]) => (
            <div key={tier} className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-text-muted">
                T{tier}
              </span>
              <span className="text-text-secondary text-sm">— {label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
