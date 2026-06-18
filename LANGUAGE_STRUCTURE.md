# 四语言网站结构规划

当前阶段先把中文主版本补完整，不急着复制四套页面。等中文内容稳定到 80% 左右，再做英文、法语、德语。

2026-06-09 更新：正式发布源已切到 `public/`。当前中文版正式页面在 `public/zh/`，共享资源在 `public/assets/`、`public/styles.css`、`public/script.js`。根目录同名 HTML/CSS/JS 不再作为上线源，并已在 2026-06-18 清理。

2026-06-18 更新：正式域名已上线为 `https://www.fionatangstudio.com/`，当前默认进入中文版本 `/zh/`。后续新增英文、法语、德语页面时，应使用同一正式域名下的 `/en/`、`/fr/`、`/de/`。

2026-06-18 更新：四语言页面共用 `public/assets/`，不要为 `/zh/`、`/en/`、`/fr/`、`/de/` 分别复制图片。页面中的图片路径优先使用 `/assets/...` 这种站点根路径。

## 推荐 URL 结构

正式多语言版本建议使用独立 URL，而不是同一个页面用按钮切换所有文字：

```text
public/zh/index.html        中文
public/en/index.html        English
public/fr/index.html        Français
public/de/index.html        Deutsch

public/zh/about.html
public/en/about.html
public/fr/about.html
public/de/about.html

public/zh/contact.html
public/en/contact.html
public/fr/contact.html
public/de/contact.html
```

当前 `public/zh/` 已经是中文版发布目录。后续做外语版时，从 `public/zh/` 复制结构到 `public/en/`、`public/fr/`、`public/de/`，再逐页翻译和本地化。不要从根目录旧稿或历史恢复文件复制新语言版本。

主域名入口由 `public/index.html` 和 `public/_redirects` 控制。当前默认跳转到 `/zh/`；英文版完成并确认要作为默认入口后，把这两个文件里的 `/zh/` 改为 `/en/`。

共享图片、头像、评价素材和地点指南素材都放在：

```text
public/assets/
```

各语言页面都直接引用 `/assets/...`，不要复制到各自语言目录。

## 为什么不是一个页面按钮切换全部文字

一个页面按钮切换文字，通常只是用 JavaScript 把页面里的文字替换掉。它适合很小的工具页，但不适合作为正式摄影师网站的长期结构。

问题是：

- 每种语言没有独立链接，客户无法直接分享某个语言版本。
- Google 更难判断每个语言页面，SEO 不清楚。
- 后期 FAQ、价格、Contact、About 每改一次，容易漏改隐藏在同一页里的其他语言。
- 不同语言文字长度差异很大，同一套页面切换后更容易挤压、错位。

主流做法是：每个语言都有自己的 URL，页面上放语言切换链接。例如在中文 About 页右上角：

```text
中文 | EN | FR | DE
```

点击 `EN` 后进入 `/en/about.html`，点击 `FR` 后进入 `/fr/about.html`。页面不是临时换字，而是进入该语言的正式页面。

## SEO 预留

正式域名已经上线。后续每个语言页面可以加入 `hreflang`。Google Search Central 建议用 `hreflang` 告诉搜索引擎这些页面是同一内容的本地化版本。

示例：

```html
<link rel="alternate" hreflang="zh" href="https://www.fionatangstudio.com/zh/about.html">
<link rel="alternate" hreflang="en" href="https://www.fionatangstudio.com/en/about.html">
<link rel="alternate" hreflang="fr" href="https://www.fionatangstudio.com/fr/about.html">
<link rel="alternate" hreflang="de" href="https://www.fionatangstudio.com/de/about.html">
<link rel="alternate" hreflang="x-default" href="https://www.fionatangstudio.com/en/about.html">
```

## 建议执行顺序

1. 先把中文内容补完整：服务、价格逻辑、FAQ、流程、Contact、About。
2. 之后正式修改都在 `public/` 内完成，并上传 / 发布 `public/`。
3. 确认品牌名、服务地区和主要客户类型。
4. 做英文版本，因为它最适合国际游客、外籍情侣和求婚客户。
5. 做法语版本，用于法国本地客户和 Riviera/Provence 搜索。
6. 做德语版本，用于德国、瑞士、奥地利游客和旅拍客户。
7. 最后再加语言切换器、`hreflang`、多语言 sitemap。
