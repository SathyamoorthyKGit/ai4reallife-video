"""Builds the Harvard AI Warning SFX stem from Sathya's library, timed to the film's scene clock."""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 82.6
W = '/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r3/sfx/wav/'
T = dict(hook=0, modes=9.21, cyborg=14.08, centaur=18.79, selfauto=24.41, failure=32.08, meat=36.0, gap=44.08, leap=51.97, cost=58.28, moat=65.72, cta=74.5, brand=80.2)

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

# 1 hook: slots pop in, campus and mortarboard land, AI warning stamp, "isn't who you think"
put('Deep_Hit', 0.0, at=0.13, db=-3, fade=0.8); put('Impact__Subdrop', 0.0, db=-12, trim=(0, 2.0), fade=1.0)
SLOT(0.15); SLOT(0.45); land(0.55, -9, -0.4); fast(0.9, -12, 0.6); land(1.4, -9, 0.6)
stamp(3.75, -1); glitch(3.8, -16, 1)
big_whoosh(5.75, -10, 3); land(6.85, -11, -0.4); land(7.3, -10, -0.4)
letters(0, 'Isn’t who', 502, 7.6, 0.4, -7); letters(0, 'you think', 503, 8.1, 0.35, -7)
slam(8.0, -5, 0.4); whip(9.0, -5, 0.6, 1)
# 2 modes: corner slot, three ways, three stickers land
SLOT(T['modes'] + 0.15); letters(T['modes'], 'work with AI', 511, 0.3, 0.4, -7)
for i, d in enumerate([1.75, 2.05, 2.35]):
    land(T['modes'] + d + 0.25, -8, [-0.6, 0, 0.6][i]); pop(T['modes'] + d + 0.3, -10, [-0.6, 0, 0.6][i])
big_whoosh(T['modes'] + 4.8, -9, 4)
# 3 cyborg: side by side, real time
slam(T['cyborg'] + 0.33, -3); glitch(T['cyborg'] + 0.4, -15, 2)
fast(T['cyborg'] + 2.1, -13, 0.6, 0.7); fast(T['cyborg'] + 2.5, -13, -0.6, 0.7)
pop(T['cyborg'] + 3.7, -7); count(T['cyborg'] + 3.75, 0.5, -15); whip(T['cyborg'] + 4.55, -5, 0.6, 2)
# 4 centaur: divide cleanly, delegate the rest
slam(T['centaur'] + 0.3, -3); fast(T['centaur'] + 0.25, -11, -0.5); fast(T['centaur'] + 1.0, -14, 0, 0.6)
for i, d in enumerate([2.85, 4.35]):
    click(T['centaur'] + d, -4, [0.5, -0.4][i]); land(T['centaur'] + d + 0.03, -12, [0.5, -0.4][i])
whip(T['centaur'] + 5.45, -5, 0, 1)
# 5 self-automators: hit play, brain off, blindly accept
slam(T['selfauto'] + 0.42, -3); land(T['selfauto'] + 0.6, -8); land(T['selfauto'] + 1.4, -10, 0.6)
click(T['selfauto'] + 3.75, -1); click(T['selfauto'] + 3.85, -8, rate=1.2)
click(T['selfauto'] + 4.62, -1, 0.6, rate=0.8); put('Glitch_Bass', T['selfauto'] + 4.65, db=-16, trim=(0, 1.0), fade=0.6)
put('Deep_Whoosh_4', T['selfauto'] + 5.4, at=0.87, db=-13, rate=0.7, fade=0.8)
stamp(T['selfauto'] + 5.95, -1); big_whoosh(T['selfauto'] + 7.6, -9, 3)
# 6 failure
put('Deep_Hit_3', T['failure'] + 0.05, at=0.01, db=-5); letters(T['failure'], 'Straight to', 521, 1.1, 0.45, -7)
fast(T['failure'] + 1.5, -9); land(T['failure'] + 1.9, -5)
stamp(T['failure'] + 3.15, 0); put('Impact__Subdrop', T['failure'] + 3.15, db=-12, trim=(0, 1.6), fade=0.9); whip(T['failure'] + 3.8, -5, 0, 2)
# 7 meat interface: stamp, Ctrl C / Ctrl V hops, value drains to 0
for i, d in enumerate([0.4, 0.55, 0.7]): land(T['meat'] + d + 0.3, -10, [-0.6, 0, 0.6][i])
stamp(T['meat'] + 1.3, -1); glitch(T['meat'] + 1.35, -14, 1)
for hp in [2.75, 3.2, 3.65, 4.1, 4.55]:
    key(T['meat'] + hp + 0.2, -6, -0.3); key(T['meat'] + hp + 0.24, -9, -0.3)
    key(T['meat'] + hp + 0.42, -6, 0.5); key(T['meat'] + hp + 0.46, -9, 0.5)
