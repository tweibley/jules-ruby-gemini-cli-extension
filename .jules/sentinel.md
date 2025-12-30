## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-01-28 - Unbounded String Inputs
**Vulnerability:** The MCP server accepted arbitrarily long strings for fields like `prompt`, `source`, and `session_id`, creating a potential Denial of Service (DoS) vector via memory exhaustion or excessive argument size.
**Learning:** Zod schemas for external input must always define maximum length constraints (`.max()`) to reject malformed or malicious payloads early.
**Prevention:** Enforce strict length limits (`MAX_PROMPT_LENGTH`, `MAX_TITLE_LENGTH`, `MAX_ID_LENGTH`) on all string inputs at the schema level.
