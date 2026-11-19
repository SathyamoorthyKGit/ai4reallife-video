const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 820, z: 1.04, r: -1 }, { t: 1.0, from: 0.1, cx: 540, cy: 820, z: 1.0, r: 0 }, { t: 3.0, from: 2.45, cx: 540, cy: 1640, z: 1.0, r: 2 }, { t: 5.55, cx: 540, cy: 1640, z: 1.0, r: 2 }, { t: 5.9, from: 5.55, cx: 1500, cy: 1640, z: 1.05, r: 4, ease: kit.ei }];
kit.scene('fixes', {
  init(kit) {
    kit.css('.fx-gold{background:var(--accent);color:color-mix(in srgb, var(--ground) 10%, #fff)}');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:270px;width:1080px;align-items:center;gap:14px"><p class="sub fx-k">Put on both</p><span class="tape fx-t1" style="font-size:96px;align-self:center">Hardware key</span><span class="tape fx-gold fx-t2" style="font-size:96px;align-self:center">or passkey</span></div>' +
      UI.img(kit, 'seckey.webp', 'fx-key', 'left:160px;top:720px;width:300px') +
      UI.img(kit, 'phonehand.webp', 'fx-ph', 'left:560px;top:640px;width:340px') +
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center;gap:14px"><span class="tape fx-t3" style="font-size:100px;align-self:center">Withdrawal</span><span class="tape fx-gold fx-t4" style="font-size:100px;align-self:center">allowlist</span></div>' +
      '<div class="words" style="left:120px;top:1660px;width:440px"><p class="sub wrapsub fx-k2" style="font-size:36px">If your exchange offers one</p></div>' +
      UI.img(kit, 'clipboard.webp', 'fx-clip', 'left:600px;top:1620px;width:300px'), 2300, '', 'spot');
    const q = this.v.q;
    this.k = q('.fx-k').style; this.k2 = q('.fx-k2').style;
    this.t = [1, 2, 3, 4].map(i => q('.fx-t' + i).style);
    this.key = q('.fx-key').style; this.ph = q('.fx-ph').style; this.clip = q('.fx-clip').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    this.k.opacity = eo(seg(t, -0.1, 0.2));
    UI.slam(this.t[0], t, 0.55, 0.22, -2, 1.6); UI.slam(this.t[1], t, 1.5, 0.22, 2, 1.6);
    UI.slam(this.t[2], t, 3.1, 0.22, -2, 1.6); UI.slam(this.t[3], t, 3.55, 0.22, 2, 1.6);
    const pop = (st, a, r) => { const p = seg(t, a, a + 0.4); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(140, 0, eob(p, 1.4)) + 'px) rotate(' + (r + Math.sin(t * 1.4) * 2) + 'deg)'; };
    pop(this.key, 0.7, -12); pop(this.ph, 1.65, 8); pop(this.clip, 3.75, 5);
    this.k2.opacity = eo(seg(t, 4.3, 4.6));
    UI.punch(this.v.roll, t, [0.55, 1.5, 3.1, 3.55], 0.04);
    UI.glitch(kit, t, 0, 52);
  },
});
