path = r'c:\[Graduation_Thesis]Prototype\Frontend\src\pages\HomePage.jsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
old = 'fontSize: "var(--desktop-hero-title-size)"'
new = 'fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)"'
count = content.count(old)
content = content.replace(old, new)
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print(f'Replaced {count} occurrence(s)')
