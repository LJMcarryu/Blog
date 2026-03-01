"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
