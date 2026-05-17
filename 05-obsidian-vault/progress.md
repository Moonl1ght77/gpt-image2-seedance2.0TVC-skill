# 项目进度快照 — 乐顺科纺面料展示小程序

> 更新时间：2026-05-14 19:58  
> 状态：前端 ✅ 完成 99%，后端云函数 ✅ 完成，数据库权限 ✅ 完成，云存储 20/20 ✅，等商家信息 + 模板ID填入即可提审

---

## ✅ 已完成的 90%

### 🆕 2026-05-14 今日完成

| 模块 | 内容 |
|------|------|
| **搜索页** | 新建 `pages/search/` 四文件，含最近搜索/热门搜索/最近浏览/搜索结果，scroll-view 高度用 JS 计算修复空白 bug |
| **搜索页修复** | 删除搜索框内🔍图标；修复 scroll-view 在微信小程序 flex 布局中不显示内容的问题（min-height→height，height:0 改 overflow:hidden，JS 计算 scrollHeight）|
| **云图片诊断页** | 新建 `pages/cloudcheck/`，批量验证 20 个云存储路径，结果 20/20 全通过 |
| **云函数 notifyInquiry** | 新建云函数，客户提交询价后自动推送订阅消息给商家微信 |
| **云函数 saveMerchantOpenid** | 新建云函数，保存商家 openid 用于接收通知 |
| **数据库集合+权限** | inquiries（仅创建者可读写）+ merchant_config（所有用户不可读写）均已创建并设权限 |
| **分类页搜索** | 原内联搜索改为跳转独立搜索页，删除旧 showSearch/searchKey 逻辑 |
| **首页/分类页搜索按钮** | 均改为 `navigateTo` 跳搜索页 |
| **detail.js 最近浏览** | onLoad 时自动保存当前面料到 localStorage recentViewed |

### 🆕 2026-05-12 今日完成

| 模块 | 内容 |
|------|------|
| **首页 Hero 视频** | 图片4场景轮播 → 全屏自动播放视频（autoplay/loop/muted），删除所有文字标题层，高度改为 `90vh` 露出下方内容 |
| **视频暗角效果** | 四周 `radial-gradient` 暗角遮罩，增强电影质感 |
| **视频结尾 Logo 动画** | `bindtimeupdate` 检测最后5秒，展示导航栏 logo 图片（`/assets/logo-divider.png`）淡入上浮，视频循环后自动淡出 |
| **Logo 图片压缩** | `logo-divider.png` 从 481KB 压缩至 18KB；删除废弃图 `gongchang.jpg`（262KB） |
| **面料详情页重构** | 删除顶部沉浸式轮播图；品名/描述/标签信息卡置顶（nav高度占位）；默认视角改为**色卡视角**；视角切换顺序调整（色卡在左） |
| **产品视角 UI 去 emoji** | 面料亮点改为编号列表（01/02…）；适用场景改为胶囊文字标签；洗护指南改为左侧金色细竖线条目 |
| **tabBar 导航修复** | 修复首页搜索图标用 `navigateTo` 打开 tab 页导致 tabBar 消失的 bug，改为 `switchTab` |
| **IntersectionObserver 清理** | 移除不存在节点（`.stats-bar` / `.philosophy-section`）的观察器，消除 console 报错 |}

### 🆕 2026-05-10 今日新增

| 模块 | 内容 |
|------|------|
| **自定义导航栏组件** | 新建 `components/nav-bar/`，左搜索图标、中 LESHUN logo、右胶囊占位，全局复用 |
| **首页导航栏滚动透明** | Hero 区透明，下滑 30% 屏高后变暖米色毛玻璃实色 |
| **详情页导航栏滚动透明** | 沉浸式轮播上方透明，滑过图片后变实色 |
| **全页面接入** | 6个页面均改为 `navigationStyle:custom`，注册并使用 nav-bar 组件 |
| **面料系列卡片** | `series-banner.png`（2.8MB）移出本地包，上传云存储，代码改 `cloud://` 路径 |
| **包体积优化** | 移除 `divider-fabric.png`（3.2MB 未使用），assets 包从 6.6MB→0.87MB ✅ |
| **触摸手势修复** | Hero 和 craft 区加 Y 轴方向锁定，防止竖滑误触切换/拖拽 |
| **横向溢出修复** | `page` 根加 `overflow-x:hidden`；修复 flex+overflow 裁切 fixed 导航栏 bug |
| **面料页优化** | 删除旧 top-bar；背景改为暖米色渐变，与首页统一 |

