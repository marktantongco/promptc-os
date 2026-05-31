"use client";

// ─── Skeleton Loader ────────────────────────────────────────────────
export function Skeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className || ""}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-shimmer" style={{ height: i === lines - 1 ? 20 : 14, width: `${60 + Math.random() * 40}%` }} />
      ))}
    </div>
  );
}
