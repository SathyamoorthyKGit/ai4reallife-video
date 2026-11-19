const { seg, eo, ei, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 260, z: 1.1, r: -3 }, { t: 0.45, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.95, from: 0.5, cx: 540, cy: 960, z: 1.06, r: -1 }, { t: 3.4, from: 2.95, cx: 540, cy: 2040, z: 1.0, r: 1 }, { t: 6.72, from: 3.45, cx: 540, cy: 2040, z: 1.03, r: 0 }, { t: 7.06, from: 6.72, cx: 1700, cy: 2040, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('count', {
  init(kit) {
    let cells = '';
    for (let i = 0; i < 100; i++) cells += '<div class="cell ct-c" style="left:' + (204 + (i % 10) * 68) + 'px;top:' + (1775 + Math.floor(i / 10) * 68) + 'px"></div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:8px"><p class="sub ct-k">China alone installed</p><h1 class="num ct-n" style="font-size:190px">0</h1><p class="sub ct-k2">industrial robots in 2025</p></div>' +
      UI.img(kit, 'china.webp', 'ct-map', 'left:170px;top:640px;width:740px') +
      UI.img(kit, 'flag-cn.webp', 'ct-flag', 'left:700px;top:1120px;width:190px') +
      UI.img(kit, 'robot1.webp', 'ct-rb', 'left:90px;top:1150px;width:280px') +
      '<div class="words" style="left:0;top:1380px;width:1080px;align-items:center;gap:6px"><h1 class="num pink ct-p" style="font-size:330px">59%</h1><p class="sub ct-k3">of all new factory robots</p></div>' +
      cells +
      '<div class="words" style="left:0;top:2470px;width:1080px;align-items:center"><p class="sub ct-k4">worldwide · 2025</p></div>',
      2700, '', 'soft', UI.ghost('China', -60, 760) + UI.ghost('59%', 80, 2200));
    const q = this.v.q;
    this.k = q('.ct-k').style; this.k2 = q('.ct-k2').style; this.n = q('.ct-n'); this.map = q('.ct-map').style; this.flag = q('.ct-flag').style; this.rb = q('.ct-rb').style;
    this.p = q('.ct-p').style; this.k3 = q('.ct-k3').style; this.k4 = q('.ct-k4').style;
    this.cells = [...kit.stage.querySelectorAll('.ct-c')];
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.1, 0.4));
    const c = eo(seg(t, 0.3, 2.3));
    this.n.textContent = UI.num(354000 * c);
    this.n.style.transform = 'scale(' + lerp(1.1, 1, eob(seg(t, 2.25, 2.55), 1.6)) + ')';
    this.k2.opacity = eo(seg(t, 2.2, 2.5));
    this.map.opacity = t >= 0.25 ? 1 : 0; this.map.transform = 'translateY(' + lerp(220, 0, eob(seg(t, 0.25, 0.85), 1.2)) + 'px) rotate(' + lerp(-6, -1, eo(seg(t, 0.25, 0.85))) + 'deg)';
    UI.slam(this.flag, t, 0.9, 0.22, 8, 1.7);
    this.rb.opacity = t >= 1.5 ? 1 : 0; this.rb.transform = 'translate(' + lerp(-400, 0, eob(seg(t, 1.5, 1.95), 1.2)) + 'px,0) rotate(-6deg)';
    UI.slam(this.p, t, 3.4, 0.24, -3, 1.8);
    this.k3.opacity = eo(seg(t, 3.75, 4.05));
    this.cells.forEach((el, i) => {
      const a = 3.6 + (i < 59 ? i * 0.026 : 1.55 + (i - 59) * 0.004), p = seg(t, a, a + 0.18);
      el.style.opacity = p > 0 ? 1 : 0; el.style.transform = 'scale(' + lerp(0.2, 1, eob(p, 1.8)) + ')';
      el.classList.toggle('on', i < 59 && p > 0.4);
    });
    this.k4.opacity = eo(seg(t, 5.3, 5.6));
    UI.punch(this.v.roll, t, [2.3, 3.45], 0.04);
    UI.glitch(kit, t, 0, 61);
  },
});
