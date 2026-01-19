## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2026-01-19 - [Avoid redundant JSON serialization]
**Learning:** In `execJulesJsonForMcp`, parsing valid JSON output just to re-serialize it with `JSON.stringify` for formatting was a significant bottleneck (~2.4x slower). Returning the valid JSON string directly saves CPU cycles and memory allocations, especially for large payloads.
**Action:** When forwarding JSON from a CLI tool to an API response, validate via `JSON.parse` but return the original string if re-formatting is not strictly required.
