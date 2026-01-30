## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2025-12-18 - [String.trim() vs JSON.parse()]
**Learning:** `String.prototype.trim()` creates a new string allocation, which can be expensive (O(N)) for large strings (e.g., 10MB+). Since `JSON.parse()` natively ignores whitespace, trimming before parsing is redundant and wasteful.
**Action:** When handling large JSON outputs (e.g., from CLI tools), avoid calling `.trim()` if the destination is `JSON.parse()`.
