"""Builds the Robot Race SFX stem from Sathya's library, timed to the film's scene clock."""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 54.0
W = '/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r3/sfx/wav/'
T = dict(hook=0, anth=5.03, bubble=9.18, loop=12.24, crack=21.38, slow=26.2, loss=31.22, profit=39.66, cta=45.03, brand=51.6)

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


# 1 hook: 94 stamp, pages riffle, the S-1 stack
put('Deep_Hit', 0.0, at=0.13, db=-2, fade=0.8); shutter(0.01, -5); put('Hit_1', 0.0, at=0.04, db=-6)
for i in range(7): fast(0.55 + i * 0.2 + 0.15, -14, -0.4, rate=1.3)
whip(2.65, -9, -0.6, 2); letters(0, 'IPO filing', 401, 2.9, 0.4, -7); land(2.95, -8)
fast(3.5, -10); stamp(3.55, -2); whip(4.9, -5, 0.6, 1)
# 2 anth: logo slot, trading clip, shaky
click(T['anth'] + 0.2, -2); land(T['anth'] + 0.22, -10); pop(T['anth'] + 0.85, -9)
big_whoosh(T['anth'] + 1.6, -10, 3); slam(T['anth'] + 1.75, -4, 0.4); fast(T['anth'] + 2.6, -12, 0.3, 0.6)
stamp(T['anth'] + 3.2, -1); glitch(T['anth'] + 3.25, -14, 1); whip(T['anth'] + 4.08, -5, 0, 2)
# 3 bubble: inflate, the pin creeps, here's the loop
letters(T['bubble'], 'Popping?', 411, 0.2, 0.45, -7); big_whoosh(T['bubble'] + 1.55, -12, 4)
click(T['bubble'] + 1.6, -6, 0.4); slam(T['bubble'] + 2.2, -4); whip(T['bubble'] + 3.0, -5, 0, 1)
# 4 loop
click(T['loop'] + 0.15, -2); land(T['loop'] + 0.17, -10); letters(T['loop'], 'The loop', 421, 0.1, 0.35, -7)
for i, a in enumerate([0.21, 2.04, 4.21, 6.62]):
    fast(T['loop'] + a + 0.5, -11, [0.6, 0.3, -0.6, -0.3][i], rate=0.7); pop(T['loop'] + a + 0.8, -8, [0.6, 0, -0.6, -0.2][i])
land(T['loop'] + 0.6, -7, 0.6); count(T['loop'] + 0.45, 0.6, -13)
glitch(T['loop'] + 2.05, -12, 1); land(T['loop'] + 2.45, -6)
land(T['loop'] + 4.6, -7, -0.6); stamp(T['loop'] + 4.9, -2)
put('Hit_2', T['loop'] + 7.0, at=0.1, db=-12, trim=(0, 1.0), fade=0.5); big_whoosh(T['loop'] + 9.05, -5, 4)
# 5 crack: padlock and chain, one demand source, constant demand
letters(T['crack'], 'One thing', 431, 0.3, 0.4, -7); fast(T['crack'] + 1.15, -8, -0.5, 0.8)
put('Deep_Hit_3', T['crack'] + 1.45, at=0.01, db=-2); put('Hit_1', T['crack'] + 1.45, at=0.04, db=-6); shutter(T['crack'] + 1.46, -7)
slam(T['crack'] + 2.3, -3); whip(T['crack'] + 2.85, -9, 0, 2); slam(T['crack'] + 3.15, -5, 0.2)
put('Glitch_Bass', T['crack'] + 3.2, db=-18, trim=(0, 1.2), fade=0.6); big_whoosh(T['crack'] + 4.7, -6, 3)
# 6 slow: the loop spins down
letters(T['slow'], 'Pull back', 441, 0.2, 0.4, -7); count(T['slow'] + 0.1, 2.5, -14, 0.05, 0.25)
put('Deep_Whoosh_4', T['slow'] + 1.2, at=0.87, db=-12, rate=0.7, fade=1.0)
stamp(T['slow'] + 2.9, -2); stamp(T['slow'] + 3.98, -1); whip(T['slow'] + 4.9, -5, -0.6, 1)
# 7 loss: logo slot, −$80.7B, ~$72.4B accounting
click(T['loss'] + 0.25, -2); land(T['loss'] + 0.27, -10); whip(T['loss'] + 1.9, -9, 0, 2)
count(T['loss'] + 2.0, 2.6); stamp(T['loss'] + 4.6, 0); put('Deep_Hit_2', T['loss'] + 4.6, at=0.08, db=-12, fade=2.0)
fast(T['loss'] + 5.8, -10); count(T['loss'] + 5.95, 1.45, -12); land(T['loss'] + 6.3, -8)
put('Mechanical_Keyboard', T['loss'] + 6.4, at=0.0, db=-10, trim=(19.14, 20.9), fade=0.3); slam(T['loss'] + 7.4, -3)
big_whoosh(T['loss'] + 8.35, -6, 4)
# 8 profit: rubber stamp, the pin bends
letters(T['profit'], 'Q2 profit', 451, 0.3, 0.4, -7); fast(T['profit'] + 1.1, -9)
put('Deep_Hit', T['profit'] + 1.15, at=0.13, db=-2, fade=0.8); shutter(T['profit'] + 1.16, -5); fast(T['profit'] + 1.5, -11, 0, 0.7)
whip(T['profit'] + 3.15, -9, 0, 1); fast(T['profit'] + 3.6, -10, 0.5, 0.8)
put('Hit_2', T['profit'] + 3.75, at=0.1, db=-6, trim=(0, 1.0), fade=0.5); click(T['profit'] + 3.76, -6, rate=0.7)
stamp(T['profit'] + 3.95, 0); put('Impact__Subdrop', T['profit'] + 3.95, db=-14, trim=(0, 1.8), fade=1.0); whip(T['profit'] + 5.3, -5, 0, 2)
# 9 cta
letters(T['cta'], 'Cheaper tokens', 461, 0.3, 0.45, -7); land(T['cta'] + 0.85, -7, -0.3)
for i in range(5): click(T['cta'] + 0.9 + i * 0.06, -12 - i, -0.3, rate=0.8 + i * 0.1)
fast(T['cta'] + 1.0, -12, 0.5, 0.8); fast(T['cta'] + 1.5, -9, 0.5, 1.4); pop(T['cta'] + 1.75, -7, 0.5)
whip(T['cta'] + 2.75, -9, 0, 1); letters(T['cta'], 'Save this', 462, 3.0, 0.35, -6)
fast(T['cta'] + 3.4, -10, 0.4); click(T['cta'] + 3.6, -3); click(T['cta'] + 3.9, -3); pop(T['cta'] + 5.2, -8)
# 10 brand sting
glitch(T['brand'] + 0.02, -10, 1); put('Dramatic_Impact', T['brand'] + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(T['brand'] + 0.56, -6)
stem = out[: int(DUR * SR)]
# fade the last 0.6 s, then peak-normalise to −1 dBFS
k = int(0.6 * SR); stem[-k:] *= np.linspace(1, 0, k)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
print('ok', stem.shape, 20 * np.log10(np.sqrt((stem ** 2).mean())))
