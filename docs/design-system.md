# 设计系统文档

## 目录

- [设计原则](#设计原则)
- [色彩系统](#色彩系统)
- [排版系统](#排版系统)
- [间距与布局](#间距与布局)
- [动画系统](#动画系统)
- [组件规范](#组件规范)
- [Tailwind v4 配置](#tailwind-v4-配置)

---

## 设计原则

本博客遵循"内容优先"的极简设计风格，参考 [antfu.me](https://antfu.me) 的设计语言：

1. **内容优先** — 排版、留白、行距都服务于阅读体验
2. **克制用色** — 主色为灰度色系，仅链接悬停等交互状态使用彩色
3. **暗模式对等** — 亮色和暗色方案在视觉上对等，不是简单反色
4. **一致的动效** — 所有页面主体内容使用相同的 slide-enter 进入动画

---

## 色彩系统

### CSS 变量定义（`app/globals.css`）

```css
:root {
  --background: #ffffff;   /* 页面背景 */
  --foreground: #171717;   /* 正文文字 */
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### 语义色彩用途

| 用途 | 亮色模式 | 暗色模式 | Tailwind 类 |
|------|----------|----------|-------------|
| 页面背景 | `#ffffff` | `#0a0a0a` | `bg-white` / `dark:bg-gray-950` |
| 正文文字 | `#171717` | `#ededed` | `text-gray-900` / `dark:text-gray-100` |
| 次要文字 | `#6b7280` | `#9ca3af` | `text-gray-500` / `dark:text-gray-400` |
| 边框 | `#e5e7eb` | `#1f2937` | `border-gray-200` / `dark:border-gray-800` |
| 导航栏边框 | `#e5e7eb` | `#1f2937` | `border-b border-gray-200 dark:border-gray-800` |
| 代码块背景 | `#f9fafb` | `#111827` | `bg-gray-50` / `dark:bg-gray-900` |
| 标签/徽章背景 | `#f3f4f6` | `#1f2937` | `bg-gray-100` / `dark:bg-gray-800` |

### 交互态色彩

| 状态 | 颜色 | 说明 |
|------|------|------|
| 链接悬停 | `gray-900` → `white` (暗色) | 从次要色变为主要色 |
| 卡片悬停边框 | `gray-400` / `dark:gray-600` | 边框加深 |
| 导航激活 | `gray-900` / `dark:white` | 完全不透明 |
| 博客标题悬停 | `blue-600` / `dark:blue-400` | 唯一使用彩色的场景 |
| 搜索框 focus | `ring-gray-400` | 灰色聚焦环 |

---

## 排版系统

### 字体栈

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

系统字体优先，中文使用系统默认（苹方、微软雅黑等），英文使用系统无衬线字体，无自定义字体加载开销。

### 字号规范

| 场景 | 类名 | 像素（16px base） |
|------|------|-------------------|
| 一级标题 | `text-4xl font-bold` | 36px |
| 二级标题 | `text-3xl font-bold` | 30px |
| 卡片标题 | `text-xl font-semibold` | 20px |
| 项目标题 | `text-lg font-semibold` | 18px |
| 正文 | `text-base` / prose默认 | 16px |
| 辅助文字 | `text-sm` | 14px |
| 标签/日期 | `text-xs` | 12px |

### prose 排版

博客文章和内容页使用 `@tailwindcss/typography` 的 prose 类：

```html
<!-- 基础用法 -->
<div class="prose prose-gray dark:prose-invert max-w-none">
  <MDXRemote source={content} />
</div>

<!-- 首页/关于页等内容区 -->
<div class="prose prose-gray dark:prose-invert m-auto">
  ...
</div>
```

`m-auto` 使 prose 内容居中，配合父容器的 `max-w-3xl` 约束宽度。

`not-prose` 类用于在 prose 容器内插入非 prose 元素（如 flex 布局的链接列表）：

```html
<div class="not-prose flex flex-wrap gap-2">
  <!-- 这里的内容不受 prose 排版影响 -->
</div>
```

---

## 间距与布局

### 页面容器

```html
<!-- 顶部导航 -->
<header>
  <div class="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
    ...
  </div>
</header>

<!-- 页面主体 -->
<main class="max-w-3xl mx-auto px-4 py-8">
  {children}
</main>
```

- 最大宽度：`max-w-3xl`（768px）
- 水平内边距：`px-4`（16px）
- 顶部内边距：`py-8`（32px）
- 导航高度：`h-14`（56px）

### 卡片规范

博客文章卡片（`PostCard.tsx`）：

```html
<article class="p-5 rounded-xl border border-gray-200 dark:border-gray-800
                hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
```

项目卡片（`projects/page.tsx`）：同上，`rounded-xl border p-5`。

### 间距节奏

| 场景 | 类名 |
|------|------|
| 卡片列表间距 | `flex flex-col gap-4` 或 `gap-6` |
| 导航项间距 | `gap-6` |
| 标签间距 | `gap-1.5` 或 `gap-2` |
| 分节 `<hr>` 上下 | prose 默认（约 `my-6`） |

---

## 动画系统

### slide-enter 动画定义（`app/globals.css`）

```css
@keyframes slide-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-enter-1 { animation: slide-enter 0.6s ease both; animation-delay: 0ms; }
.slide-enter-2 { animation: slide-enter 0.6s ease both; animation-delay: 150ms; }
.slide-enter-3 { animation: slide-enter 0.6s ease both; animation-delay: 300ms; }
.slide-enter-4 { animation: slide-enter 0.6s ease both; animation-delay: 450ms; }
.slide-enter-5 { animation: slide-enter 0.6s ease both; animation-delay: 600ms; }
```

### 使用规范

每个页面将主要内容区块分配 `slide-enter-N` 类，产生错落的出现效果：

```tsx
<h1 className="slide-enter-1">标题</h1>
<p className="slide-enter-2">副标题</p>
<div className="slide-enter-3">主内容</div>
<div className="slide-enter-4">次级内容</div>
<div className="slide-enter-5">底部内容</div>
```

**规则：**
- 每个独立内容区块递增一级
- 最多使用到 5 级（超出部分无动画，或扩展 CSS）
- 所有 `transition-colors` 用于悬停颜色过渡（200ms 默认）

---

## 组件规范

### Navigation（`components/Navigation.tsx`）

```
┌─────────────────────────────────────────────────────────┐
│  首页  博客  项目  摄影  关于              [中文 / EN]  │
└─────────────────────────────────────────────────────────┘
```

- 高度固定 `h-14`
- 左侧：导航链接（`gap-6`）
- 右侧：语言切换按钮
- 激活状态：`text-gray-900 dark:text-white`（加深）
- 非激活状态：`text-gray-500 hover:text-gray-900 dark:hover:text-white`
- 底部边框：`border-b border-gray-200 dark:border-gray-800`

### LanguageSwitcher（`components/LanguageSwitcher.tsx`）

```
[ EN ]  ← 当前是中文时显示
[ 中文 ] ← 当前是英文时显示
```

- 圆角胶囊按钮：`rounded-full border px-3 py-1`
- 点击后调用 `router.replace(pathname, { locale: nextLocale })`

### PostCard（`components/PostCard.tsx`）

```
┌────────────────────────────────────────────┐
│ 2026-03-01                                 │
│ 文章标题（悬停变蓝）                        │
│ 文章描述文字，最多显示两行...              │
└────────────────────────────────────────────┘
```

- 整卡片可点击（外层 `<Link>`）
- 标题悬停：`group-hover:text-blue-600 dark:group-hover:text-blue-400`

### SearchBar（`components/SearchBar.tsx`）

- 表单提交后跳转 `/blog?q=搜索词`（URL 参数搜索）
- 左侧搜索图标通过绝对定位实现
- 当前搜索为 UI 层过滤，未集成全文搜索引擎

---

## Tailwind v4 配置

### CSS 入口（`app/globals.css`）

```css
/* 引入 Tailwind v4 核心 */
@import "tailwindcss";

/* 引入 Typography 插件 */
@plugin "@tailwindcss/typography";

/* 自定义 CSS 变量 */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

### PostCSS 配置（`postcss.config.mjs` 或 `postcss.config.js`��

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 与 v3 的主要差异

| 特性 | Tailwind v3 | Tailwind v4（本项目） |
|------|-------------|----------------------|
| 配置文件 | `tailwind.config.js` | 无（CSS 内配置） |
| 插件引入 | `plugins: [require(...)]` | `@plugin "..."` |
| 主题扩展 | `theme.extend` | `@theme` 块 |
| PostCSS 插件 | `tailwindcss` | `@tailwindcss/postcss` |
