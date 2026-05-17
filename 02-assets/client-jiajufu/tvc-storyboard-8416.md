# 8416# 兰精莫代尔2×2罗纹 — 首页TVC短片分镜脚本

> **目标**：制作一段 5-8 秒的商业级面料展示视频，用于首页 Hero 区域循环播放
> **参考视频**：720×1280（9:16竖屏），30fps，约4秒，展示多种颜色面料的纹理特写+文字标注
> **制作流程**：GPT-image2 生成静态面料图 → Grok 图生视频

---

## 一、分镜脚本总览

| 镜号 | 时长 | 画面内容 | 色号 | 运镜方式 | 文字叠加 |
|:---:|:---:|---------|:---:|---------|---------|
| 01 | 1.2s | 面料铺满画面，柔和垂坠褶皱，缓慢推进 | 01#本白 | slow zoom in | `8416# · 91%兰精莫代尔` |
| 02 | 1.2s | 同一构图，颜色切换为浅粉，面料微微飘动 | 02#浅粉 | gentle sway | `220G · 2x2罗纹` |
| 03 | 1.2s | 颜色切换为浅灰，罗纹纹理清晰可见 | 10#浅灰 | subtle breathing | `丝滑触感 · 弹力垂坠` |
| 04 | 1.2s | 颜色切换为驼色，面料自然折叠 | 06#驼色 | slow pan down | `兰精认证 · OEKO-TEX` |
| 05 | 1.2s | 颜色切换为藏青，最终定格 | 15#藏青 | slow zoom out | `乐顺科纺 · Leshun Textile` |

**总时长**：约 6 秒（可循环播放）

---

## 二、5 色选择理由

从 20 个色号中精选 5 色，覆盖浅→中→深的视觉梯度，兼顾商业美感：

| 色号 | 色名 | Hex | 选择理由 |
|:---:|------|:---:|---------|
| 01# | 本白 | #F5F0EC | 起始色，纯净高级，展示面料本色质感 |
| 02# | 浅粉 | #F5D8E0 | 温柔女性感，家居服核心色系 |
| 10# | 浅灰 | #C8C8C8 | 中性百搭，纹理在灰色上最清晰 |
| 06# | 驼色 | #C8A882 | 暖色调高级感，莫代尔丝光在暖色上最明显 |
| 15# | 藏青 | #2C3C50 | 深色收尾，对比强烈，品牌感最强 |

---

## 三、GPT-image2 提示词（图生图 — 铺满效果）

> **核心目标**：用 GPT-image2 将面料实拍细节图转换为铺满画面的高质量商业面料图
> **工作流**：ComfyUI `换色工作流.json`（SynVow GptImage2 节点）
> **模式**：图生图（img2img），参考图 = 面料实拍细节图
>
> ⚠️ **提示词长度控制在 300 字符以内**，太长会导致 API 调用失败或截断。工作流中 `CR Text Concatenate` 会自动拼接 WD14 标签，总长度不能超限。

### 3.1 通用提示词模板

```
(NO TEXT, NO HUMANS, NO PROPS), act as a professional digital textile photographer. Recolor the fabric to [COLOR_NAME] — [COLOR_DESC]. Preserve the exact 2x2 vertical rib knit texture with parallel raised columns (~1.5mm) and recessed purl channels. Soft silky modal sheen. Fabric fills entire frame with natural folds. Soft diffused light from upper-left 45°, 90mm macro, f/5.6, ISO 100. Ultra-photorealistic textile photo. Do NOT alter rib structure, add patterns, or render as 3D.
```

### 3.2 五色提示词（直接可用）

---

#### 色号 01：本白

```
(NO TEXT, NO HUMANS, NO PROPS), act as a professional digital textile photographer. Recolor the fabric to pure white — clean warm ivory with faintest cream hint. Preserve the exact 2x2 vertical rib knit texture with parallel raised columns (~1.5mm) and recessed purl channels. Soft silky modal sheen. Fabric fills entire frame with natural folds. Soft diffused light upper-left 45°, 90mm macro, f/5.6. Ultra-photorealistic textile photo. Do NOT alter rib structure or add patterns. Fabric only.
```

