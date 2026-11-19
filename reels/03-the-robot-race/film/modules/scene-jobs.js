const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.14, r: 2 }, { t: 0.6, cx: 520, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.5, from: 0.6, cx: 560, cy: 975, z: 1.06, r: -1 }, { t: 4.8, from: 4.5, cx: 540, cy: 1060, z: 1.1, r: -3 }, { t: 5.95, from: 4.85, cx: 540, cy: 1060, z: 1.15, r: -2 }, { t: 6.29, from: 5.95, cx: 1700, cy: 1060, z: 1.1, r: 5, ease: kit.ei }];
kit.scene('jobs', {
  init(kit) {
    kit.css('.jb-hl{font-family:"Regarn-900", var(--sans, system-ui, sans-serif);font-size:104px;line-height:.98;text-transform:uppercase;color:var(--second)}');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:8px"><p class="sub jb-k">US factory jobs</p><h1 class="num pink jb-n" style="font-size:200px">0</h1><p class="sub jb-k2">Dec 2024 to Dec 2025</p></div>' +
      UI.img(kit, 'worker1.webp', 'jb-w jb-w0', 'left:140px;top:1020px;width:220px') +
      UI.img(kit, 'worker2.webp', 'jb-w jb-w1', 'left:440px;top:1025px;width:170px') +
      UI.img(kit, 'worker3.webp', 'jb-w jb-w2', 'left:700px;top:1120px;width:195px') +
      '<div class="clip jb-c" style="left:100px;top:760px;width:880px;transform-origin:50% 50%"><span class="lbl">The easy headline</span><span class="jb-hl">Robots took<br>the jobs?</span></div>' +
      UI.img(kit, 'robot1.webp', 'jb-rb', 'left:560px;top:1160px;width:420px'),
      2100, '', 'spot', UI.ghost('Jobs', -60, 1420) + '<div class="stripe" style="left:120px;top:900px;width:80px;height:900px;opacity:.7;transform:skewX(-24deg)"></div>');
    const q = this.v.q;
    this.k = q('.jb-k').style; this.top = q('.jb-k').parentElement.style; this.n = q('.jb-n'); this.k2 = q('.jb-k2').style;
    this.w = [...kit.stage.querySelectorAll('.jb-w')].map(e => e.style); this.c = q('.jb-c').style; this.rb = q('.jb-rb').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.005);
    this.k.opacity = eo(seg(t, 0.2, 0.5));
    const c = eo(seg(t, 0.4, 2.6));
    this.n.textContent = UI.num(-68000 * c); this.n.style.opacity = t >= 0.4 ? 1 : 0;
    this.n.style.transform = 'scale(' + lerp(1.1, 1, eob(seg(t, 2.55, 2.85), 1.6)) + ')';
    this.k2.opacity = eo(seg(t, 2.6, 2.9));
    const fade = [2.0, 2.8, 3.3];
    this.w.forEach((st, i) => {
      const inP = seg(t, 0.3 + i * 0.15, 0.75 + i * 0.15), out = eo(seg(t, fade[i], fade[i] + 0.6)), gone = eo(seg(t, 4.55, 4.9));
      st.opacity = inP > 0 ? Math.max(0, 1 - 0.7 * out - 0.3 * gone) : 0;
      const walk = i === 2 ? lerp(0, 380, eio(seg(t, 3.3, 4.6))) : 0;
      st.transform = 'translate(' + walk + 'px,' + (lerp(220, 0, eob(inP, 1.2)) + (i === 2 ? Math.abs(Math.sin(t * 9)) * -8 * seg(t, 3.3, 4.6) : 0)) + 'px)';
      st.filter = 'drop-shadow(20px 28px 16px rgba(0,0,0,' + (0.36 * (1 - out)).toFixed(2) + ')) brightness(' + (1 + 0.25 * out) + ')';
    });
    UI.slam(this.c, t, 4.65, 0.24, -4, 1.7); this.top.opacity = 1 - eo(seg(t, 4.45, 4.7));
    this.rb.opacity = t >= 4.95 ? 1 : 0; this.rb.transform = 'translateY(' + lerp(300, 0, eob(seg(t, 4.95, 5.4), 1.3)) + 'px) rotate(6deg)';
    UI.punch(this.v.roll, t, [2.6, 4.65], 0.04);
    UI.glitch(kit, t, 0, 71);
  },
});
