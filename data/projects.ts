import type { Locale } from "@/i18n/routing";

export interface Project {
  name: string;
  description: Record<Locale, string>;
  tech: string[];
  github: string;
  live: string;
}

// ✏️ 在这里添加你的项目 / Add your projects here
export const PROJECTS: Project[] = [
  {
    name: "个人博客 / Personal Blog",
    description: {
      zh: "用 Next.js 16 + Tailwind CSS v4 构建的中英双语个人博客，支持 MDX 文章和 Giscus 评论。",
      en: "A bilingual personal blog built with Next.js 16 + Tailwind CSS v4, supporting MDX posts and Giscus comments.",
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
