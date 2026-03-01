export interface UsesItem {
  name: string;
  desc: string;
}

export interface UsesSection {
  category: string;
  items: UsesItem[];
}

// ✏️ 填写你使用的工具 / Fill in your tools and setup

const ZH_USES: UsesSection[] = [
  {
    category: "硬件",
    items: [
      { name: "[ 电脑型号 ]", desc: "[ 例：MacBook Pro 14\" M3 / 自组台式机 ]" },
      { name: "[ 手机型号 ]", desc: "[ 例：iPhone 15 Pro ]" },
      { name: "[ 外设 ]", desc: "[ 例：机械键盘、显示器等 ]" },
    ],
  },
  {
    category: "编辑器 & 终端",
    items: [
      { name: "[ 编辑器 ]", desc: "[ 例：VS Code，使用 One Dark Pro 主题 ]" },
      { name: "[ 终端 ]", desc: "[ 例：Windows Terminal / iTerm2 ]" },
      { name: "[ 字体 ]", desc: "[ 例：JetBrains Mono ]" },
    ],
  },
  {
    category: "开发工具",
    items: [
      { name: "[ 工具名 ]", desc: "[ 工具用途描述 ]" },
      { name: "[ 工具名 ]", desc: "[ 工具用途描述 ]" },
    ],
  },
  {
    category: "日常应用",
    items: [
      { name: "[ 应用名 ]", desc: "[ 应用用途描述 ]" },
      { name: "[ 应用名 ]", desc: "[ 应用用途描述 ]" },
    ],
  },
];

const EN_USES: UsesSection[] = [
  {
    category: "Hardware",
    items: [
      { name: "[ Computer ]", desc: "[ e.g. MacBook Pro 14\" M3 / Custom Desktop ]" },
      { name: "[ Phone ]", desc: "[ e.g. iPhone 15 Pro ]" },
      { name: "[ Peripherals ]", desc: "[ e.g. Mechanical keyboard, monitor, etc. ]" },
    ],
  },
  {
    category: "Editor & Terminal",
    items: [
      { name: "[ Editor ]", desc: "[ e.g. VS Code with One Dark Pro theme ]" },
      { name: "[ Terminal ]", desc: "[ e.g. Windows Terminal / iTerm2 ]" },
      { name: "[ Font ]", desc: "[ e.g. JetBrains Mono ]" },
    ],
  },
  {
    category: "Dev Tools",
    items: [
      { name: "[ Tool name ]", desc: "[ What you use it for ]" },
      { name: "[ Tool name ]", desc: "[ What you use it for ]" },
    ],
  },
  {
    category: "Apps",
    items: [
      { name: "[ App name ]", desc: "[ What you use it for ]" },
      { name: "[ App name ]", desc: "[ What you use it for ]" },
    ],
  },
];

export function getUsesByLocale(locale: string): UsesSection[] {
  return locale === "zh" ? ZH_USES : EN_USES;
}
