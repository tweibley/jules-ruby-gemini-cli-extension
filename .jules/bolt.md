## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2026-01-23 - [Redundant string trimming before JSON parsing]
**Learning:** `String.prototype.trim()` on large strings (e.g., 10MB) forces a new string allocation and copy, costing ~100ms+. `JSON.parse()` handles leading/trailing whitespace natively, so trimming is redundant and wasteful when the output is destined for parsing.
**Action:** Skip `.trim()` when the string is immediately passed to `JSON.parse()`, especially for large CLI outputs.
