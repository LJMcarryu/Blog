import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPostsByLocale } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";

const POSTS_PER_PAGE = 10;

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
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}) {
  const { locale } = await params;
  const { q, tag, page } = await searchParams;
  const t = await getTranslations({ locale, namespace: "blog" });

  const allPosts = getPostsByLocale(locale);

  // Collect all unique tags
  const allTags = Array.from(
    new Set(allPosts.flatMap((p) => p.tags ?? []))
  ).sort();

  let posts = allPosts;

  // Filter by tag
  if (tag) {
    posts = posts.filter((p) => p.tags?.includes(tag));
  }

  // Filter by search query
  if (q) {
    const query = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }

  // Pagination
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = posts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  // Build base href for pagination links (preserve tag + search params)
  const baseParams = new URLSearchParams();
  if (tag) baseParams.set("tag", tag);
  if (q) baseParams.set("q", q);
  const baseHref = baseParams.toString() ? `?${baseParams.toString()}` : "?";

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <div className="not-prose slide-enter-2">
        <SearchBar placeholder={t("searchPlaceholder")} />
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="not-prose mt-4 flex flex-wrap gap-2 slide-enter-2">
          <a
            href={q ? `?q=${encodeURIComponent(q)}` : "?"}
            className="tag-pill"
            data-active={!tag ? "true" : undefined}
          >
            {locale === "zh" ? "全部" : "All"}
          </a>
          {allTags.map((t) => (
            <a
              key={t}
              href={`?tag=${encodeURIComponent(t)}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className="tag-pill"
              data-active={tag === t ? "true" : undefined}
            >
              {t}
            </a>
          ))}
        </div>
      )}

      <div className="not-prose mt-8 flex flex-col gap-4 slide-enter-3">
        {paginatedPosts.map((post) => (
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

      {posts.length > 0 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          locale={locale}
          baseHref={baseHref}
        />
      )}
    </div>
  );
}
