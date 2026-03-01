export interface NowSection {
  heading: string;
  items: string[];
}

// ✏️ 更新你的"现在"内容，中英文分别编辑 / Edit what you're doing now

const ZH_CONTENT: NowSection[] = [
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

const EN_CONTENT: NowSection[] = [
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

export function getNowByLocale(locale: string): NowSection[] {
  return locale === "zh" ? ZH_CONTENT : EN_CONTENT;
}
