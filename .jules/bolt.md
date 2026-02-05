## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2024-05-23 - [Trim on Large Strings]
**Learning:** `String.prototype.trim()` on large strings (e.g., 10MB) in V8 is expensive because it creates a new string allocation. For JSON output, `JSON.parse` handles whitespace natively, making `trim()` redundant and costly (~40ms overhead for 10MB).
**Action:** Avoid trimming large output strings if they are destined for `JSON.parse`. Added `trimOutput` option to `execJules` to control this.
