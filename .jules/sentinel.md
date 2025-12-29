## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-18 - Input Length Validation
**Vulnerability:** The MCP server lacked length limits on input strings (prompts, titles, IDs), potentially exposing the system to Denial of Service (DoS) attacks via memory exhaustion or buffer overflow in the underlying Ruby tool.
**Learning:** Zod schemas should always include `.max()` constraints for string inputs to reject malicious payloads early.
**Prevention:** Enforce strict maximum lengths for all string inputs: `MAX_PROMPT_LENGTH` (50000), `MAX_TITLE_LENGTH` (1000), and `MAX_ID_LENGTH` (256).
