# JIEJOE.com 深度分析报告

> 分析日期：2026-03-21
> 目标网站：https://www.jiejoe.com/home
> 网站标题：JIEJOE | 视觉设计者
> Awwwards Honorable Mention 获奖作品

---

## 1. 技术栈分析

### 核心框架
| 技术 | 版本/说明 |
|------|-----------|
| **Vue 2** | SPA 架构，`<div id="app"></div>` + Vue CLI 构建 |
| **Vue Router** | 客户端路由（hash/history mode） |
| **GSAP** | 核心动画引擎（34+ 处调用） |
| **GSAP ScrollTrigger** | 滚动触发动画（2+ 处引用） |
| **Lottie** | JSON 动画渲染（32 处引用，用于 loading、contact 等） |
| **百度统计** | hm.js 网站分析 |

### 构建工具
- **Vue CLI** (webpack)：`chunk-vendors.80e23a73.js` + `app.1c32d6b6.js` 打包模式
- CSS 单文件：`app.74d3b851.css`（约 58.8KB 压缩后）
- JS 入口：app bundle 约 1.4MB（含所有页面组件）

### 字体
- **自定义英文字体**：`font-family: eng`（MyFonts 授权字体，Monotype 版权）
- **自定义中文字体**：`font-family: zh`
- 字体通过 MyFonts Webfont 许可（Build ID: 3867246）

### CDN & 外部服务
- 图片 CDN：`https://cdn.jiejoe.com/photos/photo_*.webp`
- 后端 API：`https://api.jiejoe.com:3000/send_message`（联系表单）
- 百度统计：hm.baidu.com
- ICP 备案号：蜀ICP备2022022313号-2

---

## 2. 色彩系统

### 主题色
| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--theme_green` | `#17f700` | **品牌主色**，霓虹绿，极具视觉冲击力 |
| `--theme_black` | `#171717` | 深黑底色 |
| `--theme_white` | `#f7f7f7` | 接近纯白背景 |

### 辅助色
| 色值 | 用途 |
|------|------|
| `#002aff` | 蓝色强调 |
| `#00ff3c` | 绿色变体 |
| `#0000ff80` | 半透明蓝 |
| `#ff000080` | 半透明红 |
| `#ddd` | 网格线（菜单背景） |

