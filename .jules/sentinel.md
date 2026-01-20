## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-05-22 - Loose Input Validation
**Vulnerability:** Zod schemas only checked for flag injection (`!startsWith('-')`) but allowed arbitrary strings for structured identifiers like `session_id` and `source`.
**Learning:** Preventing flag injection is not enough; inputs should be validated against their expected strict format (Regex) to prevent malformed data from reaching the core logic.
**Prevention:** Use Zod's `.regex()` to enforce strict patterns (e.g., `^\d+$`, `^sources\/...`) for all identifier fields.
