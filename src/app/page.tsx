"use client";

import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ZONES, ZC } from "@/lib/data";
import { useStore } from "@/lib/store";
import { GlobalSearch } from "@/components/features/GlobalSearch";
import { FavoritesPanel } from "@/components/features/FavoritesPanel";
import { HistoryPanel } from "@/components/features/HistoryPanel";
import { StatsBar } from "@/components/features/StatsBar";
import { Search, Star, Clock, Command } from "lucide-react";

// Lazy load zones
const ActivateZone = lazy(() =>
  import("@/components/zones/ActivateZone").then((m) => ({ default: m.ActivateZone }))
);
const BuildZone = lazy(() =>
  import("@/components/zones/BuildZone").then((m) => ({ default: m.BuildZone }))
);
const ValidateZone = lazy(() =>
  import("@/components/zones/ValidateZone").then((m) => ({ default: m.ValidateZone }))
);
const PlaybookZone = lazy(() =>
  import("@/components/zones/PlaybookZone").then((m) => ({ default: m.PlaybookZone }))
);
const BuilderZone = lazy(() =>
  import("@/components/zones/BuilderZone").then((m) => ({ default: m.BuilderZone }))
);
const MonetizeZone = lazy(() =>
  import("@/components/zones/MonetizeZone").then((m) => ({ default: m.MonetizeZone }))
);

const ZONE_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  activate: ActivateZone,
  build: BuildZone,
  validate: ValidateZone,
  playbook: PlaybookZone,
  builder: BuilderZone,
  monetize: MonetizeZone,
};

function ZoneFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full animate-pulse"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <p className="text-xs" style={{ color: "#6b7280" }}>Loading zone...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeZone, setActiveZone] = useState("activate");
  const [searchOpen, setSearchOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [histOpen, setHistOpen] = useState(false);
  const visitZone = useStore((s) => s.visitZone);

  // Track zone visits
  useEffect(() => {
    visitZone(activeZone);
  }, [activeZone, visitZone]);

  // Scroll to top on zone change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeZone]);

  // Keyboard shortcut: Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavigate = useCallback((zone: string) => {
    setActiveZone(zone);
  }, []);

  const activeColor = ZC[activeZone];

  return (
    <div className="min-h-screen" style={{ background: "#0B0D10" }}>
      {/* ─── HEADER ──────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl"
        style={{
          background: "rgba(11,13,16,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: activeColor }} />
              <span
                className="text-lg tracking-widest"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: activeColor,
                  letterSpacing: "0.1em",
                }}
              >
                promptc OS
              </span>
            </div>
            <span
              className="hidden sm:inline text-[10px] px-2 py-0.5 rounded"
              style={{
                background: activeColor + "12",
                color: activeColor,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              v3
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/[0.04]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#a1a1aa",
              }}
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
              <kbd
                className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Command size={10} />K
              </kbd>
            </button>
            <button
              onClick={() => setFavOpen(true)}
              className="p-2 rounded-lg transition-colors hover:bg-white/[0.04]"
              style={{ color: "#a1a1aa" }}
              aria-label="Favorites"
            >
              <Star size={16} />
            </button>
            <button
              onClick={() => setHistOpen(true)}
              className="p-2 rounded-lg transition-colors hover:bg-white/[0.04]"
              style={{ color: "#a1a1aa" }}
              aria-label="History"
            >
              <Clock size={16} />
            </button>
          </div>
        </div>

        {/* Zone Navigation */}
        <nav className="max-w-6xl mx-auto px-4 pb-2">
          <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                style={{
                  background: activeZone === zone.id ? zone.id === activeZone ? ZC[zone.id] + "12" : "transparent" : "transparent",
                  color: activeZone === zone.id ? ZC[zone.id] : "#6b7280",
                  border: `1px solid ${activeZone === zone.id ? ZC[zone.id] + "30" : "transparent"}`,
                }}
              >
                {zone.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* ─── MAIN CONTENT ────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<ZoneFallback />}>
              {(() => {
                const Comp = ZONE_COMPONENTS[activeZone];
                return Comp ? <Comp /> : null;
              })()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── ZONE INDICATOR DOTS ────────────────────── */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 rounded-full"
        style={{
          background: "rgba(20,22,26,0.9)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        {ZONES.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setActiveZone(zone.id)}
            className="rounded-full transition-all duration-300"
            style={{
              width: activeZone === zone.id ? "20px" : "8px",
              height: "8px",
              background: activeZone === zone.id ? ZC[zone.id] : "rgba(255,255,255,0.15)",
            }}
            aria-label={zone.label}
          />
        ))}
      </div>

      {/* ─── STATS BAR ──────────────────────────────── */}
      <StatsBar />

      {/* ─── OVERLAYS ───────────────────────────────── */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
      <FavoritesPanel open={favOpen} onClose={() => setFavOpen(false)} />
      <HistoryPanel open={histOpen} onClose={() => setHistOpen(false)} />
    </div>
  );
}
