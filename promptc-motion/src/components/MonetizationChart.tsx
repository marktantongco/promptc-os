"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const MONETIZATION_DATA = [
  { label: "Prompt Templates Marketplace", value: 85, color: "#4DFFFF" },
  { label: "SaaS Subscription (Pro)", value: 72, color: "#FFB000" },
  { label: "Enterprise Training", value: 60, color: "#7C5CFF" },
  { label: "API Access & Integrations", value: 55, color: "#FF4FD8" },
  { label: "Brand System Customization", value: 45, color: "#22c55e" },
  { label: "Workflow Automation", value: 40, color: "#FF6B00" },
  { label: "Certification Program", value: 30, color: "#38bdf8" },
];

export default function MonetizationChart() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="monetize" className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-violet mb-3 block">
            Revenue Streams
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            Monetization
          </h2>
          <p className="font-body text-text-secondary max-w-lg mx-auto">
            Diverse revenue channels for sustainable growth
          </p>
        </motion.div>

        {/* Bars */}
        <div className="space-y-4">
          {MONETIZATION_DATA.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs text-text-secondary truncate mr-4">
                  {item.label}
                </span>
                <span
                  className="font-mono text-xs tabular-nums shrink-0"
                  style={{ color: item.color }}
                >
                  {item.value}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-surface-light overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.value}%` } : { width: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.08 + 0.3,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full transition-shadow duration-300"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: inView
                      ? `0 0 12px ${item.color}40`
                      : "none",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
