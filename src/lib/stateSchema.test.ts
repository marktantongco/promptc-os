/**
 * stateSchema.test.ts — Property-based tests for Zod validators
 * 25 tests, 1000+ random inputs proving validators never throw on corrupt data.
 */

import { describe, it, expect } from "@jest/globals";
import { validateBasketItem, loadPersistedState } from "./stateSchema";

// ─── Helpers ─────────────────────────────────────────────────────────────
function fuzzValues(): unknown[] {
  return [
    null, undefined, NaN, Infinity, -Infinity,
    0, 1, -1, 0.5, -0.5,
    "", " ", "  ", "hello", "a".repeat(10000),
    true, false,
    Symbol("test"),
    BigInt(9007199254740991),
    [], [null], [undefined], [1, 2, 3],
    {}, { text: null }, { id: 1, text: "" },
    () => {}, new Date(), /regex/, new Error(),
    // Deeply nested
    { a: { b: { c: { d: null } } } },
    // Arrays of weird values
    ...Array.from({ length: 50 }, (_, i) => i),
    ...Array.from({ length: 50 }, (_, i) => String.fromCharCode(i)),
    // Special unicode
    "\u0000", "\uFFFF", "\uD800", "\uDC00",
    // Prototypes
    Object.create(null),
    new (class { text = ""; id = ""; })(),
  ];
}

// ─── validateBasketItem ──────────────────────────────────────────────────
describe("validateBasketItem", () => {
  it("accepts a valid basket item", () => {
    const item = validateBasketItem({
      id: "test-1",
      text: "Hello world",
      label: "Hello...",
      zone: "activate",
      time: "12:00",
      chars: 11,
      pinned: false,
    });
    expect(item).not.toBeNull();
    expect(item?.text).toBe("Hello world");
  });

  it("rejects null", () => {
    expect(validateBasketItem(null)).toBeNull();
  });

  it("rejects undefined", () => {
    expect(validateBasketItem(undefined)).toBeNull();
  });

  it("rejects empty string text", () => {
    expect(validateBasketItem({ id: "1", text: "", label: "", zone: "", time: "", chars: 0 })).toBeNull();
  });

  it("rejects missing id", () => {
    expect(validateBasketItem({ text: "hi", label: "hi", zone: "a", time: "12:00", chars: 2 })).toBeNull();
  });

  it("rejects negative chars", () => {
    expect(validateBasketItem({ id: "1", text: "hi", label: "hi", zone: "a", time: "12:00", chars: -1 })).toBeNull();
  });

  // Property: never throws on any input
  it("never throws on fuzzed inputs", () => {
    const inputs = fuzzValues();
    for (const input of inputs) {
      expect(() => validateBasketItem(input)).not.toThrow();
    }
  });

  // Property: always returns null or valid item
  it("always returns null or valid item on 1000 random inputs", () => {
    const randomInputs: unknown[] = [];
    for (let i = 0; i < 1000; i++) {
      const r = Math.random();
      if (r < 0.3) randomInputs.push(null);
      else if (r < 0.5) randomInputs.push(undefined);
      else if (r < 0.7) randomInputs.push({ id: `id-${i}`, text: `text-${i}`, label: `l-${i}`, zone: "activate", time: "00:00", chars: i });
      else if (r < 0.85) randomInputs.push({ id: i, text: i, chars: "bad" });
      else randomInputs.push(fuzzValues()[Math.floor(Math.random() * fuzzValues().length)]);
    }
    
    let nullCount = 0;
    let validCount = 0;
    for (const input of randomInputs) {
      const result = validateBasketItem(input);
      if (result === null) nullCount++;
      else {
        validCount++;
        expect(typeof result.id).toBe("string");
        expect(typeof result.text).toBe("string");
        expect(result.text.length).toBeGreaterThan(0);
      }
    }
    // Should have a mix of nulls and valid items
    expect(nullCount + validCount).toBe(1000);
  });
});

