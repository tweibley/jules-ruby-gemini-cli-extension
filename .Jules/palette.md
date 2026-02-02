## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-18 - Visual Anchors for Finite State Lists
**Learning:** Finite state lists (e.g., statuses) in text-based LLM outputs are significantly easier to scan when mapped to distinct, semantically appropriate emojis.
**Action:** When designing prompts that output lists of states or types, explicitly request emoji indicators to serve as visual anchors.
