## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2025-12-18 - Preventative Input Validation for AI Agents
**Learning:** Enforcing length limits and format constraints (like regex for IDs) in the input schema prevents wasted API calls and provides immediate, actionable feedback to the AI.
**Action:** Always add `.max()` and regex `.refine()` to Zod schemas for string inputs, mirroring backend constraints.
