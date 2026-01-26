## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-23 - Missing Input Validation Gap
**Vulnerability:** Input schemas lacked length limits (DoS risk) and strict format validation, despite documentation claiming otherwise.
**Learning:** Security controls described in documentation or memory can drift from implementation. Always verify "known" controls with tests.
**Prevention:** Add explicit unit tests for security boundaries (e.g., max length, invalid formats) to catch regressions and implementation gaps.
