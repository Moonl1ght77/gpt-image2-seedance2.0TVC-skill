# 微信小程序项目初始化与核心目录结构 SOP

> 适用场景：接新私单时，按此结构从零搭框架，可节省 80% 的重复劳动。  
> 参考项目：乐顺科纺面料展示小程序（2024–2026）

---

## 一、总工作区结构

接单时在本地建一个总文件夹（用中文客户名或项目名），内部按以下结构划分：

```
[项目总文件夹]/
├── 01-skills/          ← Windsurf workflows、AI 技能配置、提示词模板
├── 02-assets/          ← AI 生成图、实拍素材、Logo、UI 截图
├── 03-code/            ← 小程序前端代码（主战场）
├── 04-backend/         ← 云函数、数据库脚本（如用云开发则在微信 IDE 内）
├── 05-obsidian-vault/  ← 知识库：项目笔记、开发日志、踩坑记录
└── 06-misc/            ← 杂项：ComfyUI workflow、临时文件等
```

**规范：**
- 代码只放 `03-code/`，不要把图片/视频塞进代码目录（2MB 包限制）
- 大素材统一放 `02-assets/`，上传至云存储后引用 `cloud://` 路径
- 每个项目在 `05-obsidian-vault/` 里维护一份 `progress.md` 做进度追踪

---

## 二、小程序前端目录结构（`03-code/client-[项目名]/`）

```
client-[项目名]/
├── app.js                  ← 全局逻辑（云开发初始化、globalData）
├── app.json                ← 全局配置（路由、tabBar、窗口样式）
├── app.wxss                ← 全局样式（CSS 变量、工具类、动画）
├── sitemap.json            ← SEO 配置（默认允许全部）
├── project.config.json     ← 项目配置（appid、编译设置）
├── project.private.config.json  ← 本地私有配置（不提交 git）
│
├── assets/                 ← 本地静态资源（仅放小图标，≤ 50KB/个）
│   └── icons/              ← tabBar 图标（激活/未激活各一套，PNG）
│       ├── home.png
│       ├── home-active.png
│       └── ...
│
├── custom-tab-bar/         ← 自定义底部导航（如需毛玻璃/动效则必用）
│   ├── index.js
│   ├── index.json
│   ├── index.wxml
│   └── index.wxss
│
└── pages/                  ← 页面目录（每页一个子文件夹，4文件标准结构）
    ├── index/              ← 首页
    │   ├── index.js
    │   ├── index.json
    │   ├── index.wxml
    │   └── index.wxss
    ├── category/           ← 列表/分类页
    ├── detail/             ← 详情页
    ├── swatch/             ← 色卡/展示库（可替换为其他业务页）
    ├── about/              ← 关于我们
    └── contact/            ← 联系我们 + 询价表单
```

---

## 三、必写的初始化代码模板

### `app.js` 标准结构

```javascript
App({
  onLaunch() {
    // 初始化云开发（有云函数时必须）
    if (wx.cloud) {
      wx.cloud.init({ env: '[你的云环境ID]' })
    }
    // 获取系统尺寸（用于自适应布局）
    const sysInfo = wx.getWindowInfo()
    this.globalData.statusBarHeight = sysInfo.statusBarHeight
    this.globalData.windowWidth = sysInfo.windowWidth
    this.globalData.windowHeight = sysInfo.windowHeight
  },

  globalData: {
    brandName: '[品牌名]',
    contactPhone: '[电话]',
    contactWechat: '[微信号]',
    statusBarHeight: 0,
    windowWidth: 375,
    windowHeight: 667
  }
})
```

### `app.json` 关键配置

```json
{
  "pages": ["pages/index/index", "pages/category/category", ...],
  "window": {
    "navigationBarBackgroundColor": "#F7F7F4",
    "navigationBarTitleText": "[品牌名]",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#F7F7F4"
  },
  "tabBar": {
    "custom": true,
    "list": [
      { "pagePath": "pages/index/index", "text": "首页",
        "iconPath": "assets/icons/home.png",
        "selectedIconPath": "assets/icons/home-active.png" }
    ]
  },
  "style": "v2"
}
```

---

## 四、全局样式系统（`app.wxss` 核心片段）

每个项目开始时，把这套 CSS 变量直接复制进去，只改颜色值：

```css
page {
  /* ── 颜色系统 ── */
  --color-bg: #F7F7F4;        /* 页面底色 */
  --color-text: #111111;       /* 主文字 */
  --color-text-light: #7A7A7A; /* 次要文字 */
  --color-border: #E1E1DE;     /* 分割线 */
  --color-card: #FFFFFF;       /* 卡片背景 */

  /* ── 圆角 ── */
  --radius-sm: 12rpx;
  --radius-md: 20rpx;
  --radius-lg: 32rpx;

  /* ── 阴影 ── */
  --shadow-card: 0 4rpx 20rpx rgba(0,0,0,0.06);
  --shadow-float: 0 8rpx 32rpx rgba(0,0,0,0.12);

  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: 28rpx;
  line-height: 1.6;
}

/* 毛玻璃（tabBar、浮动卡片） */
.glass {
  background: rgba(255,255,255,0.72);
  backdrop-filter: saturate(180%) blur(40rpx);
  -webkit-backdrop-filter: saturate(180%) blur(40rpx);
  border: 1rpx solid rgba(255,255,255,0.6);
}

/* 入场动画 */
.fade-in { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
.fade-in-delay-1 { animation-delay: 0.1s; }
.fade-in-delay-2 { animation-delay: 0.2s; }
.fade-in-delay-3 { animation-delay: 0.3s; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40rpx); }
  to   { opacity: 1; transform: translateY(0); }
}

/* 点击反馈 */
.tap-effect { transition: transform 0.15s ease; }
.tap-effect:active { transform: scale(0.97); }
```

