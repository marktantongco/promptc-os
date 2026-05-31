"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Scrollable Container with Arrow Indicators ─────────────────────
export function ScrollableWithArrows({ children, className }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);
    return () => { el.removeEventListener("scroll", checkScroll); observer.disconnect(); };
  }, [checkScroll, children]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -180 : 180, behavior: "smooth" });
  }, []);

  return (
    <div className="relative scroll-fade-container">
      <button
        onClick={() => scroll("left")}
        className={`nav-scroll-btn nav-scroll-left ${canScrollLeft ? "visible" : ""}`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <div ref={containerRef} className={`overflow-x-auto no-scrollbar ${className || ""}`}>
        {children}
      </div>
      <button
        onClick={() => scroll("right")}
        className={`nav-scroll-btn nav-scroll-right ${canScrollRight ? "visible" : ""}`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
