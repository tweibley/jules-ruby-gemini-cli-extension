## 2025-12-18 - Argument Injection and Env Leakage
**Vulnerability:** The MCP server passed unsanitized user inputs to a CLI tool (`jules-ruby`) and leaked all environment variables to the child process.
**Learning:** Even when using `spawn` to avoid shell injection, argument injection is possible if user inputs can be interpreted as flags (starting with `-`). Also, passing full `process.env` violates least privilege.
**Prevention:** Validate inputs to ensure they don't start with `-` when used as command arguments. Use an explicit allowlist for environment variables passed to child processes.

## 2025-12-21 - Missing Environment Validation (Fail Securely)
**Vulnerability:** The MCP server wrapper allowed execution to proceed even when the critical `JULES_API_KEY` was missing from the environment. This could lead to undefined behavior or obscure errors from the underlying tool.
**Learning:** "Fail Securely" means validating the execution environment *before* attempting potentially sensitive or complex operations. Wrapper tools must enforce the prerequisites of the tools they wrap.
**Prevention:** Explicitly check for required environment variables (like API keys) at the entry point and reject execution with a clear, safe error message if they are missing.
