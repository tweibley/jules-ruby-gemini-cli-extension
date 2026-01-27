## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-05-22 - Emoji Anchors for Text UI
**Learning:** Text-based LLM interfaces lack visual hierarchy. Users struggle to parse long lists of states or types without visual anchors.
**Action:** Always map finite state lists (like session statuses) to distinct, semantic emojis in the system prompt to create scannable "icons".
