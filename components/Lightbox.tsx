"use client";

import { useCallback, useEffect, useState } from "react";

export default function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);

  const close = useCallback(() => setSrc(null), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const img = (e.target as HTMLElement).closest("img");
      if (!img) return;

      // Only lightbox images inside article or photos grid
      const container = img.closest("article, .photos-grid");
      if (!container) return;

      setSrc(img.src);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!src) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [src, close]);

  if (!src) return null;

  return (
    <div className="lightbox-overlay" onClick={close} role="dialog" aria-label="Image preview">
      <button className="lightbox-close" onClick={close} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Enlarged preview"
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
