const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.6, from: 0.4, cx: 540, cy: 990, z: 1.02, r: -1 }, { t: 6.05, from: 4.65, cx: 540, cy: 1000, z: 1.0, r: 1 }, { t: 6.45, from: 6.05, cx: 540, cy: 2060, z: 1.0, r: 0 }, { t: 9.95, from: 6.5, cx: 540, cy: 2070, z: 1.03, r: -1 }];
const PINK = [12, 37, 54, 71, 88];
const ARC = 'M200 1000 A340 340 0 0 1 880 1000';
kit.scene('retain', {
  init(kit) {
    let dots = '';
    for (let i = 0; i < 100; i++) dots += '<div class="cell rt-c" style="left:' + (226 + (i % 10) * 64) + 'px;top:' + (1640 + Math.floor(i / 10) * 64) + 'px;width:44px;height:44px;border-radius:50%"></div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:320px;width:1080px;align-items:center;gap:6px"><p class="sub rt-k">Internal ChatGPT</p><h1 class="line rt-l" style="font-size:130px">Retention</h1></div>' +
      '<svg class="art" viewBox="0 0 1080 1400" style="height:1400px">' +
        '<path d="' + ARC + '" style="fill:none;stroke:color-mix(in srgb, var(--second) 22%, var(--ground));stroke-width:30;stroke-linecap:round"/>' +
        '<path class="pk-line rt-arc" d="' + ARC + '" style="stroke-width:30"/>' +
      '</svg>' +
      '<div class="rt-nd" style="position:absolute;left:540px;top:994px;width:300px;height:12px;border-radius:6px;background:var(--second);transform-origin:0 50%;box-shadow:6px 10px 10px rgba(0,0,0,.25)"></div>' +
      '<div style="position:absolute;left:518px;top:978px;width:44px;height:44px;border-radius:50%;background:var(--second)"></div>' +
      '<div class="stamp rt-s" style="left:360px;top:800px;font-size:80px;transform-origin:50% 50%">Dismal</div>' +
      '<div class="words" style="left:0;top:1050px;width:1080px;align-items:center"><h1 class="line pink rt-n" style="font-size:220px;transform-origin:50% 50%">5%</h1></div>' +
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center"><span class="tape bl rt-t" style="position:relative;align-self:center;font-size:56px;transform-origin:50% 50%">Launched anyway</span></div>' +
      '<div class="words" style="left:0;top:1420px;width:1080px;align-items:center;gap:22px"><p class="sub rt-k2">The 5% who used it</p><span class="tag rt-g" style="position:relative;align-self:center;font-size:38px">Didn’t just like it</span></div>' +
      '<svg class="art" viewBox="0 0 1080 1600" style="height:1600px"><path class="pk-line rt-x" d="M370 1528 L720 1528" style="stroke-width:10"/></svg>' +
      dots +
      UI.img(kit, 'heart.webp', 'rt-h', 'left:730px;top:2200px;width:290px') +
      '<div class="words" style="left:70px;top:2330px"><h1 class="line pink rt-lv" style="font-size:140px">Loved it</h1></div>',
      2700, '', 'spot', UI.ghost('5%', -40, 1500, 520));
    const q = this.v.q;
    this.k = q('.rt-k').style; this.L = UI.letters(q('.rt-l'), 641, 1.6, 0.4);
    const arc = q('.rt-arc'); this.AL = arc.getTotalLength(); arc.style.strokeDasharray = this.AL; this.arc = arc.style;
    this.nd = q('.rt-nd').style; this.s = q('.rt-s').style; this.n = q('.rt-n').style; this.t = q('.rt-t').style;
    this.k2 = q('.rt-k2').style; this.g = q('.rt-g').style; this.x = UI.draw(q('.rt-x'));
    this.c = [...kit.stage.querySelectorAll('.rt-c')]; this.h = q('.rt-h').style; this.lv = UI.letters(q('.rt-lv'), 642, 9.2, 0.3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.3, 0.55)); UI.reveal(this.L, t);
    // the needle climbs, then drops to 5 on "dismal five per cent"
    const v = lerp(lerp(0, 0.62, eo(seg(t, 0.5, 1.6))), 0.05, eob(seg(t, 2.95, 3.6), 1.3));
    this.nd.transform = 'rotate(' + (-180 + 180 * v) + 'deg)';
    this.arc.strokeDashoffset = this.AL * (1 - v);
    UI.slam(this.s, t, 2.95, 0.22, -6, 1.8);
    UI.slam(this.n, t, 3.45, 0.22, 0, 1.6); const g1 = 1 - seg(t, 5.9, 6.15); this.n.opacity *= g1; this.s.opacity *= g1;
    UI.slam(this.t, t, 4.85, 0.22, -2, 1.5); this.t.opacity *= 1 - seg(t, 6.0, 6.25);
    this.k2.opacity = eo(seg(t, 6.3, 6.6));
    this.c.forEach((el, i) => {
      const a = seg(t, 6.35 + (i % 10) * 0.012 + Math.floor(i / 10) * 0.025, 6.6 + (i % 10) * 0.012 + Math.floor(i / 10) * 0.025);
      el.style.opacity = a > 0 ? 1 : 0; el.style.transform = 'scale(' + eob(a, 1.6) + ')';
      const pk = PINK.indexOf(i) >= 0; el.classList.toggle('on', pk && t >= 6.75);
      el.style.filter = !pk && t >= 6.75 ? 'opacity(.45)' : 'none';
    });
    UI.slam(this.g, t, 7.85, 0.2, -2, 1.4); this.x(eio(seg(t, 8.6, 8.9)));
    const hp = seg(t, 9.2, 9.45), beat = t > 9.45 ? 1 + 0.06 * Math.max(0, Math.sin((t - 9.45) * 7)) : 1;
    this.h.opacity = hp > 0 ? 1 : 0; this.h.transform = 'scale(' + (lerp(0.3, 1, eob(hp, 1.8)) * beat) + ') rotate(6deg)';
    UI.reveal(this.lv, t);
    if (t > 9.95) UI.roll(this.v.roll, t, 10.3, 0, 12); else UI.punch(this.v.roll, t, [2.95, 3.45, 4.85, 7.85, 9.2], 0.04);
  },
});
