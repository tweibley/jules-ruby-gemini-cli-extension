## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2026-01-26 - [JSON Parsing and String Trimming]
**Learning:** `JSON.parse()` automatically ignores leading and trailing whitespace. Trimming a large string (e.g., 10MB) before parsing it is redundant and expensive (~85ms overhead + memory allocation).
**Action:** When parsing JSON from a trusted source (like a CLI tool output), skip `.trim()` to save CPU and memory.
