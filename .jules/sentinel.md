## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-18 - Input Trimming for Argument Injection
**Vulnerability:** Zod `refine(val => !val.startsWith('-'))` checks could be bypassed by prefixing the input with whitespace (e.g., `" -flag"`). CLI parsers often trim args or interpret them as values, but if passed to a command that parses its own args or if the wrapper logic is flawed, this could lead to argument injection.
**Learning:** Input validation must occur *after* sanitization/normalization. Always trim string inputs before validating content, especially when checking for prefix-based constraints.
**Prevention:** Use `.trim()` before `.refine()` in Zod schemas for CLI argument wrappers.
