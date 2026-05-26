# TVC广告视频创意生成器 V2 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个新的TVC短片创意生成器skill，专注于面料/服装行业的30秒竖屏品牌大片级视频的创意构思、脚本撰写和分镜制作。

**Architecture:** 基于现有的tvc-video-creator skill结构，创建一个新的skill目录，包含SKILL.md主文件、README.md说明文档和示例文件。所有内容围绕面料质感优先、品牌大片标准、一致性第一的核心原则设计。

**Tech Stack:** Markdown文档、提示词工程（GPT-image2英文提示词 + Seedance2.0中文提示词）

---

## 文件结构

```
skills/
├── tvc-video-creator-v2/
│   ├── SKILL.md                    # 主skill文件，包含完整的模块设计
│   ├── README.md                   # 说明文档
│   └── examples/
│       └── sample-creative.md      # 示例创意文档
```

---

### Task 1: 创建skill目录结构

**Files:**
- Create: `skills/tvc-video-creator-v2/`
- Create: `skills/tvc-video-creator-v2/README.md`

- [ ] **Step 1: 创建skill目录**

```bash
mkdir -p skills/tvc-video-creator-v2/examples
```

- [ ] **Step 2: 创建README.md文件**

```markdown
# TVC Video Creator V2 Skill

This skill helps generate creative content for 30-second vertical TVC (Television Commercial) advertisements with brand-level production standards.

## Usage

Invoke this skill when you need to create:
- High-end TVC ad concepts for fabric/clothing products
- Storyboards for 30-second vertical video content
- Creative briefs for fashion brand advertising

## Example Prompts

- "Create a TVC script for silk loungewear with this fabric texture"
- "Generate a 30-second vertical video concept for children's clothing"
- "Develop a storyboard for underwear brand advertisement"

## Output

The skill generates structured creative documents with concepts, timed scripts, and visual storyboards optimized for vertical (9:16) format with brand-level production standards.

## Key Features

- Fabric texture priority
- Brand-level production standards (not e-commerce assembly line)
- 100% consistency with reference images
- Diverse shot types (close-up, medium, long shot)
```

- [ ] **Step 3: 验证目录结构**

Run: `ls -la skills/tvc-video-creator-v2/`
Expected: 目录创建成功，包含README.md文件

- [ ] **Step 4: 提交**

```bash
git add skills/tvc-video-creator-v2/
git commit -m "feat: create tvc-video-creator-v2 skill directory structure"
```

---

### Task 2: 创建SKILL.md主文件 - 基本信息和核心原则

**Files:**
- Create: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 创建SKILL.md文件的前半部分**

```markdown
---
name: tvc-video-creator-v2
description: TVC广告视频创意生成器V2 - 专注于面料/服装行业的30秒竖屏品牌大片级视频的创意构思、脚本撰写和分镜制作
---

# TVC广告视频创意生成器 V2

## 核心定位

面向面料/服装行业的TVC广告视频创意生成器，专注于30秒竖屏（9:16）品牌大片级视频的创意构思、脚本撰写和分镜制作。

## 核心原则

1. **面料质感优先** - 所有创意、视觉风格、脚本都要围绕"让面料看起来高级、服装好看"展开
2. **品牌大片标准** - 不是电商流水线，要有故事性、艺术感、电影质感
3. **一致性第一** - 服装与参考图100%一致，面料纹理细节必须正确
4. **场景适配** - 场景选择要与服装风格、品牌调性、目标受众高度匹配

## 输入素材

- 面料细节图（用户上传）
- 服装图（不同类型的：内衣、内裤、家居服、童装等）

## 输出成果

两张15秒对应的九宫格分镜图（纯文本格式）

## 技术适配

- 生图模型：GPT-image2（英文提示词 + 中文描述）
- 视频模型：Seedance2.0（中文提示词）

## 一致性要求

- 服装100%与参考图一致
- 面料纹理细节100%正确
```

- [ ] **Step 2: 验证文件内容**

Run: `cat skills/tvc-video-creator-v2/SKILL.md | head -30`
Expected: 文件创建成功，包含基本信息和核心原则

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add SKILL.md with basic info and core principles"
```

---

### Task 3: 完善SKILL.md - 流程设计

**Files:**
- Modify: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 添加流程设计部分**

在SKILL.md文件末尾添加：

```markdown

## 流程设计

