## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-20 - DoS via Missing Length Limits and Regular Expressions
**Vulnerability:** The MCP server exposed tools with unbounded string inputs, allowing potential Denial of Service (DoS) attacks via memory exhaustion or excessive processing time.
**Learning:** Zod `string()` schemas default to allowing infinite length. CLI wrappers can be vulnerable to resource exhaustion if inputs are not constrained.
**Prevention:** Enforce strict `.max()` length limits (e.g., 256 for IDs, 25k for prompts) on all string inputs. Use strict Regex allowing-listing (`^...$`) for structured identifiers like sources and sessions.
