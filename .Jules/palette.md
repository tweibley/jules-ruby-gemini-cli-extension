## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-18 - Visual consistency in text-based AI prompts
**Learning:** Adding consistent emoji indicators to text-based lists in system prompts significantly improves the human-readability of the AI's final output, as the model tends to mirror the structure provided in the prompt.
**Action:** Use emojis to denote state or category in prompts where the output is expected to be a list or summary.
