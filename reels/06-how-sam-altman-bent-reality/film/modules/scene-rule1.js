const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.45, from: 0.35, cx: 540, cy: 980, z: 1.05, r: 1 }, { t: 4.8, from: 4.45, cx: 1800, cy: 980, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('rule1', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="num-b r1-n" style="left:130px;top:330px">1</div>' +
      '<div class="words" style="left:240px;top:342px"><p class="sub r1-k" style="font-size:52px">Trade</p></div>' +
      '<div class="r1-tl" style="position:absolute;left:90px;top:500px;width:380px;display:flex;flex-direction:column;align-items:center;gap:8px"><span class="node" style="font-size:36px">Short-term</span><span class="tag" style="position:relative;align-self:center;font-size:34px">Low status</span></div>' +
      '<div class="r1-tr" style="position:absolute;left:610px;top:500px;width:380px;display:flex;flex-direction:column;align-items:center;gap:8px"><span class="node" style="font-size:36px;background:var(--main)">Long-term</span><span class="tag" style="position:relative;align-self:center;font-size:34px">High status</span></div>' +
      '<div class="r1-sc" style="position:absolute;left:220px;top:690px;width:640px;transform-origin:50% 12%">' + UI.img(kit, 'scale.webp', '', 'left:0;top:0;width:640px') + '</div>' +
      '<div class="words" style="left:0;top:1350px;width:1080px;align-items:center"><span class="tape pk r1-t" style="position:relative;align-self:center;font-size:50px;transform-origin:50% 50%">Low now, high later</span></div>',
      2000, '', 'soft', UI.ghost('Status', -60, 1520));
    const q = this.v.q;
    this.n = q('.r1-n').style; this.k = q('.r1-k').style; this.tl = q('.r1-tl').style; this.tr = q('.r1-tr').style; this.sc = q('.r1-sc').style; this.t = q('.r1-t').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.n, t, 0.15, 0.2, 0, 1.8); this.k.opacity = eo(seg(t, 0.85, 1.1));
    const sp = seg(t, 0.2, 0.55); this.sc.opacity = sp > 0 ? 1 : 0;
    // the scale tips left under short-term, then swings hard to long-term
    const tilt = lerp(lerp(0, -5, eob(seg(t, 1.0, 1.4), 1.5)), 7, eob(seg(t, 2.8, 3.3), 1.6)) + Math.sin(t * 2.2) * 0.6;
    this.sc.transform = 'translateY(' + lerp(300, 0, eob(sp, 1.2)) + 'px) rotate(' + tilt + 'deg)';
    const a = seg(t, 0.95, 1.2), b = seg(t, 2.74, 3.0);
    this.tl.opacity = a > 0 ? 1 - 0.45 * seg(t, 2.9, 3.3) : 0; this.tl.transform = 'translateY(' + (lerp(-200, 0, eob(a, 1.3)) - tilt * 4) + 'px) rotate(-3deg)';
    this.tr.opacity = b > 0 ? 1 : 0; this.tr.transform = 'translateY(' + (lerp(-200, 0, eob(b, 1.3)) + tilt * 4) + 'px) rotate(3deg) scale(' + lerp(1, 1.08, eob(seg(t, 3.0, 3.3), 1.6)) + ')';
    UI.slam(this.t, t, 3.5, 0.22, -2, 1.5);
    UI.punch(this.v.roll, t, [0.15, 2.74, 3.5], 0.04);
  },
});
