/**
 * errorHandling.ts — Error classification, retry logic, and localStorage helpers
 * Extracted from PageClient.tsx monolith.
 */

import { toast } from "sonner";

// ─── Error Types ──────────────────────────────────────────────────────────
export type PromptcError = { code: string; message: string; retryable: boolean };

export function classifyError(err: unknown): PromptcError {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("quota") || msg.includes("storage")) return { code: "LS_QUOTA", message: "Storage full. Some data may not persist.", retryable: false };
  if (msg.includes("security") || msg.includes("blocked")) return { code: "LS_BLOCKED", message: "Storage access blocked.", retryable: false };
  if (msg.includes("clipboard")) return { code: "CLIP_FAIL", message: "Clipboard access denied.", retryable: true };
  return { code: "UNKNOWN", message: msg, retryable: false };
}

export async function withRetry<T>(fn: () => T | Promise<T>, opts: { retries?: number; label: string }): Promise<T> {
  const { retries = 2, label } = opts;
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try { return await fn(); }
    catch (err) {
      lastErr = err;
      const classified = classifyError(err);
      if (attempt < retries && classified.retryable) {
        console.warn(`[promptc] ${label} attempt ${attempt + 1} failed (${classified.code}), retrying...`);
        await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
      } else {
        console.error(`[promptc] ${label} failed after ${attempt + 1} attempt(s):`, classified.code, classified.message);
        break;
      }
    }
  }
  const classified = classifyError(lastErr);
  if (!classified.retryable || retries === 0) {
    toast.error(`${label}: ${classified.message}`);
  }
  throw lastErr;
}

// ─── localStorage helpers (with logging) ──────────────────────────────────
export const LS_PREFIX = "promptc-state-";

export function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(LS_PREFIX + key); return v !== null ? JSON.parse(v) : fallback; }
  catch (err) { console.warn("[promptc] lsGet failed for", key, classifyError(err).code); return fallback; }
}

export function lsSet(key: string, value: unknown) {
  try { localStorage.setItem(LS_PREFIX + key, JSON.stringify(value)); }
  catch (err) { console.warn("[promptc] lsSet failed for", key, classifyError(err).code); }
}

export function lsSetDebounced(key: string, value: unknown, delay = 500) {
  if (typeof window === "undefined") return;
  setTimeout(() => lsSet(key, value), delay);
}
