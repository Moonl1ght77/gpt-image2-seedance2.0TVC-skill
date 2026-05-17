# 面料 AI 生图提示词体系 — GPT-Image-2 规范

> 基于 5 款面料实拍细节图分析，适配 ComfyUI + SynVow GPT-Image-2 节点
> 创建日期：2026-05-01

---

## 一、5 款面料材质分析

### 3092# 云皱棉
| 属性 | 分析 |
|------|------|
| **成分** | 95%棉，210G |
| **织法** | 多臂织（Dobby），经纬交替形成细密菱形凹凸 |
| **纹理特征** | 表面布满细小斜向皱褶纹，形成均匀的微型菱格凸起，约 2-3mm 间距重复 |
| **表面质感** | 哑光、自然棉感、轻微凹凸立体感 |
| **光影反应** | 侧光下凸起部分略亮，凹处有微阴影，形成细腻明暗层次 |
| **难度** | ⭐ 简单 — 均匀重复纹理，无图案元素 |
| **关键词锚点** | crinkle, crepe texture, dobby weave, diagonal micro-ridges, matte cotton |

### 3100# 菱朵棉
| 属性 | 分析 |
|------|------|
| **成分** | 棉基，约 200G |
| **织法** | 提花针织（Jacquard Knit），菱格网线 + 菱内小花朵图案 |
| **纹理特征** | 清晰的菱形格线（约 15-20mm 边长），格线由细密针迹构成；每个菱形内有一个对称小花/星状提花 |
| **表面质感** | 底面平滑针织手感，菱线和花朵微凸 |
| **光影反应** | 提花凸起处在侧光下投射微阴影，菱格线走向清晰可辨 |
| **难度** | ⭐⭐ 中等 — 规则重复菱格+花朵，图案有具体形状 |
| **关键词锚点** | diamond lattice jacquard, small floral motif inside each diamond, raised knit lines, jersey base |

### 6049# 蝴蝶园林
| 属性 | 分析 |
|------|------|
| **成分** | 棉莫混纺，190G |
| **织法** | 提花针织，底面为细斜纹针织，提花图案为独立散点蝴蝶 |
| **纹理特征** | 平滑底布上散布小型蝴蝶提花，每只蝴蝶约 8-10mm，间距 20-25mm，呈规则网格排列 |
| **表面质感** | 底面光滑、微丝光感（莫代尔成分），蝴蝶微凸 |
| **光影反应** | 蝴蝶图案处因凸起形成细微阴影，底面在光线下有柔和丝光 |
| **难度** | ⭐⭐⭐ 复杂 — 具象蝴蝶图案需精准还原，形态不能走样 |
| **关键词锚点** | scattered butterfly jacquard motifs, smooth jersey base, each butterfly ~8mm, regular grid spacing, subtle sheen |
| **GroundingDino prompt** | `butterfly pattern` |

### 6467# 幸运叶语
| 属性 | 分析 |
|------|------|
| **成分** | 棉莫混纺，约 200G |
| **织法** | 提花针织，底面有明显横向细罗纹，提花为散点叶子/三叶草 |
| **纹理特征** | 底面横向罗纹清晰（约 1mm 间距），叶子图案约 6-8mm，呈对角网格排列 |
| **表面质感** | 罗纹底面有触觉纹理，叶子微凸 |
| **光影反应** | 罗纹在光线下形成水平线性高光，叶子微凸投射细微阴影 |
| **难度** | ⭐⭐⭐ 复杂 — 双层纹理（罗纹底+叶子图案）需同时还原 |
| **关键词锚点** | leaf/clover jacquard motifs, horizontal rib knit base, dual-layer texture, diagonal grid layout |
| **GroundingDino prompt** | `leaf pattern` |

### 8416# 兰精莫代尔 2×2 罗纹
| 属性 | 分析 |
|------|------|
| **成分** | 91%兰精莫代尔，220G |
| **织法** | 2×2 罗纹针织（2 正 2 反交替） |
| **纹理特征** | 平行纵向沟槽，正针凸条和反针凹槽清晰交替，约 1.5-2mm 一组 |
| **表面质感** | 莫代尔纤维带丝光泽，手感丝滑，罗纹有弹性 |
| **光影反应** | 纵向凸条捕捉高光，凹槽产生阴影，形成强烈线性明暗交替 |
| **难度** | ⭐ 简单 — 纯粹均匀的纵向罗纹，无图案 |
| **关键词锚点** | 2x2 rib knit, parallel vertical channels, modal fiber sheen, alternating knit-purl ridges |

