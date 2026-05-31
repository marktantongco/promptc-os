# use-validated-reducer

[![npm version](https://img.shields.io/npm/v/use-validated-reducer.svg)](https://www.npmjs.com/package/use-validated-reducer) [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/marktantongco/promptc-os/blob/main/packages/use-validated-reducer/LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

**React hook: `useReducer` + Zod validation + debounced batch localStorage persistence. Validated state at every boundary.**

## Why?

Managing persistent state in React usually means sprinkling `useEffect` + `localStorage.setItem` calls everywhere — one per state slice. That leads to:

- **Write storms**: every state change triggers a separate `localStorage.setItem`
- **No validation**: corrupted or stale localStorage data silently infects your app
- **No debouncing**: rapid updates hammer the main thread with synchronous writes

`use-validated-reducer` solves all three:

1. **Single debounced save** — one batched write per `debounceMs` window, only for keys that actually changed
2. **Zod validation on load** — invalid localStorage entries are silently discarded, falling back to defaults
3. **Standard reducer pattern** — full `useReducer` API, no new mental models

## Installation

```bash
npm install use-validated-reducer zod react
```

> **Peer dependencies**: React ≥18 and Zod ≥3 must be installed in your project.

## Quick Start

```tsx
import { usePersistedReducer } from "use-validated-reducer";
import { z } from "zod";

// 1. Define your state schema
const AppStateSchema = z.object({
  count: z.number(),
  name: z.string(),
  theme: z.enum(["light", "dark"]),
});

type AppState = z.infer<typeof AppStateSchema>;

// 2. Define your reducer
type Action =
  | { type: "INCREMENT" }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_THEME"; payload: "light" | "dark" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
  }
}

// 3. Use the hook
function App() {
  const [state, dispatch] = usePersistedReducer(
    reducer,
    { count: 0, name: "", theme: "light" },
    AppStateSchema,
    { storageKey: "my-app" }
  );

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
      />
    </div>
  );
}
```

## API Reference

### `usePersistedReducer<S>(reducer, initialState, schema, options?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `reducer` | `(state: S, action: any) => S` | A standard reducer function |
| `initialState` | `S` | Default state when nothing is persisted |
| `schema` | `ZodType<S>` | Zod schema for the full state shape (used for per-field validation) |
| `options` | `UsePersistedReducerOptions<S>` | Configuration options (see below) |

**Returns**: `[S, React.Dispatch<any>]` — identical to `useReducer`.

### `UsePersistedReducerOptions<S>`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `storageKey` | `string` | `"app-state"` | Prefix for localStorage keys. Each state field is stored as `${storageKey}-${key}` |
| `debounceMs` | `number` | `500` | Milliseconds to debounce the batch save |
| `validateOnLoad` | `boolean` | `true` | Whether to Zod-validate each field when loading from localStorage |
| `persistKeys` | `(keyof S & string)[]` | All keys of `initialState` | Select which state keys to persist. Omit to persist all |

## How It Works

The hook operates in three phases:

### 1. Load (mount)

On first render, the hook reads each key from localStorage. If `validateOnLoad` is `true`, each field is validated against the corresponding field in the Zod schema. Invalid entries are silently discarded, and the default value from `initialState` is used instead.

### 2. Update (dispatch)

When you call `dispatch`, the standard `useReducer` machinery runs. The hook does not re-validate on every dispatch — it trusts your reducer to produce valid state. The Zod schema is only used during the load phase.

### 3. Persist (debounced save)

After state changes, a debounced `setTimeout` fires. It compares the new state to the previous snapshot and only writes keys whose values have actually changed. This means rapid dispatches (e.g., typing in an input) result in a single batched write after the debounce window.

## Comparison with Alternatives

| Feature | `use-validated-reducer` | `useState` + `useEffect` | `useReducer` | Zustand |
|---------|------------------------|--------------------------|--------------|---------|
| Validation on load | ✅ Zod | ❌ Manual | ❌ Manual | ❌ Manual |
| Debounced persist | ✅ Built-in | ❌ Manual | ❌ Manual | ⚠️ Middleware |
| Only changed keys | ✅ Diff-based | ❌ All or nothing | ❌ N/A | ⚠️ Manual |
| Zero boilerplate | ✅ Single hook | ❌ One useEffect per key | ❌ Separate persist logic | ⚠️ Store + middleware |
| Standard React API | ✅ useReducer | ✅ useState | ✅ useReducer | ❌ External store |
| SSR safe | ✅ typeof window check | ⚠️ Manual | ✅ | ⚠️ Hydration |
| Bundle size | ~1KB | 0 | 0 | ~1.1KB |

## When to Use This

**✅ Good fit:**

- App state that needs to survive page reloads (UI preferences, form drafts, settings)
- State shapes that are objects with multiple keys
- Projects already using Zod for validation
- Replacing scattered `useEffect` localStorage writers

**❌ Not a good fit:**

- Ephemeral state that doesn't need persistence (use plain `useReducer`)
- Extremely high-frequency updates where even debounced writes are too slow (use in-memory state + manual persist)
- State that's too large for localStorage (~5MB limit)
- Non-object state (the hook requires `S extends Record<string, any>`)

## TypeScript Support

The hook is fully typed with generics. Pass your state type as the type parameter:

```typescript
interface MyState {
  count: number;
  label: string;
}

const [state, dispatch] = usePersistedReducer<MyState>(
  reducer,
  initialState,
  schema,
  options
);
```

Or let TypeScript infer it from your `initialState` and `schema`:

```typescript
const schema = z.object({ count: z.number(), label: z.string() });
type MyState = z.infer<typeof schema>;

const [state, dispatch] = usePersistedReducer(
  reducer,
  { count: 0, label: "" },
  schema
);
```

## Selective Persistence

Use `persistKeys` to persist only a subset of your state:

```typescript
const [state, dispatch] = usePersistedReducer(reducer, initialState, schema, {
  persistKeys: ["count", "theme"], // only persist these keys
});
```

This is useful when some state is derived or ephemeral and shouldn't survive page reloads.

## License

[MIT](https://github.com/marktantongco/promptc-os/blob/main/packages/use-validated-reducer/LICENSE)
