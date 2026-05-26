# 面料变化TVC短片 — 设计文档

## 项目概述

30-35秒竖屏（9:16）品牌TVC，展示四套提花家居服通过面料灵物（魔毯）驱动的变装效果。场景从室内客厅→走廊→电梯→户外公园，情绪从慵懒到自信到时尚到轻盈。

## 核心要素

### 人物
- 女模特，21岁，棕色卷发，雀斑，参考图：`女主脸部细节图.png`
- 金毛犬，三视图参考：`金毛.png`

### 四套服装
| 序号 | 颜色 | 款式 | 场景 |
|---|---|---|---|
| 1 | 蓝色提花 | 圆领长袖+阔腿裤 | 客厅 |
| 2 | 绿色提花 | V领裹身上衣+束脚裤 | 走廊 |
| 3 | 黄色提花 | 圆领长袖+抽绳裤 | 电梯 |
| 4 | 白色提花 | 半拉链连帽衫+罗纹裤 | 公园 |

### 面料灵物（魔毯）
- 只在段A（镜1-2）出现
- 悬浮波浪形态，随机切换四种面料纹理后飞入女主身体
- 参考图：`蓝色魔毯.png`（主要）、`黄色魔毯.png`、`绿色魔毯.png`、`白色魔毯.png`

### 变装逻辑
| 转场方式 | 触发点 | 变装结果 |
|---|---|---|
| 金光填满画面 | 段A结尾 | → 蓝色提花 |
| 水泥柱遮挡 | 段B中段 | → 绿色提花 |
| 硬切电梯内部 | 段B→C | → 黄色提花 |
| 电梯门打开 | 段C后半 | → 白色提花 |

## 视频结构

### 段A：纵向固定 — 客厅魔毯飞入（镜1-2，~5秒）

**运镜：** 固定镜头，沙发越肩背面视角
**机位：** 女主背后，沙发遮挡身体只露头部
**画面层次：** 前景地板 → 中景沙发+女主头部 → 远景墙壁

**时间轴：**
- 0-1s：客厅全景，女主被沙发挡住只露头部背面，悠闲居家白噪音+时钟滴答
- 1-3s：蓝色魔毯从镜头前方飘入，飞往女主位置，旋转几圈切换面料纹理（蓝→黄→绿→白→蓝随机），"嗖嗖"魔法音效+风铃声
- 3-5s：魔毯穿进女主身体，金光从女主位置爆发填满整个画面，"嗡"声。画面全金。

**参考图：** 蓝色魔毯、女主脸部细节图

---

### 段B：横向左移 — 走廊变装（镜3-6，~12秒）

**运镜：** 严格水平横向轨道左移，腰部略低机位
**运动规则：** 不朝镜头、不远离、不Z轴位移，速度恒定

**时间轴：**
- 0-3s：金光从画面右侧退去（镜头左移），露出穿蓝色提花家居服的女主全身，沿水平向左漫步。居家悠闲步伐。
- 3-4s：女主走到玄关门口，金毛犬正摇尾巴等候。镜头短暂停顿。
- 4-6s：女主给金毛带上狗绳，右手打开门。门框从内侧遮挡女主和金毛。镜头继续左移。
- 6-8s：画面被巨型水泥结构柱完全填满（边框贴合画面），形成天然转场遮挡。
- 8-10s：柱子退去，新场景——横向走廊（地板+墙壁+天花板）。女主+金毛从柱子右侧水平走出，**已变为绿色提花家居服**。步伐自信有节奏感。
- 10-12s：继续左移，走廊顶灯依次掠过。出现电梯门框。女主站定画面正中央，金毛在腿边，面朝左前方伸手按电梯按钮。

**参考图：** 女主4ok（蓝色）、女主3ok（绿色）、金毛三视图
**截帧关键帧：** 水泥柱满屏遮挡帧

---

### 段C：混合运镜 — 电梯段（镜7-12，~10秒）

**运镜：** 背面跟拍 → 硬切电梯内部 → 垂直下摇 → 低机位 → 60度摇镜头

**时间轴：**
- 0-2s（背面跟拍）：机位切到女主背后腰部略低。女主牵金毛走向电梯门框，电梯内部可见。电梯按键"滴"声+灵物丝绸摩擦魔法音。
- 2-5s（硬切电梯内部）：画面直接切到电梯内部。女主+金毛时尚站姿，**已变为黄色提花家居服**。展示服装3-4秒。
- 5-6s（垂直下摇）：画面切到电梯门框满屏，以上往下垂直快速旋转1s，停在楼层信号指示器特写。
- 6-7s（楼层指示）：指示器数字2→1。"叮"一声。
- 7-8s（硬切低机位）：画面切到电梯门框满屏，机位较低。
- 8-10s（开门转场）：电梯门打开。金毛先出现往镜头前方走过。女主出现，**已变为白色提花家居服**。相机后退+上摇至腰部，做右边60度摇镜头，拉远变全景，展现风和日丽公园。

