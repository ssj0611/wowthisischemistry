"""Recolor footer UFO: green→#1a0ff7, alien→white, transparent bg, two solid eyes."""
from collections import deque
from math import cos, radians, sin
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path("public")
BACKUP = ROOT / "jack-footer-ufo-new.backup.png"
OUT = ROOT / "jack-footer-ufo.png"
LEGACY = ROOT / "jack-footer-ufo-new.png"
TARGET = (0x1A, 0x0F, 0xF7)

# Level pair on upper face (same Y). Spacing ~26px.
EYE_Y = 166
EYES = ((308, EYE_Y, 5.5), (334, EYE_Y, 5.5))


def is_green(r: int, g: int, b: int) -> bool:
    if g < 40:
        return False
    return g >= r + 12 and g >= b + 8 and g >= 48


def is_alien_body(r: int, g: int, b: int, x: int, y: int) -> bool:
    if not (165 < x < 485 and y < 315):
        return False
    if g > 150 and g > r + 40 and g > b + 40:
        return False
    lum = (r + g + b) / 3
    if lum < 120 and r < 100:
        if g > r + 25 and g > b + 15 and g > 90:
            return False
        return True
    return False


def flood_black_bg(px, w: int, h: int) -> set[tuple[int, int]]:
    bg: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()

    def near_black(r: int, g: int, b: int, a: int) -> bool:
        return a < 8 or (a > 0 and r + g + b < 35)

    def push(x: int, y: int) -> None:
        if (x, y) in bg:
            return
        r, g, b, a = px[x, y]
        if near_black(r, g, b, a):
            bg.add((x, y))
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)
    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                push(nx, ny)
    return bg


im = Image.open(BACKUP).convert("RGBA")
px = im.load()
w, h = im.size
bg = flood_black_bg(px, w, h)

for y in range(h):
    for x in range(w):
        if (x, y) in bg:
            px[x, y] = (0, 0, 0, 0)
            continue
        r, g, b, a = px[x, y]
        if a == 0:
            continue
        if is_alien_body(r, g, b, x, y):
            px[x, y] = (255, 255, 255, a)
        elif is_green(r, g, b):
            if g > 140:
                px[x, y] = (*TARGET, a)
            else:
                blend = max(0.45, min(1.0, (g - 40) / 100.0))
                px[x, y] = (
                    int(r * (1 - blend) + TARGET[0] * blend),
                    int(g * (1 - blend) + TARGET[1] * blend),
                    int(b * (1 - blend) + TARGET[2] * blend),
                    a,
                )

# Wipe original hollow eye on face
for y in range(160, 195):
    for x in range(300, 350):
        r, g, b, a = px[x, y]
        if a < 200:
            continue
        white_n = sum(
            1
            for dy in (-3, 0, 3)
            for dx in (-3, 0, 3)
            if px[min(w - 1, max(0, x + dx)), min(h - 1, max(0, y + dy))][0] > 200
        )
        if white_n >= 3 and (
            (b > r + 20 and b > g + 15 and b > 70 and r < 180)
            or (r + g + b < 120 and r < 100)
        ):
            px[x, y] = (255, 255, 255, 255)

draw = ImageDraw.Draw(im)
for cx, cy, rad in EYES:
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(18, 18, 22, 255))

# Solid-fill hollow rim light next to face (reads as a third empty eye otherwise)
for cy in range(170, 210):
    for cx in range(360, 420):
        r, g, b, a = px[cx, cy]
        if not (a > 200 and r > 200):
            continue
        for rad in (5, 6, 7, 8):
            ring = 0
            blue = 0
            for ang in range(0, 360, 20):
                nx = int(round(cx + rad * cos(radians(ang))))
                ny = int(round(cy + rad * sin(radians(ang))))
                if not (0 <= nx < w and 0 <= ny < h):
                    continue
                rr, gg, bb, aa = px[nx, ny]
                ring += 1
                if aa > 200 and bb > 150 and rr < 100:
                    blue += 1
            if ring and blue / ring >= 0.6:
                draw.ellipse(
                    [cx - rad + 1, cy - rad + 1, cx + rad - 1, cy + rad - 1],
                    fill=(*TARGET, 255),
                )
                break

im.save(OUT, optimize=True)
im.save(LEGACY, optimize=True)
print("saved", OUT, "and", LEGACY)