```
输入素材（面料图+服装图）
    ↓
模块1：创意构思（3组方向）→ 用户选择1组
    ↓
模块2：视觉风格（3种选择）→ 用户选择1种
    ↓
模块3：概念图生成（2张描述）→ 用户确认调性
    ↓
模块4：脚本撰写（3版脚本）→ 用户选择1版
    ↓
模块5：分镜制作（两张15秒九宫格分镜图）
    ↓
最终交付
```

## 使用方式

1. 用户提供面料细节图和服装图
2. 按照流程逐步执行每个模块
3. 每个模块执行后等待用户确认
4. 最终交付两张15秒对应的九宫格分镜图
```

- [ ] **Step 2: 验证文件内容**

Run: `tail -20 skills/tvc-video-creator-v2/SKILL.md`
Expected: 流程设计部分添加成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add flow design and usage instructions"
```

---

### Task 4: 完善SKILL.md - 模块1：创意构思模块

**Files:**
- Modify: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 添加模块1详细设计**

在SKILL.md文件末尾添加：

```markdown

## 模块详细设计

### 模块1：创意构思模块

**功能：** 以顶尖TVC创意大师的视角，根据面料特点和服装风格，构思整体创意

**输入：** 面料图 + 服装图

**执行步骤：**

1. 分析面料图：
   - 面料材质、纹理、颜色特点
   - 面料的高级感表现方式
   - 适合的服装类型

2. 分析服装图：
   - 服装款式、设计特点
   - 服装的目标受众
   - 服装的品牌调性

3. 构思3组创意方向：
   - 每组包含：创意主题、核心视觉表现、情感调性、目标受众感受、场景选择理由
   - 确保3组方向有明显差异，给用户充分选择空间
   - 突出面料的高级质感
   - 场景选择要与服装风格匹配
   - 品牌大片标准，不是电商流水线

**输出格式：**

```
创意方向A：
主题：[创意主题]
视觉表现：[核心视觉表现描述]
情感调性：[情感调性关键词]
目标受众感受：[希望受众产生的感受]
场景选择：[场景选择理由]

创意方向B：
...

创意方向C：
...
```

**等待用户选择：** 执行完后，询问用户选择哪个创意方向
```

- [ ] **Step 2: 验证文件内容**

Run: `tail -30 skills/tvc-video-creator-v2/SKILL.md`
Expected: 模块1详细设计添加成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add Module 1 - Creative Concept Module"
```

---

### Task 5: 完善SKILL.md - 模块2：视觉风格模块

**Files:**
- Modify: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 添加模块2详细设计**

在SKILL.md文件末尾添加：

```markdown

### 模块2：视觉风格模块

**功能：** 根据选定的创意方向，提供3种不同的视觉风格供用户选择

**输入：** 用户选定的创意方向

**执行步骤：**

1. 基于选定的创意方向，分析适合的视觉风格
2. 考虑面料特点和服装风格
3. 提供3种有明显差异的视觉风格选择
4. 风格要能突出面料质感
5. 品牌大片标准

**输出格式：**

```
风格A：[风格名称]
画面调性：[画面调性描述]
色彩倾向：[色彩倾向描述]
光影特点：[光影特点描述]
参考风格关键词：[关键词列表]

风格B：[风格名称]
...

风格C：[风格名称]
...
```

**等待用户选择：** 执行完后，询问用户选择哪种视觉风格
```

- [ ] **Step 2: 验证文件内容**

Run: `tail -25 skills/tvc-video-creator-v2/SKILL.md`
Expected: 模块2详细设计添加成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add Module 2 - Visual Style Module"
```

---

### Task 6: 完善SKILL.md - 模块3：概念图生成模块

**Files:**
- Modify: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 添加模块3详细设计**

在SKILL.md文件末尾添加：

```markdown

### 模块3：概念图生成模块

**功能：** 根据选定的创意方向和视觉风格，生成2张概念图的描述（适配GPT-image2模型）

**输入：** 选定的创意方向 + 视觉风格

**执行步骤：**

1. 基于创意方向和视觉风格，构思2个不同的画面场景
2. 每个场景包含：构图、色彩、光影、主体呈现、背景环境
3. 为每个场景编写适配GPT-image2模型的英文提示词
4. 提供中文描述方便用户确认
5. 确保服装与参考图100%一致
6. 面料纹理细节必须正确

**输出格式：**

```
概念图A：
画面描述：[详细的画面描述]
中文描述：[中文描述，方便用户确认]
构图：[构图方式]
色彩：[色彩描述]
光影：[光影描述]
主体呈现：[模特+服装的呈现方式]
背景：[背景环境描述]
GPT-image2英文提示词：[针对该模型优化的英文提示词，包含所有关键元素]

