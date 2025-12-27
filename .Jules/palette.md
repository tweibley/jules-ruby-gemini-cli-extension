## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-18 - Visual Scanning in Text UIs
**Learning:** For text-based agent outputs (like CLI lists or status updates), adding consistent emoji indicators (e.g., 🟢 for active, ⚫ for queued) significantly improves scanability and helps users quickly identify actionable items.
**Action:** Include specific emoji indicators in prompt templates (TOML) to ensure the LLM consistently formats lists and statuses with visual cues.