count(T['meat'] + 5.7, 1.6, -11); stamp(T['meat'] + 7.3, 0); put('Deep_Hit_2', T['meat'] + 7.3, at=0.08, db=-12, fade=1.5)
whip(T['meat'] + 7.95, -5, -0.6, 1)
# 8 gap: K chart draws, power users, peak productivity
letters(T['gap'], 'Performance gap', 531, 0.9, 0.45, -7)
put('Deep_Whoosh_4', T['gap'] + 1.9, at=0.87, db=-12, fade=0.8); slam(T['gap'] + 2.5, -4, 0.3)
slam(T['gap'] + 4.5, -4, 0.3); fast(T['gap'] + 5.1, -11, 0.4, 1.3); pop(T['gap'] + 6.7, -7, 0.3)
whip(T['gap'] + 7.6, -5, 0, 2)
# 9 leap: left behind, resists AI, the junior leapfrogs
slam(T['leap'] + 0.6, -5, 0.3); land(T['leap'] + 0.9, -8)
letters(T['leap'], 'Left behind', 541, 2.1, 0.4, -7); fast(T['leap'] + 2.5, -13, 0, 0.6)
for k in range(4): click(T['leap'] + 3.15 + k * 0.15, -10 - k, rate=0.8 + k * 0.1)
big_whoosh(T['leap'] + 5.3, -8, 4); land(T['leap'] + 5.75, -5, 0.6); shutter(T['leap'] + 5.76, -8, 0.6)
big_whoosh(T['leap'] + 6.25, -9, 3)
# 10 cost: price tag $$$ -> $0, average
land(T['cost'] + 0.8, -7); letters(T['cost'], 'Basic expertise', 551, 1.8, 0.45, -7)
for d in [2.6, 3.05, 3.5]: key(T['cost'] + d, -4)
stamp(T['cost'] + 3.95, -1); put('Impact__Subdrop', T['cost'] + 3.95, db=-13, trim=(0, 1.6), fade=0.9)
fast(T['cost'] + 5.1, -11); put('Deep_Hit_3', T['cost'] + 6.55, at=0.01, db=-4); shutter(T['cost'] + 6.56, -8)
whip(T['cost'] + 7.3, -5, -0.6, 1)
# 11 moat: three rows slam in
pop(T['moat'] + 1.75, -8); fast(T['moat'] + 2.3, -10, 0, 1.3); key(T['moat'] + 2.55, -5)
for a in [3.45, 5.6, 7.1]:
    fast(T['moat'] + a - 0.05, -10, -0.5); slam(T['moat'] + a + 0.1, -4, 0.2)
put('Camera_Focus__Shutter', T['moat'] + 7.4, db=-12, fade=0.3); whip(T['moat'] + 8.65, -5, 0, 2)
# 12 cta: three questions, drop it in the comments
for i, a in enumerate([0.57, 1.58, 2.58]):
    land(T['cta'] + a + 0.2, -7, [-0.6, 0, 0.6][i]); pop(T['cta'] + a + 0.25, -8, [-0.6, 0, 0.6][i])
letters(T['cta'], 'Drop it in', 561, 3.85, 0.3, -6); letters(T['cta'], 'the comments', 562, 4.1, 0.35, -6)
fast(T['cta'] + 4.3, -10, 0.4); click(T['cta'] + 4.75, -3); click(T['cta'] + 5.05, -4)
# 13 brand sting
fast(T['brand'] + 0.1, -8); glitch(T['brand'] + 0.2, -10, 1)
put('Dramatic_Impact', T['brand'] + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(T['brand'] + 0.56, -6)
stem = out[: int(DUR * SR)]
k = int(0.6 * SR); stem[-k:] *= np.linspace(1, 0, k)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
print('ok', stem.shape, 20 * np.log10(np.sqrt((stem ** 2).mean())))
