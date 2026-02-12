export const HOVER_DOCS: { [key: string]: string } = {
    // ATTRIBUTES
    "@no_gc": "### Attribute: `@no_gc`\n---\nSuspends the Garbage Collector for the duration of this function.\n\n**Usage:** Provides access to manual memory primitives like `alloc`, `store`, `load`, and `free` (Value-based) or `std.bytes` (Byte-based). Useful for real-time graphics, audio, or performance-critical loops.",
    "@inline": "### Attribute: `@inline`\n---\nHint to the compiler to substitute the function body at the call site. Respects code size thresholds.",
    "@inline_always": "### Attribute: `@inline_always`\n---\nForces the compiler to inline this function regardless of size. Use with caution.",

    // std.io
    "print": "```rust\nstd.io.print(value)\n```\nPrints value to stdout followed by a newline.",
    "println": "```rust\nstd.io.println(value)\n```\nAlias for `print`. Prints value followed by a newline.",
    "print_inline": "```rust\nstd.io.print_inline(value)\n```\nPrints value without a newline.",
    "eprint": "```rust\nstd.io.eprint(value)\n```\nPrints value to stderr without a newline.",
    "eprintln": "```rust\nstd.io.eprintln(value)\n```\nPrints value to stderr with a newline.",
    "flush": "```rust\nstd.io.flush()\n```\nFlushes the stdout buffer.",
    "eflush": "```rust\nstd.io.eflush()\n```\nFlushes the stderr buffer.",
    "readline": "```rust\nstd.io.readline() -> string | null\n```\nReads a line from stdin. Returns `null` on EOF.",
    "read_char": "```rust\nstd.io.read_char() -> string\n```\nReads a single character from stdin.",
    "input": "```rust\nstd.io.input(prompt) -> string\n```\nPrints prompt, flushes, and reads a line from stdin.",
    "clear_screen": "```rust\nstd.io.clear_screen()\n```\nClears the terminal using ANSI escape sequences.",
    "cursor_home": "```rust\nstd.io.cursor_home()\n```\nMoves terminal cursor to top-left.",
    "move_cursor": "```rust\nstd.io.move_cursor(x, y)\n```\nMoves cursor to position (1-indexed).",

    // std.math
    "PI": "```rust\nstd.math.PI\n```\n3.141592653589793",
    "TAU": "```rust\nstd.math.TAU\n```\n6.283185307179586 (2π)",
    "abs": "```rust\nstd.math.abs(x)\n```\nReturns the absolute value of `x`.",
    "sqrt": "```rust\nstd.math.sqrt(x)\n```\nReturns the square root of `x`.",
    "pow": "```rust\nstd.math.pow(base, exp)\n```\nReturns `base` raised to the power `exp`.",
    "clamp": "```rust\nstd.math.clamp(x, min, max)\n```\nClamps `x` between `min` and `max`.",
    "randint": "```rust\nstd.math.randint(min, max)\n```\nReturns a random integer in range [min, max] inclusive.",
    "sin": "```rust\nstd.math.sin(rad)\n```\nSine (radians).",
    "cos": "```rust\nstd.math.cos(rad)\n```\nCosine (radians).",
    "atan2": "```rust\nstd.math.atan2(y, x)\n```\nTwo-argument arc tangent.",

    // std.string
    "len": "```rust\nstd.string.len(s) -> int\n```\nReturns the length of string `s` in **bytes**.",
    "char_len": "```rust\nstd.string.char_len(s) -> int\n```\nReturns the length of string `s` in **Unicode characters**.",
    "char_at": "```rust\nstd.string.char_at(s, i) -> string\n```\nReturns character at index `i` (empty if out of bounds).",
    "substr": "```rust\nstd.string.substr(s, start, len) -> string\n```\nExtracts substring starting at char position `start`.",
    "contains": "```rust\nstd.string.contains(s, needle) -> bool\n```\nChecks if `s` contains `needle`.",
    "split": "```rust\nstd.string.split(s, sep) -> string\n```\nSplits `s` by `sep`. Returns newline-separated strings.",
    "join": "```rust\nstd.string.join(parts, sep) -> string\n```\nJoins newline-separated `parts` with `sep`.",

    // std.convert
    "parse_int": "```rust\nstd.convert.parse_int(s) -> int | null\n```\nParses string to int. Supports `0x`, `0o`, `0b` prefixes.",
    "to_string": "```rust\nstd.convert.to_string(x) -> string\n```\nConverts any value to its string representation.",
    "to_hex": "```rust\nstd.convert.to_hex(n) -> string\n```\nConverts integer `n` to a hexadecimal string.",
    "ord": "```rust\nstd.convert.ord(char) -> int\n```\nReturns the Unicode code point of a character.",
    "chr": "```rust\nstd.convert.chr(code) -> string\n```\nReturns character from Unicode code point.",
    "type_of": "```rust\nstd.convert.type_of(x) -> string\n```\nReturns the type name as string (\"int\", \"string\", etc.).",

    // std.time
    "now": "```rust\nstd.time.now() -> float\n```\nUnix timestamp in seconds.",
    "timer": "```rust\nstd.time.timer() -> handle\n```\nCreates a high-precision timer handle.",
    "elapsed_ms": "```rust\nstd.time.elapsed_ms(h) -> float\n```\nMilliseconds since timer `h` was created.",
    "sleep": "```rust\nstd.time.sleep(ms)\n```\nSuspends execution for `ms` milliseconds.",
    "iso": "```rust\nstd.time.iso() -> string\n```\nReturns current time in ISO 8601 format.",

    // std.fs
    "read_text": "```rust\nstd.fs.read_text(path) -> string\n```\nReads entire file as string. **Requires `--allow-caps=fs`**.",
    "write_text": "```rust\nstd.fs.write_text(path, content)\n```\nWrites string to file (overwrites). **Requires `--allow-caps=fs`**.",
    "exists": "```rust\nstd.fs.exists(path) -> bool\n```\nChecks if path exists.",
    "readdir": "```rust\nstd.fs.readdir(path) -> string\n```\nLists directory contents as newline-separated string.",

    // std.net
    "connect": "```rust\nstd.net.connect(host, port) -> handle\n```\nConnects to TCP server. **Requires `--allow-caps=net`**.",
    "listen": "```rust\nstd.net.listen(host, port) -> handle\n```\nStarts TCP server listening on port. **Requires `--allow-caps=net`**.",
    "send": "```rust\nstd.net.send(handle, data)\n```\nSends string data over socket.",
    "recv_line": "```rust\nstd.net.recv_line(handle) -> string\n```\nReceives one line from socket.",

    // std.bytes
    "alloc": "```rust\nstd.bytes.alloc(size) -> handle\n```\nAllocates `size` bytes. Manual memory, must be `free`'d.",
    "read_u16": "```rust\nstd.bytes.read_u16(buf, offset) -> int\n```\nReads 16-bit unsigned int (little-endian).",
    "write_u16": "```rust\nstd.bytes.write_u16(buf, offset, value)\n```\nWrites 16-bit unsigned int (little-endian).",
    "decode": "```rust\nstd.bytes.decode(buf, offset, len) -> string\n```\nDecodes UTF-8 bytes from buffer to string.",

    // std.sys
    "platform": "```rust\nstd.sys.platform() -> string\n```\nReturns OS name (\"linux\", \"macos\", \"windows\").",
    "arch": "```rust\nstd.sys.arch() -> string\n```\nReturns CPU architecture (\"x86_64\", \"aarch64\")."
};