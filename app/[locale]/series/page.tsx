import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllSeries } from "@/lib/series";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "series" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "series" });
  const allSeries = getAllSeries();

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <div className="not-prose mt-8 flex flex-col gap-6 slide-enter-2">
        {allSeries.map((series) => (
          <Link
            key={series.id}
            href={`/series/${series.id}`}
            className="group block rounded-lg p-5 transition-colors"
            style={{
              textDecoration: "none",
              backgroundColor: "var(--search-bg)",
            }}
          >
            <h2
              className="text-base font-medium transition-opacity group-hover:opacity-100"
              style={{ color: "var(--fg)", opacity: 0.85 }}
            >
              {series.title[locale as Locale]}
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--fg-light)" }}
            >
              {series.description[locale as Locale]}
            </p>
            <span
              className="text-xs mt-2 inline-block"
              style={{ color: "var(--fg-light)" }}
            >
              {t("postCount", { count: series.posts.length })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