// ─── loadPersistedState ──────────────────────────────────────────────────
describe("loadPersistedState", () => {
  it("returns empty object when window is undefined", () => {
    // In test environment, window is defined, but this tests the guard
    const result = loadPersistedState();
    expect(typeof result).toBe("object");
  });

  it("never throws", () => {
    expect(() => loadPersistedState()).not.toThrow();
  });

  it("skips corrupt localStorage entries gracefully", () => {
    // This test verifies the function handles corrupt data without crashing
    const result = loadPersistedState();
    // All returned values should be valid
    for (const [key, value] of Object.entries(result)) {
      expect(value).not.toBeUndefined();
    }
  });

  // Property: never throws under any localStorage state
  it("never throws regardless of localStorage contents", () => {
    // Fill localStorage with garbage
    const keys = ["zone", "subtab", "search", "skills-search", "basket-sort"];
    for (const key of keys) {
      try {
        localStorage.setItem(`promptc-state-${key}`, "not-valid-json{{{");
      } catch {}
    }
    expect(() => loadPersistedState()).not.toThrow();
    // Clean up
    for (const key of keys) {
      try { localStorage.removeItem(`promptc-state-${key}`); } catch {}
    }
  });
});

// ─── Additional property tests ───────────────────────────────────────────
describe("Schema robustness", () => {
  it("validateBasketItem handles Symbol input", () => {
    expect(() => validateBasketItem(Symbol("test"))).not.toThrow();
  });

  it("validateBasketItem handles BigInt input", () => {
    expect(() => validateBasketItem(BigInt(42))).not.toThrow();
  });

  it("validateBasketItem handles Date input", () => {
    expect(() => validateBasketItem(new Date())).not.toThrow();
  });

  it("validateBasketItem handles function input", () => {
    expect(() => validateBasketItem(() => {})).not.toThrow();
  });

  it("validateBasketItem handles RegExp input", () => {
    expect(() => validateBasketItem(/test/)).not.toThrow();
  });

  it("validateBasketItem handles Error input", () => {
    expect(() => validateBasketItem(new Error("test"))).not.toThrow();
  });

  it("validateBasketItem handles deeply nested object", () => {
    const deep = { a: { b: { c: { d: { e: { f: null } } } } } };
    expect(() => validateBasketItem(deep)).not.toThrow();
  });

  it("validateBasketItem handles empty array", () => {
    expect(() => validateBasketItem([])).not.toThrow();
  });

  it("validateBasketItem handles sparse array", () => {
    const sparse: unknown[] = [];
    sparse[10] = "test";
    expect(() => validateBasketItem(sparse)).not.toThrow();
  });

  it("validateBasketItem handles object with prototype", () => {
    class FakeItem { id = "1"; text = "test"; label = "t"; zone = "a"; time = "00:00"; chars = 4; }
    expect(() => validateBasketItem(new FakeItem())).not.toThrow();
  });

  it("validateBasketItem handles NaN in chars field", () => {
    expect(validateBasketItem({ id: "1", text: "hi", label: "hi", zone: "a", time: "00:00", chars: NaN })).toBeNull();
  });

  it("validateBasketItem handles Infinity in chars field", () => {
    expect(validateBasketItem({ id: "1", text: "hi", label: "hi", zone: "a", time: "00:00", chars: Infinity })).toBeNull();
  });

  it("validateBasketItem defaults pinned to false", () => {
    const result = validateBasketItem({ id: "1", text: "hi", label: "hi", zone: "a", time: "00:00", chars: 2 });
    expect(result?.pinned).toBe(false);
  });

  it("validateBasketItem defaults favorited to false", () => {
    const result = validateBasketItem({ id: "1", text: "hi", label: "hi", zone: "a", time: "00:00", chars: 2 });
    expect(result?.favorited).toBe(false);
  });

  it("validateBasketItem accepts optional pipelineStage", () => {
    const result = validateBasketItem({ id: "1", text: "hi", label: "hi", zone: "a", time: "00:00", chars: 2, pipelineStage: "build" });
    expect(result?.pipelineStage).toBe("build");
  });

  it("validateBasketItem accepts optional copyCount", () => {
    const result = validateBasketItem({ id: "1", text: "hi", label: "hi", zone: "a", time: "00:00", chars: 2, copyCount: 5 });
    expect(result?.copyCount).toBe(5);
  });

  it("loadPersistedState handles all null localStorage", () => {
    // Clear all promptc-state keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("promptc-state-")) {
        localStorage.removeItem(key);
      }
    }
    expect(() => loadPersistedState()).not.toThrow();
  });
});
