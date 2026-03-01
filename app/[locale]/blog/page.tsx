import { getTranslations } from "next-intl/server";
import { getPostsByLocale } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getPostsByLocale(locale);

  return (
    <div className="prose m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <div className="not-prose slide-enter-2">
        <SearchBar placeholder={t("searchPlaceholder")} />
      </div>
      <div className="not-prose mt-8 flex flex-col gap-4 slide-enter-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
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
