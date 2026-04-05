"use client";

import { useCallback, useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  id?: string;
  zone?: string;
  label?: string;
  size?: number;
  className?: string;
}

export function CopyButton({ text, id, zone = "", label, size = 14, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const addHistory = useStore((s) => s.addHistory);
  const incrementCopies = useStore((s) => s.incrementCopies);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      addHistory({ text: label || text.slice(0, 80), zone });
      incrementCopies();
      setTimeout(() => setCopied(false), 1500);
    }
  }, [text, id, zone, label, addHistory, incrementCopies]);

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: copied ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
        color: copied ? "#22c55e" : "#a1a1aa",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
