import numpy as np, json
from PIL import Image, ImageSequence
from scipy import ndimage
U='/root/.claude/uploads/209ed91e-ed39-530a-9c9f-4a0c5424de8b/'
O='/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r9/'
ONLY=None
sheets={'A':('0415b055-image.gif',['ticker','grab','papers','stage']),
        'B':('d655939e-image.gif',['robomouse','jukebox','clipboard','mouse']),
        'C':('7776d6aa-image.gif',['adapter','strip','dominoes','snail']),
        'D':('f567c18d-image.gif',['dart','gavel','pen','handmouse']),
        'M':('4236a234-image.gif',['maxstage']),'P':('707d7192-image.gif',['mcpstage'])}
meta={}
def save_strip(frames, masks, box, fade, nm):
    bx0,by0,bx1,by1=box; cw,ch=bx1-bx0,by1-by0
    strip=Image.new('RGBA',(cw*6,ch))
    for i,(a,m) in enumerate(zip(frames,masks)):
        al=a[by0:by1,bx0:bx1,3]/255.0*ndimage.binary_dilation(m[by0:by1,bx0:bx1],iterations=2)*fade
        strip.paste(Image.fromarray(np.dstack([a[by0:by1,bx0:bx1,:3],al*255]).astype(np.uint8),'RGBA'),(i*cw,0))
    strip.save(O+'film/assets/'+nm+'.webp',quality=88,method=6); strip.crop((0,0,cw,ch)).save(O+'proc/'+nm+'.png')
    meta[nm]=[int(cw),int(ch)]; print(nm,cw,ch)
for k,(f,names) in sheets.items():
    g=Image.open(U+f); fr=[x.convert('RGBA') for x in ImageSequence.Iterator(g)]
    W,H=fr[0].size; fr=[x.resize((W*2,H*2),Image.LANCZOS) for x in fr]; W,H=W*2,H*2
    arr=[np.asarray(x).astype(float) for x in fr]
    masks=[]
    for a in arr:
        m=a[...,3]>100; m=ndimage.binary_opening(m,iterations=1)
        lab,n=ndimage.label(m); sz=ndimage.sum(m,lab,range(1,n+1)); masks.append(np.isin(lab,[i+1 for i,s in enumerate(sz) if s>1500]))
    if len(names)==1:
        U_=np.zeros((H,W),bool)
        for m in masks: U_|=m
        ys,xs=np.where(U_); save_strip(arr,masks,(max(xs.min()-4,0),max(ys.min()-4,0),min(xs.max()+5,W),min(ys.max()+5,H)),1.0,names[0]); continue
    sx,sy=W//2,H//2
    quads=[(0,0,sx,sy),(sx,0,W,sy),(0,sy,sx,H),(sx,sy,W,H)]
    lab0,n0=ndimage.label(masks[0]); cen=ndimage.center_of_mass(masks[0],lab0,range(1,n0+1)); sz0=ndimage.sum(masks[0],lab0,range(1,n0+1))
    for qi,(x0,y0,x1,y1) in enumerate(quads):
        cands=[(sz0[i],i+1) for i,(cy,cx) in enumerate(cen) if x0<=cx<x1 and y0<=cy<y1]
        box=np.zeros((H,W),bool); box[max(y0-40,0):y1+40,max(x0-40,0):x1+40]=True
        own=[lab0==i for c,i in cands if c==max(cands)[0]] if cands else []
        anc=own[0] if own and own[0][y0:y1,x0:x1].sum()>0.6*own[0].sum() else masks[0]&box
        ancd=ndimage.binary_dilation(anc,iterations=40)
        keep=[]
        for m in masks:
            lb,nn=ndimage.label(m); hit=np.unique(lb[ancd&m]); hit=hit[hit>0]; keep.append(np.isin(lb,hit)&ancd&box)
        U_=np.zeros((H,W),bool)
        for m in keep: U_|=m
        ys,xs=np.where(U_)
        save_strip(arr,keep,(max(xs.min()-4,0),max(ys.min()-4,0),min(xs.max()+5,W),min(ys.max()+5,H)),1.0,names[qi])
json.dump(meta,open(O+'proc/meta.json','w'))
