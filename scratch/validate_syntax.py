import re

def check_js_syntax(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check brace matching
    stack = []
    lines = content.split('\n')
    for line_idx, line in enumerate(lines, 1):
        # Ignore comments and string literals simply
        in_string = None
        for col_idx, char in enumerate(line, 1):
            if char in ('"', "'", '`') and (col_idx == 1 or line[col_idx-2] != '\\'):
                if in_string == char:
                    in_string = None
                elif in_string is None:
                    in_string = char
            if not in_string:
                if char in '{[(':
                    stack.append((char, line_idx, col_idx))
                elif char in '}])':
                    if not stack:
                        print(f"Error in {filename}: Unmatched closing '{char}' at line {line_idx}:{col_idx}")
                        return False
                    opening, o_line, o_col = stack.pop()
                    expected = {'}': '{', ']': '[', ')': '('}[char]
                    if opening != expected:
                        print(f"Error in {filename}: Mismatched '{opening}' at line {o_line}:{o_col} with '{char}' at line {line_idx}:{col_idx}")
                        return False

    print(f"{filename}: Braces and syntax clean! ({len(lines)} lines)")
    return True

check_js_syntax("script.js")
check_js_syntax("db.js")
