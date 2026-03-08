"use client";

import { useEffect, useRef, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function getHeadings(): TocItem[] {
  const article = document.querySelector("article");
  if (!article) return [];

  const nodes = article.querySelectorAll("h2, h3");
  return Array.from(nodes).map((node) => {
    if (!node.id) {
      node.id = node.textContent
        ?.toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
        .replace(/^-|-$/g, "") ?? "";
    }
    return {
      id: node.id,
      text: node.textContent ?? "",
      level: node.tagName === "H2" ? 2 : 3,
    };
  });
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const prevKeyRef = useRef("");

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | null = null;

    function init() {
      const items = getHeadings();
      if (items.length < 2) return;

      // Skip re-init if headings haven't changed
      const key = items.map((h) => h.id).join(",");
      if (key === prevKeyRef.current) return;
      prevKeyRef.current = key;

      setHeadings(items);

      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        { rootMargin: "0px 0px -70% 0px", threshold: 0 }
      );

      const article = document.querySelector("article");
      article?.querySelectorAll("h2, h3").forEach((node) => intersectionObserver?.observe(node));
    }

    // Try immediately, then watch for MDX content to render
    init();

    const article = document.querySelector("article");
    const mutationObserver = article
      ? new MutationObserver(() => init())
      : null;
    mutationObserver?.observe(article!, { childList: true, subtree: true });

    return () => {
      mutationObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <ul>
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.75rem" : 0 }}>
            <a
              href={`#${h.id}`}
              className={activeId === h.id ? "toc-active" : ""}
              aria-current={activeId === h.id ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