### 一、页面层（6 页全部搭好）

| 页面 | 路由 | 核心功能 |
|------|------|---------|
| 首页 | `/pages/index/index` | Hero 4场景自动轮播+触摸滑动；品牌语录逐字入场；面料工艺横滑卡片；精选面料大卡片；数据展示条；品牌理念；底部 CTA |
| 面料分类 | `/pages/category/category` | 横滑胶囊标签筛选（全部/棉类/莫代尔/混纺）；双列瀑布流；搜索框 UI |
| 色卡库 | `/pages/swatch/swatch` | 5款面料横滑 Tab 切换；3列色号网格（共 50 个色号）；点击色号跳详情页色卡视角 |
| 面料详情 | `/pages/detail/detail` | 沉浸式轮播图；浮动毛玻璃信息卡；产品视角 / 色卡视角双模切换；亮点/参数/场景/故事/洗护多 Tab；底部询价操作栏 |
| 关于我们 | `/pages/about/about` | 品牌故事；核心数据卡；四步合作流程 |
| 联系我们 | `/pages/contact/contact` | 电话/微信一键联系；前端询价表单（含基础校验） |

### 二、自定义 tabBar

- 5 个 Tab：首页 / 面料 / 色卡 / 关于 / 联系
- 毛玻璃效果（`backdrop-filter: saturate(180%) blur(40rpx)`）
- 每个 Tab 页 `onShow` 中同步 `selected` 状态
- 激活项有上方指示器小点

### 三、全局样式系统（`app.wxss`）

- CSS 变量：颜色、圆角、阴影、字体全套定义
- 工具类：`.glass` / `.glass-dark`（毛玻璃）、`.card`、`.container`、`.divider`
- 动画：`fadeInUp`、`scaleIn`、`pageFadeIn`、`.tap-effect`（点击反馈）
- 字体：正文用 PingFang，标题用楷体/宋体，英文品牌用 Arial Black

### 四、交互系统

- IntersectionObserver 滚动入场动画（各 section 进入视口时触发）
- Hero 自动轮播（5秒间隔）+ 触摸左右滑动切换 + 底部圆点导航
- 面料工艺卡片手动拖拽横滑（含自定义进度条）
- 精选面料双向交叉淡入/淡出动画
- 页面切换淡入过渡（`onShow` 重置动画）

### 五、数据层（当前：前端内嵌）

5 款面料完整数据，散落于各页面 JS 中：

| 款号 | 品名 | 成分 | 色号数 | 有渲染图 |
|------|------|------|--------|---------|
| 3092 | 云皱棉 | 95%棉 5%氨纶 | 9 | ❌（用 hex 色块） |
| 3100 | 菱朵棉 | 95%棉 5%氨纶 | 7 | ❌ |
| 6049 | 蝴蝶园林 | 46%棉 46%莫代尔 8%氨纶 | 5 | ❌ |
| 6467 | 幸运叶语 | 31.9%棉 31.3%再生纤维 29.8%锦纶 7%氨纶 | 9 | ✅（已有文件名） |
| 8416 | 兰精莫代尔2×2罗纹 | 91%兰精莫代尔 9%氨纶 | 20 | ✅（已有文件名） |

### 六、云开发基础接入

- `app.js` 已初始化云环境（`env: cloud1-d3gfhziqx2f5af184`）
- Hero 图片已引用云存储 `cloud://` 路径
- 面料卡片图引用云存储路径（待确认已上传）
- Hero 视频加载逻辑已写好（`loadCloudVideo`），注释中待启用