---

## 五、自定义 tabBar（`custom-tab-bar/`）

**什么时候用自定义 tabBar？**
- 需要毛玻璃/渐变背景
- 需要 active 指示器动效
- 需要隐藏/动态修改 tabBar

**每个 Tab 页的 `onShow` 里必须加同步逻辑：**

```javascript
onShow() {
  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    this.getTabBar().setData({ selected: [当前Tab序号，从0开始] })
  }
}
```

**tabBar 图标规范：**
- 尺寸：81×81px（官方要求）
- 格式：PNG，背景透明
- 未选中：灰色（`#999999`）
- 选中：品牌主色

---

## 六、云开发接入清单

| 步骤 | 操作 | 注意 |
|------|------|------|
| 1 | 微信 IDE → 云开发控制台 → 开通环境 | 新环境需等 10–30 分钟才能用 |
| 2 | 记录 **环境 ID**（格式：`cloud1-xxxxxxxx`） | 填入 `app.js` 的 `wx.cloud.init` |
| 3 | 上传图片到云存储 | 路径格式 `cloud://[env-id]/[folder]/[file]` |
| 4 | 读取图片时用 `wx.cloud.getTempFileURL()` | 直接用 `cloud://` 路径在 `<image>` 中也可以 |
| 5 | 创建云函数（如询价提交） | 右键 `cloudfunctions/` 目录 → 新建云函数 |
| 6 | 关闭 VPN/代理 再上传/调用 | 云 API 在代理下经常超时 |

---

## 七、常见页面模式速查

### 模式A：列表页（category 模式）
- 顶部：毛玻璃导航栏 + 搜索按钮
- 中部：横滑胶囊标签（分类筛选）
- 主体：双列瀑布流（左右列高度均衡算法）

### 模式B：详情页（detail 模式）
- 顶部：沉浸式图片轮播（`navigationStyle: custom`）
- 浮动：毛玻璃信息卡（`position: fixed`，`z-index: 100`）
- 主体：多 Tab 内容切换（亮点/参数/故事）
- 底部：固定操作栏（`position: fixed; bottom: 0`，加安全区）

### 模式C：展示库（swatch 模式）
- 顶部：横滑 Tab（面料/品类切换）
- 主体：3列网格（`display: grid; grid-template-columns: repeat(3, 1fr)`）
- 点击：跳详情页并传参（`?id=xxx&colorIndex=0`）

### 模式D：表单页（contact 模式）
- 输入项：姓名/电话/需求备注（`<input>` + `bindinput` 事件）
- 校验：提交前检查必填项（`showToast` 提示）
- 提交：调云函数存库，成功后清空表单

---

## 八、踩坑速查（必读）

| 坑 | 解法 |
|----|------|
| 包体积 2MB 超限 | 视频/大图不能放项目目录，必须用云存储 |
| 云存储图片 403 | 用 `wx.cloud.getTempFileURL()` 或直接用 `cloud://` 路径 |
| 云 API timeout | 关 VPN；新环境等 30 分钟；确认 env ID 正确 |
| video 组件不支持 CSS 动画 | 用 `wx:if` 控制显隐，不要用 `opacity` |
| tabBar 自定义后 `selected` 不同步 | 每个 Tab 页 `onShow` 里手动 `setData({ selected: N })` |
| 底部内容被 tabBar 遮挡 | 页面底部加 `padding-bottom: calc(180rpx + env(safe-area-inset-bottom))` |
| 详情页底部操作栏遮内容 | 用 200rpx（操作栏更高） |
| iOS 安全区适配 | 所有固定底部元素用 `env(safe-area-inset-bottom)` |

---

## 九、新项目启动检查清单

```
[ ] 注册正式小程序账号（测试号不支持云开发）
[ ] 在 project.config.json 填入正式 AppID
[ ] 开通云开发环境，记录环境 ID
[ ] 复制本 SOP 的 app.js / app.json / app.wxss 模板
[ ] 准备 tabBar 图标（激活/未激活各一套，PNG 81×81px）
[ ] 建好 pages/ 下各页面文件夹（每页 4 个文件）
[ ] 每个 Tab 页 onShow 加 selected 同步
[ ] 云存储新建文件夹结构（fabrics/hero/swatches 等）
[ ] 本地图片路径配置域名白名单或关闭 urlCheck（开发阶段）
[ ] 在 05-obsidian-vault/ 新建 progress.md 开始记录进度
```
