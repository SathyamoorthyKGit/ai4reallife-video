const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.6, r: -4 }, { t: 0.45, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.3, from: 0.5, cx: 540, cy: 940, z: 1.05, r: 1 }, { t: 6.3, from: 4.35, cx: 540, cy: 970, z: 1.02, r: -1 }, { t: 6.7, from: 6.3, cx: 1800, cy: 970, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('y2015', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:290px;width:1080px;align-items:center"><h1 class="num y5-n" style="font-size:260px;transform-origin:50% 50%">2015</h1></div>' +
      '<div class="words" style="left:0;top:560px;width:1080px;align-items:center"><p class="sub y5-k">Starting an AGI lab</p></div>' +
      '<div class="stamp y5-s" style="left:250px;top:650px;font-size:100px;transform-origin:50% 50%">Low status</div>' +
      '<div class="y5-c" style="position:absolute;left:230px;top:820px;width:620px">' + UI.img(kit, 'critics.webp', '', 'left:0;top:0;width:620px') + '</div>' +
      '<div class="words" style="left:0;top:1420px;width:1080px;align-items:center"><span class="tape y5-t" style="position:relative;align-self:center;font-size:46px;transform-origin:50% 50%">No one took it seriously</span></div>',
      2000, '', 'window', UI.ghost('2015', -60, 1500));
    const q = this.v.q;
    this.n = q('.y5-n').style; this.k = q('.y5-k').style; this.s = q('.y5-s').style; this.c = q('.y5-c').style; this.t = q('.y5-t').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.n, t, 0.2, 0.22, 0, 1.4);
    this.k.opacity = eo(seg(t, 1.15, 1.45));
    UI.slam(this.s, t, 2.85, 0.22, -6, 1.8);
    // the doubters land, then shake with laughter
    const cp = seg(t, 4.4, 4.75), laugh = t > 4.75 ? Math.sin((t - 4.75) * 22) * 3 * Math.exp(-(t - 4.75) * 0.6) : 0;
    this.c.opacity = cp > 0 ? 1 : 0;
    this.c.transform = 'translateY(' + (lerp(500, 0, eob(cp, 1.2)) + laugh) + 'px) rotate(' + (-2 + laugh * 0.3) + 'deg)';
    UI.slam(this.t, t, 5.0, 0.22, -2, 1.5);
    UI.punch(this.v.roll, t, [0.2, 2.85, 5.0], 0.045);
  },
});