概念图B：
...
```

**等待用户确认：** 执行完后，询问用户概念图调性是否符合预期
```

- [ ] **Step 2: 验证文件内容**

Run: `tail -30 skills/tvc-video-creator-v2/SKILL.md`
Expected: 模块3详细设计添加成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add Module 3 - Concept Image Generation Module"
```

---

### Task 7: 完善SKILL.md - 模块4：脚本撰写模块

**Files:**
- Modify: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 添加模块4详细设计**

在SKILL.md文件末尾添加：

```markdown

### 模块4：脚本撰写模块

**功能：** 根据选定的创意方向、视觉风格和确认的概念图调性，撰写视频脚本

**输入：** 选定的创意方向 + 视觉风格 + 概念图调性 + 面料特点 + 服装风格

**执行步骤：**

1. 综合所有前序模块的输出
2. 撰写3版完整的视频脚本
3. 每版脚本包含：视觉调性、景别、摄像机运动、镜头、焦距、光圈、画面内容、时间轴
4. 确保服装100%与参考图一致
5. 面料纹理细节100%正确
6. 景别要多样化：特写、近景、中景、远景都要有
7. 品牌大片标准，不是电商流水线
8. 节奏张弛有度

**输出格式：**

```
脚本A（30秒）：
视觉调性：[与面料质感和服装风格相匹配的调性描述]

第一段（0-15秒）：
  时间轴：0-3秒
  景别：特写
  摄像机：[摄像机运动描述]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[详细的画面内容描述，突出面料质感]
  
  时间轴：3-6秒
  景别：近景
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]
  
  时间轴：6-9秒
  景别：中景
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]
  
  时间轴：9-12秒
  景别：远景
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]
  
  时间轴：12-15秒
  景别：中景
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]

第二段（15-30秒）：
  [相同格式...]

脚本B（30秒）：
...

脚本C（30秒）：
...
```

**等待用户选择：** 执行完后，询问用户选择哪版脚本
```

- [ ] **Step 2: 验证文件内容**

Run: `tail -40 skills/tvc-video-creator-v2/SKILL.md`
Expected: 模块4详细设计添加成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add Module 4 - Script Writing Module"
```

---

### Task 8: 完善SKILL.md - 模块5：分镜制作模块

**Files:**
- Modify: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 添加模块5详细设计**

在SKILL.md文件末尾添加：

```markdown

### 模块5：分镜制作模块

**功能：** 根据选定的脚本，制作两张15秒对应的九宫格分镜图

**输入：** 用户选定的脚本

**执行步骤：**

1. 将30秒脚本拆分为两段各15秒
2. 为每段15秒制作9个格子的分镜
3. 每个格子包含完整的拍摄参数
4. 确保服装100%与参考图一致
5. 面料纹理细节100%正确
6. 景别要多样化：特写、近景、中景、远景都要有
7. 为每个格子编写适配Seedance2.0模型的中文提示词

**输出格式：**

```
第一段分镜（0-15秒）：
格子1：
  时间轴：0-1秒
  景别：[景别]
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[详细的画面内容描述，突出面料质感]
  转场：[转场方式]
  Seedance2.0中文提示词：[针对该模型优化的中文提示词]

格子2：
  时间轴：1-2秒
  景别：[景别]
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]
  转场：[转场方式]
  Seedance2.0中文提示词：[中文提示词]

格子3：
  时间轴：2-3秒
  [相同格式...]

格子4：
  时间轴：3-4秒
  [相同格式...]

格子5：
  时间轴：4-5秒
  [相同格式...]

格子6：
  时间轴：5-6秒
  [相同格式...]

格子7：
  时间轴：6-7秒
  [相同格式...]

格子8：
  时间轴：7-8秒
  [相同格式...]

格子9：
  时间轴：8-15秒
  [相同格式...]

第二段分镜（15-30秒）：
格子1：
  时间轴：15-16秒
  景别：[景别]
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]
  转场：[转场方式]
  Seedance2.0中文提示词：[中文提示词]

格子2：
  时间轴：16-17秒
  [相同格式...]

格子3：
  时间轴：17-18秒
  [相同格式...]

格子4：
  时间轴：18-19秒
  [相同格式...]

