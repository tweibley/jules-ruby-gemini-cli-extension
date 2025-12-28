## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-18 - Uncontrolled Resource Consumption (DoS)
**Vulnerability:** The MCP server exposed public-facing endpoints without input length validation. A malicious actor could provide extremely large strings (e.g., 100MB prompt), causing memory exhaustion or buffer overflows in the Node.js server or the underlying Ruby CLI.
**Learning:** Zod schemas are insufficient if they only check types. For string inputs on public interfaces, explicit `.max()` limits are mandatory to prevent resource exhaustion attacks.
**Prevention:** Enforce strict length limits on all string inputs using Zod's `.max()` validator. Define constants for these limits (e.g., `MAX_PROMPT_LENGTH = 50000`) to ensure consistency.
