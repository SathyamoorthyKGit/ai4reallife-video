"""Turn a local film folder into ArtifactData batch writes for a Motion film.

  python3 build_push.py FILM_DIR UPLOAD_RESULT.txt "Reel title"
FILM_DIR holds assets/ and modules/ (scenes.json lists scene ids in order).
UPLOAD_RESULT.txt = the text the Artifact asset upload returned (lines like: ".../adapter.webp" (...) -> "/_blob/<id>").
Writes FILM_DIR/../push/** and prints the writes list (assets, film/meta, base.css, shared.js, scenes in order,
score.js, scenes.json, film/script LAST). Split into batches of <=50 if longer.
"""
import json, os, re, sys, datetime
from PIL import Image
F, up, title = sys.argv[1].rstrip('/'), sys.argv[2], sys.argv[3]; P = os.path.dirname(F) + '/push'
REF = {os.path.basename(a): b for a, b in re.findall(r'"([^"]+)" \([^)]*\) \S+ "/_blob/([0-9a-f]{32})"', open(up).read())}
missing = set(os.listdir(F + '/assets')) - set(REF); assert not missing, missing
for d in ['assets', 'film', 'modules']: os.makedirs(P + '/' + d, exist_ok=True)
W = []
def put(col, doc, data):
    p = f'{P}/{col}/{doc}.json'; json.dump(data, open(p, 'w')); W.append({"op": "set", "collection": col, "doc_id": doc, "file_path": os.path.abspath(p)})
for n in sorted(os.listdir(F + '/assets')):
    d = {"ref": "/_blob/" + REF[n]}; ext = n.rsplit('.', 1)[1]
    if ext in ('woff2', 'woff', 'ttf', 'otf'): d["mime"] = "font/" + ext
    elif ext == 'mp4': d.update(mime="video/mp4", w=960, h=540)
    else: w, h = Image.open(F + '/assets/' + n).size; d.update(mime="image/" + ('jpeg' if ext == 'jpg' else ext), w=w, h=h)
    put('assets', n, d)
put('film', 'meta', {"v": 1, "title": title, "updatedAt": datetime.datetime.now(datetime.timezone.utc).isoformat()})
def mod(n): put('modules', n, {"kind": n.rsplit('.', 1)[1], "text": open(F + '/modules/' + n).read()})
mod('base.css'); mod('shared.js')
for s in json.load(open(F + '/modules/scenes.json'))['scenes']: mod('scene-' + s['id'] + '.js')
mod('score.js'); mod('scenes.json'); put('film', 'script', {"code": "window.CUT = kit.scenes();"})
json.dump(W, open(P + '/writes.json', 'w')); print(len(W), 'writes'); print(json.dumps(W))
