## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-18 - Visual Anchors for Finite States
**Learning:** Text-based interfaces can be hard to scan. Mapping finite state lists (like status or activity types) to distinct, semantically appropriate emojis acts as a visual anchor, making the output much faster to parse.
**Action:** Always provide an explicit emoji mapping for state enums in prompts to guide the LLM's output.
