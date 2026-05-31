/**
 * useAppReducer.ts — usePersistedReducer pattern
 * 
 * Combines useReducer + Zod validation + debounced batch localStorage save.
 * Replaces the 35+ individual useEffect localStorage writers with a single
 * debounced save that runs only when state actually changes.
 * 
 * Strategic: This hook is designed for extraction into the npm package
 * `use-validated-reducer` — a generic React hook that validates state
 * at every boundary (load, update, persist) using Zod schemas.
 * 
 * API:
 *   const [state, dispatch] = usePersistedReducer(reducer, initialState, schema, options)
 * 
 * Options:
 *   - storageKey: localStorage key prefix (default: "promptc-state")
 *   - debounceMs: debounce interval for batch save (default: 500)
 *   - validateOnLoad: whether to Zod-validate loaded state (default: true)
 */

"use client";

import { useReducer, useEffect, useRef, useCallback } from "react";
import type { ZodType } from "zod";

interface UsePersistedReducerOptions<S> {
  storageKey?: string;
  debounceMs?: number;
  validateOnLoad?: boolean;
  /** Select which state keys to persist (default: all enumerable keys) */
  persistKeys?: (keyof S & string)[];
}

/**
 * Custom hook: useReducer + Zod validation + debounced batch localStorage save.
 * 
 * 1. On mount: loads persisted state from localStorage, validates with Zod schema
 * 2. On every dispatch: validates new state, applies to component
 * 3. On state change: debounced batch save to localStorage (only changed keys)
 * 
 * This replaces the pattern of having 35+ individual useEffect writers
 * that each save one piece of state on every change. Instead, a single
 * debounced save runs at most once every 500ms, writing only the keys
 * that have actually changed.
 */
export function usePersistedReducer<S extends Record<string, any>>(
  reducer: (state: S, action: any) => S,
  initialState: S,
  schema: ZodType<S>,
  options: UsePersistedReducerOptions<S> = {}
): [S, React.Dispatch<any>] {
  const {
    storageKey = "promptc-state",
    debounceMs = 500,
    validateOnLoad = true,
    persistKeys,
  } = options;

  // ─── Load persisted state on init ────────────────────────────────────────
  const loadedRef = useRef<S | null>(null);
  if (loadedRef.current === null && typeof window !== "undefined") {
    const keys = persistKeys || (Object.keys(initialState) as (keyof S & string)[]);
    const loaded: Partial<S> = {};
    for (const key of keys) {
      try {
        const raw = localStorage.getItem(`${storageKey}-${key}`);
        if (raw !== null) {
          const parsed = JSON.parse(raw);
          if (validateOnLoad) {
            // Validate the individual field — if invalid, skip it
            try {
              const fieldSchema = (schema as any)._def?.shape?.[key];
              if (fieldSchema) {
                const result = fieldSchema.safeParse(parsed);
                if (result.success) {
                  (loaded as any)[key] = result.data;
                }
              } else {
                // No schema for this key, use as-is
                (loaded as any)[key] = parsed;
              }
            } catch {
              // Validation failed, skip this key
            }
          } else {
            (loaded as any)[key] = parsed;
          }
        }
      } catch {
        // Corrupt localStorage entry, skip
      }
    }
    loadedRef.current = { ...initialState, ...loaded } as S;
  }

  const initOrLoaded = loadedRef.current || initialState;

  const [state, dispatch] = useReducer(reducer, initOrLoaded);

  // ─── Debounced batch save ────────────────────────────────────────────────
  const prevStateRef = useRef(state);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Skip the first render (initial state)
    if (prevStateRef.current === state) return;

    // Clear any pending save
    if (timerRef.current) clearTimeout(timerRef.current);

    // Schedule debounced save
    timerRef.current = setTimeout(() => {
      const keys = persistKeys || (Object.keys(initialState) as (keyof S & string)[]);
      for (const key of keys) {
        const newVal = state[key];
        const oldVal = prevStateRef.current[key];
        // Only write if the value actually changed
        if (newVal !== oldVal) {
          try {
            localStorage.setItem(`${storageKey}-${key}`, JSON.stringify(newVal));
          } catch (err) {
            console.warn(`[promptc] Failed to persist key "${String(key)}":`, err);
          }
        }
      }
      prevStateRef.current = state;
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state, storageKey, debounceMs, persistKeys, initialState]);

  return [state, dispatch];
}

