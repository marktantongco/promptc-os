"use client";

interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function SectionLabel({ children, color, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`text-[10px] font-semibold tracking-[0.15em] uppercase ${className}`}
      style={{ color: color || "#6b7280", fontFamily: "'DM Mono', monospace" }}
    >
      {children}
    </span>
  );
}
