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
  // hook
  fx('thud', 0.0, { vel: 100 }); dr('kick', 0, 96); fx('revswell', 0, { dur: 0.3, vel: 30 }); SLOT(0.15); SLOT(0.45);
  for (let i = 0; i < 6; i++) dr('sidestick', 0.3 + i * 0.625, 16);
  LAND(0.55, 56, -0.4); fx('whoosh', 0.9, { dur: 0.45, vel: 36, pan: 0.6 }); LAND(1.4, 50, 0.6); STAMP(3.75, 112);
  fx('whoosh', 5.6, { dur: 0.45, vel: 50 }); LETTERS(0, 'Isn’t who', 502, 7.6, 0.4); LETTERS(0, 'you think', 503, 8.1, 0.35); LAND(7.3, 52, -0.4); fx('boing', 8.0, { vel: 60, pan: 0.4 }); WHIP(9.0, 0.6);
  // modes
  SLOT(T.modes + 0.15); LETTERS(T.modes, 'work with AI', 511, 0.3, 0.4); [1.75, 2.05, 2.35].forEach((d, i) => { LAND(T.modes + d + 0.25, 56, [-0.6, 0, 0.6][i]); POP(T.modes + d + 0.3, 40, [-0.6, 0, 0.6][i]); }); fx('revswell', T.modes + 4.87, { dur: 0.4, vel: 44 });
  // cyborg
  SLAM(T.cyborg + 0.33, 86); fx('sparkle', T.cyborg + 0.4, { vel: 26 }); fx('whoosh', T.cyborg + 2.1, { dur: 0.6, vel: 30, pan: 0.6 }); fx('whoosh', T.cyborg + 2.5, { dur: 0.6, vel: 30, pan: -0.6 }); POP(T.cyborg + 3.7, 44); fx('ding', T.cyborg + 3.75, { vel: 26 }); WHIP(T.cyborg + 4.55, 0.6);
  // centaur
  SLAM(T.centaur + 0.3, 86); fx('whoosh', T.centaur + 0.25, { dur: 0.5, vel: 34, pan: -0.5 }); fx('whoosh', T.centaur + 1.0, { dur: 0.6, vel: 22, pitch: 5 }); [2.85, 4.35].forEach((d, i) => { POP(T.centaur + d, 52, [0.5, -0.4][i]); dr('woodblock', T.centaur + d + 0.02, 26); }); WHIP(T.centaur + 5.45, 0);
  // self-automators
  SLAM(T.selfauto + 0.42, 86); LAND(T.selfauto + 0.6, 56); LAND(T.selfauto + 1.4, 48, 0.6); fx('click', T.selfauto + 3.75, { vel: 80 }); fx('doubleclick', T.selfauto + 3.8, { vel: 30 });
  fx('click', T.selfauto + 4.62, { vel: 90, pan: 0.6 }); dr('cowbell', T.selfauto + 4.63, 20); fx('whoosh', T.selfauto + 4.8, { dur: 0.7, vel: 26, pitch: -8, into: 0 }); STAMP(T.selfauto + 5.95, 110); fx('revswell', T.selfauto + 7.67, { dur: 0.4, vel: 44 });
  // failure
  fx('thud', T.failure + 0.05, { vel: 80 }); LETTERS(T.failure, 'Straight to', 521, 1.1, 0.45); fx('whoosh', T.failure + 1.3, { dur: 0.6, vel: 40 }); LAND(T.failure + 1.9, 70); STAMP(T.failure + 3.15, 120); WHIP(T.failure + 3.8, 0);
  // meat interface
  STAMP(T.meat + 1.3, 116); [0.4, 0.55, 0.7].forEach((d, i) => LAND(T.meat + d + 0.3, 50, [-0.6, 0, 0.6][i])); fx('whoosh', T.meat + 1.6, { dur: 0.5, vel: 30 }); dr('cowbell', T.meat + 2.1, 14);
  [2.75, 3.2, 3.65, 4.1, 4.55].forEach(h => { fx('click', T.meat + h + 0.2, { vel: 54, pan: -0.2 }); fx('tick', T.meat + h + 0.21, { vel: 40 }); fx('click', T.meat + h + 0.42, { vel: 54, pan: 0.5 }); fx('tick', T.meat + h + 0.43, { vel: 40 }); });
  fx('roll', T.meat + 5.7, { dur: 1.6, vel: 30, pitch: -7 }); STAMP(T.meat + 7.3, 106); WHIP(T.meat + 7.95, -0.6);
  // gap
  LETTERS(T.gap, 'Performance gap', 531, 0.9, 0.45); fx('whoosh', T.gap + 0.4, { dur: 0.8, vel: 26 }); fx('whoosh', T.gap + 1.2, { dur: 1.0, vel: 30, pitch: 4, pan: 0.4 }); SLAM(T.gap + 2.5, 80, 0.3);
  fx('revswell', T.gap + 5.1, { dur: 0.8, vel: 36 }); SLAM(T.gap + 4.5, 84, 0.3); fx('sparkle', T.gap + 5.1, { vel: 36 }); POP(T.gap + 6.7, 46, 0.3); fx('whoosh', T.gap + 7.6, { dur: 0.35, vel: 60 });
  // leap
  SLAM(T.leap + 0.6, 76, 0.3); LAND(T.leap + 0.9, 54); LETTERS(T.leap, 'Left behind', 541, 2.1, 0.4); fx('whoosh', T.leap + 2.2, { dur: 1.0, vel: 22, pitch: -6 });
  for (let k = 0; k < 4; k++) dr('woodblock', T.leap + 3.15 + k * 0.15, 22); fx('whoosh', T.leap + 4.9, { dur: 0.85, vel: 50, pan: 0.5 }); fx('boing', T.leap + 5.75, { vel: 56, pan: 0.6 }); LAND(T.leap + 5.75, 60, 0.6); fx('revswell', T.leap + 6.31, { dur: 0.4, vel: 44 });
  // cost
  LAND(T.cost + 0.8, 58); LETTERS(T.cost, 'Basic expertise', 551, 1.8, 0.45); [2.6, 3.05, 3.5].forEach(d => fx('tick', T.cost + d, { vel: 50 })); STAMP(T.cost + 3.95, 112); fx('whoosh', T.cost + 5.1, { dur: 0.4, vel: 30 }); fx('thud', T.cost + 6.55, { vel: 80 }); dr('snare', T.cost + 6.55, 40); WHIP(T.cost + 7.3, -0.6);
  // moat
  POP(T.moat + 1.75, 40); fx('whoosh', T.moat + 2.3, { dur: 0.25, vel: 40, pitch: 6 }); fx('tick', T.moat + 2.55, { vel: 44 });
  [3.45, 5.6, 7.1].forEach(a => { fx('whoosh', T.moat + a - 0.15, { dur: 0.4, vel: 30, pan: -0.5 }); SLAM(T.moat + a + 0.1, 82, 0.2); }); fx('chime', T.moat + 7.3, { vel: 30 }); WHIP(T.moat + 8.65, 0);
  // cta
  [0.57, 1.58, 2.58].forEach((a, i) => { LAND(T.cta + a + 0.2, 58, [-0.6, 0, 0.6][i]); POP(T.cta + a + 0.25, 48, [-0.6, 0, 0.6][i]); }); LETTERS(T.cta, 'Drop it in', 561, 3.85, 0.3); LETTERS(T.cta, 'the comments', 562, 4.1, 0.35);
  fx('whoosh', T.cta + 4.3, { dur: 0.4, vel: 34, pan: 0.4 }); fx('click', T.cta + 4.75, { vel: 56 }); fx('click', T.cta + 5.05, { vel: 50 });
  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 }); fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
