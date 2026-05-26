# 面料变化TVC短片 — 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 生成6张截帧关键帧图片（含女主+金毛融入场景），输出完整Seedance2.0视频提示词生产包。

**Architecture:** 先用nano banana 2/gpt-image2生成关键帧静态图，再基于生成结果微调Seedance2.0视频提示词。所有产出保存到`E:\面料变化TVC\`。

**Tech Stack:** nano banana 2（有参考图）、gpt-image2 + nano banana pro（纯文字）、Seedance2.0（视频生成）

**参考文件：**
- 设计文档：`E:\面料变化TVC\设计文档.md`
- 女主参考图：`女主1ok（黄色提花）.png`、`女主2ok（白色提花）.png`、`女主3ok（绿色提花）.png`、`女主4ok（蓝色提花）.png`
- 魔毯参考图：`黄色魔毯.png`、`白色魔毯.png`、`绿色魔毯.png`、`蓝色魔毯.png`
- 金毛参考图：`金毛.png`
- 女主脸部：`女主脸部细节图.png`

---

### Task 1: 生成段A首帧 — 客厅魔毯飞入前

**目的：** 段A的起始画面，女主被沙发挡住只露头部背面，魔毯尚未出现。作为Seedance2.0的首帧参考。

**生成工具：** nano banana 2（有女主脸部参考图）

- [ ] **Step 1: 生成客厅首帧**

使用nano banana 2，参考图：`女主脸部细节图.png`

提示词：
```
Young woman @[女主脸部细节图] seen from behind, only her head and brown wavy hair visible above a long dark gray fabric sofa. She is sitting on the sofa, her body completely hidden by the sofa back. Modern minimalist living room, warm floor lamp glow, light wood floor, gray concrete-texture walls. Camera positioned behind the sofa at shoulder height, looking over the sofa. Vertical 9:16 frame. Photorealistic interior photography, warm ambient lighting, quiet evening atmosphere.
```

- [ ] **Step 2: 确认生成效果**

检查要点：
- 女主只露出头部背面，棕色卷发可见
- 沙发完全遮挡身体
- 客厅环境：暖色灯光、灰墙、木地板
- 9:16竖屏比例
- 写实摄影风格，无AI感

- [ ] **Step 3: 保存到工作目录**

保存为：`E:\面料变化TVC\关键帧_A01_客厅首帧.png`

---

### Task 2: 生成段B关键帧 — 蓝色服装女主+金毛在客厅

**目的：** 段B起始画面，金光退去后女主穿蓝色提花家居服全身可见，金毛在身旁。

**生成工具：** nano banana 2（有女主4ok参考图+金毛参考图）

- [ ] **Step 1: 生成蓝色服装全身帧**

使用nano banana 2，参考图：`女主4ok（蓝色提花）.png`、`金毛.png`

提示词：
```
Young woman @[女主4ok] wearing light blue jacquard loungewear - round neck long sleeve top + wide-leg pants, walking leftward in a modern living room. Full body visible, confident relaxed gait. Brown wavy hair falling naturally. Golden retriever @[金毛] walking beside her on a red leash. Living room background: dark gray fabric sofa, warm floor lamp, light wood floor. Camera at waist height, 3 meters side distance, tracking left. Vertical 9:16 frame. Photorealistic fashion photography, warm interior lighting.
```

- [ ] **Step 2: 确认生成效果**

检查要点：
- 女主穿蓝色提花圆领长袖+阔腿裤，面料纹理清晰
- 全身可见，正在向左走
- 金毛在身旁，红色牵引绳
- 客厅背景
- 9:16竖屏

- [ ] **Step 3: 保存到工作目录**

保存为：`E:\面料变化TVC\关键帧_B01_蓝色服装客厅.png`

---

### Task 3: 生成段B关键帧 — 绿色服装女主+金毛在走廊

**目的：** 段B后半段，水泥柱转场后女主变为绿色提花家居服，在走廊中行走。

**生成工具：** nano banana 2（有女主3ok参考图+金毛参考图）

- [ ] **Step 1: 生成绿色服装走廊帧**

使用nano banana 2，参考图：`女主3ok（绿色提花）.png`、`金毛.png`

提示词：
```
Young woman @[女主3ok] wearing sage green jacquard loungewear - V-neck wrap short-sleeve top + jogger pants with elastic cuffs, walking leftward in a bright corridor. Full body visible, confident rhythmic gait. Brown wavy hair. Golden retriever @[金毛] walking obediently beside her on a red leash. Corridor: light floor, white walls, ceiling recessed lights in a row. Camera at waist height, 3 meters side distance, tracking left. Vertical 9:16 frame. Photorealistic fashion photography, clean corridor lighting.
```

- [ ] **Step 2: 确认生成效果**

检查要点：
- 女主穿绿色提花V领裹身上衣+束脚裤，面料纹理清晰
- 全身可见，自信步伐
- 金毛在身旁
- 走廊背景：地板+白墙+顶灯
- 9:16竖屏

- [ ] **Step 3: 保存到工作目录**

保存为：`E:\面料变化TVC\关键帧_B02_绿色服装走廊.png`

---

### Task 4: 生成段C关键帧 — 电梯内部女主+金毛

**目的：** 段C核心画面，女主穿黄色提花家居服在电梯内展示，金毛在腿边。

**生成工具：** nano banana 2（有女主1ok参考图+金毛参考图）

- [ ] **Step 1: 生成电梯内部帧**

使用nano banana 2，参考图：`女主1ok（黄色提花）.png`、`金毛.png`

提示词：
```
Young woman @[女主1ok] wearing warm yellow jacquard loungewear - round neck long sleeve top + drawstring pants, standing inside a modern elevator with golden retriever @[金毛] at her feet. Confident stylish pose, slightly turned to camera left. Brushed metal elevator walls reflecting warm overhead light. Golden retriever sitting calmly beside her legs. Vertical 9:16 frame. Photorealistic fashion photography, elevator interior lighting.
```

- [ ] **Step 2: 确认生成效果**

检查要点：
- 女主穿黄色提花圆领长袖+抽绳裤，面料纹理清晰
- 时尚站姿，电梯内
- 金毛在腿边
- 金属电梯内壁反射
- 9:16竖屏

- [ ] **Step 3: 保存到工作目录**

保存为：`E:\面料变化TVC\关键帧_C01_电梯内部.png`

---

### Task 5: 生成段C关键帧 — 电梯门打开金毛先出+白色服装

**目的：** 段C转场画面，低机位电梯门打开，金毛先走出，女主穿白色提花家居服出现。

**生成工具：** nano banana 2（有女主2ok参考图+金毛参考图）

- [ ] **Step 1: 生成电梯开门帧**

使用nano banana 2，参考图：`女主2ok（白色提花）.png`、`金毛.png`

提示词：
```
Low angle shot from dog-eye-level height (30cm from ground). Elevator doors opening from center. Golden retriever @[金毛] head emerging first, nose toward camera, walking forward out of elevator. Behind the dog, young woman @[女主2ok] wearing off-white jacquard loungewear - half-zip hoodie + ribbed pants, stepping out. Metal elevator door frame visible at top. Warm interior elevator light spilling out into brighter outdoor light. Vertical 9:16 frame. Photorealistic, dramatic low angle perspective.
```

- [ ] **Step 2: 确认生成效果**

检查要点：
- 低机位（狗眼高度），仰拍视角
- 金毛头部先出现，朝镜头走来
- 女主穿白色提花半拉链连帽衫+罗纹裤
- 电梯门框在画面上方
- 9:16竖屏

- [ ] **Step 3: 保存到工作目录**

保存为：`E:\面料变化TVC\关键帧_C02_电梯开门.png`

---

### Task 6: 生成段D关键帧 — 白色服装女主+金毛在公园

**目的：** 段D开场画面，女主穿白色提花家居服牵金毛在公园漫步。

**生成工具：** nano banana 2（有女主2ok参考图+金毛参考图）

- [ ] **Step 1: 生成公园漫步帧**

使用nano banana 2，参考图：`女主2ok（白色提花）.png`、`金毛.png`

提示词：
```
Young woman @[女主2ok] wearing off-white jacquard loungewear - half-zip hoodie + ribbed pants, walking leftward in a sunny park with golden retriever @[金毛] on a red leash. Full body visible, relaxed joyful gait, brown wavy hair blowing back in the breeze. Park: lush green trees swaying, well-maintained lawn, paved pathway, soft afternoon natural light, distant city silhouettes. Camera at waist height, 3 meters side distance, tracking left. Vertical 9:16 frame. Photorealistic fashion photography, warm golden hour light.
```

- [ ] **Step 2: 确认生成效果**

检查要点：
- 女主穿白色提花半拉链连帽衫+罗纹裤，面料纹理清晰
- 全身可见，轻松步伐，头发随风后飘
- 金毛在身旁
- 公园背景：绿树、草坪、自然光
- 9:16竖屏

- [ ] **Step 3: 保存到工作目录**

保存为：`E:\面料变化TVC\关键帧_D01_白色服装公园.png`

---

### Task 7: 生成辅助关键帧 — 水泥柱+楼层指示器+公园全景

**目的：** 补充三个纯场景/物件关键帧，无女主金毛，用于转场和环境建立。

**生成工具：** nano banana 2（水泥柱、楼层指示器）、gpt-image2（公园全景）

- [ ] **Step 1: 生成水泥柱满屏帧**

提示词：
```
A massive concrete structural pillar filling the entire 9:16 vertical frame edge to edge. Raw gray concrete texture with visible formwork marks and surface imperfections. No gaps at frame borders. Industrial architectural element. Photorealistic, natural lighting, construction material detail.
```

保存为：`E:\面料变化TVC\关键帧_B03_水泥柱.png`

- [ ] **Step 2: 生成楼层指示器特写帧**

提示词：
```
Extreme close-up of elevator floor indicator panel. Red LED digital number "2" on brushed metal panel. Vertical 9:16 frame filling entire shot. Industrial design, clean typography. Photorealistic macro detail shot.
```

保存为：`E:\面料变化TVC\关键帧_C03_楼层指示器.png`

- [ ] **Step 3: 生成公园全景帧**

提示词：
```
Beautiful sunny park, lush green trees swaying in gentle breeze, well-maintained lawn, light-colored paved pathway, soft afternoon natural light, distant city building silhouettes on horizon, clear blue sky with scattered clouds. Vertical 9:16 frame. Photorealistic landscape photography, warm color temperature, peaceful atmosphere.
```

保存为：`E:\面料变化TVC\关键帧_D02_公园全景.png`

- [ ] **Step 4: 确认三张生成效果**

检查要点：
- 水泥柱：灰色混凝土纹理，完全填满画面
- 楼层指示器：LED红色数字"2"，金属面板
- 公园全景：绿树草坪，自然光，远景建筑

---

### Task 8: 生成魔毯首帧 — 段A魔毯悬浮

**目的：** 段A中魔毯飞行的参考帧，蓝色魔毯悬浮波浪形态。

**生成工具：** nano banana 2（有蓝色魔毯参考图）

- [ ] **Step 1: 生成魔毯飞行帧**

使用nano banana 2，参考图：`蓝色魔毯.png`

提示词：
```
Blue jacquard fabric magic carpet @[蓝色魔毯] floating and undulating in mid-air inside a modern living room. Wave-like motion, fabric rippling with subtle light reflections showing jacquard flower pattern texture. Warm floor lamp glow illuminating the fabric. Background: dark sofa, gray walls, wood floor. Camera at sofa height looking toward the floating carpet. Vertical 9:16 frame. Photorealistic, magical atmosphere, soft warm lighting.
```

- [ ] **Step 2: 确认生成效果**

检查要点：
- 蓝色魔毯悬浮波浪形态
- 提花纹理可见
- 客厅背景
- 9:16竖屏

- [ ] **Step 3: 保存到工作目录**

保存为：`E:\面料变化TVC\关键帧_A02_魔毯悬浮.png`

---

### Task 9: 汇总全部关键帧 + 更新最终提示词

**目的：** 检查全部9张关键帧，基于实际生成效果微调Seedance2.0视频提示词中的参考图描述。

- [ ] **Step 1: 检查全部关键帧文件**

确认以下文件全部存在于`E:\面料变化TVC\`：

| 文件名 | 对应段 |
|---|---|
| 关键帧_A01_客厅首帧.png | 段A |
| 关键帧_A02_魔毯悬浮.png | 段A |
| 关键帧_B01_蓝色服装客厅.png | 段B |
| 关键帧_B02_绿色服装走廊.png | 段B |
| 关键帧_B03_水泥柱.png | 段B |
| 关键帧_C01_电梯内部.png | 段C |
| 关键帧_C02_电梯开门.png | 段C |
| 关键帧_C03_楼层指示器.png | 段C |
| 关键帧_D01_白色服装公园.png | 段D |
| 关键帧_D02_公园全景.png | 段D |

- [ ] **Step 2: 基于实际生成效果微调提示词**

对照每张关键帧实际效果，检查Seedance2.0提示词中的：
- 服装描述是否与生成图一致
- 场景描述是否与生成图一致
- 人物姿态描述是否可行
- 运镜规则是否与构图匹配

如需微调，更新`E:\面料变化TVC\设计文档.md`中对应段的提示词。

- [ ] **Step 3: 生成最终生产包**

将以下内容整合到`E:\面料变化TVC\最终生产包.md`：
- 四段Seedance2.0视频提示词（最终版）
- 关键帧文件路径清单
- 参考图文件路径清单
- 生产注意事项

- [ ] **Step 4: 提交确认**

向用户展示全部关键帧缩略图+最终提示词，确认无误后完成。
