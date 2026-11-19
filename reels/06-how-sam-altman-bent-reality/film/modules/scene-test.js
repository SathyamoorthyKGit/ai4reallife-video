const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.35, from: 0.4, cx: 540, cy: 975, z: 1.04, r: -1 }, { t: 2.7, from: 2.35, cx: 540, cy: 1900, z: 1.0, r: 1 }, { t: 5.2, from: 2.75, cx: 540, cy: 1910, z: 1.05, r: 0 }, { t: 5.6, from: 5.2, cx: 540, cy: 2860, z: 1.0, r: -1 }, { t: 7.7, from: 5.65, cx: 540, cy: 2870, z: 1.05, r: 0 }];
const KEEP = 12;
kit.scene('test', {
  init(kit) {
    let cells = '';
    for (let i = 0; i < 20; i++) cells += '<div class="cell ts-c" style="left:' + (270 + (i % 5) * 120) + 'px;top:' + (1660 + Math.floor(i / 5) * 105) + 'px;width:66px;height:66px;border-radius:50%"></div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center"><p class="sub ts-k">When they tested</p></div>' +
      UI.img(kit, 'computer.webp', 'ts-pc', 'left:300px;top:840px;width:480px') +
      '<div class="words" style="left:0;top:680px;width:1080px;align-items:center"><span class="stamp solid ts-s" style="position:relative;font-size:72px;transform-origin:50% 50%">Internally</span></div>' +
      '<div class="words" style="left:0;top:1270px;width:1080px;align-items:center"><h1 class="line pink ts-n" style="font-size:300px">95%</h1></div>' +
      '<div class="words" style="left:0;top:1560px;width:1080px;align-items:center"><p class="sub ts-k2">of users</p></div>' +
      cells +
      '<div class="words" style="left:0;top:2140px;width:1080px;align-items:center"><span class="tape ts-t" style="position:relative;align-self:center;font-size:60px;transform-origin:50% 50%">Stopped using it</span></div>' +
      '<div class="words" style="left:0;top:2230px;width:1080px;align-items:center"><p class="sub ts-k3">Here’s why he</p></div>' +
      '<div class="ts-r" style="position:absolute;left:360px;top:2470px;width:360px">' + UI.img(kit, 'rocket.webp', '', 'left:0;top:0;width:360px') + '</div>' +
      '<div class="words" style="left:0;top:2920px;width:1080px;align-items:center;gap:6px"><h1 class="line ts-l" style="font-size:120px">Launched it</h1><h1 class="line pink ts-l2" style="font-size:130px">anyway</h1></div>',
      3500, UI.slot('ChatGPT', 290, 470, 500, 140, 'ts-sl'), 'window', UI.ghost('Test', -60, 1500));
    const q = this.v.q;
    this.k = q('.ts-k').style; this.pc = q('.ts-pc').style; this.s = q('.ts-s').style; this.sl = q('.ts-sl').style;
    this.nEl = q('.ts-n'); this.n = this.nEl.style; this.k2 = q('.ts-k2').style;
    this.c = [...kit.stage.querySelectorAll('.ts-c')].map(e => e.style); this.cEl = [...kit.stage.querySelectorAll('.ts-c')];
    this.t = q('.ts-t').style; this.k3 = q('.ts-k3').style; this.r = q('.ts-r').style;
    this.L = UI.letters(q('.ts-l'), 601, 6.3, 0.35).concat(UI.letters(q('.ts-l2'), 602, 6.95, 0.3));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.1, 0.35));
    UI.slotAnim(this.sl, t, 0.2, 2.45);
    const pp = seg(t, 0.45, 0.8); this.pc.opacity = pp > 0 ? 1 : 0; this.pc.transform = 'translateY(' + lerp(300, 0, eob(pp, 1.2)) + 'px) rotate(2deg)';
    UI.slam(this.s, t, 1.6, 0.22, -4, 1.7);
    // 95 per cent: the count runs up, then 19 of 20 users drop away
    const cp = eo(seg(t, 2.6, 3.3)); this.n.opacity = t >= 2.6 ? 1 : 0; this.nEl.textContent = Math.round(95 * cp) + '%';
    this.k2.opacity = eo(seg(t, 3.0, 3.3));
    this.c.forEach((st, i) => {
      const a = seg(t, 2.7 + i * 0.02, 2.95 + i * 0.02); st.opacity = a > 0 ? 1 : 0;
      if (i === KEEP) { this.cEl[i].classList.toggle('on', t >= 3.4); st.transform = 'scale(' + (a * (1 + 0.12 * Math.max(0, Math.sin((t - 4.3) * 5)) * seg(t, 4.3, 5.2))) + ')'; return; }
      const f = ei(seg(t, 4.2 + (i % 7) * 0.05, 4.75 + (i % 7) * 0.05));
      st.transform = 'translateY(' + 700 * f + 'px) rotate(' + ((i % 2 ? 1 : -1) * 70 * f) + 'deg) scale(' + a + ')';
      st.filter = f > 0 ? 'grayscale(1)' : 'none'; st.opacity = a > 0 ? 1 - f : 0;
    });
    UI.slam(this.t, t, 4.3, 0.22, -2, 1.5); this.t.opacity *= 1 - seg(t, 5.15, 5.4);
    this.k3.opacity = eo(seg(t, 5.65, 5.95));
    const up = ei(seg(t, 6.6, 7.6)), sh = t > 6.3 && t < 6.7 ? Math.sin(t * 80) * 3 : 0;
    this.r.transform = 'translate(' + sh + 'px,' + (-1500 * up) + 'px)';
    UI.reveal(this.L, t);
    if (t > 7.7) UI.roll(this.v.roll, t, 8.05, 0, 12); else UI.punch(this.v.roll, t, [1.6, 4.3, 6.3], 0.04);
  },
});
