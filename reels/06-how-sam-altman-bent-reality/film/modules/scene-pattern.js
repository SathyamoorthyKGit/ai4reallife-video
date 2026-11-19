const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.8, r: 3 }, { t: 0.45, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.2, from: 0.5, cx: 540, cy: 975, z: 1.04, r: -1 }, { t: 4.65, from: 4.2, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 7.85, from: 4.7, cx: 540, cy: 1965, z: 1.03, r: 0 }, { t: 8.2, from: 7.85, cx: 540, cy: 2900, z: 1.05, r: 3, ease: kit.ei }];
const ICONS = [{ n: 'city.webp', x: 50, w: 270, y: 770, l: 'Cities', a: 1.9 }, { n: 'manager.webp', x: 472, w: 130, y: 760, l: 'Careers', a: 2.56 }, { n: 'computer.webp', x: 720, w: 280, y: 790, l: 'Computers', a: 3.37 }];
kit.scene('pattern', {
  init(kit) {
    const icons = ICONS.map((c, i) => '<div class="pt-i" style="position:absolute;left:' + c.x + 'px;top:' + c.y + 'px;width:' + c.w + 'px">' + UI.img(kit, c.n, '', 'left:0;top:0;width:' + c.w + 'px') + '</div>' +
      '<div class="words pt-lb" style="left:' + (c.x + c.w / 2 - 160) + 'px;top:1060px;width:320px;align-items:center"><span class="node" style="font-size:30px">' + c.l + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="pt-a" style="position:absolute;left:420px;top:250px;width:240px">' + UI.img(kit, 'altman.webp', '', 'left:0;top:0;width:240px') + '</div>' +
      '<div class="words" style="left:0;top:530px;width:1080px;align-items:center;gap:6px"><p class="sub pt-k">But Sam noticed a</p><h1 class="line pt-l" style="font-size:140px">Pattern</h1></div>' +
      icons +
      '<svg class="art" viewBox="0 0 1080 2600" style="height:2600px">' +
        '<path class="stroke pt-ax" d="M150 1600 L150 2400 L960 2400" style="stroke-width:6"/>' +
        '<path class="pk-line pt-cv" d="M170 2370 C 420 2360 600 2310 720 2190 C 820 2090 890 1900 940 1620" style="stroke-width:16"/>' +
        '<path class="stroke pt-ln" d="M170 2370 L940 1990" style="stroke-width:5;stroke-dasharray:14 14"/>' +
      '</svg>' +
      '<div class="words" style="left:0;top:1290px;width:1080px;align-items:center;gap:4px"><h1 class="line pt-l2" style="font-size:120px">Super-linear</h1><h1 class="line pink pt-l3" style="font-size:150px">returns</h1></div>' +
      '<div class="words" style="left:700px;top:2420px"><span class="lbl pt-x">Scale</span></div>' +
      '<div class="words" style="left:180px;top:1620px"><span class="lbl pt-y">Scaling neural nets</span></div>',
      2900, '', 'soft', UI.ghost('Scale', -60, 1520));
    const q = this.v.q;
    this.a = q('.pt-a').style; this.k = q('.pt-k').style; this.L = UI.letters(q('.pt-l'), 621, 0.9, 0.4);
    this.i = [...kit.stage.querySelectorAll('.pt-i')].map(e => e.style); this.lb = [...kit.stage.querySelectorAll('.pt-lb')].map(e => e.style);
    this.cv = UI.draw(q('.pt-cv')); this.ax = q('.pt-ax'); this.ln = q('.pt-ln').style; this.x = q('.pt-x').style; this.y = q('.pt-y').style;
    this.L2 = UI.letters(q('.pt-l2'), 622, 5.85, 0.4).concat(UI.letters(q('.pt-l3'), 623, 6.35, 0.35));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    const ap = seg(t, 0.15, 0.45); this.a.opacity = ap > 0 ? 1 : 0; this.a.transform = 'scale(' + lerp(0.4, 1, eob(ap, 1.7)) + ') rotate(' + (-3 + Math.sin(t * 1.4)) + 'deg)';
    this.k.opacity = eo(seg(t, 0.3, 0.55)); UI.reveal(this.L, t);
    ICONS.forEach((c, i) => {
      const p = seg(t, c.a - 0.1, c.a + 0.25); this.i[i].opacity = p > 0 ? 1 : 0;
      this.i[i].transform = 'translateY(' + lerp(260, 0, eob(p, 1.4)) + 'px) rotate(' + ([-4, 2, 4][i] + Math.sin(t * 1.3 + i) * 1.2) + 'deg)';
      this.lb[i].opacity = eo(seg(t, c.a + 0.1, c.a + 0.3)) * (1 - seg(t, 4.2, 4.45)); this.i[i].opacity *= 1 - seg(t, 4.3, 4.6);
    });
    this.ln.opacity = eo(seg(t, 4.5, 4.8)) * 0.5; this.ax.style.opacity = eo(seg(t, 4.3, 4.6));
    this.cv(eio(seg(t, 4.6, 6.4)));
    this.y.opacity = eo(seg(t, 4.6, 4.9)); this.x.opacity = eo(seg(t, 4.7, 5.0));
    UI.reveal(this.L2, t);
    UI.punch(this.v.roll, t, [1.9, 2.56, 3.37, 6.35], 0.03);
  },
});
