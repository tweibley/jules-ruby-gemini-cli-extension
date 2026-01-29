## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-19 - Visual Anchors in Text-Based UIs
**Learning:** In text-only interfaces (like LLM chats), users struggle to scan dense lists of states or types. Standard emojis act as "visual anchors" that dramatically improve scannability without needing a GUI.
**Action:** For any finite state list (statuses, types) in a text output, map each state to a distinct, semantically appropriate emoji.
