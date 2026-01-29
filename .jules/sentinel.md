## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-19 - DoS via Unbounded Inputs
**Vulnerability:** The MCP server accepted unbounded string inputs for prompts and IDs, creating a risk of Denial of Service (DoS) via memory exhaustion or buffer overflow in downstream components.
**Learning:** Zod `string()` validation is insufficient without explicit `.max()` limits. Flexible validation (e.g., just checking for hyphens) leaves room for malformed inputs that might crash the underlying CLI or server.
**Prevention:** Enforce strict length limits (`.max()`) and precise format validation (`.regex()`) for all external inputs, especially for known identifiers like Session IDs and Source names.
