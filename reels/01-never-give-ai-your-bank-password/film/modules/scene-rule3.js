const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 760, z: 1.0 }, { t: 1.35, from: 0.8, cx: 520, cy: 1560, z: 1.25 }, { t: 4, from: 3.0, cx: 540, cy: 1320, z: 0.86 }];
kit.scene('rule3', {
  init(kit) {
    const pts = [[432, 1479], [440, 1573], [453, 1651], [471, 1723]];
    let rings = ''; pts.forEach((p, i) => { rings += '<ellipse class="redline r3-k' + i + '" cx="' + p[0] + '" cy="' + p[1] + '" rx="62" ry="40" style="stroke-width:10" transform="rotate(-8 ' + p[0] + ' ' + p[1] + ')"/>'; });
    this.v = UI.build(kit,
      '<div class="line r3-num" style="position:absolute;left:450px;top:250px;font-size:760px;line-height:.9;color:var(--main)">3</div>' +
      '<div class="words" style="left:120px;top:400px;gap:18px"><p class="tag r3-k">And finally</p><span class="tape r3-t1" style="font-size:130px">Check</span><span class="tape r3-t2" style="font-size:130px">Weekly</span></div>' +
      '<div class="r3-cal" style="position:absolute;left:90px;top:1150px;width:900px">' + UI.img(kit, 'calendar.webp', '', 'left:0;top:0;width:900px') + '</div>' +
      '<svg class="art" viewBox="0 0 1080 2200" style="height:2200px">' + rings + '</svg>' +
      '<div class="words" style="left:80px;top:1960px;width:740px"><p class="b7 r3-body" style="font-size:50px;line-height:1.15">Check your account activity every week.</p></div>', 2200);
    const q = this.v.q;
    this.num = q('.r3-num').style; this.k = q('.r3-k').style; this.t1 = q('.r3-t1').style; this.t2 = q('.r3-t2').style; this.cal = q('.r3-cal').style; this.body = q('.r3-body').style;
    this.r = [0, 1, 2, 3].map(i => UI.draw(q('.r3-k' + i)));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    UI.roll(this.v.roll, t, 4, 0, 28);
    this.num.transform = 'translateY(' + lerp(-200, 0, eob(seg(t, -0.3, 0.25), 1.4)) + 'px)';
    this.k.opacity = eo(seg(t, -0.1, 0.25));
    UI.slam(this.t1, t, 0.35, 0.22, -3, 1.6); UI.slam(this.t2, t, 0.6, 0.22, 2, 1.6);
    const cp = seg(t, 0.8, 1.3); this.cal.opacity = cp > 0 ? 1 : 0;
    this.cal.transform = 'translateY(' + lerp(200, 0, eob(cp, 1.3)) + 'px) rotate(' + lerp(5, 0, eo(cp)) + 'deg)';
    this.r.forEach((f, i) => f(eo(seg(t, 1.5 + i * 0.4, 1.8 + i * 0.4))));
    this.body.opacity = eo(seg(t, 3.0, 3.35));
    UI.glitch(kit, t, 0, 32);
  },
});