**参考图：** 女主1ok（黄色）、女主2ok（白色）、金毛三视图
**截帧关键帧：** 电梯门关闭状态、电梯内部女主+金毛、楼层指示器特写、电梯门打开金毛先出

---

### 段D：横向左移+收束 — 公园（镜13-18，~8秒）

**运镜：** 严格水平横向轨道左移 → 斜左上方移动 → 灵物飞走
**机位高度：** 腰部略低

**时间轴：**
- 0-3s：女主穿白色提花家居服牵金毛水平往左漫步，公园树木随风摆动。高跟鞋踏地声与BGM鼓点重合。步伐轻松愉悦，长发随风后飘。
- 3-5s：金毛被画面外东西吸引，挣脱狗绳向左跑出画面。女主跟随。
- 5-6s：女主找到金毛——蝴蝶围着它转，金毛扑蝴蝶。
- 6-7s：镜头斜左上方移动，离开女主+金毛。灵物（光点形态）飞入画面，向远方天空飞去。
- 7-8s：灵物化作白光照亮全屏。全白画面出现乐顺LESHUN logo。短片结束。

**参考图：** 女主2ok（白色）、金毛三视图

---

## 截帧关键帧生成清单

使用 nano banana 2（有参考图）或 gpt-image2 + nano banana pro（纯文字）生成。

| 序号 | 关键帧描述 | 用途 | 生成工具 | 参考图 |
|---|---|---|---|---|
| 1 | 水泥结构柱完全填满画面，灰色混凝土纹理，边框贴合9:16画面 | 段B转场遮挡 | nano banana 2 | 无（纯材质） |
| 2 | 电梯门关闭状态，金属质感，现代公寓电梯，9:16竖屏 | 段B→C衔接 | nano banana 2 | 无 |
| 3 | 电梯内部，女主穿黄色提花家居服+金毛犬站腿边，时尚站姿，电梯内壁金属反射 | 段C内部 | nano banana 2 | 女主1ok、金毛 |
| 4 | 电梯楼层数字指示器特写，显示数字"2"，LED红色数字，金属面板 | 段C内部 | nano banana 2 | 无 |
| 5 | 电梯门从低角度打开，金毛犬头部先出现，机位在狗眼高度 | 段C转场 | nano banana 2 | 金毛 |
| 6 | 风和日丽公园全景，绿树草坪，自然光，9:16竖屏 | 段D开场 | gpt-image2 | 无 |

## Seedance2.0 提示词格式规范

参考用户提供的格式标准：

```
【场景】[环境描述]
【运镜】[严格运镜规则]
【动作】[时间轴分段动作描述]
【音效】[时间轴分段音效]
【反向锚定】[排除元素]
```

### 通用规则
- 画幅：9:16竖屏
- 风格：写实摄影，非AI生成感
- 人物一致性：服装100%与参考图一致，面料纹理细节正确
- 运镜：水平横向段严格不Z轴位移
- 参考图嵌入格式：@[图片hash] + 描述

## Seedance2.0 视频提示词

### 段A提示词

```
【场景】某小区客厅内（夜 内）。现代简约客厅，灰色水泥质感墙壁，暖色调落地灯散射柔光，沙发长度长过画面宽度，深灰色布艺沙发。地板浅色木纹。整体氛围安静慵懒。

【运镜】固定镜头，沙发越肩背面视角。镜头与沙发背面平行，高度在女主头部略高。9:16竖屏纵向景深构图。所有运动严格固定不动，无推拉摇移。

【动作】
0-1秒：画面建立。女主@[女主脸部细节图] 只从沙发上方露出头部背面，棕色卷发，看不清面部和穿着。沙发完全遮挡身体。客厅安静，远处微弱时钟滴答声。

1-3秒：蓝色魔毯@[蓝色魔毯] 从镜头前方（画面底部）飘入，悬浮飞往女主位置。魔毯在飞行过程中面料纹理随机变化——蓝色提花→黄色提花→绿色提花→白色提花→蓝色提花，每次变化间隔0.3秒，变化时面料表面光泽闪烁。魔毯飞到女主头顶上方旋转两圈。

3-4秒：魔毯向下穿入女主身体（从头顶没入），穿入瞬间女主身体位置爆发出金色光芒，光芒从中心向外扩散。

4-5秒：金光快速填满整个9:16画面，画面全金色，完全遮挡客厅场景。光芒带有细腻的粒子质感，非纯色填充。

【音效】
0-1秒：悠闲居家白噪音，微弱时钟滴答声。
1-3秒：灵物飞过"嗖嗖"魔法音效（柔和不刺耳），伴随清脆风铃声，每次面料变化伴随轻微"叮"声。
3-5秒：金光闪耀低沉"嗡"声，声音从弱到强填满画面时达到峰值。

【反向锚定】NOT cartoon NOT 3D render NOT clean studio lighting NOT vibrant saturation NOT pure white NOT pure black NOT Z-axis movement NOT camera push NOT camera pull NOT AI generated NOT artificial looking NOT bright noon lighting
```

