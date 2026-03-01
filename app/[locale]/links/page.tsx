import { getTranslations } from "next-intl/server";

// ✏️ 在这里添加你的收藏链接 / Add your curated links here

const ZH_LINKS = [
  {
    category: "开发资源",
    items: [
      { title: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "前端开发权威文档" },
      { title: "Can I use", url: "https://caniuse.com", desc: "浏览器兼容性查询" },
      { title: "DevDocs", url: "https://devdocs.io", desc: "多语言/框架 API 文档聚合" },
    ],
  },
  {
    category: "设计灵感",
    items: [
      { title: "Dribbble", url: "https://dribbble.com", desc: "设计师作品集平台" },
      { title: "Awwwards", url: "https://www.awwwards.com", desc: "优秀网页设计奖项" },
      { title: "Coolors", url: "https://coolors.co", desc: "配色方案生成器" },
    ],
  },
  {
    category: "实用工具",
    items: [
      { title: "Excalidraw", url: "https://excalidraw.com", desc: "手绘风格白板工具" },
      { title: "Ray.so", url: "https://ray.so", desc: "代码截图美化工具" },
      { title: "Carbon", url: "https://carbon.now.sh", desc: "另一款代码图片生成器" },
    ],
  },
  {
    category: "阅读",
    items: [
      { title: "Hacker News", url: "https://news.ycombinator.com", desc: "科技与创业资讯" },
    ],
  },
];

const EN_LINKS = [
  {
    category: "Dev Resources",
    items: [
      { title: "MDN Web Docs", url: "https://developer.mozilla.org", desc: "The authoritative frontend reference" },
      { title: "Can I use", url: "https://caniuse.com", desc: "Browser compatibility tables" },
      { title: "DevDocs", url: "https://devdocs.io", desc: "Aggregated API docs for many languages" },
    ],
  },
  {
    category: "Design Inspiration",
    items: [
      { title: "Dribbble", url: "https://dribbble.com", desc: "Designer portfolio platform" },
      { title: "Awwwards", url: "https://www.awwwards.com", desc: "Awards for best web design" },
      { title: "Coolors", url: "https://coolors.co", desc: "Color palette generator" },
    ],
  },
  {
    category: "Tools",
    items: [
      { title: "Excalidraw", url: "https://excalidraw.com", desc: "Hand-drawn style whiteboard" },
      { title: "Ray.so", url: "https://ray.so", desc: "Beautiful code screenshot maker" },
      { title: "Carbon", url: "https://carbon.now.sh", desc: "Another code image creator" },
    ],
  },
  {
    category: "Reading",
    items: [
      { title: "Hacker News", url: "https://news.ycombinator.com", desc: "Tech and startup news" },
    ],
  },
];

export default async function LinksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "links" });
  const links = locale === "zh" ? ZH_LINKS : EN_LINKS;

  return (
    <div className="prose prose-gray dark:prose-invert m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base text-gray-500 dark:text-gray-400 slide-enter-2">
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        {links.map((section) => (
          <div key={section.category}>
            <h3>{section.category}</h3>
            <div className="not-prose flex flex-col gap-2">
              {section.items.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-4 group"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors w-36 shrink-0">
                    {link.title} ↗
                  </span>
                  <span className="text-sm text-gray-400">{link.desc}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
