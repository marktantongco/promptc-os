"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

const ONBOARDING_KEY = "promptc-os-onboarded-v1";

interface TourStep {
  target: string;
  title: string;
  desc: string;
}

const STEPS: TourStep[] = [
  { target: "nav-zones", title: "Zone Navigation", desc: "Navigate between 6 zones: Activate, Build, Validate, Playbook, Monetize, and System. Each zone has its own specialized tools." },
  { target: "task-cards", title: "Task Cards", desc: "Each zone contains cards with copy-ready prompts, modifiers, and templates. Click to expand and copy to clipboard." },
  { target: "composer", title: "Prompt Composer", desc: "In Activate > Composer, build structured prompts using the 8-layer framework. Assemble and copy with one click." },
  { target: "meta-builder", title: "Meta Builder", desc: "In Build > Meta Builder, transform any prompt using 3 AI methodologies: Quick Critique, Structured Analysis, and Expert Engineering." },
  { target: "quality-score", title: "Quality Score", desc: "In Validate > Quality Score, analyze any prompt across 4 dimensions: clarity, specificity, structure, and actionability." },
];

export default function OnboardingTour({ onDone }: { onDone: (show: boolean) => void }) {
  const [seen, setSeen] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(ONBOARDING_KEY) === "1";
  });
  const [step, setStep] = useState(0);

  const finish = useCallback(() => {
    setSeen(true);
    localStorage.setItem(ONBOARDING_KEY, "1");
  }, []);

  if (seen) return null;

  const current = STEPS[step];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[70] pointer-events-none"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(2px)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed z-[71] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md rounded-2xl p-6 pointer-events-auto"
        style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <button onClick={finish} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 transition-colors">
          <X className="w-4 h-4" style={{ color: "#6B7280" }} />
        </button>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>
            {step + 1} / {STEPS.length}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2">{current.title}</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "#A1A1AA" }}>{current.desc}</p>
        <div className="flex items-center justify-between">
          <button onClick={finish} className="text-xs px-3 py-1.5 rounded-lg transition-colors" style={{ color: "#6B7280", border: "1px solid rgba(255,255,255,0.07)" }}>
            Skip
          </button>
          <button
            onClick={() => {
              if (step < STEPS.length - 1) setStep(step + 1);
              else { finish(); onDone(false); }
            }}
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all"
            style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)" }}
          >
            {step < STEPS.length - 1 ? "Next" : "Get Started"}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </>
  );
}

export function retriggerOnboarding() {
  localStorage.removeItem(ONBOARDING_KEY);
}
