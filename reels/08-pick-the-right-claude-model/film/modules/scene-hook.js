const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 is mid-swing: the sledgehammer is already coming down on a walnut
const KEYS = [{ t: 0, cx: 450, cy: 980, z: 1.3, r: -3 }, { t: 0.35, from: 0.15, cx: 540, cy: 940, z: 1.0, r: 0, ease: kit.eox }, { t: 3.85, from: 0.4, cx: 540, cy: 960, z: 1.03, r: 1 }, { t: 4.2, from: 3.85, cx: 540, cy: 2600, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('hook', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:6px"><h1 class="num fh-n" style="font-size:150px;transform-origin:50% 50%;color:var(--main)">Fable 5.2</h1><p class="sub fh-k">Just dropped</p></div>' +
      UI.anim(kit, 'walnut', 'fh-w', 'left:430px;top:1030px', 290) +
      '<div class="fh-hm" style="position:absolute;left:174px;top:731px;width:520px;height:473px;transform-origin:5% 95%">' + UI.anim(kit, 'hammer', '', 'left:0;top:0', 520) + '</div>' +
      UI.anim(kit, 'hand', 'fh-h', 'left:640px;top:700px', 290) +
      '<div class="words" style="left:0;top:1340px;width:1080px;align-items:center"><span class="stamp solid fh-s" style="position:relative;font-size:58px;transform-origin:50% 50%">Not for everything</span></div>',
      2600, '', 'spot', UI.ghost('Stop', -60, 1500, 460));
    const q = this.v.q;
    this.n = q('.fh-n').style; this.k = q('.fh-k').style; this.w = q('.fh-w').style; this.hm = q('.fh-hm').style; this.h = q('.fh-h').style; this.s = q('.fh-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.slam(this.n, t, 0.12, 0.22, -2, 1.6); this.k.opacity = eo(seg(t, 1.2, 1.45));
    // the hammer keeps coming down until the glove catches it on "don't"
    const stop = t >= 2.34, ang = stop ? 10 + Math.sin((t - 2.34) * 30) * 5 * Math.exp(-(t - 2.34) * 6) : lerp(-26, 10, ei(seg(t, -0.5, 2.34)));
    this.hm.transform = 'rotate(' + ang + 'deg)';
    const hp = seg(t, 2.2, 2.4); this.h.opacity = hp > 0 ? 1 : 0; UI.frame(this.h, t);
    this.h.transform = 'translateX(' + lerp(520, 0, eob(hp, 1.4)) + 'px) rotate(' + (-8 + (stop ? Math.sin((t - 2.34) * 30) * 3 * Math.exp(-(t - 2.34) * 6) : 0)) + 'deg)';
    const wob = t > 2.34 ? Math.sin((t - 2.34) * 18) * 6 * Math.exp(-(t - 2.34) * 2.5) : 0;
    this.w.transform = 'rotate(' + wob + 'deg)';
    UI.slam(this.s, t, 3.0, 0.22, -3, 1.7);
    UI.punch(this.v.roll, t, [0.12, 2.34, 3.0], 0.05);
  },
});
