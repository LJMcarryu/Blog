import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostsByLocale } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const recentPosts = getPostsByLocale(locale).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative py-28 text-center overflow-hidden">
        {/* 渐变光晕 */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 dark:bg-violet-900/40 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-200 dark:bg-sky-900/40 rounded-full blur-3xl opacity-40 translate-x-1/2 translate-y-1/3 pointer-events-none" />

        <div className="relative flex flex-col items-center gap-5">
          <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-xl">👋</span>
            {t("greeting")}
          </span>

          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent pb-1">
            {t("name")}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
            {t("bio")}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <Link
              href="/blog"
              className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              {t("viewPosts")} →
            </Link>
            <a
              href="https://github.com/LJMcarryu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* 最新文章 */}
      {recentPosts.length > 0 && (
        <section className="mt-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {t("latestPosts")}
            </h2>
            <Link
              href="/blog"
              className="text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              {t("viewAll")}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
