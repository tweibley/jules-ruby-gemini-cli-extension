## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2026-01-04 - Strict Input Validation for Identifiers
**Vulnerability:** Loose string validation for `source` and `session_id` allowed malformed inputs to be passed to the underlying CLI tool, potentially causing unexpected behavior or errors.
**Learning:** Validating only against starting with `-` is insufficient for structured identifiers. Strict regex validation ensures only expected formats reach the core logic, acting as a first line of defense.
**Prevention:** Use `z.regex()` to enforce strict patterns for known identifier formats (e.g., `^sources\/...`, `^(sessions\/)?\d+$`).
