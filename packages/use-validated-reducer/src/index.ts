/**
 * use-validated-reducer — React hook: useReducer + Zod validation + debounced batch localStorage persistence.
 *
 * Combines useReducer + Zod validation + debounced batch localStorage save.
 * Validates state at every boundary (load, update, persist) using Zod schemas.
 *
 * API:
 *   const [state, dispatch] = usePersistedReducer(reducer, initialState, schema, options)
 *
 * Options:
 *   - storageKey: localStorage key prefix (default: "app-state")
 *   - debounceMs: debounce interval for batch save (default: 500)
 *   - validateOnLoad: whether to Zod-validate loaded state (default: true)
 *   - persistKeys: select which state keys to persist (default: all enumerable keys)
 */

import { useReducer, useEffect, useRef } from "react";
import type { ZodType } from "zod";

/**
 * Options for the usePersistedReducer hook.
 */
export interface UsePersistedReducerOptions<S> {
  /** localStorage key prefix (default: "app-state") */
  storageKey?: string;
  /** Debounce interval in ms for batch save (default: 500) */
  debounceMs?: number;
  /** Whether to Zod-validate loaded state (default: true) */
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
 * This replaces the pattern of having many individual useEffect writers
 * that each save one piece of state on every change. Instead, a single
 * debounced save runs at most once every `debounceMs` milliseconds, writing
 * only the keys that have actually changed.
 *
 * @typeParam S - The state shape (must be a record/object)
 * @param reducer - A standard reducer function `(state, action) => newState`
 * @param initialState - The default state used when nothing is persisted
 * @param schema - A Zod schema describing the full state shape (used for per-field validation)
 * @param options - Configuration options for storage key, debounce timing, and key selection
 * @returns A tuple of `[state, dispatch]`, same as `useReducer`
 *
 * @example
 * ```tsx
 * import { usePersistedReducer } from "use-validated-reducer";
 * import { z } from "zod";
 *
 * const schema = z.object({
 *   count: z.number(),
 *   name: z.string(),
 * });
 *
 * type State = z.infer<typeof schema>;
 *
 * function reducer(state: State, action: { type: "INCREMENT" } | { type: "SET_NAME"; payload: string }) {
 *   switch (action.type) {
 *     case "INCREMENT": return { ...state, count: state.count + 1 };
 *     case "SET_NAME": return { ...state, name: action.payload };
 *   }
 * }
 *
 * function MyComponent() {
 *   const [state, dispatch] = usePersistedReducer(
 *     reducer,
 *     { count: 0, name: "" },
 *     schema,
 *     { storageKey: "my-app" }
 *   );
 *   // ...
 * }
 * ```
 */
export function usePersistedReducer<S extends Record<string, any>>(
  reducer: (state: S, action: any) => S,
  initialState: S,
  schema: ZodType<S>,
  options: UsePersistedReducerOptions<S> = {}
): [S, React.Dispatch<any>] {
  const {
    storageKey = "app-state",
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
              // Zod 3.23+ stores shape as a function; older versions as an object
              const rawShape = (schema as any)._def?.shape;
              const shape = typeof rawShape === "function" ? rawShape() : rawShape;
              const fieldSchema = shape?.[key];
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
            console.warn(
              `[use-validated-reducer] Failed to persist key "${String(key)}":`,
              err
            );
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
