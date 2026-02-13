# AGENTS.md - 悠久之翼博客项目指南

## 项目概述

这是一个基于 **Hexo 7.x** 的静态博客站点，使用自定义主题 `my-theme`，部署在 GitHub Pages 上。

- **站点地址**: https://eternalwings.xyz
- **主题**: my-theme（自定义主题）
- **语言**: 简体中文 (zh-CN)
- **作者**: 悠久之翼

---

## 技术栈

### 核心框架
- **Hexo**: 7.3.0 - 静态站点生成器
- **Node.js**: 基于的构建工具

### 主题技术
- **EJS**: 模板引擎（`.ejs` 文件）
- **SCSS/Sass**: 样式预处理器
- **Stylus**: 备选样式语言
- **原生 JavaScript**: 客户端交互（无框架）

### 第三方库
- **MDUI**: Material Design UI 组件库
- **Lenis**: 平滑滚动库
- **Medium Zoom**: 图片点击放大
- **BlurHash**: 图片模糊占位
- **PrismJS**: 代码高亮

### 构建工具
- **hexo-renderer-sass**: SCSS 编译
- **hexo-renderer-ejs**: EJS 模板渲染
- **hexo-renderer-marked**: Markdown 渲染
- **hexo-deployer-git**: Git 部署

---

## 项目结构

```
my-site/
├── _config.yml              # Hexo 主配置文件
├── package.json             # 项目依赖
├── source/                  # 源文件目录
│   ├── _posts/             # 博客文章
│   │   ├── hello-world.md
│   │   ├── my-world.md
│   │   ├── my-test.md
│   │   └── My-Gallery.md
│   ├── about/              # 关于页面
│   │   └── index.md
│   ├── gallery/            # 图库页面
│   │   └── index.md
│   ├── resume/             # 简历页面
│   │   └── index.md
│   └── robots.txt          # 搜索引擎爬虫配置
├── themes/                  # 主题目录
│   └── my-theme/           # 自定义主题
│       ├── _config.yaml    # 主题配置
│       ├── layout/         # 布局模板
│       │   ├── layout.ejs  # 主布局
│       │   ├── index.ejs   # 首页
│       │   ├── page.ejs    # 普通页面
│       │   ├── about.ejs   # 关于页模板
│       │   ├── gallery.ejs # 图库页模板
│       │   ├── resume.ejs  # 简历页模板
│       │   └── partials/   # 部分模板
│       │       ├── navbar.ejs
│       │       ├── sidebar.ejs
│       │       ├── footer.ejs
│       │       ├── fixed-user-info.ejs
│       │       ├── import-css.ejs
│       │       ├── import-js.ejs
│       │       └── import-svg.ejs
│       ├── source/         # 主题静态资源
│       │   ├── css/        # 样式文件
│       │   │   ├── variable.scss    # CSS 变量
│       │   │   ├── global.scss      # 全局样式
│       │   │   ├── mdui.min.css     # MDUI 样式
│       │   │   ├── lenis.min.css    # Lenis 样式
│       │   │   └── prism-tomorrow.min.css  # 代码高亮
│       │   ├── js/         # JavaScript 文件
│       │   │   ├── global.js        # 全局脚本
│       │   │   ├── globalObserver.js # 全局观察器
│       │   │   ├── components.js    # 组件脚本
│       │   │   ├── progressbar.js   # 进度条
│       │   │   ├── mdui.min.js      # MDUI 库
│       │   │   ├── lenis.min.js     # Lenis 库
│       │   │   ├── blurhash.min.js  # BlurHash 库
│       │   │   └── medium-zoom.min.js # 图片缩放
│       │   ├── images/       # 图片资源
│       │   └── icons/        # 图标资源
│       └── scripts/          # Hexo 脚本
│           └── global.js     # 全局辅助函数
├── scaffolds/              # 文章模板
│   ├── post.md             # 文章模板
│   ├── page.md             # 页面模板
│   └── draft.md            # 草稿模板
└── .github/
    ├── workflows/
    │   └── pages.yml       # GitHub Pages 部署工作流
    └── dependabot.yml      # 依赖自动更新
```

