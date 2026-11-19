const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 1020, z: 2.4 }, { t: 0.6, cx: 540, cy: 960, z: 1.0, ease: kit.eox }, { t: 3.35, cx: 540, cy: 960, z: 1.0 }, { t: 3.7, from: 3.35, cx: 1500, cy: 960, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('nokeys', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:280px;width:1080px;align-items:center;gap:0"><p class="sub nk-sub" style="margin-bottom:10px">Binance says it found</p><h1 class="line nk-line" style="font-size:100px">No evidence</h1></div>' +
      '<div class="nk-lock" style="position:absolute;left:340px;top:700px;width:400px">' + UI.img(kit, 'padlock.webp', '', 'left:0;top:0;width:400px') + '</div>' +
      '<div class="stamp nk-stamp" style="left:210px;top:1180px;font-size:64px">No keys leaked</div>', 2000,
      '<div class="nk-mag" style="position:absolute;left:0;top:0">' + UI.img(kit, 'magnifier.webp', '', 'left:0;top:0;width:440px') + '</div>', 'spot', '<div class="ghost" style="left:-60px;top:1450px">Locked</div>');
    const q = this.v.q;
    this.sub = q('.nk-sub').style; this.lock = q('.nk-lock').style; this.stamp = q('.nk-stamp').style; this.mag = q('.nk-mag').style;
    this.L = UI.letters(q('.nk-line'), 8, 1.25, 0.4);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    this.sub.opacity = eo(seg(t, 0.05, 0.35));
    UI.reveal(this.L, t);
    const lp = seg(t, -0.05, 0.3);
    this.lock.transform = 'none';
    const jolt = t > 0.3 ? Math.exp(-(t - 0.3) * 9) : 0;
    this.v.roll.transform = 'scale(' + (1 + 0.04 * jolt) + ')';
    const mp = eio(seg(t, 0.4, 2.6));
    this.mag.opacity = t >= 0.4 && t < 2.8 ? 1 : 0;
    this.mag.transform = 'translate(' + lerp(1100, 380, mp) + 'px,' + (lerp(1300, 760, mp) + Math.sin(mp * 6) * 40) + 'px) rotate(' + lerp(30, -15, mp) + 'deg)';
    UI.slam(this.stamp, t, 2.85, 0.2, -8, 1.8); if (t >= 2.85) this.stamp.opacity = 0.92;
  },
});
