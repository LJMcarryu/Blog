import { getTranslations } from "next-intl/server";

// ✏️ 更新你的"现在"内容，中英文分别编辑 / Edit what you're doing now

const ZH_CONTENT = [
  {
    heading: "正在做",
    items: ["[ 当前项目或工作内容 ]", "[ 正在学习的技术或技能 ]"],
  },
  {
    heading: "正在读",
    items: ["[ 书名 · 作者 ]"],
  },
  {
    heading: "正在听",
    items: ["[ 歌手 / 专辑 ]"],
  },
  {
    heading: "最近在思考",
    items: ["[ 最近在思考的话题或问题 ]"],
  },
];

const EN_CONTENT = [
  {
    heading: "Working on",
    items: ["[ Current project / work ]", "[ Something I'm learning ]"],
  },
  {
    heading: "Reading",
    items: ["[ Book title · Author ]"],
  },
  {
    heading: "Listening to",
    items: ["[ Artist / Album ]"],
  },
  {
    heading: "Thinking about",
    items: ["[ A topic or question I've been pondering ]"],
  },
];

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "now" });
  const content = locale === "zh" ? ZH_CONTENT : EN_CONTENT;

  return (
    <div className="prose prose-gray dark:prose-invert m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-sm text-gray-500 dark:text-gray-400 mb-8 slide-enter-2">
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        {content.map((section) => (
          <div key={section.heading}>
            <h3>{section.heading}</h3>
            <ul>
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
