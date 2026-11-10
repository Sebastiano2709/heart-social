"""Replace every photo / video still in a preview build with a brand-gradient image of the same size.

Usage: python3 scripts/strip-photos.py <preview_dir>
Used for the shareable artifact, so it carries no third-party footage and no photo of a person.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw

STOPS = [(0x4A, 0x14, 0x77), (0x7A, 0x2B, 0xB8), (0xD8, 0x1B, 0x7F)]  # grad-heart


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def gradient(w: int, h: int, variant: int) -> Image.Image:
    img = Image.new('RGB', (w, h))
    px = img.load()
    for y in range(h):
        for x in range(w):
            # diagonal 125deg-ish; variant shifts the blend so slides differ
            t = ((x / max(w - 1, 1)) * 0.6 + (y / max(h - 1, 1)) * 0.4 + variant * 0.07) % 1.0
            px[x, y] = lerp(STOPS[0], STOPS[1], t * 2) if t < 0.5 else lerp(STOPS[1], STOPS[2], (t - 0.5) * 2)
    d = ImageDraw.Draw(img, 'RGBA')
    # faint faceted shards, echoing the low-poly heart
    for i in range(6):
        cx, cy = (w * (0.15 + 0.14 * i)) % w, h * (0.2 + 0.11 * ((i + variant) % 6))
        s = min(w, h) * 0.18
        d.polygon([(cx, cy - s), (cx + s * 0.8, cy + s * 0.4), (cx - s * 0.5, cy + s * 0.7)], fill=(255, 255, 255, 18))
    return img


root = Path(sys.argv[1])
for i, f in enumerate(sorted(root.rglob('*.webp'))):
    with Image.open(f) as im:
        w, h = im.size
    small = gradient(max(w // 8, 1), max(h // 8, 1), i).resize((w, h), Image.BICUBIC)
    small.save(f, 'WEBP', quality=80)
    print(f'{f.relative_to(root)} -> gradient {w}x{h}')
