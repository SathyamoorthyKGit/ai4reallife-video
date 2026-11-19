"""SFX stem builder template (copy, then set DUR, T and the scene events) - builds the stem from Sathya's library, timed to the film's scene clock."""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 117.4
import os
W = os.environ.get('SFX_WAV', 'library/sfx/')  # folder of the library WAVs (repo: library/sfx/)
T = dict(hook=0, max=4.85, versus=12.5, agent=19.9, models=36.9, mcp=56.9, chain=71.3, late=84.6, survey=93.3, payoff=107.2, brand=115.0)

_cache = {}
def load(name):
    if name not in _cache:
        sr, a = wavfile.read(W + name + '.wav'); _cache[name] = a.astype(np.float32) / 32768
    return _cache[name]

out = np.zeros((int(DUR * SR) + SR, 2), np.float32)

def put(name, t, at=0.0, db=0.0, pan=0.0, rate=1.0, trim=None, fade=0.08, fadein=0.0):
    """Place `name` so that sample time `at` (seconds, after trim) lands on film time t."""
    a = load(name)
    if trim:
        a = a[int(trim[0] * SR): int(trim[1] * SR) if trim[1] else None]
    if rate != 1.0:
        up, down = int(round(1000 / rate)), 1000
        a = resample_poly(a, up, down, axis=0).astype(np.float32)
        at = at / rate
    a = a.copy()
    n = len(a)
    if fade and n > 2:
        k = min(n, int(fade * SR)); a[-k:] *= np.linspace(1, 0, k)[:, None]
    if fadein:
        k = min(n, int(fadein * SR)); a[:k] *= np.linspace(0, 1, k)[:, None]
    g = 10 ** (db / 20)
    l, r = math.cos((pan + 1) * math.pi / 4) * math.sqrt(2), math.sin((pan + 1) * math.pi / 4) * math.sqrt(2)
    a[:, 0] *= g * l; a[:, 1] *= g * r
    s = int(round((t - at) * SR))
    if s < 0: a = a[-s:]; s = 0
    e = min(len(out), s + len(a)); out[s:e] += a[: e - s]

def rng(seed):
    s = [seed & 0xffffffff]
    def f():
        s[0] = (s[0] * 1664525 + 1013904223) & 0xffffffff
        return s[0] / 4294967296
    return f

# ── sample bank ──
KEYS = [3.94, 4.16, 4.475, 7.98, 8.185, 8.48, 10.405, 10.825, 12.115, 12.485, 12.735, 14.385, 14.585, 16.68, 19.15, 22.01]
SH = [0.53, 2.98, 5.59, 8.195]            # analog shutter clicks
R = rng(4242)
def key(t, db=-6, pan=0.0, rate=None):
    k = KEYS[int(R() * len(KEYS))]
    put('Mechanical_Keyboard', t, at=0.0, db=db, pan=pan, rate=rate or (0.94 + R() * 0.14), trim=(k - 0.01, k + 0.2), fade=0.05)
def letters(base, txt, seed, t0, span, db=-7):
    r = rng(seed)
    for i, c in enumerate(txt):
        x = base + t0 + r() * span
        if c != ' ': key(x, db, pan=(i / max(1, len(txt) - 1) - 0.5) * 0.8)
def count(t, d, db=-10, start=0.11, end=0.035):
    x = t
    while x < t + d:
        p = (x - t) / d; key(x, db + 3 * p, pan=(R() - 0.5) * 0.6, rate=1.0 + 0.15 * p)
        x += start + (end - start) * p
def shutter(t, db=-4, pan=0.0, i=None):
    c = SH[i if i is not None else int(R() * len(SH))]
    put('Analog_Shutter', t, at=0.0, db=db, pan=pan, trim=(c - 0.005, c + 0.32), fade=0.1)
def click(t, db=-2, pan=0.0, rate=1.0):
    put('1_Click_Mouse', t, at=0.03, db=db, pan=pan, rate=rate)
