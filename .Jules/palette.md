## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-19 - Visual Anchors for State Lists
**Learning:** Finite state lists (e.g., statuses) in text-based LLM outputs are difficult to scan quickly. Mapping them to distinct, semantically appropriate emojis acts as a visual anchor, improving scannability.
**Action:** When designing LLM prompt templates that output lists of items with states, always explicitly map each state to a unique emoji indicator.
