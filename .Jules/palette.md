## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-18 - Visual Indicators in Prompts
**Learning:** Adding consistent emoji indicators (e.g., 🟢, ❌) to prompt templates significantly improves the scanability and structure of the LLM's text output for the user.
**Action:** When defining states or types in prompt templates, explicitly associate them with emojis to guide the LLM's generation.
