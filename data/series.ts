import type { Locale } from "@/i18n/routing";

export interface Series {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  posts: string[]; // slug list, ordered by reading sequence
}

export const SERIES: Series[] = [
  {
    id: "claude-code-basics",
    title: {
      zh: "Claude Code 基础配置",
      en: "Claude Code Basics & Configuration",
    },
    description: {
      zh: "核心概念与配置，入门必读。涵盖 CLAUDE.md、Settings、Memory、Prompt、上下文管理与自定义命令。",
      en: "Core concepts and configuration essentials. Covers CLAUDE.md, Settings, Memory, Prompt, context management, and custom commands.",
    },
    posts: [
      "claude-code-overview",
      "claude-code-claude-md",
      "claude-code-settings",
      "claude-code-memory",
      "claude-code-prompt",
      "claude-code-context",
      "claude-code-skills",
    ],
  },
  {
    id: "claude-code-workflow",
    title: {
      zh: "Claude Code 开发工作流",
      en: "Claude Code Development Workflows",
    },
    description: {
      zh: "日常开发中的 AI 协作实践。涵盖 IDE 集成、Git 工作流、测试、调试、重构、Hooks 与实战项目。",
      en: "AI-assisted collaboration in daily development. Covers IDE integration, Git workflows, testing, debugging, refactoring, Hooks, and hands-on projects.",
    },
    posts: [
      "claude-code-ide",
      "claude-code-git",
      "claude-code-testing",
      "claude-code-debugging",
      "claude-code-refactoring",
      "claude-code-hooks",
      "claude-code-project",
    ],
  },
  {
    id: "claude-code-advanced",
    title: {
      zh: "Claude Code 进阶与工程化",
      en: "Claude Code Advanced & Engineering",
    },
    description: {
      zh: "多 Agent 并行、CI/CD 集成、安全防线与成本控制，从个人工具迈向工程化平台。",
      en: "Multi-agent orchestration, CI/CD integration, security practices, and cost control — scaling from personal tool to engineering platform.",
    },
    posts: [
      "claude-code-mcp",
      "claude-code-multi-agent",
      "claude-code-cicd",
      "claude-code-performance",
      "claude-code-security",
      "claude-code-agent-sdk",
    ],
  },
  {
    id: "ai-product-dev",
    title: {
      zh: "AI 辅助产品开发",
      en: "AI-Assisted Product Development",
    },
    description: {
      zh: "从大模型基础到团队落地的完整路径。涵盖 Prompt 工程、PRD 生成、全链路开发、UI 设计、工具选型、踩坑指南与成熟度模型。",
      en: "The complete path from LLM fundamentals to team-wide adoption. Covers prompt engineering, PRD generation, full-pipeline development, UI design, tool selection, pitfalls, and maturity models.",
    },
    posts: [
      "llm-guide",
      "ai-prompt-engineering",
      "ai-prd",
      "ai-product-dev-pipeline",
      "ai-ui-design",
      "ai-dev-pitfalls",
      "ai-tool-selection",
      "ai-non-tech-guide",
      "ai-team-adoption",
      "ai-maturity-model",
    ],
  },
];
