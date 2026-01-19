## 2024-05-22 - [String Concatenation vs Array Join]
**Learning:** In V8 (Node.js), `string += chunk` is significantly faster (orders of magnitude) than collecting chunks in an array and joining them (`arr.push(chunk); arr.join('')`) for large text streams. This is due to V8's "rope" string optimization.
**Action:** Prefer string concatenation for accumulating text output from child processes or streams.

## 2024-05-22 - [Child Process Stdio]
**Learning:** Using `stdio: ['ignore', 'pipe', 'pipe']` when spawning child processes that don't need stdin input saves a file descriptor and prevents potential hanging if the child process accidentally reads from stdin.
**Action:** Always set `stdin` to 'ignore' for non-interactive child processes.
