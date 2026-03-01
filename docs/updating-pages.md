# 页面更新指南

本文档说明如何更新博客中每个页面的内容。所有内容修改都不需要了解 React/Next.js 知识，只需编辑指定位置的数据即可。

## 目录

- [首页](#首页)
- [关于我页面](#关于我页面)
- [项目页面](#项目页面)
- [摄影页面](#摄影页面)
- [书单页面](#书单页面)
- [Now 页面](#now-页面)
- [工具页面](#工具页面)
- [链接收藏页面](#链接收藏页面)
- [导航栏](#导航栏)

---

## 首页

**文件：** `messages/zh.json` 和 `messages/en.json`

### 修改名字、简介、标语

```json
// messages/zh.json → "home" 节点
{
  "home": {
    "name": "你的名字",
    "tagline": "你的一句话简介",
    "bio": "你的个人简介段落，可以较长"
  }
}
```

同步修改 `messages/en.json` 中的英文版本。

### 修改社交链接

**文件：** `app/[locale]/page.tsx`，找到文件顶部的 `SOCIAL_LINKS`：

```typescript
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/你的用户名" },
  { label: "Twitter / X", href: "https://x.com/你的用户名" },
  { label: "Email", href: "mailto:你的邮箱" },
  // 可以继续添加：
  // { label: "LinkedIn", href: "https://linkedin.com/in/..." },
  // { label: "Bilibili", href: "https://space.bilibili.com/..." },
];
```

**规则：** `href` 以 `mailto:` 开头时在当前标签页打开，其他链接在新标签页打开。

### 首页最新文章

首页自动读取最新 5 篇文章，无需手动配置。在 `app/[locale]/page.tsx` 中：

```typescript
const recentPosts = getPostsByLocale(locale).slice(0, 5); // 修改 5 可以改变数量
```

---

## 关于我页面

**文件：** `app/[locale]/about/page.tsx` + `messages/zh.json`（`about` 节点）

### 修改简介文字

编辑 `messages/zh.json`（`messages/en.json` 中同步修改英文版）：

```json
{
  "about": {
    "subtitle": "全栈开发者 / 摄影爱好者 / 终身学习者",
    "bio1": "你好，我是...",
    "bio2": "在业余时间，我喜欢..."
  }
}
```

### 修改技术栈标签

编辑 `app/[locale]/about/page.tsx` 顶部的 `SKILLS` 数组：

```typescript
const SKILLS = [
  "TypeScript",
  "React",
  "Vue",
  "Python",
  "Rust",
  "Docker",
  // 按需增删，每个字符串显示为一个标签
];
```

### 修改"更多页面"链接文字

这些是从关于页跳转到 Now/Uses/Books/Links 的链接文字。编辑 `messages/zh.json`：

```json
{
  "about": {
    "nowLink": "现在在做什么 →",
    "usesLink": "我用的工具 →",
    "booksLink": "我的书单 →",
    "linksLink": "链接收藏 →"
  }
}
```

---

## 项目页面

**文件：** `app/[locale]/projects/page.tsx`

找到文件顶部的 `PROJECTS` 数组，每个对象代表一个项目：

```typescript
const PROJECTS = [
  {
    name: "项目名称",                              // 显示名称
    description: {
      zh: "中文描述，一两句话介绍这个项目",
      en: "English description of the project",
    },
    tech: ["Next.js", "TypeScript", "PostgreSQL"], // 技术标签
    github: "https://github.com/用户名/仓库名",    // 代码链接，填 "#" 则不显示
    live: "https://your-project.com",              // 预览链接，填 "#" 则不显示
  },
  // 继续添加更多项目...
];
```

### 添加新项目

在 `PROJECTS` 数组末尾追加一个对象：

```typescript
{
  name: "新项目",
  description: {
    zh: "中文描述",
    en: "English description",
  },
  tech: ["React", "Node.js"],
  github: "https://github.com/...",
  live: "#",  // 没有预览链接时填 "#"
},
```

### 删除项目

直接从 `PROJECTS` 数组中删除对应的对象即可。

---

## 摄影页面

**文件：** `public/photos/` 目录

摄影页面**自动读取** `public/photos/` 目录中的所有图片，无需修改代码。

### 添加照片

将图片文件直接复制到 `public/photos/` 目录：

```
public/
└── photos/
    ├── tokyo-2026.jpg
    ├── sunset.webp
    └── street-photo.png
```

**支持的格式：** `.jpg`、`.jpeg`、`.png`、`.webp`、`.gif`、`.avif`

**显示顺序：** 按文件名字母序排列（可通过给文件名加日期前缀控制顺序，如 `2026-03-01-tokyo.jpg`）。

### 删除照片

从 `public/photos/` 目录删除对应图片文件即可。

### 图片建议

- **分辨率：** 长边不超过 2000px（更大的文件影响加载速度）
- **格式：** 推荐 `.webp`（体积最小，质量好）
- **文件名：** 使用英文和连字符，避免中文和空格

---

## 书单页面

**文件：** `app/[locale]/books/page.tsx`

找到文件顶部的 `BOOKS` 对象，分三个状态管理：

```typescript
const BOOKS: Record<BookStatus, Book[]> = {
  reading: [      // 在读中
    {
      title: "书名",
      author: "作者"
    },
  ],
  read: [         // 已读
    {
      title: "书名",
      author: "作者",
      rating: 5,  // 评分 1-5，可选
      note: "一句话评价，可选",
    },
  ],
  want: [         // 想读
    {
      title: "书名",
      author: "作者"
    },
  ],
};
```

### 添加一本书

在对应状态的数组中添加一个对象：

```typescript
// 添加到"已读"列表
read: [
  {
    title: "人月神话",
    author: "Frederick P. Brooks Jr.",
    rating: 5,
    note: "软件工程的经典，每隔几年重读都有新收获",
  },
],
```

### 移动书的状态

将书的对象从一个数组剪切，粘贴到另一个数组。例如从 `reading` 移到 `read`，同时可以添加 `rating` 和 `note`。

### 隐藏某个状态分类

如果某个状态（如 `want`）的数组为空，该分类不会显示：

```typescript
want: [],  // 数组为空时，"想读"分类不显示
```

---

## Now 页面

**文件：** `app/[locale]/now/page.tsx`

Now 页面记录"你现在在做什么"，需要**定期手动更新**。

找到文件顶部的 `ZH_CONTENT`（中文内容）和 `EN_CONTENT`（英文内容）数组：

```typescript
const ZH_CONTENT = [
  {
    heading: "正在做",
    items: [
      "在 XXX 公司做全栈开发",
      "学习 Rust 语言",
    ],
  },
  {
    heading: "正在读",
    items: [
      "《黑客与画家》· Paul Graham",
    ],
  },
  {
    heading: "正在听",
    items: [
      "米津玄師 - STRAY SHEEP",
    ],
  },
  {
    heading: "最近在思考",
    items: [
      "如何在工作和创作之间保持平衡",
    ],
  },
];
```

### 更新建议

- 每月或每季度更新一次
- 更新后同步修改 `messages/zh.json` 和 `messages/en.json` 中 `now.subtitle` 的日期：

```json
{
  "now": {
    "subtitle": "这是一个 /now 页面，记录我当前关注的事情（上次更新：2026年6月）"
  }
}
```

---

## 工具页面

**文件：** `app/[locale]/uses/page.tsx`

找到文件顶部的 `ZH_USES`（中文）和 `EN_USES`（英文）数组：

```typescript
const ZH_USES = [
  {
    category: "硬件",          // 分类名称
    items: [
      {
        name: "MacBook Pro 14\"",          // 工具名称（左列）
        desc: "M3 Pro 芯片，主力开发机"    // 工具描述（右列）
      },
      {
        name: "iPhone 15 Pro",
        desc: "主力手机"
      },
    ],
  },
  {
    category: "编辑器 & 终端",
    items: [
      { name: "VS Code", desc: "主力编辑器，One Dark Pro 主题" },
      { name: "Warp", desc: "现代化终端，AI 辅助" },
    ],
  },
  // 继续添加分类...
];
```

### 添加新分类

在数组末尾追加一个对象：

```typescript
{
  category: "浏览器插件",
  items: [
    { name: "uBlock Origin", desc: "广告拦截" },
    { name: "沉浸式翻译", desc: "网页双语翻译" },
  ],
},
```

---

## 链接收藏页面

**文件：** `app/[locale]/links/page.tsx`

找到文件顶部的 `ZH_LINKS`（中文）和 `EN_LINKS`（英文）数组：

```typescript
const ZH_LINKS = [
  {
    category: "开发资源",      // 分类名称
    items: [
      {
        title: "MDN Web Docs",               // 链接标题
        url: "https://developer.mozilla.org", // 链接地址
        desc: "前端开发权威文档",              // 简短描述
      },
      // 继续添加...
    ],
  },
  // 继续添加分类...
];
```

### 添加新链接

在对应分类的 `items` 数组中添加：

```typescript
{
  title: "Tailwind CSS",
  url: "https://tailwindcss.com",
  desc: "原子化 CSS 框架",
},
```

### 添加新分类

在 `ZH_LINKS` 数组末尾追加：

```typescript
{
  category: "中文博客",
  items: [
    { title: "阮一峰的网络日志", url: "https://ruanyifeng.com", desc: "技术与人文" },
  ],
},
```

---

## 导航栏

**文件：** `components/Navigation.tsx`

当前导航链接：

```typescript
const navLinks = [
  { href: "/blog",     label: t("blog") },
  { href: "/projects", label: t("projects") },
  { href: "/photos",   label: t("photos") },
  { href: "/about",    label: t("about") },
];
// 注意：首页链接已移除，左上角的 Logo（"Jimmy"）即为首页入口
```

> **注意：** 导航栏右侧的 `ThemeToggle`（亮/暗色切换）和 `LanguageSwitcher`（语言切换）不在 `navLinks` 数组中，它们是单独的组件，始终显示在导航栏最右侧。若需修改这两个按钮的行为，分别编辑 `components/ThemeToggle.tsx` 和 `components/LanguageSwitcher.tsx`。

### 添加新导航项

**第一步：** 在 `navLinks` 数组中添加新项：

```typescript
{ href: "/new-page", label: t("newPage") },
```

**第二步：** 在 `messages/zh.json` 和 `messages/en.json` 的 `nav` 节点中添加翻译键：

```json
{
  "nav": {
    "newPage": "新页面"
  }
}
```

### 删除导航项

从 `navLinks` 数组中删除对应对象即可（页面本身不受影响，只是导航入口被移除）。

---

## 快速参考：各页面的修改位置

| 页面 | 数据位置 | 翻译位置 |
|------|----------|----------|
| 首页个人信息 | `messages/zh.json` → `home` | `messages/en.json` → `home` |
| 首页社交链接 | `app/[locale]/page.tsx` → `SOCIAL_LINKS` | 同一文件（链接无需翻译） |
| 关于-简介 | `messages/zh.json` → `about` | `messages/en.json` → `about` |
| 关于-技术栈 | `app/[locale]/about/page.tsx` → `SKILLS` | 同一文件（技术名称无需翻译） |
| 项目 | `app/[locale]/projects/page.tsx` → `PROJECTS` | 对象内 `description.zh/en` |
| 摄影 | `public/photos/` 目录 | 无需翻译 |
| 书单 | `app/[locale]/books/page.tsx` → `BOOKS` | 书名/作者直接填对应语言 |
| Now | `app/[locale]/now/page.tsx` → `ZH_CONTENT` / `EN_CONTENT` | 两个数组分别维护 |
| 工具 | `app/[locale]/uses/page.tsx` → `ZH_USES` / `EN_USES` | 两个数组分别维护 |
| 链接 | `app/[locale]/links/page.tsx` → `ZH_LINKS` / `EN_LINKS` | 两个数组分别维护 |
