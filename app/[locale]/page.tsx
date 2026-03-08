import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostsByLocale } from "@/lib/posts";
import { SOCIAL_LINKS } from "@/data/social-links";
import ThemedVideo from "@/components/ThemedVideo";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const recentPosts = getPostsByLocale(locale).slice(0, 5);

  return (
    <div className="relative min-h-screen w-screen -ml-[calc((100vw-100%)/2)] overflow-hidden">
      {/* Video background */}
      <ThemedVideo />
      <div className="fixed inset-0 bg-white/30 dark:bg-black/30 -z-10" />

      {/* All content on top of video */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
        <div className="prose dark:prose-invert m-auto">
          <h1 className="mb-1 slide-enter-50 font-caveat">{t("name")}</h1>

          <div className="slide-enter-content">
            {/* Tagline */}
            <p className="not-prose text-sm text-black/50 dark:text-white/70">
              {t("tagline")}
            </p>

            {/* Bio */}
            <div>
              <p>{t("bio")}</p>
            </div>

            {/* Social links */}
            <div>
              <hr className="border-black/15 dark:border-white/20" />
              <p>{t("findMeOn")}</p>
              <div className="not-prose flex flex-wrap gap-x-5 gap-y-2 -mt-2">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="text-sm text-black/50 dark:text-white/60 transition-opacity hover:opacity-100"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Recent posts */}
            {recentPosts.length > 0 && (
              <div>
                <hr className="border-black/15 dark:border-white/20" />
                <h3 className="mb-5">{t("latestPosts")}</h3>
                <div className="not-prose flex flex-col gap-3">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="not-prose flex items-baseline gap-5 group"
                    >
                      <time className="text-xs tabular-nums shrink-0 w-24 text-black/40 dark:text-white/50">
                        {post.date}
                      </time>
                      <span className="text-sm text-black/70 dark:text-white/75 transition-opacity group-hover:opacity-100">
                        {post.title}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog"
                  className="not-prose text-sm mt-6 inline-block text-black/40 dark:text-white/50 transition-opacity hover:opacity-100"
                >
                  {t("viewAll")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
