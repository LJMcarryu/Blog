# 项目分析报告：My Blog

> 生成日期：2026-03-01
> 第六轮更新：2026-03-01（第二梯队功能实现）
> 分析范围：全部源代码文件、配置文件、样式文件、i18n 文件、MDX 内容

---

## 目录

1. [总览评分](#1-总览评分)
2. [第一轮修复清单](#2-第一轮修复清单)
3. [第二轮复查修复清单](#3-第二轮复查修复清单)
4. [第三轮复查修复清单](#4-第三轮复查修复清单)
5. [第四轮复查](#5-第四轮复查)
6. [第五轮：第一梯队功能实现](#6-第五轮第一梯队功能实现)
7. [第六轮：第二梯队功能实现](#7-第六轮第二梯队功能实现)
8. [新增文件说明](#8-新增文件说明)
9. [架构改进](#9-架构改进)
10. [全面审计通过项](#10-全面审计通过项)
11. [遗留事项](#11-遗留事项)

---

## 1. 总览评分

| 维度           | 初始 | 第一轮 | 第二轮 | 第三轮 | 第五轮 | 说明 |
|----------------|------|--------|--------|--------|--------|------|
| 代码质量       | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | try-catch、类型安全、ESLint 零警告 |
| 功能完整性     | ⭐⭐⭐  | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 代码高亮、RSS、阅读时间、移动导航 |
| SEO            | ⭐⭐   | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | RSS feed + favicon 补全 |
| 无障碍访问     | ⭐⭐⭐  | ⭐���⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 移动端汉堡菜单 aria 完整 |
| 性能           | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 代码高亮在构建时完成（SSR） |
| 可维护性       | ⭐⭐⭐  | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 阅读时间独立模块、数据文件完善 |
| 国际化         | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 阅读时间支持中英文 |
| 内容完整性     | ⭐    | ⭐     | ⭐     | ⭐     | ⭐⭐⭐⭐⭐ | 4 篇博客、占位数据全部填充 |
| 移动端体验     | ⭐⭐   | ⭐⭐    | ⭐⭐    | ⭐⭐    | ⭐⭐⭐⭐⭐ | 响应式汉堡菜单 |

---

## 2. 第一轮修复清单（19 项 ✅）

<details>
<summary>展开查看</summary>

### P0 严重问题

| 问题 | 修复方式 |
|------|----------|
| 搜索功能未实现 | `blog/page.tsx` 添加 searchParams + filter |
| 缺少动态 SEO Metadata | 全部 11 页添加 `generateMetadata()` |
| 缺少 robots.txt / sitemap.xml | 新增 `app/robots.ts` + `app/sitemap.ts` |

### P1 重要问题

| 问题 | 修复方式 |
|------|----------|
| PostCard 未使用 locale prop | 移除 prop |
| 照片缺少图片优化和 alt | 改用 next/image + altFromPath() |
| Giscus 配置硬编码 | 环境变量 + 默认值回退 |
| 大量数据硬编码在组件中 | 提取到 data/ 目录 6 个文件 |
| 项目描述版本号错误 | Next.js 15 → 16 |
| 缺少自定义 404 页面 | 新增 not-found.tsx |
| MDX 渲染缺少 Error Boundary | 新增 error.tsx |

### P2 一般问题

| 问题 | 修复方式 |
|------|----------|
| SearchBar / LanguageSwitcher 缺少 aria-label | 已添加 |
| 日期排序不健壮 | 改用 Date 比较 |
| prose 样式不一致 | 统一为 `prose m-auto` |
| `as any` 类型断言 | 改为 `as unknown as { ... }` |
| generateStaticParams 类型不匹配 | 修正签名 |
| public/ 未使用 SVG | 删除 5 个文件 |
| Comments locale 变化不重载 | 清空容器后重新插入 |
| .gitignore 阻止 .env.example | 添加 `!.env.example` 例外 |
| 颜色值统一 | 使用 CSS 变量替换 Tailwind 硬编码色 |

</details>

---

## 3. 第二轮复查修复清单（7 项 ✅）

<details>
<summary>展开查看</summary>

| 问题 | 文件 | 修复 |
|------|------|------|
| 空日期导致排序 NaN | `lib/posts.ts:36` | 空日期回退为时间戳 0 |
| OG description 含 MDX 标记 | `blog/[slug]/page.tsx:20` | 正则清洗后取前 160 字符 |
| 数组索引作为 React key | books/uses/now 3 个页面 | 改用稳定 key |
| SearchBar SVG 缺少 aria-hidden | `SearchBar.tsx:27` | 添加 aria-hidden="true" |
| `href="#"` 打开空白页 | `page.tsx:39` | 渲染时过滤 `href === "#"` |
| error.tsx 仅英文 | `error.tsx` | 添加 useLocale() 中英文切换 |
| 搜索过滤冗余括号 | `blog/page.tsx:35` | 移除多余括号 |

</details>

---

## 4. 第三轮复查修复清单（6 项 ✅）

<details>
<summary>展开查看</summary>

| 项目 | 文件 | 修复 |
|------|------|------|
| 4.1 移除未使用 i18n key "readMore" | `messages/*.json` | 删除死代码 key |
| 4.2 Project description 类型宽松 | `data/projects.ts` | `Record<"zh" \| "en", string>` |
| 4.3 sitemap lastModified 每次变化 | `app/sitemap.ts` | 静态页面不设 lastModified |
| 4.4 缺少 metadataBase | `layout.tsx` | 设置绝对 URL 基准 |
| 4.5 MDX 版本号错误 | `content/*/hello-world.mdx` | Next.js 15 → 16 |
| 4.6 文件读取缺少 try-catch | `lib/posts.ts` | 两个函数均包裹 try-catch |

</details>

---

## 5. 第四轮复查（1 项 ✅）

<details>
<summary>展开查看</summary>

### 5.1 catch 块中未使用的参数 `_` — `ThemeToggle.tsx:22,50`

**修复:** 改用 ES2019 optional catch binding 语法 `catch { }`。✅

</details>

---

## 6. 第五轮：第一梯队功能实现（6 项 ✅）

### 6.1 代码语法高亮

**文件:** `app/[locale]/blog/[slug]/page.tsx`, `app/globals.css`, `package.json`

**实现:**
- 安装 `rehype-pretty-code` + `shiki`
- 在 `MDXRemote` 的 `options.mdxOptions.rehypePlugins` 中配置
- 双主题支持：`github-light` (亮色) + `github-dark-dimmed` (暗色)
- `keepBackground: false`，背景色由 CSS 控制
- CSS 通过 `[data-theme]` 属性选择器切换显示
- 支持行高亮 `[data-highlighted-line]`

```tsx
<MDXRemote
  source={post.content}
  options={{
    mdxOptions: {
      rehypePlugins: [
        [rehypePrettyCode, {
          theme: { dark: "github-dark-dimmed", light: "github-light" },
          keepBackground: false,
        }],
      ],
    },
  }}
/>
```

### 6.2 RSS Feed

**文件:** `app/feed.xml/route.ts`

**实现:**
- RSS 2.0 格式 + Atom self-link
- 遍历所有 locale 的所有文章
- CDATA 包裹标题和描述（防止 XML 特殊字符）
- `Cache-Control: public, max-age=3600`
- 布局 `<head>` 添加 `<link rel="alternate" type="application/rss+xml">`

### 6.3 阅读时间

**文件:** `lib/reading-time.ts`, `app/[locale]/blog/[slug]/page.tsx`

**实现:**
- 中文：约 400 字/分钟，英文：约 200 词/分钟
- 清除 MDX 语法（import、代码块、markdown 标记）后计算
- 混合内容（中文文章中的英文代码）分别计算后合并
- 博客文章头部显示：`2026-03-01 · 5 分钟阅读` / `5 min read`

### 6.4 Favicon

**文件:** `app/icon.tsx`

**实现:**
- 使用 `next/og` 的 `ImageResponse` 动态生成 32x32 PNG
- 黑底白字 "J"，圆角 6px
- 构建时自动生成，无需手动放置文件

### 6.5 移动端响应式导航

**文件:** `components/Navigation.tsx`, `app/globals.css`

**实现:**
- 640px 以下隐藏桌面导航链接，显示汉堡按钮
- 汉堡图标在打开/关闭时切换（三横线 ↔ X）
- 下拉菜单使用 `slide-enter` 动画
- 菜单背景跟随主题色 `var(--c-bg)`
- 完整 aria 支持：`aria-label`、`aria-expanded`
- 点击链接或 logo 自动关闭菜单

### 6.6 博客内容丰富化

**新增 MDX 文章（3 篇 × 2 语言 = 6 文件）:**

| 文件 | 标题 | 亮点 |
|------|------|------|
| `building-my-blog.mdx` | 从零搭建个人博客 | 技术选型、项目结构、踩坑经验 |
| `react-hooks-guide.mdx` | React Hooks 实战指南 | useState/useEffect/useRef/自定义 Hook |
| `dark-mode-implementation.mdx` | 完美暗色模式 | 零闪烁、MutationObserver、View Transitions |

**占位数据填充:**

| 文件 | 内容 |
|------|------|
| `messages/zh.json` | tagline、bio、about 等全部填写 |
| `messages/en.json` | 对应英文内容全部填写 |
| `data/books.ts` | 7 本编程经典书籍（在读/已读/想读） |
| `data/uses.ts` | 硬件/编辑器/开发工具/日常应用 |
| `data/now.ts` | 当前项目/阅读/音乐/思考 |

**照片画廊（4 张 SVG 插画）:**

| 文件 | 描述 |
|------|------|
| `public/photos/moonlit-mountains.svg` | 月夜山水 |
| `public/photos/sunset-ocean.svg` | 海上日落 |
| `public/photos/code-art.svg` | 代码几何艺术 |
| `public/photos/forest-morning.svg` | 森林晨光 |

照片页面 `IMAGE_EXTENSIONS` 已添加 `.svg` 支持。

---

## 7. 第六轮：第二梯队功能实现（7 项 ✅）

### 7.1 标签/分类系统

**文件:** `lib/posts.ts`, `content/**/*.mdx`, `components/PostCard.tsx`, `app/[locale]/blog/page.tsx`, `app/[locale]/blog/[slug]/page.tsx`

**实现:**
- `Post` 接口新增 `tags?: string[]` 字段
- 所有 8 个 MDX 文件添加 `tags` frontmatter（如 `["React", "TypeScript", "教程"]`）
- `PostCard` 在标题右侧显示标签 pill
- 博客列表页顶部显示标签过滤栏（全部 / 按标签），支持 `?tag=React` URL 参数
- 博客文章页标题下方显示可点击标签，链接到筛选结果
- 搜索和标签过滤可同时使用

### 7.2 目录组件 (TOC)

**文件:** `components/TableOfContents.tsx`

**实现:**
- 客户端组件，延迟 150ms 后扫描 `<article>` 内的 h2/h3
- 为无 id 的 heading 自动生成 slug（支持中英文字符）
- `IntersectionObserver` 实时追踪当前可见的 heading
- 左侧竖线装饰 + 高亮当前 heading
- h3 级别缩进显示
- 少于 2 个 heading 时不显示
- 点击平滑滚动到对应章节
- 符合 React 19 ESLint 规则（无 setState in effect、无 ref in render）

### 7.3 代码块复制按钮

**文件:** `components/CodeCopyButton.tsx`, `app/globals.css`

**实现:**
- 客户端组件，延迟 100ms 后为所有 `article pre` 注入复制按钮
- 默认隐藏，鼠标悬停 `pre` 时淡入显示
- 点击复制后显示 "Copied!" 绿色反馈，2 秒后恢复
- 使用 `navigator.clipboard` API
- 支持 try-catch 错误处理

### 7.4 上一篇/下��篇导航

**文件:** `app/[locale]/blog/[slug]/page.tsx`

**实现:**
- 从排序后的文章列表中查找当前文章位置
- 在评论区上方显示上一篇（更早）和下一篇（更新）
- 左侧显示上一篇，右侧显示下一篇
- 支持中英文标签（"← 上一篇" / "← Previous"）
- 悬停时透明度变化

### 7.5 返回顶部按钮

**文件:** `components/BackToTop.tsx`, `app/[locale]/layout.tsx`, `app/globals.css`

**实现:**
- 固定在右下角，滚动超过 400px 后出现
- 圆形按钮 + 向上箭头图标
- 点击平滑滚动到顶部
- 出现时带 `slide-enter` 动画
- `aria-label="Back to top"`
- passive scroll listener

### 7.6 图片 Lightbox

**文件:** `components/Lightbox.tsx`, `app/[locale]/layout.tsx`, `app/[locale]/photos/page.tsx`, `app/globals.css`

**实现:**
- 全局组件，挂载在 layout 中
- 点击 `article` 或 `.photos-grid` 内的图片触发
- 暗色半透明遮罩 + 居中大图
- 点击遮罩或按 `Escape` 关闭
- 右上角关闭按钮
- 淡入动画
- 图片 `cursor: zoom-in`，遮罩 `cursor: zoom-out`
- `role="dialog"` + `aria-label`

### 7.7 网站底部 Footer

**文件:** `components/Footer.tsx`, `app/[locale]/layout.tsx`, `app/globals.css`

**实现:**
- 显示社交链接（过滤 `href="#"`）+ RSS 链接
- 底部版权信息 `© {year} Jimmy's Blog`
- `body` 改为 `flex flex-col`，`main` 加 `flex-1`，footer 始终在底部
- 居中布局 + 响应式 flex-wrap
- 悬停颜色变化

---

## 8. 新增文件说明

| 文件 | 用途 |
|------|------|
| `data/social-links.ts` | 社交链接数据 |
| `data/projects.ts` | 项目列表数据 + 类型定义 |
| `data/books.ts` | 书单数据 + 类型定义 |
| `data/uses.ts` | 工具/设置数据（中英文） |
| `data/links.ts` | 链接收藏数据（中英文） |
| `data/now.ts` | "现在" 页面内容（中英文） |
| `app/robots.ts` | 生成 `/robots.txt` |
| `app/sitemap.ts` | 生成 `/sitemap.xml` |
| `app/icon.tsx` | 动态生成 favicon |
| `app/feed.xml/route.ts` | RSS Feed 路由 |
| `app/[locale]/not-found.tsx` | 自定义 404 页面（中英文） |
| `app/[locale]/blog/[slug]/error.tsx` | 博客文章错误边界（中英文） |
| `lib/reading-time.ts` | 阅读时间计算（中/英文） |
| `components/TableOfContents.tsx` | 目录组件（IntersectionObserver） |
| `components/CodeCopyButton.tsx` | 代码块复制按钮 |
| `components/BackToTop.tsx` | 返回顶部浮动按钮 |
| `components/Lightbox.tsx` | 图片灯箱组件 |
| `components/Footer.tsx` | 网站底部 Footer |
| `content/*/building-my-blog.mdx` | 博客搭建记录（中/英） |
| `content/*/react-hooks-guide.mdx` | React Hooks 指南（中/英） |
| `content/*/dark-mode-implementation.mdx` | 暗色模式实现（中/英） |
| `public/photos/*.svg` | 4 张 SVG 插画照片 |
| `.env.example` | 环境变量模板 |
| `content/zh/building-my-blog.mdx` | 博客搭建记录（中文��� |
| `content/en/building-my-blog.mdx` | 博客搭建记录（英文） |
| `content/zh/react-hooks-guide.mdx` | React Hooks 指南（中文） |
| `content/en/react-hooks-guide.mdx` | React Hooks 指南（英文） |
| `content/zh/dark-mode-implementation.mdx` | 暗色模式实现（中文） |
| `content/en/dark-mode-implementation.mdx` | 暗色模式实现（英文） |
| `public/photos/*.svg` | 4 张 SVG 插画照片 |
| `.env.example` | 环境变量模板 |

---

## 9. 架构改进

### 9.1 数据与视图分离
所有展示数据从页面组件提取到 `data/` 目录。

### 9.2 SEO 完善
- `metadataBase` 设置绝对 URL 基准
- 根布局 title template: `"%s | Jimmy's Blog"`
- 每页 `generateMetadata()` 返回本地化标题
- 博客文章含 OpenGraph（清洗后的 description）
- robots.txt + sitemap.xml 自动生成
- RSS Feed 自动生成 + `<link rel="alternate">` 发现
- favicon 动态生成

### 9.3 容错与健壮性
- `lib/posts.ts` 文件读取 + frontmatter 解析均有 try-catch
- 空日期排序回退到时间戳 0
- `href="#"` 链接在渲染时过滤

### 9.4 类型安全
- Project description: `Record<"zh" | "en", string>`
- Post tags: `tags?: string[]` with `Array.isArray` guard
- ThemeToggle: `as unknown as { startViewTransition }` 替代 `as any`
- generateStaticParams 签名与 Next.js 16 一致

### 9.5 代码高亮 + 复制
- `rehype-pretty-code` + `shiki` 构建时高亮（零运行时开销）
- 双主题自动跟随 light/dark 模式
- CSS `[data-theme]` 选择器控制显示
- 代码块复制按钮（悬停显示，点击反馈）

### 9.6 响应式设计
- 640px 断点：桌面导航 → 汉堡菜单
- 下拉菜单带动画 + 主题色适配

### 9.7 用户体验增强
- 标签系统：文章分类标签 + URL 参数过滤
- 目录组件：自动生成 + IntersectionObserver 滚动高亮
- 上一篇/下一篇：文章底部双向导航
- 返回顶部：浮动按钮 + 滚动检测
- 图片灯箱：点击放大 + Escape 关闭
- 网站 Footer：社交链接 + RSS + 版权

---

## 10. 全面审计通过项

| 检查项 | 状态 |
|--------|------|
| **安全** | |
| XSS 防护 | ✅ 无 dangerouslySetInnerHTML 风险（仅暗色模式脚本） |
| 外部链接 rel="noopener noreferrer" | ✅ 全部外链已设置 |
| 无硬编码密钥/凭证 | ✅ |
| **TypeScript** | |
| 严格模式启用 | ✅ |
| 无 `as any` 类型断言 | ✅ |
| 无未使用 import | ✅ |
| 所有类型定义精确 | ✅ |
| **React** | |
| 无 index-as-key anti-pattern | ✅ |
| Server/Client 组件划分正确 | ✅ |
| 所有 useEffect 正确清理 | ✅ |
| 无 setState-in-effect 违规 | ✅ |
| **无障碍** | |
| 所有装饰性 SVG 有 aria-hidden | ✅ |
| 所有交互元素有 aria-label | ✅ |
| 图片有 alt 文本 | ✅ |
| 语义化 HTML（header/main/article/nav/footer） | ✅ |
| Lightbox role="dialog" | ✅ |
| TOC nav aria-label | ✅ |
| **SEO** | |
| 所有页面有 generateMetadata | ✅ |
| metadataBase 已设置 | ✅ |
| OpenGraph 博客文章 metadata | ✅ |
| robots.txt + sitemap.xml 已生成 | ✅ |
| RSS Feed 可用 | ✅ |
| favicon 已生成 | ✅ |
| **i18n** | |
| zh/en 消息文件键值一致 | ✅ |
| 阅读时间 + 上下篇导航支持中英文 | ✅ |
| **内容** | |
| 4 篇技术博客（中英双语，含标签） | ✅ |
| 数据文件内容完整 | ✅ |

---

## 11. 遗留事项

### 用户操作

| 事项 | 说明 |
|------|------|
| 填写社交链接 | 编辑 `data/social-links.ts`，将 `#` 替换为实际 URL |
| 创建 `.env.local` | 基于 `.env.example` 创建，填入实际站点 URL |
| 替换照片 | 将真实照片放入 `public/photos/`，替换示例 SVG |
| 部署到 Vercel | `vercel` 一键部署 |

### 建议后续增强（第三梯队）

| 事项 | 说明 |
|------|------|
| OG 图片生成 | `app/og/route.tsx` 动态生成社交分享图 |
| JSON-LD 结构化数据 | 文章页添加 Schema.org 标记 |
| 网站分析 | 集成 Umami / Plausible |
| 单元测试 | 为 `lib/posts.ts` 等核心模块编写测试 |
| 博客分页 | 文章增多后添加分页 |
| Pagefind 全文搜索 | 替代当前 URL query 搜索 |

---

## 构建验证

```
✓ Compiled successfully
✓ TypeScript check passed
✓ ESLint — 0 errors, 0 warnings
✓ 33 routes generated (including feed.xml, icon, robots.txt, sitemap.xml)
✓ All routes functional
```

---

## 修复与功能统计

| 轮次 | 项数 | 影响文件 | 关键改进 |
|------|------|----------|----------|
| 第一轮 | 19 项 | 35 文件 | 搜索实现、SEO、数据分离、a11y |
| 第二轮 | 7 项 | 10 文件 | NaN 排序、OG 清洗、React key、i18n error |
| 第三轮 | 6 项 | 9 文件 | metadataBase、类型收紧、try-catch、死代码 |
| 第四轮 | 1 项 | 1 文件 | ESLint 零警告（catch 参数清理） |
| 第五轮 | 6 项 | 25+ 文件 | 代码高亮、RSS、阅读时间、favicon、移动导航、内容 |
| 第六轮 | 7 项 | 15+ 文件 | 标签系统、TOC、复制按钮、上下篇、返回顶部、灯箱、Footer |
| **合计** | **46 项** | — | **全功能博客，build 0 errors, lint 0 warnings** |

---

## 9. 全面审计通过项

| 检查项 | 状态 |
|--------|------|
| **安全** | |
| XSS 防护 | ✅ 无 dangerouslySetInnerHTML 风险（仅暗色模式脚本） |
| 外部链接 rel="noopener noreferrer" | ✅ 全部外链已设置 |
| 无硬编码密钥/凭证 | ✅ |
| **TypeScript** | |
| 严格模式启用 | ✅ |
| 无 `as any` 类型断言 | ✅ |
| 无未使用 import | ✅ |
| 无未使用 prop | ✅ |
| 所有类型定义精确 | ✅ |
| 无未使用 catch 参数 | ✅ |
| **React** | |
| 无 index-as-key anti-pattern | ✅ |
| Server/Client 组件划分正确 | ✅ |
| 所有 useEffect 正确清理 | ✅ |
| **无障碍** | |
| 所有装饰性 SVG 有 aria-hidden | ✅ |
| 所有交互元素有 aria-label | ✅ |
| 图片有 alt 文本 | ✅ |
| 语义化 HTML（header/main/article/nav） | ✅ |
| 移动端汉堡菜单 aria-expanded | ✅ |
| **SEO** | |
| 所有页面有 generateMetadata | ✅ |
| metadataBase 已设置 | ✅ |
| OpenGraph 博客文章 metadata | ✅ |
| robots.txt 已生成 | ✅ |
| sitemap.xml 已生成 | ✅ |
| RSS Feed 可用 | ✅ |
| favicon 已生成 | ✅ |
| **i18n** | |
| zh/en 消息文件键值一致 | ✅ |
| 无未使用的翻译 key | ✅ |
| error.tsx / not-found.tsx 支持中英文 | ✅ |
| 阅读时间支持中英文 | ✅ |
| **代码风格** | |
| 所有页面 prose 类名统一 | ✅ |
| 颜色一致使用 CSS 变量 | ✅ |
| 无死代码 | ✅ |
| **容错** | |
| 文件读取有 try-catch | ✅ |
| 日期排序处理无效值 | ✅ |
| 占位链接不渲染 | ✅ |
| **内容** | |
| MDX 中技术版本号正确 | ✅ |
| 4 篇技术博客（中英双语） | ✅ |
| 数据文件内容完整 | ✅ |

---

## 10. 遗留事项

### 用户操作

| 事项 | 说明 |
|------|------|
| 填写社交链接 | 编辑 `data/social-links.ts`，将 `#` 替换为实际 URL |
| 创建 `.env.local` | 基于 `.env.example` 创建，填入实际站点 URL |
| 替换照片 | 将真实照片放入 `public/photos/`，替换示例 SVG |
| 部署到 Vercel | `vercel` 一键部署 |

### 建议后续增强（第二梯队）

| 事项 | 说明 |
|------|------|
| 标签/分类系统 | frontmatter 添加 `tags` 字段 + 标签页面 |
| 目录组件 (TOC) | 解析 heading 生成侧边目录 |
| 代码块复制按钮 | 一键复制代码内容 |
| 上一篇/下一篇 | 文章底部导航 |
| 返回顶部按钮 | 滚动后出现 |
| 图片 Lightbox | 点击大图查看 |
| 网站底部 Footer | 版权信息 + 社交链接 |

### 建议后续增强（第三梯队）

| 事项 | 说明 |
|------|------|
| OG 图片生成 | `app/og/route.tsx` 动态生成社交分享图 |
| JSON-LD 结构化数据 | 文章页添加 Schema.org 标记 |
| 网站分析 | 集成 Umami / Plausible |
| 单元测试 | 为 `lib/posts.ts` 等核心模块编写测试 |
| 博客分页 | 文章增多后添加分页 |

---

## 构建验证

```
✓ Compiled successfully
✓ TypeScript check passed
✓ ESLint — 0 errors, 0 warnings
✓ 33 routes generated (including feed.xml, icon, robots.txt, sitemap.xml)
✓ All routes functional
```

---

## 修复与功能统计

| 轮次 | 项数 | 影响文件 | 关键改进 |
|------|------|----------|----------|
| 第一轮 | 19 项 | 35 文件 | 搜索实现、SEO、数据分离、a11y |
| 第二轮 | 7 项 | 10 文件 | NaN 排序、OG 清洗、React key、i18n error |
| 第三轮 | 6 项 | 9 文件 | metadataBase、类型收紧、try-catch、死代码 |
| 第四轮 | 1 项 | 1 文件 | ESLint 零警告（catch 参数清理） |
| 第五轮 | 6 项 | 25+ 文件 | 代码高亮、RSS、阅读时间、favicon、移动导航、内容 |
| **合计** | **39 项** | — | **全功能博客，build 0 errors, lint 0 warnings** |
