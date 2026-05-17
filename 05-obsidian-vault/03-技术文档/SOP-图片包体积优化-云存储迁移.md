---
tags: [SOP, 微信小程序, 模板代码, 云开发, 性能优化]
date: 2026-05-10
---

# SOP｜大图包体积优化 + 云存储迁移

## 痛点背景

微信小程序本地包有 **2MB 限制**，AI 生成图片动辄 2-3MB，直接放 assets 会导致编译失败或真机无法调试。

---

## 优化前后对比

| 项目 | 优化前 | 优化后 |
|------|--------|--------|
| assets 包体积 | ~6.6 MB（有两张超大 PNG） | **0.87 MB** ✅ |
| series-banner.png | 2.8MB 放本地 | 上传云存储，用 `cloud://` 路径 |
| divider-fabric.png | 3.2MB 放本地（未使用） | 直接删除 |
| logo-divider.png | 481KB 放本地 | 保留本地（可接受） |

---

## 操作流程

### Step 1：识别超大文件
```powershell
Get-ChildItem "assets" -Recurse -File |
  Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1KB,1)}} |
  Sort-Object Length -Descending
```

### Step 2：把大图移到云上传目录（不压缩，保原质量）
```python
import shutil, os
shutil.copy2('assets/series-banner.png', '06-misc/cloud-upload/series-banner.png')
os.remove('assets/series-banner.png')
```

### Step 3：微信开发者工具上传
1. 云开发 → 存储 → 上传文件
2. 选择 `06-misc/cloud-upload/` 下的文件
3. 上传路径按需填写（如 `images/series-banner.png`）
4. 上传后记录 File ID

### Step 4：代码路径替换
```xml
<!-- 原来 -->
<image src="/assets/series-banner.png" />

<!-- 替换为（路径 = 云控制台显示的 File ID） -->
<image src="cloud://cloud1-d3gfhziqx2f5af184.636c-cloud1-d3gfhziqx2f5af184-1426822045/series-banner.png" />
```

> ⚠️ **注意**：上传时如果没有建子目录，路径就是 `文件名.png`，不要多写 `images/`。

---

## 避坑记录

- 云存储文件 ID 里含有环境 ID 和存储桶名，格式固定，不能随意更改
- 本地开发模式可以直接用 `cloud://` 路径，无需 `getTempFileURL`（详情页/首页加载）
- 图片不要压缩降质量，直接原图上传云存储，加载速度由 CDN 保证

---

## 交付 Checklist

- [ ] 确认 assets 总体积 < 1.5MB
- [ ] 真机调试确认云图片正常显示（需连接云开发）
- [ ] 检查代码里没有残留的 `/assets/超大文件.png` 引用
