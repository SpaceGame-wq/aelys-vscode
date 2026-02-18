export const HOVER_DOCS: { [key: string]: string } = {
    // KEYWORDS & SYNTAX
    "let": "### Keyword: `let`\n---\nDeclares a new immutable variable.\n```rust\nlet x = 10\n```",
    "mut": "### Keyword: `mut`\n---\nMarks a variable or parameter as mutable (modifiable).\n```rust\nlet mut x = 0\nx = 1\n```",
    "fn": "### Keyword: `fn`\n---\nDefines a function or a lambda.\n```rust\nfn add(a, b) { return a + b }\n```",
    "return": "### Keyword: `return`\n---\nExits the function and returns a value. If omitted, returns `null`.",
    "if": "### Keyword: `if`\n---\nConditional control flow.\n```rust\nif x > 0 { ... }\n```",
    "else": "### Keyword: `else`\n---\nAlternative branch for `if`.",
    "while": "### Keyword: `while`\n---\nLoops while the condition is true.",
    "for": "### Keyword: `for`\n---\nIterates over ranges or collections.\n```rust\nfor i in 0..10 { ... }\nfor item in vec { ... }\n```",
    "in": "### Keyword: `in`\n---\nUsed in `for` loops to specify the iterator.",
    "step": "### Keyword: `step`\n---\nSpecifies the increment in a range loop.\n```rust\nfor i in 0..10 step 2\n```",
    "break": "### Keyword: `break`\n---\nExits the current loop immediately.",
    "continue": "### Keyword: `continue`\n---\nSkips to the next iteration of the loop.",
    "needs": "### Keyword: `needs`\n---\nImports a module.\n```rust\nneeds std.fs\nneeds std.math as m\n```",
    "as": "### Keyword: `as`\n---\nAliasing for imports.",
    "pub": "### Keyword: `pub`\n---\nMarks a function as public (exported from the module).",
    "and": "### Operator: `and`\n---\nLogical AND (short-circuiting).",
    "or": "### Operator: `or`\n---\nLogical OR (short-circuiting).",
    "not": "### Operator: `not`\n---\nLogical NOT.",
    "null": "### Value: `null`\n---\nRepresents the absence of value.",
    "true": "### Boolean: `true`",
    "false": "### Boolean: `false`",

    // ATTRIBUTES
    "@no_gc": "### Attribute: `@no_gc`\n---\nSuspends the Garbage Collector for this function.\n\n**Usage:** Critical performance loops, real-time audio/graphics. Gives access to `alloc`, `free`, `store`, `load`.",
    "@inline": "### Attribute: `@inline`\n---\nHint to the compiler to substitute the function body at the call site.",
    "@inline_always": "### Attribute: `@inline_always`\n---\nForces the compiler to inline this function regardless of size.",

    // TYPES
    "Array": "### Type: `Array<T>`\n---\nFixed-size collection.\n```rust\nlet arr = Array[1, 2, 3]\n```",
    "Vec": "### Type: `Vec<T>`\n---\nGrowable dynamic collection.\n```rust\nlet v = Vec[1, 2]\nv.push(3)\n```",
    "int": "### Type: `int`\n---\n48-bit signed integer.",
    "float": "### Type: `float`\n---\n64-bit floating point number.",
    "string": "### Type: `string`\n---\nUTF-8 text.",
    "bool": "### Type: `bool`\n---\nBoolean (true/false).",

    // std.io
    "io.print": "```rust\nio.print(value)\n```\nPrints value to stdout without a newline.",
    "io.println": "```rust\nio.println(value)\n```\nPrints value followed by a newline.",
    "io.print_inline": "```rust\nio.print_inline(value)\n```\nAlias for `print`.",
    "io.eprint": "```rust\nio.eprint(value)\n```\nPrints to stderr without a newline.",
    "io.eprintln": "```rust\nio.eprintln(value)\n```\nPrints to stderr with a newline.",
    "io.flush": "```rust\nio.flush()\n```\nFlushes the stdout buffer.",
    "io.eflush": "```rust\nio.eflush()\n```\nFlushes the stderr buffer.",
    "io.readline": "```rust\nio.readline() -> string | null\n```\nReads a line from stdin.",
    "io.read_char": "```rust\nio.read_char() -> string\n```\nReads a single character.",
    "io.input": "```rust\nio.input(prompt) -> string\n```\nPrints prompt and reads input.",
    "io.clear_screen": "```rust\nio.clear_screen()\n```\nClears the terminal.",
    "io.cursor_home": "```rust\nio.cursor_home()\n```\nMoves cursor to top-left.",
    "io.move_cursor": "```rust\nio.move_cursor(x, y)\n```\nMoves cursor to specific position.",

    // std.math
    "math.PI": "```rust\nmath.PI\n```\n3.141592653589793",
    "math.TAU": "```rust\nmath.TAU\n```\n6.283185307179586 (2π)",
    "math.abs": "```rust\nmath.abs(x)\n```\nAbsolute value.",
    "math.sign": "```rust\nmath.sign(x)\n```\nReturns -1, 0, or 1.",
    "math.sqrt": "```rust\nmath.sqrt(x)\n```\nSquare root.",
    "math.cbrt": "```rust\nmath.cbrt(x)\n```\nCube root.",
    "math.pow": "```rust\nmath.pow(base, exp)\n```\nExponentiation.",
    "math.min": "```rust\nmath.min(a, b)\n```\nReturns the smaller value.",
    "math.max": "```rust\nmath.max(a, b)\n```\nReturns the larger value.",
    "math.clamp": "```rust\nmath.clamp(x, min, max)\n```\nRestricts x to [min, max].",
    "math.randint": "```rust\nmath.randint(min, max)\n```\nRandom integer [min, max].",
    "math.floor": "```rust\nmath.floor(x)\n```\nRounds down.",
    "math.ceil": "```rust\nmath.ceil(x)\n```\nRounds up.",
    "math.round": "```rust\nmath.round(x)\n```\nRounds to nearest integer.",
    "math.hypot": "```rust\nmath.hypot(x, y)\n```\nsqrt(x² + y²).",
    "math.deg_to_rad": "```rust\nmath.deg_to_rad(deg)\n```\nDegrees to radians.",
    "math.rad_to_deg": "```rust\nmath.rad_to_deg(rad)\n```\nRadians to degrees.",
    "math.sin": "```rust\nmath.sin(rad)\n```\nSine.",
    "math.cos": "```rust\nmath.cos(rad)\n```\nCosine.",
    "math.tan": "```rust\nmath.tan(rad)\n```\nTangent.",
    "math.atan2": "```rust\nmath.atan2(y, x)\n```\nTwo-argument arctangent.",

    // std.string
    "string.len": "```rust\nstring.len(s) -> int\n```\nLength in bytes.",
    "string.char_len": "```rust\nstring.char_len(s) -> int\n```\nLength in Unicode characters.",
    "string.char_at": "```rust\nstring.char_at(s, i) -> string\n```\nCharacter at index.",
    "string.byte_at": "```rust\nstring.byte_at(s, i) -> int\n```\nRaw byte at index.",
    "string.substr": "```rust\nstring.substr(s, start, len)\n```\nExtracts substring.",
    "string.contains": "```rust\nstring.contains(s, needle)\n```\nChecks if string contains needle.",
    "string.starts_with": "```rust\nstring.starts_with(s, prefix)\n```\nChecks prefix.",
    "string.ends_with": "```rust\nstring.ends_with(s, suffix)\n```\nChecks suffix.",
    "string.to_upper": "```rust\nstring.to_upper(s)\n```\nConverts to uppercase.",
    "string.to_lower": "```rust\nstring.to_lower(s)\n```\nConverts to lowercase.",
    "string.trim": "```rust\nstring.trim(s)\n```\nRemoves whitespace from both ends.",
    "string.replace": "```rust\nstring.replace(s, old, new)\n```\nReplaces all occurrences.",
    "string.split": "```rust\nstring.split(s, sep)\n```\nSplits string by separator.",
    "string.join": "```rust\nstring.join(parts, sep)\n```\nJoins parts with separator.",
    "string.pad_left": "```rust\nstring.pad_left(s, w, c)\n```\nPads start of string.",

    // std.convert
    "convert.parse_int": "```rust\nconvert.parse_int(s) -> int\n```\nParses string to int.",
    "convert.parse_float": "```rust\nconvert.parse_float(s) -> float\n```\nParses string to float.",
    "convert.to_string": "```rust\nconvert.to_string(x) -> string\n```\nConverts value to string.",
    "convert.to_hex": "```rust\nconvert.to_hex(n)\n```\nInt to Hex string.",
    "convert.to_binary": "```rust\nconvert.to_binary(n)\n```\nInt to Binary string.",
    "convert.ord": "```rust\nconvert.ord(char) -> int\n```\nChar to Unicode code point.",
    "convert.chr": "```rust\nconvert.chr(code) -> string\n```\nCode point to Char.",
    "convert.type_of": "```rust\nconvert.type_of(x) -> string\n```\nReturns type name.",

    // std.time
    "time.now": "```rust\ntime.now() -> float\n```\nUnix timestamp.",
    "time.timer": "```rust\ntime.timer() -> handle\n```\nStarts a high-precision timer.",
    "time.elapsed_ms": "```rust\ntime.elapsed_ms(h) -> float\n```\nElapsed milliseconds.",
    "time.sleep": "```rust\ntime.sleep(ms)\n```\nSleeps for ms.",
    "time.format": "```rust\ntime.format(fmt)\n```\nFormats time (e.g. `%Y-%m-%d`).",
    "time.iso": "```rust\ntime.iso() -> string\n```\nISO 8601 time string.",

    // std.fs
    "fs.read_text": "```rust\nfs.read_text(path)\n```\nReads file as string.",
    "fs.write_text": "```rust\nfs.write_text(path, content)\n```\nWrites string to file.",
    "fs.append_text": "```rust\nfs.append_text(path, content)\n```\nAppends string to file.",
    "fs.exists": "```rust\nfs.exists(path) -> bool\n```\nChecks existence.",
    "fs.is_file": "```rust\nfs.is_file(path) -> bool\n```\nChecks if it is a file.",
    "fs.is_dir": "```rust\nfs.is_dir(path) -> bool\n```\nChecks if it is a directory.",
    "fs.size": "```rust\nfs.size(path) -> int\n```\nFile size in bytes.",
    "fs.mkdir": "```rust\nfs.mkdir(path)\n```\nCreates directory.",
    "fs.delete": "```rust\nfs.delete(path)\n```\nDeletes file.",
    "fs.readdir": "```rust\nfs.readdir(path)\n```\nLists directory.",
    "fs.join": "```rust\nfs.join(base, path)\n```\nJoins paths securely.",

    // std.net
    "net.connect": "```rust\nnet.connect(host, port)\n```\nConnects TCP client.",
    "net.listen": "```rust\nnet.listen(host, port)\n```\nStarts TCP server.",
    "net.accept": "```rust\nnet.accept(server)\n```\nAccepts connection.",
    "net.send": "```rust\nnet.send(handle, data)\n```\nSends data.",
    "net.recv_line": "```rust\nnet.recv_line(handle)\n```\nReceives a line.",
    "net.close": "```rust\nnet.close(handle)\n```\nCloses socket.",

    // std.bytes
    "bytes.alloc": "```rust\nbytes.alloc(size)\n```\nAllocates raw memory.",
    "bytes.free": "```rust\nbytes.free(buf)\n```\nFrees memory.",
    "bytes.decode": "```rust\nbytes.decode(buf, off, len)\n```\nDecodes UTF-8 string.",
    
    // MEMORY PRIMITIVES
    "alloc": "```rust\nalloc(size)\n```\nAllocates value array (@no_gc only).",
    "free": "```rust\nfree(buf)\n```\nFrees memory.",
    "store": "```rust\nstore(buf, idx, val)\n```\nStores value.",
    "load": "```rust\nload(buf, idx)\n```\nLoads value.",

    // std.sys
    "sys.platform": "```rust\nsys.platform() -> string\n```\nReturns OS name.",
    "sys.arch": "```rust\nsys.arch() -> string\n```\nReturns CPU architecture."
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