# Claude Context — 语义代码搜索 MCP 服务器

> 来源：https://github.com/zilliztech/claude-context
> 类型：MCP 服务器（非传统 skill，无 SKILL.md）

## 这是什么

**Claude Context** 是一个 MCP 插件，为 Claude Code、Windsurf 等 AI 编码助手添加**语义代码搜索**能力，让 AI 能深度理解你的整个代码库。

### 核心功能
- **整个代码库作为上下文** — 使用语义搜索从数百万行代码中找到相关代码
- **节省成本** — 不用每次把整个目录加载到 AI，而是存入向量数据库，只使用相关代码
- **混合搜索** — BM25 + 稠密向量搜索
- **增量索引** — 使用 Merkle 树，只重新索引变更的文件
- **智能代码分块** — 基于 AST（抽象语法树）分析代码

### 可用工具
1. `index_codebase` — 索引代码库目录
2. `search_code` — 用自然语言搜索已索引的代码库
3. `clear_index` — 清除特定代码库的搜索索引
4. `get_indexing_status` — 获取索引状态

## 前置条件

1. **Zilliz Cloud 账号**（免费向量数据库）：https://cloud.zilliz.com/signup
2. **OpenAI API Key**（用于 embedding 模型）：https://platform.openai.com/api-keys
3. **Node.js >= 20.0.0**

## Windsurf 配置

在 Windsurf 的 MCP 配置中添加：

```json
{
  "mcpServers": {
    "claude-context": {
      "command": "npx",
      "args": ["-y", "@zilliz/claude-context-mcp@latest"],
      "env": {
        "OPENAI_API_KEY": "your-openai-api-key",
        "MILVUS_ADDRESS": "your-zilliz-cloud-public-endpoint",
        "MILVUS_TOKEN": "your-zilliz-cloud-api-key"
      }
    }
  }
}
```

## 使用方法

1. 在 AI 助手中索引代码库：`Index this codebase`
2. 检查索引状态：`Check the indexing status`
3. 开始搜索：`Find functions that handle user authentication`

## 支持的技术

- **Embedding 提供商**：OpenAI、VoyageAI、Ollama、Gemini
- **向量数据库**：Milvus 或 Zilliz Cloud
- **支持语言**：TypeScript、JavaScript、Python、Java、C++、C#、Go、Rust、PHP、Ruby、Swift、Kotlin、Scala、Markdown

## 许可证

MIT
