"use client";

import { useState, useRef, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    // Clamp to viewport bounds
    const x = Math.min(e.clientX + 16, window.innerWidth - 300);
    const y = Math.min(e.clientY + 16, window.innerHeight - 120);
    setPos({ x, y });
    setHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
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
            className="text-sm font-medium transition-opacity group-hover:opacity-100"
            style={{ color: "var(--fg)", opacity: 0.75 }}
          >
            {post.title}
          </span>
          {post.tags && post.tags.length > 0 && (
            <span className="inline-flex gap-1.5 ml-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    color: "var(--fg-light)",
                    backgroundColor: "var(--bg-subtle)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
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

      {/* Hover preview card following cursor */}
      {hover && post.description && (
        <div
          className="post-hover-card"
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
          }}
          aria-hidden="true"
        >
          <p>{post.description}</p>
        </div>
      )}
    </div>
  );
}
