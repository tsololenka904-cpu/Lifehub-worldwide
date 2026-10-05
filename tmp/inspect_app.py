import re

with open('/tmp/app.js') as f:
    text = f.read()

# Find all arrays with tier or plan objects
print("=== TIERS SEARCH ===")
matches = [m.start() for m in re.finditer(r'lh_', text)]
for idx in matches[:10]:
    print(text[max(0, idx - 50):min(len(text), idx + 450)])
    print("-" * 40)