---

#### 色号 02：浅粉

```
(NO TEXT, NO HUMANS, NO PROPS), act as a professional digital textile photographer. Recolor the fabric to blush pink — muted warm pink with subtle gray undertones. Preserve the exact 2x2 vertical rib knit texture with parallel raised columns (~1.5mm) and recessed purl channels. Soft silky modal sheen. Fabric fills entire frame with natural folds. Soft diffused light upper-left 45°, 90mm macro, f/5.6. Ultra-photorealistic textile photo. Do NOT alter rib structure or add patterns. Fabric only.
```

---

#### 色号 10：浅灰

```
(NO TEXT, NO HUMANS, NO PROPS), act as a professional digital textile photographer. Recolor the fabric to soft dove gray — neutral medium-light gray, no blue or warm cast. Preserve the exact 2x2 vertical rib knit texture with parallel raised columns (~1.5mm) and recessed purl channels. Soft silky modal sheen. Fabric fills entire frame with natural folds. Soft diffused light upper-left 45°, 90mm macro, f/5.6. Ultra-photorealistic textile photo. Do NOT alter rib structure or add patterns. Fabric only.
```

---

#### 色号 06：驼色

```
(NO TEXT, NO HUMANS, NO PROPS), act as a professional digital textile photographer. Recolor the fabric to warm camel — sandy beige with golden undertones. Preserve the exact 2x2 vertical rib knit texture with parallel raised columns (~1.5mm) and recessed purl channels. Silky modal sheen on warm tone. Fabric fills entire frame with natural folds. Soft diffused light upper-left 45°, 90mm macro, f/5.6. Ultra-photorealistic textile photo. Do NOT alter rib structure or add patterns. Fabric only.
```

---

#### 色号 15：藏青

```
(NO TEXT, NO HUMANS, NO PROPS), act as a professional digital textile photographer. Recolor the fabric to deep navy — rich dark blue, commanding and premium. Preserve the exact 2x2 vertical rib knit texture with parallel raised columns (~1.5mm) and recessed purl channels. Silver-blue highlights on ribs. Fabric fills entire frame with natural folds. Soft diffused light upper-left 45°, 90mm macro, f/5.6. Ultra-photorealistic textile photo. Do NOT alter rib structure or add patterns. Fabric only.
```

---

## 四、Grok 图生视频提示词（静态图 → 动态视频）

> **目标**：将 GPT-image2 生成的静态面料图，通过 Grok 图生视频功能转为动态短视频
> **核心原则**：运动要克制、高级、商业化 — 面料纹理在运动中不能变形

### 4.1 通用视频提示词模板

```
A slow, cinematic close-up of premium Lenzing Modal 2x2 rib knit fabric. The fabric gently sways with a subtle, luxurious flowing motion — as if touched by a soft breeze or slowly being draped. The vertical rib texture remains perfectly intact throughout the movement, with the parallel lines curving naturally along the fabric's gentle folds. The modal fiber catches soft highlights that shift subtly across the ribbed surface as it moves, creating a mesmerizing play of light and shadow. Camera slowly pushes in with a smooth, steady motion. Commercial-grade quality, 9:16 vertical format, luxury textile brand aesthetic. The movement is graceful and minimal — never chaotic or violent. Think: high-end fashion editorial video, not product demo.
```

### 4.2 五色视频提示词

---

#### 镜号 01：本白 — Slow Zoom In

```
A slow, cinematic close-up of pure white Lenzing Modal 2x2 rib knit fabric filling the entire frame. The fabric is arranged in soft, natural folds with elegant curves. The camera slowly pushes in with a smooth, dreamlike motion, getting closer to reveal the exquisite detail of the vertical rib texture. The white fabric catches soft, luminous highlights along the raised rib columns while the recessed channels hold gentle pale shadows. The modal fiber has a subtle silky sheen that shifts beautifully as the camera moves. Minimal, graceful movement — the fabric barely breathes, almost still. 9:16 vertical format, luxury textile brand commercial, soft diffused lighting, 24fps cinematic feel.
```

