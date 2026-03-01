"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();

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
      <Link href="/" className="nav-logo">
        Jimmy
      </Link>

      {/* Nav: spacer | links */}
      <div className="nav-grid">
        {/* Empty spacer pushes the right side to the far right */}
        <div />

        <div className="nav-right">
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
      </div>
    </header>
  );
}
