# OpenSRE — AI SRE 智能运维框架

> 来源：https://github.com/Tracer-Cloud/opensre
> 类型：独立 CLI 工具/框架（非 skill，无 SKILL.md）

## 这是什么

**OpenSRE** 是一个开源的 AI SRE（站点可靠性工程）智能体框架，用于**自动化生产事故调查和响应**。当生产环境出问题时，它能自动从日志、指标、链路追踪中收集证据，找到根因并给出修复建议。

## 核心能力

- **结构化事故调查** — 跨所有信号源的关联根因分析
- **Runbook 感知推理** — 自动读取并应用你的运维手册
- **预测性故障检测** — 在问题触发告警之前发现隐患
- **证据支撑的根因** — 每个结论都关联到底层数据
- **LLM 灵活选择** — 支持 Anthropic、OpenAI、Ollama、Gemini、OpenRouter、NVIDIA NIM

## 工作流程

当告警触发时，OpenSRE 自动：
1. **获取** 告警上下文及相关日志、指标、链路
2. **推理** 跨系统识别异常
3. **生成** 结构化调查报告，包含可能的根因
4. **建议** 下一步操作，可选自动修复
5. **推送** 摘要到 Slack 或 PagerDuty

## 集成生态（60+ 工具）

| 类别 | 工具 |
|------|------|
| **AI/LLM** | Anthropic、OpenAI、Ollama、Gemini、OpenRouter、NVIDIA NIM、Bedrock |
| **可观测性** | Grafana、Datadog、Honeycomb、Coralogix、CloudWatch、Sentry、Elasticsearch |
| **基础设施** | Kubernetes、AWS (S3/Lambda/EKS/EC2)、GCP、Azure |
| **数据库** | MongoDB、ClickHouse、PostgreSQL、MySQL、MariaDB |
| **数据平台** | Airflow、Kafka、Spark、Prefect、RabbitMQ |
| **事故管理** | PagerDuty、Opsgenie、Jira |
| **通信** | Slack、Google Docs |
| **协议** | MCP、ACP、OpenClaw |

## 与我们项目的关系

OpenSRE 是一个面向**服务器运维/SRE 团队**的工具，主要用于生产环境事故响应。对于微信小程序开发项目来说，**暂时用不上**——它更适合有复杂后端基础设施（Kubernetes、AWS 等）的团队。

作为参考资料保留在此，未来如果后端服务上线并需要运维监控时可以考虑引入。

## 许可证

Apache 2.0