---

## 二、GPT-Image-2 提示词规范格式

### 提示词结构（7 段式）

```
[1. 材质身份] — 一句话说清楚这是什么面料
[2. 纹理细节] — 织法、纹理走向、尺寸、间距、凸凹关系（最关键）
[3. 构图布局] — 面料在画面中的摆放方式
[4. 光影设计] — 光源位置、强度、效果
[5. 摄影参数] — 镜头、景深、视角
[6. 色彩指令] — 精确色彩描述（批量换色时替换此段）
[7. 禁止项] — 不能出现的元素
```

### 各段说明

**[1] 材质身份**
> 告诉模型"这是什么东西"，锁定生成方向

示例：`A luxury cotton-modal blend fabric with jacquard butterfly motifs, 190GSM weight, soft and slightly lustrous.`

**[2] 纹理细节（最核心 — 不能出错的部分）**
> 精确描述织法和纹理，用数字标注尺寸和间距。这段决定生成的面料对不对。

规则：
- 必须描述**织法类型**（rib knit / dobby / jacquard / plain weave）
- 必须描述**纹理走向**（vertical / diagonal / horizontal / scattered）
- 必须描述**凸凹关系**（raised / recessed / embossed）
- 尽量包含**尺寸和间距**（~2mm ridges, ~15mm diamond cells）
- 如有图案，描述**图案形态、大小、排列方式**

示例：`The surface features fine 2×2 rib knit structure with parallel vertical channels, alternating raised knit columns (~1.5mm wide) and recessed purl grooves, creating a uniform linear texture across the entire fabric.`

**[3] 构图布局**
> 面料怎么摆、怎么拍——这是"高级感"的来源

3 种标准构图（任选）：

| 构图 | 描述 | 适用 |
|------|------|------|
| **A. 折叠层叠** | 面料自然折叠，形成 2-3 层重叠，折角处展示正反面 | 通用，最安全 |
| **B. 自然垂坠** | 面料从画面上方自然垂落，形成优雅曲线褶皱 | 莫代尔等柔软面料 |
| **C. 微距平铺** | 面料铺满画面，超近距离拍摄纹理，无折叠 | 突出纹理，色卡用 |

示例（A 折叠构图）：`The fabric is artfully folded with two graceful overlapping layers, the top layer folded back to reveal the fold edge at approximately 45 degrees, creating natural shadow pockets where layers meet. The composition follows a diagonal flow from upper-left to lower-right.`

**[4] 光影设计**
> 专业摄影级光影描述

标准光影方案：
```
Primary: Soft diffused window light from the upper-left at 45 degrees, 
creating gentle gradation across the fabric surface.
Fill: Subtle reflected bounce light from the lower-right to open shadows 
slightly, maintaining detail in fold recesses.
Accent: A faint warm highlight along the fold edges, emphasizing the 
three-dimensional quality of the textile.
The overall lighting ratio is approximately 2:1, ensuring the texture 
reads clearly without harsh contrast.
```

核心规则：
- 侧光 45° 是面料的最佳光位（凸显纹理凹凸）
- 光比 2:1 到 3:1（太平没质感，太强丢细节）
- 避免正面直射（会压平纹理）
- 避免硬光（会制造刺眼高光，不适合面料）

**[5] 摄影参数**
> 锁定"摄影风格"，避免模型偏向 3D 渲染或插画

标准参数：
```
Shot on a high-end mirrorless camera with a 90mm macro lens, 
f/5.6 aperture for optimal textile sharpness with gentle background 
falloff. ISO 100, studio-grade color accuracy. 
The image has the character of a professional textile catalog photograph — 
clean, precise, and true to life.
```

**[6] 色彩指令**
> 批量换色时唯一需要替换的段落

格式规范：
```
The fabric is rendered in [COLOR_NAME] — a [具体色彩描述]. 
The color is uniform and true-to-dye across the entire surface, 
with natural tonal variation only from the texture's light-and-shadow 
interaction, not from color inconsistency. 
Maintain exact color accuracy with no unwanted color cast or shift.
```

