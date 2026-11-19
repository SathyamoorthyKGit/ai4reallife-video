kit.score(function (S, T) {
  // Sound design only, no music: each effect sits on the frame of its picture event.
  S.tempo(100, { t0: 0 });
  const fx = (n, t, o) => S.fx(n, Math.max(0, t), o || {});
  const dr = (n, t, v) => S.drum(n, { t: Math.max(0, t), vel: v });
  const SUCK = (t, d, v) => fx('whoosh', t - (d || 0.3), { dur: d || 0.3, vel: v || 42, into: 1 });
  const SLAM = (t, v, p) => { SUCK(t, 0.22, 36); fx('thud', t, { vel: v || 92, pan: p || 0 }); dr('clap', t, 50); dr('kick', t, 70); };
  const STAMP = (t, v) => { SUCK(t, 0.25, 40); fx('thud', t, { vel: v || 112 }); dr('snare', t, 70); dr('crash', t + 0.01, 32); dr('kick', t, 92); };
  const LAND = (t, v, p) => { fx('thud', t, { vel: v || 68, pan: p || 0 }); dr('tom', t, 44); };
  const WHIP = (t, p) => { fx('whoosh', t, { dur: 0.36, vel: 64, pan: p || 0 }); dr('hat', t + 0.02, 18); };
  const POP = (t, v, p) => fx('pop', t, { vel: v || 46, pan: p || 0 });
  const SLOT = t => { fx('pop', t, { vel: 62 }); dr('woodblock', t + 0.02, 34); fx('thud', t + 0.05, { vel: 46 }); };
  const LETTERS = (at, txt, seed, t0, span) => { const r = kit.rng(seed); const ts = []; for (const c of txt) { const x = at + t0 + r() * span; if (c !== ' ') ts.push(x); } S.ticks(ts, { vel: 26, jitter: 0.3 }); };
  // hook: the hammer comes down, the glove catches it
  fx('whoosh', 0, { dur: 2.3, vel: 34, pitch: -6, into: 1 }); STAMP(0.12, 120);
  dr('kick', 2.34, 110); fx('thud', 2.34, { vel: 116 }); dr('crash', 2.35, 40); fx('boing', 2.45, { vel: 40, pan: 0.2 }); STAMP(3.0, 108); WHIP(4.05, 0);
  // setup
  LETTERS(T.setup, 'One model', 801, 0.6, 0.4); LAND(T.setup + 0.5, 56); SLOT(T.setup + 0.55); fx('whoosh', T.setup + 0.95, { dur: 0.3, vel: 30, pan: 0.6 });
  fx('click', T.setup + 1.35, { vel: 50 }); STAMP(T.setup + 1.6, 108); fx('whoosh', T.setup + 2.7, { dur: 0.35, vel: 56 });
  [3.05, 4.5, 5.32].forEach((a, i) => { LAND(T.setup + a + 0.05, 60, [-0.6, 0, 0.6][i]); SLAM(T.setup + a + 0.1, 70, [-0.6, 0, 0.6][i]); });
  WHIP(T.setup + 6.45, 0.6);
  // haiku
  LETTERS(T.haiku, 'Haiku', 811, 0.25, 0.4); fx('click', T.haiku + 0.75, { vel: 80 }); fx('whoosh', T.haiku + 0.6, { dur: 0.25, vel: 40 }); SLAM(T.haiku + 1.0, 80);
  [2.16, 3.29, 4.4].forEach(a => { SLAM(T.haiku + a, 66, 0.4); fx('tick', T.haiku + a + 0.4, { vel: 60 }); });
  fx('whoosh', T.haiku + 5.7, { dur: 0.35, vel: 56 }); fx('whoosh', T.haiku + 6.0, { dur: 0.5, vel: 46, pan: -0.6 }); fx('sparkle', T.haiku + 6.4, { vel: 30, pan: 0.2 }); LETTERS(T.haiku, 'Fast answers', 812, 6.0, 0.4);
  STAMP(T.haiku + 7.22, 104); WHIP(T.haiku + 8.7, 0);
  // daily drivers
  LETTERS(T.daily, 'Sonnet 5.5', 821, 0.15, 0.4); LETTERS(T.daily, 'Opus 5.5', 822, 0.9, 0.4);
  fx('roll', T.daily + 1.6, { dur: 0.7, vel: 30, pitch: -5 }); fx('whoosh', T.daily + 1.6, { dur: 0.7, vel: 40, pan: -0.5 }); LAND(T.daily + 2.3, 56); SLAM(T.daily + 2.3, 84);
  fx('whoosh', T.daily + 3.2, { dur: 0.35, vel: 56 }); [3.72, 4.43, 5.11].forEach((a, i) => { LAND(T.daily + a, 58, [-0.6, 0, 0.6][i]); SLAM(T.daily + a + 0.1, 66, [-0.6, 0, 0.6][i]); });
  STAMP(T.daily + 6.04, 108); POP(T.daily + 7.9, 50); WHIP(T.daily + 8.2, -0.6);
  // fable
  STAMP(T.fable + 0.22, 116); SLOT(T.fable + 0.3); SLAM(T.fable + 1.5, 86); fx('whoosh', T.fable + 2.75, { dur: 0.35, vel: 56 });
  SLAM(T.fable + 3.0, 72); LAND(T.fable + 3.2, 72); fx('roll', T.fable + 3.3, { dur: 1.2, vel: 18, pitch: -8 });
  [3.5, 5.75, 6.93].forEach((a, i) => { LAND(T.fable + a, 58, [-0.6, 0, 0.6][i]); SLAM(T.fable + a + 0.1, 66, [-0.6, 0, 0.6][i]); });
  fx('whoosh', T.fable + 8.2, { dur: 0.35, vel: 56 }); LETTERS(T.fable, 'Get stuck', 831, 9.0, 0.4); fx('roll', T.fable + 8.5, { dur: 1.7, vel: 24, pitch: -10 }); fx('boing', T.fable + 9.6, { vel: 30 });
  fx('whoosh', T.fable + 10.4, { dur: 0.35, vel: 56 }); LETTERS(T.fable, 'Priciest', 832, 10.75, 0.4); LAND(T.fable + 10.95, 60);
  fx('ding', T.fable + 11.7, { vel: 40 }); STAMP(T.fable + 11.9, 112); SLAM(T.fable + 13.0, 90); WHIP(T.fable + 14.1, 0);
  // cta
  LAND(T.cta + 0.55, 60); SLAM(T.cta + 1.29, 76, -0.5); POP(T.cta + 1.35, 46, -0.3); SLAM(T.cta + 2.29, 60);
  fx('whoosh', T.cta + 2.4, { dur: 1.3, vel: 26, pitch: 6, pan: 0.5 }); POP(T.cta + 2.75, 50); POP(T.cta + 3.65, 56, 0.2); fx('chime', T.cta + 3.75, { vel: 30 });
  fx('whoosh', T.cta + 4.85, { dur: 0.35, vel: 56 }); STAMP(T.cta + 5.13, 112); [0, 1, 2].forEach(i => POP(T.cta + 5.45 + i * 0.15, 50, -0.5 + i * 0.5));
  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 }); fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
