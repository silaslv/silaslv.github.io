# 吕绪鑫 · 个人网站

纯静态站点：**HTML + CSS + 原生 JS**，无构建工具、无第三方依赖，推送后由 GitHub Pages 直接渲染。
在线地址：<https://xuxin123456.github.io>

## 结构

```text
.
├── index.html                 # 首页（hero + 栏目入口 + 最新文章）
├── about.html                 # 关于我（简介 / 技术栈 / 经历 / 联系）
├── posts/
│   ├── index.html             # 文章列表
│   └── YYYY-MM-DD-slug.html   # 文章正文（一篇一个文件）
├── projects/                  # 作品集（项目 + 截图 + Demo 链接）
│   └── index.html
├── certificates/              # 证书（获奖 / 资质）
│   ├── index.html
│   └── images/                # 证书扫描件
├── resources/
│   ├── index.html             # 资源中心（分类浏览 + 下载）
│   ├── ppt/  ├── video/  ├── audio/  └── pdf/
└── assets/
    ├── style.css              # Catppuccin 配色 + 明暗主题
    └── main.js                # 主题切换 / 进度条 / 目录高亮 / 返回顶部 / 复制邮箱
```

所有页面使用根路径（`/xxx`）引用资源，避免相对路径出错。

## 本地预览

```bash
cd ~/github-blog && python3 -m http.server 8000   # 打开 http://localhost:8000
```

## 发布

```bash
cd ~/github-blog
git add -A && git commit -m "update site"
git push
```

## 新增文章

1. 在 `~/writing/posts/` 写 markdown（命名 `YYYY-MM-DD-slug.md`）。
2. 转成 HTML，放进 `posts/YYYY-MM-DD-slug.html`（复制现有文章页作为模板）。
3. 在 `posts/index.html` 和首页「最新文章」区各加一张卡片。

## 新增作品（作品集）

在 `projects/index.html` 复制一段 `.project-card`，可带截图：

```html
<div class="project-card">
  <div class="thumb"><img src="../assets/screenshots/xxx.png" alt="项目截图"></div>
  <div class="head">
    <h3>项目名</h3>
    <span class="status soon">公开 / 整理中 / 私有</span>
  </div>
  <p>一句话描述。</p>
  <div class="tags"><span class="tag">技术标签</span></div>
  <a class="btn" href="https://github.com/...">代码 / Demo</a>
</div>
```

截图放到 `assets/screenshots/`（或 `resources/`），用相对路径引用。

## 新增证书

1. 把扫描件放到 `certificates/images/`，命名 `YYYY-MM-DD-名称.png`。
2. 在 `certificates/index.html` 的 `.cert-grid` 里复制模板加一张卡片：

```html
<div class="cert-card">
  <div class="cert-img"><img src="images/2026-05-20-数学竞赛省一等奖.png" alt="证书名"></div>
  <div class="cert-info">
    <h3>全国大学生数学竞赛省级一等奖</h3>
    <div class="cert-meta">中国数学会 · 本科期间</div>
  </div>
</div>
```

## 新增资源

- 小文件（< 50MB）：放进 `resources/` 对应分类目录，在 `resources/index.html` 对应分组里加一行 `.resource-item`。
- 大文件（> 50MB，视频/长音频）：上传到 GitHub Releases，在资源页放外链（不进 git）。

```html
<div class="resource-item">
  <span class="name">标题</span>
  <span class="meta">大小</span>
  <a class="dl" href="resources/ppt/xxx.pptx">下载</a>
</div>
```

## 体积红线

- GitHub 单文件硬上限 100MB（50MB 起警告），仓库总量建议 < 1GB。
- 视频一律走 GitHub Releases，不放 git；证书扫描件建议压缩到 1–2MB 以内。
