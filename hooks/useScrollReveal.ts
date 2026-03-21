"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      elementRef.current = node;
      if (!node) return;

      // Respect prefers-reduced-motion
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        node.classList.add("scroll-revealed");
        setIsRevealed(true);
        return;
      }

      // Immediate check: if element is already in viewport, reveal without waiting
      const rect = node.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewport) {
        node.classList.add("scroll-revealed");
        setIsRevealed(true);
        if (triggerOnce) return;
      }

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-revealed");
            setIsRevealed(true);
            if (triggerOnce) {
              observerRef.current?.disconnect();
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove("scroll-revealed");
            setIsRevealed(false);
          }
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(node);
    },
    [threshold, rootMargin, triggerOnce]
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { ref, isRevealed };
}
