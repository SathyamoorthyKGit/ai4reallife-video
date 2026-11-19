import sys
from pocketsphinx import Decoder
d=Decoder(samprate=16000)
raw=open(sys.argv[1],'rb').read()
d.start_utt(); d.process_raw(raw, full_utt=True); d.end_utt()
for s in d.seg():
    if s.word.startswith('<') or s.word.startswith('['): continue
    print(f"{s.start_frame/100:.2f} {s.word}")
