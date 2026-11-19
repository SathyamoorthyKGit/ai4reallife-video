const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -600, cy: 980, z: 1.05, r: -5 }, { t: 0.35, cx: 540, cy: 980, z: 1.0, r: 0, ease: kit.eox }, { t: 5.25, from: 0.4, cx: 540, cy: 990, z: 1.02, r: -1 }, { t: 5.62, from: 5.25, cx: 540, cy: 2700, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('centaur', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:100px;top:330px;width:660px;gap:6px"><p class="sub ce-k">Mode 2</p><span class="tape pk ce-t" style="font-size:96px">Centaurs</span></div>' +
      UI.img(kit, 'centaur.webp', 'ce-c', 'left:150px;top:560px;width:760px') +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px"><path class="pk-line ce-ln" d="M700 560 L700 1470" style="stroke-dasharray:22 18;stroke-width:9"/></svg>' +
      '<div class="words" style="left:730px;top:620px"><span class="node ce-h" style="background:var(--accent)">Human</span></div>' +
      '<div class="words" style="left:250px;top:960px"><span class="node ce-a">AI</span></div>' +
      '<div class="words" style="left:120px;top:1490px;width:620px;gap:6px"><p class="sub wrapsub ce-s" style="font-size:38px">Divide tasks cleanly</p><p class="sub wrapsub ce-s2" style="font-size:32px">Humans do what they do best; the rest is delegated</p></div>',
      2000, UI.slot('Lakhani<br>photo', 790, 250, 220, 260, 'photo ce-ph'), 'window', UI.ghost('Centaur', -60, 1330));
    const q = this.v.q;
    this.ph = q('.ce-ph').style; this.k = q('.ce-k').style; this.t = q('.ce-t').style; this.c = q('.ce-c').style; this.ln = UI.draw(q('.ce-ln'));
    this.h = q('.ce-h').style; this.a = q('.ce-a').style; this.s = q('.ce-s').style; this.s2 = q('.ce-s2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slotAnim(this.ph, t, -1, 999);
    this.k.opacity = eo(seg(t, 0.05, 0.25)); UI.slam(this.t, t, 0.3, 0.22, 2, 1.6);
    this.c.opacity = t >= 0.2 ? 1 : 0; this.c.transform = 'translateX(' + lerp(-300, 0, eob(seg(t, 0.2, 0.75), 1.1)) + 'px)';
    this.ln(eio(seg(t, 1.0, 1.6))); this.s.opacity = eo(seg(t, 1.05, 1.35));
    const pop = (st, a) => { const p = seg(t, a, a + 0.25); st.opacity = p > 0 ? 1 : 0; st.transform = 'scale(' + lerp(1.5, 1, eob(p, 1.6)) + ')'; };
    pop(this.h, 2.85); pop(this.a, 4.35); this.s2.opacity = eo(seg(t, 2.9, 3.2));
    UI.punch(this.v.roll, t, [0.3, 2.85, 4.35], 0.03);
  },
});