示例：
```
The fabric is rendered in dusty rose pink — a muted, warm pink with 
subtle gray undertones, similar to dried rose petals. 
The color is uniform and true-to-dye across the entire surface, 
with natural tonal variation only from the texture's light-and-shadow 
interaction, not from color inconsistency.
Maintain exact color accuracy with no unwanted color cast or shift.
```

**[7] 禁止项**
> 防止模型"自由发挥"导致翻车

标准禁止项：
```
CRITICAL CONSTRAINTS:
- Do NOT alter, invent, or simplify the fabric's weave structure
- Do NOT add any patterns, prints, or motifs not described above
- Do NOT introduce color gradients, tie-dye effects, or color bleeding
- Do NOT render this as a 3D model, illustration, or digital art — this must look like a real photograph
- Do NOT add any props, hands, backgrounds, or objects — only the fabric itself
- Do NOT change the scale or density of the texture pattern
- Maintain strict fidelity to the described textile structure
```

---

## 三、5 款面料完整提示词

### 3092# 云皱棉（简单 — 用工作流二）

```
A premium 95% cotton crinkle-textured fabric, 210GSM, known as "Cloud Crinkle Cotton." The surface features a dobby-woven micro-crinkle pattern: fine diagonal ridges forming tiny diamond-shaped raised cells approximately 2–3mm apart, repeating uniformly across the entire fabric. The texture creates a subtle three-dimensional surface with a natural, organic crinkle quality. The weave is tight and even, with no loose fibers or pilling.

The fabric is artfully folded with two graceful overlapping layers, the top layer folded back to reveal the fold edge at approximately 45 degrees, creating natural shadow pockets where layers meet. The composition follows a diagonal flow from upper-left to lower-right, filling the frame completely with no background visible.

Lighting: Soft diffused natural light from the upper-left at 45 degrees, creating gentle gradation across the crinkle texture — raised ridges catch subtle highlights while the tiny recesses hold delicate shadows. A faint warm fill light from the lower-right opens the shadow areas slightly. Overall lighting ratio 2:1, gentle and flattering.

Shot on a high-end mirrorless camera with a 90mm macro lens, f/5.6, ISO 100. Professional textile catalog photography — clean, precise, true to life. The matte cotton surface should appear authentically tactile.

The fabric is rendered in [COLOR_PLACEHOLDER]. The color is uniform and true-to-dye across the entire surface, with natural tonal variation only from the crinkle texture's light-and-shadow interaction.

CRITICAL: Do NOT alter the crinkle/dobby weave structure. Do NOT add patterns or prints. Do NOT render as 3D or illustration. Fabric only, no props or background. Maintain exact texture fidelity.
```

**难度评估**：⭐ 简单，一次出图成功率高

---

### 3100# 菱朵棉（中等 — 用工作流二）

```
A premium cotton jacquard knit fabric, approximately 200GSM, named "Diamond Flower Cotton." The surface features a distinct diamond lattice jacquard pattern: raised knit lines form a repeating rhombus/diamond grid with each diamond cell measuring approximately 15–20mm per side. Inside each diamond, there is a small symmetrical floral or star-shaped jacquard motif, approximately 5–6mm across. The base fabric is smooth jersey knit, while the diamond grid lines and inner floral motifs are slightly raised (embossed), creating a tactile relief pattern.

The fabric is artfully folded with two overlapping layers at different angles, the top layer turned back to show the fold's clean edge. Natural drape creates soft, organic curves at the fold line. The composition is diagonal, filling the entire frame. No background visible.

Lighting: Soft diffused window light from the upper-left at 45 degrees. The raised diamond lines and floral motifs catch gentle highlights along their tops, while their sides and the recessed base create subtle micro-shadows that define the jacquard pattern. Fill light from lower-right at ratio 2.5:1. The lighting must clearly reveal the embossed diamond grid structure.

Shot with a 90mm macro lens, f/5.6, ISO 100. Professional textile product photography. The image must read as an authentic photograph of real fabric, not a digital render.

The fabric is rendered in [COLOR_PLACEHOLDER]. The color is uniform and true-to-dye, with tonal variation coming only from the jacquard relief structure's interaction with light.

CRITICAL: The diamond grid lines must be clearly visible and geometrically regular. The small floral motifs inside each diamond must be consistent and symmetrical. Do NOT simplify or omit the jacquard pattern. Do NOT add extra patterns. Fabric only, no props.
```

