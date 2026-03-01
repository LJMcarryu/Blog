import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getPostsByLocale } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Comments from "@/components/Comments";

export function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  if (!params?.locale) return [];
  return getPostsByLocale(params.locale).map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = useTranslations("blog");
  const post = getPostBySlug(slug, locale);

  if (!post) notFound();

  return (
    <article>
      <Link
        href="/blog"
        className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 mb-6 inline-block"
      >
        ← {t("backToList")}
      </Link>
      <h1 className="text-4xl font-bold mt-4 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{post.date}</p>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
      <div className="mt-16">
        <Comments />
      </div>
    </article>
  );
}
