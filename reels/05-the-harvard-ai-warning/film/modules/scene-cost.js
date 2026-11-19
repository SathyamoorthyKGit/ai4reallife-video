const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 990, z: 2.2, r: 0 }, { t: 0.5, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 7.05, from: 0.55, cx: 540, cy: 975, z: 1.02, r: -1 }, { t: 7.44, from: 7.05, cx: -700, cy: 990, z: 1.05, r: -5, ease: kit.ei }];
kit.scene('cost', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:345px;width:1080px;align-items:center;gap:6px"><p class="sub co-k">The marginal cost of</p><h1 class="line co-l" style="font-size:96px">Basic expertise</h1></div>' +
      '<div class="co-tg" style="position:absolute;left:330px;top:600px;width:420px;transform-origin:45% 8%">' + UI.img(kit, 'pricetag.webp', '', 'left:0;top:0;width:420px') +
      '<div style="position:absolute;left:60px;top:200px;width:280px;display:flex;justify-content:center;transform:rotate(-8deg)"><span class="num co-n" style="font-size:130px">$$$</span></div></div>' +
      '<div class="words" style="left:0;top:1120px;width:1080px;align-items:center"><span class="stamp solid co-z" style="position:relative;font-size:92px;transform-origin:50% 50%">Drops to $0</span></div>' +
      '<div class="words" style="left:0;top:1330px;width:1080px;align-items:center;gap:8px"><p class="sub co-k2" style="font-size:38px">AI output defaults to</p><span class="stamp solid co-a" style="position:relative;font-size:84px;color:var(--second);border-color:var(--second);transform-origin:50% 50%">Average</span></div>',
      2000, '', 'spot', UI.ghost('Expertise', -60, 1580, 300));
    const q = this.v.q;
    this.k = q('.co-k').style; this.L = UI.letters(q('.co-l'), 551, 1.8, 0.45); this.tg = q('.co-tg').style; this.n = q('.co-n');
    this.z = q('.co-z').style; this.k2 = q('.co-k2').style; this.a = q('.co-a').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 1.4, 1.7)); UI.reveal(this.L, t);
    const sw = seg(t, 0.4, 0.8); this.tg.opacity = sw > 0 ? 1 : 0;
    this.tg.transform = 'translateY(' + lerp(-600, 0, eob(sw, 1.3)) + 'px) rotate(' + (Math.sin(t * 3) * 7 * Math.exp(-Math.max(0, t - 0.8) * 0.7) + 3) + 'deg)';
    const d = seg(t, 2.6, 3.95); this.n.textContent = d < 0.33 ? '$$$' : d < 0.66 ? '$$' : d < 1 ? '$' : '$0';
    this.n.style.color = d >= 1 ? 'var(--main)' : 'var(--second)';
    UI.slam(this.z, t, 3.95, 0.24, -5, 1.9);
    this.k2.opacity = eo(seg(t, 5.15, 5.45)); UI.slam(this.a, t, 6.55, 0.24, 3, 1.6);
    UI.punch(this.v.roll, t, [3.95, 6.55], 0.04);
  },
});
