import type { Locale } from "@/i18n/routing";

export interface Series {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  posts: string[]; // slug list, ordered by reading sequence
}

export const SERIES: Series[] = [
  {
    id: "claude-code-guide",
    title: { zh: "Claude Code 完全指南", en: "The Complete Claude Code Guide" },
    description: {
      zh: "从入门到精通，系统掌握 Claude Code 的每一个核心能力。",
      en: "Master every core capability of Claude Code, from beginner to power user.",
    },
    posts: [
      "claude-code-overview",
      "claude-code-claude-md",
      "claude-code-settings",
      "claude-code-memory",
      "claude-code-prompt",
      "claude-code-context",
      "claude-code-skills",
      "claude-code-ide",
      "claude-code-git",
      "claude-code-testing",
      "claude-code-debugging",
      "claude-code-refactoring",
      "claude-code-hooks",
      "claude-code-mcp",
      "claude-code-multi-agent",
      "claude-code-cicd",
      "claude-code-performance",
      "claude-code-security",
      "claude-code-agent-sdk",
    ],
  },
  {
    id: "claude-code-practice",
    title: { zh: "Claude Code 工程实践", en: "Claude Code in Practice" },
    description: {
      zh: "实战项目、性能优化与安全最佳实践。",
      en: "Real-world projects, performance optimization, and security best practices.",
    },
    posts: [
      "claude-code-project",
      "claude-code-performance",
      "claude-code-security",
    ],
  },
  {
    id: "ai-fundamentals",
    title: { zh: "AI 入门", en: "AI Fundamentals" },
    description: {
      zh: "大语言模型基础知识与 AI 辅助工作流。",
      en: "LLM fundamentals and AI-assisted workflows.",
    },
    posts: ["llm-guide", "ai-prd", "ai-product-dev-pipeline", "ai-ui-design", "ai-prompt-engineering", "ai-dev-pitfalls", "ai-tool-selection"],
  },
];
