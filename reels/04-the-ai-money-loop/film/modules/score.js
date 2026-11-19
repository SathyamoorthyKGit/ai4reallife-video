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
  const COUNT = (t, d, v) => fx('roll', t, { dur: d, vel: v || 34 });
  const LETTERS = (at, txt, seed, t0, span) => { const r = kit.rng(seed); const ts = []; for (const c of txt) { const x = at + t0 + r() * span; if (c !== ' ') ts.push(x); } S.ticks(ts, { vel: 26, jitter: 0.3 }); };
  const MACHINE = (a, b) => { const R = kit.rng(Math.round(a * 100)); for (let t = a; t < b; t += 0.12 + R() * 0.3) { const k = R(); dr(k < 0.4 ? 'sidestick' : k < 0.7 ? 'hat' : 'shaker', t, 12 + R() * 12); } };

  // hook: 94, pages riffle, the S-1 stack
  STAMP(0.0, 116); fx('revswell', 0, { dur: 0.3, vel: 30 });
  for (let i = 0; i < 7; i++) fx('whoosh', 0.55 + i * 0.2 + 0.15, { dur: 0.16, vel: 34, pitch: 6, pan: -0.4 });
  fx('whoosh', 2.6, { dur: 0.4, vel: 50, pan: -0.6 }); LETTERS(0, 'IPO filing', 401, 2.9, 0.4); LAND(2.95, 60);
  fx('whoosh', 3.3, { dur: 0.25, vel: 40, into: 1 }); STAMP(3.55, 100); WHIP(4.85, 0.6);
  // anth: logo slot, the trading clip, shaky
  SLOT(T.anth + 0.2); POP(T.anth + 0.85, 36); LAND(T.anth + 1.65, 56); MACHINE(T.anth + 1.4, T.anth + 3.9);
  SLAM(T.anth + 1.75, 80, 0.4); fx('whoosh', T.anth + 2.0, { dur: 1.2, vel: 34, pitch: -6 }); STAMP(T.anth + 3.2, 112); WHIP(T.anth + 4.0, 0);
  // bubble: inflate, the pin creeps, here's the loop
  LETTERS(T.bubble, 'Popping?', 411, 0.2, 0.45); fx('revswell', T.bubble + 1.6, { dur: 1.4, vel: 40 });
  fx('whoosh', T.bubble + 0.4, { dur: 1.2, vel: 24, pan: 0.6 }); fx('click', T.bubble + 1.6, { vel: 50, pan: 0.4 });
  SLAM(T.bubble + 2.2, 85); WHIP(T.bubble + 2.95, 0);
  // loop: four arrows, one per step
  SLOT(T.loop + 0.15); LETTERS(T.loop, 'The loop', 421, 0.1, 0.35);
  [0.21, 2.04, 4.21, 6.62].forEach((a, i) => { fx('whoosh', T.loop + a + 0.15, { dur: 0.65, vel: 30, pan: [0.6, 0.3, -0.6, -0.3][i] }); POP(T.loop + a + 0.8, 44, [0.6, 0, -0.6, -0.2][i]); });
  LAND(T.loop + 0.6, 56, 0.6); [0, 1, 2, 3].forEach(i => fx('tick', T.loop + 0.45 + i * 0.15, { vel: 40, pan: 0.3 }));
  fx('boing', T.loop + 2.1, { vel: 40 }); LAND(T.loop + 2.45, 66); MACHINE(T.loop + 2.1, T.loop + 4.0);
  LAND(T.loop + 4.6, 60, -0.6); dr('cowbell', T.loop + 4.6, 22); STAMP(T.loop + 4.9, 100);
  fx('chime', T.loop + 7.1, { vel: 30 }); fx('revswell', T.loop + 9.14, { dur: 0.4, vel: 44 });
  // crack: padlock and chain, one demand source, constant demand
  LETTERS(T.crack, 'One thing', 431, 0.3, 0.4); fx('whoosh', T.crack + 0.95, { dur: 0.35, vel: 46, pan: -0.5 }); dr('cowbell', T.crack + 1.3, 30); dr('sidestick', T.crack + 1.32, 44);
  fx('thud', T.crack + 1.45, { vel: 110 }); dr('kick', T.crack + 1.45, 96); dr('cowbell', T.crack + 1.47, 36);
  SLAM(T.crack + 2.3, 86); fx('whoosh', T.crack + 2.65, { dur: 0.45, vel: 48 }); MACHINE(T.crack + 2.6, T.crack + 4.6); SLAM(T.crack + 3.15, 80, 0.2);
  fx('whoosh', T.crack + 4.45, { dur: 0.4, vel: 55 });
  // slow: the loop spins down
  LETTERS(T.slow, 'Pull back', 441, 0.2, 0.4); fx('roll', T.slow + 0.1, { dur: 2.6, vel: 26, pitch: -7 }); fx('whoosh', T.slow + 0.5, { dur: 0.9, vel: 26, pan: -0.7, pitch: -4 });
  STAMP(T.slow + 2.9, 100); STAMP(T.slow + 3.98, 104); WHIP(T.slow + 4.85, -0.6);
  // loss: logo slot, −$80.7B, ~$72.4B accounting
  SLOT(T.loss + 0.25); fx('whoosh', T.loss + 1.75, { dur: 0.4, vel: 46 }); LAND(T.loss + 2.0, 50);
  COUNT(T.loss + 2.0, 2.6, 34); STAMP(T.loss + 4.6, 112); fx('whoosh', T.loss + 5.6, { dur: 0.4, vel: 36 });
  COUNT(T.loss + 5.95, 1.45, 30); LAND(T.loss + 6.3, 54); for (let i = 0; i < 6; i++) dr('woodblock', T.loss + 6.4 + i * 0.12, 20); SLAM(T.loss + 7.4, 86);
  fx('revswell', T.loss + 8.44, { dur: 0.4, vel: 44 });
  // profit: the rubber stamp, then the pin bends
  LETTERS(T.profit, 'Q2 profit', 451, 0.3, 0.4); SUCK(T.profit + 1.15, 0.25, 40); fx('thud', T.profit + 1.15, { vel: 110 }); dr('snare', T.profit + 1.15, 60); fx('whoosh', T.profit + 1.4, { dur: 0.3, vel: 34 }); fx('sparkle', T.profit + 1.3, { vel: 28 });
  fx('whoosh', T.profit + 2.95, { dur: 0.45, vel: 46 }); fx('whoosh', T.profit + 3.3, { dur: 0.45, vel: 30, pan: 0.5 });
  fx('boing', T.profit + 3.75, { vel: 62 }); dr('cowbell', T.profit + 3.76, 24); STAMP(T.profit + 3.95, 114); WHIP(T.profit + 5.2, 0);
  // cta: cheaper tokens, save this, not financial advice
  LETTERS(T.cta, 'Cheaper tokens', 461, 0.3, 0.45); LAND(T.cta + 0.85, 56, -0.3);
  for (let i = 0; i < 5; i++) dr('woodblock', T.cta + 0.9 + i * 0.06, 18 - i * 2);
  fx('whoosh', T.cta + 0.7, { dur: 0.4, vel: 32, pan: 0.5 }); fx('whoosh', T.cta + 1.4, { dur: 0.22, vel: 40, pitch: 6 }); POP(T.cta + 1.75, 44, 0.5);
  fx('whoosh', T.cta + 2.55, { dur: 0.45, vel: 48 }); LETTERS(T.cta, 'Save this', 462, 3.0, 0.35);
  fx('whoosh', T.cta + 3.2, { dur: 0.4, vel: 34, pan: 0.4 }); [3.6, 3.9].forEach(d => fx('click', T.cta + d, { vel: 54 })); POP(T.cta + 5.2, 36);
  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 }); fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
