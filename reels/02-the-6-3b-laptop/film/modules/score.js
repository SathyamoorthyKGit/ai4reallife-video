kit.score(function (S, T) {
  const BPM = 96, B = 60 / BPM;
  S.tempo(BPM, { t0: 0 });
  S.program('pad', 'pad', { rev: 0.6, gain: -4 }); S.program('bass', 'bass', { gain: -4 }); S.program('keys', 'ep', { rev: 0.35, gain: -3 }); S.program('pl', 'pluck', { pan: 0.2, gain: -8 });
  const prog = [['D3', 'F3', 'A3', 'D2'], ['Bb2', 'D3', 'F3', 'Bb1'], ['G2', 'Bb2', 'D3', 'G1'], ['A2', 'C#3', 'E3', 'A1']];
  const bars = Math.ceil(T.END / (4 * B)) + 1;
  for (let i = 0; i < bars; i += 2) { const c = prog[(i / 2) % 4], b = i * 4; S.chord('pad', c.slice(0, 3), { beat: b, beats: 8, vel: 30 });
    if (b >= 8 && S.beat(b) < T.END - 5) S.pattern('bass', 'x.....x.', { from: b, repeat: 2, pitch: [c[3]], vel: 58 }); }
  const g0 = Math.ceil(S.toBeat(T.chain) / 4) * 4, g1 = Math.floor(S.toBeat(T.close) / 4) * 4;
  S.drums({ kick: 'x.......', hat: '..o...o.' }, { from: 8, repeat: Math.floor((g0 - 8) / 4), vel: 44 });
  S.drums({ kick: 'x...x...', sidestick: '....x...', hat: 'oxoxoxox' }, { from: g0, repeat: Math.floor((g1 - g0) / 4), vel: 50 });
  const W = (t, d, v) => S.fx('whoosh', t, { dur: d || 0.4, vel: v || 45 });
  const H = (t, v) => S.fx('thud', t, { vel: v || 80 });
  // open
  S.fx('click', T.open + 1.05, { vel: 70 }); W(T.open + 1.45, 0.75, 35); S.fx('pop', T.open + 1.2, { vel: 35 }); W(T.open + 3.35, 0.75, 35); H(T.open + 4.0, 60); W(T.open + 4.85, 0.45, 60);
  W(T.heist, 0.4, 60); W(T.nokeys + 3.35, 0.35, 60); W(T.sign, 0.4, 60); W(T.vault + 3.95, 0.35, 60); W(T.chain + 7.95, 0.35, 60); W(T.ask, 0.4, 55); W(T.ask + 4.7, 0.4, 60); W(T.entries + 8.25, 0.35, 60); W(T.you, 0.4, 55); W(T.fixes + 5.55, 0.35, 60); W(T.scam, 0.4, 55);
  // heist
  S.fx('roll', T.heist + 0.1, { dur: 1.4 }); H(T.heist + 0.6); W(T.heist + 2.05, 0.45, 50); H(T.heist + 2.55); S.fx('revswell', T.heist + 3.5, { dur: 0.6 }); W(T.heist + 4.85, 0.45, 50); S.fx('roll', T.heist + 5.3, { dur: 1.1 });
  // vault
  S.fx('thud', T.vault + 1.95, { vel: 50 }); S.fx('crash', T.vault + 2.3); H(T.vault + 2.3, 110); W(T.vault + 3.0, 0.8, 50);
  // nokeys
  H(T.nokeys + 0.3, 100); W(T.nokeys + 0.4, 2.0, 25); H(T.nokeys + 2.85, 92);
  // sign
  H(T.sign + 0.2, 70); S.fx('pop', T.sign + 0.75); W(T.sign + 0.9, 0.9, 45); S.fx('click', T.sign + 4.22, { vel: 100 }); S.fx('ding', T.sign + 4.3, { vel: 45 });
  // chain
  [2.3, 5.2, 6.6, 7.6].forEach(d => S.fx('pop', T.chain + d, { vel: 60 })); H(T.chain + 3.75, 88);
  [4.5, 6.0, 7.05].forEach(d => W(T.chain + d, 0.55, 40));
  // ask
  S.fx('click', T.ask + 1.65); S.fx('click', T.ask + 1.9); W(T.ask + 2.3, 0.6, 45); H(T.ask + 3.05); H(T.ask + 3.6); S.fx('roll', T.ask + 3.7, { dur: 1.0, vel: 30 });
  // entries
  W(T.entries + 1.25, 0.35, 40); W(T.entries + 3.1, 0.3, 40); H(T.entries + 4.05); H(T.entries + 4.35); W(T.entries + 4.35, 0.55, 40);
  [0, 1, 2].forEach(i => S.fx('tick', T.entries + 4.95 + i * 0.3, { vel: 55 })); H(T.entries + 6.4, 95);
  // you
  S.fx('pop', T.you + 2.0); S.fx('pop', T.you + 3.95); W(T.you + 1.25, 0.6, 30);
  // fixes
  H(T.fixes + 0.55); H(T.fixes + 1.5); W(T.fixes + 2.45, 0.55, 50); H(T.fixes + 3.1); H(T.fixes + 3.55); S.fx('chime', T.fixes + 3.8, { vel: 45 });
  // scam
  W(T.scam + 0.55, 0.65, 35); S.fx('pop', T.scam + 1.0, { vel: 45 }); S.fx('pop', T.scam + 1.6, { vel: 45 }); W(T.scam + 2.7, 0.5, 40); H(T.scam + 3.45, 120); S.fx('crash', T.scam + 3.45, { vel: 70 });
  // close
  S.fx('revswell', T.close + 2.9, { dur: 1.2 }); H(T.close + 2.9, 110);
  S.chord('keys', ['D3', 'A3', 'D4', 'F4'], { t: T.close + 2.95, dur: 1.45, vel: 64 });
  S.note('bass', 'D2', { t: T.close + 2.95, dur: 1.4, vel: 70 });
  // brand sting
  W(T.brand, 0.5, 60); S.fx('sparkle', T.brand + 0.2, { vel: 60 }); H(T.brand + 0.55, 105); S.drum('kick', { t: T.brand + 0.55, vel: 100 });
  S.chord('keys', ['D4', 'F#4', 'A4', 'D5'], { t: T.brand + 0.55, dur: 1.8, vel: 66 }); S.note('bass', 'D2', { t: T.brand + 0.55, dur: 1.7, vel: 72 });
  S.fx('whoosh', T.close + 4.05, { dur: 0.35, vel: 60 });
  S.master({ gain: -12, fadeOut: 0.8 });
});
