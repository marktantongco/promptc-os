import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { z } from "zod";
import { usePersistedReducer } from "../index";

// ─── Test setup ──────────────────────────────────────────────────────────────

const schema = z.object({
  count: z.number(),
  name: z.string(),
  theme: z.enum(["light", "dark"]),
});

type State = z.infer<typeof schema>;

type Action =
  | { type: "INCREMENT" }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_THEME"; payload: "light" | "dark" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const initialState: State = { count: 0, name: "", theme: "light" };

// ─── localStorage mock ───────────────────────────────────────────────────────

const storage = new Map<string, string>();

beforeEach(() => {
  storage.clear();
  vi.useFakeTimers();

  const localStorageMock = {
    getItem: vi.fn((key: string) => storage.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      storage.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      storage.delete(key);
    }),
    clear: vi.fn(() => {
      storage.clear();
    }),
    get length() {
      return storage.size;
    },
    key: vi.fn((_index: number) => null),
  };

  Object.defineProperty(globalThis, "localStorage", {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("usePersistedReducer", () => {
  it("initializes with default state when localStorage is empty", () => {
    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, { storageKey: "test" })
    );

    expect(result.current[0]).toEqual(initialState);
  });

  it("loads persisted state from localStorage", () => {
    // Pre-populate localStorage
    storage.set("test-count", "42");
    storage.set("test-name", '"Alice"');
    storage.set("test-theme", '"dark"');

    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, { storageKey: "test" })
    );

    expect(result.current[0]).toEqual({
      count: 42,
      name: "Alice",
      theme: "dark",
    });
  });

  it("rejects invalid state via Zod validation on load", () => {
    // "not-a-number" is not a valid z.number()
    storage.set("test-count", '"not-a-number"');
    storage.set("test-name", '"Bob"');
    // "blue" is not a valid z.enum(["light", "dark"])
    storage.set("test-theme", '"blue"');

    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, {
        storageKey: "test",
        validateOnLoad: true,
      })
    );

    // Invalid fields should fall back to defaults
    expect(result.current[0]).toEqual({
      count: 0, // invalid → default
      name: "Bob", // valid → loaded
      theme: "light", // invalid → default
    });
  });

  it("skips validation when validateOnLoad is false", () => {
    // "not-a-number" would fail Zod validation
    storage.set("test-count", '"not-a-number"');

    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, {
        storageKey: "test",
        validateOnLoad: false,
      })
    );

    // Without validation, the raw value is loaded as-is
    expect(result.current[0].count).toBe("not-a-number");
  });

  it("debounced save works correctly", () => {
    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, {
        storageKey: "test",
        debounceMs: 300,
      })
    );

    // Dispatch an action
    act(() => {
      result.current[1]({ type: "INCREMENT" });
    });

    // Before debounce fires, localStorage should NOT be updated
    expect(storage.has("test-count")).toBe(false);

    // Advance past the debounce window
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Now the value should be persisted
    expect(storage.get("test-count")).toBe("1");
  });

  it("only persists changed keys", () => {
    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, {
        storageKey: "test",
        debounceMs: 200,
      })
    );

    // Only change `name`
    act(() => {
      result.current[1]({ type: "SET_NAME", payload: "Carol" });
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    // `name` should be persisted, but `count` and `theme` should not (they didn't change)
    expect(storage.has("test-name")).toBe(true);
    expect(storage.get("test-name")).toBe('"Carol"');
    expect(storage.has("test-count")).toBe(false);
    expect(storage.has("test-theme")).toBe(false);
  });

  it("respects persistKeys option", () => {
    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, {
        storageKey: "test",
        debounceMs: 200,
        persistKeys: ["count"],
      })
    );

    act(() => {
      result.current[1]({ type: "SET_NAME", payload: "Dave" });
      result.current[1]({ type: "INCREMENT" });
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Only `count` is in persistKeys, so `name` should not be persisted
    expect(storage.has("test-count")).toBe(true);
    expect(storage.get("test-count")).toBe("1");
    expect(storage.has("test-name")).toBe(false);
  });

  it("batches multiple rapid dispatches into a single save", () => {
    const { result } = renderHook(() =>
      usePersistedReducer(reducer, initialState, schema, {
        storageKey: "test",
        debounceMs: 500,
      })
    );

    // Fire 5 increments rapidly
    act(() => {
      result.current[1]({ type: "INCREMENT" });
      result.current[1]({ type: "INCREMENT" });
      result.current[1]({ type: "INCREMENT" });
      result.current[1]({ type: "INCREMENT" });
      result.current[1]({ type: "INCREMENT" });
    });

    // Before debounce, no save
    expect(storage.has("test-count")).toBe(false);

    // After debounce, a single batch save with the final value
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(storage.get("test-count")).toBe("5");
    // localStorage.setItem should have been called only once for `count`
    const setItemCalls = (localStorage.setItem as ReturnType<typeof vi.fn>).mock.calls.filter(
      (call: string[]) => call[0] === "test-count"
    );
    expect(setItemCalls.length).toBe(1);
  });
});
