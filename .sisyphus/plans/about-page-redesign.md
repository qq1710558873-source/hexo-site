# About 页面装修工作计划

## TL;DR

> **目标**: 重新设计 about.ejs 页面，包含 Hero 大图背景、个人简介、时间线、技能栈、数据统计 5 个模块
> 
> **交付物**: 
> - `themes/my-theme/layout/about.ejs` - 完整模板
> - `themes/my-theme/source/css/about.scss` - 样式文件
> - `source/about/index.md` - 带 Front-matter 的内容配置
> 
> **预计工作量**: Medium (约 2-3 小时)
> **并行执行**: NO - 顺序依赖
> **关键路径**: Task 1 → Task 2 → Task 3

---

## Context

### Original Request
装修 about.ejs 页面，包含个人简介、时间线、技能展示，采用大图 Hero 背景风格。

### Interview Summary
**Key Discussions**:
- 展示内容：以上都要（个人简介 + 时间线 + 技能栈）
- 页面顶部：大图背景 Hero 区域
- 技术栈：Hexo + EJS + MDUI + SCSS
- 配色：跟随主题，主色 #7c4dff

**Design Decisions**:
- Hero 区域复用现有背景图 `/images/Eve 自宅雑談_2_prob4.webp`
- 头像使用现有 `/images/avatar.webp`
- 内容通过 Front-matter 配置
- 5 个模块：Hero、Bio、Timeline、Skills、Stats

### Metis Review
**Identified Gaps** (addressed):
- ✅ Front-matter schema 已在计划中定义
- ✅ 空值回退策略已包含
- ✅ 样式隔离：使用 `.about-page` 作用域
- ✅ 响应式断点：桌面/平板/移动端
- ✅ 范围锁定：不修改 layout.ejs、page.ejs

---

## Work Objectives

### Core Objective
创建一个功能完整、视觉统一的关于页面，包含 5 个核心展示模块，支持通过 Front-matter 灵活配置内容，适配响应式布局。

### Concrete Deliverables
- `themes/my-theme/layout/about.ejs` - Hero + 4 内容区块
- `themes/my-theme/source/css/about.scss` - 所有样式
- `source/about/index.md` - 配置示例 + 个人简介内容

### Definition of Done
- [ ] 访问 `/about` 能看到 Hero 大图背景
- [ ] 滚动页面，5 个模块依次展示
- [ ] 暗色/亮色模式切换正常
- [ ] 移动端显示正常（单栏布局）
- [ ] 所有图片加载无 404

### Must Have
- Hero 区域：全宽背景图 + 居中头像/名字/社交链接
- Bio 区域：Markdown 内容渲染
- Timeline：垂直时间线，至少 3 个节点
- Skills：网格布局，至少 3 个技能进度条
- Stats：4 个统计数据卡片

### Must NOT Have (Guardrails)
- ❌ 不添加联系表单
- ❌ 不动态 CMS 功能
- ❌ 不修改 layout.ejs 或 page.ejs
- ❌ 不添加新的全局 CSS 变量
- ❌ 不添加新的 JS 依赖库
- ❌ 不修改现有的 navbar、sidebar 组件

---

## Front-Matter Schema

### 完整配置示例

```yaml
---
title: 关于我
date: 2026-01-08 11:17:39
layout: about

hero:
  background: /images/Eve 自宅雑談_2_prob4.webp
  avatar: /images/avatar.webp
  name: 悠久之翼
  tagline: 全栈开发者 / 摄影爱好者
  social:
    github: eternalwings
    twitter: eternalwings
    email: contact@eternalwings.xyz

timeline:
  - year: "2024-至今"
    title: 高级前端工程师
    company: 某科技公司
    description: 负责核心产品前端架构设计，带领团队完成多个重点项目
  - year: "2022-2024"
    title: 前端开发工程师
    company: 某互联网公司
    description: 参与电商平台重构，负责商品详情页和购物车模块
  - year: "2020-2022"
    title: 本科毕业
    company: 某某大学
    description: 计算机科学与技术专业，获优秀毕业生称号

skills:
  - name: JavaScript/TypeScript
    level: 90
  - name: React/Vue
    level: 85
  - name: Node.js
    level: 80
  - name: Python
    level: 70
  - name: CSS/SCSS
    level: 88
  - name: Docker
    level: 65

stats:
  - label: 年经验
    value: 5
    icon: work
  - label: 文章数
    value: 56
    icon: article
  - label: 项目数
    value: 12
    icon: folder
  - label: 运行天数
    value: 1095
    icon: schedule
---

这里是个人简介的正文内容，支持 **Markdown** 格式。

可以写多段文字，介绍自己的经历、兴趣爱好、技术理念等。
```

