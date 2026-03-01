export interface UsesItem {
  name: string;
  desc: string;
}

export interface UsesSection {
  category: string;
  items: UsesItem[];
}

const ZH_USES: UsesSection[] = [
  {
    category: "硬件",
    items: [
      { name: "Windows 台式机", desc: "日常开发和游戏" },
      { name: "机械键盘", desc: "码字利器，段落轴手感很棒" },
      { name: "27\" 4K 显示器", desc: "代码和设计都需要大屏" },
    ],
  },
  {
    category: "编辑器 & 终端",
    items: [
      { name: "VS Code", desc: "主力编辑器，搭配 GitHub Theme" },
      { name: "Windows Terminal", desc: "配合 Git Bash 使用" },
      { name: "JetBrains Mono", desc: "等宽字体，连字符看着舒服" },
    ],
  },
  {
    category: "开发工具",
    items: [
      { name: "Git", desc: "版本控制，每天都在用" },
      { name: "Docker", desc: "本地开发环境容器化" },
      { name: "Postman", desc: "API 调试必备" },
      { name: "Claude Code", desc: "AI 编程助手，写代码效率翻倍" },
    ],
  },
  {
    category: "日常应用",
    items: [
      { name: "Notion", desc: "笔记和项目管理" },
      { name: "Figma", desc: "UI 设计和原型" },
      { name: "Excalidraw", desc: "快速画架构图和流程图" },
    ],
  },
];

const EN_USES: UsesSection[] = [
  {
    category: "Hardware",
    items: [
      { name: "Windows Desktop", desc: "Daily development and gaming" },
      { name: "Mechanical Keyboard", desc: "Great for typing, tactile switches" },
      { name: "27\" 4K Monitor", desc: "Big screen for code and design" },
    ],
  },
  {
    category: "Editor & Terminal",
    items: [
      { name: "VS Code", desc: "Primary editor with GitHub Theme" },
      { name: "Windows Terminal", desc: "Paired with Git Bash" },
      { name: "JetBrains Mono", desc: "Monospace font with ligatures" },
    ],
  },
  {
    category: "Dev Tools",
    items: [
      { name: "Git", desc: "Version control, used daily" },
      { name: "Docker", desc: "Containerized local dev environment" },
      { name: "Postman", desc: "Essential for API debugging" },
      { name: "Claude Code", desc: "AI coding assistant, doubles productivity" },
    ],
  },
  {
    category: "Apps",
    items: [
      { name: "Notion", desc: "Notes and project management" },
      { name: "Figma", desc: "UI design and prototyping" },
      { name: "Excalidraw", desc: "Quick architecture and flow diagrams" },
    ],
  },
];

export function getUsesByLocale(locale: string): UsesSection[] {
  return locale === "zh" ? ZH_USES : EN_USES;
}
