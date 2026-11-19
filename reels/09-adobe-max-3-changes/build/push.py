import json,os,datetime,re
from PIL import Image
S=os.path.dirname(os.path.abspath(__file__)); F=S+'/film'; P=S+'/push'
REF=dict(l.split() for l in """Allenoire-400.woff2 75a3a4a22acb3304c4889a9ea7b9bcde
Morven-400.woff2 154ee11070ed51a9961bbf7b0545f35c
Regarn-100.woff2 ebd80e6c283c37e8ad92179afcada1cf
Regarn-400.woff2 95bbd9041d49348c59e2e89f198380f4
Regarn-700.woff2 5454cf78ed7a1c3cc56df9e87ed3f14c
Regarn-900.woff2 811cec3c9458a6610cba819e025fcb38
adapter.webp d64017dd2c309496a8f00a8c885270cc
clipboard.webp 3ecba1df554f037266c83edb2ee04d39
computer.webp 7a00404a6c46d636e6347aa8e9f3c98d
dart.webp c2afa798c451c9061674054113f40857
dominoes.webp 04f3d0620272ecd7cb914c40de6a9eca
gavel.webp f48af93b82b049cf3346df5feeafc60d
grab.webp 7caa7764ea2bd7fbde48632a765b39cc
handmouse.webp ed5157a06d5939baca8edbac4fef2823
jukebox.webp d406447c159de85bdb839a1d6a873ac5
logo.webp 09841a1ce461bb2a45540cb6a744ff66
maxstage.webp 55e2a6c30ff63279a5961f6516f6c977
mcpstage.webp 5ea8ac7991dcd936f0a4f342aa9fef1a
paper2.webp 5c918c1a972d29ef7f7b7bc26616f3b4
pen.webp eb4dc01ff104fe1db65256d95ec74672
robomouse.webp b8f0e7dcb2801705b5a3e48fc907aac2
snail.webp d7c80e5dc74cc8df1258d65b0d85d6ec
stage.webp 8e222833f635a398dd1861fa64379231
stamp.webp 7ef9e2d431bbb510d5b748e82eeb8958
strip.webp 35fc06c5d616c7f0d32edce64f8e3c63
ticker.webp aa760c7f1eb2537eef7f4acb034fc0cb""".splitlines())
assert sorted(REF)==sorted(os.listdir(F+'/assets'))
for d in ['assets','film','modules']: os.makedirs(P+'/'+d,exist_ok=True)
W=[]
def put(col,doc,data):
    p=f'{P}/{col}/{doc}.json'; json.dump(data,open(p,'w')); W.append({"op":"set","collection":col,"doc_id":doc,"file_path":p})
for n,i in sorted(REF.items()):
    d={"ref":"/_blob/"+i}
    if n.endswith('.woff2'): d["mime"]="font/woff2"
    else:
        w,h=Image.open(F+'/assets/'+n).size; d.update(mime="image/webp",w=w,h=h)
    put('assets',n,d)
put('film','meta',{"v":1,"title":"Adobe MAX: 3 Changes That Matter","updatedAt":datetime.datetime.now(datetime.timezone.utc).isoformat()})
K={'css':'css','js':'js','json':'json'}
def mod(n): put('modules',n,{"kind":K[n.rsplit('.',1)[1]],"text":open(F+'/modules/'+n).read()})
mod('base.css'); mod('shared.js')
sc=json.load(open(F+'/modules/scenes.json'))
ids=[s['id'] for s in sc['scenes']]; print(ids)
for i in ids: mod(f'scene-{i}.js')
mod('score.js'); mod('scenes.json')
put('film','script',{"code":"window.CUT = kit.scenes();"})
json.dump(W,open(P+'/w.json','w')); print(len(W))