格子5：
  时间轴：19-20秒
  [相同格式...]

格子6：
  时间轴：20-21秒
  [相同格式...]

格子7：
  时间轴：21-22秒
  [相同格式...]

格子8：
  时间轴：22-23秒
  [相同格式...]

格子9：
  时间轴：23-30秒
  [相同格式...]
```

**最终交付：** 两张15秒对应的九宫格分镜图（纯文本格式）
```

- [ ] **Step 2: 验证文件内容**

Run: `tail -50 skills/tvc-video-creator-v2/SKILL.md`
Expected: 模块5详细设计添加成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add Module 5 - Storyboard Production Module"
```

---

### Task 9: 完善SKILL.md - 使用示例

**Files:**
- Modify: `skills/tvc-video-creator-v2/SKILL.md`

- [ ] **Step 1: 添加使用示例**

在SKILL.md文件末尾添加：

```markdown

## 使用示例

### 输入示例

用户提供：
- 面料细节图：真丝面料，浅蓝色，带有细腻的光泽
- 服装图：一件真丝睡衣套装

### 执行流程示例

1. **创意构思模块执行：**
   - 分析面料：真丝材质、浅蓝色调、细腻光泽
   - 分析服装：睡衣套装款式、舒适设计
   - 输出3组创意方向供用户选择

2. **用户选择创意方向A：** "优雅梦境"

3. **视觉风格模块执行：**
   - 基于"优雅梦境"主题
   - 输出3种视觉风格供用户选择

4. **用户选择风格A：** "柔光梦幻"

5. **概念图生成模块执行：**
   - 生成2张概念图描述
   - 包含GPT-image2英文提示词和中文描述
   - 用户确认调性

6. **脚本撰写模块执行：**
   - 撰写3版脚本
   - 包含完整的拍摄参数
   - 景别多样化：特写、近景、中景、远景
   - 用户选择脚本A

7. **分镜制作模块执行：**
   - 生成两张15秒分镜
   - 每张9个格子
   - 包含Seedance2.0中文提示词
   - 景别多样化

8. **最终交付：** 两张分镜图
```

- [ ] **Step 2: 验证文件内容**

Run: `tail -30 skills/tvc-video-creator-v2/SKILL.md`
Expected: 使用示例添加成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/SKILL.md
git commit -m "feat: add usage examples"
```

---

### Task 10: 创建示例创意文档

**Files:**
- Create: `skills/tvc-video-creator-v2/examples/sample-creative.md`

- [ ] **Step 1: 创建示例文件**

