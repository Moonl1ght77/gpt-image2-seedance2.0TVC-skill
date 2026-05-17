# TVC广告视频创意生成器 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个提示词工程skill，用于生成TVC广告视频的创意、脚本和分镜，适配GPT-image2和Seedance2.0模型

**Architecture:** 基于Claude Code的skill系统，创建一个包含5个模块的提示词工程skill，每个模块负责TVC制作流程中的一个环节。skill接收服装图和模特图作为输入，最终输出两张10秒对应的九宫格分镜图。

**Tech Stack:** Claude Code Skill System, Markdown, 提示词工程

---

### Task 1: 创建Skill目录结构

**Files:**
- Create: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`
- Create: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/README.md`

- [ ] **Step 1: 创建skill目录**

Run: `mkdir -p "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator"`

- [ ] **Step 2: 验证目录创建成功**

Run: `ls -la "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator"`
Expected: 目录存在且为空

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/
git commit -m "feat: create tvc-video-creator skill directory"
```

---

### Task 2: 编写SKILL.md基础框架

**Files:**
- Create: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 编写SKILL.md文件头部**

```markdown
---
name: tvc-video-creator
description: TVC广告视频创意生成器 - 专注于20秒竖屏短视频的创意构思、脚本撰写和分镜制作
---

# TVC广告视频创意生成器

## 核心定位

面向面料/服装行业的TVC广告视频创意生成器，专注于20秒竖屏（9:16）短视频的创意构思、脚本撰写和分镜制作。

## 输入素材

- 服装图（用户已用面料图生成）
- 模特图

## 输出成果

两张10秒对应的九宫格分镜图（纯中文）

## 技术适配

- 生图模型：GPT-image2
- 视频模型：Seedance2.0

## 一致性要求

- 模特100%与参考图一致
- 服装100%与参考图一致
```

- [ ] **Step 2: 验证文件内容**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示文件头部内容

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md
git commit -m "feat: add SKILL.md base framework"
```

---

### Task 3: 编写流程设计部分

**Files:**
- Modify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 添加流程设计到SKILL.md**

```markdown
## 流程设计

```
输入素材（服装图+模特图）
    ↓
模块1：创意构思（3组方向）→ 用户选择1组
    ↓
模块2：视觉风格（3种选择）→ 用户选择1种
    ↓
模块3：概念图生成（3张描述）→ 用户确认调性
    ↓
模块4：脚本撰写（3版脚本）→ 用户选择1版
    ↓
模块5：分镜制作（两张10秒九宫格分镜图）
    ↓
最终交付
```

## 使用方式

1. 用户提供服装图和模特图
2. 按照流程逐步执行每个模块
3. 每个模块执行后等待用户确认
4. 最终交付两张10秒对应的九宫格分镜图
```

- [ ] **Step 2: 验证文件内容**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示包含流程设计的完整内容

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md
git commit -m "feat: add workflow design to SKILL.md"
```

---

### Task 4: 编写模块1：创意构思模块

**Files:**
- Modify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 添加模块1内容到SKILL.md**

```markdown
## 模块详细设计

### 模块1：创意构思模块

**功能：** 以顶尖TVC创意大师的视角，根据服装特点和模特气质，构思整体创意

**输入：** 服装图 + 模特图

**执行步骤：**

1. 分析服装图：
   - 服装款式、颜色、材质特点
   - 适合的场景和氛围
   - 目标受众定位

2. 分析模特图：
   - 模特气质类型（优雅、时尚、清新等）
   - 肢体语言和表情特点
   - 与服装的匹配度

3. 构思3组创意方向：
   - 每组包含：创意主题、核心视觉表现、情感调性、目标受众感受
   - 确保3组方向有明显差异，给用户充分选择空间

**输出格式：**

```
创意方向A：
主题：[创意主题]
视觉表现：[核心视觉表现描述]
情感调性：[情感调性关键词]
目标受众感受：[希望受众产生的感受]

创意方向B：
...

创意方向C：
...
```

**等待用户选择：** 执行完后，询问用户选择哪个创意方向
```

- [ ] **Step 2: 验证文件内容**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示包含模块1的完整内容

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md
git commit -m "feat: add module 1 - creative concept module"
```

