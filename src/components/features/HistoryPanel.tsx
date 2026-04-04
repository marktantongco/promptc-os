"use client";

import { useStore } from "@/lib/store";
import { copyToClipboard } from "@/lib/utils";
import { formatTimestamp } from "@/lib/utils";
import { ZC } from "@/lib/data";
import { Copy, Trash2 } from "lucide-react";

interface HistoryPanelProps {
  open: boolean;
  onClose: () => void;
}

export function HistoryPanel({ open, onClose }: HistoryPanelProps) {
  const history = useStore((s) => s.history);
  const clearHistory = useStore((s) => s.clearHistory);

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
  };

  if (!open) return null;

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
          <h2 className="text-sm font-semibold" style={{ color: "#fff" }}>History</h2>
          <div className="flex gap-2">
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs px-2 py-1 rounded"
                style={{ color: "#ef4444", background: "rgba(239,68,68,0.08)" }}
              >
                Clear All
              </button>
            )}
            <button onClick={onClose} className="text-xs px-2 py-1 rounded" style={{ color: "#6b7280", background: "rgba(255,255,255,0.04)" }}>
              Close
            </button>
          </div>
        </div>

        {history.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm" style={{ color: "#a1a1aa" }}>No history yet</p>
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Copied items will appear here</p>
          </div>
        )}

        <div className="space-y-1">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-white/[0.02]"
            >
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ZC[entry.zone] || "#6b7280" }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs truncate" style={{ color: "#fff" }}>{entry.text}</p>
                <p className="text-[10px] flex items-center gap-2" style={{ color: "#6b7280" }}>
                  <span style={{ color: ZC[entry.zone] || "#6b7280" }}>{entry.zone}</span>
                  <span>{formatTimestamp(entry.timestamp)}</span>
                </p>
              </div>
              <button
                onClick={() => handleCopy(entry.text)}
                className="p-1 rounded transition-colors"
                style={{ color: "#6b7280" }}
                aria-label="Copy again"
              >
                <Copy size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
