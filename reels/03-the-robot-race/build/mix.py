"""Builds the Robot Race SFX stem from Sathya's library, timed to the film's scene clock."""
import numpy as np, math, sys
from scipy.io import wavfile
from scipy.signal import resample_poly

SR = 48000
DUR = 72.7
W = '/tmp/claude-0/-home-claude/209ed91e-ed39-530a-9c9f-4a0c5424de8b/scratchpad/r3/sfx/wav/'
T = dict(hook=0, count=5.2, usjp=12.26, guess=19.4, food=26.15, world=28.8, fleet=35.38, forecast=39.7, drivers=43.95,
         leave=47.15, jobs=51.38, tariffs=57.67, proof=62.86, check=66.07, brand=70.3)

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

# 1 hook: robots drop onto the scale until China outweighs the world
sub(0.0, -14, 3.0); letters(0, 'China', 31, 0.15, 0.4, -6); slam(0.55, -10, -0.5)
for i, d in enumerate([0.3, 0.4, 0.5, 0.6]): pop(d + 0.08, -14, 0.5)
for i, d in enumerate([1.05, 1.4, 1.75, 2.1]):
    fast(d - 0.08, -14, -0.5, rate=0.8); land(d, -6 + i, -0.5); put('Deep_Hit_3', d, at=0.01, db=-16 + i * 2, pan=-0.5, fade=0.3)
put('Hit_1', 2.55, at=0.04, db=-12); whip(5.12, -5, 0, 1)
# 2 count: 354,000, then 59%
glitch(T['count'], -6, 1); whip(T['count'] + 0.15, -9, 0, 2)
count(T['count'] + 0.3, 2.0); pop(T['count'] + 0.95, -6, 0.4); land(T['count'] + 1.6, -9, -0.6)
slam(T['count'] + 2.3, -3)
whip(T['count'] + 3.15, -8, 0, 1); stamp(T['count'] + 3.42, 0); put('Deep_Hit_2', T['count'] + 3.42, at=0.08, db=-12, fade=2.0)
count(T['count'] + 3.6, 1.5, -13, 0.07, 0.03)
whip(T['count'] + 6.92, -5, 0.6, 2)
# 3 usjp: bars race, the US overtakes Japan
letters(T['usjp'], 'US passes Japan', 41, 0.4, 0.5, -8)
for d in [0.6, 0.85, 0.8, 0.95, 1.05]: fast(T['usjp'] + d, -15, 0.3, rate=0.9)
for d in [0.95, 1.1, 1.05, 1.15, 1.25]: pop(T['usjp'] + d, -14, 0.6)
fast(T['usjp'] + 1.6, -9, 0.5, 0.8); land(T['usjp'] + 1.8, -6); fast(T['usjp'] + 1.85, -10, -0.3)
stamp(T['usjp'] + 2.25, -2)
whip(T['usjp'] + 3.5, -9, 0, 1); count(T['usjp'] + 3.5, 1.1, -11); slam(T['usjp'] + 4.6, -3); pop(T['usjp'] + 5.45, -8)
whip(T['usjp'] + 6.97, -5, 0, 2)
# 4 guess: car plants? then the factory, −1%
letters(T['guess'], 'Car plants', 51, 0.3, 0.45, -6); land(T['guess'] + 0.6, -8, -0.2)
click(T['guess'] + 1.0, -2, 0.5); put('Hit_1', T['guess'] + 1.0, at=0.04, db=-12, pan=0.5)
big_whoosh(T['guess'] + 1.85, -8, 3); land(T['guess'] + 2.0, -6)
slam(T['guess'] + 2.45, -4, -0.3); pop(T['guess'] + 2.9, -8); stamp(T['guess'] + 3.7, -2)
whip(T['guess'] + 6.6, -5, -0.6, 1)
# 5 food: bottling line, +30%
slam(T['food'] + 0.4, -5, -0.3); stamp(T['food'] + 0.85, -1); pop(T['food'] + 1.35, -8)
big_whoosh(T['food'] + 2.6, -5, 4)
# 6 world: map pins, 603,000
put('Deep_Hit_3', T['world'] + 0.05, at=0.01, db=-8); letters(T['world'], 'Speeding up', 61, 0.55, 0.45, -7)
for i, x in enumerate([0.74, 0.86, 0.815, 0.2, 0.505, 0.17, 0.69, 0.525, 0.54, 0.79]): pop(T['world'] + 1.0 + i * 0.13, -9, (x - 0.5) * 1.4)
whip(T['world'] + 2.98, -9, 0, 2); count(T['world'] + 3.3, 1.7)
for i in range(3): land(T['world'] + 3.65 + i * 0.22, -9, [-0.6, 0, 0.6][i])
slam(T['world'] + 5.0, -3); big_whoosh(T['world'] + 6.45, -6, 3)
# 7 fleet: 5,000,000 robots, more than double
glitch(T['fleet'] + 0.02, -12, 2); count(T['fleet'] + 0.2, 1.7)
for k in range(20): pop(T['fleet'] + 0.25 + k * 0.07, -13, ((k % 5) - 2) / 2.5)
slam(T['fleet'] + 1.9, -4); stamp(T['fleet'] + 2.45, 0); whip(T['fleet'] + 4.15, -5, 0, 1)
# 8 forecast: three bars rise, 806,000
count(T['forecast'] + 0.3, 1.9, -12)
for a, b, p in [(0.35, 0.95, -0.6), (0.75, 1.35, 0), (1.25, 2.1, 0.5)]: fast(T['forecast'] + b - 0.1, -12, p, rate=0.7); land(T['forecast'] + b, -8, p)
slam(T['forecast'] + 2.2, -2); put('Deep_Hit_2', T['forecast'] + 2.2, at=0.08, db=-14, fade=1.5)
big_whoosh(T['forecast'] + 4.15, -5, 4)
# 9 drivers: the eye, AI + machine vision, labour shortages (lens focus whirr, then the shutter)
put('Camera_Focus__Shutter', T['drivers'] + 1.7, at=1.795, db=-6, trim=(1.6, 3.75), fade=0.15, fadein=0.2)
for d in [0.3, 0.36, 0.42, 0.48]: click(T['drivers'] + d, -9, (d - 0.39) * 8)
slam(T['drivers'] + 0.55, -4); put('Glitch_Bass', T['drivers'] + 0.55, db=-16, trim=(0, 0.5), fade=0.3)
slam(T['drivers'] + 1.7, -4, 0.2); big_whoosh(T['drivers'] + 3.1, -6, 3)
# 10 leave: a robot climbs out of the laptop, the screen tears open into a factory
put('Deep_Hit_3', T['leave'] + 0.05, at=0.01, db=-10); letters(T['leave'], 'The screen', 71, 0.6, 0.45, -7)
fast(T['leave'] + 1.2, -10, 0, 0.7); land(T['leave'] + 1.6, -5)
glitch(T['leave'] + 2.1, -6, 2); big_whoosh(T['leave'] + 2.65, -4, 4); put('Dramatic_Impact', T['leave'] + 2.72, at=0.64, db=-4, trim=(1.2, 5.0), fade=1.5)
slam(T['leave'] + 2.85, -6, -0.3); slam(T['leave'] + 3.2, -6, 0.3)
# 11 jobs: −68,000, workers fade and walk off, the easy headline
glitch(T['jobs'], -4, 1); sub(T['jobs'] + 0.05, -10, 3.0)
for i, d in enumerate([0.75, 0.9, 1.05]): land(T['jobs'] + d, -10, [-0.5, -0.1, 0.3][i])
count(T['jobs'] + 0.4, 2.2, -12, 0.14, 0.05); stamp(T['jobs'] + 2.6, -1); put('Deep_Hit_2', T['jobs'] + 2.6, at=0.08, db=-12, fade=2.0)
k = 1
while k * math.pi / 9 < 4.6:
    x = k * math.pi / 9
    if x > 3.3: put('Hit_2', T['jobs'] + x, at=0.1, db=-24 + (k % 2) * 3, pan=0.3 + (x - 3.3) * 0.3, trim=(0, 0.35), fade=0.2, rate=1.6)
    k += 1