### 字段说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `hero.background` | string | 否 | `/images/Eve 自宅雑談_2_prob4.webp` | Hero 背景图路径 |
| `hero.avatar` | string | 否 | `/images/avatar.webp` | 头像路径 |
| `hero.name` | string | 否 | `config.author` | 显示名称 |
| `hero.tagline` | string | 否 | `""` | 副标题/签名 |
| `hero.social` | object | 否 | `{}` | 社交链接，支持 github/twitter/email |
| `timeline` | array | 否 | `[]` | 时间线数组 |
| `timeline[].year` | string | 是 | - | 时间标签 |
| `timeline[].title` | string | 是 | - | 职位/事件标题 |
| `timeline[].company` | string | 是 | - | 公司/学校名 |
| `timeline[].description` | string | 否 | `""` | 详细描述 |
| `skills` | array | 否 | `[]` | 技能数组 |
| `skills[].name` | string | 是 | - | 技能名称 |
| `skills[].level` | number | 是 | - | 熟练度 0-100 |
| `stats` | array | 否 | `[]` | 统计数据数组 |
| `stats[].label` | string | 是 | - | 标签文字 |
| `stats[].value` | number | 是 | - | 数值 |
| `stats[].icon` | string | 否 | `""` | 图标名称 |

### 空值回退策略

```javascript
// Hero 区域回退
const hero = page.hero || {};
const background = hero.background || '/images/Eve 自宅雑談_2_prob4.webp';
const avatar = hero.avatar || '/images/avatar.webp';
const name = hero.name || config.author || 'Anonymous';
const tagline = hero.tagline || '';
const social = hero.social || {};

// Timeline 回退
const timeline = page.timeline || [];
// 如果为空数组，不显示 Timeline 区域

// Skills 回退
const skills = page.skills || [];
// 如果为空数组，不显示 Skills 区域

// Stats 回退
const stats = page.stats || [];
// 如果为空数组，显示默认的 4 个统计（从 site 数据计算）
```

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (需要新建 SCSS 文件)
- **Automated tests**: NO (Hexo 页面没有测试框架)
- **Framework**: N/A

### Agent-Executed QA Scenarios (MANDATORY)

**所有验证通过 `hexo server` + Playwright 执行**

#### Task 1 验证 - Hero 区域

```
Scenario: Hero section renders correctly
  Tool: Playwright
  Preconditions: hexo server running on localhost:4000
  Steps:
    1. Navigate to http://localhost:4000/about
    2. Wait for body loaded (timeout: 10s)
    3. Assert: .about-hero element exists
    4. Assert: .hero-background has background-image style
    5. Assert: .hero-avatar img has src attribute
    6. Assert: .hero-name text is not empty
    7. Screenshot: .sisyphus/evidence/task-1-hero-desktop.png
  Expected Result: Hero section displays with background, avatar, name
  Evidence: .sisyphus/evidence/task-1-hero-desktop.png

Scenario: Hero responsive on mobile
  Tool: Playwright
  Preconditions: hexo server running
  Steps:
    1. Set viewport: 375x667
    2. Navigate to http://localhost:4000/about
    3. Wait for body loaded
    4. Assert: .hero-name is visible
    5. Assert: .hero-avatar width < 150px
    6. Screenshot: .sisyphus/evidence/task-1-hero-mobile.png
  Expected Result: Hero scales down for mobile
  Evidence: .sisyphus/evidence/task-1-hero-mobile.png
```

#### Task 2 验证 - 内容区域

