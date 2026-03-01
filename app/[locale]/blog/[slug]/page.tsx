import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPostsByLocale } from "@/lib/posts";
import { getReadingTime } from "@/lib/reading-time";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import Comments from "@/components/Comments";
import TableOfContents from "@/components/TableOfContents";
import CodeCopyButton from "@/components/CodeCopyButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return { title: "Not Found" };

  const description =
    post.description ||
    post.content
      .replace(/^import\s.*$/gm, "")
      .replace(/[#*`~>\[\]!_-]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  return getPostsByLocale(params.locale).map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  const readingTime = getReadingTime(post.content, locale);

  // Get prev/next posts
  const allPosts = getPostsByLocale(locale);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article>
      {/* Header — staggered entry */}
      <div className="slide-enter-content prose m-auto mb-8">
        <Link
          href="/blog"
          className="not-prose text-sm transition-opacity opacity-50 hover:opacity-100"
          style={{ color: "var(--fg)" }}
        >
          ← {t("backToList")}
        </Link>
        <h1 className="mt-6 mb-2">{post.title}</h1>
        <p className="not-prose text-sm flex flex-wrap items-center gap-3" style={{ color: "var(--fg-light)" }}>
          <span>{post.date}</span>
          <span>·</span>
          <span>{readingTime}</span>
          {post.tags && post.tags.length > 0 && (
            <>
              <span>·</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="tag-pill-sm"
                >
                  {tag}
                </Link>
              ))}
            </>
          )}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="prose m-auto slide-enter-content">
        <TableOfContents />
      </div>

      {/* Article body — auto-staggers each MDX element */}
      <div className="prose m-auto slide-enter-content">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: {
                      dark: "github-dark-dimmed",
                      light: "github-light",
                    },
                    keepBackground: false,
                  },
                ],
              ],
            },
          }}
        />
        <CodeCopyButton />
      </div>

      {/* Prev / Next navigation */}
      {(prevPost || nextPost) && (
        <nav className="prose m-auto mt-12 not-prose" aria-label="Post navigation">
          <hr className="mb-6" style={{ width: "50px", borderColor: "rgba(125,125,125,0.25)" }} />
          <div className="flex justify-between gap-4 text-sm">
            <div className="flex-1">
              {prevPost && (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="post-nav-link"
                >
                  <span className="post-nav-label">
                    ← {locale === "zh" ? "上一篇" : "Previous"}
                  </span>
                  <span className="post-nav-title">{prevPost.title}</span>
                </Link>
              )}
            </div>
            <div className="flex-1 text-right">
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="post-nav-link"
                >
                  <span className="post-nav-label">
                    {locale === "zh" ? "下一篇" : "Next"} →
                  </span>
                  <span className="post-nav-title">{nextPost.title}</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      <div className="mt-16">
        <Comments />
      </div>
    </article>
  );
}
