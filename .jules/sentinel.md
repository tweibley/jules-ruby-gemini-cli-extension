## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-18 - High Severity Dependencies
**Vulnerability:** `npm audit` revealed high severity vulnerabilities in `@modelcontextprotocol/sdk` (ReDoS), `hono` (JWT Auth Bypass), and `qs` (DoS).
**Learning:** Even seemingly "internal" tools can expose high-severity risks via dependencies. Regular audit checks are essential. Transitive dependencies (like `qs` used by `express` used by `sdk`) require careful management to ensure they are updated.
**Prevention:** Regularly run `npm audit` and update dependencies.
