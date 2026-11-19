const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -420, cy: 960, z: 1.05, r: -3 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 1.2, from: 0.55, cx: 451, cy: 1057, z: 1.45, r: 6 }, { t: 3.2, from: 2.7, cx: 540, cy: 960, z: 1.0, r: 0 }];
kit.scene('scam', {
  init(kit) {
    kit.css('.sc-scr{position:absolute;left:166px;top:67px;width:290px;height:700px;transform:rotate(-15deg);color:color-mix(in srgb, var(--ground) 10%, #fff);font-size:22px;line-height:1.3}' +
      '.sc-b{position:absolute;left:14px;width:226px;background:color-mix(in srgb, var(--ground) 30%, #fff);color:var(--second);border-radius:18px 18px 18px 4px;padding:12px 16px}' +
      '.sc-code{position:absolute;left:14px;top:430px;display:flex;gap:7px} .sc-code span{width:34px;height:46px;border:2px solid color-mix(in srgb, var(--ground) 60%, transparent);border-radius:6px}' +
      '.sc-big{position:absolute;left:290px;top:820px;font-size:200px;border-width:14px;padding:10px 40px 0}');
    this.v = UI.build(kit,
      '<div class="words sc-hw" style="left:0;top:290px;width:1080px;align-items:center;gap:14px"><p class="sub">About this hack?</p><span class="tape sc-tape" style="font-size:80px;align-self:center">Asks for a code</span></div>' +
      '<div style="position:absolute;left:140px;top:640px;width:900px;height:1060px">' + UI.img(kit, 'phonehand.webp', '', 'left:0;top:0;width:900px') +
      '<div class="sc-scr"><div class="b7" style="position:absolute;left:14px;top:34px;display:flex;gap:10px;align-items:center"><span style="width:26px;height:26px;border-radius:50%;background:var(--accent)"></span><span>Exchange Support</span></div>' +
      '<div class="sc-b sc-b1" style="top:100px">Your account was hit by the hack.</div>' +
      '<div class="sc-b sc-b2" style="top:220px">Reply with the 6-digit code we just sent you to secure it.</div>' +
      '<div class="sc-code"><span></span><span></span><span></span><span></span><span></span><span></span></div></div></div>', 2000,
      '<div class="stamp sc-big">Scam</div>', 'soft');
    const q = this.v.q;
    this.hw = q('.sc-hw').style; this.tape = q('.sc-tape').style; this.b1 = q('.sc-b1').style; this.b2 = q('.sc-b2').style; this.code = q('.sc-code').style; this.big = q('.sc-big').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    this.hw.opacity = 1 - eo(seg(t, 0.55, 0.85)) + eo(seg(t, 2.85, 3.2));
    UI.slam(this.tape, t, -0.4, 0.22, -2, 1.5);
    const pop = (st, a) => { const p = seg(t, a, a + 0.3); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(24, 0, eo(p)) + 'px)'; };
    pop(this.b1, 1.0); pop(this.b2, 1.6); pop(this.code, 2.3);
    UI.slam(this.big, t, 3.45, 0.2, -10, 2.0); if (t >= 3.45) this.big.opacity = 0.95;
    const jolt = t > 3.6 ? Math.exp(-(t - 3.6) * 9) : 0;
    this.v.roll.transform = 'scale(' + (1 + 0.04 * jolt) + ')';
        UI.glitch(kit, t, 4.2, 54);
  },
});
