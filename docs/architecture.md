# 架构文档

## 目录

- [技术选型](#技术选型)
- [目录结构详解](#目录结构详解)
- [路由架构](#路由架构)
- [渲染策略](#渲染策略)
- [数据流](#数据流)
- [国际化架构](#国际化架构)
- [组件架构](#组件架构)
- [中间件](#中间件)

---

## 技术选型

### Next.js 16 App Router

选择 App Router 而非 Pages Router 的原因：

- **原生 RSC 支持** — 服务端组件直接读取文件系统，无需 API 路由
- **嵌套布局** — `[locale]/layout.tsx` 统一处理语言注入，子页面无需重复
- **流式渲染** — 支持 Suspense 和流式 HTML 响应
- **generateStaticParams** — 在构建时静态生成所有语言 × 文章的组合页面

### Tailwind CSS v4

v4 相较于 v3 的主要变化：

```css
/* v3 写法（不适用） */
/* tailwind.config.js 配置 */

/* v4 写法（本项目使用） */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

- 无需 `tailwind.config.js`，通过 CSS 文件内 `@theme` 和 `@plugin` 配置
- 使用 `@tailwindcss/postcss` 而非 `autoprefixer`

### next-intl

选择 next-intl 而非其他 i18n 方案的原因：
- 与 Next.js App Router 深度集成，支持服务端和客户端同时使用翻译
- 通过 `getTranslations()` 在服务端组件中异步获取翻译
- 通过 `useTranslations()` 在客户端组件中同步获取翻译
- 内置 `createNavigation()` 生成类型安全的 locale-aware 路由工具

### next-mdx-remote/rsc

专为 App Router 的 RSC 环境设计：
- `MDXRemote` 组件在服务端渲染 MDX，无需客户端 JS
- 配合 `gray-matter` 解析 YAML frontmatter

---

## 目录结构详解

```
my_blog/
│
├── app/                          # Next.js App Router 根目录
│   ├── globals.css               # 全局样式（Tailwind 入口）
│   └── [locale]/                 # 动态语言段（zh 或 en）
│       ��── layout.tsx            # 根布局：注入 i18n Provider、Navigation
│       ├── page.tsx              # 首页
│       ├── blog/
│       │   ├── page.tsx          # 博客列表页
│       │   └── [slug]/
│       │       └── page.tsx      # 博客文章详情页
│       ├── about/page.tsx        # 关于我
│       ├── projects/page.tsx     # 项目集
│       ├── photos/page.tsx       # 摄影墙
│       ├── books/page.tsx        # 书单
│       ├── now/page.tsx          # Now 页面
│       ├── uses/page.tsx         # 使用的工具
│       └── links/page.tsx        # 链接收藏
│
├── components/                   # 共享组件
│   ├── Navigation.tsx            # 顶部导航栏（Client Component）
│   ├── LanguageSwitcher.tsx      # 语言切换按钮（Client Component）
│   ├── ThemeToggle.tsx           # 亮/暗色模式切换（Client Component）
│   ├── PostCard.tsx              # 博客文章卡片（Server Component）
│   ├── SearchBar.tsx             # 搜索框（Client Component）
│   └── Comments.tsx             # Giscus 评论区（Client Component）
│
├── content/                      # MDX 博客内容
│   ├── zh/                       # 中文文章
│   │   └── hello-world.mdx
│   └── en/                       # 英文文章
│       └── hello-world.mdx
│
├── i18n/                         # 国际化配置
│   ├── routing.ts                # defineRouting：定义 locales 和 defaultLocale
│   ├── navigation.ts             # createNavigation：导出 Link、useRouter 等
│   └── request.ts                # getRequestConfig：服务端请求级别 i18n 配置
│
├── lib/
│   └── posts.ts                  # 文章工具函数：getPostsByLocale、getPostBySlug
│
├── messages/                     # UI 文案（翻译字符串）
│   ├── zh.json                   # 中文
│   └── en.json                   # 英文
│
├── public/
│   └── photos/                   # 摄影图片（手动存放，自动读取展示）
│
├── proxy.ts                      # next-intl 中间件（Next.js 16 命名规范）
├── next.config.ts                # Next.js 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json
```

---

## 路由架构

### URL 结构

```
/                  → 重定向到 /zh（defaultLocale）
/zh                → 中文首页
/en                → 英文首页
/zh/blog           → 中文博客列表
/en/blog           → 英文博客列表
/zh/blog/my-post   → 中文文章
/en/blog/my-post   → 英文文章
/zh/about          → 中文关于页
/en/projects       → 英文项目页
...
```

### 路由生成

`app/[locale]/layout.tsx` 中的 `generateStaticParams` 为每个 locale 生成基础路由：

```typescript
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
  // 返回: [{ locale: "zh" }, { locale: "en" }]
}
```

`app/[locale]/blog/[slug]/page.tsx` 中的 `generateStaticParams` 生成所有文章路由：

```typescript
export function generateStaticParams({ params }) {
  return getPostsByLocale(params.locale).map((post) => ({ slug: post.slug }));
}
```

---

## 渲染策略

### 服务端组件（Server Components）— 默认

所有页面和大多数组件默认为服务端组件：

```typescript
// app/[locale]/blog/page.tsx — 服务端组件，无需 "use client"
export default async function BlogPage({ params }) {
  const posts = getPostsByLocale(locale); // 直接读取文件系统
  // ...
}
```

**适用场景：** 读取文件、获取翻译、渲染静态内容

### 客户端组件（Client Components）— 按需使用

必须使用浏览器 API 或 React hooks 时才声明为客户端组件：

| 组件 | 原因 |
|------|------|
| `Navigation.tsx` | 使用 `usePathname()` 判断当前路由高亮 |
| `LanguageSwitcher.tsx` | 使用 `useLocale()`、`useRouter()` |
| `ThemeToggle.tsx` | 使用 `useState`、`useEffect`、操作 `document` |
| `SearchBar.tsx` | 使用 `useState`、表单事件 |
| `Comments.tsx` | 使用 `useEffect` 动态注入 Giscus 脚本 |

---

## 数据流

### 博客文章读取流程

```
请求 /zh/blog/hello-world
        ↓
next-intl 中间件 (proxy.ts) 验证 locale
        ↓
app/[locale]/blog/[slug]/page.tsx
        ↓
getPostBySlug("hello-world", "zh")   ← lib/posts.ts
        ↓
fs.readFileSync("content/zh/hello-world.mdx")
        ↓
gray-matter 解析 frontmatter + content
        ↓
<MDXRemote source={content} />       ← next-mdx-remote/rsc 服务端渲染
        ↓
返回 HTML
```

### 翻译字符串加载流程

```
请求 /zh/about
        ↓
app/[locale]/layout.tsx
  → import(`@/messages/${locale}.json`)
  → <NextIntlClientProvider messages={messages}>
        ↓
app/[locale]/about/page.tsx (服务端)
  → getTranslations({ locale, namespace: "about" })
  → t("title") 直接返回翻译值
```

---

## 国际化架构

详见 [i18n.md](i18n.md)。

核心文件关系：

```
i18n/routing.ts          定义 locales: ["zh","en"], defaultLocale: "zh"
       ↓
i18n/request.ts          服务端：根据请求加载对应 messages/*.json
       ↓
i18n/navigation.ts       导出 locale-aware 的 Link、useRouter、usePathname
       ↓
proxy.ts                 中间件：拦截所有请求，处理语言重定向
```

---

## 暗色模式架构

### 驱动机制

暗色模式通过给 `<html>` 元素添加/移除 `.dark` 类来控制，而非 CSS 媒体查询。这允许用户独立设置博客主题，不跟随系统偏好。

```
用户点击 ThemeToggle
        ↓
document.documentElement.classList.toggle("dark")
        ↓
localStorage.setItem("blog-color-scheme", "dark"/"light")
        ↓
CSS @variant dark (&:where(.dark, .dark *)) 触发
        ↓
CSS 变量 --c-bg / --fg / --fg-deep 等切换值
```

### 防闪烁（FOUC 预防）

在 `app/[locale]/layout.tsx` 的 `<head>` 中注入内联脚本，在首次渲染前读取 localStorage 并立即设置 `.dark` 类：

```html
<html suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: `
      (function(){
        var d = localStorage.getItem('blog-color-scheme') || 'auto';
        var sys = window.matchMedia('(prefers-color-scheme:dark)').matches;
        if (d === 'dark' || (d === 'auto' && sys))
          document.documentElement.classList.add('dark');
      })()
    `}} />
  </head>
```

`suppressHydrationWarning` 用于抑制 React hydration 时 class 不匹配的警告（服务端渲染时 html 没有 `.dark` 类，客户端脚本添加后会有短暂不一致）。

### Tailwind v4 配置

```css
/* globals.css */
@variant dark (&:where(.dark, .dark *));
```

这一行使所有 `dark:*` 工具类响应 `.dark` 类名而非媒体查询。

---

## 组件架构

### 组件分类原则

```
纯展示 + 无状态 → Server Component（默认）
需要交互 / hooks → "use client" Client Component
```

### PostCard 数据流

```
BlogPage (Server) → 获取 posts[]
  → <PostCard post={post} />  (Server)
      → 渲染文章卡片 HTML
```

### Comments 初始化

```
PostPage (Server) → 渲染文章内容
  → <Comments /> (Client)
      → useEffect → 动态插入 <script src="giscus.app/client.js">
      → Giscus 加载完成后显示评论区
```

---

## 中间件

`proxy.ts`（Next.js 16 要求使用 `proxy.ts` 而非 `middleware.ts`）：

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

**功能：**
1. 访问 `/` → 重定向到 `/zh`（defaultLocale）
2. 访问 `/about` → 重定向到 `/zh/about`
3. 访问 `/en/blog` → 正常通过，设置 locale 上下文为 `en`
4. 排除 `_next/static`、`_next/image`、API 路由、带扩展名的静态文件

---

## 关键设计决策

| 决策 | 选择 | 原因 |
|------|------|------|
| 文章存储 | 文件系统（MDX） | 无需数据库，Git 版本控制，Markdown 书写体验好 |
| 样式方案 | Tailwind CSS v4 | 无运行时开销，原子化 CSS，与 RSC 兼容 |
| 图片处理 | 原生 `<img>` | 摄影页图片来自本地 public/，Next.js Image 对本地文件无额外优化 |
| 搜索 | URL query 参数 | 轻量实现，无需额外服务；Pagefind 全文搜索可后续集成 |
| 评论 | Giscus | 零后端，基于 GitHub Discussions，与代码仓库共享权限 |
