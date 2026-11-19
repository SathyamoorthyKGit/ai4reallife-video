"""Builds the Sam Altman SFX stem from Sathya's library, timed to the film's scene clock."""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 94.12
W = '/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r3/sfx/wav/'
T = dict(hook=0, test=3.55, y2015=11.6, parrot=18.3, pattern=23.9, bet=32.1, retain=43.3, plan=53.6, rule1=58.9, rule2=63.7, rule3=68.3, future=75.1, cta=84.2, brand=91.72)

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
def shred(t, d):
    x = t
    while x < t + d:
        key(x, -12, pan=(R() - 0.5) * 0.6, rate=0.7 + R() * 0.2); x += 0.03

# 1 hook: frame 0 stamp, shredder, empty pocket
put('Impact__Subdrop', 0.0, db=-10, trim=(0, 2.2), fade=1.0); fast(0.2, -9, 0.4)
put('Deep_Hit', 0.25, at=0.13, db=0, fade=0.8); put('Hit_1', 0.25, at=0.04, db=-3); shutter(0.26, -4); put('Dramatic_Impact', 0.25, at=0.84, db=-6, trim=(1.0, 2.6), fade=0.8)
fast(0.55, -11, 0.6); fast(0.85, -12, -0.6); glitch(0.95, -16, 1); shred(0.95, 0.75)
land(1.85, -8, -0.4); slam(1.9, -3, 0.3); slam(2.1, -5, -0.2); SLOT(2.45); whip(3.4, -5, 0, 2)
# 2 test
SLOT(T['test'] + 0.2); land(T['test'] + 0.6, -9); stamp(T['test'] + 1.6, -1)
count(T['test'] + 2.6, 0.7, -12); click(T['test'] + 3.3, -6)
for i in range(7): click(T['test'] + 4.2 + i * 0.05, -12, (0.4 if i % 2 else -0.4), rate=0.8 + i * 0.05)
slam(T['test'] + 4.3, -4); whip(T['test'] + 5.4, -6, 0, 1)
put('Deep_Whoosh_4', T['test'] + 7.0, at=0.87, db=-6, rate=0.8, fade=0.8); put('Glitch_Bass', T['test'] + 6.6, db=-18, trim=(0, 0.8), fade=0.5)
letters(T['test'], 'Launched it', 601, 6.3, 0.35, -7); letters(T['test'], 'anyway', 602, 6.95, 0.3, -7); whip(T['test'] + 7.85, -5, 0.6, 2)
# 3 2015
stamp(T['y2015'] + 0.2, -1); letters(T['y2015'], 'Starting', 603, 1.15, 0.3, -12); stamp(T['y2015'] + 2.85, 0)
land(T['y2015'] + 4.6, -6); slam(T['y2015'] + 5.0, -5); whip(T['y2015'] + 6.5, -5, 0.6, 1)
# 4 parrot
fast(T['parrot'] + 0.45, -9, -0.6); letters(T['parrot'], 'Neural nets', 611, 0.9, 0.4, -7)
pop(T['parrot'] + 1.9, -5, 0.3); pop(T['parrot'] + 3.6, -5, 0.4); click(T['parrot'] + 3.7, -8, 0.4, rate=1.3); glitch(T['parrot'] + 3.62, -16, 2)
big_whoosh(T['parrot'] + 5.55, -9, 3)
# 5 pattern
pop(T['pattern'] + 0.2, -6); letters(T['pattern'], 'Pattern', 621, 0.9, 0.4, -7)
for i, d in enumerate([1.9, 2.56, 3.37]): land(T['pattern'] + d + 0.1, -8, [-0.6, 0, 0.6][i]); pop(T['pattern'] + d + 0.15, -10, [-0.6, 0, 0.6][i])
whip(T['pattern'] + 4.4, -6, 0, 2); put('Deep_Whoosh_4', T['pattern'] + 6.3, at=0.87, db=-12, rate=0.6, fade=0.8)
letters(T['pattern'], 'Super-linear', 622, 5.85, 0.4, -7); slam(T['pattern'] + 6.4, -4); whip(T['pattern'] + 7.95, -5, 0, 1)
# 6 bet
stamp(T['bet'] + 0.4, -1); land(T['bet'] + 1.8, -9); slam(T['bet'] + 2.6, -4, 0.3); whip(T['bet'] + 3.8, -6, 0, 2)
letters(T['bet'], 'The entire', 631, 4.4, 0.4, -7); stamp(T['bet'] + 5.0, 0); put('Impact__Subdrop', T['bet'] + 5.0, db=-12, trim=(0, 1.6), fade=0.9)
for i in range(6): click(T['bet'] + 4.1 + i * 0.07, -13, 0, rate=0.7 + i * 0.06)
fast(T['bet'] + 6.5, -9, 0.6); slam(T['bet'] + 6.57, -3); put('Glitch_Bass', T['bet'] + 6.6, db=-18, trim=(0, 1.0), fade=0.5); whip(T['bet'] + 7.4, -6, 0, 1)
letters(T['bet'], 'What GPT-4', 633, 8.6, 0.4, -7); pop(T['bet'] + 9.6, -6, 0.5); slam(T['bet'] + 10.1, -5); whip(T['bet'] + 10.95, -5, 0, 2)
# 7 retention
letters(T['retain'], 'Retention', 641, 1.6, 0.4, -7); count(T['retain'] + 0.5, 1.0, -14)
put('Deep_Whoosh_4', T['retain'] + 3.3, at=0.87, db=-10, rate=0.7, fade=0.6); stamp(T['retain'] + 2.95, -1); slam(T['retain'] + 3.45, -3)
slam(T['retain'] + 4.85, -5, 0.3); whip(T['retain'] + 6.1, -6, 0, 2)
count(T['retain'] + 6.35, 0.45, -15, 0.03, 0.02); click(T['retain'] + 6.78, -5); slam(T['retain'] + 7.85, -7); click(T['retain'] + 8.6, -4)
stamp(T['retain'] + 9.2, -1); put('Hit_2', T['retain'] + 9.65, at=0.1, db=-10, trim=(0, 0.6), fade=0.3); put('Hit_2', T['retain'] + 9.85, at=0.1, db=-13, trim=(0, 0.6), fade=0.3)
big_whoosh(T['retain'] + 10.25, -9, 4)
# 8 blueprint
letters(T['plan'], 'Extraordinary', 651, 1.2, 0.45, -7); fast(T['plan'] + 2.7, -10, 0.5, 0.6); land(T['plan'] + 2.5, -8, -0.5)
slam(T['plan'] + 2.6, -5); stamp(T['plan'] + 4.0, -1); whip(T['plan'] + 5.15, -5, -0.6, 1)
# 9-11 rules
for r in ['rule1', 'rule2', 'rule3']: shutter(T[r] + (0.15 if r == 'rule1' else 0.26), -3); pop(T[r] + (0.15 if r == 'rule1' else 0.26), -6)
land(T['rule1'] + 0.4, -8); land(T['rule1'] + 1.0, -9, -0.6); land(T['rule1'] + 2.8, -5, 0.6); put('Deep_Hit_3', T['rule1'] + 3.05, at=0.01, db=-10)
slam(T['rule1'] + 3.5, -5); whip(T['rule1'] + 4.6, -5, 0.6, 2)
letters(T['rule2'], 'Asking the right', 661, 1.1, 0.45, -8); fast(T['rule2'] + 1.2, -10); stamp(T['rule2'] + 1.9, -2)
slam(T['rule2'] + 2.95, -7); click(T['rule2'] + 3.65, -4); whip(T['rule2'] + 4.35, -5, 0, 1)
land(T['rule3'] + 1.3, -8); glitch(T['rule3'] + 1.5, -15, 2); letters(T['rule3'], 'Generic advice', 671, 1.9, 0.4, -8); stamp(T['rule3'] + 2.3, -1)
whip(T['rule3'] + 2.9, -6, 0, 2); letters(T['rule3'], 'Non-obvious', 672, 4.1, 0.4, -8)
for i in range(5): put('Hit_2', T['rule3'] + 3.5 + i * 0.35, at=0.1, db=-16 + i * 2, trim=(0, 0.6), fade=0.3, rate=1.2 - i * 0.05)
slam(T['rule3'] + 5.2, -4); whip(T['rule3'] + 6.6, -5, 0.6, 1)
# 12 future
slam(T['future'] + 1.37, -7); click(T['future'] + 1.95, -4); letters(T['future'], 'AI machines', 681, 2.75, 0.4, -7); land(T['future'] + 3.0, -8)
whip(T['future'] + 3.9, -6, 0, 2); slam(T['future'] + 4.2, -4); glitch(T['future'] + 4.97, -14, 1); pop(T['future'] + 4.97, -6, -0.5)
letters(T['future'], 'Math', 682, 5.6, 0.3, -9); pop(T['future'] + 5.75, -7, 0.5); land(T['future'] + 6.35, -7)
whip(T['future'] + 7.3, -6, 0, 1); letters(T['future'], 'Humanity', 683, 7.75, 0.4, -7)
put('Deep_Whoosh_3', T['future'] + 8.6, at=0.73, db=-4, fade=0.6); put('Impact__Subdrop', T['future'] + 8.0, db=-14, trim=(0, 1.2), fade=0.8)
# 13 cta
land(T['cta'] + 0.6, -8); slam(T['cta'] + 0.65, -5, -0.4); slam(T['cta'] + 1.59, -5, 0.4); whip(T['cta'] + 3.75, -6, 0, 2)
letters(T['cta'], 'Drop your', 691, 3.96, 0.35, -6); letters(T['cta'], 'thoughts', 692, 4.4, 0.35, -6)
click(T['cta'] + 4.9, -3); click(T['cta'] + 5.35, -4); slam(T['cta'] + 5.25, -4); put('Camera_Focus__Shutter', T['cta'] + 6.1, db=-12, fade=0.3)
# 14 brand sting
fast(T['brand'] + 0.1, -8); glitch(T['brand'] + 0.2, -10, 1)
put('Dramatic_Impact', T['brand'] + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(T['brand'] + 0.56, -6)
stem = out[: int(DUR * SR)]
k = int(0.6 * SR); stem[-k:] *= np.linspace(1, 0, k)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
print('ok', stem.shape, 20 * np.log10(np.sqrt((stem ** 2).mean())))
