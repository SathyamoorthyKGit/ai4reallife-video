const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -600, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.6, from: 0.4, cx: 530, cy: 980, z: 1.03, r: -1 }, { t: 3.95, from: 3.7, cx: 530, cy: 1010, z: 1.05, r: 1 }, { t: 7.3, from: 4.0, cx: 540, cy: 1000, z: 1.02, r: 0 }, { t: 7.67, from: 7.3, cx: 540, cy: 1010, z: 2.4, r: 0, ease: kit.ei }];
kit.scene('selfauto', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:100px;top:340px;width:660px;gap:6px"><p class="sub sa-k">Mode 3</p><span class="tape pk sa-t" style="font-size:60px">Self-automators</span></div>' +
      UI.img(kit, 'automan.webp', 'sa-m', 'left:80px;top:640px;width:600px') +
      '<div class="sa-tg" style="position:absolute;left:720px;top:600px;width:220px;height:286px;transform-origin:50% 50%">' + UI.img(kit, 'toggle.webp', '', 'left:0;top:0;width:220px') + '</div>' +
      UI.img(kit, 'brain.webp', 'sa-b', 'left:680px;top:920px;width:300px') +
      '<div class="ring sa-r" style="left:300px;top:1180px;width:60px;height:60px;margin:-30px 0 0 -30px"></div>' +
      '<div class="words" style="left:100px;top:1330px;width:600px"><p class="sub wrapsub sa-s" style="font-size:38px">A dangerous trap</p></div>' +
      '<div class="stamp solid sa-x" style="left:250px;top:1430px;font-size:88px;transform-origin:50% 50%">Accept all</div>',
      2000, UI.slot('Lakhani<br>photo', 790, 250, 220, 260, 'photo sa-ph'), 'window', UI.ghost('Autopilot', -60, 1560, 300));
    const q = this.v.q;
    this.ph = q('.sa-ph').style; this.k = q('.sa-k').style; this.t = q('.sa-t').style; this.m = q('.sa-m').style; this.tg = q('.sa-tg').style; this.b = q('.sa-b').style;
    this.r = q('.sa-r').style; this.s = q('.sa-s').style; this.x = q('.sa-x').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slotAnim(this.ph, t, -1, 7.3);
    this.k.opacity = eo(seg(t, 0.05, 0.25)); UI.slam(this.t, t, 0.42, 0.22, -2, 1.6);
    this.m.opacity = t >= 0.3 ? 1 : 0; this.m.transform = 'translateY(' + (lerp(240, 0, eob(seg(t, 0.3, 0.8), 1.2)) + (t > 3.75 ? 8 * Math.exp(-(t - 3.75) * 8) : 0)) + 'px)';
    this.s.opacity = eo(seg(t, 2.1, 2.4));
    const rp = seg(t, 3.75, 4.35); this.r.opacity = rp > 0 && rp < 1 ? 1 - rp : 0; this.r.transform = 'scale(' + (1 + rp * 4) + ')';
    // the switch flips to OFF and the brain goes dark
    const fl = eob(seg(t, 4.6, 4.8), 1.5); this.tg.opacity = t >= 0.9 ? 1 : 0; this.tg.transform = 'scaleY(' + lerp(1, -1, fl) + ') rotate(' + (6 * (1 - seg(t, 0.9, 1.3))) + 'deg)';
    const dk = eo(seg(t, 4.8, 5.4)); this.b.opacity = t >= 1.2 ? lerp(1, 0.4, dk) : 0; this.b.filter = 'drop-shadow(20px 28px 16px rgba(0,0,0,.3)) brightness(' + lerp(1, 0.45, dk) + ')';
    this.b.transform = 'translateY(' + lerp(200, 0, eob(seg(t, 1.2, 1.6), 1.3)) + 'px)';
    UI.slam(this.x, t, 5.95, 0.24, -6, 1.9);
    UI.punch(this.v.roll, t, [0.42, 3.75, 4.65, 5.95], 0.035);
  },
});
