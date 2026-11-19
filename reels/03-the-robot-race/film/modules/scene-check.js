const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -700, z: 1.05, r: -3 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.9, from: 0.45, cx: 540, cy: 970, z: 1.08, r: 1 }, { t: 4.23, from: 3.9, cx: 540, cy: 960, z: 1.8, r: -6, ease: kit.ei }];
kit.scene('check', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub ck-k" style="font-size:38px">Before you blame the robots</p><h1 class="line ck-l1" style="font-size:104px">Check what</h1><h1 class="line ck-l2" style="font-size:104px">else happened</h1></div>' +
      UI.img(kit, 'calendar.webp', 'ck-cal', 'left:270px;top:740px;width:540px') +
      '<div class="ck-mg" style="position:absolute;left:0;top:0;width:260px">' + UI.img(kit, 'magnifier.webp', '', 'left:0;top:0;width:260px') + '</div>' +
      '<div class="qm ck-q" style="left:110px;top:860px">?</div><div class="qm ck-q" style="left:820px;top:780px;width:120px;height:120px;font-size:88px">?</div><div class="qm ck-q" style="left:690px;top:1240px">?</div>' +
      '<div class="words" style="left:130px;top:1300px"><span class="tag ck-g" style="font-size:44px">Tariffs</span></div>',
      2000, '', 'window', UI.ghost('Check', -60, 1520));
    const q = this.v.q;
    this.k = q('.ck-k').style;
    this.L = UI.letters(q('.ck-l1'), 101, 0.3, 0.35).concat(UI.letters(q('.ck-l2'), 102, 0.55, 0.4));
    this.cal = q('.ck-cal').style; this.mg = q('.ck-mg').style; this.g = q('.ck-g').style;
    this.qs = [...kit.stage.querySelectorAll('.ck-q')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.15, 0.4)); UI.reveal(this.L, t);
    this.cal.opacity = t >= 0.5 ? 1 : 0; this.cal.transform = 'translateY(' + lerp(260, 0, eob(seg(t, 0.5, 1.0), 1.2)) + 'px) rotate(' + lerp(8, -2, eo(seg(t, 0.5, 1.0))) + 'deg)';
    const a = seg(t, 1.0, 3.8) * Math.PI * 2;
    this.mg.opacity = t >= 1.0 ? 1 : 0;
    this.mg.transform = 'translate(' + (420 + Math.cos(a) * 170) + 'px,' + (820 + Math.sin(a) * 90) + 'px) rotate(' + (-18 + Math.sin(a) * 8) + 'deg)';
    this.qs.forEach((st, i) => UI.slam(st, t, 1.5 + i * 0.4, 0.22, [-10, 8, -6][i], 1.9));
    this.g.opacity = eo(seg(t, 2.8, 3.05)); this.g.transform = 'rotate(-4deg)';
    UI.punch(this.v.roll, t, [1.5, 1.9, 2.3], 0.03);
  },
});
