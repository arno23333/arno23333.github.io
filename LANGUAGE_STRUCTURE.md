# 四语言网站结构规划

当前阶段先把中文主版本补完整，不急着复制四套页面。等中文内容稳定到 80% 左右，再做英文、法语、德语。

## 推荐 URL 结构

正式多语言版本建议使用独立 URL，而不是同一个页面用按钮切换所有文字：

```text
/zh/index.html        中文
/en/index.html        English
/fr/index.html        Français
/de/index.html        Deutsch

/zh/about.html
/en/about.html
/fr/about.html
/de/about.html

/zh/contact.html
/en/contact.html
/fr/contact.html
/de/contact.html
```

当前根目录里的页面可以继续作为中文工作稿。等内容稳定后，再整体搬到 `/zh/`，并复制出 `/en/`、`/fr/`、`/de/`。

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

以后上线正式域名后，每个语言页面可以加入 `hreflang`。Google Search Central 建议用 `hreflang` 告诉搜索引擎这些页面是同一内容的本地化版本。

示例：

```html
<link rel="alternate" hreflang="zh" href="https://example.com/zh/about.html">
<link rel="alternate" hreflang="en" href="https://example.com/en/about.html">
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about.html">
<link rel="alternate" hreflang="de" href="https://example.com/de/about.html">
<link rel="alternate" hreflang="x-default" href="https://example.com/en/about.html">
```

## 建议执行顺序

1. 先把中文内容补完整：服务、价格逻辑、FAQ、流程、Contact、About。
2. 确认品牌名、服务地区和主要客户类型。
3. 做英文版本，因为它最适合国际游客、外籍情侣和求婚客户。
4. 做法语版本，用于法国本地客户和 Riviera/Provence 搜索。
5. 做德语版本，用于德国、瑞士、奥地利游客和旅拍客户。
6. 最后再加语言切换器、`hreflang`、多语言 sitemap。
