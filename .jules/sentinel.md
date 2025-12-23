## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-23 - Argument Injection Bypass via Whitespace
**Vulnerability:** Input validation checks `!val.startsWith('-')` could be bypassed by prefixing the input with whitespace (e.g., `" -flag"`).
**Learning:** Simple string matching checks can be brittle. Zod's transformation order matters: standardizing input (like trimming) should happen *before* validation rules.
**Prevention:** Always use `.trim()` on string inputs that are used as command arguments to ensure the validation logic sees the actual value that will be used.
