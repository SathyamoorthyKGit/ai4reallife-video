const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.75, from: 0.35, cx: 540, cy: 975, z: 1.04, r: 1 }, { t: 3.15, from: 2.75, cx: 540, cy: 1880, z: 1.0, r: -1 }, { t: 6.45, from: 3.2, cx: 540, cy: 1890, z: 1.03, r: 0 }, { t: 6.8, from: 6.45, cx: 1800, cy: 1890, z: 1.05, r: 5, ease: kit.ei }];
const H = [70, 120, 200, 330, 540];
kit.scene('rule3', {
  init(kit) {
    const bars = H.map((h, i) => '<div class="bar r3-b" style="left:' + (190 + i * 150) + 'px;top:' + (2060 - h) + 'px;width:110px;height:' + h + 'px;background:' + (i === 4 ? 'var(--main)' : 'var(--second)') + ';transform-origin:50% 100%"></div>').join('');
    this.v = UI.build(kit,
      '<div class="num-b r3-n" style="left:130px;top:330px">3</div>' +
      '<div class="words" style="left:240px;top:342px"><p class="sub r3-k" style="font-size:52px">Listen to less</p></div>' +
      '<div class="words" style="left:0;top:430px;width:1080px;align-items:center"><h1 class="line r3-l" style="font-size:90px">Generic advice</h1></div>' +
      '<div class="r3-m" style="position:absolute;left:250px;top:590px;width:560px">' + UI.img(kit, 'megaphone.webp', '', 'left:0;top:0;width:560px') + '</div>' +
      '<svg class="art" viewBox="0 0 1080 1200" style="height:1200px"><path class="redline r3-x1" d="M300 620 L780 1070" style="stroke-width:22"/><path class="redline r3-x2" d="M780 620 L300 1070" style="stroke-width:22"/></svg>' +
      '<div class="words" style="left:0;top:1230px;width:1080px;align-items:center;gap:6px"><p class="sub r3-k2">Compound</p><h1 class="line r3-l2" style="font-size:110px">Non-obvious</h1></div>' +
      bars +
      '<svg class="art" viewBox="0 0 1080 2200" style="height:2200px"><path class="stroke" d="M160 2060 L960 2060" style="stroke-width:6"/></svg>' +
      '<div class="words" style="left:140px;top:2120px"><span class="tape pk r3-t" style="position:relative;font-size:52px;transform-origin:50% 50%">skills every year</span></div>',
      2400, '', 'soft', UI.ghost('Skills', -60, 1550));
    const q = this.v.q;
    this.n = q('.r3-n').style; this.k = q('.r3-k').style; this.L = UI.letters(q('.r3-l'), 671, 1.9, 0.4);
    this.m = q('.r3-m').style; this.x1 = UI.draw(q('.r3-x1')); this.x2 = UI.draw(q('.r3-x2'));
    this.k2 = q('.r3-k2').style; this.L2 = UI.letters(q('.r3-l2'), 672, 4.1, 0.4);
    this.b = [...kit.stage.querySelectorAll('.r3-b')].map(e => e.style); this.t = q('.r3-t').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.n, t, 0.27, 0.2, 0, 1.8); this.k.opacity = eo(seg(t, 1.1, 1.4)); UI.reveal(this.L, t);
    const mp = seg(t, 1.1, 1.45), buzz = t > 1.45 && t < 2.4 ? Math.sin(t * 60) * 3 : 0;
    this.m.opacity = mp > 0 ? 1 : 0; this.m.transform = 'translate(' + buzz + 'px,' + lerp(300, 0, eob(mp, 1.2)) + 'px) rotate(-4deg)';
    this.x1(eio(seg(t, 2.3, 2.5))); this.x2(eio(seg(t, 2.45, 2.65)));
    this.k2.opacity = eo(seg(t, 2.85, 3.15)); UI.reveal(this.L2, t);
    // the bars compound, year on year
    this.b.forEach((st, i) => { const p = seg(t, 3.4 + i * 0.35, 3.75 + i * 0.35); st.opacity = p > 0 ? 1 : 0; st.transform = 'scaleY(' + eob(p, 1.3) + ')'; });
    UI.slam(this.t, t, 5.2, 0.22, -2, 1.5);
    UI.punch(this.v.roll, t, [0.27, 2.3, 5.2], 0.04);
  },
});
