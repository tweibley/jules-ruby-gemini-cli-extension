## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-18 - Input Validation Weakness
**Vulnerability:** MCP tools relied on "negative validation" (blocking inputs starting with `-`) to prevent argument injection, but accepted malformed IDs or paths that could theoretically be exploited or cause errors.
**Learning:** Negative validation is insufficient. Structured inputs (IDs, paths) should always use "positive validation" (allow-lists via Regex) to strictly enforce expected formats.
**Prevention:** Use Zod `.regex()` to enforce strict patterns for all structured inputs in MCP tool definitions.
