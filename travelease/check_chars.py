
import sys

file_path = "e:/Dev/travelease/travelease/src/app/(client-components)/(Header)/SiteHeader.tsx"
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "/listing-stay-detail" in line:
        print(f"Line {i+1}: {repr(line)}")
        for char in line:
            print(f"'{char}' - {ord(char)}")
