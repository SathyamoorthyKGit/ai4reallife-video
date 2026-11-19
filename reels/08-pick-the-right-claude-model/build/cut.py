import numpy as np, json
from PIL import Image, ImageSequence
from scipy import ndimage
U='/root/.claude/uploads/209ed91e-ed39-530a-9c9f-4a0c5424de8b/'
O='/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r8/'
sheets={'A':('8da72884-image.gif',(207,311),['hammer','walnut','hand','cracked']),
        'B':('b3fb8461-image.gif',(207,311),['stopwatch','gauge','knife','bird']),
        'C':('ede4d61a-image.gif',None,['car','drill','books','pump']),
        'D':('899befa5-image.gif',None,['crane','yarn','ladder','crackloupe'])}
meta={}
for k,(f,split,names) in sheets.items():
    g=Image.open(U+f); frames=[fr.convert('RGB') for fr in ImageSequence.Iterator(g)]
    W,H=frames[0].size; frames=[fr.resize((W*2,H*2),Image.LANCZOS) for fr in frames]; W,H=W*2,H*2
    sx,sy=(split[0]*2,split[1]*2) if split else (W//2,H//2)
    arr=[np.asarray(fr).astype(float) for fr in frames]
    a0=arr[0]; bg=np.median(np.concatenate([a0[:8].reshape(-1,3),a0[-8:].reshape(-1,3),a0[:,:8].reshape(-1,3),a0[:,-8:].reshape(-1,3)]),0)
    masks=[]
    for a in arr:
        d=np.sqrt(((a-bg)**2).sum(-1)); fg=d>18
        fg=ndimage.binary_opening(fg,iterations=2); ff=ndimage.binary_fill_holes(fg); near=d<16
        hl,hn=ndimage.label(ff&~fg)
        if hn:
            idx=np.arange(1,hn+1); hs=ndimage.sum(np.ones_like(hl),hl,idx); hn_=ndimage.mean(near,hl,idx)
            bad=idx[(hs>1200)&(hn_>0.85)]
            if len(bad): ff[np.isin(hl,bad)]=False
        fg=ff
        lab,n=ndimage.label(fg); sz=ndimage.sum(fg,lab,range(1,n+1))
        keep=np.isin(lab,[i+1 for i,s in enumerate(sz) if s>1500]); masks.append(keep)
    quads=[(0,0,sx,sy),(sx,0,W,sy),(0,sy,sx,H),(sx,sy,W,H)]
    lab0,n0=ndimage.label(masks[0]); cen=ndimage.center_of_mass(masks[0],lab0,range(1,n0+1)); sz0=ndimage.sum(masks[0],lab0,range(1,n0+1))
    for qi,(x0,y0,x1,y1) in enumerate(quads):
        cands=[(sz0[i],i+1) for i,(cy,cx) in enumerate(cen) if x0<=cx<x1 and y0<=cy<y1]
        anchor=ndimage.binary_dilation(lab0==max(cands)[1],iterations=30)
        keepm=[]
        for m in masks:
            lb,nn=ndimage.label(m); hit=np.unique(lb[anchor&m]); hit=hit[hit>0]
            km=np.isin(lb,hit)
            R=40
            if R: km&=ndimage.binary_dilation(lab0==max(cands)[1],iterations=R)
            keepm.append(km)
        # clip to the quadrant grown 60px toward its neighbours, faded at that edge
        X0=0 if x0==0 else x0-60; Y0=0 if y0==0 else y0-60; X1=W if x1==W else x1+60; Y1=H if y1==H else y1+60
        U_=np.zeros((H,W),bool)
        for m in keepm: U_|=m
        U_[:Y0]=0;U_[Y1:]=0;U_[:,:X0]=0;U_[:,X1:]=0
        ys,xs=np.where(U_)
        bx0,by0,bx1,by1=max(xs.min()-4,X0),max(ys.min()-4,Y0),min(xs.max()+5,X1),min(ys.max()+5,Y1)
        cw,ch=bx1-bx0,by1-by0
        yy,xx=np.mgrid[by0:by1,bx0:bx1]; fade=np.ones((ch,cw))
        for lim,dist in [(X0,xx-X0),(X1,X1-xx),(Y0,yy-Y0),(Y1,Y1-yy)]:
            if lim not in (0,W,H): fade=np.minimum(fade,np.clip(dist/40,0,1))
        masks_q=keepm
        strip=Image.new('RGBA',(cw*6,ch))
        for i,(a,m) in enumerate(zip(arr,masks_q)):
            mm=ndimage.binary_erosion(m[by0:by1,bx0:bx1],iterations=2)
            al=ndimage.gaussian_filter(mm.astype(float),1.0)*fade
            strip.paste(Image.fromarray(np.dstack([a[by0:by1,bx0:bx1],al*255]).astype(np.uint8),'RGBA'),(i*cw,0))
        nm=names[qi]; strip.save(O+'film/assets/'+nm+'.webp',quality=88,method=6)
        strip.crop((0,0,cw,ch)).save(O+'proc/'+nm+'.png')
        meta[nm]=[int(cw),int(ch)]; print(k,nm,cw,ch)
json.dump(meta,open(O+'proc/meta.json','w'))

# the hammer and walnut swing is animated in the film itself: keep their first frame only
for nm in ['hammer','walnut']:
    st=Image.open(O+'film/assets/'+nm+'.webp'); cw,ch=meta[nm]; c0=st.crop((0,0,cw,ch)); out=Image.new('RGBA',st.size)
    for i in range(6): out.paste(c0,(i*cw,0))
    out.save(O+'film/assets/'+nm+'.webp',quality=88,method=6)
