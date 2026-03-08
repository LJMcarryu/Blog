"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("a11y");

  const toggle = () => {
    const nextLocale = locale === "zh" ? "en" : "zh";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button onClick={toggle} className="nav-link" title={t("toggleLang")} aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}>
      {locale === "zh" ? "EN" : "中"}
    </button>
  );
}
