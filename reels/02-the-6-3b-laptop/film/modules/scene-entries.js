const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 760, z: 1.0 }, { t: 4.9, from: 4.35, cx: 540, cy: 1000, z: 0.92, r: -1.5 }, { t: 8.25, cx: 540, cy: 1000, z: 0.92, r: -1.5 }, { t: 8.6, from: 8.25, cx: 540, cy: 1750, z: 1.05, r: 2, ease: kit.ei }];
const DOORS = [[300, 1415], [550, 1415], [785, 1415]];
kit.scene('entries', {
  init(kit) {
    let rings = ''; DOORS.forEach((d, i) => { rings += '<ellipse class="redline en-r' + i + '" cx="' + d[0] + '" cy="' + d[1] + '" rx="92" ry="175" style="stroke-width:9" transform="rotate(-4 ' + d[0] + ' ' + d[1] + ')"/>'; });
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:260px;width:1080px;align-items:center;gap:6px"><p class="sub en-k" style="margin-bottom:6px">Binance later said</p><h1 class="line en-l1" style="font-size:110px">One laptop</h1><h2 class="blk en-l2" style="font-size:90px">One click</h2></div>' +
      '<svg class="art" viewBox="0 0 1080 2200" style="height:2200px"><path class="redline en-s1" d="M100 380 C 380 360 700 392 980 366" style="stroke-width:16"/><path class="redline en-s2" d="M290 472 C 460 462 640 478 800 462" style="stroke-width:14"/>' + rings + '</svg>' +
      '<div class="words" style="left:0;top:640px;width:1080px;align-items:center;gap:14px"><span class="tape en-t1" style="font-size:80px;align-self:center">More than</span><span class="tape en-t2" style="font-size:80px;align-self:center;background:var(--main)">one entry point</span></div>' +
      UI.img(kit, 'laptop.webp', 'en-lap', 'left:280px;top:640px;width:520px') + UI.img(kit, 'doors.webp', 'en-doors', 'left:170px;top:1180px;width:740px') +
      '<div class="stamp en-st" style="left:190px;top:1440px;font-size:40px">Postmortem: not out yet</div>', 2200, '', 'window');
    const q = this.v.q;
    this.k = q('.en-k').style; this.l2 = q('.en-l2').style; this.t1 = q('.en-t1').style; this.t2 = q('.en-t2').style; this.doors = q('.en-doors').style; this.lap = q('.en-lap').style; this.st = q('.en-st').style;
    this.L = UI.letters(q('.en-l1'), 12, -0.2, 0.4);
    this.s1 = UI.draw(q('.en-s1')); this.s2 = UI.draw(q('.en-s2'));
    this.r = [0, 1, 2].map(i => UI.draw(q('.en-r' + i)));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, -0.1, 0.2));
    UI.reveal(this.L, t);
    this.l2.opacity = eo(seg(t, 2.6, 2.9));
    this.s1(eo(seg(t, 1.25, 1.6))); this.s2(eo(seg(t, 3.1, 3.4)));
    UI.slam(this.t1, t, 4.05, 0.22, -2, 1.6);
    this.lap.opacity = 1 - eo(seg(t, 3.75, 4.0)); this.lap.transform = 'translateY(' + lerp(60, 0, eo(seg(t, 0, 0.6))) + 'px) rotate(' + (-3 + 6 * eo(seg(t, 3.75, 4.0))) + 'deg)'; UI.slam(this.t2, t, 4.35, 0.22, 2, 1.6);
    const dp = seg(t, 4.3, 4.8); this.doors.opacity = dp > 0 ? 1 : 0;
    this.doors.transform = 'translateY(' + lerp(160, 0, eob(dp, 1.3)) + 'px)';
    this.r.forEach((f, i) => f(eo(seg(t, 4.95 + i * 0.3, 5.25 + i * 0.3))));
    UI.slam(this.st, t, 6.4, 0.2, -6, 1.8); if (t >= 6.4) this.st.opacity = 0.92;
    UI.roll(this.v.roll, t, 8.6, -26, 0);
  },
});
