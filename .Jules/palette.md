## 2025-12-18 - Improved Error Clarity for MCP Tools
**Learning:** AI agents rely heavily on error messages to self-correct. Generic "exit code 1" errors provide no context for recovery.
**Action:** When wrapping CLI tools for AI consumption, parse common error codes (like ENOENT) into actionable instructions (e.g., "Install the tool").

## 2024-05-22 - Visual Scannability in Text-Based Interfaces
**Learning:** Even in text-only LLM interfaces, visual markers (emojis) significantly improve the "glanceability" of structured data like status lists. LLMs reliably follow formatting instructions that map states to visual icons.
**Action:** Use consistent emoji sets for state enums in prompt templates to create a pseudo-UI experience.
