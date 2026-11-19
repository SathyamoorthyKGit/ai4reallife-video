const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.65, from: 0.35, cx: 540, cy: 962, z: 1.01, r: 0 }, { t: 3.0, from: 2.65, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 6.25, from: 3.05, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 6.6, from: 6.25, cx: 1800, cy: 1970, z: 1.05, r: 5, ease: kit.ei }];
const ROWS = ['Haiku 5.5', 'Sonnet 5.5', 'Opus 5.5', 'Fable 5.2'];
const COST = [{ n: 'stopwatch', x: 70, w: 280, l: 'Speed', a: 3.05 }, { n: 'gauge', x: 400, w: 290, l: 'Usage limits', a: 4.5 }, { n: 'crackloupe', x: 720, w: 300, l: 'Quality', a: 5.32 }];
kit.scene('setup', {
  init(kit) {
    const rows = ROWS.map((r, i) => '<div class="su-r" style="display:flex;align-items:center;height:78px;padding:0 26px;border-radius:14px;font-family:\'Regarn-700\';font-size:40px;' + (i === 2 ? 'background:var(--main);color:#fff' : '') + '">' + r + '</div>').join('');
    const cost = COST.map(c => UI.anim(kit, c.n, 'su-c', 'left:' + c.x + 'px;top:1500px', c.w) +
      '<div class="words su-cl" style="left:' + (c.x + c.w / 2 - 170) + 'px;top:1950px;width:340px;align-items:center"><span class="node" style="font-size:38px">' + c.l + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:320px;width:1080px;align-items:center;gap:6px"><p class="sub su-k">Most people pick</p><h1 class="line su-l" style="font-size:140px">One model</h1></div>' +
      '<div class="chat su-d" style="left:190px;top:600px;width:700px;height:470px;gap:8px"><div class="hd" style="height:56px"></div>' + rows + '</div>' +
      '<div class="words" style="left:0;top:1110px;width:1080px;align-items:center"><span class="stamp solid su-s" style="position:relative;font-size:64px;transform-origin:50% 50%">Never switch</span></div>' +
      UI.img(kit, 'point.webp', 'su-pt', 'left:700px;top:820px;width:300px') +
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center"><p class="sub su-k2">That’s costing you</p></div>' + cost,
      2400, UI.slot('Claude', 220, 612, 220, 70, 'su-sl'), 'soft', UI.ghost('One', -60, 1250, 460));
    const q = this.v.q;
    this.k = q('.su-k').style; this.L = UI.letters(q('.su-l'), 801, 0.6, 0.4);
    this.d = q('.su-d').style; this.r = [...kit.stage.querySelectorAll('.su-r')].map(e => e.style); this.s = q('.su-s').style; this.pt = q('.su-pt').style; this.sl = q('.su-sl').style;
    this.k2 = q('.su-k2').style; this.c = [...kit.stage.querySelectorAll('.su-c')].map(e => e.style); this.cl = [...kit.stage.querySelectorAll('.su-cl')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    this.k.opacity = eo(seg(t, 0.15, 0.4)); UI.reveal(this.L, t);
    const dp = seg(t, 0.4, 0.75); this.d.opacity = dp > 0 ? 1 : 0; this.d.transform = 'translateY(' + lerp(300, 0, eob(dp, 1.2)) + 'px)';
    this.r.forEach((st, i) => { const p = seg(t, 0.55 + i * 0.07, 0.8 + i * 0.07); st.opacity = p; st.transform = 'translateX(' + lerp(-40, 0, eo(p)) + 'px)'; });
    UI.slotAnim(this.sl, t, 0.55, 2.7);
    // the cursor hovers over the list but never moves off the one model
    const pp = seg(t, 0.9, 1.3), hov = Math.sin(t * 5) * 10 * seg(t, 1.3, 1.6);
    this.pt.opacity = pp > 0 ? 1 : 0; this.pt.transform = 'translate(' + lerp(400, 0, eo(pp)) + 'px,' + hov + 'px) rotate(180deg)';
    UI.slam(this.s, t, 1.6, 0.22, -6, 1.8);
    const gone = 1 - seg(t, 2.7, 2.9); this.s.opacity *= gone; this.pt.opacity *= gone;
    this.k2.opacity = eo(seg(t, 2.9, 3.15));
    COST.forEach((c, i) => {
      const p = seg(t, c.a - 0.1, c.a + 0.25); this.c[i].opacity = p > 0 ? 1 : 0;
      this.c[i].transform = 'translateY(' + lerp(300, 0, eob(p, 1.3)) + 'px) rotate(' + [-4, 3, -3][i] + 'deg)'; UI.frame(this.c[i], t, i * 0.4);
      UI.slam(this.cl[i], t, c.a + 0.1, 0.2, [-3, 2, -2][i], 1.5);
    });
    if (t > 2.6 && t < 3.05) UI.punch(this.v.roll, t, [], 0); else UI.punch(this.v.roll, t, [1.6, 3.05, 4.5, 5.32], 0.04);
  },
});
