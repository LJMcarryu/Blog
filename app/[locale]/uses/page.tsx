import { getTranslations } from "next-intl/server";

// ✏️ 填写你使用的工具 / Fill in your tools and setup

const ZH_USES = [
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

const EN_USES = [
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

export default async function UsesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "uses" });
  const uses = locale === "zh" ? ZH_USES : EN_USES;

  return (
    <div className="prose prose-gray dark:prose-invert m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base text-gray-500 dark:text-gray-400 slide-enter-2">
        {t("subtitle")}
      </p>

      <div className="slide-enter-3">
        {uses.map((section) => (
          <div key={section.category}>
            <h3>{section.category}</h3>
            <div className="not-prose flex flex-col gap-3">
              {section.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-medium text-sm text-gray-700 dark:text-gray-300 w-36 shrink-0">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
