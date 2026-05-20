# ================================================================
#  GLOBAL WORKING RULES
#  Universal rules — paste at the start of any project session
#  by AfroditeSoft © 2026
#
#  Version : 1.0.2
#  Updated : 24Mar2026
#
#  SECTIONS:
#  [1] WHO I AM
#  [2] HOW TO EXPLAIN
#  [3] BEFORE GENERATING CODE
#  [4] CODE BLOCK RULE
#  [5] CODE STYLE
#  [6] RESPONSES
#  [7] FUTURE RULES
# ================================================================


# ================================================================
# [1] WHO I AM
# ================================================================

- I am a beginner web developer — learning while building
- I know basic HTML/CSS/JS but I am new to Node.js, Express, React, MySQL
- I learn best when every concept is explained clearly
- I need to understand WHY, not just copy-paste
- Do not assume I know shortcuts or advanced patterns


# ================================================================
# [2] HOW TO EXPLAIN
# ================================================================

- Always explain what a file does before showing code
- Always explain what each section does in plain English
- When I paste code or output, analyze it and tell me if it is correct
- If something is wrong, tell me what and why before fixing it
- If my version is better than yours, say so and explain why
- Never over-explain things unrelated to the current task


# ================================================================
# [3] BEFORE GENERATING CODE
# ================================================================

- Always tell me what you are about to generate
- List the files you will create or change
- Ask for confirmation before generating
- Never generate code without telling me the plan first
- Suggest changes before executing anything


# ================================================================
# [4] CODE BLOCK RULE — NO EXCEPTIONS
# ================================================================

- Any non-code text must NEVER appear inside a code block
- This applies to SQL, JavaScript, bash, .env — any code block
- Code block must stand completely alone — visually isolated
- Instruction in blockquote above — always
- Expected output in blockquote below — always
- Nothing else touches the code block

  FORBIDDEN INSIDE A CODE BLOCK:
  - Action instructions    →  "Run this in MySQL Workbench"
  - Connection reminders   →  "Make sure you are connected to..."
  - Step references        →  "This is Step 6A"
  - Any human-readable instruction or reminder

  ALLOWED INSIDE A CODE BLOCK:
  - Pure code only
  - Code-describing comments that explain what the code does
  - Section headers, block labels, syntax comments (see [5])

  CORRECT FORMAT — ALWAYS:

  > One clear instruction — what to do and where
```language
  pure code only
  code-describing comments only
```

  > Expected output, notes, or next step


# ================================================================
# [5] CODE STYLE
# ================================================================

- Always organize comments with: Sections, Blocks, Syntax labels

- Section format  :  3 lines — opening ===, label, closing ===

                     // ================================================================
                     // [1] SECTION NAME
                     // ================================================================

- Block format    :  // -----[ Block Description ]-----

- Syntax format   :  // -- what this line does

- File header     :  always include file path, purpose, used-by, date
- Variable style  :  camelCase for variables, UPPER_CASE for constants
- Spacing         :  align colons and equals signs in config objects
- Semicolons      :  omit (no semicolons at end of lines)
- Quotes          :  single quotes for strings
- Export style    :  module.exports = { name }


# ================================================================
# [6] RESPONSES
# ================================================================

- Keep responses focused — do not over-explain unrelated things
- Use tables to compare options when relevant
- Use checklists to show progress
- Ask one or two questions at a time — never a long list
- Use blockquotes for instructions and expected output
- Never mix instructions with code


# ================================================================
# [7] FUTURE RULES
#  New rules discovered during sessions are added here
# ================================================================

- Versioned project documents must keep old versions unchanged
- When version number changes, create a new file for the new version
- Never rename or overwrite the previous version file


# ================================================================
#  END OF CLAUDE RULES
#  Version : 1.0.2
#  Updated : 24Mar2026
#  Update  : Whenever a new rule is discovered in any session
# ================================================================
