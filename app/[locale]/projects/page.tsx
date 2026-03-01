import { getTranslations } from "next-intl/server";

// ✏️ 在这里添加你的项目 / Add your projects here
const PROJECTS = [
  {
    name: "个人博客 / Personal Blog",
    description: {
      zh: "用 Next.js 15 + Tailwind CSS v4 构建的中英双语个人博客，支持 MDX 文章和 Giscus 评论。",
      en: "A bilingual personal blog built with Next.js 15 + Tailwind CSS v4, supporting MDX posts and Giscus comments.",
    },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "next-intl"],
    github: "https://github.com/LJMcarryu/Blog",
    live: "#",
  },
  // 在下方继续添加项目...
  // {
  //   name: "项目名称",
  //   description: { zh: "中文描述", en: "English description" },
  //   tech: ["Tech1", "Tech2"],
  //   github: "https://github.com/...",
  //   live: "https://...",
  // },
];

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <div className="prose prose-gray dark:prose-invert m-auto">
      <h1 className="slide-enter-1">{t("title")}</h1>
      <p className="not-prose text-base text-gray-500 dark:text-gray-400 slide-enter-2">
        {t("subtitle")}
      </p>

      <div className="not-prose mt-8 flex flex-col gap-4 slide-enter-3">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {project.description[locale as "zh" | "en"] ??
                project.description.en}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t("github")} ↗
                </a>
              )}
              {project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {t("live")} ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