```markdown
# 示例创意文档

## 输入素材

- 面料细节图：真丝面料，浅蓝色，带有细腻的光泽
- 服装图：一件真丝睡衣套装

## 创意方向

### 创意方向A：优雅梦境
主题：真丝的优雅梦境
视觉表现：通过柔和的光线和梦幻的场景，展现真丝面料的高级质感
情感调性：优雅、舒适、高级
目标受众感受：想要拥有同款舒适体验
场景选择：温馨的卧室环境，柔和的晨光

### 创意方向B：都市轻奢
主题：都市轻奢生活
视觉表现：现代都市背景，展现真丝睡衣的时尚感
情感调性：时尚、轻奢、自信
目标受众感受：向往这种生活品质
场景选择：现代公寓，落地窗前

### 创意方向C：自然纯粹
主题：自然纯粹之美
视觉表现：自然光线下，展现真丝面料的天然质感
情感调性：纯净、自然、舒适
目标受众感受：回归自然的舒适感
场景选择：花园或自然光充足的房间

## 用户选择

用户选择了创意方向A：优雅梦境

## 视觉风格

### 风格A：柔光梦幻
画面调性：柔和、梦幻、高级感
色彩倾向：浅蓝色调，低饱和度
光影特点：柔和的自然光，带有光晕效果
参考风格关键词：柔光、梦幻、高级

### 风格B：极简主义
画面调性：干净、留白、高级感
色彩倾向：低饱和度、莫兰迪色系
光影特点：柔和自然光
参考风格关键词：极简、高级、质感

### 风格C：电影质感
画面调性：电影级画面、故事感
色彩倾向：电影调色、对比度适中
光影特点：戏剧性光影
参考风格关键词：电影、故事、质感

## 用户选择

用户选择了风格A：柔光梦幻

## 概念图

### 概念图A
画面描述：模特穿着真丝睡衣，侧卧在柔和的床上，晨光透过窗帘洒在面料上，展现真丝的光泽和质感
中文描述：优雅的真丝睡衣在晨光中展现高级质感
GPT-image2英文提示词：A woman wearing silk pajamas lying on a soft bed, morning light streaming through curtains, highlighting the silk texture and sheen, dreamy atmosphere, soft focus, high-end fashion photography

### 概念图B
画面描述：模特站在落地窗前，真丝睡衣在自然光下展现出细腻的光泽，背景是模糊的城市景观
中文描述：都市轻奢风格的真丝睡衣展示
GPT-image2英文提示词：A woman standing by a floor-to-ceiling window wearing silk pajamas, natural light highlighting the silk texture, blurred cityscape background, modern luxury aesthetic, high-end fashion photography

## 用户确认

用户确认概念图调性符合预期

## 脚本

### 脚本A（30秒）
视觉调性：优雅、梦幻、高级

第一段（0-15秒）：
  时间轴：0-3秒
  景别：特写
  摄像机：固定
  镜头：微距镜头
  焦距：100mm
  光圈：f/2.8
  画面内容：真丝面料的特写，展现细腻的纹理和光泽
  
  时间轴：3-6秒
  景别：近景
  摄像机：缓慢推进
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特穿着真丝睡衣的上半身，展现服装的剪裁和设计
  
  时间轴：6-9秒
  景别：中景
  摄像机：缓慢平移
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特穿着真丝睡衣的全身，展现整体效果
  
  时间轴：9-12秒
  景别：远景
  摄像机：固定
  镜头：广角镜头
  焦距：24mm
  光圈：f/5.6
  画面内容：模特在温馨卧室中的整体场景，展现氛围
  
  时间轴：12-15秒
  景别：中景
  摄像机：缓慢后拉
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特转身，真丝睡衣随动作飘动，展现面料的垂坠感

第二段（15-30秒）：
  时间轴：15-18秒
  景别：近景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特面部特写，展现舒适的表情
  
  时间轴：18-21秒
  景别：特写
  摄像机：固定
  镜头：微距镜头
  焦距：100mm
  光圈：f/2.8
  画面内容：真丝面料的细节特写，展现光泽和质感
  
  时间轴：21-24秒
  景别：中景
  摄像机：缓慢平移
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特在卧室中行走，展现睡衣的舒适感
  
  时间轴：24-27秒
  景别：近景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特坐在床边，真丝睡衣展现高级质感
  
  时间轴：27-30秒
  景别：远景
  摄像机：缓慢后拉
  镜头：广角镜头
  焦距：24mm
  光圈：f/5.6
  画面内容：整个卧室场景，模特在柔和的光线下，展现整体氛围

### 脚本B（30秒）
...

### 脚本C（30秒）
...

## 用户选择

用户选择了脚本A

## 分镜

### 第一段分镜（0-15秒）
格子1：
  时间轴：0-1秒
  景别：特写
  摄像机：固定
  镜头：微距镜头
  焦距：100mm
  光圈：f/2.8
  画面内容：真丝面料的特写，展现细腻的纹理和光泽
  转场：淡入
  Seedance2.0中文提示词：真丝面料特写，细腻纹理，柔和光泽，晨光照射

格子2：
  时间轴：1-2秒
  景别：特写
  摄像机：固定
  镜头：微距镜头
  焦距：100mm
  光圈：f/2.8
  画面内容：真丝面料的另一个角度特写
  转场：无
  Seedance2.0中文提示词：真丝面料纹理，光泽感，高级质感

格子3：
  时间轴：2-3秒
  景别：近景
  摄像机：缓慢推进
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特穿着真丝睡衣的上半身
  转场：无
  Seedance2.0中文提示词：模特穿着真丝睡衣，上半身特写，优雅姿态

格子4：
  时间轴：3-4秒
  景别：近景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特面部和睡衣领口的特写
  转场：无
  Seedance2.0中文提示词：模特面部特写，真丝睡衣领口，优雅表情

格子5：
  时间轴：4-5秒
  景别：中景
  摄像机：缓慢平移
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特穿着真丝睡衣的全身
  转场：无
  Seedance2.0中文提示词：模特全身，真丝睡衣，优雅姿态，柔和光线

格子6：
  时间轴：5-6秒
  景别：中景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特转身，睡衣随动作飘动
  转场：无
  Seedance2.0中文提示词：模特转身，真丝睡衣飘动，展现垂坠感

格子7：
  时间轴：6-7秒
  景别：远景
  摄像机：固定
  镜头：广角镜头
  焦距：24mm
  光圈：f/5.6
  画面内容：模特在卧室中的整体场景
  转场：无
  Seedance2.0中文提示词：模特在卧室中，温馨场景，柔和晨光

格子8：
  时间轴：7-8秒
  景别：远景
  摄像机：固定
  镜头：广角镜头
  焦距：24mm
  光圈：f/5.6
  画面内容：卧室全景，展现整体氛围
  转场：无
  Seedance2.0中文提示词：卧室全景，温馨氛围，柔和光线

格子9：
  时间轴：8-15秒
  景别：中景
  摄像机：缓慢后拉
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特转身，睡衣随动作飘动
  转场：淡出
  Seedance2.0中文提示词：模特转身，真丝睡衣飘动，展现面料质感

### 第二段分镜（15-30秒）
格子1：
  时间轴：15-16秒
  景别：近景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特面部特写
  转场：淡入
  Seedance2.0中文提示词：模特面部特写，舒适表情，柔和光线

格子2：
  时间轴：16-17秒
  景别：近景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特微笑的特写
  转场：无
  Seedance2.0中文提示词：模特微笑，舒适表情，优雅气质

格子3：
  时间轴：17-18秒
  景别：特写
  摄像机：固定
  镜头：微距镜头
  焦距：100mm
  光圈：f/2.8
  画面内容：真丝面料的细节特写
  转场：无
  Seedance2.0中文提示词：真丝面料细节，光泽感，高级质感

格子4：
  时间轴：18-19秒
  景别：特写
  摄像机：固定
  镜头：微距镜头
  焦距：100mm
  光圈：f/2.8
  画面内容：真丝面料的另一个角度特写
  转场：无
  Seedance2.0中文提示词：真丝面料纹理，细腻质感

格子5：
  时间轴：19-20秒
  景别：中景
  摄像机：缓慢平移
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特在卧室中行走
  转场：无
  Seedance2.0中文提示词：模特行走，真丝睡衣舒适感，柔和光线

格子6：
  时间轴：20-21秒
  景别：中景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/4
  画面内容：模特行走的另一个角度
  转场：无
  Seedance2.0中文提示词：模特行走，真丝睡衣飘动，优雅姿态

格子7：
  时间轴：21-22秒
  景别：近景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特坐在床边
  转场：无
  Seedance2.0中文提示词：模特坐在床边，真丝睡衣高级质感

格子8：
  时间轴：22-23秒
  景别：近景
  摄像机：固定
  镜头：标准镜头
  焦距：50mm
  光圈：f/2.8
  画面内容：模特坐在床边的另一个角度
  转场：无
  Seedance2.0中文提示词：模特优雅姿态，真丝睡衣舒适感

格子9：
  时间轴：23-30秒
  景别：远景
  摄像机：缓慢后拉
  镜头：广角镜头
  焦距：24mm
  光圈：f/5.6
  画面内容：整个卧室场景，模特在柔和的光线下
  转场：淡出
  Seedance2.0中文提示词：卧室全景，模特在柔和晨光中，温馨氛围，高级感
```

- [ ] **Step 2: 验证文件内容**

Run: `cat skills/tvc-video-creator-v2/examples/sample-creative.md | head -50`
Expected: 示例文件创建成功

- [ ] **Step 3: 提交**

```bash
git add skills/tvc-video-creator-v2/examples/
git commit -m "feat: add sample creative document"
```

---

### Task 11: 最终验证和提交

**Files:**
- Verify: `skills/tvc-video-creator-v2/`

- [ ] **Step 1: 验证所有文件**

Run: `ls -la skills/tvc-video-creator-v2/`
Expected: 包含SKILL.md、README.md和examples目录

Run: `ls -la skills/tvc-video-creator-v2/examples/`
Expected: 包含sample-creative.md文件

- [ ] **Step 2: 检查SKILL.md完整性**

Run: `wc -l skills/tvc-video-creator-v2/SKILL.md`
Expected: 文件行数应该在300行以上

- [ ] **Step 3: 提交所有更改**

```bash
git add skills/tvc-video-creator-v2/
git commit -m "feat: complete tvc-video-creator-v2 skill implementation"
```

---

## 完成

实现计划完成。所有任务都已详细描述，包含具体的文件路径、代码内容和验证步骤。
