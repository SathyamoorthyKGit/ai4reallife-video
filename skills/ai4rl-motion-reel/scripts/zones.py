import json,sys,collections
rows=json.load(open(sys.argv[1]))
if rows and isinstance(rows[0]['boxes'],dict): print(rows[0]); sys.exit()
def bad(b):
    r=[]
    if b['x0']<44: r.append('L')
    if b['x1']>1029: r.append('R')
    if b['y0']<234: r.append('T')
    if b['y1']>1675: r.append('B')
    if b['x1']>900 and b['y1']>1172: r.append('N')
    return r
# group violations by text, report spans >=0.4s where fully on-frame-ish (box intersects frame by >60%)
runs=collections.defaultdict(list)
for row in rows:
    for b in row['boxes']:
        w=b['x1']-b['x0']; h=b['y1']-b['y0']
        if w<=0 or h<=0: continue
        ix=max(0,min(b['x1'],1080)-max(b['x0'],0)); iy=max(0,min(b['y1'],1920)-max(b['y0'],0))
        if ix*iy < 0.5*w*h: continue
        v=bad(b)
        if v: runs[b['txt']].append((row['t'],''.join(v),b))
for txt,lst in runs.items():
    # split into contiguous spans
    spans=[];cur=[lst[0]]
    for a in lst[1:]:
        if a[0]-cur[-1][0]<=0.11: cur.append(a)
        else: spans.append(cur);cur=[a]
    spans.append(cur)
    for s in spans:
        if s[-1][0]-s[0][0]>=0.4:
            m=s[len(s)//2]
            print(f"{s[0][0]:5.1f}-{s[-1][0]:5.1f}  {m[1]:4}  {txt!r:32} box@mid {m[2]['x0']},{m[2]['y0']},{m[2]['x1']},{m[2]['y1']}")
