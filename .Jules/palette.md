## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-19 - Visual Scannability in LLM Outputs
**Learning:** Text-only lists of states are hard to scan quickly in LLM interfaces. Emoji indicators act as visual anchors, allowing users to instantly recognize status without reading.
**Action:** When designing prompt templates for status listings, always provide an explicit emoji legend for the LLM to use.
