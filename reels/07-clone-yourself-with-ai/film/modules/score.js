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
  const TYPE = (at, n, cps) => { const ts = []; for (let i = 0; i < n; i++) ts.push(at + i / cps); S.ticks(ts, { vel: 18, jitter: 0.2 }); };
  // hook: the copier hums and scans, four clones land
  fx('roll', 0, { dur: 0.9, vel: 30, pitch: 3 }); fx('revswell', 0.0, { dur: 0.85, vel: 26 }); fx('click', 0.92, { vel: 70 });
  LETTERS(0, 'Clone yourself', 701, 0.5, 0.45); LETTERS(0, 'with AI', 702, 1.2, 0.35);
  [0, 1, 2, 3].forEach(i => { fx('whoosh', 1.05 + i * 0.14, { dur: 0.25, vel: 30, pan: -0.5 + i * 0.33 }); LAND(1.6 + i * 0.14, 52, -0.6 + i * 0.4); });
  fx('whoosh', 2.4, { dur: 0.35, vel: 56 }); STAMP(2.47, 112); STAMP(3.52, 116); WHIP(4.6, 0.6);
  // search bar
  POP(T.search + 0.55, 50); TYPE(T.search + 0.9, 25, 20); LETTERS(T.search, 'Search bar', 711, 1.4, 0.4); LAND(T.search + 1.3, 56);
  fx('whoosh', T.search + 2.6, { dur: 0.35, vel: 56 }); SLAM(T.search + 2.94, 76, -0.4); SLAM(T.search + 3.6, 76, 0.4); SLAM(T.search + 4.6, 80);
  fx('roll', T.search + 4.7, { dur: 2.2, vel: 18, pitch: -3 }); STAMP(T.search + 6.25, 104); WHIP(T.search + 8.25, 0);
  // step 1
  POP(T.step1 + 0.35, 66); LETTERS(T.step1, 'Capture your', 721, 1.3, 0.35); LETTERS(T.step1, 'voice', 722, 1.8, 0.3);
  LAND(T.step1 + 3.4, 64); SLAM(T.step1 + 3.5, 80, 0.5); SLAM(T.step1 + 4.3, 66); fx('whoosh', T.step1 + 5.3, { dur: 0.6, vel: 50, into: 1 }); fx('whoosh', T.step1 + 5.45, { dur: 0.3, vel: 40 });
  POP(T.step1 + 5.9, 50); TYPE(T.step1 + 7.6, 41, 15); fx('ding', T.step1 + 10.2, { vel: 30 }); fx('whoosh', T.step1 + 10.6, { dur: 0.35, vel: 56 });
  LETTERS(T.step1, 'How you sound', 723, 11.0, 0.4); fx('sparkle', T.step1 + 11.2, { vel: 30 }); WHIP(T.step1 + 12.55, -0.6);
  // step 2
  POP(T.step2 + 0.28, 66); LETTERS(T.step2, 'Capture how', 731, 1.25, 0.35); LETTERS(T.step2, 'you think', 732, 1.75, 0.3);
  LAND(T.step2 + 2.0, 56, -0.4); fx('whoosh', T.step2 + 2.3, { dur: 0.3, vel: 36, pan: 0.6 }); fx('click', T.step2 + 2.65, { vel: 70, pan: 0.5 });
  fx('whoosh', T.step2 + 2.95, { dur: 0.35, vel: 56 }); TYPE(T.step2 + 3.15, 58, 13); fx('ding', T.step2 + 7.6, { vel: 30 });
  LAND(T.step2 + 8.2, 56, -0.4); fx('revswell', T.step2 + 8.0, { dur: 0.3, vel: 20 }); fx('whoosh', T.step2 + 9.1, { dur: 0.35, vel: 56 });
  SLAM(T.step2 + 9.6, 84, -0.3); SLAM(T.step2 + 10.97, 84, -0.3); LAND(T.step2 + 11.2, 56, 0.5); STAMP(T.step2 + 11.87, 110); fx('whoosh', T.step2 + 12.0, { dur: 0.4, vel: 30, pan: 0.3 }); WHIP(T.step2 + 12.95, 0);
  // step 3
  POP(T.step3 + 0.47, 66); LETTERS(T.step3, 'Save it', 741, 1.5, 0.35); LAND(T.step3 + 1.75, 70); dr('snare', T.step3 + 1.8, 40);
  fx('whoosh', T.step3 + 2.2, { dur: 0.35, vel: 56 }); SLOT(T.step3 + 2.61); SLAM(T.step3 + 3.3, 66, 0.4); SLOT(T.step3 + 4.42); SLAM(T.step3 + 5.6, 66, 0.4);
  fx('whoosh', T.step3 + 7.05, { dur: 0.35, vel: 56 }); SLAM(T.step3 + 7.6, 70, -0.3); SLAM(T.step3 + 8.5, 70, 0.3);
  LETTERS(T.step3, 'Starts as you', 743, 9.62, 0.45); POP(T.step3 + 10.6, 46, 0.6); fx('whoosh', T.step3 + 11.85, { dur: 0.35, vel: 56 });
  [12.06, 13.28, 14.25].forEach((a, i) => SLAM(T.step3 + a, 84, [-0.3, 0.3, 0][i])); LAND(T.step3 + 12.3, 56);
  S.ticks([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => T.step3 + 12.5 + i * 0.2), { vel: 22, jitter: 0.2 }); WHIP(T.step3 + 15.1, 0.6);
  // payoff
  LETTERS(T.payoff, 'Changes', 751, 0.25, 0.4); POP(T.payoff + 1.7, 50); SLAM(T.payoff + 2.0, 66); STAMP(T.payoff + 2.6, 100);
  LAND(T.payoff + 3.4, 52); fx('whoosh', T.payoff + 3.55, { dur: 0.3, vel: 36, pan: 0.6 }); SLAM(T.payoff + 3.62, 76, -0.5); fx('roll', T.payoff + 3.85, { dur: 0.8, vel: 18, pitch: 5 });
  SLAM(T.payoff + 4.26, 76); SLAM(T.payoff + 5.1, 80, 0.5); fx('whoosh', T.payoff + 5.1, { dur: 0.7, vel: 56, pan: 0.6 });
  // cta
  STAMP(T.cta + 0.29, 112); LAND(T.cta + 0.6, 60, -0.4); LAND(T.cta + 1.55, 56, 0.5); LETTERS(T.cta, 'Tonight', 761, 2.3, 0.35);
  fx('roll', T.cta + 2.3, { dur: 0.8, vel: 30, pitch: 12 }); STAMP(T.cta + 3.3, 110); fx('chime', T.cta + 4.3, { vel: 30 });
  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 }); fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
