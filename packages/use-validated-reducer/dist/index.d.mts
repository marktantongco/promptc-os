import { ZodType } from 'zod';

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

/**
 * Options for the usePersistedReducer hook.
 */
interface UsePersistedReducerOptions<S> {
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
declare function usePersistedReducer<S extends Record<string, any>>(reducer: (state: S, action: any) => S, initialState: S, schema: ZodType<S>, options?: UsePersistedReducerOptions<S>): [S, React.Dispatch<any>];

export { type UsePersistedReducerOptions, usePersistedReducer };