### 设计特征
- **极简双色系**：以黑 (#171717) 和绿 (#17f700) 为核心
- 白色背景 (#f7f7f7) 用于菜单等反转场景
- 半透明色用于装饰性元素（模糊球体等）

---

## 3. 页面结构 & 路由

### 路由表
```
/home      → 主页（核心长页面，多 section 滚动）
/videos    → 视频作品页
/photos    → 图片作品页
/contact   → 联系页面
/404       → 自定义错误页（SVG 插画）
```

### 全局组件
- **Loading**：全屏加载动画（绿色方块背景 + Lottie 动画 + "LOADING" 提示文字）
- **Menu**：全屏覆盖式菜单（从底部滑入，圆角顶部，网格背景）
- **Scrollbar**：自定义滚动条（基于 `scroll_controler.progress`）

---

## 4. 首页 (Home) Section 深度拆解

首页是一个超长滚动页面，由以下 section 组成：

### 4.1 Welcome（欢迎区）
- **背景**：两个模糊彩色球体（`hwb_blurball1`, `hwb_blurball2`），跟随鼠标移动
- **Logo**：JIEJOE 品牌 logo
- **主标题**：动画逐字入场（`.hwm_title div` stagger 动画）
- **人物角色**：SVG 矢量人物（`home_welcome_nobody`），带眼睛（`hwv_eye`）和嘴巴（`hwv_mouse`）动态效果
- **滚动提示**：`home_welcome_scrolltip`，带品牌标识和箭头
- **鼠标追踪**：背景球体跟随鼠标位移（`power3.out` 缓动，30px 范围）

### 4.2 Brand Scroll（品牌滚动条）
- 左右双向滚动品牌文字条（`hws_brand_left`, `hws_brand_right`）
- 带箭头分隔符

### 4.3 About（关于区）
- **标题**：`hac_title`，文字动画入场
- **分隔线**：`hac_line`，横向展开动画
- **内容**：介绍文字，`home_about_content_show` 为展开状态
- **自我描述**：
  - "爱做一些奇奇怪怪的设计"
  - "爱剪一些莫名其妙的视频"
  - "爱做一些不拘一格的交互"

### 4.4 Portrait（肖像区）
- **主图**：`hpm_imgbox`，上下两张图片叠加
- **文字线条**：`home_portrait_textline`，文字划入动画
- **分隔线**：`home_portrait_line`，`_show` 状态触发

### 4.5 Idea（创意区）
- **背景**：`home_idea_background`，可交互（点击���发 `check_light`）
- **容器**：包含马 (`hic_horse`) 和大脑 (`hic_brain`) 插画
- 暗示创意思维的视觉隐喻

### 4.6 Skills（技能区）
- **IntersectionObserver** 监听进入视口
- **每个技能卡片**：`home_skills_skill` + `hss_block` + `hss_block_canvas` + `hss_text`
- **文字动画**：4行文字分别以 stagger 方式入场（`power4.out` 缓动）
- Canvas 元素用于每个技能的视觉效果

### 4.7 Vision（视觉区）
- **滚动线条**：`home_vision_scrolllines` + 多条 `hvs_line`
- **蜘蛛眼**：`home_vision_spidereye`，文字逐字展示
- **文字内容**："视觉至上"（竖排文字）
- 视差滚动效果

### 4.8 Works（作品标题区）
- **标题动画**：IntersectionObserver 触发，`home_works_title p` stagger 入场
- **中英文**：`home_works_zh` + `home_works_eng`
- **分隔线**：`home_works_line`

### 4.9 Video Title（视频标题区）
- **帧动画**：`home_videotitle_frames` 包含多帧 WebP 图片序列
- **GSAP 帧播放器**：`hvf_frame` 通过 GSAP 控制帧切换
- **鼠标跟随提示**：`home_videotitle_mousetip` + `_circle`，跟随鼠标移动
- **文字描述**："jiejoe's editing and design works"

### 4.10 Videos（视频列表区）
- **悬停卡片**：`home_videos_card`，鼠标进入时从鼠标位置出现
- **视频列表**：`home_videos_video`，含英文名称和时间
- **鼠标交互**：卡片跟随鼠标移动，离开时缩小消失
- **照片切换**：悬停不同视频项切换预览图

### 4.11 Photos（图片展示区）
- **堆叠卡片**：`home_photos_plates`，5张叠加的图片卡（`hpp_plate1-5`）
- **图片源**：`cdn.jiejoe.com/photos/photo_*.webp`
- **交互**：点击移动图片堆（`move_imgs()`）
- **机械手臂**：`hpp_top_arm` + `hpp_top_arm_hand`，装饰性动画元素
- **提示文字**："get more photos of jiejoe"

### 4.12 Contact（联系区 - 底部）
- **电话号码**：`home_contact_phone`
- **联系文字**：`home_contact_text`

### 4.13 Bottom（页脚区）
- **消息列表**：`home_bottom_messages`
- **底部链接**：`hbb_link` + `hbb_menu`
- **备案号**：蜀ICP备2022022313号-2

---

## 5. 交互 & 动画模式

### GSAP 动画模式
```javascript
// 1. 入场动画 - stagger 逐个元素入场
gsap.timeline()
  .to(".hwm_title div", { stagger: 0.1 })
  .to(".home_welcome_nobody", {}, "<0.1")
  .to(".home_welcome_scrolltip", {})

// 2. 鼠标跟随 - 背景球体 / 提示元素
gsap.to(target, { x, y, ease: "power3.out" })

// 3. IntersectionObserver + GSAP 组合
observer = new IntersectionObserver(entries => {
  if (entry.isIntersecting) {
    gsap.timeline()
      .to(child1, { ease: "power4.out" })
      .to(child2, {}, "<")
      .to(child3, {}, "<0.1")
  }
})

// 4. 帧序列动画
gsap.to(".hvf_frame", { /* frame scrubbing */ })

// 5. 悬停卡片跟随
container.onmouseenter = e => {
  gsap.timeline()
    .set(card, { x: e.x, y: e.y })
    .to(card, { scale: 1 })
}
container.onmouseleave = () => gsap.to(card, { scale: 0 })
container.onmousemove = e => gsap.to(card, { x: e.x, y: e.y })

// 6. 表单动画
gsap.timeline()
  .to(".contact_form_input", { stagger: 0.05 })
  .to(".cfs_button", {})

// 7. 输入抖动反馈
gsap.timeline({ repeat: 2 })
  .to(input, { rotate: "2deg", duration: 0.04 })
  .to(input, { rotate: "-2deg", duration: 0.04 })
```

### Lottie 动画
- Loading 页面动画
- Contact 页面装饰动画
- JSON 格式动画数据内嵌在 bundle 中

### 自定义滚动系统
- `scroll_controler`：自定义滚动控制器
- `progress` 属性驱动自定义滚动条 UI
- 速度检测：`speed > 15 * scale_nums` 触发滚动到顶部
- 移动端适配：`scale_nums` 根据屏幕比例动态调整

### IntersectionObserver 使用
- Skills 区域：监听技能卡片进入视口触发动画
- Works 区域：标题入场动画
- Portrait 区域：分隔线展开

---

## 6. 响应式设计

### 缩放机制
通过 CSS 变量 `--scale_nums` 实现整体缩放：
```css
/* 默认 */        --scale_nums: 0.6
/* 宽屏 3:2 */    --scale_nums: 1
/* 窄屏 <3:2 */   --scale_nums: 1
/* 竖屏 <1:1 */   --scale_nums: 0.8
```

### 媒体查询
- `@media screen and (max-aspect-ratio: 3/2)` — 平板适配
- `@media screen and (max-aspect-ratio: 1/1)` — 竖屏手机适配
- `@media screen and (max-aspect-ratio: ~0.6)` — 超窄屏适配
- `@media (hover: hover)` — 悬停效果仅在支持 hover 的设备上启用

---

## 7. 菜单系统

### 全屏菜单
- **布局**：全屏覆盖，从底部滑入（`translateY(100%)` → `translateY(0)`）
- **样式**：白色背景，顶部圆角 10rem，网格线背景（3rem 间距）
- **导航项**：
  - 主 X 页 / HOME
  - 视 X 频 / VIDEOS
  - 图 X 片 / PHOTOS
  - 联 X 系 / CONTACT
- **文字风格**：中文竖排 (`writing-mode: vertical-lr`) + 英文大字横排
- **悬停效果**：文字变绿色 + 英文 `translateX(5%)` 偏移
- **装饰元素**：右下角 4 张装饰图片（从底部滑入）
- 移动端圆角缩小至 6rem

---

## 8. Contact 页面

### 联系表单
- **标题**："get in touch :)"
- **副标题**："交个朋友？谈场合作？联系我，或者我联系你"
- **输入框**：
  - 你的称呼 / Your Name
  - 你的邮箱 / Your Email
  - 有何贵干 / Your Message
- **提交按钮**：`cfs_button`，点击触发 POST 请求到 `api.jiejoe.com:3000`
- **二维码**：3个 QR code（email 等联系方式）
- **动画**：
  - 输入框逐个入场（stagger 0.05s）
  - 提交后输入框清空动画（translateY 出去再回来）
  - 输入验证失败时抖动效果

### 404 页面
- 全屏 SVG 插画
- 包含 "HOME" 按钮，点击 `router.push("home")`

---

## 9. SEO & Meta

```html
<title>JIEJOE | 视觉设计者</title>
<meta name="description" content="JIEJOE,视觉设计者:包括网站、平面、视频、和交互设计">
<meta name="keywords" content="JIEJOE, Visual Design, Web Design, Video Editing, UI Design, UX Design, graphic design, Creativity, 视觉设计, 网页设计, 视频剪辑, UI设计, 交互设计, 平面设计, 创意">
<meta name="theme-color" content="#17f700">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="JIEJOE | 视觉设计者">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="zh-CN">

<!-- 搜索引擎验证 -->
百度站长：codeva-yMfDUWyvkp
Bing Webmaster：8BD400A4E7FB7B56D71F13C8D063C32C
Google Search Console：6AE_Q3X-XObA1ds1JvCHnCAUdbMHWJE085djnVVODEU
```

---

## 10. 可还原到本项目的设计元素

### 高可行性（可直接实现）

| 特性 | 实现方式 | 适用场景 |
|------|----------|----------|
| **霓虹绿主题色** | CSS 变量 `--accent: #17f700` | 作为辅助强调色 |
| **全屏 Loading 动画** | CSS + Lottie/CSS animation | 首页初始加载 |
| **滚动触发入场动画** | IntersectionObserver + CSS transitions | 博客列表、关于页 |
| **文字逐字/逐行 stagger 入场** | CSS animation-delay 或 GSAP | 页面标题、hero 区域 |
| **鼠标跟随效果** | mousemove + CSS transform | 首页装饰元素 |
| **全屏覆盖式导航菜单** | CSS transform + transition | 移动端导航升级 |
| **模糊渐变球体背景** | CSS blur + radial-gradient + mousemove | 首页 hero 区域 |
| **自定义滚动条** | CSS `::webkit-scrollbar` 或 JS 滚动条 | 全局 |
| **悬停卡片跟随鼠标** | mousemove + GSAP/CSS transform | 博客卡片列表 |
| **竖排中文文字** | `writing-mode: vertical-lr` | 装饰性文字元素 |
| **网格线背景** | CSS `linear-gradient` repeat | 菜单或 section 背景 |
| **SVG 插画 404 页面** | SVG + 简单动画 | 替换当前 not-found |

### 中等可行性（需额外依赖或工作量）

| 特性 | 所需依赖 | 说明 |
|------|----------|------|
| **Lottie 动画** | `lottie-web` 或 `@lottiefiles/lottie-player` | 需要制作/找到 JSON 动画 |
| **GSAP 高级动画** | `gsap` + `ScrollTrigger` | 商业项目需 GSAP 授权 |
| **帧序列动画** | 多帧 WebP 图片 + JS 控制 | 需要素材制作 |
| **图片堆叠卡片交互** | GSAP 或 CSS + JS | 照片展示区域 |

### 低可行性（设计风格差异大或不适用）

| 特性 | 原因 |
|------|------|
| SVG 人物角色动画 | 需要原创 SVG 角色设计 |
| 自定义滚动控制器 | 博客内容优先，过度定制影响可用性 |
| Canvas 技能展示 | 博客场景不需要 |
| 机械手臂装饰元素 | 风格不匹配 |

---

## 11. 具体可移植的代码模式

### 模式 1：IntersectionObserver + 入场动画
```javascript
// 通用滚动入场动画 hook
function useScrollReveal(selector, options = {}) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, ...options });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
```

### 模式 2：鼠标跟随模糊球体
```css
.blur-ball {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  background: #17f700;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
```

### 模式 3：Stagger 入场
```css
.stagger-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.stagger-item.revealed {
  opacity: 1;
  transform: translateY(0);
}
/* 通过 CSS 变量设置不同的 delay */
.stagger-item:nth-child(1) { transition-delay: 0s; }
.stagger-item:nth-child(2) { transition-delay: 0.1s; }
.stagger-item:nth-child(3) { transition-delay: 0.2s; }
```

### 模式 4：全屏菜单
```css
.fullscreen-menu {
  position: fixed;
  inset: 0;
  background: var(--bg);
  transform: translateY(100%);
  border-radius: 2.5rem 2.5rem 0 0;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  background-image:
    linear-gradient(0deg, transparent 2.9rem, #ddd 3rem),
    linear-gradient(90deg, transparent 2.9rem, #ddd 3rem);
  background-size: 3rem 3rem;
}
.fullscreen-menu.open {
  transform: translateY(0);
}
```

### 模式 5：悬停卡片跟随
```javascript
function useMouseFollowCard(containerRef, cardRef) {
  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const onEnter = (e) => {
      card.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
      card.style.opacity = '1';
    };
    const onMove = (e) => {
      card.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    };
    const onLeave = () => {
      card.style.opacity = '0';
      card.style.transform += ' scale(0)';
    };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);
}
```

---

## 12. 设计灵感总结

### JIEJOE 的核心设计理念
1. **"视觉至上"** — 每个 section 都是独立的视觉体验
2. **极简配色** — 黑+绿双色系，极具辨识度
3. **交互驱动** — 几乎每个元素都有交互反馈
4. **滚动叙事** — 长页面通过滚动讲述个人故事
5. **中西融合** — 中文竖排 + 英文大字混排

### 可借鉴的设计原则
- Loading 状态不是等待，而是品牌展示的机会
- 鼠标移动 = 持续的微交互反馈
- IntersectionObserver 是零成本的"惊喜感"制造器
- 全屏菜单 > 传统导航条（对于作品集/个人网站）
- 少即是多：两种颜色 + 一种字体 = 极强品牌感

---

## 13. 参考链接

- [JIEJOE 官网](https://www.jiejoe.com/home)
- [Awwwards 获奖页面](https://www.awwwards.com/sites/jiejoe)
- [JIEJOE B站主页](https://www.bilibili.com/video/BV1hYceeGEuq/) — 网站演示视频（播放量 78,858）
- [JIEJOE B站早期版本](https://www.bilibili.com/video/BV1tG411X7tZ/) — 首版网站演示
- [GSAP 官网](https://gsap.com/) — 核心动画库
- [Lottie Web](https://github.com/airbnb/lottie-web) — JSON 动画渲染库