def whip(t, db=-6, pan=0.0, which=1):     # t = the fastest instant of the move
    n = {1: 'Deep_Whoosh_1', 2: 'Deep_Whoosh_2'}[which]
    put(n, t, at=0.52, db=db, pan=pan, fade=0.4)
def big_whoosh(t, db=-6, which=3):         # peak lands on t
    put('Deep_Whoosh_' + str(which), t, at={3: 0.73, 4: 0.87}[which], db=db, fade=0.6)
def fast(t, db=-8, pan=0.0, rate=1.0):     # little slide, peak on t
    put('Fast_Whoosh', t, at=0.21, db=db, pan=pan, rate=rate)
def slam(t, db=-4, pan=0.0):               # tapes and number lands
    fast(t - 0.02, -12, pan); put('Deep_Hit_3', t, at=0.01, db=db, pan=pan, fade=0.4); shutter(t, -10, pan)
def stamp(t, db=-2):                       # the big stamps
    fast(t - 0.03, -10); put('Deep_Hit', t, at=0.13, db=db, fade=0.8); put('Hit_1', t, at=0.04, db=db - 4); shutter(t + 0.01, -6)
def land(t, db=-8, pan=0.0):               # stickers landing
    put('Hit_2', t, at=0.1, db=db, pan=pan, trim=(0, 1.2), fade=0.5)
def pop(t, db=-8, pan=0.0):
    click(t, db, pan, rate=0.85 + R() * 0.4)
def glitch(t, db=-6, which=1):
    if which == 1: put('Glitch_1', t, at=0.05, db=db)
    else: put('Glitch_2', t, at=0.15, db=db)
def sub(t, db=-8, length=2.4):
    put('Impact__Subdrop', t, at=0.0, db=db, trim=(0, length), fade=1.2)



def SLOT(t): click(t, -4); land(t + 0.05, -12)
def IN(t, db=-9): fast(t, db)
# 1 hook: headlines rattle out of the ticker, freeze, three pulled
for i in range(10): key(i * 0.26, -9, pan=(0.4 if i % 2 else -0.4)); fast(i * 0.26 + 0.05, -15, (0.4 if i % 2 else -0.4), 1.2)
put('Deep_Whoosh_4', 3.03, at=0.87, db=-10, rate=0.7, fade=0.3)
put('Dramatic_Impact', 3.03, at=0.84, db=-3, trim=(1.0, 2.4), fade=0.6); put('Deep_Hit_3', 3.03, at=0.01, db=-2); shutter(3.04, -4)
for i in range(3): pop(3.3 + i * 0.12, -6, -0.4 + i * 0.4)
stamp(3.75, -1); whip(4.6, -5, 0, 2)
m = T['max']
land(m + 0.5, -7); fast(m + 1.0, -9, -0.6); SLOT(m + 1.2); letters(m, 'AI agents', 911, 6.4, 0.4); pop(m + 6.7, -6, 0.5); whip(m + 7.4, -5, 0.6, 1)
v = T['versus']
letters(v, 'Chatbot', 921, 0.6, 0.35); land(v + 0.7, -8, -0.4); pop(v + 1.0, -8, -0.4); pop(v + 1.5, -8, -0.4); slam(v + 1.6, -6, -0.4)
letters(v, 'Agent', 922, 2.9, 0.3); land(v + 3.1, -8, 0.4)
for a in [4.3, 4.9, 5.5]: click(v + a, -4, 0.4); key(v + a + 0.15, -8, 0.4)
slam(v + 4.9, -4, 0.4); whip(v + 7.2, -5, 0, 2)
a0 = T['agent']
stamp(a0 + 0.3, -1)
for a in [2.94, 3.77, 4.59, 5.64, 6.27]: SLOT(a0 + a)
stamp(a0 + 7.35, -2); IN(a0 + 7.95); land(a0 + 8.4, -8)
count(a0 + 9.85, 0.6, -12); fast(a0 + 9.9, -12, 0.5); slam(a0 + 9.85, -4)
slam(a0 + 11.7, -4); slam(a0 + 13.3, -4); put('Glitch_2', a0 + 13.5, at=0.15, db=-16); whip(a0 + 16.8, -5, -0.6, 1)
mo = T['models']
stamp(mo + 0.42, -1); land(mo + 1.6, -7)
for a in [4.13, 4.79, 5.76, 6.42]: SLOT(mo + a)
slam(mo + 7.6, -5, 0.5); slam(mo + 8.45, -5, 0.5)
IN(mo + 9.85); letters(mo, 'Best for the job', 931, 10.0, 0.45); slam(mo + 13.2, -3, -0.4); slam(mo + 13.8, -3, 0.4)
IN(mo + 14.75); letters(mo, 'Plan Mode', 932, 15.15, 0.4); land(mo + 15.7, -7)
for i in range(4): key(mo + 16.3 + i * 0.25, -10)
fast(mo + 18.0, -9, 0.6); stamp(mo + 18.45, 0)
for i in range(4): key(mo + 18.6 + i * 0.12, -6)
whip(mo + 19.8, -5, 0, 2)
mc = T['mcp']
stamp(mc + 0.4, -1); land(mc + 4.6, -7, -0.4); slam(mc + 4.6, -5); slam(mc + 6.0, -5); land(mc + 6.9, -8, 0.4); click(mc + 7.7, 0); shutter(mc + 7.72, -8)
IN(mc + 9.55); land(mc + 9.9, -7)
for a in [11.18, 12.06, 12.83, 13.4]: SLOT(mc + a)
whip(mc + 14.2, -5, 0.6, 1)
c = T['chain']
letters(c, 'Edits your files', 941, 1.9, 0.4); land(c + 0.9, -8, -0.4); land(c + 1.25, -9, 0.4)
for i in range(4): click(c + 5.3 + i * 0.45, -6, 0.4)
slam(c + 5.6, -3); IN(c + 8.2)
for a in [8.4, 10.6, 12.1]:
    SLOT(c + a)
    for k in range(3): key(c + a + 0.1 + k * 0.08, -9)
