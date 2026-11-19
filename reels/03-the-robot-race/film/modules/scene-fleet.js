const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 900, z: 1.14, r: -2 }, { t: 3.95, from: 0.0, cx: 540, cy: 960, z: 1.0, r: 1, ease: kit.eio }, { t: 4.32, from: 3.95, cx: 540, cy: -500, z: 1.05, r: -3, ease: kit.ei }];
const KINDS = ['robot4', 'robot1', 'robot3', 'robot2'];
kit.scene('fleet', {
  init(kit) {
    let grid = '';
    for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) {
      const k = KINDS[(i + j * 2) % 4], w = k === 'robot2' ? 90 : 150;
      grid += UI.img(kit, k + '.webp', 'fl-g', 'left:' + (100 + i * 182 + (150 - w) / 2 + (j % 2) * 30) + 'px;top:' + (590 + j * 168) + 'px;width:' + w + 'px');
    }
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:320px;width:1080px;align-items:center;gap:8px"><p class="sub fl-k" style="font-size:34px">Robots now working in factories</p><h1 class="num fl-n" style="font-size:150px">0</h1></div>' +
      grid +
      '<div class="stamp fl-s" style="left:120px;top:1290px;font-size:70px;transform-origin:50% 50%">More than double</div>' +
      '<div class="words" style="left:0;top:1460px;width:1080px;align-items:center"><p class="sub fl-k2">vs. seven years ago</p></div>',
      2000, '', 'spot', UI.ghost('5M', 120, 1150, 600));
    const q = this.v.q;
    this.k = q('.fl-k').style; this.n = q('.fl-n'); this.g = [...kit.stage.querySelectorAll('.fl-g')].map(e => e.style);
    this.s = q('.fl-s').style; this.k2 = q('.fl-k2').style;
    const key = this.g.map((_, i) => kit.rng(i * 7 + 3)()); this.order = this.g.map((_, i) => i).sort((a, b) => key[a] - key[b]);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.05, 0.35));
    const c = eo(seg(t, 0.2, 1.9));
    this.n.textContent = UI.num(5000000 * c); this.n.style.transform = 'scale(' + lerp(1.1, 1, eob(seg(t, 1.85, 2.15), 1.6)) + ')';
    this.order.forEach((gi, k) => { const a = 0.25 + k * 0.07, p = seg(t, a, a + 0.3), st = this.g[gi]; st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(-60, 0, eob(p, 1.6)) + 'px) scale(' + lerp(0.5, 1, eob(p, 1.6)) + ')'; });
    UI.slam(this.s, t, 2.45, 0.24, -4, 1.9);
    this.k2.opacity = eo(seg(t, 2.85, 3.15));
    if (t < 0.45) UI.roll(this.v.roll, t, 4.32, -14, 0); else UI.punch(this.v.roll, t, [1.9, 2.45], 0.04);
  },
});
