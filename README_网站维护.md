# 小哲摄影师网站维护说明

这个初版网站是纯静态结构，没有安装依赖，也不需要构建工具。

## 当前项目状态记录

- 2026-06-03：用户确认照片已上传完毕，Google 评价系统已接入成功。该状态节点发生在新的 `UI Skill` 接入之前。

## 页面

- `index.html`：首页
- `services.html`：婚礼 / 私奔服务页
- `portfolio.html`：Portfolio 精选作品集合
- `about.html`：About 基础版
- `booking.html`：Booking / Pricing
- `process.html`：拍摄流程
- `faq.html`：FAQ
- `contact.html`：Contact / Inquiry
- `venue-guides-draft.html`：地点指南草稿页；当前临时放进页头导航方便预览，页面仍保留 `noindex`
- `LANGUAGE_STRUCTURE.md`：未来中文、英文、法语、德语四语言结构规划

## 样式和交互

- `styles.css`：全站样式
- `script.js`：手机菜单、Portfolio 筛选、Contact 表单提交状态

## 后续最需要替换的内容

1. 首页和 Portfolio 的“待补真实作品”占位块。
2. 婚礼 / 私奔服务页的真实样片和真实服务范围。
3. About 页的小哲个人介绍、工作照、幕后照或视频。
4. Booking 页的真实价格、币种、订金规则、交付周期和加时/异地费用。
5. FAQ 中所有标注“待确认”的真实规则。
6. Contact 页已接入 Web3Forms；上线前需要在 Web3Forms 后台把 `localhost` 改成或追加真实域名。
7. 如果地点指南上线前还没定稿，先从所有页头导航里移除 `venue-guides-draft.html` 入口，并继续保留 `noindex`。
8. Google 评价或客户原话。没有真实评价前，不要编造。

## 多语言

当前根目录页面先作为中文工作稿。正式做四语言时，建议按 `/zh/`、`/en/`、`/fr/`、`/de/` 四套独立页面组织，不建议用一个页面按钮切换所有文字。详细见 `LANGUAGE_STRUCTURE.md`。
