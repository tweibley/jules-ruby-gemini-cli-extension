## 2025-12-18 - [Buffer handling in Node.js spawn]
**Learning:** When handling stdout from spawned processes in Node.js, `stdout.setEncoding('utf8')` is not only safer for multi-byte characters but also significantly faster than manually collecting chunks and converting them (or concatenating strings from buffers) for large outputs in V8.
**Action:** Always use `setEncoding('utf8')` for text streams from child processes unless raw binary data is explicitly required.

## 2025-02-12 - [String Concatenation vs Array Join]
**Learning:** Using `+=` to concatenate strings in a loop (or event handler) creates a new string object for each chunk, which causes unnecessary memory pressure and garbage collection overhead for large outputs. Accumulating chunks in an array and using `join('')` at the end is more memory efficient and performant.
**Action:** Use `array.push()` and `join('')` for collecting stream data.
