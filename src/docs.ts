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
    // std.io
    "io.print": {
        label: "io.print(value)",
        parameters: [{ label: "value", documentation: "The value to display." }],
        documentation: "Prints a value to stdout without a newline."
    },
    "io.println": {
        label: "io.println(value)",
        parameters: [{ label: "value", documentation: "The value to display." }],
        documentation: "Prints a value followed by a newline."
    },
    "io.print_inline": {
        label: "io.print_inline(value)",
        parameters: [{ label: "value", documentation: "The value to display." }],
        documentation: "Alias for `print`. Prints without a newline (useful for progress bars)."
    },
    "io.eprint": {
        label: "io.eprint(value)",
        parameters: [{ label: "value", documentation: "Error to display." }],
        documentation: "Prints a value to stderr without a newline."
    },
    "io.eprintln": {
        label: "io.eprintln(value)",
        parameters: [{ label: "value", documentation: "Error to display." }],
        documentation: "Prints a value to stderr with a newline."
    },
    "io.flush": {
        label: "io.flush()",
        parameters: [],
        documentation: "Forces a write of the stdout buffer."
    },
    "io.eflush": {
        label: "io.eflush()",
        parameters: [],
        documentation: "Forces a write of the stderr buffer."
    },
    "io.readline": {
        label: "io.readline()",
        parameters: [],
        documentation: "Reads a full line from stdin. Returns `null` on EOF."
    },
    "io.read_char": {
        label: "io.read_char()",
        parameters: [],
        documentation: "Reads a single character from stdin."
    },
    "io.input": {
        label: "io.input(prompt)",
        parameters: [{ label: "prompt", documentation: "Message to display before input." }],
        documentation: "Prints a prompt, flushes the buffer, and reads a line from stdin."
    },
    "io.clear_screen": {
        label: "io.clear_screen()",
        parameters: [],
        documentation: "Clears the terminal using ANSI escape sequences."
    },
    "io.cursor_home": {
        label: "io.cursor_home()",
        parameters: [],
        documentation: "Moves the cursor to the top-left of the terminal."
    },
    "io.move_cursor": {
        label: "io.move_cursor(x, y)",
        parameters: [
            { label: "x", documentation: "Column (1-indexed)." },
            { label: "y", documentation: "Row (1-indexed)." }
        ],
        documentation: "Moves the cursor to a specific position."
    },

    // std.math
    "math.abs": {
        label: "math.abs(x)",
        parameters: [{ label: "x", documentation: "Number." }],
        documentation: "Returns the absolute value."
    },
    "math.sign": {
        label: "math.sign(x)",
        parameters: [{ label: "x", documentation: "Number." }],
        documentation: "Returns the sign: -1, 0, or 1."
    },
    "math.sqrt": {
        label: "math.sqrt(x)",
        parameters: [{ label: "x", documentation: "Positive number." }],
        documentation: "Returns the square root."
    },
    "math.cbrt": {
        label: "math.cbrt(x)",
        parameters: [{ label: "x", documentation: "Number." }],
        documentation: "Returns the cube root."
    },
    "math.pow": {
        label: "math.pow(base, exp)",
        parameters: [
            { label: "base", documentation: "The base." },
            { label: "exp", documentation: "The exponent." }
        ],
        documentation: "Calculates base raised to the power of exp."
    },
    "math.min": {
        label: "math.min(a, b)",
        parameters: [
            { label: "a", documentation: "Val 1" },
            { label: "b", documentation: "Val 2" }
        ],
        documentation: "Returns the smaller of the two values."
    },
    "math.max": {
        label: "math.max(a, b)",
        parameters: [
            { label: "a", documentation: "Val 1" },
            { label: "b", documentation: "Val 2" }
        ],
        documentation: "Returns the larger of the two values."
    },
    "math.clamp": {
        label: "math.clamp(x, min, max)",
        parameters: [
            { label: "x", documentation: "Value to clamp." },
            { label: "min", documentation: "Lower bound." },
            { label: "max", documentation: "Upper bound." }
        ],
        documentation: "Clamps x within the range [min, max]."
    },
    "math.randint": {
        label: "math.randint(min, max)",
        parameters: [
            { label: "min", documentation: "Min value (inclusive)." },
            { label: "max", documentation: "Max value (inclusive)." }
        ],
        documentation: "Generates a random integer in the range [min, max]."
    },
    // Trigonometry
    "math.sin": {
        label: "math.sin(rad)",
        parameters: [{ label: "rad", documentation: "Angle in radians." }],
        documentation: "Sine."
    },
    "math.cos": { 
        label: "math.cos(rad)",
        parameters: [{ label: "rad", documentation: "Angle in radians." }],
        documentation: "Cosine."
    },
    "math.tan": {
        label: "math.tan(rad)",
        parameters: [{ label: "rad", documentation: "Angle in radians." }],
        documentation: "Tangent."
    },
    "math.asin": {
        label: "math.asin(x)",
        parameters: [{ label: "x", documentation: "Value (-1 to 1)." }],
        documentation: "Arc sine."
    },
    "math.acos": {
        label: "math.acos(x)",
        parameters: [{ label: "x", documentation: "Value (-1 to 1)." }],
        documentation: "Arc cosine."
    },
    "math.atan": {
        label: "math.atan(x)",
        parameters: [{ label: "x", documentation: "Value." }],
        documentation: "Arc tangent."
    },
    "math.atan2": { 
        label: "math.atan2(y, x)", 
        parameters: [
            { label: "y", documentation: "Y coordinate." },
            { label: "x", documentation: "X coordinate." }
        ], 
        documentation: "Two-argument arctangent (returns the angle of point (x, y))." 
    },
    // Utils
    "math.deg_to_rad": {
        label: "math.deg_to_rad(deg)",
        parameters: [{ label: "deg", documentation: "Degrees." }],
        documentation: "Converts degrees to radians."
    },
    "math.rad_to_deg": {
        label: "math.rad_to_deg(rad)",
        parameters: [{ label: "rad", documentation: "Radians." }],
        documentation: "Converts radians to degrees."
    },
    "math.floor": {
        label: "math.floor(x)",
        parameters: [{ label: "x", documentation: "Number." }],
        documentation: "Rounds down to the nearest integer."
    },
    "math.ceil": {
        label: "math.ceil(x)",
        parameters: [{ label: "x", documentation: "Number." }],
        documentation: "Rounds up to the nearest integer."
    },
    "math.round": {
        label: "math.round(x)",
        parameters: [{ label: "x", documentation: "Number." }],
        documentation: "Rounds to the nearest integer."
    },
    "math.hypot": { 
        label: "math.hypot(x, y)", 
        parameters: [
            { label: "x", documentation: "X." },
            { label: "y", documentation: "Y." }
        ], 
        documentation: "Returns sqrt(x² + y²)." 
    },

    // std.string
    "string.len": {
        label: "string.len(s)",
        parameters: [{ label: "s", documentation: "String." }],
        documentation: "Returns length in **bytes**."
    },
    "string.char_len": {
        label: "string.char_len(s)",
        parameters: [{ label: "s", documentation: "String." }],
        documentation: "Returns the number of **Unicode characters**."
    },
    "string.char_at": {
        label: "string.char_at(s, i)",
        parameters: [
            { label: "s", documentation: "String." },
            { label: "i", documentation: "Index." }
        ],
        documentation: "Returns the character at position i (empty string if out of bounds)."
    },
    "string.byte_at": {
        label: "string.byte_at(s, i)",
        parameters: [
            { label: "s", documentation: "String." },
            { label: "i", documentation: "Index." }
        ],
        documentation: "Returns the raw byte at position i (-1 if out of bounds)."
    },
    "string.substr": {
        label: "string.substr(s, start, len)",
        parameters: [
            { label: "s", documentation: "Source string." },
            { label: "start", documentation: "Start position (chars)." },
            { label: "len", documentation: "Length to extract." }
        ],
        documentation: "Extracts a substring."
    },
    "string.to_upper": { 
        label: "string.to_upper(s)",
        parameters: [{ label: "s", documentation: "String." }],
        documentation: "Converts to uppercase."
    },
    "string.to_lower": {
        label: "string.to_lower(s)",
        parameters: [{ label: "s", documentation: "String." }],
        documentation: "Converts to lowercase."
    },
    "string.contains": {
        label: "string.contains(s, needle)",
        parameters: [
            { label: "s", documentation: "String." },
            { label: "needle", documentation: "Substring to search." }
        ],
        documentation: "Checks if the string contains the needle."
    },
    "string.starts_with": {
        label: "string.starts_with(s, prefix)",
        parameters: [
            { label: "s", documentation: "String." },
            { label: "prefix", documentation: "Prefix." }
        ],
        documentation: "Checks if the string starts with the prefix."
    },
    "string.ends_with": {
        label: "string.ends_with(s, suffix)",
        parameters: [
            { label: "s", documentation: "String." },
            { label: "suffix", documentation: "Suffix." }
        ],
        documentation: "Checks if the string ends with the suffix."
    },
    "string.replace": {
        label: "string.replace(s, old, new)",
        parameters: [
            { label: "s", documentation: "String." },
            { label: "old", documentation: "Pattern to replace." },
            { label: "new", documentation: "Replacement." }
        ],
        documentation: "Replaces all occurrences."
    },
    "string.trim": {
        label: "string.trim(s)",
        parameters: [{ label: "s", documentation: "String." }],
        documentation: "Removes whitespace from both ends."
    },
    "string.split": {
        label: "string.split(s, sep)",
        parameters: [
            { label: "s", documentation: "String." },
            { label: "sep", documentation: "Separator." }
        ],
        documentation: "Splits the string into a pseudo-list (newline-separated string)."
    },
    "string.join": {
        label: "string.join(parts, sep)",
        parameters: [
            { label: "parts", documentation: "List of strings (separated by \\n)." },
            { label: "sep", documentation: "Join separator." }
        ],
        documentation: "Joins parts with the separator."
    },
    "string.pad_left": {
        label: "string.pad_left(s, width, char)",
        parameters: [
            {label: "s", documentation: "String"},
            {label: "width", documentation: "Target width"},
            {label: "char", documentation: "Padding char"}
        ],
        documentation: "Adds padding to the left."
    },

    // std.convert
    "convert.parse_int": {
        label: "convert.parse_int(s)",
        parameters: [{ label: "s", documentation: "String (e.g., '42', '0xFF')." }],
        documentation: "Parses a string to an integer. Returns `null` on failure."
    },
    "convert.parse_float": {
        label: "convert.parse_float(s)",
        parameters: [{ label: "s", documentation: "String." }],
        documentation: "Parses a string to a float."
    },
    "convert.to_string": {
        label: "convert.to_string(x)",
        parameters: [{ label: "x", documentation: "Value." }],
        documentation: "Converts any value to a string."
    },
    "convert.to_hex": {
        label: "convert.to_hex(n)",
        parameters: [{ label: "n", documentation: "Integer." }],
        documentation: "Returns the hexadecimal representation (without 0x)."
    },
    "convert.to_binary": {
        label: "convert.to_binary(n)",
        parameters: [{ label: "n", documentation: "Integer." }],
        documentation: "Returns the binary representation."
    },
    "convert.ord": {
        label: "convert.ord(char)",
        parameters: [{ label: "char", documentation: "Single character." }],
        documentation: "Returns the Unicode code point of this character."
    },
    "convert.chr": {
        label: "convert.chr(code)",
        parameters: [{ label: "code", documentation: "Unicode code." }],
        documentation: "Returns the character corresponding to the code."
    },
    "convert.type_of": {
        label: "convert.type_of(x)",
        parameters: [{ label: "x", documentation: "Value." }],
        documentation: "Returns the type name ('int', 'string', 'bool', etc.)."
    },

    // std.time
    "time.now": {
        label: "time.now()",
        parameters: [],
        documentation: "Current Unix timestamp in seconds."
    },
    "time.timer": {
        label: "time.timer()",
        parameters: [],
        documentation: "Starts a high-precision timer. Returns a handle."
    },
    "time.elapsed_ms": {
        label: "time.elapsed_ms(h)",
        parameters: [{ label: "h", documentation: "Timer handle." }],
        documentation: "Time elapsed in milliseconds since timer creation."
    },
    "time.sleep": {
        label: "time.sleep(ms)",
        parameters: [{ label: "ms", documentation: "Milliseconds." }],
        documentation: "Pauses execution."
    },
    "time.format": {
        label: "time.format(pattern)",
        parameters: [{ label: "pattern", documentation: "Format (e.g., '%Y-%m-%d')." }],
        documentation: "Formats current time according to the pattern."
    },
    "time.iso": {
        label: "time.iso()",
        parameters: [],
        documentation: "Returns time in ISO 8601 format."
    },

    // std.fs
    "fs.read_text": {
        label: "fs.read_text(path)",
        parameters: [{ label: "path", documentation: "File path." }],
        documentation: "Reads the entire file as a UTF-8 string."
    },
    "fs.write_text": {
        label: "fs.write_text(path, content)",
        parameters: [
            { label: "path", documentation: "File path." },
            { label: "content", documentation: "Content to write." }
        ],
        documentation: "Writes content to the file (overwrites existing)."
    },
    "fs.append_text": {
        label: "fs.append_text(path, content)",
        parameters: [
            { label: "path", documentation: "Path." },
            { label: "content", documentation: "Text to append." }
        ],
        documentation: "Appends text to the end of the file."
    },
    "fs.exists": {
        label: "fs.exists(path)",
        parameters: [{ label: "path", documentation: "Path." }],
        documentation: "Checks if the file or directory exists."
    },
    "fs.is_file": {
        label: "fs.is_file(path)",
        parameters: [{ label: "path", documentation: "Path." }],
        documentation: "Checks if it is a regular file."
    },
    "fs.is_dir": {
        label: "fs.is_dir(path)",
        parameters: [{ label: "path", documentation: "Path." }],
        documentation: "Checks if it is a directory."
    },
    "fs.size": {
        label: "fs.size(path)",
        parameters: [{ label: "path", documentation: "Path." }],
        documentation: "File size in bytes."
    },
    "fs.mkdir": {
        label: "fs.mkdir(path)",
        parameters: [{ label: "path", documentation: "Path." }],
        documentation: "Creates a directory."
    },
    "fs.readdir": {
        label: "fs.readdir(path)",
        parameters: [{ label: "path", documentation: "Path." }],
        documentation: "Lists directory contents."
    },
    "fs.delete": {
        label: "fs.delete(path)",
        parameters: [{ label: "path", documentation: "Path." }],
        documentation: "Deletes a file."
    },
    "fs.join": {
        label: "fs.join(base, path)",
        parameters: [
            { label: "base", documentation: "Base directory." },
            { label: "path", documentation: "Relative path." }
        ],
        documentation: "Joins two paths securely (prevents .. traversal)."
    },

    // std.net
    "net.connect": {
        label: "net.connect(host, port)",
        parameters: [
            { label: "host", documentation: "Host." },
            { label: "port", documentation: "Port." }
        ],
        documentation: "Connects a TCP client. Returns a handle."
    },
    "net.listen": {
        label: "net.listen(host, port)",
        parameters: [
            { label: "host", documentation: "IP (e.g., '0.0.0.0')." },
            { label: "port", documentation: "Port." }
        ],
        documentation: "Starts a TCP server. Returns a handle."
    },
    "net.accept": {
        label: "net.accept(server)",
        parameters: [{ label: "server", documentation: "Server handle." }],
        documentation: "Accepts an incoming connection."
    },
    "net.send": {
        label: "net.send(handle, data)",
        parameters: [
            { label: "handle", documentation: "Socket." },
            { label: "data", documentation: "Data to send." }
        ],
        documentation: "Sends data over the socket."
    },
    "net.recv_line": {
        label: "net.recv_line(handle)",
        parameters: [{ label: "handle", documentation: "Socket." }],
        documentation: "Receives a line of text."
    },
    "net.close": {
        label: "net.close(handle)",
        parameters: [{ label: "handle", documentation: "Socket." }],
        documentation: "Closes the connection."
    },

    // std.sys
    "sys.platform": {
        label: "sys.platform()",
        parameters: [],
        documentation: "Returns the OS ('linux', 'windows', 'macos')."
    },
    "sys.arch": {
        label: "sys.arch()",
        parameters: [],
        documentation: "Returns the CPU architecture ('x86_64', ...)."
    },

    // std.bytes
    "bytes.alloc": {
        label: "bytes.alloc(size)",
        parameters: [{ label: "size", documentation: "Size in bytes." }],
        documentation: "Allocates a raw buffer. **Must be manually freed with `free`**."
    },
    "bytes.free": {
        label: "bytes.free(buf)",
        parameters: [{ label: "buf", documentation: "Buffer." }],
        documentation: "Frees the buffer memory."
    },
    "bytes.read_u8": {
        label: "bytes.read_u8(buf, off)",
        parameters: [
            {label:"buf",documentation:""},
            {label:"off",documentation:""}
        ], 
        documentation: "Reads an unsigned 8-bit integer."
    },
    "bytes.write_u8": {
        label: "bytes.write_u8(buf, off, val)",
        parameters: [{label:"buf",documentation:""},
            {label:"off",documentation:""},
            {label:"val",documentation:""}
        ],
        documentation: "Writes an unsigned 8-bit integer."
    },
    "bytes.read_u16": {
        label: "bytes.read_u16(buf, off)",
        parameters: [
            {label:"buf",documentation:""},
            {label:"off",documentation:""}
        ],
        documentation: "Reads u16 (Little Endian)."
    },
    "bytes.write_u16": {
        label: "bytes.write_u16(buf, off, val)",
        parameters: [
            {label:"buf",documentation:""},
            {label:"off",documentation:""},
            {label:"val",documentation:""}
        ],
        documentation: "Writes u16 (Little Endian)."
    },
    "bytes.read_u32": {
        label: "bytes.read_u32(buf, off)",
        parameters: [
            {label:"buf",documentation:""},
            {label:"off",documentation:""}
        ],
        documentation: "Reads u32 (Little Endian)."
    },
    "bytes.write_u32": {
        label: "bytes.write_u32(buf, off, val)",
        parameters: [
            {label:"buf",documentation:""},
            {label:"off",documentation:""},
            {label:"val",documentation:""}
        ],
        documentation: "Writes u32 (Little Endian)."
    },
    "bytes.decode": {
        label: "bytes.decode(buf, offset, len)",
        parameters: [
            { label: "buf", documentation: "" },
            { label: "offset", documentation: "" },
            { label: "len", documentation: "" }
        ],
        documentation: "Decodes a portion of the buffer to a UTF-8 string."
    },

    // Manual memory
    "alloc": {
        label: "alloc(size)",
        parameters: [{ label: "size", documentation: "Number of slots." }],
        documentation: "Allocates an array of values (not bytes). Only in `@no_gc`."
    },
    "free": {
        label: "free(buf)",
        parameters: [{ label: "buf", documentation: "Buffer." }],
        documentation: "Frees the memory."
    },
    "store": {
        label: "store(buf, index, value)",
        parameters: [
            { label: "buf", documentation: "" },
            { label: "index", documentation: "" },
            { label: "value", documentation: "" }
        ],
        documentation: "Stores a value in a slot."
    },
    "load": {
        label: "load(buf, index)",
        parameters: [
            { label: "buf", documentation: "" }, 
            { label: "index", documentation: "" }
        ],
        documentation: "Loads a value from a slot."
    },

    // Vectors
    "push": {
        label: "vec.push(value)",
        parameters: [{ label: "value", documentation: "Element to add." }],
        documentation: "Adds an element to the end of the vector."
    },
    "pop": {
        label: "vec.pop()",
        parameters: [],
        documentation: "Removes and returns the last element of the vector."
    },
    "len": {
        label: "vec.len()",
        parameters: [],
        documentation: "Returns the number of elements."
    },
    "reserve": {
        label: "vec.reserve(n)",
        parameters: [{ label: "n", documentation: "Additional capacity." }],
        documentation: "Pre-allocates space to avoid reallocations."
    }
};