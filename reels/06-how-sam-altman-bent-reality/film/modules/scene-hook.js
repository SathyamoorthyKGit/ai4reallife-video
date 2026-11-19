const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 is already mid-swing: the stamp is coming down on the share certificate
const KEYS = [{ t: 0, cx: 560, cy: 860, z: 1.32, r: -3 }, { t: 0.34, from: 0.22, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox }, { t: 0.9, from: 0.4, cx: 540, cy: 960, z: 1.02, r: 1 }, { t: 1.5, from: 0.95, cx: 540, cy: 1580, z: 1.0, r: -1 }, { t: 2.0, from: 1.6, cx: 540, cy: 2500, z: 1.0, r: 0 }, { t: 3.2, from: 2.05, cx: 540, cy: 2510, z: 1.05, r: -1 }, { t: 3.55, from: 3.2, cx: 540, cy: 3500, z: 1.05, r: 3, ease: kit.ei }];
const SX = [330, 378, 426, 474, 522, 570, 618, 666, 714];
kit.scene('hook', {
  init(kit) {
    const cert = kit.assets.url('cert.webp');
    const strips = SX.map((x, i) => '<div class="strip hk-sp" style="left:' + x + 'px;top:1900px;width:42px;height:300px;overflow:hidden"><img src="' + cert + '" style="position:absolute;left:-' + (270 + i * 48) + 'px;top:-' + (120 + (i % 3) * 90) + 'px;width:960px;height:710px;max-width:none"></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:400px;width:1080px;align-items:center"><p class="sub hk-k" style="font-size:44px">Sam Altman owns</p></div>' +
      '<div style="position:absolute;left:0;top:0;width:1080px;height:1470px;overflow:hidden">' +
        '<div class="hk-doc" style="position:absolute;left:60px;top:640px;width:960px;height:710px">' + UI.img(kit, 'cert.webp', '', 'left:0;top:0;width:960px') +
          '<div class="hk-pt" style="position:absolute;left:230px;top:-120px;width:500px;transform-origin:50% 100%">' + UI.img(kit, 'altman.webp', '', 'left:0;top:0;width:500px') + '</div>' +
          '<div class="stamp hk-z" style="left:270px;top:250px;font-size:210px;border-width:14px;transform-origin:50% 50%">0%</div>' +
        '</div></div>' +
      strips +
      UI.img(kit, 'shredder.webp', 'hk-sh', 'left:290px;top:1420px;width:500px') +
      '<div class="hk-h" style="position:absolute;left:420px;top:620px;width:500px;transform-origin:95% 5%">' + UI.img(kit, 'stamp.webp', '', 'left:0;top:0;width:500px') + '</div>' +
      UI.img(kit, 'pocket.webp', 'hk-pk', 'left:90px;top:2150px;width:520px') +
      '<h1 class="line pink hk-big" style="position:absolute;left:610px;top:2270px;font-size:250px;margin:0;transform-origin:50% 50%">0%</h1>' +
      '<div class="words" style="left:150px;top:2700px"><span class="tape hk-tp" style="position:relative;font-size:92px;transform-origin:50% 50%">Equity</span></div>',
      3600, UI.slot('OpenAI', 290, 420, 500, 140, 'hk-sl'), 'spot', UI.ghost('Zero', -60, 1700, 460));
    const q = this.v.q;
    this.k = q('.hk-k').style; this.doc = q('.hk-doc').style; this.pt = q('.hk-pt').style; this.z = q('.hk-z').style;
    this.h = q('.hk-h').style; this.sp = [...kit.stage.querySelectorAll('.hk-sp')].map(e => e.style);
    this.pk = q('.hk-pk').style; this.big = q('.hk-big').style; this.tp = q('.hk-tp').style; this.sl = q('.hk-sl').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    this.k.opacity = 1 - eo(seg(t, 0.85, 1.1));
    // the stamp swings down, hits at 0.25, lifts away
    const lift = eo(seg(t, 0.32, 0.75)), rot = lerp(-30, 0, ei(seg(t, -0.15, 0.25)));
    this.h.opacity = 1 - seg(t, 0.62, 0.75);
    this.h.transform = 'translate(' + lift * 180 + 'px,' + (-lift * 760) + 'px) rotate(' + (rot - lift * 18) + 'deg)';
    UI.slam(this.z, t, 0.25, 0.12, -8, 1.25);
    // the portrait slips off the certificate before it goes into the shredder
    const off = eio(seg(t, 0.8, 1.15));
    this.pt.opacity = 1 - seg(t, 1.0, 1.15);
    this.pt.transform = 'translate(' + (-520 * off) + 'px,' + (-560 * off) + 'px) rotate(' + (-25 * off + Math.sin(t * 2) * 0.6) + 'deg)';
    const dn = ei(seg(t, 0.95, 1.6)), sh = t > 0.95 && t < 1.6 ? Math.sin(t * 90) * 4 : 0;
    this.doc.transform = 'translate(' + sh + 'px,' + (840 * dn) + 'px)'; this.doc.opacity = dn >= 1 ? 0 : 1;
    this.sp.forEach((st, i) => {
      const p = seg(t, 1.1 + i * 0.04, 1.75 + i * 0.04);
      st.opacity = p > 0 ? 1 - seg(t, 2.3, 2.6) : 0;
      st.transform = 'translateY(' + lerp(-260, 420 + (i % 3) * 60, ei(p)) + 'px) rotate(' + ((i % 2 ? 1 : -1) * 14 * p) + 'deg)';
    });
    const pp = seg(t, 1.75, 2.1); this.pk.opacity = pp > 0 ? 1 : 0; this.pk.transform = 'translateY(' + lerp(400, 0, eob(pp, 1.2)) + 'px) rotate(-3deg)';
    UI.slam(this.big, t, 1.9, 0.2, -4, 1.6);
    UI.slam(this.tp, t, 2.1, 0.2, -3, 1.5);
    UI.slotAnim(this.sl, t, 2.45, 3.25);
    UI.punch(this.v.roll, t, [0.25, 1.9, 2.1], 0.05);
  },
});
