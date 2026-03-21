"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks mouse position as normalized 0-1 values (viewport-relative).
 * Returns a stable ref that updates on mousemove with rAF throttling.
 * Consumers should read `.current` inside their own rAF loops.
 */
export function useMousePosition() {
  const pos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    function onMouseMove(e: MouseEvent) {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        pos.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        };
        rafId = 0;
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return pos;
}