---

## 代码规范

### 通用规范
- **缩进**: 2 空格（禁止使用 Tab）
- **换行**: LF (Unix 风格)
- **编码**: UTF-8
- **最大行宽**: 120 字符

### 文件命名
- **模板文件**: 小写，使用连字符（`-`）分隔，如 `fixed-user-info.ejs`
- **样式文件**: 小写，使用连字符（`-`）分隔，如 `variable.scss`
- **脚本文件**: 小写，使用驼峰命名（camelCase），如 `globalObserver.js`
- **图片文件**: 小写，使用连字符或下划线，保持简洁

### Markdown 文章规范

#### Front-matter 格式
```yaml
---
title: 文章标题
date: 2024-01-15 10:00:00
updated: 2024-01-16 15:30:00
tags: 
  - 标签1
  - 标签2
categories:
  - 分类名
# 可选：封面图
cover: cover.avif
# 可选：文章摘要
excerpt: 这是一段摘要...
---
```

#### 图片引用
- **文章内图片**: 使用相对路径 `./image.png`
- **主题资源图片**: 使用绝对路径 `/images/image.png`
- **推荐格式**: AVIF > WebP > PNG/JPG
- **大图优化**: 使用 BlurHash 占位

---

## 主题开发规范

### EJS 模板

#### 语法规范
```ejs
<!-- 变量输出 - 自动转义 -->
<%= variable %>

<!-- 原始 HTML 输出 - 慎用 -->
<%- rawHtml %>

<!-- 条件语句 -->
<% if (condition) { %>
  <div>内容</div>
<% } %>

<!-- 循环 -->
<% posts.forEach(post => { %>
  <article><%= post.title %></article>
<% }) %>

<!-- 引入部分模板 -->
<%- partial('partials/navbar') %>
```

#### 可用变量
- `config`: Hexo 全局配置
- `page`: 当前页面数据
- `site`: 站点数据
- `theme`: 主题配置
- `path`: 当前路径
- `url`: 完整 URL

### SCSS/CSS 规范

#### 变量定义（variable.scss）
```scss
:root {
  /* 语义化颜色变量 - 支持 light-dark() */
  --text-1: light-dark(#222222, #ffffffbf);
  --text-2: light-dark(#222222, #c1c1c1);
  --bg-1: light-dark(#ffffff, #303030);
  --bg-2: light-dark(#ffffff8c, #0000008c);
}
```

#### 编写规范
- 使用 CSS 变量管理主题色
- 优先使用 `light-dark()` 函数处理暗黑/亮色模式
- 组件样式使用 BEM 命名法（可选）
- 避免深层嵌套（最大 3 层）

### JavaScript 规范

#### 全局脚本（global.js）
```javascript
// 使用 IIFE 避免污染全局命名空间
(function() {
  'use strict';
  
  // 初始化函数
  function init() {
    // 代码逻辑
  }
  
  // DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

#### 组件脚本（components.js）
- 使用原生 JS，不引入额外框架
- 组件初始化使用 data 属性标记
- 事件委托优化性能

---

## 常用命令

```bash
# 本地预览
npm run server
# 或
hexo server

# 生成静态文件
npm run build
# 或
hexo generate

# 清理缓存
npm run clean
# 或
hexo clean

# 部署
npm run deploy
# 或
hexo deploy

# 新建文章
hexo new post "文章标题"

