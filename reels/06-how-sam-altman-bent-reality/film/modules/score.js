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
  // hook: the stamp lands on frame 0.25, the share is shredded, an empty pocket
  fx('revswell', 0, { dur: 0.25, vel: 40 }); STAMP(0.25, 124); fx('whoosh', 0.55, { dur: 0.3, vel: 40, pan: 0.6 });
  fx('whoosh', 0.85, { dur: 0.3, vel: 34, pan: -0.6 }); fx('roll', 0.95, { dur: 0.7, vel: 34, pitch: 6 });
  for (let i = 0; i < 9; i++) fx('tick', 1.15 + i * 0.05, { vel: 34, pan: (i / 8 - 0.5) * 0.8 });
  LAND(1.85, 60, -0.4); SLAM(1.9, 96, 0.3); SLAM(2.1, 84, -0.2); SLOT(2.45); WHIP(3.4, 0);
  // test
  SLOT(T.test + 0.2); LAND(T.test + 0.6, 52); STAMP(T.test + 1.6, 106);
  fx('roll', T.test + 2.6, { dur: 0.7, vel: 30, pitch: 4 }); fx('ding', T.test + 3.3, { vel: 30 });
  for (let i = 0; i < 7; i++) fx('tick', T.test + 4.2 + i * 0.05, { vel: 30, pan: (i % 2 ? 0.4 : -0.4) });
  SLAM(T.test + 4.3, 86); fx('revswell', T.test + 6.6, { dur: 0.4, vel: 40 }); fx('whoosh', T.test + 6.7, { dur: 0.9, vel: 50, pitch: -4 });
  LETTERS(T.test, 'Launched it', 601, 6.3, 0.35); LETTERS(T.test, 'anyway', 602, 6.95, 0.3); fx('whoosh', T.test + 7.85, { dur: 0.4, vel: 50, pan: 0.6 });
  // 2015
  STAMP(T.y2015 + 0.2, 110); fx('sparkle', T.y2015 + 1.2, { vel: 20 }); STAMP(T.y2015 + 2.85, 112);
  LAND(T.y2015 + 4.6, 64); fx('boing', T.y2015 + 4.8, { vel: 44, pan: -0.3 }); SLAM(T.y2015 + 5.0, 80); WHIP(T.y2015 + 6.5, 0.6);
  // parrot
  fx('whoosh', T.parrot + 0.45, { dur: 0.4, vel: 40, pan: -0.6 }); LETTERS(T.parrot, 'Neural nets', 611, 0.9, 0.4);
  POP(T.parrot + 1.9, 60, 0.3); fx('boing', T.parrot + 1.95, { vel: 36, pan: 0.3 }); POP(T.parrot + 3.6, 62, 0.4); fx('doubleclick', T.parrot + 3.65, { vel: 34, pan: 0.4 }); fx('boing', T.parrot + 3.9, { vel: 30, pitch: 4 });
  fx('revswell', T.parrot + 5.6, { dur: 0.4, vel: 44 });
  // pattern
  POP(T.pattern + 0.2, 52); LETTERS(T.pattern, 'Pattern', 621, 0.9, 0.4); [1.9, 2.56, 3.37].forEach((d, i) => { LAND(T.pattern + d + 0.1, 56, [-0.6, 0, 0.6][i]); POP(T.pattern + d + 0.15, 40, [-0.6, 0, 0.6][i]); });
  fx('whoosh', T.pattern + 4.4, { dur: 0.35, vel: 56 }); fx('whoosh', T.pattern + 4.6, { dur: 1.8, vel: 26, pitch: 7 }); LETTERS(T.pattern, 'Super-linear', 622, 5.85, 0.4); SLAM(T.pattern + 6.4, 84); fx('whoosh', T.pattern + 7.9, { dur: 0.35, vel: 60 });
  // bet
  STAMP(T.bet + 0.4, 108); LAND(T.bet + 1.8, 52); SLAM(T.bet + 2.6, 84, 0.3); fx('whoosh', T.bet + 3.75, { dur: 0.35, vel: 56 });
  LETTERS(T.bet, 'The entire', 631, 4.4, 0.4); STAMP(T.bet + 5.0, 120); dr('shaker', T.bet + 5.05, 30); fx('roll', T.bet + 4.1, { dur: 0.6, vel: 24 });
  fx('whoosh', T.bet + 6.5, { dur: 0.3, vel: 44, pan: 0.6 }); SLAM(T.bet + 6.57, 90); fx('whoosh', T.bet + 7.35, { dur: 0.35, vel: 56 });
  LETTERS(T.bet, 'What GPT-4', 633, 8.6, 0.4); POP(T.bet + 9.6, 56, 0.5); SLAM(T.bet + 10.1, 82); WHIP(T.bet + 10.95, 0);
  // retention
  LETTERS(T.retain, 'Retention', 641, 1.6, 0.4); fx('roll', T.retain + 0.5, { dur: 1.0, vel: 22, pitch: 5 }); fx('whoosh', T.retain + 2.95, { dur: 0.6, vel: 36, pitch: -8 });
  STAMP(T.retain + 2.95, 108); SLAM(T.retain + 3.45, 90); SLAM(T.retain + 4.85, 80, 0.3); fx('whoosh', T.retain + 6.1, { dur: 0.35, vel: 56 });
  fx('roll', T.retain + 6.35, { dur: 0.4, vel: 20 }); fx('ding', T.retain + 6.78, { vel: 32 }); SLAM(T.retain + 7.85, 70); fx('click', T.retain + 8.6, { vel: 60 });
  STAMP(T.retain + 9.2, 110); dr('kick', T.retain + 9.65, 70); dr('kick', T.retain + 9.85, 56); fx('revswell', T.retain + 10.3, { dur: 0.4, vel: 44 });
  // blueprint
  LETTERS(T.plan, 'Extraordinary', 651, 1.2, 0.45); fx('whoosh', T.plan + 2.3, { dur: 0.8, vel: 30, pan: 0.5 }); LAND(T.plan + 2.5, 52, -0.5); SLAM(T.plan + 2.6, 80); STAMP(T.plan + 4.0, 110); WHIP(T.plan + 5.15, -0.6);
  // rules
  POP(T.rule1 + 0.15, 66); LAND(T.rule1 + 0.4, 56); LAND(T.rule1 + 1.0, 50, -0.6); dr('woodblock', T.rule1 + 1.2, 34); LAND(T.rule1 + 2.8, 70, 0.6); fx('chime', T.rule1 + 3.05, { vel: 28 }); SLAM(T.rule1 + 3.5, 80); WHIP(T.rule1 + 4.6, 0.6);
  POP(T.rule2 + 0.26, 66); LETTERS(T.rule2, 'Asking the right', 661, 1.1, 0.45); fx('whoosh', T.rule2 + 1.1, { dur: 0.4, vel: 30 }); STAMP(T.rule2 + 1.9, 100); fx('boing', T.rule2 + 2.1, { vel: 30 }); SLAM(T.rule2 + 2.95, 70); fx('click', T.rule2 + 3.65, { vel: 56 }); fx('whoosh', T.rule2 + 4.3, { dur: 0.35, vel: 60 });
  POP(T.rule3 + 0.27, 66); LAND(T.rule3 + 1.3, 56); fx('roll', T.rule3 + 1.45, { dur: 0.9, vel: 22, pitch: 9 }); LETTERS(T.rule3, 'Generic advice', 671, 1.9, 0.4); STAMP(T.rule3 + 2.3, 104);
  fx('whoosh', T.rule3 + 2.85, { dur: 0.35, vel: 56 }); LETTERS(T.rule3, 'Non-obvious', 672, 4.1, 0.4); for (let i = 0; i < 5; i++) dr('tom', T.rule3 + 3.5 + i * 0.35, 30 + i * 8); SLAM(T.rule3 + 5.2, 86); WHIP(T.rule3 + 6.6, 0.6);
  // future
  SLAM(T.future + 1.37, 70); fx('click', T.future + 1.95, { vel: 56 }); LETTERS(T.future, 'AI machines', 681, 2.75, 0.4); LAND(T.future + 3.0, 56); fx('whoosh', T.future + 3.85, { dur: 0.35, vel: 56 });
  SLAM(T.future + 4.2, 84); fx('sparkle', T.future + 4.97, { vel: 40, pan: -0.5 }); POP(T.future + 4.97, 50, -0.5); fx('roll', T.future + 5.6, { dur: 0.35, vel: 26, pan: 0.5 }); POP(T.future + 5.75, 46, 0.5);
  LAND(T.future + 6.35, 60); fx('whoosh', T.future + 7.25, { dur: 0.35, vel: 56 }); LETTERS(T.future, 'Humanity', 683, 7.75, 0.4); fx('revswell', T.future + 8.0, { dur: 0.3, vel: 40 }); fx('whoosh', T.future + 8.1, { dur: 1.0, vel: 56, pitch: -4 });
  // cta
  LAND(T.cta + 0.6, 56); SLAM(T.cta + 0.65, 76, -0.4); SLAM(T.cta + 1.59, 76, 0.4); fx('whoosh', T.cta + 3.7, { dur: 0.35, vel: 56 });
  LETTERS(T.cta, 'Drop your', 691, 3.96, 0.35); LETTERS(T.cta, 'thoughts', 692, 4.4, 0.35); fx('click', T.cta + 4.9, { vel: 56 }); fx('click', T.cta + 5.35, { vel: 50 }); SLAM(T.cta + 5.25, 84); fx('chime', T.cta + 6.1, { vel: 24 });
  // brand sting
  fx('whoosh', T.brand, { dur: 0.5, vel: 60 }); fx('sparkle', T.brand + 0.2, { vel: 60 }); fx('thud', T.brand + 0.55, { vel: 110 }); dr('kick', T.brand + 0.55, 100); dr('crash', T.brand + 0.56, 40); fx('chime', T.brand + 0.6, { vel: 48 });
  S.master({ gain: -8, fadeOut: 0.6 });
});
