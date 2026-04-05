"use client";

interface ZoneCardProps {
  children: React.ReactNode;
  accent?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ZoneCard({ children, accent, className = "", style }: ZoneCardProps) {
  return (
    <div
      className={`rounded-xl p-5 ${className}`}
      style={{
        background: "#14161A",
        border: `1px solid ${accent ? accent + "18" : "rgba(255,255,255,0.07)"}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
