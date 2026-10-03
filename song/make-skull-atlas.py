#!/usr/bin/env python3
"""
make-skull-atlas.py — register skull frames into one strip atlas for the hologram.

what it does, per frame (any count, any resolution, true-black background):
  1. grayscale + per-frame brightness normalise (99.5th percentile -> 235)
  2. find the skull (threshold), take its centroid-x, bbox-centre-y, bbox height
  3. scale so every skull is the same height, centre it in a fixed cell
  4. pack all cells into one horizontal strip: skull-atlas.png (+ meta)
  5. score left-right symmetry -> the most symmetric frame is called FRONT

usage:
  python3 make-skull-atlas.py skull*.png                    # writes skull-atlas.png + skull-atlas.json
  python3 make-skull-atlas.py skull*.png --inject page.html # also splices atlas+meta into the html
                                                            # (between the __ATLAS_META__ markers)
tune:
  --cell-h 560   cell height in px (width follows)
  --fill  0.86   skull height as a fraction of the cell
"""
import sys, json, base64, io, re
import numpy as np
from PIL import Image

THRESH = 16          # above this = skull (backgrounds are true black)
CELL_H = 560
FILL   = 0.86

def load_norm(path):
    im = Image.open(path).convert('L')
    a = np.asarray(im, dtype=np.float32)
    hi = np.percentile(a[a > THRESH], 99.5) if (a > THRESH).any() else 255.0
    a = np.clip(a * (235.0 / max(hi, 1.0)), 0, 255)
    return a

def register(a, cell_w, cell_h, fill):
    m = a > THRESH
    ys, xs = np.nonzero(m)
    if xs.size == 0:
        return np.zeros((cell_h, cell_w), np.uint8)
    cx = xs.mean()                                  # centroid-x: steady across yaw
    y0, y1 = ys.min(), ys.max()
    cy = (y0 + y1) / 2.0                            # bbox-centre-y: crown<->jaw
    bh = (y1 - y0) + 1
    s = (cell_h * fill) / bh
    # don't let a wide profile spill out of the cell
    x0, x1 = xs.min(), xs.max()
    bw = (x1 - x0) + 1
    s = min(s, (cell_w * 0.96) / bw)
    im = Image.fromarray(a.astype(np.uint8))
    nw, nh = max(1, int(round(im.width * s))), max(1, int(round(im.height * s)))
    im = im.resize((nw, nh), Image.LANCZOS)
    cell = Image.new('L', (cell_w, cell_h), 0)
    cell.paste(im, (int(round(cell_w / 2 - cx * s)), int(round(cell_h / 2 - cy * s))))
    return np.asarray(cell, dtype=np.uint8)

def symmetry(cell):
    a = cell.astype(np.float32)
    return float(np.abs(a - a[:, ::-1]).mean())     # lower = more symmetric = more frontal

def main():
    inject, cell_h, fill, args = None, CELL_H, FILL, []
    it = iter(sys.argv[1:])
    for a in it:
        if a == '--inject': inject = next(it)
        elif a == '--cell-h': cell_h = int(next(it))
        elif a == '--fill': fill = float(next(it))
        else: args.append(a)
    paths = sorted(args)
    if not paths:
        sys.exit('give me frames: python3 make-skull-atlas.py skull*.png')
    cell_w = int(round(cell_h * 0.93))

    cells, scores = [], []
    for p in paths:
        c = register(load_norm(p), cell_w, cell_h, fill)
        cells.append(c); scores.append(symmetry(c))
        print(f'  {p}: lit {(c>THRESH).mean()*100:4.1f}%  symmetry {scores[-1]:6.2f}')
    front = int(np.argmin(scores))
    print(f'  -> frame {front} ({paths[front]}) reads most frontal')

    strip = Image.fromarray(np.concatenate(cells, axis=1))
    buf = io.BytesIO(); strip.save(buf, 'PNG', optimize=True)
    png = buf.getvalue()
    open('skull-atlas.png', 'wb').write(png)
    meta = {'n': len(cells), 'cw': cell_w, 'ch': cell_h, 'front': front}
    json.dump(meta, open('skull-atlas.json', 'w'))
    print(f'  skull-atlas.png  {len(png)/1024:.0f} kb  ({meta})')

    if inject:
        b64 = base64.b64encode(png).decode('ascii')
        block = ('/*__ATLAS_META__*/\n'
                 f'var FRAMES={json.dumps(meta)};\n'
                 f"var ATLAS_B64='{b64}';\n"
                 '/*__ATLAS_META_END__*/')
        src = open(inject).read()
        out = re.sub(r'/\*__ATLAS_META__\*/[\s\S]*?/\*__ATLAS_META_END__\*/', lambda m: block, src, count=1)
        open(inject, 'w').write(out)
        print(f'  injected atlas + meta into {inject}  ({len(b64)/1024:.0f} kb of base64)')

if __name__ == '__main__':
    main()
