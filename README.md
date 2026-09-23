# Bobby × VIGOR 教程 Landing Page

本目录是一份已公开的静态中文教程。线上入口：[learn.cj-chan.work](https://learn.cj-chan.work/)；源代码：[GitHub 公开仓库](https://github.com/CJchan09/cj-digital-human-product-video-course)。网站分为三页：`index.html` 是课程目录，`chapter-0.html` 独立讲人物参考图资产，`chapter-1.html` 直接从商品短片主视觉开始，按无牌旧案、VIGOR 生成片、V2 修订版展示三条完整影片，并保留照片对照和五步流程。无牌旧案与后两片属于不同 SKU。本地预览服务器只监听回环地址；GitHub Pages 与自定义子域名的发布验收见 `01_本地验收记录.md`。本目录未附开放素材再利用许可；公开仓库展示授权仅限当前课程页面。

## 本地预览

使用 Node.js 运行：

```powershell
node .\preview-server.mjs
```

然后在本机浏览器打开 `http://127.0.0.1:4173`。服务器只监听本机回环地址，限制可访问的页面、素材与提示词文件，并返回 `noindex` 标头。关闭启动服务器的终端即可停止。

直接双击 `index.html` 也能看静态内容；影片和部分浏览器功能在本地 HTTP 预览下兼容性更好。

## 已说明的范围

- 商品规格和四色是「2026-09-22 项目核对记录」，不代表当前价格、库存或在线状态。
- 原始 VIGOR 视频与规划提示词的逐项对应没有存证。
- V2 修订字幕、遮错和剪辑；没有重测或重建画面中垫子的几何尺寸。
- CJ 已选择公开 GitHub 仓库，并明确授权页面内展示本课程示例图；范围仅限教程页，不开放素材重用或一般商业使用，不改变 Alex/Bobby 的 draft 与 Canonical 状态。底层生成平台条款、品牌图其他使用范围仍未核。
- 第零章使用 Alex 归档旧图；文件名含 ultrarealistic_4K 的副本为 AI 细节重建。原图较大，为点击放大保留 PNG。
- 人物快照、母库来源和 SHA-256 见 `角色资产_manifest.md` 与 `ASSET_SOURCES.md`。
- 视频解码记录不等于完整人工试听。

## 文件

- `index.html`、`chapter-0.html`、`chapter-1.html`：课程目录与两章正文。
- `styles.css`、`script.js`：三页共用视觉样式与放大图片、复制提示词、影片互斥播放交互。
- `assets/`：教程页面所用媒体副本。源文件留在原项目位置。
- `ASSET_SOURCES.md`：素材来源与用途。
- `角色资产_manifest.md`：页面使用的人物参考图项目快照与授权边界。
- `00_制作计划.md`：经审阅的制作计划。
- `01_本地验收记录.md`：实际浏览器检查、技术验证与未验证事项。