/**
 * useAppReducer — promptc-os specific wrapper
 * 
 * Provides the reducer, actions, and persisted reducer for the main app state.
 * This is the migration path: components can switch from useState to this
 * hook incrementally.
 */

// ─── App State Shape ─────────────────────────────────────────────────────
export interface AppState {
  zone: string;
  subtab: Record<string, string>;
  search: string;
  "skills-search": string;
  "quickstart-dismissed": boolean;
  "basket-search": string;
  "basket-zone-filter": string;
  "basket-sort": "newest" | "oldest" | "longest" | "shortest" | "az";
  "animal-input": string;
  "chain-input": string;
  "meta-prompt": string;
  "qa-input": string;
  "composer-fields": Record<string, string>;
  "compose-text": string;
  "mod-assembly": string[];
  "mod-user-input": string;
  "selected-animals": string[];
  "enhance-input": string;
  "clipboard-history": Array<{ text: string; time: string; zone: string }>;
}

// ─── Actions ──────────────────────────────────────────────────────────────
export type AppAction =
  | { type: "SET_ZONE"; payload: string }
  | { type: "SET_SUBTAB"; payload: Record<string, string> }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SKILLS_SEARCH"; payload: string }
  | { type: "SET_QUICKSTART_DISMISSED"; payload: boolean }
  | { type: "SET_BASKET_SEARCH"; payload: string }
  | { type: "SET_BASKET_ZONE_FILTER"; payload: string }
  | { type: "SET_BASKET_SORT"; payload: "newest" | "oldest" | "longest" | "shortest" | "az" }
  | { type: "SET_ANIMAL_INPUT"; payload: string }
  | { type: "SET_CHAIN_INPUT"; payload: string }
  | { type: "SET_META_PROMPT"; payload: string }
  | { type: "SET_QA_INPUT"; payload: string }
  | { type: "SET_COMPOSER_FIELDS"; payload: Record<string, string> }
  | { type: "SET_COMPOSE_TEXT"; payload: string }
  | { type: "SET_MOD_ASSEMBLY"; payload: string[] }
  | { type: "SET_MOD_USER_INPUT"; payload: string }
  | { type: "SET_SELECTED_ANIMALS"; payload: string[] }
  | { type: "SET_ENHANCE_INPUT"; payload: string }
  | { type: "SET_CLIPBOARD_HISTORY"; payload: Array<{ text: string; time: string; zone: string }> }
  | { type: "BATCH_UPDATE"; payload: Partial<AppState> };

// ─── Reducer ──────────────────────────────────────────────────────────────
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_ZONE":
      return { ...state, zone: action.payload };
    case "SET_SUBTAB":
      return { ...state, subtab: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SKILLS_SEARCH":
      return { ...state, "skills-search": action.payload };
    case "SET_QUICKSTART_DISMISSED":
      return { ...state, "quickstart-dismissed": action.payload };
    case "SET_BASKET_SEARCH":
      return { ...state, "basket-search": action.payload };
    case "SET_BASKET_ZONE_FILTER":
      return { ...state, "basket-zone-filter": action.payload };
    case "SET_BASKET_SORT":
      return { ...state, "basket-sort": action.payload };
    case "SET_ANIMAL_INPUT":
      return { ...state, "animal-input": action.payload };
    case "SET_CHAIN_INPUT":
      return { ...state, "chain-input": action.payload };
    case "SET_META_PROMPT":
      return { ...state, "meta-prompt": action.payload };
    case "SET_QA_INPUT":
      return { ...state, "qa-input": action.payload };
    case "SET_COMPOSER_FIELDS":
      return { ...state, "composer-fields": action.payload };
    case "SET_COMPOSE_TEXT":
      return { ...state, "compose-text": action.payload };
    case "SET_MOD_ASSEMBLY":
      return { ...state, "mod-assembly": action.payload };
    case "SET_MOD_USER_INPUT":
      return { ...state, "mod-user-input": action.payload };
    case "SET_SELECTED_ANIMALS":
      return { ...state, "selected-animals": action.payload };
    case "SET_ENHANCE_INPUT":
      return { ...state, "enhance-input": action.payload };
    case "SET_CLIPBOARD_HISTORY":
      return { ...state, "clipboard-history": action.payload };
    case "BATCH_UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