### 段B提示词

```
【场景】1-1 某小区客厅内→玄关门口→水泥柱→横向走廊→电梯门口（夜 内）。客厅：深灰色布艺沙发，暖色调落地灯，浅色木纹地板。玄关：木门，门把手金属质感。水泥柱：巨型灰色混凝土结构柱，表面粗糙纹理，边框完全贴合画面。走廊：横向延伸，浅色地板+白色墙壁+天花板嵌入式顶灯，灯光依次排列。电梯：金属门框，现代公寓电梯。

【运镜】严格横向轨道移动镜头。镜头始终与人物平行水平距离约3米侧面。镜头水平高度在女主腰部略低。运动严格水平横向从右向左平移，不朝镜头，不远离，不Z轴位移。速度恒定约每秒1.5米。9:16竖屏。女主全身始终入镜占画面竖向约1/2。

【动作】
0-1秒：金光填满画面（承接段A结尾）。镜头开始从右向左水平移动。金光向画面右侧退去，像幕布一样从左向右揭开。

1-3秒：金光退去露出穿蓝色提花家居服@[女主4ok] 的女主全身。圆领长袖上衣+阔腿裤，浅蓝色提花面料纹理清晰。女主沿水平向左漫步，步伐悠闲。棕色卷发自然垂落。背景客厅场景随镜头左移从右向左流动。

3-4秒：女主走到玄关门口位置。金毛犬@[金毛] 正在门前摇尾巴等候，正面朝向女主。镜头短暂停顿0.5秒。

4-5秒：女主蹲下给金毛带上狗绳（红色牵引绳），右手握住门把手从里面打开木门。门框从内侧逐渐遮挡女主和金毛。

5-6秒：门框完全遮挡画面。镜头继续水平左移。画面过渡到水泥柱——巨型灰色混凝土结构柱从画面右侧进入，逐渐填满整个画面。柱子表面粗糙混凝土纹理，边框完全贴合9:16画面，无任何缝隙。

6-8秒：水泥柱完全填满画面持续1.5秒（天然转场遮挡）。柱子表面纹理清晰可见。

8-9秒：柱子从画面右侧退去，新场景从左侧显露——横向走廊。浅色地板+白色墙壁+天花板嵌入式顶灯。

9-11秒：女主+金毛从柱子右侧水平走出，**已变为绿色提花家居服@[女主3ok]**。V领裹身上衣+束脚裤，浅绿色提花面料纹理清晰。步伐充满自信与节奏感。金毛乖巧跟在身旁。走廊顶灯依次在头顶向右掠过。

11-12秒：继续左移两步，电梯金属门框从画面右侧出现。女主站定画面正中央，金毛在腿边。女主面朝左前方，右手伸出按电梯按钮（按钮不在画面内）。

【音效】
0-1秒：无（承接段A金光余韵）。
1-4秒：脚步声从无到有，室内拖鞋柔和触地声。
4-5秒：门把手金属"咔嗒"声，木门打开"吱呀"声。
5-6秒：转场"唰"一声过渡音效，脚步声环境突变为走廊空旷混响。
6-8秒：安静，走廊混响脚步声。
8-11秒：脚步声节奏加快变自信，走廊顶灯"嗡嗡"微弱电流声。
11-12秒：电梯到达"叮"一声。

【反向锚定】NOT cartoon NOT 3D render NOT clean studio lighting NOT vibrant saturation NOT pure white NOT pure black NOT Z-axis movement NOT camera push NOT camera pull NOT AI generated NOT artificial looking NOT subject stops walking mid-shot NOT Cantonese NOT modern clean environment NOT bright noon
```

