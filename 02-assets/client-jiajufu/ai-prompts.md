# AI 素材生成提示词 — 织暖家居

> 首页 Hero 讲一个品牌故事：**产品生活 → 工厂实力 → 面料品质 → 品牌精神**
> 第1场景用 AI 视频，第2-4场景用 AI 图片

---

## 场景1：模特+产品生活（AI 视频，5秒）

> 工具推荐：可灵 / 即梦 / Runway / Pika
> 尺寸：9:16 竖屏（手机全屏）

**可灵/即梦 提示词：**
```
年轻女性模特穿着高级米白色家居服套装，慵懒地半躺在奶油色高级床品上，窗外清晨柔光洒入，窗帘轻轻飘动，模特轻轻翻身微笑，画面缓慢推近，温暖电影质感，浅景深，暖色调，高端家居品牌广告风格
```

**Runway/Pika 英文提示词：**
```
A young woman wearing premium cream-colored loungewear set, lounging on a luxurious bed with soft beige bedding, morning sunlight streaming through sheer curtains gently swaying, she slowly turns and smiles, camera slowly pushing in, cinematic warm tones, shallow depth of field, luxury homewear brand commercial style, 9:16 vertical
```

**备选方案（纯图片生图视频）：** 先用下面的图片提示词生成一张静图，再用可灵的"图生视频"功能让画面动起来。

**场景1 静图版：**
```
年轻女性模特穿着米白色高级家居服套装，慵懒地靠在奶油色大床上，清晨侧光从左边窗户照入，背景是简约高级卧室，浅景深，暖色胶片质感，竖构图，高端家居品牌广告摄影
```

---

## 场景2：工厂/工艺实力（AI 图片）

> 工具推荐：ChatGPT DALL-E / Midjourney / 可灵
> 尺寸：750×1334px 竖屏

```
现代化纺织工厂内部，整洁明亮的生产车间，精密的织布机正在运转，一匹高品质的米白色面料正从机器中缓缓织出，暖色工业照明，画面干净有序，浅景深聚焦在面料上，背景设备虚化，高端制造业宣传片风格，竖构图
```

**英文版：**
```
Modern textile factory interior, clean and bright production floor, precision weaving machine in operation, premium cream-colored fabric being woven and flowing out of the machine, warm industrial lighting, clean and organized composition, shallow depth of field focusing on the fabric, background machinery softly blurred, high-end manufacturing promotional style, 750x1334px vertical
```

---

## 场景3：面料材质特写（AI 图片）

> 尺寸：750×1334px 竖屏

```
家居服面料的极致微距特写，柔软的珊瑚绒纤维清晰可见，米白色和浅驼色，手指轻触面料表面感受质地，暖金色侧光打出面料的绒毛层次感，微距摄影，浅景深，背景纯净虚化，奢侈品面料广告风格，竖构图
```

**英文版：**
```
Extreme macro close-up of homewear fabric, soft coral fleece fibers clearly visible, cream and light camel tones, fingertips gently touching the fabric surface, warm golden side lighting revealing the plush texture layers, macro photography, shallow depth of field, clean blurred background, luxury textile advertising style, 750x1334px vertical
```

---

## 场景4：品牌文化/理念（AI 图片）

> 尺寸：750×1334px 竖屏
> 这张图做背景，上面会叠品牌 Logo 和文字，所以画面要偏暗、留白多

```
极简家居场景，深色木质桌面上放着一件精致折叠的家居服，旁边有一杯热茶微微冒烟，干花装饰，大面积留白，画面整体偏暗调，莫兰迪配色，俯拍角度，安静温暖的氛围，适合叠加文字的构图，竖构图
```

**英文版：**
```
Minimalist home scene, dark wood table surface with a neatly folded premium loungewear piece, a cup of hot tea with gentle steam, dried flower arrangement, large negative space, overall dark and moody tones, Morandi color palette, overhead angle, quiet and warm atmosphere, composition suitable for text overlay, 750x1334px vertical
```

---

## 面料系列封面（分类页用，4张）

> 尺寸：750×1000px 或 3:4 比例

### 家居服系列
```
一件米白色高级家居服套装平铺在奶油色床单上，旁边放着一朵干花和一本杂志，从上方俯拍，柔和自然光，干净温暖，生活方式摄影风格
```

### 摇粒绒系列
```
摇粒绒外套的特写，毛茸茸的质地清晰可见，暖驼色，模特的手轻轻抓起衣角，暖色侧光，浅景深，温暖舒适感
```

### 纯棉系列
```
纯白色棉质家居服在微风中轻轻飘动，挂在木质衣架上，背景是明亮的窗户，自然光通透，清爽干净的感觉，极简风格
```

### 天鹅绒系列
```
深色天鹅绒家居袍的特写，丝绒光泽在光线下流动，深酒红色和墨绿色，戏剧性的明暗对比照明，奢华质感
```

---

## 生成后操作

1. 视频文件放到 `02-assets/client-jiajufu/hero/hero-video.mp4`
2. 图片文件放到 `02-assets/client-jiajufu/hero/`
   - `hero-2-factory.jpg` — 工厂场景
   - `hero-3-fabric.jpg` — 面料特写
   - `hero-4-brand.jpg` — 品牌文化
3. 面料封面放到 `02-assets/client-jiajufu/series/`
4. 告诉我，我帮你接入代码并调整动画过渡
