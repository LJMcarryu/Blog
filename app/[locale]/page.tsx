import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostsByLocale } from "@/lib/posts";

// ✏️ 填写你的社交链接
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/LJMcarryu" },
  { label: "Twitter / X", href: "#" },
  { label: "Email", href: "mailto:your@email.com" },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const recentPosts = getPostsByLocale(locale).slice(0, 5);

  return (
    <div className="prose prose-gray dark:prose-invert m-auto">
      {/* 名字 */}
      <h1 className="mb-1 slide-enter-1">{t("name")}</h1>

      {/* 一句话简介 */}
      <p className="not-prose text-base text-gray-500 dark:text-gray-400 slide-enter-2">
        {t("tagline")}
      </p>

      {/* 个人简介 */}
      <div className="slide-enter-3">
        <p>{t("bio")}</p>
      </div>

      {/* 社交链接 */}
      <div className="slide-enter-4">
        <hr />
        <p>{t("findMeOn")}</p>
        <div className="not-prose flex flex-wrap gap-x-5 gap-y-2 -mt-2">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* 最新文章 */}
      {recentPosts.length > 0 && (
        <div className="slide-enter-5">
          <hr />
          <h3 className="mb-5">{t("latestPosts")}</h3>
          <div className="not-prose flex flex-col gap-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-baseline gap-5 group"
              >
                <time className="text-xs text-gray-400 shrink-0 tabular-nums w-24">
                  {post.date}
                </time>
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className="not-prose text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mt-6 inline-block transition-colors"
          >
            {t("viewAll")}
          </Link>
        </div>
      )}
    </div>
  );
}
