export const HOVER_DOCS: { [key: string]: string } = {
    // std.io
    "print": "**std.io.print(value)**\n\nPrints a value to the console with a newline.",
    "println": "**std.io.println(value)**\n\nAlias for print. Prints with a newline.",
    "print_inline": "**std.io.print_inline(value)**\n\nPrints a value without adding a newline.",
    "input": "**std.io.input(prompt)**\n\nPrints a prompt and reads a line of input from the user.",
    "clear_screen": "**std.io.clear_screen()**\n\nClears the terminal screen using ANSI escape sequences.",

    // std.math
    "abs": "**std.math.abs(x)**\n\nReturns the absolute value of x.",
    "sqrt": "**std.math.sqrt(x)**\n\nReturns the square root of x.",
    "pow": "**std.math.pow(base, exp)**\n\nReturns the base raised to the power of exp.",
    "randint": "**std.math.randint(min, max)**\n\nReturns a random integer between min and max (inclusive).",

    // std.fs
    "read_text": "**std.fs.read_text(path)**\n\nReads the entire content of a file as a UTF-8 string. Requires `--allow-caps=fs`.",
    "write_text": "**std.fs.write_text(path, content)**\n\nWrites a string to a file (overwrites existing). Requires `--allow-caps=fs`.",
    "exists": "**std.fs.exists(path)**\n\nChecks if a file or directory exists.",

    // std.bytes
    "alloc": "**std.bytes.alloc(size)**\n\nAllocates a manual byte buffer of the given size. Must be freed manually.",
    "free": "**std.bytes.free(handle)**\n\nFrees a previously allocated byte buffer.",
    "write_u16": "**std.bytes.write_u16(buf, offset, value)**\n\nWrites a 16-bit unsigned integer to the buffer.",

    // Attributes
    "@no_gc": "**Attribute: @no_gc**\n\nSuspends the Garbage Collector for this function. Allows the use of manual memory primitives.",
    "@inline": "**Attribute: @inline**\n\nSuggests the compiler to inline this function for better performance.",
};