## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2026-02-02 - Missing Length Limits and Format Validation
**Vulnerability:** MCP tools exposed to LLMs lacked input length limits and strict format validation, creating a DoS risk and potential for path traversal or logic errors.
**Learning:** Zod schemas for MCP tools must include explicit `.max()` constraints as defense-in-depth against large LLM outputs. Positive validation (strict regex) is safer than negative validation (blocking `-`) alone.
**Prevention:** Always enforce `.max(N)` and specific `.regex(R)` patterns for string inputs in MCP tool definitions.
