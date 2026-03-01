# 部署指南

## 目录

- [部署到 Vercel（推荐）](#部署到-vercel推荐)
- [Giscus 评论配置](#giscus-评论配置)
- [自定义域名](#自定义域名)
- [环境变量](#环境变量)
- [部署前检查清单](#部署前检查清单)
- [本地构建验证](#本地构建验证)
- [常见部署问题](#常见部署问题)

---

## 部署到 Vercel（推荐）

Vercel 是 Next.js 的官方推荐部署平台，对 App Router 有最佳支持，免费套餐对个人博客完全够用。

### 第一步：推送代码到 GitHub

1. 在 [github.com](https://github.com) 创建新仓库
2. 将本地项目推送：

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 第二步：在 Vercel 导入项目

1. 访问 [vercel.com](https://vercel.com)，用 GitHub 账号登录
2. 点击 **"Add New → Project"**
3. 找到你的博客仓库，点击 **"Import"**
4. 配置（通常无需修改）：
   - Framework Preset：**Next.js**（自动识别）
   - Build Command：`npm run build`
   - Output Directory：`.next`
5. 点击 **"Deploy"**

等待约 1-2 分钟，部署完成后会获得一个 `xxx.vercel.app` 域名。

### 第三步：验证

访问分配的域名，确认：
- 根路径 `/` 自动重定向到 `/zh`
- 导航栏的语言切换正常
- 摄影页、书单页等新页面正常显示

---

## Giscus 评论配置

Giscus 基于 GitHub Discussions，文章评论会以 Discussion 的形式存储在你的 GitHub 仓库中。

### 前提条件

- 博客代码托管在 GitHub 仓库（公开仓库）
- 该仓库已启用 Discussions 功能

### 启用 GitHub Discussions

1. 进入 GitHub 仓库页面
2. 点击 **Settings**
3. 在 **Features** 部分，勾选 **Discussions**
4. 点击 **Set up discussions**，在弹出的编辑器中保存即可

### 获取 Giscus 配置

1. 访问 [giscus.app](https://giscus.app)
2. 在 **Repository** 输入框填入：`你的GitHub用户名/仓库名`（如 `LJMcarryu/Blog`）
3. 选择 **Page ↔ Discussion Mapping**：推荐选 `pathname`
4. 选择 **Discussion Category**：推荐选 `Announcements`（或任意分类）
5. 页面底部会生成配置代码，从中复制以下值：
   - `data-repo-id`
   - `data-category-id`

### 更新博客配置

编辑 `components/Comments.tsx`：

```typescript
const GISCUS_REPO = "你的GitHub用户名/仓库名";    // 例: "LJMcarryu/Blog"
const GISCUS_REPO_ID = "R_xxxxxxxxxx";            // 从 giscus.app 获取
const GISCUS_CATEGORY = "Announcements";           // Discussion 分类名
const GISCUS_CATEGORY_ID = "DIC_xxxxxxxxxxxx";     // 从 giscus.app 获取
```

### 验证评论

部署后，访问任意博客文章页面，滚动到底部，Giscus 评论区应正常加载。首次在文章下评论会自动在 GitHub Discussions 中创建对应的讨论帖。

---

## 自定义域名

### 在 Vercel 添加域名

1. 进入 Vercel 项目页面 → **Settings → Domains**
2. 输入你的域名（如 `jimmyliu.dev`），点击 **Add**
3. Vercel 会显示需要在域名 DNS 处添加的记录

### 配置 DNS

在你的域名注册商（如阿里云、腾讯云、Cloudflare）的 DNS 管理页面添加以下记录：

**方式 A：CNAME（推荐，使用 `www` 子域名）**

```
类型: CNAME
名称: www
值: cname.vercel-dns.com
```

**方式 B：A 记录（使用裸域名 `@`）**

```
类型: A
名称: @
值: 76.76.21.21
```

DNS 生效通常需要 10 分钟到 48 小时。

### 注意：next-intl 与自定义域名

无需额外配置，`proxy.ts` 中间件的路径匹配规则与域名无关，部署到自定义域名后语言重定向行为完全一致。

---

## 环境变量

本项目**目前不需要**任何环境变量，所有配置（Giscus、社交链接等）都在代码文件中直接设置。

如果未来需要添加敏感信息（如数据库连接、API 密钥），在项目根目录创建 `.env.local`：

```bash
# .env.local（不要提交到 Git）
DATABASE_URL=...
SOME_API_KEY=...
```

在 Vercel 中添加环境变量：**Settings → Environment Variables**

---

## 部署前检查清单

在推送代码到 GitHub 之前，确认以下项目：

### 个人信息

- [ ] `messages/zh.json` → `home.name` 已更新为真实姓名
- [ ] `messages/zh.json` → `home.tagline` 已更新
- [ ] `messages/zh.json` → `home.bio` 已更新
- [ ] `app/[locale]/page.tsx` → `SOCIAL_LINKS` 已更新为真实链接
- [ ] `messages/en.json` 中对应字段已更新英文版本

### 各页面内容

- [ ] `app/[locale]/about/page.tsx` → `SKILLS` 已更新
- [ ] `app/[locale]/projects/page.tsx` → `PROJECTS` 已更新
- [ ] `app/[locale]/books/page.tsx` → `BOOKS` 已更新
- [ ] `app/[locale]/now/page.tsx` → `ZH_CONTENT` 和 `EN_CONTENT` 已更新
- [ ] `app/[locale]/uses/page.tsx` → `ZH_USES` 和 `EN_USES` 已更新
- [ ] `app/[locale]/links/page.tsx` → `ZH_LINKS` 和 `EN_LINKS` 已更新

### 技术验证

- [ ] `npm run build` 本地构建无报错
- [ ] `npm run lint` 无 ESLint 错误
- [ ] 本地访问各页面（中英文）均正常显示

### Giscus（如果使用评论）

- [ ] `components/Comments.tsx` → 四个 Giscus 常量已配置
- [ ] GitHub 仓库已开启 Discussions

---

## 本地构建验证

在部署前，强烈建议本地构建一次验证：

```bash
# 构建生产版本
npm run build

# 如果构建成功，启动生产预览服务器
npm run start
```

访问 [http://localhost:3000](http://localhost:3000) 验证生产构建效果。

构建成功的标志：

```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (N/N)
✓ Collecting build traces
✓ Finalizing page optimization
```

---

## 常见部署问题

### 问题：构建失败，报 `Module not found`

**原因：** 缺少依赖包
**解决：** 运行 `npm install` 后重新 push

### 问题：部署后访问 `/` 返回 404 而非重定向

**原因：** `proxy.ts` 未被识别为中间件
**解决：** 确认 `proxy.ts` 在项目根目录（与 `package.json` 同级），且导出了 `config`

### 问题：摄影页在部署后显示"还没有照片"，本地正常

**原因：** `public/photos/` 目录下只有 `.gitkeep` 文件，图片未提交到 Git
**解决：** 将图片文件提交到 Git 仓库（注意图片体积）

> **提示：** 如果图片体积较大，可以使用 Vercel 的 Blob 存储（付费功能）或免费图床（如 imgbb、Cloudinary 免费计划）托管图片，然后在代码中使用外链。

### 问题：评论区不显示

**原因：** Giscus 配置不正确，或仓库未开启 Discussions
**解决：**
1. 检查 `comments.tsx` 中四个常量是否从 [giscus.app](https://giscus.app) 正确获取
2. 确认 GitHub 仓库的 Settings → Features → Discussions 已勾选
3. 确认仓库为**公开**仓库

### 问题：中文路径正常，英文路径 404

**原因：** `content/en/` 目录下没有对应的 MDX 文件
**解决：** 在 `content/en/` 中创建与中文同名的英文版 MDX 文件，或接受"英文版不显示该文章"的行为

### 问题：Vercel 部署后页面样式丢失

**原因：** Tailwind v4 的 PostCSS 配置问题
**解决：** 确认 `postcss.config.mjs` 中使用的是 `@tailwindcss/postcss` 而非 `tailwindcss`
