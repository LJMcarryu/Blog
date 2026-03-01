import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getUsesByLocale } from "@/data/uses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "uses" });
  return { title: t("title") };
}

export default async function UsesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "uses" });
  const uses = getUsesByLocale(locale);

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base slide-enter-2" style={{ color: "var(--fg-light)" }}>
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        {uses.map((section) => (
          <div key={section.category}>
            <h3>{section.category}</h3>
            <div className="not-prose flex flex-col gap-3">
              {section.items.map((item) => (
                <div key={item.name} className="flex gap-4">
                  <span className="font-medium text-sm w-36 shrink-0" style={{ color: "var(--fg)" }}>
                    {item.name}
                  </span>
                  <span className="text-sm" style={{ color: "var(--fg-light)" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
