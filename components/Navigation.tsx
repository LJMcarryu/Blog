"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/blog",     label: t("blog") },
    { href: "/projects", label: t("projects") },
    { href: "/photos",   label: t("photos") },
    { href: "/about",    label: t("about") },
  ];

  // Prefix-match: /blog/my-post → Blog is active
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="relative z-40">
      {/* Site logo — absolute top-left (antfu.me style) */}
      <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
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
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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

      {/* Mobile dropdown menu */}
      {open && (
        <nav className="nav-mobile-menu" aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-mobile-link${isActive(href) ? " active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
