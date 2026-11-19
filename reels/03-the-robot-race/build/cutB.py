import numpy as np
from PIL import Image
from scipy import ndimage
U='/root/.claude/uploads/209ed91e-ed39-530a-9c9f-4a0c5424de8b/f8392161-image.png'
O='/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r3/proc/'
im=np.array(Image.open(U).convert('RGB')).astype(float)
bg=np.median(np.concatenate([im[:8].reshape(-1,3),im[-8:].reshape(-1,3),im[:,:8].reshape(-1,3),im[:,-8:].reshape(-1,3)]),0)
print('bg',bg)
d=np.sqrt(((im-bg)**2).sum(-1))
near=d<14
lab,n=ndimage.label(near)
edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
bgm=np.isin(lab,list(edge))
fg=~bgm
fg=ndimage.binary_opening(fg,iterations=3)
ff=ndimage.binary_fill_holes(fg)
holes=ff&~fg
hl,hn=ndimage.label(holes)
for i in range(1,hn+1):
    hm=hl==i
    if hm.sum()>400 and near[hm].mean()>0.9: ff[hm]=False
fg=ff
lab,n=ndimage.label(fg)
objs=[(sl,i+1,(lab[sl]==i+1).sum()) for i,sl in enumerate(ndimage.find_objects(lab))]
objs=[o for o in objs if o[2]>5000]
objs.sort(key=lambda o:(o[0][0].start//300,o[0][1].start))
for j,(sl,idx,a) in enumerate(objs):
    mask=ndimage.binary_erosion(lab[sl]==idx,iterations=2)
    al=ndimage.gaussian_filter(mask.astype(float),0.9)
    sub=np.dstack([im[sl],al*255]).astype(np.uint8)
    Image.fromarray(sub,'RGBA').save(O+f'B{j}.png'); print('B%d'%j,sl[1].start,sl[0].start,sub.shape[1],sub.shape[0],a)
