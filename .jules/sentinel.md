## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-05-23 - Unbounded Input Lengths
**Vulnerability:** Zod string schemas accepted inputs of infinite length (e.g., 10MB+), posing a Denial of Service (DoS) risk via resource exhaustion.
**Learning:** Default validation (e.g., regex via `.refine`) does not imply length limits. Explicit bounds are necessary for all external inputs.
**Prevention:** Always chain `.max(N)` to Zod string schemas *before* other refinements to fail fast and prevent memory exhaustion.
