"use client";

interface PillProps {
  children: React.ReactNode;
  active?: boolean;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export function Pill({ children, active = false, color, onClick, className = "" }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none ${className}`}
      style={{
        background: active ? (color || "rgba(255,255,255,0.12)") : "rgba(255,255,255,0.04)",
        color: active ? (color || "#fff") : "#a1a1aa",
        border: `1px solid ${active ? (color || "rgba(255,255,255,0.2)") : "rgba(255,255,255,0.07)"}`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {children}
    </button>
  );
}
