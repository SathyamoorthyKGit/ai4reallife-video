const { seg, eo, eob, eio, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 800, z: 1.0 }, { t: 1.3, from: 0.5, cx: 554, cy: 860, z: 1.85 }, { t: 2.9, from: 2.2, cx: 560, cy: 900, z: 1.04 }, { t: 5, from: 4.55, cx: 540, cy: 1560, z: 1.2 }];
kit.scene('hook', {
  init(kit) {
    kit.css('.hook-k{position:absolute;width:34px;height:24px;border-radius:4px;background:color-mix(in srgb, var(--accent) 70%, #fff);opacity:0}');
    const r = kit.rng(21); let keys = '';
    for (let i = 0; i < 14; i++) keys += '<div class="hook-k" style="left:' + Math.round(330 + r() * 400) + 'px;top:' + Math.round(1028 + r() * 56) + 'px"></div>';
    this.v = UI.build(kit,
      '<div class="ghost" style="left:-60px;top:1430px">Password</div>' +
      '<div class="stripe" style="left:270px;top:640px;width:170px;height:900px;transform:skewX(-28deg)"></div><div class="stripe" style="left:560px;top:700px;width:100px;height:820px;transform:skewX(-28deg)"></div>' +
      '<div class="words hook-hw" style="left:0;top:462px;width:1080px;align-items:center"><p class="sub hook-sub">The bank thinks</p><h1 class="line hook-line" style="font-size:140px">It&#39;s you</h1></div>' +
      UI.img(kit, 'laptop.webp', '', 'left:110px;top:660px;width:860px') +
      UI.screen(336, 716) + keys +
      '<svg class="art" viewBox="0 0 1080 2200" style="height:2200px"><path class="stroke hook-arrow" d="M800 1196 C 900 1190 930 1130 880 1108 C 830 1088 815 1150 858 1148 C 900 1146 860 1092 752 1088" style="stroke-width:5"/></svg>' +
      '<div class="words" style="left:520px;top:1190px"><span class="tag hook-tag">No hands</span></div>', 2200);
    const q = this.v.q;
    this.pw = q('.lg-pw'); this.caret = q('.lg-caret').style; this.btn = q('.lg-btn');
    this.tag = q('.hook-tag').style; this.hw = q('.hook-hw').style; this.sub = q('.hook-sub').style;
    this.L = UI.letters(q('.hook-line'), 7, -0.6, 0.5);
    this.arrow = UI.draw(q('.hook-arrow'));
    this.keys = [...kit.stage.querySelectorAll('.hook-k')].map(e => e.style);
    this.typ = kit.typist('xxxxxxxxxxxx', 0.6, 7, 5);
    const r2 = kit.rng(9); this.hit = this.typ.times.map(() => Math.floor(r2() * this.keys.length));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    UI.reveal(this.L, t);
    this.hw.opacity = 1 - eo(seg(t, 0.75, 1.05)) + eo(seg(t, 2.35, 2.75));
    this.pw.textContent = '•'.repeat(this.typ.count(t));
    this.caret.opacity = t > 3.5 ? 0 : (Math.floor(t / 0.53) % 2 ? 0.15 : 1);
    this.keys.forEach(s => s.opacity = 0);
    this.typ.times.forEach((ti, j) => { if (t >= ti && t < ti + 0.12) this.keys[this.hit[j]].opacity = 0.9; });
    this.arrow(eo(seg(t, 2.5, 3.0)));
    UI.slam(this.tag, t, 2.75, 0.25, 4, 1.6);
    const press = seg(t, 3.55, 3.65) * (1 - seg(t, 3.65, 3.85));
    this.btn.style.transform = 'scale(' + (1 - 0.06 * press) + ')';
    const ok = t >= 3.7;
    this.btn.textContent = ok ? 'Welcome back' : 'Sign in';
    this.btn.style.background = ok ? 'var(--accent)' : '';
    UI.glitch(kit, t, 5, 11);
  },
});