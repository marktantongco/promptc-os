"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SDIMS } from "@/lib/data";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CopyButton } from "@/components/shared/CopyButton";
import { copyToClipboard } from "@/lib/utils";
import { useStore } from "@/lib/store";

function ScoreBar({ label, score, max = 10 }: { label: string; score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color = score >= 7 ? "#22c55e" : score >= 5 ? "#FFB000" : "#ef4444";
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs" style={{ color: "#a1a1aa" }}>{label}</span>
        <span className="text-xs font-mono" style={{ color }}>{score}/{max}</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function quickScore(text: string, dim: { name: string; what: string }): number {
  let score = 5;
  const t = text.toLowerCase();
  if (dim.name === "Clarity") {
    if (t.length > 200) score += 1;
    if (t.includes("goal") || t.includes("objective")) score += 1;
    if (!t.includes("nice") && !t.includes("cool") && !t.includes("awesome")) score += 1;
    if (t.split(".").length > 5) score += 1;
    if (t.length < 50) score -= 2;
  }
  if (dim.name === "Structure") {
    if (t.includes("role") || t.includes("act as")) score += 2;
    if (t.includes("context") || t.includes("product")) score += 1;
    if (t.includes("output") || t.includes("format")) score += 1;
    if (t.includes("step")) score += 1;
  }
  if (dim.name === "Constraints") {
    if (t.includes("mobile") || t.includes("responsive")) score += 1;
    if (t.includes("wcag") || t.includes("accessib")) score += 1;
    if (t.includes("60fps") || t.includes("performance")) score += 1;
    if (t.includes("constraint") || t.includes("limit")) score += 1;
  }
  if (dim.name === "Predictability") {
    if (t.includes("generate") || t.includes("output")) score += 2;
    if (t.includes("format") || t.includes("file")) score += 1;
    if (t.includes("refine") || t.includes("critique")) score += 1;
    if (t.includes("example")) score += 1;
  }
  return Math.max(1, Math.min(10, score));
}

export function PromptDiff() {
  const [promptA, setPromptA] = useState("");
  const [promptB, setPromptB] = useState("");
  const [results, setResults] = useState<{ a: Record<string, number>; b: Record<string, number>; winner: string } | null>(null);
  const addHistory = useStore((s) => s.addHistory);
  const incrementCopies = useStore((s) => s.incrementCopies);

  const analyze = () => {
    const aScores: Record<string, number> = {};
    const bScores: Record<string, number> = {};
    let aTotal = 0, bTotal = 0;

    SDIMS.forEach((dim) => {
      aScores[dim.name] = quickScore(promptA, dim);
      bScores[dim.name] = quickScore(promptB, dim);
      aTotal += aScores[dim.name];
      bTotal += bScores[dim.name];
    });

    const winner = aTotal > bTotal ? "Prompt A" : bTotal > aTotal ? "Prompt B" : "Tie";
    setResults({ a: aScores, b: bScores, winner });
    addHistory({ text: "Prompt Diff Analysis", zone: "builder" });
    incrementCopies();
  };

  return (
    <div className="space-y-4">
      <SectionLabel color="#FF4FD8">PROMPT DIFF — Compare two prompts</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "#FF4FD8" }}>Prompt A</label>
          <textarea
            value={promptA}
            onChange={(e) => setPromptA(e.target.value)}
            placeholder="Paste your first prompt..."
            rows={8}
            className="w-full px-3 py-2 rounded text-sm outline-none resize-y"
            style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#d4d4d8", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
          />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "#FF4FD8" }}>Prompt B</label>
          <textarea
            value={promptB}
            onChange={(e) => setPromptB(e.target.value)}
            placeholder="Paste your second prompt..."
            rows={8}
            className="w-full px-3 py-2 rounded text-sm outline-none resize-y"
            style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#d4d4d8", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}
          />
        </div>
      </div>

      <button
        onClick={analyze}
        disabled={!promptA || !promptB}
        className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all disabled:opacity-30"
        style={{
          background: "rgba(255,79,216,0.12)",
          color: "#FF4FD8",
          border: "1px solid rgba(255,79,216,0.2)",
        }}
      >
        Analyze
      </button>

      {results && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <ZoneCard accent="#FF4FD8">
            <div className="text-center mb-4">
              <span className="text-xs" style={{ color: "#6b7280" }}>Winner</span>
              <p className="text-lg font-semibold" style={{ color: "#FF4FD8" }}>{results.winner}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: "#fff" }}>Prompt A</p>
                <div className="space-y-3">
                  {SDIMS.map((dim) => (
                    <ScoreBar key={dim.name} label={dim.name} score={results.a[dim.name]} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: "#fff" }}>Prompt B</p>
                <div className="space-y-3">
                  {SDIMS.map((dim) => (
                    <ScoreBar key={dim.name} label={dim.name} score={results.b[dim.name]} />
                  ))}
                </div>
              </div>
            </div>
          </ZoneCard>
        </motion.div>
      )}
    </div>
  );
}
