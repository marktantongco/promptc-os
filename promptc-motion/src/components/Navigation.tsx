"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZONES } from "@/data/zones";

const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "zones", label: "Zones" },
  { id: "workflows", label: "Workflows" },
  { id: "stacks", label: "Tech Stacks" },
  { id: "monetize", label: "Monetize" },
  { id: "builder", label: "Builder" },
];

export default function Navigation({
  onPresent,
}: {
  onPresent: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-xl tracking-wider text-white hover:text-cyan transition-colors"
          >
            promptc<span className="text-cyan">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onPresent}
              className="ml-2 px-3 py-1.5 rounded-md bg-cyan/10 border border-cyan/30 text-cyan font-mono text-xs hover:bg-cyan/20 transition-colors"
            >
              ▶ Present
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-text-secondary"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-text-secondary"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-text-secondary"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-lg md:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl tracking-wider text-text-secondary hover:text-cyan transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onPresent();
                }}
                className="mt-4 px-6 py-2 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-mono text-sm hover:bg-cyan/20 transition-colors"
              >
                ▶ Present
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
