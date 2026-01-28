## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2026-02-18 - Visual Anchors in Text Interfaces
**Learning:** In text-heavy LLM outputs, users struggle to scan for status or state. Consistent emoji usage acts as a visual anchor, allowing rapid skimming without reading every word.
**Action:** Always map finite state lists (like statuses, activity types) to distinct, semantically appropriate emojis in prompt templates.