**难度评估**：⭐⭐ 中等，菱格规律性强，偶尔花朵形态需要看运气

---

### 6049# 蝴蝶园林（复杂 — 用工作流一，SAM 分割）

```
A cotton-modal blend jacquard fabric, 190GSM, called "Butterfly Garden." The base fabric is smooth jersey knit with a very fine diagonal twill micro-texture and subtle modal sheen. Scattered across the surface are small jacquard butterfly motifs — each butterfly is approximately 8–10mm wide, with symmetrical wings, rendered as a raised/embossed knit pattern (same color as base, not printed). The butterflies are arranged in a regular grid pattern with approximately 20–25mm spacing between each motif. Each butterfly faces the same direction and has identical proportions.

The fabric is folded into two overlapping layers with the top layer pulled back at approximately 40 degrees. The fold creates a clean diagonal line across the composition. The butterflies should be clearly visible on both the flat and folded sections, maintaining their regular spacing and orientation even across the fold.

Lighting: Soft directional light from upper-left at 45 degrees. The raised butterfly motifs cast extremely subtle micro-shadows on one side, making them distinguishable from the smooth base. The modal content gives the base fabric a gentle silky sheen under the light. Fill light from lower-right, ratio 2:1. Lighting must be delicate enough to reveal the butterfly shapes without over-emphasizing them.

90mm macro lens, f/5.6, ISO 100. Professional textile catalog photography. Authentic photographic quality — the fabric must look real and touchable.

The fabric is rendered in [COLOR_PLACEHOLDER]. Color is perfectly uniform across base and butterfly motifs (they are tone-on-tone jacquard, not contrasting). Tonal variation only from texture relief.

CRITICAL: Each butterfly motif must have symmetrical wings and consistent shape. Do NOT distort, merge, or vary the butterfly shapes. Do NOT change their spacing or size. The butterflies are jacquard-woven (raised texture), NOT printed — they must be the same color as the base. Do NOT add any extra motifs or patterns. Fabric only.
```

**难度评估**：⭐⭐⭐ 复杂，蝴蝶形态精准度是关键，建议每色生成 5 张取最优

---

### 6467# 幸运叶语（复杂 — 用工作流一，SAM 分割）

```
A cotton-modal blend jacquard fabric, approximately 200GSM, named "Lucky Leaf." This fabric has a distinctive dual-layer texture: the base fabric features clearly visible horizontal rib knit texture (fine parallel horizontal lines, approximately 1mm apart), and overlaid on this ribbed base are scattered small leaf or clover jacquard motifs. Each leaf motif is approximately 6–8mm in size, slightly raised above the ribbed base surface. The leaves are arranged in a diagonal grid pattern with approximately 15–20mm spacing.

The fabric is folded with two layers overlapping at different angles, creating a natural V-shaped fold in the composition. The horizontal rib texture should be visible running consistently across both layers. Leaf motifs maintain their diagonal grid arrangement across the folds.

Lighting: Soft diffused light from the upper-left at 45 degrees. The horizontal rib texture creates fine linear highlights and shadows running parallel across the surface (this is crucial — it defines this fabric's unique character). The raised leaf motifs catch slightly more light on their tops. Fill from lower-right, ratio 2:1. The lighting must simultaneously reveal both the horizontal ribbing AND the leaf motifs.

90mm macro lens, f/5.6, ISO 100. Professional textile catalog photography, authentic and true to life.

The fabric is rendered in [COLOR_PLACEHOLDER]. Uniform dye color with tonal variation only from the dual-layer texture's light interaction.

CRITICAL: Two textures must coexist — horizontal ribbing on the base AND scattered leaf motifs on top. Do NOT omit either texture layer. Leaf shapes must be consistent and recognizable. The ribbing runs horizontally, NOT vertically. Do NOT simplify to a single-texture fabric. Fabric only, no props.
```

**难度评估**：⭐⭐⭐ 复杂，双层纹理同时还原是核心挑战

---

### 8416# 兰精莫代尔 2×2 罗纹（简单 — 用工作流二）

