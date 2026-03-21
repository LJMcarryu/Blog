"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const t = useTranslations("nav");
  const ta = useTranslations("a11y");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const navLinks = [
    { href: "/blog",     label: t("blog") },
    { href: "/series",   label: t("series") },
    { href: "/projects", label: t("projects") },
    { href: "/photos",   label: t("photos") },
    { href: "/about",    label: t("about") },
  ];

  // Prefix-match: /blog/my-post → Blog is active
  const isActive = (href: string) => pathname.startsWith(href);

  // Close mobile menu on Escape key; focus first link when opened
  useEffect(() => {
    if (!open) return;

    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Body scroll lock when fullscreen menu is open (same pattern as Lightbox)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="relative z-40">
      {/* Site logo — absolute top-left (antfu.me style) */}
      <Link href="/" className="nav-logo font-caveat" onClick={() => setOpen(false)}>
        Jimmy
      </Link>

      {/* Desktop nav */}
      <div className="nav-grid">
        <div />
        <div className="nav-right nav-desktop">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${isActive(href) ? " active" : ""}`}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger button */}
        <div className="nav-mobile-actions">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            onClick={() => setOpen(!open)}
            className="nav-link nav-hamburger"
            aria-label={open ? ta("closeMenu") : ta("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Fullscreen mobile menu */}
      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`nav-fullscreen-menu${open ? " nav-fullscreen-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open || undefined}
      >
        {/* Close button inside fullscreen menu */}
        <button
          onClick={() => setOpen(false)}
          className="nav-fullscreen-close"
          aria-label={ta("closeMenu")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            className={`nav-fullscreen-link${isActive(href) ? " active" : ""}`}
            style={{ "--menu-index": i } as React.CSSProperties}
            aria-current={isActive(href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
