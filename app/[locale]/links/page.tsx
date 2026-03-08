import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLinksByLocale } from "@/data/links";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "links" });
  return { title: t("title") };
}

export default async function LinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "links" });
  const links = getLinksByLocale(locale as Locale);

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base slide-enter-2" style={{ color: "var(--fg-light)" }}>
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        {links.map((section) => (
          <div key={section.category}>
            <h3>{section.category}</h3>
            <div className="not-prose flex flex-col gap-2">
              {section.items.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-4 group"
                >
                  <span className="text-sm font-medium transition-opacity group-hover:opacity-100 w-36 shrink-0" style={{ color: "var(--fg)", opacity: 0.75 }}>
                    {link.title} ↗
                  </span>
                  <span className="text-sm" style={{ color: "var(--fg-light)" }}>{link.desc}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
