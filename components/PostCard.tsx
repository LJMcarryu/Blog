import { Link } from "@/i18n/navigation";
import { Post } from "@/lib/posts";

export default function PostCard({
  post,
  locale,
}: {
  post: Post;
  locale: string;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
        <p className="text-xs text-gray-400 mb-2">{post.date}</p>
        <h2 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2">
            {post.description}
          </p>
        )}
      </article>
    </Link>
  );
}
