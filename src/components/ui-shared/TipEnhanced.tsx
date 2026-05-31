"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Enhanced Tooltip with shortcut hint ────────────────────────────
export function TipEnhanced({ children, text, shortcut }: { children: React.ReactNode; text: string; shortcut?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="tip-enhanced" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
            className="tip-content">
            {text}{shortcut && <span className="tip-shortcut">{shortcut}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
