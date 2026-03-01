# 设计系统文档

## 目录

- [设计原则](#设计原则)
- [色彩系统](#色彩系统)
- [暗色模式](#暗色模式)
- [排版系统](#排版系统)
- [间距与布局](#间距与布局)
- [动画系统](#动画系统)
- [组件规范](#组件规范)
- [Tailwind v4 配置](#tailwind-v4-配置)

---

## 设计原则

本博客遵循 [antfu.me](https://antfu.me) 的设计语言，核心理念：

1. **内容优先** — 排版、留白、行距都服务于阅读体验
2. **克制用色** — 主色为灰度色系，仅链接悬停等交互状态产生微妙色彩变化
3. **暗模式对等** — 亮色和暗色方案在视觉上对等，通过 `.dark` 类切换，避免系统主题强制跟随
4. **一致的动效** — 所有页面主体内容使用相同的 slide-enter 进入动画，内容块依次错落出现

---

## 色彩系统

### CSS 变量定义（`app/globals.css`）

```css
:root {
  --c-bg: #ffffff;      /* 页面背景 */
  --fg: #555555;        /* 正文文字（灰色，非纯黑） */
  --fg-deep: #222222;   /* 深一级文字（标题等） */
  --fg-deeper: #000000; /* 最深文字（最重要内容） */
  --fg-light: #888888;  /* 辅助文字（日期、描述、标签） */
}

.dark {
  --c-bg: #050505;      /* 接近纯黑 */
  --fg: #bbbbbb;
  --fg-deep: #dddddd;
  --fg-deeper: #ffffff;
  --fg-light: #888888;  /* 亮暗模式下辅助文字相同 */
}
```

### 语义色彩用途

| 变量 | 亮色 | 暗色 | 用途 |
|------|------|------|------|
| `--c-bg` | `#fff` | `#050505` | 页面背景（设置在 `html` 元素） |
| `--fg` | `#555` | `#bbb` | 正文、正常文字 |
| `--fg-deep` | `#222` | `#ddd` | 标题、稍重要文字 |
| `--fg-deeper` | `#000` | `#fff` | 最重要内容、hover 后的文字 |
| `--fg-light` | `#888` | `#888` | 辅助信息（日期、描述） |

### 交互态色彩

| 状态 | 实现方式 | 说明 |
|------|----------|------|
| 导航链接默认 | `opacity: 0.6` | 半透明效果 |
| 导航链接悬停/激活 | `opacity: 1` | 完全不透明 |
| 文章标题悬停 | `text-black dark:text-white` | 变为最深色 |
| prose 链接下划线 | `border-bottom-color: var(--fg)` | 灰色→深色下边框 |
| 代码块背景 | `rgba(125,125,125,.12)` | 半透明灰色 |

---

## 暗色模式

### 实现机制

暗色模式通过给 `<html>` 元素添加 `.dark` 类来驱动，而**非** `prefers-color-scheme` 媒体查询。这允许用户独立设置博客主题，不必跟随系统。

**防闪烁内联脚本**（`app/[locale]/layout.tsx`）：

```tsx
<head>
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){
        try {
          var d = localStorage.getItem('blog-color-scheme') || 'auto';
          var sys = window.matchMedia('(prefers-color-scheme:dark)').matches;
          if (d === 'dark' || (d === 'auto' && sys))
            document.documentElement.classList.add('dark');
        } catch(e) {}
      })()`,
    }}
  />
</head>
```

脚本在 HTML 解析完成、首次渲染之前运行，避免出现"亮色闪烁"（FOUC）。

**语言切换时的暗色模式保持：**

切换语言触发软导航（`router.replace`），内联脚本不会重新执行，且 React RSC 协调可能移除 `<html>` 上的 `.dark` 类。`ThemeToggle` 组件通过 `MutationObserver` 监听 `<html>` 的 `class` 属性变化，一旦被移除就从 `localStorage` 读取偏好并立即恢复。`MutationObserver` 回调作为微任务在浏览器绘制之前执行，因此不会出现白色闪烁。

**Tailwind v4 的类名暗色变体**（`app/globals.css`）：

```css
@variant dark (&:where(.dark, .dark *));
```

这行配置使所有 Tailwind `dark:*` 类响应 `.dark` 类名，而非系统媒体查询。

**localStorage 持久化键名：** `blog-color-scheme`，值为 `"dark"` / `"light"` / `"auto"`。

### View Transitions API

`ThemeToggle` 切换主题时，如浏览器支持 View Transitions API，会触发平滑过渡动画：

```typescript
if ("startViewTransition" in document) {
  (document as any).startViewTransition(applyTheme);
} else {
  applyTheme();
}
```

---

## 排版系统

### 字体栈

```css
body {
  font-family: ui-sans-serif, system-ui, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji";
}
```

系统字体优先，中文使用系统默认（苹方、微软雅黑），英文使用系统无衬线字体。

**代码字体：** `'DM Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`（内联代码）。

### prose 排版

博客文章和内容页使用 `@tailwindcss/typography` 的 prose 类：

```html
<!-- 文章和内容页统一用法 -->
<div class="prose m-auto">
  <MDXRemote source={content} />
</div>
```

不再使用 `prose-gray dark:prose-invert`，颜色由 CSS 变量全局控制。

**`not-prose`** 类用于在 prose 容器内插入非 prose 元素（如 flex 布局的链接列表）：

```html
<div class="not-prose flex flex-wrap gap-2">
  <!-- 这里的内容不受 prose 排版影响 -->
</div>
```

### prose 自定义覆盖

`globals.css` 中对 `@tailwindcss/typography` 的默认样式进行了定制：

| 元素 | 默认 | 覆盖后 |
|------|------|--------|
| `a` 链接 | 下划线 | 细边框下划线 + 悬停渐变动画 |
| `h3` | 完全不透明 | `opacity: 0.75`（稍淡） |
| `hr` | 全宽分割线 | 仅 `50px` 宽（装饰性短线） |
| `:not(pre) > code` | 默认单色 | `DM Mono` 字体 + 半透明灰底 |

**链接下划线动画：**

```css
.prose a {
  border-bottom: 1px solid rgba(125, 125, 125, .3);
  text-decoration: none;
  transition: border-color 0.3s ease-in-out;
}
.prose a:hover {
  border-bottom-color: var(--fg);
}
```

---

## 间距与布局

### 页面结构

```html
<!-- 导航（相对定位，logo 绝对定位到左上角） -->
<header class="relative z-40">
  <a class="nav-logo">Jimmy</a>      <!-- 绝对定位：top-1.35rem left-1.5rem -->
  <div class="nav-grid">             <!-- 网格布局 -->
    <div />                          <!-- 左侧占位 -->
    <div class="nav-right">          <!-- 右侧导航链接 + 按钮 -->
      ...
    </div>
  </div>
</header>

<!-- 主内容区 -->
<main class="max-w-3xl mx-auto px-6 py-10">
  {children}
</main>
```

- 最大宽度：`max-w-3xl`（768px）
- 水平内边距：`px-6`（24px）
- 顶部内边距：`py-10`（40px）

### 内容列表间距

| 场景 | 类名 |
|------|------|
| 博客文章列表 | `flex flex-col gap-4` |
| 首页最新文章 | `flex flex-col gap-3` |
| 导航链接 | `gap-4`（`nav-right` 内 flex） |
| 分节 `<hr>` | 50px 宽装饰线，`my` 由 prose 控制 |

---

## 动画系统

### slide-enter 动画原理

动画基于 CSS 自定义属性（变量）驱动，不再使用固定延迟：

```css
@keyframes slide-enter {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
}

/* 所有 slide-enter 元素的公共样式 */
.slide-enter,
.slide-enter-1, /* ... */
.slide-enter-content > * {
  --enter-stage: 0;      /* 阶段编号，由具体类设置 */
  --enter-step: 90ms;    /* 每阶段的延迟步长 */
  --enter-initial: 0ms;  /* 额外初始延迟 */
  animation: slide-enter 1s both 1;
  animation-delay: calc(
    var(--enter-initial) + var(--enter-stage) * var(--enter-step)
  );
}
```

### 使用方式一：显式阶段编号

```tsx
<h1 className="slide-enter-1">标题</h1>        {/* 90ms 后出现 */}
<p className="slide-enter-2">副标题</p>        {/* 180ms 后出现 */}
<div className="slide-enter-3">主内容</div>    {/* 270ms 后出现 */}
```

支持的编号：1–6、10、50（`slide-enter-50` 用于签名式压轴出现）。

**签名式揭示（homepage h1）：**

```tsx
<h1 className="slide-enter-50">Jimmy</h1>
{/* stage=50 → delay = 50 × 90ms = 4500ms，在所有内容出现后才显示 */}
```

### 使用方式二：自动子元素分级（slide-enter-content）

```tsx
<div className="slide-enter-content">
  <p>第 1 个子元素 → 90ms</p>
  <div>第 2 个子元素 → 180ms</div>
  <section>第 3 个子元素 → 270ms</section>
  {/* 最多支持 20 个子元素自动分级 */}
</div>
```

通过 `:nth-child(N)` 选择器自动设置 `--enter-stage`，无需给每个子元素手动写类名。

### 禁用动画

给 `<html>` 添加 `no-sliding` 类可全局禁用 slide-enter 动画（适用于偏好减弱动效的用户）：

```css
html:not(.no-sliding) .slide-enter-content > * { ... }
```

---

## 组件规范

### Navigation（`components/Navigation.tsx`）

```
Jimmy                        博客  项目  摄影  关于  [☀]  [EN]
↑ 绝对定位左上角               ↑ 右侧 flex，opacity 交互
```

**CSS 类：**

```css
.nav-logo {
  position: absolute;
  top: 1.35rem;
  left: 1.5rem;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}
.nav-logo:hover { opacity: 1; }

.nav-grid {
  padding: 1.25rem 2rem;
  display: grid;
  grid-template-columns: auto max-content; /* 左占位 + 右导航 */
}

.nav-link {
  opacity: 0.6;
  transition: opacity 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
}
.nav-link:hover,
.nav-link.active { opacity: 1; }
```

**navLinks 数组（当前）：**

```typescript
const navLinks = [
  { href: "/blog",     label: t("blog") },
  { href: "/projects", label: t("projects") },
  { href: "/photos",   label: t("photos") },
  { href: "/about",    label: t("about") },
];
// 注意：首页("/"）已从 navLinks 移除，Logo 本身即为首页链接
```

**激活状态：** 通过 `pathname.startsWith(href)` 前缀匹配确定，非精确匹配。

---

### ThemeToggle（`components/ThemeToggle.tsx`）

```
[ ☀ ]  ← 当前暗色时显示（点击切回亮色）
[ 🌙 ]  ← 当前亮色时显示（点击切为暗色）
```

- Client Component（`"use client"`）
- 切换时操作 `document.documentElement.classList` 上的 `.dark` 类
- 通过 `localStorage.setItem("blog-color-scheme", ...)` 持久化
- 支持 View Transitions API 平滑过渡（浏览器不支持时降级为直接切换）
- 使用 `MutationObserver` 监听 `<html>` 的 class 变化，防止切换语言时 React 协调移除 `.dark` 类（回调在浏览器绘制前执行，无白色闪烁）
- 使用 `nav-link` CSS 类，与导航链接视觉一致（opacity 0.6 → 1）

---

### LanguageSwitcher（`components/LanguageSwitcher.tsx`）

```
[ EN ]  ← 当前是中文时显示
[ 中 ]  ← 当前是英文时显示
```

- Client Component（`"use client"`）
- 使用 `nav-link` CSS 类（opacity 交互，无边框/圆角）
- 点击后调用 `router.replace(pathname, { locale: nextLocale })`

---

### PostCard（`components/PostCard.tsx`）

```
2026-03-01  文章标题（悬停变为最深色）
            文章描述，单行截断...
```

- 整行可点击（外层 `<Link>`）
- 布局：`flex items-baseline gap-5`
- 日期：`text-xs tabular-nums shrink-0 w-24`，颜色 `var(--fg-light)`
- 标题：`text-sm font-medium`，颜色 `var(--fg)` → hover `text-black dark:text-white`
- 描述：`text-xs line-clamp-1`，颜色 `var(--fg-light)`
- **无边框、无圆角、无背景**（antfu.me 极简列表风格）

---

### SearchBar（`components/SearchBar.tsx`）

- 表单提交后跳转 `/blog?q=搜索词`（URL 参数搜索）
- 左侧搜索图标通过绝对定位实现
- 当前搜索为 UI ���过滤，未集成全文搜索引擎

---

## Tailwind v4 配置

### CSS 入口（`app/globals.css`）

```css
/* 引入 Tailwind v4 核心 */
@import "tailwindcss";

/* 引入 Typography 插件 */
@plugin "@tailwindcss/typography";

/* 暗色模式：响应 .dark 类名，而非系统媒体查询 */
@variant dark (&:where(.dark, .dark *));
```

**`@variant dark`** 的作用：让所有 Tailwind `dark:*` 工具类（如 `dark:text-white`）在 `.dark` 类存在时生效，替代默认的 `@media (prefers-color-scheme: dark)` 行为。

### PostCSS 配置（`postcss.config.mjs`）

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
| 暗色模式 | `darkMode: 'class'` in config | `@variant dark (...)` in CSS |
