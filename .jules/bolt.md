## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2025-12-18 - [String.prototype.trim() Cost on Large Strings]
**Learning:** `String.prototype.trim()` on large strings (e.g., 10MB) creates a new string allocation, costing significantly more time (~115ms vs ~15ms) than passing untrimmed strings to `JSON.parse`. `JSON.parse` handles whitespace gracefully, so trimming is often redundant.
**Action:** Avoid trimming large strings if the consumer (like `JSON.parse`) can handle whitespace.
