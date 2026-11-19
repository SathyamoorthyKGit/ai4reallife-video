kit.score(function (S, T) {
  const BPM = 100;
  S.tempo(BPM, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.6, gain: -3 }); S.program('bass', 'bass'); S.program('keys', 'ep', { rev: 0.3 }); S.program('pl', 'pluck', { pan: 0.2, gain: -4 });
  const prog = [['D3', 'F3', 'A3', 'D2'], ['Bb2', 'D3', 'F3', 'Bb1'], ['F3', 'A3', 'C4', 'F2'], ['C3', 'E3', 'G3', 'C2']];
  for (let i = 0; i < 12; i++) { const c = prog[i % 4], b = i * 8; S.chord('pad', c.slice(0, 3), { beat: b, beats: 8, vel: 34 });
    if ((b >= 8 && b < 40) || (b >= 64 && b < 88)) S.pattern('bass', 'x..x..x.', { from: b, repeat: 2, pitch: [c[3]], vel: 70 }); }
  S.drums({ kick: 'x...x...', hat: 'oxoxoxox' }, { from: 8, repeat: 8, vel: 60 });
  S.drums({ kick: 'x...x..x', sidestick: '..x...x.', hat: 'oxoxoxox' }, { from: 64, repeat: 6, vel: 62 });
  S.pattern('pl', 'x.x.x.xx', { from: 64, repeat: 6, pitch: ['D5', 'A4', 'F5', 'A4'], vel: 44 });
  const typ = (t0, n, cps) => Array.from({ length: n }, (_, i) => t0 + i / cps);
  const W = (t, d, v) => S.fx('whoosh', t, { dur: d || 0.4, vel: v || 55 });
  S.ticks(typ(T.hook + 0.6, 12, 7), { vel: 34 }); W(T.hook + 0.5, 0.8, 35); W(T.hook + 2.2, 0.7, 40); S.fx('pop', T.hook + 2.75); S.fx('click', T.hook + 3.55); S.fx('ding', T.hook + 3.7, { vel: 42 }); W(T.hook + 4.55, 0.45, 65);
  S.fx('thud', T.news + 0.02, { vel: 90 }); S.fx('thud', T.news + 0.85); W(T.news + 1.7, 0.75, 45); S.fx('thud', T.news + 2.65, { vel: 92 }); W(T.news + 2.8, 1.4, 30); W(T.news + 4.12, 0.4, 65);
  W(T.banks, 0.4, 55); S.fx('thud', T.banks + 1.05, { vel: 92 }); W(T.banks + 1.75, 0.8, 40); S.fx('thud', T.banks + 2.75, { vel: 92 }); W(T.banks + 3.25, 1.2, 30);
  W(T.paste, 0.4, 50); W(T.paste + 0.7, 0.8, 35); S.fx('thud', T.paste + 0.75); S.fx('thud', T.paste + 1.05); S.fx('pop', T.paste + 1.6); S.fx('pop', T.paste + 2.3); S.fx('pop', T.paste + 3.15, { vel: 40 }); S.fx('sparkle', T.paste + 4.3, { vel: 40 }); W(T.paste + 5.6, 0.5, 65);
  S.fx('pop', T.twins + 0.45); W(T.twins + 0.95, 0.55, 40); S.fx('pop', T.twins + 1.45); S.fx('pop', T.twins + 0.75, { vel: 40 }); S.fx('pop', T.twins + 1.7, { vel: 40 }); W(T.twins + 2.1, 0.75, 40); S.fx('thud', T.twins + 2.9, { vel: 88 }); W(T.twins + 4.1, 0.7, 45);
  S.fx('revswell', T.rogue + 0.6, { dur: 0.6 }); S.fx('thud', T.rogue + 1.55, { vel: 80 }); W(T.rogue + 2.15, 0.65, 40); S.fx('pop', T.rogue + 2.6); W(T.rogue + 3.1, 0.45, 45); W(T.rogue + 3.7, 0.45, 45);
  S.fx('ding', T.hotline + 0.4, { vel: 40 }); S.fx('ding', T.hotline + 1.05, { vel: 40 }); S.ticks(typ(T.hotline + 0.4, 14, 14), { vel: 28 }); S.fx('thud', T.hotline + 2.0, { vel: 70 }); W(T.hotline + 1.9, 0.7, 40); S.fx('thud', T.hotline + 4.4, { vel: 92 }); W(T.hotline + 5.4, 1.2, 30);
  S.fx('thud', T.rule1 + 0.02, { vel: 90 }); S.fx('thud', T.rule1 + 0.5); S.fx('thud', T.rule1 + 0.8); W(T.rule1 + 1.35, 0.55, 55); S.fx('thud', T.rule1 + 1.9, { vel: 80 }); S.fx('click', T.rule1 + 2.5); S.fx('click', T.rule1 + 2.8); W(T.rule1 + 3.05, 1.0, 35);
  S.fx('thud', T.rule2 + 0.02, { vel: 90 }); S.fx('thud', T.rule2 + 0.45); S.fx('thud', T.rule2 + 0.7); W(T.rule2 + 1.2, 0.55, 65); S.fx('boing', T.rule2 + 1.85, { vel: 40 }); W(T.rule2 + 2.0, 1.5, 30); W(T.rule2 + 3.35, 0.55, 45); S.fx('ding', T.rule2 + 3.95, { vel: 42 }); S.fx('thud', T.rule2 + 4.8, { vel: 88 });
  S.fx('thud', T.rule3 + 0.02, { vel: 90 }); S.fx('thud', T.rule3 + 0.35); S.fx('thud', T.rule3 + 0.6); W(T.rule3 + 0.8, 0.55, 45); for (let i = 0; i < 4; i++) S.fx('tick', T.rule3 + 1.5 + i * 0.4, { vel: 50 }); W(T.rule3 + 3.6, 0.45, 65);
  W(T.lock, 0.4, 50); S.ticks(typ(T.lock + 0.25, 6, 7), { vel: 30 }); S.fx('thud', T.lock + 2.12, { vel: 110 }); W(T.lock + 2.25, 0.4, 45); W(T.lock + 2.85, 0.7, 70);
  S.fx('revswell', T.lock + 3.75, { dur: 1.0 });
  S.chord('keys', ['D3', 'A3', 'D4', 'F4'], { t: T.lock + 3.75, dur: 3, vel: 70 });
  S.note('bass', 'D2', { t: T.lock + 3.75, dur: 3, vel: 80 });
  S.drum('kick', { t: T.lock + 3.75, vel: 100 }); S.fx('ding', T.lock + 4.7, { vel: 36 });
  S.master({ gain: -8, fadeOut: 1.5 });
});