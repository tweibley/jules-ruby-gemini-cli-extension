## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-19 - Visual Anchors in Text Interfaces
**Learning:** Text-based LLM outputs can be hard to scan. Using consistent emojis as visual anchors for states (e.g., status, types) significantly improves readability and user orientation.
**Action:** Always map finite state lists in prompt templates to semantic emojis to create a predictable visual language.
