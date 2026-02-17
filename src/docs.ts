export const HOVER_DOCS: { [key: string]: string } = {
    // ATTRIBUTES
    "@no_gc": "### Attribute: `@no_gc`\n---\nSuspends the Garbage Collector for the duration of this function.\n\n**Usage:** Provides access to manual memory primitives like `alloc`, `store`, `load`, and `free` (Value-based) or `std.bytes` (Byte-based). Useful for real-time graphics, audio, or performance-critical loops.",
    "@inline": "### Attribute: `@inline`\n---\nHint to the compiler to substitute the function body at the call site. Respects code size thresholds.",
    "@inline_always": "### Attribute: `@inline_always`\n---\nForces the compiler to inline this function regardless of size. Use with caution.",

    // std.io
    "print": "```rust\nio.print(value)\n```\nPrints value to stdout followed by a newline.",
    "println": "```rust\nio.println(value)\n```\nAlias for `print`. Prints value followed by a newline.",
    "print_inline": "```rust\nio.print_inline(value)\n```\nPrints value without a newline.",
    "eprint": "```rust\nio.eprint(value)\n```\nPrints value to stderr without a newline.",
    "eprintln": "```rust\nio.eprintln(value)\n```\nPrints value to stderr with a newline.",
    "flush": "```rust\nio.flush()\n```\nFlushes the stdout buffer.",
    "eflush": "```rust\nio.eflush()\n```\nFlushes the stderr buffer.",
    "readline": "```rust\nio.readline() -> string | null\n```\nReads a line from stdin. Returns `null` on EOF.",
    "read_char": "```rust\nio.read_char() -> string\n```\nReads a single character from stdin.",
    "input": "```rust\nio.input(prompt) -> string\n```\nPrints prompt, flushes, and reads a line from stdin.",
    "clear_screen": "```rust\nio.clear_screen()\n```\nClears the terminal using ANSI escape sequences.",
    "cursor_home": "```rust\nio.cursor_home()\n```\nMoves terminal cursor to top-left.",
    "move_cursor": "```rust\nio.move_cursor(x, y)\n```\nMoves cursor to position (1-indexed).",

    // std.math
    "PI": "```rust\nmath.PI\n```\n3.141592653589793",
    "TAU": "```rust\nmath.TAU\n```\n6.283185307179586 (2π)",
    "abs": "```rust\nmath.abs(x)\n```\nReturns the absolute value of `x`.",
    "sqrt": "```rust\nmath.sqrt(x)\n```\nReturns the square root of `x`.",
    "pow": "```rust\nmath.pow(base, exp)\n```\nReturns `base` raised to the power `exp`.",
    "clamp": "```rust\nmath.clamp(x, min, max)\n```\nClamps `x` between `min` and `max`.",
    "randint": "```rust\nmath.randint(min, max)\n```\nReturns a random integer in range [min, max] inclusive.",
    "sin": "```rust\nmath.sin(rad)\n```\nSine (radians).",
    "cos": "```rust\nmath.cos(rad)\n```\nCosine (radians).",
    "atan2": "```rust\nmath.atan2(y, x)\n```\nTwo-argument arc tangent.",

    // std.string
    "len": "```rust\nstring.len(s) -> int\n```\nReturns the length of string `s` in **bytes**.",
    "char_len": "```rust\nstring.char_len(s) -> int\n```\nReturns the length of string `s` in **Unicode characters**.",
    "char_at": "```rust\nstring.char_at(s, i) -> string\n```\nReturns character at index `i` (empty if out of bounds).",
    "substr": "```rust\nstring.substr(s, start, len) -> string\n```\nExtracts substring starting at char position `start`.",
    "contains": "```rust\nstring.contains(s, needle) -> bool\n```\nChecks if `s` contains `needle`.",
    "split": "```rust\nstring.split(s, sep) -> string\n```\nSplits `s` by `sep`. Returns newline-separated strings.",
    "join": "```rust\nstring.join(parts, sep) -> string\n```\nJoins newline-separated `parts` with `sep`.",

    // std.convert
    "parse_int": "```rust\nconvert.parse_int(s) -> int | null\n```\nParses string to int. Supports `0x`, `0o`, `0b` prefixes.",
    "to_string": "```rust\nconvert.to_string(x) -> string\n```\nConverts any value to its string representation.",
    "to_hex": "```rust\nconvert.to_hex(n) -> string\n```\nConverts integer `n` to a hexadecimal string.",
    "ord": "```rust\nconvert.ord(char) -> int\n```\nReturns the Unicode code point of a character.",
    "chr": "```rust\nconvert.chr(code) -> string\n```\nReturns character from Unicode code point.",
    "type_of": "```rust\nconvert.type_of(x) -> string\n```\nReturns the type name as string (\"int\", \"string\", etc.).",

    // std.time
    "now": "```rust\ntime.now() -> float\n```\nUnix timestamp in seconds.",
    "timer": "```rust\ntime.timer() -> handle\n```\nCreates a high-precision timer handle.",
    "elapsed_ms": "```rust\ntime.elapsed_ms(h) -> float\n```\nMilliseconds since timer `h` was created.",
    "sleep": "```rust\ntime.sleep(ms)\n```\nSuspends execution for `ms` milliseconds.",
    "iso": "```rust\ntime.iso() -> string\n```\nReturns current time in ISO 8601 format.",

    // std.fs
    "read_text": "```rust\nfs.read_text(path) -> string\n```\nReads entire file as string. **Requires `--allow-caps=fs`**.",
    "write_text": "```rust\nfs.write_text(path, content)\n```\nWrites string to file (overwrites). **Requires `--allow-caps=fs`**.",
    "exists": "```rust\nfs.exists(path) -> bool\n```\nChecks if path exists.",
    "readdir": "```rust\nfs.readdir(path) -> string\n```\nLists directory contents as newline-separated string.",

    // std.net
    "connect": "```rust\nnet.connect(host, port) -> handle\n```\nConnects to TCP server. **Requires `--allow-caps=net`**.",
    "listen": "```rust\nnet.listen(host, port) -> handle\n```\nStarts TCP server listening on port. **Requires `--allow-caps=net`**.",
    "send": "```rust\nnet.send(handle, data)\n```\nSends string data over socket.",
    "recv_line": "```rust\nnet.recv_line(handle) -> string\n```\nReceives one line from socket.",

    // std.bytes
    "alloc": "```rust\nbytes.alloc(size) -> handle\n```\nAllocates `size` bytes. Manual memory, must be `free`'d.",
    "read_u16": "```rust\nbytes.read_u16(buf, offset) -> int\n```\nReads 16-bit unsigned int (little-endian).",
    "write_u16": "```rust\nbytes.write_u16(buf, offset, value)\n```\nWrites 16-bit unsigned int (little-endian).",
    "decode": "```rust\nbytes.decode(buf, offset, len) -> string\n```\nDecodes UTF-8 bytes from buffer to string.",

    // std.sys
    "platform": "```rust\nsys.platform() -> string\n```\nReturns OS name (\"linux\", \"macos\", \"windows\").",
    "arch": "```rust\nsys.arch() -> string\n```\nReturns CPU architecture (\"x86_64\", \"aarch64\")."
};

// Documentation pour l'aide au paramètres(Signature Help)
export interface AelysSignature {
    label: string;
    parameters: { label: string; documentation: string }[];
    documentation: string;
}

export const SIGNATURES: { [key: string]: AelysSignature } = {
    "math.clamp": {
        label: "math.clamp(x, min, max)",
        parameters: [
            { label: "x", documentation: "La valeur à limiter." },
            { label: "min", documentation: "La limite inférieure." },
            { label: "max", documentation: "La limite supérieure." }
        ],
        documentation: "Retourne x restreint entre min et max."
    },
    "math.pow": {
        label: "math.pow(base, exp)",
        parameters: [
            { label: "base", documentation: "Le nombre de base." },
            { label: "exp", documentation: "L'exposant." }
        ],
        documentation: "Retourne base élevé à la puissance exp."
    },
    "io.print": {
        label: "io.print(value)",
        parameters: [
            { label: "value", documentation: "La valeur à afficher dans la console." }
        ],
        documentation: "Affiche la valeur suivie d'un saut de ligne."
    }
    // Plus tard il faudra ajouter énormément de fonction ici pour avoir une bonne auto complétion
};