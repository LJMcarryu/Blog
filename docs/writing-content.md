# 写作指南

## 目录

- [文章文件结构](#文章文件结构)
- [Frontmatter 字段说明](#frontmatter-字段说明)
- [创建新文章](#创建新文章)
- [Markdown 语法支持](#markdown-语法支持)
- [在文章中使用图片](#在文章中使用图片)
- [双语文章管理](#双语文章管理)
- [文章排序规则](#文章排序规则)

---

## 文章文件结构

所有博客文章以 `.mdx` 文件形式存放在 `content/` 目录下：

```
content/
├── zh/                # 中文文章
│   ├── hello-world.mdx
│   └── my-second-post.mdx
└── en/                # 英文文章
    ├── hello-world.mdx
    └── my-second-post.mdx
```

**规则：**
- 中英文文章**文件名相同**（对应同一篇文章的不同语言版本）
- 文件名即为文章的 slug（URL 中的路径段）
- 文件名只使用小写字母、数字、连字符（`-`），不使用空格

---

## Frontmatter 字段说明

每篇文章顶部的 YAML frontmatter 定义文章元数据：

```yaml
---
title: 文章标题
date: 2026-03-01
description: 文章摘要，显示在博客列表卡片中（可选）
---
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 文章标题，显示在列表和详情页 |
| `date` | string | 是 | 发布日期，格式 `YYYY-MM-DD`，用于排序（降序） |
| `description` | string | 否 | 文章摘要，显示在列表卡片。不填则不显示摘要 |

**注意：** `content` 字段不在 frontmatter 中，是 `---` 之后的全部内容。

---

## 创建新文章

### 步骤 1：创建中文文章

在 `content/zh/` 目录创建 `文章slug.mdx` 文件：

```bash
# 文件路径示例
content/zh/my-new-post.mdx
```

文件内容：

```mdx
---
title: 我的新文章标题
date: 2026-03-15
description: 这篇文章介绍了...（简短描述，100字以内）
---

## 第一个章节

正文内容从这里开始。支持完整的 **Markdown** 语法。

## 第二个章节

可以继续写...
```

### 步骤 2：创建对应英文版本（可选）

在 `content/en/` 目录创建**同名**文件：

```bash
content/en/my-new-post.mdx
```

```mdx
---
title: My New Post Title
date: 2026-03-15
description: This post covers...
---

## First Section

English content goes here...
```

> **提示：** 如果只写了中文版，英文用户访问 `/en/blog` 时将不显示该文章（只展示 `content/en/` 中存在的文章）。如果不需要双语，只写中文版即可。

### 步骤 3：验证

启动开发服务器后，访问 `/zh/blog` 确认文章出现在列表中。

---

## Markdown 语法支持

由于使用了 `@tailwindcss/typography`（prose 类），Markdown 的所有标准元素都有良好的样式：

### 标题

```markdown
# 一级标题（文章内建议从 ## 开始）
## 二级标题
### 三级标题
```

### 文字样式

```markdown
**加粗文字**
*斜体文字*
~~删除线~~
`行内代码`
```

### 代码块

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```

```python
def hello():
    print("Hello, World!")
```
````

支持语法高亮（由 next-mdx-remote 处理）。

### 列表

```markdown
- 无序列表项一
- 无序列表项二
  - 嵌套列表项

1. 有序列表项一
2. 有序列表项二
```

### 链接与引用

```markdown
[链接文字](https://example.com)

> 这是一段引用文字
> 支持多行
```

### 分割线

```markdown
---
```

### 表格

```markdown
| 列一 | 列二 | 列三 |
|------|------|------|
| 数据 | 数据 | 数据 |
```

---

## 在文章中使用图片

### 方式一：public 目录（推荐）

将图片放入 `public/images/` 目录（需自行创建），然后在 MDX 中引用：

```markdown
![图片描述](/images/my-image.jpg)
```

浏览器会从 `/images/my-image.jpg` 加载，对应 `public/images/my-image.jpg`。

### 方式二：外链图片

```markdown
![图片描述](https://example.com/image.jpg)
```

直接使用图床或其他托管服务的图片链接。

---

## 双语文章管理

### 内容同步策略

建议采用以下方式保持中英文文章同步：

**方案 A：先写中文，后翻译**（推荐）
1. 完成中文文章
2. 翻译为英文后放入 `content/en/`
3. 两个文件使用相同 slug

**方案 B：仅中文**
- 只维护 `content/zh/`
- 英文页面不显示未翻译的文章
- 简单省事，适合个人博客

**方案 C：独立内容**
- 中英文写不同的文章（不要求一一对应）
- 两个语言版本可以有各自独特的文章

### 日期一致性

中英文对应文章的 `date` frontmatter **必须一致**，否则排序会不一致，造成列表顺序不同。

---

## 文章排序规则

文章按 `date` 字段**降序排列**（最新文章排最前）。

排序逻辑在 `lib/posts.ts` 中：

```typescript
.sort((a, b) => (a.date < b.date ? 1 : -1));
```

**日期格式要求：** `YYYY-MM-DD`（如 `2026-03-15`）。

如果 `date` 为空字符串，该文章会排在最后。

---

## 文章 Slug 命名规范

slug 即文件名（不含 `.mdx` 扩展名），同时也是文章 URL 的一部分：

```
文件名: my-travel-in-tokyo.mdx
URL:    /zh/blog/my-travel-in-tokyo
```

**命名规范：**
- 全小写字母
- 单词间用连字符 `-` 分隔
- 不使用空格、中文、特殊字符
- 简洁且有描述性，通常 3-6 个单词

**示例：**

| 好的命名 | 不好的命名 |
|----------|------------|
| `react-hooks-guide` | `React Hooks指南` |
| `my-2026-review` | `2026年终总结（完整版）` |
| `css-grid-tips` | `css_grid_tips` |
