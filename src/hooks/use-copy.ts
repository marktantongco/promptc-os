"use client";

import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/utils";
import { useStore } from "@/lib/store";

export function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const addHistory = useStore((s) => s.addHistory);
  const incrementCopies = useStore((s) => s.incrementCopies);

  const copy = useCallback(
    async (text: string, id: string, zone: string, label?: string) => {
      const ok = await copyToClipboard(text);
      if (ok) {
        setCopiedId(id);
        addHistory({ text: label || text.slice(0, 80), zone });
        incrementCopies();
        setTimeout(() => setCopiedId(null), 1500);
      }
      return ok;
    },
    [addHistory, incrementCopies]
  );

  return { copy, copiedId };
}
