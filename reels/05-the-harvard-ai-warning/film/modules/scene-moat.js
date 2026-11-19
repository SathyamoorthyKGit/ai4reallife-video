const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 8.4, from: 0.4, cx: 540, cy: 990, z: 1.02, r: 0 }, { t: 8.78, from: 8.4, cx: 540, cy: -800, z: 1.05, r: -3, ease: kit.ei }];
const ROWS = [{ y: 640, n: 'redpen.webp', w: 270, txt: 'Personal taste', a: 3.45, c: 'pk' }, { y: 960, n: 'loupe.webp', w: 260, txt: 'Rigorous skepticism', a: 5.6, c: 'bl' }, { y: 1250, n: 'fork.webp', w: 110, txt: 'Fundamentals', a: 7.1, c: '' }];
kit.scene('moat', {
  init(kit) {
    const rows = ROWS.map(r => UI.img(kit, r.n, 'mo-i', 'left:' + (90 + (270 - r.w) / 2) + 'px;top:' + (r.y - 40) + 'px;width:' + r.w + 'px') +
      '<div class="words" style="left:370px;top:' + (r.y + 40) + 'px"><span class="tape ' + r.c + ' mo-t" style="font-size:46px">' + r.txt + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:350px;width:1080px;align-items:center;gap:10px"><p class="sub mo-k">Your real moat isn’t</p><span class="tag mo-x" style="align-self:center;font-size:44px;position:relative">Basic execution<svg viewBox="0 0 100 20" preserveAspectRatio="none" style="position:absolute;left:-4%;top:30%;width:108%;height:40%;overflow:visible"><path class="pk-line mo-s" d="M0 12 L100 6" style="stroke-width:5"/></svg></span></div>' + rows,
      2000, '', 'window', UI.ghost('Taste', -60, 1560));
    const q = this.v.q;
    this.k = q('.mo-k').style; this.x = q('.mo-x').style; this.s = UI.draw(q('.mo-s'));
    this.i = [...kit.stage.querySelectorAll('.mo-i')].map(e => e.style); this.t = [...kit.stage.querySelectorAll('.mo-t')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.35, 0.65)); this.x.opacity = eo(seg(t, 1.7, 1.95)); this.s(eo(seg(t, 2.3, 2.6)));
    ROWS.forEach((r, i) => { const p = seg(t, r.a - 0.15, r.a + 0.3); this.i[i].opacity = p > 0 ? 1 : 0; this.i[i].transform = 'translateX(' + lerp(-400, 0, eob(p, 1.2)) + 'px) rotate(' + [-6, 5, -4][i] + 'deg)'; UI.slam(this.t[i], t, r.a + 0.1, 0.22, [-2, 2, -1][i], 1.5); });
    UI.punch(this.v.roll, t, [2.3].concat(ROWS.map(r => r.a + 0.1)), 0.035);
  },
});
