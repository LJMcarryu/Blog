import { Link } from "@/i18n/navigation";
import { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post; locale: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-baseline gap-5"
      style={{ textDecoration: "none" }}
    >
      <time
        className="text-xs tabular-nums shrink-0 w-24"
        style={{ color: "var(--fg-light)" }}
      >
        {post.date}
      </time>
      <div>
        <span
          className="text-sm font-medium transition-colors group-hover:text-black dark:group-hover:text-white"
          style={{ color: "var(--fg)" }}
        >
          {post.title}
        </span>
        {post.description && (
          <p
            className="text-xs mt-0.5 line-clamp-1"
            style={{ color: "var(--fg-light)" }}
          >
            {post.description}
          </p>
        )}
      </div>
    </Link>
  );
}
