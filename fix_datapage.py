path = r'c:\[Graduation_Thesis]Prototype\Frontend\src\pages\DataSelectionPage.jsx'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the correct closing after the ul block (first occurrence)
# We need to remove lines 424 onward that are duplicates, keep only lines up to 423
# Line 423 is `                })}` (0-indexed: 422)
# Then keep lines for </ul> </> </div> </section> </div> </div> );  }

# The correct ending after line 423 (1-indexed) should be:
correct_ending = [
    '              </ul>\n',
    '            )}\n',
    '          </div>\n',
    '        </section>\n',
    '      </div>\n',
    '    </div>\n',
    '  );\n',
    '}\n',
]

# Keep lines 1-423 (0-indexed 0-422), then append correct ending
new_lines = lines[:423] + correct_ending

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Fixed: total lines now = {len(new_lines)}")
