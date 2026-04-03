"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { TECH_STACKS } from "@/data/techStacks";

function FlipCard({
  stack,
  index,
  inView,
}: {
  stack: (typeof TECH_STACKS)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flip-card h-56 sm:h-64"
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front */}
        <div className="flip-card-front absolute inset-0 glass glass-hover rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: stack.color }}
              />
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                {stack.tier}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide">
              {stack.stack}
            </h3>
          </div>
          <p className="font-mono text-xs text-text-muted">
            {stack.items.length} technologies · Hover to reveal
          </p>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 glass rounded-xl p-5 overflow-y-auto">
          <h4 className="font-display text-lg text-white tracking-wide mb-3">
            {stack.stack}
          </h4>
          <div className="space-y-2">
            {stack.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2"
              >
                <span className="font-mono text-xs text-text-muted truncate">
                  {item.l}
                </span>
                <span
                  className="font-mono text-xs truncate text-right"
                  style={{ color: stack.color }}
                >
                  {item.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStackGrid() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="stacks" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-green mb-3 block">
            Developer Toolkit
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            6 Tech Stacks
          </h2>
          <p className="font-body text-text-secondary max-w-lg mx-auto">
            Production-ready configurations for every project type
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_STACKS.map((stack, i) => (
            <FlipCard
              key={stack.stack}
              stack={stack}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
