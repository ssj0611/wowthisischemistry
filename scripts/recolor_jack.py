"""Recolor Jack PNGs to #1a0ff7 and strongly compress speculars."""
from collections import deque
from pathlib import Path

from PIL import Image

TARGET = (0x1A, 0x0F, 0xF7)
HIGHLIGHT = (95, 85, 245)
FILES = ["jack-front.png", "jack-side.png", "jack-back.png"]
ROOT = Path("public")


def near_white(r: int, g: int, b: int, a: int) -> bool:
    if a < 8:
        return True
    lum = (r + g + b) / 3
    chroma = max(r, g, b) - min(r, g, b)
    return lum >= 210 and chroma <= 40


def flood_background(im: Image.Image) -> set[tuple[int, int]]:
    """Mark light pixels connected to image edges as background."""
    w, h = im.size
    px = im.load()
    bg: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()

    def try_push(x: int, y: int) -> None:
        if (x, y) in bg:
            return
        r, g, b, a = px[x, y]
        if near_white(r, g, b, a):
            bg.add((x, y))
            q.append((x, y))

    for x in range(w):
        try_push(x, 0)
        try_push(x, h - 1)
    for y in range(h):
        try_push(0, y)
        try_push(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                try_push(nx, ny)
    return bg


def compress_luminance(lum: float) -> float:
    if lum <= 140:
        return lum
    # 140..255 → 140..175 (harsh speculars become soft blue midtones)
    return 140 + (lum - 140) * 0.22


def recolor_char(r: int, g: int, b: int, a: int) -> tuple[int, int, int, int]:
    # keep eyes
    if max(r, g, b) < 60:
        return r, g, b, a

    lum = 0.299 * r + 0.587 * g + 0.114 * b
    lum = compress_luminance(lum)
    shade = max(0.22, min(1.0, lum / 175.0))

    nr = int(TARGET[0] * shade)
    ng = int(TARGET[1] * shade)
    nb = int(min(255, TARGET[2] * shade + 12 * (1 - shade)))

    if lum > 145:
        hmix = min(0.55, (lum - 145) / 70.0)
        nr = int(nr * (1 - hmix) + HIGHLIGHT[0] * hmix)
        ng = int(ng * (1 - hmix) + HIGHLIGHT[1] * hmix)
        nb = int(nb * (1 - hmix) + HIGHLIGHT[2] * hmix)

    return nr, ng, nb, a


def process(path: Path) -> None:
    backup = path.with_suffix(path.suffix + ".bak")
    if not backup.exists():
        # if already overwritten, we still have .bak from first run
        pass
    src = backup if backup.exists() else path
    im = Image.open(src).convert("RGBA")
    bg = flood_background(im)
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            if (x, y) in bg:
                continue
            px[x, y] = recolor_char(*px[x, y])
    im.save(path, optimize=True)
    print("saved", path.name, "bg_pixels", len(bg))


def main() -> None:
    for name in FILES:
        process(ROOT / name)


if __name__ == "__main__":
    main()