---

### Task 5: 编写模块2：视觉风格模块

**Files:**
- Modify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 添加模块2内容到SKILL.md**

```markdown
### 模块2：视觉风格模块

**功能：** 根据选定的创意方向，提供3种不同的视觉风格供用户选择

**输入：** 用户选定的创意方向

**执行步骤：**

1. 基于选定的创意方向，分析适合的视觉风格
2. 考虑服装特点和模特气质
3. 提供3种有明显差异的视觉风格选择

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

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示包含模块2的完整内容

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md
git commit -m "feat: add module 2 - visual style module"
```

---

### Task 6: 编写模块3：概念图生成模块

**Files:**
- Modify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 添加模块3内容到SKILL.md**

```markdown
### 模块3：概念图生成模块

**功能：** 根据选定的创意方向和视觉风格，生成3张概念图的描述（适配GPT-image2模型）

**输入：** 选定的创意方向 + 视觉风格

**执行步骤：**

1. 基于创意方向和视觉风格，构思3个不同的画面场景
2. 每个场景包含：构图、色彩、光影、主体呈现、背景环境
3. 为每个场景编写适配GPT-image2模型的提示词

**输出格式：**

```
概念图A：
画面描述：[详细的画面描述]
构图：[构图方式]
色彩：[色彩描述]
光影：[光影描述]
主体呈现：[模特+服装的呈现方式]
背景：[背景环境描述]
GPT-image2提示词：[针对该模型优化的提示词，包含所有关键元素]

概念图B：
...

概念图C：
...
```

**等待用户确认：** 执行完后，询问用户概念图调性是否符合预期
```

- [ ] **Step 2: 验证文件内容**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示包含模块3的完整内容

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md
git commit -m "feat: add module 3 - concept image generation module"
```

---

### Task 7: 编写模块4：脚本撰写模块

**Files:**
- Modify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 添加模块4内容到SKILL.md**

```markdown
### 模块4：脚本撰写模块

**功能：** 根据选定的创意方向、视觉风格和确认的概念图调性，撰写视频脚本

**输入：** 选定的创意方向 + 视觉风格 + 概念图调性 + 模特气质 + 服装风格

**执行步骤：**

1. 综合所有前序模块的输出
2. 撰写3版完整的视频脚本
3. 每版脚本包含：视觉调性、景别、摄像机运动、镜头、焦距、光圈、画面内容、时间轴
4. 确保模特和服装100%与参考图一致

**输出格式：**

```
脚本A（20秒）：
视觉调性：[与模特气质和服装风格相匹配的调性描述]

第一段（0-10秒）：
  时间轴：0-3秒
  景别：[远景/全景/中景/近景/特写]
  摄像机：[摄像机运动描述]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[详细的画面内容描述]
  
  时间轴：3-6秒
  景别：[景别]
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]
  
  时间轴：6-10秒
  景别：[景别]
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[画面内容]

第二段（10-20秒）：
  [相同格式...]

脚本B（20秒）：
...

脚本C（20秒）：
...
```

**等待用户选择：** 执行完后，询问用户选择哪版脚本
```

- [ ] **Step 2: 验证文件内容**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示包含模块4的完整内容

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md
git commit -m "feat: add module 4 - script writing module"
```

---

### Task 8: 编写模块5：分镜制作模块

**Files:**
- Modify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 添加模块5内容到SKILL.md**

```markdown
### 模块5：分镜制作模块

**功能：** 根据选定的脚本，制作两张10秒对应的九宫格分镜图

**输入：** 用户选定的脚本

**执行步骤：**

1. 将20秒脚本拆分为两段各10秒
2. 为每段10秒制作9个格子的分镜
3. 每个格子包含完整的拍摄参数
4. 确保模特和服装100%与参考图一致
5. 为每个格子编写适配Seedance2.0模型的提示词

**输出格式：**

```
第一段分镜（0-10秒）：
格子1：
  时间轴：0-1秒
  景别：[景别]
  摄像机：[摄像机运动]
  镜头：[镜头类型]
  焦距：[焦距值]
  光圈：[光圈值]
  画面内容：[详细的画面内容描述]
  转场：[转场方式]
  Seedance2.0提示词：[针对该模型优化的提示词]

