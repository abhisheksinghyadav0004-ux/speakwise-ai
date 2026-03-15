import language_tool_python

tool = language_tool_python.LanguageTool('en-US')

def check_grammar(text):
    matches = tool.check(text)

    corrections = []

    for match in matches:
        corrections.append(match.message)

    if not corrections:
        return "Your sentence looks good."

    return " | ".join(corrections)