"""Builds the Clone Yourself SFX stem from Sathya's library, timed to the film's scene clock."""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 67.5
W = '/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r3/sfx/wav/'
T = dict(hook=0, search=4.75, step1=13.2, step2=25.9, step3=39.0, payoff=54.25, cta=60.1, brand=65.1)

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
def typing(t, n, cps, db=-12):
    for i in range(n): key(t + i / cps + (R() - 0.5) * 0.02, db, pan=(R() - 0.5) * 0.4)

# 1 hook: copier scan, four clones land, stamps
put('Glitch_Bass', 0.0, db=-20, trim=(0, 1.0), fade=0.5); fast(0.05, -10, 0.4, 0.6); put('Analog_Shutter', 0.92, at=0.0, db=-4, trim=(2.975, 3.3), fade=0.1)
letters(0, 'Clone yourself', 701, 0.5, 0.45, -7); letters(0, 'with AI', 702, 1.2, 0.35, -7)
for i in range(4): fast(1.05 + i * 0.14, -12, -0.5 + i * 0.33, 1.2); land(1.6 + i * 0.14, -9, -0.6 + i * 0.4)
whip(2.4, -6, 0, 2); stamp(2.47, -1); stamp(3.52, 0); whip(4.6, -5, 0.6, 1)
# 2 search bar
pop(T['search'] + 0.55, -6); typing(T['search'] + 0.9, 25, 20, -13); letters(T['search'], 'Search bar', 711, 1.4, 0.4, -7); land(T['search'] + 1.3, -8)
whip(T['search'] + 2.6, -6, 0, 2); slam(T['search'] + 2.94, -5, -0.4); slam(T['search'] + 3.6, -5, 0.4); slam(T['search'] + 4.6, -4)
count(T['search'] + 4.8, 1.8, -16, 0.12, 0.06); stamp(T['search'] + 6.25, -2); put('Impact__Subdrop', T['search'] + 6.25, db=-14, trim=(0, 1.4), fade=0.8); whip(T['search'] + 8.25, -5, 0, 1)
# 3 step 1
shutter(T['step1'] + 0.35, -3); pop(T['step1'] + 0.35, -6); letters(T['step1'], 'Capture your', 721, 1.3, 0.35, -7); letters(T['step1'], 'voice', 722, 1.8, 0.3, -7)
land(T['step1'] + 3.4, -6); slam(T['step1'] + 3.5, -5, 0.5); slam(T['step1'] + 4.3, -7); big_whoosh(T['step1'] + 5.6, -8, 3)
pop(T['step1'] + 5.9, -6); typing(T['step1'] + 7.6, 41, 15); click(T['step1'] + 10.2, -5); whip(T['step1'] + 10.6, -6, 0, 2)
letters(T['step1'], 'How you sound', 723, 11.0, 0.4, -7); glitch(T['step1'] + 11.0, -18, 2); whip(T['step1'] + 12.55, -5, -0.6, 1)
# 4 step 2
shutter(T['step2'] + 0.28, -3); pop(T['step2'] + 0.28, -6); letters(T['step2'], 'Capture how', 731, 1.25, 0.35, -7); letters(T['step2'], 'you think', 732, 1.75, 0.3, -7)
land(T['step2'] + 2.0, -8, -0.4); fast(T['step2'] + 2.4, -10, 0.6); click(T['step2'] + 2.65, -2, 0.5, rate=0.8)
whip(T['step2'] + 2.95, -6, 0, 2); typing(T['step2'] + 3.15, 58, 13); click(T['step2'] + 7.6, -5)
land(T['step2'] + 8.2, -8, -0.4); put('Camera_Focus__Shutter', T['step2'] + 8.1, db=-14, fade=0.3); whip(T['step2'] + 9.1, -6, 0, 1)
slam(T['step2'] + 9.6, -4, -0.3); slam(T['step2'] + 10.97, -4, -0.3); land(T['step2'] + 11.2, -8, 0.5); stamp(T['step2'] + 11.87, -1); fast(T['step2'] + 12.1, -10, 0.3); whip(T['step2'] + 12.95, -5, 0, 2)
# 5 step 3
shutter(T['step3'] + 0.47, -3); pop(T['step3'] + 0.47, -6); letters(T['step3'], 'Save it', 741, 1.5, 0.35, -7); put('Deep_Hit_3', T['step3'] + 1.75, at=0.01, db=-5); land(T['step3'] + 1.78, -8)
whip(T['step3'] + 2.2, -6, 0, 1); SLOT(T['step3'] + 2.61); slam(T['step3'] + 3.3, -7, 0.4); SLOT(T['step3'] + 4.42); slam(T['step3'] + 5.6, -7, 0.4)
whip(T['step3'] + 7.05, -6, 0, 2); slam(T['step3'] + 7.6, -6, -0.3); slam(T['step3'] + 8.5, -6, 0.3)
letters(T['step3'], 'Starts as you', 743, 9.62, 0.45, -7); pop(T['step3'] + 10.6, -7, 0.6); whip(T['step3'] + 11.85, -6, 0, 1)
for i, a in enumerate([12.06, 13.28, 14.25]): slam(T['step3'] + a, -4, [-0.3, 0.3, 0][i])
land(T['step3'] + 12.3, -8); typing(T['step3'] + 12.5, 12, 5, -10); whip(T['step3'] + 15.1, -5, 0.6, 2)
# 6 payoff
letters(T['payoff'], 'Changes', 751, 0.25, 0.4, -7); pop(T['payoff'] + 1.7, -6); slam(T['payoff'] + 2.0, -7); stamp(T['payoff'] + 2.6, -2)
land(T['payoff'] + 3.4, -9); fast(T['payoff'] + 3.55, -10, 0.6); slam(T['payoff'] + 3.62, -5, -0.5); slam(T['payoff'] + 4.26, -5); slam(T['payoff'] + 5.1, -5, 0.5)
put('Deep_Whoosh_4', T['payoff'] + 5.6, at=0.87, db=-6, fade=0.6)
# 7 cta
stamp(T['cta'] + 0.29, -1); land(T['cta'] + 0.6, -7, -0.4); land(T['cta'] + 1.55, -8, 0.5); letters(T['cta'], 'Tonight', 761, 2.3, 0.35, -7)
count(T['cta'] + 2.3, 0.8, -12, 0.04, 0.03); stamp(T['cta'] + 3.3, 0); put('Impact__Subdrop', T['cta'] + 3.3, db=-13, trim=(0, 1.5), fade=0.8); click(T['cta'] + 4.3, -6)
# 8 brand sting
fast(T['brand'] + 0.1, -8); glitch(T['brand'] + 0.2, -10, 1)
put('Dramatic_Impact', T['brand'] + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(T['brand'] + 0.56, -6)
stem = out[: int(DUR * SR)]
k = int(0.6 * SR); stem[-k:] *= np.linspace(1, 0, k)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
print('ok', stem.shape, 20 * np.log10(np.sqrt((stem ** 2).mean())))
