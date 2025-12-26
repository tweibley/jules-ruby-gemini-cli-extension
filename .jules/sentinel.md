## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-01-02 - Loose Input Validation
**Vulnerability:** Input validation relied solely on `!val.startsWith('-')`, leaving the application vulnerable to garbage inputs or potential DoS via unlimited string lengths.
**Learning:** Negative validation (blocking bad things) is insufficient; positive validation (allowing only good things) is safer. Zod schemas can be reused to enforce strict patterns across multiple tools.
**Prevention:** Use strict regex-based allow-lists for structured inputs (IDs, branch names) and enforce length limits (`.max()`) on all string inputs to prevent DoS.
