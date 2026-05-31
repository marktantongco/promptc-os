// src/index.ts
import { useReducer, useEffect, useRef } from "react";
function usePersistedReducer(reducer, initialState, schema, options = {}) {
  const {
    storageKey = "app-state",
    debounceMs = 500,
    validateOnLoad = true,
    persistKeys
  } = options;
  const loadedRef = useRef(null);
  if (loadedRef.current === null && typeof window !== "undefined") {
    const keys = persistKeys || Object.keys(initialState);
    const loaded = {};
    for (const key of keys) {
      try {
        const raw = localStorage.getItem(`${storageKey}-${key}`);
        if (raw !== null) {
          const parsed = JSON.parse(raw);
          if (validateOnLoad) {
            try {
              const rawShape = schema._def?.shape;
              const shape = typeof rawShape === "function" ? rawShape() : rawShape;
              const fieldSchema = shape?.[key];
              if (fieldSchema) {
                const result = fieldSchema.safeParse(parsed);
                if (result.success) {
                  loaded[key] = result.data;
                }
              } else {
                loaded[key] = parsed;
              }
            } catch {
            }
          } else {
            loaded[key] = parsed;
          }
        }
      } catch {
      }
    }
    loadedRef.current = { ...initialState, ...loaded };
  }
  const initOrLoaded = loadedRef.current || initialState;
  const [state, dispatch] = useReducer(reducer, initOrLoaded);
  const prevStateRef = useRef(state);
  const timerRef = useRef(null);
  useEffect(() => {
    if (prevStateRef.current === state) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const keys = persistKeys || Object.keys(initialState);
      for (const key of keys) {
        const newVal = state[key];
        const oldVal = prevStateRef.current[key];
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
export {
  usePersistedReducer
};
//# sourceMappingURL=index.mjs.map