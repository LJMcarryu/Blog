import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllSeries, getSeriesById } from "@/lib/series";
import { getPostBySlug } from "@/lib/posts";
import { getSiteUrl } from "@/lib/env";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const series = getSeriesById(id);
  if (!series) return { title: "Not Found" };

  const title = series.title[locale as Locale];
  const description = series.description[locale as Locale];

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  const allSeries = getAllSeries();

  for (const locale of routing.locales) {
    for (const series of allSeries) {
      params.push({ locale, id: series.id });
    }
  }

  return params;
}

export const dynamicParams = false;

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "series" });
  const series = getSeriesById(id);

  if (!series) notFound();

  const posts = series.posts.map((slug) => ({
    slug,
    post: getPostBySlug(slug, locale as Locale),
  }));

  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: series.title[locale as Locale],
    description: series.description[locale as Locale],
    numberOfItems: series.posts.length,
    itemListElement: posts.map(({ slug, post }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/${locale}/blog/${slug}`,
      name: post?.title ?? slug,
    })),
  };

  return (
    <div className="prose m-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="slide-enter-content mb-8">
        <Link
          href="/series"
          className="not-prose text-sm transition-opacity opacity-50 hover:opacity-100"
          style={{ color: "var(--fg)" }}
        >
          ← {t("backToList")}
        </Link>
        <h1 className="mt-6 mb-2">{series.title[locale as Locale]}</h1>
        <p className="text-sm" style={{ color: "var(--fg-light)" }}>
          {series.description[locale as Locale]}
        </p>
        <span className="text-xs" style={{ color: "var(--fg-light)" }}>
          {t("postCount", { count: series.posts.length })}
        </span>
      </div>

      <div className="not-prose flex flex-col gap-3 slide-enter-content">
        {posts.map(({ slug, post }, i) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="group flex items-baseline gap-4"
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-xs tabular-nums shrink-0 w-6 text-right"
              style={{ color: "var(--fg-light)" }}
            >
              {i + 1}
            </span>
            <div>
              <span
                className="text-sm font-medium transition-opacity group-hover:opacity-100"
                style={{ color: "var(--fg)", opacity: 0.75 }}
              >
                {post?.title ?? slug}
              </span>
              {post?.date && (
                <span
                  className="text-xs ml-2"
                  style={{ color: "var(--fg-light)" }}
                >
                  {post.date}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