```
Scenario: All content sections render
  Tool: Playwright
  Preconditions: hexo server running, about.md has full config
  Steps:
    1. Navigate to http://localhost:4000/about
    2. Scroll to .about-bio
    3. Assert: .about-bio exists and is visible
    4. Scroll to .about-timeline
    5. Assert: .timeline-item count >= 3
    6. Scroll to .about-skills
    7. Assert: .skill-card count >= 3
    8. Scroll to .about-stats
    9. Assert: .stat-item count == 4
    10. Screenshot: .sisyphus/evidence/task-2-all-sections.png
  Expected Result: All 5 sections display with content
  Evidence: .sisyphus/evidence/task-2-all-sections.png

Scenario: Markdown content renders
  Tool: Playwright
  Preconditions: hexo server running
  Steps:
    1. Navigate to http://localhost:4000/about
    2. Find .about-bio .mdui-card-content
    3. Assert: innerHTML contains rendered HTML (not raw markdown)
    4. Screenshot: .sisyphus/evidence/task-2-markdown.png
  Expected Result: Markdown converted to HTML
  Evidence: .sisyphus/evidence/task-2-markdown.png
```

#### Task 3 验证 - 暗色模式

```
Scenario: Dark mode styling
  Tool: Playwright
  Preconditions: hexo server running
  Steps:
    1. Navigate to http://localhost:4000/about
    2. Click .theme-toggle button
    3. Wait 500ms for transition
    4. Assert: body has class mdui-theme-layout-dark
    5. Assert: .about-hero background is dark
    6. Screenshot: .sisyphus/evidence/task-3-dark-mode.png
    7. Click .theme-toggle button again
    8. Assert: body has class mdui-theme-layout-light
    9. Screenshot: .sisyphus/evidence/task-3-light-mode.png
  Expected Result: Theme toggles correctly
  Evidence: .sisyphus/evidence/task-3-dark-mode.png, task-3-light-mode.png
```

#### Task 4 验证 - 图片加载

```
Scenario: All images load without 404
  Tool: Playwright
  Preconditions: hexo server running
  Steps:
    1. Navigate to http://localhost:4000/about
    2. Open browser console
    3. Check for 404 errors in network requests
    4. Assert: no 404 errors for .webp or .png files
    5. Screenshot: .sisyphus/evidence/task-4-no-errors.png
  Expected Result: All images load successfully
  Evidence: .sisyphus/evidence/task-4-no-errors.png
```

---

## Execution Strategy

### Sequential Execution

```
Task 1: Create about.scss styles
  └─ Depends: None
  └─ Blocks: Task 2
  
Task 2: Rewrite about.ejs template
  └─ Depends: Task 1
  └─ Blocks: Task 3
  
Task 3: Update source/about/index.md
  └─ Depends: Task 2
  └─ Blocks: None (final)
```

### Critical Path
Task 1 → Task 2 → Task 3

---

## TODOs

### Task 1: 创建 about.scss 样式文件

**What to do**:
1. 创建 `themes/my-theme/source/css/about.scss`
2. 所有样式包裹在 `.about-page` 类下，避免全局污染
3. 实现 5 个模块的样式：
   - Hero：全宽背景、渐变遮罩、居中内容
   - Bio：卡片样式、Markdown 内容排版
   - Timeline：垂直时间线、节点标记
   - Skills：网格布局、进度条动画
   - Stats：4 列网格、数字样式
4. 响应式断点：
   - Desktop (> 1024px)：4 列 stats，3 列 skills
   - Tablet (768px - 1024px)：2 列 stats，2 列 skills
   - Mobile (< 768px)：单列布局
5. 暗色模式支持：使用 `light-dark()` 函数

**Must NOT do**:
- ❌ 不使用全局选择器（如 `body`, `h1`）
- ❌ 不覆盖现有的 MDUI 类样式
- ❌ 不添加新的 CSS 变量到 :root

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Reason**: Frontend styling task requiring CSS/SCSS expertise
- **Skills**: None (纯 CSS 任务)

**Parallelization**:
- **Can Run In Parallel**: NO
- **Parallel Group**: Sequential
- **Blocks**: Task 2
- **Blocked By**: None

**References**:
- `themes/my-theme/source/css/global.scss:1-749` - 参考现有的 CSS 变量和样式模式
- `themes/my-theme/source/css/variable.scss` - 主题变量定义
- `themes/my-theme/layout/layout.ejs:26` - MDUI 主题类名参考

**Acceptance Criteria**:
- [ ] 文件创建：`themes/my-theme/source/css/about.scss`
- [ ] 所有选择器以 `.about-page` 开头
- [ ] 包含 5 个模块的样式定义
- [ ] 响应式媒体查询 @media (max-width: 1024px) 和 @media (max-width: 768px)
- [ ] 使用 `light-dark()` 支持暗色模式
- [ ] SCSS 编译无错误：`hexo generate` 成功

