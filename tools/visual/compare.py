"""Side-by-side visual diff: reference screenshot (left) vs this build (right).

Usage:  python tools/visual/compare.py <REF_DIR> "<ref file>:<mine name>:<out name>" ...
Example: python tools/visual/compare.py reference "Screenshot 181332.png:01_top:top"
Both images are resized to the same width. Captures are made at 1520x726 CSS px @1.25 DPR
(= 1900 physical px), which is the scale the reference screenshots were taken at.
"""
import os, sys
from PIL import Image

ref_dir, pairs = sys.argv[1], sys.argv[2:]
out_dir = os.environ.get('OUT_DIR', 'tools/visual/out')
os.makedirs(out_dir, exist_ok=True)
W = 800
for spec in pairs:
    ref, mine, name = spec.split(':')
    a = Image.open(os.path.join(ref_dir, ref)).convert('RGB')
    b = Image.open(os.path.join(out_dir, f'mine_{mine}.png')).convert('RGB')
    a = a.resize((W, int(a.height * W / a.width)))
    b = b.resize((W, int(b.height * W / b.width)))
    sheet = Image.new('RGB', (W * 2 + 10, max(a.height, b.height)), 'red')
    sheet.paste(a, (0, 0)); sheet.paste(b, (W + 10, 0))
    sheet.save(os.path.join(out_dir, f'cmp_{name}.png'))
    print('wrote', f'cmp_{name}.png')
