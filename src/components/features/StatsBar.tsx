"use client";

import { useStore } from "@/lib/store";
import { ZC, ZONES } from "@/lib/data";

export function StatsBar() {
  const stats = useStore((s) => s.stats);
  const favorites = useStore((s) => s.favorites);

  const topZone = Object.entries(stats.zoneVisits).sort((a, b) => b[1] - a[1])[0];

  return (
    <div
      className="fixed bottom-20 left-4 z-40 flex items-center gap-3 px-3 py-2 rounded-lg"
      style={{
        background: "rgba(20,22,26,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-[10px]" style={{ color: "#6b7280" }}>Copies</span>
        <span className="text-xs font-mono font-bold" style={{ color: "#4DFFFF" }}>{stats.copies}</span>
      </div>
      <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.07)" }} />
      <div className="flex items-center gap-1.5">
        <span className="text-[10px]" style={{ color: "#6b7280" }}>★</span>
        <span className="text-xs font-mono font-bold" style={{ color: "#FFB000" }}>{favorites.size}</span>
      </div>
      {topZone && (
        <>
          <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.07)" }} />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ZC[topZone[0]] || "#6b7280" }} />
            <span className="text-[10px]" style={{ color: ZC[topZone[0]] || "#6b7280" }}>{topZone[0]}</span>
          </div>
        </>
      )}
    </div>
  );
}
