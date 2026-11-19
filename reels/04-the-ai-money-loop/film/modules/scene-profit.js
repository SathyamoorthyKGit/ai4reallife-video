const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 1000, z: 2.2, r: 0 }, { t: 0.5, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.95, from: 0.55, cx: 540, cy: 975, z: 1.05, r: 1 }, { t: 3.35, from: 2.95, cx: 540, cy: 1720, z: 1.0, r: -1 }, { t: 5.05, from: 3.4, cx: 540, cy: 1730, z: 1.05, r: 0 }, { t: 5.37, from: 5.05, cx: 540, cy: 2600, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('profit', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub pr-k">Reports also show a</p><h1 class="line pr-l" style="font-size:118px">Q2 profit</h1></div>' +
      UI.img(kit, 'page.webp', 'pr-pg', 'left:200px;top:640px;width:680px') +
      '<div class="pr-mk" style="position:absolute;left:250px;top:830px;width:580px;display:flex;flex-direction:column;align-items:center;transform-origin:50% 50%"><span class="stamp" style="position:relative;font-size:118px;border-width:12px">+$974M</span><span class="lbl" style="margin-top:14px;color:var(--main);font-size:30px">Q2 2026 operating income</span></div>' +
      UI.img(kit, 'rstamp.webp', 'pr-rs', 'left:420px;top:700px;width:240px') +
      '<div class="pr-b" style="position:absolute;left:300px;top:1380px;width:480px;height:480px;transform-origin:50% 50%">' + UI.img(kit, 'bubble.webp', '', 'left:0;top:0;width:480px') + '</div>' +
      '<div class="pr-p" style="position:absolute;left:691px;top:1172px;width:440px;transform-origin:2% 97%">' + UI.img(kit, 'pin.webp', '', 'left:0;top:0;width:440px') + '</div>' +
      '<div class="words" style="left:0;top:2010px;width:1080px;align-items:center"><span class="stamp solid pr-s" style="position:relative;font-size:96px;transform-origin:50% 50%">Too simple</span></div>',
      2400, '', 'window', UI.ghost('Profit', -60, 1260));
    const q = this.v.q;
    this.k = q('.pr-k').style; this.L = UI.letters(q('.pr-l'), 451, 0.3, 0.4);
    this.mk = q('.pr-mk').style; this.rs = q('.pr-rs').style; this.b = q('.pr-b').style; this.p = q('.pr-p').style; this.s = q('.pr-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.005);
    this.k.opacity = eo(seg(t, 0.15, 0.4)); UI.reveal(this.L, t);
    const dn = seg(t, 0.9, 1.15), up = seg(t, 1.35, 1.7);
    this.rs.opacity = dn > 0 && up < 1 ? 1 : 0; this.rs.transform = 'translateY(' + (lerp(-700, 0, ei(dn)) + lerp(0, -800, ei(up))) + 'px)';
    this.mk.opacity = (t >= 1.15 ? 1 : 0) * (1 - eo(seg(t, 2.95, 3.25))); this.mk.transform = 'rotate(-5deg) scale(' + lerp(1.08, 1, eo(seg(t, 1.15, 1.35))) + ')';
    // the pin hits the bubble and bends; the bubble wobbles but holds
    const pin = eio(seg(t, 3.3, 3.75)), hit = t > 3.75 ? t - 3.75 : 0, bend = t > 3.75 ? lerp(0, 18, eob(seg(t, 3.75, 4.0), 1.8)) : 0;
    this.p.transform = 'translate(' + lerp(420, 0, pin) + 'px,' + lerp(-420, 0, pin) + 'px) rotate(' + bend + 'deg)';
    const w = hit ? Math.sin(hit * 22) * 0.06 * Math.exp(-hit * 4) : 0;
    this.b.transform = 'scale(' + (1 - w) + ',' + (1 + w) + ')';
    UI.slam(this.s, t, 3.95, 0.24, -6, 1.9);
    UI.punch(this.v.roll, t, [1.15, 3.95], 0.045);
  },
});
