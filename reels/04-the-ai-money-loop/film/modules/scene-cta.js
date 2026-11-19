const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -600, z: 1.05, r: -3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.5, from: 0.4, cx: 540, cy: 975, z: 1.05, r: 1 }, { t: 2.95, from: 2.55, cx: 540, cy: 2000, z: 1.0, r: 0 }, { t: 6.57, from: 3.0, cx: 540, cy: 2010, z: 1.05, r: -1 }];
kit.scene('cta', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub ct-k">Builders get</p><h1 class="line ct-l" style="font-size:96px">Cheaper tokens</h1></div>' +
      UI.img(kit, 'tokens.webp', 'ct-tk', 'left:140px;top:950px;width:560px') +
      '<div class="ct-tg" style="position:absolute;left:600px;top:620px;width:380px;transform-origin:45% 8%">' + UI.img(kit, 'pricetag.webp', '', 'left:0;top:0;width:380px') +
      '<div style="position:absolute;left:50px;top:190px;width:250px;display:flex;flex-direction:column;align-items:center;transform:rotate(-8deg)"><span class="blk" style="font-size:72px">$$$</span><span class="blk pink ct-c" style="font-size:72px">$</span></div>' +
      '<svg viewBox="0 0 380 380" style="position:absolute;left:0;top:0;width:380px;height:380px;overflow:visible"><path class="pk-line ct-x" d="M80 250 L290 205" style="stroke-width:12"/></svg></div>' +
      '<div class="words" style="left:0;top:1340px;width:1080px;align-items:center"><p class="sub ct-k2" style="font-size:38px">while this sorts out</p></div>' +
      '<div class="words" style="left:0;top:1640px;width:1080px;align-items:center;gap:10px"><h1 class="line ct-l2" style="font-size:160px">Save this</h1><p class="sub wrapsub ct-k3" style="font-size:38px;text-align:center;width:760px">so you can check who was right</p></div>' +
      '<div class="ct-pt" style="position:absolute;left:520px;top:2000px;width:420px;transform-origin:0 50%">' + UI.img(kit, 'point.webp', '', 'left:0;top:0;width:420px') + '</div>' +
      '<div class="words" style="left:0;top:2460px;width:1080px;align-items:center"><span class="tag ct-na" style="align-self:center;font-size:40px">Not financial advice</span></div>',
      2700, '', 'window', UI.ghost('Save', -60, 1260));
    const q = this.v.q;
    this.k = q('.ct-k').style; this.L = UI.letters(q('.ct-l'), 461, 0.3, 0.45);
    this.tk = q('.ct-tk').style; this.tg = q('.ct-tg').style; this.c = q('.ct-c').style; this.x = UI.draw(q('.ct-x')); this.k2 = q('.ct-k2').style;
    this.L2 = UI.letters(q('.ct-l2'), 462, 3.0, 0.35); this.k3 = q('.ct-k3').style; this.pt = q('.ct-pt').style; this.na = q('.ct-na').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.1, 0.35)); UI.reveal(this.L, t);
    this.tk.opacity = t >= 0.5 ? 1 : 0; this.tk.transform = 'translateY(' + lerp(300, 0, eob(seg(t, 0.5, 1.0), 1.2)) + 'px)';
    const sw = seg(t, 0.7, 1.1); this.tg.opacity = sw > 0 ? 1 : 0;
    this.tg.transform = 'translateY(' + lerp(-500, 0, eob(sw, 1.3)) + 'px) rotate(' + (Math.sin(t * 3.2) * 8 * Math.exp(-Math.max(0, t - 1.1) * 0.8) + 4) + 'deg)';
    this.x(eo(seg(t, 1.4, 1.65))); this.c.opacity = eo(seg(t, 1.7, 1.9));
    this.k2.opacity = eo(seg(t, 1.9, 2.2));
    UI.reveal(this.L2, t); this.k3.opacity = eo(seg(t, 3.5, 3.8));
    // the hand points down at the save button
    const pp = seg(t, 3.2, 3.6), tap = Math.max(0, Math.sin((t - 3.6) * 7)) * 18 * seg(t, 3.6, 4.0) * (1 - seg(t, 4.4, 4.6));
    this.pt.opacity = pp > 0 ? 1 : 0; this.pt.transform = 'rotate(90deg) translateX(' + (lerp(-260, 0, eob(pp, 1.3)) + tap) + 'px)';
    this.na.opacity = eo(seg(t, 5.15, 5.4)); this.na.transform = 'rotate(-2deg) translateY(' + lerp(20, 0, eo(seg(t, 5.15, 5.4))) + 'px)';
    UI.punch(this.v.roll, t, [1.4, 3.0], 0.04);
  },
});
