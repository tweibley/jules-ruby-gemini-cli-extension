## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2026-01-31 - Strict Schema Validation
**Vulnerability:** Loose string schemas allowed unlimited length inputs (DoS risk) and potential malformed identifiers to reach the CLI.
**Learning:** Simple "negative validation" (blocking `-`) is insufficient. "Positive validation" (allowlisting via Regex) provides much stronger guarantees for CLI wrappers.
**Prevention:** Enforce strict Regex patterns for all resource IDs (e.g., `^sources\/`) and explicit `.max()` length limits on all string inputs in Zod schemas.
