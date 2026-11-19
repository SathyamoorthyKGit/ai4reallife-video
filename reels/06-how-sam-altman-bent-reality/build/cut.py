import sys, numpy as np
from PIL import Image
from scipy import ndimage
U='/root/.claude/uploads/209ed91e-ed39-530a-9c9f-4a0c5424de8b/'
O='/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r6/proc/'
sheets={'P':'8566dc25-image.png','E':'e90f1d5c-image.png','D':'6eeb6deb-image.png','C':'dd587590-image.png','B':'fa3b08d4-image.png','A':'5fea6bf5-image.png'}
for k,f in sheets.items():
    im=np.array(Image.open(U+f).convert('RGB')).astype(float)
    bg=np.median(np.concatenate([im[:6].reshape(-1,3),im[-6:].reshape(-1,3),im[:,:6].reshape(-1,3),im[:,-6:].reshape(-1,3)]),0)
    d=np.sqrt(((im-bg)**2).sum(-1)); near=d<16
    lab,n=ndimage.label(near); edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fg=~np.isin(lab,list(edge)); fg=ndimage.binary_opening(fg,iterations=3)
    ff=ndimage.binary_fill_holes(fg); holes=ff&~fg; hl,hn=ndimage.label(holes)
    for i in range(1,hn+1):
        hm=hl==i
        if hm.sum()>400 and near[hm].mean()>0.9: ff[hm]=False
    lab,n=ndimage.label(ff)
    objs=[(sl,i+1,(lab[sl]==i+1).sum()) for i,sl in enumerate(ndimage.find_objects(lab))]
    objs=[o for o in objs if o[2]>8000]
    objs.sort(key=lambda o:(o[0][0].start//500,o[0][1].start))
    for j,(sl,idx,a) in enumerate(objs):
        mask=ndimage.binary_erosion(lab[sl]==idx,iterations=2); al=ndimage.gaussian_filter(mask.astype(float),0.9)
        Image.fromarray(np.dstack([im[sl],al*255]).astype(np.uint8),'RGBA').save(O+f'{k}{j}.png'); print(k,j,bg.astype(int),sl[1].start,sl[0].start,sl[1].stop-sl[1].start,sl[0].stop-sl[0].start)
