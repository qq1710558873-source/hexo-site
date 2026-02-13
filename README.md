# 悠久之翼の博客

[![Hexo Version](https://img.shields.io/badge/hexo-7.3.0-blue?logo=hexo)](https://hexo.io)
[![Node.js Version](https://img.shields.io/badge/node.js-16+-green?logo=node.js)](https://nodejs.org)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deploy-success?logo=github)](https://pages.github.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

基于 **Hexo 7.x** 构建的静态博客站点，使用自定义主题 `my-theme`，部署于 GitHub Pages。集成了 Material Design 风格 UI、平滑滚动体验、代码高亮和图片优化功能。

**在线地址**: [https://eternalwings.xyz](https://eternalwings.xyz)

> 人生若只如初见。

---

## 功能特性

### 核心功能
- **响应式布局**：适配桌面、平板、手机等设备
- **暗黑/亮色模式**：基于 CSS `light-dark()` 函数自动切换
- **平滑滚动**：集成 Lenis 库实现丝滑滚动体验
- **Material Design**：使用 MDUI 组件库构建界面

### 内容功能
- **文章管理**：支持标签、分类、归档
- **分类功能**：
  - 支持多级分类（层级结构）
  - 分类聚合页面展示所有分类及文章数量
  - 单独分类页面列出该分类下所有文章
  - 访问地址：`/categories`
- **代码高亮**：PrismJS 实现，Tomorrow 主题
- **图片优化**：
  - BlurHash 模糊占位加载
  - Medium Zoom 点击放大查看
  - 懒加载支持
- **RSS 订阅**：自动生成 Atom 格式订阅源
- **Sitemap**：自动生成搜索引擎站点地图

### SEO 优化
- 结构化数据 (JSON-LD)
- Open Graph 标签
- 语义化 HTML

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 静态生成器 | Hexo 7.3.0 |
| 模板引擎 | EJS |
| 样式预处理 | SCSS / Sass / Stylus |
| UI 框架 | MDUI (Material Design) |
| 平滑滚动 | Lenis |
| 图片处理 | BlurHash、Medium Zoom |
| 代码高亮 | PrismJS |
| 部署平台 | GitHub Pages |

---

## 目标用户

- **个人博主**：希望搭建简洁、高性能的静态博客
- **开发者**：需要一个展示项目、技术文章的平台
- **设计师**：需要美观、响应式的个人站点

---

## 项目结构

```
my-site/
├── _config.yml              # Hexo 主配置
├── package.json             # 项目依赖
├── source/                  # 源文件目录
│   ├── _posts/             # 博客文章
│   ├── about/              # 关于页面
│   ├── gallery/            # 图库页面
│   └── resume/             # 简历页面
├── themes/                  # 主题目录
│   └── my-theme/           # 自定义主题
│       ├── _config.yaml    # 主题配置
│       ├── layout/         # EJS 模板
│       ├── source/         # 静态资源（CSS/JS/图片）
│       └── scripts/        # Hexo 辅助函数
├── scaffolds/              # 文章模板
└── .github/workflows/      # GitHub Actions 部署配置
```

---

## 快速开始

### 环境要求

- Node.js 16+
- Git

### 安装依赖

```bash
npm install
```

### 本地预览

```bash
npm run server
```

访问 http://localhost:4000 查看站点。

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run server` | 启动本地预览服务器 |
| `npm run build` | 生成静态文件 |
| `npm run clean` | 清理缓存和生成文件 |
| `npm run deploy` | 部署站点 |

---

## 写作指南

### 新建文章

```bash
hexo new post "文章标题"
```

### Front-matter 格式

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
cover: cover.avif
excerpt: 这是一段摘要...
---
```

**多级分类示例**：

```yaml
---
categories:
  - 技术
  - 前端
  - Vue
---
```

上述配置会生成三级分类结构：`技术 > 前端 > Vue`

### 图片引用

- **文章内图片**：使用相对路径 `./image.png`（需开启 `post_asset_folder: true`）
- **主题资源图片**：使用绝对路径 `/images/image.png`
- **推荐格式**：AVIF > WebP > PNG/JPG

### 分类页面

- **所有分类页**：访问 `/categories` 查看站点所有分类
- **单个分类页**：访问 `/categories/分类名/` 查看该分类下的文章
- **多级分类**：访问 `/categories/一级分类/二级分类/` 查看子分类文章

### 代码规范

- 缩进：2 空格
- 换行：LF (Unix 风格)
- 编码：UTF-8
- 最大行宽：120 字符

---

## 配置说明

### Hexo 主配置 (`_config.yml`)

```yaml
# Site
title: 悠久之翼の博客
subtitle: ''
description: '个人技术博客'
keywords: 'Hexo, 博客, 技术'
author: 悠久之翼
language: zh-CN
timezone: ''

# URL
url: https://eternalwings.xyz

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md
default_layout: post
titlecase: false
external_link:
  enable: true
  field: site
  exclude: ''
filename_case: 0
render_drafts: false
post_asset_folder: true
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: false
  tab_replace: ''

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
per_page: 10
pagination_dir: page

# Extensions
theme: my-theme

# Deployment
deploy:
  type: git
  repo: https://github.com/eternalwings/eternalwings.github.io
  branch: main
```

### 主题配置 (`themes/my-theme/_config.yaml`)

```yaml
sidebar:
  主页: 
    href: /
    icon: home
  分类:
    href: /categories
    icon: folder
  图库:
    href: /gallery
    icon: image
  关于:
    href: /about
    icon: person

scripts:
  - /js/mdui.min.js
  - /js/lenis.min.js
  - /js/blurhash.min.js
  - /js/globalObserver.js
  - /js/global.js
  - /js/medium-zoom.min.js
  - /js/progressbar.js
  - /js/components.js

stylesheets:
  - /css/mdui.min.css
  - /css/global.css
  - /css/lenis.min.css
  - /css/prism-tomorrow.min.css
```

### 自定义样式变量

编辑 `themes/my-theme/source/css/variable.scss`：

```scss
:root {
  /* 主题色 */
  --primary-color: #6200ee;
  --primary-color-dark: #3700b3;
  
  /* 文字颜色 - 支持亮暗模式 */
  --text-1: light-dark(#222222, #ffffffbf);
  --text-2: light-dark(#666666, #c1c1c1);
  
  /* 背景颜色 */
  --bg-1: light-dark(#ffffff, #303030);
  --bg-2: light-dark(#f5f5f5, #1a1a1a);
  
  /* 卡片背景 */
  --card-bg: light-dark(#ffffff, #383838);
}
```

---

## 部署说明

### 自动部署（GitHub Actions）

项目已配置 `.github/workflows/pages.yml`，推送至 main 分支后自动部署到 GitHub Pages。

**触发条件**: push 到 main 分支  
**构建环境**: Ubuntu + Node.js 20  
**部署目标**: GitHub Pages

### 手动部署

```bash
# 配置 _config.yml
deploy:
  type: git
  repo: <你的仓库地址>
  branch: gh-pages

# 执行部署
hexo clean && hexo generate && hexo deploy
```

---

## 开发指南

### 添加新页面模板

1. 在 `themes/my-theme/layout/` 创建 `.ejs` 文件
2. 参考现有模板结构编写
3. 新建页面时指定 `layout: 模板名`

示例 `page.ejs`：

```ejs
<%- partial('partials/header') %>
<main class="mdc-top-app-bar--fixed-adjust">
  <article class="post-container">
    <h1><%= page.title %></h1>
    <div class="post-content">
      <%- page.content %>
    </div>
  </article>
</main>
<%- partial('partials/footer') %>
```

### 添加 Hexo 辅助函数

在 `themes/my-theme/scripts/global.js` 中添加：

```javascript
hexo.extend.helper.register('helperName', function(args) {
  // 辅助函数逻辑
  return '返回值';
});
```

### 自定义标签插件

在 `scripts/` 目录添加：

```javascript
hexo.extend.tag.register('tagname', function(args, content) {
  // 标签解析逻辑
  return `<div class="tag">${content}</div>`;
}, {ends: true});
```

### EJS 模板语法

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

### 可用变量

- `config`: Hexo 全局配置
- `page`: 当前页面数据
- `site`: 站点数据
- `theme`: 主题配置
- `path`: 当前路径
- `url`: 完整 URL

---

## 常见问题

### 图片无法显示

- 确认 `_config.yml` 中 `post_asset_folder: true` 已启用
- 文章内图片使用相对路径 `./image.png`
- 确认图片已提交到 Git 仓库

### 样式未生效

- 执行 `hexo clean` 清理缓存
- 检查 SCSS 编译是否有错误
- 清除浏览器缓存后刷新

### 部署失败

- 检查 GitHub Token 权限设置
- 确认仓库已启用 Actions
- 查看 Actions 日志排查具体错误

### 暗黑模式不切换

- 确保浏览器支持 `light-dark()` 函数（现代浏览器）
- 检查 CSS 变量是否正确定义

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

### 贡献方式

1. **报告问题**：发现 Bug 或有功能建议，请提交 [Issue](https://github.com/eternalwings/eternalwings.github.io/issues)
2. **贡献代码**：
   - Fork 本仓库
   - 创建功能分支：`git checkout -b feature/你的功能`
   - 提交更改：`git commit -m '添加新功能'`
   - 推送分支：`git push origin feature/你的功能`
   - 提交 Pull Request

### 代码规范

- 缩进使用 2 空格
- JavaScript 使用 ESLint 规范
- SCSS/CSS 使用 Stylelint 规范
- 提交信息使用中文或英文描述

### 开发流程

1. 确保本地测试通过：`npm run server`
2. 构建生产文件：`npm run build`
3. 检查无错误后提交

---

## 相关链接

- [Hexo 文档](https://hexo.io/docs/)
- [Hexo API](https://hexo.io/api/)
- [EJS 模板](https://ejs.co/)
- [MDUI 文档](https://www.mdui.org/)
- [Lenis 文档](https://lenis.studio/)
- [PrismJS 文档](https://prismjs.com/)
- [BlurHash 文档](https://blurha.sh/)
- [Medium Zoom 文档](https://github.com/francoischalifour/medium-zoom)

---

## 浏览器支持

- Chrome / Edge（最新版）
- Firefox（最新版）
- Safari（最新版）
- iOS Safari（最新版）
- Android Chrome（最新版）

---

## License

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 作者

**悠久之翼**

- GitHub: [@eternalwings](https://github.com/eternalwings)
- 站点: [https://eternalwings.xyz](https://eternalwings.xyz)
- 邮箱: [contact@eternalwings.xyz](mailto:contact@eternalwings.xyz)

---

<p align="center">
  <img src="https://img.shields.io/badge/Built_with-Hexo-purple?logo=hexo" alt="Built with Hexo">
  <img src="https://img.shields.io/badge/Powered_by-GitHub_Pages-blue?logo=github" alt="Powered by GitHub Pages">
</p>
