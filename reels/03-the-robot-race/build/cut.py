import sys, numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
U='/root/.claude/uploads/209ed91e-ed39-530a-9c9f-4a0c5424de8b/'
O=sys.argv[1]
sheets={'A':'c3e83cc8-image.png','B':'f8392161-image.png','C':'eb5efa70-image.png','D':'8e3199a1-image.png'}
thumbs=[]
for k,f in sheets.items():
    im=np.array(Image.open(U+f).convert('RGB')).astype(int)
    L=im.mean(-1)
    border=L>222
    border=ndimage.binary_closing(border,iterations=2)
    m=ndimage.binary_fill_holes(border)
    m=ndimage.binary_opening(m,iterations=2)
    lab,n=ndimage.label(m)
    objs=[]
    for i,sl in enumerate(ndimage.find_objects(lab)):
        area=(lab[sl]==i+1).sum()
        if area<3000: continue
        objs.append((sl,i+1))
    objs.sort(key=lambda o:(o[0][0].start//200,o[0][1].start))
    for j,(sl,idx) in enumerate(objs):
        mask=lab[sl]==idx
        mask=ndimage.binary_erosion(mask,iterations=1)
        a=ndimage.gaussian_filter(mask.astype(float),0.8)
        sub=np.dstack([im[sl],(a*255)]).astype(np.uint8)
        name=f'{k}{j}'
        Image.fromarray(sub,'RGBA').save(O+'/'+name+'.png')
        print(name, sl[1].start, sl[0].start, sub.shape[1], sub.shape[0])