格子2：
  时间轴：1-2秒
  [相同格式...]

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
  时间轴：8-10秒
  [相同格式...]

第二段分镜（10-20秒）：
格子1：
  时间轴：10-11秒
  [相同格式...]

格子2：
  时间轴：11-12秒
  [相同格式...]

格子3：
  时间轴：12-13秒
  [相同格式...]

格子4：
  时间轴：13-14秒
  [相同格式...]

格子5：
  时间轴：14-15秒
  [相同格式...]

格子6：
  时间轴：15-16秒
  [相同格式...]

格子7：
  时间轴：16-17秒
  [相同格式...]

格子8：
  时间轴：17-18秒
  [相同格式...]

格子9：
  时间轴：18-20秒
  [相同格式...]
```

**最终交付：** 两张10秒对应的九宫格分镜图（纯中文）
```

- [ ] **Step 2: 验证文件内容**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示包含模块5的完整内容

- [ ] **Step 3: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md
git commit -m "feat: add module 5 - storyboard creation module"
```

---

### Task 9: 编写示例和使用指南

**Files:**
- Modify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`
- Create: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/examples/sample-creative.md`

- [ ] **Step 1: 添加示例到SKILL.md**

```markdown
## 使用示例

### 输入示例

用户提供：
- 服装图：一件丝绸睡衣，浅蓝色，带有细腻的花卉图案
- 模特图：一位年轻女性，气质优雅，皮肤白皙

### 执行流程示例

1. **创意构思模块执行：**
   - 分析服装：丝绸材质、浅蓝色调、花卉图案、睡衣款式
   - 分析模特：优雅气质、年轻女性、白皙皮肤
   - 输出3组创意方向供用户选择

2. **用户选择创意方向A：** "优雅梦境"

3. **视觉风格模块执行：**
   - 基于"优雅梦境"主题
   - 输出3种视觉风格供用户选择

4. **用户选择风格A：** "柔光梦幻"

5. **概念图生成模块执行：**
   - 生成3张概念图描述
   - 包含GPT-image2提示词
   - 用户确认调性

6. **脚本撰写模块执行：**
   - 撰写3版脚本
   - 包含完整的拍摄参数
   - 用户选择脚本A

7. **分镜制作模块执行：**
   - 生成两张10秒分镜
   - 每张9个格子
   - 包含Seedance2.0提示词

8. **最终交付：** 两张分镜图
```

- [ ] **Step 2: 创建示例文件**

```markdown
# 示例：优雅梦境创意方向

## 创意方向A：优雅梦境

**主题：** 丝绸之梦

**视觉表现：** 
通过丝绸睡衣的流动感和模特的优雅气质，营造一个梦幻般的睡眠场景。画面以柔和的蓝色调为主，配合飘逸的丝绸质感，展现产品的舒适与高级感。

**情感调性：** 
宁静、优雅、舒适、高级

**目标受众感受：** 
让观众感受到穿上这件睡衣后，能够进入一个优雅舒适的梦境，享受高品质的睡眠体验。

## 适配的视觉风格

**风格A：柔光梦幻**
- 画面调性：柔和、梦幻、轻盈
- 色彩倾向：浅蓝色、淡紫色、白色
- 光影特点：柔和的散射光，带有轻微的光晕效果
- 参考风格关键词：梦幻、柔光、丝绸质感、高级感
```

- [ ] **Step 3: 验证文件内容**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示包含示例的完整内容

- [ ] **Step 4: 提交**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/
git commit -m "feat: add usage examples and sample creative"
```

---

### Task 10: 最终验证和测试

**Files:**
- Verify: `C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md`

- [ ] **Step 1: 完整内容验证**

Run: `cat "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/SKILL.md"`
Expected: 显示完整的skill内容，包含所有5个模块

- [ ] **Step 2: 目录结构验证**

Run: `ls -la "C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/"`
Expected: 包含SKILL.md、README.md、examples/目录

- [ ] **Step 3: 提交最终版本**

```bash
git add C:/Users/Administrator/.claude/plugins/skills/tvc-video-creator/
git commit -m "feat: complete tvc-video-creator skill implementation"
```
