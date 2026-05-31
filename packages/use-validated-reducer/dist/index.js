"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  usePersistedReducer: () => usePersistedReducer
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
function usePersistedReducer(reducer, initialState, schema, options = {}) {
  const {
    storageKey = "app-state",
    debounceMs = 500,
    validateOnLoad = true,
    persistKeys
  } = options;
  const loadedRef = (0, import_react.useRef)(null);
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
  const [state, dispatch] = (0, import_react.useReducer)(reducer, initOrLoaded);
  const prevStateRef = (0, import_react.useRef)(state);
  const timerRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usePersistedReducer
});
//# sourceMappingURL=index.js.map