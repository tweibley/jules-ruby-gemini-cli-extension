## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-19 - Missing Schema Implementation
**Vulnerability:** Input validation schemas lacked the strict regex patterns and length limits defined in the security policy, potentially allowing DoS or malformed data injection.
**Learning:** Security policies in documentation are not self-enforcing. Discrepancies between policy (strict regex) and implementation (loose checks) are common security gaps.
**Prevention:** Explicitly audit code against security policy documents to ensure all defined constraints (Regex, Max Length) are implemented in Zod schemas.
