const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -700, cy: 970, z: 1.05, r: -5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.4, from: 0.4, cx: 520, cy: 980, z: 1.06, r: 1 }, { t: 5.25, from: 3.45, cx: 550, cy: 980, z: 1.05, r: -1 }];
kit.scene('parrot', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:340px;width:1080px;align-items:center;gap:8px"><p class="sub pr-k">Critics argued</p><h1 class="line pr-l" style="font-size:120px">Neural nets</h1></div>' +
      '<div class="pr-p" style="position:absolute;left:60px;top:820px;width:440px;transform-origin:50% 90%">' + UI.img(kit, 'parrot.webp', '', 'left:0;top:0;width:440px') + '</div>' +
      '<div class="bub pr-b1" style="left:480px;top:660px;width:460px;transform-origin:0 80%">Can’t create new knowledge<i></i></div>' +
      '<div class="bub pr-b2" style="left:480px;top:950px;width:460px;transform-origin:0 80%;background:var(--main);color:#fff">Only repeat training data<i style="background:var(--main)"></i></div>',
      2000, '', 'soft', UI.ghost('Parrot', -60, 1520));
    const q = this.v.q;
    this.k = q('.pr-k').style; this.L = UI.letters(q('.pr-l'), 611, 0.9, 0.4);
    this.p = q('.pr-p').style; this.b1 = q('.pr-b1').style; this.b2 = q('.pr-b2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.4)); UI.reveal(this.L, t);
    const pp = seg(t, 0.4, 0.8), bob = Math.sin(t * 6) * 2 + (t > 3.6 ? Math.max(0, Math.sin((t - 3.6) * 14)) * 6 * seg(t, 3.6, 4.6) * (1 - seg(t, 4.6, 5.0)) : 0);
    this.p.opacity = pp > 0 ? 1 : 0; this.p.transform = 'translateX(' + lerp(-500, 0, eob(pp, 1.2)) + 'px) rotate(' + (-bob) + 'deg)';
    const a = seg(t, 1.85, 2.15); this.b1.opacity = a > 0 ? 1 : 0; this.b1.transform = 'scale(' + lerp(0.3, 1, eob(a, 1.8)) + ') rotate(-2deg)';
    const b = seg(t, 3.55, 3.85), jit = t > 3.85 ? Math.sin(t * 40) * 2 * (1 - seg(t, 3.85, 4.4)) : 0;
    this.b2.opacity = b > 0 ? 1 : 0; this.b2.transform = 'translateX(' + jit + 'px) scale(' + lerp(0.3, 1, eob(b, 1.8)) + ') rotate(2deg)';
    if (t > 5.2) UI.roll(this.v.roll, t, 5.6, 0, -12); else UI.punch(this.v.roll, t, [1.85, 3.55], 0.04);
  },
});
