"use client";

interface SectionHeadingProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function SectionHeading({ children, color, className = "" }: SectionHeadingProps) {
  return (
    <h3
      className={`text-base font-semibold mb-3 ${className}`}
      style={{ color: color || "#fff", fontFamily: "'DM Sans', sans-serif" }}
    >
      {children}
    </h3>
  );
}
