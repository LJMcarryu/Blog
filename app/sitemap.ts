import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPostsByLocale } from "@/lib/posts";
import { getSiteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const pages = [
    "",
    "/blog",
    "/about",
    "/projects",
    "/photos",
    "/books",
    "/now",
    "/uses",
    "/links",
  ];

  const staticEntries = routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1.0 : 0.8,
    }))
  );

  const blogEntries = routing.locales.flatMap((locale) =>
    getPostsByLocale(locale).map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...blogEntries];
}
