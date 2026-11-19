const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 5.0, from: 0.35, cx: 540, cy: 975, z: 1.03, r: -1 }];
kit.scene('cta', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:340px;width:1080px;align-items:center"><span class="tape bl ct-t" style="position:relative;align-self:center;font-size:110px;transform-origin:50% 50%">Save this</span></div>' +
      UI.anim(kit, 'floppy', 'ct-fl', 'left:110px;top:560px', 360) +
      UI.anim(kit, 'clock', 'ct-ck', 'left:640px;top:540px', 300) +
      '<div class="words" style="left:0;top:960px;width:1080px;align-items:center;gap:6px"><p class="sub ct-k">Then build your clone</p><h1 class="line pink ct-l" style="font-size:140px">Tonight</h1></div>' +
      '<div class="words" style="left:0;top:1260px;width:1080px;align-items:center"><span class="stamp solid ct-s" style="position:relative;font-size:56px;transform-origin:50% 50%">10 minutes. Once.</span></div>',
      2000, '', 'window', UI.ghost('Tonight', -60, 1520, 360));
    const q = this.v.q;
    this.t = q('.ct-t').style; this.fl = q('.ct-fl').style; this.ck = q('.ct-ck').style; this.k = q('.ct-k').style;
    this.L = UI.letters(q('.ct-l'), 761, 2.3, 0.35); this.s = q('.ct-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.t, t, 0.29, 0.22, -3, 1.6);
    const fp = seg(t, 0.35, 0.65); this.fl.opacity = fp > 0 ? 1 : 0; this.fl.transform = 'translateY(' + lerp(-500, 0, eob(fp, 1.3)) + 'px) rotate(-6deg)'; UI.frame(this.fl, t);
    const cp = seg(t, 1.3, 1.6), ring = t > 2.3 && t < 3.1 ? Math.sin(t * 50) * 4 : 0;
    this.ck.opacity = cp > 0 ? 1 : 0; this.ck.transform = 'translate(' + ring + 'px,' + lerp(400, 0, eob(cp, 1.2)) + 'px) rotate(' + (5 + ring * 0.5) + 'deg)'; UI.frame(this.ck, t);
    this.k.opacity = eo(seg(t, 1.32, 1.6)); UI.reveal(this.L, t);
    UI.slam(this.s, t, 3.3, 0.22, -3, 1.7);
    UI.punch(this.v.roll, t, [0.29, 2.4, 3.3, 4.3], 0.045);
  },
});
