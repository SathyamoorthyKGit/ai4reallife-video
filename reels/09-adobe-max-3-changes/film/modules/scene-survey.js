const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 9.2, from: 0.4, cx: 540, cy: 975, z: 1.03, r: -1 }, { t: 9.55, from: 9.2, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 13.55, from: 9.6, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 13.9, from: 13.55, cx: 540, cy: 2960, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('survey', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:8px"><span class="stamp solid sv-c" style="position:relative;font-size:64px;transform-origin:50% 50%">The catch</span><p class="sub sv-k" style="font-size:34px">Adobe survey · 2,000 US creators</p></div>' +
      UI.anim(kit, 'dart', 'sv-d', 'left:90px;top:620px', 440) +
      '<div class="sv-n" style="position:absolute;left:540px;top:650px;font-family:\'Allenoire-400\';font-size:190px;line-height:.9;color:var(--main)">0%</div>' +
      '<div class="words" style="left:540px;top:880px;width:420px"><p class="sub wrapsub sv-k2" style="font-size:34px;white-space:normal">of AI-using creators settle for results that miss their vision</p></div>' +
      // the human makes the final call
      '<div class="sv-n2" style="position:absolute;left:90px;top:1600px;font-family:\'Allenoire-400\';font-size:190px;line-height:.9;color:var(--accent)">0%</div>' +
      '<div class="words" style="left:90px;top:1840px;width:480px"><p class="sub wrapsub sv-k3" style="font-size:34px;white-space:normal">say the final call should stay with a human</p></div>' +
      UI.anim(kit, 'gavel', 'sv-g', 'left:580px;top:1560px', 420),
      2400, '', 'spot', UI.ghost('Catch', -60, 1240, 460));
    const q = this.v.q;
    this.c = q('.sv-c').style; this.k = q('.sv-k').style; this.d = q('.sv-d').style; this.nEl = q('.sv-n'); this.k2 = q('.sv-k2').style;
    this.nEl2 = q('.sv-n2'); this.k3 = q('.sv-k3').style; this.g = q('.sv-g').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.c, t, 0.37, 0.22, -3, 1.7); this.k.opacity = eo(seg(t, 1.2, 1.5));
    // 68: the dart lands just off the bullseye
    const dp = seg(t, 3.9, 4.25); this.d.opacity = t >= 3.5 ? 1 : 0; UI.frame(this.d, t);
    this.d.transform = 'scale(' + lerp(0.6, 1, eob(seg(t, 3.5, 3.85), 1.4)) + ') rotate(' + (dp > 0 ? Math.sin((t - 3.9) * 30) * 3 * Math.exp(-(t - 3.9) * 5) : 0) + 'deg)';
    const n1 = eo(seg(t, 4.5, 5.3)); this.nEl.style.opacity = t >= 4.5 ? 1 : 0; this.nEl.textContent = Math.round(68 * n1) + '%';
    this.k2.opacity = eo(seg(t, 5.7, 6.0));
    // 77: the gavel comes down
    const n2 = eo(seg(t, 9.6, 10.4)); this.nEl2.style.opacity = t >= 9.6 ? 1 : 0; this.nEl2.textContent = Math.round(77 * n2) + '%';
    this.k3.opacity = eo(seg(t, 10.6, 10.9));
    const gp = seg(t, 11.9, 12.2), hit = t > 12.7 ? Math.exp(-(t - 12.7) * 8) : 0; this.g.opacity = gp > 0 ? 1 : 0; UI.frame(this.g, t);
    this.g.transform = 'translateY(' + (lerp(-300, 0, eob(gp, 1.2)) + hit * 14) + 'px) rotate(' + (lerp(-20, 0, eo(seg(t, 12.3, 12.7)))) + 'deg)';
    UI.punch(this.v.roll, t, [0.37, 4.5, 9.6, 12.7], 0.04);
  },
});