# 新建页面
hexo new page "页面名称"
```

---

## 功能特性

### 已集成功能

1. **响应式设计**: 适配桌面、平板、手机
2. **暗黑/亮色模式**: 自动切换，使用 CSS `light-dark()`
3. **平滑滚动**: Lenis 库实现
4. **图片优化**:
   - BlurHash 模糊占位
   - Medium Zoom 点击放大
   - 懒加载支持
5. **代码高亮**: PrismJS，Tomorrow 主题
6. **Material Design**: MDUI 组件库
7. **SEO 优化**:
   - 结构化数据 (JSON-LD)
   - Sitemap 自动生成
   - RSS 订阅
   - Open Graph 标签
8. **性能优化**:
   - 图片懒加载
   - 预加载 (instant.page)
   - 资源压缩

### 页面类型

- **首页** (`index.ejs`): 文章列表
- **文章页** (`post.ejs`): 单篇文章（继承 page.ejs）
- **普通页面** (`page.ejs`): 通用页面
- **关于页** (`about.ejs`): 个人介绍
- **图库页** (`gallery.ejs`): 图片展示
- **简历页** (`resume.ejs`): 简历展示

---

## 主题配置（_config.yaml）

```yaml
# 侧边菜单
sidebar:
  主页: 
    href: /
    icon: home
  图库:
    href: /gallery
    icon: image
  关于:
    href: /about
    icon: person

# 加载的脚本（按顺序）
scripts:
  - /js/mdui.min.js
  - /js/lenis.min.js
  - /js/blurhash.min.js
  - /js/globalObserver.js
  - /js/global.js
  - /js/medium-zoom.min.js
  - /js/progressbar.js
  - /js/components.js

# 加载的样式（按顺序）
stylesheets:
  - /css/mdui.min.css
  - /css/global.css
  - /css/lenis.min.css
  - /css/prism-tomorrow.min.css
```

---

## 部署说明

### GitHub Pages 自动部署

配置文件: `.github/workflows/pages.yml`

- **触发条件**: push 到 main 分支
- **构建环境**: Ubuntu + Node.js 20
- **部署目标**: GitHub Pages

### 手动部署

```bash
# 确保配置正确
# _config.yml 中:
# deploy:
#   type: git
#   repo: <你的仓库地址>
#   branch: gh-pages

hexo clean && hexo generate && hexo deploy
```

---

## 常见问题

### 图片无法显示
- 检查 `post_asset_folder: true` 是否启用
- 文章内图片使用相对路径 `./image.png`
- 确认图片已提交到 Git

### 样式未生效
- 检查 `hexo clean` 是否执行
- 确认 SCSS 编译无错误
- 检查浏览器缓存

### 部署失败
- 检查 GitHub Token 权限
- 确认 Actions 已启用
- 查看 Actions 日志排查错误

---

## 扩展开发

### 添加新页面模板

1. 在 `themes/my-theme/layout/` 创建 `.ejs` 文件
2. 参考现有模板结构
3. 在 Hexo 中新建页面指定 `layout: 模板名`

### 添加 Hexo 辅助函数

在 `themes/my-theme/scripts/global.js` 中:

```javascript
hexo.extend.helper.register('helperName', function() {
  // 辅助函数逻辑
  return '返回值';
});
```

### 自定义标签插件

在 `scripts/` 目录添加:

```javascript
hexo.extend.tag.register('tagname', function(args, content) {
  // 标签解析逻辑
  return `<div>${content}</div>`;
}, {ends: true});
```

---

## 资源链接

- **Hexo 文档**: https://hexo.io/docs/
- **Hexo API**: https://hexo.io/api/
- **EJS 文档**: https://ejs.co/
- **MDUI 文档**: https://www.mdui.org/
- **主题开发指南**: https://hexo.io/docs/themes

---

## 注意事项

1. **不要直接修改 `public/` 目录**: 这是生成目录，会被覆盖
2. **保持依赖更新**: 使用 Dependabot 自动更新
3. **图片优化**: 上传前压缩，大图使用 WebP/AVIF 格式
4. **代码提交**: 提交前运行 `hexo clean` 和 `hexo generate` 确保无错误
5. **浏览器兼容**: 目标浏览器为现代浏览器（Chrome, Firefox, Safari, Edge 最新版）

---

*最后更新: 2026-02-12*
