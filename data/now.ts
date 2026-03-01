export interface NowSection {
  heading: string;
  items: string[];
}

const ZH_CONTENT: NowSection[] = [
  {
    heading: "正在做",
    items: [
      "打磨个人博客，添加代码高亮、RSS 和更多功能",
      "学习 Rust 和系统编程",
      "探索 AI 辅助编程工作流",
    ],
  },
  {
    heading: "正在读",
    items: [
      "《Designing Data-Intensive Applications》· Martin Kleppmann",
      "《深入理解 TypeScript》· Basarat Ali Syed",
    ],
  },
  {
    heading: "正在听",
    items: ["Lofi Hip Hop · 写代码的 BGM", "Joe Hisaishi · 久石让的钢琴曲"],
  },
  {
    heading: "最近在思考",
    items: [
      "如何在 AI 时代保持核心竞争力",
      "开源项目的可持续发展模式",
    ],
  },
];

const EN_CONTENT: NowSection[] = [
  {
    heading: "Working on",
    items: [
      "Polishing my personal blog — adding code highlighting, RSS, and more",
      "Learning Rust and systems programming",
      "Exploring AI-assisted coding workflows",
    ],
  },
  {
    heading: "Reading",
    items: [
      "Designing Data-Intensive Applications · Martin Kleppmann",
      "Deep Dive into TypeScript · Basarat Ali Syed",
    ],
  },
  {
    heading: "Listening to",
    items: ["Lofi Hip Hop · Coding BGM", "Joe Hisaishi · Piano collections"],
  },
  {
    heading: "Thinking about",
    items: [
      "Staying competitive in the age of AI",
      "Sustainable models for open-source projects",
    ],
  },
];

export function getNowByLocale(locale: string): NowSection[] {
  return locale === "zh" ? ZH_CONTENT : EN_CONTENT;
}