**Agent-Executed QA**:
```
Scenario: SCSS compiles without errors
  Tool: Bash
  Steps:
    1. Run: hexo clean && hexo generate
    2. Assert: exit code 0
    3. Assert: no SCSS compilation errors in output
  Evidence: Terminal output capture

Scenario: CSS file generated
  Tool: Bash
  Steps:
    1. Run: ls public/css/about.css
    2. Assert: file exists
    3. Run: wc -l public/css/about.css
    4. Assert: line count > 50
  Evidence: File listing output
```

**Commit**: YES (separate commit)
- Message: `feat(about): add about page styles`
- Files: `themes/my-theme/source/css/about.scss`

---

### Task 2: 重写 about.ejs 模板

**What to do**:
1. 完全重写 `themes/my-theme/layout/about.ejs`
2. 模板结构：
   ```ejs
   <div class="about-page">
     <!-- Hero Section -->
     <section class="about-hero">
       <div class="hero-background" style="background-image: url(...)"></div>
       <div class="hero-content">
         <img class="hero-avatar" src="..." alt="...">
         <h1 class="hero-name">...</h1>
         <p class="hero-tagline">...</p>
         <div class="hero-social">...</div>
       </div>
     </section>
     
     <!-- Bio Section -->
     <section class="about-bio mdui-card mdui-hoverable">
       <div class="mdui-card-content">
         <%- page.content %>
       </div>
     </section>
     
     <!-- Timeline Section -->
     <section class="about-timeline">
       <% if (page.timeline && page.timeline.length) { %>
         <!-- timeline items -->
       <% } %>
     </section>
     
     <!-- Skills Section -->
     <section class="about-skills">
       <% if (page.skills && page.skills.length) { %>
         <!-- skill cards -->
       <% } %>
     </section>
     
     <!-- Stats Section -->
     <section class="about-stats">
       <!-- stat items -->
     </section>
   </div>
   ```
3. 实现 Front-matter 数据解析逻辑
4. 添加空值回退（见上面的回退策略）
5. 社交图标使用 MDUI 图标或内联 SVG
6. Stats 如果没有配置，自动计算：
   - 文章数：`site.posts.length`
   - 分类数：`site.categories.length`
   - 标签数：`site.tags.length`

**Must NOT do**:
- ❌ 不修改 layout.ejs
- ❌ 不修改 page.ejs
- ❌ 不添加外部 JS 库
- ❌ 不使用 inline JavaScript

**Recommended Agent Profile**:
- **Category**: `visual-engineering`
- **Reason**: EJS template development requiring HTML/CSS integration
- **Skills**: None

**Parallelization**:
- **Can Run In Parallel**: NO
- **Parallel Group**: Sequential
- **Blocks**: Task 3
- **Blocked By**: Task 1

**References**:
- `themes/my-theme/layout/page.ejs:1-4` - 参考卡片样式
- `themes/my-theme/layout/layout.ejs:37` - 参考 partial 引入方式
- `themes/my-theme/source/css/about.scss` - 配套样式文件

**Acceptance Criteria**:
- [ ] 文件重写：`themes/my-theme/layout/about.ejs`
- [ ] 包含 5 个 section 模块
- [ ] Hero 区域显示背景图、头像、名字
- [ ] Bio 区域渲染 Markdown 内容
- [ ] Timeline 循环渲染时间线数据
- [ ] Skills 网格渲染技能卡片
- [ ] Stats 显示 4 个统计项
- [ ] 所有变量有回退默认值

**Agent-Executed QA**:
```
Scenario: Template renders without errors
  Tool: Playwright
  Steps:
    1. Start hexo server: hexo server --silent &
    2. Navigate to http://localhost:4000/about
    3. Wait for page load (timeout: 10s)
    4. Assert: HTTP status 200
    5. Assert: no console errors
    6. Screenshot: .sisyphus/evidence/task-2-render.png
  Evidence: Screenshot file

Scenario: Hero section content
  Tool: Playwright
  Steps:
    1. Navigate to http://localhost:4000/about
    2. Assert: .hero-background has background-image
    3. Assert: .hero-avatar src contains 'avatar'
    4. Assert: .hero-name text length > 0
    5. Screenshot: .sisyphus/evidence/task-2-hero.png
  Evidence: Screenshot file
```

**Commit**: YES (separate commit)
- Message: `feat(about): rewrite about page template`
- Files: `themes/my-theme/layout/about.ejs`

