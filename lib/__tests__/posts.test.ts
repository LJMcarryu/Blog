import { describe, it, expect } from "vitest";
import { getPostsByLocale, getPostBySlug } from "../posts";

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
    const posts = getPostsByLocale("nonexistent");
    expect(posts).toEqual([]);
  });

  it("parses frontmatter fields correctly", () => {
    const posts = getPostsByLocale("zh");
    const hello = posts.find((p) => p.slug === "hello-world");
    expect(hello).toBeDefined();
    expect(hello!.title).toBe("你好，世界");
    expect(hello!.date).toBe("2026-03-01");
    expect(hello!.tags).toContain("随笔");
    expect(hello!.description).toBeTruthy();
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
    const post = getPostBySlug("hello-world", "zh");
    expect(post).not.toBeNull();
    expect(post!.slug).toBe("hello-world");
    expect(post!.title).toBe("你好，世界");
  });

  it("returns null for non-existent slug", () => {
    const post = getPostBySlug("does-not-exist", "zh");
    expect(post).toBeNull();
  });

  it("returns null for non-existent locale", () => {
    const post = getPostBySlug("hello-world", "nonexistent");
    expect(post).toBeNull();
  });

  it("returns tags as an array", () => {
    const post = getPostBySlug("hello-world", "zh");
    expect(Array.isArray(post!.tags)).toBe(true);
  });
});