---

#### 镜号 02：浅粉 — Gentle Sway

```
A slow, cinematic close-up of blush pink Lenzing Modal 2x2 rib knit fabric filling the entire frame. The fabric gently sways from left to right with a subtle, hypnotic motion — as if a soft breeze is passing across its surface. The vertical rib texture remains perfectly parallel throughout the movement, curving organically with the gentle wave. The soft pink color catches warm highlights that dance along the ribbed ridges as the fabric moves. The modal sheen creates a gentle, rosy luminosity. The motion is smooth, slow, and luxurious — never jerky or fast. 9:16 vertical format, luxury textile brand aesthetic, warm diffused lighting, commercial quality.
```

---

#### 镜号 03：浅灰 — Subtle Breathing

```
A slow, cinematic close-up of dove gray Lenzing Modal 2x2 rib knit fabric filling the entire frame. The fabric has a subtle "breathing" motion — gently expanding and contracting as if alive, with the folds rising and falling imperceptibly. The vertical rib texture creates a mesmerizing pattern of shifting light and shadow as the fabric breathes. The gray tone is neutral and modern, with the modal sheen creating silver highlights on the raised columns. The movement is extremely slow and meditative — almost imperceptible at first glance. 9:16 vertical format, minimalist luxury textile commercial, cool diffused lighting, ultra-premium feel.
```

---

#### 镜号 04：驼色 — Slow Pan Down

```
A slow, cinematic close-up of warm camel Lenzing Modal 2x2 rib knit fabric filling the entire frame. The camera slowly pans downward along the fabric's surface, following the vertical rib lines like a gentle waterfall of texture. The camel color radiates warmth and luxury, with golden highlights playing across the raised rib columns as the camera descends. The modal fiber sheen is especially beautiful on this warm tone, creating a honeyed glow. The fabric has subtle, gentle folds that the camera glides over smoothly. The motion is steady, luxurious, and hypnotic. 9:16 vertical format, high-end fashion brand commercial, warm golden diffused lighting.
```

---

#### 镜号 05：藏青 — Slow Zoom Out（结尾定格）

```
A slow, cinematic close-up of deep navy Lenzing Modal 2x2 rib knit fabric filling the entire frame. The camera slowly zooms out, gradually revealing more of the fabric's luxurious drape and flowing folds. As the camera pulls back, the vertical rib texture creates a dramatic interplay of silver-blue highlights on the raised columns against the deep navy shadows in the recessed channels. The modal sheen gives the dark fabric a refined, almost metallic elegance. The movement is slow, stately, and conclusive — this is the final shot that lingers. 9:16 vertical format, luxury brand commercial finale, cool dramatic diffused lighting, premium editorial quality.
```

---

## 五、ComfyUI 工作流配置

### 5.1 工作流一：GPT-image2 静态图生成

**使用现有工作流**：`换色工作流.json`（SynVow GptImage2 节点）

**操作步骤**：
1. 在 `LoadImage` 节点加载 **8416# 面料实拍细节图**（从 `02-assets/cloud-upload/swatches/` 获取）
2. 在 `CR Prompt Text` 节点填入上方对应的 **GPT-image2 提示词**
3. `SynVow GptImage2` 节点设置：
   - `direction`: 图生图
   - `mode`: 默认
   - `quality`: auto
   - `resolution`: 1K
   - `aspect_ratio`: **9:16**（竖屏，匹配TVC格式）
   - `count`: 1
4. 执行生成，每色生成 2-3 张，选择纹理最准确的一张

### ⚠️ 生成失败排查清单

如果 ComfyUI 工作流跑不出图，按以下顺序排查：