```
A premium 91% Lenzing Modal 2×2 rib knit fabric, 220GSM. The surface has a clean, uniform 2×2 rib knit structure: alternating raised knit columns and recessed purl channels running perfectly parallel in the vertical direction. Each raised column is approximately 1.5mm wide, each recessed channel approximately 1.5mm wide, creating a rhythmic linear pattern. The Lenzing Modal fiber gives the surface a distinctive soft silky sheen — smoother and more lustrous than cotton, but not as shiny as satin.

The fabric is folded with natural drape, showing gentle curves that emphasize the fabric's soft, fluid quality. Two layers overlap with the top layer folded back, revealing how the rib texture follows the contour of the folds. The vertical ribs should curve naturally along the fold lines, demonstrating the fabric's elasticity.

Lighting: Soft window light from the upper-left at 45 degrees. The raised rib columns catch linear highlights running vertically, while the recessed channels hold soft shadow lines — this alternating highlight-shadow pattern is the defining visual feature and must be clearly rendered. The modal sheen creates a subtle, elegant luminosity. Fill from lower-right, ratio 2.5:1.

90mm macro lens, f/5.6, ISO 100. Professional textile photography. The modal sheen and rib structure must read authentically — this fabric has a refined, premium quality.

The fabric is rendered in [COLOR_PLACEHOLDER]. Uniform true-to-dye color with natural tonal variation from the rib channels' highlight-shadow alternation.

CRITICAL: Rib lines must be perfectly parallel, vertical, and evenly spaced. Do NOT make them wavy, irregular, or vary their width. The 2×2 rib pattern must be consistent edge to edge. The modal sheen should be subtle and silky, NOT metallic or satin-like. Fabric only, no props.
```

**难度评估**：⭐ 简单，纯粹均匀纹理，成功率最高

---

## 四、色彩指令模板（换色时只替换这段）

```
The fabric is rendered in [COLOR_NAME] — [SPECIFIC_DESCRIPTION]. 
The color is uniform and true-to-dye across the entire surface, 
with natural tonal variation only from the texture's light-and-shadow 
interaction, not from color inconsistency. 
Maintain exact color accuracy with no unwanted color cast or shift.
```

### 常用色彩描述参考

| 色名 | 英文描述 |
|------|----------|
| 米白 | warm ivory white, like unbleached natural cotton |
| 浅驼 | light camel, a warm sandy beige |
| 浅灰 | soft dove gray, neutral without blue or warm cast |
| 抹茶绿 | muted matcha green, soft sage with yellow undertone |
| 雾蓝 | dusty powder blue, muted blue-gray like morning fog |
| 浅粉 | blush pink, a delicate muted pink with warm undertone |
| 鹅黄 | pale butter yellow, soft and warm like morning light |
| 豆沙 | dusty rose mauve, muted pink-brown like red bean paste |
| 深藏青 | deep navy, rich dark blue with slight warmth |
| 烟灰 | charcoal smoke gray, deep gray with subtle warm cast |

---

## 五、工作流分配规则

| 面料 | 工作流 | 每色生成数 | 原因 |
|------|--------|:---------:|------|
| 3092# 云皱棉 | 工作流二（简单） | 1-2 张 | 纹理简单均匀 |
| 3100# 菱朵棉 | 工作流二（简单） | 2-3 张 | 菱格规律，偶尔花朵需抽 |
| 6049# 蝴蝶园林 | 工作流一（SAM 控制） | 5 张 | 蝴蝶形态必须精准 |
| 6467# 幸运叶语 | 工作流一（SAM 控制） | 5 张 | 双层纹理同时还原 |
| 8416# 兰精莫代尔 | 工作流二（简单） | 1-2 张 | 纯罗纹，成功率最高 |

---

## 六、质量检查清单

每张生成图必须通过以下检查：

- [ ] **纹理对不对？** — 和实拍图对比，织法/纹路走向一致
- [ ] **图案对不对？** — 蝴蝶是蝴蝶，叶子是叶子，不能变形
- [ ] **尺寸比例对不对？** — 图案大小和间距和实拍图接近
- [ ] **颜色准不准？** — 没有色偏、色差、色彩不均
- [ ] **是照片感还是渲染感？** — 必须看起来像真实拍照
- [ ] **有没有多余元素？** — 不能有手指、桌面、标签等杂物
