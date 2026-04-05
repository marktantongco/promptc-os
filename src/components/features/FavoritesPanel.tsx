"use client";

import { useStore } from "@/lib/store";
import { ZC } from "@/lib/data";
import { copyToClipboard } from "@/lib/utils";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { Star, Copy, Trash2 } from "lucide-react";

interface FavoritesPanelProps {
  open: boolean;
  onClose: () => void;
}

export function FavoritesPanel({ open, onClose }: FavoritesPanelProps) {
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
  };

  if (!open) return null;

  const favArray = Array.from(favorites);
  const grouped: Record<string, string[]> = {};
  favArray.forEach((id) => {
    const zone = id.split("-")[0] === "mod" || id.split("-")[0] === "task" || id.split("-")[0] === "tmpl" || id.split("-")[0] === "brand" || id === "master" || id === "advocate"
      ? "activate"
      : id.split("-")[0] === "animal" || id.split("-")[0] === "enh" || id.split("-")[0] === "vocab" || id.split("-")[0] === "layer"
        ? "build"
        : id.split("-")[0] === "wf"
          ? "playbook"
          : id.split("-")[0] === "top" || id.split("-")[0] === "saas" || id.split("-")[0] === "fw"
            ? "monetize"
            : "other";
    if (!grouped[zone]) grouped[zone] = [];
    grouped[zone].push(id);
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-sm h-full overflow-y-auto p-4"
        style={{
          background: "#14161A",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star size={16} style={{ color: "#FFB000" }} fill="#FFB000" />
            <h2 className="text-sm font-semibold" style={{ color: "#fff" }}>Favorites</h2>
            <span className="text-xs" style={{ color: "#6b7280" }}>({favArray.length})</span>
          </div>
          <button onClick={onClose} className="text-xs px-2 py-1 rounded" style={{ color: "#6b7280", background: "rgba(255,255,255,0.04)" }}>
            Close
          </button>
        </div>

        {favArray.length === 0 && (
          <div className="text-center py-12">
            <Star size={24} style={{ color: "#6b7280" }} />
            <p className="text-sm mt-2" style={{ color: "#a1a1aa" }}>No favorites yet</p>
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Click the star icon on any item to save it here</p>
          </div>
        )}

        {Object.entries(grouped).map(([zone, ids]) => (
          <div key={zone} className="mb-4">
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: ZC[zone] || "#6b7280", fontFamily: "'DM Mono', monospace" }}
            >
              {zone}
            </span>
            <div className="space-y-1 mt-2">
              {ids.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <Star size={12} style={{ color: ZC[zone] || "#FFB000" }} fill={ZC[zone] || "#FFB000" } />
                  <span className="text-xs flex-1 truncate" style={{ color: "#fff" }}>{id}</span>
                  <button
                    onClick={() => toggleFavorite(id)}
                    className="p-0.5 rounded transition-colors"
                    style={{ color: "#6b7280" }}
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
