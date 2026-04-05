"use client";

import { useState } from "react";
import { LAYERS, LAYER_SNIPS } from "@/lib/data";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CodeBlock } from "@/components/shared/CodeBlock";

export function LayerComposer() {
  const [values, setValues] = useState<string[]>(Array(8).fill(""));
  const [useSnippets, setUseSnippets] = useState<boolean[]>(Array(8).fill(false));

  const assembledPrompt = values
    .map((v, i) => {
      if (!v && !useSnippets[i]) return null;
      const layerName = LAYERS[i]?.name?.toUpperCase();
      const content = useSnippets[i] ? LAYER_SNIPS[i] : v;
      return `${layerName}\n${content}`;
    })
    .filter(Boolean)
    .join("\n\n---\n\n");

  const loadTemplate = () => {
    setUseSnippets(Array(8).fill(true));
  };

  const clearAll = () => {
    setValues(Array(8).fill(""));
    setUseSnippets(Array(8).fill(false));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionLabel color="#FF4FD8">8-LAYER PROMPT COMPOSER</SectionLabel>
        <div className="flex gap-2">
          <button
            onClick={loadTemplate}
            className="px-3 py-1.5 rounded text-xs"
            style={{ background: "rgba(255,79,216,0.1)", color: "#FF4FD8", border: "1px solid rgba(255,79,216,0.2)" }}
          >
            Load Snippets
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded text-xs"
            style={{ background: "rgba(255,255,255,0.04)", color: "#6b7280", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {LAYERS.map((l, i) => (
          <ZoneCard key={i} accent="#FF4FD8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-display" style={{ color: "#FF4FD8" }}>{l.n}</span>
              <span className="text-sm font-semibold" style={{ color: "#fff" }}>{l.name}</span>
              <span className="text-[10px] ml-auto" style={{ color: "#6b7280" }}>{l.pur}</span>
            </div>
            <div className="flex items-start gap-2">
              <button
                onClick={() => setUseSnippets((p) => { const n = [...p]; n[i] = !n[i]; return n; })}
                className="text-[10px] px-2 py-0.5 rounded mt-1 flex-shrink-0"
                style={{
                  background: useSnippets[i] ? "rgba(255,79,216,0.15)" : "rgba(255,255,255,0.04)",
                  color: useSnippets[i] ? "#FF4FD8" : "#6b7280",
                  border: `1px solid ${useSnippets[i] ? "rgba(255,79,216,0.3)" : "rgba(255,255,255,0.07)"}`,
                }}
              >
                Snippet
              </button>
              {!useSnippets[i] && (
                <textarea
                  value={values[i]}
                  onChange={(e) => setValues((p) => { const n = [...p]; n[i] = e.target.value; return n; })}
                  placeholder={`Write your ${l.name.toLowerCase()} here...`}
                  rows={3}
                  className="flex-1 px-3 py-2 rounded text-sm outline-none resize-y"
                  style={{
                    background: "#0B0D10",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#d4d4d8",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "12px",
                  }}
                />
              )}
            </div>
          </ZoneCard>
        ))}
      </div>

      {/* Assembled Prompt */}
      {assembledPrompt && (
        <div className="mt-6">
          <SectionLabel color="#FF4FD8">ASSEMBLED PROMPT</SectionLabel>
          <CodeBlock code={assembledPrompt} id="layer-composed" zone="builder" label="Composed Prompt" />
        </div>
      )}
    </div>
  );
}
