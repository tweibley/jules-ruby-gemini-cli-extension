## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2026-01-25 - [Avoiding Redundant Trimming for JSON]
**Learning:** `JSON.parse` natively ignores leading/trailing whitespace. Trimming large output strings (e.g. from CLI tools) before parsing them creates unnecessary string allocations and CPU overhead (~80ms for 10MB in V8).
**Action:** Pass raw, untrimmed output directly to `JSON.parse` whenever possible to avoid the intermediate string copy.
