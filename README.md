# 吕绪鑫 · 个人网站

面向求职与专业展示的纯静态个人网站，使用 HTML、CSS 和原生 JavaScript，托管于 GitHub Pages。

在线地址：<https://silaslv.github.io>

## 展示原则

- 以 Python 后端和企业 AI 应用为主线。
- 公开项目提供代码或可核验结果；商业项目仅展示脱敏后的职责与工程范围。
- 明确区分职业交付、个人工程实践、历史复盘和进行中的研究。
- 不在证据核验前填写具体数据、标的或结果。

## 结构

```text
.
├── index.html                 # 首页：定位、代表性实践与精选复盘
├── about.html                 # 关于：技能、时间线与联系方式
├── projects/
│   └── index.html             # 职业项目、公开项目与研究计划
├── posts/
│   ├── index.html             # 技术复盘与工程思考
│   └── YYYY-MM-DD-slug.html   # 文章正文
└── assets/
    ├── style.css              # 明暗主题与响应式样式
    ├── main.js                # 主题切换、进度条、目录与邮箱复制
    └── evidence/              # 去除 EXIF 后的公开证书与实验记录
```

`certificates/` 与 `resources/` 暂时保留为未公开页面，已从导航隐藏并设置 `noindex`。

## 本地预览

```bash
python3 -m http.server 8000
```

打开 <http://localhost:8000>。

## 发布

站点由 `main` 分支通过 GitHub Pages 发布。提交前应检查：

1. 首页、项目、文章和关于页的桌面及移动端布局。
2. 站内链接与公开仓库链接。
3. 项目状态、测试数量、技术边界与简历口径是否一致。
4. 是否包含客户信息、内部代码、访问凭据或未经核验的数据。
