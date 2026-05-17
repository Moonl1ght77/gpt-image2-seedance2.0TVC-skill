# NotebookLM Skill — AI 查询 NotebookLM 文档

> 来源：https://github.com/PleasePrompto/notebooklm-skill
> 类型：Claude Code Skill（⚠️ 仅限 Claude Code，Windsurf 不兼容）

## 这是什么

让 AI 直接查询你的 Google NotebookLM 笔记本，获得**基于文档的、有引用的回答**。
- 上传文档到 NotebookLM（PDF、网页、视频等）
- AI 自动打开浏览器查询 NotebookLM
- 获得 Gemini 基于你文档的回答，大幅减少幻觉

## 为什么 Windsurf 用不了

此 skill 需要：
1. Claude Code 的 Skill 框架（SKILL.md hooks 机制）
2. 本地 Python 浏览器自动化（Patchright）
3. Claude Code 特有的脚本执行能力

Windsurf (Cascade) 不支持这些功能。

## 替代方案

如果你想在项目中使用 NotebookLM：
1. 直接在浏览器中使用 NotebookLM，手动复制回答给我
2. 等待 NotebookLM 推出官方 MCP 支持（那时可以配到 Windsurf）

## 核心价值（参考）

- 减少 AI 幻觉：回答仅来自你上传的文档
- 节省 token：不用把整个文档喂给 AI
- 多文档关联：跨 50+ 文档综合回答

## 许可证

MIT
