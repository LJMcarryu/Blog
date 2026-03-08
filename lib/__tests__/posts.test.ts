import { describe, it, expect } from "vitest";
import { getPostsByLocale, getPostBySlug } from "../posts";
import type { Locale } from "@/i18n/routing";

describe("getPostsByLocale", () => {
  it("returns posts sorted by date (newest first)", () => {
    const posts = getPostsByLocale("zh");
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1].date).getTime();
      const curr = new Date(posts[i].date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("returns empty array for missing locale directory", () => {
    const posts = getPostsByLocale("nonexistent" as Locale);
    expect(posts).toEqual([]);
  });

  it("parses frontmatter fields correctly", () => {
    const posts = getPostsByLocale("zh");
    const post = posts.find((p) => p.slug === "building-my-blog");
    expect(post).toBeDefined();
    expect(post!.title).toBe("从零搭建个人博客：Next.js 16 + MDX 全记录");
    expect(post!.date).toBe("2026-03-01");
    expect(post!.tags).toContain("Next.js");
    expect(post!.description).toBeTruthy();
  });

  it("returns posts with content", () => {
    const posts = getPostsByLocale("en");
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.content).toBeTruthy();
    }
  });
});

describe("getPostBySlug", () => {
  it("returns a post for a valid slug", () => {
    const post = getPostBySlug("building-my-blog", "zh");
    expect(post).not.toBeNull();
    expect(post!.slug).toBe("building-my-blog");
    expect(post!.title).toBe("从零搭建个人博客：Next.js 16 + MDX 全记录");
  });

  it("returns null for non-existent slug", () => {
    const post = getPostBySlug("does-not-exist", "zh");
    expect(post).toBeNull();
  });

  it("returns null for non-existent locale", () => {
    const post = getPostBySlug("building-my-blog", "nonexistent" as Locale);
    expect(post).toBeNull();
  });

  it("returns tags as an array", () => {
    const post = getPostBySlug("building-my-blog", "zh");
    expect(post).not.toBeNull();
    expect(Array.isArray(post!.tags)).toBe(true);
  });
});