### 段C提示词

```
【场景】电梯间+电梯内部+电梯门口。电梯间：现代公寓走廊电梯门前，金属门框，楼层指示器在门框上方。电梯内部：金属内壁反射，嵌顶灯光，空间紧凑。电梯门口外：低机位视角，电梯门框铺满画面上方。

【运镜】多段运镜组合：
- 0-2s：背面跟拍，机位在女主腰部略低，与女主同向移动进入电梯。
- 2-5s：硬切电梯内部固定镜头，正面略偏侧视角。
- 5-6s：硬切电梯门框满屏，垂直快速下摇（从门框上沿摇到楼层指示器）。
- 6-7s：固定特写楼层指示器。
- 7-8s：硬切电梯门框满屏，低机位固定。
- 8-10s：电梯门打开，相机后退+上摇+右边60度摇镜头拉远变全景。
9:16竖屏。

【动作】
0-1秒（背面跟拍）：画面切到女主@[女主脸部细节图] 背面，腰部略低机位。女主穿黄色提花家居服@[女主1ok] 牵金毛@[金毛] 走向电梯门框。电梯内部暖光可见。女主右手伸向电梯按钮。

1-2秒（背面跟拍）：女主按下按钮，电梯按键清脆"滴"声。女主和金毛走进电梯内部。电梯门开始关闭。

2-3秒（硬切电梯内部）：画面直接切到电梯内部正面视角。女主+金毛已站在电梯内，时尚姿态。黄色提花圆领长袖+抽绳裤，面料纹理清晰。金毛乖巧站在腿边。电梯内壁金属反射映出女主轮廓。

3-5秒（电梯内部）：女主在电梯内静止展示服装3秒。微微调整站姿，面料在电梯灯光下展现提花纹理光泽。金毛安静站立。

5-6秒（垂直下摇）：画面硬切到电梯门框铺满画面。镜头以上往下垂直快速旋转1秒，画面停在楼层信号指示器特写——LED红色数字显示"2"。

6-7秒（楼层指示）：指示器数字从"2"变为"1"，1秒过渡。"叮"一声清脆到达音。

7-8秒（硬切低机位）：画面硬切到电梯门框铺满画面。机位在较低位置（约地面30cm高度），门框占据画面上半部分。

8-9秒（开门）：电梯门从中间向两侧打开。第一画面出现金毛犬的头部——低角度仰拍，金毛鼻子朝镜头，往镜头前方走出。金毛走出画面后，出现女主的裤子特写——**已变为白色提花家居服@[女主2ok]**，半拉链连帽衫+罗纹裤，白色提花面料纹理清晰。

9-10秒（60度摇镜头）：相机边后退边向上移动，从裤子往上摇到女主腰部位置时，开始做右边60度摇镜头。镜头拉远变为全景。展现新场景：风和日丽的公园，绿树草坪，自然光。相机停在60度位置，回到横向构图。

【音效】
0-2秒：脚步声+电梯按键"滴"声，灵物轻微丝绸摩擦魔法音。
2-5秒：电梯运行低沉"嗡嗡"声，电梯内安静。
5-6秒：电梯门框快速移动"嗖"声。
6-7秒：电梯到达"叮"一声清脆。
7-8秒：安静等待。
8-10秒：电梯门打开金属滑动声，金毛爪子踏地声，脚步声从电梯混响变为户外开阔。

【反向锚定】NOT cartoon NOT 3D render NOT clean studio lighting NOT vibrant saturation NOT pure white NOT pure black NOT AI generated NOT artificial looking NOT subject stops walking NOT smiling NOT Z-axis movement NOT modern clean elevator NOT bright noon NOT Cantonese
```

### 段D提示词

