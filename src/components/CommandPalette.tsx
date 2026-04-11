"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Copy, ArrowRight } from "lucide-react";
import {
  ZONES, MODS, TASKS, TMPLS, BRANDS, ANIMALS, CHAINS, ENHANCEMENTS,
  LINT_RULES, SWAPS, WORKFLOWS_DATA,
} from "@/app/data/promptc-data";

interface PaletteItem {
  label: string;
  zone: string;
  tab: string;
  type: string;
  snippet: string;
}

function buildSearchIndex(): PaletteItem[] {
  const items: PaletteItem[] = [];
  MODS.forEach((m) => items.push({ label: m.mod, zone: "activate", tab: "Modifiers", type: "Modifier", snippet: m.tip }));
  TASKS.forEach((t) => items.push({ label: t.label, zone: "activate", tab: "Tasks", type: "Task", snippet: t.content.slice(0, 80) }));
  TMPLS.forEach((t) => items.push({ label: t.label, zone: "activate", tab: "Templates", type: "Template", snippet: t.desc }));
  BRANDS.forEach((b) => items.push({ label: b.label, zone: "activate", tab: "Brands", type: "Brand", snippet: b.uc }));
  ANIMALS.forEach((a) => items.push({ label: a.name, zone: "activate", tab: "Animals", type: "Animal", snippet: a.mode }));
  ENHANCEMENTS.forEach((e) => items.push({ label: e.label, zone: "build", tab: "Enhancements", type: "Enhancement", snippet: e.when }));
  LINT_RULES.forEach((r) => items.push({ label: r.check.slice(0, 60), zone: "validate", tab: "Lint Rules", type: "Lint Rule", snippet: r.fix }));
  SWAPS.forEach((s) => items.push({ label: `${s.bad} → ${s.good}`, zone: "validate", tab: "Word Swaps", type: "Word Swap", snippet: s.tip }));
  WORKFLOWS_DATA.forEach((w) => items.push({ label: w.title, zone: "playbook", tab: "Workflows", type: "Workflow", snippet: w.purpose }));
  CHAINS.forEach((c) => items.push({ label: c.goal, zone: "playbook", tab: "Animal Chains", type: "Chain", snippet: c.best }));
  return items;
}

const SEARCH_INDEX = buildSearchIndex();

const ZONE_TAB_MAP: Record<string, string> = {
  activate: "Modifiers",
  build: "Enhancements",
  validate: "Lint Rules",
  playbook: "Workflows",
  monetize: "Top Prompts",
  system: "Principles",
};

export default function CommandPalette({
  open,
  onClose,
  onSelect,
  recentItems,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (zone: string, tab: string) => void;
  recentItems: { text: string; zone: string; time: string }[];
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(false);

  useEffect(() => {
    if (open && !openRef.current) {
      openRef.current = true;
      setTimeout(() => { inputRef.current?.focus(); setQuery(""); }, 150);
    }
    if (!open) openRef.current = false;
  }, [open]);

  const filtered = query.trim()
    ? SEARCH_INDEX.filter(
        (i) =>
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.snippet.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20)
    : [];

  const grouped = filtered.reduce<Record<string, PaletteItem[]>>((acc, item) => {
    const zone = ZONES.find((z) => z.id === item.zone);
    const key = zone?.label || item.zone;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const zoneColor = (zoneId: string) => ZONES.find((z) => z.id === zoneId)?.color || "#4DFFFF";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[61] w-[90%] max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "#14161A", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#6B7280" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modifiers, templates, tasks, workflows..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "#FFFFFF" }}
              />
              <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#4b5563" }}>ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {!query.trim() && recentItems.length > 0 && (
                <div className="mb-2">
                  <div className="text-[10px] font-mono px-2 py-1 tracking-widest" style={{ color: "#4b5563" }}>RECENTLY COPIED</div>
                  {recentItems.slice(0, 5).map((r, i) => {
                    const zc = zoneColor(r.zone);
                    return (
                      <button
                        key={i}
                        onClick={() => { onSelect(r.zone, ZONE_TAB_MAP[r.zone] || ""); onClose(); }}
                        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors hover:bg-white/5"
                      >
                        <Copy className="w-3 h-3 flex-shrink-0" style={{ color: zc }} />
                        <span className="text-xs truncate flex-1" style={{ color: "#A1A1AA" }}>{r.text}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: `${zc}12`, color: zc }}>{r.zone}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {Object.entries(grouped).map(([zone, items]) => (
                <div key={zone} className="mb-2">
                  <div className="text-[10px] font-mono px-2 py-1 tracking-widest" style={{ color: "#4b5563" }}>{zone.toUpperCase()}</div>
                  {items.map((item, i) => {
                    const zc = zoneColor(item.zone);
                    return (
                      <button
                        key={`${item.zone}-${item.label}-${i}`}
                        onClick={() => { onSelect(item.zone, item.tab); onClose(); }}
                        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors hover:bg-white/5"
                      >
                        <span className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: `${zc}12`, color: zc }}>{item.type}</span>
                        <span className="text-xs truncate flex-1" style={{ color: "#e4e4e7" }}>{item.label}</span>
                        <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: "#4b5563" }} />
                      </button>
                    );
                  })}
                </div>
              ))}
              {query.trim() && filtered.length === 0 && (
                <div className="text-center py-8 text-xs" style={{ color: "#4b5563" }}>No results found for &quot;{query}&quot;</div>
              )}
              {!query.trim() && recentItems.length === 0 && (
                <div className="text-center py-8 text-xs" style={{ color: "#4b5563" }}>Type to search across all zones...</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
