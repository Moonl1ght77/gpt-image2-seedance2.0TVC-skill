# 面料 3D 服装导出工具

独立后台工具：上传或选择面料图，生成家居服套装 3D 预览，并导出独立站可用的文件包。

## 运行

```bash
npm install
npm run dev
```

## 导出内容

导出的 zip 包包含：

- `model.glb`
- `preview-front.png`
- `preview-3q.png`
- `texture.png`
- `material.json`
- `embed.html`
- `model-viewer.min.js`

`embed.html` 使用本地 `model-viewer.min.js`，不需要付费模型 API。

## 说明

第一版是电商展示级模型：用规则算法将面料图处理成重复贴图、伪法线和材质参数，再贴到固定家居服套装模板上。它不是服装打版文件，也不是真实布料物理仿真。本地 AI 接口已在 `src/aiAdapter.ts` 预留，默认关闭。
