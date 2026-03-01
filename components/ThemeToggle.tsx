"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    function applyTheme() {
      try {
        const saved = localStorage.getItem("blog-color-scheme");
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme:dark)"
        ).matches;
        const shouldBeDark =
          saved === "dark" || (saved !== "light" && prefersDark);
        const isDark = document.documentElement.classList.contains("dark");
        if (shouldBeDark !== isDark) {
          document.documentElement.classList.toggle("dark", shouldBeDark);
        }
        setDark(shouldBeDark);
      } catch (_) {
        setDark(document.documentElement.classList.contains("dark"));
      }
    }

    applyTheme();

    // MutationObserver fires as a microtask (before browser paint),
    // so when React reconciliation strips the "dark" class on locale switch,
    // we re-apply it instantly — no white flash, no SSR issues.
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");

    const apply = () => {
      html.classList.toggle("dark", next);
      setDark(next);
      try {
        localStorage.setItem("blog-color-scheme", next ? "dark" : "light");
      } catch (_) {}
    };

    // Use View Transitions API for a smooth fade if available
    if ("startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      onClick={toggle}
      className="nav-link"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        // Moon — currently dark mode
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun — currently light mode
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
