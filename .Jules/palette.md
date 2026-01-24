## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-02-18 - Visual Anchors for State Lists
**Learning:** In text-based interfaces, finite state lists (like status or activity types) are hard to scan quickly. Emojis act as effective visual anchors that help users distinguish between states at a glance.
**Action:** Always map finite state enums to distinct, semantic emojis in text outputs or prompt templates.
