"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MODS, TASKS, TMPLS, ANIMALS, VOCAB, WF, TOP10_PROMPTS, BRANDS, LAYERS, ENH, SAAS_TEMPLATES,
} from "@/lib/data";
import { ZC } from "@/lib/data";
import { copyToClipboard } from "@/lib/utils";
import { useStore } from "@/lib/store";

interface SearchResult {
  id: string;
  title: string;
  desc: string;
  zone: string;
  category: string;
  text?: string;
}

function searchData(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  MODS.forEach(([m, d], i) => {
    if (m.toLowerCase().includes(q) || d.toLowerCase().includes(q))
      results.push({ id: `mod-${i}`, title: m, desc: d, zone: "activate", category: "Modifiers", text: m });
  });

  TASKS.forEach((t, i) => {
    if (t.label.toLowerCase().includes(q) || t.content.toLowerCase().includes(q))
      results.push({ id: `task-${i}`, title: t.label, desc: t.content.slice(0, 80), zone: "activate", category: "Task Prompts", text: t.content });
  });

  TMPLS.forEach((t, i) => {
    if (t.label.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q))
      results.push({ id: `tmpl-${i}`, title: t.label, desc: t.desc, zone: "activate", category: "Templates", text: t.content });
  });

  BRANDS.forEach((b) => {
    if (b.label.toLowerCase().includes(q) || b.uc.toLowerCase().includes(q))
      results.push({ id: `brand-${b.id}`, title: b.label, desc: b.uc, zone: "activate", category: "Brand Systems", text: b.prompt });
  });

  ANIMALS.forEach((a) => {
    if (a.name.toLowerCase().includes(q) || a.mode.toLowerCase().includes(q) || a.prompt.toLowerCase().includes(q))
      results.push({ id: `animal-${a.name}`, title: `${a.emoji} ${a.name}`, desc: a.mode, zone: "build", category: "Animals", text: a.prompt });
  });

  LAYERS.forEach((l, i) => {
    if (l.name.toLowerCase().includes(q) || l.pur.toLowerCase().includes(q))
      results.push({ id: `layer-${i}`, title: `${l.n} ${l.name}`, desc: l.pur, zone: "build", category: "8-Layers" });
  });

  ENH.forEach((e, i) => {
    if (e.label.toLowerCase().includes(q) || e.content.toLowerCase().includes(q))
      results.push({ id: `enh-${i}`, title: e.label, desc: e.content.slice(0, 80), zone: "build", category: "Enhancement", text: e.content });
  });

  VOCAB.forEach((v) => {
    if (v.t.toLowerCase().includes(q) || v.d.toLowerCase().includes(q))
      results.push({ id: `vocab-${v.t}`, title: v.t, desc: v.d, zone: "build", category: "Vocab" });
  });

  WF.forEach((w) => {
    if (w.title.toLowerCase().includes(q) || w.purpose.toLowerCase().includes(q) || w.cat.toLowerCase().includes(q))
      results.push({ id: `wf-${w.id}`, title: w.title, desc: w.purpose, zone: "playbook", category: w.cat });
  });

  TOP10_PROMPTS.forEach((p) => {
    if (p.title.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q))
      results.push({ id: `top-${p.rank}`, title: p.title, desc: p.why.slice(0, 80), zone: "monetize", category: "Top 10", text: p.prompt });
  });

  SAAS_TEMPLATES.forEach((s) => {
    if (s.title.toLowerCase().includes(q) || s.niche.toLowerCase().includes(q))
      results.push({ id: `saas-${s.rank}`, title: s.title, desc: s.niche, zone: "monetize", category: "SaaS Templates", text: s.prompt });
  });

  return results.slice(0, 20);
}

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (zone: string) => void;
}

export function GlobalSearch({ open, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchData(query);
  const addHistory = useStore((s) => s.addHistory);
  const incrementCopies = useStore((s) => s.incrementCopies);

  useEffect(() => {
    if (open) {
      // Use microtask to avoid synchronous setState in effect
      const id = requestAnimationFrame(() => {
        setQuery("");
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleCopy = async (text: string, id: string, zone: string, title: string) => {
    await copyToClipboard(text);
    addHistory({ text: title, zone });
    incrementCopies();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-xl mx-4 rounded-xl overflow-hidden"
        style={{
          background: "#14161A",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ color: "#6b7280" }}>⌘K</span>
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts, templates, workflows, vocab..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
          />
          <button onClick={onClose} className="text-xs px-2 py-0.5 rounded" style={{ color: "#6b7280", background: "rgba(255,255,255,0.04)" }}>
            ESC
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query.length < 2 && (
            <div className="px-4 py-8 text-center">
              <p className="text-xs" style={{ color: "#6b7280" }}>Type at least 2 characters to search</p>
            </div>
          )}
          {query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm" style={{ color: "#a1a1aa" }}>No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}
          {results.map((r) => (
            <button
              key={r.id}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
              onClick={() => {
                onNavigate(r.zone);
                onClose();
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate" style={{ color: "#fff" }}>{r.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: ZC[r.zone] + "15", color: ZC[r.zone] }}>
                    {r.category}
                  </span>
                </div>
                <p className="text-xs truncate" style={{ color: "#6b7280" }}>{r.desc}</p>
              </div>
              {r.text && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(r.text!, r.id, r.zone, r.title);
                  }}
                  className="text-[10px] px-2 py-1 rounded flex-shrink-0 transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#a1a1aa" }}
                >
                  Copy
                </button>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
