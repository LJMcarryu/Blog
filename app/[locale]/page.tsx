import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostsByLocale } from "@/lib/posts";
import { SOCIAL_LINKS } from "@/data/social-links";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const recentPosts = getPostsByLocale(locale).slice(0, 5);

  return (
    <div className="prose m-auto">
      {/*
        Name appears LAST (stage 50 = 4.5 s) — antfu.me signature reveal.
        Content below auto-staggers from stage 1 via slide-enter-content.
      */}
      <h1 className="mb-1 slide-enter-50">{t("name")}</h1>

      <div className="slide-enter-content">
        {/* Tagline */}
        <p className="not-prose text-sm" style={{ color: "var(--fg-light)" }}>
          {t("tagline")}
        </p>

        {/* Bio */}
        <div>
          <p>{t("bio")}</p>
        </div>

        {/* Social links */}
        <div>
          <hr />
          <p>{t("findMeOn")}</p>
          <div className="not-prose flex flex-wrap gap-x-5 gap-y-2 -mt-2">
            {SOCIAL_LINKS.filter(({ href }) => href !== "#").map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                style={{ color: "var(--fg-light)" }}
                className="text-sm transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Recent posts */}
        {recentPosts.length > 0 && (
          <div>
            <hr />
            <h3 className="mb-5">{t("latestPosts")}</h3>
            <div className="not-prose flex flex-col gap-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="not-prose flex items-baseline gap-5 group"
                >
                  <time
                    className="text-xs tabular-nums shrink-0 w-24"
                    style={{ color: "var(--fg-light)" }}
                  >
                    {post.date}
                  </time>
                  <span
                    className="text-sm transition-colors group-hover:text-black dark:group-hover:text-white"
                    style={{ color: "var(--fg)" }}
                  >
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="not-prose text-sm mt-6 inline-block transition-opacity opacity-50 hover:opacity-100"
              style={{ color: "var(--fg)" }}
            >
              {t("viewAll")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
