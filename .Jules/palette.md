## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2026-01-21 - Visual Scannability in Text-Based UIs
**Learning:** Text-based LLM interfaces (like this CLI extension) benefit significantly from consistent visual anchors (emojis) for states and types. This improves scannability without requiring a GUI.
**Action:** Use consistent emoji prefixes for state enums and list items in prompt templates to help users quickly parse large blocks of text.