---

### Task 3: 更新 about.md 内容配置

**What to do**:
1. 更新 `source/about/index.md`
2. 添加完整的 Front-matter 配置（见上面的 Schema）
3. 编写个人简介 Markdown 内容（3-5 段）
4. 配置时间线（至少 3 个节点）
5. 配置技能列表（至少 6 个技能）
6. 配置统计数据（4 个）

**Must NOT do**:
- ❌ 不写过于简短的简介（至少 200 字）
- ❌ 不配置虚假数据（根据你的真实信息）

**Recommended Agent Profile**:
- **Category**: `writing`
- **Reason**: Content creation task
- **Skills**: None

**Parallelization**:
- **Can Run In Parallel**: NO
- **Parallel Group**: Sequential
- **Blocks**: None
- **Blocked By**: Task 2

**References**:
- `source/about/index.md:1-6` - 现有文件内容
- 本计划的 Front-Matter Schema 部分

**Acceptance Criteria**:
- [ ] 文件更新：`source/about/index.md`
- [ ] Front-matter 包含 hero、timeline、skills、stats
- [ ] Markdown 正文 >= 200 字
- [ ] Timeline >= 3 项
- [ ] Skills >= 6 项
- [ ] Stats == 4 项

**Agent-Executed QA**:
```
Scenario: Content displays correctly
  Tool: Playwright
  Steps:
    1. Navigate to http://localhost:4000/about
    2. Assert: .hero-name text matches front-matter name
    3. Assert: .timeline-item count >= 3
    4. Assert: .skill-card count >= 6
    5. Assert: .stat-item count == 4
    6. Screenshot: .sisyphus/evidence/task-3-content.png
  Evidence: Screenshot file
```

**Commit**: YES (separate commit)
- Message: `content(about): add about page content and config`
- Files: `source/about/index.md`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| Task 1 | `feat(about): add about page styles` | `themes/my-theme/source/css/about.scss` | hexo generate 无错误 |
| Task 2 | `feat(about): rewrite about page template` | `themes/my-theme/layout/about.ejs` | 页面渲染正常 |
| Task 3 | `content(about): add about page content and config` | `source/about/index.md` | 内容完整显示 |

---

## Success Criteria

### Verification Commands
```bash
# 1. 编译检查
hexo clean && hexo generate
# Expected: 无错误，exit code 0

# 2. 文件存在检查
ls themes/my-theme/source/css/about.scss
ls themes/my-theme/layout/about.ejs
# Expected: 文件存在

# 3. 页面访问检查（需 hexo server 运行）
curl -s http://localhost:4000/about | grep -c "about-hero"
# Expected: 输出 >= 1
```

### Final Checklist
- [ ] 所有 5 个模块正常显示
- [ ] Hero 区域有背景图、头像、名字、社交链接
- [ ] Bio 区域显示 Markdown 内容
- [ ] Timeline 显示至少 3 个节点
- [ ] Skills 显示至少 6 个技能进度条
- [ ] Stats 显示 4 个统计项
- [ ] 暗色/亮色模式切换正常
- [ ] 移动端显示正常
- [ ] 所有图片无 404 错误
- [ ] SCSS 编译无错误

---

## Notes

### 响应式设计细节

**Desktop (> 1024px)**:
- Hero：背景图全宽，内容垂直居中
- Bio：max-width 800px 居中
- Timeline：左侧时间，右侧内容卡片
- Skills：3 列网格
- Stats：4 列网格

**Tablet (768px - 1024px)**:
- Hero：头像 80px，字号减小
- Bio：padding 减小
- Timeline：保持垂直，卡片宽度 90%
- Skills：2 列网格
- Stats：2 列网格

**Mobile (< 768px)**:
- Hero：单列布局，头像 60px
- Bio：padding 16px
- Timeline：时间在上，内容在下
- Skills：单列列表
- Stats：2x2 网格

### 性能优化

- Hero 背景图使用 WebP 格式
- 所有图片使用懒加载（已有 BlurHash 支持）
- 进度条动画只在进入视口时触发（复用 globalObserver.js）
- CSS 使用 will-change 优化动画性能

### 浏览器兼容性

- 支持 Chrome、Firefox、Safari、Edge 最新版
- light-dark() 函数需要现代浏览器
- 降级方案：MDUI 主题类自动处理

---

*Plan generated by Prometheus*
*Date: 2026-02-13*