| # | 检查项 | 说明 |
|---|--------|------|
| 1 | **参考图是否加载？** | `LoadImage` 节点文件名是 `面料细节图.jpg`，必须存在于 ComfyUI 的 `input/` 目录。**如果图不存在，节点会"运行"但 API 拿不到图，积分照扣但不出图** |
| 2 | **提示词是否填对位置？** | 提示词填在 `CR Prompt Text` 节点，**不是** `SynVowGptImage2` 的 `prompt` 输入框（那个留空） |
| 3 | **检查 SynVow 的 `response` 输出** | SynVow 节点有个 `response` 输出口，会显示 API 原始返回。如果报错（如 `invalid_prompt`、`content_policy`），那里能看到 |
| 4 | **特殊字符问题** | 提示词里的 `×`（Unicode 乘号）已全部替换为普通 `x`，避免 API 编码错误 |
| 5 | **aspect_ratio 设置** | 默认是 `1:1`，TVC 需要改成 `9:16` |
| 6 | **SynVow 节点连接** | 确认 `prompts_list` 连接到 `CR Text Concatenate` 的输出，`prompt` 字段保持空字符串 `""` |
| 7 | **ComfyUI 日志** | 打开终端看报错信息，常见：`API rate limit`、`invalid prompt`、`model not available` |
| 8 | **换色 vs 生成** | `换色工作流.json` 是"换色"模式（`direction: 图生图`），需要参考图。如果要"纯文生图"需要改 `direction` 为 `文生图` |

### 🔑 最简可行方案

如果复杂工作流一直跑不通，用这个最简流程：

1. 打开 `换色工作流.json`
2. `LoadImage` → 加载面料实拍图
3. `CR Prompt Text` → 填入精简提示词（如本白的）
4. `SynVowGptImage2` → `aspect_ratio` 改为 `9:16`
5. 执行

### 5.2 工作流二：Grok 图生视频

**操作步骤**：
1. 将 GPT-image2 生成的 5 张静态面料图保存到 `02-assets/client-jiajufu/hero/tvc-stills/`
2. 在 Grok 中使用 **图生视频** 功能
3. 上传静态图 + 填入对应的 **Grok 视频提示词**
4. 设置：
   - 时长：4-5 秒
   - 分辨率：720×1280（9:16）
   - 风格：Cinematic / Commercial
5. 每色生成 2-3 条，选择运动最自然、纹理最稳定的一条

### 5.3 后期合成

1. 将 5 段视频导入剪映 / Premiere
2. 按分镜顺序排列：本白 → 浅粉 → 浅灰 → 驼色 → 藏青
3. 添加转场：交叉溶解（0.3-0.5s）
4. 添加文字叠加层（品牌名、参数信息）
5. 添加背景音乐（轻柔钢琴或环境音）
6. 导出：720×1280，30fps，H.264

---

## 六、质量检查清单

每张/每段生成后必须通过：

- [ ] **罗纹纹理对不对？** — 2×2 纵向平行沟槽，间距 1.5mm，不能弯曲或不规则
- [ ] **莫代尔光泽对不对？** — 丝滑柔和光泽，不是金属感或缎面感
- [ ] **颜色准不准？** — 与色卡 hex 值对比，无色偏
- [ ] **是照片感还是渲染感？** — 必须看起来像真实拍照
- [ ] **视频运动中纹理是否稳定？** — 罗纹在运动中不能变形、扭曲
- [ ] **有没有多余元素？** — 无手指、桌面、标签等杂物
- [ ] **画面是否铺满？** — 无背景、无边框，面料充满整个画面
- [ ] **商业质感？** — 对标高端面料品牌的广告标准

---

## 七、文件输出路径

```
02-assets/client-jiajufu/hero/
├── tvc-stills/                    # GPT-image2 生成的5色静态图
│   ├── 8416_01_本白_still.png
│   ├── 8416_02_浅粉_still.png
│   ├── 8416_10_浅灰_still.png
│   ├── 8416_06_驼色_still.png
│   └── 8416_15_藏青_still.png
├── tvc-clips/                     # Grok 生成的5段视频
│   ├── 8416_01_本白_clip.mp4
│   ├── 8416_02_浅粉_clip.mp4
│   ├── 8416_10_浅灰_clip.mp4
│   ├── 8416_06_驼色_clip.mp4
│   └── 8416_15_藏青_clip.mp4
└── hero-tvc-8416.mp4              # 最终合成的TVC短片
```
