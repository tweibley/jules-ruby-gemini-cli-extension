## 2025-01-26 - [DoS Prevention via Input Length Limits]
**Vulnerability:** The MCP server lacked input length validation on user-controlled strings (prompts, session IDs, etc.), potentially allowing Denial of Service (DoS) via resource exhaustion or buffer overflows.
**Learning:** Zod's `.refine()` returns a `ZodEffects` object which hides underlying type methods. Order matters: `z.string().max(N).refine(...)` works, but `z.string().refine(...).max(N)` throws a TypeError at runtime.
**Prevention:** Always place type-specific validators (like `.max()`, `.email()`) before generic `.refine()` calls. Enforce explicit length limits on all user inputs exposed to external processes.
