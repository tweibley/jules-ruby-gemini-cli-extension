## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-19 - Visual Anchors in Text Interfaces
**Learning:** In text-heavy LLM outputs, emojis serve as critical visual anchors that allow users to scan state/status instantly without reading every word.
**Action:** Always map finite state lists (like statuses) to distinct, semantically appropriate emojis in prompt templates.
