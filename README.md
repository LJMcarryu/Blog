# 个人博客 / Personal Blog

基于 Next.js 16 构建的中英双语个人博客，支持 MDX 文章、照片墙、项目展示、书单等多种内容形式。

> **详细文档索引见下方 → [文档目录](#文档目录)**

---

## 功能特性

- **双语支持** — 中文 / English 一键切换，URL 自动带语言前缀
- **MDX 博客** — 支持 Markdown + JSX 组件，frontmatter 元数据
- **多内容页面** — 摄影墙、项目集、书单、Now、工具、链接收藏
- **评论系统** — Giscus（基于 GitHub Discussions）
- **深色模式** — 跟随系统偏好自动切换
- **动画效果** — 页面元素错落渐入动画
- **SEO 友好** — 静态生成（SSG）+ 服务端渲染

## 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 + @tailwindcss/typography |
| 国际化 | next-intl |
| 内容 | MDX via next-mdx-remote/rsc |
| 评论 | Giscus |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果（会自动跳转到 `/zh`）。

## 项目结构

```
my_blog/
├── app/[locale]/          # 所有页面（按语言路由）
│   ├── page.tsx           # 首页
│   ├── blog/              # 博客列表 + 文章详情
│   ├── about/             # 关于我
│   ├── projects/          # 项目集
│   ├── photos/            # 摄影墙
│   ├── books/             # 书单
│   ├── now/               # Now 页面
│   ├── uses/              # 使用的工具
│   └── links/             # 链接收藏
├── components/            # 公共组件
├── content/zh/ en/        # MDX 博客文章
├── messages/              # 中英文 UI 字符串
├── public/photos/         # 摄影图片（手动放入）
├── lib/posts.ts           # 文章读取工具函数
├── i18n/                  # 国际化配置
└── docs/                  # 详细文档
```

---

## 文档目录

| 文档 | 说明 |
|------|------|
| [架构文档](docs/architecture.md) | 技术架构、目录结构��数据流、渲染策略 |
| [设计系统](docs/design-system.md) | 色彩、排版、间距、组件、动画 |
| [快速上手](docs/getting-started.md) | 安装、本地开发、初始配置 |
| [写作指南](docs/writing-content.md) | 如何写博客文章（MDX frontmatter、图片等） |
| [页面更新指南](docs/updating-pages.md) | 如何更新首页、关于、项目、摄影等各页面 |
| [国际化指南](docs/i18n.md) | 双语系统工作原理及扩展方法 |
| [部署指南](docs/deployment.md) | Vercel 部署、域名配置、Giscus 设置 |

---

## 许可证

MIT
