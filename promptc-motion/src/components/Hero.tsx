"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const STATS = [
  { value: 7, label: "Zones", suffix: "" },
  { value: 22, label: "Workflows", suffix: "" },
  { value: 6, label: "Brand Systems", suffix: "" },
  { value: 2256, label: "Lines of Code", suffix: "" },
];

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 40, damping: 30, mass: 1 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    motionVal.set(value);
  }, [motionVal, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-display text-4xl sm:text-5xl text-cyan neon-cyan tabular-nums">
        {display.toLocaleString()}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
            Motion-Driven PWA
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white mb-4"
        >
          promptc{" "}
          <span className="text-cyan neon-cyan">OS</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-body text-lg sm:text-xl text-text-secondary mb-12 max-w-xl mx-auto"
        >
          Motion-Driven AI Prompt Engineering
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-12"
        >
          {STATS.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="#zones"
            className="px-6 py-3 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-mono text-sm hover:bg-cyan/20 transition-colors"
          >
            Explore Zones
          </a>
          <a
            href="#builder"
            className="px-6 py-3 rounded-lg glass glass-hover font-mono text-sm text-text-secondary hover:text-white transition-colors"
          >
            Open Builder
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-text-muted/30 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
