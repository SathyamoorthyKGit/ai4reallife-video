const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.6, r: -3 }, { t: 0.5, cx: 540, cy: 980, z: 1.0, r: 0, ease: kit.eox }, { t: 4.35, from: 0.55, cx: 540, cy: 990, z: 1.02, r: 1 }, { t: 4.71, from: 4.35, cx: 1700, cy: 1000, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('cyborg', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:100px;top:330px;width:660px;gap:6px"><p class="sub cy-k">Mode 1</p><span class="tape bl cy-t" style="font-size:96px">Cyborgs</span></div>' +
      UI.img(kit, 'cyborg.webp', 'cy-c', 'left:220px;top:620px;width:620px') +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px"><path class="pk-line cy-a" d="M300 600 C 420 520 640 520 760 600"/><g class="cy-h1">' + UI.arrowHead(760, 600, 35, 'pk-line') + '</g><path class="bl-line cy-b" d="M780 1420 C 640 1500 440 1500 300 1420" style="stroke-width:12"/><g class="cy-h2">' + UI.arrowHead(300, 1420, 205, 'bl-line') + '</g></svg>' +
      '<div class="words" style="left:120px;top:1470px;width:640px"><p class="sub wrapsub cy-s" style="font-size:38px">Solve problems side by side with AI</p></div>' +
      '<div class="words" style="left:520px;top:1560px"><span class="tag cy-g">In real time</span></div>',
      2000, UI.slot('Lakhani<br>photo', 790, 250, 220, 260, 'photo cy-ph'), 'spot', UI.ghost('Cyborg', -60, 1320));
    const q = this.v.q;
    this.ph = q('.cy-ph').style; this.k = q('.cy-k').style; this.t = q('.cy-t').style; this.c = q('.cy-c').style;
    this.a = UI.draw(q('.cy-a')); this.b = UI.draw(q('.cy-b')); this.h1 = q('.cy-h1').style; this.h2 = q('.cy-h2').style; this.s = q('.cy-s').style; this.g = q('.cy-g').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slotAnim(this.ph, t, -1, 999);
    this.k.opacity = eo(seg(t, 0.1, 0.3)); UI.slam(this.t, t, 0.33, 0.22, -2, 1.6);
    this.c.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 2.4)) + ')';
    const pa = eio(seg(t, 2.1, 2.7)), pb = eio(seg(t, 2.5, 3.1)); this.a(pa); this.b(pb); this.h1.opacity = pa > 0.95 ? 1 : 0; this.h2.opacity = pb > 0.95 ? 1 : 0;
    this.s.opacity = eo(seg(t, 1.35, 1.65)); this.s.transform = 'translateY(' + lerp(20, 0, eo(seg(t, 1.35, 1.65))) + 'px)';
    this.g.opacity = eo(seg(t, 3.7, 3.95)); this.g.transform = 'rotate(-3deg)';
    UI.punch(this.v.roll, t, [0.33, 3.7], 0.035);
  },
});
