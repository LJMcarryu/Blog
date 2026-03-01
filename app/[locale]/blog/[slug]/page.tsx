import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPostsByLocale } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Comments from "@/components/Comments";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description || post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.description || post.content.slice(0, 160),
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
        <p className="not-prose text-sm" style={{ color: "var(--fg-light)" }}>
          {post.date}
        </p>
      </div>

      {/* Article body — auto-staggers each MDX element */}
      <div className="prose m-auto slide-enter-content">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-16">
        <Comments />
      </div>
    </article>
  );
}
