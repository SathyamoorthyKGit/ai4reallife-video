const { seg, eo, ei, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 2.4, r: -6 }, { t: 0.6, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.75, from: 0.65, cx: 540, cy: 960, z: 1.05, r: 1 }, { t: 3.2, from: 2.75, cx: 540, cy: 1900, z: 1.0, r: -1 }, { t: 6.58, from: 3.25, cx: 540, cy: 1900, z: 1.08, r: 0 }];
const PINS = [[0.74, 0.40], [0.86, 0.37], [0.815, 0.385], [0.2, 0.37], [0.505, 0.28], [0.17, 0.5], [0.69, 0.52], [0.525, 0.35], [0.54, 0.24], [0.79, 0.62]];
kit.scene('world', {
  init(kit) {
    const M = { x: 70, y: 680, w: 940, h: 530 };
    const pins = PINS.map(p => '<div class="ring wd-ring" style="left:' + (M.x + p[0] * M.w) + 'px;top:' + (M.y + p[1] * M.h) + 'px"></div><div class="dot wd-dot" style="left:' + (M.x + p[0] * M.w) + 'px;top:' + (M.y + p[1] * M.h) + 'px"></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:290px;width:1080px;align-items:center;gap:8px"><p class="sub wd-k">Meanwhile, the world is</p><h1 class="line wd-l" style="font-size:128px">Speeding up</h1></div>' +
      UI.img(kit, 'worldmap.webp', 'wd-map', 'left:' + M.x + 'px;top:' + M.y + 'px;width:' + M.w + 'px') + pins +
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center;gap:10px"><p class="sub wd-k2" style="font-size:40px">New robots in one year</p><h1 class="num wd-n" style="font-size:190px">0</h1><p class="sub wd-k3" style="font-size:38px">installed worldwide in 2025</p></div>' +
      UI.img(kit, 'robot1.webp', 'wd-r wd-r0', 'left:60px;top:1830px;width:360px') +
      UI.img(kit, 'robot2.webp', 'wd-r wd-r1', 'left:430px;top:1700px;width:200px') +
      UI.img(kit, 'robot3.webp', 'wd-r wd-r2', 'left:650px;top:1760px;width:330px'),
      2400, '', 'window', UI.ghost('World', -60, 1180) + '<div class="stripe" style="left:780px;top:1500px;width:70px;height:900px;opacity:.7;transform:skewX(-24deg)"></div>');
    const q = this.v.q;
    this.k = q('.wd-k').style; this.L = UI.letters(q('.wd-l'), 61, 0.55, 0.45);
    this.map = q('.wd-map').style;
    this.dots = [...kit.stage.querySelectorAll('.wd-dot')].map(e => e.style); this.rings = [...kit.stage.querySelectorAll('.wd-ring')].map(e => e.style);
    this.k2 = q('.wd-k2').style; this.n = q('.wd-n'); this.k3 = q('.wd-k3').style;
    this.rb = [...kit.stage.querySelectorAll('.wd-r')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.4, 0.7)); UI.reveal(this.L, t);
    this.dots.forEach((d, i) => { const a = 1.0 + i * 0.13, p = seg(t, a, a + 0.25); d.opacity = p > 0 ? 1 : 0; d.transform = 'scale(' + lerp(0.2, 1, eob(p, 2)) + ')';
      const r = seg(t, a, a + 0.9); this.rings[i].opacity = r > 0 && r < 1 ? 1 - r : 0; this.rings[i].transform = 'scale(' + (1 + r * 3.5) + ')'; });
    this.k2.opacity = eo(seg(t, 3.15, 3.45));
    const c = eo(seg(t, 3.3, 5.0));
    this.n.textContent = UI.num(603000 * c); this.n.style.opacity = t >= 3.15 ? 1 : 0; this.n.style.transform = 'scale(' + lerp(1.1, 1, eob(seg(t, 4.95, 5.25), 1.6)) + ')';
    this.k3.opacity = eo(seg(t, 5.0, 5.3));
    this.rb.forEach((st, i) => { const a = 3.45 + i * 0.22, p = seg(t, a, a + 0.45); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(420, 0, eob(p, 1.2)) + 'px) rotate(' + [-5, 3, 6][i] + 'deg)'; });
    if (t > 6.15) UI.roll(this.v.roll, t, 6.58, 0, 14); else UI.punch(this.v.roll, t, [5.0], 0.04);
  },
});
