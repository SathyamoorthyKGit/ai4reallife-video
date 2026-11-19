const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 1.65, cx: 540, cy: 960, z: 1.0, r: 0 }, { t: 2.1, from: 1.65, cx: 540, cy: 1700, z: 1.0, r: -1 }, { t: 5.6, from: 2.15, cx: 540, cy: 1700, z: 1.04, r: 0 }, { t: 6.0, from: 5.6, cx: 540, cy: 1720, z: 1.02, r: 1 }, { t: 8.1, from: 6.0, cx: 540, cy: 1720, z: 1.05, r: 0 }, { t: 8.44, from: 8.1, cx: 540, cy: 1800, z: 2.4, r: 0, ease: kit.ei }];
kit.scene('loss', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:650px;width:1080px;align-items:center"><p class="sub ls-k0">Now</p></div>' +
      '<div class="words" style="left:0;top:1140px;width:1080px;align-items:center;gap:8px"><p class="sub ls-k" style="font-size:38px">Reported net loss · H1 2026</p><h1 class="num pink ls-n" style="font-size:200px">0</h1></div>' +
      '<div class="tear" style="left:-40px;top:1600px;width:1160px;transform:rotate(-2deg)"></div>' +
      '<div class="words" style="left:0;top:1720px;width:1080px;align-items:center;gap:6px"><p class="sub ls-k2" style="font-size:38px">Of that, accounting</p><h1 class="num bluet ls-n2" style="font-size:150px">0</h1></div>' +
      '<div class="words ls-w" style="left:230px;top:1950px;width:620px;align-items:center"><p class="sub wrapsub ls-k3" style="font-size:34px;text-align:center">non-cash · notes revalued as its valuation rose</p></div>' +
      UI.img(kit, 'adder.webp', 'ls-ad', 'left:330px;top:2060px;width:420px'),
      2600, UI.slot('Anthropic', 240, 330, 600, 260, 'ls-slot'), 'window', UI.ghost('Loss', -60, 1300));
    const q = this.v.q;
    this.slot = q('.ls-slot').style; this.k0 = q('.ls-k0').style; 
    this.k = q('.ls-k').style; this.n = q('.ls-n'); this.k2 = q('.ls-k2').style; this.n2 = q('.ls-n2'); this.k3 = q('.ls-k3').style; this.ad = q('.ls-ad').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slotAnim(this.slot, t, 0.25, 1.6);
    this.k0.opacity = eo(seg(t, 0.25, 0.5)) * (1 - eo(seg(t, 1.6, 1.8)));
    this.k.opacity = eo(seg(t, 1.9, 2.15));
    const c = eo(seg(t, 2.0, 4.6));
    this.n.textContent = '−$' + (80.7 * c).toFixed(1) + 'B'; this.n.style.opacity = t >= 1.95 ? 1 : 0;
    this.n.style.transform = 'scale(' + lerp(1.1, 1, eob(seg(t, 4.55, 4.85), 1.6)) + ')';
    this.k2.opacity = eo(seg(t, 5.8, 6.05));
    const c2 = eo(seg(t, 5.95, 7.4));
    this.n2.textContent = '~$' + (72.4 * c2).toFixed(1) + 'B'; this.n2.style.opacity = t >= 5.9 ? 1 : 0;
    this.n2.style.transform = 'scale(' + lerp(1.1, 1, eob(seg(t, 7.35, 7.65), 1.6)) + ')';
    this.k3.opacity = eo(seg(t, 7.4, 7.7));
    this.ad.opacity = t >= 6.0 ? 1 : 0; this.ad.transform = 'translateY(' + lerp(300, 0, eob(seg(t, 6.0, 6.5), 1.2)) + 'px) rotate(-3deg)';
    UI.punch(this.v.roll, t, [4.6, 7.4], 0.045);
  },
});
