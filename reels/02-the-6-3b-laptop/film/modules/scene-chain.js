const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 700, z: 1.04, r: 1 }, { t: 2.3, from: 0.2, cx: 540, cy: 700, z: 1.0, r: 0 }, { t: 5.2, from: 4.5, cx: 540, cy: 1240, z: 1.0, r: 2 }, { t: 6.6, from: 6.0, cx: 540, cy: 1820, z: 1.0, r: -2 }, { t: 7.6, from: 7.05, cx: 540, cy: 2440, z: 1.0, r: 1 }, { t: 7.95, cx: 540, cy: 2440, z: 1.0, r: 1 }, { t: 8.3, from: 7.95, cx: 540, cy: 3150, z: 1.1, r: -3, ease: kit.ei }];
const LIT = [2.3, 5.2, 6.6, 7.6];
kit.scene('chain', {
  init(kit) {
    kit.css('.ch-n{position:absolute;inset:0}');
    const tape = (txt, top) => '<div class="words" style="left:480px;top:' + top + 'px;gap:10px">' + txt.map(s => '<span class="tape" style="font-size:56px">' + s + '</span>').join('') + '</div>';
    const arrow = (y0, y1, i) => '<path class="redline ch-a' + i + '" d="M330 ' + y0 + ' C 400 ' + (y0 + 90) + ' 260 ' + (y1 - 120) + ' 330 ' + (y1 - 10) + '" style="stroke-width:10"/><path class="redline ch-h' + i + '" d="M302 ' + (y1 - 42) + ' L330 ' + (y1 - 8) + ' L358 ' + (y1 - 42) + '" style="stroke-width:10"/>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:250px;width:1080px;align-items:center"><p class="sub ch-k" style="font-size:38px">Binance’s early explanation</p></div>' +
      '<svg class="art" viewBox="0 0 1080 2900" style="height:2900px">' + arrow(800, 1050, 0) + arrow(1425, 1690, 1) + arrow(2080, 2340, 2) + '</svg>' +
      '<div class="ch-n ch-n0">' + UI.img(kit, 'laptop.webp', '', 'left:110px;top:430px;width:420px') + tape(['Laptop'], 560) + '</div>' +
      '<div class="stamp ch-st" style="left:140px;top:735px;font-size:46px">Compromised</div>' +
      '<div class="ch-n ch-n1">' + UI.img(kit, 'server.webp', '', 'left:150px;top:1060px;width:340px') + tape(['Service', 'container'], 1120) + '</div>' +
      '<div class="ch-n ch-n2">' + UI.img(kit, 'pen.webp', '', 'left:120px;top:1700px;width:400px') + tape(['Signing', 'system'], 1770) + '</div>' +
      '<div class="ch-n ch-n3">' + UI.img(kit, 'wallet.webp', '', 'left:100px;top:2350px;width:440px') + tape(['Wallets'], 2470) + '</div>', 2900, '', 'soft');
    const q = this.v.q;
    this.k = q('.ch-k').style; this.st = q('.ch-st').style;
    this.n = [0, 1, 2, 3].map(i => q('.ch-n' + i).style);
    this.a = [0, 1, 2].map(i => ({ a: UI.draw(q('.ch-a' + i)), h: q('.ch-h' + i).style }));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.1, 0.4));
    this.n.forEach((s, i) => {
      const p = seg(t, LIT[i], LIT[i] + 0.3);
      s.filter = p > 0 ? 'none' : 'grayscale(1)';
      s.opacity = (0.28 + 0.72 * eo(p)) * (i === 0 ? 1 : eo(seg(t, LIT[i] - 0.65, LIT[i] - 0.4)));
      s.transform = 'scale(' + (1 + 0.06 * Math.sin(p * Math.PI)) + ')';
      s.transformOrigin = '50% ' + [600, 1240, 1880, 2500][i] + 'px';
    });
    this.a.forEach((o, i) => { const a = LIT[i + 1] - 0.55; o.a(eo(seg(t, a, a + 0.4))); o.h.opacity = t >= a + 0.38 ? 1 : 0; });
    UI.punch(this.v.roll, t, [2.3, 3.75, 5.2, 6.6, 7.6], 0.035);
    UI.slam(this.st, t, 3.75, 0.2, -6, 1.8); if (t >= 3.75) this.st.opacity = 0.92;
    UI.glitch(kit, t, 0, 47);
  },
});
