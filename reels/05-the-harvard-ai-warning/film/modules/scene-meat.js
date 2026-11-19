const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 5.3, from: 0.4, cx: 540, cy: 975, z: 1.02, r: -1 }, { t: 7.7, from: 5.4, cx: 540, cy: 985, z: 1.03, r: 0 }, { t: 8.08, from: 7.72, cx: -700, cy: 1000, z: 1.05, r: -5, ease: kit.ei }];
const HOPS = [2.75, 3.2, 3.65, 4.1, 4.55];
kit.scene('meat', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:320px;width:1080px;align-items:center;gap:12px"><p class="sub mt-k">If you become a mere</p><span class="stamp solid mt-s" style="position:relative;font-size:92px;transform-origin:50% 50%">Meat interface</span></div>' +
      UI.img(kit, 'robot3.webp', 'mt-r', 'left:30px;top:760px;width:300px') +
      UI.img(kit, 'strings.webp', 'mt-st', 'left:350px;top:560px;width:380px') +
      UI.img(kit, 'automan.webp', 'mt-m', 'left:330px;top:820px;width:420px') +
      UI.img(kit, 'keys.webp', 'mt-kb', 'left:720px;top:960px;width:330px') +
      '<div class="words" style="left:0;top:0"><span class="tag mt-c" style="font-size:34px">Ctrl C</span></div>' +
      '<div class="words" style="left:0;top:0"><span class="tag mt-v" style="font-size:34px;background:var(--accent);color:#fff;border-color:var(--accent)">Ctrl V</span></div>' +
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center;gap:6px"><p class="sub mt-k2" style="font-size:38px">Your value to a company</p><h1 class="num pink mt-n" style="font-size:180px">100%</h1></div>',
      2000, '', 'spot', UI.ghost('Copy paste', -60, 1560, 300));
    const q = this.v.q;
    this.k = q('.mt-k').style; this.s = q('.mt-s').style; this.r = q('.mt-r').style; this.st = q('.mt-st').style; this.m = q('.mt-m').style; this.kb = q('.mt-kb').style;
    this.c = q('.mt-c').parentElement.style; this.vv = q('.mt-v').parentElement.style; this.k2 = q('.mt-k2').style; this.n = q('.mt-n');
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.1, 0.35)); UI.slam(this.s, t, 1.3, 0.24, -4, 1.9);
    const pop = (st, a, x) => { const p = seg(t, a, a + 0.4); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(200, 0, eob(p, 1.3)) + 'px)' + (x || ''); };
    pop(this.r, 0.4); pop(this.m, 0.55); pop(this.kb, 0.7, ' rotate(4deg)');
    const sp = seg(t, 1.6, 2.1); this.st.opacity = sp > 0 ? 1 : 0; this.st.transform = 'translateY(' + (lerp(-600, 0, eob(sp, 1.2)) + Math.sin(t * 3) * 6) + 'px)';
    // copy from the AI, paste to the keyboard, over and over
    let cx = 0, cy = 0, co = 0, vx = 0, vy = 0, vo = 0;
    HOPS.forEach(h => { const a = seg(t, h, h + 0.22), b = seg(t, h + 0.22, h + 0.44);
      if (a > 0 && a < 1) { cx = lerp(220, 430, eio(a)); cy = lerp(840, 900, a) - Math.sin(a * Math.PI) * 80; co = 1; }
      if (b > 0 && b < 1) { vx = lerp(470, 760, eio(b)); vy = lerp(900, 980, b) - Math.sin(b * Math.PI) * 80; vo = 1; } });
    this.c.opacity = co; this.c.transform = 'translate(' + cx + 'px,' + cy + 'px)'; this.vv.opacity = vo; this.vv.transform = 'translate(' + vx + 'px,' + vy + 'px)';
    this.m.filter = 'drop-shadow(20px 28px 16px rgba(0,0,0,.3)) grayscale(1) brightness(' + lerp(1, 0.8, eo(seg(t, 5.5, 7.3))) + ')';
    this.k2.opacity = eo(seg(t, 5.55, 5.85));
    const c = eo(seg(t, 5.7, 7.3)); this.n.textContent = Math.round(100 * (1 - c)) + '%'; this.n.style.opacity = t >= 5.6 ? 1 : 0;
    this.n.style.transform = 'scale(' + lerp(1.12, 1, eob(seg(t, 7.25, 7.55), 1.6)) + ')';
    UI.punch(this.v.roll, t, [1.3, 7.3], 0.045);
  },
});
