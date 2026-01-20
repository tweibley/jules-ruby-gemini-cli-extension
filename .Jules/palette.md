## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-05-15 - Visual State Indicators in Text Prompts
**Learning:** Text-only LLM outputs can be dense and hard to scan. Explicitly mapping states to icons improves readability.
**Action:** In prompt templates, provide a visual legend (e.g., "⚪ QUEUED", "✅ COMPLETED") to guide the LLM's output format.
