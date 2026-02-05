## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2026-02-05 - Visual Anchors in Text Interfaces
**Learning:** In text-heavy LLM interfaces, mapping finite states to specific emojis (visual anchors) significantly improves scannability.
**Action:** Always provide explicit "State -> Emoji" mappings in system prompts for lists and summaries.
