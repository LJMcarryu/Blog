# 快速上手指南

## 目录

- [环境要求](#环境要求)
- [安装与运行](#安装与运行)
- [初始配置](#初始配置)
- [常用命令](#常用命令)
- [开发工作流](#开发工作流)

---

## 环境要求

| 工具 | 版本要求 |
|------|----------|
| Node.js | 18.x 或更高 |
| npm | 随 Node.js 附带 |

验证安装：

```bash
node --version   # 应输出 v18.x.x 或更高
npm --version
```

---

## 安装与运行

### 1. 安装依赖

```bash
cd my_blog
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)。

中间件会自动将根路径 `/` 重定向到 `/zh`（默认语言）。

### 3. 访问各页面

| 页面 | 中文 URL | 英文 URL |
|------|----------|----------|
| 首页 | `/zh` | `/en` |
| 博客 | `/zh/blog` | `/en/blog` |
| 关于我 | `/zh/about` | `/en/about` |
| 项目 | `/zh/projects` | `/en/projects` |
| 摄影 | `/zh/photos` | `/en/photos` |
| 书单 | `/zh/books` | `/en/books` |
| 现在 | `/zh/now` | `/en/now` |
| 工具 | `/zh/uses` | `/en/uses` |
| 链接 | `/zh/links` | `/en/links` |

---

## 初始配置

第一次使用时，按照以下步骤完成个性化设置。

### 第一步：填写个人信息

编辑 `messages/zh.json` 中的 `home` 和 `about` 字段：

```json
{
  "home": {
    "name": "你的名字",
    "tagline": "你的一句话简介",
    "bio": "你的个人简介段落"
  },
  "about": {
    "subtitle": "你的身份标签",
    "bio1": "第一段自我介绍",
    "bio2": "第二段自我介绍"
  }
}
```

同样编辑 `messages/en.json` 中对应的英文版本。

### 第二步：更新社交链接

编辑 `app/[locale]/page.tsx` 顶部的 `SOCIAL_LINKS` 数组：

```typescript
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/你的用户名" },
  { label: "Twitter / X", href: "https://x.com/你的用户名" },
  { label: "Email", href: "mailto:你的邮箱@example.com" },
];
```

### 第三步：更新技术栈（关于页）

编辑 `app/[locale]/about/page.tsx` 顶部的 `SKILLS` 数组：

```typescript
const SKILLS = [
  "TypeScript", "React", "Vue", "Python", // 换成你实际使用的技术
];
```

### 第四步：写第一篇博客

创建 `content/zh/my-first-post.mdx`：

```mdx
---
title: 我的第一篇文章
date: 2026-03-01
description: 这是我的第一篇博客文章
---

正文内容从这里开始...
```

详见 [写作指南](writing-content.md)。

### 第五步：配置 Giscus 评论（可选）

详见 [部署指南](deployment.md#giscus-评论配置)。

---

## 常用命令

```bash
# 启动开发服务器（支持热更新）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器（需先 build）
npm run start

# 代码检查
npm run lint
```

---

## 开发工作流

### 写新文章

1. 在 `content/zh/` 创建 MDX 文件
2. 在 `content/en/` 创建对应英文版（同名文件）
3. 浏览器会自动热更新（无需重启服务器）

### 更新页面内容

- **文案/翻译** → 编辑 `messages/zh.json` 或 `messages/en.json`
- **页面数据**（项目、书单等）→ 编辑对应页面文件顶部的数据数组
- **样式调整** → 直接修改组件中的 Tailwind 类名

### 添加摄影图片

1. 将图片文件复制到 `public/photos/`
2. 支持格式：`.jpg`、`.jpeg`、`.png`、`.webp`、`.gif`、`.avif`
3. 刷新 `/zh/photos` 页面即可看到更新（无需代码改动）

### 项目结构变更

如果需要添加新页面：

1. 在 `app/[locale]/新页面名/page.tsx` 创建页面文件
2. 在 `messages/zh.json` 和 `messages/en.json` 添加对应翻译 namespace
3. 在 `components/Navigation.tsx` 的 `navLinks` 数组中添加导航项
4. 在 `messages/zh.json` 和 `messages/en.json` 的 `nav` 对象中添加翻译键

---

## 常见问题

**Q: 访问 `/` 没有跳转，返回 404？**

A: 检查 `proxy.ts` 是否存在且导出了 `config`。Next.js 16 使用 `proxy.ts` 而非 `middleware.ts`。

**Q: 修改了 `messages/zh.json` 但页面没有更新？**

A: 保存文件后等待 Next.js HMR（热更新）重新加载，通常 1-2 秒内生效。如未生效，手动刷新浏览器。

**Q: 摄影页显示"还没有照片"？**

A: 确认图片已放入 `public/photos/` 目录，且文件格式为支持的图片格式（jpg/png/webp等）。

**Q: 构建时报 TypeScript 错误？**

A: 运行 `npm run lint` 查看具体错误信息，常见问题是缺少类型标注或 `await` 缺失。

**Q: 深色/浅色模式如何工作？**

A: 点击导航栏右侧的太阳/月亮图标（`ThemeToggle`）切换主题。偏好会保存在 `localStorage`（键名 `blog-color-scheme`），下次访问时自动恢复。若未曾手动设置，默认跟随系统主题。

**Q: 切换主题时出现短暂白色闪烁？**

A: 刷新后首次渲染前会读取 `localStorage` 并立即应用 `.dark` 类（内联脚本），正常情况下不会闪烁。若仍有闪烁，检查 `app/[locale]/layout.tsx` 中 `<head>` 内的内联脚本是否存在。
