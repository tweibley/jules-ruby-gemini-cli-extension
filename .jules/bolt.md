## 2024-05-23 - JSON Output Optimization
**Learning:** For MCP servers consumed by LLMs, raw minified JSON is superior to pretty-printed JSON. It reduces token usage for the LLM and saves CPU cycles by avoiding re-serialization.
**Action:** When implementing MCP tools that return JSON, validate the JSON with `JSON.parse` but return the original string if possible.
