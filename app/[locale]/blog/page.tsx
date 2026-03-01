import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPostsByLocale } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: "blog" });

  let posts = getPostsByLocale(locale);

  if (q) {
    const query = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.description?.toLowerCase().includes(query))
    );
  }

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <div className="not-prose slide-enter-2">
        <SearchBar placeholder={t("searchPlaceholder")} />
      </div>
      <div className="not-prose mt-8 flex flex-col gap-4 slide-enter-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {posts.length === 0 && (
          <p
            className="text-sm text-center py-12"
            style={{ color: "var(--fg-light)" }}
          >
            {t("noResults")}
          </p>
        )}
      </div>
    </div>
  );
}
