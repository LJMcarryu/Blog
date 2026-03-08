import { routing } from "@/i18n/routing";
import { getPostsByLocale } from "@/lib/posts";
import { getSiteUrl } from "@/lib/env";

export async function GET() {
  const baseUrl = getSiteUrl();

  const allPosts = routing.locales.flatMap((locale) =>
    getPostsByLocale(locale).map((post) => ({ ...post, locale }))
  );

  const items = allPosts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${post.locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${post.locale}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description || ""}]]></description>${
        post.date
          ? `\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`
          : ""
      }
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jimmy's Blog</title>
    <link>${baseUrl}</link>
    <description>个人博客 | Personal Blog</description>
    <language>zh</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
