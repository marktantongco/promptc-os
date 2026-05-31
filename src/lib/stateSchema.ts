/**
 * stateSchema.ts — Zod validators for promptc-os state shapes
 * Single source of truth for all state validation.
 * Phase 2 (Beaver): Fails safely, validates at every boundary.
 */
import { z } from "zod";

// ─── Basket Item ─────────────────────────────────────────────────────────
export const basketItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  label: z.string(),
  zone: z.string(),
  time: z.string(),
  chars: z.number().int().min(0),
  pinned: z.boolean().default(false),
  favorited: z.boolean().default(false),
  pipelineStage: z.string().optional(),
  copyCount: z.number().int().min(0).optional(),
});

export type ValidatedBasketItem = z.infer<typeof basketItemSchema>;

/** Validate a single basket item — returns null if invalid */
export function validateBasketItem(raw: unknown): ValidatedBasketItem | null {
  const result = basketItemSchema.safeParse(raw);
  return result.success ? result.data : null;
}

// ─── Persisted State ─────────────────────────────────────────────────────
export const persistedStateSchema = z.object({
  zone: z.string().default("activate"),
  subtab: z.record(z.string(), z.string()).default({}),
  search: z.string().default(""),
  "skills-search": z.string().default(""),
  "quickstart-dismissed": z.boolean().default(false),
  "basket-search": z.string().default(""),
  "basket-zone-filter": z.string().default("all"),
  "basket-sort": z.enum(["newest", "oldest", "longest", "shortest", "az"]).default("newest"),
  "animal-input": z.string().default(""),
  "chain-input": z.string().default(""),
  "meta-prompt": z.string().default(""),
  "qa-input": z.string().default(""),
  "composer-fields": z.record(z.string(), z.string()).default({}),
  "compose-text": z.string().default(""),
  "mod-assembly": z.array(z.string()).default([]),
  "mod-user-input": z.string().default(""),
  "selected-animals": z.array(z.string()).default([]),
  "enhance-input": z.string().default(""),
  "clipboard-history": z.array(z.object({
    text: z.string(),
    time: z.string(),
    zone: z.string(),
  })).default([]),
});

export type PersistedState = z.infer<typeof persistedStateSchema>;

/** Load and validate persisted state from localStorage — never throws */
export function loadPersistedState(): Partial<PersistedState> {
  if (typeof window === "undefined") return {};
  const result: Partial<PersistedState> = {};
  const keys = [
    "zone", "subtab", "search", "skills-search", "quickstart-dismissed",
    "basket-search", "basket-zone-filter", "basket-sort", "animal-input",
    "chain-input", "meta-prompt", "qa-input", "composer-fields",
    "compose-text", "mod-assembly", "mod-user-input", "selected-animals",
    "enhance-input", "clipboard-history",
  ] as const;
  
  for (const key of keys) {
    try {
      const raw = localStorage.getItem(`promptc-state-${key}`);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        const fieldSchema = persistedStateSchema.shape[key];
        const validated = fieldSchema.safeParse(parsed);
        if (validated.success) {
          (result as any)[key] = validated.data;
        } else {
          console.warn(`[promptc] Invalid persisted state for key "${key}":`, validated.error.issues.map(i => i.message));
        }
      }
    } catch {
      // Silently skip corrupt entries
    }
  }
  return result;
}
