"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Tooltip (kept for backward compat) ────────────────────────────────
export function Tip({ children, text }: { children: React.ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-[11px] leading-relaxed whitespace-nowrap max-w-xs text-center pointer-events-none"
            style={{ background: "#1e1e24", border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA", boxShadow: "0 8px 24px -4px rgba(0,0,0,0.5)" }}>
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
