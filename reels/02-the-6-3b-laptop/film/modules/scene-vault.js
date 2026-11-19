const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.04, r: 1.5 }, { t: 1.8, from: 0.2, cx: 540, cy: 960, z: 1.0, r: 0 }, { t: 3.95, cx: 540, cy: 960, z: 1.0 }, { t: 4.3, from: 3.95, cx: 540, cy: 1150, z: 2.6, ease: kit.ei }];
kit.scene('vault', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:0"><p class="sub vt-sub" style="margin-bottom:10px">Most people picture</p><h1 class="line vt-l1" style="font-size:115px">Crack</h1><h1 class="line vt-l2" style="font-size:115px">the vault?</h1></div>' +
      UI.img(kit, 'vault.webp', '', 'left:190px;top:760px;width:700px') +
      '<div class="vt-lock" style="position:absolute;left:370px;top:880px;width:340px;transform-origin:50% 30%">' + UI.img(kit, 'padlock.webp', '', 'left:0;top:0;width:340px') + '</div>' +
      '<div class="vt-broken" style="position:absolute;left:340px;top:900px;width:390px">' + UI.img(kit, 'brokenlock.webp', '', 'left:0;top:0;width:390px') + '</div>' +
      '<div class="vt-key" style="position:absolute;left:460px;top:1060px;width:150px">' + UI.img(kit, 'key.webp', '', 'left:0;top:0;width:150px') + '</div>', 2000, '', 'spot');
    const q = this.v.q;
    this.sub = q('.vt-sub').style; this.lock = q('.vt-lock').style; this.broken = q('.vt-broken').style; this.key = q('.vt-key').style;
    this.L = UI.letters(q('.vt-l1'), 5, 0.45, 0.35).concat(UI.letters(q('.vt-l2'), 6, 0.8, 0.45));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    const hit = t >= 2.3, jolt = hit ? Math.exp(-(t - 2.3) * 9) : 0;
    this.v.roll.transform = 'scale(' + (1 + 0.05 * jolt) + ') rotate(' + (Math.sin((t - 2.3) * 40) * 1.2 * jolt) + 'deg)';
    this.sub.opacity = eo(seg(t, -0.1, 0.25));
    UI.reveal(this.L, t);
    const sh = t > 1.85 && t < 2.3 ? Math.sin(t * 60) * 3 * seg(t, 1.85, 2.3) : 0;
    this.lock.opacity = hit ? 0 : 1; this.lock.transform = 'rotate(' + sh + 'deg)';
    this.broken.opacity = hit ? 1 : 0; this.broken.transform = 'scale(' + lerp(1.15, 1, eob(seg(t, 2.3, 2.55), 1.6)) + ')';
    const kp = seg(t, 3.0, 3.8);
    this.key.opacity = t >= 3.0 ? 1 : 0;
    this.key.transform = 'translate(' + lerp(0, 760, ei(kp)) + 'px,' + (lerp(0, -900, kp) + Math.sin(kp * Math.PI) * -160) + 'px) rotate(' + lerp(0, 420, kp) + 'deg)';
    UI.glitch(kit, t, 0, 45);
  },
});
