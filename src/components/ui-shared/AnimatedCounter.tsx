"use client";
import { useState, useRef, useEffect } from "react";

// ─── Animated Counter ────────────────────────────────────────────────────
export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = value / (duration / 16);
    const timer = setInterval(() => { start += step; if (start >= value) { setCount(value); clearInterval(timer); } else setCount(Math.floor(start)); }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}
