const { seg, eo, ei, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 2600, z: 1.05, r: 3 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.9, from: 0.45, cx: 555, cy: 985, z: 1.04, r: -1 }, { t: 4.25, from: 3.9, cx: 540, cy: 1000, z: 2.0, r: 0, ease: kit.ei }];
const BASE = 1520, BARS = [{ x: 120, v: 603, y: '2025', g: [0.35, 0.95] }, { x: 380, v: 655, y: '2026', g: [0.75, 1.35], dash: 1 }, { x: 640, v: 806, y: '2029', g: [1.25, 2.1], dash: 1, pk: 1 }];
kit.scene('forecast', {
  init(kit) {
    const H = v => Math.round(v / 806 * 760);
    const bars = BARS.map((b, i) => '<div class="bar fc-b" style="left:' + b.x + 'px;top:' + (BASE - H(b.v)) + 'px;width:200px;height:' + H(b.v) + 'px;transform-origin:50% 100%;' +
      (b.dash ? 'background:repeating-linear-gradient(-45deg, ' + (b.pk ? 'color-mix(in srgb, var(--main) 35%, #fff)' : 'color-mix(in srgb, var(--second) 22%, #fff)') + ' 0 14px, transparent 14px 26px);border:6px dashed ' + (b.pk ? 'var(--main)' : 'var(--second)') + ';box-sizing:border-box;box-shadow:none' : 'background:var(--second)') + '"></div>' +
      '<div class="words fc-v" style="left:' + b.x + 'px;top:' + (BASE - H(b.v) - 72) + 'px;width:200px;align-items:center"><span class="blk' + (b.pk ? ' pink' : '') + '" style="font-size:56px">' + b.v + 'k</span></div>' +
      '<div class="words" style="left:' + b.x + 'px;top:' + (BASE + 22) + 'px;width:200px;align-items:center"><span class="lbl fc-y" style="font-size:34px">' + b.y + (b.dash ? ' est.' : '') + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:8px"><p class="sub fc-k" style="font-size:38px">Forecast: new robots a year</p><h1 class="num pink fc-n" style="font-size:180px">0</h1><p class="sub fc-k2">by 2029</p></div>' +
      bars + '<div style="position:absolute;left:90px;top:' + BASE + 'px;width:800px;height:6px;background:var(--second)"></div>' +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px"><path class="redline fc-ar" d="M200 840 C 360 760 520 700 660 650" style="stroke-width:10;stroke-dasharray:1"/></svg>',
      2000, '', 'soft', UI.ghost('2029', -40, 1640));
    const q = this.v.q;
    this.k = q('.fc-k').style; this.n = q('.fc-n'); this.k2 = q('.fc-k2').style;
    this.b = [...kit.stage.querySelectorAll('.fc-b')].map(e => e.style); this.val = [...kit.stage.querySelectorAll('.fc-v')].map(e => e.style);
    this.ar = UI.draw(q('.fc-ar'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.2, 0.5));
    BARS.forEach((B, i) => { const p = seg(t, B.g[0], B.g[1]); this.b[i].transform = 'scaleY(' + eob(p, 1.2) + ')'; this.b[i].opacity = p > 0 ? 1 : 0; this.val[i].opacity = eo(seg(t, B.g[1] - 0.15, B.g[1] + 0.1)); });
    const c = eo(seg(t, 0.3, 2.2));
    this.n.textContent = UI.num(806000 * c); this.n.style.opacity = t >= 0.3 ? 1 : 0;
    this.n.style.transform = 'scale(' + lerp(1.12, 1, eob(seg(t, 2.15, 2.45), 1.6)) + ')';
    this.k2.opacity = eo(seg(t, 2.2, 2.5));
    this.ar(eo(seg(t, 1.4, 2.2)));
    UI.punch(this.v.roll, t, [2.2], 0.045);
  },
});
