# 小哲摄影师网站维护说明

这个初版网站是纯静态结构，没有安装依赖，也不需要构建工具。

## 当前项目状态记录

- 2026-06-03：用户确认照片已上传完毕，Google 评价系统已接入成功。该状态节点发生在新的 `UI Skill` 接入之前。
- 2026-06-09：已建立 `public/` 作为正式发布目录。之后会上线的内容默认修改 `public/`，根目录同名 HTML/CSS/JS 不再作为发布源。
- 2026-06-15：`public/zh/services.html` 暂时隐藏，不从页头、页脚或首页 CTA 公开进入，并已加 `noindex`。原因是当前作品集还不足以支撑单独的婚礼 / 私奔落地页；内容保留，等作品和服务表达更完整后再决定是否重新公开。
- 2026-06-18：中文版已通过 GitHub Pages 上线到正式域名 `https://www.fionatangstudio.com/zh/`，HTTPS 证书已签发并启用。DNS 托管在 Squarespace，`www` 通过 CNAME 指向 `arno23333.github.io`，根域名通过 4 条 GitHub Pages A 记录指向 GitHub。
- 2026-06-18：根目录旧页面、旧样式脚本、设计预览稿、临时输出目录和根目录 `assets/` 已清理；正式素材统一保留在 `public/assets/`。
- 2026-06-18：地点指南草稿已迁入 `public/zh/venue-guides-draft.html`，继续保留 `noindex, nofollow`，不进入公开导航。
- 2026-06-18：已新增英文、法语、德语目录：`public/en/`、`public/fr/`、`public/de/`。主域名默认入口已切到英文 `/en/`，中文保留在 `/zh/`。

## 当前线上地址与部署方式

- 正式英文入口：`https://www.fionatangstudio.com/en/`
- 正式中文入口：`https://www.fionatangstudio.com/zh/`
- 正式法语入口：`https://www.fionatangstudio.com/fr/`
- 正式德语入口：`https://www.fionatangstudio.com/de/`
- 主域名入口：`https://www.fionatangstudio.com/`，当前进入英文版本 `/en/`
- GitHub Pages 默认地址：`https://arno23333.github.io/`，只作为托管默认地址和排障入口，不作为对外主链接
- GitHub 仓库：`arno23333/arno23333.github.io`
- GitHub 分支：`master`
- 发布方式：GitHub Actions 部署 `public/`
- 自定义域名文件：`public/CNAME`，内容应为 `www.fionatangstudio.com`

以后更新正式网站不是本地保存后自动上线。正确链路是：修改 `public/` 下的正式文件，检查页面，提交到 Git，再推送 `master`，GitHub Actions 成功后线上站点才会更新。

协作口令约定：用户说“推送”时，默认不是只执行 `git push`，而是先检查本次相关文件，再暂存本次相关改动，创建一次 Git commit 作为本地存档，然后推送到 GitHub，最后等待 GitHub Actions 自动部署并检查结果。这里的“存档”对应 `git commit`；`git push` 只是把已经创建的 commit 同步到 GitHub。

## 正式发布目录

当前通过 GitHub Pages + GitHub Actions 发布：

```text
public/
```

当前结构：

```text
public/
├─ index.html        主域名入口，当前跳转到 /en/
├─ _redirects        Netlify 兼容跳转规则；GitHub Pages 当前主要依赖 index.html 入口
├─ zh/               中文正式页面
├─ en/               英文正式页面，当前默认入口
├─ fr/               法语正式页面
├─ de/               德语正式页面
├─ assets/           四语言共享正式素材
├─ styles.css        全站共享样式
└─ script.js         全站共享交互
```

以后修改正式网站时：

- 中文页面：改 `public/zh/*.html`
- 全站样式：改 `public/styles.css`
- 全站交互：改 `public/script.js`
- 正式图片：放入或替换 `public/assets/`。中文、英文、法语、德语页面共用这一套素材，不按语言复制图片目录。
- 主域名默认入口：改 `public/index.html` 和 `public/_redirects`；当前默认进入 `/en/`