put('Dramatic_Impact', T['jobs'] + 4.65, at=0.84, db=-2, trim=(1.0, 6.5), fade=1.8); shutter(T['jobs'] + 4.66, -6)
land(T['jobs'] + 5.4, -8, 0.4); whip(T['jobs'] + 6.12, -5, 0.6, 2)
# 12 tariffs: the port, the stamp, eight months crossed out
fast(T['tariffs'] + 0.75, -10, 0.4); land(T['tariffs'] + 0.95, -8, 0.4); stamp(T['tariffs'] + 1.0, 0)
whip(T['tariffs'] + 2.2, -9, 0, 1); letters(T['tariffs'], '8 months', 81, 2.45, 0.35, -8)
for i in range(8): pop(T['tariffs'] + 2.5 + i * 0.05, -16, ((i % 4) - 1.5) / 2.5)
for j in range(16):
    i, a = j >> 1, T['tariffs'] + 2.9 + (j >> 1) * 0.26 + (j & 1) * 0.09
    fast(a + 0.06, -15, ((i % 4) - 1.5) / 2.5, rate=1.5)
    if j & 1: key(a + 0.11, -9, ((i % 4) - 1.5) / 2.5)
big_whoosh(T['tariffs'] + 5.05, -6, 3)
# 13 proof: two lines, the magnifier, not proof
letters(T['proof'], 'Two lines', 91, 0.2, 0.4, -7)
fast(T['proof'] + 0.7, -12, 0.5, 0.6); fast(T['proof'] + 0.85, -12, -0.5, 0.55)
pop(T['proof'] + 1.0, -9, 0.4); pop(T['proof'] + 1.15, -9, 0.4); fast(T['proof'] + 1.5, -13, 0.2, 0.5)
stamp(T['proof'] + 2.1, 0); put('Deep_Hit_2', T['proof'] + 2.1, at=0.08, db=-12, fade=1.0); whip(T['proof'] + 3.08, -5, 0, 1)
# 14 check: check what else happened
letters(T['check'], 'Check what', 101, 0.3, 0.35, -7); letters(T['check'], 'else happened', 102, 0.55, 0.4, -7)
land(T['check'] + 0.75, -7)
for i, d in enumerate([1.5, 1.9, 2.3]): click(T['check'] + d, -3, [-0.6, 0.6, 0.3][i], rate=0.9); put('Hit_1', T['check'] + d, at=0.04, db=-16, pan=[-0.6, 0.6, 0.3][i])
pop(T['check'] + 2.8, -8, -0.4); big_whoosh(T['check'] + 4.2, -5, 4)
# 15 brand sting
glitch(T['brand'] + 0.02, -10, 1); put('Dramatic_Impact', T['brand'] + 0.55, at=0.84, db=0, trim=(1.0, None), fade=0.6); shutter(T['brand'] + 0.56, -6)

stem = out[: int(DUR * SR)]
# fade the last 0.6 s, then peak-normalise to −1 dBFS
k = int(0.6 * SR); stem[-k:] *= np.linspace(1, 0, k)[:, None]
stem *= 10 ** (-1 / 20) / max(1e-6, np.abs(stem).max())
wavfile.write(sys.argv[1], SR, (stem * 32767).astype(np.int16))
print('ok', stem.shape, 20 * np.log10(np.sqrt((stem ** 2).mean())))
