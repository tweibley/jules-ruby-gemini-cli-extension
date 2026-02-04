## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-18 - Visual Anchors in Text Interfaces
**Learning:** Text-based LLM outputs can be dense and hard to scan. Users benefit significantly from "Visual Anchors" (emojis) mapped to finite states (like Statuses or Types).
**Action:** When designing prompts that ask for lists or status summaries, explicitly instruct the model to use specific emojis for each state to improve scannability.