根目录同名旧页面、旧样式、旧脚本和根目录 `assets/` 已清理。以后若从历史记录恢复这些文件，也不要当成上线版本；正式网站只看 `public/`。

## 页面

- `public/zh/index.html`：中文首页
- `public/zh/services.html`：婚礼 / 私奔服务隐藏页；内容保留，当前不放入导航，并保留 `noindex`
- `public/zh/portfolio.html`：Portfolio 精选作品集合
- `public/zh/about.html`：About 基础版
- `public/zh/booking.html`：Booking / Pricing
- `public/zh/process.html`：拍摄流程
- `public/zh/faq.html`：FAQ
- `public/zh/contact.html`：Contact / Inquiry
- `public/zh/privacy.html`：隐私政策
- `public/zh/venue-guides-draft.html`：地点指南草稿页；当前保留 `noindex, nofollow`，不放入导航，不作为正式公开入口
- `LANGUAGE_STRUCTURE.md`：未来中文、英文、法语、德语四语言结构规划

## 样式和交互

- `public/styles.css`：全站共享样式
- `public/script.js`：手机菜单、Portfolio 筛选、Contact 表单提交状态
- 修改页面、样式或脚本后，至少用真实浏览器检查 320px、390px、1440px 三档宽度。
- 三档检查重点：手机导航展开是否遮挡、Contact 日期选择器是否超出底部、Booking accordion summary 是否挤压、Portfolio 筛选按钮是否可点击。

## Google 评价模块维护标准

当前 `public/zh/index.html` 和 `public/zh/contact.html` 的评价模块样式与结构，基本就是用户认可的目标方向。后续新增或调整 Google 评价时，优先沿用现有实现，不重新设计成大卡片、轮播、评分墙或营销感很强的 testimonial 区块。

当前结构标准：

- 外层使用 `reviews-showcase`；Contact 页可加 `contact-reviews`。
- 每条评价使用 `review-feature`，左侧 52px 圆形头像，右侧是客户名、短标题、中文摘要和可选原文。
- 客户名使用 `review-name`，标题用简短一句话概括评价重点，不写夸张营销语。
- 中文 `review-copy` 应保留客户真实意思，但可以压缩成适合网页阅读的自然中文摘要。
- 有英文或外语原文时，用 `details.review-original` + `summary` 的“查看原文”折叠，不把长原文直接铺满页面。
- 头像统一放在 `public/assets/reviews/`，路径用 `/assets/reviews/...`，不要放进各语言目录复制多份。
- 首页和 Contact 页当前同步展示同一组评价；新增、删除或改写评价时，默认两页一起检查。

事实边界：

- 只使用真实 Google 评价、客户真实反馈或用户确认过的文字。
- 不编造评分、客户原话、客户头像、Google 星级或不存在的客户身份。
- 如果只能看到 Google 翻译文本，优先找原文；找不到原文时，必须标注这是基于可见文本整理，不当成客户英文原文。

## 后续最需要替换的内容

1. 首页和 Portfolio 的“待补真实作品”占位块。
2. 婚礼 / 私奔服务页如果重新公开，需要先补足真实样片、真实服务范围和更稳定的作品支撑。
3. About 页的小哲个人介绍、工作照、幕后照或视频。
4. Booking 页当前已公开主要起价；后续价格变动需同步页面、Contact、FAQ 和 Process。订金规则、交付周期、加时费和异地费用仍需按最终商业规则持续维护。
5. FAQ 中所有标注“待确认”的真实规则。
6. Contact 页已接入 Web3Forms；上线后仍需确认 Web3Forms 后台允许 `https://www.fionatangstudio.com` 作为正式域名，避免表单在正式站点提交失败。
7. 如果地点指南上线前还没定稿，先从所有页头导航里移除 `venue-guides-draft.html` 入口，并继续保留 `noindex`。
8. Google 评价或客户原话。没有真实评价前，不要编造。

## 多语言

当前已建立 `public/zh/`、`public/en/`、`public/fr/`、`public/de/` 四套独立页面，不使用同页按钮切换文字。默认入口为英文 `/en/`，详细见 `LANGUAGE_STRUCTURE.md`。