pop(c + 12.3, -7); whip(c + 13.15, -5, -0.6, 2)
l = T['late']
SLOT(l + 0.3); SLOT(l + 1.0); fast(l + 1.6, -14); stamp(l + 2.4, -2); IN(l + 3.75)
letters(l, 'Adobe is late', 951, 3.95, 0.4); put('Glitch_Bass', l + 4.4, db=-20, trim=(0, 1.2), fade=0.6); slam(l + 6.6, -2); whip(l + 8.5, -5, 0.6, 1)
s = T['survey']
stamp(s + 0.37, -1); land(s + 3.6, -7); fast(s + 3.75, -8, 0.5, 1.3); put('Deep_Hit_3', s + 3.9, at=0.01, db=-6); click(s + 3.92, -4)
count(s + 4.5, 0.8, -11); pop(s + 5.3, -6); IN(s + 9.55); count(s + 9.6, 0.8, -11); pop(s + 10.4, -6)
fast(s + 12.6, -8); stamp(s + 12.7, 0); put('Impact__Subdrop', s + 12.7, db=-14, trim=(0, 1.0), fade=0.6); whip(s + 13.7, -5, 0, 2)
p = T['payoff']
letters(p, 'AI', 961, 1.95, 0.2); land(p + 0.7, -8, -0.4); land(p + 2.9, -8, 0.4); slam(p + 4.9, -4, 0.4)
fast(p + 5.5, -8, -0.6); click(p + 5.85, -1, -0.3); slam(p + 6.0, -4, -0.4); stamp(p + 6.6, -1)
b = T['brand']
fast(b + 0.1, -8); glitch(b + 0.2, -10, 1)
put('Dramatic_Impact', b + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(b + 0.56, -6)
stem = out[: int(DUR * SR)]
k = int(0.6 * SR); stem[-k:] *= np.linspace(1, 0, k)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