---

## ⏳ 待完成的 20%

### 🔴 必做（影响正常使用）

**1. 数据统一化（最重要！）**

> 当前问题：面料数据在 `index.js` / `category.js` / `detail.js` / `swatch.js` 各存一份，改一处要改四处，极易出错。

解法选一：
- 方案A（简单）：新建 `data/fabrics.js`，所有页面 `require` 同一份
- 方案B（正式）：存入云数据库 `fabrics` 集合，页面按需查询

**2. ✅ 询价表单写入云数据库**（2026-05-13 完成）

> `contact.js` 的 `submitInquiry` 已接入 `wx.cloud.database().collection('inquiries').add()`。
> 详情页"立即询价"自动预填面料名跳转联系页，提交后数据存入 `inquiries` 集合。

**3. ✅ UI 体验优化专项**（2026-05-13 完成）

| 子项 | 说明 |
|------|------|
| 详情页底栏合并 | 删除"联系客服"按钮，仅保留全宽"立即询价"金色按钮 |
| 首页底部改版 | 删除"开启合作"CTA卡片，替换为"电子营业执照 + 公司名 + logo"底栏 |
| 电子营业执照页 | 新建 `pages/license/license`，米白主题+自定义返回导航栏+云存储图片展示 |
| 营业执照图片裁切 | CSS负margin裁掉图片上下深色边缘，无需重新上传 |
| Splash 启动动画 | 新建 `pages/splash/splash`，logo渐入渐出后 `switchTab` 跳首页 |
| 全局跳转遮罩 | 新建 `components/loading-mask`，全局注册，6个页面onShow触发logo浅→深动画 |
| 修复重复动画bug | 首页首次onShow跳过遮罩，避免与splash动画叠加 |

**3. 分类页搜索逻辑**

> 搜索框 UI 和 `searchKey` 字段已有，但 `loadFabrics` 函数没有按关键词过滤。

只需加一行 `.filter(f => f.name.includes(searchKey) || f.spec.includes(searchKey))`。

**4. 云存储图片验证**

- Hero scene 2 用的是本地路径 `/assets/hero/gongchang.jpg`，需确认文件是否存在
- 其他 Hero 和面料卡片均为 `cloud://` 路径，需登录云控制台验证已上传

### 🟡 提升体验（选做）

**5. 色卡 AI 渲染图批量上传**

> `6467` 和 `8416` 的色卡图文件名已在代码中写好（如 `8416_01_本白_00003_.png`），上传到云存储 `/fabrics/swatches/` 即生效。

**6. ✅ 实拍图/AI生成图已替换**（已完成）

> Hero 轮播图已换为 AI 生成图，色卡图已用 ComfyUI 批量生成并上传云存储。

**7. Hero 视频接入**

> `loadCloudVideo` 函数已写好，视频文件已传云存储，去掉 `// TODO` 注释行的注释即可。

**8. 联系页面地址信息**

> `address: '广东省广州市（待更新具体地址）'`，需填真实地址。

**9. 色卡收藏 / 对比功能**

> 当前无此功能，属于加分项，可在 swatch 页加"收藏"icon，本地缓存到 `wx.setStorageSync`。

**10. 上线前收尾**

- 包体积检查（2MB 限制，大图不能放本地）
- 各机型适配测试（尤其 iOS 安全区、Android 刘海屏）
- 填写小程序类目、上传 logo、撰写审核说明
- 提交微信审核

---

## 快速导航

```
03-code/client-jiajufu/
├── app.js            ← 云开发初始化 + globalData
├── app.json          ← 路由注册 + tabBar 配置
├── app.wxss          ← 全局样式系统
├── custom-tab-bar/   ← 自定义底部导航
└── pages/
    ├── index/        ← 首页（最复杂）
    ├── category/     ← 面料分类
    ├── swatch/       ← 色卡库
    ├── detail/       ← 面料详情（含完整面料数据字典）
    ├── about/        ← 关于我们
    └── contact/      ← 联系我们 + 询价表单
```
