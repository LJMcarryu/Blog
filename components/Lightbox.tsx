"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState("Image preview");
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setSrc(null), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const img = (e.target as HTMLElement).closest("img");
      if (!img) return;

      // Only lightbox images inside article or photos grid
      const container = img.closest("article, .photos-grid");
      if (!container) return;

      setSrc(img.src);
      setAlt(img.alt || "Image preview");
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Escape key to close
  useEffect(() => {
    if (!src) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [src, close]);

  // Auto-focus close button + lock body scroll
  useEffect(() => {
    if (!src) return;

    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [src]);

  // Focus trap: keep Tab cycling within the lightbox
  useEffect(() => {
    if (!src) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;

      const focusable = overlay.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [src]);

  if (!src) return null;

  return (
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button ref={closeBtnRef} className="lightbox-close" onClick={close} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
