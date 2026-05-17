# Excalidraw MCP Server — AI 画图技能

> 来源：https://github.com/yctimlin/mcp_excalidraw
> 类型：MCP 服务器 + Agent Skill（有 SKILL.md）

## 这是什么

让 AI 助手通过 MCP 协议控制一个 **Excalidraw 实时画布**，实现：
- 程序化创建、编辑、精调图表（26 个 MCP 工具）
- AI 能"看到"自己画的东西（截图 + 场景描述），实现迭代优化
- 导入/导出 .excalidraw 文件、PNG/SVG 图片
- Mermaid 图转 Excalidraw
- 快照与回滚

## 前置条件

- Node.js >= 18
- npm

## 安装与启动

```bash
# 克隆并构建
git clone https://github.com/yctimlin/mcp_excalidraw && cd mcp_excalidraw
npm ci && npm run build

# 启动画布服务器
PORT=3000 npm run canvas
# 然后浏览器打开 http://127.0.0.1:3000
```

## Windsurf MCP 配置

在 Windsurf 的 MCP 设置中添加：

```json
{
  "mcpServers": {
    "excalidraw": {
      "command": "node",
      "args": ["/path/to/mcp_excalidraw/dist/index.js"],
      "env": {
        "EXPRESS_SERVER_URL": "http://127.0.0.1:3000",
        "ENABLE_CANVAS_SYNC": "true"
      }
    }
  }
}
```

注意把 `/path/to/mcp_excalidraw` 替换为实际的克隆路径。

## 26 个 MCP 工具

| 类别 | 工具 |
|------|------|
| **元素 CRUD** | create_element, get_element, update_element, delete_element, query_elements, batch_create_elements, duplicate_elements |
| **布局** | align_elements, distribute_elements, group_elements, ungroup_elements, lock_elements, unlock_elements |
| **场景感知** | describe_scene, get_canvas_screenshot |
| **文件 I/O** | export_scene, import_scene, export_to_image, export_to_excalidraw_url, create_from_mermaid |
| **状态管理** | clear_canvas, snapshot_scene, restore_snapshot |
| **视口** | set_viewport |
| **设计指南** | read_diagram_guide |
| **资源** | get_resource |

## 许可证

MIT
