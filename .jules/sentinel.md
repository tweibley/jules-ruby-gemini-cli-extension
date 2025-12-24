## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-24 - Input Sanitization Bypass via Whitespace
**Vulnerability:** The Zod schema check `!val.startsWith('-')` could be bypassed by prepending whitespace (e.g., `" -flag"`). If the downstream tool trims inputs, this could lead to argument injection.
**Learning:** Validation checks on string content (like checking prefixes) must be performed *after* canonicalization (like trimming whitespace).
**Prevention:** Always use `.trim()` in Zod schemas before applying content-based refinements like `startsWith` or regex checks.
