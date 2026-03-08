import { routing } from "@/i18n/routing";
import { getPostsByLocale } from "@/lib/posts";
import { getSiteUrl } from "@/lib/env";

function escapeCdata(str: string): string {
  return str.replace(/]]>/g, "]]]]><![CDATA[>");
}

export async function GET() {
  const baseUrl = getSiteUrl();

  const allPosts = routing.locales.flatMap((locale) =>
    getPostsByLocale(locale).map((post) => ({ ...post, locale }))
  );

  // Use the most recent post date as lastBuildDate
  const latestDate = allPosts.reduce((latest, post) => {
    if (!post.date) return latest;
    const d = new Date(post.date);
    return d > latest ? d : latest;
  }, new Date(0));

  const items = allPosts
    .map(
      (post) => `    <item>
      <title><![CDATA[${escapeCdata(post.title)}]]></title>
      <link>${baseUrl}/${post.locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${post.locale}/blog/${post.slug}</guid>
      <description><![CDATA[${escapeCdata(post.description || "")}]]></description>
      <author>Jimmy</author>${
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
    <description>Jimmy's personal blog</description>
    <language>zh-CN</language>
    <lastBuildDate>${latestDate.getTime() > 0 ? latestDate.toUTCString() : new Date().toUTCString()}</lastBuildDate>
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
