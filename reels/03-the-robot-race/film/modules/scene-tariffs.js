const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -600, cy: 960, z: 1.05, r: -5 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.0, from: 0.45, cx: 540, cy: 975, z: 1.05, r: 1 }, { t: 2.45, from: 2.0, cx: 540, cy: 1700, z: 1.0, r: -1 }, { t: 5.19, from: 2.5, cx: 540, cy: 1700, z: 1.07, r: 0 }];
const MONTHS = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
kit.scene('tariffs', {
  init(kit) {
    const boxes = MONTHS.map((m, i) => {
      const x = 130 + (i % 4) * 210, y = 1480 + Math.floor(i / 4) * 190;
      return '<div class="mbox tf-m" style="left:' + x + 'px;top:' + y + 'px"><span>' + m + '</span></div>' +
        '<svg class="tf-x" viewBox="0 0 190 160" style="position:absolute;left:' + x + 'px;top:' + y + 'px;width:190px;height:160px;overflow:visible"><path class="redline tf-p" d="M40 60 L150 140" style="stroke-width:14"/><path class="redline tf-p" d="M150 62 L42 138" style="stroke-width:14"/></svg>';
    }).join('');
    this.v = UI.build(kit,
      '<div class="tf-v" style="position:absolute;left:110px;top:300px;width:860px;height:820px"></div>' +
      UI.img(kit, 'containers.webp', 'tf-c', 'left:610px;top:810px;width:400px') +
      UI.img(kit, 'ship.webp', 'tf-s', 'left:0;top:880px;width:560px') +
      '<div class="words" style="left:140px;top:380px;gap:12px"><span class="tag tf-g">April 2025</span><span class="stamp solid tf-st" style="position:relative;font-size:120px;transform-origin:30% 50%">Tariffs</span></div>' +
      '<div class="words" style="left:0;top:1200px;width:1080px;align-items:center;gap:6px"><p class="sub tf-k">Then US factory jobs fell</p><h1 class="line tf-l" style="font-size:120px">8 months</h1><p class="sub tf-k2">in a row</p></div>' +
      boxes +
      '',
      2400, '', 'window', UI.ghost('Tariffs', -60, 1700, 360));
    const q = this.v.q;
    this.vid = UI.vid(kit, q('.tf-v'), 'clip-port.mp4', 44); this.vs = q('.tf-v').style;
    this.c = q('.tf-c').style; this.s = q('.tf-s').style; this.g = q('.tf-g').style; this.st = q('.tf-st').style;
    this.k = q('.tf-k').style; this.L = UI.letters(q('.tf-l'), 81, 2.45, 0.35); this.k2 = q('.tf-k2').style;
    this.m = [...kit.stage.querySelectorAll('.tf-m')].map(e => e.style);
    this.x = [...kit.stage.querySelectorAll('.tf-p')].map(p => UI.draw(p));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    kit.seek(this.vid, t * 0.9);
    this.c.opacity = t >= 0.5 ? 1 : 0; this.c.transform = 'translateY(' + lerp(260, 0, eob(seg(t, 0.5, 0.95), 1.2)) + 'px) rotate(4deg)';
    this.s.transform = 'translateX(' + lerp(-560, 120, eo(seg(t, 0.3, 3.0))) + 'px) rotate(' + Math.sin(t * 2) * 1.2 + 'deg)';
    this.g.opacity = eo(seg(t, 0.75, 1.0)); this.g.transform = 'rotate(-3deg)';
    UI.slam(this.st, t, 1.0, 0.24, -6, 1.9);
    this.k.opacity = eo(seg(t, 2.35, 2.6)); UI.reveal(this.L, t);
    this.m.forEach((st, i) => { const p = seg(t, 2.35 + i * 0.05, 2.7 + i * 0.05); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(60, 0, eob(p, 1.4)) + 'px)'; });
    this.x.forEach((d, j) => { const i = j >> 1, a = 2.9 + i * 0.26 + (j & 1) * 0.09; d(eo(seg(t, a, a + 0.12))); });
    this.k2.opacity = eo(seg(t, 2.85, 3.1));
    if (t > 4.8) UI.roll(this.v.roll, t, 5.19, 0, 12); else UI.punch(this.v.roll, t, [1.0], 0.04);
  },
});
