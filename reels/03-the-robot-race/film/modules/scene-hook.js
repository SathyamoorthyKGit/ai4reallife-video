const { seg, eo, ei, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 760, z: 1.18, r: -3 }, { t: 0.95, from: 0.2, cx: 540, cy: 960, z: 1.0, r: 0 }, { t: 4.85, from: 1.0, cx: 540, cy: 975, z: 1.06, r: 1.5 }, { t: 5.2, from: 4.85, cx: 540, cy: 2000, z: 1.1, r: 3, ease: kit.ei }];
const LAND = [1.05, 1.4, 1.75, 2.1];
const PV = { x: 540, y: 804 }, HK = { dx: 366, dy: 105 };
kit.scene('hook', {
  init(kit) {
    const R = (n, x, y, w, r) => UI.img(kit, n + '.webp', 'hk-r', 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;transform-origin:50% 100%;--r:' + r + 'deg');
    const F = (n, x, r) => UI.img(kit, 'flag-' + n + '.webp', 'hk-f', 'left:' + x + 'px;top:214px;width:84px;transform:rotate(' + r + 'deg)');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub hk-k" style="font-size:40px">New factory robots · 2025</p><h1 class="line hk-l" style="font-size:260px;color:var(--main)">China</h1><p class="sub hk-k2">vs. the rest of the world</p></div>' +
      UI.img(kit, 'stand.webp', '', 'left:440px;top:790px;width:200px') +
      '<div class="hk-beam" style="position:absolute;left:150px;top:737px;width:780px;transform-origin:390px 67px">' + UI.img(kit, 'beam.webp', '', 'left:0;top:0;width:780px') + '</div>' +
      '<div class="hk-pl" style="position:absolute;left:0;top:0;width:330px;height:429px;transform-origin:50% 0">' + UI.img(kit, 'panL.webp', '', 'left:0;top:0;width:330px') +
        R('robot2', 10, 70, 130, -4) + R('robot4', 150, 170, 200, 3) + R('robot3', 60, 115, 170, -2) + R('robot1', 110, 160, 220, 5) +
        UI.img(kit, 'flag-cn.webp', 'hk-cn', 'left:118px;top:262px;width:112px;transform:rotate(-7deg)') + '</div>' +
      '<div class="hk-pr" style="position:absolute;left:0;top:0;width:330px;height:429px;transform-origin:50% 0">' + UI.img(kit, 'panR.webp', '', 'left:0;top:0;width:330px') +
        F('us', 18, -8) + F('jp', 88, 5) + F('kr', 158, -4) + F('de', 228, 7) + '</div>',
      2400, '', 'window',
      UI.ghost('Robots', -80, 1330) + '<div class="stripe" style="left:700px;top:700px;width:64px;height:820px;opacity:.75;transform:skewX(-26deg)"></div>');
    const q = this.v.q;
    this.k = q('.hk-k').style; this.k2 = q('.hk-k2').style;
    this.L = UI.letters(q('.hk-l'), 31, 0.15, 0.4);
    this.beam = q('.hk-beam').style; this.pl = q('.hk-pl').style; this.pr = q('.hk-pr').style;
    this.robots = [...kit.stage.querySelectorAll('.hk-r')].map(e => e.style);
    this.cn = q('.hk-cn').style; this.flags = [...kit.stage.querySelectorAll('.hk-f')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, -0.1, 0.25)); UI.reveal(this.L, t);
    this.k2.opacity = eo(seg(t, 1.3, 1.6)); this.k2.transform = 'translateY(' + lerp(16, 0, eo(seg(t, 1.3, 1.6))) + 'px)';
    let a = 6; LAND.forEach(l => { a -= 4.75 * eob(seg(t, l, l + 0.5), 1.3); });
    a += Math.sin(t * 2.2) * 0.6 * (1 - seg(t, 0, 3));
    this.beam.transform = 'rotate(' + a + 'deg)';
    const rad = a * Math.PI / 180, c = Math.cos(rad), s = Math.sin(rad);
    const hook = (dx, dy) => ({ x: PV.x + dx * c - dy * s, y: PV.y + dx * s + dy * c });
    const L = hook(-HK.dx, HK.dy), Rr = hook(HK.dx, HK.dy), sw = Math.sin(t * 2.6) * 1.5;
    this.pl.transform = 'translate(' + (L.x - 165) + 'px,' + (L.y - 12) + 'px) rotate(' + (sw - a * 0.25) + 'deg) scale(0.92)';
    this.pr.transform = 'translate(' + (Rr.x - 165) + 'px,' + (Rr.y - 12) + 'px) rotate(' + (-sw - a * 0.25) + 'deg) scale(0.92)';
    this.robots.forEach((st, i) => {
      const l = LAND[i], p = seg(t, l - 0.42, l);
      const bounce = t > l ? -22 * Math.exp(-(t - l) * 11) * Math.abs(Math.sin((t - l) * 22)) : 0;
      st.opacity = p > 0 ? 1 : 0;
      st.transform = 'translateY(' + (-1100 * (1 - p * p) + bounce) + 'px) rotate(' + (i % 2 ? 4 : -4) + 'deg)';
    });
    this.cn.opacity = t >= 0.55 ? 1 : 0; this.cn.transform = 'rotate(-7deg) scale(' + lerp(1.6, 1, eob(seg(t, 0.55, 0.8), 1.6)) + ')';
    this.flags.forEach((st, i) => { const p = seg(t, 0.3 + i * 0.1, 0.5 + i * 0.1); st.opacity = p > 0 ? 1 : 0; st.transform = 'rotate(' + [-8, 5, -4, 7][i] + 'deg) scale(' + lerp(0.4, 1, eob(p, 1.6)) + ')'; });
    UI.punch(this.v.roll, t, LAND, 0.022);
  },
});
