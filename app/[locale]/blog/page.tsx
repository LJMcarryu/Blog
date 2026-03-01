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
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <SearchBar placeholder={t("searchPlaceholder")} />
      <div className="mt-8 flex flex-col gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-12">{t("noResults")}</p>
        )}
      </div>
    </div>
  );
}
