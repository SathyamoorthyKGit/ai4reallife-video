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
  const IN = (t, v) => { fx('whoosh', t - 0.35, { dur: 0.35, vel: v || 56 }); };
  // hook: headlines rattle out of the ticker, freeze, three pulled
  S.ticks([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => i * 0.26), { vel: 34, jitter: 0.1 }); fx('roll', 0, { dur: 2.8, vel: 22, pitch: 4 });
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(i => fx('whoosh', -0.15 + i * 0.26 + 0.2, { dur: 0.25, vel: 24, pan: (i % 2 ? 0.4 : -0.4) }));
  fx('thud', 3.03, { vel: 110 }); dr('kick', 3.03, 100); fx('revswell', 2.6, { dur: 0.4, vel: 36 });
  [0, 1, 2].forEach(i => POP(3.3 + i * 0.12, 56, -0.4 + i * 0.4)); STAMP(3.75, 112); WHIP(4.6, 0);
  // MAX
  LAND(T.max + 0.5, 58); fx('whoosh', T.max + 1.0, { dur: 0.35, vel: 46, pan: -0.6 }); SLOT(T.max + 1.2); LETTERS(T.max, 'AI agents', 911, 6.4, 0.4); POP(T.max + 6.7, 50, 0.5); WHIP(T.max + 7.4, 0.6);
  // versus
  LETTERS(T.versus, 'Chatbot', 921, 0.6, 0.35); LAND(T.versus + 0.7, 52, -0.4); fx('pop', T.versus + 1.0, { vel: 40, pan: -0.4 }); fx('pop', T.versus + 1.5, { vel: 40, pan: -0.4 }); SLAM(T.versus + 1.6, 66, -0.4);
  LETTERS(T.versus, 'Agent', 922, 2.9, 0.3); LAND(T.versus + 3.1, 52, 0.4); [4.3, 4.9, 5.5].forEach(a => { fx('click', T.versus + a, { vel: 60, pan: 0.4 }); fx('tick', T.versus + a + 0.15, { vel: 50, pan: 0.4 }); }); SLAM(T.versus + 4.9, 70, 0.4); WHIP(T.versus + 7.2, 0);
  // 01 agent
  STAMP(T.agent + 0.3, 104); [2.94, 3.77, 4.59, 5.64, 6.27].forEach(a => SLOT(T.agent + a)); STAMP(T.agent + 7.35, 100); IN(T.agent + 7.95);
  LAND(T.agent + 8.4, 50); S.ticks([0, 1, 2, 3, 4].map(i => T.agent + 9.85 + i * 0.12), { vel: 40 }); fx('whoosh', T.agent + 9.8, { dur: 0.7, vel: 30, pan: 0.5 }); SLAM(T.agent + 9.85, 70);
  SLAM(T.agent + 11.7, 70); fx('roll', T.agent + 11.8, { dur: 1.3, vel: 18, pitch: 6 }); SLAM(T.agent + 13.3, 70); fx('sparkle', T.agent + 13.5, { vel: 30 }); WHIP(T.agent + 16.8, -0.6);
  // 02 models
  STAMP(T.models + 0.42, 104); LAND(T.models + 1.6, 60); [4.13, 4.79, 5.76, 6.42].forEach(a => SLOT(T.models + a)); SLAM(T.models + 7.6, 66, 0.5); SLAM(T.models + 8.45, 66, 0.5);
  IN(T.models + 9.85); LETTERS(T.models, 'Best for the job', 931, 10.0, 0.45); SLAM(T.models + 13.2, 82, -0.4); SLAM(T.models + 13.8, 82, 0.4);
  IN(T.models + 14.75); LETTERS(T.models, 'Plan Mode', 932, 15.15, 0.4); LAND(T.models + 15.7, 56); S.ticks([0, 1, 2, 3].map(i => T.models + 16.3 + i * 0.25), { vel: 30 });
  fx('whoosh', T.models + 18.0, { dur: 0.4, vel: 40, pan: 0.6 }); STAMP(T.models + 18.45, 120); [0, 1, 2, 3].forEach(i => fx('tick', T.models + 18.6 + i * 0.12, { vel: 56 })); WHIP(T.models + 19.8, 0);
  // 03 MCP
  STAMP(T.mcp + 0.4, 104); LAND(T.mcp + 4.6, 60, -0.4); SLAM(T.mcp + 4.6, 66); SLAM(T.mcp + 6.0, 66); LAND(T.mcp + 6.9, 56, 0.4); fx('click', T.mcp + 7.7, { vel: 90 }); dr('cowbell', T.mcp + 7.72, 20);
  IN(T.mcp + 9.55); LAND(T.mcp + 9.9, 56); [11.18, 12.06, 12.83, 13.4].forEach(a => SLOT(T.mcp + a)); WHIP(T.mcp + 14.2, 0.6);
  // chain
  LETTERS(T.chain, 'Edits your files', 941, 1.9, 0.4); LAND(T.chain + 0.9, 56, -0.4); LAND(T.chain + 1.25, 50, 0.4);
  [0, 1, 2, 3].forEach(i => fx('click', T.chain + 5.3 + i * 0.45, { vel: 50, pan: 0.4 })); SLAM(T.chain + 5.6, 76); IN(T.chain + 8.2);
  [8.4, 10.6, 12.1].forEach((a, i) => { SLOT(T.chain + a); S.ticks([0, 1, 2].map(k => T.chain + a + 0.1 + k * 0.08), { vel: 36 }); }); fx('roll', T.chain + 8.5, { dur: 1.0, vel: 20, pitch: 8 }); POP(T.chain + 12.3, 44); WHIP(T.chain + 13.15, -0.6);
  // late
  SLOT(T.late + 0.3); SLOT(T.late + 1.0); fx('whoosh', T.late + 1.3, { dur: 0.9, vel: 22 }); STAMP(T.late + 2.4, 100); IN(T.late + 3.75);
  LETTERS(T.late, 'Adobe is late', 951, 3.95, 0.4); fx('roll', T.late + 4.2, { dur: 2.0, vel: 14, pitch: -10 }); fx('boing', T.late + 4.4, { vel: 28 }); SLAM(T.late + 6.6, 84); WHIP(T.late + 8.5, 0.6);
  // survey
  STAMP(T.survey + 0.37, 104); LAND(T.survey + 3.6, 56); fx('whoosh', T.survey + 3.6, { dur: 0.3, vel: 40, pan: 0.5, pitch: 6 }); fx('thud', T.survey + 3.9, { vel: 70 }); fx('click', T.survey + 3.92, { vel: 60 });
  fx('roll', T.survey + 4.5, { dur: 0.8, vel: 24, pitch: 5 }); fx('ding', T.survey + 5.3, { vel: 26 }); IN(T.survey + 9.55); fx('roll', T.survey + 9.6, { dur: 0.8, vel: 24, pitch: 5 });
  fx('ding', T.survey + 10.4, { vel: 26 }); fx('whoosh', T.survey + 12.3, { dur: 0.4, vel: 36, into: 1 }); STAMP(T.survey + 12.7, 120); WHIP(T.survey + 13.7, 0);
  // payoff
  LETTERS(T.payoff, 'AI', 961, 1.95, 0.2); LAND(T.payoff + 0.7, 56, -0.4); LAND(T.payoff + 2.9, 56, 0.4); fx('roll', T.payoff + 3.0, { dur: 1.6, vel: 16, pitch: 6 }); SLAM(T.payoff + 4.9, 70, 0.4);
  fx('whoosh', T.payoff + 5.3, { dur: 0.5, vel: 40, pan: -0.6 }); fx('click', T.payoff + 5.85, { vel: 80, pan: -0.3 }); SLAM(T.payoff + 6.0, 70, -0.4); STAMP(T.payoff + 6.6, 112);
  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 }); fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
