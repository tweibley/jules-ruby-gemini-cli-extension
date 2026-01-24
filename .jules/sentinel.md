## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2026-01-24 - Insufficient Input Validation
**Vulnerability:** The MCP server relied solely on negative validation (checking for `-`) for some inputs, allowing malformed or excessively large inputs to reach the CLI.
**Learning:** Negative validation is insufficient for security. Zod schemas for CLI wrappers must enforce strict positive validation (Regex) and explicit length limits to prevent DoS and injection risks.
**Prevention:** Define strict Regex constants for all ID-like fields and set `.max()` length limits for all string inputs in Zod schemas.
