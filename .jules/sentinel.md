## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-19 - MCP Input Validation Strategy
**Vulnerability:** Relying solely on negative validation (blocking `-`) for CLI arguments is insufficient against malformed inputs or DoS via long strings.
**Learning:** MCP tools expose a direct attack surface. Zod schemas must act as a strict firewall, enforcing "positive validation" (regex allowlists) and resource limits (length caps) before execution.
**Prevention:** Define explicit regex patterns (e.g., `REGEX_SESSION_ID`) and `.max()` limits for all MCP tool inputs.
