const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.95, from: 0.4, cx: 540, cy: 980, z: 1.05, r: -1 }, { t: 5.3, from: 4.95, cx: -700, cy: 980, z: 1.05, r: -5, ease: kit.ei }];
kit.scene('plan', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub pl-k" style="font-size:36px">If you want to build something</p><h1 class="line pl-l" style="font-size:90px">Extraordinary</h1></div>' +
      '<div class="pl-b" style="position:absolute;left:160px;top:540px;width:760px">' + UI.img(kit, 'blueprint.webp', '', 'left:0;top:0;width:760px') + '</div>' +
      UI.img(kit, 'altman.webp', 'pl-a', 'left:60px;top:1000px;width:250px') +
      '<div class="words" style="left:330px;top:1080px"><span class="tape bl pl-t" style="position:relative;font-size:46px;transform-origin:50% 50%">Altman’s blueprint</span></div>' +
      '<div class="stamp solid pl-s" style="left:560px;top:920px;font-size:80px;transform-origin:50% 50%">3 things</div>',
      2000, '', 'window', UI.ghost('Build', -60, 1520));
    const q = this.v.q;
    this.k = q('.pl-k').style; this.L = UI.letters(q('.pl-l'), 651, 1.2, 0.45);
    this.b = q('.pl-b').style; this.a = q('.pl-a').style; this.t = q('.pl-t').style; this.s = q('.pl-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.3, 0.6)); UI.reveal(this.L, t);
    // the blueprint unrolls left to right
    const u = eio(seg(t, 2.3, 3.1)); this.b.opacity = t >= 2.3 ? 1 : 0;
    this.b.clipPath = 'inset(0 ' + (100 - 100 * u).toFixed(2) + '% 0 0)';
    this.b.transform = 'rotate(-3deg)';
    const ap = seg(t, 2.45, 2.8); this.a.opacity = ap > 0 ? 1 : 0; this.a.transform = 'translateY(' + lerp(300, 0, eob(ap, 1.2)) + 'px) rotate(-4deg)';
    UI.slam(this.t, t, 2.6, 0.22, -2, 1.5);
    UI.slam(this.s, t, 4.0, 0.22, -6, 1.7);
    UI.punch(this.v.roll, t, [2.6, 4.0], 0.045);
  },
});
