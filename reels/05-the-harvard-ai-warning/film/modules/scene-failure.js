const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 1000, z: 2.2, r: 0 }, { t: 0.5, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.55, from: 0.55, cx: 540, cy: 975, z: 1.02, r: 1 }, { t: 3.92, from: 3.55, cx: 540, cy: 2700, z: 1.05, r: -3, ease: kit.ei }];
kit.scene('failure', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub fa-k">Self-automation leads</p><h1 class="line fa-l" style="font-size:130px">Straight to</h1></div>' +
      '<div class="fa-pl" style="position:absolute;left:260px;top:620px;width:560px;transform-origin:50% 0">' + UI.img(kit, 'plug.webp', '', 'left:0;top:0;width:560px') + '</div>' +
      '<div class="words" style="left:0;top:1280px;width:1080px;align-items:center"><span class="stamp solid fa-s" style="position:relative;font-size:150px;transform-origin:50% 50%">Failure</span></div>',
      2000, '', 'dark', UI.ghost('Failure', -60, 1520));
    const q = this.v.q;
    this.k = q('.fa-k').style; this.L = UI.letters(q('.fa-l'), 521, 1.1, 0.45); this.pl = q('.fa-pl').style; this.s = q('.fa-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.005);
    this.k.opacity = eo(seg(t, 0.3, 0.6)); UI.reveal(this.L, t);
    const dp = seg(t, 1.3, 1.9), sw = t > 1.9 ? Math.sin((t - 1.9) * 6) * 6 * Math.exp(-(t - 1.9) * 1.5) : 0;
    this.pl.opacity = dp > 0 ? 1 : 0; this.pl.transform = 'translateY(' + lerp(-900, 0, eob(dp, 1.2)) + 'px) rotate(' + sw + 'deg)';
    UI.slam(this.s, t, 3.15, 0.24, -6, 2.0);
    UI.punch(this.v.roll, t, [1.9, 3.15], 0.045);
  },
});
