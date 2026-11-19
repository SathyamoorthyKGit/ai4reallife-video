kit.score(function (S, T) {
  // Sound design only, no music: every effect sits on the exact frame of the picture event it belongs to.
  S.tempo(100, { t0: 0 });
  const R = kit.rng(907);
  const fx = (n, t, o) => S.fx(n, t, o || {});
  const dr = (n, t, v) => S.drum(n, { t: Math.max(0, t), vel: v });
  const pan = x => Math.max(-0.8, Math.min(0.8, (x - 540) / 540));
  // layered building blocks
  const WHIP = (t, d, p, v) => { fx('whoosh', t, { dur: d || 0.38, vel: v || 62, pan: p || 0 }); dr('hat', t + 0.02, 18); };
  const SUCK = (t, d, v) => fx('whoosh', t - (d || 0.35), { dur: d || 0.35, vel: v || 45, into: 1 });
  const SLAM = (t, v, p) => { SUCK(t, 0.22, 38); fx('thud', t, { vel: v || 95, pan: p || 0 }); dr('clap', t, 52); dr('kick', t, 70); };
  const STAMP = (t, v) => { SUCK(t, 0.25, 40); fx('thud', t, { vel: v || 110 }); dr('snare', t, 70); dr('crash', t + 0.01, 34); dr('kick', t, 90); };
  const LAND = (t, v, p) => { fx('thud', t, { vel: v || 70, pan: p || 0 }); dr('tom', t, 46); };
  const CLANK = (t, v, p) => { dr('cowbell', t, v || 26); dr('sidestick', t + 0.012, (v || 26) + 14); fx('thud', t, { vel: 60, pan: p || 0 }); };
  const POP = (t, v, p) => fx('pop', t, { vel: v || 48, pan: p || 0 });
  const COUNT = (t, d, v) => fx('roll', t, { dur: d, vel: v || 34 });
  const GLITCH = t => { fx('doubleclick', t, { vel: 60 }); dr('hat', t + 0.03, 40); fx('click', t + 0.07, { vel: 45, pan: 0.4 }); };
  const PUSH = (t, d) => { fx('revswell', t, { dur: d || 0.5, vel: 50 }); SUCK(t, d || 0.4, 40); };
  // letter-by-letter headlines: one soft tick per letter, at the same random times the picture uses
  const LETTERS = (at, txt, seed, t0, span) => { const r = kit.rng(seed); const times = []; for (const c of txt) { const x = at + t0 + r() * span; if (c !== ' ') times.push(x); } S.ticks(times, { vel: 26, jitter: 0.3 }); };
  // machinery bed under the stock footage: irregular metal knocks and hiss, panned around
  const MACHINE = (a, b, dens) => { for (let t = a; t < b; t += 0.11 + R() * (dens || 0.32)) { const k = R(); if (k < 0.35) dr('sidestick', t, 14 + R() * 12); else if (k < 0.6) dr('hat', t, 10 + R() * 10); else if (k < 0.75) dr('cowbell', t, 8 + R() * 8); else dr('shaker', t, 12 + R() * 10); } };

  // 1 hook: robots drop on the scale until China outweighs the world
  fx('revswell', 0.0, { dur: 0.4, vel: 30 });
  LETTERS(0, 'China', 31, 0.15, 0.4); [0.3, 0.4, 0.5, 0.6].forEach((d, i) => POP(d + 0.08, 30, 0.5)); fx('pop', 0.55, { vel: 55, pan: -0.5 });
  [1.05, 1.4, 1.75, 2.1].forEach((d, i) => { fx('whoosh', d - 0.4, { dur: 0.38, vel: 30, into: 1, pan: -0.5 }); CLANK(d, 30 + i * 6, -0.5); LAND(d, 62 + i * 8, -0.5); });
  fx('whoosh', 1.1, { dur: 1.4, vel: 20 }); dr('tom', 2.55, 30); fx('click', 1.3, { vel: 30 });
  WHIP(4.85, 0.36, 0, 66);
  // 2 count: 354,000, then 59%
  GLITCH(T.count); fx('whoosh', T.count, { dur: 0.45, vel: 50 });
  COUNT(T.count + 0.3, 2.0, 36); POP(T.count + 0.95, 55, 0.4); fx('boing', T.count + 1.5, { vel: 35, pan: -0.6 });
  SLAM(T.count + 2.3, 90);
  WHIP(T.count + 2.95, 0.45, 0, 52); STAMP(T.count + 3.42, 115);
  COUNT(T.count + 3.6, 1.55, 28); for (let i = 0; i < 59; i += 6) POP(T.count + 3.6 + i * 0.026, 26 + i * 0.4, ((i % 10) - 4.5) / 6);
  fx('click', T.count + 5.3, { vel: 30 }); WHIP(T.count + 6.72, 0.34, 0.6, 66);
  // 3 usjp: bars race, US overtakes Japan
  fx('whoosh', T.usjp, { dur: 0.4, vel: 58, pan: -0.6 }); LETTERS(T.usjp, 'US passes Japan', 41, 0.4, 0.5);
  [0.35, 0.6, 0.55, 0.7, 0.8].forEach((d, i) => fx('whoosh', T.usjp + d, { dur: 0.45, vel: 22, pan: 0.3 }));
  [0.95, 1.1, 1.05, 1.15, 1.25].forEach((d, i) => POP(T.usjp + d, 30, 0.6));
  fx('whoosh', T.usjp + 1.4, { dur: 0.4, vel: 40, pan: 0.5 }); fx('revswell', T.usjp + 1.8, { dur: 0.4, vel: 32 }); LAND(T.usjp + 1.8, 70);
  fx('whoosh', T.usjp + 1.6, { dur: 0.5, vel: 30, pan: -0.2 }); STAMP(T.usjp + 2.25, 105);
  WHIP(T.usjp + 3.3, 0.45, 0, 45); COUNT(T.usjp + 3.5, 1.1, 30); SLAM(T.usjp + 4.6, 92); POP(T.usjp + 5.4, 38);
  WHIP(T.usjp + 6.8, 0.34, 0, 66);
  // 4 guess: car plants? then the factory clip, −1%
  fx('whoosh', T.guess, { dur: 0.4, vel: 58 }); LETTERS(T.guess, 'Car plants', 51, 0.3, 0.45);
  LAND(T.guess + 0.6, 50, -0.2); CLANK(T.guess + 0.62, 24, -0.2); fx('boing', T.guess + 1.0, { vel: 60, pan: 0.5 }); dr('woodblock', T.guess + 1.0, 30);
  WHIP(T.guess + 1.45, 0.55, 0, 50); LAND(T.guess + 1.95, 64); MACHINE(T.guess + 1.6, T.guess + 6.4, 0.28);
  SLAM(T.guess + 2.45, 85, -0.3); fx('click', T.guess + 2.9, { vel: 34 }); STAMP(T.guess + 3.7, 108);
  WHIP(T.guess + 6.42, 0.34, -0.6, 68);
  // 5 food: bottling line, +30%
  fx('whoosh', T.food, { dur: 0.35, vel: 58, pan: 0.6 }); MACHINE(T.food, T.food + 2.3, 0.22);
  for (let i = 0; i < 6; i++) dr('woodblock', T.food + 0.15 + i * 0.36, 14);
  SLAM(T.food + 0.4, 80, -0.3); STAMP(T.food + 0.85, 115); POP(T.food + 1.3, 38);
  PUSH(T.food + 2.65, 0.6);
  // 6 world: map pins, 603,000
  fx('thud', T.world + 0.02, { vel: 80 }); dr('crash', T.world + 0.02, 22); LETTERS(T.world, 'Speeding up', 61, 0.55, 0.45);
  const PINS = [0.74, 0.86, 0.815, 0.2, 0.505, 0.17, 0.69, 0.525, 0.54, 0.79];
  PINS.forEach((x, i) => POP(T.world + 1.0 + i * 0.13, 32 + i * 2, pan(70 + x * 940)));
  WHIP(T.world + 2.75, 0.45, 0, 45); COUNT(T.world + 3.3, 1.7, 34); [0, 1, 2].forEach(i => { LAND(T.world + 3.65 + i * 0.22, 48, [-0.6, 0, 0.6][i]); CLANK(T.world + 3.67 + i * 0.22, 20, [-0.6, 0, 0.6][i]); });
  SLAM(T.world + 5.0, 90); fx('whoosh', T.world + 6.15, { dur: 0.45, vel: 60 }); fx('revswell', T.world + 6.58, { dur: 0.45, vel: 36 });
  // 7 fleet: 5,000,000 robots, more than double
  fx('whoosh', T.fleet, { dur: 0.45, vel: 50, into: 0 }); COUNT(T.fleet + 0.2, 1.7, 34);
  for (let k = 0; k < 20; k++) { const x = 100 + (k % 5) * 182; POP(T.fleet + 0.25 + k * 0.07, 22 + R() * 14, pan(x)); if (k % 4 === 0) dr('cowbell', T.fleet + 0.27 + k * 0.07, 10); }
  SLAM(T.fleet + 1.9, 85); STAMP(T.fleet + 2.45, 112); WHIP(T.fleet + 3.95, 0.36, 0, 66);
  // 8 forecast: three bars rise, 806,000
  fx('whoosh', T.forecast, { dur: 0.4, vel: 58 }); COUNT(T.forecast + 0.3, 1.9, 32);
  [[0.35, 0.95, -0.6], [0.75, 1.35, 0], [1.25, 2.1, 0.5]].forEach(([a, b, p]) => { fx('revswell', T.forecast + b, { dur: b - a, vel: 28, pan: p }); LAND(T.forecast + b, 58, p); POP(T.forecast + b + 0.05, 40, p); });
  fx('whoosh', T.forecast + 1.4, { dur: 0.8, vel: 26, pan: 0.3 }); SLAM(T.forecast + 2.2, 92); PUSH(T.forecast + 4.25, 0.45);
  // 9 drivers: the eye, AI + machine vision, labour shortages
  fx('thud', T.drivers + 0.02, { vel: 70 }); [0.3, 0.36, 0.42, 0.48].forEach(d => fx('click', T.drivers + d, { vel: 40, pan: (d - 0.39) * 8 }));
  SLAM(T.drivers + 0.55, 85); fx('sparkle', T.drivers + 0.6, { vel: 34 });
  fx('whoosh', T.drivers + 0.45, { dur: 1.05, vel: 28, pan: -0.6 }); fx('whoosh', T.drivers + 1.5, { dur: 1.1, vel: 28, pan: 0.6 }); fx('ding', T.drivers + 1.5, { vel: 22 });
  SLAM(T.drivers + 1.7, 88, 0.2); PUSH(T.drivers + 3.2, 0.4);
  // 10 leave: a robot climbs out of the laptop, the screen tears open into a factory
  fx('thud', T.leave + 0.05, { vel: 70 }); LETTERS(T.leave, 'The screen', 71, 0.6, 0.45);
  fx('whoosh', T.leave + 0.75, { dur: 0.85, vel: 34 }); fx('boing', T.leave + 1.5, { vel: 45 }); CLANK(T.leave + 1.6, 30); LAND(T.leave + 1.6, 66);
  fx('revswell', T.leave + 2.7, { dur: 0.75, vel: 55 }); fx('whoosh', T.leave + 2.1, { dur: 0.65, vel: 70 }); fx('thud', T.leave + 2.7, { vel: 105 }); dr('crash', T.leave + 2.7, 40); dr('kick', T.leave + 2.7, 90);
  MACHINE(T.leave + 2.0, T.leave + 4.2, 0.25); SLAM(T.leave + 2.85, 80, -0.3); SLAM(T.leave + 3.2, 84, 0.3);
  // 11 jobs: −68,000, workers fade and walk off, the easy headline
  GLITCH(T.jobs); fx('thud', T.jobs + 0.05, { vel: 85 }); dr('crash', T.jobs + 0.05, 26);
  [0.75, 0.9, 1.05].forEach((d, i) => LAND(T.jobs + d, 44, [-0.5, -0.1, 0.3][i]));
  fx('roll', T.jobs + 0.4, { dur: 2.2, vel: 30, pitch: -5 }); SLAM(T.jobs + 2.6, 90);
  [2.0, 2.8, 3.3].forEach((d, i) => fx('whoosh', T.jobs + d, { dur: 0.6, vel: 22, into: 1, pan: [-0.5, -0.1, 0.3][i] }));
  for (let k = 1; k * Math.PI / 9 < 4.6; k++) { const t = k * Math.PI / 9; if (t > 3.3) dr('woodblock', T.jobs + t, 16 + (k % 2) * 6); }
  SUCK(T.jobs + 4.65, 0.5, 46); STAMP(T.jobs + 4.65, 116); LAND(T.jobs + 5.4, 60, 0.4); CLANK(T.jobs + 5.4, 26, 0.4);
  WHIP(T.jobs + 5.95, 0.34, 0.6, 66);
  // 12 tariffs: the port, the stamp, eight months crossed out
  fx('whoosh', T.tariffs, { dur: 0.4, vel: 58, pan: -0.6 }); MACHINE(T.tariffs, T.tariffs + 2.2, 0.4);
  fx('whoosh', T.tariffs + 0.3, { dur: 2.7, vel: 18, pan: -0.4 }); LAND(T.tariffs + 0.95, 56, 0.4); CLANK(T.tariffs + 0.96, 28, 0.4);
  POP(T.tariffs + 0.75, 34); STAMP(T.tariffs + 1.0, 118);
  WHIP(T.tariffs + 2.0, 0.45, 0, 46); LETTERS(T.tariffs, '8 months', 81, 2.45, 0.35);
  for (let i = 0; i < 8; i++) { const a = T.tariffs + 2.35 + i * 0.05; POP(a + 0.15, 20, ((i % 4) - 1.5) / 2.5); }
  for (let j = 0; j < 16; j++) { const i = j >> 1, a = T.tariffs + 2.9 + i * 0.26 + (j & 1) * 0.09; fx('whoosh', a, { dur: 0.12, vel: 30, pitch: 7, pan: ((i % 4) - 1.5) / 2.5 }); fx('tick', a + 0.1, { vel: 40 }); }
  fx('revswell', T.tariffs + 5.19, { dur: 0.4, vel: 36 }); fx('whoosh', T.tariffs + 4.8, { dur: 0.4, vel: 52 });
  // 13 proof: two lines, the magnifier, not proof
  LETTERS(T.proof, 'Two lines', 91, 0.2, 0.4);
  fx('whoosh', T.proof + 0.2, { dur: 0.9, vel: 26, pan: 0.5 }); fx('whoosh', T.proof + 0.35, { dur: 0.9, vel: 26, pan: -0.5, pitch: -4 });
  POP(T.proof + 1.0, 38, 0.4); POP(T.proof + 1.15, 38, 0.4); fx('whoosh', T.proof + 0.6, { dur: 1.8, vel: 22, pan: 0.2 });
  STAMP(T.proof + 2.1, 120); WHIP(T.proof + 2.9, 0.34, 0, 66);
  // 14 check: check what else happened
  fx('whoosh', T.check, { dur: 0.4, vel: 58 }); LETTERS(T.check, 'Check what', 101, 0.3, 0.35); LETTERS(T.check, 'else happened', 102, 0.55, 0.4);
  LAND(T.check + 0.75, 54); fx('whoosh', T.check + 1.0, { dur: 2.8, vel: 16, pan: -0.3 });
  [1.5, 1.9, 2.3].forEach((d, i) => { fx('boing', T.check + d, { vel: 48, pan: [-0.6, 0.6, 0.3][i] }); dr('woodblock', T.check + d, 26); });
  POP(T.check + 2.8, 40, -0.4); PUSH(T.check + 4.23, 0.5);
  // 15 brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 }); fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40);
  fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
