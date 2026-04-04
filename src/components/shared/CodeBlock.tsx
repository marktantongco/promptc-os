"use client";

import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  id?: string;
  zone?: string;
  label?: string;
  maxHeight?: string;
}

export function CodeBlock({ code, id, zone, label, maxHeight = "max-h-96" }: CodeBlockProps) {
  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{
        background: "#0B0D10",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="text-xs font-mono" style={{ color: "#6b7280" }}>prompt</span>
        <CopyButton text={code} id={id} zone={zone} label={label} />
      </div>
      <pre className={`${maxHeight} overflow-y-auto p-4 text-sm leading-relaxed`}>
        <code
          className="whitespace-pre-wrap break-words font-mono"
          style={{ color: "#d4d4d8", fontSize: "13px", lineHeight: "1.7" }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}
