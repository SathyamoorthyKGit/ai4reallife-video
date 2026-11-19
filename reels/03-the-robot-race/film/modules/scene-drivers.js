const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 548, cy: 1010, z: 1.7, r: 4 }, { t: 0.7, cx: 540, cy: 990, z: 1.0, r: 0, ease: kit.eox }, { t: 2.85, from: 0.75, cx: 540, cy: 990, z: 1.05, r: -1 }, { t: 3.2, from: 2.85, cx: 548, cy: 1018, z: 4.2, r: 0, ease: kit.ei }];
const E = { x: 130, y: 750, w: 820, h: 535 };
kit.scene('drivers', {
  init(kit) {
    const br = (x, y, bw) => '<div class="brk dr-b" style="left:' + x + 'px;top:' + y + 'px;' + bw + '"></div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:340px;width:1080px;align-items:center;gap:16px"><p class="sub dr-k">What’s driving it</p><span class="tape bl dr-t1" style="align-self:center;font-size:78px">AI + machine vision</span></div>' +
      UI.img(kit, 'eye.webp', 'dr-eye', 'left:' + E.x + 'px;top:' + E.y + 'px;width:' + E.w + 'px') +
      br(E.x - 10, E.y - 20, 'border-width:10px 0 0 10px') + br(E.x + E.w - 80, E.y - 20, 'border-width:10px 10px 0 0') +
      br(E.x - 10, E.y + E.h - 70, 'border-width:0 0 10px 10px') + br(E.x + E.w - 80, E.y + E.h - 70, 'border-width:0 10px 10px 0') +
      '<div class="dr-scan" style="position:absolute;left:0;top:' + (E.y - 30) + 'px;width:10px;height:' + (E.h + 60) + 'px;background:var(--accent);box-shadow:0 0 30px 8px color-mix(in srgb, var(--accent) 60%, transparent)"></div>' +
      '<div class="words" style="left:0;top:1380px;width:1080px;align-items:center"><span class="tape pk dr-t2" style="align-self:center;font-size:56px">Labour shortages</span></div>',
      2000, '', 'dark', UI.ghost('Vision', -60, 1520));
    const q = this.v.q;
    this.k = q('.dr-k').style; this.t1 = q('.dr-t1').style; this.t2 = q('.dr-t2').style; this.eye = q('.dr-eye').style;
    this.b = [...kit.stage.querySelectorAll('.dr-b')].map(e => e.style); this.scan = q('.dr-scan').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.35, 0.6));
    this.eye.transform = 'scale(' + (1 + 0.012 * Math.sin(t * 3)) + ')';
    UI.slam(this.t1, t, 0.55, 0.22, -2, 1.6);
    this.b.forEach((s, i) => { const p = seg(t, 0.3 + i * 0.06, 0.55 + i * 0.06); s.opacity = p > 0 ? 1 : 0; s.transform = 'scale(' + lerp(1.6, 1, eo(p)) + ')'; });
    const sp = seg(t, 0.45, 2.6), sx = E.x + E.w * (0.5 - 0.5 * Math.cos(sp * Math.PI * 2));
    this.scan.opacity = sp > 0 && sp < 1 ? 0.9 : 0; this.scan.transform = 'translateX(' + sx + 'px)';
    UI.slam(this.t2, t, 1.7, 0.22, 2, 1.6);
    UI.punch(this.v.roll, t, [0.55, 1.7], 0.035);
  },
});
