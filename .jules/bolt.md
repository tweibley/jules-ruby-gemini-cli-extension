## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.
## 2026-01-22 - Skipping trim() for JSON outputs
**Learning:** In V8/Node.js, `String.prototype.trim()` on large strings (e.g., 10MB) creates a new string allocation, which is significantly slower (~150ms vs ~15ms) than passing untrimmed strings to `JSON.parse()`.
**Action:** When handling large JSON outputs from child processes where surrounding whitespace is irrelevant (like `JSON.parse`), skip the `trim()` step to save memory and CPU.