```
【场景】某公园内（日 外）。风和日丽，下午柔和自然光。绿树草坪，树木随轻风摆动。背景远处可见城市建筑轮廓。地面浅色铺装路面。整体氛围明亮轻松愉悦。

【运镜】前半段（0-6s）：严格横向轨道移动镜头，从右向左水平平移。镜头与人物平行水平距离约3米侧面。腰部略低机位。速度恒定。不朝镜头，不远离，不Z轴位移。
后半段（6-8s）：镜头斜左上方移动，离开人物，向天空方向飞行。
9:16竖屏。

【动作】
0-2秒：女主@[女主脸部细节图] 穿白色提花家居服@[女主2ok] 牵金毛@[金毛] 水平往左漫步。半拉链连帽衫+罗纹裤，白色提花面料纹理清晰。步伐轻松愉悦，长发随风向后飘逸。背景公园树木随轻风摆动。高跟鞋有节奏踏地声与BGM鼓点重合。

2-4秒：继续水平左移。金毛突然被画面外左侧的东西吸引，挣脱狗绳（红色牵引绳从女主手中滑脱）。金毛向左前方加速跑出画面。女主脚步踉跄一下，差点摔倒，随即稳住。

4-5秒：女主小跑向左跟随金毛。

5-6秒：女主找到金毛。金毛正趴在地上，身边有3-5只小蝴蝶围着它转。金毛开心地扑蝴蝶，尾巴摇摆。女主站在旁边微笑看着。

6-7秒：镜头开始斜左上方移动，逐渐离开女主和金毛。人物从画面下方消失。画面只剩天空和远处建筑轮廓。灵物（微小光点形态）从画面右下角飞入，向远方天空飞去，飞行轨迹带有微弱金色尾迹。

7-8秒：灵物飞行1秒后闪烁耀眼光芒，白光从灵物位置快速扩散填满整个画面。全白画面持续0.5秒后，出现乐顺LESHUN logo图案（深灰色logo在白色背景上）。logo停留1.5秒。短片结束。

【音效】
0-2秒：高跟鞋有节奏踏地声与BGM鼓点完美重合，公园环境鸟鸣微风。
2-4秒：狗绳脱落"啪"声，金毛奔跑爪子声，女主轻微惊呼"啊"。
4-6秒：女主跑步脚步声，发现金毛后安静。蝴蝶翅膀轻微"扑扑"声，金毛开心喘气声。
6-7秒：环境声渐弱，微弱魔法"叮"声。
7-8秒：白光扩散低沉"嗡"声，logo出现时安静0.3秒后淡出。

【反向锚定】NOT cartoon NOT 3D render NOT clean studio lighting NOT vibrant saturation NOT pure white NOT pure black NOT Z-axis movement NOT camera push NOT camera pull NOT AI generated NOT artificial looking NOT subject stops walking NOT smiling when speaking NOT Cantonese NOT bright noon NOT medium close-up NOT modern clean park
```

## 生图提示词（截帧关键帧）

### 关键帧1：水泥柱满屏

nano banana 2提示词：
```
A massive concrete structural pillar filling the entire 9:16 vertical frame edge to edge. Raw gray concrete texture with visible formwork marks and surface imperfections. No gaps at frame borders. Industrial architectural element. Photorealistic, natural lighting, construction material detail.
```

### 关键帧2：电梯门关闭

nano banana 2提示词：
```
Modern apartment elevator doors closed, brushed stainless steel finish, vertical 9:16 frame. Metal frame surrounding doors, floor indicator panel above showing red LED number. Warm hallway lighting reflecting on metal surface. Photorealistic, interior architecture.
```

### 关键帧3：电梯内部女主+金毛

nano banana 2提示词（配合女主1ok参考图+金毛参考图）：
```
Young woman @[女主1ok] standing inside modern elevator with golden retriever @[金毛] at her feet. Yellow jacquard loungewear set - round neck long sleeve top + drawstring pants. Confident stylish pose, slightly turned to camera left. Elevator interior with brushed metal walls reflecting warm overhead light. Golden retriever sitting calmly beside her legs. Vertical 9:16 frame. Photorealistic fashion photography.
```

### 关键帧4：楼层指示器特写

nano banana 2提示词：
```
Extreme close-up of elevator floor indicator panel. Red LED digital number "2" on brushed metal panel. Vertical 9:16 frame filling entire shot. Industrial design, clean typography. Photorealistic macro detail shot.
```

### 关键帧5：电梯门打开金毛先出

nano banana 2提示词（配合金毛参考图）：
```
Low angle shot from dog-eye-level height. Elevator doors opening from center, golden retriever @[金毛] head emerging first, nose toward camera, walking forward out of elevator. Metal elevator door frame visible at top of frame. Warm interior elevator light spilling out. Vertical 9:16 frame. Photorealistic, dramatic low angle perspective.
```

### 关键帧6：公园全景

gpt-image2提示词：
```
Beautiful sunny park全景, lush green trees swaying in gentle breeze, well-maintained lawn, light-colored paved pathway, soft afternoon natural light, distant city building silhouettes on horizon, clear blue sky with scattered clouds. Vertical 9:16 frame. Photorealistic landscape photography, warm color temperature, peaceful atmosphere.
```
