"""Cut a 2x2 animated GIF sticker sheet (or a single-sticker GIF) into 6-frame horizontal sprite strips.

Usage:
  python3 cut_gif_sheet.py SHEET.gif OUT_DIR name_topleft name_topright name_bottomleft name_bottomright
  python3 cut_gif_sheet.py STAGE.gif OUT_DIR maxstage            # one sticker on the sheet
Writes OUT_DIR/assets/<name>.webp (6 cells side by side), OUT_DIR/proc/<name>.png (cell 0)
and merges cell sizes into OUT_DIR/proc/meta.json  ->  paste into shared.js as  UI.SPR = {...}.
Transparent GIFs: mask by alpha. Flat grey/white backgrounds: pass --bg to mask by distance from the corner colour.
"""
import sys, os, json, numpy as np, argparse
from PIL import Image, ImageSequence
from scipy import ndimage
ap = argparse.ArgumentParser(); ap.add_argument('sheet'); ap.add_argument('out'); ap.add_argument('names', nargs='+')
ap.add_argument('--bg', action='store_true', help='mask by background colour distance instead of alpha')
ap.add_argument('--frames', type=int, default=6); ap.add_argument('--R', type=int, default=40, help='anchor dilation radius')
a = ap.parse_args(); O = a.out.rstrip('/') + '/'
os.makedirs(O + 'assets', exist_ok=True); os.makedirs(O + 'proc', exist_ok=True)
mp = O + 'proc/meta.json'; meta = json.load(open(mp)) if os.path.exists(mp) else {}
g = Image.open(a.sheet); fr = [x.convert('RGBA') for x in ImageSequence.Iterator(g)]
if len(fr) >= a.frames: fr = [fr[int(i * len(fr) / a.frames)] for i in range(a.frames)]
else: fr = (fr * a.frames)[:a.frames]
W, H = fr[0].size; fr = [x.resize((W * 2, H * 2), Image.LANCZOS) for x in fr]; W, H = W * 2, H * 2   # upscale 2x
arr = [np.asarray(x).astype(float) for x in fr]
def mask(a_):
    if a.bg:
        c = a_[4, 4, :3]; m = np.sqrt(((a_[..., :3] - c) ** 2).sum(-1)) > 38
    else: m = a_[..., 3] > 100
    m = ndimage.binary_opening(m, iterations=1); m = ndimage.binary_fill_holes(m) if a.bg else m
    lab, n = ndimage.label(m); sz = ndimage.sum(m, lab, range(1, n + 1))
    return np.isin(lab, [i + 1 for i, s in enumerate(sz) if s > 1500])
masks = [mask(x) for x in arr]
def save(keep, box, nm):
    x0, y0, x1, y1 = box; cw, ch = x1 - x0, y1 - y0; strip = Image.new('RGBA', (cw * a.frames, ch))
    for i, (im, m) in enumerate(zip(arr, keep)):
        al = (im[y0:y1, x0:x1, 3] / 255.0 if not a.bg else 1.0) * ndimage.binary_dilation(m[y0:y1, x0:x1], iterations=2)
        strip.paste(Image.fromarray(np.dstack([im[y0:y1, x0:x1, :3], al * 255]).astype(np.uint8), 'RGBA'), (i * cw, 0))
    strip.save(O + 'assets/' + nm + '.webp', quality=88, method=6); strip.crop((0, 0, cw, ch)).save(O + 'proc/' + nm + '.png')
    meta[nm] = [int(cw), int(ch)]; print(nm, cw, ch)
def bbox(U_):
    ys, xs = np.where(U_); return (max(xs.min() - 4, 0), max(ys.min() - 4, 0), min(xs.max() + 5, W), min(ys.max() + 5, H))
if len(a.names) == 1:
    U_ = np.zeros((H, W), bool)
    for m in masks: U_ |= m
    save(masks, bbox(U_), a.names[0])
else:
    sx, sy = W // 2, H // 2; quads = [(0, 0, sx, sy), (sx, 0, W, sy), (0, sy, sx, H), (sx, sy, W, H)]
    lab0, n0 = ndimage.label(masks[0]); cen = ndimage.center_of_mass(masks[0], lab0, range(1, n0 + 1)); sz0 = ndimage.sum(masks[0], lab0, range(1, n0 + 1))
    for qi, (x0, y0, x1, y1) in enumerate(quads[:len(a.names)]):
        cands = [(sz0[i], i + 1) for i, (cy, cx) in enumerate(cen) if x0 <= cx < x1 and y0 <= cy < y1]
        box = np.zeros((H, W), bool); box[max(y0 - 40, 0):y1 + 40, max(x0 - 40, 0):x1 + 40] = True
        own = [lab0 == i for c, i in cands if c == max(cands)[0]] if cands else []
        anc = own[0] if own and own[0][y0:y1, x0:x1].sum() > 0.6 * own[0].sum() else masks[0] & box
        ancd = ndimage.binary_dilation(anc, iterations=a.R); keep = []
        for m in masks:   # keep the parts of each frame that touch this sticker's anchor (handles moving bits)
            lb, nn = ndimage.label(m); hit = np.unique(lb[ancd & m]); hit = hit[hit > 0]; keep.append(np.isin(lb, hit) & ancd & box)
        U_ = np.zeros((H, W), bool)
        for m in keep: U_ |= m
        save(keep, bbox(U_), a.names[qi])
json.dump(meta, open(mp, 'w'))
print('UI.SPR =', json.dumps(meta))
