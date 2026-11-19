const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.55, from: 0.4, cx: 540, cy: 975, z: 1.03, r: -1 }, { t: 2.9, from: 2.55, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 8.1, from: 2.95, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 8.45, from: 8.1, cx: 540, cy: 2960, z: 1.05, r: 3, ease: kit.ei }];
const Q = 'how do I write this email';
kit.scene('search', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:320px;width:1080px;align-items:center;gap:6px"><p class="sub se-k" style="font-size:40px">Most people use AI like a</p><h1 class="line se-l" style="font-size:130px">Search bar</h1></div>' +
      '<div class="se-bar" style="position:absolute;left:110px;top:560px;width:860px;height:110px;border-radius:55px;background:#fffaf2;border:4px solid var(--second);box-sizing:border-box;box-shadow:14px 20px 22px rgba(0,0,0,.25);display:flex;align-items:center;padding:0 40px 0 120px"><span class="se-q" style="font-family:\'Regarn-400\';font-size:40px;white-space:nowrap"></span><span style="display:inline-block;width:4px;height:48px;background:var(--main);margin-left:4px"></span></div>' +
      UI.img(kit, 'loupe.webp', 'se-lp', 'left:120px;top:570px;width:96px') +
      UI.anim(kit, 'catalog', 'se-c', 'left:310px;top:720px', 460) +
      // the loop
      UI.anim(kit, 'wheel', 'se-w', 'left:310px;top:1540px', 460) +
      '<div class="words se-n1" style="left:80px;top:1390px"><span class="node" style="font-size:46px">Ask</span></div>' +
      '<div class="words se-n2" style="left:560px;top:1390px"><span class="node" style="font-size:42px;background:var(--accent)">Get an answer</span></div>' +
      '<div class="words se-n3" style="left:0;top:2030px;width:1080px;align-items:center"><span class="node" style="font-size:46px;background:var(--main)">Start over</span></div>' +
      '<svg class="art" viewBox="0 0 1080 2300" style="height:2300px"><path class="bl-line se-a1" d="M240 1420 C 380 1350 480 1350 590 1410"/><path class="bl-line se-a2" d="M880 1470 C 960 1650 900 1880 720 2010"/><path class="bl-line se-a3" d="M360 2010 C 180 1900 120 1700 160 1480"/></svg>' +
      '<div class="words" style="left:0;top:2120px;width:1080px;align-items:center"><span class="tape pk se-t" style="position:relative;align-self:center;font-size:56px;transform-origin:50% 50%">Never saves time</span></div>',
      2400, '', 'soft', UI.ghost('Search', -60, 1250, 380));
    const q = this.v.q;
    this.k = q('.se-k').style; this.L = UI.letters(q('.se-l'), 711, 1.4, 0.4);
    this.bar = q('.se-bar').style; this.qel = q('.se-q'); this.lp = q('.se-lp').style; this.c = q('.se-c').style;
    this.w = q('.se-w').style; this.n = ['.se-n1', '.se-n2', '.se-n3'].map(s => q(s).style);
    this.a = ['.se-a1', '.se-a2', '.se-a3'].map(s => UI.draw(q(s))); this.t = q('.se-t').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.25, 0.5)); UI.reveal(this.L, t);
    const bp = seg(t, 0.5, 0.8); this.bar.opacity = bp > 0 ? 1 : 0; this.bar.transform = 'scaleX(' + lerp(0.2, 1, eob(bp, 1.4)) + ')';
    this.lp.opacity = t >= 0.75 ? 1 : 0; this.lp.transform = 'rotate(' + Math.sin(t * 3) * 8 + 'deg)';
    UI.type(this.qel, Q, t, 0.9, 20);
    const cp = seg(t, 1.0, 1.35); this.c.opacity = cp > 0 ? 1 : 0; this.c.transform = 'translateY(' + lerp(300, 0, eob(cp, 1.2)) + 'px) rotate(2deg)'; UI.frame(this.c, t);
    // ask, answer, start over: the loop draws round a spinning wheel
    const wp = seg(t, 2.75, 3.1); this.w.opacity = wp > 0 ? 1 : 0; UI.frame(this.w, t);
    const spin = t > 4.6 ? Math.sin((t - 4.6) * 9) * 4 * (1 - seg(t, 7.0, 8.0)) : 0;
    this.w.transform = 'scale(' + lerp(0.5, 1, eob(wp, 1.4)) + ') rotate(' + spin + 'deg)';
    [2.94, 3.6, 4.6].forEach((a, i) => { UI.slam(this.n[i], t, a, 0.2, [-3, 2, -2][i], 1.5); this.a[i](eio(seg(t, a + 0.1, a + 0.6))); });
    UI.slam(this.t, t, 6.25, 0.22, -2, 1.5);
    UI.punch(this.v.roll, t, [2.94, 3.6, 4.6, 6.25], 0.04);
  },
});
