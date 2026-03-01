"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const nextLocale = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggle}
      className="text-sm font-medium px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}
